import { TILES, Bag, Tile } from "./tiles";
import { Board } from "./board";
import { Points } from "./points";
import { Log } from "./log";
import { Dictionary } from "./dictionary";
import { Player, createPlayer } from "./player";

export class Game {
    private readonly board: Board;
    private readonly tiles: Bag;
    readonly players: Map<string, Player> = new Map();
    readonly turnOrder: Map<string, Player>;
    readonly log: Log = new Log();
    curPlayer: Player;
    constructor(playerNames: string[]) {
        for (const playerName of playerNames) {
            this.players.set(playerName, createPlayer(playerName));
        }
        this.turnOrder = this.getTurnOrder();
        this.curPlayer = [...this.turnOrder][0][1];
        this.tiles = new Bag(this.players, this.log);
        this.board = new Board(this.log);
    }

    async start() {
        this.tiles.initialDraw();
        await Dictionary.read();
        return this;
    }

    /**
     *
     * @param startingCell
     *  The cell you want to add the first tile in.
     *  If the main word reads left-to-right, the row number precedes the column letter,
     *  and if the main word reads top-to-bottom
     */
    move(tiles: Tile[], startingCell: string) {
        const notInPlayerRack: Tile[] = [];
        for (const tile of tiles) {
            if (!this.curPlayer.tiles.includes(tile)) {
                notInPlayerRack.push(tile);
            }
        }
        const playerBlankTiles = this.curPlayer.tiles.filter(
            (tile) => tile === "BLANK"
        );
        if (notInPlayerRack.length > playerBlankTiles.length) {
            return this.curPlayer.log.error(
                `You attmped to use tiles you don't have`
            );
        }
        const result = this.board.move(this.curPlayer, tiles, startingCell);
        if (!result) return;
        const { squaresUsed, word } = result;
        const points = Points.calculatePoints(
            squaresUsed.map((square) => {
                if (notInPlayerRack.includes(square.tile!)) {
                    square.tile = "BLANK";
                }
                return square;
            })
        );
        this.curPlayer.points += points;
        // TODO: tile should have parens if it was already on board
        // and it should be small case if it was initally a blank tile
        this.log.important(
            `${this.curPlayer.name} ${word}: ${startingCell} +${points}`
        );
        this.curPlayer.tiles = this.curPlayer.tiles.filter(
            (tile) => !tiles.includes(tile)
        );
        const newTiles = this.tiles.giveRandomTiles(
            this.curPlayer,
            tiles.length
        );
        // TODO: alternate win conditions
        if (!newTiles.length && !this.curPlayer.tiles.length) {
            return this.win(this.curPlayer);
        }
        this.curPlayer = this.nextPlayer();
        this.log.important(
            `${
                this.curPlayer.name.endsWith("s")
                    ? `${this.curPlayer.name}'`
                    : `${this.curPlayer.name}'s`
            } turn to play`
        );
    }

    skip() {
        this.log.important(`${this.curPlayer.name} skipped their turn`);
        this.curPlayer = this.nextPlayer();
    }

    exchangeTiles(tiles: Tile[]) {
        this.tiles.exchangeTiles(this.curPlayer, tiles);
        this.curPlayer = this.nextPlayer();
    }

    private win(player: Player) {
        for (const [, otherPlayer] of [...this.players].filter(
            (player) => player[1].name !== player[1].name
        )) {
            const points = otherPlayer.tiles.reduce(
                (prev, cur) => prev + Points.letter(cur),
                0
            );
            player.points += points;
            otherPlayer.points -= points;
        }
    }

    private getTurnOrder() {
        this.log.std(`Deciding turn order...`);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const turnOrder: { [playername: string]: number } = {};
        for (const player of this.players.values()) {
            const randomTile = (Object.keys(TILES) as Tile[])[
                Math.floor(Math.random() * 25)
            ];
            this.log.std(`${player.name} randomly picked ${randomTile}`);
            turnOrder[player.name] =
                randomTile === "BLANK" ? 0 : alphabet.indexOf(randomTile) + 1;
        }
        const sortedTurnOrder = Object.entries(turnOrder).sort(
            (a, b) => a[1] - b[1]
        );
        this.log.important(
            `Turn order: ${sortedTurnOrder
                .map(([playerName]) => playerName)
                .join(" -> ")}`
        );
        return new Map(
            sortedTurnOrder.map(([playerName]) => [
                playerName,
                this.players.get(playerName)!,
            ])
        );
    }

    private nextPlayer() {
        const playersArr = [...this.players];
        const curPlayerIdx = playersArr.findIndex(
            ([playerName]) => this.curPlayer.name === playerName
        );
        const nextPlayerIdx =
            curPlayerIdx === playersArr.length - 1 ? 0 : curPlayerIdx + 1;
        return playersArr[nextPlayerIdx][1];
    }
}
