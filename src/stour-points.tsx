/** Round -> Points */
const SMOGON_TOUR_POINTS: {[k: number]: number} = {
	0: 0,
	1: 1,
	2: 2,
	3: 3,
	4: 5,
	5: 7,
	6: 9,
	7: 9,
	8: 11,
	9: 13,
};

class StourPoints extends React.Component<{}, {
	points: string;
	textareas: {[textarea: string]: string};
}> {
	state = {
		points: '',
		textareas: {'textarea-0': ''} as any as {[textarea: string]: string},
	};
	compatibilize = () => {
		const textareas = this.state.textareas;
		const compatibilized: string[] = [];
		for (const players of Object.values(textareas).join('\n').split('\n').map((val) => val.split(/ vs.? /gi))) {
			if (players.length !== 2) continue;
			const [p1, p2] = players;
			if (!/Bye #\d+/.test(p1)) {
				compatibilized.push(p1);
			}
			if (!/Bye #\d+/.test(p2)) {
				compatibilized.push(p2);
			}
		}
		return compatibilized;
	}
	handleChange = (val: string, textarea: string) => {
		const textareas = this.state.textareas;
		textareas[textarea] = val;
		this.setState({
			textareas,
		});
	}
	appendTextarea = () => {
		const textareas = this.state.textareas;
		const newTextarea = `textarea-${Object.keys(this.state.textareas).length}`;
		textareas[newTextarea] = '';
		this.setState({
			textareas,
		});
	}
	getPoints = () => {
		const playerlist = this.compatibilize();
		/** point -> players */
		const occurences: {[player: string]: number} = {};
		for (const player of playerlist) {
			const occurence = occurences[player];
			occurences[player] = occurence === undefined ? 0 : occurence + 1;
		}
		this.setState({
			points: Object.values(SMOGON_TOUR_POINTS).map((point) => {
				let buf = `${point} Points\n`;
				return buf += Object.entries(occurences).map(([player, occurence]) => {
					const playerPoints = SMOGON_TOUR_POINTS[occurence];
					if (playerPoints === point) {
						return player;
					}
				}).filter((player) => player).join(', ');
			}).join('\n\n'),
		});
	}
	render() {
		return (
			<div className="stour-points">
				{Object.entries(this.state.textareas).map(([textarea, playerlist], idx) => {
					return (
						<textarea key={idx} value={playerlist} onChange={(e) => this.handleChange(e.target.value, textarea)}>
						</textarea>
					);
				})}
				<button onClick={() => this.appendTextarea()}>Append textarea</button>
				<button onClick={() => this.getPoints()}>Get Points</button>
				<textarea value={this.state.points} placeholder='Points will be here' readOnly>
				</textarea>
			</div>
		);
	}
}

ReactDOM.render(
	<StourPoints />,
	document.getElementById('stour-points'),
);
