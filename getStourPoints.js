function Compatibilizer(playerlist) {
    let output = [];
    for (let matchup of playerlist.split('\n').map(x => x.split(' vs. '))) {
        if (matchup.length < 2) continue;
        const [p1, p2] = matchup;
        output.push(p1, p2);
    }
	return output;
}

function count(players) {
    players.sort();
	let output = '';
    let current;
    let cnt;
    const points = {
        1: 1,
        2: 2,
        3: 3,
        4: 5,
        5: 7,
        6: 9,
        7: 9,
        8: 11,
        9: 13
    };
    for (let player of players) {
        if (player != current) {
            // TODO: Support RR finals, and adding 2 points to winner.
            if (cnt > 1) {
                output += `<p>${current} recieved ${points[cnt - 1]} points</p>`;
            }
            current = player;
            cnt = 1;
        } else {
            cnt++;
        }
    }
    return output;
}

function getPoints() {
	const list = document.getElementById('list').value;
    const output = count(Compatibilizer(list));
    document.write(output);	
}