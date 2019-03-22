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
    for (let player of players) {
        if (player != current) {
            // TODO: Support RR finals, and adding 2 points to winner.
            switch (cnt) {
                case 2: case 3: 
                    output += `<p>${current}: ${cnt - 1} points</p>`; 
                    break;
                case 4:
                    output += `<p>${current}: ${cnt - 1} points</p>`; 
                    break;
                case 5:
                    output += `<p>${current}: ${cnt + 1} points</p>`; 
                    break;
                case 6:
                    output += `<p>${current}: ${cnt + 1} points</p>`; 
                    break;
                case 7:
                    output += `<p>${current}: ${cnt + 2} points</p>`; 
                    break;
                case 8:
                    output += `<p>${current}: ${cnt + 3} points</p>`; 
                    break;
                case 9:
                    output += `<p>${current}: ${cnt + 4} points</p>`; 
                    break;
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