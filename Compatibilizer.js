"use strict";
function Compatibilize() {
    let playerlist = document.getElementById("playerlist").value;
    let output = [];
    for (let matchup of playerlist.split('\n').map(x => x.split(' VS '))) {
        if (matchup.length < 2) continue;
        const [p1, p2] = matchup;
        (!/Bye #\d+/.test(p1) ? output.push(p1) : '');
        (!/Bye #\d+/.test(p2) ? output.push(p2) : '');
    }
    document.getElementById("playerlist").value = output.join('\n');
    document.getElementById("lines").innerHTML = `${output.length} lines`;
}
