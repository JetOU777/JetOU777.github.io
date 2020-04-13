const BYE_REGEX = /^Bye(\s?\d+)?$/i;
const VS_REGEX = /\s\u202F?vs\.?\u202F?\s/i;

const BOLD_REGEX = {
    OPEN: /\[B\]/i,
    CLOSE: /\[\/B\]/i,
};

const USER_REGEX = {
    OPEN: /\[USER=\d+\]/i,
    CLOSE: /\[\/USER\]/i,
};

export interface IMatchup {
    p1: string;
    p2: string;
    result: "win" | "loss" | "bye" | "unplayed";
}

function removeBBCode(player: string) {
    return player
        .replace(BOLD_REGEX.OPEN, "")
        .replace(BOLD_REGEX.CLOSE, "")
        .replace(USER_REGEX.OPEN, "")
        .replace(USER_REGEX.CLOSE, "");
}

export function parsePlayerlist(rawPlayerlist: string) {
    const matchups: IMatchup[] = [];
    for (const rawMatchup of rawPlayerlist.split("\n").map((el) => el.split(VS_REGEX))) {
        if (rawMatchup.length !== 2) continue;
        const [p1, p2] = rawMatchup;
        const matchup: IMatchup = {p1: removeBBCode(p1), p2: removeBBCode(p2), result: "unplayed"};
        if (p1.match(BYE_REGEX) || p2.match(BYE_REGEX)) {
            matchup.result = "bye";
        } else if (p2.match(BOLD_REGEX.OPEN)) {
            matchup.result = "loss";
        } else if (p1.match(BOLD_REGEX.CLOSE)) {
            matchup.result = "win";
        }
        matchups.push(matchup);
    }
    return matchups;
}

export function getWinners(matchups: IMatchup[]) {
    const winners = [];
    for (const matchup of matchups) {
        switch (matchup.result) {
            case "win":
                winners.push(matchup.p1);
                break;
            case "loss":
                winners.push(matchup.p2);
        }
    }
    return winners;
}
export function getLosers(matchups: IMatchup[]) {
    const losers = [];
    for (const matchup of matchups) {
        switch (matchup.result) {
            case "win":
                losers.push(matchup.p2);
                break;
            case "loss":
                losers.push(matchup.p1);
        }
    }
    return losers;
}
export function getByeWins(matchups: IMatchup[]) {
    const byeWins = [];
    for (const matchup of matchups) {
        if (matchup.result === "bye") {
            const winner = matchup.p1.match(BYE_REGEX) ? matchup.p2 : matchup.p1;
            byeWins.push(winner);
        }
    }
    return byeWins;
}
export function getUnplayedGames(matchups: IMatchup[]) {
    const unplayed = [];
    for (const matchup of matchups) {
        if (matchup.result === "unplayed") {
            unplayed.push(`${matchup.p1} vs ${matchup.p2}`);
        }
    }
    return unplayed;
}

function handleClick(button: HTMLButtonElement) {
    const playerlist = (document.getElementById("playerlist") as HTMLInputElement | undefined)?.value;
    if (!playerlist) return;
    const renderPlaylist = (newPlayerlist: string) => {
        const mainpulatedPlayerlist = document.getElementById("mainpulated-playerlist");
        if (mainpulatedPlayerlist) {
            mainpulatedPlayerlist.innerHTML = newPlayerlist;
        }
    };
    const parsedPlayerlist = parsePlayerlist(playerlist);
    switch (button.id) {
        case "getwinners":
            renderPlaylist(getWinners(parsedPlayerlist).join("\n"));
            break;
        case "getlosers":
            renderPlaylist(getLosers(parsedPlayerlist).join("\n"));
            break;
        case "getbyewins":
            renderPlaylist(getByeWins(parsedPlayerlist).join("\n"));
            break;
        case "getunplayedgames":
            renderPlaylist(getUnplayedGames(parsedPlayerlist).join("\n"));
    }
}

// @ts-ignore
if (process.title === "browser") {
    const buttonids = ["getwinners", "getlosers", "getbyewins", "getunplayedgames"];
    buttonids.map((buttonid) => {
        const button = document.getElementById(buttonid) as HTMLButtonElement;
        button?.addEventListener("click", () => handleClick(button));
    });
}
