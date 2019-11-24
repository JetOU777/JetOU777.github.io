import * as React from "react";
import * as ReactDOM from "react-dom";

const BYE_REGEX = /^Bye(\s?\d+)?$/i;

export class PlayerlistDuplicatesFinder extends React.Component<{}, {
    /** player -> occurences  */
    duplicates: {[player: string]: number};
    playerlist: string;
}> {
    state = {
        duplicates: {},
        playerlist: "",
    };
    getPlayers(playerlist: string) {
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
    findDuplicates(players: string[]) {
        const duplicates: {[player: string]: number} = {};
        for (const player of players) {
            const occurence = duplicates[player];
            duplicates[player] = occurence === undefined ? 1 : occurence + 1;
        }
        return duplicates;
    }
    formatDuplicates(duplicates: {[player: string]: number}) {
        return (Object.entries(duplicates) as any as Array<[string, number]>)
            // Sort by descending order
            .sort((a, b) => {
                return a[1] > b[1] ? -1 : 1;
            })
            .reduce<string>((accumulator, [player, occurence]) => {
                if (occurence > 1) {
                    accumulator +=  `${player} signed up ${occurence} time(s).\n`;
                }
                return accumulator;
            }, "");
    }
    render() {
        return (
            <div className="playerlist-duplicates">
                <textarea onChange={(e) => {
                    this.setState({
                        playerlist: e.target.value,
                    });
                }}>
                </textarea>
                <button onClick={() => this.setState({
                    duplicates: this.findDuplicates(this.getPlayers(this.state.playerlist)),
                })}>
                    Find duplicates
                </button>
                <textarea value={this.formatDuplicates(this.state.duplicates)}
                    placeholder="Duplicate players will be here" readOnly>
                </textarea>
            </div>
        );
    }
}

// @ts-ignore
if (process.title === "browser") {
    ReactDOM.render(
        <PlayerlistDuplicatesFinder />,
        document.getElementById("project"),
    );
}
