import * as React from "react";
import * as ReactDOM from "react-dom";

const BYE_REGEX = /^Bye(\s?\d+)?$/i;

const BOLD_REGEX = {
    OPEN: /\[B\]/i,
    CLOSE: /\[\/B\]/i,
};

const USER_REGEX = {
    OPEN: /\[USER=\d+\]/i,
    CLOSE: /\[\/USER\]/i,
};

const camelCaseToTitle = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
};

export interface IMatchup {
    p1: string;
    p2: string;
    result: "win" | "loss" | "bye" | "unplayed";
}

export class PlayerlistManipulator extends React.Component<{}, {
    rawPlayerlist: string,
    manipulatedPlayerlist: string,
}> {
    state = {
        rawPlayerlist: "",
        manipulatedPlayerlist: "",
    };

    parsePlayerlist(rawPlayerlist: string) {
        const matchups: IMatchup[] = [];
        for (const rawMatchup of rawPlayerlist.split("\n").map((el) => el.split(/ vs\.? /gi))) {
            if (rawMatchup.length !== 2) continue;
            const [p1, p2] = rawMatchup;
            const matchup: IMatchup = {p1: this.removeBBCode(p1), p2: this.removeBBCode(p2), result: "unplayed"};
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

    getWinners(matchups: IMatchup[]) {
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
    getLosers(matchups: IMatchup[]) {
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
    getByeWins(matchups: IMatchup[]) {
        const byeWins = [];
        for (const matchup of matchups) {
            if (matchup.result === "bye") {
                const winner = matchup.p1.match(BYE_REGEX) ? matchup.p2 : matchup.p1;
                byeWins.push(winner);
            }
        }
        return byeWins;
    }
    getUnplayedGames(matchups: IMatchup[]) {
        const unplayed = [];
        for (const matchup of matchups) {
            if (matchup.result === "unplayed") {
                unplayed.push(`${matchup.p1} vs ${matchup.p2}`);
            }
        }
        return unplayed;
    }

    removeBBCode(player: string) {
        return player
            .replace(BOLD_REGEX.OPEN, "")
            .replace(BOLD_REGEX.CLOSE, "")
            .replace(USER_REGEX.OPEN, "")
            .replace(USER_REGEX.CLOSE, "");
    }

    render() {
        return (
            <React.Fragment>
                <textarea onChange={(e) => this.setState({ rawPlayerlist: e.target.value })}></textarea>
                {
                    (["getWinners", "getLosers", "getByeWins", "getUnplayedGames"] as const).map((funcName, i) => {
                        return <button key={i} className="sml" onClick={() => {
                            const parsedPlayerlist = this.parsePlayerlist(this.state.rawPlayerlist);
                            return this.setState({
                                manipulatedPlayerlist: this[funcName](parsedPlayerlist).join("\n"),
                            });
                        }}>{camelCaseToTitle(funcName)}</button>;
                    })
                }
                <textarea value={this.state.manipulatedPlayerlist}
                    placeholder="The manipulated output will be here..." readOnly>
                </textarea>
            </React.Fragment>
        );
    }
}

// @ts-ignore
if (process.title === "browser") {
    ReactDOM.render(
        <PlayerlistManipulator />,
        document.getElementById("playerlist-manipulator"),
    );
}
