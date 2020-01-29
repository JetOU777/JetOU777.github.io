import { PlayerlistDuplicatesFinder } from "../playerlist-duplicates-finder";

const duplicatesFinder = new PlayerlistDuplicatesFinder({});

describe("Playerlist Duplicates Finder", () => {
    describe("Duplicates Counter", () => {
        it("should count duplicates correctly", () => {
            expect(duplicatesFinder.findDuplicates(["foo", "foo", "bar"])).toEqual({
                foo: 2,
                bar: 1,
            });
        });
    });
    describe("Formatter", () => {
        it("should ignore duplicates less than two", () => {
            expect(duplicatesFinder.formatDuplicates({
                foo: 2,
                bar: 1,
            })).not.toContain(`bar signed up 1 time(s)`);
        });
        it("should sort by descending order", () => {
            expect(duplicatesFinder.formatDuplicates({
                foo: 3,
                bar: 2,
            })).toMatch(`foo signed up 3 time(s).\nbar signed up 2 time(s).`);
        });
    });
});
