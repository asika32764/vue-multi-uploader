import { ref as de, isRef as Me, computed as j, watch as X, reactive as se, defineComponent as ve, mergeModels as ge, useModel as Se, useTemplateRef as be, onUnmounted as De, createElementBlock as x, openBlock as F, normalizeClass as Ee, unref as Y, renderSlot as Q, createElementVNode as N, normalizeStyle as le, createCommentVNode as ne, toDisplayString as fe, withModifiers as ye, normalizeProps as _e, guardReactiveProps as Oe } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function Ie() {
  var r = /* @__PURE__ */ Object.create(null), n = {
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
    _allEvents: r,
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
    use: function(a, c) {
      var v = a(n, c);
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
    on: function(a, c, v) {
      var A = n._allEvents[a] || (n._allEvents[a] = []);
      function D() {
        n.off(a, D), c.apply(c, arguments);
      }
      D.fn = c;
      var S = v ? D : c;
      return A.push(S), n;
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
    once: function(a, c) {
      return n.on(a, c, !0), n;
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
    off: function(a, c) {
      return c && n._allEvents[a] ? n._allEvents[a] = n._allEvents[a].filter(
        function(v) {
          return v !== c && v !== c.fn;
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
        var c = [].slice.call(arguments);
        (n._allEvents[a] || []).map(function(v) {
          v.apply(v, c.slice(1));
        }), (n._allEvents["*"] || []).map(function(v) {
          v.apply(v, c);
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
function Ae(r) {
  const n = Ie();
  for (const t in pe) {
    const a = pe[t];
    a && r[a] && n.on(t, r[a]);
  }
  return n;
}
var R = /* @__PURE__ */ ((r) => (r.PENDING = "pending", r.UPLOADING = "uploading", r.UPLOADED = "uploaded", r.ERROR = "error", r))(R || {});
class Le extends Error {
  constructor(n, t, a) {
    super(n), this.file = t, this.accepted = a, this.name = "InvalidFileTypeError";
  }
}
class ke extends Error {
  constructor(n, t, a) {
    super(n), this.file = t, this.maxSize = a, this.name = "InvalidFileSizeError";
  }
}
function Re(r, n) {
  const t = document.createElement("input");
  t.id = "multi-uploader-selector", t.type = "file", t.accept = r.value, t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
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
function Ue(r, n, t) {
  r.__dragging_events || (r.addEventListener("dragover", (a) => {
    a.stopPropagation(), a.preventDefault(), r.classList.add(n.value);
  }), r.addEventListener("dragleave", (a) => {
    a.stopPropagation(), a.preventDefault(), r.classList.remove(n.value);
  }), r.addEventListener("drop", async (a) => {
    var S;
    a.stopPropagation(), a.preventDefault(), r.classList.remove(n.value);
    const c = (S = a.dataTransfer) == null ? void 0 : S.items, v = [], A = async (_) => {
      const m = [];
      _.isDirectory ? _.createReader().readEntries((E) => {
        E.forEach((k) => {
          m.push(A(k));
        });
      }) : m.push(new Promise((g) => {
        _.file((E) => {
          v.push(E), g();
        });
      })), await Promise.all(m);
    }, D = [];
    Array.prototype.forEach.call(c ?? [], (_) => {
      const m = _.webkitGetAsEntry();
      m && D.push(A(m));
    }), D.length && Promise.all(D).then(() => {
      t(v);
    });
  }), r.__dragging_events = !0);
}
function he(r) {
  var n;
  return r.uploadState === R.UPLOADED ? me(r.url) : me(
    ((n = r.file) == null ? void 0 : n.name) || r.url
  );
}
function me(r) {
  var c;
  const n = r.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,/);
  let t;
  return n ? t = n[1] : t = ((c = r.split(".").pop()) == null ? void 0 : c.split("?").shift()) || "", [
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
const G = class G {
};
G.alert = async (n) => window.alert(n), G.confirm = async (n) => new Promise((t) => {
  const a = confirm(n);
  t(a);
}), G.deleteConfirm = async (n) => G.confirm(n), G.confirmText = () => "確認", G.cancelText = () => "取消", G.deleteText = () => "刪除";
let $e = G;
function re(r = "", n = !1) {
  if (n) {
    const a = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return r + a.toString(12) + we(4);
  }
  return r + we(12);
}
function we(r = 12) {
  const t = window.crypto;
  if (!t)
    return String(Math.floor(Math.random() * r ** 10));
  const a = new Uint8Array(r);
  for (let c = 0; c < r; c += 65536)
    t.getRandomValues(a.subarray(c, c + Math.min(r - c, 65536)));
  return Array.from(a).map((c) => c.toString(16).padStart(2, "0")).join("");
}
var ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ce = { exports: {} };
(function(r, n) {
  (function(t, a) {
    r.exports = a();
  })(ze, function() {
    var t = 1e3, a = 6e4, c = 36e5, v = "millisecond", A = "second", D = "minute", S = "hour", _ = "day", m = "week", g = "month", E = "quarter", k = "year", H = "date", K = "Invalid Date", ie = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, oe = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(d) {
      var o = ["th", "st", "nd", "rd"], s = d % 100;
      return "[" + d + (o[(s - 20) % 10] || o[s] || o[0]) + "]";
    } }, B = function(d, o, s) {
      var u = String(d);
      return !u || u.length >= o ? d : "" + Array(o + 1 - u.length).join(s) + d;
    }, C = { s: B, z: function(d) {
      var o = -d.utcOffset(), s = Math.abs(o), u = Math.floor(s / 60), i = s % 60;
      return (o <= 0 ? "+" : "-") + B(u, 2, "0") + ":" + B(i, 2, "0");
    }, m: function d(o, s) {
      if (o.date() < s.date()) return -d(s, o);
      var u = 12 * (s.year() - o.year()) + (s.month() - o.month()), i = o.clone().add(u, g), f = s - i < 0, p = o.clone().add(u + (f ? -1 : 1), g);
      return +(-(u + (s - i) / (f ? i - p : p - i)) || 0);
    }, a: function(d) {
      return d < 0 ? Math.ceil(d) || 0 : Math.floor(d);
    }, p: function(d) {
      return { M: g, y: k, w: m, d: _, D: H, h: S, m: D, s: A, ms: v, Q: E }[d] || String(d || "").toLowerCase().replace(/s$/, "");
    }, u: function(d) {
      return d === void 0;
    } }, W = "en", V = {};
    V[W] = oe;
    var ae = "$isDayjsObject", Z = function(d) {
      return d instanceof J || !(!d || !d[ae]);
    }, q = function d(o, s, u) {
      var i;
      if (!o) return W;
      if (typeof o == "string") {
        var f = o.toLowerCase();
        V[f] && (i = f), s && (V[f] = s, i = f);
        var p = o.split("-");
        if (!i && p.length > 1) return d(p[0]);
      } else {
        var w = o.name;
        V[w] = o, i = w;
      }
      return !u && i && (W = i), i || !u && W;
    }, O = function(d, o) {
      if (Z(d)) return d.clone();
      var s = typeof o == "object" ? o : {};
      return s.date = d, s.args = arguments, new J(s);
    }, y = C;
    y.l = q, y.i = Z, y.w = function(d, o) {
      return O(d, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var J = function() {
      function d(s) {
        this.$L = q(s.locale, null, !0), this.parse(s), this.$x = this.$x || s.x || {}, this[ae] = !0;
      }
      var o = d.prototype;
      return o.parse = function(s) {
        this.$d = function(u) {
          var i = u.date, f = u.utc;
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
        return this.$d.toString() !== K;
      }, o.isSame = function(s, u) {
        var i = O(s);
        return this.startOf(u) <= i && i <= this.endOf(u);
      }, o.isAfter = function(s, u) {
        return O(s) < this.startOf(u);
      }, o.isBefore = function(s, u) {
        return this.endOf(u) < O(s);
      }, o.$g = function(s, u, i) {
        return y.u(s) ? this[u] : this.set(i, s);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(s, u) {
        var i = this, f = !!y.u(u) || u, p = y.p(s), w = function(P, $) {
          var T = y.w(i.$u ? Date.UTC(i.$y, $, P) : new Date(i.$y, $, P), i);
          return f ? T : T.endOf(_);
        }, b = function(P, $) {
          return y.w(i.toDate()[P].apply(i.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice($)), i);
        }, I = this.$W, e = this.$M, l = this.$D, h = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case k:
            return f ? w(1, 0) : w(31, 11);
          case g:
            return f ? w(1, e) : w(0, e + 1);
          case m:
            var L = this.$locale().weekStart || 0, M = (I < L ? I + 7 : I) - L;
            return w(f ? l - M : l + (6 - M), e);
          case _:
          case H:
            return b(h + "Hours", 0);
          case S:
            return b(h + "Minutes", 1);
          case D:
            return b(h + "Seconds", 2);
          case A:
            return b(h + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(s) {
        return this.startOf(s, !1);
      }, o.$set = function(s, u) {
        var i, f = y.p(s), p = "set" + (this.$u ? "UTC" : ""), w = (i = {}, i[_] = p + "Date", i[H] = p + "Date", i[g] = p + "Month", i[k] = p + "FullYear", i[S] = p + "Hours", i[D] = p + "Minutes", i[A] = p + "Seconds", i[v] = p + "Milliseconds", i)[f], b = f === _ ? this.$D + (u - this.$W) : u;
        if (f === g || f === k) {
          var I = this.clone().set(H, 1);
          I.$d[w](b), I.init(), this.$d = I.set(H, Math.min(this.$D, I.daysInMonth())).$d;
        } else w && this.$d[w](b);
        return this.init(), this;
      }, o.set = function(s, u) {
        return this.clone().$set(s, u);
      }, o.get = function(s) {
        return this[y.p(s)]();
      }, o.add = function(s, u) {
        var i, f = this;
        s = Number(s);
        var p = y.p(u), w = function(e) {
          var l = O(f);
          return y.w(l.date(l.date() + Math.round(e * s)), f);
        };
        if (p === g) return this.set(g, this.$M + s);
        if (p === k) return this.set(k, this.$y + s);
        if (p === _) return w(1);
        if (p === m) return w(7);
        var b = (i = {}, i[D] = a, i[S] = c, i[A] = t, i)[p] || 1, I = this.$d.getTime() + s * b;
        return y.w(I, this);
      }, o.subtract = function(s, u) {
        return this.add(-1 * s, u);
      }, o.format = function(s) {
        var u = this, i = this.$locale();
        if (!this.isValid()) return i.invalidDate || K;
        var f = s || "YYYY-MM-DDTHH:mm:ssZ", p = y.z(this), w = this.$H, b = this.$m, I = this.$M, e = i.weekdays, l = i.months, h = i.meridiem, L = function($, T, te, ue) {
          return $ && ($[T] || $(u, f)) || te[T].slice(0, ue);
        }, M = function($) {
          return y.s(w % 12 || 12, $, "0");
        }, P = h || function($, T, te) {
          var ue = $ < 12 ? "AM" : "PM";
          return te ? ue.toLowerCase() : ue;
        };
        return f.replace(U, function($, T) {
          return T || function(te) {
            switch (te) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return y.s(u.$y, 4, "0");
              case "M":
                return I + 1;
              case "MM":
                return y.s(I + 1, 2, "0");
              case "MMM":
                return L(i.monthsShort, I, l, 3);
              case "MMMM":
                return L(l, I);
              case "D":
                return u.$D;
              case "DD":
                return y.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return L(i.weekdaysMin, u.$W, e, 2);
              case "ddd":
                return L(i.weekdaysShort, u.$W, e, 3);
              case "dddd":
                return e[u.$W];
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
                return String(u.$s);
              case "ss":
                return y.s(u.$s, 2, "0");
              case "SSS":
                return y.s(u.$ms, 3, "0");
              case "Z":
                return p;
            }
            return null;
          }($) || p.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(s, u, i) {
        var f, p = this, w = y.p(u), b = O(s), I = (b.utcOffset() - this.utcOffset()) * a, e = this - b, l = function() {
          return y.m(p, b);
        };
        switch (w) {
          case k:
            f = l() / 12;
            break;
          case g:
            f = l();
            break;
          case E:
            f = l() / 3;
            break;
          case m:
            f = (e - I) / 6048e5;
            break;
          case _:
            f = (e - I) / 864e5;
            break;
          case S:
            f = e / c;
            break;
          case D:
            f = e / a;
            break;
          case A:
            f = e / t;
            break;
          default:
            f = e;
        }
        return i ? f : y.a(f);
      }, o.daysInMonth = function() {
        return this.endOf(g).$D;
      }, o.$locale = function() {
        return V[this.$L];
      }, o.locale = function(s, u) {
        if (!s) return this.$L;
        var i = this.clone(), f = q(s, u, !0);
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
    }(), ee = J.prototype;
    return O.prototype = ee, [["$ms", v], ["$s", A], ["$m", D], ["$H", S], ["$W", _], ["$M", g], ["$y", k], ["$D", H]].forEach(function(d) {
      ee[d[1]] = function(o) {
        return this.$g(o, d[0], d[1]);
      };
    }), O.extend = function(d, o) {
      return d.$i || (d(o, J, O), d.$i = !0), O;
    }, O.locale = q, O.isDayjs = Z, O.unix = function(d) {
      return O(1e3 * d);
    }, O.en = V[W], O.Ls = V, O.p = {}, O;
  });
})(Ce);
class Pe {
  constructor(n = 1) {
    this.maxRunning = n, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(n) {
    const t = new Promise((a, c) => {
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
    return this.observe((a, c, v) => {
      c === 0 && v === 0 && n(a, c, v);
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
function Ne(r = 1) {
  return new Pe(r);
}
function Te() {
  return Ne();
}
function xe(r) {
  return r ? "$el" in r ? r.$el : r : null;
}
function ce(r, n) {
  return r.key ?? (r.key = re()), r.uploadState ?? (r.uploadState = R.PENDING), r.progress ?? (r.progress = 0), n && Object.assign(r, n), r;
}
function et(r) {
  return ce(r);
}
function z(r) {
  return typeof r == "function" && (r = de(r())), Me(r) ? r : de(r);
}
function Fe(r, n, t = {}) {
  const a = z(t.id ?? "vue-multi-uploader-" + re()), c = z(t.accept ?? ""), v = z(t.maxFiles), A = z(t.maxConcurrent ?? 2), D = z(t.maxItemSize), S = z(t.disabled ?? !1), _ = z(t.readonly ?? !1), m = z(n), g = j(() => z(t.dropzone).value), E = z(t.onDragClass ?? "h-ondrag"), k = z(t.autoStart ?? !0), H = z(t.inputName ?? "file"), K = z(t.headers ?? {}), ie = z(t.data ?? {});
  let U = z(r);
  U.value = U.value.map(
    (e) => ce(e, { uploadState: R.UPLOADED })
  );
  const oe = Te(), B = Ae(t);
  X(A, (e) => {
    oe.maxRunning = e;
  }, { immediate: !0 });
  function C(e, ...l) {
    return B.emit(e, ...l);
  }
  function W(e, l) {
    return B.on(e, l), () => {
      B.off(e, l);
    };
  }
  function V() {
    Re(c, y);
  }
  X(g, () => {
    const e = xe(g.value);
    e && e instanceof HTMLElement && ae(e);
  }, { immediate: !0 });
  function ae(e) {
    Ue(e, E, y);
  }
  function Z(e) {
    return O(q(e));
  }
  function q(e) {
    const h = se(ce({
      key: re(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: e,
      uploadState: R.PENDING,
      progress: 0
    }));
    return h.title = h.title || h.file.name, B.emit("create-item", h), h;
  }
  function O(e) {
    const l = se(ce({
      key: re(),
      uploadState: R.PENDING,
      progress: 0
    }, e));
    if (!e.file)
      return e;
    if (ee(e.file), D.value != null && e.file.size > D.value) {
      const M = new ke(
        "File size is too large",
        e.file,
        D.value
      );
      throw C("invalid-file", M), M;
    }
    const h = U.value.push(l), L = U.value[h - 1];
    if (he(L)) {
      const M = new FileReader();
      M.onload = (P) => {
        var $;
        L.thumbUrl = String(($ = P.target) == null ? void 0 : $.result);
      }, M.readAsDataURL(e.file);
    }
    return L;
  }
  function y(e) {
    Array.prototype.forEach.call(e, ee), Array.prototype.forEach.call(e, (l) => {
      if (!f.value)
        return;
      const h = Z(l);
      k.value && u(h);
    });
  }
  function J(e) {
    var l;
    if (e instanceof XMLHttpRequest) {
      e.abort();
      return;
    }
    (l = e.xhr) == null || l.abort();
  }
  function ee(e) {
    const l = w.value, h = e.name.split(".").pop();
    if (l.length) {
      let L = !1;
      if (l.forEach((M) => {
        L || (M.indexOf("/") !== -1 ? d(M, e.type) && (L = !0) : M.toLowerCase() === (h == null ? void 0 : h.toLowerCase()) && (L = !0));
      }), !L) {
        const M = new Le(
          "Invalid file type",
          e,
          l
        );
        throw C("invalid-file", M), M;
      }
    }
  }
  function d(e, l) {
    const h = e.split("/"), L = l.split("/");
    return h[1] === "*" ? h[0] === L[0] : e === l;
  }
  function o(e) {
    C("delete-item", e), U.value = U.value.filter((l) => l.key !== e.key);
  }
  async function s() {
    const e = [];
    return U.value.forEach((l) => {
      l.uploadState === R.PENDING && e.push(u(l));
    }), Promise.allSettled(e);
  }
  async function u(e) {
    return oe.push(() => i(e));
  }
  async function i(e) {
    e.uploadState = R.UPLOADING, e.error = void 0;
    const l = new FormData();
    for (const M in ie.value)
      l.append(M, ie.value[M]);
    l.append(H.value, e.file);
    let h = new XMLHttpRequest();
    h.open("POST", m.value);
    for (const M in K.value)
      h.setRequestHeader(M, K.value[M]);
    return t.prepareXhr && (h = await t.prepareXhr(h) ?? h), new Promise((M, P) => {
      C("item-upload-start", e, h, l), h.upload.onprogress = ($) => {
        $.lengthComputable && (e.progress = $.loaded / $.total, C("item-upload-progress", e, $));
      }, h.onload = () => {
        if (h.status >= 200 && h.status < 300)
          try {
            e.uploadState = R.UPLOADED, C("item-upload-success", e, h), M(e);
          } catch ($) {
            console.error($), e.uploadState = R.ERROR, e.error = $, P($);
          }
        else {
          const $ = `Upload failed with status: ${h.status}`, T = new Error($);
          console.error(T), e.uploadState = R.ERROR, e.error = T, P(T);
        }
      }, h.onerror = () => {
        const $ = "An error occurred during the upload.";
        console.error($), e.uploadState = R.ERROR, e.error = new Error($), P(e.error);
      }, h.onloadend = () => {
        C("item-upload-end", e, h);
      }, h.send(l);
    }).catch((M) => (C("item-upload-fail", e, M), Promise.reject(M)));
  }
  const f = j(() => (v.value == null || U.value.length < Number(v.value)) && !b.value), p = j(() => U.value.filter((l) => l.uploadState === R.UPLOADING).length > 0), w = j(() => (Array.isArray(c.value) ? c.value : c.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), b = j(() => S.value || _.value);
  X(U, (e) => {
    e.map((l) => {
      l.key = l.key || re();
    }), C("change", U);
  }, { deep: !0 }), X(p, (e) => {
    C(e ? "uploading" : "uploaded");
  });
  const I = j(() => U.value.reduce((e, l) => (l.file && (e += l.file.size), e), 0));
  return {
    id: a,
    accept: c,
    maxFiles: v,
    maxConcurrent: A,
    maxItemSize: D,
    disabled: S,
    readonly: _,
    uploadUrl: m,
    items: U,
    eventBus: B,
    canUpload: f,
    isUploading: p,
    acceptedTypes: w,
    isReadonly: b,
    totalSize: I,
    emits: C,
    on: W,
    openFileSelector: V,
    addFile: Z,
    addItem: O,
    createItem: q,
    deleteItem: o,
    uploadStart: s,
    stopItemUpload: J,
    isImageItem: he,
    isImage: me
  };
}
const He = { class: "vue-drag-uploader__wrapper vue-drag-uploader__items" }, tt = /* @__PURE__ */ ve({
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
  setup(r, { expose: n, emit: t }) {
    const a = r, c = t, v = Se(r, "modelValue"), A = de(v.value);
    X(v, () => {
      A.value = v.value;
    }, { deep: !0 });
    const D = be("uploader");
    a.options.dropzone = a.options.dropzone ?? D;
    const S = a.instance ?? Fe(A, a.uploadUrl ?? "", a.options), {
      isReadonly: _,
      items: m
    } = S;
    X(m, () => {
      v.value = m.value;
    }, { deep: !0 });
    const g = [];
    for (const E in pe) {
      const k = S.on(E, (...H) => {
        c(E, ...H);
      });
      g.push(k);
    }
    return De(() => {
      g.forEach((E) => E());
    }), n({
      instance: S
    }), (E, k) => (F(), x("div", {
      ref: "uploader",
      class: Ee(["vue-drag-uploader", { "vue-drag-uploader--readonly": Y(_) }])
    }, [
      Q(E.$slots, "start", {
        items: Y(m),
        options: E.options,
        instance: se(Y(S))
      }),
      N("div", He, [
        Q(E.$slots, "items", {
          items: Y(m),
          options: E.options,
          instance: se(Y(S))
        })
      ]),
      Q(E.$slots, "end", {
        items: Y(m),
        options: E.options,
        instance: se(Y(S))
      })
    ], 2));
  }
}), Ye = {
  key: 1,
  class: "preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"
}, je = {
  style: { width: "calc(var(--vmu-img-size) / 3)", height: "calc(var(--vmu-img-size) / 3)" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 384 512"
}, Be = { style: { "word-break": "break-word" } }, Ve = { class: "preview-img__overlay" }, Ge = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, Qe = {
  key: 2,
  class: "preview-img__progress"
}, We = { class: "error-message__message" }, nt = /* @__PURE__ */ ve({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(r, { emit: n }) {
    const t = r, a = n, c = j(() => t.item.uploadState), v = j(() => t.item.progress);
    function A() {
      t.isReadonly || a("delete", t.item);
    }
    const D = j(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), S = j(() => he(t.item));
    function _(m) {
      a("item-click", t.item, t.i, m);
    }
    return (m, g) => (F(), x("div", {
      class: "vue-drag-uploader-item preview-img",
      style: le({ "--vmu-img-size": m.size }),
      onClick: _
    }, [
      Q(m.$slots, "it", { item: m.item }, () => {
        var E;
        return [
          S.value ? (F(), x("div", {
            key: 0,
            class: "preview-img__body",
            style: le({ "background-image": "url(" + (m.item.thumbUrl || m.item.url) + ")", opacity: c.value === Y(R).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : ne("", !0),
          S.value ? ne("", !0) : (F(), x("div", Ye, [
            N("div", null, [
              Q(m.$slots, "icon", { item: m.item }, () => [
                (F(), x("svg", je, g[2] || (g[2] = [
                  N("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])))
              ])
            ]),
            N("div", Be, fe(D.value), 1)
          ])),
          N("div", Ve, [
            m.isReadonly ? ne("", !0) : (F(), x("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: g[0] || (g[0] = ye((k) => A(), ["prevent", "stop"]))
            }, [
              Q(m.$slots, "remove-icon", {}, () => [
                (F(), x("svg", Ge, g[3] || (g[3] = [
                  N("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])))
              ])
            ])),
            Q(m.$slots, "extra", { item: m.item })
          ]),
          c.value === Y(R).UPLOADING ? (F(), x("div", Qe, [
            N("div", {
              class: "preview-img__progress-bar",
              style: le({ width: v.value * 100 + "%" })
            }, null, 4)
          ])) : ne("", !0),
          c.value === Y(R).ERROR ? (F(), x("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: g[1] || (g[1] = ye(() => {
            }, ["stop", "prevent"]))
          }, [
            g[4] || (g[4] = N("span", { class: "error-message__notice" }, "Upload fail", -1)),
            N("span", We, fe((E = m.item.error) == null ? void 0 : E.message), 1)
          ])) : ne("", !0)
        ];
      })
    ], 4));
  }
}), qe = { class: "add-button__body" }, Ze = { class: "add-button__icon" }, Je = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, Xe = { class: "add-button__text" }, rt = /* @__PURE__ */ ve({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(r) {
    return (n, t) => (F(), x("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: le({ "--vmu-img-size": n.size })
    }, [
      N("div", qe, [
        Q(n.$slots, "default", {}, () => [
          N("div", Ze, [
            Q(n.$slots, "icon", _e(Oe({ size: n.size })), () => [
              (F(), x("svg", Je, t[0] || (t[0] = [
                N("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])))
            ])
          ]),
          N("div", Xe, fe(n.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  nt as ItemCard,
  rt as ItemCardPlaceholder,
  tt as MultiUploader,
  R as UploadState,
  et as createItem,
  Ae as handleEvents,
  pe as uploaderEvents,
  Fe as useMultiUploader
};
