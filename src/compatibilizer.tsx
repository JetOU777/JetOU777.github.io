class Compatibilizer extends React.Component<{}, {
	compatibilized: string;
	textareas: {[textarea: string]: string};
}> {
	state = {
		compatibilized: '',
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
		this.setState({
			compatibilized: compatibilized.join('\n'),
		});
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
	render() {
		return (
			<div className="compatibilizer">
				{Object.entries(this.state.textareas).map(([textarea, playerlist], idx) => {
					return (
						<textarea key={idx} value={playerlist} onChange={(e) => this.handleChange(e.target.value, textarea)}>
						</textarea>
					);
				})}
				<button onClick={() => this.appendTextarea()}>Append textarea</button>
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
