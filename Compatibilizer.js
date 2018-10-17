"use strict";
function Compatibilizer() {
    let str = document.getElementById("playerlist").value;
    let res = str.replace(/ VS /g, "\r\n").replace(/^ +/gm, '').replace(/Bye #\d+/g, "").replace(/\n\s*\n/gm,'\n');
    document.getElementById("playerlist").value = res;
}
