/** Round -> Points */
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

class StourPoints extends React.Component<{}, {
	points: string;
	playerlist: string,
}> {
	state = {
		points: '',
		playerlist: '',
	};
	compatibilize = () => {
		const compatibilized: string[] = [];
		for (const players of this.state.playerlist.split('\n').map((val) => val.split(/ vs.? /gi))) {
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
	handleChange = (val: string) => {
		this.setState({
			playerlist: val,
		});
	}
	render() {
		return (
			<div className="stour-points">
				<textarea onChange={(e) => this.handleChange(e.target.value)}>
				</textarea>
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
