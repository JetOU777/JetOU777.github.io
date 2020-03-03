import * as React from "react";
import * as ReactDOM from "react-dom";

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

export class SmogonTourPointsCalculator extends React.Component<{}, {
    points: string;
    playerlist: string,
}> {
    state = {
        points: "",
        playerlist: "",
    };
    parsePlayerlist(playerlist: string) {
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
    getMatchups(players: Array<[[string, string], [string, string]]>) {
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
    calculatePoints(players: Array<[[string, string], [string, string]]>) {
        // TODO: write tests
        const matchups = this.getMatchups(players);
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
    formatPoints(points: {[points: string]: string[]}, showPoints = true) {
        return (Object.entries(points) as any as Array<[number, string[]]>).map(([point, players]) => {
           return (showPoints ? point + " point(s)\n" : "") + players.join(", ") + (showPoints ? "\n" : "");
        }).join("\n");
    }
    render() {
        return (
            <React.Fragment>
                <textarea onChange={(e) => {
                    this.setState({
                        playerlist: e.target.value,
                    });
                }}>
                </textarea>
                <button onClick={() => this.setState({
                    points: this.formatPoints(this.calculatePoints(this.parsePlayerlist(this.state.playerlist)), true),
                })}>
                    Calculate Points (show point numbers)
                </button>
                <button onClick={() => this.setState({
                    points: this.formatPoints(this.calculatePoints(this.parsePlayerlist(this.state.playerlist)), false),
                })}>
                    Calculate Points (don't show points numbers)
                </button>
                <textarea value={this.state.points} placeholder="Points will be here" readOnly>
                </textarea>
            </React.Fragment>
        );
    }
}

// @ts-ignore
if (process.title === "browser") {
    ReactDOM.render(
        <SmogonTourPointsCalculator />,
        document.getElementById("stour-points-calc"),
    );
}
