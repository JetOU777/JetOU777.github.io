function Compatibilizer(playerlist) {
    let remove_vs = playerlist.replace(/\svs\.\s/g, "\n");
    let remove_extra_spaces = remove_vs.replace(/^\s+/gm, "");
    let remove_byes = remove_extra_spaces.replace(/Bye\s#\d+/g, "");
    let remove_extra_linebreaks = remove_byes.replace(/\n\s*\n/gm,"\n");
	return remove_extra_linebreaks.split("\n");
}

function findDuplicates() {
	const dayone = document.getElementById('dayone').value;
    const daytwo = document.getElementById('daytwo').value;
	const daythree = document.getElementById('daythree').value;
	count(Compatibilizer(`${dayone} \n ${daytwo} \n ${daythree}`));
	
}

function count(array_elements) {
    array_elements.sort();
	let output = "";
    let current = null;
    let cnt = 0;
    for (let i = 0; i <= array_elements.length; i++) {
        if (array_elements[i] != current) {
            if (cnt > 2) {
				output += `${current} signed up ${cnt} times\n`
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
	document.getElementById("dupes").value = output;
}

