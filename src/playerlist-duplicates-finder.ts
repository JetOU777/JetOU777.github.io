const BYE_REGEX = /^Bye(\s?\d+)?$/i;

function getPlayers(playerlist: string) {
    const players: string[] = [];
    for (const matchup of playerlist.split("\n").map((el) => el.split(/ vs.? /gi))) {
        if (matchup.length !== 2) continue;
        const [p1, p2] = matchup;
        if (!BYE_REGEX.test(p1)) {
            players.push(p1);
        }
        if (!BYE_REGEX.test(p2)) {
            players.push(p2);
        }
    }
    return players;
}
export function findDuplicates(players: string[]) {
    const duplicates: {[player: string]: number} = {};
    for (const player of players) {
        const occurence = duplicates[player];
        duplicates[player] = occurence === undefined ? 1 : occurence + 1;
    }
    return duplicates;
}
export function formatDuplicates(duplicates: {[player: string]: number}) {
    return (Object.entries(duplicates) as any as Array<[string, number]>)
        // Sort by descending order
        .sort((a, b) => a[1] > b[1] ? -1 : 1)
        .reduce<string>((accumulator, [player, occurence]) => {
            if (occurence > 1) {
                accumulator +=  `${player} signed up ${occurence} time(s).\n`;
            }
            return accumulator;
        }, "");
}

// @ts-ignore
if (process.title === "browser") {
    const button = document.getElementById("duplicates-finder");
    button?.addEventListener("click", () => {
        const playerlist = (document.getElementById("playerlist") as HTMLInputElement | undefined)?.value;
        if (playerlist) {
            const duplicates = document.getElementById("duplicates");
            if (duplicates) {
                duplicates.innerHTML = formatDuplicates(findDuplicates(getPlayers(playerlist)));
            }
        }
    });
}
