import { SmogonTourPointsCalculator } from "../stour-points-calc";

const SMOGON_TOUR_POINTS_CALCULATOR = new SmogonTourPointsCalculator({});

const BYE_REGEX = /^Bye(\s?\d+)?$/i;

const PLAYERLIST: Array<[[string, string], [string, string]]> = [
    [
        ["foo", "Foo"],
        ["bar", "Bar"],
    ],
    [
        ["baz", "Baz"],
        ["bye", "Bye"],
    ],
    [
        ["bye 2", "Bye 2"],
        ["qux", "Qux"],
    ],
    [
        ["bye 3", "Bye 3"],
        ["bye 4", "Bye 4"],
    ],
    [
        ["foo", "Foo"],
        ["baz", "Baz"],
    ],
    [
        ["qux", "Qux"],
        ["bye 3", "Bye 3"],
    ],
    [
        ["foo", "Foo"],
        ["qux", "Qux"],
    ],
];

describe("Smogon Tour Points Calculator", () => {
    describe("Matchup finder", () => {
        it("should include the correct matchups", () => {
            const players = SMOGON_TOUR_POINTS_CALCULATOR.getMatchups(PLAYERLIST);
            expect(players.get("baz")).toEqual(["bye", "foo"]);
        });
        it("keys should not include byes", () => {
            const players = SMOGON_TOUR_POINTS_CALCULATOR.getMatchups(PLAYERLIST);
            for (const playerID of players.keys()) {
                expect(playerID).not.toMatch(/^bye(\d+)?$/);
            }
        });
    });
    describe("Calculator", () => {
        it("should calculate points correctly", () => {
            const points = SMOGON_TOUR_POINTS_CALCULATOR.calculatePoints(PLAYERLIST);
            expect(points).toEqual({
                0: ["Bar", "Baz", "Qux"],
                2: ["Foo"],
            });
        });
        it("should not include byes", () => {
            const points = SMOGON_TOUR_POINTS_CALCULATOR.calculatePoints(PLAYERLIST);
            for (const players of Object.values(points)) {
                players.forEach((player) => {
                    expect(BYE_REGEX.test(player)).toBeFalsy();
                });
            }
        });
        it("should return names not IDs", () => {
            const points = SMOGON_TOUR_POINTS_CALCULATOR.calculatePoints(PLAYERLIST);
            for (const players of Object.values(points)) {
                players.forEach((player) => {
                    expect(player === player.toLowerCase()).toBeFalsy();
                });
            }
        });
    });
});
