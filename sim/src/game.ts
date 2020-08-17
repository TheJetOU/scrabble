export class Game {
    totalPlayers: number;
    constructor(public players: string[]) {
        this.totalPlayers = this.players.length;
    }
}
