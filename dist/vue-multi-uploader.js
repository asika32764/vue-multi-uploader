import { ref as V, isRef as Ee, computed as z, watch as C, reactive as M, defineComponent as X, mergeModels as ae, useModel as be, useTemplateRef as Ie, onUnmounted as Re, openBlock as S, createElementBlock as L, normalizeClass as Se, unref as P, renderSlot as D, createElementVNode as w, normalizeStyle as $, createCommentVNode as x, toDisplayString as j, withModifiers as le, normalizeProps as Le, guardReactiveProps as Pe } from "vue";
/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */
function ze() {
  var e = /* @__PURE__ */ Object.create(null), n = {
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
    _allEvents: e,
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
    use: function(s, o) {
      var l = s(n, o);
      return l || n;
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
    on: function(s, o, l) {
      var E = n._allEvents[s] || (n._allEvents[s] = []);
      function g() {
        n.off(s, g), o.apply(o, arguments);
      }
      g.fn = o;
      var p = l ? g : o;
      return E.push(p), n;
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
    once: function(s, o) {
      return n.on(s, o, !0), n;
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
    off: function(s, o) {
      return o && n._allEvents[s] ? n._allEvents[s] = n._allEvents[s].filter(
        function(l) {
          return l !== o && l !== o.fn;
        }
      ) : s ? n._allEvents[s] = [] : n._allEvents = /* @__PURE__ */ Object.create(null), n;
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
    emit: function(s) {
      if (s !== "*") {
        var o = [].slice.call(arguments);
        (n._allEvents[s] || []).map(function(l) {
          l.apply(l, o.slice(1));
        }), (n._allEvents["*"] || []).map(function(l) {
          l.apply(l, o);
        });
      }
      return n;
    }
  };
  return n;
}
const q = {
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
function Ae(e) {
  const n = ze();
  for (const t in q) {
    const s = q[t];
    s && e[s] && n.on(t, e[s]);
  }
  return n;
}
var v = /* @__PURE__ */ ((e) => (e.PENDING = "pending", e.UPLOADING = "uploading", e.UPLOADED = "uploaded", e.ERROR = "error", e))(v || {});
class Ue extends Error {
  constructor(n, t, s) {
    super(n), this.file = t, this.accepted = s, this.name = "InvalidFileTypeError";
  }
}
class De extends Error {
  constructor(n, t, s) {
    super(n), this.file = t, this.maxSize = s, this.name = "InvalidFileSizeError";
  }
}
function Ce(e, n) {
  const t = document.createElement("input");
  t.id = "multi-uploader-selector", t.type = "file", t.accept = e.value, t.multiple = !0, t.style.display = "none", t.addEventListener("change", () => {
    const s = t.files;
    n(s), t.remove();
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
function ke(e, n, t) {
  if (e.__dragging_events)
    return;
  let s = 0;
  e.addEventListener("dragover", (o) => {
    o.preventDefault();
  }), e.addEventListener("dragenter", (o) => {
    o.stopPropagation(), o.preventDefault(), s++, e.classList.add(n.value);
  }), e.addEventListener("dragleave", (o) => {
    o.stopPropagation(), o.preventDefault(), s--, s === 0 && e.classList.remove(n.value);
  }), e.addEventListener("drop", async (o) => {
    var A;
    o.stopPropagation(), o.preventDefault(), e.classList.remove(n.value);
    const l = (A = o.dataTransfer) == null ? void 0 : A.items, E = [], g = async (d) => {
      const u = [];
      d.isDirectory ? d.createReader().readEntries((U) => {
        U.forEach((k) => {
          u.push(g(k));
        });
      }) : u.push(new Promise((f) => {
        d.file((U) => {
          E.push(U), f();
        });
      })), await Promise.all(u);
    }, p = [];
    Array.prototype.forEach.call(l ?? [], (d) => {
      const u = d.webkitGetAsEntry();
      u && p.push(g(u));
    }), p.length && Promise.all(p).then(() => {
      t(E);
    });
  }), e.__dragging_events = !0;
}
function H(e) {
  var n;
  return e.uploadState === v.UPLOADED ? e.mime ? ue(e.mime) : Q(e.url) : e.mime ? ue(e.mime) : Q(
    ((n = e.file) == null ? void 0 : n.name) || e.url
  );
}
function Q(e) {
  var o;
  const n = e.match(/^data:image\/([a-zA-Z0-9.+-]+);base64,/);
  let t;
  return n ? t = n[1] : t = ((o = e.split(".").pop()) == null ? void 0 : o.split("?").shift()) || "", [
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
function ue(e) {
  return e.startsWith("image/");
}
const R = class R {
};
R.alert = async (n, t) => (t && (n += " | " + t), window.alert(n)), R.confirm = async (n, t) => new Promise((s) => {
  t && (n += " | " + t);
  const o = confirm(n);
  s(o);
}), R.deleteConfirm = async (n, t) => R.confirm(n, t), R.notify = async (n, t, s = "log") => (t && (n += " | " + t), s === "error" ? console.error(n) : s === "warn" ? console.warn(n) : console.log(n), async () => {
}), R.clearNotifies = async () => {
}, R.confirmText = () => "OK", R.cancelText = () => "Cancel", R.deleteText = () => "Delete";
let ce = R;
function _e() {
  return typeof window > "u";
}
function O(e = "", n = !1) {
  if (n) {
    const s = (performance != null && performance.timeOrigin ? Math.round(performance.timeOrigin) : performance.timing.navigationStart) * 1e5 + performance.now() * 100;
    return e + s.toString(12) + de(4);
  }
  return e + de(12);
}
function de(e = 12) {
  return !_e() && !globalThis.crypto ? String(Math.floor(Math.random() * e ** 10)) : Array.from(Ne(e)).map((n) => n.toString(16).padStart(2, "0")).join("");
}
function Ne(e = 12) {
  const n = new Uint8Array(e);
  return globalThis.crypto.getRandomValues(n), n;
}
class xe {
  constructor(n = 1) {
    this.maxRunning = n, this.items = [], this.currentRunning = 0, this.running = !1, this.observers = [];
  }
  push(n) {
    const t = new Promise((s, o) => {
      this.items.push(() => Promise.resolve(n()).then(s));
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
    return this.observe((s, o, l) => {
      o === 0 && l === 0 && n(s, o, l);
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
function Oe(e = 1) {
  return new xe(e);
}
function Me() {
  return Oe();
}
function $e(e) {
  return e ? "$el" in e ? e.$el : e : null;
}
function F(e, n) {
  return e.key ?? (e.key = O()), e.uploadState ?? (e.uploadState = v.PENDING), e.progress ?? (e.progress = 0), n && Object.assign(e, n), e;
}
function Je(e) {
  return F(e);
}
function h(e) {
  return typeof e == "function" && (e = V(e())), Ee(e) ? e : V(e);
}
function Fe(e, n, t = {}) {
  const s = h(t.id ?? "vue-multi-uploader-" + O()), o = h(t.accept ?? ""), l = h(t.maxFiles), E = h(t.maxConcurrent ?? 2), g = h(t.maxItemSize), p = h(t.disabled ?? !1), A = h(t.readonly ?? !1), d = h(n), u = z(() => h(t.dropzone).value), f = h(t.onDragClass ?? "h-ondrag"), U = h(t.autoStart ?? !0), k = h(t.inputName ?? "file"), K = h(t.headers ?? {}), Y = h(t.data ?? {});
  let y = h(e);
  y.value = y.value.map(
    (r) => F(r, { uploadState: v.UPLOADED })
  );
  const W = Me(), _ = Ae(t);
  C(E, (r) => {
    W.maxRunning = r;
  }, { immediate: !0 });
  function b(r, ...i) {
    return _.emit(r, ...i);
  }
  function pe(r, i) {
    return _.on(r, i), () => {
      _.off(r, i);
    };
  }
  function fe() {
    Ce(o, te);
  }
  C(u, () => {
    const r = $e(u.value);
    r && r instanceof HTMLElement && me(r);
  }, { immediate: !0 });
  function me(r) {
    ke(r, f, te);
  }
  function Z(r) {
    return ee(J(r));
  }
  function J(r) {
    const a = M(F({
      key: O(),
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
      file: r,
      mime: r.type,
      uploadState: v.PENDING,
      progress: 0
    }));
    return a.title = a.title || a.file.name, _.emit("create-item", a), a;
  }
  function ee(r) {
    const i = M(F({
      key: O(),
      uploadState: v.PENDING,
      progress: 0
    }, r));
    if (!r.file)
      return r;
    if (T(r.file), g.value != null && r.file.size > g.value) {
      const c = new De(
        "File size is too large",
        r.file,
        g.value
      );
      throw b("invalid-file", c), c;
    }
    const a = y.value.push(i), I = y.value[a - 1];
    if (H(I)) {
      const c = new FileReader();
      c.onload = (N) => {
        var m;
        I.thumbUrl = String((m = N.target) == null ? void 0 : m.result);
      }, c.readAsDataURL(r.file);
    }
    return I;
  }
  function te(r) {
    Array.prototype.forEach.call(r, T), Array.prototype.forEach.call(r, (i) => {
      if (!re.value)
        return;
      const a = Z(i);
      U.value && B(a);
    });
  }
  function ve(r) {
    var i;
    if (r instanceof XMLHttpRequest) {
      r.abort();
      return;
    }
    (i = r.xhr) == null || i.abort();
  }
  function T(r) {
    const i = oe.value, a = r.name.split(".").pop();
    if (i.length) {
      let I = !1;
      if (i.forEach((c) => {
        I || (c.indexOf("/") !== -1 ? ge(c, r.type) && (I = !0) : c.toLowerCase() === (a == null ? void 0 : a.toLowerCase()) && (I = !0));
      }), !I) {
        const c = new Ue(
          "Invalid file type",
          r,
          i
        );
        throw b("invalid-file", c), c;
      }
    }
  }
  function ge(r, i) {
    const a = r.split("/"), I = i.split("/");
    return a[1] === "*" ? a[0] === I[0] : r === i;
  }
  function he(r) {
    b("delete-item", r), y.value = y.value.filter((i) => i.key !== r.key);
  }
  async function ye() {
    const r = [];
    return y.value.forEach((i) => {
      i.uploadState === v.PENDING && r.push(B(i));
    }), Promise.allSettled(r);
  }
  async function B(r) {
    return W.push(() => ne(r));
  }
  async function ne(r) {
    r.uploadState = v.UPLOADING, r.error = void 0;
    const i = new FormData();
    for (const c in Y.value)
      i.append(c, Y.value[c]);
    i.append(k.value, r.file);
    let a = new XMLHttpRequest();
    a.open("POST", d.value);
    for (const c in K.value)
      a.setRequestHeader(c, K.value[c]);
    return t.prepareXhr && (a = await t.prepareXhr(a) ?? a), new Promise((c, N) => {
      b("item-upload-start", r, a, i), a.upload.onprogress = (m) => {
        m.lengthComputable && (r.progress = m.loaded / m.total, b("item-upload-progress", r, m));
      }, a.onload = () => {
        if (a.status >= 200 && a.status < 300)
          try {
            r.uploadState = v.UPLOADED, b("item-upload-success", r, a), c(r);
          } catch (m) {
            console.error(m), r.uploadState = v.ERROR, r.error = m, N(m);
          }
        else {
          const m = `Upload failed with status: ${a.status}`, G = new Error(m);
          console.error(G), r.uploadState = v.ERROR, r.error = G, N(G);
        }
      }, a.onerror = () => {
        const m = "An error occurred during the upload.";
        console.error(m), r.uploadState = v.ERROR, r.error = new Error(m), N(r.error);
      }, a.onloadend = () => {
        b("item-upload-end", r, a);
      }, a.send(i);
    }).catch((c) => (b("item-upload-fail", r, c), Promise.reject(c)));
  }
  const re = z(() => (l.value == null || y.value.length < Number(l.value)) && !ie.value), se = z(() => y.value.filter((i) => i.uploadState === v.UPLOADING).length > 0), oe = z(() => (Array.isArray(o.value) ? o.value : o.value.split(",")).map((r) => r.trim()).filter((r) => r.length > 0).map((r) => r.indexOf("/") === -1 && r[0] === "." ? r.substr(1) : r)), ie = z(() => p.value || A.value);
  C(y, (r) => {
    r.map((i) => {
      i.key = i.key || O();
    }), b("change", y);
  }, { deep: !0 }), C(se, (r) => {
    b(r ? "uploading" : "uploaded");
  });
  const we = z(() => y.value.reduce((r, i) => (i.file && (r += i.file.size), r), 0));
  return {
    id: s,
    accept: o,
    maxFiles: l,
    maxConcurrent: E,
    maxItemSize: g,
    disabled: p,
    readonly: A,
    uploadUrl: d,
    items: y,
    eventBus: _,
    canUpload: re,
    isUploading: se,
    acceptedTypes: oe,
    isReadonly: ie,
    totalSize: we,
    emits: b,
    on: pe,
    openFileSelector: fe,
    addFile: Z,
    addItem: ee,
    createItem: J,
    deleteItem: he,
    uploadStart: ye,
    stopItemUpload: ve,
    isImageItem: H,
    isImage: Q,
    checkFile: T,
    uploadFile: ne,
    enqueueUploadFile: B
  };
}
const Te = { class: "vue-drag-uploader__wrapper vue-drag-uploader__items" }, et = /* @__PURE__ */ X({
  __name: "MultiUploader",
  props: /* @__PURE__ */ ae({
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
  emits: /* @__PURE__ */ ae(["update:modelValue", "change", "delete-item", "uploading", "uploaded", "create-item", "item-upload-start", "item-upload-success", "item-upload-fail", "item-upload-end", "item-upload-progress", "invalid-file-type"], ["update:modelValue"]),
  setup(e, { expose: n, emit: t }) {
    const s = e, o = t, l = be(e, "modelValue"), E = V(l.value);
    C(l, () => {
      E.value = l.value;
    }, { deep: !0 });
    const g = Ie("uploader");
    s.options.dropzone = s.options.dropzone ?? g;
    const p = s.instance ?? Fe(E, s.uploadUrl ?? "", s.options), {
      isReadonly: A,
      items: d
    } = p;
    C(d, () => {
      l.value = d.value;
    }, { deep: !0 });
    const u = [];
    for (const f in q) {
      const U = p.on(f, (...k) => {
        o(f, ...k);
      });
      u.push(U);
    }
    return Re(() => {
      u.forEach((f) => f());
    }), n({
      instance: p
    }), (f, U) => (S(), L("div", {
      ref: "uploader",
      class: Se(["vue-drag-uploader", { "vue-drag-uploader--readonly": P(A) }])
    }, [
      D(f.$slots, "start", {
        items: P(d),
        options: e.options,
        instance: M(P(p))
      }),
      w("div", Te, [
        D(f.$slots, "items", {
          items: P(d),
          options: e.options,
          instance: M(P(p))
        })
      ]),
      D(f.$slots, "end", {
        items: P(d),
        options: e.options,
        instance: M(P(p))
      })
    ], 2));
  }
}), Be = {
  key: 1,
  class: "preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"
}, Ge = {
  style: { width: "calc(var(--vmu-img-size) / 3)", height: "calc(var(--vmu-img-size) / 3)" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 384 512"
}, Ve = { style: { "word-break": "break-word" } }, je = { class: "preview-img__overlay" }, qe = {
  style: { width: "1rem", height: "1rem", fill: "white" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 448 512"
}, He = {
  key: 2,
  class: "preview-img__progress"
}, Qe = { class: "error-message__message" }, tt = /* @__PURE__ */ X({
  __name: "ItemCard",
  props: {
    item: {},
    i: {},
    size: { default: "150px" },
    isReadonly: { type: Boolean }
  },
  emits: ["delete", "item-click"],
  setup(e, { emit: n }) {
    const t = e, s = n, o = z(() => t.item.uploadState), l = z(() => t.item.progress);
    function E() {
      t.isReadonly || s("delete", t.item);
    }
    const g = z(() => t.item.file ? t.item.file.name : t.item.title ? t.item.title : t.item.url.split("/").pop()), p = z(() => H(t.item));
    function A(d) {
      s("item-click", t.item, t.i, d);
    }
    return (d, u) => (S(), L("div", {
      class: "vue-drag-uploader-item preview-img",
      style: $({ "--vmu-img-size": e.size }),
      onClick: A
    }, [
      D(d.$slots, "it", { item: e.item }, () => {
        var f;
        return [
          p.value ? (S(), L("div", {
            key: 0,
            class: "preview-img__body",
            style: $({ "background-image": "url(" + (e.item.thumbUrl || e.item.url) + ")", opacity: o.value === P(v).UPLOADED ? 1 : 0.5 })
          }, null, 4)) : x("", !0),
          p.value ? x("", !0) : (S(), L("div", Be, [
            w("div", null, [
              D(d.$slots, "icon", { item: e.item }, () => [
                (S(), L("svg", Ge, [...u[2] || (u[2] = [
                  w("path", { d: "M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z" }, null, -1)
                ])]))
              ])
            ]),
            w("div", Ve, j(g.value), 1)
          ])),
          w("div", je, [
            e.isReadonly ? x("", !0) : (S(), L("span", {
              key: 0,
              class: "preview-img__remove-icon",
              onClick: u[0] || (u[0] = le((U) => E(), ["prevent", "stop"]))
            }, [
              D(d.$slots, "remove-icon", {}, () => [
                (S(), L("svg", qe, [...u[3] || (u[3] = [
                  w("path", { d: "M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" }, null, -1)
                ])]))
              ])
            ])),
            D(d.$slots, "extra", { item: e.item })
          ]),
          o.value === P(v).UPLOADING ? (S(), L("div", He, [
            w("div", {
              class: "preview-img__progress-bar",
              style: $({ width: l.value * 100 + "%" })
            }, null, 4)
          ])) : x("", !0),
          o.value === P(v).ERROR ? (S(), L("div", {
            key: 3,
            class: "preview-img__error-message error-message",
            onClick: u[1] || (u[1] = le(() => {
            }, ["stop", "prevent"]))
          }, [
            u[4] || (u[4] = w("span", { class: "error-message__notice" }, "Upload fail", -1)),
            w("span", Qe, j((f = e.item.error) == null ? void 0 : f.message), 1)
          ])) : x("", !0)
        ];
      })
    ], 4));
  }
}), Xe = { class: "add-button__body" }, Ke = { class: "add-button__icon" }, Ye = {
  style: { width: "32px" },
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 512 512"
}, We = { class: "add-button__text" }, nt = /* @__PURE__ */ X({
  __name: "ItemCardPlaceholder",
  props: {
    size: { default: "150px" },
    text: { default: "" }
  },
  setup(e) {
    return (n, t) => (S(), L("div", {
      class: "vue-drag-uploader-item add-button",
      key: "empty",
      style: $({ "--vmu-img-size": e.size })
    }, [
      w("div", Xe, [
        D(n.$slots, "default", {}, () => [
          w("div", Ke, [
            D(n.$slots, "icon", Le(Pe({ size: e.size })), () => [
              (S(), L("svg", Ye, [...t[0] || (t[0] = [
                w("path", { d: "M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" }, null, -1)
              ])]))
            ])
          ]),
          w("div", We, j(e.text), 1)
        ])
      ])
    ], 4));
  }
});
export {
  tt as ItemCard,
  nt as ItemCardPlaceholder,
  et as MultiUploader,
  v as UploadState,
  Je as createItem,
  Ae as handleEvents,
  q as uploaderEvents,
  Fe as useMultiUploader
};
