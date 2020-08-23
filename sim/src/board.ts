import { Tile } from "./tiles";
import { Square } from "./square";
import { Log } from "./log";
import { Dictionary } from "./dictionary";

export class Board {
    private readonly squares = Square.all();
    private firstMoveOccured = false;
    /**
     *
     * @param startingCell
     *  The cell you want to add the first tile in.
     *  If the main word reads left-to-right, the row number precedes the column letter,
     *  and if the main word reads top-to-bottom
     */
    move(tiles: Tile[], startingCell: string) {
        let dir: "forward" | "sideways" = "forward";
        if (parseInt(startingCell[0])) {
            startingCell = startingCell.slice(1) + startingCell[0];
            dir = "sideways";
        }
        const square = this.squares[startingCell];
        if (
            this.firstMoveOccured &&
            !square.adjacent()?.filter((square) => square.tile).length
        ) {
            return Log.error(
                "In turns after one, you must place tiles adjacent to one another."
            );
        }
        // Not enough space to add word
        // FIXME: if you're adding tiles between two existing words to form one word, this won't work
        if (
            square[dir === "forward" ? "down" : "left"](
                tiles.length,
                true
            )?.some((val) => val.tile)
        ) {
            return Log.error(
                `There's not enough space to add ${tiles.join(
                    ""
                )} to the board.`
            );
        }
        let word = "";
        // TODO: Parallel words
        if (dir === "sideways") {
            let [leftCell, rightCell] = [square.left(), square.right()];
            while (leftCell?.tile) {
                word += leftCell.tile;
                leftCell = leftCell.left();
            }
            while (rightCell?.tile) {
                word += rightCell.tile;
                rightCell = rightCell.right();
            }
        } else if (dir === "forward") {
            let [downCell, upCell] = [square.down(), square.up()];
            while (downCell?.tile) {
                word += downCell.tile;
                downCell = square.down();
            }
            while (upCell?.tile) {
                word += upCell.tile;
                upCell = square.up();
            }
        }
        word += tiles.join("");
        if (!Dictionary.isValidWord(word)) {
            return Log.error(`Invalid word: ${word}`);
        }
        const squaresUsed: Square[] = [];
        for (const [idx, nextSquare] of square[
            dir === "forward" ? "down" : "left"
        ](tiles.length, true).entries()) {
            this.squares[nextSquare.cell].tile = tiles[idx];
            squaresUsed.push(nextSquare);
        }
        if (!this.firstMoveOccured) this.firstMoveOccured = true;
        return { squaresUsed, word };
    }
}
