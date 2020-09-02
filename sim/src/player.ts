import { Tile } from "./tiles";
import { Log } from "./log";

export interface Player {
    name: string;
    points: number;
    tiles: Tile[];
    log: Log;
}

export function createPlayer(name: string): Player {
    return { name, points: 0, tiles: [], log: new Log() };
}
