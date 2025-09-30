import { ref as de, isRef as Se, computed as j, watch as K, reactive as se, defineComponent as ve, mergeModels as ge, useModel as be, useTemplateRef as De, onUnmounted as Ee, createElementBlock as F, openBlock as H, normalizeClass as _e, unref as Y, renderSlot as W, createElementVNode as N, normalizeStyle as le, createCommentVNode as ne, toDisplayString as fe, withModifiers as ye, normalizeProps as Oe, guardReactiveProps as Ie } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function Ae() {
  var n = /* @__PURE__ */ Object.create(null), r = {
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
    _allEvents: n,
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
    use: function(a, u) {
      var g = a(r, u);
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
    on: function(a, u, g) {
      var I = r._allEvents[a] || (r._allEvents[a] = []);
      function D() {
        r.off(a, D), u.apply(u, arguments);
      }
      D.fn = u;
      var S = g ? D : u;
      return I.push(S), r;
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
    once: function(a, u) {
      return r.on(a, u, !0), r;
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
    off: function(a, u) {
      return u && r._allEvents[a] ? r._allEvents[a] = r._allEvents[a].filter(
        function(g) {
          return g !== u && g !== u.fn;
        }
      ) : a ? r._allEvents[a] = [] : r._allEvents = /* @__PURE__ */ Object.create(null), r;
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
        var u = [].slice.call(arguments);
        (r._allEvents[a] || []).map(function(g) {
          g.apply(g, u.slice(1));
        }), (r._allEvents["*"] || []).map(function(g) {
          g.apply(g, u);
        });
      }
      return r;
    }
  };
  return r;
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
function Le(n) {
  const r = Ae();
  for (const t in pe) {
    const a = pe[t];
    a && n[a] && r.on(t, n[a]);
  }
  return r;
}
var R = /* @__PURE__ */ ((n) => (n.PENDING = "pending", n.UPLOADING = "uploading", n.UPLOADED = "uploaded", n.ERROR = "error", n))(R || {});
class ke extends Error {
  constructor(r, t, a) {
    super(r), this.file = t, this.accepted = a, this.name = "InvalidFileTypeError";
  }
}
class Re extends Error {
  constructor(r, t, a) {
    super(r), this.file = t, this.maxSize = a, this.name = "InvalidFileSizeError";
  }
}
function Ue(n, r) {
  const t = document.createElement("input");
  t.id = "multi-uploader-selector", t.type = "file", t.accept = n.value, t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
    const a = t.files;
    r(a), t.remove();
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
function ze(n, r, t) {
  if (n.__dragging_events)
    return;
  let a = 0;
  n.addEventListener("dragover", (u) => {
    u.preventDefault();
  }), n.addEventListener("dragenter", (u) => {
    u.stopPropagation(), u.preventDefault(), a++, n.classList.add(r.value);
  }), n.addEventListener("dragleave", (u) => {
    u.stopPropagation(), u.preventDefault(), a--, a === 0 && n.classList.remove(r.value);
  }), n.addEventListener("drop", async (u) => {
    var L;
    u.stopPropagation(), u.preventDefault(), n.classList.remove(r.value);
    const g = (L = u.dataTransfer) == null ? void 0 : L.items, I = [], D = async (v) => {
      const m = [];
      v.isDirectory ? v.createReader().readEntries((k) => {
        k.forEach((T) => {
          m.push(D(T));
        });
      }) : m.push(new Promise((E) => {
        v.file((k) => {
          I.push(k), E();
        });
      })), await Promise.all(m);
    }, S = [];
    Array.prototype.forEach.call(g ?? [], (v) => {
      const m = v.webkitGetAsEntry();
      m && S.push(D(m));
    }), S.length && Promise.all(S).then(() => {
      t(I);
    });
  }), n.__dragging_events = !0;
}
function he(n) {
  var r;
  return n.uploadState === R.UPLOADED ? n.mime ? $e(n.mime) : me(n.url) : n.mime ? $e(n.mime) : me(
    ((r = n.file) == null ? void 0 : r.name) || n.url
  );
}
function me(n) {
  var u;
  const r = n.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,/);
  let t;
  return r ? t = r[1] : t = ((u = n.split(".").pop()) == null ? void 0 : u.split("?").shift()) || "", [
    "png",
    "apng",
    "jpeg",
    "jpg",
    "gif",
    "bmp",
    "webp",
    "avif",
    "heic",
    "heif"
  ].indexOf(t.toLowerCase()) !== -1;
}
function $e(n) {
  return n.startsWith("image/");
}
const G = class G {
};
G.alert = async (r) => window.alert(r), G.confirm = async (r) => new Promise((t) => {
  const a = confirm(r);
  t(a);
}), G.deleteConfirm = async (r) => G.confirm(r), G.confirmText = () => "確認", G.cancelText = () => "取消", G.deleteText = () => "刪除";
let we = G;
function re(n = "", r = !1) {
  if (r) {
    const a = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return n + a.toString(12) + Me(4);
  }
  return n + Me(12);
}
function Me(n = 12) {
  const t = window.crypto;
  if (!t)
    return String(Math.floor(Math.random() * n ** 10));
  const a = new Uint8Array(n);
  for (let u = 0; u < n; u += 65536)
    t.getRandomValues(a.subarray(u, u + Math.min(n - u, 65536)));
  return Array.from(a).map((u) => u.toString(16).padStart(2, "0")).join("");
}
var Ce = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Pe = { exports: {} };
(function(n, r) {
  (function(t, a) {
    n.exports = a();
  })(Ce, function() {
    var t = 1e3, a = 6e4, u = 36e5, g = "millisecond", I = "second", D = "minute", S = "hour", L = "day", v = "week", m = "month", E = "quarter", k = "year", T = "date", ee = "Invalid Date", ie = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, oe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(d) {
      var o = ["th", "st", "nd", "rd"], s = d % 100;
      return "[" + d + (o[(s - 20) % 10] || o[s] || o[0]) + "]";
    } }, B = function(d, o, s) {
      var l = String(d);
      return !l || l.length >= o ? d : "" + Array(o + 1 - l.length).join(s) + d;
    }, C = { s: B, z: function(d) {
      var o = -d.utcOffset(), s = Math.abs(o), l = Math.floor(s / 60), i = s % 60;
      return (o <= 0 ? "+" : "-") + B(l, 2, "0") + ":" + B(i, 2, "0");
    }, m: function d(o, s) {
      if (o.date() < s.date()) return -d(s, o);
      var l = 12 * (s.year() - o.year()) + (s.month() - o.month()), i = o.clone().add(l, m), f = s - i < 0, p = o.clone().add(l + (f ? -1 : 1), m);
      return +(-(l + (s - i) / (f ? i - p : p - i)) || 0);
    }, a: function(d) {
      return d < 0 ? Math.ceil(d) || 0 : Math.floor(d);
    }, p: function(d) {
      return { M: m, y: k, w: v, d: L, D: T, h: S, m: D, s: I, ms: g, Q: E }[d] || String(d || "").toLowerCase().replace(/s$/, "");
    }, u: function(d) {
      return d === void 0;
    } }, Q = "en", V = {};
    V[Q] = oe;
    var ae = "$isDayjsObject", Z = function(d) {
      return d instanceof J || !(!d || !d[ae]);
    }, q = function d(o, s, l) {
      var i;
      if (!o) return Q;
      if (typeof o == "string") {
        var f = o.toLowerCase();
        V[f] && (i = f), s && (V[f] = s, i = f);
        var p = o.split("-");
        if (!i && p.length > 1) return d(p[0]);
      } else {
        var w = o.name;
        V[w] = o, i = w;
      }
      return !l && i && (Q = i), i || !l && Q;
    }, _ = function(d, o) {
      if (Z(d)) return d.clone();
      var s = typeof o == "object" ? o : {};
      return s.date = d, s.args = arguments, new J(s);
    }, y = C;
    y.l = q, y.i = Z, y.w = function(d, o) {
      return _(d, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var J = function() {
      function d(s) {
        this.$L = q(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[ae] = !0;
      }
      var o = d.prototype;
      return o.parse = function(s) {
        this.$d = function(l) {
          var i = l.date, f = l.utc;
          if (i === null) return /* @__PURE__ */ new Date(NaN);
          if (y.u(i)) return /* @__PURE__ */ new Date();
          if (i instanceof Date) return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var p = i.match(ie);
            if (p) {
              var w = p[2] - 1 || 0, b = (p[7] || "0").substring(0, 3);
              return f ? new Date(Date.UTC(p[1], w, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b)) : new Date(p[1], w, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, b);
            }
          }
          return new Date(i);
        }(s), this.init();
      }, o.init = function() {
        var s = this.$d;
        this.$y = s.getFullYear(), this.$M = s.getMonth(), this.$D = s.getDate(), this.$W = s.getDay(), this.$H = s.getHours(), this.$m = s.getMinutes(), this.$s = s.getSeconds(), this.$ms = s.getMilliseconds();
      }, o.$utils = function() {
        return y;
      }, o.isValid = function() {
        return this.$d.toString() !== ee;
      }, o.isSame = function(s, l) {
        var i = _(s);
        return this.startOf(l) <= i && i <= this.endOf(l);
      }, o.isAfter = function(s, l) {
        return _(s) < this.startOf(l);
      }, o.isBefore = function(s, l) {
        return this.endOf(l) < _(s);
      }, o.$g = function(s, l, i) {
        return y.u(s) ? this[l] : this.set(i, s);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(s, l) {
        var i = this, f = !!y.u(l) || l, p = y.p(s), w = function(P, $) {
          var x = y.w(i.$u ? Date.UTC(i.$y, $, P) : new Date(i.$y, $, P), i);
          return f ? x : x.endOf(L);
        }, b = function(P, $) {
          return y.w(i.toDate()[P].apply(i.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice($)), i);
        }, O = this.$W, e = this.$M, c = this.$D, h = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case k:
            return f ? w(1, 0) : w(31, 11);
          case m:
            return f ? w(1, e) : w(0, e + 1);
          case v:
            var A = this.$locale().weekStart || 0, M = (O < A ? O + 7 : O) - A;
            return w(f ? c - M : c + (6 - M), e);
          case L:
          case T:
            return b(h + "Hours", 0);
          case S:
            return b(h + "Minutes", 1);
          case D:
            return b(h + "Seconds", 2);
          case I:
            return b(h + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(s) {
        return this.startOf(s, !1);
      }, o.$set = function(s, l) {
        var i, f = y.p(s), p = "set" + (this.$u ? "UTC" : ""), w = (i = {}, i[L] = p + "Date", i[T] = p + "Date", i[m] = p + "Month", i[k] = p + "FullYear", i[S] = p + "Hours", i[D] = p + "Minutes", i[I] = p + "Seconds", i[g] = p + "Milliseconds", i)[f], b = f === L ? this.$D + (l - this.$W) : l;
        if (f === m || f === k) {
          var O = this.clone().set(T, 1);
          O.$d[w](b), O.init(), this.$d = O.set(T, Math.min(this.$D, O.daysInMonth())).$d;
        } else w && this.$d[w](b);
        return this.init(), this;
      }, o.set = function(s, l) {
        return this.clone().$set(s, l);
      }, o.get = function(s) {
        return this[y.p(s)]();
      }, o.add = function(s, l) {
        var i, f = this;
        s = Number(s);
        var p = y.p(l), w = function(e) {
          var c = _(f);
          return y.w(c.date(c.date() + Math.round(e * s)), f);
        };
        if (p === m) return this.set(m, this.$M + s);
        if (p === k) return this.set(k, this.$y + s);
        if (p === L) return w(1);
        if (p === v) return w(7);
        var b = (i = {}, i[D] = a, i[S] = u, i[I] = t, i)[p] || 1, O = this.$d.getTime() + s * b;
        return y.w(O, this);
      }, o.subtract = function(s, l) {
        return this.add(-1 * s, l);
      }, o.format = function(s) {
        var l = this, i = this.$locale();
        if (!this.isValid()) return i.invalidDate || ee;
        var f = s || "YYYY-MM-DDTHH:mm:ssZ", p = y.z(this), w = this.$H, b = this.$m, O = this.$M, e = i.weekdays, c = i.months, h = i.meridiem, A = function($, x, te, ue) {
          return $ && ($[x] || $(l, f)) || te[x].slice(0, ue);
        }, M = function($) {
          return y.s(w % 12 || 12, $, "0");
        }, P = h || function($, x, te) {
          var ue = $ < 12 ? "AM" : "PM";
          return te ? ue.toLowerCase() : ue;
        };
        return f.replace(U, function($, x) {
          return x || function(te) {
            switch (te) {
              case "YY":
                return String(l.$y).slice(-2);
              case "YYYY":
                return y.s(l.$y, 4, "0");
              case "M":
                return O + 1;
              case "MM":
                return y.s(O + 1, 2, "0");
              case "MMM":
                return A(i.monthsShort, O, c, 3);
              case "MMMM":
                return A(c, O);
              case "D":
                return l.$D;
              case "DD":
                return y.s(l.$D, 2, "0");
              case "d":
                return String(l.$W);
              case "dd":
                return A(i.weekdaysMin, l.$W, e, 2);
              case "ddd":
                return A(i.weekdaysShort, l.$W, e, 3);
              case "dddd":
                return e[l.$W];
              case "H":
                return String(w);
              case "HH":
                return y.s(w, 2, "0");
              case "h":
                return M(1);
              case "hh":
                return M(2);
              case "a":
                return P(w, b, !0);
              case "A":
                return P(w, b, !1);
              case "m":
                return String(b);
              case "mm":
                return y.s(b, 2, "0");
              case "s":
                return String(l.$s);
              case "ss":
                return y.s(l.$s, 2, "0");
              case "SSS":
                return y.s(l.$ms, 3, "0");
              case "Z":
                return p;
            }
            return null;
          }($) || p.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(s, l, i) {
        var f, p = this, w = y.p(l), b = _(s), O = (b.utcOffset() - this.utcOffset()) * a, e = this - b, c = function() {
          return y.m(p, b);
        };
        switch (w) {
          case k:
            f = c() / 12;
            break;
          case m:
            f = c();
            break;
          case E:
            f = c() / 3;
            break;
          case v:
            f = (e - O) / 6048e5;
            break;
          case L:
            f = (e - O) / 864e5;
            break;
          case S:
            f = e / u;
            break;
          case D:
            f = e / a;
            break;
          case I:
            f = e / t;
            break;
          default:
            f = e;
        }
        return i ? f : y.a(f);
      }, o.daysInMonth = function() {
        return this.endOf(m).$D;
      }, o.$locale = function() {
        return V[this.$L];
      }, o.locale = function(s, l) {
        if (!s) return this.$L;
        var i = this.clone(), f = q(s, l, !0);
        return f && (i.$L = f), i;
      }, o.clone = function() {
        return y.w(this.$d, this);
      }, o.toDate = function() {
        return new Date(this.valueOf());
      }, o.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, o.toISOString = function() {
        return this.$d.toISOString();
      }, o.toString = function() {
        return this.$d.toUTCString();
      }, d;
    }(), X = J.prototype;
    return _.prototype = X, [["$ms", g], ["$s", I], ["$m", D], ["$H", S], ["$W", L], ["$M", m], ["$y", k], ["$D", T]].forEach(function(d) {
      X[d[1]] = function(o) {
        return this.$g(o, d[0], d[1]);
      };
    }), _.extend = function(d, o) {
      return d.$i || (d(o, J, _), d.$i = !0), _;
    }, _.locale = q, _.isDayjs = Z, _.unix = function(d) {
      return _(1e3 * d);
    }, _.en = V[Q], _.Ls = V, _.p = {}, _;
  });
})(Pe);
class Ne {
  constructor(r = 1) {
    this.maxRunning = r, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(r) {
    const t = new Promise((a, u) => {
      this.items.push(() => Promise.resolve(r()).then(a));
    });
    return this.run(), t;
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
  observe(r, t = {}) {
    return this.observers.push({
      handler: r,
      once: t.once || !1
    }), () => {
      this.off(r);
    };
  }
  once(r, t = {}) {
    return t.once = !0, this.observe(r, t);
  }
  onEnd(r, t = {}) {
    return this.observe((a, u, g) => {
      u === 0 && g === 0 && r(a, u, g);
    }, t);
  }
  notice() {
    return this.observers.forEach((r) => {
      r.handler(this, this.length, this.currentRunning);
    }), this.observers = this.observers.filter((r) => !r.once), this;
  }
  off(r) {
    return r == null ? (this.observers = [], this) : (this.observers = this.observers.filter((t) => t.handler !== r), this);
  }
}
function Te(n = 1) {
  return new Ne(n);
}
function xe() {
  return Te();
}
function Fe(n) {
  return n ? "$el" in n ? n.$el : n : null;
}
function ce(n, r) {
  return n.key ?? (n.key = re()), n.uploadState ?? (n.uploadState = R.PENDING), n.progress ?? (n.progress = 0), r && Object.assign(n, r), n;
}
function tt(n) {
  return ce(n);
}
function z(n) {
  return typeof n == "function" && (n = de(n())), Se(n) ? n : de(n);
}
function He(n, r, t = {}) {
  const a = z(t.id ?? "vue-multi-uploader-" + re()), u = z(t.accept ?? ""), g = z(t.maxFiles), I = z(t.maxConcurrent ?? 2), D = z(t.maxItemSize), S = z(t.disabled ?? !1), L = z(t.readonly ?? !1), v = z(r), m = j(() => z(t.dropzone).value), E = z(t.onDragClass ?? "h-ondrag"), k = z(t.autoStart ?? !0), T = z(t.inputName ?? "file"), ee = z(t.headers ?? {}), ie = z(t.data ?? {});
  let U = z(n);
  U.value = U.value.map(
    (e) => ce(e, { uploadState: R.UPLOADED })
  );
  const oe = xe(), B = Le(t);
  K(I, (e) => {
    oe.maxRunning = e;
  }, { immediate: !0 });
  function C(e, ...c) {
    return B.emit(e, ...c);
  }
  function Q(e, c) {
    return B.on(e, c), () => {
      B.off(e, c);
    };
  }
  function V() {
    Ue(u, y);
  }
  K(m, () => {
    const e = Fe(m.value);
    e && e instanceof HTMLElement && ae(e);
  }, { immediate: !0 });
  function ae(e) {
    ze(e, E, y);
  }
  function Z(e) {
    return _(q(e));
  }
  function q(e) {
    const h = se(ce({
      key: re(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: e,
      mime: e.type,
      uploadState: R.PENDING,
      progress: 0
    }));
    return h.title = h.title || h.file.name, B.emit("create-item", h), h;
  }
  function _(e) {
    const c = se(ce({
      key: re(),
      uploadState: R.PENDING,
      progress: 0
    }, e));
    if (!e.file)
      return e;
    if (X(e.file), D.value != null && e.file.size > D.value) {
      const M = new Re(
        "File size is too large",
        e.file,
        D.value
      );
      throw C("invalid-file", M), M;
    }
    const h = U.value.push(c), A = U.value[h - 1];
    if (he(A)) {
      const M = new FileReader();
      M.onload = (P) => {
        var $;
        A.thumbUrl = String(($ = P.target) == null ? void 0 : $.result);
      }, M.readAsDataURL(e.file);
    }
    return A;
  }
  function y(e) {
    Array.prototype.forEach.call(e, X), Array.prototype.forEach.call(e, (c) => {
      if (!f.value)
        return;
      const h = Z(c);
      k.value && l(h);
    });
  }
  function J(e) {
    var c;
    if (e instanceof XMLHttpRequest) {
      e.abort();
      return;
    }
    (c = e.xhr) == null || c.abort();
  }
  function X(e) {
    const c = w.value, h = e.name.split(".").pop();
    if (c.length) {
      let A = !1;
      if (c.forEach((M) => {
        A || (M.indexOf("/") !== -1 ? d(M, e.type) && (A = !0) : M.toLowerCase() === (h == null ? void 0 : h.toLowerCase()) && (A = !0));
      }), !A) {
        const M = new ke(
          "Invalid file type",
          e,
          c
        );
        throw C("invalid-file", M), M;
      }
    }
  }
  function d(e, c) {
    const h = e.split("/"), A = c.split("/");
    return h[1] === "*" ? h[0] === A[0] : e === c;
  }
  function o(e) {
    C("delete-item", e), U.value = U.value.filter((c) => c.key !== e.key);
  }
  async function s() {
    const e = [];
    return U.value.forEach((c) => {
      c.uploadState === R.PENDING && e.push(l(c));
    }), Promise.allSettled(e);
  }
  async function l(e) {
    return oe.push(() => i(e));
  }
  async function i(e) {
    e.uploadState = R.UPLOADING, e.error = void 0;
    const c = new FormData();
    for (const M in ie.value)
      c.append(M, ie.value[M]);
    c.append(T.value, e.file);
    let h = new XMLHttpRequest();
    h.open("POST", v.value);
    for (const M in ee.value)
      h.setRequestHeader(M, ee.value[M]);
    return t.prepareXhr && (h = await t.prepareXhr(h) ?? h), new Promise((M, P) => {
      C("item-upload-start", e, h, c), h.upload.onprogress = ($) => {
        $.lengthComputable && (e.progress = $.loaded / $.total, C("item-upload-progress", e, $));
      }, h.onload = () => {
        if (h.status >= 200 && h.status < 300)
          try {
            e.uploadState = R.UPLOADED, C("item-upload-success", e, h), M(e);
          } catch ($) {
            console.error($), e.uploadState = R.ERROR, e.error = $, P($);
          }
        else {
          const $ = `Upload failed with status: ${h.status}`, x = new Error($);
          console.error(x), e.uploadState = R.ERROR, e.error = x, P(x);
        }
      }, h.onerror = () => {
        const $ = "An error occurred during the upload.";
        console.error($), e.uploadState = R.ERROR, e.error = new Error($), P(e.error);
      }, h.onloadend = () => {
        C("item-upload-end", e, h);
      }, h.send(c);
    }).catch((M) => (C("item-upload-fail", e, M), Promise.reject(M)));
  }
  const f = j(() => (g.value == null || U.value.length < Number(g.value)) && !b.value), p = j(() => U.value.filter((c) => c.uploadState === R.UPLOADING).length > 0), w = j(() => (Array.isArray(u.value) ? u.value : u.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), b = j(() => S.value || L.value);
  K(U, (e) => {
    e.map((c) => {
      c.key = c.key || re();
    }), C("change", U);
  }, { deep: !0 }), K(p, (e) => {
    C(e ? "uploading" : "uploaded");
  });
  const O = j(() => U.value.reduce((e, c) => (c.file && (e += c.file.size), e), 0));
  return {
    id: a,
    accept: u,
    maxFiles: g,
    maxConcurrent: I,
    maxItemSize: D,
    disabled: S,
    readonly: L,
    uploadUrl: v,
    items: U,
    eventBus: B,
    canUpload: f,
    isUploading: p,
    acceptedTypes: w,
    isReadonly: b,
    totalSize: O,
    emits: C,
    on: Q,
    openFileSelector: V,
    addFile: Z,
    addItem: _,
    createItem: q,
    deleteItem: o,
    uploadStart: s,
    stopItemUpload: J,
    isImageItem: he,
    isImage: me,
    checkFile: X,
    uploadFile: i,
    enqueueUploadFile: l
  };
}
const Ye = { class: "vue-drag-uploader__wrapper vue-drag-uploader__items" }, nt = /* @__PURE__ */ ve({
  __name: "MultiUploader",
  props: /* @__PURE__ */ ge({
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
  emits: /* @__PURE__ */ ge(["update:modelValue", "change", "delete-item", "uploading", "uploaded", "create-item", "item-upload-start", "item-upload-success", "item-upload-fail", "item-upload-end", "item-upload-progress", "invalid-file-type"], ["update:modelValue"]),
  setup(n, { expose: r, emit: t }) {
    const a = n, u = t, g = be(n, "modelValue"), I = de(g.value);
    K(g, () => {
      I.value = g.value;
    }, { deep: !0 });
    const D = De("uploader");
    a.options.dropzone = a.options.dropzone ?? D;
    const S = a.instance ?? He(I, a.uploadUrl ?? "", a.options), {
      isReadonly: L,
      items: v
    } = S;
    K(v, () => {
      g.value = v.value;
    }, { deep: !0 });
    const m = [];
    for (const E in pe) {
      const k = S.on(E, (...T) => {
        u(E, ...T);
      });
      m.push(k);
    }
    return Ee(() => {
      m.forEach((E) => E());
    }), r({
      instance: S
    }), (E, k) => (H(), F("div", {
      ref: "uploader",
      class: _e(["vue-drag-uploader", { "vue-drag-uploader--readonly": Y(L) }])
    }, [
      W(E.$slots, "start", {
        items: Y(v),
        options: E.options,
        instance: se(Y(S))
      }),
      N("div", Ye, [
        W(E.$slots, "items", {
          items: Y(v),
          options: E.options,
          instance: se(Y(S))
        })
      ]),
      W(E.$slots, "end", {
        items: Y(v),
        options: E.options,
        instance: se(Y(S))
      })
    ], 2));
  }
}), je = {
  key: 1,
  class: "preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"
}, Be = {
  style: { width: "calc(var(--vmu-img-size) / 3)", height: "calc(var(--vmu-img-size) / 3)" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 384 512"
}, Ve = { style: { "word-break": "break-word" } }, Ge = { class: "preview-img__overlay" }, We = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, Qe = {
  key: 2,
  class: "preview-img__progress"
}, qe = { class: "error-message__message" }, rt = /* @__PURE__ */ ve({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(n, { emit: r }) {
    const t = n, a = r, u = j(() => t.item.uploadState), g = j(() => t.item.progress);
    function I() {
      t.isReadonly || a("delete", t.item);
    }
    const D = j(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), S = j(() => he(t.item));
    function L(v) {
      a("item-click", t.item, t.i, v);
    }
    return (v, m) => (H(), F("div", {
      class: "vue-drag-uploader-item preview-img",
      style: le({ "--vmu-img-size": v.size }),
      onClick: L
    }, [
      W(v.$slots, "it", { item: v.item }, () => {
        var E;
        return [
          S.value ? (H(), F("div", {
            key: 0,
            class: "preview-img__body",
            style: le({ "background-image": "url(" + (v.item.thumbUrl || v.item.url) + ")", opacity: u.value === Y(R).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : ne("", !0),
          S.value ? ne("", !0) : (H(), F("div", je, [
            N("div", null, [
              W(v.$slots, "icon", { item: v.item }, () => [
                (H(), F("svg", Be, m[2] || (m[2] = [
                  N("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])))
              ])
            ]),
            N("div", Ve, fe(D.value), 1)
          ])),
          N("div", Ge, [
            v.isReadonly ? ne("", !0) : (H(), F("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: m[0] || (m[0] = ye((k) => I(), ["prevent", "stop"]))
            }, [
              W(v.$slots, "remove-icon", {}, () => [
                (H(), F("svg", We, m[3] || (m[3] = [
                  N("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])))
              ])
            ])),
            W(v.$slots, "extra", { item: v.item })
          ]),
          u.value === Y(R).UPLOADING ? (H(), F("div", Qe, [
            N("div", {
              class: "preview-img__progress-bar",
              style: le({ width: g.value * 100 + "%" })
            }, null, 4)
          ])) : ne("", !0),
          u.value === Y(R).ERROR ? (H(), F("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: m[1] || (m[1] = ye(() => {
            }, ["stop", "prevent"]))
          }, [
            m[4] || (m[4] = N("span", { class: "error-message__notice" }, "Upload fail", -1)),
            N("span", qe, fe((E = v.item.error) == null ? void 0 : E.message), 1)
          ])) : ne("", !0)
        ];
      })
    ], 4));
  }
}), Ze = { class: "add-button__body" }, Je = { class: "add-button__icon" }, Xe = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Ke = { class: "add-button__text" }, st = /* @__PURE__ */ ve({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(n) {
    return (r, t) => (H(), F("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: le({ "--vmu-img-size": r.size })
    }, [
      N("div", Ze, [
        W(r.$slots, "default", {}, () => [
          N("div", Je, [
            W(r.$slots, "icon", Oe(Ie({ size: r.size })), () => [
              (H(), F("svg", Xe, t[0] || (t[0] = [
                N("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])))
            ])
          ]),
          N("div", Ke, fe(r.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  rt as ItemCard,
  st as ItemCardPlaceholder,
  nt as MultiUploader,
  R as UploadState,
  tt as createItem,
  Le as handleEvents,
  pe as uploaderEvents,
  He as useMultiUploader
};
