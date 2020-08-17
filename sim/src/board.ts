export type SquareType =
    | "regular"
    | "doubleletterscore"
    | "tripleletterscore"
    | "doublewordscore"
    | "triplewordscore";

type Squares = { [cell: string]: { type: SquareType } };

const SQUARES: Squares = {
    a1: { type: "triplewordscore" },
    a2: { type: "regular" },
    a3: { type: "regular" },
    a4: { type: "doubleletterscore" },
    // TODO: write the rest
};
