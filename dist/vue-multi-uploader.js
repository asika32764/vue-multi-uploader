import { ref as ce, isRef as we, computed as F, watch as J, reactive as de, defineComponent as he, mergeModels as me, useModel as $e, useTemplateRef as Me, onUnmounted as be, openBlock as x, createElementBlock as T, normalizeClass as Se, unref as Z, createElementVNode as z, renderSlot as G, normalizeStyle as oe, createCommentVNode as te, toDisplayString as fe, withModifiers as ve, normalizeProps as De, guardReactiveProps as Ee } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function _e() {
  var i = /* @__PURE__ */ Object.create(null), n = {
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
    _allEvents: i,
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
      var v = a(n, d);
      return v || n;
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
    on: function(a, d, v) {
      var k = n._allEvents[a] || (n._allEvents[a] = []);
      function b() {
        n.off(a, b), d.apply(d, arguments);
      }
      b.fn = d;
      var E = v ? b : d;
      return k.push(E), n;
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
        function(v) {
          return v !== d && v !== d.fn;
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
        (n._allEvents[a] || []).map(function(v) {
          v.apply(v, d.slice(1));
        }), (n._allEvents["*"] || []).map(function(v) {
          v.apply(v, d);
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
function Oe(i) {
  const n = _e();
  for (const t in pe) {
    const a = pe[t];
    a && i[a] && n.on(t, i[a]);
  }
  return n;
}
var R = /* @__PURE__ */ ((i) => (i.PENDING = "pending", i.UPLOADING = "uploading", i.UPLOADED = "uploaded", i.ERROR = "error", i))(R || {});
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
function Le(i, n) {
  const t = document.createElement("input");
  t.id = "multi-uploader-selector", t.type = "file", t.accept = i.value, t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
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
function ke(i, n, t) {
  i.__dragging_events || (i.addEventListener("dragover", (a) => {
    a.stopPropagation(), a.preventDefault(), i.classList.add(n.value);
  }), i.addEventListener("dragleave", (a) => {
    a.stopPropagation(), a.preventDefault(), i.classList.remove(n.value);
  }), i.addEventListener("drop", async (a) => {
    var E;
    a.stopPropagation(), a.preventDefault(), i.classList.remove(n.value);
    const d = (E = a.dataTransfer) == null ? void 0 : E.items, v = [], k = async (O) => {
      const L = [];
      O.isDirectory ? O.createReader().readEntries((y) => {
        y.forEach((I) => {
          L.push(k(I));
        });
      }) : L.push(new Promise((h) => {
        O.file((y) => {
          v.push(y), h();
        });
      })), await Promise.all(L);
    }, b = [];
    Array.prototype.forEach.call(d ?? [], (O) => {
      const L = O.webkitGetAsEntry();
      L && b.push(k(L));
    }), b.length && Promise.all(b).then(() => {
      t(v);
    });
  }), i.__dragging_events = !0);
}
const j = class j {
};
j.alert = async (n) => window.alert(n), j.confirm = async (n) => new Promise((t) => {
  const a = confirm(n);
  t(a);
}), j.deleteConfirm = async (n) => j.confirm(n), j.confirmText = () => "確認", j.cancelText = () => "取消", j.deleteText = () => "刪除";
let ge = j;
function ne(i = "", n = !1) {
  if (n) {
    const a = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return i + a.toString(12) + ye(4);
  }
  return i + ye(12);
}
function ye(i = 12) {
  const t = window.crypto;
  if (!t)
    return String(Math.floor(Math.random() * i ** 10));
  const a = new Uint8Array(i);
  for (let d = 0; d < i; d += 65536)
    t.getRandomValues(a.subarray(d, d + Math.min(i - d, 65536)));
  return Array.from(a).map((d) => d.toString(16).padStart(2, "0")).join("");
}
var Re = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ue = { exports: {} };
(function(i, n) {
  (function(t, a) {
    i.exports = a();
  })(Re, function() {
    var t = 1e3, a = 6e4, d = 36e5, v = "millisecond", k = "second", b = "minute", E = "hour", O = "day", L = "week", h = "month", y = "quarter", I = "year", M = "date", re = "Invalid Date", B = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ae = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var o = ["th", "st", "nd", "rd"], r = c % 100;
      return "[" + c + (o[(r - 20) % 10] || o[r] || o[0]) + "]";
    } }, K = function(c, o, r) {
      var u = String(c);
      return !u || u.length >= o ? c : "" + Array(o + 1 - u.length).join(r) + c;
    }, ue = { s: K, z: function(c) {
      var o = -c.utcOffset(), r = Math.abs(o), u = Math.floor(r / 60), s = r % 60;
      return (o <= 0 ? "+" : "-") + K(u, 2, "0") + ":" + K(s, 2, "0");
    }, m: function c(o, r) {
      if (o.date() < r.date()) return -c(r, o);
      var u = 12 * (r.year() - o.year()) + (r.month() - o.month()), s = o.clone().add(u, h), f = r - s < 0, p = o.clone().add(u + (f ? -1 : 1), h);
      return +(-(u + (r - s) / (f ? s - p : p - s)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: h, y: I, w: L, d: O, D: M, h: E, m: b, s: k, ms: v, Q: y }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, H = "en", N = {};
    N[H] = ae;
    var X = "$isDayjsObject", Q = function(c) {
      return c instanceof q || !(!c || !c[X]);
    }, W = function c(o, r, u) {
      var s;
      if (!o) return H;
      if (typeof o == "string") {
        var f = o.toLowerCase();
        N[f] && (s = f), r && (N[f] = r, s = f);
        var p = o.split("-");
        if (!s && p.length > 1) return c(p[0]);
      } else {
        var $ = o.name;
        N[$] = o, s = $;
      }
      return !u && s && (H = s), s || !u && H;
    }, A = function(c, o) {
      if (Q(c)) return c.clone();
      var r = typeof o == "object" ? o : {};
      return r.date = c, r.args = arguments, new q(r);
    }, w = ue;
    w.l = W, w.i = Q, w.w = function(c, o) {
      return A(c, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var q = function() {
      function c(r) {
        this.$L = W(r.locale, null, !0), this.parse(r), this.$x = this.$x || r.x || {}, this[X] = !0;
      }
      var o = c.prototype;
      return o.parse = function(r) {
        this.$d = function(u) {
          var s = u.date, f = u.utc;
          if (s === null) return /* @__PURE__ */ new Date(NaN);
          if (w.u(s)) return /* @__PURE__ */ new Date();
          if (s instanceof Date) return new Date(s);
          if (typeof s == "string" && !/Z$/i.test(s)) {
            var p = s.match(B);
            if (p) {
              var $ = p[2] - 1 || 0, e = (p[7] || "0").substring(0, 3);
              return f ? new Date(Date.UTC(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, e)) : new Date(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, e);
            }
          }
          return new Date(s);
        }(r), this.init();
      }, o.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, o.$utils = function() {
        return w;
      }, o.isValid = function() {
        return this.$d.toString() !== re;
      }, o.isSame = function(r, u) {
        var s = A(r);
        return this.startOf(u) <= s && s <= this.endOf(u);
      }, o.isAfter = function(r, u) {
        return A(r) < this.startOf(u);
      }, o.isBefore = function(r, u) {
        return this.endOf(u) < A(r);
      }, o.$g = function(r, u, s) {
        return w.u(r) ? this[u] : this.set(s, r);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(r, u) {
        var s = this, f = !!w.u(u) || u, p = w.p(r), $ = function(V, C) {
          var Y = w.w(s.$u ? Date.UTC(s.$y, C, V) : new Date(s.$y, C, V), s);
          return f ? Y : Y.endOf(O);
        }, e = function(V, C) {
          return w.w(s.toDate()[V].apply(s.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), s);
        }, l = this.$W, m = this.$M, g = this.$D, D = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case I:
            return f ? $(1, 0) : $(31, 11);
          case h:
            return f ? $(1, m) : $(0, m + 1);
          case L:
            var _ = this.$locale().weekStart || 0, S = (l < _ ? l + 7 : l) - _;
            return $(f ? g - S : g + (6 - S), m);
          case O:
          case M:
            return e(D + "Hours", 0);
          case E:
            return e(D + "Minutes", 1);
          case b:
            return e(D + "Seconds", 2);
          case k:
            return e(D + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(r) {
        return this.startOf(r, !1);
      }, o.$set = function(r, u) {
        var s, f = w.p(r), p = "set" + (this.$u ? "UTC" : ""), $ = (s = {}, s[O] = p + "Date", s[M] = p + "Date", s[h] = p + "Month", s[I] = p + "FullYear", s[E] = p + "Hours", s[b] = p + "Minutes", s[k] = p + "Seconds", s[v] = p + "Milliseconds", s)[f], e = f === O ? this.$D + (u - this.$W) : u;
        if (f === h || f === I) {
          var l = this.clone().set(M, 1);
          l.$d[$](e), l.init(), this.$d = l.set(M, Math.min(this.$D, l.daysInMonth())).$d;
        } else $ && this.$d[$](e);
        return this.init(), this;
      }, o.set = function(r, u) {
        return this.clone().$set(r, u);
      }, o.get = function(r) {
        return this[w.p(r)]();
      }, o.add = function(r, u) {
        var s, f = this;
        r = Number(r);
        var p = w.p(u), $ = function(m) {
          var g = A(f);
          return w.w(g.date(g.date() + Math.round(m * r)), f);
        };
        if (p === h) return this.set(h, this.$M + r);
        if (p === I) return this.set(I, this.$y + r);
        if (p === O) return $(1);
        if (p === L) return $(7);
        var e = (s = {}, s[b] = a, s[E] = d, s[k] = t, s)[p] || 1, l = this.$d.getTime() + r * e;
        return w.w(l, this);
      }, o.subtract = function(r, u) {
        return this.add(-1 * r, u);
      }, o.format = function(r) {
        var u = this, s = this.$locale();
        if (!this.isValid()) return s.invalidDate || re;
        var f = r || "YYYY-MM-DDTHH:mm:ssZ", p = w.z(this), $ = this.$H, e = this.$m, l = this.$M, m = s.weekdays, g = s.months, D = s.meridiem, _ = function(C, Y, ee, ie) {
          return C && (C[Y] || C(u, f)) || ee[Y].slice(0, ie);
        }, S = function(C) {
          return w.s($ % 12 || 12, C, "0");
        }, V = D || function(C, Y, ee) {
          var ie = C < 12 ? "AM" : "PM";
          return ee ? ie.toLowerCase() : ie;
        };
        return f.replace(U, function(C, Y) {
          return Y || function(ee) {
            switch (ee) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return w.s(u.$y, 4, "0");
              case "M":
                return l + 1;
              case "MM":
                return w.s(l + 1, 2, "0");
              case "MMM":
                return _(s.monthsShort, l, g, 3);
              case "MMMM":
                return _(g, l);
              case "D":
                return u.$D;
              case "DD":
                return w.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return _(s.weekdaysMin, u.$W, m, 2);
              case "ddd":
                return _(s.weekdaysShort, u.$W, m, 3);
              case "dddd":
                return m[u.$W];
              case "H":
                return String($);
              case "HH":
                return w.s($, 2, "0");
              case "h":
                return S(1);
              case "hh":
                return S(2);
              case "a":
                return V($, e, !0);
              case "A":
                return V($, e, !1);
              case "m":
                return String(e);
              case "mm":
                return w.s(e, 2, "0");
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
          }(C) || p.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(r, u, s) {
        var f, p = this, $ = w.p(u), e = A(r), l = (e.utcOffset() - this.utcOffset()) * a, m = this - e, g = function() {
          return w.m(p, e);
        };
        switch ($) {
          case I:
            f = g() / 12;
            break;
          case h:
            f = g();
            break;
          case y:
            f = g() / 3;
            break;
          case L:
            f = (m - l) / 6048e5;
            break;
          case O:
            f = (m - l) / 864e5;
            break;
          case E:
            f = m / d;
            break;
          case b:
            f = m / a;
            break;
          case k:
            f = m / t;
            break;
          default:
            f = m;
        }
        return s ? f : w.a(f);
      }, o.daysInMonth = function() {
        return this.endOf(h).$D;
      }, o.$locale = function() {
        return N[this.$L];
      }, o.locale = function(r, u) {
        if (!r) return this.$L;
        var s = this.clone(), f = W(r, u, !0);
        return f && (s.$L = f), s;
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
    }(), se = q.prototype;
    return A.prototype = se, [["$ms", v], ["$s", k], ["$m", b], ["$H", E], ["$W", O], ["$M", h], ["$y", I], ["$D", M]].forEach(function(c) {
      se[c[1]] = function(o) {
        return this.$g(o, c[0], c[1]);
      };
    }), A.extend = function(c, o) {
      return c.$i || (c(o, q, A), c.$i = !0), A;
    }, A.locale = W, A.isDayjs = Q, A.unix = function(c) {
      return A(1e3 * c);
    }, A.en = N[H], A.Ls = N, A.p = {}, A;
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
    return this.observe((a, d, v) => {
      d === 0 && v === 0 && n(a, d, v);
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
function ze(i = 1) {
  return new Ce(i);
}
function Pe() {
  return ze();
}
function xe(i) {
  return i ? "$el" in i ? i.$el : i : null;
}
function le(i, n) {
  return i.key ?? (i.key = ne()), i.uploadState ?? (i.uploadState = R.PENDING), i.progress ?? (i.progress = 0), n && Object.assign(i, n), i;
}
function P(i) {
  return typeof i == "function" && (i = ce(i())), we(i) ? i : ce(i);
}
function Te(i, n, t = {}) {
  const a = P(t.id ?? "vue-multi-uploader-" + ne()), d = P(t.accept ?? ""), v = P(t.maxFiles), k = P(t.maxConcurrent ?? 2), b = P(t.maxItemSize), E = P(t.disabled ?? !1), O = P(t.readonly ?? !1), L = P(n), h = F(() => P(t.dropzone).value), y = P(t.onDragClass ?? "h-ondrag"), I = P(t.autoStart ?? !0);
  let M = P(i);
  M.value = M.value.map(
    (e) => le(e, { uploadState: R.UPLOADED })
  );
  const re = Pe(), B = Oe(t);
  J(k, (e) => {
    re.maxRunning = e;
  }, { immediate: !0 });
  function U(e, ...l) {
    return B.emit(e, ...l);
  }
  function ae(e, l) {
    return B.on(e, l), () => {
      B.off(e, l);
    };
  }
  function K() {
    Le(d, Q);
  }
  J(h, () => {
    const e = xe(h.value);
    e && e instanceof HTMLElement && ue(e);
  }, { immediate: !0 });
  function ue(e) {
    ke(e, y, Q);
  }
  function H(e) {
    return X(N(e));
  }
  function N(e) {
    const m = de(le({
      key: ne(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: e,
      uploadState: R.PENDING,
      progress: 0
    }));
    return m.title = m.title || m.file.name, B.emit("create-item", m), m;
  }
  function X(e) {
    const l = de(le({
      key: ne(),
      uploadState: R.PENDING,
      progress: 0
    }, e));
    if (!e.file)
      return e;
    if (A(e.file), b.value != null && e.file.size > b.value) {
      const D = new Ae(
        "File size is too large",
        e.file,
        b.value
      );
      throw U("invalid-file", D), D;
    }
    const m = M.value.push(l), g = M.value[m - 1];
    if (o(g)) {
      const D = new FileReader();
      D.onload = (_) => {
        var S;
        g.thumbUrl = String((S = _.target) == null ? void 0 : S.result);
      }, D.readAsDataURL(e.file);
    }
    return g;
  }
  function Q(e) {
    Array.prototype.forEach.call(e, A), Array.prototype.forEach.call(e, (l) => {
      if (!u.value)
        return;
      const m = H(l);
      I.value && c(m);
    });
  }
  function W(e) {
    var l;
    if (e instanceof XMLHttpRequest) {
      e.abort();
      return;
    }
    (l = e.xhr) == null || l.abort();
  }
  function A(e) {
    const l = f.value, m = e.name.split(".").pop();
    if (l.length) {
      let g = !1;
      if (l.forEach((D) => {
        g || (D.indexOf("/") !== -1 ? w(D, e.type) && (g = !0) : D.toLowerCase() === (m == null ? void 0 : m.toLowerCase()) && (g = !0));
      }), !g) {
        const D = new Ie(
          "Invalid file type",
          e,
          l
        );
        throw U("invalid-file", D), D;
      }
    }
  }
  function w(e, l) {
    const m = e.split("/"), g = l.split("/");
    return m[1] === "*" ? m[0] === g[0] : e === l;
  }
  function q(e) {
    U("delete-item", e), M.value = M.value.filter((l) => l.key !== e.key);
  }
  async function se() {
    const e = [];
    return M.value.forEach((l) => {
      l.uploadState === R.PENDING && e.push(c(l));
    }), Promise.allSettled(e);
  }
  async function c(e) {
    e.uploadState = R.UPLOADING, e.error = void 0;
    const l = new FormData();
    return l.append("file", e.file), new Promise((g, D) => {
      const _ = new XMLHttpRequest();
      U("item-upload-start", e, _), _.open("POST", L.value), _.upload.onprogress = (S) => {
        S.lengthComputable && (e.progress = S.loaded / S.total, U("item-upload-progress", e, S));
      }, _.onload = () => {
        if (_.status >= 200 && _.status < 300)
          try {
            e.uploadState = R.UPLOADED, U("item-upload-success", e, _), g(e);
          } catch (S) {
            console.error(S), e.uploadState = R.ERROR, e.error = S, D(S);
          }
        else {
          const S = `Upload failed with status: ${_.status}`;
          console.error(S), e.uploadState = R.ERROR, e.message = S, e.messageType = "error", D(new Error(S));
        }
      }, _.onerror = () => {
        const S = "An error occurred during the upload.";
        console.error(S), e.uploadState = R.ERROR, e.error = new Error(S), D(e.error);
      }, _.onloadend = () => {
        U("item-upload-end", e, _);
      }, _.send(l);
    }).catch((g) => (U("item-upload-fail", e, g), Promise.reject(g)));
  }
  function o(e) {
    return r(
      e.file ? e.file.name : e.url
    );
  }
  function r(e) {
    var g;
    const l = ((g = e.split(".").pop()) == null ? void 0 : g.split("?").shift()) || "";
    return [
      "png",
      "jpeg",
      "jpg",
      "gif",
      "bmp",
      "webp"
    ].indexOf(l.toLowerCase()) !== -1;
  }
  const u = F(() => (v.value == null || M.value.length < Number(v.value)) && !p.value), s = F(() => M.value.filter((l) => l.uploadState === R.UPLOADING).length > 0), f = F(() => (Array.isArray(d.value) ? d.value : d.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), p = F(() => E.value || O.value);
  J(M, (e) => {
    e.map((l) => {
      l.key = l.key || ne();
    }), U("change", M);
  }, { deep: !0 }), J(s, (e) => {
    U(e ? "uploading" : "uploaded");
  });
  const $ = F(() => M.value.reduce((e, l) => (l.file && (e += l.file.size), e), 0));
  return {
    id: a,
    accept: d,
    maxFiles: v,
    maxConcurrent: k,
    maxItemSize: b,
    disabled: E,
    readonly: O,
    uploadUrl: L,
    items: M,
    eventBus: B,
    canUpload: u,
    isUploading: s,
    acceptedTypes: f,
    isReadonly: p,
    totalSize: $,
    emits: U,
    on: ae,
    openFileSelector: K,
    addFile: H,
    addItem: X,
    createItem: N,
    deleteItem: q,
    uploadStart: se,
    stopItemUpload: W,
    isImageItem: o,
    isImage: r
  };
}
const Ne = { class: "vue-drag-uploader__wrapper" }, Ke = /* @__PURE__ */ he({
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
  setup(i, { expose: n, emit: t }) {
    const a = i, d = t, v = $e(i, "modelValue"), k = ce(v.value);
    J(v, () => {
      k.value = v.value;
    }, { deep: !0 });
    const b = Me("el");
    a.options.dropzone = a.options.dropzone ?? b;
    const E = a.instance ?? Te(k, a.uploadUrl ?? "", a.options), {
      isReadonly: O,
      items: L
    } = E;
    J(L, () => {
      v.value = L.value;
    }, { deep: !0 });
    const h = [];
    for (const y in pe) {
      const I = E.on(y, (...M) => {
        d(y, ...M);
      });
      h.push(I);
    }
    return be(() => {
      h.forEach((y) => y());
    }), n({
      instance: E
    }), (y, I) => (x(), T("div", {
      ref_key: "el",
      ref: b,
      class: Se(["vue-drag-uploader", { "vue-drag-uploader--readonly": Z(O) }])
    }, [
      z("div", Ne, [
        G(y.$slots, "items", {
          items: Z(L),
          options: y.options,
          instance: de(Z(E)),
          onDelete: I[0] || (I[0] = () => console.log(y.$event))
        })
      ])
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
}, Ge = { class: "error-message__message" }, Xe = /* @__PURE__ */ he({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(i, { emit: n }) {
    const t = i, a = n, d = F(() => t.item.uploadState), v = F(() => t.item.progress);
    function k() {
      t.isReadonly || a("delete", t.item);
    }
    const b = F(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), E = F(() => O(
      t.item.file ? t.item.file.name : t.item.url
    ));
    function O(h) {
      var M;
      const y = ((M = h.split(".").pop()) == null ? void 0 : M.split("?").shift()) || "";
      return [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "bmp",
        "webp"
      ].indexOf(y.toLowerCase()) !== -1;
    }
    function L(h) {
      a("item-click", t.item, t.i, h);
    }
    return (h, y) => (x(), T("div", {
      class: "vue-drag-uploader-item preview-img",
      style: oe({ "--vmu-img-size": h.size }),
      onClick: L
    }, [
      G(h.$slots, "it", { item: h.item }, () => {
        var I;
        return [
          E.value ? (x(), T("div", {
            key: 0,
            class: "preview-img__body",
            style: oe({ "background-image": "url(" + (h.item.thumbUrl || h.item.url) + ")", opacity: d.value === Z(R).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : te("", !0),
          E.value ? te("", !0) : (x(), T("div", Fe, [
            z("div", null, [
              G(h.$slots, "icon", { item: h.item }, () => [
                (x(), T("svg", je, y[2] || (y[2] = [
                  z("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])))
              ])
            ]),
            z("div", He, fe(b.value), 1)
          ])),
          z("div", Ye, [
            h.isReadonly ? te("", !0) : (x(), T("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: y[0] || (y[0] = ve((M) => k(), ["prevent"]))
            }, [
              G(h.$slots, "remove-icon", {}, () => [
                (x(), T("svg", Be, y[3] || (y[3] = [
                  z("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])))
              ])
            ])),
            G(h.$slots, "extra", { item: h.item })
          ]),
          d.value === Z(R).UPLOADING ? (x(), T("div", Ve, [
            z("div", {
              class: "preview-img__progress-bar",
              style: oe({ width: v.value * 100 + "%" })
            }, null, 4)
          ])) : te("", !0),
          d.value === Z(R).ERROR ? (x(), T("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: y[1] || (y[1] = ve(() => {
            }, ["stop", "prevent"]))
          }, [
            y[4] || (y[4] = z("span", { class: "error-message__notice" }, "Upload fail", -1)),
            z("span", Ge, fe((I = h.item.error) == null ? void 0 : I.message), 1)
          ])) : te("", !0)
        ];
      })
    ], 4));
  }
}), Qe = { class: "add-button__body" }, We = { class: "add-button__icon" }, qe = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Je = { class: "add-button__text" }, et = /* @__PURE__ */ he({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(i) {
    return (n, t) => (x(), T("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: oe({ "--vmu-img-size": n.size })
    }, [
      z("div", Qe, [
        G(n.$slots, "default", {}, () => [
          z("div", We, [
            G(n.$slots, "icon", De(Ee({ size: n.size })), () => [
              (x(), T("svg", qe, t[0] || (t[0] = [
                z("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])))
            ])
          ]),
          z("div", Je, fe(n.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  Xe as ItemCard,
  et as ItemCardPlaceholder,
  Ke as MultiUploader,
  R as UploadState,
  Te as useMultiUploader
};
