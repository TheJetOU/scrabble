import { Player } from "./player";
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
    O: 8,
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

    constructor(
        private readonly players: Map<string, Player>,
        private readonly log: Log
    ) {}

    initialDraw() {
        for (const player of this.players.values()) {
            this.giveRandomTiles(player, 7);
        }
    }

    exchangeTiles(player: Player, tiles: Tile[]) {
        if (tiles.length > 7 && tiles.length < 1) {
            player.log.error("Can only exchange one to seven tiles");
        }
        const tilesLeft = Object.values(this.bag).reduce(
            (prev, cur) => prev + cur,
            0
        );
        if (tiles.length > tilesLeft) {
            player.log.error(
                "Trying to take more tiles than available in the bag"
            );
        }
        if (tilesLeft < 6) {
            player.log.error(
                "Cannot exchange tiles if six or fewer tiles remain"
            );
        }
        this.log.important(`${player.name} exchanged ${tiles.length} tiles`);
        this.giveRandomTiles(player, tiles.length);
        for (const tile of tiles) {
            this.bag[tile] -= 1;
        }
    }

    giveRandomTiles(player: Player, n: number) {
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
        this.log.important(`${player.name} received ${tiles.join(", ")} tiles`);
        return tiles;
    }
}
