import { Tile } from "./tiles";
import { Square, SquareType } from "./square";
import { Log } from "./log";
import { Dictionary } from "./dictionary";
import { Player } from "./player";

export class Board {
    private readonly squares = Square.all();
    private readonly modifiersUsed = new Set<SquareType>();
    private firstMoveOccured = false;

    constructor(private readonly log: Log) {}

    move(player: Player, tiles: Tile[], startingCell: string) {
        let dir: "forward" | "sideways" = "forward";
        if (parseInt(startingCell[0])) {
            startingCell = startingCell.slice(1) + startingCell[0];
            dir = "sideways";
        }
        const square = this.squares[startingCell];
        if (
            this.firstMoveOccured &&
            !Object.values(square.adjacent(1, { squares: this.squares })).length
        ) {
            return player.log.error(
                "In turns after one, you must place tiles adjacent to one another."
            );
        }
        // Not enough space to add word
        // FIXME: if you're adding tiles between two existing words to form one word, this won't work
        if (
            square[dir === "forward" ? "down" : "left"](tiles.length, {
                all: true,
                squares: this.squares,
            })?.some((val) => val.tile)
        ) {
            return player.log.error(
                `There's not enough space to add ${tiles.join(
                    ""
                )} to the board.`
            );
        }
        let word = "";
        // TODO: Parallel words
        if (dir === "sideways") {
            let [leftCell, rightCell] = [
                square.left(1, { squares: this.squares }),
                square.right(1, { squares: this.squares }),
            ];
            while (leftCell?.tile) {
                word += leftCell.tile;
                leftCell = leftCell.left(1, { squares: this.squares });
            }
            while (rightCell?.tile) {
                word += rightCell.tile;
                rightCell = rightCell.right(1, { squares: this.squares });
            }
        } else if (dir === "forward") {
            let [upCell, downCell] = [
                square.up(1, { squares: this.squares }),
                square.down(1, { squares: this.squares }),
            ];
            while (downCell?.tile) {
                word += downCell.tile;
                downCell = downCell.down(1, { squares: this.squares });
            }
            while (upCell?.tile) {
                word += upCell.tile;
                upCell = upCell.up(1, { squares: this.squares });
            }
        }
        word += tiles.join("");
        if (!Dictionary.isValidWord(word)) {
            return this.log.error(
                `${player.name} attempted to use invalid word: ${word}`
            );
        }
        const squaresUsed: Square[] = [];
        for (const [idx, nextSquare] of [square]
            .concat(
                square[dir === "forward" ? "down" : "left"](tiles.length - 1, {
                    squares: this.squares,
                    all: true,
                })
            )
            .entries()) {
            if (this.squares[nextSquare.cell].tile) {
                return player.log.error(
                    `Cannot place tile on cell ${nextSquare.cell} which already has a tile`
                );
            }
            this.squares[nextSquare.cell].tile = tiles[idx];
            if (this.modifiersUsed.has(nextSquare.type)) {
                nextSquare.modifierUsed = true;
            }
            if (nextSquare.type !== "regular") {
                this.log.std(`Modifier ${nextSquare.type} used!`);
                this.modifiersUsed.add(nextSquare.type);
            }
            squaresUsed.push(nextSquare);
        }
        if (!this.firstMoveOccured) this.firstMoveOccured = true;
        return { squaresUsed, word };
    }
}
