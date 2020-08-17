import { Player } from "./common";

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
};

export type Tile = keyof typeof TILES;

export class Tiles {
    private readonly bag = Object.assign({}, TILES);

    constructor(private readonly players: Player[]) {}

    initialDraw() {
        for (const player of this.players) {
            player.tiles = this.getTiles(7);
        }
    }

    exchangeTiles(player: Player, tiles: Tile[]) {
        if (tiles.length > 7 && tiles.length < 1) {
            throw new Error("Can only exchange one to seven tiles");
        }
        const tileCharacters = Object.keys(TILES) as Tile[];
        if (tiles.length < tileCharacters.length) {
            throw new Error("Trying to take more tiles than available in the bag");
        }
        if (tileCharacters.length < 6) {
            throw new Error("Cannot exchange tiles if six or fewer tiles remain");
        }
        for (const [idx, tile] of tiles.entries()) {
            const newTile = this.getTiles(1);
            player.tiles.splice(idx, 1);
            player.tiles.push(newTile[0]);
            this.bag[tile] += 1;
        }
    }

    private getTiles(numberOfTiles: number) {
        const tiles: Tile[] = [];
        for (let i = 0; i < numberOfTiles; i++) {
            const randomNumber = Math.floor(Math.random() * 27);
            const [tile, left] = (Object.entries(this.bag) as [Tile, number][])[randomNumber];
            if (left === 0) {
                i -= 1;
                continue;
            }
            this.bag[tile] -= 1;
            tiles.push(tile);
        }
        return tiles;
    }
}
