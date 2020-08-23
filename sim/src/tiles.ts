import { Player } from "./common";
import { Log } from "./log";

export const TILES = {
    BLANK: 2,
    A: 9,
    B: 2,
    C: 2,
    D: 4,
    E: 12,
    F: 2,
    G: 3,
    H: 2,
    I: 9,
    J: 1,
    K: 1,
    L: 4,
    M: 2,
    N: 6,
    P: 2,
    Q: 1,
    R: 6,
    S: 4,
    T: 6,
    U: 4,
    V: 2,
    W: 2,
    X: 1,
    Y: 2,
    Z: 1,
} as const;

export type Tile = keyof typeof TILES;

export class Bag {
    private readonly bag: { [tile in Tile]: number } = Object.assign({}, TILES);

    constructor(private readonly players: Map<string, Player>) {}

    initialDraw() {
        for (const player of this.players.values()) {
            this.giveTiles(player, 7);
        }
    }

    exchangeTiles(player: Player, tiles: Tile[]) {
        if (tiles.length > 7 && tiles.length < 1) {
            Log.error("Can only exchange one to seven tiles");
        }
        const tileCharacters = Object.keys(TILES) as Tile[];
        if (tiles.length > tileCharacters.length) {
            Log.error("Trying to take more tiles than available in the bag");
        }
        if (tileCharacters.length < 6) {
            Log.error("Cannot exchange tiles if six or fewer tiles remain");
        }
        for (const tile of tiles) {
            this.giveTiles(player, 1);
            this.bag[tile] += 1;
        }
    }

    giveTiles(player: Player, n: number) {
        const tiles: Tile[] = [];
        for (let i = 0; i < n; i++) {
            const randomNumber = Math.floor(Math.random() * 25);
            const [tile, left] = (Object.entries(this.bag) as [Tile, number][])[
                randomNumber
            ];
            if (left === 0) {
                i--;
                continue;
            }
            this.bag[tile] -= 1;
            player.tiles.push(tile);
            tiles.push(tile);
        }
        return tiles;
    }
}
