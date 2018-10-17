"use strict";
function addPlayerlist() {
    window.list = document.getElementById("playerlist").value;
    if (document.getElementById("playerlist").value === "") {
        alert("Please add a playerlist in the textarea!");
    } else {                    
        document.body.innerHTML =
        `
        <div id="player-container">
          <form name="player">
            <div class="form-group text-center">
            <textarea class="form-control" id="fixedplayerlist" rows="20">${list}</textarea>
            <br />
            <button type="button" class="btn btn-primary" onclick="showWinners()">
            Show Winners
            </button>
            <button type="button" class="btn btn-primary" onclick="showLosers()">
            Show Losers</button>
            <button type="button" class="btn btn-primary" onclick="extensionWins()">Show extension wins</button>
            <button type="button" class="btn btn-primary" onclick="extensionLoses()">Show extension loses</button>
            <button type="button" class="btn btn-primary" onclick="byeWins()">Wins via byes</button>
            <button type="button" class="btn btn-primary" onclick="unplayedGames()">Unplayed Games</button>
            <br />
            <br />
            <button type="button" class="btn btn-danger btn-block" onclick="resetPlayerlist()">Reset</button>
            </div>
          </form>
        </div>
`;
        window.playerlistID = document.getElementById("fixedplayerlist");
    }
}

const vs_regex = /\svs\s/gim;
const scrap_regex = /\[User=\d+\]|\[\/User\]|.+\sBye\s\d+|Bye\s\d+\s.+/gim;
const winners_regex = /(\[B\](.+)\[\/B\])|(\[B\](.+\n.+)\[\/B\])/gim;
const line_break_remover_regex = /\n\s*\n/gm;
const extension_players_regex = /\(.+\svs\s.+\)/g;
const extension_winners_regex = /\[U\](.+)\[\/U\]/gm;
const extension_winners_parenthesis_regex = /\(|\)/gim;
const winners_bbcode_regex = /\[u\]|\[b\]|\[\/u\]|\[\/b\]/gim;

function showWinners() {
    let remove_scrap = list.replace(scrap_regex, "");
    let remove_vs = remove_scrap.replace(vs_regex, " ");
    let show_winners = remove_vs.match(winners_regex).join("\r\n");
    let remove_bbcode = show_winners.replace(winners_bbcode_regex, "");
    playerlistID.value = remove_bbcode;
}

function showLosers() {
    let remove_scrap = list.replace(scrap_regex, "");
    let remove_extension_games = remove_scrap.replace(/\(.+\svs\s.+\).+|.+\(.+\svs\s.+\)/gm, "");
    let remove_vs = remove_extension_games.replace(vs_regex, "");
    let remove_unfinished_games = remove_vs.replace(/^((?!\[).)*$/gm, "");
    let show_losers = remove_unfinished_games.replace(winners_regex, "\r\n");
    let remove_linebreak = show_losers.replace(line_break_remover_regex, "\n");
    let remove_extra_spaces = remove_linebreak.replace(/^\s+/gm, "");
    playerlistID.value = remove_extra_spaces;
}

function extensionWins() {
    let remove_scrap = list.replace(scrap_regex, "");
    let extension_players = remove_scrap.match(extension_players_regex).join("\r\n");
    let extension_winners = extension_players.match(extension_winners_regex).join("");
    let remove_extension_winner_parenthesis = extension_winners.replace(extension_winners_parenthesis_regex, "");
    let remove_extension_winner_bbcode = remove_extension_winner_parenthesis.replace(winners_bbcode_regex, "\r\n");
    let remove_linebreaks = remove_extension_winner_bbcode.replace(line_break_remover_regex, "\n");
    playerlistID.value = remove_linebreaks;
}

function extensionLoses() {
    let remove_scrap = list.replace(scrap_regex, "");
    let extension_players = remove_scrap.match(extension_players_regex).join("\r\n");
    let remove_vs = extension_players.replace(vs_regex, "");
    let extension_winners = remove_vs.replace(extension_winners_regex, "");
    let remove_extension_winner_parenthesis = extension_winners.replace(extension_winners_parenthesis_regex, "");
    let remove_extension_winner_bbcode = remove_extension_winner_parenthesis.replace(winners_bbcode_regex, "");
    let remove_extra_spaces = remove_extension_winner_bbcode.replace(/^\s+/gm, "");
    playerlistID.value = remove_extra_spaces;
}

function unplayedGames() {
    let remove_scrap = list.replace(scrap_regex, "");
    let remove_unfinished_games = remove_scrap.match(/^((?!\[).)*$/gm).join("\r\n");
    playerlistID.value = remove_unfinished_games;
}

function byeWins() {
    let lines_with_byes = list.match(/.+\sBye\s\d+|Bye\s\d+\s.+/gim).join("\r\n");
    let remove_byes = lines_with_byes.replace(/Bye\s\d+/gim, "");
    let remove_vs = remove_byes.replace(vs_regex, "");
    let remove_bbcode = remove_vs.replace(winners_bbcode_regex, "");
    playerlistID.value = remove_bbcode;
}

function resetPlayerlist() {
    document.body.innerHTML =
    `
    <div id="player-container">
      <form name="player">
        <div class="form-group">
        <h3 class="display-4">Insert playerlist here...</h3>
        <br />
        <textarea class="form-control" id="playerlist" rows="18"></textarea>
        <br />
        <button type="button" class="btn btn-primary btn-block" onclick="addPlayerlist()">Procced</button>
        </div>
    <br />
      </form>
    </div>
`;
}
