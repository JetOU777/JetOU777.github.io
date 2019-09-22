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
/** Round -> Points */
var SMOGON_TOUR_POINTS = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 5,
    5: 7,
    6: 9,
    7: 11,
    8: 13,
};
var StourPoints = /** @class */ (function (_super) {
    __extends(StourPoints, _super);
    function StourPoints() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            points: '',
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
        _this.getPoints = function () {
            var playerlist = _this.compatibilize();
            /** point -> players */
            var occurences = {};
            for (var _i = 0, playerlist_1 = playerlist; _i < playerlist_1.length; _i++) {
                var player = playerlist_1[_i];
                var occurence = occurences[player];
                occurences[player] = occurence === undefined ? 0 : occurence + 1;
            }
            _this.setState({
                points: Object.values(SMOGON_TOUR_POINTS).map(function (point) {
                    var buf = point + " Points\n";
                    return buf += Object.entries(occurences).map(function (_a) {
                        var player = _a[0], occurence = _a[1];
                        var playerPoints = SMOGON_TOUR_POINTS[occurence];
                        if (playerPoints === point) {
                            return player;
                        }
                    }).filter(function (player) { return player; }).join(', ');
                }).join('\n\n'),
            });
        };
        _this.handleChange = function (val) {
            _this.setState({
                playerlist: val,
            });
        };
        return _this;
    }
    StourPoints.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "stour-points" },
            React.createElement("textarea", { onChange: function (e) { return _this.handleChange(e.target.value); } }),
            React.createElement("button", { onClick: function () { return _this.getPoints(); } }, "Get Points"),
            React.createElement("textarea", { value: this.state.points, placeholder: 'Points will be here', readOnly: true })));
    };
    return StourPoints;
}(React.Component));
ReactDOM.render(React.createElement(StourPoints, null), document.getElementById('stour-points'));
