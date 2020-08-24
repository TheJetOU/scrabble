import { Player } from "./common";
import { TILES, Bag, Tile } from "./tiles";
import { Board } from "./board";
import { Points } from "./points";
import { Log } from "./log";

export class Game {
    private readonly board: Board;
    private readonly tiles: Bag;
    readonly turnOrder: Map<string, Player>;
    readonly log: Log = new Log();
    curPlayer: Player;
    constructor(public players: Map<string, Player>) {
        this.turnOrder = this.getTurnOrder();
        this.curPlayer = [...this.turnOrder][0][1];
        this.tiles = new Bag(this.players, this.log);
        this.tiles.initialDraw();
        this.board = new Board(this.log);
    }

    move(tiles: Tile[], startingCell: string) {
        // TODO: handle blank tiles
        const result = this.board.move(tiles, startingCell);
        if (!result) return;
        const { squaresUsed, word } = result;
        this.curPlayer.points += Points.calculatePoints(word, squaresUsed);
        const newTiles = this.tiles.giveTiles(
            this.curPlayer,
            this.curPlayer.tiles.length
        );
        if (!newTiles.length && this.curPlayer.tiles.length === tiles.length) {
            this.win(this.curPlayer);
        }
        this.tiles.giveTiles(this.curPlayer, newTiles.length);
        this.curPlayer = this.nextPlayer();
    }

    skip() {
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
        this.log.important(`Turn order: ${sortedTurnOrder.join(" -> ")}`);
        return new Map(
            Object.keys(sortedTurnOrder).map((playername) => [
                playername,
                this.players.get(playername)!,
            ])
        );
    }

    private nextPlayer() {
        const playersArr = [...this.players];
        const curPlayerIdx = playersArr.indexOf([
            this.curPlayer.name,
            this.curPlayer,
        ]);
        const nextPlayerIdx =
            curPlayerIdx === this.players.size ? 0 : curPlayerIdx + 1;
        return playersArr[nextPlayerIdx][1];
    }
}
