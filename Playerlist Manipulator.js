function addPlayerlist() {
window.list = document.getElementById('playerlist').value;
if (document.getElementById('playerlist').value === "") {
  alert('Please add a playerlist in the textarea!')
}
else {
  document.body.innerHTML =
  `
  <div id="player-container">
      <form name="player">
          <h3 class="display-4">Insert playerlist here...</h3>
          <br />
          <div class="form-group text-center">
              <textarea class="form-control" id="playerlist" rows="15">${list}</textarea>
              <br />
              <button type="button" class="btn btn-primary" onclick="showWinners()">Show Winners</button>
              <button type="button" class="btn btn-primary" onclick="showLosers()">Show Losers</button>
              <button type="button" class="btn btn-primary" onclick="extentionWins()">Show extention wins</button>
              <button type="button" class="btn btn-primary" onclick="extentionLoses()">Show extention loses</button>
              <button type="button" class="btn btn-primary" onclick="byeWins()">Wins via byes</button>
              <button type="button" class="btn btn-primary" onclick="unplayedGames()">Unplayed Games</button>
              <br />
              <br />
              <button type="button" class="btn btn-danger btn-block" onclick="resetPlayerlist()">Reset</button>
          </div>
      </form>
  </div>
  `
}
}

const vs_regex = / vs /gim
const scrap_regex = /\[User=\d+\]|\[\/User\]|.+ Bye \d+|Bye \d+ .+/gim
const winners_regex = /(\[B\](.+)\[\/B\])|(\[B\](.+\n.+)\[\/B\])/gim
const winners_bbcode_regex = /\[b\]|\[\/b\]/gim
const line_break_remover_regex = /\n\s*\n/gm
const line_break_regex = /\r\n/gm
const extention_players_regex = /\(.+\)/g
const unfinished_extention_games = /^((?!\().)*$/gm
const extention_winners_regex = /\[U\](.+)\[\/U\]/gm
const extention_winners_brackets_regex = /\(|\)/gim
const extention_winners_bbcode = /\[u\]|\[b\]|\[\/u\]|\[\/b\]/gim

function showWinners() {
  const remove_scrap = list.replace(scrap_regex, "")
  const remove_vs = remove_scrap.replace(vs_regex, " ")
  const show_winners = remove_vs.match(winners_regex).join("\r\n")
  const remove_bbcode = show_winners.replace(winners_bbcode_regex, "");
  document.getElementById('playerlist').value = remove_bbcode;
}

function showLosers() {
  const remove_scrap = list.replace(scrap_regex, "")
  const remove_vs = remove_scrap.replace(vs_regex, " ")
  const remove_extention_games = remove_vs.replace(extention_players_regex, "");
  const remove_unfinished_games = remove_extention_games.replace(/^((?!\[).)*$/gm, "");
  const show_losers = remove_unfinished_games.replace(winners_regex, "\r\n")
  const remove_linebreak = show_losers.replace(line_break_remover_regex, "\n")
  const remove_extra_spaces = remove_linebreak.replace(/^ +/gm, "")
  document.getElementById('playerlist').value = remove_extra_spaces;
}

function extentionWins() {
  const remove_scrap = list.replace(scrap_regex, "")
  const remove_vs = remove_scrap.replace(vs_regex, " ")
  const extention_players = remove_vs.match(extention_players_regex).join("\r\n")
  const extention_winners = extention_players.match(extention_winners_regex).join("")
  const remove_extention_winner_brackets = extention_winners.replace(extention_winners_brackets_regex, "")
  const remove_extention_winner_bbcode = remove_extention_winner_brackets.replace(extention_winners_bbcode, "\r\n")
  const remove_linebreaks = remove_extention_winner_bbcode.replace(line_break_remover_regex, "\n")
  document.getElementById('playerlist').value = remove_linebreaks;
}

function extentionLoses() {
  const remove_scrap = list.replace(scrap_regex, "")
  const remove_vs = remove_scrap.replace(vs_regex, " ")
  const remove_unfinished_extention_games = remove_vs.replace(/^((?!\[u\]).)*$/gim , "");
  const extention_players = remove_unfinished_extention_games .match(extention_players_regex).join("\r\n")
  const extention_winners = extention_players.replace(extention_winners_regex, "")
  const remove_extention_winner_brackets = extention_winners.replace(extention_winners_brackets_regex, "")
  const remove_extra_spaces = remove_extention_winner_brackets.replace(/^ +/gm, "")
  document.getElementById('playerlist').value = remove_extra_spaces;
}

function unplayedGames() {
  const remove_unfinished_games = list.match(/^((?!\[).)*$/gm).join("\r\n");
  document.getElementById('playerlist').value = remove_unfinished_games;
}

function byeWins() {
  const lines_with_byes = list.match(/.+ Bye \d+|Bye \d+ .+/gim).join("\r\n")
  const remove_byes = lines_with_byes.replace(/Bye \d+/gim, "")
  const remove_vs = remove_byes.replace(vs_regex, "")
  const remove_bbcode = remove_vs.replace(winners_bbcode_regex, "")
  document.getElementById('playerlist').value = remove_bbcode;
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
      <p id="list" style="display: none;">${list}</p>
      <p id="check" style="display: none;">od</p>
  </div>
  `
}
