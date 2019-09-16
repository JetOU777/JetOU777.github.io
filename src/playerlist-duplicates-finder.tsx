class PlayerlistDuplicatesFinder extends React.Component<{}, {
	duplicates: string;
	textareas: {[textarea: string]: string};
}> {
	state = {
		duplicates: '',
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
	render() {
		return (
			<div className="playerlist-duplicates">
				{Object.entries(this.state.textareas).map(([textarea, playerlist], idx) => {
					return (
						<textarea key={idx} value={playerlist} onChange={(e) => this.handleChange(e.target.value, textarea)}>
						</textarea>
					);
				})}
				<button onClick={() => this.appendTextarea()}>Append textarea</button>
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
