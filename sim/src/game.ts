import { Player } from "./common";
import { Tiles, Tile, TILES } from "./tiles";
import { Board } from "./board";
import { Points } from "./points";
import { Log } from "./log";

export class Game {
    private readonly board: Board;
    private readonly tiles: Tiles;
    readonly turnOrder: Map<string, Player>;
    curPlayer: Player;
    constructor(public players: Map<string, Player>) {
        this.turnOrder = this.getTurnOrder();
        this.curPlayer = [...this.turnOrder][0][1];
        this.tiles = new Tiles(this.players);
        this.tiles.initialDraw();
        this.board = new Board();
    }

    move(tiles: Tile[], startingCell: string) {
        // TODO: handle blank tiles
        const result = this.board.move(tiles, startingCell);
        if (!result) return;
        const { squaresUsed, word } = result;
        this.curPlayer.points += Points.calculatePoints(word, squaresUsed);
        // FIXEME: exchanging tiles has some additional rules - add another method for this
        this.tiles.exchangeTiles(this.curPlayer, tiles);
        this.curPlayer = this.nextPlayer();
    }

    private getTurnOrder() {
        Log.std(`Deciding turn order...`);
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        const turnOrder: { [playername: string]: number } = {};
        for (const player of this.players.values()) {
            const randomTile = (Object.keys(TILES) as Tile[])[
                Math.floor(Math.random() * 25)
            ];
            Log.std(`${player.name} randomly picked ${randomTile}`);
            turnOrder[player.name] =
                randomTile === "BLANK" ? 0 : alphabet.indexOf(randomTile) + 1;
        }
        const sortedTurnOrder = Object.entries(turnOrder).sort(
            (a, b) => a[1] - b[1]
        );
        Log.important(`Turn order: ${sortedTurnOrder.join(" -> ")}`);
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
