import { Tile } from "./tiles";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export type SquareType =
    | "regular"
    | "doubleletterscore"
    | "tripleletterscore"
    | "doublewordscore"
    | "triplewordscore";

export interface ISquare {
    type: SquareType;
    tile?: Tile;
}

type Squares = { [cell: string]: ISquare };

const SQUARES: Squares = {
    A1: { type: "triplewordscore" },
    A2: { type: "regular" },
    A3: { type: "regular" },
    A4: { type: "doubleletterscore" },
    A5: { type: "regular" },
    A6: { type: "regular" },
    A7: { type: "regular" },
    A8: { type: "triplewordscore" },
    A9: { type: "regular" },
    A10: { type: "regular" },
    A11: { type: "regular" },
    A12: { type: "doubleletterscore" },
    A13: { type: "regular" },
    A14: { type: "regular" },
    A15: { type: "triplewordscore" },

    B1: { type: "regular" },
    B2: { type: "doublewordscore" },
    B3: { type: "regular" },
    B4: { type: "regular" },
    B5: { type: "regular" },
    B6: { type: "tripleletterscore" },
    B7: { type: "regular" },
    B8: { type: "regular" },
    B9: { type: "regular" },
    B10: { type: "tripleletterscore" },
    B11: { type: "regular" },
    B12: { type: "regular" },
    B13: { type: "regular" },
    B14: { type: "doublewordscore" },
    B15: { type: "regular" },

    C1: { type: "regular" },
    C2: { type: "regular" },
    C3: { type: "doublewordscore" },
    C4: { type: "regular" },
    C5: { type: "regular" },
    C6: { type: "regular" },
    C7: { type: "doubleletterscore" },
    C8: { type: "regular" },
    C9: { type: "doubleletterscore" },
    C10: { type: "regular" },
    C11: { type: "regular" },
    C12: { type: "regular" },
    C13: { type: "doublewordscore" },
    C14: { type: "regular" },
    C15: { type: "regular" },

    D1: { type: "doubleletterscore" },
    D2: { type: "regular" },
    D3: { type: "regular" },
    D4: { type: "doublewordscore" },
    D5: { type: "regular" },
    D6: { type: "regular" },
    D7: { type: "regular" },
    D8: { type: "doubleletterscore" },
    D9: { type: "regular" },
    D10: { type: "regular" },
    D11: { type: "regular" },
    D12: { type: "doublewordscore" },
    D13: { type: "regular" },
    D14: { type: "regular" },
    D15: { type: "doubleletterscore" },

    E1: { type: "regular" },
    E2: { type: "regular" },
    E3: { type: "regular" },
    E4: { type: "regular" },
    E5: { type: "doublewordscore" },
    E6: { type: "regular" },
    E7: { type: "regular" },
    E8: { type: "regular" },
    E9: { type: "regular" },
    E10: { type: "regular" },
    E11: { type: "doublewordscore" },
    E12: { type: "regular" },
    E13: { type: "regular" },
    E14: { type: "regular" },
    E15: { type: "regular" },

    F1: { type: "regular" },
    F2: { type: "regular" },
    F3: { type: "tripleletterscore" },
    F4: { type: "regular" },
    F5: { type: "regular" },
    F6: { type: "tripleletterscore" },
    F7: { type: "regular" },
    F8: { type: "regular" },
    F9: { type: "regular" },
    F10: { type: "tripleletterscore" },
    F11: { type: "regular" },
    F12: { type: "regular" },
    F13: { type: "regular" },
    F14: { type: "tripleletterscore" },
    F15: { type: "regular" },

    G1: { type: "regular" },
    G2: { type: "regular" },
    G3: { type: "doubleletterscore" },
    G4: { type: "regular" },
    G5: { type: "regular" },
    G6: { type: "regular" },
    G7: { type: "doubleletterscore" },
    G8: { type: "regular" },
    G9: { type: "doubleletterscore" },
    G10: { type: "regular" },
    G11: { type: "regular" },
    G12: { type: "regular" },
    G13: { type: "doubleletterscore" },
    G14: { type: "regular" },
    G15: { type: "regular" },

    H1: { type: "triplewordscore" },
    H2: { type: "regular" },
    H3: { type: "regular" },
    H4: { type: "doubleletterscore" },
    H5: { type: "regular" },
    H6: { type: "regular" },
    H7: { type: "regular" },
    H8: { type: "doublewordscore" },
    H9: { type: "regular" },
    H10: { type: "regular" },
    H11: { type: "regular" },
    H12: { type: "doubleletterscore" },
    H13: { type: "regular" },
    H14: { type: "regular" },
    H15: { type: "triplewordscore" },

    I1: { type: "regular" },
    I2: { type: "regular" },
    I3: { type: "doubleletterscore" },
    I4: { type: "regular" },
    I5: { type: "regular" },
    I6: { type: "regular" },
    I7: { type: "doubleletterscore" },
    I8: { type: "regular" },
    I9: { type: "doubleletterscore" },
    I10: { type: "regular" },
    I11: { type: "regular" },
    I12: { type: "regular" },
    I13: { type: "doubleletterscore" },
    I14: { type: "regular" },
    I15: { type: "regular" },

    J1: { type: "regular" },
    J2: { type: "tripleletterscore" },
    J3: { type: "regular" },
    J4: { type: "regular" },
    J5: { type: "regular" },
    J6: { type: "tripleletterscore" },
    J7: { type: "regular" },
    J8: { type: "regular" },
    J9: { type: "regular" },
    J10: { type: "tripleletterscore" },
    J11: { type: "regular" },
    J12: { type: "regular" },
    J13: { type: "regular" },
    J14: { type: "tripleletterscore" },
    J15: { type: "regular" },

    K1: { type: "regular" },
    K2: { type: "regular" },
    K3: { type: "regular" },
    K4: { type: "regular" },
    K5: { type: "doublewordscore" },
    K6: { type: "regular" },
    K7: { type: "regular" },
    K8: { type: "regular" },
    K9: { type: "regular" },
    K10: { type: "regular" },
    K11: { type: "doublewordscore" },
    K12: { type: "regular" },
    K13: { type: "regular" },
    K14: { type: "regular" },
    K15: { type: "regular" },

    L1: { type: "doubleletterscore" },
    L2: { type: "regular" },
    L3: { type: "regular" },
    L4: { type: "doublewordscore" },
    L5: { type: "regular" },
    L6: { type: "regular" },
    L7: { type: "regular" },
    L8: { type: "doubleletterscore" },
    L9: { type: "regular" },
    L10: { type: "regular" },
    L11: { type: "regular" },
    L12: { type: "doublewordscore" },
    L13: { type: "regular" },
    L14: { type: "regular" },
    L15: { type: "doubleletterscore" },

    M1: { type: "regular" },
    M2: { type: "regular" },
    M3: { type: "doublewordscore" },
    M4: { type: "regular" },
    M5: { type: "regular" },
    M6: { type: "regular" },
    M7: { type: "doubleletterscore" },
    M8: { type: "regular" },
    M9: { type: "doubleletterscore" },
    M10: { type: "regular" },
    M11: { type: "regular" },
    M12: { type: "regular" },
    M13: { type: "doublewordscore" },
    M14: { type: "regular" },
    M15: { type: "regular" },

    N1: { type: "regular" },
    N2: { type: "doublewordscore" },
    N3: { type: "regular" },
    N4: { type: "regular" },
    N5: { type: "regular" },
    N6: { type: "tripleletterscore" },
    N7: { type: "regular" },
    N8: { type: "regular" },
    N9: { type: "regular" },
    N10: { type: "tripleletterscore" },
    N11: { type: "regular" },
    N12: { type: "regular" },
    N13: { type: "regular" },
    N14: { type: "doublewordscore" },
    N15: { type: "regular" },

    O1: { type: "triplewordscore" },
    O2: { type: "regular" },
    O3: { type: "regular" },
    O4: { type: "doubleletterscore" },
    O5: { type: "regular" },
    O6: { type: "regular" },
    O7: { type: "regular" },
    O8: { type: "triplewordscore" },
    O9: { type: "regular" },
    O10: { type: "regular" },
    O11: { type: "regular" },
    O12: { type: "doubleletterscore" },
    O13: { type: "regular" },
    O14: { type: "regular" },
    O15: { type: "triplewordscore" },
};

export class Square implements ISquare {
    readonly type: SquareType;
    private col: string;
    private row: string;

    constructor(public cell: string, public tile?: Tile) {
        this.type = SQUARES[this.cell].type;
        this.col = this.cell[0];
        this.row = this.cell.slice(1);
    }

    up(n?: number, all?: false): Square;
    up(n?: number, all?: true): Square[];
    up(n = 1, all = false) {
        const squares: Square[] = [];
        for (let i = 1; i < n + 1; i++) {
            const upwardRow = parseInt(this.row) - i;
            if (upwardRow > 15) {
                break;
            }
            const cell: string = this.col + upwardRow.toString();
            squares.push(new Square(cell));
        }
        return all ? squares : squares[squares.length - 1];
    }

    left(n?: number, all?: false): Square;
    left(n?: number, all?: true): Square[];
    left(n = 1, all = false) {
        const squares: Square[] = [];
        for (let i = 1; i < n + 1; i++) {
            const leftCol = ALPHABET.indexOf(this.col) + 1 - i;
            if (leftCol > 15) {
                break;
            }
            const cell = ALPHABET[leftCol] + this.row;
            squares.push(new Square(cell));
        }
        return all ? squares : squares[squares.length - 1];
    }

    right(n?: number, all?: false): Square;
    right(n?: number, all?: true): Square[];
    right(n = 1, all = false) {
        const squares: Square[] = [];
        for (let i = 1; i < n + 1; i++) {
            const rightCol = ALPHABET.indexOf(this.col) + 1 + i;
            if (rightCol > 15) {
                break;
            }
            const cell = ALPHABET[rightCol] + this.row;
            squares.push(new Square(cell));
        }
        return all ? squares : squares[squares.length - 1];
    }

    down(n?: number, all?: false): Square;
    down(n?: number, all?: true): Square[];
    down(n = 1, all = false) {
        const squares: Square[] = [];
        for (let i = 1; i < n + 1; i++) {
            const downwardRow = parseInt(this.row) + i;
            if (downwardRow > 15) {
                break;
            }
            const cell: string = this.col + downwardRow.toString();
            squares.push(new Square(cell));
        }
        return all ? squares : squares[squares.length - 1];
    }

    adjacentTiles() {
        const adjacentTiles = [
            this.up(),
            this.down(),
            this.left(),
            this.right(),
        ].filter((square) => square?.tile);
        return adjacentTiles.length ? adjacentTiles : null;
    }

    static all() {
        const squares: { [cell: string]: Square } = {};
        for (const key in SQUARES) {
            squares[key] = new Square(key);
        }
        return squares;
    }
}
