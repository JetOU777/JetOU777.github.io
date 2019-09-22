"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PlayerlistDuplicatesFinder = /** @class */ (function (_super) {
    __extends(PlayerlistDuplicatesFinder, _super);
    function PlayerlistDuplicatesFinder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            duplicates: '',
            playerlist: '',
        };
        _this.compatibilize = function () {
            var compatibilized = [];
            for (var _i = 0, _a = _this.state.playerlist.split('\n').map(function (val) { return val.split(/ vs.? /gi); }); _i < _a.length; _i++) {
                var players = _a[_i];
                if (players.length !== 2)
                    continue;
                var p1 = players[0], p2 = players[1];
                if (!/Bye #\d+/.test(p1)) {
                    compatibilized.push(p1);
                }
                if (!/Bye #\d+/.test(p2)) {
                    compatibilized.push(p2);
                }
            }
            return compatibilized;
        };
        _this.findDuplicates = function () {
            var playerlists = _this.compatibilize();
            var occurences = {};
            for (var _i = 0, playerlists_1 = playerlists; _i < playerlists_1.length; _i++) {
                var player = playerlists_1[_i];
                var occurence = occurences[player];
                occurences[player] = occurence === undefined ? 1 : occurence + 1;
            }
            var duplicates = Object.entries(occurences).map(function (_a) {
                var player = _a[0], occurence = _a[1];
                if (occurence > 1) {
                    return player + " signed up " + occurence + " times!";
                }
            }).filter(function (key) { return key; }).join('\n');
            _this.setState({
                duplicates: duplicates,
            });
        };
        _this.handleChange = function (val) {
            _this.setState({
                playerlist: val,
            });
        };
        return _this;
    }
    PlayerlistDuplicatesFinder.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "playerlist-duplicates" },
            React.createElement("textarea", { onChange: function (e) { return _this.handleChange(e.target.value); } }),
            React.createElement("button", { onClick: function () { return _this.findDuplicates(); } }, "Find duplicates"),
            React.createElement("textarea", { value: this.state.duplicates, placeholder: 'Duplicate players will be here', readOnly: true })));
    };
    return PlayerlistDuplicatesFinder;
}(React.Component));
ReactDOM.render(React.createElement(PlayerlistDuplicatesFinder, null), document.getElementById('playerlist-duplicates'));
