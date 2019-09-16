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
            playerlists: { dayone: '', daytwo: '', daythree: '' },
        };
        _this.compatibilize = function () {
            var matchups = _this.state.playerlists;
            var compatibilized = [];
            for (var _i = 0, _a = Object.values(matchups).map(function (val) { return val.split(/ vs.? /gi); }); _i < _a.length; _i++) {
                var matchup = _a[_i];
                if (matchup.length !== 2)
                    continue;
                var p1 = matchup[0], p2 = matchup[1];
                if (!/Bye #\d+/.test(p1)) {
                    compatibilized.push(p1);
                }
                if (!/Bye #\d+/.test(p2)) {
                    compatibilized.push(p2);
                }
            }
            return compatibilized;
        };
        _this.handleChange = function (val, day) {
            _this.state.playerlists[day] = val;
        };
        _this.handleClick = function () {
            var playerlists = _this.compatibilize();
            /** point -> players */
            var occurences = {};
            for (var _i = 0, playerlists_1 = playerlists; _i < playerlists_1.length; _i++) {
                var player = playerlists_1[_i];
                var occurence = occurences[player];
                occurences[player] = occurence === undefined ? 0 : occurence + 1;
            }
            var buf = Object.entries(occurences).map(function (_a) {
                var player = _a[0], occurence = _a[1];
                if (occurence > 2) {
                    return player + " signed up twice!";
                }
            }).filter(function (key) { return key; }).join('\n');
            document.write(buf);
        };
        return _this;
    }
    PlayerlistDuplicatesFinder.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "playerlist-duplicates" },
            React.createElement("textarea", { placeholder: 'Day 1', value: this.state.playerlists.dayone, onChange: function (e) { return _this.handleChange(e.target.value, 'dayone'); } }),
            React.createElement("textarea", { placeholder: 'Day 2', value: this.state.playerlists.daytwo, onChange: function (e) { return _this.handleChange(e.target.value, 'daytwo'); } }),
            React.createElement("textarea", { placeholder: 'Day 3', value: this.state.playerlists.daythree, onChange: function (e) { return _this.handleChange(e.target.value, 'daythree'); } }),
            React.createElement("button", { onClick: function () { return _this.handleClick(); } }, "Compatibilize")));
    };
    return PlayerlistDuplicatesFinder;
}(React.Component));
ReactDOM.render(React.createElement(PlayerlistDuplicatesFinder, null), document.getElementById('playerlist-duplicates'));
