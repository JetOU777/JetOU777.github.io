function Compatibilizer() {
    var str = document.getElementById("playerlist").value;
    var res = str.replace(/ VS /g, "\r\n").replace(/^ +/gm, '').replace(/Bye #\d+/g, "").replace(/\n\n/g,'\n');
    document.getElementById("playerlist").value = res;
}
