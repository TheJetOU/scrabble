import { Points } from "../../sim/src/points";
import { Square } from "../../sim/src/square";

describe("Points", () => {
    describe("#calculatePoints", () => {
        describe("Modifiers", () => {
            it("should double the letter that hits a DLS", () => {
                const points = Points.calculatePoints([
                    new Square("A4", "D"),
                    new Square("A5", "A"),
                    new Square("A6", "B"),
                ]);
                expect(points).toEqual(8);
            });
            it("should triple the letter that hits a TLS", () => {
                const points = Points.calculatePoints([
                    new Square("B6", "D"),
                    new Square("B7", "A"),
                    new Square("B8", "B"),
                ]);
                expect(points).toEqual(10);
            });
            it("should double the word if it hits a DWS", () => {
                const points = Points.calculatePoints([
                    new Square("B2", "D"),
                    new Square("B3", "A"),
                    new Square("B4", "B"),
                ]);
                expect(points).toEqual(12);
            });
            it("should triple the word if it hits a TWS", () => {
                const points = Points.calculatePoints([
                    new Square("A1", "D"),
                    new Square("A2", "A"),
                    new Square("A3", "B"),
                ]);
                expect(points).toEqual(18);
            });
            it("should apply word multipliers last", () => {
                const points = Points.calculatePoints([
                    new Square("A1", "P"),
                    new Square("A2", "O"),
                    new Square("A3", "G"),
                    new Square("A4", "U"),
                ]);
                expect(points).toEqual(24);
            });
            it("should ignore modifiers if Square#modifierUsed is true", () => {
                const square = new Square("A4", "D");
                square.modifierUsed = true;
                const points = Points.calculatePoints([
                    square,
                    new Square("A5", "A"),
                    new Square("A6", "B"),
                ]);
                expect(points).toEqual(6);
            });
        });
        it("should calculate correctly", () => {
            const points = Points.calculatePoints([
                new Square("A2", "A"),
                new Square("A3", "E"),
            ]);
            expect(points).toEqual(2);
        });
        it("should add fifty points if all seven tiles are used", () => {
            const points = Points.calculatePoints([
                new Square("K1", "A"),
                new Square("K2", "E"),
                new Square("K3", "I"),
                new Square("K4", "L"),
                new Square("K6", "N"),
                new Square("K7", "O"),
                new Square("K8", "R"),
            ]);
            expect(points).toEqual(57);
        });
    });
});
