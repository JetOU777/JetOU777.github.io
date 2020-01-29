import * as React from "react";
import * as ReactDOM from "react-dom";

const BYE_REGEX = /^Bye(\s?\d+)?$/i;

const BOLD_REGEX = {
    OPEN: /\[B\]/,
    CLOSE: /\[\/B\]/,
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
    matchups: IMatchup[] | undefined,
    manipulatedPlayerlist: string | undefined;
    mode: "mainpulator" | "editor",
}> {
    state = {
        rawPlayerlist: "",
        matchups: [] as IMatchup[],
        manipulatedPlayerlist: undefined,
        mode: "editor" as "mainpulator" | "editor",
    };

    parsePlayerlist(rawPlayerlist: string) {
        const removeBold = (player: string) => player.replace(BOLD_REGEX.OPEN, "").replace(BOLD_REGEX.CLOSE, "");
        const matchups: IMatchup[] = [];
        for (const rawMatchup of rawPlayerlist.split("\n").map((el) => el.split(/ vs\.? /gi))) {
            if (rawMatchup.length !== 2) continue;
            const [p1, p2] = rawMatchup;
            const matchup: IMatchup = {p1: removeBold(p1), p2: removeBold(p2), result: "unplayed"};
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

    resetPlayerlist = () => {
        this.setState({
            mode: "editor",
            manipulatedPlayerlist: undefined,
            matchups: undefined,
        });
    }

    render() {
        return (
            <React.Fragment>
                <textarea readOnly={this.state.mode === "mainpulator"}
                    value={this.state.manipulatedPlayerlist ?? this.state.rawPlayerlist} onChange={(e) => {
                    this.setState({
                        rawPlayerlist: e.target.value,
                    });
                }}></textarea>
                {this.state.mode === "editor"
                    ?
                        <button className="lrg" onClick={() => this.setState({
                            mode: "mainpulator",
                            matchups: this.parsePlayerlist(this.state.rawPlayerlist),
                        })}>
                            Mainpulate
                        </button>
                    :
                        (["getWinners", "getLosers", "getByeWins", "getUnplayedGames"] as const).map((funcName, i) => {
                            return <button className="sml" key={i} onClick={() => this.setState({
                                manipulatedPlayerlist: this[funcName](this.state.matchups).join("\n"),
                        })}>{camelCaseToTitle(funcName)}</button>;
                        }).concat(
                            <br />, <button className="lrg" onClick={this.resetPlayerlist}>Reset Playerlist</button>,
                        )
                }
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
