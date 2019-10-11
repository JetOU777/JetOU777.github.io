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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
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
        _this.getPoints = function () {
            var e_1, _a;
            var matchups = _this.getMatchups();
            /** player -> points */
            var occurences = {};
            try {
                for (var _b = __values(matchups.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var _d = __read(_c.value, 2), player = _d[0], mus = _d[1];
                    var occurence = 0;
                    if (mus.some(function (mu) { return !/Bye(\d+)?/.test(mu); })) {
                        occurence = mus.length - 1;
                    }
                    occurences[player] = SMOGON_TOUR_POINTS[occurence];
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            _this.setState({
                points: Object.values(SMOGON_TOUR_POINTS).map(function (point) {
                    var buf = point + " Points\n";
                    return buf += Object.entries(occurences).map(function (_a) {
                        var _b = __read(_a, 2), player = _b[0], playerPoints = _b[1];
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
    StourPoints.prototype.getMatchups = function () {
        var e_2, _a;
        var matchups = new Map();
        try {
            for (var _b = __values(this.state.playerlist.split('\n').map(function (val) { return val.split(/ vs.? /gi); })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var players = _c.value;
                if (players.length !== 2)
                    continue;
                var _d = __read(players, 2), p1 = _d[0], p2 = _d[1];
                if (!/Bye(\d+)?/.test(p1)) {
                    var p1Matchups = matchups.get(p1);
                    matchups.set(p1, (p1Matchups || []).concat(p2));
                }
                if (!/Bye(\d+)?/.test(p2)) {
                    var p2Matchups = matchups.get(p2);
                    matchups.set(p2, (p2Matchups || []).concat(p1));
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return matchups;
    };
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
