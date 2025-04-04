import { computed as Y, watch as W, reactive as ye, ref as le, isRef as we, defineComponent as de, mergeModels as fe, useModel as $e, useTemplateRef as Me, onUnmounted as be, openBlock as P, createElementBlock as T, normalizeClass as De, unref as J, createElementVNode as C, renderSlot as Q, normalizeStyle as ie, createCommentVNode as te, toDisplayString as ce, withModifiers as pe, normalizeProps as _e, guardReactiveProps as Se } from "vue";
var A = /* @__PURE__ */ ((a) => (a.PENDING = "pending", a.UPLOADING = "uploading", a.UPLOADED = "uploaded", a.ERROR = "error", a))(A || {});
const j = class j {
};
j.alert = async (r) => window.alert(r), j.confirm = async (r) => new Promise((o) => {
  const l = confirm(r);
  o(l);
}), j.deleteConfirm = async (r) => j.confirm(r), j.confirmText = () => "確認", j.cancelText = () => "取消", j.deleteText = () => "刪除";
let me = j;
function oe(a = "", r = !1) {
  if (r) {
    const l = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return a + l.toString(12) + he(4);
  }
  return a + he(12);
}
function he(a = 12) {
  const o = window.crypto;
  if (!o)
    return String(Math.floor(Math.random() * a ** 10));
  const l = new Uint8Array(a);
  for (let f = 0; f < a; f += 65536)
    o.getRandomValues(l.subarray(f, f + Math.min(a - f, 65536)));
  return Array.from(l).map((f) => f.toString(16).padStart(2, "0")).join("");
}
var Ee = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Oe = { exports: {} };
(function(a, r) {
  (function(o, l) {
    a.exports = l();
  })(Ee, function() {
    var o = 1e3, l = 6e4, f = 36e5, g = "millisecond", S = "second", D = "minute", $ = "hour", E = "day", L = "week", m = "month", b = "quarter", w = "year", _ = "date", U = "Invalid Date", R = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, ae = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ue = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
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
      return { M: m, y: w, w: L, d: E, D: _, h: $, m: D, s: S, ms: g, Q: b }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, H = "en", x = {};
    x[H] = ue;
    var re = "$isDayjsObject", q = function(c) {
      return c instanceof V || !(!c || !c[re]);
    }, B = function c(s, e, t) {
      var n;
      if (!s) return H;
      if (typeof s == "string") {
        var i = s.toLowerCase();
        x[i] && (n = i), e && (x[i] = e, n = i);
        var u = s.split("-");
        if (!n && u.length > 1) return c(u[0]);
      } else {
        var d = s.name;
        x[d] = s, n = d;
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
              var d = u[2] - 1 || 0, p = (u[7] || "0").substring(0, 3);
              return i ? new Date(Date.UTC(u[1], d, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, p)) : new Date(u[1], d, u[3] || 1, u[4] || 0, u[5] || 0, u[6] || 0, p);
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
        return this.$d.toString() !== U;
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
        var n = this, i = !!h.u(t) || t, u = h.p(e), d = function(G, k) {
          var F = h.w(n.$u ? Date.UTC(n.$y, k, G) : new Date(n.$y, k, G), n);
          return i ? F : F.endOf(E);
        }, p = function(G, k) {
          return h.w(n.toDate()[G].apply(n.toDate("s"), (i ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(k)), n);
        }, v = this.$W, y = this.$M, O = this.$D, z = "set" + (this.$u ? "UTC" : "");
        switch (u) {
          case w:
            return i ? d(1, 0) : d(31, 11);
          case m:
            return i ? d(1, y) : d(0, y + 1);
          case L:
            var N = this.$locale().weekStart || 0, X = (v < N ? v + 7 : v) - N;
            return d(i ? O - X : O + (6 - X), y);
          case E:
          case _:
            return p(z + "Hours", 0);
          case $:
            return p(z + "Minutes", 1);
          case D:
            return p(z + "Seconds", 2);
          case S:
            return p(z + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, s.endOf = function(e) {
        return this.startOf(e, !1);
      }, s.$set = function(e, t) {
        var n, i = h.p(e), u = "set" + (this.$u ? "UTC" : ""), d = (n = {}, n[E] = u + "Date", n[_] = u + "Date", n[m] = u + "Month", n[w] = u + "FullYear", n[$] = u + "Hours", n[D] = u + "Minutes", n[S] = u + "Seconds", n[g] = u + "Milliseconds", n)[i], p = i === E ? this.$D + (t - this.$W) : t;
        if (i === m || i === w) {
          var v = this.clone().set(_, 1);
          v.$d[d](p), v.init(), this.$d = v.set(_, Math.min(this.$D, v.daysInMonth())).$d;
        } else d && this.$d[d](p);
        return this.init(), this;
      }, s.set = function(e, t) {
        return this.clone().$set(e, t);
      }, s.get = function(e) {
        return this[h.p(e)]();
      }, s.add = function(e, t) {
        var n, i = this;
        e = Number(e);
        var u = h.p(t), d = function(y) {
          var O = M(i);
          return h.w(O.date(O.date() + Math.round(y * e)), i);
        };
        if (u === m) return this.set(m, this.$M + e);
        if (u === w) return this.set(w, this.$y + e);
        if (u === E) return d(1);
        if (u === L) return d(7);
        var p = (n = {}, n[D] = l, n[$] = f, n[S] = o, n)[u] || 1, v = this.$d.getTime() + e * p;
        return h.w(v, this);
      }, s.subtract = function(e, t) {
        return this.add(-1 * e, t);
      }, s.format = function(e) {
        var t = this, n = this.$locale();
        if (!this.isValid()) return n.invalidDate || U;
        var i = e || "YYYY-MM-DDTHH:mm:ssZ", u = h.z(this), d = this.$H, p = this.$m, v = this.$M, y = n.weekdays, O = n.months, z = n.meridiem, N = function(k, F, ee, se) {
          return k && (k[F] || k(t, i)) || ee[F].slice(0, se);
        }, X = function(k) {
          return h.s(d % 12 || 12, k, "0");
        }, G = z || function(k, F, ee) {
          var se = k < 12 ? "AM" : "PM";
          return ee ? se.toLowerCase() : se;
        };
        return i.replace(ae, function(k, F) {
          return F || function(ee) {
            switch (ee) {
              case "YY":
                return String(t.$y).slice(-2);
              case "YYYY":
                return h.s(t.$y, 4, "0");
              case "M":
                return v + 1;
              case "MM":
                return h.s(v + 1, 2, "0");
              case "MMM":
                return N(n.monthsShort, v, O, 3);
              case "MMMM":
                return N(O, v);
              case "D":
                return t.$D;
              case "DD":
                return h.s(t.$D, 2, "0");
              case "d":
                return String(t.$W);
              case "dd":
                return N(n.weekdaysMin, t.$W, y, 2);
              case "ddd":
                return N(n.weekdaysShort, t.$W, y, 3);
              case "dddd":
                return y[t.$W];
              case "H":
                return String(d);
              case "HH":
                return h.s(d, 2, "0");
              case "h":
                return X(1);
              case "hh":
                return X(2);
              case "a":
                return G(d, p, !0);
              case "A":
                return G(d, p, !1);
              case "m":
                return String(p);
              case "mm":
                return h.s(p, 2, "0");
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
          }(k) || u.replace(":", "");
        });
      }, s.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, s.diff = function(e, t, n) {
        var i, u = this, d = h.p(t), p = M(e), v = (p.utcOffset() - this.utcOffset()) * l, y = this - p, O = function() {
          return h.m(u, p);
        };
        switch (d) {
          case w:
            i = O() / 12;
            break;
          case m:
            i = O();
            break;
          case b:
            i = O() / 3;
            break;
          case L:
            i = (y - v) / 6048e5;
            break;
          case E:
            i = (y - v) / 864e5;
            break;
          case $:
            i = y / f;
            break;
          case D:
            i = y / l;
            break;
          case S:
            i = y / o;
            break;
          default:
            i = y;
        }
        return n ? i : h.a(i);
      }, s.daysInMonth = function() {
        return this.endOf(m).$D;
      }, s.$locale = function() {
        return x[this.$L];
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
    return M.prototype = K, [["$ms", g], ["$s", S], ["$m", D], ["$H", $], ["$W", E], ["$M", m], ["$y", w], ["$D", _]].forEach(function(c) {
      K[c[1]] = function(s) {
        return this.$g(s, c[0], c[1]);
      };
    }), M.extend = function(c, s) {
      return c.$i || (c(s, V, M), c.$i = !0), M;
    }, M.locale = B, M.isDayjs = q, M.unix = function(c) {
      return M(1e3 * c);
    }, M.en = x[H], M.Ls = x, M.p = {}, M;
  });
})(Oe);
class ke {
  constructor(r = 1) {
    this.maxRunning = r, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(r) {
    const o = new Promise((l, f) => {
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
    return this.observe((l, f, g) => {
      f === 0 && g === 0 && r(l, f, g);
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
function Ae(a = 1) {
  return new ke(a);
}
function Le() {
  return Ae();
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
    use: function(l, f) {
      var g = l(r, f);
      return g || r;
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
    on: function(l, f, g) {
      var S = r._allEvents[l] || (r._allEvents[l] = []);
      function D() {
        r.off(l, D), f.apply(f, arguments);
      }
      D.fn = f;
      var $ = g ? D : f;
      return S.push($), r;
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
    once: function(l, f) {
      return r.on(l, f, !0), r;
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
    off: function(l, f) {
      return f && r._allEvents[l] ? r._allEvents[l] = r._allEvents[l].filter(
        function(g) {
          return g !== f && g !== f.fn;
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
        var f = [].slice.call(arguments);
        (r._allEvents[l] || []).map(function(g) {
          g.apply(g, f.slice(1));
        }), (r._allEvents["*"] || []).map(function(g) {
          g.apply(g, f);
        });
      }
      return r;
    }
  };
  return r;
}
const ge = {
  change: "onChange",
  "delete-item": "onDeleteItem",
  "item-click": "onItemClick",
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
  for (const o in ge) {
    const l = ge[o];
    l && a[l] && r.on(o, a[l]);
  }
  return r;
}
function Ue(a, r, o = {}) {
  const l = I(o.id ?? "vue-multi-uploader-" + oe()), f = I(o.accept ?? ""), g = I(o.maxFiles), S = I(o.maxConcurrent ?? 2), D = I(o.disabled ?? !1), $ = I(o.readonly ?? !1), E = I(r), L = Y(() => I(o.dropzone).value), m = I(o.onDragClass ?? "h-ondrag"), b = I(o.autoStart ?? !1);
  let w = I(a);
  w.value = w.value.map(
    (e) => ve(e, { uploadState: A.UPLOADED })
  );
  const _ = Le(), U = Ce(o);
  W(S, (e) => {
    _.maxRunning = e;
  }, { immediate: !0 });
  function R(e, ...t) {
    return U.emit(e, ...t);
  }
  function ae(e, t) {
    return U.on(e, t), () => {
      U.off(e, t);
    };
  }
  function ue() {
    const e = document.createElement("input");
    e.id = "multi-uploader-selector", e.type = "file", e.accept = f.value, e.multiple = !0, e.style.display = "none", e.addEventListener("change", () => {
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
      var p;
      t.stopPropagation(), t.preventDefault(), e.classList.remove(m.value);
      const n = (p = t.dataTransfer) == null ? void 0 : p.items, i = [], u = async (v) => {
        const y = [];
        v.isDirectory ? v.createReader().readEntries((z) => {
          z.forEach((N) => {
            y.push(u(N));
          });
        }) : y.push(new Promise((O) => {
          v.file((z) => {
            i.push(z), O();
          });
        })), await Promise.all(y);
      }, d = [];
      Array.prototype.forEach.call(n ?? [], (v) => {
        const y = v.webkitGetAsEntry();
        y && d.push(u(y));
      }), d.length && Promise.all(d).then(() => {
        ne(i);
      });
    }), e.__dragging_events = !0);
  }
  function ne(e) {
    Array.prototype.forEach.call(e, H), Array.prototype.forEach.call(e, (t) => {
      if (!V.value)
        return;
      const i = ye(ve({
        key: oe(),
        url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        file: t,
        uploadState: A.PENDING,
        progress: 0
      }));
      i.title = i.title || i.file.name, U.emit("create-item", i);
      const u = w.value.push(i), d = w.value[u - 1];
      if (b.value && B(d), M(i)) {
        const p = new FileReader();
        p.onload = (v) => {
          var y;
          i.thumbUrl = String((y = v.target) == null ? void 0 : y.result);
        }, p.readAsDataURL(t);
      }
    });
  }
  function H(e) {
    const t = c.value, n = e.name.split(".").pop();
    if (t.length) {
      let i = !1;
      if (t.forEach((u) => {
        i || (u.indexOf("/") !== -1 ? x(u, e.type) && (i = !0) : u.toLowerCase() === (n == null ? void 0 : n.toLowerCase()) && (i = !0));
      }), !i)
        throw R("invalid-file-type", e, t), new Error("Not accepted file ext");
    }
  }
  function x(e, t) {
    const n = e.split("/"), i = t.split("/");
    return n[1] === "*" ? n[0] === i[0] : e === t;
  }
  function re(e) {
    R("delete-item", e), w.value = w.value.filter((t) => t.key !== e.key);
  }
  async function q() {
    const e = [];
    return w.value.forEach((t) => {
      t.uploadState === A.PENDING && e.push(B(t));
    }), Promise.allSettled(e);
  }
  async function B(e) {
    e.uploadState = A.UPLOADING;
    const t = new FormData();
    return t.append("file", e.file), new Promise((i, u) => {
      const d = new XMLHttpRequest();
      R("item-upload-start", e, d), d.open("POST", E.value), d.upload.onprogress = (p) => {
        p.lengthComputable && (e.progress = p.loaded / p.total, R("item-upload-progress", e, p));
      }, d.onload = () => {
        if (d.status >= 200 && d.status < 300)
          try {
            e.uploadState = A.UPLOADED, R("item-upload-success", e, d), i(e);
          } catch (p) {
            console.error(p), e.uploadState = A.ERROR, e.message = p.message, e.messageType = "error", u(p);
          }
        else {
          const p = `Upload failed with status: ${d.status}`;
          console.error(p), e.uploadState = A.ERROR, e.message = p, e.messageType = "error", u(new Error(p));
        }
      }, d.onerror = () => {
        const p = "An error occurred during the upload.";
        console.error(p), e.uploadState = A.ERROR, e.message = p, e.messageType = "error", u(new Error(p));
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
  const V = Y(() => (g.value == null || w.value.length < Number(g.value)) && !s.value), K = Y(() => w.value.filter((t) => t.uploadState === A.UPLOADING).length > 0), c = Y(() => (Array.isArray(f.value) ? f.value : f.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), s = Y(() => D.value || $.value);
  return W(w, (e) => {
    e.map((t) => {
      t.key = t.key || oe();
    }), R("change", w);
  }, { deep: !0 }), W(K, (e) => {
    R(e ? "uploading" : "uploaded");
  }), {
    id: l,
    accept: f,
    maxFiles: g,
    maxConcurrent: S,
    disabled: D,
    readonly: $,
    uploadUrl: E,
    items: w,
    uploadQueue: _,
    eventBus: U,
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
function ve(a, r) {
  return a.key ?? (a.key = oe()), a.uploadState ?? (a.uploadState = A.PENDING), a.progress ?? (a.progress = 0), r && Object.assign(a, r), a;
}
function I(a) {
  return typeof a == "function" && (a = le(a())), we(a) ? a : le(a);
}
const Pe = { class: "vue-drag-uploader__wrapper" }, We = /* @__PURE__ */ de({
  __name: "MultiUploader",
  props: /* @__PURE__ */ fe({
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
  emits: /* @__PURE__ */ fe(["update:modelValue", "delete-item", "item-click", "uploading", "uploaded", "reorder"], ["update:modelValue"]),
  setup(a, { expose: r, emit: o }) {
    const l = a, f = o, g = $e(a, "modelValue"), S = le(g.value);
    W(g, () => {
      S.value = g.value;
    }, { deep: !0 });
    const D = Me("el");
    l.options.dropzone = l.options.dropzone ?? D;
    const $ = l.instance ?? Ue(S, l.uploadUrl ?? "", l.options), {
      isReadonly: E,
      items: L
    } = $;
    W(L, () => {
      g.value = L.value;
    }, { deep: !0 });
    const m = $.on("uploading", () => {
      f("uploading");
    }), b = $.on("uploaded", () => {
      f("uploaded");
    }), w = $.on("delete-item", (_) => {
      f("delete-item", _);
    });
    return be(() => {
      m(), b(), w();
    }), r({
      instance: $
    }), (_, U) => (P(), T("div", {
      ref_key: "el",
      ref: D,
      class: De(["vue-drag-uploader", { "vue-drag-uploader--readonly": J(E) }])
    }, [
      C("div", Pe, [
        Q(_.$slots, "items", {
          items: J(L),
          options: _.options,
          instance: ye(J($)),
          onDelete: U[0] || (U[0] = () => console.log(_.$event))
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
}, xe = { style: { "word-break": "break-word" } }, Ne = { class: "preview-img__overlay" }, je = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, Ye = {
  key: 2,
  class: "preview-img__progress"
}, Fe = { class: "error-message__message" }, Je = /* @__PURE__ */ de({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(a, { emit: r }) {
    const o = a, l = r, f = Y(() => o.item.uploadState), g = Y(() => o.item.progress);
    function S() {
      o.isReadonly || l("delete", o.item);
    }
    const D = Y(() => o.item.file ? o.item.file.name : o.item.title ? o.item.title : o.item.url.split("/").pop()), $ = Y(() => E(
      o.item.file ? o.item.file.name : o.item.url
    ));
    function E(m) {
      var _;
      const b = ((_ = m.split(".").pop()) == null ? void 0 : _.split("?").shift()) || "";
      return [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "bmp",
        "webp"
      ].indexOf(b.toLowerCase()) !== -1;
    }
    function L(m) {
      l("item-click", o.item, o.i, m);
    }
    return (m, b) => (P(), T("div", {
      class: "vue-drag-uploader-item preview-img",
      style: ie({ "--vmu-img-size": m.size }),
      onClick: L
    }, [
      Q(m.$slots, "it", { item: m.item }, () => [
        $.value ? (P(), T("div", {
          key: 0,
          class: "preview-img__body",
          style: ie({ "background-image": "url(" + (m.item.thumbUrl || m.item.url) + ")", opacity: f.value === J(A).UPLOADED ? 1 : 0.5 })
        }, null, 4)) : te("", !0),
        $.value ? te("", !0) : (P(), T("div", Te, [
          C("div", null, [
            Q(m.$slots, "icon", { item: m.item }, () => [
              (P(), T("svg", ze, b[2] || (b[2] = [
                C("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
              ])))
            ])
          ]),
          C("div", xe, ce(D.value), 1)
        ])),
        C("div", Ne, [
          m.isReadonly ? te("", !0) : (P(), T("span", {
            key: 0,
            class: "preview-img__remove-icon",
            onClick: b[0] || (b[0] = pe((w) => S(), ["prevent"]))
          }, [
            Q(m.$slots, "remove-icon", {}, () => [
              (P(), T("svg", je, b[3] || (b[3] = [
                C("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
              ])))
            ])
          ])),
          Q(m.$slots, "extra", { item: m.item })
        ]),
        f.value === J(A).UPLOADING ? (P(), T("div", Ye, [
          C("div", {
            class: "preview-img__progress-bar",
            style: ie({ width: g.value * 100 + "%" })
          }, null, 4)
        ])) : te("", !0),
        f.value === J(A).ERROR ? (P(), T("div", {
          key: 3,
          class: "preview-img__error-message error-message",
          onClick: b[1] || (b[1] = pe(() => {
          }, ["stop", "prevent"]))
        }, [
          b[4] || (b[4] = C("span", { class: "error-message__notice" }, "Upload fail", -1)),
          C("span", Fe, ce(m.item.message), 1)
        ])) : te("", !0)
      ])
    ], 4));
  }
}), He = { class: "add-button__body" }, Be = { class: "add-button__icon" }, Ve = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Ge = { class: "add-button__text" }, Ze = /* @__PURE__ */ de({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(a) {
    return (r, o) => (P(), T("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: ie({ "--vmu-img-size": r.size })
    }, [
      C("div", He, [
        Q(r.$slots, "default", {}, () => [
          C("div", Be, [
            Q(r.$slots, "icon", _e(Se({ size: r.size })), () => [
              (P(), T("svg", Ve, o[0] || (o[0] = [
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
  Ue as useMultiUploader,
  I as wrapRef,
  ve as wrapUploaderItem
};
