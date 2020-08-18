import { Player } from "./common";
import { Tiles } from "./tiles";
import { Board } from "./board";
import { Points } from "./points";

export class Game {
    turnOrder: Player[];
    totalPlayers: number;
    board: Board;
    points: Points;
    tiles: Tiles;
    constructor(public players: Set<Player>) {
        this.turnOrder = this.getTurnOrder();
        this.totalPlayers = this.players.size;
        this.tiles = new Tiles(this.players);
        this.tiles.initialDraw();
        this.points = new Points(this.players);
        this.board = new Board(this.players, this.turnOrder, this.points, this.tiles);
    }

    // TODO: Actually implement
    getTurnOrder() {
        const turnOrder: Player[] = [];
        this.players.forEach((player) => turnOrder.push(player));
        return turnOrder;
    }
}
