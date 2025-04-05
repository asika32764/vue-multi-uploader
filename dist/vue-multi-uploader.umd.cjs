(function(P,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(P=typeof globalThis<"u"?globalThis:P||self,t(P.VueMultiUploader={},P.Vue))})(this,function(P,t){"use strict";/*!
 * dush <https://github.com/tunnckoCore/dush>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (https://i.am.charlike.online)
 * Released under the MIT license.
 */function ae(){var i=Object.create(null),r={_allEvents:i,use:function(l,f){var y=l(r,f);return y||r},on:function(l,f,y){var C=r._allEvents[l]||(r._allEvents[l]=[]);function M(){r.off(l,M),f.apply(f,arguments)}M.fn=f;var _=y?M:f;return C.push(_),r},once:function(l,f){return r.on(l,f,!0),r},off:function(l,f){return f&&r._allEvents[l]?r._allEvents[l]=r._allEvents[l].filter(function(y){return y!==f&&y!==f.fn}):l?r._allEvents[l]=[]:r._allEvents=Object.create(null),r},emit:function(l){if(l!=="*"){var f=[].slice.call(arguments);(r._allEvents[l]||[]).map(function(y){y.apply(y,f.slice(1))}),(r._allEvents["*"]||[]).map(function(y){y.apply(y,f)})}return r}};return r}const ee={change:"onChange","delete-item":"onDeleteItem",uploading:"onUploading",uploaded:"onUploaded","create-item":"onCreateItem","item-upload-start":"onItemUploadStart","item-upload-success":"onItemUploadSuccess","item-upload-fail":"onItemUploadFail","item-upload-end":"onItemUploadEnd","item-upload-progress":"onItemUploadProgress","invalid-file":"onInvalidFile"};function le(i){const r=ae();for(const n in ee){const l=ee[n];l&&i[l]&&r.on(n,i[l])}return r}var N=(i=>(i.PENDING="pending",i.UPLOADING="uploading",i.UPLOADED="uploaded",i.ERROR="error",i))(N||{});class ue extends Error{constructor(r,n,l){super(r),this.file=n,this.accepted=l,this.name="InvalidFileTypeError"}}class ce extends Error{constructor(r,n,l){super(r),this.file=n,this.maxSize=l,this.name="InvalidFileSizeError"}}function de(i,r){const n=document.createElement("input");n.id="multi-uploader-selector",n.type="file",n.accept=i.value,n.multiple=!0,n.style.display="none",n.addEventListener("change",()=>{const l=n.files;r(l),n.remove()}),n.addEventListener("change",()=>{n.remove()}),n.addEventListener("blur",()=>{n.remove()}),document.body.appendChild(n),n.dispatchEvent(new MouseEvent("click",{view:window,bubbles:!0,cancelable:!0}))}function fe(i,r,n){i.__dragging_events||(i.addEventListener("dragover",l=>{l.stopPropagation(),l.preventDefault(),i.classList.add(r.value)}),i.addEventListener("dragleave",l=>{l.stopPropagation(),l.preventDefault(),i.classList.remove(r.value)}),i.addEventListener("drop",async l=>{var _;l.stopPropagation(),l.preventDefault(),i.classList.remove(r.value);const f=(_=l.dataTransfer)==null?void 0:_.items,y=[],C=async O=>{const L=[];O.isDirectory?O.createReader().readEntries(v=>{v.forEach(I=>{L.push(C(I))})}):L.push(new Promise(h=>{O.file(v=>{y.push(v),h()})})),await Promise.all(L)},M=[];Array.prototype.forEach.call(f??[],O=>{const L=O.webkitGetAsEntry();L&&M.push(C(L))}),M.length&&Promise.all(M).then(()=>{n(y)})}),i.__dragging_events=!0)}const B=class B{};B.alert=async r=>window.alert(r),B.confirm=async r=>new Promise(n=>{const l=confirm(r);n(l)}),B.deleteConfirm=async r=>B.confirm(r),B.confirmText=()=>"確認",B.cancelText=()=>"取消",B.deleteText=()=>"刪除";let se=B;function Q(i="",r=!1){if(r){const l=(performance!=null&&performance.timeOrigin?Math.round(performance.timeOrigin):performance.timing.navigationStart)*1e5+performance.now()*100;return i+l.toString(12)+oe(4)}return i+oe(12)}function oe(i=12){const n=window.crypto;if(!n)return String(Math.floor(Math.random()*i**10));const l=new Uint8Array(i);for(let f=0;f<i;f+=65536)n.getRandomValues(l.subarray(f,f+Math.min(i-f,65536)));return Array.from(l).map(f=>f.toString(16).padStart(2,"0")).join("")}var pe=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},me={exports:{}};(function(i,r){(function(n,l){i.exports=l()})(pe,function(){var n=1e3,l=6e4,f=36e5,y="millisecond",C="second",M="minute",_="hour",O="day",L="week",h="month",v="quarter",I="year",S="date",Z="Invalid Date",F=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,R=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,ne={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(d){var a=["th","st","nd","rd"],s=d%100;return"["+d+(a[(s-20)%10]||a[s]||a[0])+"]"}},W=function(d,a,s){var u=String(d);return!u||u.length>=a?d:""+Array(a+1-u.length).join(s)+d},re={s:W,z:function(d){var a=-d.utcOffset(),s=Math.abs(a),u=Math.floor(s/60),o=s%60;return(a<=0?"+":"-")+W(u,2,"0")+":"+W(o,2,"0")},m:function d(a,s){if(a.date()<s.date())return-d(s,a);var u=12*(s.year()-a.year())+(s.month()-a.month()),o=a.clone().add(u,h),p=s-o<0,m=a.clone().add(u+(p?-1:1),h);return+(-(u+(s-o)/(p?o-m:m-o))||0)},a:function(d){return d<0?Math.ceil(d)||0:Math.floor(d)},p:function(d){return{M:h,y:I,w:L,d:O,D:S,h:_,m:M,s:C,ms:y,Q:v}[d]||String(d||"").toLowerCase().replace(/s$/,"")},u:function(d){return d===void 0}},V="en",T={};T[V]=ne;var q="$isDayjsObject",H=function(d){return d instanceof G||!(!d||!d[q])},Y=function d(a,s,u){var o;if(!a)return V;if(typeof a=="string"){var p=a.toLowerCase();T[p]&&(o=p),s&&(T[p]=s,o=p);var m=a.split("-");if(!o&&m.length>1)return d(m[0])}else{var E=a.name;T[E]=a,o=E}return!u&&o&&(V=o),o||!u&&V},A=function(d,a){if(H(d))return d.clone();var s=typeof a=="object"?a:{};return s.date=d,s.args=arguments,new G(s)},$=re;$.l=Y,$.i=H,$.w=function(d,a){return A(d,{locale:a.$L,utc:a.$u,x:a.$x,$offset:a.$offset})};var G=function(){function d(s){this.$L=Y(s.locale,null,!0),this.parse(s),this.$x=this.$x||s.x||{},this[q]=!0}var a=d.prototype;return a.parse=function(s){this.$d=function(u){var o=u.date,p=u.utc;if(o===null)return new Date(NaN);if($.u(o))return new Date;if(o instanceof Date)return new Date(o);if(typeof o=="string"&&!/Z$/i.test(o)){var m=o.match(F);if(m){var E=m[2]-1||0,e=(m[7]||"0").substring(0,3);return p?new Date(Date.UTC(m[1],E,m[3]||1,m[4]||0,m[5]||0,m[6]||0,e)):new Date(m[1],E,m[3]||1,m[4]||0,m[5]||0,m[6]||0,e)}}return new Date(o)}(s),this.init()},a.init=function(){var s=this.$d;this.$y=s.getFullYear(),this.$M=s.getMonth(),this.$D=s.getDate(),this.$W=s.getDay(),this.$H=s.getHours(),this.$m=s.getMinutes(),this.$s=s.getSeconds(),this.$ms=s.getMilliseconds()},a.$utils=function(){return $},a.isValid=function(){return this.$d.toString()!==Z},a.isSame=function(s,u){var o=A(s);return this.startOf(u)<=o&&o<=this.endOf(u)},a.isAfter=function(s,u){return A(s)<this.startOf(u)},a.isBefore=function(s,u){return this.endOf(u)<A(s)},a.$g=function(s,u,o){return $.u(s)?this[u]:this.set(o,s)},a.unix=function(){return Math.floor(this.valueOf()/1e3)},a.valueOf=function(){return this.$d.getTime()},a.startOf=function(s,u){var o=this,p=!!$.u(u)||u,m=$.p(s),E=function(j,U){var x=$.w(o.$u?Date.UTC(o.$y,U,j):new Date(o.$y,U,j),o);return p?x:x.endOf(O)},e=function(j,U){return $.w(o.toDate()[j].apply(o.toDate("s"),(p?[0,0,0,0]:[23,59,59,999]).slice(U)),o)},c=this.$W,g=this.$M,w=this.$D,D="set"+(this.$u?"UTC":"");switch(m){case I:return p?E(1,0):E(31,11);case h:return p?E(1,g):E(0,g+1);case L:var k=this.$locale().weekStart||0,b=(c<k?c+7:c)-k;return E(p?w-b:w+(6-b),g);case O:case S:return e(D+"Hours",0);case _:return e(D+"Minutes",1);case M:return e(D+"Seconds",2);case C:return e(D+"Milliseconds",3);default:return this.clone()}},a.endOf=function(s){return this.startOf(s,!1)},a.$set=function(s,u){var o,p=$.p(s),m="set"+(this.$u?"UTC":""),E=(o={},o[O]=m+"Date",o[S]=m+"Date",o[h]=m+"Month",o[I]=m+"FullYear",o[_]=m+"Hours",o[M]=m+"Minutes",o[C]=m+"Seconds",o[y]=m+"Milliseconds",o)[p],e=p===O?this.$D+(u-this.$W):u;if(p===h||p===I){var c=this.clone().set(S,1);c.$d[E](e),c.init(),this.$d=c.set(S,Math.min(this.$D,c.daysInMonth())).$d}else E&&this.$d[E](e);return this.init(),this},a.set=function(s,u){return this.clone().$set(s,u)},a.get=function(s){return this[$.p(s)]()},a.add=function(s,u){var o,p=this;s=Number(s);var m=$.p(u),E=function(g){var w=A(p);return $.w(w.date(w.date()+Math.round(g*s)),p)};if(m===h)return this.set(h,this.$M+s);if(m===I)return this.set(I,this.$y+s);if(m===O)return E(1);if(m===L)return E(7);var e=(o={},o[M]=l,o[_]=f,o[C]=n,o)[m]||1,c=this.$d.getTime()+s*e;return $.w(c,this)},a.subtract=function(s,u){return this.add(-1*s,u)},a.format=function(s){var u=this,o=this.$locale();if(!this.isValid())return o.invalidDate||Z;var p=s||"YYYY-MM-DDTHH:mm:ssZ",m=$.z(this),E=this.$H,e=this.$m,c=this.$M,g=o.weekdays,w=o.months,D=o.meridiem,k=function(U,x,J,X){return U&&(U[x]||U(u,p))||J[x].slice(0,X)},b=function(U){return $.s(E%12||12,U,"0")},j=D||function(U,x,J){var X=U<12?"AM":"PM";return J?X.toLowerCase():X};return p.replace(R,function(U,x){return x||function(J){switch(J){case"YY":return String(u.$y).slice(-2);case"YYYY":return $.s(u.$y,4,"0");case"M":return c+1;case"MM":return $.s(c+1,2,"0");case"MMM":return k(o.monthsShort,c,w,3);case"MMMM":return k(w,c);case"D":return u.$D;case"DD":return $.s(u.$D,2,"0");case"d":return String(u.$W);case"dd":return k(o.weekdaysMin,u.$W,g,2);case"ddd":return k(o.weekdaysShort,u.$W,g,3);case"dddd":return g[u.$W];case"H":return String(E);case"HH":return $.s(E,2,"0");case"h":return b(1);case"hh":return b(2);case"a":return j(E,e,!0);case"A":return j(E,e,!1);case"m":return String(e);case"mm":return $.s(e,2,"0");case"s":return String(u.$s);case"ss":return $.s(u.$s,2,"0");case"SSS":return $.s(u.$ms,3,"0");case"Z":return m}return null}(U)||m.replace(":","")})},a.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},a.diff=function(s,u,o){var p,m=this,E=$.p(u),e=A(s),c=(e.utcOffset()-this.utcOffset())*l,g=this-e,w=function(){return $.m(m,e)};switch(E){case I:p=w()/12;break;case h:p=w();break;case v:p=w()/3;break;case L:p=(g-c)/6048e5;break;case O:p=(g-c)/864e5;break;case _:p=g/f;break;case M:p=g/l;break;case C:p=g/n;break;default:p=g}return o?p:$.a(p)},a.daysInMonth=function(){return this.endOf(h).$D},a.$locale=function(){return T[this.$L]},a.locale=function(s,u){if(!s)return this.$L;var o=this.clone(),p=Y(s,u,!0);return p&&(o.$L=p),o},a.clone=function(){return $.w(this.$d,this)},a.toDate=function(){return new Date(this.valueOf())},a.toJSON=function(){return this.isValid()?this.toISOString():null},a.toISOString=function(){return this.$d.toISOString()},a.toString=function(){return this.$d.toUTCString()},d}(),K=G.prototype;return A.prototype=K,[["$ms",y],["$s",C],["$m",M],["$H",_],["$W",O],["$M",h],["$y",I],["$D",S]].forEach(function(d){K[d[1]]=function(a){return this.$g(a,d[0],d[1])}}),A.extend=function(d,a){return d.$i||(d(a,G,A),d.$i=!0),A},A.locale=Y,A.isDayjs=H,A.unix=function(d){return A(1e3*d)},A.en=T[V],A.Ls=T,A.p={},A})})(me);class he{constructor(r=1){this.maxRunning=r,this.items=[],this.currentRunning=0,this.running=!1,this.observers=[]}push(r){const n=new Promise((l,f)=>{this.items.push(()=>Promise.resolve(r()).then(l))});return this.run(),n}run(){this.running||(this.running=!0),this.pop()}async pop(){const r=this.items.shift();if(!r)return this.running=!1,Promise.resolve();if(this.currentRunning>=this.maxRunning)return this.items.unshift(r),Promise.resolve();this.currentRunning++,this.notice();try{return await r()}catch(n){throw n}finally{this.endPop()}}endPop(){this.currentRunning--,this.notice(),this.pop()}clear(){return this.items=[],this.notice(),this}isEmpty(){return this.items.length===0}get length(){return this.items.length}peek(){return this.items}observe(r,n={}){return this.observers.push({handler:r,once:n.once||!1}),()=>{this.off(r)}}once(r,n={}){return n.once=!0,this.observe(r,n)}onEnd(r,n={}){return this.observe((l,f,y)=>{f===0&&y===0&&r(l,f,y)},n)}notice(){return this.observers.forEach(r=>{r.handler(this,this.length,this.currentRunning)}),this.observers=this.observers.filter(r=>!r.once),this}off(r){return r==null?(this.observers=[],this):(this.observers=this.observers.filter(n=>n.handler!==r),this)}}function ge(i=1){return new he(i)}function ye(){return ge()}function we(i){return i?"$el"in i?i.$el:i:null}function te(i,r){return i.key??(i.key=Q()),i.uploadState??(i.uploadState=N.PENDING),i.progress??(i.progress=0),r&&Object.assign(i,r),i}function z(i){return typeof i=="function"&&(i=t.ref(i())),t.isRef(i)?i:t.ref(i)}function ie(i,r,n={}){const l=z(n.id??"vue-multi-uploader-"+Q()),f=z(n.accept??""),y=z(n.maxFiles),C=z(n.maxConcurrent??2),M=z(n.maxItemSize),_=z(n.disabled??!1),O=z(n.readonly??!1),L=z(r),h=t.computed(()=>z(n.dropzone).value),v=z(n.onDragClass??"h-ondrag"),I=z(n.autoStart??!0);let S=z(i);S.value=S.value.map(e=>te(e,{uploadState:N.UPLOADED}));const Z=ye(),F=le(n);t.watch(C,e=>{Z.maxRunning=e},{immediate:!0});function R(e,...c){return F.emit(e,...c)}function ne(e,c){return F.on(e,c),()=>{F.off(e,c)}}function W(){de(f,H)}t.watch(h,()=>{const e=we(h.value);e&&e instanceof HTMLElement&&re(e)},{immediate:!0});function re(e){fe(e,v,H)}function V(e){return q(T(e))}function T(e){const g=t.reactive(te({key:Q(),url:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",file:e,uploadState:N.PENDING,progress:0}));return g.title=g.title||g.file.name,F.emit("create-item",g),g}function q(e){const c=t.reactive(te({key:Q(),uploadState:N.PENDING,progress:0},e));if(!e.file)return e;if(A(e.file),M.value!=null&&e.file.size>M.value){const D=new ce("File size is too large",e.file,M.value);throw R("invalid-file",D),D}const g=S.value.push(c),w=S.value[g-1];if(a(w)){const D=new FileReader;D.onload=k=>{var b;w.thumbUrl=String((b=k.target)==null?void 0:b.result)},D.readAsDataURL(e.file)}return w}function H(e){Array.prototype.forEach.call(e,A),Array.prototype.forEach.call(e,c=>{if(!u.value)return;const g=V(c);I.value&&d(g)})}function Y(e){var c;if(e instanceof XMLHttpRequest){e.abort();return}(c=e.xhr)==null||c.abort()}function A(e){const c=p.value,g=e.name.split(".").pop();if(c.length){let w=!1;if(c.forEach(D=>{w||(D.indexOf("/")!==-1?$(D,e.type)&&(w=!0):D.toLowerCase()===(g==null?void 0:g.toLowerCase())&&(w=!0))}),!w){const D=new ue("Invalid file type",e,c);throw R("invalid-file",D),D}}}function $(e,c){const g=e.split("/"),w=c.split("/");return g[1]==="*"?g[0]===w[0]:e===c}function G(e){R("delete-item",e),S.value=S.value.filter(c=>c.key!==e.key)}async function K(){const e=[];return S.value.forEach(c=>{c.uploadState===N.PENDING&&e.push(d(c))}),Promise.allSettled(e)}async function d(e){e.uploadState=N.UPLOADING,e.error=void 0;const c=new FormData;return c.append("file",e.file),new Promise((w,D)=>{const k=new XMLHttpRequest;R("item-upload-start",e,k),k.open("POST",L.value),k.upload.onprogress=b=>{b.lengthComputable&&(e.progress=b.loaded/b.total,R("item-upload-progress",e,b))},k.onload=()=>{if(k.status>=200&&k.status<300)try{e.uploadState=N.UPLOADED,R("item-upload-success",e,k),w(e)}catch(b){console.error(b),e.uploadState=N.ERROR,e.error=b,D(b)}else{const b=`Upload failed with status: ${k.status}`;console.error(b),e.uploadState=N.ERROR,e.message=b,e.messageType="error",D(new Error(b))}},k.onerror=()=>{const b="An error occurred during the upload.";console.error(b),e.uploadState=N.ERROR,e.error=new Error(b),D(e.error)},k.onloadend=()=>{R("item-upload-end",e,k)},k.send(c)}).catch(w=>(R("item-upload-fail",e,w),Promise.reject(w)))}function a(e){return s(e.file?e.file.name:e.url)}function s(e){var w;const c=((w=e.split(".").pop())==null?void 0:w.split("?").shift())||"";return["png","jpeg","jpg","gif","bmp","webp"].indexOf(c.toLowerCase())!==-1}const u=t.computed(()=>(y.value==null||S.value.length<Number(y.value))&&!m.value),o=t.computed(()=>S.value.filter(c=>c.uploadState===N.UPLOADING).length>0),p=t.computed(()=>(Array.isArray(f.value)?f.value:f.value.split(",")).map(e=>e.trim()).filter(e=>e.length>0).map(e=>e.indexOf("/")===-1&&e[0]==="."?e.substr(1):e)),m=t.computed(()=>_.value||O.value);t.watch(S,e=>{e.map(c=>{c.key=c.key||Q()}),R("change",S)},{deep:!0}),t.watch(o,e=>{R(e?"uploading":"uploaded")});const E=t.computed(()=>S.value.reduce((e,c)=>(c.file&&(e+=c.file.size),e),0));return{id:l,accept:f,maxFiles:y,maxConcurrent:C,maxItemSize:M,disabled:_,readonly:O,uploadUrl:L,items:S,eventBus:F,canUpload:u,isUploading:o,acceptedTypes:p,isReadonly:m,totalSize:E,emits:R,on:ne,openFileSelector:W,addFile:V,addItem:q,createItem:T,deleteItem:G,uploadStart:K,stopItemUpload:Y,isImageItem:a,isImage:s}}const ve={class:"vue-drag-uploader__wrapper"},$e=t.defineComponent({__name:"MultiUploader",props:t.mergeModels({id:{},uploadUrl:{},placeholder:{},instance:{},options:{default:()=>({})}},{modelValue:{default:()=>[]},modelModifiers:{}}),emits:t.mergeModels(["update:modelValue","change","delete-item","uploading","uploaded","create-item","item-upload-start","item-upload-success","item-upload-fail","item-upload-end","item-upload-progress","invalid-file-type"],["update:modelValue"]),setup(i,{expose:r,emit:n}){const l=i,f=n,y=t.useModel(i,"modelValue"),C=t.ref(y.value);t.watch(y,()=>{C.value=y.value},{deep:!0});const M=t.useTemplateRef("el");l.options.dropzone=l.options.dropzone??M;const _=l.instance??ie(C,l.uploadUrl??"",l.options),{isReadonly:O,items:L}=_;t.watch(L,()=>{y.value=L.value},{deep:!0});const h=[];for(const v in ee){const I=_.on(v,(...S)=>{f(v,...S)});h.push(I)}return t.onUnmounted(()=>{h.forEach(v=>v())}),r({instance:_}),(v,I)=>(t.openBlock(),t.createElementBlock("div",{ref_key:"el",ref:M,class:t.normalizeClass(["vue-drag-uploader",{"vue-drag-uploader--readonly":t.unref(O)}])},[t.createElementVNode("div",ve,[t.renderSlot(v.$slots,"items",{items:t.unref(L),options:v.options,instance:t.reactive(t.unref(_)),onDelete:I[0]||(I[0]=()=>console.log(v.$event))})])],2))}}),Ee={key:1,class:"preview-img__body d-flex flex-column justify-content-center align-items-center gap-2"},Se={style:{width:"calc(var(--vmu-img-size) / 3)",height:"calc(var(--vmu-img-size) / 3)"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 384 512"},Me={style:{"word-break":"break-word"}},be={class:"preview-img__overlay"},De={style:{width:"1rem",height:"1rem",fill:"white"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"},_e={key:2,class:"preview-img__progress"},ke={class:"error-message__message"},Oe=t.defineComponent({__name:"ItemCard",props:{item:{},i:{},size:{default:"150px"},isReadonly:{type:Boolean}},emits:["delete","item-click"],setup(i,{emit:r}){const n=i,l=r,f=t.computed(()=>n.item.uploadState),y=t.computed(()=>n.item.progress);function C(){n.isReadonly||l("delete",n.item)}const M=t.computed(()=>n.item.file?n.item.file.name:n.item.title?n.item.title:n.item.url.split("/").pop()),_=t.computed(()=>O(n.item.file?n.item.file.name:n.item.url));function O(h){var S;const v=((S=h.split(".").pop())==null?void 0:S.split("?").shift())||"";return["png","jpeg","jpg","gif","bmp","webp"].indexOf(v.toLowerCase())!==-1}function L(h){l("item-click",n.item,n.i,h)}return(h,v)=>(t.openBlock(),t.createElementBlock("div",{class:"vue-drag-uploader-item preview-img",style:t.normalizeStyle({"--vmu-img-size":h.size}),onClick:L},[t.renderSlot(h.$slots,"it",{item:h.item},()=>{var I;return[_.value?(t.openBlock(),t.createElementBlock("div",{key:0,class:"preview-img__body",style:t.normalizeStyle({"background-image":"url("+(h.item.thumbUrl||h.item.url)+")",opacity:f.value===t.unref(N).UPLOADED?1:.5})},null,4)):t.createCommentVNode("",!0),_.value?t.createCommentVNode("",!0):(t.openBlock(),t.createElementBlock("div",Ee,[t.createElementVNode("div",null,[t.renderSlot(h.$slots,"icon",{item:h.item},()=>[(t.openBlock(),t.createElementBlock("svg",Se,v[2]||(v[2]=[t.createElementVNode("path",{d:"M320 464c8.8 0 16-7.2 16-16l0-288-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16l256 0zM0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 448c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64z"},null,-1)])))])]),t.createElementVNode("div",Me,t.toDisplayString(M.value),1)])),t.createElementVNode("div",be,[h.isReadonly?t.createCommentVNode("",!0):(t.openBlock(),t.createElementBlock("span",{key:0,class:"preview-img__remove-icon",onClick:v[0]||(v[0]=t.withModifiers(S=>C(),["prevent"]))},[t.renderSlot(h.$slots,"remove-icon",{},()=>[(t.openBlock(),t.createElementBlock("svg",De,v[3]||(v[3]=[t.createElementVNode("path",{d:"M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"},null,-1)])))])])),t.renderSlot(h.$slots,"extra",{item:h.item})]),f.value===t.unref(N).UPLOADING?(t.openBlock(),t.createElementBlock("div",_e,[t.createElementVNode("div",{class:"preview-img__progress-bar",style:t.normalizeStyle({width:y.value*100+"%"})},null,4)])):t.createCommentVNode("",!0),f.value===t.unref(N).ERROR?(t.openBlock(),t.createElementBlock("div",{key:3,class:"preview-img__error-message error-message",onClick:v[1]||(v[1]=t.withModifiers(()=>{},["stop","prevent"]))},[v[4]||(v[4]=t.createElementVNode("span",{class:"error-message__notice"},"Upload fail",-1)),t.createElementVNode("span",ke,t.toDisplayString((I=h.item.error)==null?void 0:I.message),1)])):t.createCommentVNode("",!0)]})],4))}}),Ie={class:"add-button__body"},Ae={class:"add-button__icon"},Le={style:{width:"32px"},xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"},Ce={class:"add-button__text"},Ne=t.defineComponent({__name:"ItemCardPlaceholder",props:{size:{default:"150px"},text:{default:""}},setup(i){return(r,n)=>(t.openBlock(),t.createElementBlock("div",{class:"vue-drag-uploader-item add-button",key:"empty",style:t.normalizeStyle({"--vmu-img-size":r.size})},[t.createElementVNode("div",Ie,[t.renderSlot(r.$slots,"default",{},()=>[t.createElementVNode("div",Ae,[t.renderSlot(r.$slots,"icon",t.normalizeProps(t.guardReactiveProps({size:r.size})),()=>[(t.openBlock(),t.createElementBlock("svg",Le,n[0]||(n[0]=[t.createElementVNode("path",{d:"M288 109.3L288 352c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-242.7-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352l128 0c0 35.3 28.7 64 64 64s64-28.7 64-64l128 0c35.3 0 64 28.7 64 64l0 32c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64l0-32c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"},null,-1)])))])]),t.createElementVNode("div",Ce,t.toDisplayString(r.text),1)])])],4))}});P.ItemCard=Oe,P.ItemCardPlaceholder=Ne,P.MultiUploader=$e,P.UploadState=N,P.useMultiUploader=ie,Object.defineProperty(P,Symbol.toStringTag,{value:"Module"})});
