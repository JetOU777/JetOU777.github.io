"use strict";
function Compatibilize() {
    let playerlist = document.getElementById("playerlist").value;
    let output = [];
    for (let matchup of playerlist.split('\n').map(x => x.split(' VS '))) {
        if (!matchup || matchup === '\n') continue;
        const [p1, p2] = matchup;
        output.push(p1, p2);
    }
    document.getElementById("playerlist").value = output.join('\n');
}
