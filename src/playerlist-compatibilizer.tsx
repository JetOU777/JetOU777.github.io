import * as React from "react";
import * as ReactDOM from "react-dom";

const BYE_REGEX = /^Bye #\d+$/;

/**
 * Compatibilizes the Smogon bracketmaker's output to work with
 * IFM's bracketmaker
 */
export class PlayerlistCompatibilizer extends React.Component<{}, {
    compatibilized: string[];
    playerlist: string;
}> {
    state = {
        compatibilized: [],
        playerlist: "",
    };
    compatibilize(playerlist: string) {
        const compatibilized: string[] = [];
        for (const players of playerlist.split("\n").map((el) => el.split(/ vs.? /gi))) {
            if (players.length !== 2) continue;
            const [p1, p2] = players;
            if (!BYE_REGEX.test(p1)) {
                compatibilized.push(p1);
            }
            if (!BYE_REGEX.test(p2)) {
                compatibilized.push(p2);
            }
        }
        return compatibilized;
    }
    render() {
        return (
            <div className="playerlist-compatibilizer">
                <textarea onChange={(e) => {
                    this.setState({
                        playerlist: e.target.value,
                    });
                }}>
                </textarea>
                <button onClick={() => this.setState({
                    compatibilized: this.compatibilize(this.state.playerlist),
                })}>
                    Compatibilize
                </button>
                <textarea value={this.state.compatibilized.join("\n")}
                    placeholder="Compatibilized output will be here" readOnly>
                </textarea>
            </div>
        );
    }
}

ReactDOM.render(
    <PlayerlistCompatibilizer/>,
    document.getElementById("project"),
);
