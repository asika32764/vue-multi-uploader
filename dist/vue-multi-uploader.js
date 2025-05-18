import { ref as ce, isRef as we, computed as j, watch as J, reactive as de, defineComponent as he, mergeModels as me, useModel as $e, useTemplateRef as Me, onUnmounted as be, openBlock as T, createElementBlock as N, normalizeClass as Se, unref as Z, createElementVNode as z, renderSlot as G, normalizeStyle as oe, createCommentVNode as te, toDisplayString as fe, withModifiers as ve, normalizeProps as _e, guardReactiveProps as De } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function Ee() {
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
      var L = n._allEvents[a] || (n._allEvents[a] = []);
      function b() {
        n.off(a, b), d.apply(d, arguments);
      }
      b.fn = d;
      var _ = v ? b : d;
      return L.push(_), n;
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
function Oe(s) {
  const n = Ee();
  for (const t in pe) {
    const a = pe[t];
    a && s[a] && n.on(t, s[a]);
  }
  return n;
}
var R = /* @__PURE__ */ ((s) => (s.PENDING = "pending", s.UPLOADING = "uploading", s.UPLOADED = "uploaded", s.ERROR = "error", s))(R || {});
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
    var _;
    a.stopPropagation(), a.preventDefault(), s.classList.remove(n.value);
    const d = (_ = a.dataTransfer) == null ? void 0 : _.items, v = [], L = async (O) => {
      const A = [];
      O.isDirectory ? O.createReader().readEntries((w) => {
        w.forEach((k) => {
          A.push(L(k));
        });
      }) : A.push(new Promise((h) => {
        O.file((w) => {
          v.push(w), h();
        });
      })), await Promise.all(A);
    }, b = [];
    Array.prototype.forEach.call(d ?? [], (O) => {
      const A = O.webkitGetAsEntry();
      A && b.push(L(A));
    }), b.length && Promise.all(b).then(() => {
      t(v);
    });
  }), s.__dragging_events = !0);
}
const H = class H {
};
H.alert = async (n) => window.alert(n), H.confirm = async (n) => new Promise((t) => {
  const a = confirm(n);
  t(a);
}), H.deleteConfirm = async (n) => H.confirm(n), H.confirmText = () => "確認", H.cancelText = () => "取消", H.deleteText = () => "刪除";
let ge = H;
function ne(s = "", n = !1) {
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
    var t = 1e3, a = 6e4, d = 36e5, v = "millisecond", L = "second", b = "minute", _ = "hour", O = "day", A = "week", h = "month", w = "quarter", k = "year", M = "date", re = "Invalid Date", V = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, U = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, ue = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(c) {
      var o = ["th", "st", "nd", "rd"], r = c % 100;
      return "[" + c + (o[(r - 20) % 10] || o[r] || o[0]) + "]";
    } }, K = function(c, o, r) {
      var u = String(c);
      return !u || u.length >= o ? c : "" + Array(o + 1 - u.length).join(r) + c;
    }, le = { s: K, z: function(c) {
      var o = -c.utcOffset(), r = Math.abs(o), u = Math.floor(r / 60), i = r % 60;
      return (o <= 0 ? "+" : "-") + K(u, 2, "0") + ":" + K(i, 2, "0");
    }, m: function c(o, r) {
      if (o.date() < r.date()) return -c(r, o);
      var u = 12 * (r.year() - o.year()) + (r.month() - o.month()), i = o.clone().add(u, h), f = r - i < 0, p = o.clone().add(u + (f ? -1 : 1), h);
      return +(-(u + (r - i) / (f ? i - p : p - i)) || 0);
    }, a: function(c) {
      return c < 0 ? Math.ceil(c) || 0 : Math.floor(c);
    }, p: function(c) {
      return { M: h, y: k, w: A, d: O, D: M, h: _, m: b, s: L, ms: v, Q: w }[c] || String(c || "").toLowerCase().replace(/s$/, "");
    }, u: function(c) {
      return c === void 0;
    } }, Y = "en", F = {};
    F[Y] = ue;
    var X = "$isDayjsObject", Q = function(c) {
      return c instanceof q || !(!c || !c[X]);
    }, W = function c(o, r, u) {
      var i;
      if (!o) return Y;
      if (typeof o == "string") {
        var f = o.toLowerCase();
        F[f] && (i = f), r && (F[f] = r, i = f);
        var p = o.split("-");
        if (!i && p.length > 1) return c(p[0]);
      } else {
        var $ = o.name;
        F[$] = o, i = $;
      }
      return !u && i && (Y = i), i || !u && Y;
    }, I = function(c, o) {
      if (Q(c)) return c.clone();
      var r = typeof o == "object" ? o : {};
      return r.date = c, r.args = arguments, new q(r);
    }, y = le;
    y.l = W, y.i = Q, y.w = function(c, o) {
      return I(c, { locale: o.$L, utc: o.$u, x: o.$x, $offset: o.$offset });
    };
    var q = function() {
      function c(r) {
        this.$L = W(r.locale, null, !0), this.parse(r), this.$x = this.$x || r.x || {}, this[X] = !0;
      }
      var o = c.prototype;
      return o.parse = function(r) {
        this.$d = function(u) {
          var i = u.date, f = u.utc;
          if (i === null) return /* @__PURE__ */ new Date(NaN);
          if (y.u(i)) return /* @__PURE__ */ new Date();
          if (i instanceof Date) return new Date(i);
          if (typeof i == "string" && !/Z$/i.test(i)) {
            var p = i.match(V);
            if (p) {
              var $ = p[2] - 1 || 0, e = (p[7] || "0").substring(0, 3);
              return f ? new Date(Date.UTC(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, e)) : new Date(p[1], $, p[3] || 1, p[4] || 0, p[5] || 0, p[6] || 0, e);
            }
          }
          return new Date(i);
        }(r), this.init();
      }, o.init = function() {
        var r = this.$d;
        this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
      }, o.$utils = function() {
        return y;
      }, o.isValid = function() {
        return this.$d.toString() !== re;
      }, o.isSame = function(r, u) {
        var i = I(r);
        return this.startOf(u) <= i && i <= this.endOf(u);
      }, o.isAfter = function(r, u) {
        return I(r) < this.startOf(u);
      }, o.isBefore = function(r, u) {
        return this.endOf(u) < I(r);
      }, o.$g = function(r, u, i) {
        return y.u(r) ? this[u] : this.set(i, r);
      }, o.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, o.valueOf = function() {
        return this.$d.getTime();
      }, o.startOf = function(r, u) {
        var i = this, f = !!y.u(u) || u, p = y.p(r), $ = function(x, C) {
          var B = y.w(i.$u ? Date.UTC(i.$y, C, x) : new Date(i.$y, C, x), i);
          return f ? B : B.endOf(O);
        }, e = function(x, C) {
          return y.w(i.toDate()[x].apply(i.toDate("s"), (f ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(C)), i);
        }, l = this.$W, m = this.$M, g = this.$D, S = "set" + (this.$u ? "UTC" : "");
        switch (p) {
          case k:
            return f ? $(1, 0) : $(31, 11);
          case h:
            return f ? $(1, m) : $(0, m + 1);
          case A:
            var D = this.$locale().weekStart || 0, E = (l < D ? l + 7 : l) - D;
            return $(f ? g - E : g + (6 - E), m);
          case O:
          case M:
            return e(S + "Hours", 0);
          case _:
            return e(S + "Minutes", 1);
          case b:
            return e(S + "Seconds", 2);
          case L:
            return e(S + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, o.endOf = function(r) {
        return this.startOf(r, !1);
      }, o.$set = function(r, u) {
        var i, f = y.p(r), p = "set" + (this.$u ? "UTC" : ""), $ = (i = {}, i[O] = p + "Date", i[M] = p + "Date", i[h] = p + "Month", i[k] = p + "FullYear", i[_] = p + "Hours", i[b] = p + "Minutes", i[L] = p + "Seconds", i[v] = p + "Milliseconds", i)[f], e = f === O ? this.$D + (u - this.$W) : u;
        if (f === h || f === k) {
          var l = this.clone().set(M, 1);
          l.$d[$](e), l.init(), this.$d = l.set(M, Math.min(this.$D, l.daysInMonth())).$d;
        } else $ && this.$d[$](e);
        return this.init(), this;
      }, o.set = function(r, u) {
        return this.clone().$set(r, u);
      }, o.get = function(r) {
        return this[y.p(r)]();
      }, o.add = function(r, u) {
        var i, f = this;
        r = Number(r);
        var p = y.p(u), $ = function(m) {
          var g = I(f);
          return y.w(g.date(g.date() + Math.round(m * r)), f);
        };
        if (p === h) return this.set(h, this.$M + r);
        if (p === k) return this.set(k, this.$y + r);
        if (p === O) return $(1);
        if (p === A) return $(7);
        var e = (i = {}, i[b] = a, i[_] = d, i[L] = t, i)[p] || 1, l = this.$d.getTime() + r * e;
        return y.w(l, this);
      }, o.subtract = function(r, u) {
        return this.add(-1 * r, u);
      }, o.format = function(r) {
        var u = this, i = this.$locale();
        if (!this.isValid()) return i.invalidDate || re;
        var f = r || "YYYY-MM-DDTHH:mm:ssZ", p = y.z(this), $ = this.$H, e = this.$m, l = this.$M, m = i.weekdays, g = i.months, S = i.meridiem, D = function(C, B, ee, ie) {
          return C && (C[B] || C(u, f)) || ee[B].slice(0, ie);
        }, E = function(C) {
          return y.s($ % 12 || 12, C, "0");
        }, x = S || function(C, B, ee) {
          var ie = C < 12 ? "AM" : "PM";
          return ee ? ie.toLowerCase() : ie;
        };
        return f.replace(U, function(C, B) {
          return B || function(ee) {
            switch (ee) {
              case "YY":
                return String(u.$y).slice(-2);
              case "YYYY":
                return y.s(u.$y, 4, "0");
              case "M":
                return l + 1;
              case "MM":
                return y.s(l + 1, 2, "0");
              case "MMM":
                return D(i.monthsShort, l, g, 3);
              case "MMMM":
                return D(g, l);
              case "D":
                return u.$D;
              case "DD":
                return y.s(u.$D, 2, "0");
              case "d":
                return String(u.$W);
              case "dd":
                return D(i.weekdaysMin, u.$W, m, 2);
              case "ddd":
                return D(i.weekdaysShort, u.$W, m, 3);
              case "dddd":
                return m[u.$W];
              case "H":
                return String($);
              case "HH":
                return y.s($, 2, "0");
              case "h":
                return E(1);
              case "hh":
                return E(2);
              case "a":
                return x($, e, !0);
              case "A":
                return x($, e, !1);
              case "m":
                return String(e);
              case "mm":
                return y.s(e, 2, "0");
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
          }(C) || p.replace(":", "");
        });
      }, o.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, o.diff = function(r, u, i) {
        var f, p = this, $ = y.p(u), e = I(r), l = (e.utcOffset() - this.utcOffset()) * a, m = this - e, g = function() {
          return y.m(p, e);
        };
        switch ($) {
          case k:
            f = g() / 12;
            break;
          case h:
            f = g();
            break;
          case w:
            f = g() / 3;
            break;
          case A:
            f = (m - l) / 6048e5;
            break;
          case O:
            f = (m - l) / 864e5;
            break;
          case _:
            f = m / d;
            break;
          case b:
            f = m / a;
            break;
          case L:
            f = m / t;
            break;
          default:
            f = m;
        }
        return i ? f : y.a(f);
      }, o.daysInMonth = function() {
        return this.endOf(h).$D;
      }, o.$locale = function() {
        return F[this.$L];
      }, o.locale = function(r, u) {
        if (!r) return this.$L;
        var i = this.clone(), f = W(r, u, !0);
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
      }, c;
    }(), se = q.prototype;
    return I.prototype = se, [["$ms", v], ["$s", L], ["$m", b], ["$H", _], ["$W", O], ["$M", h], ["$y", k], ["$D", M]].forEach(function(c) {
      se[c[1]] = function(o) {
        return this.$g(o, c[0], c[1]);
      };
    }), I.extend = function(c, o) {
      return c.$i || (c(o, q, I), c.$i = !0), I;
    }, I.locale = W, I.isDayjs = Q, I.unix = function(c) {
      return I(1e3 * c);
    }, I.en = F[Y], I.Ls = F, I.p = {}, I;
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
function ze(s = 1) {
  return new Ce(s);
}
function Pe() {
  return ze();
}
function xe(s) {
  return s ? "$el" in s ? s.$el : s : null;
}
function ae(s, n) {
  return s.key ?? (s.key = ne()), s.uploadState ?? (s.uploadState = R.PENDING), s.progress ?? (s.progress = 0), n && Object.assign(s, n), s;
}
function Ke(s) {
  return ae(s);
}
function P(s) {
  return typeof s == "function" && (s = ce(s())), we(s) ? s : ce(s);
}
function Te(s, n, t = {}) {
  const a = P(t.id ?? "vue-multi-uploader-" + ne()), d = P(t.accept ?? ""), v = P(t.maxFiles), L = P(t.maxConcurrent ?? 2), b = P(t.maxItemSize), _ = P(t.disabled ?? !1), O = P(t.readonly ?? !1), A = P(n), h = j(() => P(t.dropzone).value), w = P(t.onDragClass ?? "h-ondrag"), k = P(t.autoStart ?? !0);
  let M = P(s);
  M.value = M.value.map(
    (e) => ae(e, { uploadState: R.UPLOADED })
  );
  const re = Pe(), V = Oe(t);
  J(L, (e) => {
    re.maxRunning = e;
  }, { immediate: !0 });
  function U(e, ...l) {
    return V.emit(e, ...l);
  }
  function ue(e, l) {
    return V.on(e, l), () => {
      V.off(e, l);
    };
  }
  function K() {
    Le(d, Q);
  }
  J(h, () => {
    const e = xe(h.value);
    e && e instanceof HTMLElement && le(e);
  }, { immediate: !0 });
  function le(e) {
    ke(e, w, Q);
  }
  function Y(e) {
    return X(F(e));
  }
  function F(e) {
    const m = de(ae({
      key: ne(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: e,
      uploadState: R.PENDING,
      progress: 0
    }));
    return m.title = m.title || m.file.name, V.emit("create-item", m), m;
  }
  function X(e) {
    const l = de(ae({
      key: ne(),
      uploadState: R.PENDING,
      progress: 0
    }, e));
    if (!e.file)
      return e;
    if (I(e.file), b.value != null && e.file.size > b.value) {
      const S = new Ae(
        "File size is too large",
        e.file,
        b.value
      );
      throw U("invalid-file", S), S;
    }
    const m = M.value.push(l), g = M.value[m - 1];
    if (o(g)) {
      const S = new FileReader();
      S.onload = (D) => {
        var E;
        g.thumbUrl = String((E = D.target) == null ? void 0 : E.result);
      }, S.readAsDataURL(e.file);
    }
    return g;
  }
  function Q(e) {
    Array.prototype.forEach.call(e, I), Array.prototype.forEach.call(e, (l) => {
      if (!u.value)
        return;
      const m = Y(l);
      k.value && c(m);
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
  function I(e) {
    const l = f.value, m = e.name.split(".").pop();
    if (l.length) {
      let g = !1;
      if (l.forEach((S) => {
        g || (S.indexOf("/") !== -1 ? y(S, e.type) && (g = !0) : S.toLowerCase() === (m == null ? void 0 : m.toLowerCase()) && (g = !0));
      }), !g) {
        const S = new Ie(
          "Invalid file type",
          e,
          l
        );
        throw U("invalid-file", S), S;
      }
    }
  }
  function y(e, l) {
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
    return l.append("file", e.file), new Promise((g, S) => {
      const D = new XMLHttpRequest();
      U("item-upload-start", e, D), D.open("POST", A.value), D.upload.onprogress = (E) => {
        E.lengthComputable && (e.progress = E.loaded / E.total, U("item-upload-progress", e, E));
      }, D.onload = () => {
        if (D.status >= 200 && D.status < 300)
          try {
            e.uploadState = R.UPLOADED, U("item-upload-success", e, D), g(e);
          } catch (E) {
            console.error(E), e.uploadState = R.ERROR, e.error = E, S(E);
          }
        else {
          const E = `Upload failed with status: ${D.status}`, x = new Error(E);
          console.error(x), e.uploadState = R.ERROR, e.error = x, S(x);
        }
      }, D.onerror = () => {
        const E = "An error occurred during the upload.";
        console.error(E), e.uploadState = R.ERROR, e.error = new Error(E), S(e.error);
      }, D.onloadend = () => {
        U("item-upload-end", e, D);
      }, D.send(l);
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
  const u = j(() => (v.value == null || M.value.length < Number(v.value)) && !p.value), i = j(() => M.value.filter((l) => l.uploadState === R.UPLOADING).length > 0), f = j(() => (Array.isArray(d.value) ? d.value : d.value.split(",")).map((e) => e.trim()).filter((e) => e.length > 0).map((e) => e.indexOf("/") === -1 && e[0] === "." ? e.substr(1) : e)), p = j(() => _.value || O.value);
  J(M, (e) => {
    e.map((l) => {
      l.key = l.key || ne();
    }), U("change", M);
  }, { deep: !0 }), J(i, (e) => {
    U(e ? "uploading" : "uploaded");
  });
  const $ = j(() => M.value.reduce((e, l) => (l.file && (e += l.file.size), e), 0));
  return {
    id: a,
    accept: d,
    maxFiles: v,
    maxConcurrent: L,
    maxItemSize: b,
    disabled: _,
    readonly: O,
    uploadUrl: A,
    items: M,
    eventBus: V,
    canUpload: u,
    isUploading: i,
    acceptedTypes: f,
    isReadonly: p,
    totalSize: $,
    emits: U,
    on: ue,
    openFileSelector: K,
    addFile: Y,
    addItem: X,
    createItem: F,
    deleteItem: q,
    uploadStart: se,
    stopItemUpload: W,
    isImageItem: o,
    isImage: r
  };
}
const Ne = { class: "vue-drag-uploader__wrapper" }, Xe = /* @__PURE__ */ he({
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
    const a = s, d = t, v = $e(s, "modelValue"), L = ce(v.value);
    J(v, () => {
      L.value = v.value;
    }, { deep: !0 });
    const b = Me("el");
    a.options.dropzone = a.options.dropzone ?? b;
    const _ = a.instance ?? Te(L, a.uploadUrl ?? "", a.options), {
      isReadonly: O,
      items: A
    } = _;
    J(A, () => {
      v.value = A.value;
    }, { deep: !0 });
    const h = [];
    for (const w in pe) {
      const k = _.on(w, (...M) => {
        d(w, ...M);
      });
      h.push(k);
    }
    return be(() => {
      h.forEach((w) => w());
    }), n({
      instance: _
    }), (w, k) => (T(), N("div", {
      ref_key: "el",
      ref: b,
      class: Se(["vue-drag-uploader", { "vue-drag-uploader--readonly": Z(O) }])
    }, [
      z("div", Ne, [
        G(w.$slots, "items", {
          items: Z(A),
          options: w.options,
          instance: de(Z(_))
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
    const t = s, a = n, d = j(() => t.item.uploadState), v = j(() => t.item.progress);
    function L() {
      t.isReadonly || a("delete", t.item);
    }
    const b = j(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), _ = j(() => O(
      t.item.file ? t.item.file.name : t.item.url
    ));
    function O(h) {
      var M;
      const w = ((M = h.split(".").pop()) == null ? void 0 : M.split("?").shift()) || "";
      return [
        "png",
        "jpeg",
        "jpg",
        "gif",
        "bmp",
        "webp"
      ].indexOf(w.toLowerCase()) !== -1;
    }
    function A(h) {
      a("item-click", t.item, t.i, h);
    }
    return (h, w) => (T(), N("div", {
      class: "vue-drag-uploader-item preview-img",
      style: oe({ "--vmu-img-size": h.size }),
      onClick: A
    }, [
      G(h.$slots, "it", { item: h.item }, () => {
        var k;
        return [
          _.value ? (T(), N("div", {
            key: 0,
            class: "preview-img__body",
            style: oe({ "background-image": "url(" + (h.item.thumbUrl || h.item.url) + ")", opacity: d.value === Z(R).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : te("", !0),
          _.value ? te("", !0) : (T(), N("div", Fe, [
            z("div", null, [
              G(h.$slots, "icon", { item: h.item }, () => [
                (T(), N("svg", je, w[2] || (w[2] = [
                  z("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])))
              ])
            ]),
            z("div", He, fe(b.value), 1)
          ])),
          z("div", Ye, [
            h.isReadonly ? te("", !0) : (T(), N("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: w[0] || (w[0] = ve((M) => L(), ["prevent"]))
            }, [
              G(h.$slots, "remove-icon", {}, () => [
                (T(), N("svg", Be, w[3] || (w[3] = [
                  z("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])))
              ])
            ])),
            G(h.$slots, "extra", { item: h.item })
          ]),
          d.value === Z(R).UPLOADING ? (T(), N("div", Ve, [
            z("div", {
              class: "preview-img__progress-bar",
              style: oe({ width: v.value * 100 + "%" })
            }, null, 4)
          ])) : te("", !0),
          d.value === Z(R).ERROR ? (T(), N("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: w[1] || (w[1] = ve(() => {
            }, ["stop", "prevent"]))
          }, [
            w[4] || (w[4] = z("span", { class: "error-message__notice" }, "Upload fail", -1)),
            z("span", Ge, fe((k = h.item.error) == null ? void 0 : k.message), 1)
          ])) : te("", !0)
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
    return (n, t) => (T(), N("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: oe({ "--vmu-img-size": n.size })
    }, [
      z("div", Qe, [
        G(n.$slots, "default", {}, () => [
          z("div", We, [
            G(n.$slots, "icon", _e(De({ size: n.size })), () => [
              (T(), N("svg", qe, t[0] || (t[0] = [
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
  et as ItemCard,
  tt as ItemCardPlaceholder,
  Xe as MultiUploader,
  R as UploadState,
  Ke as createItem,
  Oe as handleEvents,
  pe as uploaderEvents,
  Te as useMultiUploader
};
