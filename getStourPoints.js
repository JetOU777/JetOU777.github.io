function Compatibilizer(playerlist) {
    let remove_round = playerlist.replace(/Round\s\d|Finals/g, '');
    let remove_vs = remove_round.replace(/\svs\.\s/g, '\n');
    let remove_extra_spaces = remove_vs.replace(/^\s+/gm, '');
    let remove_byes = remove_extra_spaces.replace(/Bye\s#\d+/g, '');
    let remove_extra_linebreaks = remove_byes.replace(/\n\s*\n/gm,'\n');
	return remove_extra_linebreaks.split('\n');
}

function findDuplicates() {
	const list = document.getElementById('list').value;
    let output = `${count(Compatibilizer(`${list}`))}`;
    document.write(output);	
}

function count(array_elements) {
    array_elements.sort();
	let output = '';
    let current = null;
    let cnt = 0;
    for (let i = 0; i <= array_elements.length; i++) {
        if (array_elements[i] != current) {
            switch (cnt) {
                case 2: case 3: 
                    output += `${current} received ${cnt - 1} points<br />`; 
                    break;
                case 4:
                    output += `${current} received ${cnt - 1} points<br />`; 
                    break;
                case 5:
                    output += `${current} received ${cnt + 1} points<br />`; 
                    break;
                case 6:
                    output += `${current} received ${cnt + 1} points<br />`; 
                    break;
                case 7:
                    output += `${current} received ${cnt + 2} points<br />`; 
                    break;
                case 8:
                    output += `${current} received ${cnt + 3} points<br />`; 
                    break;
                case 9:
                    output += `${current} received ${cnt + 4} points<br />`; 
                    break;
            }
            current = array_elements[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    return output;
}

