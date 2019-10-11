class PlayerlistDuplicatesFinder extends React.Component<{}, {
	duplicates: string;
	playerlist: string;
}> {
	state = {
		duplicates: '',
		playerlist: '',
	};
	compatibilize() {
		const compatibilized: string[] = [];
		for (const players of this.state.playerlist.split('\n').map((val) => val.split(/ vs.? /gi))) {
			if (players.length !== 2) continue;
			const [p1, p2] = players;
			if (!/Bye\d+/.test(p1)) {
				compatibilized.push(p1);
			}
			if (!/Bye\d+/.test(p2)) {
				compatibilized.push(p2);
			}
		}
		return compatibilized;
	}
	findDuplicates = () => {
		const playerlists = this.compatibilize();
		const occurences: {[player: string]: number} = {};
		for (const player of playerlists) {
			const occurence = occurences[player];
			occurences[player] = occurence === undefined ? 1 : occurence + 1;
		}
		const duplicates = Object.entries(occurences).map(([player, occurence]) => {
				if (occurence > 1) {
					return `${player} signed up ${occurence} times!`;
				}
		}).filter((key) => key).join('\n');
		this.setState({
			duplicates,
		});
	}
	handleChange = (val: string) => {
		this.setState({
			playerlist: val,
		});
	}
	render() {
		return (
			<div className="playerlist-duplicates">
				<textarea onChange={(e) => this.handleChange(e.target.value)}>
				</textarea>
				<button onClick={() => this.findDuplicates()}>Find duplicates</button>
				<textarea value={this.state.duplicates}  placeholder='Duplicate players will be here' readOnly>
				</textarea>
			</div>
		);
	}
}

ReactDOM.render(
	<PlayerlistDuplicatesFinder />,
	document.getElementById('playerlist-duplicates'),
);
