"use strict";
function Compatibilize() {
    let playerlist = document.getElementById("playerlist").value;
    let remove_vs = playerlist.replace(/vs.?/gi, '');
    let output = [];
    for (let matchup of remove_vs) {
        const [p1, p2] = matchup;
        !/Bye #\d+/.test(p1) ? output.push(p1) : '';
        !/Bye #\d+/.test(p2) ? output.push(p2) : '';
    }
    document.getElementById("playerlist").value = output.join('\n');
    document.getElementById("lines").innerHTML = `${output.length} lines`;
}
