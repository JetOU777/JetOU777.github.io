function Compatibilizer(playerlist) {
    let output = [];
    for (let matchup of playerlist.split('\n').map(x => x.split(' vs. '))) {
        if (matchup.length < 2) continue;
        const [p1, p2] = matchup;
        (!/Bye #\d+/.test(p1) ? output.push(p1) : '');
        (!/Bye #\d+/.test(p2) ? output.push(p2) : '');
    }
	return output;
}

function count(players) {
    players.sort();
	let output = "";
    let current;
    let cnt;
    for (let player of players) {
        if (player != current) {
            if (cnt > 2) {
				output += `${current} signed up ${cnt} times\n`
            }
            current = player;
            cnt = 1;
        } else {
            cnt++;
        }
    }
	return output;
}


function findDuplicates() {
	const dayone = document.getElementById('dayone').value;
    const daytwo = document.getElementById('daytwo').value;
	const daythree = document.getElementById('daythree').value;
	let output = count(Compatibilizer(`${dayone}\n${daytwo}\n${daythree}`));
	document.getElementById('dupes').innerHTML = output;
}
