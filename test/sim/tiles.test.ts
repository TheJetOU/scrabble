import { Log } from "../../sim/src/log";
import { createPlayer } from "../../sim/src/player";
import { Bag } from "../../sim/src/tiles";

const PLAYERS = new Map(
    ["Kaido", "King", "Queen", "Jack"].map((player) => [
        player,
        createPlayer(player),
    ])
);

describe("Tiles", () => {
    describe("Bag", () => {
        describe("#exchangeTiles", () => {
            it("should only be able to exchange one to seven tiles", () => {
                const bag = new Bag(PLAYERS, new Log());
                expect(bag.exchangeTiles([...PLAYERS][0][1], [])).toBeFalsy();
                expect(
                    bag.exchangeTiles(
                        [...PLAYERS][0][1],
                        new Array(8).fill("A", 0, 8)
                    )
                ).toBeFalsy();
            });
            it("should not be able to take more tiles than available in the bag", () => {
                const bag = new Bag(PLAYERS, new Log());
                // @ts-expect-error: hacky but whatever
                bag.bag = { Z: 1 };
                expect(
                    bag.exchangeTiles([...PLAYERS][0][1], ["A", "A", "A"])
                ).toBeFalsy();
            });
            it("should not be able to exchange if six or fewer tiles remain", () => {
                const bag = new Bag(PLAYERS, new Log());
                // @ts-expect-error: hacky but whatever
                bag.bag = { A: 5, B: 1 };
                expect(
                    bag.exchangeTiles([...PLAYERS][0][1], ["A"])
                ).toBeFalsy();
            });
            it("should remove exchanged tiles from the bag", () => {
                const bag = new Bag(PLAYERS, new Log());
                const tiles = bag.remainingTiles;
                expect(bag.exchangeTiles([...PLAYERS][0][1], ["A"]));
                expect(bag.remainingTiles).toEqual(tiles - 1);
            });
        });
        describe("#giveRandomTiles", () => {
            it("should remove given tiles from the bag", () => {
                const bag = new Bag(PLAYERS, new Log());
                const tiles = bag.remainingTiles;
                expect(bag.giveRandomTiles([...PLAYERS][0][1], 1));
                expect(bag.remainingTiles).toEqual(tiles - 1);
            });
        });
    });
});
