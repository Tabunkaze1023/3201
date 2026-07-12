/*v0.5vv_20211229_syb_scopedata*/
global.__wcc_version__ = 'v0.5vv_20211229_syb_scopedata';
global.__wcc_version_info__ = {
    "customComponents": true,
    "fixZeroRpx": true,
    "propValueDeepCopy": false
};
var $gwxc
var $gaic = {}
$gwx0 = function(path, global) {
    if (typeof global === 'undefined') global = {};
    if (typeof __WXML_GLOBAL__ === 'undefined') {
        __WXML_GLOBAL__ = {};
    }
    __WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
    $gwx('init', global);

    function _(a, b) {
        if (typeof(b) != 'undefined') a.children.push(b);
    }

    function _v(k) {
        if (typeof(k) != 'undefined') return {
            tag: 'virtual',
            'wxKey': k,
            children: []
        };
        return {
            tag: 'virtual',
            children: []
        };
    }

    function _n(tag) {
        return {
            tag: 'wx-' + tag,
            attr: {},
            children: [],
            n: [],
            raw: {},
            generics: {}
        }
    }

    function _p(a, b) {
        b && a.properities.push(b);
    }

    function _s(scope, env, key) {
        return typeof(scope[key]) != 'undefined' ? scope[key] : env[key]
    }

    function _wp(m) {
        console.warn("WXMLRT_$gwx0:" + m)
    }

    function _wl(tname, prefix) {
        _wp(prefix + ':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')
    }
    $gwn = console.warn;
    $gwl = console.log;

    function $gwh() {
        function x() {}
        x.prototype = {
            hn: function(obj, all) {
                if (typeof(obj) == 'object') {
                    var cnt = 0;
                    var any1 = false,
                        any2 = false;
                    for (var x in obj) {
                        any1 = any1 | x === '__value__';
                        any2 = any2 | x === '__wxspec__';
                        cnt++;
                        if (cnt > 2) break;
                    }
                    return cnt == 2 && any1 && any2 && (all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h') ? "h" : "n";
                }
                return "n";
            },
            nh: function(obj, special) {
                return {
                    __value__: obj,
                    __wxspec__: special ? special : true
                }
            },
            rv: function(obj) {
                return this.hn(obj, true) === 'n' ? obj : this.rv(obj.__value__);
            },
            hm: function(obj) {
                if (typeof(obj) == 'object') {
                    var cnt = 0;
                    var any1 = false,
                        any2 = false;
                    for (var x in obj) {
                        any1 = any1 | x === '__value__';
                        any2 = any2 | x === '__wxspec__';
                        cnt++;
                        if (cnt > 2) break;
                    }
                    return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__));
                }
                return false;
            }
        }
        return new x;
    }
    wh = $gwh();

    function $gstack(s) {
        var tmp = s.split('\n ' + ' ' + ' ' + ' ');
        for (var i = 0; i < tmp.length; ++i) {
            if (0 == i) continue;
            if (")" === tmp[i][tmp[i].length - 1])
                tmp[i] = tmp[i].replace(/\s\(.*\)$/, "");
            else
                tmp[i] = "at anonymous function";
        }
        return tmp.join('\n ' + ' ' + ' ' + ' ');
    }

    function $gwrt(should_pass_type_info) {
        function ArithmeticEv(ops, e, s, g, o) {
            var _f = false;
            var rop = ops[0][1];
            var _a, _b, _c, _d, _aa, _bb;
            switch (rop) {
                case '?:':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? rev(ops[2], e, s, g, o, _f) : rev(ops[3], e, s, g, o, _f);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '&&':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? rev(ops[2], e, s, g, o, _f) : wh.rv(_a);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '||':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h');
                    _d = wh.rv(_a) ? wh.rv(_a) : rev(ops[2], e, s, g, o, _f);
                    _d = _c && wh.hn(_d) === 'n' ? wh.nh(_d, 'c') : _d;
                    return _d;
                    break;
                case '+':
                case '*':
                case '/':
                case '%':
                case '|':
                case '^':
                case '&':
                case '===':
                case '==':
                case '!=':
                case '!==':
                case '>=':
                case '<=':
                case '>':
                case '<':
                case '<<':
                case '>>':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _b = rev(ops[2], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h' || wh.hn(_b) === 'h');
                    switch (rop) {
                        case '+':
                            _d = wh.rv(_a) + wh.rv(_b);
                            break;
                        case '*':
                            _d = wh.rv(_a) * wh.rv(_b);
                            break;
                        case '/':
                            _d = wh.rv(_a) / wh.rv(_b);
                            break;
                        case '%':
                            _d = wh.rv(_a) % wh.rv(_b);
                            break;
                        case '|':
                            _d = wh.rv(_a) | wh.rv(_b);
                            break;
                        case '^':
                            _d = wh.rv(_a) ^ wh.rv(_b);
                            break;
                        case '&':
                            _d = wh.rv(_a) & wh.rv(_b);
                            break;
                        case '===':
                            _d = wh.rv(_a) === wh.rv(_b);
                            break;
                        case '==':
                            _d = wh.rv(_a) == wh.rv(_b);
                            break;
                        case '!=':
                            _d = wh.rv(_a) != wh.rv(_b);
                            break;
                        case '!==':
                            _d = wh.rv(_a) !== wh.rv(_b);
                            break;
                        case '>=':
                            _d = wh.rv(_a) >= wh.rv(_b);
                            break;
                        case '<=':
                            _d = wh.rv(_a) <= wh.rv(_b);
                            break;
                        case '>':
                            _d = wh.rv(_a) > wh.rv(_b);
                            break;
                        case '<':
                            _d = wh.rv(_a) < wh.rv(_b);
                            break;
                        case '<<':
                            _d = wh.rv(_a) << wh.rv(_b);
                            break;
                        case '>>':
                            _d = wh.rv(_a) >> wh.rv(_b);
                            break;
                        default:
                            break;
                    }
                    return _c ? wh.nh(_d, "c") : _d;
                    break;
                case '-':
                    _a = ops.length === 3 ? rev(ops[1], e, s, g, o, _f) : 0;
                    _b = ops.length === 3 ? rev(ops[2], e, s, g, o, _f) : rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) === 'h' || wh.hn(_b) === 'h');
                    _d = _c ? wh.rv(_a) - wh.rv(_b) : _a - _b;
                    return _c ? wh.nh(_d, "c") : _d;
                    break;
                case '!':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) == 'h');
                    _d = !wh.rv(_a);
                    return _c ? wh.nh(_d, "c") : _d;
                case '~':
                    _a = rev(ops[1], e, s, g, o, _f);
                    _c = should_pass_type_info && (wh.hn(_a) == 'h');
                    _d = ~wh.rv(_a);
                    return _c ? wh.nh(_d, "c") : _d;
                default:
                    $gwn('unrecognized op' + rop);
            }
        }

        function rev(ops, e, s, g, o, newap) {
            var op = ops[0];
            var _f = false;
            if (typeof newap !== "undefined") o.ap = newap;
            if (typeof(op) === 'object') {
                var vop = op[0];
                var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
                switch (vop) {
                    case 2:
                        return ArithmeticEv(ops, e, s, g, o);
                        break;
                    case 4:
                        return rev(ops[1], e, s, g, o, _f);
                        break;
                    case 5:
                        switch (ops.length) {
                            case 2:
                                _a = rev(ops[1], e, s, g, o, _f);
                                return should_pass_type_info ? [_a] : [wh.rv(_a)];
                                return [_a];
                                break;
                            case 1:
                                return [];
                                break;
                            default:
                                _a = rev(ops[1], e, s, g, o, _f);
                                _b = rev(ops[2], e, s, g, o, _f);
                                _a.push(
                                    should_pass_type_info ?
                                    _b :
                                    wh.rv(_b)
                                );
                                return _a;
                                break;
                        }
                        break;
                    case 6:
                        _a = rev(ops[1], e, s, g, o);
                        var ap = o.ap;
                        _ta = wh.hn(_a) === 'h';
                        _aa = _ta ? wh.rv(_a) : _a;
                        o.is_affected |= _ta;
                        if (should_pass_type_info) {
                            if (_aa === null || typeof(_aa) === 'undefined') {
                                return _ta ? wh.nh(undefined, 'e') : undefined;
                            }
                            _b = rev(ops[2], e, s, g, o, _f);
                            _tb = wh.hn(_b) === 'h';
                            _bb = _tb ? wh.rv(_b) : _b;
                            o.ap = ap;
                            o.is_affected |= _tb;
                            if (_bb === null || typeof(_bb) === 'undefined' ||
                                _bb === "__proto__" || _bb === "prototype" || _bb === "caller") {
                                return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
                            }
                            _d = _aa[_bb];
                            if (typeof _d === 'function' && !ap) _d = undefined;
                            _td = wh.hn(_d) === 'h';
                            o.is_affected |= _td;
                            return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
                        } else {
                            if (_aa === null || typeof(_aa) === 'undefined') {
                                return undefined;
                            }
                            _b = rev(ops[2], e, s, g, o, _f);
                            _tb = wh.hn(_b) === 'h';
                            _bb = _tb ? wh.rv(_b) : _b;
                            o.ap = ap;
                            o.is_affected |= _tb;
                            if (_bb === null || typeof(_bb) === 'undefined' ||
                                _bb === "__proto__" || _bb === "prototype" || _bb === "caller") {
                                return undefined;
                            }
                            _d = _aa[_bb];
                            if (typeof _d === 'function' && !ap) _d = undefined;
                            _td = wh.hn(_d) === 'h';
                            o.is_affected |= _td;
                            return _td ? wh.rv(_d) : _d;
                        }
                    case 7:
                        switch (ops[1][0]) {
                            case 11:
                                o.is_affected |= wh.hn(g) === 'h';
                                return g;
                            case 3:
                                _s = wh.rv(s);
                                _e = wh.rv(e);
                                _b = ops[1][1];
                                if (g && g.f && g.f.hasOwnProperty(_b)) {
                                    _a = g.f;
                                    o.ap = true;
                                } else {
                                    _a = _s && _s.hasOwnProperty(_b) ?
                                        s : (_e && _e.hasOwnProperty(_b) ? e : undefined);
                                }
                                if (should_pass_type_info) {
                                    if (_a) {
                                        _ta = wh.hn(_a) === 'h';
                                        _aa = _ta ? wh.rv(_a) : _a;
                                        _d = _aa[_b];
                                        _td = wh.hn(_d) === 'h';
                                        o.is_affected |= _ta || _td;
                                        _d = _ta && !_td ? wh.nh(_d, 'e') : _d;
                                        return _d;
                                    }
                                } else {
                                    if (_a) {
                                        _ta = wh.hn(_a) === 'h';
                                        _aa = _ta ? wh.rv(_a) : _a;
                                        _d = _aa[_b];
                                        _td = wh.hn(_d) === 'h';
                                        o.is_affected |= _ta || _td;
                                        return wh.rv(_d);
                                    }
                                }
                                return undefined;
                        }
                        break;
                    case 8:
                        _a = {};
                        _a[ops[1]] = rev(ops[2], e, s, g, o, _f);
                        return _a;
                        break;
                    case 9:
                        _a = rev(ops[1], e, s, g, o, _f);
                        _b = rev(ops[2], e, s, g, o, _f);

                        function merge(_a, _b, _ow) {
                            var ka, _bbk;
                            _ta = wh.hn(_a) === 'h';
                            _tb = wh.hn(_b) === 'h';
                            _aa = wh.rv(_a);
                            _bb = wh.rv(_b);
                            for (var k in _bb) {
                                if (_ow || !_aa.hasOwnProperty(k)) {
                                    _aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k], 'e') : _bb[k]) : wh.rv(_bb[k]);
                                }
                            }
                            return _a;
                        }
                        var _c = _a
                        var _ow = true
                        if (typeof(ops[1][0]) === "object" && ops[1][0][0] === 10) {
                            _a = _b
                            _b = _c
                            _ow = false
                        }
                        if (typeof(ops[1][0]) === "object" && ops[1][0][0] === 10) {
                            var _r = {}
                            return merge(merge(_r, _a, _ow), _b, _ow);
                        } else
                            return merge(_a, _b, _ow);
                        break;
                    case 10:
                        _a = rev(ops[1], e, s, g, o, _f);
                        _a = should_pass_type_info ? _a : wh.rv(_a);
                        return _a;
                        break;
                    case 12:
                        var _r;
                        _a = rev(ops[1], e, s, g, o);
                        if (!o.ap) {
                            return should_pass_type_info && wh.hn(_a) === 'h' ? wh.nh(_r, 'f') : _r;
                        }
                        var ap = o.ap;
                        _b = rev(ops[2], e, s, g, o, _f);
                        o.ap = ap;
                        _ta = wh.hn(_a) === 'h';
                        _tb = _ca(_b);
                        _aa = wh.rv(_a);
                        _bb = wh.rv(_b);
                        snap_bb = $gdc(_bb, "nv_");
                        try {
                            _r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
                        } catch (e) {
                            e.message = e.message.replace(/nv_/g, "");
                            e.stack = e.stack.substring(0, e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
                            e.stack = e.stack.replace(/\snv_/g, " ");
                            e.stack = $gstack(e.stack);
                            if (g.debugInfo) {
                                e.stack += "\n " + " " + " " + " at " + g.debugInfo[0] + ":" + g.debugInfo[1] + ":" + g.debugInfo[2];
                                console.error(e);
                            }
                            _r = undefined;
                        }
                        return should_pass_type_info && (_tb || _ta) ? wh.nh(_r, 'f') : _r;
                }
            } else {
                if (op === 3 || op === 1) return ops[1];
                else if (op === 11) {
                    var _a = '';
                    for (var i = 1; i < ops.length; i++) {
                        var xp = wh.rv(rev(ops[i], e, s, g, o, _f));
                        _a += typeof(xp) === 'undefined' ? '' : xp;
                    }
                    return _a;
                }
            }
        }

        function wrapper(ops, e, s, g, o, newap) {
            if (ops[0] == '11182016') {
                g.debugInfo = ops[2];
                return rev(ops[1], e, s, g, o, newap);
            } else {
                g.debugInfo = null;
                return rev(ops, e, s, g, o, newap);
            }
        }
        return wrapper;
    }
    gra = $gwrt(true);
    grb = $gwrt(false);

    function TestTest(expr, ops, e, s, g, expect_a, expect_b, expect_affected) {
        {
            var o = {
                is_affected: false
            };
            var a = gra(ops, e, s, g, o);
            if (JSON.stringify(a) != JSON.stringify(expect_a) || o.is_affected != expect_affected) {
                console.warn("A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify(expect_a) + ", " + expect_affected + " is expected");
            }
        } {
            var o = {
                is_affected: false
            };
            var a = grb(ops, e, s, g, o);
            if (JSON.stringify(a) != JSON.stringify(expect_b) || o.is_affected != expect_affected) {
                console.warn("B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify(expect_b) + ", " + expect_affected + " is expected");
            }
        }
    }

    function wfor(to_iter, func, env, _s, global, father, itemname, indexname, keyname) {
        var _n = wh.hn(to_iter) === 'n';
        var scope = wh.rv(_s);
        var has_old_item = scope.hasOwnProperty(itemname);
        var has_old_index = scope.hasOwnProperty(indexname);
        var old_item = scope[itemname];
        var old_index = scope[indexname];
        var full = Object.prototype.toString.call(wh.rv(to_iter));
        var type = full[8];
        if (type === 'N' && full[10] === 'l') type = 'X';
        var _y;
        if (_n) {
            if (type === 'A') {
                var r_iter_item;
                for (var i = 0; i < to_iter.length; i++) {
                    scope[itemname] = to_iter[i];
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    r_iter_item = wh.rv(to_iter[i]);
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'O') {
                var i = 0;
                var r_iter_item;
                for (var k in to_iter) {
                    scope[itemname] = to_iter[k];
                    scope[indexname] = _n ? k : wh.nh(k, 'h');
                    r_iter_item = wh.rv(to_iter[k]);
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                    i++;
                }
            } else if (type === 'S') {
                for (var i = 0; i < to_iter.length; i++) {
                    scope[itemname] = to_iter[i];
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(to_iter[i] + i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'N') {
                for (var i = 0; i < to_iter; i++) {
                    scope[itemname] = i;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else {}
        } else {
            var r_to_iter = wh.rv(to_iter);
            var r_iter_item, iter_item;
            if (type === 'A') {
                for (var i = 0; i < r_to_iter.length; i++) {
                    iter_item = r_to_iter[i];
                    iter_item = wh.hn(iter_item) === 'n' ? wh.nh(iter_item, 'h') : iter_item;
                    r_iter_item = wh.rv(iter_item);
                    scope[itemname] = iter_item
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'O') {
                var i = 0;
                for (var k in r_to_iter) {
                    iter_item = r_to_iter[k];
                    iter_item = wh.hn(iter_item) === 'n' ? wh.nh(iter_item, 'h') : iter_item;
                    r_iter_item = wh.rv(iter_item);
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? k : wh.nh(k, 'h');
                    var key = keyname && r_iter_item ? (keyname === "*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
                    _y = _v(key);
                    _(father, _y);
                    func(env, scope, _y, global);
                    i++
                }
            } else if (type === 'S') {
                for (var i = 0; i < r_to_iter.length; i++) {
                    iter_item = wh.nh(r_to_iter[i], 'h');
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(to_iter[i] + i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else if (type === 'N') {
                for (var i = 0; i < r_to_iter; i++) {
                    iter_item = wh.nh(i, 'h');
                    scope[itemname] = iter_item;
                    scope[indexname] = _n ? i : wh.nh(i, 'h');
                    _y = _v(i);
                    _(father, _y);
                    func(env, scope, _y, global);
                }
            } else {}
        }
        if (has_old_item) {
            scope[itemname] = old_item;
        } else {
            delete scope[itemname];
        }
        if (has_old_index) {
            scope[indexname] = old_index;
        } else {
            delete scope[indexname];
        }
    }

    function _ca(o) {
        if (wh.hn(o) == 'h') return true;
        if (typeof o !== "object") return false;
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                if (_ca(o[i])) return true;
            }
        }
        return false;
    }

    function _da(node, attrname, opindex, raw, o) {
        var isaffected = false;
        var value = $gdc(raw, "", 2);
        if (o.ap && value && value.constructor === Function) {
            attrname = "$wxs:" + attrname;
            node.attr["$gdc"] = $gdc;
        }
        if (o.is_affected || _ca(raw)) {
            node.n.push(attrname);
            node.raw[attrname] = raw;
        }
        node.attr[attrname] = value;
    }

    function _r(node, attrname, opindex, env, scope, global) {
        global.opindex = opindex;
        var o = {},
            _env;
        var a = grb(z[opindex], env, scope, global, o);
        _da(node, attrname, opindex, a, o);
    }

    function _rz(z, node, attrname, opindex, env, scope, global) {
        global.opindex = opindex;
        var o = {},
            _env;
        var a = grb(z[opindex], env, scope, global, o);
        _da(node, attrname, opindex, a, o);
    }

    function _o(opindex, env, scope, global) {
        global.opindex = opindex;
        var nothing = {};
        var r = grb(z[opindex], env, scope, global, nothing);
        return (r && r.constructor === Function) ? undefined : r;
    }

    function _oz(z, opindex, env, scope, global) {
        global.opindex = opindex;
        var nothing = {};
        var r = grb(z[opindex], env, scope, global, nothing);
        return (r && r.constructor === Function) ? undefined : r;
    }

    function _1(opindex, env, scope, global, o) {
        var o = o || {};
        global.opindex = opindex;
        return gra(z[opindex], env, scope, global, o);
    }

    function _1z(z, opindex, env, scope, global, o) {
        var o = o || {};
        global.opindex = opindex;
        return gra(z[opindex], env, scope, global, o);
    }

    function _2(opindex, func, env, scope, global, father, itemname, indexname, keyname) {
        var o = {};
        var to_iter = _1(opindex, env, scope, global);
        wfor(to_iter, func, env, scope, global, father, itemname, indexname, keyname);
    }

    function _2z(z, opindex, func, env, scope, global, father, itemname, indexname, keyname) {
        var o = {};
        var to_iter = _1z(z, opindex, env, scope, global);
        wfor(to_iter, func, env, scope, global, father, itemname, indexname, keyname);
    }


    function _m(tag, attrs, generics, env, scope, global) {
        var tmp = _n(tag);
        var base = 0;
        for (var i = 0; i < attrs.length; i += 2) {
            if (base + attrs[i + 1] < 0) {
                tmp.attr[attrs[i]] = true;
            } else {
                _r(tmp, attrs[i], base + attrs[i + 1], env, scope, global);
                if (base === 0) base = attrs[i + 1];
            }
        }
        for (var i = 0; i < generics.length; i += 2) {
            if (base + generics[i + 1] < 0) {
                tmp.generics[generics[i]] = "";
            } else {
                var $t = grb(z[base + generics[i + 1]], env, scope, global);
                if ($t != "") $t = "wx-" + $t;
                tmp.generics[generics[i]] = $t;
                if (base === 0) base = generics[i + 1];
            }
        }
        return tmp;
    }

    function _mz(z, tag, attrs, generics, env, scope, global) {
        var tmp = _n(tag);
        var base = 0;
        for (var i = 0; i < attrs.length; i += 2) {
            if (base + attrs[i + 1] < 0) {
                tmp.attr[attrs[i]] = true;
            } else {
                _rz(z, tmp, attrs[i], base + attrs[i + 1], env, scope, global);
                if (base === 0) base = attrs[i + 1];
            }
        }
        for (var i = 0; i < generics.length; i += 2) {
            if (base + generics[i + 1] < 0) {
                tmp.generics[generics[i]] = "";
            } else {
                var $t = grb(z[base + generics[i + 1]], env, scope, global);
                if ($t != "") $t = "wx-" + $t;
                tmp.generics[generics[i]] = $t;
                if (base === 0) base = generics[i + 1];
            }
        }
        return tmp;
    }

    var nf_init = function() {
        if (typeof __WXML_GLOBAL__ === "undefined" || undefined === __WXML_GLOBAL__.wxs_nf_init) {
            nf_init_Object();
            nf_init_Function();
            nf_init_Array();
            nf_init_String();
            nf_init_Boolean();
            nf_init_Number();
            nf_init_Math();
            nf_init_Date();
            nf_init_RegExp();
        }
        if (typeof __WXML_GLOBAL__ !== "undefined") __WXML_GLOBAL__.wxs_nf_init = true;
    };
    var nf_init_Object = function() {
        Object.defineProperty(Object.prototype, "nv_constructor", {
            writable: true,
            value: "Object"
        })
        Object.defineProperty(Object.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return "[object Object]"
            }
        })
    }
    var nf_init_Function = function() {
        Object.defineProperty(Function.prototype, "nv_constructor", {
            writable: true,
            value: "Function"
        })
        Object.defineProperty(Function.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function() {}
        });
        Object.defineProperty(Function.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return "[function Function]"
            }
        })
    }
    var nf_init_Array = function() {
        Object.defineProperty(Array.prototype, "nv_toString", {
            writable: true,
            value: function() {
                return this.nv_join();
            }
        })
        Object.defineProperty(Array.prototype, "nv_join", {
            writable: true,
            value: function(s) {
                s = undefined == s ? ',' : s;
                var r = "";
                for (var i = 0; i < this.length; ++i) {
                    if (0 != i) r += s;
                    if (null == this[i] || undefined == this[i]) r += '';
                    else if (typeof this[i] == 'function') r += this[i].nv_toString();
                    else if (typeof this[i] == 'object' && this[i].nv_constructor === "Array") r += this[i].nv_join();
                    else r += this[i].toString();
                }
                return r;
            }
        })
        Object.defineProperty(Array.prototype, "nv_constructor", {
            writable: true,
            value: "Array"
        })
        Object.defineProperty(Array.prototype, "nv_concat", {
            writable: true,
            value: Array.prototype.concat
        })
        Object.defineProperty(Array.prototype, "nv_pop", {
            writable: true,
            value: Array.prototype.pop
        })
        Object.defineProperty(Array.prototype, "nv_push", {
            writable: true,
            value: Array.prototype.push
        })
        Object.defineProperty(Array.prototype, "nv_reverse", {
            writable: true,
            value: Array.prototype.reverse
        })
        Object.defineProperty(Array.prototype, "nv_shift", {
            writable: true,
            value: Array.prototype.shift
        })
        Object.defineProperty(Array.prototype, "nv_slice", {
            writable: true,
            value: Array.prototype.slice
        })
        Object.defineProperty(Array.prototype, "nv_sort", {
            writable: true,
            value: Array.prototype.sort
        })
        Object.defineProperty(Array.prototype, "nv_splice", {
            writable: true,
            value: Array.prototype.splice
        })
        Object.defineProperty(Array.prototype, "nv_unshift", {
            writable: true,
            value: Array.prototype.unshift
        })
        Object.defineProperty(Array.prototype, "nv_indexOf", {
            writable: true,
            value: Array.prototype.indexOf
        })
        Object.defineProperty(Array.prototype, "nv_lastIndexOf", {
            writable: true,
            value: Array.prototype.lastIndexOf
        })
        Object.defineProperty(Array.prototype, "nv_every", {
            writable: true,
            value: Array.prototype.every
        })
        Object.defineProperty(Array.prototype, "nv_some", {
            writable: true,
            value: Array.prototype.some
        })
        Object.defineProperty(Array.prototype, "nv_forEach", {
            writable: true,
            value: Array.prototype.forEach
        })
        Object.defineProperty(Array.prototype, "nv_map", {
            writable: true,
            value: Array.prototype.map
        })
        Object.defineProperty(Array.prototype, "nv_filter", {
            writable: true,
            value: Array.prototype.filter
        })
        Object.defineProperty(Array.prototype, "nv_reduce", {
            writable: true,
            value: Array.prototype.reduce
        })
        Object.defineProperty(Array.prototype, "nv_reduceRight", {
            writable: true,
            value: Array.prototype.reduceRight
        })
        Object.defineProperty(Array.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function(value) {
                this.length = value;
            }
        });
    }
    var nf_init_String = function() {
        Object.defineProperty(String.prototype, "nv_constructor", {
            writable: true,
            value: "String"
        })
        Object.defineProperty(String.prototype, "nv_toString", {
            writable: true,
            value: String.prototype.toString
        })
        Object.defineProperty(String.prototype, "nv_valueOf", {
            writable: true,
            value: String.prototype.valueOf
        })
        Object.defineProperty(String.prototype, "nv_charAt", {
            writable: true,
            value: String.prototype.charAt
        })
        Object.defineProperty(String.prototype, "nv_charCodeAt", {
            writable: true,
            value: String.prototype.charCodeAt
        })
        Object.defineProperty(String.prototype, "nv_concat", {
            writable: true,
            value: String.prototype.concat
        })
        Object.defineProperty(String.prototype, "nv_indexOf", {
            writable: true,
            value: String.prototype.indexOf
        })
        Object.defineProperty(String.prototype, "nv_lastIndexOf", {
            writable: true,
            value: String.prototype.lastIndexOf
        })
        Object.defineProperty(String.prototype, "nv_localeCompare", {
            writable: true,
            value: String.prototype.localeCompare
        })
        Object.defineProperty(String.prototype, "nv_match", {
            writable: true,
            value: String.prototype.match
        })
        Object.defineProperty(String.prototype, "nv_replace", {
            writable: true,
            value: String.prototype.replace
        })
        Object.defineProperty(String.prototype, "nv_search", {
            writable: true,
            value: String.prototype.search
        })
        Object.defineProperty(String.prototype, "nv_slice", {
            writable: true,
            value: String.prototype.slice
        })
        Object.defineProperty(String.prototype, "nv_split", {
            writable: true,
            value: String.prototype.split
        })
        Object.defineProperty(String.prototype, "nv_substring", {
            writable: true,
            value: String.prototype.substring
        })
        Object.defineProperty(String.prototype, "nv_toLowerCase", {
            writable: true,
            value: String.prototype.toLowerCase
        })
        Object.defineProperty(String.prototype, "nv_toLocaleLowerCase", {
            writable: true,
            value: String.prototype.toLocaleLowerCase
        })
        Object.defineProperty(String.prototype, "nv_toUpperCase", {
            writable: true,
            value: String.prototype.toUpperCase
        })
        Object.defineProperty(String.prototype, "nv_toLocaleUpperCase", {
            writable: true,
            value: String.prototype.toLocaleUpperCase
        })
        Object.defineProperty(String.prototype, "nv_trim", {
            writable: true,
            value: String.prototype.trim
        })
        Object.defineProperty(String.prototype, "nv_length", {get: function() {
                return this.length;
            },
            set: function(value) {
                this.length = value;
            }
        });
    }
    var nf_init_Boolean = function() {
        Object.defineProperty(Boolean.prototype, "nv_constructor", {
            writable: true,
            value: "Boolean"
        })
        Object.defineProperty(Boolean.prototype, "nv_toString", {
            writable: true,
            value: Boolean.prototype.toString
        })
        Object.defineProperty(Boolean.prototype, "nv_valueOf", {
            writable: true,
            value: Boolean.prototype.valueOf
        })
    }
    var nf_init_Number = function() {
        Object.defineProperty(Number, "nv_MAX_VALUE", {
            writable: false,
            value: Number.MAX_VALUE
        })
        Object.defineProperty(Number, "nv_MIN_VALUE", {
            writable: false,
            value: Number.MIN_VALUE
        })
        Object.defineProperty(Number, "nv_NEGATIVE_INFINITY", {
            writable: false,
            value: Number.NEGATIVE_INFINITY
        })
        Object.defineProperty(Number, "nv_POSITIVE_INFINITY", {
            writable: false,
            value: Number.POSITIVE_INFINITY
        })
        Object.defineProperty(Number.prototype, "nv_constructor", {
            writable: true,
            value: "Number"
        })
        Object.defineProperty(Number.prototype, "nv_toString", {
            writable: true,
            value: Number.prototype.toString
        })
        Object.defineProperty(Number.prototype, "nv_toLocaleString", {
            writable: true,
            value: Number.prototype.toLocaleString
        })
        Object.defineProperty(Number.prototype, "nv_valueOf", {
            writable: true,
            value: Number.prototype.valueOf
        })
        Object.defineProperty(Number.prototype, "nv_toFixed", {
            writable: true,
            value: Number.prototype.toFixed
        })
        Object.defineProperty(Number.prototype, "nv_toExponential", {
            writable: true,
            value: Number.prototype.toExponential
        })
        Object.defineProperty(Number.prototype, "nv_toPrecision", {
            writable: true,
            value: Number.prototype.toPrecision
        })
    }
    var nf_init_Math = function() {
        Object.defineProperty(Math, "nv_E", {
            writable: false,
            value: Math.E
        })
        Object.defineProperty(Math, "nv_LN10", {
            writable: false,
            value: Math.LN10
        })
        Object.defineProperty(Math, "nv_LN2", {
            writable: false,
            value: Math.LN2
        })
        Object.defineProperty(Math, "nv_LOG2E", {
            writable: false,
            value: Math.LOG2E
        })
        Object.defineProperty(Math, "nv_LOG10E", {
            writable: false,
            value: Math.LOG10E
        })
        Object.defineProperty(Math, "nv_PI", {
            writable: false,
            value: Math.PI
        })
        Object.defineProperty(Math, "nv_SQRT1_2", {
            writable: false,
            value: Math.SQRT1_2
        })
        Object.defineProperty(Math, "nv_SQRT2", {
            writable: false,
            value: Math.SQRT2
        })
        Object.defineProperty(Math, "nv_abs", {
            writable: false,
            value: Math.abs
        })
        Object.defineProperty(Math, "nv_acos", {
            writable: false,
            value: Math.acos
        })
        Object.defineProperty(Math, "nv_asin", {
            writable: false,
            value: Math.asin
        })
        Object.defineProperty(Math, "nv_atan", {
            writable: false,
            value: Math.atan
        })
        Object.defineProperty(Math, "nv_atan2", {
            writable: false,
            value: Math.atan2
        })
        Object.defineProperty(Math, "nv_ceil", {
            writable: false,
            value: Math.ceil
        })
        Object.defineProperty(Math, "nv_cos", {
            writable: false,
            value: Math.cos
        })
        Object.defineProperty(Math, "nv_exp", {
            writable: false,
            value: Math.exp
        })
        Object.defineProperty(Math, "nv_floor", {
            writable: false,
            value: Math.floor
        })
        Object.defineProperty(Math, "nv_log", {
            writable: false,
            value: Math.log
        })
        Object.defineProperty(Math, "nv_max", {
            writable: false,
            value: Math.max
        })
        Object.defineProperty(Math, "nv_min", {
            writable: false,
            value: Math.min
        })
        Object.defineProperty(Math, "nv_pow", {
            writable: false,
            value: Math.pow
        })
        Object.defineProperty(Math, "nv_random", {
            writable: false,
            value: Math.random
        })
        Object.defineProperty(Math, "nv_round", {
            writable: false,
            value: Math.round
        })
        Object.defineProperty(Math, "nv_sin", {
            writable: false,
            value: Math.sin
        })
        Object.defineProperty(Math, "nv_sqrt", {
            writable: false,
            value: Math.sqrt
        })
        Object.defineProperty(Math, "nv_tan", {
            writable: false,
            value: Math.tan
        })
    }
    var nf_init_Date = function() {
        Object.defineProperty(Date.prototype, "nv_constructor", {
            writable: true,
            value: "Date"
        })
        Object.defineProperty(Date, "nv_parse", {
            writable: true,
            value: Date.parse
        })
        Object.defineProperty(Date, "nv_UTC", {
            writable: true,
            value: Date.UTC
        })
        Object.defineProperty(Date, "nv_now", {
            writable: true,
            value: Date.now
        })
        Object.defineProperty(Date.prototype, "nv_toString", {
            writable: true,
            value: Date.prototype.toString
        })
        Object.defineProperty(Date.prototype, "nv_toDateString", {
            writable: true,
            value: Date.prototype.toDateString
        })
        Object.defineProperty(Date.prototype, "nv_toTimeString", {
            writable: true,
            value: Date.prototype.toTimeString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleString", {
            writable: true,
            value: Date.prototype.toLocaleString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleDateString", {
            writable: true,
            value: Date.prototype.toLocaleDateString
        })
        Object.defineProperty(Date.prototype, "nv_toLocaleTimeString", {
            writable: true,
            value: Date.prototype.toLocaleTimeString
        })
        Object.defineProperty(Date.prototype, "nv_valueOf", {
            writable: true,
            value: Date.prototype.valueOf
        })
        Object.defineProperty(Date.prototype, "nv_getTime", {
            writable: true,
            value: Date.prototype.getTime
        })
        Object.defineProperty(Date.prototype, "nv_getFullYear", {
            writable: true,
            value: Date.prototype.getFullYear
        })
        Object.defineProperty(Date.prototype, "nv_getUTCFullYear", {
            writable: true,
            value: Date.prototype.getUTCFullYear
        })
        Object.defineProperty(Date.prototype, "nv_getMonth", {
            writable: true,
            value: Date.prototype.getMonth
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMonth", {
            writable: true,
            value: Date.prototype.getUTCMonth
        })
        Object.defineProperty(Date.prototype, "nv_getDate", {
            writable: true,
            value: Date.prototype.getDate
        })
        Object.defineProperty(Date.prototype, "nv_getUTCDate", {
            writable: true,
            value: Date.prototype.getUTCDate
        })
        Object.defineProperty(Date.prototype, "nv_getDay", {
            writable: true,
            value: Date.prototype.getDay
        })
        Object.defineProperty(Date.prototype, "nv_getUTCDay", {
            writable: true,
            value: Date.prototype.getUTCDay
        })
        Object.defineProperty(Date.prototype, "nv_getHours", {
            writable: true,
            value: Date.prototype.getHours
        })
        Object.defineProperty(Date.prototype, "nv_getUTCHours", {
            writable: true,
            value: Date.prototype.getUTCHours
        })
        Object.defineProperty(Date.prototype, "nv_getMinutes", {
            writable: true,
            value: Date.prototype.getMinutes
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMinutes", {
            writable: true,
            value: Date.prototype.getUTCMinutes
        })
        Object.defineProperty(Date.prototype, "nv_getSeconds", {
            writable: true,
            value: Date.prototype.getSeconds
        })
        Object.defineProperty(Date.prototype, "nv_getUTCSeconds", {
            writable: true,
            value: Date.prototype.getUTCSeconds
        })
        Object.defineProperty(Date.prototype, "nv_getMilliseconds", {
            writable: true,
            value: Date.prototype.getMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_getUTCMilliseconds", {
            writable: true,
            value: Date.prototype.getUTCMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_getTimezoneOffset", {
            writable: true,
            value: Date.prototype.getTimezoneOffset
        })
        Object.defineProperty(Date.prototype, "nv_setTime", {
            writable: true,
            value: Date.prototype.setTime
        })
        Object.defineProperty(Date.prototype, "nv_setMilliseconds", {
            writable: true,
            value: Date.prototype.setMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMilliseconds", {
            writable: true,
            value: Date.prototype.setUTCMilliseconds
        })
        Object.defineProperty(Date.prototype, "nv_setSeconds", {
            writable: true,
            value: Date.prototype.setSeconds
        })
        Object.defineProperty(Date.prototype, "nv_setUTCSeconds", {
            writable: true,
            value: Date.prototype.setUTCSeconds
        })
        Object.defineProperty(Date.prototype, "nv_setMinutes", {
            writable: true,
            value: Date.prototype.setMinutes
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMinutes", {
            writable: true,
            value: Date.prototype.setUTCMinutes
        })
        Object.defineProperty(Date.prototype, "nv_setHours", {
            writable: true,
            value: Date.prototype.setHours
        })
        Object.defineProperty(Date.prototype, "nv_setUTCHours", {
            writable: true,
            value: Date.prototype.setUTCHours
        })
        Object.defineProperty(Date.prototype, "nv_setDate", {
            writable: true,
            value: Date.prototype.setDate
        })
        Object.defineProperty(Date.prototype, "nv_setUTCDate", {
            writable: true,
            value: Date.prototype.setUTCDate
        })
        Object.defineProperty(Date.prototype, "nv_setMonth", {
            writable: true,
            value: Date.prototype.setMonth
        })
        Object.defineProperty(Date.prototype, "nv_setUTCMonth", {
            writable: true,
            value: Date.prototype.setUTCMonth
        })
        Object.defineProperty(Date.prototype, "nv_setFullYear", {
            writable: true,
            value: Date.prototype.setFullYear
        })
        Object.defineProperty(Date.prototype, "nv_setUTCFullYear", {
            writable: true,
            value: Date.prototype.setUTCFullYear
        })
        Object.defineProperty(Date.prototype, "nv_toUTCString", {
            writable: true,
            value: Date.prototype.toUTCString
        })
        Object.defineProperty(Date.prototype, "nv_toISOString", {
            writable: true,
            value: Date.prototype.toISOString
        })
        Object.defineProperty(Date.prototype, "nv_toJSON", {
            writable: true,
            value: Date.prototype.toJSON
        })
    }
    var nf_init_RegExp = function() {
        Object.defineProperty(RegExp.prototype, "nv_constructor", {
            writable: true,
            value: "RegExp"
        })
        Object.defineProperty(RegExp.prototype, "nv_exec", {
            writable: true,
            value: RegExp.prototype.exec
        })
        Object.defineProperty(RegExp.prototype, "nv_test", {
            writable: true,
            value: RegExp.prototype.test
        })
        Object.defineProperty(RegExp.prototype, "nv_toString", {
            writable: true,
            value: RegExp.prototype.toString
        })
        Object.defineProperty(RegExp.prototype, "nv_source", {get: function() {
                return this.source;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_global", {get: function() {
                return this.global;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_ignoreCase", {get: function() {
                return this.ignoreCase;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_multiline", {get: function() {
                return this.multiline;
            },
            set: function() {}
        });
        Object.defineProperty(RegExp.prototype, "nv_lastIndex", {get: function() {
                return this.lastIndex;
            },
            set: function(v) {
                this.lastIndex = v;
            }
        });
    }
    nf_init();
    var nv_getDate = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(Date);
        return new(Function.prototype.bind.apply(Date, args));
    }
    var nv_getRegExp = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(RegExp);
        return new(Function.prototype.bind.apply(RegExp, args));
    }
    var nv_console = {}
    nv_console.nv_log = function() {
        var res = "WXSRT:";
        for (var i = 0; i < arguments.length; ++i) res += arguments[i] + " ";
        console.log(res);
    }
    var nv_parseInt = parseInt,
        nv_parseFloat = parseFloat,
        nv_isNaN = isNaN,
        nv_isFinite = isFinite,
        nv_decodeURI = decodeURI,
        nv_decodeURIComponent = decodeURIComponent,
        nv_encodeURI = encodeURI,
        nv_encodeURIComponent = encodeURIComponent;

    function $gdc(o, p, r) {
        o = wh.rv(o);
        if (o === null || o === undefined) return o;
        if (typeof o === "string" || typeof o === "boolean" || typeof o === "number") return o;
        if (o.constructor === Object) {
            var copy = {};
            for (var k in o)
                if (Object.prototype.hasOwnProperty.call(o, k))
                    if (undefined === p) copy[k.substring(3)] = $gdc(o[k], p, r);
                    else copy[p + k] = $gdc(o[k], p, r);
            return copy;
        }
        if (o.constructor === Array) {
            var copy = [];
            for (var i = 0; i < o.length; i++) copy.push($gdc(o[i], p, r));
            return copy;
        }
        if (o.constructor === Date) {
            var copy = new Date();
            copy.setTime(o.getTime());
            return copy;
        }
        if (o.constructor === RegExp) {
            var f = "";
            if (o.global) f += "g";
            if (o.ignoreCase) f += "i";
            if (o.multiline) f += "m";
            return (new RegExp(o.source, f));
        }
        if (r && typeof o === "function") {
            if (r == 1) return $gdc(o(), undefined, 2);
            if (r == 2) return o;
        }
        return null;
    }
    var nv_JSON = {}
    nv_JSON.nv_stringify = function(o) {
        JSON.stringify(o);
        return JSON.stringify($gdc(o));
    }
    nv_JSON.nv_parse = function(o) {
        if (o === undefined) return undefined;
        var t = JSON.parse(o);
        return $gdc(t, 'nv_');
    }

    function _af(p, a, r, c) {
        p.extraAttr = {
            "t_action": a,
            "t_rawid": r
        };
        if (typeof(c) != 'undefined') p.extraAttr.t_cid = c;
    }

    function _ai(i, p, e, me, r, c) {
        var x = _grp(p, e, me);
        if (x) i.push(x);
        else {
            i.push('');
            _wp(me + ':import:' + r + ':' + c + ': Path `' + p + '` not found from `' + me + '`.')
        }
    }

    function _grp(p, e, me) {
        if (p[0] != '/') {
            var mepart = me.split('/');
            mepart.pop();
            var ppart = p.split('/');
            for (var i = 0; i < ppart.length; i++) {
                if (ppart[i] == '..') mepart.pop();
                else if (!ppart[i] || ppart[i] == '.') continue;
                else mepart.push(ppart[i]);
            }
            p = mepart.join('/');
        }
        if (me[0] == '.' && p[0] == '/') p = '.' + p;
        if (e[p]) return p;
        if (e[p + '.wxml']) return p + '.wxml';
    }

    function _gd(p, c, e, d) {
        if (!c) return;
        if (d[p][c]) return d[p][c];
        for (var x = e[p].i.length - 1; x >= 0; x--) {
            if (e[p].i[x] && d[e[p].i[x]][c]) return d[e[p].i[x]][c]
        };
        for (var x = e[p].ti.length - 1; x >= 0; x--) {
            var q = _grp(e[p].ti[x], e, p);
            if (q && d[q][c]) return d[q][c]
        }
        var ii = _gapi(e, p);
        for (var x = 0; x < ii.length; x++) {
            if (ii[x] && d[ii[x]][c]) return d[ii[x]][c]
        }
        for (var k = e[p].j.length - 1; k >= 0; k--)
            if (e[p].j[k]) {
                for (var q = e[e[p].j[k]].ti.length - 1; q >= 0; q--) {
                    var pp = _grp(e[e[p].j[k]].ti[q], e, p);
                    if (pp && d[pp][c]) {
                        return d[pp][c]
                    }
                }
            }
    }

    function _gapi(e, p) {
        if (!p) return [];
        if ($gaic[p]) {
            return $gaic[p]
        };
        var ret = [],
            q = [],
            h = 0,
            t = 0,
            put = {},
            visited = {};
        q.push(p);
        visited[p] = true;
        t++;
        while (h < t) {
            var a = q[h++];
            for (var i = 0; i < e[a].ic.length; i++) {
                var nd = e[a].ic[i];
                var np = _grp(nd, e, a);
                if (np && !visited[np]) {
                    visited[np] = true;
                    q.push(np);
                    t++;
                }
            }
            for (var i = 0; a != p && i < e[a].ti.length; i++) {
                var ni = e[a].ti[i];
                var nm = _grp(ni, e, a);
                if (nm && !put[nm]) {
                    put[nm] = true;
                    ret.push(nm);
                }
            }
        }
        $gaic[p] = ret;
        return ret;
    }
    var $ixc = {};

    function _ic(p, ent, me, e, s, r, gg) {
        var x = _grp(p, ent, me);
        ent[me].j.push(x);
        if (x) {
            if ($ixc[x]) {
                _wp('-1:include:-1:-1: `' + p + '` is being included in a loop, will be stop.');
                return;
            }
            $ixc[x] = true;
            try {
                ent[x].f(e, s, r, gg)
            } catch (e) {}
            $ixc[x] = false;
        } else {
            _wp(me + ':include:-1:-1: Included path `' + p + '` not found from `' + me + '`.')
        }
    }

    function _w(tn, f, line, c) {
        _wp(f + ':template:' + line + ':' + c + ': Template `' + tn + '` not found.');
    }

    function _ev(dom) {
        var changed = false;
        delete dom.properities;
        delete dom.n;
        if (dom.children) {
            do {
                changed = false;
                var newch = [];
                for (var i = 0; i < dom.children.length; i++) {
                    var ch = dom.children[i];
                    if (ch.tag == 'virtual') {
                        changed = true;
                        for (var j = 0; ch.children && j < ch.children.length; j++) {
                            newch.push(ch.children[j]);
                        }
                    } else {
                        newch.push(ch);
                    }
                }
                dom.children = newch;
            } while (changed);
            for (var i = 0; i < dom.children.length; i++) {
                _ev(dom.children[i]);
            }
        }
        return dom;
    }

    function _tsd(root) {
        if (root.tag == "wx-wx-scope") {
            root.tag = "virtual";
            root.wxCkey = "11";
            root['wxScopeData'] = root.attr['wx:scope-data'];
            delete root.n;
            delete root.raw;
            delete root.generics;
            delete root.attr;
        }
        for (var i = 0; root.children && i < root.children.length; i++) {
            _tsd(root.children[i]);
        }
        return root;
    }

    var e_ = {}
    if (typeof(global.entrys) === 'undefined') global.entrys = {};
    e_ = global.entrys;
    var d_ = {}
    if (typeof(global.defines) === 'undefined') global.defines = {};
    d_ = global.defines;
    var f_ = {}
    if (typeof(global.modules) === 'undefined') global.modules = {};
    f_ = global.modules || {};
    var p_ = {}
    __WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
    __WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
    __WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
    var z = __WXML_GLOBAL__.ops_set.$gwx0 || [];

    function gz$gwx0_1() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_1) return __WXML_GLOBAL__.ops_cached.$gwx0_1
        __WXML_GLOBAL__.ops_cached.$gwx0_1 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'analysis-container data-v-37bd3b6d'])
            Z([3, 'chart-container data-v-37bd3b6d'])
            Z([
                [7],
                [3, 'i']
            ])
            Z([
                [7],
                [3, 'j']
            ])
            Z([3, '__l'])
            Z([3, 'data-v-37bd3b6d'])
            Z([3, '37bd3b6d-0'])
            Z(z[3])
            Z([
                [7],
                [3, 'k']
            ])
            Z([
                [7],
                [3, 'l']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-1'])
            Z(z[9])
            Z([
                [7],
                [3, 'm']
            ])
            Z([
                [7],
                [3, 'n']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-2'])
            Z(z[15])
            Z(z[1])
            Z([
                [7],
                [3, 'y']
            ])
            Z([
                [7],
                [3, 'z']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-3'])
            Z(z[22])
            Z([
                [7],
                [3, 'A']
            ])
            Z([
                [7],
                [3, 'B']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-4'])
            Z(z[28])
            Z([
                [7],
                [3, 'C']
            ])
            Z([
                [7],
                [3, 'D']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-5'])
            Z(z[34])
            Z([
                [7],
                [3, 'E']
            ])
            Z([
                [7],
                [3, 'F']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-6'])
            Z(z[40])
            Z(z[1])
            Z([
                [7],
                [3, 'P']
            ])
            Z([
                [7],
                [3, 'Q']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-7'])
            Z(z[47])
            Z([
                [7],
                [3, 'R']
            ])
            Z([
                [7],
                [3, 'S']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-8'])
            Z(z[53])
            Z([
                [7],
                [3, 'T']
            ])
            Z([
                [7],
                [3, 'U']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-9'])
            Z(z[59])
            Z([
                [7],
                [3, 'V']
            ])
            Z([
                [7],
                [3, 'W']
            ])
            Z(z[4])
            Z(z[5])
            Z([3, '37bd3b6d-10'])
            Z(z[65])
        })(__WXML_GLOBAL__.ops_cached.$gwx0_1);
        return __WXML_GLOBAL__.ops_cached.$gwx0_1
    }

    function gz$gwx0_2() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_2) return __WXML_GLOBAL__.ops_cached.$gwx0_2
        __WXML_GLOBAL__.ops_cached.$gwx0_2 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
        })(__WXML_GLOBAL__.ops_cached.$gwx0_2);
        return __WXML_GLOBAL__.ops_cached.$gwx0_2
    }

    function gz$gwx0_3() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_3) return __WXML_GLOBAL__.ops_cached.$gwx0_3
        __WXML_GLOBAL__.ops_cached.$gwx0_3 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'goods-list-page data-v-e28df0e3'])
            Z([
                [7],
                [3, 'a']
            ])
            Z([
                [7],
                [3, 'c']
            ])
            Z([3, '__l'])
            Z([
                [7],
                [3, 'b']
            ])
            Z([3, 'data-v-e28df0e3'])
            Z([3, 'e28df0e3-0'])
            Z(z[2])
            Z([3, 'content data-v-e28df0e3'])
            Z(z[5])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'o']
                ]
            ])
            Z([
                [7],
                [3, 'f']
            ])
            Z([
                [7],
                [3, 'j']
            ])
            Z([
                [7],
                [3, 'k']
            ])
            Z(z[5])
            Z([3, 'true'])
            Z([
                [7],
                [3, 'i']
            ])
            Z(z[15])
            Z([
                [2, '+'],
                [1, 'height:'],
                [
                    [7],
                    [3, 'l']
                ]
            ])
            Z([3, 'item'])
            Z([
                [7],
                [3, 'g']
            ])
            Z([3, 'c'])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'e']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'd']
            ])
            Z(z[5])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'b']
            ])
            Z(z[3])
            Z(z[5])
            Z([
                [6],
                [
                    [7],
                    [3, 'item']
                ],
                [3, 'a']
            ])
            Z(z[25])
            Z([
                [7],
                [3, 'm']
            ])
            Z(z[5])
            Z([
                [2, '!'],
                [
                    [7],
                    [3, 'z']
                ]
            ])
            Z([
                [7],
                [3, 'p']
            ])
            Z([
                [7],
                [3, 't']
            ])
            Z([
                [7],
                [3, 'v']
            ])
            Z(z[5])
            Z(z[15])
            Z([
                [7],
                [3, 's']
            ])
            Z(z[15])
            Z([
                [2, '+'],
                [1, 'height:'],
                [
                    [7],
                    [3, 'w']
                ]
            ])
            Z(z[19])
            Z([
                [7],
                [3, 'q']
            ])
            Z(z[21])
            Z(z[22])
            Z(z[23])
            Z(z[5])
            Z(z[25])
            Z(z[3])
            Z(z[5])
            Z(z[28])
            Z(z[25])
            Z([
                [7],
                [3, 'x']
            ])
            Z([
                [7],
                [3, 'C']
            ])
            Z(z[3])
            Z([
                [7],
                [3, 'B']
            ])
            Z([
                [7],
                [3, 'A']
            ])
            Z(z[5])
            Z([3, 'e28df0e3-3'])
            Z(z[53])
        })(__WXML_GLOBAL__.ops_cached.$gwx0_3);
        return __WXML_GLOBAL__.ops_cached.$gwx0_3
    }

    function gz$gwx0_4() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_4) return __WXML_GLOBAL__.ops_cached.$gwx0_4
        __WXML_GLOBAL__.ops_cached.$gwx0_4 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
        })(__WXML_GLOBAL__.ops_cached.$gwx0_4);
        return __WXML_GLOBAL__.ops_cached.$gwx0_4
    }

    function gz$gwx0_5() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_5) return __WXML_GLOBAL__.ops_cached.$gwx0_5
        __WXML_GLOBAL__.ops_cached.$gwx0_5 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'page-container data-v-f7184fbe'])
            Z([3, 'header-section data-v-f7184fbe'])
            Z([3, 'date-picker-wrapper data-v-f7184fbe'])
            Z([
                [7],
                [3, 'c']
            ])
            Z([3, '__l'])
            Z([
                [7],
                [3, 'a']
            ])
            Z([
                [7],
                [3, 'b']
            ])
            Z([3, 'data-v-f7184fbe'])
            Z([3, 'f7184fbe-0'])
            Z(z[3])
            Z([
                [7],
                [3, 'd']
            ])
            Z(z[4])
            Z([3, 'calendar-icon data-v-f7184fbe'])
            Z([3, 'f7184fbe-1'])
            Z(z[10])
            Z([
                [7],
                [3, 'f']
            ])
            Z([3, 'export-btn data-v-f7184fbe'])
            Z([
                [7],
                [3, 'e']
            ])
            Z(z[4])
            Z(z[7])
            Z([3, 'f7184fbe-2'])
            Z(z[17])
            Z([
                [7],
                [3, 'g']
            ])
            Z([3, 'record-list-container data-v-f7184fbe'])
            Z([
                [7],
                [3, 'j']
            ])
            Z([3, 'record'])
            Z([
                [7],
                [3, 'k']
            ])
            Z([3, 'e'])
            Z([
                [6],
                [
                    [7],
                    [3, 'record']
                ],
                [3, 'f']
            ])
            Z([3, 'record-card data-v-f7184fbe'])
            Z([
                [7],
                [3, 'l']
            ])
            Z(z[4])
            Z(z[7])
            Z([
                [6],
                [
                    [7],
                    [3, 'record']
                ],
                [3, 'd']
            ])
            Z(z[30])
            Z([
                [7],
                [3, 'n']
            ])
            Z([
                [7],
                [3, 'E']
            ])
            Z(z[4])
            Z([3, 'r data-v-f7184fbe'])
            Z([3, 'z-index:999'])
            Z([3, 'f7184fbe-4'])
            Z(z[36])
            Z([3, 'detailPopup'])
            Z([
                [4],
                [
                    [5],
                    [1, 'd']
                ]
            ])
            Z([3, 'detail-popup-content data-v-f7184fbe'])
            Z([
                [7],
                [3, 'w']
            ])
            Z([3, 'close-icon data-v-f7184fbe'])
            Z([
                [7],
                [3, 'v']
            ])
            Z(z[4])
            Z(z[7])
            Z([3, 'f7184fbe-5,f7184fbe-4'])
            Z(z[47])
            Z([
                [7],
                [3, 'x']
            ])
            Z([
                [7],
                [3, 'K']
            ])
            Z(z[4])
            Z(z[38])
            Z([3, 'f7184fbe-6'])
            Z(z[53])
            Z([3, 'exportPopup'])
            Z(z[43])
            Z([
                [7],
                [3, 'F']
            ])
            Z(z[4])
            Z(z[7])
            Z([3, 'f7184fbe-7,f7184fbe-6'])
            Z(z[60])
        })(__WXML_GLOBAL__.ops_cached.$gwx0_5);
        return __WXML_GLOBAL__.ops_cached.$gwx0_5
    }

    function gz$gwx0_6() {
        if (__WXML_GLOBAL__.ops_cached.$gwx0_6) return __WXML_GLOBAL__.ops_cached.$gwx0_6
        __WXML_GLOBAL__.ops_cached.$gwx0_6 = [];
        (function(z) {
            var a = 11;

            function Z(ops) {
                z.push(ops)
            }
            Z([3, 'usermsg-container data-v-6a45f9df'])
            Z([
                [7],
                [3, 'a']
            ])
            Z([
                [7],
                [3, 'c']
            ])
            Z([3, 'send-btn data-v-6a45f9df'])
            Z([
                [7],
                [3, 'b']
            ])
            Z([3, '__l'])
            Z([3, 'data-v-6a45f9df'])
            Z([3, '6a45f9df-0'])
            Z(z[4])
            Z([3, 'message-list data-v-6a45f9df'])
            Z([3, 'msg'])
            Z([
                [7],
                [3, 'd']
            ])
            Z([3, 'g'])
            Z([
                [6],
                [
                    [7],
                    [3, 'msg']
                ],
                [3, 'h']
            ])
            Z([3, 'message-item data-v-6a45f9df'])
            Z([
                [7],
                [3, 'e']
            ])
            Z([
                [6],
                [
                    [7],
                    [3, 'msg']
                ],
                [3, 'd']
            ])
            Z([3, 'delete-btn data-v-6a45f9df'])
            Z([
                [6],
                [
                    [7],
                    [3, 'msg']
                ],
                [3, 'c']
            ])
            Z(z[5])
            Z(z[6])
            Z([
                [6],
                [
                    [7],
                    [3, 'msg']
                ],
                [3, 'b']
            ])
            Z(z[18])
            Z([
                [7],
                [3, 'f']
            ])
            Z([
                [7],
                [3, 'g']
            ])
            Z(z[5])
            Z(z[6])
            Z([3, '6a45f9df-2'])
            Z(z[24])
            Z([
                [7],
                [3, 'h']
            ])
            Z([
                [7],
                [3, 'p']
            ])
            Z(z[5])
            Z([3, 'r data-v-6a45f9df'])
            Z([3, '6a45f9df-3'])
            Z(z[30])
            Z([3, 'sendPopup'])
            Z([
                [4],
                [
                    [5],
                    [1, 'd']
                ]
            ])
            Z([
                [7],
                [3, 'r0']
            ])
        })(__WXML_GLOBAL__.ops_cached.$gwx0_6);
        return __WXML_GLOBAL__.ops_cached.$gwx0_6
    }
    __WXML_GLOBAL__.ops_set.$gwx0 = z;
    __WXML_GLOBAL__.ops_init.$gwx0 = true;
    var nv_require = function() {
        var nnm = {};
        var nom = {};
        return function(n) {
            if (n[0] === 'p' && n[1] === '_' && f_[n.slice(2)]) return f_[n.slice(2)];
            return function() {
                if (!nnm[n]) return undefined;
                try {
                    if (!nom[n]) nom[n] = nnm[n]();
                    return nom[n];
                } catch (e) {
                    e.message = e.message.replace(/nv_/g, '');
                    var tmp = e.stack.substring(0, e.stack.lastIndexOf(n));
                    e.stack = tmp.substring(0, tmp.lastIndexOf('\n'));
                    e.stack = e.stack.replace(/\snv_/g, ' ');
                    e.stack = $gstack(e.stack);
                    e.stack += '\n    at ' + n.substring(2);
                    console.error(e);
                }
            }
        }
    }()
    var x = ['./pages/subpack/analysis/analysis.wxml', './pages/subpack/explanation/explanation.wxml', './pages/subpack/list/list.wxml', './pages/subpack/pay/pay.wxml', './pages/subpack/record/record.wxml', './pages/subpack/usermsg/usermsg.wxml'];
    d_[x[0]] = {}
    var m0 = function(e, s, r, gg) {
        var z = gz$gwx0_1()
        var oB = _n('view')
        _rz(z, oB, 'class', 0, e, s, gg)
        var xC = _n('view')
        _rz(z, xC, 'class', 1, e, s, gg)
        var oD = _v()
        _(xC, oD)
        if (_oz(z, 2, e, s, gg)) {
            oD.wxVkey = 1
            var hG = _v()
            _(oD, hG)
            if (_oz(z, 3, e, s, gg)) {
                hG.wxVkey = 1
                var oH = _mz(z, 'qiun-data-charts', ['bind:__l', 4, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(hG, oH)
            }
            hG.wxXCkey = 1
            hG.wxXCkey = 3
        }
        var fE = _v()
        _(xC, fE)
        if (_oz(z, 8, e, s, gg)) {
            fE.wxVkey = 1
            var cI = _v()
            _(fE, cI)
            if (_oz(z, 9, e, s, gg)) {
                cI.wxVkey = 1
                var oJ = _mz(z, 'qiun-data-charts', ['bind:__l', 10, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(cI, oJ)
            }
            cI.wxXCkey = 1
            cI.wxXCkey = 3
        }
        var cF = _v()
        _(xC, cF)
        if (_oz(z, 14, e, s, gg)) {
            cF.wxVkey = 1
            var lK = _v()
            _(cF, lK)
            if (_oz(z, 15, e, s, gg)) {
                lK.wxVkey = 1
                var aL = _mz(z, 'qiun-data-charts', ['bind:__l', 16, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(lK, aL)
            }
            lK.wxXCkey = 1
            lK.wxXCkey = 3
        }
        oD.wxXCkey = 1
        oD.wxXCkey = 3
        fE.wxXCkey = 1
        fE.wxXCkey = 3
        cF.wxXCkey = 1
        cF.wxXCkey = 3
        _(oB, xC)
        var tM = _n('view')
        _rz(z, tM, 'class', 20, e, s, gg)
        var eN = _v()
        _(tM, eN)
        if (_oz(z, 21, e, s, gg)) {
            eN.wxVkey = 1
            var oR = _v()
            _(eN, oR)
            if (_oz(z, 22, e, s, gg)) {
                oR.wxVkey = 1
                var fS = _mz(z, 'qiun-data-charts', ['bind:__l', 23, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(oR, fS)
            }
            oR.wxXCkey = 1
            oR.wxXCkey = 3
        }
        var bO = _v()
        _(tM, bO)
        if (_oz(z, 27, e, s, gg)) {
            bO.wxVkey = 1
            var cT = _v()
            _(bO, cT)
            if (_oz(z, 28, e, s, gg)) {
                cT.wxVkey = 1
                var hU = _mz(z, 'qiun-data-charts', ['bind:__l', 29, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(cT, hU)
            }
            cT.wxXCkey = 1
            cT.wxXCkey = 3
        }
        var oP = _v()
        _(tM, oP)
        if (_oz(z, 33, e, s, gg)) {
            oP.wxVkey = 1
            var oV = _v()
            _(oP, oV)
            if (_oz(z, 34, e, s, gg)) {
                oV.wxVkey = 1
                var cW = _mz(z, 'qiun-data-charts', ['bind:__l', 35, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(oV, cW)
            }
            oV.wxXCkey = 1
            oV.wxXCkey = 3
        }
        var xQ = _v()
        _(tM, xQ)
        if (_oz(z, 39, e, s, gg)) {
            xQ.wxVkey = 1
            var oX = _v()
            _(xQ, oX)
            if (_oz(z, 40, e, s, gg)) {
                oX.wxVkey = 1
                var lY = _mz(z, 'qiun-data-charts', ['bind:__l', 41, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(oX, lY)
            }
            oX.wxXCkey = 1
            oX.wxXCkey = 3
        }
        eN.wxXCkey = 1
        eN.wxXCkey = 3
        bO.wxXCkey = 1
        bO.wxXCkey = 3
        oP.wxXCkey = 1
        oP.wxXCkey = 3
        xQ.wxXCkey = 1
        xQ.wxXCkey = 3
        _(oB, tM)
        var aZ = _n('view')
        _rz(z, aZ, 'class', 45, e, s, gg)
        var t1 = _v()
        _(aZ, t1)
        if (_oz(z, 46, e, s, gg)) {
            t1.wxVkey = 1
            var x5 = _v()
            _(t1, x5)
            if (_oz(z, 47, e, s, gg)) {
                x5.wxVkey = 1
                var o6 = _mz(z, 'qiun-data-charts', ['bind:__l', 48, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(x5, o6)
            }
            x5.wxXCkey = 1
            x5.wxXCkey = 3
        }
        var e2 = _v()
        _(aZ, e2)
        if (_oz(z, 52, e, s, gg)) {
            e2.wxVkey = 1
            var f7 = _v()
            _(e2, f7)
            if (_oz(z, 53, e, s, gg)) {
                f7.wxVkey = 1
                var c8 = _mz(z, 'qiun-data-charts', ['bind:__l', 54, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(f7, c8)
            }
            f7.wxXCkey = 1
            f7.wxXCkey = 3
        }
        var b3 = _v()
        _(aZ, b3)
        if (_oz(z, 58, e, s, gg)) {
            b3.wxVkey = 1
            var h9 = _v()
            _(b3, h9)
            if (_oz(z, 59, e, s, gg)) {
                h9.wxVkey = 1
                var o0 = _mz(z, 'qiun-data-charts', ['bind:__l', 60, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(h9, o0)
            }
            h9.wxXCkey = 1
            h9.wxXCkey = 3
        }
        var o4 = _v()
        _(aZ, o4)
        if (_oz(z, 64, e, s, gg)) {
            o4.wxVkey = 1
            var cAB = _v()
            _(o4, cAB)
            if (_oz(z, 65, e, s, gg)) {
                cAB.wxVkey = 1
                var oBB = _mz(z, 'qiun-data-charts', ['bind:__l', 66, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(cAB, oBB)
            }
            cAB.wxXCkey = 1
            cAB.wxXCkey = 3
        }
        t1.wxXCkey = 1
        t1.wxXCkey = 3
        e2.wxXCkey = 1
        e2.wxXCkey = 3
        b3.wxXCkey = 1
        b3.wxXCkey = 3
        o4.wxXCkey = 1
        o4.wxXCkey = 3
        _(oB, aZ)
        _(r, oB)
        return r
    }
    e_[x[0]] = {
        f: m0,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[1]] = {}
    var m1 = function(e, s, r, gg) {
        var z = gz$gwx0_2()
        return r
    }
    e_[x[1]] = {
        f: m1,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[2]] = {}
    var m2 = function(e, s, r, gg) {
        var z = gz$gwx0_3()
        var tEB = _n('view')
        _rz(z, tEB, 'class', 0, e, s, gg)
        var eFB = _v()
        _(tEB, eFB)
        if (_oz(z, 1, e, s, gg)) {
            eFB.wxVkey = 1
            var oHB = _v()
            _(eFB, oHB)
            if (_oz(z, 2, e, s, gg)) {
                oHB.wxVkey = 1
                var xIB = _mz(z, 'uni-segmented-control', ['bind:__l', 3, 'bindclickItem', 1, 'class', 2, 'uI', 3, 'uP', 4], [], e, s, gg)
                _(oHB, xIB)
            }
            oHB.wxXCkey = 1
            oHB.wxXCkey = 3
        } else {
            eFB.wxVkey = 2
        }
        var oJB = _n('view')
        _rz(z, oJB, 'class', 8, e, s, gg)
        var fKB = _mz(z, 'view', ['class', 9, 'hidden', 1], [], e, s, gg)
        var cLB = _v()
        _(fKB, cLB)
        if (_oz(z, 11, e, s, gg)) {
            cLB.wxVkey = 1
            var hMB = _mz(z, 'scroll-view', ['bindrefresherrefresh', 12, 'bindscrolltolower', 1, 'class', 2, 'refresherEnabled', 3, 'refresherTriggered', 4, 'scrollY', 5, 'style', 6], [], e, s, gg)
            var oNB = _v()
            _(hMB, oNB)
            var cOB = function(lQB, oPB, aRB, gg) {
                var eTB = _mz(z, 'view', ['bindlongtap', 22, 'bindtap', 1, 'class', 2], [], lQB, oPB, gg)
                var bUB = _v()
                _(eTB, bUB)
                if (_oz(z, 25, lQB, oPB, gg)) {
                    bUB.wxVkey = 1
                    var oVB = _mz(z, 'goods-item', ['bind:__l', 26, 'class', 1, 'uI', 2, 'uP', 3], [], lQB, oPB, gg)
                    _(bUB, oVB)
                }
                bUB.wxXCkey = 1
                bUB.wxXCkey = 3
                _(aRB, eTB)
                return aRB
            }
            oNB.wxXCkey = 4
            _2z(z, 20, cOB, e, s, gg, oNB, 'item', 'index', 'c')
            _(cLB, hMB)
        } else if (_oz(z, 30, e, s, gg)) {
            cLB.wxVkey = 2
        }
        cLB.wxXCkey = 1
        cLB.wxXCkey = 3
        _(oJB, fKB)
        var xWB = _mz(z, 'view', ['class', 31, 'hidden', 1], [], e, s, gg)
        var oXB = _v()
        _(xWB, oXB)
        if (_oz(z, 33, e, s, gg)) {
            oXB.wxVkey = 1
            var fYB = _mz(z, 'scroll-view', ['bindrefresherrefresh', 34, 'bindscrolltolower', 1, 'class', 2, 'refresherEnabled', 3, 'refresherTriggered', 4, 'scrollY', 5, 'style', 6], [], e, s, gg)
            var cZB = _v()
            _(fYB, cZB)
            var h1B = function(c3B, o2B, o4B, gg) {
                var a6B = _mz(z, 'view', ['bindlongtap', 44, 'bindtap', 1, 'class', 2], [], c3B, o2B, gg)
                var t7B = _v()
                _(a6B, t7B)
                if (_oz(z, 47, c3B, o2B, gg)) {
                    t7B.wxVkey = 1
                    var e8B = _mz(z, 'goods-item', ['bind:__l', 48, 'class', 1, 'uI', 2, 'uP', 3], [], c3B, o2B, gg)
                    _(t7B, e8B)
                }
                t7B.wxXCkey = 1
                t7B.wxXCkey = 3
                _(o4B, a6B)
                return o4B
            }
            cZB.wxXCkey = 4
            _2z(z, 42, h1B, e, s, gg, cZB, 'item', 'index', 'c')
            _(oXB, fYB)
        } else if (_oz(z, 52, e, s, gg)) {
            oXB.wxVkey = 2
        }
        oXB.wxXCkey = 1
        oXB.wxXCkey = 3
        _(oJB, xWB)
        _(tEB, oJB)
        var bGB = _v()
        _(tEB, bGB)
        if (_oz(z, 53, e, s, gg)) {
            bGB.wxVkey = 1
            var b9B = _mz(z, 'goods-popup', ['bind:__l', 54, 'bindrefresh', 1, 'bindupdateShow', 2, 'class', 3, 'uI', 4, 'uP', 5], [], e, s, gg)
            _(bGB, b9B)
        }
        eFB.wxXCkey = 1
        eFB.wxXCkey = 3
        bGB.wxXCkey = 1
        bGB.wxXCkey = 3
        _(r, tEB)
        return r
    }
    e_[x[2]] = {
        f: m2,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[3]] = {}
    var m3 = function(e, s, r, gg) {
        var z = gz$gwx0_4()
        return r
    }
    e_[x[3]] = {
        f: m3,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[4]] = {}
    var m4 = function(e, s, r, gg) {
        var z = gz$gwx0_5()
        var oBC = _n('view')
        _rz(z, oBC, 'class', 0, e, s, gg)
        var oFC = _n('view')
        _rz(z, oFC, 'class', 1, e, s, gg)
        var cGC = _n('view')
        _rz(z, cGC, 'class', 2, e, s, gg)
        var oHC = _v()
        _(cGC, oHC)
        if (_oz(z, 3, e, s, gg)) {
            oHC.wxVkey = 1
            var aJC = _mz(z, 'uni-datetime-picker', ['bind:__l', 4, 'bindchange', 1, 'bindupdateModelValue', 2, 'class', 3, 'uI', 4, 'uP', 5], [], e, s, gg)
            _(oHC, aJC)
        }
        var lIC = _v()
        _(cGC, lIC)
        if (_oz(z, 10, e, s, gg)) {
            lIC.wxVkey = 1
            var tKC = _mz(z, 'uni-icons', ['bind:__l', 11, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
            _(lIC, tKC)
        }
        oHC.wxXCkey = 1
        oHC.wxXCkey = 3
        lIC.wxXCkey = 1
        lIC.wxXCkey = 3
        _(oFC, cGC)
        var eLC = _mz(z, 'view', ['bindtap', 15, 'class', 1], [], e, s, gg)
        var bMC = _v()
        _(eLC, bMC)
        if (_oz(z, 17, e, s, gg)) {
            bMC.wxVkey = 1
            var oNC = _mz(z, 'uni-icons', ['bind:__l', 18, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
            _(bMC, oNC)
        }
        bMC.wxXCkey = 1
        bMC.wxXCkey = 3
        _(oFC, eLC)
        _(oBC, oFC)
        var fCC = _v()
        _(oBC, fCC)
        if (_oz(z, 22, e, s, gg)) {
            fCC.wxVkey = 1
        }
        var xOC = _mz(z, 'scroll-view', ['scrollY', -1, 'class', 23], [], e, s, gg)
        var oPC = _v()
        _(xOC, oPC)
        if (_oz(z, 24, e, s, gg)) {
            oPC.wxVkey = 1
            var cRC = _v()
            _(oPC, cRC)
            var hSC = function(cUC, oTC, oVC, gg) {
                var aXC = _mz(z, 'view', ['bindtap', 28, 'class', 1], [], cUC, oTC, gg)
                var tYC = _v()
                _(aXC, tYC)
                if (_oz(z, 30, cUC, oTC, gg)) {
                    tYC.wxVkey = 1
                    var eZC = _mz(z, 'uni-icons', ['bind:__l', 31, 'class', 1, 'uI', 2, 'uP', 3], [], cUC, oTC, gg)
                    _(tYC, eZC)
                }
                tYC.wxXCkey = 1
                tYC.wxXCkey = 3
                _(oVC, aXC)
                return oVC
            }
            cRC.wxXCkey = 4
            _2z(z, 26, hSC, e, s, gg, cRC, 'record', 'index', 'e')
        } else {
            oPC.wxVkey = 2
        }
        var fQC = _v()
        _(xOC, fQC)
        if (_oz(z, 35, e, s, gg)) {
            fQC.wxVkey = 1
        }
        oPC.wxXCkey = 1
        oPC.wxXCkey = 3
        fQC.wxXCkey = 1
        _(oBC, xOC)
        var cDC = _v()
        _(oBC, cDC)
        if (_oz(z, 36, e, s, gg)) {
            cDC.wxVkey = 1
            var b1C = _mz(z, 'uni-popup', ['bind:__l', 37, 'class', 1, 'style', 2, 'uI', 3, 'uP', 4, 'uR', 5, 'uS', 6], [], e, s, gg)
            var o2C = _n('view')
            _rz(z, o2C, 'class', 44, e, s, gg)
            var o4C = _mz(z, 'view', ['bindtap', 45, 'class', 1], [], e, s, gg)
            var f5C = _v()
            _(o4C, f5C)
            if (_oz(z, 47, e, s, gg)) {
                f5C.wxVkey = 1
                var c6C = _mz(z, 'uni-icons', ['bind:__l', 48, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(f5C, c6C)
            }
            f5C.wxXCkey = 1
            f5C.wxXCkey = 3
            _(o2C, o4C)
            var x3C = _v()
            _(o2C, x3C)
            if (_oz(z, 52, e, s, gg)) {
                x3C.wxVkey = 1
            }
            x3C.wxXCkey = 1
            _(b1C, o2C)
            _(cDC, b1C)
        }
        var hEC = _v()
        _(oBC, hEC)
        if (_oz(z, 53, e, s, gg)) {
            hEC.wxVkey = 1
            var h7C = _mz(z, 'uni-popup', ['bind:__l', 54, 'class', 1, 'uI', 2, 'uP', 3, 'uR', 4, 'uS', 5], [], e, s, gg)
            var o8C = _v()
            _(h7C, o8C)
            if (_oz(z, 60, e, s, gg)) {
                o8C.wxVkey = 1
                var c9C = _mz(z, 'uni-icons', ['bind:__l', 61, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(o8C, c9C)
            }
            o8C.wxXCkey = 1
            o8C.wxXCkey = 3
            _(hEC, h7C)
        }
        fCC.wxXCkey = 1
        cDC.wxXCkey = 1
        cDC.wxXCkey = 3
        hEC.wxXCkey = 1
        hEC.wxXCkey = 3
        _(r, oBC)
        return r
    }
    e_[x[4]] = {
        f: m4,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    d_[x[5]] = {}
    var m5 = function(e, s, r, gg) {
        var z = gz$gwx0_6()
        var lAD = _n('view')
        _rz(z, lAD, 'class', 0, e, s, gg)
        var aBD = _v()
        _(lAD, aBD)
        if (_oz(z, 1, e, s, gg)) {
            aBD.wxVkey = 1
            var eDD = _mz(z, 'view', ['bindtap', 2, 'class', 1], [], e, s, gg)
            var bED = _v()
            _(eDD, bED)
            if (_oz(z, 4, e, s, gg)) {
                bED.wxVkey = 1
                var oFD = _mz(z, 'uni-icons', ['bind:__l', 5, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(bED, oFD)
            }
            bED.wxXCkey = 1
            bED.wxXCkey = 3
            _(aBD, eDD)
        }
        var xGD = _n('view')
        _rz(z, xGD, 'class', 9, e, s, gg)
        var fID = _v()
        _(xGD, fID)
        var cJD = function(oLD, hKD, cMD, gg) {
            var lOD = _mz(z, 'view', ['bindtap', 13, 'class', 1], [], oLD, hKD, gg)
            var aPD = _v()
            _(lOD, aPD)
            if (_oz(z, 15, oLD, hKD, gg)) {
                aPD.wxVkey = 1
                var tQD = _mz(z, 'view', ['catchtap', 16, 'class', 1], [], oLD, hKD, gg)
                var eRD = _v()
                _(tQD, eRD)
                if (_oz(z, 18, oLD, hKD, gg)) {
                    eRD.wxVkey = 1
                    var bSD = _mz(z, 'uni-icons', ['bind:__l', 19, 'class', 1, 'uI', 2, 'uP', 3], [], oLD, hKD, gg)
                    _(eRD, bSD)
                }
                eRD.wxXCkey = 1
                eRD.wxXCkey = 3
                _(aPD, tQD)
            }
            aPD.wxXCkey = 1
            aPD.wxXCkey = 3
            _(cMD, lOD)
            return cMD
        }
        fID.wxXCkey = 4
        _2z(z, 11, cJD, e, s, gg, fID, 'msg', 'index', 'g')
        var oHD = _v()
        _(xGD, oHD)
        if (_oz(z, 23, e, s, gg)) {
            oHD.wxVkey = 1
            var oTD = _v()
            _(oHD, oTD)
            if (_oz(z, 24, e, s, gg)) {
                oTD.wxVkey = 1
                var xUD = _mz(z, 'uni-icons', ['bind:__l', 25, 'class', 1, 'uI', 2, 'uP', 3], [], e, s, gg)
                _(oTD, xUD)
            }
            oTD.wxXCkey = 1
            oTD.wxXCkey = 3
        } else if (_oz(z, 29, e, s, gg)) {
            oHD.wxVkey = 2
        }
        oHD.wxXCkey = 1
        oHD.wxXCkey = 3
        _(lAD, xGD)
        var tCD = _v()
        _(lAD, tCD)
        if (_oz(z, 30, e, s, gg)) {
            tCD.wxVkey = 1
            var oVD = _mz(z, 'uni-popup', ['bind:__l', 31, 'class', 1, 'uI', 2, 'uP', 3, 'uR', 4, 'uS', 5], [], e, s, gg)
            var fWD = _v()
            _(oVD, fWD)
            if (_oz(z, 37, e, s, gg)) {
                fWD.wxVkey = 1
            }
            fWD.wxXCkey = 1
            _(tCD, oVD)
        }
        aBD.wxXCkey = 1
        aBD.wxXCkey = 3
        tCD.wxXCkey = 1
        tCD.wxXCkey = 3
        _(r, lAD)
        return r
    }
    e_[x[5]] = {
        f: m5,
        j: [],
        i: [],
        ti: [],
        ic: []
    }
    if (path && e_[path]) {
        return function(env, dd, global) {
            $gwxc = 0;
            var root = {
                "tag": "wx-page"
            };
            root.children = []
            var main = e_[path].f
            if (typeof global === "undefined") global = {};
            global.f = $gdc(f_[path], "", 1);
            try {
                main(env, {}, root, global);
                _tsd(root)
            } catch (err) {
                console.log(err)
            }
            return root;
        }
    }
}
__wxAppCode__['pages/subpack/analysis/analysis.json'] = {
    "navigationBarTitleText": "数据分析",
    "enablePullDownRefresh": false,
    "usingComponents": {
        "qiun-data-charts": "../../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/analysis/analysis.wxml'] = [$gwx0, './pages/subpack/analysis/analysis.wxml'];
else __wxAppCode__['pages/subpack/analysis/analysis.wxml'] = $gwx0('./pages/subpack/analysis/analysis.wxml');
__wxAppCode__['pages/subpack/explanation/explanation.json'] = {
    "navigationBarTitleText": "导入说明",
    "enablePullDownRefresh": false,
    "usingComponents": {}
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/explanation/explanation.wxml'] = [$gwx0, './pages/subpack/explanation/explanation.wxml'];
else __wxAppCode__['pages/subpack/explanation/explanation.wxml'] = $gwx0('./pages/subpack/explanation/explanation.wxml');
__wxAppCode__['pages/subpack/list/list.json'] = {
    "navigationBarTitleText": "商品",
    "enablePullDownRefresh": true,
    "usingComponents": {
        "uni-segmented-control": "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control",
        "goods-item": "../../../components/goods-item/goods-item",
        "goods-popup": "../../../components/goods-popup/goods-popup"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/list/list.wxml'] = [$gwx0, './pages/subpack/list/list.wxml'];
else __wxAppCode__['pages/subpack/list/list.wxml'] = $gwx0('./pages/subpack/list/list.wxml');
__wxAppCode__['pages/subpack/pay/pay.json'] = {
    "navigationBarTitleText": "支持作者",
    "enablePullDownRefresh": false,
    "usingComponents": {}
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/pay/pay.wxml'] = [$gwx0, './pages/subpack/pay/pay.wxml'];
else __wxAppCode__['pages/subpack/pay/pay.wxml'] = $gwx0('./pages/subpack/pay/pay.wxml');
__wxAppCode__['pages/subpack/record/record.json'] = {
    "navigationBarTitleText": "出库记录",
    "enablePullDownRefresh": false,
    "usingComponents": {
        "uni-datetime-picker": "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker",
        "uni-icons": "../../../uni_modules/uni-icons/components/uni-icons/uni-icons",
        "uni-popup": "../../../uni_modules/uni-popup/components/uni-popup/uni-popup"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/record/record.wxml'] = [$gwx0, './pages/subpack/record/record.wxml'];
else __wxAppCode__['pages/subpack/record/record.wxml'] = $gwx0('./pages/subpack/record/record.wxml');
__wxAppCode__['pages/subpack/usermsg/usermsg.json'] = {
    "navigationBarTitleText": "我的消息",
    "enablePullDownRefresh": false,
    "usingComponents": {
        "uni-icons": "../../../uni_modules/uni-icons/components/uni-icons/uni-icons",
        "uni-popup": "../../../uni_modules/uni-popup/components/uni-popup/uni-popup"
    }
};
if (__vd_version_info__.delayedGwx) __wxAppCode__['pages/subpack/usermsg/usermsg.wxml'] = [$gwx0, './pages/subpack/usermsg/usermsg.wxml'];
else __wxAppCode__['pages/subpack/usermsg/usermsg.wxml'] = $gwx0('./pages/subpack/usermsg/usermsg.wxml');

__wxRoute = 'pages/subpack/explanation/explanation';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/explanation/explanation.js';
define("pages/subpack/explanation/explanation.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var e = require("../../../common/vendor.js"),
        o = {
            data: function() {
                return {
                    tableBody: [{
                        name: "商品条形码 (选填)",
                        desc: "用于唯一标识商品的条形码信息。用于商品的识别操作。",
                        isBold: !0
                    }, {
                        name: "商品名称(必填)",
                        desc: "商品的具体名称，方便直观地了解商品内容。",
                        isBold: !0
                    }, {
                        name: "商品价格(必填，填数字且大于等于零)",
                        desc: "记录商品的销售价格信息。",
                        isBold: !0
                    }, {
                        name: "商品成本(选填，填数字且大于等于零)",
                        desc: "记录商品的进货成本。",
                        isBold: !0
                    }, {
                        name: "商品库存(选填，填大于等于0的整数)",
                        desc: "记录商品的数量。",
                        isBold: !0
                    }, {
                        name: "商品缺货提醒阈值(选填，填大于等于0的整数)",
                        desc: "商品库存低于该值会有提醒。",
                        isBold: !0
                    }, {
                        name: "商品备注(选填)",
                        desc: "可填写关于商品的额外信息，如商品的特性、使用说明、注意事项等补充内容。",
                        isBold: !0
                    }]
                }
            },
            methods: {
                copyText: function() {
                    e.index.setClipboardData({
                        data: "https://env-00jxt6l7w3we.normal.cloudstatic.cn/model/ImpostModel.xlsx",
                        success: function() {
                            e.index.showToast({
                                title: "复制成功",
                                icon: "none"
                            })
                        },
                        fail: function(o) {
                            e.index.showToast({
                                title: "复制失败",
                                icon: "none"
                            }), console.error("复制失败", o)
                        }
                    })
                }
            }
        },
        n = e._export_sfc(o, [
            ["render", function(o, n, t, s, c, d) {
                return {
                    a: e.o((function() {
                        return d.copyText && d.copyText.apply(d, arguments)
                    })),
                    b: e.f(c.tableBody, (function(o, n, t) {
                        return {
                            a: e.t(o.name),
                            b: o.isBold ? 1 : "",
                            c: e.t(o.desc),
                            d: n
                        }
                    }))
                }
            }],
            ["__scopeId", "data-v-f646b0c8"]
        ]);
    wx.createPage(n);
});
require("pages/subpack/explanation/explanation.js");
__wxRoute = 'pages/subpack/analysis/analysis';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/analysis/analysis.js';
define("pages/subpack/analysis/analysis.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
        a = require("../../../@babel/runtime/helpers/slicedToArray"),
        r = require("../../../@babel/runtime/helpers/asyncToGenerator"),
        e = require("../../../common/vendor.js"),
        n = require("../../../utils/cloudObj.js"),
        i = {
            data: function() {
                return {
                    TimeSlotList: null,
                    MonthlyList: null,
                    DailyList: null,
                    countTimeSlotChartData: null,
                    amountTimeSlotChartData: null,
                    quantityTimeSlotChartData: null,
                    countDailyChartData: null,
                    profitDailyChartData: null,
                    amountDailyChartData: null,
                    quantityDailyChartData: null,
                    countMonthlyChartData: null,
                    profitMonthlyChartData: null,
                    amountMonthlyChartData: null,
                    quantityMonthlyChartData: null,
                    currentChart: "count",
                    currentChart2: "count",
                    currentChart3: "count",
                    chartTitle: "出库次数统计",
                    chartTitle2: "出库次数统计",
                    chartTitle3: "出库次数统计",
                    nowDateStr: (new Date).getFullYear() + "-" + String((new Date).getMonth() + 1).padStart(2, "0") + "-" + String((new Date).getDate()).padStart(2, "0"),
                    lineOpts: {
                        color: ["#01ce89", "#5f84f7", "#f8a530"],
                        padding: [10, 10, 10, 10],
                        dataLabel: !1,
                        dataPointShape: !1,
                        xAxis: {
                            disableGrid: !0,
                            labelCount: 4
                        },
                        yAxis: {
                            gridType: "dash",
                            dashLength: 2,
                            data: [{
                                tofix: 2
                            }]
                        },
                        extra: {
                            line: {
                                type: "curve",
                                width: 2,
                                activeType: "hollow"
                            }
                        }
                    },
                    barOpts: {
                        color: ["#01ce89"],
                        padding: [10, 25, 10, 10],
                        dataLabel: !1,
                        dataPointShape: !1,
                        xAxis: {
                            disableGrid: !0,
                            labelCount: 5
                        },
                        yAxis: {
                            gridType: "dash",
                            dashLength: 2,
                            data: [{
                                tofix: 2
                            }]
                        },
                        extra: {
                            column: {
                                width: 5,
                                seriesGap: 2,
                                type: "group",
                                animation: "horizontal"
                            }
                        }
                    },
                    barOpts2: {
                        color: ["#01ce89"],
                        padding: [10, 25, 10, 10],
                        dataLabel: !1,
                        dataPointShape: !1,
                        xAxis: {
                            disableGrid: !0
                        },
                        yAxis: {
                            gridType: "dash",
                            dashLength: 2,
                            data: [{
                                tofix: 2
                            }]
                        },
                        extra: {
                            column: {
                                width: 12,
                                seriesGap: 2,
                                type: "group",
                                animation: "horizontal"
                            }
                        }
                    }
                }
            },
            onReady: function() {
                var i = this;
                return r(t().mark((function r() {
                    var o, u, c, s, h;
                    return t().wrap((function(t) {
                        for (;;) switch (t.prev = t.next) {
                            case 0:
                                return t.prev = 0, t.next = 3, Promise.all([n.outputHistoryObjCustom.getTimeSlotStats(), n.outputHistoryObjCustom.getMonthlyStats(), n.outputHistoryObjCustom.getDailyStats()]);
                            case 3:
                                o = t.sent, u = a(o, 3), c = u[0], s = u[1], h = u[2], i.TimeSlotList = c.data, i.MonthlyList = s.data, i.DailyList = h.data, console.log("DailyList", i.DailyList), i.formatTimeSlotChartData(), i.formatDailyChartData(), i.formatMonthlyChartData(), t.next = 14;
                                break;
                            case 11:
                                t.prev = 11, t.t0 = t.catch(0), console.error("数据加载失败:", t.t0), e.index.showToast({
                                    title: "数据加载失败",
                                    icon: "none"
                                });
                            case 14:
                            case "end":
                                return t.stop()
                        }
                    }), r, null, [
                        [0, 11]
                    ])
                })))()
            },
            methods: {
                switchChart: function(t, a) {
                    var r = this;
                    if (1 === a) {
                        if (this.currentChart === t) return;
                        setTimeout((function() {
                            switch (r.currentChart = t, t) {
                                case "count":
                                    r.chartTitle = "出库次数统计";
                                    break;
                                case "amount":
                                    r.chartTitle = "出库金额统计";
                                    break;
                                case "quantity":
                                    r.chartTitle = "出库商品数量统计"
                            }
                        }), 300)
                    } else if (2 === a) {
                        if (this.currentChart2 === t) return;
                        setTimeout((function() {
                            switch (r.currentChart2 = t, t) {
                                case "count":
                                    r.chartTitle2 = "出库次数统计";
                                    break;
                                case "amount":
                                    r.chartTitle2 = "出库金额统计";
                                    break;
                                case "quantity":
                                    r.chartTitle2 = "出库商品数量统计";
                                    break;
                                case "profit":
                                    r.chartTitle2 = "出库利润统计"
                            }
                        }), 300)
                    } else if (3 === a) {
                        if (this.currentChart3 === t) return;
                        setTimeout((function() {
                            switch (r.currentChart3 = t, t) {
                                case "count":
                                    r.chartTitle3 = "出库次数统计";
                                    break;
                                case "amount":
                                    r.chartTitle3 = "出库金额统计";
                                    break;
                                case "quantity":
                                    r.chartTitle3 = "出库商品数量统计";
                                    break;
                                case "profit":
                                    r.chartTitle3 = "出库利润统计"
                            }
                        }), 300)
                    }
                },
                formatTimeSlotChartData: function() {
                    var t = this,
                        a = Array.from({
                            length: 24
                        }, (function(t, a) {
                            return "".concat(a, ":00")
                        })),
                        r = Object.keys(this.TimeSlotList),
                        e = new Date,
                        n = e.getHours(),
                        i = e.toISOString().split("T")[0],
                        o = r.map((function(a) {
                            var r = new Date(e),
                                o = new Date(r);
                            o.setDate(r.getDate() - 1);
                            var u = new Date(r);
                            u.setDate(r.getDate() - 7);
                            var c = a === i ? "今天" : a === o.toISOString().split("T")[0] ? "昨天" : a === u.toISOString().split("T")[0] ? "7天前" : "其他日期",
                                s = t.TimeSlotList[a].map((function(t) {
                                    return "今天" === c && Number(t.time_slot) > n ? null : t.output_count
                                }));
                            return {
                                name: c,
                                data: s
                            }
                        }));
                    this.countTimeSlotChartData = {
                        categories: a,
                        series: o
                    };
                    var u = r.map((function(a) {
                        var r = new Date(e),
                            o = new Date(r);
                        o.setDate(r.getDate() - 1);
                        var u = new Date(r);
                        u.setDate(r.getDate() - 7);
                        var c = a === i ? "今天" : a === o.toISOString().split("T")[0] ? "昨天" : a === u.toISOString().split("T")[0] ? "7天前" : "其他日期",
                            s = t.TimeSlotList[a].map((function(t) {
                                return "今天" === c && Number(t.time_slot) > n ? null : parseFloat(t.total_amount)
                            }));
                        return {
                            name: c,
                            data: s
                        }
                    }));
                    this.amountTimeSlotChartData = {
                        categories: a,
                        series: u
                    }, console.log("amountSeries", this.amountTimeSlotChartData);
                    var c = r.map((function(a) {
                        var r = new Date(e),
                            o = new Date(r);
                        o.setDate(r.getDate() - 1);
                        var u = new Date(r);
                        u.setDate(r.getDate() - 7);
                        var c = a === i ? "今天" : a === o.toISOString().split("T")[0] ? "昨天" : a === u.toISOString().split("T")[0] ? "7天前" : "其他日期",
                            s = t.TimeSlotList[a].map((function(t) {
                                return "今天" === c && Number(t.time_slot) > n ? null : t.total_quantity
                            }));
                        return {
                            name: c,
                            data: s
                        }
                    }));
                    this.quantityTimeSlotChartData = {
                        categories: a,
                        series: c
                    }
                },
                formatDailyChartData: function() {
                    var t = this,
                        a = new Date,
                        r = Object.keys(this.DailyList).sort((function(t, r) {
                            var e = Math.abs(a - new Date(t));
                            return Math.abs(a - new Date(r)) - e
                        })),
                        e = r.map((function(t) {
                            return t.substring(5).replace("-", ".")
                        }));
                    this.countDailyChartData = {
                        categories: e,
                        series: [{
                            name: "出库次数",
                            data: r.map((function(a) {
                                return t.DailyList[a].output_count
                            }))
                        }]
                    }, this.amountDailyChartData = {
                        categories: e,
                        series: [{
                            name: "出库金额",
                            data: r.map((function(a) {
                                return parseFloat(t.DailyList[a].total_amount)
                            }))
                        }]
                    }, this.quantityDailyChartData = {
                        categories: e,
                        series: [{
                            name: "出库商品数量",
                            data: r.map((function(a) {
                                return t.DailyList[a].total_quantity
                            }))
                        }]
                    }, this.profitDailyChartData = {
                        categories: e,
                        series: [{
                            name: "出库利润",
                            data: r.map((function(a) {
                                return isNaN(t.DailyList[a].total_profit) ? 0 : parseFloat(t.DailyList[a].total_profit)
                            }))
                        }]
                    }
                },
                formatMonthlyChartData: function() {
                    var t = this,
                        a = new Date,
                        r = Object.keys(this.MonthlyList).sort((function(t, r) {
                            var e = Math.abs(a - new Date(t));
                            return Math.abs(a - new Date(r)) - e
                        })),
                        e = r.map((function(t) {
                            return t.substring(5)
                        }));
                    this.countMonthlyChartData = {
                        categories: e,
                        series: [{
                            name: "出库次数",
                            data: r.map((function(a) {
                                return t.MonthlyList[a].output_count
                            }))
                        }]
                    }, this.amountMonthlyChartData = {
                        categories: e,
                        series: [{
                            name: "出库金额",
                            data: r.map((function(a) {
                                return parseFloat(t.MonthlyList[a].total_amount)
                            }))
                        }]
                    }, this.quantityMonthlyChartData = {
                        categories: e,
                        series: [{
                            name: "出库商品数量",
                            data: r.map((function(a) {
                                return t.MonthlyList[a].total_quantity
                            }))
                        }]
                    }, this.profitMonthlyChartData = {
                        categories: e,
                        series: [{
                            name: "出库利润",
                            data: r.map((function(a) {
                                return isNaN(t.MonthlyList[a].total_profit) ? 0 : parseFloat(t.MonthlyList[a].total_profit)
                            }))
                        }]
                    }
                }
            }
        };
    Array || e.resolveComponent("qiun-data-charts")(), Math;
    var o = e._export_sfc(i, [
        ["render", function(t, a, r, n, i, o) {
            return e.e({
                a: e.t(i.nowDateStr),
                b: e.n("count" === i.currentChart ? "active" : ""),
                c: e.o((function(t) {
                    return o.switchChart("count", 1)
                })),
                d: e.n("amount" === i.currentChart ? "active" : ""),
                e: e.o((function(t) {
                    return o.switchChart("amount", 1)
                })),
                f: e.n("quantity" === i.currentChart ? "active" : ""),
                g: e.o((function(t) {
                    return o.switchChart("quantity", 1)
                })),
                h: e.t(i.chartTitle),
                i: "count" === i.currentChart
            }, "count" === i.currentChart ? {
                j: e.p({
                    type: "line",
                    chartData: i.countTimeSlotChartData,
                    opts: i.lineOpts
                })
            } : {}, {
                k: "amount" === i.currentChart
            }, "amount" === i.currentChart ? {
                l: e.p({
                    type: "line",
                    chartData: i.amountTimeSlotChartData,
                    opts: i.lineOpts
                })
            } : {}, {
                m: "quantity" === i.currentChart
            }, "quantity" === i.currentChart ? {
                n: e.p({
                    type: "line",
                    chartData: i.quantityTimeSlotChartData,
                    opts: i.lineOpts
                })
            } : {}, {
                o: e.n("count" === i.currentChart2 ? "active" : ""),
                p: e.o((function(t) {
                    return o.switchChart("count", 2)
                })),
                q: e.n("amount" === i.currentChart2 ? "active" : ""),
                r: e.o((function(t) {
                    return o.switchChart("amount", 2)
                })),
                s: e.n("profit" === i.currentChart2 ? "active" : ""),
                t: e.o((function(t) {
                    return o.switchChart("profit", 2)
                })),
                v: e.n("quantity" === i.currentChart2 ? "active" : ""),
                w: e.o((function(t) {
                    return o.switchChart("quantity", 2)
                })),
                x: e.t(i.chartTitle2),
                y: "count" === i.currentChart2
            }, "count" === i.currentChart2 ? {
                z: e.p({
                    type: "column",
                    chartData: i.countDailyChartData,
                    opts: i.barOpts
                })
            } : {}, {
                A: "amount" === i.currentChart2
            }, "amount" === i.currentChart2 ? {
                B: e.p({
                    type: "column",
                    chartData: i.amountDailyChartData,
                    opts: i.barOpts
                })
            } : {}, {
                C: "profit" === i.currentChart2
            }, "profit" === i.currentChart2 ? {
                D: e.p({
                    type: "column",
                    chartData: i.profitDailyChartData,
                    opts: i.barOpts
                })
            } : {}, {
                E: "quantity" === i.currentChart2
            }, "quantity" === i.currentChart2 ? {
                F: e.p({
                    type: "column",
                    chartData: i.quantityDailyChartData,
                    opts: i.barOpts
                })
            } : {}, {
                G: e.n("count" === i.currentChart3 ? "active" : ""),
                H: e.o((function(t) {
                    return o.switchChart("count", 3)
                })),
                I: e.n("amount" === i.currentChart3 ? "active" : ""),
                J: e.o((function(t) {
                    return o.switchChart("amount", 3)
                })),
                K: e.n("profit" === i.currentChart3 ? "active" : ""),
                L: e.o((function(t) {
                    return o.switchChart("profit", 3)
                })),
                M: e.n("quantity" === i.currentChart3 ? "active" : ""),
                N: e.o((function(t) {
                    return o.switchChart("quantity", 3)
                })),
                O: e.t(i.chartTitle3),
                P: "count" === i.currentChart3
            }, "count" === i.currentChart3 ? {
                Q: e.p({
                    type: "column",
                    chartData: i.countMonthlyChartData,
                    opts: i.barOpts2
                })
            } : {}, {
                R: "amount" === i.currentChart3
            }, "amount" === i.currentChart3 ? {
                S: e.p({
                    type: "column",
                    chartData: i.amountMonthlyChartData,
                    opts: i.barOpts2
                })
            } : {}, {
                T: "profit" === i.currentChart3
            }, "profit" === i.currentChart3 ? {
                U: e.p({
                    type: "column",
                    chartData: i.profitMonthlyChartData,
                    opts: i.barOpts2
                })
            } : {}, {
                V: "quantity" === i.currentChart3
            }, "quantity" === i.currentChart3 ? {
                W: e.p({
                    type: "column",
                    chartData: i.quantityMonthlyChartData,
                    opts: i.barOpts2
                })
            } : {})
        }],
        ["__scopeId", "data-v-37bd3b6d"]
    ]);
    wx.createPage(o);
});
require("pages/subpack/analysis/analysis.js");
__wxRoute = 'pages/subpack/record/record';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/record/record.js';
define("pages/subpack/record/record.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var t = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
        e = require("../../../@babel/runtime/helpers/asyncToGenerator"),
        o = require("../../../common/vendor.js"),
        n = require("../../../utils/cloudObj.js"),
        a = require("../../../common/assets.js"),
        r = {
            data: function() {
                var t = new Date;
                return {
                    selectedDate: "".concat(t.getFullYear(), "-").concat((t.getMonth() + 1).toString().padStart(2, "0"), "-").concat(t.getDate().toString().padStart(2, "0")),
                    records: [],
                    pagination: {
                        page: 1,
                        size: 10,
                        total: 0,
                        totalPages: 0
                    },
                    selectedRecord: null,
                    downloadUrl: "",
                    dayTotalAmount: "0.00"
                }
            },
            onLoad: function() {
                this.loadRecords()
            },
            methods: {
                loadRecords: function() {
                    var a = this;
                    return e(t().mark((function e() {
                        var r;
                        return t().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return o.index.showLoading({
                                        title: "加载中..."
                                    }), t.prev = 1, t.next = 4, n.outputHistoryObj.getOutputRecords({
                                        date: a.selectedDate,
                                        page: a.pagination.page,
                                        size: a.pagination.size
                                    });
                                case 4:
                                    (r = t.sent).success ? (a.records = r.data.list, a.pagination = r.data.pagination, a.dayTotalAmount = r.data.dayTotalAmount) : o.index.showToast({
                                        title: "获取记录失败",
                                        icon: "none"
                                    }), t.next = 11;
                                    break;
                                case 8:
                                    t.prev = 8, t.t0 = t.catch(1), console.error(t.t0), o.index.showToast({
                                        title: "加载失败",
                                        icon: "none"
                                    });
                                case 11:
                                    return t.prev = 11, o.index.hideLoading(), t.finish(11);
                                case 14:
                                case "end":
                                    return t.stop()
                            }
                        }), e, null, [
                            [1, 8, 11, 14]
                        ])
                    })))()
                },
                loadDailyStats: function() {
                    var o = this;
                    return e(t().mark((function e() {
                        var a;
                        return t().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return t.prev = 0, t.next = 3, n.outputHistoryObj.getDailyStats();
                                case 3:
                                    (a = t.sent).success && a.data[o.selectedDate] ? o.dayTotalAmount = a.data[o.selectedDate].total_amount : o.dayTotalAmount = "0.00", t.next = 10;
                                    break;
                                case 7:
                                    t.prev = 7, t.t0 = t.catch(0), console.error(t.t0);
                                case 10:
                                case "end":
                                    return t.stop()
                            }
                        }), e, null, [
                            [0, 7]
                        ])
                    })))()
                },
                exportExcel: function() {
                    var a = this;
                    return e(t().mark((function e() {
                        var r;
                        return t().wrap((function(t) {
                            for (;;) switch (t.prev = t.next) {
                                case 0:
                                    return o.index.showLoading({
                                        title: "正在导出..."
                                    }), t.prev = 1, t.next = 4, n.outputHistoryObj.exportOutputRecords({
                                        date: a.selectedDate
                                    });
                                case 4:
                                    r = t.sent, o.index.hideLoading(), r.success ? (a.downloadUrl = r.downloadUrl, a.$refs.exportPopup.open(), a.copyDownloadUrl()) : o.index.showToast({
                                        title: r.errMsg || "导出失败",
                                        icon: "none"
                                    }), t.next = 11;
                                    break;
                                case 8:
                                    t.prev = 8, t.t0 = t.catch(1), o.index.hideLoading(), o.index.showToast({
                                        title: "导出出错",
                                        icon: "none"
                                    });
                                case 11:
                                case "end":
                                    return t.stop()
                            }
                        }), e, null, [
                            [1, 8]
                        ])
                    })))()
                },
                copyDownloadUrl: function() {
                    o.index.setClipboardData({
                        data: this.downloadUrl,
                        success: function() {
                            o.index.showToast({
                                title: "链接已复制",
                                icon: "success"
                            })
                        }
                    })
                },
                onDateChange: function(t) {
                    this.pagination.page = 1, this.loadRecords()
                },
                formatTime: function(t) {
                    if (!t) return "";
                    var e = new Date(t);
                    return "".concat(e.getHours().toString().padStart(2, "0"), ":").concat(e.getMinutes().toString().padStart(2, "0"))
                },
                formatDateTime: function(t) {
                    if (!t) return "";
                    var e = new Date(t);
                    return "".concat(e.getFullYear(), "-").concat((e.getMonth() + 1).toString().padStart(2, "0"), "-").concat(e.getDate().toString().padStart(2, "0"), " ").concat(e.getHours().toString().padStart(2, "0"), ":").concat(e.getMinutes().toString().padStart(2, "0"))
                },
                showDetail: function(t) {
                    this.selectedRecord = t, this.$refs.detailPopup.open()
                },
                closeDetail: function() {
                    this.$refs.detailPopup.close()
                },
                prevPage: function() {
                    this.pagination.page > 1 && (this.pagination.page--, this.loadRecords())
                },
                nextPage: function() {
                    this.pagination.page < this.pagination.totalPages && (this.pagination.page++, this.loadRecords())
                }
            }
        };
    Array || (o.resolveComponent("uni-datetime-picker") + o.resolveComponent("uni-icons") + o.resolveComponent("uni-popup"))(), Math || (function() {
        return "../../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js"
    } + function() {
        return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
    } + function() {
        return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
    })();
    var i = o._export_sfc(r, [
        ["render", function(t, e, n, r, i, c) {
            return o.e({
                a: o.o(c.onDateChange),
                b: o.o((function(t) {
                    return i.selectedDate = t
                })),
                c: o.p({
                    type: "date",
                    border: !1,
                    "clear-icon": !1,
                    modelValue: i.selectedDate
                }),
                d: o.p({
                    type: "calendar",
                    size: "20",
                    color: "#666"
                }),
                e: o.p({
                    type: "download",
                    size: "18",
                    color: "#fff"
                }),
                f: o.o((function() {
                    return c.exportExcel && c.exportExcel.apply(c, arguments)
                })),
                g: i.records.length > 0
            }, i.records.length > 0 ? {
                h: o.t(i.pagination.total),
                i: o.t(i.dayTotalAmount)
            } : {}, {
                j: i.records.length > 0
            }, i.records.length > 0 ? {
                k: o.f(i.records, (function(t, e, n) {
                    return {
                        a: o.t(c.formatTime(t.create_time)),
                        b: o.t(t.total_quantity),
                        c: o.t(t.total_amount),
                        d: "f7184fbe-3-" + n,
                        e: t._id,
                        f: o.o((function(e) {
                            return c.showDetail(t)
                        }), t._id)
                    }
                })),
                l: o.p({
                    type: "right",
                    size: "16",
                    color: "#ccc"
                })
            } : {
                m: a._imports_0$2
            }, {
                n: i.records.length > 0
            }, i.records.length > 0 ? {
                o: i.pagination.page <= 1,
                p: o.o((function() {
                    return c.prevPage && c.prevPage.apply(c, arguments)
                })),
                q: o.t(i.pagination.page),
                r: o.t(i.pagination.totalPages),
                s: i.pagination.page >= i.pagination.totalPages,
                t: o.o((function() {
                    return c.nextPage && c.nextPage.apply(c, arguments)
                }))
            } : {}, {
                v: o.p({
                    type: "closeempty",
                    size: "24",
                    color: "#999"
                }),
                w: o.o((function() {
                    return c.closeDetail && c.closeDetail.apply(c, arguments)
                })),
                x: i.selectedRecord
            }, i.selectedRecord ? {
                y: o.t(c.formatDateTime(i.selectedRecord.create_time)),
                z: o.f(i.selectedRecord.items, (function(t, e, n) {
                    return {
                        a: o.t(t.goods_name),
                        b: o.t(t.goods_price),
                        c: o.t(t.goods_quantity),
                        d: e
                    }
                })),
                A: o.t(i.selectedRecord.total_quantity),
                B: o.t(i.selectedRecord.total_profit ? i.selectedRecord.total_profit.toFixed(2) : "0.00"),
                C: o.t(i.selectedRecord.total_amount.toFixed(2))
            } : {}, {
                D: o.sr("detailPopup", "f7184fbe-4"),
                E: o.p({
                    type: "bottom",
                    "background-color": "#fff"
                }),
                F: o.p({
                    type: "checkbox-filled",
                    size: "50",
                    color: "#4CAF50"
                }),
                G: o.t(i.downloadUrl),
                H: o.o((function() {
                    return c.copyDownloadUrl && c.copyDownloadUrl.apply(c, arguments)
                })),
                I: o.o((function(e) {
                    return t.$refs.exportPopup.close()
                })),
                J: o.sr("exportPopup", "f7184fbe-6"),
                K: o.p({
                    type: "center"
                })
            })
        }],
        ["__scopeId", "data-v-f7184fbe"]
    ]);
    wx.createPage(i);
});
require("pages/subpack/record/record.js");
__wxRoute = 'pages/subpack/list/list';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/list/list.js';
define("pages/subpack/list/list.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var e = require("../../../@babel/runtime/helpers/toConsumableArray"),
        o = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
        t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
        n = require("../../../common/vendor.js"),
        s = require("../../../utils/cloudObj.js"),
        i = require("../../../common/assets.js"),
        r = {
            data: function() {
                return {
                    isDeleteMode: !1,
                    selectedItems: [],
                    enoughGoodsList: [],
                    stockGoodsList: [],
                    enoughPage: 1,
                    enoughPageSize: 12,
                    stockPage: 1,
                    stockPageSize: 12,
                    isEnoughLoading: !1,
                    isEnoughNoMore: !1,
                    isStockLoading: !1,
                    isStockNoMore: !1,
                    showPopup: !1,
                    currentGoods: {},
                    choseList: ["库存充足", "库存不足"],
                    current: 0,
                    enoughTriggered: !1,
                    stockTriggered: !1,
                    ScrollViewHeight: "",
                    navBarHeight: 44,
                    statusBarHeight: 0,
                    loginOne: 0,
                    onshowFlag: !0,
                    hasShownDeleteTip: !1
                }
            },
            onLoad: function() {
                var e = n.index.getSystemInfoSync();
                this.statusBarHeight = e.statusBarHeight, n.index.$on("closeOnshow", this.closeOnshow)
            },
            onUnload: function() {
                console.log("onUnload"), n.index.$off("closeOnshow", this.closeOnshow)
            },
            onShow: function() {
                console.log("onshow", this.onshowFlag), this.onshowFlag ? (this.onEnoughRefresh(), this.onStockRefresh()) : this.onshowFlag = !0
            },
            mounted: function() {
                this.calculateScrollViewHeight()
            },
            methods: {
                enterDeleteMode: function() {
                    this.isDeleteMode = !0
                },
                checkTip: function() {
                    var e = this;
                    this.hasShownDeleteTip = n.index.getStorageSync("hasShownDeleteTip") || !1, this.hasShownDeleteTip || n.index.showModal({
                        title: "提示",
                        content: "长按商品可进入批量删除模式，可同时删除多个商品",
                        showCancel: !1,
                        confirmText: "知道了",
                        success: function() {
                            e.hasShownDeleteTip = !0, n.index.setStorageSync("hasShownDeleteTip", !0)
                        }
                    })
                },
                handleItemClick: function(e) {
                    if (this.isDeleteMode) {
                        var o = this.selectedItems.indexOf(e._id); - 1 === o ? this.selectedItems.push(e._id) : this.selectedItems.splice(o, 1)
                    } else this.showGoodsDetail(e)
                },
                cancelDelete: function() {
                    this.isDeleteMode = !1, this.selectedItems = []
                },
                confirmDelete: function() {
                    var e = this;
                    return t(o().mark((function i() {
                        return o().wrap((function(i) {
                            for (;;) switch (i.prev = i.next) {
                                case 0:
                                    0 !== e.selectedItems.length ? (console.log("confirmDelete", e.selectedItems), n.index.showModal({
                                        title: "确认删除",
                                        content: "确定要删除选中的商品吗？",
                                        success: function() {
                                            var i = t(o().mark((function t(i) {
                                                var r;
                                                return o().wrap((function(o) {
                                                    for (;;) switch (o.prev = o.next) {
                                                        case 0:
                                                            if (!i.confirm) {
                                                                o.next = 11;
                                                                break
                                                            }
                                                            return o.prev = 1, o.next = 4, s.goodsInfoObj.deleteGoods({
                                                                goods_id_s: e.selectedItems
                                                            });
                                                        case 4:
                                                            0 === (r = o.sent).code ? (n.index.showToast({
                                                                title: "删除成功",
                                                                icon: "success"
                                                            }), e.isDeleteMode = !1, e.selectedItems = [], e.refreshList()) : n.index.showToast({
                                                                title: r.msg,
                                                                icon: "none"
                                                            }), o.next = 11;
                                                            break;
                                                        case 8:
                                                            o.prev = 8, o.t0 = o.catch(1), n.index.showToast({
                                                                title: "删除失败",
                                                                icon: "none"
                                                            });
                                                        case 11:
                                                        case "end":
                                                            return o.stop()
                                                    }
                                                }), t, null, [
                                                    [1, 8]
                                                ])
                                            })));
                                            return function(e) {
                                                return i.apply(this, arguments)
                                            }
                                        }()
                                    })) : n.index.showToast({
                                        title: "请选择要删除的商品",
                                        icon: "none"
                                    });
                                case 1:
                                case "end":
                                    return i.stop()
                            }
                        }), i)
                    })))()
                },
                closeOnshow: function() {
                    this.onshowFlag = !1
                },
                calculateScrollViewHeight: function() {
                    var e = this;
                    n.index.createSelectorQuery().select(".uni-padding-wrap").boundingClientRect((function(o) {
                        o && (e.ScrollViewHeight = "".concat(o.height + 7, "px"))
                    })).exec()
                },
                onClickText: function(e) {
                    this.current !== e.currentIndex && (this.current = e.currentIndex)
                },
                getEnoughGoods: function() {
                    var i = this;
                    return t(o().mark((function t() {
                        var r, c;
                        return o().wrap((function(o) {
                            for (;;) switch (o.prev = o.next) {
                                case 0:
                                    if (!i.isEnoughLoading && !i.isEnoughNoMore) {
                                        o.next = 2;
                                        break
                                    }
                                    return o.abrupt("return");
                                case 2:
                                    return i.isEnoughLoading = !0, o.next = 5, s.goodsInfoObj.getEnoughGoodsList({
                                        page: i.enoughPage,
                                        pageSize: i.enoughPageSize
                                    });
                                case 5:
                                    if (r = o.sent, console.log(r), 0 !== r.code) {
                                        o.next = 12;
                                        break
                                    }
                                    i.checkTip(), (c = r.data).length < i.enoughPageSize && (i.isEnoughNoMore = !0), i.choseList[0] = "库存充足（".concat(r.total, "）"), i.enoughGoodsList = [].concat(e(i.enoughGoodsList), e(c)), i.enoughPage++, o.next = 15;
                                    break;
                                case 12:
                                    if (-1 !== r.code) {
                                        o.next = 14;
                                        break
                                    }
                                    return o.abrupt("return", 0 !== i.loginOne ? (i.isEnoughLoading = !1, void(i.enoughTriggered = !1)) : (i.loginOne = 1, n.index.showToast({
                                        title: "未登录/登录过期",
                                        icon: "none"
                                    }), i.isEnoughLoading = !1, i.enoughTriggered = !1, void setTimeout((function() {
                                        n.index.navigateTo({
                                            url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                                        })
                                    }), 1e3)));
                                case 14:
                                    n.index.showToast({
                                        title: r.msg,
                                        icon: "none"
                                    });
                                case 15:
                                    i.enoughTriggered = !1, i.isEnoughLoading = !1;
                                case 16:
                                case "end":
                                    return o.stop()
                            }
                        }), t)
                    })))()
                },
                getStockGoods: function() {
                    var i = this;
                    return t(o().mark((function t() {
                        var r;
                        return o().wrap((function(o) {
                            for (;;) switch (o.prev = o.next) {
                                case 0:
                                    if (!i.isStockLoading && !i.isStockNoMore) {
                                        o.next = 2;
                                        break
                                    }
                                    return o.abrupt("return");
                                case 2:
                                    return i.isStockLoading = !0, o.next = 5, s.goodsInfoObj.getStockGoodsList({
                                        page: i.stockPage,
                                        pageSize: i.stockPageSize
                                    });
                                case 5:
                                    if (r = o.sent, console.log(r), 0 !== r.code) {
                                        o.next = 10;
                                        break
                                    }
                                    r.data.length < i.stockPageSize && (i.isStockNoMore = !0), i.choseList[1] = "库存不足（".concat(r.total, "）"), i.stockGoodsList = [].concat(e(i.stockGoodsList), e(r.data)), i.stockPage++, o.next = 13;
                                    break;
                                case 10:
                                    if (-1 !== r.code) {
                                        o.next = 12;
                                        break
                                    }
                                    return o.abrupt("return", 0 !== i.loginOne ? (i.isEnoughLoading = !1, void(i.enoughTriggered = !1)) : (i.loginOne = 1, n.index.showToast({
                                        title: "未登录/登录过期",
                                        icon: "none"
                                    }), i.isStockLoading = !1, i.stockTriggered = !1, void setTimeout((function() {
                                        n.index.navigateTo({
                                            url: "/uni_modules/uni-id-pages/pages/login/login-withoutpwd"
                                        })
                                    }), 1e3)));
                                case 12:
                                    n.index.showToast({
                                        title: r.msg,
                                        icon: "none"
                                    });
                                case 13:
                                    i.stockTriggered = !1, i.isStockLoading = !1;
                                case 14:
                                case "end":
                                    return o.stop()
                            }
                        }), t)
                    })))()
                },
                onEnoughRefresh: function() {
                    var e = this;
                    return t(o().mark((function t() {
                        return o().wrap((function(o) {
                            for (;;) switch (o.prev = o.next) {
                                case 0:
                                    return e.enoughPage = 1, e.enoughGoodsList = [], e.isEnoughNoMore = !1, e.enoughTriggered = !0, o.next = 6, e.getEnoughGoods();
                                case 6:
                                    e.enoughTriggered = !1;
                                case 7:
                                case "end":
                                    return o.stop()
                            }
                        }), t)
                    })))()
                },
                onStockRefresh: function() {
                    var e = this;
                    return t(o().mark((function t() {
                        return o().wrap((function(o) {
                            for (;;) switch (o.prev = o.next) {
                                case 0:
                                    return e.stockPage = 1, e.stockGoodsList = [], e.isStockNoMore = !1, e.stockTriggered = !0, o.next = 6, e.getStockGoods();
                                case 6:
                                    e.stockTriggered = !1;
                                case 7:
                                case "end":
                                    return o.stop()
                            }
                        }), t)
                    })))()
                },
                onEnoughReachBottom: function() {
                    this.getEnoughGoods()
                },
                onStockReachBottom: function() {
                    this.getStockGoods()
                },
                showGoodsDetail: function(e) {
                    this.currentGoods = e, this.showPopup = !0
                },
                refreshList: function() {
                    this.enoughPage = 1, this.enoughGoodsList = [], this.isEnoughNoMore = !1, this.stockPage = 1, this.stockGoodsList = [], this.isStockNoMore = !1, this.getEnoughGoods(), this.getStockGoods(), this.showPopup = !1
                }
            }
        };
    Array || (n.resolveComponent("uni-segmented-control") + n.resolveComponent("goods-item") + n.resolveComponent("goods-popup"))(), Math || (function() {
        return "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js"
    } + function() {
        return "../../../components/goods-item/goods-item.js"
    } + function() {
        return "../../../components/goods-popup/goods-popup.js"
    })();
    var c = n._export_sfc(r, [
        ["render", function(e, o, t, s, r, c) {
            return n.e({
                a: !r.isDeleteMode
            }, r.isDeleteMode ? {
                d: n.o((function() {
                    return c.cancelDelete && c.cancelDelete.apply(c, arguments)
                })),
                e: n.o((function() {
                    return c.confirmDelete && c.confirmDelete.apply(c, arguments)
                }))
            } : {
                b: n.o(c.onClickText),
                c: n.p({
                    current: r.current,
                    values: r.choseList,
                    "style-type": "text",
                    "active-color": "#24cbed",
                    "inActive-Color": "#c4c4c4"
                })
            }, {
                f: r.enoughGoodsList.length > 0
            }, r.enoughGoodsList.length > 0 ? n.e({
                g: n.f(r.enoughGoodsList, (function(e, o, t) {
                    return {
                        a: "e28df0e3-1-" + t,
                        b: n.p({
                            item: e,
                            selected: r.selectedItems.includes(e._id),
                            "delete-mode": r.isDeleteMode
                        }),
                        c: e._id,
                        d: n.o((function(o) {
                            return c.handleItemClick(e)
                        }), e._id),
                        e: n.o((function(e) {
                            return c.enterDeleteMode()
                        }), e._id)
                    }
                })),
                h: r.isEnoughLoading
            }, (r.isEnoughLoading, {}), {
                i: r.enoughTriggered,
                j: n.o((function() {
                    return c.onEnoughRefresh && c.onEnoughRefresh.apply(c, arguments)
                })),
                k: n.o((function() {
                    return c.onEnoughReachBottom && c.onEnoughReachBottom.apply(c, arguments)
                })),
                l: "calc(100vh - ".concat(r.ScrollViewHeight, ")")
            }) : 0 != r.enoughGoodsList.length || r.isEnoughLoading ? {} : {
                n: i._imports_0$2
            }, {
                m: 0 == r.enoughGoodsList.length && !r.isEnoughLoading,
                o: 0 === r.current,
                p: r.stockGoodsList.length > 0
            }, r.stockGoodsList.length > 0 ? n.e({
                q: n.f(r.stockGoodsList, (function(e, o, t) {
                    return {
                        a: "e28df0e3-2-" + t,
                        b: n.p({
                            item: e,
                            selected: r.selectedItems.includes(e._id),
                            "delete-mode": r.isDeleteMode
                        }),
                        c: e._id,
                        d: n.o((function(o) {
                            return c.handleItemClick(e)
                        }), e._id),
                        e: n.o((function(o) {
                            return c.enterDeleteMode(e)
                        }), e._id)
                    }
                })),
                r: r.isStockLoading
            }, (r.isStockLoading, {}), {
                s: r.stockTriggered,
                t: n.o((function() {
                    return c.onStockRefresh && c.onStockRefresh.apply(c, arguments)
                })),
                v: n.o((function() {
                    return c.onStockReachBottom && c.onStockReachBottom.apply(c, arguments)
                })),
                w: "calc(100vh - ".concat(r.ScrollViewHeight, ")")
            }) : 0 != r.stockGoodsList.length || r.isEnoughLoading ? {} : {
                y: i._imports_0$2
            }, {
                x: 0 == r.stockGoodsList.length && !r.isEnoughLoading,
                z: 1 === r.current,
                A: n.o((function(e) {
                    return r.showPopup = e
                })),
                B: n.o(c.refreshList),
                C: n.p({
                    show: r.showPopup,
                    goods: r.currentGoods
                })
            })
        }],
        ["__scopeId", "data-v-e28df0e3"]
    ]);
    wx.createPage(c);
});
require("pages/subpack/list/list.js");
__wxRoute = 'pages/subpack/usermsg/usermsg';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/usermsg/usermsg.js';
define("pages/subpack/usermsg/usermsg.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var e = require("../../../@babel/runtime/helpers/toConsumableArray"),
        n = require("../../../@babel/runtime/helpers/regeneratorRuntime"),
        t = require("../../../@babel/runtime/helpers/asyncToGenerator"),
        o = require("../../../common/vendor.js"),
        s = require("../../../utils/cloudObj.js"),
        r = {
            data: function() {
                return {
                    isAdmin: !1,
                    messages: [],
                    newMessage: {
                        title: "",
                        content: ""
                    },
                    pageSize: 10,
                    pageIndex: 1,
                    total: 0,
                    loading: !1,
                    hasMore: !0
                }
            },
            onLoad: function() {
                this.checkUserRole(), this.loadMessages()
            },
            onReachBottom: function() {
                this.hasMore && !this.loading && (this.pageIndex++, this.loadMessages())
            },
            methods: {
                checkUserRole: function() {
                    var e = this;
                    return t(n().mark((function t() {
                        var s;
                        return n().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    try {
                                        s = o.tr.getCurrentUserInfo().role, e.isAdmin = "admin" === s
                                    } catch (e) {
                                        console.error(e)
                                    }
                                case 1:
                                case "end":
                                    return n.stop()
                            }
                        }), t)
                    })))()
                },
                loadMessages: function() {
                    var r = this;
                    return t(n().mark((function t() {
                        var a, i, c, u;
                        return n().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    if (r.loading) {
                                        n.next = 15;
                                        break
                                    }
                                    return r.loading = !0, n.prev = 2, n.next = 5, s.sendMsg.getMessages(r.pageSize, r.pageIndex);
                                case 5:
                                    0 === (a = n.sent).errCode && (i = a.data, c = i.list, u = i.total, r.total = u, r.messages = 1 === r.pageIndex ? c : [].concat(e(r.messages), e(c)), r.hasMore = r.messages.length < u), n.next = 12;
                                    break;
                                case 9:
                                    n.prev = 9, n.t0 = n.catch(2), console.error(n.t0), o.index.showToast({
                                        title: "加载失败",
                                        icon: "none"
                                    });
                                case 12:
                                    return n.prev = 12, r.loading = !1, n.finish(12);
                                case 15:
                                case "end":
                                    return n.stop()
                            }
                        }), t, null, [
                            [2, 9, 12, 15]
                        ])
                    })))()
                },
                showSendDialog: function() {
                    this.$refs.sendPopup.open()
                },
                deleteMsg: function(e) {
                    var r = this;
                    return t(n().mark((function t() {
                        var a;
                        return n().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    return n.prev = 0, n.next = 3, s.sendMsg.deleteMessage(e);
                                case 3:
                                    0 === (a = n.sent).errCode ? (r.pageSize = 10, r.pageIndex = 1, r.total = 0, r.loadMessages()) : o.index.showToast({
                                        title: a.errMsg,
                                        icon: "none"
                                    }), n.next = 10;
                                    break;
                                case 7:
                                    n.prev = 7, n.t0 = n.catch(0), console.error(n.t0), o.index.showToast({
                                        title: "删除失败",
                                        icon: "none"
                                    });
                                case 10:
                                case "end":
                                    return n.stop()
                            }
                        }), t, null, [
                            [0, 7]
                        ])
                    })))()
                },
                confirmSend: function() {
                    var e = this;
                    return t(n().mark((function t() {
                        var r;
                        return n().wrap((function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    if (!e.newMessage.title || !e.newMessage.content) {
                                        n.next = 13;
                                        break
                                    }
                                    return n.prev = 1, n.next = 4, s.sendMsg.sendToAll(e.newMessage.title, e.newMessage.content);
                                case 4:
                                    0 === (r = n.sent).errCode ? (e.$refs.sendPopup.close(), e.newMessage = {
                                        title: "",
                                        content: ""
                                    }, e.pageSize = 10, e.pageIndex = 1, e.total = 0, e.loadMessages()) : o.index.showToast({
                                        title: r.errMsg,
                                        icon: "none"
                                    }), n.next = 11;
                                    break;
                                case 8:
                                    n.prev = 8, n.t0 = n.catch(1), console.error(n.t0), o.index.showToast({
                                        title: "发送失败",
                                        icon: "none"
                                    });
                                case 11:
                                    n.next = 14;
                                    break;
                                case 13:
                                    o.index.showToast({
                                        title: "请填写完整信息",
                                        icon: "none"
                                    });
                                case 14:
                                case "end":
                                    return n.stop()
                            }
                        }), t, null, [
                            [1, 8]
                        ])
                    })))()
                },
                viewMsg: function(e) {
                    o.index.showModal({
                        title: e.title,
                        content: e.content,
                        showCancel: !1,
                        confirmText: "关闭",
                        confirmColor: "#007AFF"
                    })
                },
                formatDate: function(e) {
                    var n = new Date(e);
                    return "".concat(n.getFullYear(), "-").concat(String(n.getMonth() + 1).padStart(2, "0"), "-").concat(String(n.getDate()).padStart(2, "0"))
                }
            }
        };
    Array || (o.resolveComponent("uni-icons") + o.resolveComponent("uni-popup"))(), Math || (function() {
        return "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js"
    } + function() {
        return "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"
    })();
    var a = o._export_sfc(r, [
        ["render", function(e, n, t, s, r, a) {
            return o.e({
                a: r.isAdmin
            }, r.isAdmin ? {
                b: o.p({
                    type: "plusempty",
                    size: "30"
                }),
                c: o.o((function() {
                    return a.showSendDialog && a.showSendDialog.apply(a, arguments)
                }))
            } : {}, {
                d: o.f(r.messages, (function(e, n, t) {
                    return o.e({
                        a: o.t(e.title)
                    }, r.isAdmin ? {
                        b: "6a45f9df-1-" + t,
                        c: o.p({
                            type: "trash",
                            size: "24",
                            color: "#ff0000"
                        }),
                        d: o.o((function(n) {
                            return a.deleteMsg(e._id)
                        }), e._id)
                    } : {}, {
                        e: o.t(e.content),
                        f: o.t(a.formatDate(e.create_date)),
                        g: e._id,
                        h: o.o((function(n) {
                            return a.viewMsg(e)
                        }), e._id)
                    })
                })),
                e: r.isAdmin,
                f: r.loading
            }, r.loading ? {
                g: o.p({
                    type: "loading",
                    size: "30"
                })
            } : (r.hasMore, {}), {
                h: !r.hasMore,
                i: r.newMessage.title,
                j: o.o((function(e) {
                    return r.newMessage.title = e.detail.value
                })),
                k: r.newMessage.content,
                l: o.o((function(e) {
                    return r.newMessage.content = e.detail.value
                })),
                m: o.o((function(n) {
                    return e.$refs.sendPopup.close()
                })),
                n: o.o((function() {
                    return a.confirmSend && a.confirmSend.apply(a, arguments)
                })),
                o: o.sr("sendPopup", "6a45f9df-3"),
                p: o.p({
                    type: "bottom"
                })
            })
        }],
        ["__scopeId", "data-v-6a45f9df"]
    ]);
    wx.createPage(a);
});
require("pages/subpack/usermsg/usermsg.js");
__wxRoute = 'pages/subpack/pay/pay';
__wxRouteBegin = true;
__wxAppCurrentFile__ = 'pages/subpack/pay/pay.js';
define("pages/subpack/pay/pay.js", function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, XMLHttpRequest, WebSocket, Reporter, webkit, WeixinJSCore) {
    "use strict";
    var e = require("../../../common/vendor.js")._export_sfc({
        data: function() {
            return {}
        },
        methods: {}
    }, [
        ["render", function(e, r, t, n, o, c) {
            return {}
        }]
    ]);
    wx.createPage(e);
});
require("pages/subpack/pay/pay.js");