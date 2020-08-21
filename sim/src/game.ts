import { Player } from "./common";
import { Tiles, Tile } from "./tiles";
import { Board } from "./board";
import { Points } from "./points";

export class Game {
    private readonly board: Board;
    private readonly tiles: Tiles;
    readonly turnOrder: Player[];
    curPlayer: Player;
    constructor(public players: Player[]) {
        this.turnOrder = this.getTurnOrder();
        this.curPlayer = this.turnOrder[0];
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

    // TODO: Actually implement
    private getTurnOrder() {
        const turnOrder: Player[] = [];
        this.players.forEach((player) => turnOrder.push(player));
        return turnOrder;
    }

    private nextPlayer() {
        const curPlayerIdx = this.players.indexOf(this.curPlayer);
        const nextPlayerIdx = curPlayerIdx === this.players.length ? 0 : curPlayerIdx + 1;
        return this.players[nextPlayerIdx];
    }
}
