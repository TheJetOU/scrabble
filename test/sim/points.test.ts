import { Points } from "../../sim/src/points";
import { Square } from "../../sim/src/square";

describe("Points", () => {
    describe("#calculatePoints", () => {
        describe("Modifiers", () => {
            it("should double the letter that hits a DLS", () => {
                const points = Points.calculatePoints("DAB", [
                    new Square("A4", "D"),
                    new Square("A5", "A"),
                    new Square("A6", "B"),
                ]);
                expect(points).toEqual(8);
            });
            it("should triple the letter that hits a TLS", () => {
                const points = Points.calculatePoints("DAB", [
                    new Square("B6", "D"),
                    new Square("B7", "A"),
                    new Square("B8", "B"),
                ]);
                expect(points).toEqual(10);
            });
            it("should double the word if it hits a DWS", () => {
                const points = Points.calculatePoints("DAB", [
                    new Square("B2"),
                    new Square("B3"),
                    new Square("B4"),
                ]);
                expect(points).toEqual(12);
            });
            it("should triple the word if it hits a TWS", () => {
                const points = Points.calculatePoints("DAB", [
                    new Square("A1"),
                    new Square("A2"),
                    new Square("A3"),
                ]);
                expect(points).toEqual(18);
            });
            it("should apply word multipliers last", () => {
                const points = Points.calculatePoints("POGU", [
                    new Square("A1"),
                    new Square("A2"),
                    new Square("A3"),
                    new Square("A4", "U"),
                ]);
                expect(points).toEqual(24);
            });
        });
        it("should calculate correctly", () => {
            const points = Points.calculatePoints("AE", [
                new Square("A2"),
                new Square("A3"),
            ]);
            expect(points).toEqual(2);
        });
        it("should add fifty points if all seven tiles are used", () => {
            const points = Points.calculatePoints("AEILNOR", [
                new Square("K1"),
                new Square("K2"),
                new Square("K3"),
                new Square("K4"),
                new Square("K6"),
                new Square("K7"),
                new Square("K8"),
            ]);
            expect(points).toEqual(57);
        });
    });
});
