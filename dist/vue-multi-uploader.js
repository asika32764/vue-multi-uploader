import { ref as de, isRef as we, computed as B, watch as ee, reactive as ie, defineComponent as he, mergeModels as me, useModel as $e, useTemplateRef as Me, onUnmounted as be, createElementBlock as j, openBlock as H, normalizeClass as Se, unref as Y, renderSlot as W, createElementVNode as F, normalizeStyle as le, createCommentVNode as re, toDisplayString as fe, withModifiers as ve, normalizeProps as De, guardReactiveProps as Ee } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function _e() {
  var s = /* @__PURE__ */ Object.create(null), n = {
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
    _allEvents: s,
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
    use: function(a, d) {
      var g = a(n, d);
      return g || n;
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
    on: function(a, d, g) {
      var L = n._allEvents[a] || (n._allEvents[a] = []);
      function S() {
        n.off(a, S), d.apply(d, arguments);
      }
      S.fn = d;
      var M = g ? S : d;
      return L.push(M), n;
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
    once: function(a, d) {
      return n.on(a, d, !0), n;
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
    off: function(a, d) {
      return d && n._allEvents[a] ? n._allEvents[a] = n._allEvents[a].filter(
        function(g) {
          return g !== d && g !== d.fn;
        }
      ) : a ? n._allEvents[a] = [] : n._allEvents = /* @__PURE__ */ Object.create(null), n;
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
    emit: function(a) {
      if (a !== "*") {
        var d = [].slice.call(arguments);
        (n._allEvents[a] || []).map(function(g) {
          g.apply(g, d.slice(1));
        }), (n._allEvents["*"] || []).map(function(g) {
          g.apply(g, d);
        });
      }
      return n;
    }
  };
  return n;
}
const pe = {
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
  "invalid-file": "onInvalidFile"
};
function Oe(s) {
  const n = _e();
  for (const t in pe) {
    const a = pe[t];
    a && s[a] && n.on(t, s[a]);
  }
  return n;
}
var z = /* @__PURE__ */ ((s) => (s.PENDING = "pending", s.UPLOADING = "uploading", s.UPLOADED = "uploaded", s.ERROR = "error", s))(z || {});
class Ie extends Error {
  constructor(n, t, a) {
    super(n), this.file = t, this.accepted = a, this.name = "InvalidFileTypeError";
  }
}
class Ae extends Error {
  constructor(n, t, a) {
    super(n), this.file = t, this.maxSize = a, this.name = "InvalidFileSizeError";
  }
}
function Le(s, n) {
  const t = document.createElement("input");
  t.id = "multi-uploader-selector", t.type = "file", t.accept = s.value, t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
    const a = t.files;
    n(a), t.remove();
  }), t.addEventListener("change", () => {
    t.remove();
  }), t.addEventListener("blur", () => {
    t.remove();
  }), document.body.appendChild(t), t.dispatchEvent(
    new MouseEvent("click", {
      view: window,
      bubbles: !0,
      cancelable: !0
    })
  );
}
function ke(s, n, t) {
  s.__dragging_events || (s.addEventListener("dragover", (a) => {
    a.stopPropagation(), a.preventDefault(), s.classList.add(n.value);
  }), s.addEventListener("dragleave", (a) => {
    a.stopPropagation(), a.preventDefault(), s.classList.remove(n.value);
  }), s.addEventListener("drop", async (a) => {
    var M;
    a.stopPropagation(), a.preventDefault(), s.classList.remove(n.value);
    const d = (M = a.dataTransfer) == null ? void 0 : M.items, g = [], L = async (O) => {
      const D = [];
      O.isDirectory ? O.createReader().readEntries((y) => {
        y.forEach((k) => {
          D.push(L(k));
        });
      }) : D.push(new Promise((v) => {
        O.file((y) => {
          g.push(y), v();
        });
      })), await Promise.all(D);
    }, S = [];
    Array.prototype.forEach.call(d ?? [], (O) => {
      const D = O.webkitGetAsEntry();
      D && S.push(L(D));
    }), S.length && Promise.all(S).then(() => {
      t(g);
    });
  }), s.__dragging_events = !0);
}
const Q = class Q {
};
Q.alert = async (n) => window.alert(n), Q.confirm = async (n) => new Promise((t) => {
  const a = confirm(n);
  t(a);
}), Q.deleteConfirm = async (n) => Q.confirm(n), Q.confirmText = () => "確認", Q.cancelText = () => "取消", Q.deleteText = () => "刪除";
let ge = Q;
function se(s = "", n = !1) {
  if (n) {
    const a = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return s + a.toString(12) + ye(4);
  }
  return s + ye(12);
}
function ye(s = 12) {
  const t = window.crypto;
  if (!t)
    return String(Math.floor(Math.random() * s ** 10));
  const a = new Uint8Array(s);
  for (let d = 0; d < s; d += 65536)
    t.getRandomValues(a.subarray(d, d + Math.min(s - d, 65536)));
  return Array.from(a).map((d) => d.toString(16).padStart(2, "0")).join("");
}
var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ue = { exports: {} };
(function(s, n) {
  (function(t, a) {
    s.exports = a();
  })(Re, function() {
    var t = 1e3, a = 6e4, d = 36e5, g = "millisecond", L = "second", S = "minute", M = "hour", O = "day", D = "week", v = "month", y = "quarter", k = "year", P = "date", te = "Invalid Date", oe = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ae = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var o = ["th", "st", "nd", "rd"], r = c % 100;
      return "[" + c + (o[(r - 20) % 10] || o[r] || o[0]) + "]";
    } }, V = function(c, o, r) {
      var u = String(c);
      return !u || u.length >= o ? c : "" + Array(o + 1 - u.length).join(r) + c;
    }, N = { s: V, z: function(c) {
      var o = -c.utcOffset(), r = Math.abs(o), u = Math.floor(r / 60), i = r % 60;
      return (o <= 0 ? "+" : "-") + V(u, 2, "0") + ":" + V(i, 2, "0");
    }, m: function c(o, r) {
      if (o.date() < r.date()) return -c(r, o);
      var u = 12 * (r.year() - o.year()) + (r.month() - o.month()), i = o.clone().add(u, v), f = r - i < 0, p = o.clone().add(u + (f ? -1 : 1), v);
      return +(-(u + (r - i) / (f ? i - p : p - i)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: v, y: k, w: D, d: O, D: P, h: M, m: S, s: L, ms: g, Q: y }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, J = "en", G = {};
    G[J] = ae;
    var ue = "$isDayjsObject", Z = function(c) {
      return c instanceof K || !(!c || !c[ue]);
    }, X = function c(o, r, u) {
      var i;
      if (!o) return J;
      if (typeof o == "string") {
        var f = o.toLowerCase();
        G[f] && (i = f), r && (G[f] = r, i = f);
        var p = o.split("-");
        if (!i && p.length > 1) return c(p[0]);
      } else {
        var $ = o.name;
        G[$] = o, i = $;
      }
      return !u && i && (J = i), i || !u && J;
    }, I = function(c, o) {
      if (Z(c)) return c.clone();
      var r = typeof o == "object" ? o : {};
      return r.date = c, r.args = arguments, new K(r);
    }, w = N;
    w.l = X, w.i = Z, w.w = function(c, o) {
      return I(c, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var K = function() {
      function c(r) {
        this.$L = X(r.locale, null, !0), this.parse(r), this.$x = this.$x || r.x || {}, this[ue] = !0;
      }
      var o = c.prototype;
      return o.parse = function(r) {
        this.$d = function(u) {
          var i = u.date, f = u.utc;
          if (i === null) return /* @__PURE__ */ new Date(NaN);
          if (w.u(i)) return /* @__PURE__ */ new Date();
          if (i instanceof Date) return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var p = i.match(oe);
            if (p) {
              var $ = p[2] - 1 || 0, b = (p[7] || "0").substring(0, 3);
              return f ? new Date(Date.UTC(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b)) : new Date(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b);
            }
          }
          return new Date(i);
        }(r), this.init();
      }, o.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, o.$utils = function() {
        return w;
      }, o.isValid = function() {
        return this.$d.toString() !== te;
      }, o.isSame = function(r, u) {
        var i = I(r);
        return this.startOf(u) <= i && i <= this.endOf(u);
      }, o.isAfter = function(r, u) {
        return I(r) < this.startOf(u);
      }, o.isBefore = function(r, u) {
        return this.endOf(u) < I(r);
      }, o.$g = function(r, u, i) {
        return w.u(r) ? this[u] : this.set(i, r);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(r, u) {
        var i = this, f = !!w.u(u) || u, p = w.p(r), $ = function(E, m) {
          var x = w.w(i.$u ? Date.UTC(i.$y, m, E) : new Date(i.$y, m, E), i);
          return f ? x : x.endOf(O);
        }, b = function(E, m) {
          return w.w(i.toDate()[E].apply(i.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(m)), i);
        }, A = this.$W, R = this.$M, T = this.$D, e = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case k:
            return f ? $(1, 0) : $(31, 11);
          case v:
            return f ? $(1, R) : $(0, R + 1);
          case D:
            var l = this.$locale().weekStart || 0, h = (A < l ? A + 7 : A) - l;
            return $(f ? T - h : T + (6 - h), R);
          case O:
          case P:
            return b(e + "Hours", 0);
          case M:
            return b(e + "Minutes", 1);
          case S:
            return b(e + "Seconds", 2);
          case L:
            return b(e + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(r) {
        return this.startOf(r, !1);
      }, o.$set = function(r, u) {
        var i, f = w.p(r), p = "set" + (this.$u ? "UTC" : ""), $ = (i = {}, i[O] = p + "Date", i[P] = p + "Date", i[v] = p + "Month", i[k] = p + "FullYear", i[M] = p + "Hours", i[S] = p + "Minutes", i[L] = p + "Seconds", i[g] = p + "Milliseconds", i)[f], b = f === O ? this.$D + (u - this.$W) : u;
        if (f === v || f === k) {
          var A = this.clone().set(P, 1);
          A.$d[$](b), A.init(), this.$d = A.set(P, Math.min(this.$D, A.daysInMonth())).$d;
        } else $ && this.$d[$](b);
        return this.init(), this;
      }, o.set = function(r, u) {
        return this.clone().$set(r, u);
      }, o.get = function(r) {
        return this[w.p(r)]();
      }, o.add = function(r, u) {
        var i, f = this;
        r = Number(r);
        var p = w.p(u), $ = function(R) {
          var T = I(f);
          return w.w(T.date(T.date() + Math.round(R * r)), f);
        };
        if (p === v) return this.set(v, this.$M + r);
        if (p === k) return this.set(k, this.$y + r);
        if (p === O) return $(1);
        if (p === D) return $(7);
        var b = (i = {}, i[S] = a, i[M] = d, i[L] = t, i)[p] || 1, A = this.$d.getTime() + r * b;
        return w.w(A, this);
      }, o.subtract = function(r, u) {
        return this.add(-1 * r, u);
      }, o.format = function(r) {
        var u = this, i = this.$locale();
        if (!this.isValid()) return i.invalidDate || te;
        var f = r || "YYYY-MM-DDTHH:mm:ssZ", p = w.z(this), $ = this.$H, b = this.$m, A = this.$M, R = i.weekdays, T = i.months, e = i.meridiem, l = function(m, x, _, q) {
          return m && (m[x] || m(u, f)) || _[x].slice(0, q);
        }, h = function(m) {
          return w.s($ % 12 || 12, m, "0");
        }, E = e || function(m, x, _) {
          var q = m < 12 ? "AM" : "PM";
          return _ ? q.toLowerCase() : q;
        };
        return f.replace(U, function(m, x) {
          return x || function(_) {
            switch (_) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return w.s(u.$y, 4, "0");
              case "M":
                return A + 1;
              case "MM":
                return w.s(A + 1, 2, "0");
              case "MMM":
                return l(i.monthsShort, A, T, 3);
              case "MMMM":
                return l(T, A);
              case "D":
                return u.$D;
              case "DD":
                return w.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return l(i.weekdaysMin, u.$W, R, 2);
              case "ddd":
                return l(i.weekdaysShort, u.$W, R, 3);
              case "dddd":
                return R[u.$W];
              case "H":
                return String($);
              case "HH":
                return w.s($, 2, "0");
              case "h":
                return h(1);
              case "hh":
                return h(2);
              case "a":
                return E($, b, !0);
              case "A":
                return E($, b, !1);
              case "m":
                return String(b);
              case "mm":
                return w.s(b, 2, "0");
              case "s":
                return String(u.$s);
              case "ss":
                return w.s(u.$s, 2, "0");
              case "SSS":
                return w.s(u.$ms, 3, "0");
              case "Z":
                return p;
            }
            return null;
          }(m) || p.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(r, u, i) {
        var f, p = this, $ = w.p(u), b = I(r), A = (b.utcOffset() - this.utcOffset()) * a, R = this - b, T = function() {
          return w.m(p, b);
        };
        switch ($) {
          case k:
            f = T() / 12;
            break;
          case v:
            f = T();
            break;
          case y:
            f = T() / 3;
            break;
          case D:
            f = (R - A) / 6048e5;
            break;
          case O:
            f = (R - A) / 864e5;
            break;
          case M:
            f = R / d;
            break;
          case S:
            f = R / a;
            break;
          case L:
            f = R / t;
            break;
          default:
            f = R;
        }
        return i ? f : w.a(f);
      }, o.daysInMonth = function() {
        return this.endOf(v).$D;
      }, o.$locale = function() {
        return G[this.$L];
      }, o.locale = function(r, u) {
        if (!r) return this.$L;
        var i = this.clone(), f = X(r, u, !0);
        return f && (i.$L = f), i;
      }, o.clone = function() {
        return w.w(this.$d, this);
      }, o.toDate = function() {
        return new Date(this.valueOf());
      }, o.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, o.toISOString = function() {
        return this.$d.toISOString();
      }, o.toString = function() {
        return this.$d.toUTCString();
      }, c;
    }(), ne = K.prototype;
    return I.prototype = ne, [["$ms", g], ["$s", L], ["$m", S], ["$H", M], ["$W", O], ["$M", v], ["$y", k], ["$D", P]].forEach(function(c) {
      ne[c[1]] = function(o) {
        return this.$g(o, c[0], c[1]);
      };
    }), I.extend = function(c, o) {
      return c.$i || (c(o, K, I), c.$i = !0), I;
    }, I.locale = X, I.isDayjs = Z, I.unix = function(c) {
      return I(1e3 * c);
    }, I.en = G[J], I.Ls = G, I.p = {}, I;
  });
})(Ue);
class Ce {
  constructor(n = 1) {
    this.maxRunning = n, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(n) {
    const t = new Promise((a, d) => {
      this.items.push(() => Promise.resolve(n()).then(a));
    });
    return this.run(), t;
  }
  run() {
    this.running || (this.running = !0), this.pop();
  }
  async pop() {
    const n = this.items.shift();
    if (!n)
      return this.running = !1, Promise.resolve();
    if (this.currentRunning >= this.maxRunning)
      return this.items.unshift(n), Promise.resolve();
    this.currentRunning++, this.notice();
    try {
      return await n();
    } catch (t) {
      throw t;
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
  observe(n, t = {}) {
    return this.observers.push({
      handler: n,
      once: t.once || !1
    }), () => {
      this.off(n);
    };
  }
  once(n, t = {}) {
    return t.once = !0, this.observe(n, t);
  }
  onEnd(n, t = {}) {
    return this.observe((a, d, g) => {
      d === 0 && g === 0 && n(a, d, g);
    }, t);
  }
  notice() {
    return this.observers.forEach((n) => {
      n.handler(this, this.length, this.currentRunning);
    }), this.observers = this.observers.filter((n) => !n.once), this;
  }
  off(n) {
    return n == null ? (this.observers = [], this) : (this.observers = this.observers.filter((t) => t.handler !== n), this);
  }
}
function ze(s = 1) {
  return new Ce(s);
}
function Pe() {
  return ze();
}
function Ne(s) {
  return s ? "$el" in s ? s.$el : s : null;
}
function ce(s, n) {
  return s.key ?? (s.key = se()), s.uploadState ?? (s.uploadState = z.PENDING), s.progress ?? (s.progress = 0), n && Object.assign(s, n), s;
}
function Ze(s) {
  return ce(s);
}
function C(s) {
  return typeof s == "function" && (s = de(s())), we(s) ? s : de(s);
}
function Te(s, n, t = {}) {
  const a = C(t.id ?? "vue-multi-uploader-" + se()), d = C(t.accept ?? ""), g = C(t.maxFiles), L = C(t.maxConcurrent ?? 2), S = C(t.maxItemSize), M = C(t.disabled ?? !1), O = C(t.readonly ?? !1), D = C(n), v = B(() => C(t.dropzone).value), y = C(t.onDragClass ?? "h-ondrag"), k = C(t.autoStart ?? !0), P = C(t.inputName ?? "file"), te = C(t.headers ?? {}), oe = C(t.data ?? {});
  let U = C(s);
  U.value = U.value.map(
    (e) => ce(e, { uploadState: z.UPLOADED })
  );
  const ae = Pe(), V = Oe(t);
  ee(L, (e) => {
    ae.maxRunning = e;
  }, { immediate: !0 });
  function N(e, ...l) {
    return V.emit(e, ...l);
  }
  function J(e, l) {
    return V.on(e, l), () => {
      V.off(e, l);
    };
  }
  function G() {
    Le(d, w);
  }
  ee(v, () => {
    const e = Ne(v.value);
    e && e instanceof HTMLElement && ue(e);
  }, { immediate: !0 });
  function ue(e) {
    ke(e, y, w);
  }
  function Z(e) {
    return I(X(e));
  }
  function X(e) {
    const h = ie(ce({
      key: se(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: e,
      uploadState: z.PENDING,
      progress: 0
    }));
    return h.title = h.title || h.file.name, V.emit("create-item", h), h;
  }
  function I(e) {
    const l = ie(ce({
      key: se(),
      uploadState: z.PENDING,
      progress: 0
    }, e));
    if (!e.file)
      return e;
    if (ne(e.file), S.value != null && e.file.size > S.value) {
      const m = new Ae(
        "File size is too large",
        e.file,
        S.value
      );
      throw N("invalid-file", m), m;
    }
    const h = U.value.push(l), E = U.value[h - 1];
    if (f(E)) {
      const m = new FileReader();
      m.onload = (x) => {
        var _;
        E.thumbUrl = String((_ = x.target) == null ? void 0 : _.result);
      }, m.readAsDataURL(e.file);
    }
    return E;
  }
  function w(e) {
    Array.prototype.forEach.call(e, ne), Array.prototype.forEach.call(e, (l) => {
      if (!$.value)
        return;
      const h = Z(l);
      k.value && u(h);
    });
  }
  function K(e) {
    var l;
    if (e instanceof XMLHttpRequest) {
      e.abort();
      return;
    }
    (l = e.xhr) == null || l.abort();
  }
  function ne(e) {
    const l = A.value, h = e.name.split(".").pop();
    if (l.length) {
      let E = !1;
      if (l.forEach((m) => {
        E || (m.indexOf("/") !== -1 ? c(m, e.type) && (E = !0) : m.toLowerCase() === (h == null ? void 0 : h.toLowerCase()) && (E = !0));
      }), !E) {
        const m = new Ie(
          "Invalid file type",
          e,
          l
        );
        throw N("invalid-file", m), m;
      }
    }
  }
  function c(e, l) {
    const h = e.split("/"), E = l.split("/");
    return h[1] === "*" ? h[0] === E[0] : e === l;
  }
  function o(e) {
    N("delete-item", e), U.value = U.value.filter((l) => l.key !== e.key);
  }
  async function r() {
    const e = [];
    return U.value.forEach((l) => {
      l.uploadState === z.PENDING && e.push(u(l));
    }), Promise.allSettled(e);
  }
  async function u(e) {
    return ae.push(() => i(e));
  }
  async function i(e) {
    e.uploadState = z.UPLOADING, e.error = void 0;
    const l = new FormData();
    for (const m in oe.value)
      l.append(m, oe.value[m]);
    l.append(P.value, e.file);
    let h = new XMLHttpRequest();
    h.open("POST", D.value);
    for (const m in te.value)
      h.setRequestHeader(m, te.value[m]);
    return t.prepareXhr && (h = await t.prepareXhr(h) ?? h), new Promise((m, x) => {
      N("item-upload-start", e, h, l), h.upload.onprogress = (_) => {
        _.lengthComputable && (e.progress = _.loaded / _.total, N("item-upload-progress", e, _));
      }, h.onload = () => {
        if (h.status >= 200 && h.status < 300)
          try {
            e.uploadState = z.UPLOADED, N("item-upload-success", e, h), m(e);
          } catch (_) {
            console.error(_), e.uploadState = z.ERROR, e.error = _, x(_);
          }
        else {
          const _ = `Upload failed with status: ${h.status}`, q = new Error(_);
          console.error(q), e.uploadState = z.ERROR, e.error = q, x(q);
        }
      }, h.onerror = () => {
        const _ = "An error occurred during the upload.";
        console.error(_), e.uploadState = z.ERROR, e.error = new Error(_), x(e.error);
      }, h.onloadend = () => {
        N("item-upload-end", e, h);
      }, h.send(l);
    }).catch((m) => (N("item-upload-fail", e, m), Promise.reject(m)));
  }
  function f(e) {
    return p(
      e.file ? e.file.name : e.url
    );
  }
  function p(e) {
    var E;
    const l = ((E = e.split(".").pop()) == null ? void 0 : E.split("?").shift()) || "";
    return [
      "png",
      "jpeg",
      "jpg",
      "gif",
      "bmp",
      "webp"
    ].indexOf(l.toLowerCase()) !== -1;
  }
  const $ = B(() => (g.value == null || U.value.length < Number(g.value)) && !R.value), b = B(() => U.value.filter((l) => l.uploadState === z.UPLOADING).length > 0), A = B(() => (Array.isArray(d.value) ? d.value : d.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), R = B(() => M.value || O.value);
  ee(U, (e) => {
    e.map((l) => {
      l.key = l.key || se();
    }), N("change", U);
  }, { deep: !0 }), ee(b, (e) => {
    N(e ? "uploading" : "uploaded");
  });
  const T = B(() => U.value.reduce((e, l) => (l.file && (e += l.file.size), e), 0));
  return {
    id: a,
    accept: d,
    maxFiles: g,
    maxConcurrent: L,
    maxItemSize: S,
    disabled: M,
    readonly: O,
    uploadUrl: D,
    items: U,
    eventBus: V,
    canUpload: $,
    isUploading: b,
    acceptedTypes: A,
    isReadonly: R,
    totalSize: T,
    emits: N,
    on: J,
    openFileSelector: G,
    addFile: Z,
    addItem: I,
    createItem: X,
    deleteItem: o,
    uploadStart: r,
    stopItemUpload: K,
    isImageItem: f,
    isImage: p
  };
}
const xe = { class: "vue-drag-uploader__wrapper vue-drag-uploader__items" }, Ke = /* @__PURE__ */ he({
  __name: "MultiUploader",
  props: /* @__PURE__ */ me({
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
  emits: /* @__PURE__ */ me(["update:modelValue", "change", "delete-item", "uploading", "uploaded", "create-item", "item-upload-start", "item-upload-success", "item-upload-fail", "item-upload-end", "item-upload-progress", "invalid-file-type"], ["update:modelValue"]),
  setup(s, { expose: n, emit: t }) {
    const a = s, d = t, g = $e(s, "modelValue"), L = de(g.value);
    ee(g, () => {
      L.value = g.value;
    }, { deep: !0 });
    const S = Me("uploader");
    a.options.dropzone = a.options.dropzone ?? S;
    const M = a.instance ?? Te(L, a.uploadUrl ?? "", a.options), {
      isReadonly: O,
      items: D
    } = M;
    ee(D, () => {
      g.value = D.value;
    }, { deep: !0 });
    const v = [];
    for (const y in pe) {
      const k = M.on(y, (...P) => {
        d(y, ...P);
      });
      v.push(k);
    }
    return be(() => {
      v.forEach((y) => y());
    }), n({
      instance: M
    }), (y, k) => (H(), j("div", {
      ref: "uploader",
      class: Se(["vue-drag-uploader", { "vue-drag-uploader--readonly": Y(O) }])
    }, [
      W(y.$slots, "start", {
        items: Y(D),
        options: y.options,
        instance: ie(Y(M))
      }),
      F("div", xe, [
        W(y.$slots, "items", {
          items: Y(D),
          options: y.options,
          instance: ie(Y(M))
        })
      ]),
      W(y.$slots, "end", {
        items: Y(D),
        options: y.options,
        instance: ie(Y(M))
      })
    ], 2));
  }
}), Fe = {
  key: 1,
  class: "preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"
}, je = {
  style: { width: "calc(var(--vmu-img-size) / 3)", height: "calc(var(--vmu-img-size) / 3)" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 384 512"
}, He = { style: { "word-break": "break-word" } }, Ye = { class: "preview-img__overlay" }, Be = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, Ve = {
  key: 2,
  class: "preview-img__progress"
}, Ge = { class: "error-message__message" }, et = /* @__PURE__ */ he({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(s, { emit: n }) {
    const t = s, a = n, d = B(() => t.item.uploadState), g = B(() => t.item.progress);
    function L() {
      t.isReadonly || a("delete", t.item);
    }
    const S = B(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), M = B(() => O(
      t.item.file ? t.item.file.name : t.item.url
    ));
    function O(v) {
      var P;
      const y = ((P = v.split(".").pop()) == null ? void 0 : P.split("?").shift()) || "";
      return [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "bmp",
        "webp"
      ].indexOf(y.toLowerCase()) !== -1;
    }
    function D(v) {
      a("item-click", t.item, t.i, v);
    }
    return (v, y) => (H(), j("div", {
      class: "vue-drag-uploader-item preview-img",
      style: le({ "--vmu-img-size": v.size }),
      onClick: D
    }, [
      W(v.$slots, "it", { item: v.item }, () => {
        var k;
        return [
          M.value ? (H(), j("div", {
            key: 0,
            class: "preview-img__body",
            style: le({ "background-image": "url(" + (v.item.thumbUrl || v.item.url) + ")", opacity: d.value === Y(z).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : re("", !0),
          M.value ? re("", !0) : (H(), j("div", Fe, [
            F("div", null, [
              W(v.$slots, "icon", { item: v.item }, () => [
                (H(), j("svg", je, y[2] || (y[2] = [
                  F("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])))
              ])
            ]),
            F("div", He, fe(S.value), 1)
          ])),
          F("div", Ye, [
            v.isReadonly ? re("", !0) : (H(), j("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: y[0] || (y[0] = ve((P) => L(), ["prevent", "stop"]))
            }, [
              W(v.$slots, "remove-icon", {}, () => [
                (H(), j("svg", Be, y[3] || (y[3] = [
                  F("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])))
              ])
            ])),
            W(v.$slots, "extra", { item: v.item })
          ]),
          d.value === Y(z).UPLOADING ? (H(), j("div", Ve, [
            F("div", {
              class: "preview-img__progress-bar",
              style: le({ width: g.value * 100 + "%" })
            }, null, 4)
          ])) : re("", !0),
          d.value === Y(z).ERROR ? (H(), j("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: y[1] || (y[1] = ve(() => {
            }, ["stop", "prevent"]))
          }, [
            y[4] || (y[4] = F("span", { class: "error-message__notice" }, "Upload fail", -1)),
            F("span", Ge, fe((k = v.item.error) == null ? void 0 : k.message), 1)
          ])) : re("", !0)
        ];
      })
    ], 4));
  }
}), Qe = { class: "add-button__body" }, We = { class: "add-button__icon" }, qe = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Je = { class: "add-button__text" }, tt = /* @__PURE__ */ he({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(s) {
    return (n, t) => (H(), j("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: le({ "--vmu-img-size": n.size })
    }, [
      F("div", Qe, [
        W(n.$slots, "default", {}, () => [
          F("div", We, [
            W(n.$slots, "icon", De(Ee({ size: n.size })), () => [
              (H(), j("svg", qe, t[0] || (t[0] = [
                F("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])))
            ])
          ]),
          F("div", Je, fe(n.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  et as ItemCard,
  tt as ItemCardPlaceholder,
  Ke as MultiUploader,
  z as UploadState,
  Ze as createItem,
  Oe as handleEvents,
  pe as uploaderEvents,
  Te as useMultiUploader
};
