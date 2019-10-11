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
var PlayerlistDuplicatesFinder = /** @class */ (function (_super) {
    __extends(PlayerlistDuplicatesFinder, _super);
    function PlayerlistDuplicatesFinder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            duplicates: '',
            playerlist: '',
        };
        _this.findDuplicates = function () {
            var e_1, _a;
            var playerlists = _this.compatibilize();
            var occurences = {};
            try {
                for (var playerlists_1 = __values(playerlists), playerlists_1_1 = playerlists_1.next(); !playerlists_1_1.done; playerlists_1_1 = playerlists_1.next()) {
                    var player = playerlists_1_1.value;
                    var occurence = occurences[player];
                    occurences[player] = occurence === undefined ? 1 : occurence + 1;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (playerlists_1_1 && !playerlists_1_1.done && (_a = playerlists_1.return)) _a.call(playerlists_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var duplicates = Object.entries(occurences).map(function (_a) {
                var _b = __read(_a, 2), player = _b[0], occurence = _b[1];
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
    PlayerlistDuplicatesFinder.prototype.compatibilize = function () {
        var e_2, _a;
        var compatibilized = [];
        try {
            for (var _b = __values(this.state.playerlist.split('\n').map(function (val) { return val.split(/ vs.? /gi); })), _c = _b.next(); !_c.done; _c = _b.next()) {
                var players = _c.value;
                if (players.length !== 2)
                    continue;
                var _d = __read(players, 2), p1 = _d[0], p2 = _d[1];
                if (!/Bye\d+/.test(p1)) {
                    compatibilized.push(p1);
                }
                if (!/Bye\d+/.test(p2)) {
                    compatibilized.push(p2);
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
        return compatibilized;
    };
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
