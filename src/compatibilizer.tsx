class Compatibilizer extends React.Component<{}, {
	compatibilized: string;
	playerlist: string;
}> {
	state = {
		compatibilized: '',
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
		this.setState({
			compatibilized: compatibilized.join('\n'),
		});
	}
	handleChange = (val: string) => {
		this.setState({
			playerlist: val,
		});
	}
	render() {
		return (
			<div className="compatibilizer">
				<textarea onChange={(e) => this.handleChange(e.target.value)}>
				</textarea>
				<button onClick={() => this.compatibilize()}>Compatibilize</button>
				<textarea value={this.state.compatibilized}  placeholder='Compatibilized output will be here' readOnly>
				</textarea>
			</div>
		);
	}
}

ReactDOM.render(
	<Compatibilizer />,
	document.getElementById('compatibilizer'),
);
