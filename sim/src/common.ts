import { Tile } from "./tiles";

export interface Player {
    name: string;
    points: number;
    tiles: Tile[];
}
