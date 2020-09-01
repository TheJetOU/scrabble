import { Tile } from "./tiles";

export interface Player {
    name: string;
    points: number;
    tiles: Tile[];
}

export function createPlayer(name: string): Player {
    return { name, points: 0, tiles: [] };
}
