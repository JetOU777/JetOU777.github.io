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
	getMatchups() {
		const matchups = new Map<string, string[]>();
		for (const players of this.state.playerlist.split('\n').map((val) => val.split(/ vs.? /gi))) {
			if (players.length !== 2) continue;
			const [p1, p2] = players;
			if (!/Bye(\d+)?/.test(p1)) {
				const p1Matchups = matchups.get(p1);
				matchups.set(p1, (p1Matchups || []).concat(p2));
			}
			if (!/Bye(\d+)?/.test(p2)) {
				const p2Matchups = matchups.get(p2);
				matchups.set(p2, (p2Matchups || []).concat(p1));
			}
		}
		console.log(matchups);
		return matchups;
	}
	getPoints = () => {
		const matchups = this.getMatchups();
		/** player -> points */
		const occurences: {[player: string]: number} = {};
		for (const [player, mus] of matchups.entries()) {
			let occurence = 0;
			if (mus.some((mu) => !/Bye(\d+)?/.test(mu))) {
				occurence = mus.length - 1;
			}
			occurences[player] = SMOGON_TOUR_POINTS[occurence];
		}
		console.log(occurences);
		this.setState({
			points: Object.values(SMOGON_TOUR_POINTS).map((point) => {
				let buf = `${point} Points\n`;
				return buf += Object.entries(occurences).map(([player, playerPoints]) => {
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
