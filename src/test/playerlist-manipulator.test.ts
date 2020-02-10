import { IMatchup, PlayerlistManipulator } from "../playerlist-manipulator";

const manipulator = new PlayerlistManipulator({});

const RAW_PLAYERLIST = `[B]foo[/B] vs bar\nbaz vs [b]qux\nquux[/b] vs quuz\ncorge vs grault\ngarply vs Bye 1`;

const MATCHUPS: IMatchup[] = [
    {
        p1: "foo",
        p2: "bar",
        result: "win",
    },
    {
        p1: "baz",
        p2: "qux",
        result: "loss",
    },
    {
        p1: "quux",
        p2: "quuz",
        result: "win",
    },
    {
        p1: "corge",
        p2: "grault",
        result: "unplayed",
    },
    {
        p1: "garply",
        p2: "Bye 1",
        result: "bye",
    },
];

describe("Playerlist Manipulator", () => {
    describe("Parser", () => {
        it("should remove bold BBCode from players", () => {
            const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[0].p1).toEqual("foo");
        });
        it("should remove uncapitalized bold BBCode from players", () => {
            const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[1].p2).toEqual("qux");
        });
        describe("Wins/Losses", () => {
            it("should handle bold on the same line", () => {
                const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
                expect(matchups[0].result).toEqual("win");
            });
            it("should handle bold on a new line", () => {
                const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
                expect(matchups[1].result).toEqual("loss");
                expect(matchups[2].result).toEqual("win");
            });
        });
        it("should handle unplayed games", () => {
            const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[3].result).toEqual("unplayed");
        });
        it("should handle unplayed games", () => {
            const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[3].result).toEqual("unplayed");
        });
        it("should handle byes", () => {
            const matchups = manipulator.parsePlayerlist(RAW_PLAYERLIST);
            expect(matchups[4].result).toEqual("bye");
        });
    });
    it("should get the correct winners", () => {
        const winners = manipulator.getWinners(MATCHUPS);
        expect(winners).toEqual(["foo", "qux", "quux"]);
    });
    it("should get the correct losers", () => {
        const losers = manipulator.getLosers(MATCHUPS);
        expect(losers).toEqual(["bar", "baz", "quuz"]);
    });
    it("should get the correct bye winners", () => {
        const byeWins = manipulator.getByeWins(MATCHUPS);
        expect(byeWins).toEqual(["garply"]);
    });
    it("should get the correct unplayed games", () => {
        const unplayed = manipulator.getUnplayedGames(MATCHUPS);
        expect(unplayed).toEqual(["corge vs grault"]);
    });
});
