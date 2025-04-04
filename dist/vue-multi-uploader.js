import { computed as j, watch as W, reactive as ye, ref as le, isRef as we, defineComponent as fe, mergeModels as pe, useModel as $e, useTemplateRef as Me, onUnmounted as be, openBlock as I, createElementBlock as P, normalizeClass as De, unref as J, createElementVNode as C, renderSlot as Q, normalizeStyle as ie, createCommentVNode as te, toDisplayString as ce, withModifiers as me, normalizeProps as _e, guardReactiveProps as Se } from "vue";
var A = /* @__PURE__ */ ((a) => (a.PENDING = "pending", a.UPLOADING = "uploading", a.UPLOADED = "uploaded", a.ERROR = "error", a))(A || {});
const x = class x {
};
x.alert = async (r) => window.alert(r), x.confirm = async (r) => new Promise((o) => {
  const l = confirm(r);
  o(l);
}), x.deleteConfirm = async (r) => x.confirm(r), x.confirmText = () => "確認", x.cancelText = () => "取消", x.deleteText = () => "刪除";
let he = x;
function oe(a = "", r = !1) {
  if (r) {
    const l = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return a + l.toString(12) + ve(4);
  }
  return a + ve(12);
}
function ve(a = 12) {
  const o = window.crypto;
  if (!o)
    return String(Math.floor(Math.random() * a ** 10));
  const l = new Uint8Array(a);
  for (let p = 0; p < a; p += 65536)
    o.getRandomValues(l.subarray(p, p + Math.min(a - p, 65536)));
  return Array.from(l).map((p) => p.toString(16).padStart(2, "0")).join("");
}
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Oe = { exports: {} };
(function(a, r) {
  (function(o, l) {
    a.exports = l();
  })(Ee, function() {
    var o = 1e3, l = 6e4, p = 36e5, v = "millisecond", _ = "second", D = "minute", b = "hour", S = "day", L = "week", m = "month", y = "quarter", g = "year", k = "date", Y = "Invalid Date", R = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ae = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ue = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var s = ["th", "st", "nd", "rd"], e = c % 100;
      return "[" + c + (s[(e - 20) % 10] || s[e] || s[0]) + "]";
    } }, Z = function(c, s, e) {
      var t = String(c);
      return !t || t.length >= s ? c : "" + Array(s + 1 - t.length).join(e) + c;
    }, ne = { s: Z, z: function(c) {
      var s = -c.utcOffset(), e = Math.abs(s), t = Math.floor(e / 60), n = e % 60;
      return (s <= 0 ? "+" : "-") + Z(t, 2, "0") + ":" + Z(n, 2, "0");
    }, m: function c(s, e) {
      if (s.date() < e.date()) return -c(e, s);
      var t = 12 * (e.year() - s.year()) + (e.month() - s.month()), n = s.clone().add(t, m), i = e - n < 0, u = s.clone().add(t + (i ? -1 : 1), m);
      return +(-(t + (e - n) / (i ? n - u : u - n)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: m, y: g, w: L, d: S, D: k, h: b, m: D, s: _, ms: v, Q: y }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, H = "en", z = {};
    z[H] = ue;
    var re = "$isDayjsObject", q = function(c) {
      return c instanceof V || !(!c || !c[re]);
    }, B = function c(s, e, t) {
      var n;
      if (!s) return H;
      if (typeof s == "string") {
        var i = s.toLowerCase();
        z[i] && (n = i), e && (z[i] = e, n = i);
        var u = s.split("-");
        if (!n && u.length > 1) return c(u[0]);
      } else {
        var d = s.name;
        z[d] = s, n = d;
      }
      return !t && n && (H = n), n || !t && H;
    }, M = function(c, s) {
      if (q(c)) return c.clone();
      var e = typeof s == "object" ? s : {};
      return e.date = c, e.args = arguments, new V(e);
    }, h = ne;
    h.l = B, h.i = q, h.w = function(c, s) {
      return M(c, { locale: s.$L, utc: s.$u, x: s.$x, $offset: s.$offset });
    };
    var V = function() {
      function c(e) {
        this.$L = B(e.locale, null, !0), this.parse(e), this.$x = this.$x || e.x || {}, this[re] = !0;
      }
      var s = c.prototype;
      return s.parse = function(e) {
        this.$d = function(t) {
          var n = t.date, i = t.utc;
          if (n === null) return /* @__PURE__ */ new Date(NaN);
          if (h.u(n)) return /* @__PURE__ */ new Date();
          if (n instanceof Date) return new Date(n);
          if (typeof n == "string" && !/Z$/i.test(n)) {
            var u = n.match(R);
            if (u) {
              var d = u[2] - 1 || 0, f = (u[7] || "0").substring(0, 3);
              return i ? new Date(Date.UTC(u[1], d, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, f)) : new Date(u[1], d, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, f);
            }
          }
          return new Date(n);
        }(e), this.init();
      }, s.init = function() {
        var e = this.$d;
        this.$y = e.getFullYear(), this.$M = e.getMonth(), this.$D = e.getDate(), this.$W = e.getDay(), this.$H = e.getHours(), this.$m = e.getMinutes(), this.$s = e.getSeconds(), this.$ms = e.getMilliseconds();
      }, s.$utils = function() {
        return h;
      }, s.isValid = function() {
        return this.$d.toString() !== Y;
      }, s.isSame = function(e, t) {
        var n = M(e);
        return this.startOf(t) <= n && n <= this.endOf(t);
      }, s.isAfter = function(e, t) {
        return M(e) < this.startOf(t);
      }, s.isBefore = function(e, t) {
        return this.endOf(t) < M(e);
      }, s.$g = function(e, t, n) {
        return h.u(e) ? this[t] : this.set(n, e);
      }, s.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, s.valueOf = function() {
        return this.$d.getTime();
      }, s.startOf = function(e, t) {
        var n = this, i = !!h.u(t) || t, u = h.p(e), d = function(G, O) {
          var F = h.w(n.$u ? Date.UTC(n.$y, O, G) : new Date(n.$y, O, G), n);
          return i ? F : F.endOf(S);
        }, f = function(G, O) {
          return h.w(n.toDate()[G].apply(n.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(O)), n);
        }, w = this.$W, $ = this.$M, E = this.$D, T = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case g:
            return i ? d(1, 0) : d(31, 11);
          case m:
            return i ? d(1, $) : d(0, $ + 1);
          case L:
            var N = this.$locale().weekStart || 0, X = (w < N ? w + 7 : w) - N;
            return d(i ? E - X : E + (6 - X), $);
          case S:
          case k:
            return f(T + "Hours", 0);
          case b:
            return f(T + "Minutes", 1);
          case D:
            return f(T + "Seconds", 2);
          case _:
            return f(T + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, s.endOf = function(e) {
        return this.startOf(e, !1);
      }, s.$set = function(e, t) {
        var n, i = h.p(e), u = "set" + (this.$u ? "UTC" : ""), d = (n = {}, n[S] = u + "Date", n[k] = u + "Date", n[m] = u + "Month", n[g] = u + "FullYear", n[b] = u + "Hours", n[D] = u + "Minutes", n[_] = u + "Seconds", n[v] = u + "Milliseconds", n)[i], f = i === S ? this.$D + (t - this.$W) : t;
        if (i === m || i === g) {
          var w = this.clone().set(k, 1);
          w.$d[d](f), w.init(), this.$d = w.set(k, Math.min(this.$D, w.daysInMonth())).$d;
        } else d && this.$d[d](f);
        return this.init(), this;
      }, s.set = function(e, t) {
        return this.clone().$set(e, t);
      }, s.get = function(e) {
        return this[h.p(e)]();
      }, s.add = function(e, t) {
        var n, i = this;
        e = Number(e);
        var u = h.p(t), d = function($) {
          var E = M(i);
          return h.w(E.date(E.date() + Math.round($ * e)), i);
        };
        if (u === m) return this.set(m, this.$M + e);
        if (u === g) return this.set(g, this.$y + e);
        if (u === S) return d(1);
        if (u === L) return d(7);
        var f = (n = {}, n[D] = l, n[b] = p, n[_] = o, n)[u] || 1, w = this.$d.getTime() + e * f;
        return h.w(w, this);
      }, s.subtract = function(e, t) {
        return this.add(-1 * e, t);
      }, s.format = function(e) {
        var t = this, n = this.$locale();
        if (!this.isValid()) return n.invalidDate || Y;
        var i = e || "YYYY-MM-DDTHH:mm:ssZ", u = h.z(this), d = this.$H, f = this.$m, w = this.$M, $ = n.weekdays, E = n.months, T = n.meridiem, N = function(O, F, ee, se) {
          return O && (O[F] || O(t, i)) || ee[F].slice(0, se);
        }, X = function(O) {
          return h.s(d % 12 || 12, O, "0");
        }, G = T || function(O, F, ee) {
          var se = O < 12 ? "AM" : "PM";
          return ee ? se.toLowerCase() : se;
        };
        return i.replace(ae, function(O, F) {
          return F || function(ee) {
            switch (ee) {
              case "YY":
                return String(t.$y).slice(-2);
              case "YYYY":
                return h.s(t.$y, 4, "0");
              case "M":
                return w + 1;
              case "MM":
                return h.s(w + 1, 2, "0");
              case "MMM":
                return N(n.monthsShort, w, E, 3);
              case "MMMM":
                return N(E, w);
              case "D":
                return t.$D;
              case "DD":
                return h.s(t.$D, 2, "0");
              case "d":
                return String(t.$W);
              case "dd":
                return N(n.weekdaysMin, t.$W, $, 2);
              case "ddd":
                return N(n.weekdaysShort, t.$W, $, 3);
              case "dddd":
                return $[t.$W];
              case "H":
                return String(d);
              case "HH":
                return h.s(d, 2, "0");
              case "h":
                return X(1);
              case "hh":
                return X(2);
              case "a":
                return G(d, f, !0);
              case "A":
                return G(d, f, !1);
              case "m":
                return String(f);
              case "mm":
                return h.s(f, 2, "0");
              case "s":
                return String(t.$s);
              case "ss":
                return h.s(t.$s, 2, "0");
              case "SSS":
                return h.s(t.$ms, 3, "0");
              case "Z":
                return u;
            }
            return null;
          }(O) || u.replace(":", "");
        });
      }, s.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, s.diff = function(e, t, n) {
        var i, u = this, d = h.p(t), f = M(e), w = (f.utcOffset() - this.utcOffset()) * l, $ = this - f, E = function() {
          return h.m(u, f);
        };
        switch (d) {
          case g:
            i = E() / 12;
            break;
          case m:
            i = E();
            break;
          case y:
            i = E() / 3;
            break;
          case L:
            i = ($ - w) / 6048e5;
            break;
          case S:
            i = ($ - w) / 864e5;
            break;
          case b:
            i = $ / p;
            break;
          case D:
            i = $ / l;
            break;
          case _:
            i = $ / o;
            break;
          default:
            i = $;
        }
        return n ? i : h.a(i);
      }, s.daysInMonth = function() {
        return this.endOf(m).$D;
      }, s.$locale = function() {
        return z[this.$L];
      }, s.locale = function(e, t) {
        if (!e) return this.$L;
        var n = this.clone(), i = B(e, t, !0);
        return i && (n.$L = i), n;
      }, s.clone = function() {
        return h.w(this.$d, this);
      }, s.toDate = function() {
        return new Date(this.valueOf());
      }, s.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, s.toISOString = function() {
        return this.$d.toISOString();
      }, s.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), K = V.prototype;
    return M.prototype = K, [["$ms", v], ["$s", _], ["$m", D], ["$H", b], ["$W", S], ["$M", m], ["$y", g], ["$D", k]].forEach(function(c) {
      K[c[1]] = function(s) {
        return this.$g(s, c[0], c[1]);
      };
    }), M.extend = function(c, s) {
      return c.$i || (c(s, V, M), c.$i = !0), M;
    }, M.locale = B, M.isDayjs = q, M.unix = function(c) {
      return M(1e3 * c);
    }, M.en = z[H], M.Ls = z, M.p = {}, M;
  });
})(Oe);
class Ae {
  constructor(r = 1) {
    this.maxRunning = r, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(r) {
    const o = new Promise((l, p) => {
      this.items.push(() => Promise.resolve(r()).then(l));
    });
    return this.run(), o;
  }
  run() {
    this.running || (this.running = !0), this.pop();
  }
  async pop() {
    const r = this.items.shift();
    if (!r)
      return this.running = !1, Promise.resolve();
    if (this.currentRunning >= this.maxRunning)
      return this.items.unshift(r), Promise.resolve();
    this.currentRunning++, this.notice();
    try {
      return await r();
    } catch (o) {
      throw o;
    } finally {
      this.endPop();
    }
  }
  endPop() {
    this.currentRunning--, this.notice(), this.pop();
  }
  clear() {
    return this.items = [], this.notice(), this;
  }
  isEmpty() {
    return this.items.length === 0;
  }
  get length() {
    return this.items.length;
  }
  peek() {
    return this.items;
  }
  observe(r, o = {}) {
    return this.observers.push({
      handler: r,
      once: o.once || !1
    }), () => {
      this.off(r);
    };
  }
  once(r, o = {}) {
    return o.once = !0, this.observe(r, o);
  }
  onEnd(r, o = {}) {
    return this.observe((l, p, v) => {
      p === 0 && v === 0 && r(l, p, v);
    }, o);
  }
  notice() {
    return this.observers.forEach((r) => {
      r.handler(this, this.length, this.currentRunning);
    }), this.observers = this.observers.filter((r) => !r.once), this;
  }
  off(r) {
    return r == null ? (this.observers = [], this) : (this.observers = this.observers.filter((o) => o.handler !== r), this);
  }
}
function Le(a = 1) {
  return new Ae(a);
}
function ke() {
  return Le();
}
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function Re() {
  var a = /* @__PURE__ */ Object.create(null), r = {
    /**
     * > An listeners map of all registered events
     * and their listeners. A key/value store, where 1) value
     * is an array of event listeners for the key and 2) key
     * is the name of the event.
     *
     * See [JSBin Example](http://jsbin.com/fakajazafu/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter.on('foo', () => {})
     * emitter.on('foo', () => {})
     * emitter.on('bar', () => {})
     *
     * console.log(emitter._allEvents)
     * // => { foo: [Function, Function], bar: [Functon] }
     *
     * console.log(emitter._allEvents.foo.length) // => 2
     * console.log(emitter._allEvents.bar.length) // => 1
     * ```
     *
     * @name  ._allEvents
     * @type {Object} `_allEvents` a key/value store of all events and their listeners
     * @api public
     */
    _allEvents: a,
    /**
     * > Invokes `plugin` function immediately, which is passed
     * with `app` instance. You can use it for adding more methods
     * or properties to the instance. Useful if you want to make
     * dush to work with DOM for example.
     *
     * **Example**
     *
     * ```js
     * const app = dush()
     *
     * app.on('hi', (str) => {
     *   console.log(str) // => 'Hello World!!'
     * })
     *
     * app.use((app) => {
     *   app.foo = 'bar'
     *   app.hello = (place) => app.emit('hi', `Hello ${place}!!`)
     * })
     *
     * console.log(app.foo) // => 'bar'
     * app.hello('World')
     * ```
     *
     * @name   .use
     * @param  {Function} `plugin` A function passed with `(app, options)` signature
     * @param  {Object} `options` optional, passed as second argument to `plugin` function
     * @return {Object} self "app" for chaining
     * @api public
     */
    use: function(l, p) {
      var v = l(r, p);
      return v || r;
    },
    /**
     * > Add `handler` for `name` event.
     *
     * See [JSBin Example](http://jsbin.com/xeketuruto/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter
     *   .on('hi', (place) => {
     *     console.log(`hello ${place}!`) // => 'hello world!'
     *   })
     *   .on('hi', (place) => {
     *     console.log(`hi ${place}, yeah!`) // => 'hi world, yeah!'
     *   })
     *
     * emitter.emit('hi', 'world')
     * ```
     *
     * @name   .on
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @param  {Boolean} `once` Make `handler` be called only once,
     *                          the `.once` method use this internally
     * @return {Object} self "app" for chaining
     * @api public
     */
    on: function(l, p, v) {
      var _ = r._allEvents[l] || (r._allEvents[l] = []);
      function D() {
        r.off(l, D), p.apply(p, arguments);
      }
      D.fn = p;
      var b = v ? D : p;
      return _.push(b), r;
    },
    /**
     * > Add `handler` for `name` event that
     * will be called only one time.
     *
     * See [JSBin Example](http://jsbin.com/teculorima/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     * let called = 0
     *
     * emitter.once('foo', () => {
     *   console.log('called only once')
     *   called++
     * })
     *
     * emitter
     *   .emit('foo', 111)
     *   .emit('foo', 222)
     *   .emit('foo', 333)
     *
     * console.log(called) // => 1
     * ```
     *
     * @name   .once
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @return {Object} self "app" for chaining
     * @api public
     */
    once: function(l, p) {
      return r.on(l, p, !0), r;
    },
    /**
     * > Remove `handler` for `name` event. If `handler` not
     * passed will remove **all** listeners for that `name` event.
     *
     * See [JSBin Example](http://jsbin.com/nujucoquvi/3/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * const handler = () => {
     *   console.log('not called')
     * }
     *
     * emitter.on('foo', handler)
     * emitter.off('foo', handler)
     *
     * emitter.on('foo', (abc) => {
     *   console.log('called', abc) // => 'called 123'
     * })
     * emitter.emit('foo', 123)
     *
     * // or removing all listeners of `foo`
     * emitter.off('foo')
     * emitter.emit('foo')
     * ```
     *
     * @name   .off
     * @param  {String} `name` Type of event to listen for, or `'*'` for all events
     * @param  {Function} `handler` Function to call in response to given event
     * @return {Object} self "app" for chaining
     * @api public
     */
    off: function(l, p) {
      return p && r._allEvents[l] ? r._allEvents[l] = r._allEvents[l].filter(
        function(v) {
          return v !== p && v !== p.fn;
        }
      ) : l ? r._allEvents[l] = [] : r._allEvents = /* @__PURE__ */ Object.create(null), r;
    },
    /**
     * > Invoke all handlers for given `name` event.
     * If present, `'*'` listeners are invoked too with `(type, ...rest)` signature,
     * where the `type` argument is a string representing the name of the
     * called event; and all of the rest arguments.
     *
     * See [JSBin Example](http://jsbin.com/muqujavolu/edit?js,console).
     *
     * **Example**
     *
     * ```js
     * const emitter = dush()
     *
     * emitter.on('foo', (a, b, c) => {
     *   console.log(`${a}, ${b}, ${c}`) // => 1, 2, 3
     * })
     *
     * emitter.on('*', (name, a, b, c) => {
     *   console.log(`name is: ${name}`)
     *   console.log(`rest args are: ${a}, ${b}, ${c}`)
     * })
     *
     * emitter.emit('foo', 1, 2, 3)
     * emitter.emit('bar', 555)
     * ```
     *
     * @name   .emit
     * @param  {String} `name` The name of the event to invoke
     * @param  {any} `args` Any number of arguments of any type of value, passed to each listener
     * @return {Object} self "app" for chaining
     * @api public
     */
    emit: function(l) {
      if (l !== "*") {
        var p = [].slice.call(arguments);
        (r._allEvents[l] || []).map(function(v) {
          v.apply(v, p.slice(1));
        }), (r._allEvents["*"] || []).map(function(v) {
          v.apply(v, p);
        });
      }
      return r;
    }
  };
  return r;
}
const de = {
  change: "onChange",
  "delete-item": "onDeleteItem",
  uploading: "onUploading",
  uploaded: "onUploaded",
  "create-item": "onCreateItem",
  "item-upload-start": "onItemUploadStart",
  "item-upload-success": "onItemUploadSuccess",
  "item-upload-fail": "onItemUploadFail",
  "item-upload-end": "onItemUploadEnd",
  "item-upload-progress": "onItemUploadProgress",
  "invalid-file-type": "onInvalidFileType"
};
function Ce(a) {
  const r = Re();
  for (const o in de) {
    const l = de[o];
    l && a[l] && r.on(o, a[l]);
  }
  return r;
}
function Ue(a, r, o = {}) {
  const l = U(o.id ?? "vue-multi-uploader-" + oe()), p = U(o.accept ?? ""), v = U(o.maxFiles), _ = U(o.maxConcurrent ?? 2), D = U(o.disabled ?? !1), b = U(o.readonly ?? !1), S = U(r), L = j(() => U(o.dropzone).value), m = U(o.onDragClass ?? "h-ondrag"), y = U(o.autoStart ?? !1);
  let g = U(a);
  g.value = g.value.map(
    (e) => ge(e, { uploadState: A.UPLOADED })
  );
  const k = ke(), Y = Ce(o);
  W(_, (e) => {
    k.maxRunning = e;
  }, { immediate: !0 });
  function R(e, ...t) {
    return Y.emit(e, ...t);
  }
  function ae(e, t) {
    return Y.on(e, t), () => {
      Y.off(e, t);
    };
  }
  function ue() {
    const e = document.createElement("input");
    e.id = "multi-uploader-selector", e.type = "file", e.accept = p.value, e.multiple = !0, e.style.display = "none", e.addEventListener("change", () => {
      const t = e.files;
      ne(t), e.remove();
    }), e.addEventListener("change", () => {
      e.remove();
    }), e.addEventListener("blur", () => {
      e.remove();
    }), document.body.appendChild(e), e.dispatchEvent(
      new MouseEvent("click", {
        view: window,
        bubbles: !0,
        cancelable: !0
      })
    );
  }
  W(L, () => {
    const e = Ie(L.value);
    e && e instanceof HTMLElement && Z(e);
  }, { immediate: !0 });
  function Z(e) {
    e.__dragging_events || (e.addEventListener("dragover", (t) => {
      t.stopPropagation(), t.preventDefault(), e.classList.add(m.value);
    }), e.addEventListener("dragleave", (t) => {
      t.stopPropagation(), t.preventDefault(), e.classList.remove(m.value);
    }), e.addEventListener("drop", async (t) => {
      var f;
      t.stopPropagation(), t.preventDefault(), e.classList.remove(m.value);
      const n = (f = t.dataTransfer) == null ? void 0 : f.items, i = [], u = async (w) => {
        const $ = [];
        w.isDirectory ? w.createReader().readEntries((T) => {
          T.forEach((N) => {
            $.push(u(N));
          });
        }) : $.push(new Promise((E) => {
          w.file((T) => {
            i.push(T), E();
          });
        })), await Promise.all($);
      }, d = [];
      Array.prototype.forEach.call(n ?? [], (w) => {
        const $ = w.webkitGetAsEntry();
        $ && d.push(u($));
      }), d.length && Promise.all(d).then(() => {
        ne(i);
      });
    }), e.__dragging_events = !0);
  }
  function ne(e) {
    Array.prototype.forEach.call(e, H), Array.prototype.forEach.call(e, (t) => {
      if (!V.value)
        return;
      const i = ye(ge({
        key: oe(),
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        file: t,
        uploadState: A.PENDING,
        progress: 0
      }));
      i.title = i.title || i.file.name, Y.emit("create-item", i);
      const u = g.value.push(i), d = g.value[u - 1];
      if (y.value && B(d), M(i)) {
        const f = new FileReader();
        f.onload = (w) => {
          var $;
          i.thumbUrl = String(($ = w.target) == null ? void 0 : $.result);
        }, f.readAsDataURL(t);
      }
    });
  }
  function H(e) {
    const t = c.value, n = e.name.split(".").pop();
    if (t.length) {
      let i = !1;
      if (t.forEach((u) => {
        i || (u.indexOf("/") !== -1 ? z(u, e.type) && (i = !0) : u.toLowerCase() === (n == null ? void 0 : n.toLowerCase()) && (i = !0));
      }), !i)
        throw R("invalid-file-type", e, t), new Error("Not accepted file ext");
    }
  }
  function z(e, t) {
    const n = e.split("/"), i = t.split("/");
    return n[1] === "*" ? n[0] === i[0] : e === t;
  }
  function re(e) {
    R("delete-item", e), g.value = g.value.filter((t) => t.key !== e.key);
  }
  async function q() {
    const e = [];
    return g.value.forEach((t) => {
      t.uploadState === A.PENDING && e.push(B(t));
    }), Promise.allSettled(e);
  }
  async function B(e) {
    e.uploadState = A.UPLOADING;
    const t = new FormData();
    return t.append("file", e.file), new Promise((i, u) => {
      const d = new XMLHttpRequest();
      R("item-upload-start", e, d), d.open("POST", S.value), d.upload.onprogress = (f) => {
        f.lengthComputable && (e.progress = f.loaded / f.total, R("item-upload-progress", e, f));
      }, d.onload = () => {
        if (d.status >= 200 && d.status < 300)
          try {
            e.uploadState = A.UPLOADED, R("item-upload-success", e, d), i(e);
          } catch (f) {
            console.error(f), e.uploadState = A.ERROR, e.message = f.message, e.messageType = "error", u(f);
          }
        else {
          const f = `Upload failed with status: ${d.status}`;
          console.error(f), e.uploadState = A.ERROR, e.message = f, e.messageType = "error", u(new Error(f));
        }
      }, d.onerror = () => {
        const f = "An error occurred during the upload.";
        console.error(f), e.uploadState = A.ERROR, e.message = f, e.messageType = "error", u(new Error(f));
      }, d.onloadend = () => {
        R("item-upload-end", e, d);
      }, d.send(t);
    }).catch((i) => (R("item-upload-fail", e, i), Promise.reject(i)));
  }
  function M(e) {
    return h(
      e.file ? e.file.name : e.url
    );
  }
  function h(e) {
    var i;
    const t = ((i = e.split(".").pop()) == null ? void 0 : i.split("?").shift()) || "";
    return [
      "png",
      "jpeg",
      "jpg",
      "gif",
      "bmp",
      "webp"
    ].indexOf(t.toLowerCase()) !== -1;
  }
  const V = j(() => (v.value == null || g.value.length < Number(v.value)) && !s.value), K = j(() => g.value.filter((t) => t.uploadState === A.UPLOADING).length > 0), c = j(() => (Array.isArray(p.value) ? p.value : p.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), s = j(() => D.value || b.value);
  return W(g, (e) => {
    e.map((t) => {
      t.key = t.key || oe();
    }), R("change", g);
  }, { deep: !0 }), W(K, (e) => {
    R(e ? "uploading" : "uploaded");
  }), {
    id: l,
    accept: p,
    maxFiles: v,
    maxConcurrent: _,
    disabled: D,
    readonly: b,
    uploadUrl: S,
    items: g,
    eventBus: Y,
    canUpload: V,
    isUploading: K,
    acceptedTypes: c,
    isReadonly: s,
    emits: R,
    on: ae,
    openFileSelector: ue,
    deleteItem: re,
    uploadStart: q,
    isImageItem: M,
    isImage: h
  };
}
function Ie(a) {
  return a ? "$el" in a ? a.$el : a : null;
}
function ge(a, r) {
  return a.key ?? (a.key = oe()), a.uploadState ?? (a.uploadState = A.PENDING), a.progress ?? (a.progress = 0), r && Object.assign(a, r), a;
}
function U(a) {
  return typeof a == "function" && (a = le(a())), we(a) ? a : le(a);
}
const Pe = { class: "vue-drag-uploader__wrapper" }, We = /* @__PURE__ */ fe({
  __name: "MultiUploader",
  props: /* @__PURE__ */ pe({
    id: {},
    uploadUrl: {},
    placeholder: {},
    instance: {},
    options: { default: () => ({}) }
  }, {
    modelValue: {
      default: () => []
    },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ pe(["update:modelValue", "change", "delete-item", "uploading", "uploaded", "create-item", "item-upload-start", "item-upload-success", "item-upload-fail", "item-upload-end", "item-upload-progress", "invalid-file-type"], ["update:modelValue"]),
  setup(a, { expose: r, emit: o }) {
    const l = a, p = o, v = $e(a, "modelValue"), _ = le(v.value);
    W(v, () => {
      _.value = v.value;
    }, { deep: !0 });
    const D = Me("el");
    l.options.dropzone = l.options.dropzone ?? D;
    const b = l.instance ?? Ue(_, l.uploadUrl ?? "", l.options), {
      isReadonly: S,
      items: L
    } = b;
    W(L, () => {
      v.value = L.value;
    }, { deep: !0 });
    const m = [];
    for (const y in de) {
      const g = b.on(y, (...k) => {
        p(y, ...k);
      });
      m.push(g);
    }
    return be(() => {
      m.forEach((y) => y());
    }), r({
      instance: b
    }), (y, g) => (I(), P("div", {
      ref_key: "el",
      ref: D,
      class: De(["vue-drag-uploader", { "vue-drag-uploader--readonly": J(S) }])
    }, [
      C("div", Pe, [
        Q(y.$slots, "items", {
          items: J(L),
          options: y.options,
          instance: ye(J(b)),
          onDelete: g[0] || (g[0] = () => console.log(y.$event))
        })
      ])
    ], 2));
  }
}), Te = {
  key: 1,
  class: "preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"
}, ze = {
  style: { width: "calc(var(--vmu-img-size) / 3)", height: "calc(var(--vmu-img-size) / 3)" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 384 512"
}, Ne = { style: { "word-break": "break-word" } }, xe = { class: "preview-img__overlay" }, je = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, Ye = {
  key: 2,
  class: "preview-img__progress"
}, Fe = { class: "error-message__message" }, Je = /* @__PURE__ */ fe({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(a, { emit: r }) {
    const o = a, l = r, p = j(() => o.item.uploadState), v = j(() => o.item.progress);
    function _() {
      o.isReadonly || l("delete", o.item);
    }
    const D = j(() => o.item.file ? o.item.file.name : o.item.title ? o.item.title : o.item.url.split("/").pop()), b = j(() => S(
      o.item.file ? o.item.file.name : o.item.url
    ));
    function S(m) {
      var k;
      const y = ((k = m.split(".").pop()) == null ? void 0 : k.split("?").shift()) || "";
      return [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "bmp",
        "webp"
      ].indexOf(y.toLowerCase()) !== -1;
    }
    function L(m) {
      l("item-click", o.item, o.i, m);
    }
    return (m, y) => (I(), P("div", {
      class: "vue-drag-uploader-item preview-img",
      style: ie({ "--vmu-img-size": m.size }),
      onClick: L
    }, [
      Q(m.$slots, "it", { item: m.item }, () => [
        b.value ? (I(), P("div", {
          key: 0,
          class: "preview-img__body",
          style: ie({ "background-image": "url(" + (m.item.thumbUrl || m.item.url) + ")", opacity: p.value === J(A).UPLOADED ? 1 : 0.5 })
        }, null, 4)) : te("", !0),
        b.value ? te("", !0) : (I(), P("div", Te, [
          C("div", null, [
            Q(m.$slots, "icon", { item: m.item }, () => [
              (I(), P("svg", ze, y[2] || (y[2] = [
                C("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
              ])))
            ])
          ]),
          C("div", Ne, ce(D.value), 1)
        ])),
        C("div", xe, [
          m.isReadonly ? te("", !0) : (I(), P("span", {
            key: 0,
            class: "preview-img__remove-icon",
            onClick: y[0] || (y[0] = me((g) => _(), ["prevent"]))
          }, [
            Q(m.$slots, "remove-icon", {}, () => [
              (I(), P("svg", je, y[3] || (y[3] = [
                C("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
              ])))
            ])
          ])),
          Q(m.$slots, "extra", { item: m.item })
        ]),
        p.value === J(A).UPLOADING ? (I(), P("div", Ye, [
          C("div", {
            class: "preview-img__progress-bar",
            style: ie({ width: v.value * 100 + "%" })
          }, null, 4)
        ])) : te("", !0),
        p.value === J(A).ERROR ? (I(), P("div", {
          key: 3,
          class: "preview-img__error-message error-message",
          onClick: y[1] || (y[1] = me(() => {
          }, ["stop", "prevent"]))
        }, [
          y[4] || (y[4] = C("span", { class: "error-message__notice" }, "Upload fail", -1)),
          C("span", Fe, ce(m.item.message), 1)
        ])) : te("", !0)
      ])
    ], 4));
  }
}), He = { class: "add-button__body" }, Be = { class: "add-button__icon" }, Ve = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Ge = { class: "add-button__text" }, Ze = /* @__PURE__ */ fe({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(a) {
    return (r, o) => (I(), P("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: ie({ "--vmu-img-size": r.size })
    }, [
      C("div", He, [
        Q(r.$slots, "default", {}, () => [
          C("div", Be, [
            Q(r.$slots, "icon", _e(Se({ size: r.size })), () => [
              (I(), P("svg", Ve, o[0] || (o[0] = [
                C("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])))
            ])
          ]),
          C("div", Ge, ce(r.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  Je as ItemCard,
  Ze as ItemCardPlaceholder,
  We as MultiUploader,
  A as UploadState,
  de as uploaderEvents,
  Ue as useMultiUploader,
  U as wrapRef,
  ge as wrapUploaderItem
};
