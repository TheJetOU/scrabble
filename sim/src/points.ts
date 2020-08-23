import { Square } from "./square";

// Letter -> Points it gives
const LETTER_POINTS: { [letter: string]: number } = {
    BLANK: 0,

    A: 1,
    E: 1,
    I: 1,
    L: 1,
    N: 1,
    O: 1,
    R: 1,
    S: 1,
    T: 1,
    U: 1,

    D: 2,
    G: 2,

    B: 3,
    C: 3,
    M: 3,
    P: 3,

    F: 4,
    H: 4,
    V: 4,
    W: 4,
    Y: 4,

    K: 5,

    J: 8,
    X: 8,

    Q: 10,
    Z: 10,
} as const;

export const Points = {
    /**
     * @param squareType [Square Type -> [letter that hit it]][]
     */
    calculatePoints(word: string, squares: Square[]) {
        let points = word
            .split("")
            .reduce((prev, cur) => prev + Points.letter(cur), 0);
        // Word multipliers are applied last, so move them to the end
        const sorted = squares.sort((a, b) => {
            if (!a.type.includes("word") && b.type.includes("word")) return -1;
            if (!b.type.includes("word") && a.type.includes("word")) return 1;
            return 0;
        });
        for (const { type, tile } of sorted) {
            switch (type) {
                case "regular":
                    break;
                case "doubleletterscore":
                    points += Points.letter(tile!);
                    break;
                case "tripleletterscore":
                    points += Points.letter(tile!) * 2;
                    break;
                case "doublewordscore":
                    points *= 2;
                    break;
                case "triplewordscore":
                    points *= 3;
                    break;
                default:
                    throw new Error(
                        `Attempted to use non-existent square type: ${type}`
                    );
            }
        }
        if (sorted.length === 7) points += 50;
        return points;
    },

    letter(tile: string) {
        if (tile === " ") tile = "BLANK";
        const points = LETTER_POINTS[tile];
        if (points === undefined) {
            throw new Error(
                `Attempted to calculate points for non-existent tile: ${tile}`
            );
        }
        return points;
    },
};
