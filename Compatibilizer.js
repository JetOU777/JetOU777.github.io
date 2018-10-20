"use strict";
function Compatibilizer() {
    let playerlist = document.getElementById("playerlist").value;
    let remove_vs = playerlist.replace(/ VS /g, "\r\n");
    let remove_extra_spaces = remove_vs.replace(/^ +/gm, '');
    let remove_byes = remove_extra_spaces.replace(/Bye #\d+/g, "")
    let remove_extra_linebreaks = remove_byes.replace(/\n\s*\n/gm,'\n');
    document.getElementById("playerlist").value = remove_extra_linebreaks;
}
