import { SquareType } from "./board";
import { Player } from "./common";

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
};

export class Points {
    constructor(public players: Set<Player>) {}

    /**
     * @param squareType Square Type -> [letter that hit it]
     */
    givePoints(player: Player, word: string, squareTypes: { [squareType in SquareType]: string }) {
        if (!this.players.has(player)) {
            throw new Error(`Attempted to add points for non-existent player: ${player}`);
        }
        let points = word.split("").reduce((prev, cur) => prev + Points.letter(cur), 0);
        // Word multipliers are applied last move the to the end
        const sorted = Object.entries(squareTypes).sort((a, b) => {
            if (a[0].includes("word") && !b[0].includes("word")) return -1;
            if (b[0].includes("word") && !a[0].includes("word")) return 1;
            return 0;
        }) as [SquareType, string][];
        for (const [squareType, letter] of sorted) {
            switch (squareType) {
                case "regular":
                    break;
                case "doubleletterscore":
                    points += Points.letter(letter);
                    break;
                case "tripleletterscore":
                    points += Points.letter(letter) * 2;
                    break;
                case "doublewordscore":
                    points *= 2;
                    break;
                case "triplewordscore":
                    points *= 3;
                    break;
                default:
                    throw new Error(`Attempted to use non-existent square type: ${squareType}`);
            }
        }
        if (sorted.length === 7) points += 50;
        player.points = points;
    }

    static letter(tile: string) {
        if (tile === " ") tile = "BLANK";
        const points = LETTER_POINTS[tile];
        if (points === undefined) {
            throw new Error(`Attempted to calculate points for non-existent tile: ${tile}`);
        }
        return points;
    }
}
