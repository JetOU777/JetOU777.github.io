const BYE_REGEX = /^Bye(\s?\d+)?$/i;

/** round -> points */
const SMOGON_TOUR_POINTS: {[k: number]: number} = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    5: 7,
    6: 9,
    7: 11,
    8: 13,
};

function parsePlayerlist(playerlist: string) {
    const players: Array<[[string, string], [string, string]]> = [];
    for (const matchup of playerlist.split("\n").map((el) => el.split(/ vs.? /gi))) {
        if (matchup.length !== 2) continue;
        const [p1, p2] = matchup;
        players.push([[p1.toLowerCase(), p1], [p2.toLowerCase(), p2]]);
    }
    return players;
}
/**
 * Returns a map of a player and each player they faced.
 */
export function getMatchups(players: Array<[[string, string], [string, string]]>) {
    const matchups = new Map<string, string[]>();
    for (const [[p1ID], [p2ID]] of players) {
        if (!BYE_REGEX.test(p1ID)) {
            const p1Matchups = matchups.get(p1ID);
            matchups.set(p1ID, (p1Matchups || []).concat(p2ID));
        }
        if (!BYE_REGEX.test(p2ID)) {
            const p2Matchups = matchups.get(p2ID);
            matchups.set(p2ID, (p2Matchups || []).concat(p1ID));
        }
    }
    return matchups;
}
export function calculatePoints(players: Array<[[string, string], [string, string]]>) {
    const matchups = getMatchups(players);
    const points: {[point: number]: string[]} = {};
    const flatPlayers = players.reduce<{[playerID: string]: string}>((acc, cur) => {
        const [[p1ID, p1], [p2ID, p2]] = cur;
        acc[p1ID] = p1;
        acc[p2ID] = p2;
        return acc;
    }, {});
    for (const [playerID, mus] of matchups.entries()) {
        const byeMatchups = mus.filter((mu) => BYE_REGEX.test(mu));
        const point = SMOGON_TOUR_POINTS[byeMatchups.length + 1 === mus.length ? 0 : mus.length - 1];
        points[point] = (points[point] || []).concat(flatPlayers[playerID]);
    }
    return points;
}
export function formatPoints(points: {[points: string]: string[]}, showPoints = true) {
    return (Object.entries(points) as any as Array<[number, string[]]>).map(([point, players]) => {
       return (showPoints ? point + " point(s)\n" : "") + players.join(", ") + "\n";
    }).join("\n");
}

function handleClick(button: HTMLButtonElement) {
    const playerlist = (document.getElementById("playerlist") as HTMLInputElement)?.value;
    if (!playerlist) return;
    const renderPoints = (newPoints: string) => {
        const points = document.getElementById("points");
        if (points) {
            points.innerHTML = newPoints;
        }
    };
    switch (button.id) {
        case "calcpoints-showpointsnum":
            renderPoints(formatPoints(calculatePoints(parsePlayerlist(playerlist)), true));
            break;
        case "calcpoints-nopointsnum":
            renderPoints(formatPoints(calculatePoints(parsePlayerlist(playerlist)), false));
    }
}

// @ts-ignore
if (process.title === "browser") {
    const buttonids = ["calcpoints-showpointsnum", "calcpoints-nopointsnum"];
    buttonids.map((buttonid) => {
        const button = document.getElementById(buttonid) as HTMLButtonElement;
        button?.addEventListener("click", () => handleClick(button));
    });
}
