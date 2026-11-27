"use strict";(()=>{var O1=Object.create;var av=Object.defineProperty;var I1=Object.getOwnPropertyDescriptor;var P1=Object.getOwnPropertyNames;var B1=Object.getPrototypeOf,z1=Object.prototype.hasOwnProperty;var Pi=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var F1=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of P1(t))!z1.call(e,s)&&s!==n&&av(e,s,{get:()=>t[s],enumerable:!(i=I1(t,s))||i.enumerable});return e};var Sr=(e,t,n)=>(n=e!=null?O1(B1(e)):{},F1(t||!e||!e.__esModule?av(n,"default",{value:e,enumerable:!0}):n,e));var mv=Pi(Ce=>{"use strict";function Ld(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Zc(s,t))e[i]=t,e[n]=s,n=i;else break t}}function Bi(e){return e.length===0?null:e[0]}function Jc(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>Zc(o,n))l<s&&0>Zc(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>Zc(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Zc(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}Ce.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(rv=performance,Ce.unstable_now=function(){return rv.now()}):(Dd=Date,ov=Dd.now(),Ce.unstable_now=function(){return Dd.now()-ov});var rv,Dd,ov,ss=[],Os=[],H1=1,ri=null,mn=3,Od=!1,sl=!1,al=!1,Id=!1,uv=typeof setTimeout=="function"?setTimeout:null,hv=typeof clearTimeout=="function"?clearTimeout:null,lv=typeof setImmediate<"u"?setImmediate:null;function Kc(e){for(var t=Bi(Os);t!==null;){if(t.callback===null)Jc(Os);else if(t.startTime<=e)Jc(Os),t.sortIndex=t.expirationTime,Ld(ss,t);else break;t=Bi(Os)}}function Pd(e){if(al=!1,Kc(e),!sl)if(Bi(ss)!==null)sl=!0,Er||(Er=!0,br());else{var t=Bi(Os);t!==null&&Bd(Pd,t.startTime-e)}}var Er=!1,rl=-1,fv=5,dv=-1;function pv(){return Id?!0:!(Ce.unstable_now()-dv<fv)}function Nd(){if(Id=!1,Er){var e=Ce.unstable_now();dv=e;var t=!0;try{t:{sl=!1,al&&(al=!1,hv(rl),rl=-1),Od=!0;var n=mn;try{e:{for(Kc(e),ri=Bi(ss);ri!==null&&!(ri.expirationTime>e&&pv());){var i=ri.callback;if(typeof i=="function"){ri.callback=null,mn=ri.priorityLevel;var s=i(ri.expirationTime<=e);if(e=Ce.unstable_now(),typeof s=="function"){ri.callback=s,Kc(e),t=!0;break e}ri===Bi(ss)&&Jc(ss),Kc(e)}else Jc(ss);ri=Bi(ss)}if(ri!==null)t=!0;else{var a=Bi(Os);a!==null&&Bd(Pd,a.startTime-e),t=!1}}break t}finally{ri=null,mn=n,Od=!1}t=void 0}}finally{t?br():Er=!1}}}var br;typeof lv=="function"?br=function(){lv(Nd)}:typeof MessageChannel<"u"?(Ud=new MessageChannel,cv=Ud.port2,Ud.port1.onmessage=Nd,br=function(){cv.postMessage(null)}):br=function(){uv(Nd,0)};var Ud,cv;function Bd(e,t){rl=uv(function(){e(Ce.unstable_now())},t)}Ce.unstable_IdlePriority=5;Ce.unstable_ImmediatePriority=1;Ce.unstable_LowPriority=4;Ce.unstable_NormalPriority=3;Ce.unstable_Profiling=null;Ce.unstable_UserBlockingPriority=2;Ce.unstable_cancelCallback=function(e){e.callback=null};Ce.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):fv=0<e?Math.floor(1e3/e):5};Ce.unstable_getCurrentPriorityLevel=function(){return mn};Ce.unstable_next=function(e){switch(mn){case 1:case 2:case 3:var t=3;break;default:t=mn}var n=mn;mn=t;try{return e()}finally{mn=n}};Ce.unstable_requestPaint=function(){Id=!0};Ce.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=mn;mn=e;try{return t()}finally{mn=n}};Ce.unstable_scheduleCallback=function(e,t,n){var i=Ce.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:H1++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Ld(Os,e),Bi(ss)===null&&e===Bi(Os)&&(al?(hv(rl),rl=-1):al=!0,Bd(Pd,n-i))):(e.sortIndex=s,Ld(ss,e),sl||Od||(sl=!0,Er||(Er=!0,br()))),e};Ce.unstable_shouldYield=pv;Ce.unstable_wrapCallback=function(e){var t=mn;return function(){var n=mn;mn=t;try{return e.apply(this,arguments)}finally{mn=n}}}});var vv=Pi((VD,gv)=>{"use strict";gv.exports=mv()});var Dv=Pi(Lt=>{"use strict";var Hd=Symbol.for("react.transitional.element"),V1=Symbol.for("react.portal"),G1=Symbol.for("react.fragment"),k1=Symbol.for("react.strict_mode"),X1=Symbol.for("react.profiler"),W1=Symbol.for("react.consumer"),q1=Symbol.for("react.context"),Y1=Symbol.for("react.forward_ref"),Z1=Symbol.for("react.suspense"),K1=Symbol.for("react.memo"),Sv=Symbol.for("react.lazy"),J1=Symbol.for("react.activity"),Q1=Symbol.for("react.view_transition"),_v=Symbol.iterator;function j1(e){return e===null||typeof e!="object"?null:(e=_v&&e[_v]||e["@@iterator"],typeof e=="function"?e:null)}var bv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Ev=Object.assign,Tv={};function Ar(e,t,n){this.props=e,this.context=t,this.refs=Tv,this.updater=n||bv}Ar.prototype.isReactComponent={};Ar.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Ar.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Av(){}Av.prototype=Ar.prototype;function Vd(e,t,n){this.props=e,this.context=t,this.refs=Tv,this.updater=n||bv}var Gd=Vd.prototype=new Av;Gd.constructor=Vd;Ev(Gd,Ar.prototype);Gd.isPureReactComponent=!0;var yv=Array.isArray;function Fd(){}var xe={H:null,A:null,T:null,S:null},wv=Object.prototype.hasOwnProperty;function kd(e,t,n){var i=n.ref;return{$$typeof:Hd,type:e,key:t,ref:i!==void 0?i:null,props:n}}function $1(e,t){return kd(e.type,t,e.props)}function Xd(e){return typeof e=="object"&&e!==null&&e.$$typeof===Hd}function tE(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var xv=/\/+/g;function zd(e,t){return typeof e=="object"&&e!==null&&e.key!=null?tE(""+e.key):t.toString(36)}function eE(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Fd,Fd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Tr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Hd:case V1:r=!0;break;case Sv:return r=e._init,Tr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+zd(e,0):i,yv(s)?(n="",r!=null&&(n=r.replace(xv,"$&/")+"/"),Tr(s,t,n,"",function(c){return c})):s!=null&&(Xd(s)&&(s=$1(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(xv,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(yv(e))for(var l=0;l<e.length;l++)i=e[l],a=o+zd(i,l),r+=Tr(i,t,n,a,s);else if(l=j1(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+zd(i,l++),r+=Tr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return Tr(eE(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Qc(e,t,n){if(e==null)return e;var i=[],s=0;return Tr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function nE(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Mv=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Rv(e){var t=xe.T,n={};n.types=t!==null?t.types:null,xe.T=n;try{var i=e(),s=xe.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Fd,Mv)}catch(a){Mv(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),xe.T=t}}function Cv(e){var t=xe.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Rv(Cv.bind(null,e))}var iE={map:Qc,forEach:function(e,t,n){Qc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Qc(e,function(){t++}),t},toArray:function(e){return Qc(e,function(t){return t})||[]},only:function(e){if(!Xd(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Lt.Activity=J1;Lt.Children=iE;Lt.Component=Ar;Lt.Fragment=G1;Lt.Profiler=X1;Lt.PureComponent=Vd;Lt.StrictMode=k1;Lt.Suspense=Z1;Lt.ViewTransition=Q1;Lt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=xe;Lt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return xe.H.useMemoCache(e)}};Lt.addTransitionType=Cv;Lt.cache=function(e){return function(){return e.apply(null,arguments)}};Lt.cacheSignal=function(){return null};Lt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Ev({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!wv.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return kd(e.type,s,i)};Lt.createContext=function(e){return e={$$typeof:q1,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:W1,_context:e},e};Lt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)wv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return kd(e,a,s)};Lt.createRef=function(){return{current:null}};Lt.forwardRef=function(e){return{$$typeof:Y1,render:e}};Lt.isValidElement=Xd;Lt.lazy=function(e){return{$$typeof:Sv,_payload:{_status:-1,_result:e},_init:nE}};Lt.memo=function(e,t){return{$$typeof:K1,type:e,compare:t===void 0?null:t}};Lt.startTransition=Rv;Lt.unstable_useCacheRefresh=function(){return xe.H.useCacheRefresh()};Lt.use=function(e){return xe.H.use(e)};Lt.useActionState=function(e,t,n){return xe.H.useActionState(e,t,n)};Lt.useCallback=function(e,t){return xe.H.useCallback(e,t)};Lt.useContext=function(e){return xe.H.useContext(e)};Lt.useDebugValue=function(){};Lt.useDeferredValue=function(e,t){return xe.H.useDeferredValue(e,t)};Lt.useEffect=function(e,t){return xe.H.useEffect(e,t)};Lt.useEffectEvent=function(e){return xe.H.useEffectEvent(e)};Lt.useId=function(){return xe.H.useId()};Lt.useImperativeHandle=function(e,t,n){return xe.H.useImperativeHandle(e,t,n)};Lt.useInsertionEffect=function(e,t){return xe.H.useInsertionEffect(e,t)};Lt.useLayoutEffect=function(e,t){return xe.H.useLayoutEffect(e,t)};Lt.useMemo=function(e,t){return xe.H.useMemo(e,t)};Lt.useOptimistic=function(e,t){return xe.H.useOptimistic(e,t)};Lt.useReducer=function(e,t,n){return xe.H.useReducer(e,t,n)};Lt.useRef=function(e){return xe.H.useRef(e)};Lt.useState=function(e){return xe.H.useState(e)};Lt.useSyncExternalStore=function(e,t,n){return xe.H.useSyncExternalStore(e,t,n)};Lt.useTransition=function(){return xe.H.useTransition()};Lt.version="19.3.0"});var jc=Pi((kD,Nv)=>{"use strict";Nv.exports=Dv()});var Ov=Pi(gn=>{"use strict";var sE=jc();function Lv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Is(){}var bn={d:{f:Is,r:function(){throw Error(Lv(522))},D:Is,C:Is,L:Is,m:Is,X:Is,S:Is,M:Is},p:0,findDOMNode:null},aE=Symbol.for("react.portal"),rE=Symbol.for("react.recoverable"),Uv=Symbol.for("react.optimistic_key");function oE(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:aE,key:i==null?null:i===Uv?Uv:""+i,children:e,containerInfo:t,implementation:n}}var ol=sE.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function $c(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}gn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=bn;gn.browser=function(e){return{$$typeof:rE,_reason:e}};gn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(Lv(299));return oE(e,t,null,n)};gn.flushSync=function(e){var t=ol.T,n=bn.p;try{if(ol.T=null,bn.p=2,e)return e()}finally{ol.T=t,bn.p=n,bn.d.f()}};gn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,bn.d.C(e,t))};gn.prefetchDNS=function(e){typeof e=="string"&&bn.d.D(e)};gn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=$c(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?bn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&bn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};gn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=$c(t.as,t.crossOrigin);bn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&bn.d.M(e)};gn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=$c(n,t.crossOrigin);bn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};gn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=$c(t.as,t.crossOrigin);bn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else bn.d.m(e)};gn.requestFormReset=function(e){bn.d.r(e)};gn.unstable_batchedUpdates=function(e,t){return e(t)};gn.useFormState=function(e,t,n){return ol.H.useFormState(e,t,n)};gn.useFormStatus=function(){return ol.H.useHostTransitionStatus()};gn.version="19.3.0"});var Bv=Pi((WD,Pv)=>{"use strict";function Iv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Iv)}catch(e){console.error(e)}}Iv(),Pv.exports=Ov()});var bS=Pi(Oh=>{"use strict";var qe=vv(),Sy=jc(),lE=Bv();function W(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function by(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Zl(e){for(var t=e,n=t;n&&!n.alternate;)t=n,(t.flags&4098)!==0&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function Ey(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ty(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function zv(e){if(Zl(e)!==e)throw Error(W(188))}function cE(e){var t=e.alternate;if(!t){if(t=Zl(e),t===null)throw Error(W(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return zv(s),e;if(a===i)return zv(s),t;a=a.sibling}throw Error(W(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(W(189))}}if(n.alternate!==i)throw Error(W(190))}if(n.tag!==3)throw Error(W(188));return n.stateNode.current===n?e:t}function Ay(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Ay(e),t!==null)return t;e=e.sibling}return null}function zn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&zn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function Ka(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function Fv(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function wy(e){var t=[null,null],n=Ka(e);return n===null||Ry(t,e,n.child,{foundSelf:!1}),t}function Ry(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Ry(e,t,n.child,i))return!0;n=n.sibling}return!1}function We(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(W(559))}}var Lr=null,Sp=null;function uE(e,t,n){return e===n?!0:e===t?(Lr=e,!0):!1}function hE(e,t,n){return e===n?(Sp=e,!1):e===t?(Sp!==null&&(Lr=e),!0):!1}function Hv(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function bp(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var ve=Object.assign,fE=Symbol.for("react.element"),tu=Symbol.for("react.transitional.element"),pl=Symbol.for("react.portal"),Or=Symbol.for("react.fragment"),Cy=Symbol.for("react.strict_mode"),Ep=Symbol.for("react.profiler"),Dy=Symbol.for("react.consumer"),ki=Symbol.for("react.context"),Lm=Symbol.for("react.forward_ref"),Tp=Symbol.for("react.suspense"),Ap=Symbol.for("react.suspense_list"),Om=Symbol.for("react.memo"),Fs=Symbol.for("react.lazy"),wp=Symbol.for("react.activity"),dE=Symbol.for("react.legacy_hidden"),pE=Symbol.for("react.memo_cache_sentinel"),Rp=Symbol.for("react.view_transition"),mE=Symbol.for("react.recoverable"),Vv=Symbol.iterator;function ll(e){return e===null||typeof e!="object"?null:(e=Vv&&e[Vv]||e["@@iterator"],typeof e=="function"?e:null)}var gE=Symbol.for("react.client.reference");function Cp(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===gE?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Or:return"Fragment";case Ep:return"Profiler";case Cy:return"StrictMode";case Tp:return"Suspense";case Ap:return"SuspenseList";case wp:return"Activity";case Rp:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case pl:return"Portal";case ki:return e.displayName||"Context";case Dy:return(e._context.displayName||"Context")+".Consumer";case Lm:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Om:return t=e.displayName||null,t!==null?t:Cp(e.type)||"Memo";case Fs:t=e._payload,e=e._init;try{return Cp(e(t))}catch{}}return null}var ml=Array.isArray,Ct=Sy.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ie=lE.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Pa={pending:!1,data:null,method:null,action:null},Dp=[],Ir=-1;function Ji(e){return{current:e}}function rn(e){0>Ir||(e.current=Dp[Ir],Dp[Ir]=null,Ir--)}function be(e,t){Ir++,Dp[Ir]=e.current,e.current=t}var Yi=Ji(null),Ul=Ji(null),Zs=Ji(null),Hu=Ji(null);function Vu(e,t){switch(be(Zs,t),be(Ul,e),be(Yi,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?ey(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=ey(t),e=jM(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}rn(Yi),be(Yi,e)}function eo(){rn(Yi),rn(Ul),rn(Zs)}function Np(e){var t=e.memoizedState;t!==null&&(ho._currentValue=t.memoizedState,be(Hu,e)),t=Yi.current;var n=jM(t,e.type);t!==n&&(be(Ul,e),be(Yi,n))}function Gu(e){Ul.current===e&&(rn(Yi),rn(Ul)),Hu.current===e&&(rn(Hu),ho._currentValue=Pa)}var Wd,Gv;function Bs(e){if(Wd===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Wd=t&&t[1]||"",Gv=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Wd+e+Gv}var qd=!1;function Yd(e,t){if(!e||qd)return"";qd=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var d=function(){throw Error()};if(Object.defineProperty(d.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(d,[])}catch(v){var h=v}Reflect.construct(e,[],d)}else{try{d.call()}catch(v){h=v}d=!1;try{var p=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),d=!0,new e}finally{d&&(p!==void 0?Object.defineProperty(e.prototype,"props",p):delete e.prototype.props)}}}else{try{throw Error()}catch(v){h=v}(d=e())&&typeof d.catch=="function"&&d.catch(function(){})}}catch(v){if(v&&h&&typeof v.stack=="string")return[v.stack,h.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var f=`
`+l[i].replace(" at new "," at ");return e.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",e.displayName)),f}while(1<=i&&0<=s);break}}}finally{qd=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Bs(n):""}function vE(e,t){switch(e.tag){case 26:case 27:case 5:return Bs(e.type);case 16:return Bs("Lazy");case 13:return e.child!==t&&t!==null?Bs("Suspense Fallback"):Bs("Suspense");case 19:return Bs("SuspenseList");case 0:case 15:return Yd(e.type,!1);case 11:return Yd(e.type.render,!1);case 1:return Yd(e.type,!0);case 31:return Bs("Activity");case 30:return Bs("ViewTransition");default:return""}}function kv(e){try{var t="",n=null;do t+=vE(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Up=Object.prototype.hasOwnProperty,Im=qe.unstable_scheduleCallback,Zd=qe.unstable_cancelCallback,_E=qe.unstable_shouldYield,yE=qe.unstable_requestPaint,Zn=qe.unstable_now,xE=qe.unstable_getCurrentPriorityLevel,Ny=qe.unstable_ImmediatePriority,Uy=qe.unstable_UserBlockingPriority,ku=qe.unstable_NormalPriority,ME=qe.unstable_LowPriority,Ly=qe.unstable_IdlePriority,SE=qe.log,bE=qe.unstable_setDisableYieldValue,Kl=null,Kn=null;function Gs(e){if(typeof SE=="function"&&bE(e),Kn&&typeof Kn.setStrictMode=="function")try{Kn.setStrictMode(Kl,e)}catch{}}var Jn=Math.clz32?Math.clz32:AE,EE=Math.log,TE=Math.LN2;function AE(e){return e>>>=0,e===0?32:31-(EE(e)/TE|0)|0}var eu=256,nu=262144,iu=4194304;function Na(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function mh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=Na(i):(r&=o,r!==0?s=Na(r):n||(n=o&~e,n!==0&&(s=Na(n))))):(o=i&~a,o!==0?s=Na(o):r!==0?s=Na(r):n||(n=i&~e,n!==0&&(s=Na(n)))),s===0?0:t!==0&&t!==s&&(t&a)===0&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function Jl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Oy(e,t){(t&8)!==0&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-Jn(n),s=1<<i;t|=e[i],n&=~s}return t}function wE(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Iy(){var e=iu;return iu<<=1,(iu&62914560)===0&&(iu=4194304),e}function Kd(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Ql(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function RE(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var f=31-Jn(n),d=1<<f;o[f]=0,l[f]=-1;var h=c[f];if(h!==null)for(c[f]=null,f=0;f<h.length;f++){var p=h[f];p!==null&&(p.lane&=-536870913)}n&=~d}i!==0&&Py(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function Py(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-Jn(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function By(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-Jn(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function zy(e,t){var n=t&-t;return n=(n&42)!==0?1:Pm(n),(n&(e.suspendedLanes|t))!==0?0:n}function Pm(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Bm(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function Fy(){var e=ie.p;return e!==0?e:(e=window.event,e===void 0?32:xS(e.type))}function Xv(e,t){var n=ie.p;try{return ie.p=e,t()}finally{ie.p=n}}var vs=Math.random().toString(36).slice(2),sn="__reactFiber$"+vs,Fn="__reactProps$"+vs,mo="__reactContainer$"+vs,Wv="__reactEvents$"+vs,CE="__reactListeners$"+vs,DE="__reactHandles$"+vs,qv="__reactResources$"+vs,jl="__reactMarker$"+vs,Xu="__reactLoad$"+vs;function gh(e){delete e[sn],delete e[Fn],delete e[CE],delete e[DE]}function Oa(e){var t;if(t=e[sn])return t;for(var n=e.parentNode;n;){if(t=n[mo]||n[sn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=cy(e);e!==null;){if(n=e[sn])return n;e=cy(e)}return t}e=n,n=e.parentNode}return null}function go(e){if(e=e[sn]||e[mo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function gl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(W(33))}function Wr(e){var t=e[qv];return t||(t=e[qv]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function je(e){e[jl]=!0}function Hy(e){e[Xu]=void 0}var Vy=new Set,Gy={};function Ja(e,t){no(e,t),no(e+"Capture",t)}function no(e,t){for(Gy[e]=t,e=0;e<t.length;e++)Vy.add(t[e])}var NE=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Yv={},Zv={};function UE(e){return Up.call(Zv,e)?!0:Up.call(Yv,e)?!1:NE.test(e)?Zv[e]=!0:(Yv[e]=!0,!1)}var ee=!1;function Kv(){var e=ee;return ee=!1,e}function Mu(e,t,n){if(UE(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function su(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function as(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Xn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function ky(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function LE(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Lp(e){if(!e._valueTracker){var t=ky(e)?"checked":"value";e._valueTracker=LE(e,t,""+e[t])}}function Xy(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=ky(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var OE=/[\n"\\]/g;function hi(e){return e.replace(OE,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Op(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Xn(t)):e.value!==""+Xn(t)&&(e.value=""+Xn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?Jd(e,Xn(e.value)):Jd(e,Xn(t)):n!=null?Jd(e,Xn(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Xn(o):e.removeAttribute("name")}function Wy(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Lp(e);return}n=n!=null?""+Xn(n):"",t=t!=null?""+Xn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Lp(e)}function Jd(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function qr(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Xn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function qy(e,t,n){if(t!=null&&(t=""+Xn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Xn(n):""}function Yy(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(W(92));if(ml(i)){if(1<i.length)throw Error(W(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Xn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Lp(e)}function io(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var IE=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Jv(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||IE.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Zy(e,t,n){if(t!=null&&typeof t!="object")throw Error(W(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",ee=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(Jv(e,s,i),ee=!0)}else for(var a in t)t.hasOwnProperty(a)&&Jv(e,a,t[a])}function zm(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var PE=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),BE=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Su(e){return BE.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Xi(){}var Ip=null;function Fm(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Pr=null,Yr=null;function Qv(e){var t=go(e);if(t&&(e=t.stateNode)){var n=e[Fn]||null;t:switch(e=t.stateNode,t.type){case"input":if(Op(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+hi(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Fn]||null;if(!s)throw Error(W(90));Op(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&Xy(i)}break t;case"textarea":qy(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&qr(e,!!n.multiple,t,!1)}}}var Qd=!1;function Ky(e,t,n){if(Qd)return e(t,n);Qd=!0;try{var i=e(t);return i}finally{if(Qd=!1,(Pr!==null||Yr!==null)&&(Dh(),Pr&&(t=Pr,e=Yr,Yr=Pr=null,Qv(t),e)))for(t=0;t<e.length;t++)Qv(e[t])}}function Ll(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Fn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(W(231,t,typeof n));return n}var hs=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Pp=!1;if(hs)try{wr={},Object.defineProperty(wr,"passive",{get:function(){Pp=!0}}),window.addEventListener("test",wr,wr),window.removeEventListener("test",wr,wr)}catch{Pp=!1}var wr,ks=null,Hm=null,bu=null;function Jy(){if(bu)return bu;var e,t=Hm,n=t.length,i,s="value"in ks?ks.value:ks.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return bu=s.slice(e,1<i?1-i:void 0)}function Eu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function au(){return!0}function jv(){return!1}function wn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?au:jv,this.isPropagationStopped=jv,this}return ve(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=au)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=au)},persist:function(){},isPersistent:au}),t}var ca={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},vh=wn(ca),$l=ve({},ca,{view:0,detail:0}),zE=wn($l),jd,$d,cl,_h=ve({},$l,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Vm,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==cl&&(cl&&e.type==="mousemove"?(jd=e.screenX-cl.screenX,$d=e.screenY-cl.screenY):$d=jd=0,cl=e),jd)},movementY:function(e){return"movementY"in e?e.movementY:$d}}),$v=wn(_h),FE=ve({},_h,{dataTransfer:0}),HE=wn(FE),VE=ve({},$l,{relatedTarget:0}),tp=wn(VE),GE=ve({},ca,{animationName:0,elapsedTime:0,pseudoElement:0}),kE=wn(GE),XE=ve({},ca,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),WE=wn(XE),qE=ve({},ca,{data:0}),t_=wn(qE),YE={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ZE={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},KE={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function JE(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=KE[e])?!!t[e]:!1}function Vm(){return JE}var QE=ve({},$l,{key:function(e){if(e.key){var t=YE[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Eu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?ZE[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Vm,charCode:function(e){return e.type==="keypress"?Eu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Eu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),jE=wn(QE),$E=ve({},_h,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),e_=wn($E),tT=ve({},ca,{submitter:0}),eT=wn(tT),nT=ve({},$l,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Vm}),iT=wn(nT),sT=ve({},ca,{propertyName:0,elapsedTime:0,pseudoElement:0}),aT=wn(sT),rT=ve({},_h,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),oT=wn(rT),lT=ve({},ca,{newState:0,oldState:0,source:0}),cT=wn(lT),uT=[9,13,27,32],Gm=hs&&"CompositionEvent"in window,yl=null;hs&&"documentMode"in document&&(yl=document.documentMode);var hT=hs&&"TextEvent"in window&&!yl,Qy=hs&&(!Gm||yl&&8<yl&&11>=yl),n_=" ",i_=!1;function jy(e,t){switch(e){case"keyup":return uT.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $y(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Br=!1;function fT(e,t){switch(e){case"compositionend":return $y(t);case"keypress":return t.which!==32?null:(i_=!0,n_);case"textInput":return e=t.data,e===n_&&i_?null:e;default:return null}}function dT(e,t){if(Br)return e==="compositionend"||!Gm&&jy(e,t)?(e=Jy(),bu=Hm=ks=null,Br=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Qy&&t.locale!=="ko"?null:t.data;default:return null}}var pT={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function s_(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!pT[e.type]:t==="textarea"}function tx(e,t,n,i){Pr?Yr?Yr.push(i):Yr=[i]:Pr=i,t=fh(t,"onChange"),0<t.length&&(n=new vh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var xl=null,Ol=null;function mT(e){KM(e,0)}function yh(e){var t=gl(e);if(Xy(t))return e}function a_(e,t){if(e==="change")return t}var ex=!1;hs&&(hs?(ou="oninput"in document,ou||(ep=document.createElement("div"),ep.setAttribute("oninput","return;"),ou=typeof ep.oninput=="function"),ru=ou):ru=!1,ex=ru&&(!document.documentMode||9<document.documentMode));var ru,ou,ep;function r_(){xl&&(xl.detachEvent("onpropertychange",nx),Ol=xl=null)}function nx(e){if(e.propertyName==="value"&&yh(Ol)){var t=[];tx(t,Ol,e,Fm(e)),Ky(mT,t)}}function gT(e,t,n){e==="focusin"?(r_(),xl=t,Ol=n,xl.attachEvent("onpropertychange",nx)):e==="focusout"&&r_()}function vT(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return yh(Ol)}function _T(e,t){if(e==="click")return yh(t)}function yT(e,t){if(e==="input"||e==="change")return yh(t)}function xT(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var jn=typeof Object.is=="function"?Object.is:xT;function Il(e,t){if(jn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Up.call(t,s)||!jn(e[s],t[s]))return!1}return!0}function Bp(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function o_(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function l_(e,t){var n=o_(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=o_(n)}}function ix(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ix(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function sx(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Bp(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Bp(e.document)}return t}function km(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var MT=hs&&"documentMode"in document&&11>=document.documentMode,zr=null,zp=null,Ml=null,Fp=!1;function c_(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Fp||zr==null||zr!==Bp(i)||(i=zr,"selectionStart"in i&&km(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Ml&&Il(Ml,i)||(Ml=i,i=fh(zp,"onSelect"),0<i.length&&(t=new vh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=zr)))}function Ca(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Fr={animationend:Ca("Animation","AnimationEnd"),animationiteration:Ca("Animation","AnimationIteration"),animationstart:Ca("Animation","AnimationStart"),transitionrun:Ca("Transition","TransitionRun"),transitionstart:Ca("Transition","TransitionStart"),transitioncancel:Ca("Transition","TransitionCancel"),transitionend:Ca("Transition","TransitionEnd")},np={},ax={};hs&&(ax=document.createElement("div").style,"AnimationEvent"in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),"TransitionEvent"in window||delete Fr.transitionend.transition);function Qa(e){if(np[e])return np[e];if(!Fr[e])return e;var t=Fr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ax)return np[e]=t[n];return e}var rx=Qa("animationend"),ox=Qa("animationiteration"),lx=Qa("animationstart"),ST=Qa("transitionrun"),bT=Qa("transitionstart"),ET=Qa("transitioncancel"),cx=Qa("transitionend"),ux=new Map,Hp="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Hp.push("scrollEnd");function Ai(e,t){ux.set(e,t),Ja(t,[e])}var TT=0;function fs(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Ti.identifierPrefix;var n=TT++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function u_(e){if(e==null||typeof e=="string")return e;var t=null,n=to;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function _s(e,t){return e=u_(e),t=u_(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var Wu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},li=[],Hr=0,Xm=0;function xh(){for(var e=Hr,t=Xm=Hr=0;t<e;){var n=li[t];li[t++]=null;var i=li[t];li[t++]=null;var s=li[t];li[t++]=null;var a=li[t];if(li[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&hx(n,s,a)}}function Mh(e,t,n,i){li[Hr++]=e,li[Hr++]=t,li[Hr++]=n,li[Hr++]=i,Xm|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Wm(e,t,n,i){return Mh(e,t,n,i),qu(e)}function ja(e,t){return Mh(e,null,null,t),qu(e)}function hx(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-Jn(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function qu(e){if(50<Nl)throw Nl=0,Ou=null,Error(W(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Vr={};function AT(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pn(e,t,n,i){return new AT(e,t,n,i)}function qm(e){return e=e.prototype,!(!e||!e.isReactComponent)}function cs(e,t){var n=e.alternate;return n===null?(n=Pn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function fx(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Tu(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")qm(i)&&(r=1);else if(typeof i=="string")r=jA(e,n,Yi.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case wp:return e=Pn(31,n,t,s),e.elementType=wp,e.lanes=a,e;case Or:return Ba(n.children,s,a,t);case Cy:r=8,s|=24;break;case Ep:return e=Pn(12,n,t,s|2),e.elementType=Ep,e.lanes=a,e;case Tp:return e=Pn(13,n,t,s),e.elementType=Tp,e.lanes=a,e;case Ap:return e=Pn(19,n,t,s),e.elementType=Ap,e.lanes=a,e;case dE:case Rp:return e=s|32,e=Pn(30,n,t,e),e.elementType=Rp,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case ki:r=10;break t;case Dy:r=9;break t;case Lm:r=11;break t;case Om:r=14;break t;case Fs:r=16,i=null;break t}r=29,n=Error(W(130,e===null?"null":typeof e,"")),i=null}return t=Pn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Ba(e,t,n,i){return e=Pn(7,e,i,t),e.lanes=n,e}function ip(e,t,n){return e=Pn(6,e,null,t),e.lanes=n,e}function dx(e){var t=Pn(18,null,null,0);return t.stateNode=e,t}function sp(e,t,n){return t=Pn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var h_=new WeakMap;function fi(e,t){if(typeof e=="object"&&e!==null){var n=h_.get(e);return n!==void 0?n:(t={value:e,source:t,stack:kv(t)},h_.set(e,t),t)}return{value:e,source:t,stack:kv(t)}}var Gr=[],kr=0,Yu=null,Pl=0,ci=[],ui=0,sa=null,Wi=1,qi="";function os(e,t){Gr[kr++]=Pl,Gr[kr++]=Yu,Yu=e,Pl=t}function px(e,t,n){ci[ui++]=Wi,ci[ui++]=qi,ci[ui++]=sa,sa=e;var i=Wi;e=qi;var s=32-Jn(i)-1;i&=~(1<<s),n+=1;var a=32-Jn(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,Wi=1<<32-Jn(t)+s|n<<s|i,qi=a+e}else Wi=1<<a|n<<s|i,qi=e}function Sh(e){e.return!==null&&(os(e,1),px(e,1,0))}function Ym(e){for(;e===Yu;)Yu=Gr[--kr],Gr[kr]=null,Pl=Gr[--kr],Gr[kr]=null;for(;e===sa;)sa=ci[--ui],ci[ui]=null,qi=ci[--ui],ci[ui]=null,Wi=ci[--ui],ci[ui]=null}function mx(e,t){ci[ui++]=Wi,ci[ui++]=qi,ci[ui++]=sa,Wi=t.id,qi=t.overflow,sa=e}var $e=null,Se=null,Gt=!1,Ks=null,di=!1,Vp=Error(W(519));function aa(e){var t=Error(W(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Bl(fi(t,e)),Vp}function f_(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[sn]=e,t[Fn]=i,n){case"dialog":qt("cancel",t),qt("close",t);break;case"iframe":case"object":case"embed":qt("load",t);break;case"video":case"audio":for(n=0;n<Vl.length;n++)qt(Vl[n],t);break;case"source":qt("error",t);break;case"img":case"image":case"link":qt("error",t),qt("load",t);break;case"details":qt("toggle",t);break;case"input":qt("invalid",t),Wy(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":qt("invalid",t);break;case"textarea":qt("invalid",t),Yy(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||QM(t.textContent,n)?(i.popover!=null&&(qt("beforetoggle",t),qt("toggle",t)),i.onScroll!=null&&qt("scroll",t),i.onScrollEnd!=null&&qt("scrollend",t),i.onClick!=null&&(t.onclick=Xi),t=!0):t=!1,t||aa(e,!0)}function Zu(e){for($e=e.return;$e;)switch($e.tag){case 5:case 31:case 13:di=!1;return;case 27:case 3:di=!0;return;default:$e=$e.return}}function Rr(e){if(e!==$e)return!1;if(!Gt)return Zu(e),Gt=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Tm(e.type,e.memoizedProps)),n=!n),n&&Se&&aa(e),Zu(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(W(317));Se=ly(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(W(317));Se=ly(e)}else t===27?(t=Se,ua(e.type)?(e=Cm,Cm=null,Se=e):Se=t):Se=$e?pi(e.stateNode.nextSibling):null;return!0}function Va(){Se=$e=null,Gt=!1}function ap(){var e=Ks;return e!==null&&(On===null?On=e:On.push.apply(On,e),Ks=null),e}function Bl(e){Ks===null?Ks=[e]:Ks.push(e)}var Gp=Ji(null),$a=null,ls=null;function Xs(e,t,n){be(Gp,t._currentValue),t._currentValue=n}function us(e){e._currentValue=Gp.current,rn(Gp)}function Au(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function kp(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),Au(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(W(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),Au(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),Au(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function Ga(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if((s.flags&524288)!==0)a=!0;else if((s.flags&262144)!==0)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(W(387));if(r=r.memoizedProps,r!==null){var o=s.type;jn(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===Hu.current){if(r=s.alternate,r===null)throw Error(W(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(ho):e=[ho])}s=s.return}return e!==null&&kp(t,e,n,i),t.flags|=262144,e!==null}function Ku(e){for(e=e.firstContext;e!==null;){if(!jn(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ka(e){$a=e,ls=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function an(e){return gx($a,e)}function lu(e,t){return $a===null&&ka(e),gx(e,t)}function gx(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ls===null){if(e===null)throw Error(W(308));ls=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ls=ls.next=t;return n}var wT=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},RT=qe.unstable_scheduleCallback,CT=qe.unstable_NormalPriority,Ve={$$typeof:ki,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Zm(){return{controller:new wT,data:new Map,refCount:0}}function tc(e){e.refCount--,e.refCount===0&&RT(CT,function(){e.controller.abort()})}function d_(e,t){if((e.pendingLanes&4194048)!==0){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var vl=null;function DT(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Sl=null,Xp=0,Xa=0,Zr=null;function NT(e,t){if(Sl===null){var n=Sl=[];Xp=0,Xa=S0(),Zr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Xp++,t.then(p_,p_),t}function p_(){if(--Xp===0&&(vl=null,Sl!==null)){Zr!==null&&(Zr.status="fulfilled");var e=Sl;Sl=null,Xa=0,Zr=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function UT(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var m_=Ct.S;Ct.S=function(e,t){if(OM=Zn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&NT(e,t),vl!==null)for(var n=lo;n!==null;)d_(n,vl),n=n.next;if(n=e.types,n!==null){for(var i=lo;i!==null;)d_(i,n),i=i.next;if(Xa!==0){i=vl,i===null&&(i=vl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}m_!==null&&m_(e,t)};var za=Ji(null);function Km(){var e=za.current;return e!==null?e:ge.pooledCache}function wu(e,t){t===null?be(za,za.current):be(za,t.pool)}function vx(){var e=Km();return e===null?null:{parent:Ve._currentValue,pool:e}}var vo=Error(W(460)),Jm=Error(W(474)),bh=Error(W(542)),Ju={then:function(){}};function g_(e){return e=e.status,e==="fulfilled"||e==="rejected"}function _x(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Xi,Xi),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,__(e),e===void 0&&!("reason"in t)?Error(W(600)):e;default:if(typeof t.status=="string")t.then(Xi,Xi);else{if(e=ge,e!==null&&100<e.shellSuspendCounter)throw Error(W(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,__(e),e}throw Fa=t,vo}}function Ua(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Fa=n,vo):n}}var Fa=null;function v_(){if(Fa===null)throw Error(W(459));var e=Fa;return Fa=null,e}function __(e){if(e===vo||e===bh)throw Error(W(483))}var Kr=null,zl=0;function cu(e){var t=zl;return zl+=1,Kr===null&&(Kr=[]),_x(Kr,e,t)}function Ps(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function uu(e,t){throw t.$$typeof===fE?Error(W(525)):(e=Object.prototype.toString.call(t),Error(W(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function yx(e){function t(u,m){if(e){var _=u.deletions;_===null?(u.deletions=[m],u.flags|=16):_.push(m)}}function n(u,m){if(!e)return null;for(;m!==null;)t(u,m),m=m.sibling;return null}function i(u){for(var m=new Map;u!==null;)u.key===null?m.set(u.index,u):m.set(u.key,u),u=u.sibling;return m}function s(u,m){return u=cs(u,m),u.index=0,u.sibling=null,u}function a(u,m,_){return u.index=_,e?(_=u.alternate,_!==null?(_=_.index,_<m?(u.flags|=2,m):_):(u.flags|=134217730,m)):(u.flags|=1048576,m)}function r(u){return e&&u.alternate===null&&(u.flags|=134217730),u}function o(u,m,_,y){return m===null||m.tag!==6?(m=ip(_,u.mode,y),m.return=u,m):(m=s(m,_),m.return=u,m)}function l(u,m,_,y){var E=_.type;return E===Or?(u=f(u,m,_.props.children,y,_.key),Ps(u,_),u):m!==null&&(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Fs&&Ua(E)===m.type)?(m=s(m,_.props),Ps(m,_),m.return=u,m):(m=Tu(_.type,_.key,_.props,null,u.mode,y),Ps(m,_),m.return=u,m)}function c(u,m,_,y){return m===null||m.tag!==4||m.stateNode.containerInfo!==_.containerInfo||m.stateNode.implementation!==_.implementation?(m=sp(_,u.mode,y),m.return=u,m):(m=s(m,_.children||[]),m.return=u,m)}function f(u,m,_,y,E){return m===null||m.tag!==7?(m=Ba(_,u.mode,y,E),m.return=u,m):(m=s(m,_),m.return=u,m)}function d(u,m,_){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return m=ip(""+m,u.mode,_),m.return=u,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case tu:return _=Tu(m.type,m.key,m.props,null,u.mode,_),Ps(_,m),_.return=u,_;case pl:return m=sp(m,u.mode,_),m.return=u,m;case Fs:return m=Ua(m),d(u,m,_)}if(ml(m)||ll(m))return m=Ba(m,u.mode,_,null),m.return=u,m;if(typeof m.then=="function")return d(u,cu(m),_);if(m.$$typeof===ki)return d(u,lu(u,m),_);uu(u,m)}return null}function h(u,m,_,y){var E=m!==null?m.key:null;if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return E!==null?null:o(u,m,""+_,y);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case tu:return _.key===E?l(u,m,_,y):null;case pl:return _.key===E?c(u,m,_,y):null;case Fs:return _=Ua(_),h(u,m,_,y)}if(ml(_)||ll(_))return E!==null?null:f(u,m,_,y,null);if(typeof _.then=="function")return h(u,m,cu(_),y);if(_.$$typeof===ki)return h(u,m,lu(u,_),y);uu(u,_)}return null}function p(u,m,_,y,E){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return u=u.get(_)||null,o(m,u,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case tu:return u=u.get(y.key===null?_:y.key)||null,l(m,u,y,E);case pl:return u=u.get(y.key===null?_:y.key)||null,c(m,u,y,E);case Fs:return y=Ua(y),p(u,m,_,y,E)}if(ml(y)||ll(y))return u=u.get(_)||null,f(m,u,y,E,null);if(typeof y.then=="function")return p(u,m,_,cu(y),E);if(y.$$typeof===ki)return p(u,m,_,lu(m,y),E);uu(m,y)}return null}function v(u,m,_,y){for(var E=null,A=null,w=m,R=m=0,b=null;w!==null&&R<_.length;R++){w.index>R?(b=w,w=null):b=w.sibling;var M=h(u,w,_[R],y);if(M===null){w===null&&(w=b);break}e&&w&&M.alternate===null&&t(u,w),m=a(M,m,R),A===null?E=M:A.sibling=M,A=M,w=b}if(R===_.length)return n(u,w),Gt&&os(u,R),E;if(w===null){for(;R<_.length;R++)w=d(u,_[R],y),w!==null&&(m=a(w,m,R),A===null?E=w:A.sibling=w,A=w);return Gt&&os(u,R),E}for(w=i(w);R<_.length;R++)b=p(w,u,R,_[R],y),b!==null&&(e&&(M=b.alternate,M!==null&&w.delete(M.key===null?R:M.key)),m=a(b,m,R),A===null?E=b:A.sibling=b,A=b);return e&&w.forEach(function(D){return t(u,D)}),Gt&&os(u,R),E}function x(u,m,_,y){if(_==null)throw Error(W(151));for(var E=null,A=null,w=m,R=m=0,b=null,M=_.next();w!==null&&!M.done;R++,M=_.next()){w.index>R?(b=w,w=null):b=w.sibling;var D=h(u,w,M.value,y);if(D===null){w===null&&(w=b);break}e&&w&&D.alternate===null&&t(u,w),m=a(D,m,R),A===null?E=D:A.sibling=D,A=D,w=b}if(M.done)return n(u,w),Gt&&os(u,R),E;if(w===null){for(;!M.done;R++,M=_.next())M=d(u,M.value,y),M!==null&&(m=a(M,m,R),A===null?E=M:A.sibling=M,A=M);return Gt&&os(u,R),E}for(w=i(w);!M.done;R++,M=_.next())M=p(w,u,R,M.value,y),M!==null&&(e&&(b=M.alternate,b!==null&&w.delete(b.key===null?R:b.key)),m=a(M,m,R),A===null?E=M:A.sibling=M,A=M);return e&&w.forEach(function(U){return t(u,U)}),Gt&&os(u,R),E}function g(u,m,_,y){if(typeof _=="object"&&_!==null&&_.type===Or&&_.key===null&&_.props.ref===void 0&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case tu:t:{for(var E=_.key;m!==null;){if(m.key===E){if(E=_.type,E===Or){if(m.tag===7){n(u,m.sibling),y=s(m,_.props.children),Ps(y,_),y.return=u,u=y;break t}}else if(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Fs&&Ua(E)===m.type){n(u,m.sibling),y=s(m,_.props),Ps(y,_),y.return=u,u=y;break t}n(u,m);break}else t(u,m);m=m.sibling}_.type===Or?(y=Ba(_.props.children,u.mode,y,_.key),Ps(y,_),y.return=u,u=y):(y=Tu(_.type,_.key,_.props,null,u.mode,y),Ps(y,_),y.return=u,u=y)}return r(u);case pl:t:{for(E=_.key;m!==null;){if(m.key===E)if(m.tag===4&&m.stateNode.containerInfo===_.containerInfo&&m.stateNode.implementation===_.implementation){n(u,m.sibling),y=s(m,_.children||[]),y.return=u,u=y;break t}else{n(u,m);break}else t(u,m);m=m.sibling}y=sp(_,u.mode,y),y.return=u,u=y}return r(u);case Fs:return _=Ua(_),g(u,m,_,y)}if(ml(_))return v(u,m,_,y);if(ll(_)){if(E=ll(_),typeof E!="function")throw Error(W(150));return _=E.call(_),x(u,m,_,y)}if(typeof _.then=="function")return g(u,m,cu(_),y);if(_.$$typeof===ki)return g(u,m,lu(u,_),y);uu(u,_)}return typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint"?(_=""+_,m!==null&&m.tag===6?(n(u,m.sibling),y=s(m,_),y.return=u,u=y):(n(u,m),y=ip(_,u.mode,y),y.return=u,u=y),r(u)):n(u,m)}return function(u,m,_,y){try{zl=0;var E=g(u,m,_,y);return Kr=null,E}catch(w){if(w===vo||w===bh)throw w;var A=Pn(29,w,null,u.mode);return A.lanes=y,A.return=u,A}}}var Wa=yx(!0),xx=yx(!1),Hs=!1;function Qm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Wp(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function Js(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function Qs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(ne&2)!==0){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=qu(e),hx(e,null,n),t}return Mh(e,i,t,n),qu(e)}function bl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,By(e,n)}}function rp(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var qp=!1;function El(){if(qp){var e=Zr;if(e!==null)throw e}}function Tl(e,t,n,i){qp=!1;var s=e.updateQueue;Hs=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var f=e.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(a!==null){var d=s.baseState;r=0,f=c=l=null,o=a;do{var h=o.lane&-536870913,p=h!==o.lane;if(p?(Kt&h)===h:(i&h)===h){h!==0&&h===Xa&&(qp=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var v=e,x=o;h=t;var g=n;switch(x.tag){case 1:if(v=x.payload,typeof v=="function"){d=v.call(g,d,h);break t}d=v;break t;case 3:v.flags=v.flags&-65537|128;case 0:if(v=x.payload,h=typeof v=="function"?v.call(g,d,h):v,h==null)break t;d=ve({},d,h);break t;case 2:Hs=!0}}h=o.callback,h!==null&&(e.flags|=64,p&&(e.flags|=8192),p=s.callbacks,p===null?s.callbacks=[h]:p.push(h))}else p={lane:h,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=d):f=f.next=p,r|=h;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;p=o,o=p.next,p.next=null,s.lastBaseUpdate=p,s.shared.pending=null}}while(!0);f===null&&(l=d),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=f,a===null&&(s.shared.lanes=0),la|=r,e.lanes=r,e.memoizedState=d}}function Mx(e,t){if(typeof e!="function")throw Error(W(191,e));e.call(t)}function Sx(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)Mx(n[e],t)}var ra=Ji(null),Qu=Ji(0);function y_(e,t){e=gs,be(Qu,e),be(ra,t),gs=e|t.baseLanes}function Yp(){be(Qu,gs),be(ra,ra.current)}function jm(){gs=Qu.current,rn(ra),rn(Qu)}var cn=Ji(null),vn=null;function js(e){var t=e.alternate;be(on,on.current&1),be(cn,e),vn===null&&(t===null||ra.current!==null||t.memoizedState!==null)&&(vn=e)}function Zp(e){be(on,on.current),be(cn,e),vn===null&&(vn=e)}function bx(e){e.tag===22?(be(on,on.current),be(cn,e),vn===null&&(vn=e)):$s()}function $s(){be(on,on.current),be(cn,cn.current)}function Wn(e){rn(cn),vn===e&&(vn=null),rn(on)}var on=Ji(0);function Fl(e,t){be(cn,cn.current),be(on,t)}function $m(e){rn(on),rn(cn),vn===e&&(vn=null)}function ju(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Rm(n)||A0(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var ds=0,Pt=null,pe=null,He=null,$u=!1,Jr=!1,qa=!1,th=0,Hl=0,Qr=null,LT=0;function Pe(){throw Error(W(321))}function t0(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!jn(e[n],t[n]))return!1;return!0}function e0(e,t,n,i,s,a){return ds=a,Pt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ct.H=e===null||e.memoizedState===null?tM:eM,qa=!1,a=n(i,s),qa=!1,Jr&&(a=Tx(t,n,i,s)),Ex(e),a}function Ex(e){Ct.H=eh;var t=pe!==null&&pe.next!==null;if(ds=0,He=pe=Pt=null,$u=!1,Hl=0,Qr=null,t)throw Error(W(300));e===null||Ge||(e=e.dependencies,e!==null&&Ku(e)&&(Ge=!0))}function Tx(e,t,n,i){Pt=e;var s=0;do{if(Jr&&(Qr=null),Hl=0,Jr=!1,25<=s)throw Error(W(301));if(s+=1,He=pe=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Ct.H=VT,a=t(n,i)}while(Jr);return a}function OT(){var e=Ct.H,t=e.useState()[0];return t=typeof t.then=="function"?ec(t):t,e=e.useState()[0],(pe!==null?pe.memoizedState:null)!==e&&(Pt.flags|=1024),t}function n0(){var e=th!==0;return th=0,e}function i0(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function s0(e){if($u){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}$u=!1}ds=0,He=pe=Pt=null,Jr=!1,Hl=th=0,Qr=null}function An(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return He===null?Pt.memoizedState=He=e:He=He.next=e,He}function Fe(){if(pe===null){var e=Pt.alternate;e=e!==null?e.memoizedState:null}else e=pe.next;var t=He===null?Pt.memoizedState:He.next;if(t!==null)He=t,pe=e;else{if(e===null)throw Pt.alternate===null?Error(W(467)):Error(W(310));pe=e,e={memoizedState:pe.memoizedState,baseState:pe.baseState,baseQueue:pe.baseQueue,queue:pe.queue,next:null},He===null?Pt.memoizedState=He=e:He=He.next=e}return He}function Eh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ec(e){var t=Hl;return Hl+=1,Qr===null&&(Qr=[]),e=_x(Qr,e,t),t=Pt,(He===null?t.memoizedState:He.next)===null&&(t=t.alternate,Ct.H=t===null||t.memoizedState===null?tM:eM),e}function Th(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ec(e);if(e.$$typeof===mE)return;if(e.$$typeof===ki)return an(e)}throw Error(W(438,String(e)))}function a0(e){var t=null,n=Pt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Pt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Eh(),Pt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=pE;return t.index++,n}function ps(e,t){return typeof t=="function"?t(e):t}function Ru(e){var t=Fe();return r0(t,pe,e)}function r0(e,t,n){var i=e.queue;if(i===null)throw Error(W(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,f=!1;do{var d=c.lane&-536870913;if(d!==c.lane?(Kt&d)===d:(ds&d)===d){var h=c.revertLane;if(h===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),d===Xa&&(f=!0);else if((ds&h)===h){c=c.next,h===Xa&&(f=!0);continue}else d={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=d,r=a):l=l.next=d,Pt.lanes|=h,la|=h;d=c.action,qa&&n(a,d),a=c.hasEagerState?c.eagerState:n(a,d)}else h={lane:d,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=a):l=l.next=h,Pt.lanes|=d,la|=d;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!jn(a,e.memoizedState)&&(Ge=!0,f&&(n=Zr,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function op(e){var t=Fe(),n=t.queue;if(n===null)throw Error(W(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);jn(a,t.memoizedState)||(Ge=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function Ax(e,t,n){var i=Pt,s=Fe(),a=Gt;if(a){if(n===void 0)throw Error(W(407));n=n()}else n=t();var r=!jn((pe||s).memoizedState,n);if(r&&(s.memoizedState=n,Ge=!0),s=s.queue,o0(Cx.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||He!==null&&(He.memoizedState.tag&1)!==0,so(e?9:8,{destroy:void 0},Rx.bind(null,i,s,n,t),null),e){if(i.flags|=2048,ge===null)throw Error(W(349));a||(ds&127)!==0||wx(i,t,n)}return n}function wx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Pt.updateQueue,t===null?(t=Eh(),Pt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Rx(e,t,n,i){t.value=n,t.getSnapshot=i,Dx(t)&&Nx(e)}function Cx(e,t,n){return n(function(){Dx(t)&&Nx(e)})}function Dx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!jn(e,n)}catch{return!0}}function Nx(e){var t=ja(e,2);t!==null&&Bn(t,e,2)}function Kp(e){var t=An();if(typeof e=="function"){var n=e;if(e=n(),qa){Gs(!0);try{n()}finally{Gs(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:e},t}function Ux(e,t,n,i){return e.baseState=n,r0(e,pe,typeof i=="function"?i:ps)}function IT(e,t,n,i,s){if(wh(e))throw Error(W(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Ct.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,Lx(t,a)):(a.next=n.next,t.pending=n.next=a)}}function Lx(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Ct.T,r={};r.types=a!==null?a.types:null,Ct.T=r;try{var o=n(s,i),l=Ct.S;l!==null&&l(r,o),x_(e,t,o)}catch(c){Jp(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Ct.T=a}}else try{a=n(s,i),x_(e,t,a)}catch(c){Jp(e,t,c)}}function x_(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){M_(e,t,i)},function(i){return Jp(e,t,i)}):M_(e,t,n)}function M_(e,t,n){t.status="fulfilled",t.value=n,Ox(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Lx(e,n)))}function Jp(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,Ox(t),t=t.next;while(t!==i)}e.action=null}function Ox(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ix(e,t){return t}function S_(e,t){if(Gt){var n=ge.formState;if(n!==null){t:{var i=Pt;if(Gt){if(Se){e:{for(var s=Se,a=di;s.nodeType!==8;){if(!a){s=null;break e}if(s=pi(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Se=pi(s.nextSibling),i=s.data==="F!";break t}}aa(i)}i=!1}i&&(t=n[0])}}return n=An(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ix,lastRenderedState:t},n.queue=i,n=Qx.bind(null,Pt,i),i.dispatch=n,i=Kp(!1),a=h0.bind(null,Pt,!1,i.queue),i=An(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=IT.bind(null,Pt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function b_(e){var t=Fe();return Px(t,pe,e)}function Px(e,t,n){if(t=r0(e,t,Ix)[0],e=Ru(ps)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=ec(t)}catch(r){throw r===vo?bh:r}else i=t;t=Fe();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Pt.flags|=2048,so(9,{destroy:void 0},PT.bind(null,s,n),null)),[i,a,e]}function PT(e,t){e.action=t}function E_(e){var t=Fe(),n=pe;if(n!==null)return Px(t,n,e);Fe(),t=t.memoizedState,n=Fe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function so(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Pt.updateQueue,t===null&&(t=Eh(),Pt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function Bx(){return Fe().memoizedState}function Cu(e,t,n,i){var s=An();Pt.flags|=e,s.memoizedState=so(1|t,{destroy:void 0},n,i===void 0?null:i)}function Ah(e,t,n,i){var s=Fe();i=i===void 0?null:i;var a=s.memoizedState.inst;pe!==null&&i!==null&&t0(i,pe.memoizedState.deps)?s.memoizedState=so(t,a,n,i):(Pt.flags|=e,s.memoizedState=so(1|t,a,n,i))}function T_(e,t){Cu(8390656,8,e,t)}function o0(e,t){Ah(2048,8,e,t)}function BT(e){Pt.flags|=4;var t=Pt.updateQueue;if(t===null)t=Eh(),Pt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function zx(e){var t=Fe().memoizedState;return BT({ref:t,nextImpl:e}),function(){if((ne&2)!==0)throw Error(W(440));return t.impl.apply(void 0,arguments)}}function Fx(e,t){return Ah(4,2,e,t)}function Hx(e,t){return Ah(4,4,e,t)}function Vx(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Gx(e,t,n){n=n!=null?n.concat([e]):null,Ah(4,4,Vx.bind(null,t,e),n)}function l0(){}function kx(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&t0(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Xx(e,t){var n=Fe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&t0(t,i[1]))return i[0];if(i=e(),qa){Gs(!0);try{e()}finally{Gs(!1)}}return n.memoizedState=[i,t],i}function c0(e,t,n){return n===void 0||(ds&1073741824)!==0&&(Kt&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=PM(),Pt.lanes|=e,la|=e,n)}function Wx(e,t,n,i){return jn(n,t)?n:ra.current!==null?(e=c0(e,n,i),jn(e,t)||(Ge=!0),e):(ds&106)===0||(ds&1073741824)!==0&&(Kt&261930)===0?(Ge=!0,e.memoizedState=n):(e=PM(),Pt.lanes|=e,la|=e,t)}function qx(e,t,n,i,s){var a=ie.p;ie.p=a!==0&&8>a?a:8;var r=Ct.T,o={};o.types=r!==null?r.types:null,Ct.T=o,h0(e,!1,t,n);try{var l=s(),c=Ct.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=UT(l,i);Al(e,t,f,Qn(e))}else Al(e,t,i,Qn(e))}catch(d){Al(e,t,{then:function(){},status:"rejected",reason:d},Qn())}finally{ie.p=a,r!==null&&o.types!==null&&(r.types=o.types),Ct.T=r}}function zT(){}function Qp(e,t,n,i){if(e.tag!==5)throw Error(W(476));var s=Yx(e).queue;qx(e,s,t,Pa,n===null?zT:function(){return Zx(e),n(i)})}function Yx(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Pa,baseState:Pa,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:Pa},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ps,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Zx(e){var t=Yx(e);t.next===null&&(t=e.alternate.memoizedState),Al(e,t.next.queue,{},Qn())}function u0(){return an(ho)}function Kx(){return Fe().memoizedState}function Jx(){return Fe().memoizedState}function FT(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Qn();e=Js(n);var i=Qs(t,e,n);i!==null&&(Bn(i,t,n),bl(i,t,n)),t={cache:Zm()},e.payload=t;return}t=t.return}}function HT(e,t,n){var i=Qn();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},wh(e)?jx(t,n):(n=Wm(e,t,n,i),n!==null&&(Bn(n,e,i),$x(n,t,i)))}function Qx(e,t,n){var i=Qn();Al(e,t,n,i)}function Al(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(wh(e))jx(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,jn(o,r))return Mh(e,t,s,0),ge===null&&xh(),!1}catch{}if(n=Wm(e,t,s,i),n!==null)return Bn(n,e,i),$x(n,t,i),!0}return!1}function h0(e,t,n,i){if(i={lane:2,revertLane:S0(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},wh(e)){if(t)throw Error(W(479))}else t=Wm(e,n,i,2),t!==null&&Bn(t,e,2)}function wh(e){var t=e.alternate;return e===Pt||t!==null&&t===Pt}function jx(e,t){Jr=$u=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function $x(e,t,n){if((n&4194048)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,By(e,n)}}var eh={readContext:an,use:Th,useCallback:Pe,useContext:Pe,useEffect:Pe,useImperativeHandle:Pe,useLayoutEffect:Pe,useInsertionEffect:Pe,useMemo:Pe,useReducer:Pe,useRef:Pe,useState:Pe,useDebugValue:Pe,useDeferredValue:Pe,useTransition:Pe,useSyncExternalStore:Pe,useId:Pe,useHostTransitionStatus:Pe,useFormState:Pe,useActionState:Pe,useOptimistic:Pe,useMemoCache:Pe,useCacheRefresh:Pe,useEffectEvent:Pe},tM={readContext:an,use:Th,useCallback:function(e,t){return An().memoizedState=[e,t===void 0?null:t],e},useContext:an,useEffect:T_,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,Cu(4194308,4,Vx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Cu(4194308,4,e,t)},useInsertionEffect:function(e,t){Cu(4,2,e,t)},useMemo:function(e,t){var n=An();t=t===void 0?null:t;var i=e();if(qa){Gs(!0);try{e()}finally{Gs(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=An();if(n!==void 0){var s=n(t);if(qa){Gs(!0);try{n(t)}finally{Gs(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=HT.bind(null,Pt,e),[i.memoizedState,e]},useRef:function(e){var t=An();return e={current:e},t.memoizedState=e},useState:function(e){e=Kp(e);var t=e.queue,n=Qx.bind(null,Pt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:l0,useDeferredValue:function(e,t){var n=An();return c0(n,e,t)},useTransition:function(){var e=Kp(!1);return e=qx.bind(null,Pt,e.queue,!0,!1),An().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Pt,s=An();if(Gt){if(n===void 0)throw Error(W(407));n=n()}else{if(n=t(),ge===null)throw Error(W(349));(Kt&127)!==0||wx(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,T_(Cx.bind(null,i,a,e),[e]),i.flags|=2048,so(9,{destroy:void 0},Rx.bind(null,i,a,n,t),null),n},useId:function(){var e=An(),t=ge.identifierPrefix;if(Gt){var n=qi,i=Wi;n=(i&~(1<<32-Jn(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=th++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=LT++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:u0,useFormState:S_,useActionState:S_,useOptimistic:function(e){var t=An();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=h0.bind(null,Pt,!0,n),n.dispatch=t,[e,t]},useMemoCache:a0,useCacheRefresh:function(){return An().memoizedState=FT.bind(null,Pt)},useEffectEvent:function(e){var t=An(),n={impl:e};return t.memoizedState=n,function(){if((ne&2)!==0)throw Error(W(440));return n.impl.apply(void 0,arguments)}}},eM={readContext:an,use:Th,useCallback:kx,useContext:an,useEffect:o0,useImperativeHandle:Gx,useInsertionEffect:Fx,useLayoutEffect:Hx,useMemo:Xx,useReducer:Ru,useRef:Bx,useState:function(){return Ru(ps)},useDebugValue:l0,useDeferredValue:function(e,t){var n=Fe();return Wx(n,pe.memoizedState,e,t)},useTransition:function(){var e=Ru(ps)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:ec(e),t]},useSyncExternalStore:Ax,useId:Kx,useHostTransitionStatus:u0,useFormState:b_,useActionState:b_,useOptimistic:function(e,t){var n=Fe();return Ux(n,pe,e,t)},useMemoCache:a0,useCacheRefresh:Jx,useEffectEvent:zx},VT={readContext:an,use:Th,useCallback:kx,useContext:an,useEffect:o0,useImperativeHandle:Gx,useInsertionEffect:Fx,useLayoutEffect:Hx,useMemo:Xx,useReducer:op,useRef:Bx,useState:function(){return op(ps)},useDebugValue:l0,useDeferredValue:function(e,t){var n=Fe();return pe===null?c0(n,e,t):Wx(n,pe.memoizedState,e,t)},useTransition:function(){var e=op(ps)[0],t=Fe().memoizedState;return[typeof e=="boolean"?e:ec(e),t]},useSyncExternalStore:Ax,useId:Kx,useHostTransitionStatus:u0,useFormState:E_,useActionState:E_,useOptimistic:function(e,t){var n=Fe();return pe!==null?Ux(n,pe,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:a0,useCacheRefresh:Jx,useEffectEvent:zx};function lp(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:ve({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var jp={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Qn(),s=Js(i);s.payload=t,n!=null&&(s.callback=n),t=Qs(e,s,i),t!==null&&(Bn(t,e,i),bl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Qn(),s=Js(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=Qs(e,s,i),t!==null&&(Bn(t,e,i),bl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Qn(),i=Js(n);i.tag=2,t!=null&&(i.callback=t),t=Qs(e,i,n),t!==null&&(Bn(t,e,n),bl(t,e,n))}};function A_(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!Il(n,i)||!Il(s,a):!0}function w_(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&jp.enqueueReplaceState(t,t.state,null)}function Ya(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=ve({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function nM(e){Wu(e)}function iM(e){console.error(e)}function sM(e){Wu(e)}function nh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function R_(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function $p(e,t,n){return n=Js(n),n.tag=3,n.payload={element:null},n.callback=function(){nh(e,t)},n}function aM(e){return e=Js(e),e.tag=3,e}function rM(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){R_(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){R_(t,n,i),typeof s!="function"&&(ta===null?ta=new Set([this]):ta.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function GT(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ga(t,n,s,!0),n=cn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return vn===null?uh():n.alternate===null&&Be===0&&(Be=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===Ju?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),mp(e,i,s)),!1;case 22:return n.flags|=65536,i===Ju?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),mp(e,i,s)),!1}throw Error(W(435,n.tag))}return mp(e,i,s),uh(),!1}if(Gt)return t=cn.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==Vp&&(e=Error(W(422),{cause:i}),Bl(fi(e,n)))):(i!==Vp&&(t=Error(W(423),{cause:i}),Bl(fi(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=fi(i,n),s=$p(e.stateNode,i,s),rp(e,s),Be!==4&&(Be=2)),!1;var a=Error(W(520),{cause:i});if(a=fi(a,n),Dl===null?Dl=[a]:Dl.push(a),Be!==4&&(Be=2),t===null)return!0;i=fi(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=$p(n.stateNode,i,e),rp(n,e),!1;case 1:if(t=n.type,a=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(ta===null||!ta.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=aM(s),rM(s,e,n,i),rp(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var f0=Error(W(461)),Ge=!1;function Xe(e,t,n,i){t.child=e===null?xx(t,null,n,i):Wa(t,e.child,n,i)}function C_(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return ka(t),i=e0(e,t,n,r,a,s),o=n0(),e!==null&&!Ge?(i0(e,t,s),ms(e,t,s)):(Gt&&o&&Sh(t),t.flags|=1,Xe(e,t,i,s),t.child)}function D_(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!qm(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,oM(e,t,a,i,s)):(e=Tu(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!p0(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:Il,n(r,i)&&e.ref===t.ref)return ms(e,t,s)}return t.flags|=1,e=cs(a,i),e.ref=t.ref,e.return=t,t.child=e}function oM(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(Il(a,i)&&e.ref===t.ref)if(Ge=!1,t.pendingProps=i=a,p0(e,s))(e.flags&131072)!==0&&(Ge=!0);else return t.lanes=e.lanes,ms(e,t,s)}return tm(e,t,n,i,s)}function lM(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if((t.flags&128)!==0){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return N_(e,t,a,n,i)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&wu(t,a!==null?a.cachePool:null),a!==null?y_(t,a):Yp(),bx(t);else return i=t.lanes=536870912,N_(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(wu(t,a.cachePool),y_(t,a),$s(),t.memoizedState=null):(e!==null&&wu(t,null),Yp(),$s());return Xe(e,t,s,n),t.child}function wl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function N_(e,t,n,i,s){var a=Km();return a=a===null?null:{parent:Ve._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&wu(t,null),Yp(),bx(t),e!==null&&Ga(e,t,i,!0),t.childLanes=s,null}function Du(e,t){return t=Rh({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function U_(e,t,n){return Wa(t,e.child,null,n),e=Du(t,t.pendingProps),e.flags|=2,Wn(t),t.memoizedState=null,e}function kT(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Gt){if(i.mode==="hidden")return e=Du(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},wl(null,e);if(Zp(t),(e=Se)?(e=lS(e,di),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sa!==null?{id:Wi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},n=dx(e),n.return=t,t.child=n,$e=t,Se=null)):e=null,e===null)throw aa(t);return t.lanes=536870912,null}return Du(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(Zp(t),s)if(t.flags&256)t.flags&=-257,t=U_(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(W(558));else if(Ge||Ga(e,t,n,!1),s=(n&e.childLanes)!==0,Ge||s){if(ra.current===null){if(i=ge,i!==null&&(r=zy(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,ja(e,r),Bn(i,e,r),f0;uh()}t=U_(e,t,n)}else e=a.treeContext,Se=pi(r.nextSibling),$e=t,Gt=!0,Ks=null,di=!1,e!==null&&mx(t,e),t=Du(t,i),t.flags|=134221824;return t}return e=cs(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Dr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(W(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function tm(e,t,n,i,s){return ka(t),n=e0(e,t,n,i,void 0,s),i=n0(),e!==null&&!Ge?(i0(e,t,s),ms(e,t,s)):(Gt&&i&&Sh(t),t.flags|=1,Xe(e,t,n,s),t.child)}function L_(e,t,n,i,s,a){return ka(t),t.updateQueue=null,n=Tx(t,i,n,s),Ex(e),i=n0(),e!==null&&!Ge?(i0(e,t,a),ms(e,t,a)):(Gt&&i&&Sh(t),t.flags|=1,Xe(e,t,n,a),t.child)}function O_(e,t,n,i,s){if(ka(t),t.stateNode===null){var a=Vr,r=n.contextType;typeof r=="object"&&r!==null&&(a=an(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=jp,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},Qm(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?an(r):Vr,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(lp(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&jp.enqueueReplaceState(a,a.state,null),Tl(t,i,a,s),El(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=Ya(n,o);a.props=l;var c=a.context,f=n.contextType;r=Vr,typeof f=="object"&&f!==null&&(r=an(f));var d=n.getDerivedStateFromProps;f=typeof d=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,f||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&w_(t,a,i,r),Hs=!1;var h=t.memoizedState;a.state=h,Tl(t,i,a,s),El(),c=t.memoizedState,o||h!==c||Hs?(typeof d=="function"&&(lp(t,n,d,i),c=t.memoizedState),(l=Hs||A_(t,n,l,i,h,c,r))?(f||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,Wp(e,t),r=t.memoizedProps,f=Ya(n,r),a.props=f,d=t.pendingProps,h=a.context,c=n.contextType,l=Vr,typeof c=="object"&&c!==null&&(l=an(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==d||h!==l)&&w_(t,a,i,l),Hs=!1,h=t.memoizedState,a.state=h,Tl(t,i,a,s),El();var p=t.memoizedState;r!==d||h!==p||Hs||e!==null&&e.dependencies!==null&&Ku(e.dependencies)?(typeof o=="function"&&(lp(t,n,o,i),p=t.memoizedState),(f=Hs||A_(t,n,f,i,h,p,l)||e!==null&&e.dependencies!==null&&Ku(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,p,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,p,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),a.props=i,a.state=p,a.context=l,i=f):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&h===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Dr(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=Wa(t,e.child,null,s),t.child=Wa(t,null,n,s)):Xe(e,t,n,s),t.memoizedState=a.state,e=t.child):e=ms(e,t,s),e}function I_(e,t,n,i){return Va(),t.flags|=256,Xe(e,t,n,i),t.child}var em={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function nm(e){return{baseLanes:e,cachePool:vx()}}function im(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Yn),e}function cM(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(on.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Gt){if(s?js(t):$s(),(e=Se)?(e=lS(e,di),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sa!==null?{id:Wi,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},n=dx(e),n.return=t,t.child=n,$e=t,Se=null)):e=null,e===null)throw aa(t);return A0(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?($s(),s=t.mode,a=Rh({mode:"hidden",children:a},s),i=Ba(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=nm(n),i.childLanes=im(e,r,n),t.memoizedState=em,wl(null,i)):(js(t),d0(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return XT(e,t,a,r,i,l,o,n)}return s?($s(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=cs(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=cs(l,s):(s=Ba(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,wl(null,i),i=t.child,s=e.child.memoizedState,s===null?s=nm(n):(a=s.cachePool,a!==null?(o=Ve._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=vx(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=im(e,r,n),t.memoizedState=em,wl(e.child,i)):(js(t),n=e.child,e=n.sibling,n=cs(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function d0(e,t){return t=Rh({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Rh(e,t){return e=Pn(22,e,null,t),e.lanes=0,e}function hu(e,t,n){return Wa(t,e.child,null,n),e=d0(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function XT(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(js(t),t.flags&=-257,hu(e,t,o)):t.memoizedState!==null?($s(),t.child=e.child,t.flags|=128,null):($s(),a=s.fallback,r=t.mode,s=Rh({mode:"visible",children:s.children},r),a=Ba(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,Wa(t,e.child,null,o),s=t.child,s.memoizedState=nm(o),s.childLanes=im(e,i,o),t.memoizedState=em,wl(null,s));if(js(t),A0(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(W(419)),s.stack="",s.digest=i,Bl({value:s,source:null,stack:null})),hu(e,t,o)}if(Ge||Ga(e,t,o,!1),i=(o&e.childLanes)!==0,Ge||i){if(ra.current!==null)return hu(e,t,o);if(i=ge,i!==null&&(s=zy(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,ja(e,s),Bn(i,e,s),f0;return Rm(a)||uh(),hu(e,t,o)}return Rm(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Se=pi(a.nextSibling),$e=t,Gt=!0,Ks=null,di=!1,e!==null&&mx(t,e),t=d0(t,s.children),t.flags|=134221824,t)}function P_(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Au(e.return,t,n)}function B_(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&ju(n)===null&&(t=e),e=e.sibling}return t}function fu(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function cp(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function sm(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=on.current;if(t.flags&128)return Fl(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,Fl(t,r),s==="backwards"&&e!==null?(cp(e),Xe(e,t,i,n),cp(e)):Xe(e,t,i,n),i=Gt?Pl:0,!o&&e!==null&&(e.flags&128)!==0)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&P_(e,n,t);else if(e.tag===19)P_(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=B_(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,cp(t)),fu(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&ju(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}fu(t,!0,n,null,a,i);break;case"together":fu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=B_(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),fu(t,!1,s,n,a,i)}return t.child}function z_(e,t,n){var i=t.pendingProps;return Xs(t,t.type,i.value),Xe(e,t,i.children,n),t.child}function ms(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),la|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Ga(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(W(153));if(t.child!==null){for(e=t.child,n=cs(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=cs(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function p0(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Ku(e)))}function WT(e,t,n){switch(t.tag){case 3:Vu(t,t.stateNode.containerInfo),Xs(t,Ve,e.memoizedState.cache),Va();break;case 27:case 5:Np(t);break;case 4:Vu(t,t.stateNode.containerInfo);break;case 10:Xs(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Zp(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return js(t),t.flags|=128,null;i=Ga(e,t,n,!1);var s=t.child.childLanes;return i||(n&s)!==0?cM(e,t,n):(js(t),e=ms(e,t,n),e!==null?e.sibling:null)}js(t);break;case 19:if(t.flags&128)return sm(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(Ga(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return sm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Fl(t,on.current),i)break;return null;case 22:return t.lanes=0,lM(e,t,n,t.pendingProps);case 24:Xs(t,Ve,e.memoizedState.cache)}return ms(e,t,n)}function uM(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ge=!0;else{if(!p0(e,n)&&(t.flags&128)===0)return Ge=!1,WT(e,t,n);Ge=(e.flags&131072)!==0}else Ge=!1,Gt&&(t.flags&1048576)!==0&&px(t,Pl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Ua(t.elementType),t.type=e,typeof e=="function")qm(e)?(i=Ya(e,i),t.tag=1,t=O_(null,t,e,i,n)):(t.tag=0,t=tm(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Lm){t.tag=11,t=C_(null,t,e,i,n);break t}else if(s===Om){t.tag=14,t=D_(null,t,e,i,n);break t}else if(s===ki){t.tag=10,t.type=e,t=z_(null,t,n);break t}}throw t=Cp(e)||e,Error(W(306,t,""))}}return t;case 0:return tm(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=Ya(i,t.pendingProps),O_(e,t,i,s,n);case 3:t:{if(Vu(t,t.stateNode.containerInfo),e===null)throw Error(W(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,Wp(e,t),Tl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,Xs(t,Ve,i),i!==a.cache&&kp(t,[Ve],n,!0),El(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=I_(e,t,i,n);break t}else if(i!==s){s=fi(Error(W(424)),t),Bl(s),t=I_(e,t,i,n);break t}else for(e=t.stateNode.containerInfo,e.nodeType===9?e=e.body:e=e.nodeName==="HTML"?e.ownerDocument.body:e,Se=pi(e.firstChild),$e=t,Gt=!0,Ks=null,di=!0,n=xx(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling;else{if(Va(),i===s){t=ms(e,t,n);break t}Xe(e,t,i,n)}t=t.child}return t;case 26:return Dr(e,t),e===null?(n=hy(t.type,null,t.pendingProps,null))?t.memoizedState=n:Gt||(t.stateNode=$M(t.type,t.pendingProps,Zs.current,t)):t.memoizedState=hy(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Np(t),e===null&&Gt&&(i=t.stateNode=cS(t.type,t.pendingProps,Zs.current),$e=t,di=!0,s=Se,ua(t.type)?(Cm=s,Se=pi(i.firstChild)):Se=s),Xe(e,t,t.pendingProps.children,n),Dr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Gt&&((s=i=Se)&&(i=BA(i,t.type,t.pendingProps,di),i!==null?(t.stateNode=i,$e=t,Se=pi(i.firstChild),di=!1,s=!0):s=!1),s||aa(t)),Np(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,Tm(s,a)?i=null:r!==null&&Tm(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=e0(e,t,OT,null,null,n),ho._currentValue=s),Dr(e,t),Xe(e,t,i,n),t.child;case 6:return e===null&&Gt&&((e=n=Se)&&(n=zA(n,t.pendingProps,di),n!==null?(t.stateNode=n,$e=t,Se=null,e=!0):e=!1),e||aa(t)),null;case 13:return cM(e,t,n);case 4:return Vu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=Wa(t,null,i,n):Xe(e,t,i,n),t.child;case 11:return C_(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Dr(e,t),Xe(e,t,i,n),t.child;case 8:return Xe(e,t,t.pendingProps.children,n),t.child;case 12:return Xe(e,t,t.pendingProps.children,n),t.child;case 10:return z_(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,ka(t),s=an(s),i=i(s),t.flags|=1,Xe(e,t,i,n),t.child;case 14:return D_(e,t,t.type,t.pendingProps,n);case 15:return oM(e,t,t.type,t.pendingProps,n);case 19:return sm(e,t,n);case 31:return kT(e,t,n);case 22:return lM(e,t,n,t.pendingProps);case 24:return ka(t),i=an(Ve),e===null?(s=Km(),s===null&&(s=ge,a=Zm(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},Qm(t),Xs(t,Ve,s)):((e.lanes&n)!==0&&(Wp(e,t),Tl(t,null,null,n),El()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),Xs(t,Ve,i)):(i=a.cache,Xs(t,Ve,i),i!==s.cache&&kp(t,[Ve],n,!0))),Xe(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:Gt&&Sh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Dr(e,t),Xe(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(W(156,t.tag))}function rs(e){e.flags|=4}function up(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?py(t,i):py(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(FM())e.flags|=8192;else throw Fa=Ju,Jm}else e.flags&=-16777217}function F_(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!dS(t))if(FM())e.flags|=8192;else throw Fa=Ju,Jm}function du(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Iy():536870912,e.lanes|=t,ao|=t)}function ul(e,t){if(!Gt)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Me(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function qT(e,t,n){var i=t.pendingProps;switch(Ym(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Me(t),null;case 1:return Me(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),us(Ve),eo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Rr(t)?rs(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,ap())),Me(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(rs(t),a!==null?(Me(t),F_(t,a)):(Me(t),up(t,s,null,i,n))):a?a!==e.memoizedState?(rs(t),Me(t),F_(t,a)):(Me(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&rs(t),Me(t),up(t,s,e,i,n)),null;case 27:if(Gu(t),n=Zs.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&rs(t);else{if(!i){if(t.stateNode===null)throw Error(W(166));return Me(t),t.subtreeFlags&=-33554433,null}e=Yi.current,Rr(t)?f_(t,e):(e=cS(s,i,n),t.stateNode=e,rs(t))}return Me(t),t.subtreeFlags&=-33554433,null;case 5:if(Gu(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&rs(t);else{if(!i){if(t.stateNode===null)throw Error(W(166));return Me(t),t.subtreeFlags&=-33554433,null}if(a=Yi.current,Rr(t))f_(t,a);else{var r=kl(Zs.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[sn]=t,a[Fn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(ln(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&rs(t)}}return Me(t),t.subtreeFlags&=-33554433,up(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&rs(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(W(166));if(e=Zs.current,Rr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=$e,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[sn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||QM(e.nodeValue,n)),e||aa(t,!0)}else e=kl(e).createTextNode(i),e[sn]=t,t.stateNode=e}return Me(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Rr(t),n!==null){if(e===null){if(!i)throw Error(W(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(W(557));e[sn]=t}else Va(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),e=!1}else n=ap(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Wn(t),t):(Wn(t),null);if((t.flags&128)!==0)throw Error(W(558))}return Me(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Rr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(W(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(W(317));s[sn]=t}else Va(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Me(t),s=!1}else s=ap(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Wn(t),t):(Wn(t),null)}return Wn(t),(t.flags&128)!==0?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),du(t,t.updateQueue),Me(t),null);case 4:return eo(),e===null&&b0(t.stateNode.containerInfo),t.flags|=67108864,Me(t),null;case 10:return us(t.type),Me(t),null;case 19:if($m(t),i=t.memoizedState,i===null)return Me(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)ul(i,!1);else{if(Be!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(a=ju(e),a!==null){for(t.flags|=128,ul(i,!1),e=a.updateQueue,t.updateQueue=e,du(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)fx(n,e),n=n.sibling;return Fl(t,on.current&1|2),Gt&&os(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&Zn()>lh&&(t.flags|=128,s=!0,ul(i,!1),t.lanes=4194304)}else{if(!s)if(e=ju(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,du(t,e),ul(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!Gt)return Me(t),null}else 2*Zn()-i.renderingStartTime>lh&&n!==536870912&&(t.flags|=128,s=!0,ul(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=Zn(),e.sibling=null,a=on.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||Gt?Fl(t,a):(n=a,be(cn,t),be(on,n),vn===null&&(vn=t)),Gt&&os(t,i.treeForkCount),e}return Me(t),null;case 22:case 23:return Wn(t),jm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?(n&536870912)!==0&&(t.flags&128)===0&&(Me(t),t.subtreeFlags&6&&(t.flags|=8192)):Me(t),n=t.updateQueue,n!==null&&du(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&rn(za),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),us(Ve),Me(t),null;case 25:return null;case 30:return t.flags|=33554432,Me(t),null}throw Error(W(156,t.tag))}function YT(e,t){switch(Ym(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return us(Ve),eo(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Gu(t),null;case 31:if(t.memoizedState!==null){if(Wn(t),t.alternate===null)throw Error(W(340));Va()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Wn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(W(340));Va()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return $m(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return eo(),null;case 10:return us(t.type),null;case 22:case 23:return Wn(t),jm(),e!==null&&rn(za),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return us(Ve),null;case 25:return null;default:return null}}function hM(e,t){switch(Ym(t),t.tag){case 3:us(Ve),eo();break;case 26:case 27:case 5:Gu(t);break;case 4:eo();break;case 31:t.memoizedState!==null&&Wn(t);break;case 13:Wn(t);break;case 19:$m(t);break;case 10:us(t.type);break;case 22:case 23:Wn(t),jm(),e!==null&&rn(za);break;case 24:us(Ve)}}function nc(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){ue(t,t.return,o)}}function oa(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(f){ue(s,l,f)}}}i=i.next}while(i!==a)}}catch(f){ue(t,t.return,f)}}function fM(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Sx(t,n)}catch(i){ue(e,e.return,i)}}}function dM(e,t,n){n.props=Ya(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){ue(e,t,i)}}function Vi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=fs(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=iS(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new $n(e);zn(e.child,!1,IA,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){ue(e,t,o)}}function nn(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){ue(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){ue(e,t,s)}else n.current=null}function ih(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)oS(e.stateNode,t[n])}function H_(e){for(var t=e.return;t!==null&&(g0(t)&&oS(e.stateNode,t.stateNode),!m0(t));)t=t.return}function Rl(e){for(var t=e.return;t!==null&&(g0(t)&&PA(e.stateNode,t.stateNode),!m0(t));)t=t.return}function m0(e){return e.tag===5||e.tag===3||e.tag===27}function g0(e){return e&&e.tag===7&&e.stateNode!==null}function am(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){ue(e,e.return,s)}}function hp(e,t,n){try{var i=e.stateNode;vA(i,e.type,n,t),i[Fn]=t}catch(s){ue(e,e.return,s)}}function pM(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ua(e.type)||e.tag===4}function fp(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||pM(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ua(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function rm(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Xi)),ih(e,i),ee=!0;else if(s!==4&&(s===27&&(ih(e,i),i=null,ua(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(rm(e,t,n,i),e=e.sibling;e!==null;)rm(e,t,n,i),e=e.sibling}function sh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),ih(e,i),ee=!0;else if(s!==4&&(s===27&&(ih(e,i),i=null,ua(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(sh(e,t,n,i),e=e.sibling;e!==null;)sh(e,t,n,i),e=e.sibling}function mM(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);ln(t,i,n),t[sn]=e,t[Fn]=n}catch(a){ue(e,e.return,a)}}var ah=!1,qn=null;function V_(e){(e.tag===30||(e.subtreeFlags&33554432)!==0)&&(ah=!0)}var Gi=null;function G_(){var e=Gi;return Gi=null,e}var In=0;function _o(e,t,n,i,s){return In=0,gM(e.child,t,n,i,s)}function gM(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=Am(r);i.push(o),o.view&&(a=!0)}else a||Am(r).view&&(a=!0);ah=!0,tS(r,In===0?t:t+"_"+In,n),In++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||gM(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function Ki(e,t){for(;e!==null;)e.tag===5?eS(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||Ki(e.child,t)),e=e.sibling}function Nu(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Nu(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(W(544));var n=t.name;t=_s(t.default,t.share),t!=="none"&&(_o(e,n,t,null,!1)||Ki(e.child,!1))}e=e.sibling}}function om(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=fs(i,n),a=_s(i.default,n.paired?i.share:i.enter);a!=="none"?_o(e,s,a,null,!1)?(Nu(e),n.paired||t||ro(e,i.onEnter)):Ki(e.child,!1):Nu(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)om(e,t),e=e.sibling;else Nu(e)}function lm(e){if(qn!==null&&qn.size!==0){var t=qn;if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=_s(n.default,n.share);if(a!=="none"&&(_o(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,ro(e,n.onShare)):Ki(e.child,!1)),t.delete(i),t.size===0)break}}}lm(e)}e=e.sibling}}}function cm(e){if(e.tag===30){var t=e.memoizedProps,n=fs(t,e.stateNode),i=qn!==null?qn.get(n):void 0,s=_s(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(_o(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,qn.delete(n),ro(e,t.onShare)):ro(e,t.onExit):Ki(e.child,!1)),qn!==null&&lm(e)}else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)cm(e),e=e.sibling;else qn!==null&&lm(e)}function vM(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=fs(t,e.stateNode);t=_s(t.default,t.update),e.flags&=-5,t!=="none"&&_o(e,n,t,e.memoizedState=[],!1)}else(e.subtreeFlags&33554432)!==0&&vM(e);e=e.sibling}}function um(e){if((e.subtreeFlags&18874368)!==0)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&(e.flags&18874368)!==0){var t=e.stateNode;t.paired!==null&&(t.paired=null,Ki(e.child,!1))}um(e)}e=e.sibling}}function Uu(e){if(e.tag===30)e.stateNode.paired=null,Ki(e.child,!1),um(e);else if((e.subtreeFlags&33554432)!==0)for(e=e.child;e!==null;)Uu(e),e=e.sibling;else um(e)}function _M(e){for(e=e.child;e!==null;)e.tag===30?Ki(e.child,!1):(e.subtreeFlags&33554432)!==0&&_M(e),e=e.sibling}function v0(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&In<a.length){var c=a[In],f=Am(l);(c.view||f.view)&&(o=!0);var d;if(d=(e.flags&4)===0)if(f.clip)d=!0;else{d=c.rect;var h=f.rect;d=d.y!==h.y||d.x!==h.x||d.height!==h.height||d.width!==h.width}d&&(e.flags|=4),f.abs?f=!c.abs:(c=c.rect,f=f.rect,f=c.height!==f.height||c.width!==f.width),f&&(e.flags|=32)}else e.flags|=32;(e.flags&4)!==0&&tS(l,In===0?n:n+"_"+In,s),o&&(e.flags&4)!==0||(Gi===null&&(Gi=[]),Gi.push(l,In===0?i:i+"_"+In,t.memoizedProps)),In++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:v0(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function yM(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=fs(n,i),a=_s(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(bA)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;In=0,s=v0(i,o,s,s,a,r,!1),(e.flags&4)!==0&&s&&(t||ro(e,n.onUpdate))}else(e.subtreeFlags&33554432)!==0&&yM(e,t);e=e.sibling}}var Je=!1,oe=!1,zi=!1,dp=!1,k_=typeof WeakSet=="function"?WeakSet:Set,Qe=null,Fi=!1,_l=!1,rh=!1,hm=!1;function ZT(e,t,n){if(e=e.containerInfo,bm=fo,e=sx(e),km(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,f=0,d=0,h=e,p=null;e:for(;;){for(var v;h!==i||a!==0&&h.nodeType!==3||(l=o+a),h!==r||s!==0&&h.nodeType!==3||(c=o+s),h.nodeType===3&&(o+=h.nodeValue.length),(v=h.firstChild)!==null;)p=h,h=v;for(;;){if(h===e)break e;if(p===i&&++f===a&&(l=o),p===r&&++d===s&&(c=o),(v=h.nextSibling)!==null)break;h=p,p=h.parentNode}h=v}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(Em={focusedElem:e,selectionRange:i},fo=!1,n=(n&335544064)===n,Qe=t,t=n?9270:1024;Qe!==null;){if(e=Qe,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&cm(i[a]);if(e.alternate===null&&(e.flags&2)!==0)n&&V_(e),pu(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&cm(i),pu(n);continue}else if(i!==null&&i.memoizedState!==null){n&&V_(e),pu(n);continue}}i=e.child,(e.subtreeFlags&t)!==0&&i!==null?(i.return=e,Qe=i):(n&&vM(e),pu(n))}}qn=null}function pu(e){for(;Qe!==null;){var t=Qe,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if((s&1024)!==0&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=Ya(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){ue(t,t.return,o)}}break;case 3:if((s&1024)!==0){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)wm(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":wm(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=fs(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=_s(s.default,s.update),s!=="none"&&_o(i,n,s,i.memoizedState=[],!0));break;default:if((s&1024)!==0)throw Error(W(163))}if(i=t.sibling,i!==null){i.return=t.return,Qe=i;break}Qe=t.return}}function xM(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Hi(e,n),i&4&&nc(5,n);break;case 1:if(Hi(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){ue(n,n.return,r)}else{var s=Ya(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){ue(n,n.return,r)}}i&64&&fM(n),i&512&&Vi(n,n.return);break;case 3:if(Hi(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Sx(e,t)}catch(r){ue(n,n.return,r)}}break;case 27:t===null&&i&4&&mM(n);case 26:case 5:Hi(e,n),t===null&&i&4&&am(n),i&512&&Vi(n,n.return);break;case 12:Hi(e,n);break;case 31:Hi(e,n),i&4&&EM(e,n);break;case 13:Hi(e,n),i&4&&TM(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=rA.bind(null,n),FA(e,n))));break;case 22:if(i=n.memoizedState!==null||Je,!i){var a=t!==null&&t.memoizedState!==null||oe;t=Je,s=oe,Je=i,(oe=a)&&!s?(i=2,(n.subtreeFlags&8772)!==0&&(i|=1),Si(e,n,i)):Hi(e,n),Je=t,oe=s}break;case 30:Hi(e,n),i&512&&Vi(n,n.return);break;case 7:i&512&&Vi(n,n.return);default:Hi(e,n)}}function fm(e,t){for(e=e.child;e!==null;)MM(e,t),e=e.sibling}function MM(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){ue(e,e.return,l)}dm(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,ee=!0}catch(l){ue(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?ay(o,!0):ay(e.stateNode,!1)}catch(l){ue(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&fm(e,t);break;default:fm(e,t)}}function dm(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:MM(n,i);break t;case 22:n.memoizedState===null&&dm(n,i);break t;default:dm(n,i)}}e=e.sibling}}function SM(e){var t=e.alternate;t!==null&&(e.alternate=null,SM(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&gh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var De=null,Ln=!1;function Mi(e,t,n){for(n=n.child;n!==null;)bM(e,t,n),n=n.sibling}function bM(e,t,n){if(Kn&&typeof Kn.onCommitFiberUnmount=="function")try{Kn.onCommitFiberUnmount(Kl,n)}catch{}switch(n.tag){case 26:oe||nn(n,t),Mi(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!oe&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:oe||nn(n,t),Rl(n);var i=De,s=Ln;ua(n.type)&&(De=n.stateNode,Ln=!1),Mi(e,t,n),uS(n.stateNode,n.type,n.memoizedProps),De=i,Ln=s;break;case 5:oe||nn(n,t),Rl(n);case 6:if(n.tag===6&&Rl(n),i=De,s=Ln,De=null,Mi(e,t,n),De=i,Ln=s,De!==null)if(Ln)try{(De.nodeType===9?De.body:De.nodeName==="HTML"?De.ownerDocument.body:De).removeChild(n.stateNode),ee=!0}catch(a){ue(n,t,a)}else try{De.removeChild(n.stateNode),ee=!0}catch(a){ue(n,t,a)}break;case 18:De!==null&&(Ln?(e=De,sy(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),po(e)):sy(De,n.stateNode));break;case 4:i=De,s=Ln,De=n.stateNode.containerInfo,Ln=!0,Mi(e,t,n),De=i,Ln=s;break;case 0:case 11:case 14:case 15:oa(2,n,t),oe||oa(4,n,t),Mi(e,t,n);break;case 1:oe||(nn(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&dM(n,t,i)),Mi(e,t,n);break;case 21:Mi(e,t,n);break;case 22:oe=(i=oe)||n.memoizedState!==null,Mi(e,t,n),oe=i;break;case 30:nn(n,t),Mi(e,t,n);break;case 7:oe||nn(n,t),Mi(e,t,n);break;default:Mi(e,t,n)}}function EM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{po(e)}catch(n){ue(t,t.return,n)}}}function TM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{po(e)}catch(n){ue(t,t.return,n)}}function KT(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new k_),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new k_),t;default:throw Error(W(435,e.tag))}}function mu(e,t){var n=KT(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=oA.bind(null,e,i);i.then(s,s)}})}function En(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(ua(l.type)){De=l.stateNode,Ln=!1;break t}break;case 5:De=l.stateNode,Ln=!1;break t;case 3:case 4:De=l.stateNode.containerInfo,Ln=!0;break t}l=l.return}if(De===null)throw Error(W(160));bM(r,o,a),De=null,Ln=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)AM(t,e,n),t=t.sibling}var bi=null;function AM(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}En(t,e,n),Tn(e),s&4&&(oa(3,e,e.return),nc(3,e),oa(5,e,e.return));break;case 1:En(t,e,n),Tn(e),s&512&&(oe||i===null||nn(i,i.return)),s&64&&Je&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=bi,En(t,e,n),Tn(e),s&512&&(oe||i===null||nn(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(Je)e.stateNode=$M(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[jl]||i[sn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),ln(i,t,n),i[sn]=e,je(i),t=i;break t;case"link":if(a=dy("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),ln(i,t,n),s.head.appendChild(i);break;case"meta":if(a=dy("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),ln(i,t,n),s.head.appendChild(i);break;default:throw Error(W(468,t))}i[sn]=e,je(i),t=i}e.stateNode=t}else Je||Dm(a,e.type,e.stateNode);else e.stateNode=fy(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||oe||t.parentNode.removeChild(t)):s.count--,n===null?Je||Dm(a,e.type,e.stateNode):fy(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&hp(e,e.memoizedProps,i.memoizedProps);break;case 27:En(t,e,n),Tn(e),s&512&&(oe||i===null||nn(i,i.return)),i!==null&&s&4&&hp(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=zi,zi=!1,En(t,e,n),zi=a,Tn(e),s&512&&(oe||i===null||nn(i,i.return)),e.flags&32){t=e.stateNode;try{io(t,""),ee=!0}catch(f){ue(e,e.return,f)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,hp(e,t,i!==null?i.memoizedProps:t)),s&1024&&(dp=!0);break;case 6:if(En(t,e,n),Tn(e),s&4){if(e.stateNode===null)throw Error(W(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,ee=!0}catch(f){ue(e,e.return,f)}}break;case 3:if(ee=!1,Pu=null,a=bi,bi=Xl(t.containerInfo),En(t,e,n),bi=a,Tn(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{po(t.containerInfo)}catch(f){ue(e,e.return,f)}dp&&(dp=!1,wM(e)),ee=!1;break;case 4:s=zi,zi=Je,i=Kv(),a=bi,bi=Xl(e.stateNode.containerInfo),En(t,e,n),Tn(e),bi=a,ee&&_l&&(rh=!0),ee=i,zi=s;break;case 12:En(t,e,n),Tn(e);break;case 31:En(t,e,n),Tn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,mu(e,t)));break;case 13:En(t,e,n),Tn(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(Ch=Zn()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,mu(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=Je,l=oe,c=zi;Je=o||a,zi=c||a,oe=l||r,En(t,e,n),oe=l,zi=c,Je=o,Tn(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||Je||oe||(t=r||oe,n=Je,i=oe,Je=a||Je,oe=t,zs(e,2),Je=n,oe=i),!a&&zi||fm(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,mu(e,n))));break;case 19:En(t,e,n),Tn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,mu(e,t)));break;case 30:s&512&&(oe||i===null||nn(i,i.return)),s=Kv(),a=_l,r=(n&335544064)===n,o=e.memoizedProps,_l=r&&_s(o.default,o.update)!=="none",En(t,e,n),Tn(e),r&&i!==null&&ee&&(e.flags|=4),_l=a,ee=s;break;case 21:break;case 7:s&512&&(oe||i===null||nn(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:En(t,e,n),Tn(e)}}function Tn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(pM(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(g0(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(m0(s))break;s=s.return}var r=i;if(n==null)throw Error(W(160));switch(n.tag){case 27:var o=n.stateNode,l=fp(e);sh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(io(c,""),n.flags&=-33);var f=fp(e);sh(e,f,c,r);break;case 3:case 4:var d=n.stateNode.containerInfo,h=fp(e);rm(e,h,d,r);break;default:throw Error(W(161))}}catch(p){ue(e,e.return,p)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function wM(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;wM(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,fo=!0,t.reset(),fo=!1),e=e.sibling}}function Cr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)RM(t,e),t=t.sibling;else yM(t,!1)}function RM(e,t){var n=e.alternate;if(n===null)om(e,!1);else switch(e.tag){case 3:if(hm=Fi=!1,G_(),Cr(t,e),!Fi&&!rh){if(e=Gi,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];eS(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),hm=!0}Gi=null;break;case 5:Cr(t,e);break;case 4:i=Fi,Fi=!1,Cr(t,e),Fi&&(rh=!0),Fi=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?om(e,!1):Cr(t,e));break;case 30:i=Fi,s=G_(),Fi=!1,Cr(t,e),Fi&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=fs(a,r),r=fs(n.memoizedProps,r);var o=_s(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,In=0,t=v0(e,n,t,r,o,a,!0),In!==(a===null?0:a.length)&&(e.flags|=32)),(e.flags&4)!==0&&t?(ro(e,e.memoizedProps.onUpdate),Gi=s):s!==null&&(s.push.apply(s,Gi),Gi=s),Fi=(e.flags&32)!==0?!0:i;break;default:Cr(t,e)}}function Hi(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)xM(e,t.alternate,t),t=t.sibling}function zs(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:oa(4,n,n.return),zs(n,i);break;case 1:nn(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&dM(n,n.return,s),zs(n,i);break;case 27:(i&2)!==0&&uS(n.stateNode,n.type,n.memoizedProps);case 5:nn(n,n.return),n.tag!==5&&n.tag!==27||Rl(n),zs(n,i);break;case 6:Rl(n);break;case 26:nn(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||oe||s.parentNode.removeChild(s),zs(n,i);break;case 22:n.memoizedState===null&&zs(n,i);break;case 30:nn(n,n.return),zs(n,i);break;case 7:nn(n,n.return);default:zs(n,i)}e=e.sibling}}function Si(e,t,n){for(n=(t.subtreeFlags&8772)!==0?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Si(s,a,n),nc(4,a);break;case 1:if(Si(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(f){ue(i,i.return,f)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)Mx(c[s],l)}catch(f){ue(i,i.return,f)}}o&&r&64&&fM(a),Vi(a,a.return);break;case 27:(n&2)!==0&&mM(a);case 5:a.tag!==5&&a.tag!==27||H_(a),Si(s,a,n),o&&i===null&&r&4&&am(a),Vi(a,a.return);break;case 6:H_(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||Je||Dm(Xl(l.ownerDocument),a.type,l),Si(s,a,n),o&&i===null&&r&4&&am(a),Vi(a,a.return);break;case 12:Si(s,a,n);break;case 31:Si(s,a,n),o&&r&4&&EM(s,a);break;case 13:Si(s,a,n),o&&r&4&&TM(s,a);break;case 22:a.memoizedState===null&&Si(s,a,n),Vi(a,a.return);break;case 30:Si(s,a,n),Vi(a,a.return);break;case 7:Vi(a,a.return);default:Si(s,a,n)}t=t.sibling}}function _0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&tc(n))}function y0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&tc(e))}function oi(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)CM(e,t,n,i),t=t.sibling;else s&&_M(t)}function CM(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Uu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:oi(e,t,n,i),a&2048&&nc(9,t);break;case 1:oi(e,t,n,i);break;case 3:oi(e,t,n,i),s&&hm&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&tc(a)));break;case 12:if(a&2048){oi(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){ue(t,t.return,c)}}else oi(e,t,n,i);break;case 31:oi(e,t,n,i);break;case 13:oi(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&Uu(o),r._visibility&2?oi(e,t,n,i):Cl(e,t)):(s&&o!==null&&o.memoizedState!==null&&Uu(t),r._visibility&2?oi(e,t,n,i):(r._visibility|=2,Nr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&_0(o,t);break;case 24:oi(e,t,n,i),a&2048&&y0(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(Ki(a.child,!0),Ki(t.child,!0))),oi(e,t,n,i);break;default:oi(e,t,n,i)}}function Nr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Nr(a,r,o,l,s),nc(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?Nr(a,r,o,l,s):Cl(a,r):(f._visibility|=2,Nr(a,r,o,l,s)),s&&c&2048&&_0(r.alternate,r);break;case 24:Nr(a,r,o,l,s),s&&c&2048&&y0(r.alternate,r);break;default:Nr(a,r,o,l,s)}t=t.sibling}}function Cl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:Cl(n,i),s&2048&&_0(i.alternate,i);break;case 24:Cl(n,i),s&2048&&y0(i.alternate,i);break;default:Cl(n,i)}t=t.sibling}}var La=8192;function Da(e,t,n){if(e.subtreeFlags&La)for(e=e.child;e!==null;)DM(e,t,n),e=e.sibling}function DM(e,t,n){switch(e.tag){case 26:Da(e,t,n),e.flags&La&&(e.memoizedState!==null?$A(n,bi,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&my(n,e)));break;case 5:Da(e,t,n),e.flags&La&&(e=e.stateNode,(t&335544128)===t&&my(n,e));break;case 3:case 4:var i=bi;bi=Xl(e.stateNode.containerInfo),Da(e,t,n),bi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=La,La=16777216,Da(e,t,n),La=i):Da(e,t,n));break;case 30:if((e.flags&La)!==0&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,qn===null&&(qn=new Map),qn.set(i,s)}Da(e,t,n);break;default:Da(e,t,n)}}function NM(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function hl(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Qe=i,LM(i,e)}NM(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)UM(e),e=e.sibling}function UM(e){switch(e.tag){case 0:case 11:case 15:hl(e),e.flags&2048&&oa(9,e,e.return);break;case 3:hl(e);break;case 12:hl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Lu(e)):hl(e);break;default:hl(e)}}function Lu(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];Qe=i,LM(i,e)}NM(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:oa(8,t,t.return),Lu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Lu(t));break;default:Lu(t)}e=e.sibling}}function LM(e,t){for(;Qe!==null;){var n=Qe;switch(n.tag){case 0:case 11:case 15:oa(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:tc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,Qe=i;else t:for(n=e;Qe!==null;){i=Qe;var s=i.sibling,a=i.return;if(SM(i),i===n){Qe=null;break t}if(s!==null){s.return=a,Qe=s;break t}Qe=a}}}var JT={getCacheForType:function(e){var t=an(Ve),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return an(Ve).controller.signal}},QT=typeof WeakMap=="function"?WeakMap:Map,ne=0,ge=null,Yt=null,Kt=0,le=0,kn=null,Ws=!1,yo=!1,x0=!1,gs=0,Be=0,la=0,Ha=0,oh=0,Yn=0,ao=0,Dl=null,On=null,pm=!1,Ch=0,OM=0,lh=1/0,ch=null,ta=null,Le=0,Ti=null,Za=null,Zi=0,mm=0,gm=null,IM=null,jr=null,$r=null,to=null,Nl=0,Ou=null;function Qn(){return(ne&2)!==0&&Kt!==0?Kt&-Kt:Ct.T!==null?S0():Fy()}function PM(){if(Yn===0)if((Kt&536870912)===0||Gt){var e=nu;nu<<=1,(nu&3932160)===0&&(nu=262144),Yn=e}else Yn=536870912;return e=cn.current,e!==null&&(e.flags|=32),Yn}function ro(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=iS(fs(e.memoizedProps,n))),$r===null&&($r=[]),$r.push(t.bind(null,i))}}function Bn(e,t,n){(e===ge&&(le===2||le===9)||e.cancelPendingCommit!==null)&&(oo(e,0),qs(e,Kt,Yn,!1)),Ql(e,n),((ne&2)===0||e!==ge)&&(e===ge&&((ne&2)===0&&(Ha|=n),Be===4&&qs(e,Kt,Yn,!1)),Qi(e))}function BM(e,t,n){if((ne&6)!==0)throw Error(W(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Jl(e,t),s=i?tA(e,t):pp(e,t,!0),a=i;do{if(s===0){yo&&!i&&qs(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!jT(n)){s=pp(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=Dl;var l=o.current.memoizedState.isDehydrated;if(l&&(oo(o,r).flags|=256),r=pp(o,r,!1),r!==2&&r!==6){if(x0&&!l){o.errorRecoveryDisabledLanes|=a,Ha|=a,s=4;break t}a=On,On=s,a!==null&&(On===null?On=a:On.push.apply(On,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){oo(e,0),qs(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(W(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:qs(i,t,Yn,!Ws);break t;case 2:On=null;break;case 3:case 5:break;default:throw Error(W(329))}if((t&62914560)===t&&(s=Ch+300-Zn(),10<s)){if(qs(i,t,Yn,!Ws),mh(i,0,!0)!==0)break t;Zi=t,i.timeoutHandle=E0(X_.bind(null,i,n,On,ch,pm,t,Yn,Ha,ao,Ws,a,"Throttled",-0,0),s);break t}X_(i,n,On,ch,pm,t,Yn,Ha,ao,Ws,a,null,-0,0)}}break}while(!0);Qi(e)}function X_(e,t,n,i,s,a,r,o,l,c,f,d,h,p){e.timeoutHandle=-1;var v=t.subtreeFlags,x=(a&335544064)===a;if(d=null,(x||v&8192||(v&16785408)===16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Xi},qn=null,DM(t,a,d),x&&(v=d,x=e.containerInfo,x=(x.nodeType===9?x:x.ownerDocument).__reactViewTransition,x!=null&&(v.count++,v.waitingForViewTransition=!0,v=Wl.bind(v),x.finished.then(v,v))),v=(a&62914560)===a?Ch-Zn():(a&4194048)===a?OM-Zn():0,v=tw(d,v),v!==null)){Zi=a,e.cancelPendingCommit=v(q_.bind(null,e,t,a,n,i,s,r,o,l,c,f,d,null,h,p)),qs(e,a,r,!c);return}q_(e,t,a,n,i,s,r,o,l,c,f,d)}function jT(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!jn(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function qs(e,t,n,i){t=Oy(e,t),t&=~oh,t&=~Ha,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-Jn(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&Py(e,n,t)}function Dh(){return(ne&6)===0?(ic(0,!1),!1):!0}function M0(){if(Yt!==null){if(le===0)var e=Yt.return;else e=Yt,ls=$a=null,s0(e),Kr=null,zl=0,e=Yt;for(;e!==null;)hM(e.alternate,e),e=e.return;Yt=null}}function oo(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,xA(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Zi=0,M0(),ge=e,Yt=n=cs(e.current,null),Kt=t,le=0,kn=null,Ws=!1,yo=Jl(e,t),x0=!1,ao=Yn=oh=Ha=la=Be=0,On=Dl=null,pm=!1,gs=Oy(e,t),xh(),n}function zM(e,t){Pt=null,Ct.H=eh,t===vo||t===bh?(t=v_(),le=3):t===Jm?(t=v_(),le=4):le=t===f0?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,kn=t,Yt===null&&(Be=1,nh(e,fi(t,e.current)))}function FM(){var e=cn.current;return e===null?!0:(Kt&4194048)===Kt?vn===null:(Kt&62914560)===Kt||(Kt&536870912)!==0?e===vn:!1}function HM(){var e=Ct.H;return Ct.H=eh,e===null?eh:e}function VM(){var e=Ct.A;return Ct.A=JT,e}function uh(){Be=4,Ws||(Kt&4194048)!==Kt&&cn.current!==null||(yo=!0),(la&134217727)===0&&(Ha&134217727)===0||ge===null||qs(ge,Kt,Yn,!1)}function pp(e,t,n){var i=ne;ne|=2;var s=HM(),a=VM();(ge!==e||Kt!==t)&&(ch=null,oo(e,t)),t=!1;var r=Be;t:do try{if(le!==0&&Yt!==null){var o=Yt,l=kn;switch(le){case 8:M0(),r=6;break t;case 3:case 2:case 9:case 6:cn.current===null&&(t=!0);var c=le;if(le=0,kn=null,Xr(e,o,l,c),n&&yo){r=0;break t}break;default:c=le,le=0,kn=null,Xr(e,o,l,c)}}$T(),r=Be;break}catch(f){zM(e,f)}while(!0);return t&&e.shellSuspendCounter++,ls=$a=null,ne=i,Ct.H=s,Ct.A=a,Yt===null&&(ge=null,Kt=0,xh()),r}function $T(){for(;Yt!==null;)GM(Yt)}function tA(e,t){var n=ne;ne|=2;var i=HM(),s=VM();ge!==e||Kt!==t?(ch=null,lh=Zn()+500,oo(e,t)):yo=Jl(e,t);t:do try{if(le!==0&&Yt!==null){t=Yt;var a=kn;e:switch(le){case 1:le=0,kn=null,Xr(e,t,a,1);break;case 2:case 9:if(g_(a)){le=0,kn=null,W_(t);break}t=function(){le!==2&&le!==9||ge!==e||(le=7),Qi(e)},a.then(t,t);break t;case 3:le=7;break t;case 4:le=5;break t;case 7:g_(a)?(le=0,kn=null,W_(t)):(le=0,kn=null,Xr(e,t,a,7));break;case 5:var r=null;switch(Yt.tag){case 26:r=Yt.memoizedState;case 5:case 27:var o=Yt;if(r?dS(r):o.stateNode.complete){le=0,kn=null;var l=o.sibling;if(l!==null)Yt=l;else{var c=o.return;c!==null?(Yt=c,Nh(c)):Yt=null}break e}}le=0,kn=null,Xr(e,t,a,5);break;case 6:le=0,kn=null,Xr(e,t,a,6);break;case 8:M0(),Be=6;break t;default:throw Error(W(462))}}eA();break}catch(f){zM(e,f)}while(!0);return ls=$a=null,Ct.H=i,Ct.A=s,ne=n,Yt!==null?0:(ge=null,Kt=0,xh(),Be)}function eA(){for(;Yt!==null&&!_E();)GM(Yt)}function GM(e){var t=uM(e.alternate,e,gs);e.memoizedProps=e.pendingProps,t===null?Nh(e):Yt=t}function W_(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=L_(n,t,t.pendingProps,t.type,void 0,Kt);break;case 11:t=L_(n,t,t.pendingProps,t.type.render,t.ref,Kt);break;case 5:s0(t);var i=t;i===$e&&(Gt?(Zu(i),i.tag===5&&i.stateNode!=null&&(Se=i.stateNode)):(Zu(i),Gt=!0));default:hM(n,t),t=Yt=fx(t,gs),t=uM(n,t,gs)}e.memoizedProps=e.pendingProps,t===null?Nh(e):Yt=t}function Xr(e,t,n,i){ls=$a=null,s0(t),Kr=null,zl=0;var s=t.return;try{if(GT(e,s,t,n,Kt)){Be=1,nh(e,fi(n,e.current)),Yt=null;return}}catch(a){if(s!==null)throw Yt=s,a;Be=1,nh(e,fi(n,e.current)),Yt=null;return}t.flags&32768?(Gt||i===1?e=!0:yo||(Kt&536870912)!==0?e=!1:(Ws=e=!0,(i===2||i===9||i===3||i===6)&&(i=cn.current,i!==null&&i.tag===13&&(i.flags|=16384))),kM(t,e)):Nh(t)}function Nh(e){var t=e;do{if((t.flags&32768)!==0){kM(t,Ws);return}e=t.return;var n=qT(t.alternate,t,gs);if(n!==null){Yt=n;return}if(t=t.sibling,t!==null){Yt=t;return}Yt=t=e}while(t!==null);Be===0&&(Be=5)}function kM(e,t){do{var n=YT(e.alternate,e);if(n!==null){n.flags&=32767,Yt=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Yt=e;return}Yt=e=n}while(e!==null);Be=6,Yt=null}function q_(e,t,n,i,s,a,r,o,l,c,f,d){e.cancelPendingCommit=null;do Uh();while(Le!==0);if((ne&6)!==0)throw Error(W(327));if(t!==null){if(t===e.current)throw Error(W(177));e===ge&&(Yt=ge=null,Kt=0),Za=t,Ti=e,Zi=n,gm=s,IM=i,nA(e,t,n,r,o,l,d)}}function nA(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(mm=o,o|=Xm,RE(e,n,o,i,s,a),$r=null,(n&335544064)===n?(to=DT(e),i=10262):(to=null,i=10256),(t.subtreeFlags&i)!==0||(t.flags&i)!==0?(e.callbackNode=null,e.callbackPriority=0,lA(ku,function(){return xm(),null})):(e.callbackNode=null,e.callbackPriority=0),ah=!1,i=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||i){i=Ct.T,Ct.T=null,s=ie.p,ie.p=2,a=ne,ne|=4;try{ZT(e,t,n)}finally{ne=a,ie.p=s,Ct.T=i}}Le=1,ah?jr=AA(r,e.containerInfo,to,vm,_m,sA,ym,xm,iA,null,null):(vm(),_m(),ym())}function iA(e){if(Le!==0){var t=Ti.onRecoverableError;t(e,{componentStack:null})}}function sA(){Le===3&&(Le=0,RM(Za,Ti),Le=4)}function vm(){if(Le===1){Le=0;var e=Ti,t=Za,n=Zi,i=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||i){i=Ct.T,Ct.T=null;var s=ie.p;ie.p=2;var a=ne;ne|=4;try{_l=rh=!1,AM(t,e,n),n=Em;var r=sx(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&ix(o.ownerDocument.documentElement,o)){if(l!==null&&km(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var d=o.ownerDocument||document,h=d&&d.defaultView||window;if(h.getSelection){var p=h.getSelection(),v=o.textContent.length,x=Math.min(l.start,v),g=l.end===void 0?x:Math.min(l.end,v);!p.extend&&x>g&&(r=g,g=x,x=r);var u=l_(o,x),m=l_(o,g);if(u&&m&&(p.rangeCount!==1||p.anchorNode!==u.node||p.anchorOffset!==u.offset||p.focusNode!==m.node||p.focusOffset!==m.offset)){var _=d.createRange();_.setStart(u.node,u.offset),p.removeAllRanges(),x>g?(p.addRange(_),p.extend(m.node,m.offset)):(_.setEnd(m.node,m.offset),p.addRange(_))}}}}for(d=[],p=o;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<d.length;o++){var y=d[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}fo=!!bm,Em=bm=null}finally{ne=a,ie.p=s,Ct.T=i}}e.current=t,Le=2}}function _m(){if(Le===2){Le=0;var e=Ti,t=Za,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=Ct.T,Ct.T=null;var i=ie.p;ie.p=2;var s=ne;ne|=4;try{xM(e,t.alternate,t)}finally{ne=s,ie.p=i,Ct.T=n}}Le=3}}function ym(){if(Le===4||Le===3){Le=0;var e=jr;jr=null,yE();var t=Ti,n=Za,i=Zi,s=IM,a=(i&335544064)===i?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?Le=5:(Le=0,Za=Ti=null,XM(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(ta=null),Bm(i),n=n.stateNode,Kn&&typeof Kn.onCommitFiberRoot=="function")try{Kn.onCommitFiberRoot(Kl,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Ct.T,a=ie.p,ie.p=2,Ct.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Ct.T=n,ie.p=a}}if(s=$r,r=to,to=null,s!==null&&($r=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);(Zi&3)!==0&&Uh(),Qi(t),a=t.pendingLanes,(i&261930)!==0&&(a&42)!==0?t===Ou?Nl++:(Nl=0,Ou=t):(Nl=0,Ou=null),ic(0,!1)}}function XM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,tc(t)))}function Uh(){return jr!==null&&(jr.skipTransition(),jr=null),vm(),_m(),ym(),xm()}function xm(){if(Le!==5)return!1;var e=Ti,t=mm;mm=0;var n=Bm(Zi),i=Ct.T,s=ie.p;try{ie.p=32>n?32:n,Ct.T=null,n=gm,gm=null;var a=Ti,r=Zi;if(Le=0,Za=Ti=null,Zi=0,(ne&6)!==0)throw Error(W(331));var o=ne;if(ne|=4,UM(a.current),CM(a,a.current,r,n),ne=o,ic(0,!1),Kn&&typeof Kn.onPostCommitFiberRoot=="function")try{Kn.onPostCommitFiberRoot(Kl,a)}catch{}return!0}finally{ie.p=s,Ct.T=i,XM(e,t)}}function Y_(e,t,n){t=fi(n,t),t=$p(e.stateNode,t,2),e=Qs(e,t,2),e!==null&&(Ql(e,2),Qi(e))}function ue(e,t,n){if(e.tag===3)Y_(e,e,n);else for(;t!==null;){if(t.tag===3){Y_(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ta===null||!ta.has(i))){e=fi(n,e),n=aM(2),i=Qs(t,n,2),i!==null&&(rM(n,i,t,e),Ql(i,2),Qi(i));break}}t=t.return}}function mp(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new QT;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(x0=!0,s.add(n),e=aA.bind(null,e,t,n),t.then(e,e))}function aA(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,ge===e&&(Kt&n)===n&&((Be===4||Be===3&&(Kt&62914560)===Kt&&300>Zn()-Ch)&&(ne&2)===0?oo(e,0):oh|=n,ao===Kt&&(ao=0)),Qi(e)}function WM(e,t){t===0&&(t=Iy()),e=ja(e,t),e!==null&&(Ql(e,t),Qi(e))}function rA(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),WM(e,n)}function oA(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(W(314))}i!==null&&i.delete(t),WM(e,n)}function lA(e,t){return Im(e,t)}var lo=null,Ur=null,Mm=!1,hh=!1,gp=!1,Ys=0;function Qi(e){e!==Ur&&e.next===null&&(Ur===null?lo=Ur=e:Ur=Ur.next=e),hh=!0,Mm||(Mm=!0,uA())}function ic(e,t){if(!gp&&hh){gp=!0;do for(var n=!1,i=lo;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-Jn(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Z_(i,a))}else a=Kt,a=mh(i,i===ge?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),(a&3)===0||Jl(i,a)||(n=!0,Z_(i,a));i=i.next}while(n);gp=!1}}function cA(){qM()}function qM(){hh=Mm=!1;var e=0;Ys!==0&&yA()&&(e=Ys);for(var t=Zn(),n=null,i=lo;i!==null;){var s=i.next,a=YM(i,t);a===0?(i.next=null,n===null?lo=s:n.next=s,s===null&&(Ur=n)):(n=i,(e!==0||(a&3)!==0)&&(hh=!0)),i=s}Le!==0&&Le!==5||ic(e,!1),Ys!==0&&(Ys=0)}function YM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-Jn(a),o=1<<r,l=s[r];l===-1?((o&n)===0||(o&i)!==0)&&(s[r]=wE(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=ge,n=Kt,n=mh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(le===2||le===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Zd(i),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||Jl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Zd(i),Bm(n)){case 2:case 8:n=Uy;break;case 32:n=ku;break;case 268435456:n=Ly;break;default:n=ku}return i=ZM.bind(null,e),n=Im(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Zd(i),e.callbackPriority=2,e.callbackNode=null,2}function ZM(e,t){if(Le!==0&&Le!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(Uh()&&e.callbackNode!==n)return null;var i=Kt;return i=mh(e,e===ge?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(BM(e,i,t),YM(e,Zn()),e.callbackNode!=null&&e.callbackNode===n?ZM.bind(null,e):null)}function Z_(e,t){if(Uh())return null;BM(e,t,!0)}function uA(){MA(function(){(ne&6)!==0?Im(Ny,cA):qM()})}function S0(){if(Ys===0){var e=Xa;e===0&&(e=eu,eu<<=1,(eu&261888)===0&&(eu=256)),Ys=e}return Ys}function K_(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Su(e)}function hA(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=K_((s[Fn]||null).action),r=i.submitter;r&&(t=(t=r[Fn]||null)?K_(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new vh("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(Ys!==0){var l=new FormData(s,r);Qp(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),Qp(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(gu=0;gu<Hp.length;gu++)vu=Hp[gu],J_=vu.toLowerCase(),Q_=vu[0].toUpperCase()+vu.slice(1),Ai(J_,"on"+Q_);var vu,J_,Q_,gu;Ai(rx,"onAnimationEnd");Ai(ox,"onAnimationIteration");Ai(lx,"onAnimationStart");Ai("dblclick","onDoubleClick");Ai("focusin","onFocus");Ai("focusout","onBlur");Ai(ST,"onTransitionRun");Ai(bT,"onTransitionStart");Ai(ET,"onTransitionCancel");Ai(cx,"onTransitionEnd");no("onMouseEnter",["mouseout","mouseover"]);no("onMouseLeave",["mouseout","mouseover"]);no("onPointerEnter",["pointerout","pointerover"]);no("onPointerLeave",["pointerout","pointerover"]);Ja("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Ja("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Ja("onBeforeInput",["compositionend","keypress","textInput","paste"]);Ja("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Ja("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Ja("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Vl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),fA=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Vl));function KM(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){Wu(f)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(f){Wu(f)}s.currentTarget=null,a=l}}}}function qt(e,t){var n=t[Wv];n===void 0&&(n=t[Wv]=new Set);var i=e+"__bubble";n.has(i)||(JM(t,e,2,!1),n.add(i))}function vp(e,t,n){var i=0;t&&(i|=4),JM(n,e,i,t)}var _u="_reactListening"+Math.random().toString(36).slice(2);function b0(e){if(!e[_u]){e[_u]=!0,Vy.forEach(function(n){n!=="selectionchange"&&(fA.has(n)||vp(n,!1,e),vp(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[_u]||(t[_u]=!0,vp("selectionchange",!1,t))}}function JM(e,t,n,i){switch(xS(t)){case 2:var s=sw;break;case 8:s=aw;break;default:s=D0}n=s.bind(null,t,n,e),s=void 0,!Pp||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function _p(e,t,n,i,s){var a=i;if((t&1)===0&&(t&2)===0&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=Oa(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}Ky(function(){var c=a,f=Fm(n),d=[];t:{var h=ux.get(e);if(h!==void 0){var p=vh,v=e;switch(e){case"keypress":if(Eu(n)===0)break t;case"keydown":case"keyup":p=jE;break;case"focusin":v="focus",p=tp;break;case"focusout":v="blur",p=tp;break;case"beforeblur":case"afterblur":p=tp;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=$v;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=HE;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=iT;break;case rx:case ox:case lx:p=kE;break;case cx:p=aT;break;case"scroll":case"scrollend":p=zE;break;case"wheel":p=oT;break;case"copy":case"cut":case"paste":p=WE;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=e_;break;case"submit":p=eT;break;case"toggle":case"beforetoggle":p=cT}var x=(t&4)!==0,g=!x&&(e==="scroll"||e==="scrollend"),u=x?h!==null?h+"Capture":null:h;x=[];for(var m=c,_;m!==null;){var y=m;if(_=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||_===null||u===null||(y=Ll(m,u),y!=null&&x.push(Gl(m,y,_))),g)break;m=m.return}0<x.length&&(h=new p(h,v,null,n,f),d.push({event:h,listeners:x}))}}if((t&7)===0){t:{if(p=e==="mouseover"||e==="pointerover",h=e==="mouseout"||e==="pointerout",p&&n!==Ip&&(v=n.relatedTarget||n.fromElement)&&(Oa(v)||v[mo]))break t;(h||p)&&(v=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,h?(p=n.relatedTarget||n.toElement,h=c,p=p?Oa(p):null,p!==null&&(g=Zl(p),x=p.tag,p!==g||x!==5&&x!==27&&x!==6)&&(p=null)):(h=null,p=c),h!==p&&(x=$v,y="onMouseLeave",u="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(x=e_,y="onPointerLeave",u="onPointerEnter",m="pointer"),g=h==null?v:gl(h),_=p==null?v:gl(p),v=new x(y,m+"leave",h,n,f),v.target=g,v.relatedTarget=_,y=null,Oa(f)===c&&(x=new x(u,m+"enter",p,n,f),x.target=_,x.relatedTarget=g,y=x),g=y,x=h&&p?bp(h,p,dA):null,h!==null&&j_(d,v,h,x,!1),p!==null&&g!==null&&j_(d,g,p,x,!0)))}t:{if(h=c?gl(c):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var E=a_;else if(s_(h))if(ex)E=yT;else{E=vT;var A=gT}else p=h.nodeName,!p||p.toLowerCase()!=="input"||h.type!=="checkbox"&&h.type!=="radio"?c&&zm(c.elementType)&&(E=a_):E=_T;if(E&&(E=E(e,c))){tx(d,E,n,f);break t}A&&A(e,h,c)}switch(A=c?gl(c):window,e){case"focusin":(s_(A)||A.contentEditable==="true")&&(zr=A,zp=c,Ml=null);break;case"focusout":Ml=zp=zr=null;break;case"mousedown":Fp=!0;break;case"contextmenu":case"mouseup":case"dragend":Fp=!1,c_(d,n,f);break;case"selectionchange":if(MT)break;case"keydown":case"keyup":c_(d,n,f)}var w;if(Gm)t:{switch(e){case"compositionstart":var R="onCompositionStart";break t;case"compositionend":R="onCompositionEnd";break t;case"compositionupdate":R="onCompositionUpdate";break t}R=void 0}else Br?jy(e,n)&&(R="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(Qy&&n.locale!=="ko"&&(Br||R!=="onCompositionStart"?R==="onCompositionEnd"&&Br&&(w=Jy()):(ks=f,Hm="value"in ks?ks.value:ks.textContent,Br=!0)),A=fh(c,R),0<A.length&&(R=new t_(R,e,null,n,f),d.push({event:R,listeners:A}),w?R.data=w:(w=$y(n),w!==null&&(R.data=w)))),(w=hT?fT(e,n):dT(e,n))&&(R=fh(c,"onBeforeInput"),0<R.length&&(A=new t_("onBeforeInput","beforeinput",null,n,f),d.push({event:A,listeners:R}),A.data=w)),hA(d,e,c,n,f)}KM(d,t)})}function Gl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function fh(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=Ll(e,n),s!=null&&i.unshift(Gl(e,s,a)),s=Ll(e,t),s!=null&&i.push(Gl(e,s,a))),e.tag===3)return i;e=e.return}return[]}function dA(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function j_(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=Ll(n,a),c!=null&&r.unshift(Gl(n,c,l))):s||(c=Ll(n,a),c!=null&&r.push(Gl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var pA=/\r\n?/g,mA=/\u0000|\uFFFD/g;function $_(e){return(typeof e=="string"?e:""+e).replace(pA,`
`).replace(mA,"")}function QM(e,t){return t=$_(t),$_(e)===t}function ce(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||io(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&io(e,""+i);else return;break;case"className":su(e,"class",i);break;case"tabIndex":su(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":su(e,n,i);break;case"style":Zy(e,i,a);return;case"data":if(t!=="object"){su(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Su(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&ce(e,t,"name",s.name,s,null),ce(e,t,"formEncType",s.formEncType,s,null),ce(e,t,"formMethod",s.formMethod,s,null),ce(e,t,"formTarget",s.formTarget,s,null)):(ce(e,t,"encType",s.encType,s,null),ce(e,t,"method",s.method,s,null),ce(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Su(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Xi);return;case"onScroll":i!=null&&qt("scroll",e);return;case"onScrollEnd":i!=null&&qt("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(W(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(W(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Su(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":qt("beforetoggle",e),qt("toggle",e),Mu(e,"popover",i);break;case"xlinkActuate":as(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":as(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":as(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":as(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":as(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":as(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":as(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":as(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":as(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Mu(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=PE.get(n)||n,Mu(e,n,i);else return}ee=!0}function Sm(e,t,n,i,s,a){switch(n){case"style":Zy(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(W(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(W(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")io(e,i);else if(typeof i=="number"||typeof i=="bigint")io(e,""+i);else return;break;case"onScroll":i!=null&&qt("scroll",e);return;case"onScrollEnd":i!=null&&qt("scrollend",e);return;case"onClick":i!=null&&(e.onclick=Xi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Gy.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Fn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}ee=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Mu(e,n,i)}return}ee=!0}function ln(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":qt("error",e),qt("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(W(137,t));default:ce(e,t,a,r,n,null)}}s&&ce(e,t,"srcSet",n.srcSet,n,null),i&&ce(e,t,"src",n.src,n,null);return;case"input":qt("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":s=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":a=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(W(137,t));break;default:ce(e,t,i,f,n,null)}}Wy(e,a,o,l,c,r,s,!1);return;case"select":qt("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:ce(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?qr(e,!!i,t,!1):n!=null&&qr(e,!!i,n,!0);return;case"textarea":qt("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(W(91));break;default:ce(e,t,r,o,n,null)}Yy(e,i,s,a);return;case"option":for(l in n)n.hasOwnProperty(l)&&(i=n[l],i!=null)&&(l==="selected"?e.selected=i&&typeof i!="function"&&typeof i!="symbol":ce(e,t,l,i,n,null));return;case"dialog":qt("beforetoggle",e),qt("toggle",e),qt("cancel",e),qt("close",e);break;case"iframe":case"object":qt("load",e);break;case"video":case"audio":for(i=0;i<Vl.length;i++)qt(Vl[i],e);break;case"image":qt("error",e),qt("load",e);break;case"details":qt("toggle",e);break;case"embed":case"source":case"link":qt("error",e),qt("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(W(137,t));default:ce(e,t,c,i,n,null)}return;default:if(zm(t)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Sm(e,t,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&ce(e,t,o,i,n,null))}var gA={};function vA(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,f=null;for(p in n){var d=n[p];if(n.hasOwnProperty(p)&&d!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=d;default:i.hasOwnProperty(p)||ce(e,t,p,null,i,d)}}for(var h in i){var p=i[h];if(d=n[h],i.hasOwnProperty(h)&&(p!=null||d!=null))switch(h){case"type":p!==d&&(ee=!0),a=p;break;case"name":p!==d&&(ee=!0),s=p;break;case"checked":p!==d&&(ee=!0),c=p;break;case"defaultChecked":p!==d&&(ee=!0),f=p;break;case"value":p!==d&&(ee=!0),r=p;break;case"defaultValue":p!==d&&(ee=!0),o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(W(137,t));break;default:p!==d&&ce(e,t,h,p,i,d)}}Op(e,r,o,l,c,f,a,s);return;case"select":p=r=o=h=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(a)||ce(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(ee=!0),h=a;break;case"defaultValue":a!==l&&(ee=!0),o=a;break;case"multiple":a!==l&&(ee=!0),r=a;default:a!==l&&ce(e,t,s,a,i,l)}t=o,n=r,i=p,h!=null?qr(e,!!n,h,!1):!!i!=!!n&&(t!=null?qr(e,!!n,t,!0):qr(e,!!n,n?[]:"",!1));return;case"textarea":p=h=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:ce(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(ee=!0),h=s;break;case"defaultValue":s!==a&&(ee=!0),p=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(W(91));break;default:s!==a&&ce(e,t,r,s,i,a)}qy(e,h,p);return;case"option":for(var v in n)h=n[v],n.hasOwnProperty(v)&&h!=null&&!i.hasOwnProperty(v)&&(v==="selected"?e.selected=!1:ce(e,t,v,null,i,h));for(l in i)h=i[l],p=n[l],i.hasOwnProperty(l)&&h!==p&&(h!=null||p!=null)&&(l==="selected"?(h!==p&&(ee=!0),e.selected=h&&typeof h!="function"&&typeof h!="symbol"):ce(e,t,l,h,i,p));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var x in n)h=n[x],n.hasOwnProperty(x)&&h!=null&&!i.hasOwnProperty(x)&&ce(e,t,x,null,i,h);for(c in i)if(h=i[c],p=n[c],i.hasOwnProperty(c)&&h!==p&&(h!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(W(137,t));break;default:ce(e,t,c,h,i,p)}return;default:if(zm(t)){for(var g in n)h=n[g],n.hasOwnProperty(g)&&h!==void 0&&!i.hasOwnProperty(g)&&Sm(e,t,g,void 0,i,h);for(f in i)h=i[f],p=n[f],!i.hasOwnProperty(f)||h===p||h===void 0&&p===void 0||Sm(e,t,f,h,i,p);return}}for(var u in n)h=n[u],n.hasOwnProperty(u)&&h!=null&&!i.hasOwnProperty(u)&&ce(e,t,u,null,i,h);for(d in i)h=i[d],p=n[d],!i.hasOwnProperty(d)||h===p||h==null&&p==null||ce(e,t,d,h,i,p)}function ty(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function _A(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&ty(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,d=l.initiatorType;f&&ty(d)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var bm=null,Em=null;function kl(e){return e.nodeType===9?e:e.ownerDocument}function ey(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function jM(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function $M(e,t,n,i){return n=kl(n).createElement(e),n[sn]=i,n[Fn]=t,ln(n,e,t),je(n),n}function Tm(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var yp=null;function yA(){var e=window.event;return e&&e.type==="popstate"?e===yp?!1:(yp=e,!0):(yp=null,!1)}var E0=typeof setTimeout=="function"?setTimeout:void 0,xA=typeof clearTimeout=="function"?clearTimeout:void 0,ny=typeof Promise=="function"?Promise:void 0,iy=typeof requestAnimationFrame=="function"?requestAnimationFrame:E0,MA=typeof queueMicrotask=="function"?queueMicrotask:typeof ny<"u"?function(e){return ny.resolve(null).then(e).catch(SA)}:E0;function SA(e){setTimeout(function(){throw e})}function ua(e){return e==="head"}function sy(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),po(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Mp(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,Mp(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[jl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&Mp(e.ownerDocument.body);n=s}while(n);po(t)}function ay(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function tS(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function eS(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function nS(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Am(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return nS(t,n,e)}function bA(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return nS(t,n,e)}function EA(e){return e.documentElement.clientHeight}function TA(e){this.addEventListener("load",e),this.addEventListener("error",e)}function AA(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var f=c.startViewTransition({update:function(){var h=c.defaultView,p=h.navigation&&h.navigation.transition,v=c.fonts.status;i();var x=[];if(v==="loaded"&&(EA(c),c.fonts.status==="loading"&&x.push(c.fonts.ready)),v=x.length,e!==null)for(var g=e.suspenseyImages,u=0,m=0;m<g.length;m++){var _=g[m];if(!_.complete){var y=_.getBoundingClientRect();if(0<y.bottom&&0<y.right&&y.top<h.innerHeight&&y.left<h.innerWidth){if(u+=pS(_),u>Bu){x.length=v;break}_=new Promise(TA.bind(_)),x.push(_)}}}if(0<x.length)return h=Promise.race([Promise.all(x),new Promise(function(E){return setTimeout(E,500)})]).then(s,s),(p?Promise.allSettled([p.finished,h]):h).then(a,a);if(s(),p)return p.finished.then(a,a);a()},types:n});c.__reactViewTransition=f;var d=[];return f.ready.then(function(){for(var h=c.documentElement.getAnimations({subtree:!0}),p=0;p<h.length;p++){var v=h[p],x=v.effect,g=x.pseudoElement;if(g!=null&&g.startsWith("::view-transition")){d.push(v),v=x.getKeyframes();for(var u=g=void 0,m=!0,_=0;_<v.length;_++){var y=v[_],E=y.width;if(g===void 0)g=E;else if(g!==E){m=!1;break}if(E=y.height,u===void 0)u=E;else if(u!==E){m=!1;break}delete y.width,delete y.height,y.transform==="none"&&delete y.transform}m&&g!==void 0&&u!==void 0&&(x.setKeyframes(v),m=getComputedStyle(x.target,x.pseudoElement),m.width!==g||m.height!==u)&&(m=v[0],m.width=g,m.height=u,m=v[v.length-1],m.width=g,m.height=u,x.setKeyframes(v))}}r()},function(h){c.__reactViewTransition===f&&(c.__reactViewTransition=null);try{typeof h=="object"&&h!==null&&h.name==="InvalidStateError"&&(h.message==="View transition was skipped because document visibility state is hidden."||h.message==="Skipping view transition because document visibility state has become hidden."||h.message==="Skipping view transition because viewport size changed."||h.message==="Transition was aborted because of invalid state")&&(h=null),h!==null&&l(h)}finally{i(),s(),r()}}),f.finished.finally(function(){for(var h=0;h<d.length;h++)d[h].cancel();c.__reactViewTransition===f&&(c.__reactViewTransition=null),o()}),f}catch{return i(),s(),r(),null}}function Ia(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}Ia.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:ve({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};Ia.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};Ia.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function iS(e){return{name:e,group:new Ia("group",e),imagePair:new Ia("image-pair",e),old:new Ia("old",e),new:new Ia("new",e)}}function $n(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}$n.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(sS(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=co(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),zn(this._fragmentFiber.child,!1,wA,e,o,i)}this._eventListeners=a}};function wA(e,t,n,i){return We(e).addEventListener(t,n,i),!1}$n.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=sS(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=co(s.optionsOrUseCapture),zn(this._fragmentFiber.child,!1,RA,e,n,s),i.splice(t,1),a!==null&&a()}};function RA(e,t,n,i){return We(e).removeEventListener(t,n,i),!1}function co(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function ry(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function sS(e,t,n,i){if(e.length===0)return-1;i=ry(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&ry(a.optionsOrUseCapture)===i)return s}return-1}$n.prototype.dispatchEvent=function(e){var t=Ka(this._fragmentFiber);if(t===null)return!0;t=We(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,co(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,co(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};$n.prototype.focus=function(e){zn(this._fragmentFiber.child,!0,aS,e,void 0,void 0)};function aS(e,t){return e.tag===6?!1:(e=We(e),HA(e,t))}$n.prototype.focusLast=function(e){var t=[];zn(this._fragmentFiber.child,!0,T0,t,void 0,void 0);for(var n=t.length-1;0<=n&&!aS(t[n],e);n--);};function T0(e,t){return t.push(e),!1}$n.prototype.blur=function(){var e=Ka(this._fragmentFiber);e!==null&&(e=We(e),e=kl(e).activeElement,e!==null&&zn(this._fragmentFiber.child,!1,CA,e,void 0,void 0))};function CA(e,t){return e.tag===6?!1:(e=We(e),e===t||e.contains(t)?(t.blur(),!0):!1)}$n.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),zn(this._fragmentFiber.child,!1,DA,e,void 0,void 0)};function DA(e,t){return e.tag===6||(e=We(e),t.observe(e)),!1}$n.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),zn(this._fragmentFiber.child,!1,NA,e,void 0,void 0);for(var n=t=0;n<Ei.length;n++){var i=Ei[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Ei[t++]=i}Ei.length=t}};function NA(e,t){return e.tag===6||(e=We(e),t.unobserve(e)),!1}var Ei=[],xp=!1;function UA(e,t,n){Ei.push({fragmentInstance:e,observer:t,instance:n}),xp||(xp=!0,VA(function(){xp=!1;var i=Ei;Ei=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}$n.prototype.getClientRects=function(){var e=[];return zn(this._fragmentFiber.child,!1,LA,e,void 0,void 0),e};function LA(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=We(e),t.push.apply(t,e.getClientRects());return!1}$n.prototype.getRootNode=function(e){var t=Ka(this._fragmentFiber);return t===null?this:We(t).getRootNode(e)};$n.prototype.compareDocumentPosition=function(e){var t=Ka(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];zn(this._fragmentFiber.child,!1,T0,n,void 0,void 0);var i=We(t);if(n.length===0){if(n=i,Fv(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=wy(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=We(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=We(n[0]),s=We(n[n.length-1]);var a=Fv(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||OA(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function OA(e,t,n,i,s){var a=Oa(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=Ka(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=bp(n,a,Hv),t===null?t=!1:(zn(t,!0,uE,a,n),a=Lr,Lr=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=bp(i,a,Hv),t===null?t=!1:(zn(t,!0,hE,a,i),a=Lr,Sp=Lr=null,t=a!==null)),t):!1}function oy(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}$n.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(W(566));var t=[];zn(this._fragmentFiber.child,!1,T0,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=wy(this._fragmentFiber);if(i=n?i[1]||i[0]||Ka(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=We(i),oy(e,n);return}if(i=We(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=We(s),oy(s,n)):We(s).scrollIntoView(e),i+=n?-1:1}};function IA(e,t){return e=We(e),rS(e,t),!1}function rS(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function oS(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,co(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Ei.length;o++){var l=Ei[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Ei[r++]=l)}Ei.length=r,a.observe(e)}),rS(e,t))}function PA(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,co(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?UA(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function wm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":wm(n),gh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function BA(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[jl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=pi(e.nextSibling),e===null)break}return null}function zA(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=pi(e.nextSibling),e===null))return null;return e}function lS(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=pi(e.nextSibling),e===null))return null;return e}function Rm(e){return e.data==="$?"||e.data==="$~"}function A0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function FA(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function pi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Cm=null;function ly(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return pi(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function cy(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function HA(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function VA(e){iy(function(){iy(function(t){return e(t)})})}function cS(e,t,n){switch(t=kl(n),e){case"html":if(e=t.documentElement,!e)throw Error(W(452));return e;case"head":if(e=t.head,!e)throw Error(W(453));return e;case"body":if(e=t.body,!e)throw Error(W(454));return e;default:throw Error(W(451))}}function uS(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&ce(e,t,i,null,gA,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===Xi&&(e.onclick=null),gh(e)}function Mp(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);gh(e)}var mi=new Map,uy=new Set;function Xl(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var ys=ie.d;ie.d={f:GA,r:kA,D:XA,C:WA,L:qA,m:YA,X:KA,S:ZA,M:JA};function GA(){var e=ys.f(),t=Dh();return e||t}function kA(e){var t=go(e);t!==null&&t.tag===5&&t.type==="form"?Zx(t):ys.r(e)}var xo=typeof document>"u"?null:document;function hS(e,t,n){var i=xo;if(i&&typeof t=="string"&&t){var s=hi(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),uy.has(s)||(uy.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),ln(t,"link",e),je(t),i.head.appendChild(t)))}}function XA(e){ys.D(e),hS("dns-prefetch",e,null)}function WA(e,t){ys.C(e,t),hS("preconnect",e,t)}function qA(e,t,n){ys.L(e,t,n);var i=xo;if(i&&e&&t){var s='link[rel="preload"][as="'+hi(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+hi(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+hi(n.imageSizes)+'"]')):s+='[href="'+hi(e)+'"]';var a=s;switch(t){case"style":a=uo(e);break;case"script":a=Mo(e)}if(!(mi.has(a)||(e=ve({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),mi.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(sc(a))||t==="script"&&i.querySelector(ac(a))))){var r=i.createElement("link");ln(r,"link",e),t==="style"&&(r[Xu]=!0,r.onload=r.onerror=function(){Hy(r)}),je(r),i.head.appendChild(r)}}}function YA(e,t){ys.m(e,t);var n=xo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+hi(i)+'"][href="'+hi(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Mo(e)}if(!mi.has(a)&&(e=ve({rel:"modulepreload",href:e},t),mi.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(ac(a)))return}i=n.createElement("link"),ln(i,"link",e),je(i),n.head.appendChild(i)}}}function ZA(e,t,n){ys.S(e,t,n);var i=xo;if(i&&e){var s=Wr(i).hoistableStyles,a=uo(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(sc(a)))o.loading=5;else{e=ve({rel:"stylesheet",href:e,"data-precedence":t},n),(n=mi.get(a))&&w0(e,n);var l=r=i.createElement("link");je(l),ln(l,"link",e),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,Iu(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function KA(e,t){ys.X(e,t);var n=xo;if(n&&e){var i=Wr(n).hoistableScripts,s=Mo(e),a=i.get(s);a||(a=n.querySelector(ac(s)),a||(e=ve({src:e,async:!0},t),(t=mi.get(s))&&R0(e,t),a=n.createElement("script"),je(a),ln(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function JA(e,t){ys.M(e,t);var n=xo;if(n&&e){var i=Wr(n).hoistableScripts,s=Mo(e),a=i.get(s);a||(a=n.querySelector(ac(s)),a||(e=ve({src:e,async:!0,type:"module"},t),(t=mi.get(s))&&R0(e,t),a=n.createElement("script"),je(a),ln(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function hy(e,t,n,i){var s=(s=Zs.current)?Xl(s):null;if(!s)throw Error(W(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=uo(n.href),t=Wr(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=uo(n.href);var a=Wr(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(sc(e)))?a._p||(r.instance=a,r.state.loading=5):(a=mi.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mi.set(e,a)),QA(s,e,a,r.state))),t&&i===null)throw Error(W(528,""));return r}if(t&&i!==null)throw Error(W(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Mo(n),t=Wr(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(W(444,e))}}function uo(e){return'href="'+hi(e)+'"'}function sc(e){return'link[rel="stylesheet"]['+e+"]"}function fS(e){return ve({},e,{"data-precedence":e.precedence,precedence:null})}function QA(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[Xu]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[Xu]=!0,t.onload=t.onerror=Hy.bind(null,t),ln(t,"link",n),je(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Mo(e){return'[src="'+hi(e)+'"]'}function ac(e){return"script[async]"+e}function fy(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+hi(n.href)+'"]');if(i)return t.instance=i,je(i),i;var s=ve({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),je(i),ln(i,"style",s),Iu(i,n.precedence,e),t.instance=i;case"stylesheet":s=uo(n.href);var a=e.querySelector(sc(s));if(a)return t.state.loading|=4,t.instance=a,je(a),a;i=fS(n),(s=mi.get(s))&&w0(i,s),a=(e.ownerDocument||e).createElement("link"),je(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),ln(a,"link",i),t.state.loading|=4,Iu(a,n.precedence,e),t.instance=a;case"script":return a=Mo(n.src),(s=e.querySelector(ac(a)))?(t.instance=s,je(s),s):(i=n,(s=mi.get(a))&&(i=ve({},n),R0(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),je(s),ln(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(W(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(i=t.instance,t.state.loading|=4,Iu(i,n.precedence,e));return t.instance}function Iu(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function w0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function R0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Pu=null;function dy(e,t,n){if(Pu===null){var i=new Map,s=Pu=new Map;s.set(n,i)}else s=Pu,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[jl]||a[sn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function Dm(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function jA(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;return t.rel==="stylesheet"?(e=t.disabled,typeof t.precedence=="string"&&e==null):!0;case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function py(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function dS(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function pS(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function my(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=pS(t),e.suspenseyImages.push(t)),e=ew.bind(e),t.decode().then(e,e))}function $A(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var s=uo(i.href),a=t.querySelector(sc(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Wl.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,je(a);return}a=t.ownerDocument||t,i=fS(i),(s=mi.get(s))&&w0(i,s),a=a.createElement("link"),je(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),ln(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Wl.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Bu=0;function tw(e,t){return e.stylesheets&&e.count===0&&zu(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&zu(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&Bu===0&&(Bu=62500*_A());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&zu(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>Bu?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function mS(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)zu(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function Wl(){this.count--,mS(this)}function ew(){this.imgCount--,mS(this)}var dh=null;function zu(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,dh=new Map,t.forEach(nw,e),dh=null,Wl.call(e))}function nw(e,t){if(!(t.state.loading&4)){var n=dh.get(e);if(n)var i=n.get(null);else{n=new Map,dh.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=Wl.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var ho={$$typeof:ki,Provider:null,Consumer:null,_currentValue:Pa,_currentValue2:Pa,_threadCount:0};function iw(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Kd(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kd(0),this.hiddenUpdates=Kd(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function gS(e,t,n,i,s,a,r,o,l,c,f,d){return e=new iw(e,t,n,r,l,c,f,d,o),t=1,a===!0&&(t|=24),a=Pn(3,null,null,t),e.current=a,a.stateNode=e,t=Zm(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},Qm(a),e}function vS(e){return e?(e=Vr,e):Vr}function _S(e,t,n,i,s,a){s=vS(s),i.context===null?i.context=s:i.pendingContext=s,i=Js(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=Qs(e,i,t),n!==null&&(Bn(n,e,t),bl(n,e,t))}function gy(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function C0(e,t){gy(e,t),(e=e.alternate)&&gy(e,t)}function yS(e){if(e.tag===13||e.tag===31){var t=ja(e,67108864);t!==null&&Bn(t,e,67108864),C0(e,67108864)}}function vy(e){if(e.tag===13||e.tag===31){var t=Qn();t=Pm(t);var n=ja(e,t);n!==null&&Bn(n,e,t),C0(e,t)}}var fo=!0;function sw(e,t,n,i){var s=Ct.T;Ct.T=null;var a=ie.p;try{ie.p=2,D0(e,t,n,i)}finally{ie.p=a,Ct.T=s}}function aw(e,t,n,i){var s=Ct.T;Ct.T=null;var a=ie.p;try{ie.p=8,D0(e,t,n,i)}finally{ie.p=a,Ct.T=s}}function D0(e,t,n,i){if(fo){var s=Nm(i);if(s===null)_p(e,t,i,ph,n),_y(e,i);else if(ow(s,e,t,n,i))i.stopPropagation();else if(_y(e,i),t&4&&-1<rw.indexOf(e)){for(;s!==null;){var a=go(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=Na(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-Jn(r);o.entanglements[1]|=l,r&=~l}Qi(a),(ne&6)===0&&(lh=Zn()+500,ic(0,!1))}}break;case 31:case 13:o=ja(a,2),o!==null&&Bn(o,a,2),Dh(),C0(a,2)}if(a=Nm(i),a===null&&_p(e,t,i,ph,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else _p(e,t,i,null,n)}}function Nm(e){return e=Fm(e),N0(e)}var ph=null;function N0(e){if(ph=null,e=Oa(e),e!==null){var t=Zl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Ey(t),e!==null)return e;e=null}else if(n===31){if(e=Ty(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return ph=e,null}function xS(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(xE()){case Ny:return 2;case Uy:return 8;case ku:case ME:return 32;case Ly:return 268435456;default:return 32}default:return 32}}var Um=!1,ea=null,na=null,ia=null,ql=new Map,Yl=new Map,Vs=[],rw="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function _y(e,t){switch(e){case"focusin":case"focusout":ea=null;break;case"dragenter":case"dragleave":na=null;break;case"mouseover":case"mouseout":ia=null;break;case"pointerover":case"pointerout":ql.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Yl.delete(t.pointerId)}}function fl(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=go(t),t!==null&&yS(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function ow(e,t,n,i,s){switch(t){case"focusin":return ea=fl(ea,e,t,n,i,s),!0;case"dragenter":return na=fl(na,e,t,n,i,s),!0;case"mouseover":return ia=fl(ia,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return ql.set(a,fl(ql.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,Yl.set(a,fl(Yl.get(a)||null,e,t,n,i,s)),!0}return!1}function MS(e){var t=Oa(e.target);if(t!==null){var n=Zl(t);if(n!==null){if(t=n.tag,t===13){if(t=Ey(n),t!==null){e.blockedOn=t,Xv(e.priority,function(){vy(n)});return}}else if(t===31){if(t=Ty(n),t!==null){e.blockedOn=t,Xv(e.priority,function(){vy(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Fu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Nm(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Ip=i,n.target.dispatchEvent(i),Ip=null}else return t=go(n),t!==null&&yS(t),e.blockedOn=n,!1;t.shift()}return!0}function yy(e,t,n){Fu(e)&&n.delete(t)}function lw(){Um=!1,ea!==null&&Fu(ea)&&(ea=null),na!==null&&Fu(na)&&(na=null),ia!==null&&Fu(ia)&&(ia=null),ql.forEach(yy),Yl.forEach(yy)}function yu(e,t){e.blockedOn===t&&(e.blockedOn=null,Um||(Um=!0,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,lw)))}var xu=null;function xy(e){xu!==e&&(xu=e,qe.unstable_scheduleCallback(qe.unstable_NormalPriority,function(){xu===e&&(xu=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(N0(i||n)===null)continue;break}var a=go(n);a!==null&&(e.splice(t,3),t-=3,Qp(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function po(e){function t(l){return yu(l,e)}ea!==null&&yu(ea,e),na!==null&&yu(na,e),ia!==null&&yu(ia,e),ql.forEach(t),Yl.forEach(t);for(var n=0;n<Vs.length;n++){var i=Vs[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<Vs.length&&(n=Vs[0],n.blockedOn===null);)MS(n),n.blockedOn===null&&Vs.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Fn]||null;if(typeof a=="function")r||xy(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Fn]||null)o=r.formAction;else if(N0(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),xy(n)}}}function SS(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function U0(e){this._internalRoot=e}Lh.prototype.render=U0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(W(409));var n=t.current,i=Qn();_S(n,i,e,t,null,null)};Lh.prototype.unmount=U0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;_S(e.current,2,null,e,null,null),Dh(),t[mo]=null}};function Lh(e){this._internalRoot=e}Lh.prototype.unstable_scheduleHydration=function(e){if(e){var t=Fy();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Vs.length&&t!==0&&t<Vs[n].priority;n++);Vs.splice(n,0,e),n===0&&MS(e)}};var My=Sy.version;if(My!=="19.3.0")throw Error(W(527,My,"19.3.0"));ie.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(W(188)):(e=Object.keys(e).join(","),Error(W(268,e)));return e=cE(t),e=e!==null?Ay(e):null,e=e===null?null:e.stateNode,e};var cw={bundleType:0,version:"19.3.0",rendererPackageName:"react-dom",currentDispatcherRef:Ct,reconcilerVersion:"19.3.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(dl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!dl.isDisabled&&dl.supportsFiber))try{Kl=dl.inject(cw),Kn=dl}catch{}var dl;Oh.createRoot=function(e,t){if(!by(e))throw Error(W(299));var n=!1,i="",s=nM,a=iM,r=sM;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=gS(e,1,!1,null,null,n,i,null,s,a,r,SS),e[mo]=t.current,b0(e),new U0(t)};Oh.hydrateRoot=function(e,t,n){if(!by(e))throw Error(W(299));var i=!1,s="",a=nM,r=iM,o=sM,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=gS(e,1,!0,t,n??null,i,s,l,a,r,o,SS),t.context=vS(null),n=t.current,i=Qn(),i=Pm(i),s=Js(i),s.callback=null,Qs(n,s,i),n=i,t.current.lanes=n,Ql(t,n),Qi(t),e[mo]=t.current,b0(e),new Lh(t)};Oh.version="19.3.0"});var AS=Pi((YD,TS)=>{"use strict";function ES(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ES)}catch(e){console.error(e)}}ES(),TS.exports=bS()});var _1=Pi(Ad=>{"use strict";var PD=Symbol.for("react.transitional.element"),BD=Symbol.for("react.fragment");function v1(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:PD,type:e,key:i,ref:t!==void 0?t:null,props:n}}Ad.Fragment=BD;Ad.jsx=v1;Ad.jsxs=v1});var Wc=Pi((fO,y1)=>{"use strict";y1.exports=_1()});var A1=Sr(AS());var Nn=Sr(jc());var JS=0,hg=1,QS=2;var fg=1,Af=2,ts=3,As=0,Dn=1,yi=2,Ns=0,ar=1,dr=2,dg=3,pg=4,jS=5,ya=100,$S=101,tb=102,eb=103,nb=104,ib=200,sb=201,ab=202,rb=203,nf=204,sf=205,ob=206,lb=207,cb=208,ub=209,hb=210,fb=211,db=212,pb=213,mb=214,wf=0,Rf=1,Cf=2,rr=3,Df=4,Nf=5,Uf=6,Lf=7,mg=0,gb=1,vb=2,Us=0,_b=1,yb=2,xb=3,Of=4,Mb=5,Sb=6,bb=7;var gg=300,pr=301,mr=302,If=303,Pf=304,Bc=306,or=1e3,_a=1001,af=1002,vi=1003,Eb=1004;var zc=1005;var Ni=1006,Bf=1007;var Ea=1008;var Oi=1009,vg=1010,_g=1011,Zo=1012,zf=1013,Ta=1014,es=1015,Ko=1016,Ff=1017,Hf=1018,Jo=1020,yg=35902,xg=35899,Mg=1021,Sg=1022,xi=1023,Po=1026,Qo=1027,bg=1028,Vf=1029,Eg=1030,Gf=1031;var kf=1033,Fc=33776,Hc=33777,Vc=33778,Gc=33779,Xf=35840,Wf=35841,qf=35842,Yf=35843,Zf=36196,Kf=37492,Jf=37496,Qf=37808,jf=37809,$f=37810,td=37811,ed=37812,nd=37813,id=37814,sd=37815,ad=37816,rd=37817,od=37818,ld=37819,cd=37820,ud=37821,hd=36492,fd=36494,dd=36495,pd=36283,md=36284,gd=36285,vd=36286;var dc=2300,rf=2301,ef=2302,ng=2400,ig=2401,sg=2402;var Tb=3200,Ab=3201;var Tg=0,wb=1,Ls="",un="srgb",lr="srgb-linear",pc="linear",fe="srgb";var sr=7680;var ag=519,Rb=512,Cb=513,Db=514,Ag=515,Nb=516,Ub=517,Lb=518,Ob=519,rg=35044;var wg="300 es",Di=2e3,mc=2001;var ws=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},_n=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wS=1234567,hc=Math.PI/180,Bo=180/Math.PI;function jo(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(_n[e&255]+_n[e>>8&255]+_n[e>>16&255]+_n[e>>24&255]+"-"+_n[t&255]+_n[t>>8&255]+"-"+_n[t>>16&15|64]+_n[t>>24&255]+"-"+_n[n&63|128]+_n[n>>8&255]+"-"+_n[n>>16&255]+_n[n>>24&255]+_n[i&255]+_n[i>>8&255]+_n[i>>16&255]+_n[i>>24&255]).toLowerCase()}function Jt(e,t,n){return Math.max(t,Math.min(n,e))}function Rg(e,t){return(e%t+t)%t}function uw(e,t,n,i,s){return i+(e-t)*(s-i)/(n-t)}function hw(e,t,n){return e!==t?(n-e)/(t-e):0}function fc(e,t,n){return(1-n)*e+n*t}function fw(e,t,n,i){return fc(e,t,1-Math.exp(-n*i))}function dw(e,t=1){return t-Math.abs(Rg(e,t*2)-t)}function pw(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function mw(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function gw(e,t){return e+Math.floor(Math.random()*(t-e+1))}function vw(e,t){return e+Math.random()*(t-e)}function _w(e){return e*(.5-Math.random())}function yw(e){e!==void 0&&(wS=e);let t=wS+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xw(e){return e*hc}function Mw(e){return e*Bo}function Sw(e){return(e&e-1)===0&&e!==0}function bw(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function Ew(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function Tw(e,t,n,i,s){let a=Math.cos,r=Math.sin,o=a(n/2),l=r(n/2),c=a((t+i)/2),f=r((t+i)/2),d=a((t-i)/2),h=r((t-i)/2),p=a((i-t)/2),v=r((i-t)/2);switch(s){case"XYX":e.set(o*f,l*d,l*h,o*c);break;case"YZY":e.set(l*h,o*f,l*d,o*c);break;case"ZXZ":e.set(l*d,l*h,o*f,o*c);break;case"XZX":e.set(o*f,l*v,l*p,o*c);break;case"YXY":e.set(l*p,o*f,l*v,o*c);break;case"ZYZ":e.set(l*v,l*p,o*f,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Oo(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function Rn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}var Xt={DEG2RAD:hc,RAD2DEG:Bo,generateUUID:jo,clamp:Jt,euclideanModulo:Rg,mapLinear:uw,inverseLerp:hw,lerp:fc,damp:fw,pingpong:dw,smoothstep:pw,smootherstep:mw,randInt:gw,randFloat:vw,randFloatSpread:_w,seededRandom:yw,degToRad:xw,radToDeg:Mw,isPowerOfTwo:Sw,ceilPowerOfTwo:bw,floorPowerOfTwo:Ew,setQuaternionFromProperEuler:Tw,normalize:Rn,denormalize:Oo},kt=class e{constructor(t=0,n=0){e.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Rs=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],f=i[s+2],d=i[s+3],h=a[r+0],p=a[r+1],v=a[r+2],x=a[r+3];if(o===0){t[n+0]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d;return}if(o===1){t[n+0]=h,t[n+1]=p,t[n+2]=v,t[n+3]=x;return}if(d!==x||l!==h||c!==p||f!==v){let g=1-o,u=l*h+c*p+f*v+d*x,m=u>=0?1:-1,_=1-u*u;if(_>Number.EPSILON){let E=Math.sqrt(_),A=Math.atan2(E,u*m);g=Math.sin(g*A)/E,o=Math.sin(o*A)/E}let y=o*m;if(l=l*g+h*y,c=c*g+p*y,f=f*g+v*y,d=d*g+x*y,g===1-o){let E=1/Math.sqrt(l*l+c*c+f*f+d*d);l*=E,c*=E,f*=E,d*=E}}t[n]=l,t[n+1]=c,t[n+2]=f,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],f=i[s+3],d=a[r],h=a[r+1],p=a[r+2],v=a[r+3];return t[n]=o*v+f*d+l*p-c*h,t[n+1]=l*v+f*h+c*d-o*p,t[n+2]=c*v+f*p+o*h-l*d,t[n+3]=f*v-o*d-l*h-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(s/2),d=o(a/2),h=l(i/2),p=l(s/2),v=l(a/2);switch(r){case"XYZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"YXZ":this._x=h*f*d+c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"ZXY":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d-h*p*v;break;case"ZYX":this._x=h*f*d-c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d+h*p*v;break;case"YZX":this._x=h*f*d+c*p*v,this._y=c*p*d+h*f*v,this._z=c*f*v-h*p*d,this._w=c*f*d-h*p*v;break;case"XZY":this._x=h*f*d-c*p*v,this._y=c*p*d-h*f*v,this._z=c*f*v+h*p*d,this._w=c*f*d+h*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],d=n[10],h=i+o+d;if(h>0){let p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(a-c)*p,this._z=(r-s)*p}else if(i>o&&i>d){let p=2*Math.sqrt(1+i-o-d);this._w=(f-l)/p,this._x=.25*p,this._y=(s+r)/p,this._z=(a+c)/p}else if(o>d){let p=2*Math.sqrt(1+o-i-d);this._w=(a-c)/p,this._x=(s+r)/p,this._y=.25*p,this._z=(l+f)/p}else{let p=2*Math.sqrt(1+d-i-o);this._w=(r-s)/p,this._x=(a+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Jt(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+s*c-a*l,this._y=s*f+r*l+a*o-i*c,this._z=a*f+r*c+i*l-s*o,this._w=r*f-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){if(n===0)return this;if(n===1)return this.copy(t);let i=this._x,s=this._y,a=this._z,r=this._w,o=r*t._w+i*t._x+s*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=i,this._y=s,this._z=a,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-n;return this._w=p*r+n*this._w,this._x=p*i+n*this._x,this._y=p*s+n*this._y,this._z=p*a+n*this._z,this.normalize(),this}let c=Math.sqrt(l),f=Math.atan2(c,o),d=Math.sin((1-n)*f)/c,h=Math.sin(n*f)/c;return this._w=r*d+this._w*h,this._x=i*d+this._x*h,this._y=s*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class e{constructor(t=0,n=0,i=0){e.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(RS.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(RS.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),f=2*(o*n-a*s),d=2*(a*i-r*n);return this.x=n+l*c+r*d-o*f,this.y=i+l*f+o*c-a*d,this.z=s+l*d+a*f-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return L0.copy(this).projectOnVector(t),this.sub(L0)}reflect(t){return this.sub(L0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(Jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},L0=new O,RS=new Rs,Bt=class e{constructor(t,n,i,s,a,r,o,l,c){e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let f=this.elements;return f[0]=t,f[1]=s,f[2]=o,f[3]=n,f[4]=a,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],d=i[7],h=i[2],p=i[5],v=i[8],x=s[0],g=s[3],u=s[6],m=s[1],_=s[4],y=s[7],E=s[2],A=s[5],w=s[8];return a[0]=r*x+o*m+l*E,a[3]=r*g+o*_+l*A,a[6]=r*u+o*y+l*w,a[1]=c*x+f*m+d*E,a[4]=c*g+f*_+d*A,a[7]=c*u+f*y+d*w,a[2]=h*x+p*m+v*E,a[5]=h*g+p*_+v*A,a[8]=h*u+p*y+v*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8];return n*r*f-n*o*c-i*a*f+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=f*r-o*c,h=o*l-f*a,p=c*a-r*l,v=n*d+i*h+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/v;return t[0]=d*x,t[1]=(s*c-f*i)*x,t[2]=(o*i-s*r)*x,t[3]=h*x,t[4]=(f*n-s*l)*x,t[5]=(s*a-o*n)*x,t[6]=p*x,t[7]=(i*l-c*n)*x,t[8]=(r*n-i*a)*x,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(O0.makeScale(t,n)),this}rotate(t){return this.premultiply(O0.makeRotation(-t)),this}translate(t,n){return this.premultiply(O0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},O0=new Bt;function Cg(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function gc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Ib(){let e=gc("canvas");return e.style.display="block",e}var CS={};function zo(e){e in CS||(CS[e]=!0,console.warn(e))}function Pb(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}var DS=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),NS=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Aw(){let e={enabled:!0,workingColorSpace:lr,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===fe&&(s.r=Ts(s.r),s.g=Ts(s.g),s.b=Ts(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===fe&&(s.r=Io(s.r),s.g=Io(s.g),s.b=Io(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ls?pc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return zo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return zo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[lr]:{primaries:t,whitePoint:i,transfer:pc,toXYZ:DS,fromXYZ:NS,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:un},outputColorSpaceConfig:{drawingBufferColorSpace:un}},[un]:{primaries:t,whitePoint:i,transfer:fe,toXYZ:DS,fromXYZ:NS,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:un}}}),e}var $t=Aw();function Ts(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Io(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}var So,of=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{So===void 0&&(So=gc("canvas")),So.width=t.width,So.height=t.height;let s=So.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=So}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=gc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Ts(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ts(n[i]/255)*255):n[i]=Ts(n[i]);return{data:n,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ww=0,Fo=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ww++}),this.uuid=jo(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(I0(s[r].image)):a.push(I0(s[r]))}else a=I0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};function I0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?of.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Rw=0,P0=new O,fn=class e extends ws{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=_a,s=_a,a=Ni,r=Ea,o=xi,l=Oi,c=e.DEFAULT_ANISOTROPY,f=Ls){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rw++}),this.uuid=jo(),this.name="",this.source=new Fo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(P0).x}get height(){return this.source.getSize(P0).y}get depth(){return this.source.getSize(P0).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gg)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case or:t.x=t.x-Math.floor(t.x);break;case _a:t.x=t.x<0?0:1;break;case af:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case or:t.y=t.y-Math.floor(t.y);break;case _a:t.y=t.y<0?0:1;break;case af:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};fn.DEFAULT_IMAGE=null;fn.DEFAULT_MAPPING=gg;fn.DEFAULT_ANISOTROPY=1;var he=class e{constructor(t=0,n=0,i=0,s=1){e.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],f=l[4],d=l[8],h=l[1],p=l[5],v=l[9],x=l[2],g=l[6],u=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-x)<.01&&Math.abs(v-g)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+x)<.1&&Math.abs(v+g)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let _=(c+1)/2,y=(p+1)/2,E=(u+1)/2,A=(f+h)/4,w=(d+x)/4,R=(v+g)/4;return _>y&&_>E?_<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(_),s=A/i,a=w/i):y>E?y<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(y),i=A/s,a=R/s):E<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(E),i=w/a,s=R/a),this.set(i,s,a,n),this}let m=Math.sqrt((g-v)*(g-v)+(d-x)*(d-x)+(h-f)*(h-f));return Math.abs(m)<.001&&(m=1),this.x=(g-v)/m,this.y=(d-x)/m,this.z=(h-f)/m,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Jt(this.x,t.x,n.x),this.y=Jt(this.y,t.y,n.y),this.z=Jt(this.z,t.z,n.z),this.w=Jt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Jt(this.x,t,n),this.y=Jt(this.y,t,n),this.z=Jt(this.z,t,n),this.w=Jt(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Jt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},lf=class extends ws{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ni,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new he(0,0,t,n),this.scissorTest=!1,this.viewport=new he(0,0,t,n);let s={width:t,height:n,depth:i.depth},a=new fn(s);this.textures=[];let r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){let n={minFilter:Ni,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new Fo(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},$i=class extends lf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},vc=class extends fn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=vi,this.minFilter=vi,this.wrapR=_a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var cf=class extends fn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=vi,this.minFilter=vi,this.wrapR=_a,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var xa=class{constructor(t=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(wi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(wi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=wi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,wi):wi.fromBufferAttribute(a,r),wi.applyMatrix4(t.matrixWorld),this.expandByPoint(wi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ih.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ih.copy(i.boundingBox)),Ih.applyMatrix4(t.matrixWorld),this.union(Ih)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,wi),wi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(rc),Ph.subVectors(this.max,rc),bo.subVectors(t.a,rc),Eo.subVectors(t.b,rc),To.subVectors(t.c,rc),ha.subVectors(Eo,bo),fa.subVectors(To,Eo),tr.subVectors(bo,To);let n=[0,-ha.z,ha.y,0,-fa.z,fa.y,0,-tr.z,tr.y,ha.z,0,-ha.x,fa.z,0,-fa.x,tr.z,0,-tr.x,-ha.y,ha.x,0,-fa.y,fa.x,0,-tr.y,tr.x,0];return!B0(n,bo,Eo,To,Ph)||(n=[1,0,0,0,1,0,0,0,1],!B0(n,bo,Eo,To,Ph))?!1:(Bh.crossVectors(ha,fa),n=[Bh.x,Bh.y,Bh.z],B0(n,bo,Eo,To,Ph))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,wi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(wi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(xs[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),xs[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),xs[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),xs[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),xs[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),xs[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),xs[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),xs[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(xs),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},xs=[new O,new O,new O,new O,new O,new O,new O,new O],wi=new O,Ih=new xa,bo=new O,Eo=new O,To=new O,ha=new O,fa=new O,tr=new O,rc=new O,Ph=new O,Bh=new O,er=new O;function B0(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){er.fromArray(e,a);let o=s.x*Math.abs(er.x)+s.y*Math.abs(er.y)+s.z*Math.abs(er.z),l=t.dot(er),c=n.dot(er),f=i.dot(er);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}var Cw=new xa,oc=new O,z0=new O,cr=class{constructor(t=new O,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):Cw.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;oc.subVectors(t,this.center);let n=oc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(oc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(z0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(oc.copy(t.center).add(z0)),this.expandByPoint(oc.copy(t.center).sub(z0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Ms=new O,F0=new O,zh=new O,da=new O,H0=new O,Fh=new O,V0=new O,_c=class{constructor(t=new O,n=new O(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ms)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Ms.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Ms.copy(this.origin).addScaledVector(this.direction,n),Ms.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){F0.copy(t).add(n).multiplyScalar(.5),zh.copy(n).sub(t).normalize(),da.copy(this.origin).sub(F0);let a=t.distanceTo(n)*.5,r=-this.direction.dot(zh),o=da.dot(this.direction),l=-da.dot(zh),c=da.lengthSq(),f=Math.abs(1-r*r),d,h,p,v;if(f>0)if(d=r*l-o,h=r*o-l,v=a*f,d>=0)if(h>=-v)if(h<=v){let x=1/f;d*=x,h*=x,p=d*(d+r*h+2*o)+h*(r*d+h+2*l)+c}else h=a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h=-a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;else h<=-v?(d=Math.max(0,-(-r*a+o)),h=d>0?-a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c):h<=v?(d=0,h=Math.min(Math.max(-a,-l),a),p=h*(h+2*l)+c):(d=Math.max(0,-(r*a+o)),h=d>0?a:Math.min(Math.max(-a,-l),a),p=-d*d+h*(h+2*l)+c);else h=r>0?-a:a,d=Math.max(0,-(r*h+o)),p=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(F0).addScaledVector(zh,h),p}intersectSphere(t,n){Ms.subVectors(t.center,this.origin);let i=Ms.dot(this.direction),s=Ms.dot(Ms)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(t.min.x-h.x)*c,s=(t.max.x-h.x)*c):(i=(t.max.x-h.x)*c,s=(t.min.x-h.x)*c),f>=0?(a=(t.min.y-h.y)*f,r=(t.max.y-h.y)*f):(a=(t.max.y-h.y)*f,r=(t.min.y-h.y)*f),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(t.min.z-h.z)*d,l=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,l=(t.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Ms)!==null}intersectTriangle(t,n,i,s,a){H0.subVectors(n,t),Fh.subVectors(i,t),V0.crossVectors(H0,Fh);let r=this.direction.dot(V0),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;da.subVectors(this.origin,t);let l=o*this.direction.dot(Fh.crossVectors(da,Fh));if(l<0)return null;let c=o*this.direction.dot(H0.cross(da));if(c<0||l+c>r)return null;let f=-o*da.dot(V0);return f<0?null:this.at(f/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Oe=class e{constructor(t,n,i,s,a,r,o,l,c,f,d,h,p,v,x,g){e.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,f,d,h,p,v,x,g)}set(t,n,i,s,a,r,o,l,c,f,d,h,p,v,x,g){let u=this.elements;return u[0]=t,u[4]=n,u[8]=i,u[12]=s,u[1]=a,u[5]=r,u[9]=o,u[13]=l,u[2]=c,u[6]=f,u[10]=d,u[14]=h,u[3]=p,u[7]=v,u[11]=x,u[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){let n=this.elements,i=t.elements,s=1/Ao.setFromMatrixColumn(t,0).length(),a=1/Ao.setFromMatrixColumn(t,1).length(),r=1/Ao.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),f=Math.cos(a),d=Math.sin(a);if(t.order==="XYZ"){let h=r*f,p=r*d,v=o*f,x=o*d;n[0]=l*f,n[4]=-l*d,n[8]=c,n[1]=p+v*c,n[5]=h-x*c,n[9]=-o*l,n[2]=x-h*c,n[6]=v+p*c,n[10]=r*l}else if(t.order==="YXZ"){let h=l*f,p=l*d,v=c*f,x=c*d;n[0]=h+x*o,n[4]=v*o-p,n[8]=r*c,n[1]=r*d,n[5]=r*f,n[9]=-o,n[2]=p*o-v,n[6]=x+h*o,n[10]=r*l}else if(t.order==="ZXY"){let h=l*f,p=l*d,v=c*f,x=c*d;n[0]=h-x*o,n[4]=-r*d,n[8]=v+p*o,n[1]=p+v*o,n[5]=r*f,n[9]=x-h*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let h=r*f,p=r*d,v=o*f,x=o*d;n[0]=l*f,n[4]=v*c-p,n[8]=h*c+x,n[1]=l*d,n[5]=x*c+h,n[9]=p*c-v,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let h=r*l,p=r*c,v=o*l,x=o*c;n[0]=l*f,n[4]=x-h*d,n[8]=v*d+p,n[1]=d,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*d+v,n[10]=h-x*d}else if(t.order==="XZY"){let h=r*l,p=r*c,v=o*l,x=o*c;n[0]=l*f,n[4]=-d,n[8]=c*f,n[1]=h*d+x,n[5]=r*f,n[9]=p*d-v,n[2]=v*d-p,n[6]=o*f,n[10]=x*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Dw,t,Nw)}lookAt(t,n,i){let s=this.elements;return ti.subVectors(t,n),ti.lengthSq()===0&&(ti.z=1),ti.normalize(),pa.crossVectors(i,ti),pa.lengthSq()===0&&(Math.abs(i.z)===1?ti.x+=1e-4:ti.z+=1e-4,ti.normalize(),pa.crossVectors(i,ti)),pa.normalize(),Hh.crossVectors(ti,pa),s[0]=pa.x,s[4]=Hh.x,s[8]=ti.x,s[1]=pa.y,s[5]=Hh.y,s[9]=ti.y,s[2]=pa.z,s[6]=Hh.z,s[10]=ti.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],d=i[5],h=i[9],p=i[13],v=i[2],x=i[6],g=i[10],u=i[14],m=i[3],_=i[7],y=i[11],E=i[15],A=s[0],w=s[4],R=s[8],b=s[12],M=s[1],D=s[5],U=s[9],z=s[13],V=s[2],Y=s[6],X=s[10],it=s[14],G=s[3],ot=s[7],ht=s[11],Et=s[15];return a[0]=r*A+o*M+l*V+c*G,a[4]=r*w+o*D+l*Y+c*ot,a[8]=r*R+o*U+l*X+c*ht,a[12]=r*b+o*z+l*it+c*Et,a[1]=f*A+d*M+h*V+p*G,a[5]=f*w+d*D+h*Y+p*ot,a[9]=f*R+d*U+h*X+p*ht,a[13]=f*b+d*z+h*it+p*Et,a[2]=v*A+x*M+g*V+u*G,a[6]=v*w+x*D+g*Y+u*ot,a[10]=v*R+x*U+g*X+u*ht,a[14]=v*b+x*z+g*it+u*Et,a[3]=m*A+_*M+y*V+E*G,a[7]=m*w+_*D+y*Y+E*ot,a[11]=m*R+_*U+y*X+E*ht,a[15]=m*b+_*z+y*it+E*Et,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],f=t[2],d=t[6],h=t[10],p=t[14],v=t[3],x=t[7],g=t[11],u=t[15];return v*(+a*l*d-s*c*d-a*o*h+i*c*h+s*o*p-i*l*p)+x*(+n*l*p-n*c*h+a*r*h-s*r*p+s*c*f-a*l*f)+g*(+n*c*d-n*o*p-a*r*d+i*r*p+a*o*f-i*c*f)+u*(-s*o*f-n*l*d+n*o*h+s*r*d-i*r*h+i*l*f)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],f=t[8],d=t[9],h=t[10],p=t[11],v=t[12],x=t[13],g=t[14],u=t[15],m=d*g*c-x*h*c+x*l*p-o*g*p-d*l*u+o*h*u,_=v*h*c-f*g*c-v*l*p+r*g*p+f*l*u-r*h*u,y=f*x*c-v*d*c+v*o*p-r*x*p-f*o*u+r*d*u,E=v*d*l-f*x*l-v*o*h+r*x*h+f*o*g-r*d*g,A=n*m+i*_+s*y+a*E;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/A;return t[0]=m*w,t[1]=(x*h*a-d*g*a-x*s*p+i*g*p+d*s*u-i*h*u)*w,t[2]=(o*g*a-x*l*a+x*s*c-i*g*c-o*s*u+i*l*u)*w,t[3]=(d*l*a-o*h*a-d*s*c+i*h*c+o*s*p-i*l*p)*w,t[4]=_*w,t[5]=(f*g*a-v*h*a+v*s*p-n*g*p-f*s*u+n*h*u)*w,t[6]=(v*l*a-r*g*a-v*s*c+n*g*c+r*s*u-n*l*u)*w,t[7]=(r*h*a-f*l*a+f*s*c-n*h*c-r*s*p+n*l*p)*w,t[8]=y*w,t[9]=(v*d*a-f*x*a-v*i*p+n*x*p+f*i*u-n*d*u)*w,t[10]=(r*x*a-v*o*a+v*i*c-n*x*c-r*i*u+n*o*u)*w,t[11]=(f*o*a-r*d*a-f*i*c+n*d*c+r*i*p-n*o*p)*w,t[12]=E*w,t[13]=(f*x*s-v*d*s+v*i*h-n*x*h-f*i*g+n*d*g)*w,t[14]=(v*o*s-r*x*s-v*i*l+n*x*l+r*i*g-n*o*g)*w,t[15]=(r*d*s-f*o*s+f*i*l-n*d*l-r*i*h+n*o*h)*w,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,f=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,f*o+i,f*l-s*r,0,c*l-s*o,f*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,f=r+r,d=o+o,h=a*c,p=a*f,v=a*d,x=r*f,g=r*d,u=o*d,m=l*c,_=l*f,y=l*d,E=i.x,A=i.y,w=i.z;return s[0]=(1-(x+u))*E,s[1]=(p+y)*E,s[2]=(v-_)*E,s[3]=0,s[4]=(p-y)*A,s[5]=(1-(h+u))*A,s[6]=(g+m)*A,s[7]=0,s[8]=(v+_)*w,s[9]=(g-m)*w,s[10]=(1-(h+x))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements,a=Ao.set(s[0],s[1],s[2]).length(),r=Ao.set(s[4],s[5],s[6]).length(),o=Ao.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],Ri.copy(this);let c=1/a,f=1/r,d=1/o;return Ri.elements[0]*=c,Ri.elements[1]*=c,Ri.elements[2]*=c,Ri.elements[4]*=f,Ri.elements[5]*=f,Ri.elements[6]*=f,Ri.elements[8]*=d,Ri.elements[9]*=d,Ri.elements[10]*=d,n.setFromRotationMatrix(Ri),i.x=a,i.y=r,i.z=o,this}makePerspective(t,n,i,s,a,r,o=Di,l=!1){let c=this.elements,f=2*a/(n-t),d=2*a/(i-s),h=(n+t)/(n-t),p=(i+s)/(i-s),v,x;if(l)v=a/(r-a),x=r*a/(r-a);else if(o===Di)v=-(r+a)/(r-a),x=-2*r*a/(r-a);else if(o===mc)v=-r/(r-a),x=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=Di,l=!1){let c=this.elements,f=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),p=-(i+s)/(i-s),v,x;if(l)v=1/(r-a),x=r/(r-a);else if(o===Di)v=-2/(r-a),x=-(r+a)/(r-a);else if(o===mc)v=-1/(r-a),x=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Ao=new O,Ri=new Oe,Dw=new O(0,0,0),Nw=new O(1,1,1),pa=new O,Hh=new O,ti=new O,US=new Oe,LS=new Rs,Ui=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],f=s[9],d=s[2],h=s[6],p=s[10];switch(n){case"XYZ":this._y=Math.asin(Jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Jt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Jt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Jt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return US.makeRotationFromQuaternion(t),this.setFromRotationMatrix(US,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return LS.setFromEuler(this),this.setFromQuaternion(LS,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Ui.DEFAULT_ORDER="XYZ";var yc=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Uw=0,OS=new O,wo=new Rs,Ss=new Oe,Vh=new O,lc=new O,Lw=new O,Ow=new Rs,IS=new O(1,0,0),PS=new O(0,1,0),BS=new O(0,0,1),zS={type:"added"},Iw={type:"removed"},Ro={type:"childadded",child:null},G0={type:"childremoved",child:null},dn=class e extends ws{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Uw++}),this.uuid=jo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new O,n=new Ui,i=new Rs,s=new O(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Bt}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return wo.setFromAxisAngle(t,n),this.quaternion.multiply(wo),this}rotateOnWorldAxis(t,n){return wo.setFromAxisAngle(t,n),this.quaternion.premultiply(wo),this}rotateX(t){return this.rotateOnAxis(IS,t)}rotateY(t){return this.rotateOnAxis(PS,t)}rotateZ(t){return this.rotateOnAxis(BS,t)}translateOnAxis(t,n){return OS.copy(t).applyQuaternion(this.quaternion),this.position.add(OS.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(IS,t)}translateY(t){return this.translateOnAxis(PS,t)}translateZ(t){return this.translateOnAxis(BS,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ss.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Vh.copy(t):Vh.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),lc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ss.lookAt(lc,Vh,this.up):Ss.lookAt(Vh,lc,this.up),this.quaternion.setFromRotationMatrix(Ss),s&&(Ss.extractRotation(s.matrixWorld),wo.setFromRotationMatrix(Ss),this.quaternion.premultiply(wo.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(zS),Ro.child=t,this.dispatchEvent(Ro),Ro.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(Iw),G0.child=t,this.dispatchEvent(G0),G0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ss.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ss.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ss),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(zS),Ro.child=t,this.dispatchEvent(Ro),Ro.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lc,t,Lw),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(lc,Ow,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){let i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){let d=l[c];a(t.shapes,d)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),f=r(t.images),d=r(t.shapes),h=r(t.skeletons),p=r(t.animations),v=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function r(o){let l=[];for(let c in o){let f=o[c];delete f.metadata,l.push(f)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};dn.DEFAULT_UP=new O(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ci=new O,bs=new O,k0=new O,Es=new O,Co=new O,Do=new O,FS=new O,X0=new O,W0=new O,q0=new O,Y0=new he,Z0=new he,K0=new he,va=class e{constructor(t=new O,n=new O,i=new O){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Ci.subVectors(t,n),s.cross(Ci);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){Ci.subVectors(s,n),bs.subVectors(i,n),k0.subVectors(t,n);let r=Ci.dot(Ci),o=Ci.dot(bs),l=Ci.dot(k0),c=bs.dot(bs),f=bs.dot(k0),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;let h=1/d,p=(c*l-o*f)*h,v=(r*f-o*l)*h;return a.set(1-p-v,v,p)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Es)===null?!1:Es.x>=0&&Es.y>=0&&Es.x+Es.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,Es)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Es.x),l.addScaledVector(r,Es.y),l.addScaledVector(o,Es.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return Y0.setScalar(0),Z0.setScalar(0),K0.setScalar(0),Y0.fromBufferAttribute(t,n),Z0.fromBufferAttribute(t,i),K0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Y0,a.x),r.addScaledVector(Z0,a.y),r.addScaledVector(K0,a.z),r}static isFrontFacing(t,n,i,s){return Ci.subVectors(i,n),bs.subVectors(t,n),Ci.cross(bs).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ci.subVectors(this.c,this.b),bs.subVectors(this.a,this.b),Ci.cross(bs).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Co.subVectors(s,i),Do.subVectors(a,i),X0.subVectors(t,i);let l=Co.dot(X0),c=Do.dot(X0);if(l<=0&&c<=0)return n.copy(i);W0.subVectors(t,s);let f=Co.dot(W0),d=Do.dot(W0);if(f>=0&&d<=f)return n.copy(s);let h=l*d-f*c;if(h<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(Co,r);q0.subVectors(t,a);let p=Co.dot(q0),v=Do.dot(q0);if(v>=0&&p<=v)return n.copy(a);let x=p*c-l*v;if(x<=0&&c>=0&&v<=0)return o=c/(c-v),n.copy(i).addScaledVector(Do,o);let g=f*v-p*d;if(g<=0&&d-f>=0&&p-v>=0)return FS.subVectors(a,s),o=(d-f)/(d-f+(p-v)),n.copy(s).addScaledVector(FS,o);let u=1/(g+x+h);return r=x*u,o=h*u,n.copy(i).addScaledVector(Co,r).addScaledVector(Do,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Bb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ma={h:0,s:0,l:0},Gh={h:0,s:0,l:0};function J0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Ht=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=un){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=$t.workingColorSpace){return this.r=t,this.g=n,this.b=i,$t.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=$t.workingColorSpace){if(t=Rg(t,1),n=Jt(n,0,1),i=Jt(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=J0(r,a,t+1/3),this.g=J0(r,a,t),this.b=J0(r,a,t-1/3)}return $t.colorSpaceToWorking(this,s),this}setStyle(t,n=un){function i(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=un){let i=Bb[t.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ts(t.r),this.g=Ts(t.g),this.b=Ts(t.b),this}copyLinearToSRGB(t){return this.r=Io(t.r),this.g=Io(t.g),this.b=Io(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=un){return $t.workingToColorSpace(yn.copy(this),t),Math.round(Jt(yn.r*255,0,255))*65536+Math.round(Jt(yn.g*255,0,255))*256+Math.round(Jt(yn.b*255,0,255))}getHexString(t=un){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=$t.workingColorSpace){$t.workingToColorSpace(yn.copy(this),n);let i=yn.r,s=yn.g,a=yn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,f=(o+r)/2;if(o===r)l=0,c=0;else{let d=r-o;switch(c=f<=.5?d/(r+o):d/(2-r-o),r){case i:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-i)/d+2;break;case a:l=(i-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=f,t}getRGB(t,n=$t.workingColorSpace){return $t.workingToColorSpace(yn.copy(this),n),t.r=yn.r,t.g=yn.g,t.b=yn.b,t}getStyle(t=un){$t.workingToColorSpace(yn.copy(this),t);let n=yn.r,i=yn.g,s=yn.b;return t!==un?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(ma),this.setHSL(ma.h+t,ma.s+n,ma.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ma),t.getHSL(Gh);let i=fc(ma.h,Gh.h,n),s=fc(ma.s,Gh.s,n),a=fc(ma.l,Gh.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new Ht;Ht.NAMES=Bb;var Pw=0,Cs=class extends ws{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pw++}),this.uuid=jo(),this.name="",this.type="Material",this.blending=ar,this.side=As,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nf,this.blendDst=sf,this.blendEquation=ya,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ht(0,0,0),this.blendAlpha=0,this.depthFunc=rr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ag,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ar&&(i.blending=this.blending),this.side!==As&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==nf&&(i.blendSrc=this.blendSrc),this.blendDst!==sf&&(i.blendDst=this.blendDst),this.blendEquation!==ya&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==rr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ag&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},ni=class extends Cs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ht(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=mg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ke=new O,kh=new kt,Bw=0,Cn=class{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Bw++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=rg,this.updateRanges=[],this.gpuType=es,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)kh.fromBufferAttribute(this,n),kh.applyMatrix3(t),this.setXY(n,kh.x,kh.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix3(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyMatrix4(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.applyNormalMatrix(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)ke.fromBufferAttribute(this,n),ke.transformDirection(t),this.setXYZ(n,ke.x,ke.y,ke.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Oo(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Rn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Oo(n,this.array)),n}setX(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Oo(n,this.array)),n}setY(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Oo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Oo(n,this.array)),n}setW(t,n){return this.normalized&&(n=Rn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array),s=Rn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Rn(n,this.array),i=Rn(i,this.array),s=Rn(s,this.array),a=Rn(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==rg&&(t.usage=this.usage),t}};var xc=class extends Cn{constructor(t,n,i){super(new Uint16Array(t),n,i)}};var Mc=class extends Cn{constructor(t,n,i){super(new Uint32Array(t),n,i)}};var se=class extends Cn{constructor(t,n,i){super(new Float32Array(t),n,i)}},zw=0,gi=new Oe,Q0=new dn,No=new O,ei=new xa,cc=new xa,tn=new O,en=class e extends ws{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zw++}),this.uuid=jo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Cg(t)?Mc:xc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new Bt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return gi.makeRotationFromQuaternion(t),this.applyMatrix4(gi),this}rotateX(t){return gi.makeRotationX(t),this.applyMatrix4(gi),this}rotateY(t){return gi.makeRotationY(t),this.applyMatrix4(gi),this}rotateZ(t){return gi.makeRotationZ(t),this.applyMatrix4(gi),this}translate(t,n,i){return gi.makeTranslation(t,n,i),this.applyMatrix4(gi),this}scale(t,n,i){return gi.makeScale(t,n,i),this.applyMatrix4(gi),this}lookAt(t){return Q0.lookAt(t),Q0.updateMatrix(),this.applyMatrix4(Q0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(No).negate(),this.translate(No.x,No.y,No.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new se(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xa);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];ei.setFromBufferAttribute(a),this.morphTargetsRelative?(tn.addVectors(this.boundingBox.min,ei.min),this.boundingBox.expandByPoint(tn),tn.addVectors(this.boundingBox.max,ei.max),this.boundingBox.expandByPoint(tn)):(this.boundingBox.expandByPoint(ei.min),this.boundingBox.expandByPoint(ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cr);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){let i=this.boundingSphere.center;if(ei.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];cc.setFromBufferAttribute(o),this.morphTargetsRelative?(tn.addVectors(ei.min,cc.min),ei.expandByPoint(tn),tn.addVectors(ei.max,cc.max),ei.expandByPoint(tn)):(ei.expandByPoint(cc.min),ei.expandByPoint(cc.max))}ei.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)tn.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(tn));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)tn.fromBufferAttribute(o,c),l&&(No.fromBufferAttribute(t,c),tn.add(No)),s=Math.max(s,i.distanceToSquared(tn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Cn(new Float32Array(4*i.count),4));let r=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<i.count;R++)o[R]=new O,l[R]=new O;let c=new O,f=new O,d=new O,h=new kt,p=new kt,v=new kt,x=new O,g=new O;function u(R,b,M){c.fromBufferAttribute(i,R),f.fromBufferAttribute(i,b),d.fromBufferAttribute(i,M),h.fromBufferAttribute(a,R),p.fromBufferAttribute(a,b),v.fromBufferAttribute(a,M),f.sub(c),d.sub(c),p.sub(h),v.sub(h);let D=1/(p.x*v.y-v.x*p.y);isFinite(D)&&(x.copy(f).multiplyScalar(v.y).addScaledVector(d,-p.y).multiplyScalar(D),g.copy(d).multiplyScalar(p.x).addScaledVector(f,-v.x).multiplyScalar(D),o[R].add(x),o[b].add(x),o[M].add(x),l[R].add(g),l[b].add(g),l[M].add(g))}let m=this.groups;m.length===0&&(m=[{start:0,count:t.count}]);for(let R=0,b=m.length;R<b;++R){let M=m[R],D=M.start,U=M.count;for(let z=D,V=D+U;z<V;z+=3)u(t.getX(z+0),t.getX(z+1),t.getX(z+2))}let _=new O,y=new O,E=new O,A=new O;function w(R){E.fromBufferAttribute(s,R),A.copy(E);let b=o[R];_.copy(b),_.sub(E.multiplyScalar(E.dot(b))).normalize(),y.crossVectors(A,b);let D=y.dot(l[R])<0?-1:1;r.setXYZW(R,_.x,_.y,_.z,D)}for(let R=0,b=m.length;R<b;++R){let M=m[R],D=M.start,U=M.count;for(let z=D,V=D+U;z<V;z+=3)w(t.getX(z+0)),w(t.getX(z+1)),w(t.getX(z+2))}}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Cn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);let s=new O,a=new O,r=new O,o=new O,l=new O,c=new O,f=new O,d=new O;if(t)for(let h=0,p=t.count;h<p;h+=3){let v=t.getX(h+0),x=t.getX(h+1),g=t.getX(h+2);s.fromBufferAttribute(n,v),a.fromBufferAttribute(n,x),r.fromBufferAttribute(n,g),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),o.fromBufferAttribute(i,v),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),o.add(f),l.add(f),c.add(f),i.setXYZ(v,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=n.count;h<p;h+=3)s.fromBufferAttribute(n,h+0),a.fromBufferAttribute(n,h+1),r.fromBufferAttribute(n,h+2),f.subVectors(r,a),d.subVectors(s,a),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)tn.fromBufferAttribute(t,n),tn.normalize(),t.setXYZ(n,tn.x,tn.y,tn.z)}toNonIndexed(){function t(o,l){let c=o.array,f=o.itemSize,d=o.normalized,h=new c.constructor(l.length*f),p=0,v=0;for(let x=0,g=l.length;x<g;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*f;for(let u=0;u<f;u++)h[v++]=c[p++]}return new Cn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let f=0,d=c.length;f<d;f++){let h=c[f],p=t(h,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],f=[];for(let d=0,h=c.length;d<h;d++){let p=c[d];f.push(p.toJSON(t.data))}f.length>0&&(s[l]=f,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let f=s[c];this.setAttribute(c,f.clone(n))}let a=t.morphAttributes;for(let c in a){let f=[],d=a[c];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,f=r.length;c<f;c++){let d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},HS=new Oe,nr=new _c,Xh=new cr,VS=new O,Wh=new O,qh=new O,Yh=new O,j0=new O,Zh=new O,GS=new O,Kh=new O,Qt=class extends dn{constructor(t=new en,n=new ni){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){Zh.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let f=o[l],d=a[l];f!==0&&(j0.fromBufferAttribute(d,t),r?Zh.addScaledVector(j0,f):Zh.addScaledVector(j0.sub(n),f))}n.add(Zh)}return n}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xh.copy(i.boundingSphere),Xh.applyMatrix4(a),nr.copy(t.ray).recast(t.near),!(Xh.containsPoint(nr.origin)===!1&&(nr.intersectSphere(Xh,VS)===null||nr.origin.distanceToSquared(VS)>(t.far-t.near)**2))&&(HS.copy(a).invert(),nr.copy(t.ray).applyMatrix4(HS),!(i.boundingBox!==null&&nr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,nr)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,f=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(o!==null)if(Array.isArray(r))for(let v=0,x=h.length;v<x;v++){let g=h[v],u=r[g.materialIndex],m=Math.max(g.start,p.start),_=Math.min(o.count,Math.min(g.start+g.count,p.start+p.count));for(let y=m,E=_;y<E;y+=3){let A=o.getX(y),w=o.getX(y+1),R=o.getX(y+2);s=Jh(this,u,t,i,c,f,d,A,w,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let g=v,u=x;g<u;g+=3){let m=o.getX(g),_=o.getX(g+1),y=o.getX(g+2);s=Jh(this,r,t,i,c,f,d,m,_,y),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let v=0,x=h.length;v<x;v++){let g=h[v],u=r[g.materialIndex],m=Math.max(g.start,p.start),_=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));for(let y=m,E=_;y<E;y+=3){let A=y,w=y+1,R=y+2;s=Jh(this,u,t,i,c,f,d,A,w,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=g.materialIndex,n.push(s))}}else{let v=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let g=v,u=x;g<u;g+=3){let m=g,_=g+1,y=g+2;s=Jh(this,r,t,i,c,f,d,m,_,y),s&&(s.faceIndex=Math.floor(g/3),n.push(s))}}}};function Fw(e,t,n,i,s,a,r,o){let l;if(t.side===Dn?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===As,o),l===null)return null;Kh.copy(o),Kh.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Kh);return c<n.near||c>n.far?null:{distance:c,point:Kh.clone(),object:e}}function Jh(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,Wh),e.getVertexPosition(l,qh),e.getVertexPosition(c,Yh);let f=Fw(e,t,n,i,Wh,qh,Yh,GS);if(f){let d=new O;va.getBarycoord(GS,Wh,qh,Yh,d),s&&(f.uv=va.getInterpolatedAttribute(s,o,l,c,d,new kt)),a&&(f.uv1=va.getInterpolatedAttribute(a,o,l,c,d,new kt)),r&&(f.normal=va.getInterpolatedAttribute(r,o,l,c,d,new O),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new O,materialIndex:0};va.getNormal(Wh,qh,Yh,h.normal),f.face=h,f.barycoord=d}return f}var _i=class e extends en{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],f=[],d=[],h=0,p=0;v("z","y","x",-1,-1,i,n,t,r,a,0),v("z","y","x",1,-1,i,n,-t,r,a,1),v("x","z","y",1,1,t,i,n,s,r,2),v("x","z","y",1,-1,t,i,-n,s,r,3),v("x","y","z",1,-1,t,n,i,s,a,4),v("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new se(c,3)),this.setAttribute("normal",new se(f,3)),this.setAttribute("uv",new se(d,2));function v(x,g,u,m,_,y,E,A,w,R,b){let M=y/w,D=E/R,U=y/2,z=E/2,V=A/2,Y=w+1,X=R+1,it=0,G=0,ot=new O;for(let ht=0;ht<X;ht++){let Et=ht*D-z;for(let Wt=0;Wt<Y;Wt++){let _e=Wt*M-U;ot[x]=_e*m,ot[g]=Et*_,ot[u]=V,c.push(ot.x,ot.y,ot.z),ot[x]=0,ot[g]=0,ot[u]=A>0?1:-1,f.push(ot.x,ot.y,ot.z),d.push(Wt/w),d.push(1-ht/R),it+=1}}for(let ht=0;ht<R;ht++)for(let Et=0;Et<w;Et++){let Wt=h+Et+Y*ht,_e=h+Et+Y*(ht+1),Ae=h+(Et+1)+Y*(ht+1),ae=h+(Et+1)+Y*ht;l.push(Wt,_e,ae),l.push(_e,Ae,ae),G+=6}o.addGroup(p,G,b),p+=G,h+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function gr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function Mn(e){let t={};for(let n=0;n<e.length;n++){let i=gr(e[n]);for(let s in i)t[s]=i[s]}return t}function Hw(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Dg(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var zb={clone:gr,merge:Mn},Vw=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Gw=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Li=class extends Cs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vw,this.fragmentShader=Gw,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=gr(t.uniforms),this.uniformsGroups=Hw(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}},Sc=class extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},ga=new O,kS=new kt,XS=new kt,hn=class extends Sc{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Bo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(hc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Bo*2*Math.atan(Math.tan(hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ga.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ga.x,ga.y).multiplyScalar(-t/ga.z),ga.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ga.x,ga.y).multiplyScalar(-t/ga.z)}getViewSize(t,n){return this.getViewBounds(t,kS,XS),n.subVectors(XS,kS)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(hc*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},Uo=-90,Lo=1,uf=class extends dn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new hn(Uo,Lo,t,n);s.layers=this.layers,this.add(s);let a=new hn(Uo,Lo,t,n);a.layers=this.layers,this.add(a);let r=new hn(Uo,Lo,t,n);r.layers=this.layers,this.add(r);let o=new hn(Uo,Lo,t,n);o.layers=this.layers,this.add(o);let l=new hn(Uo,Lo,t,n);l.layers=this.layers,this.add(l);let c=new hn(Uo,Lo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===Di)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===mc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,f]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),v=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(n,a),t.setRenderTarget(i,1,s),t.render(n,r),t.setRenderTarget(i,2,s),t.render(n,o),t.setRenderTarget(i,3,s),t.render(n,l),t.setRenderTarget(i,4,s),t.render(n,c),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),t.render(n,f),t.setRenderTarget(d,h,p),t.xr.enabled=v,i.texture.needsPMREMUpdate=!0}},bc=class extends fn{constructor(t=[],n=pr,i,s,a,r,o,l,c,f){super(t,n,i,s,a,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},hf=class extends $i{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new bc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new _i(5,5,5),a=new Li({name:"CubemapFromEquirect",uniforms:gr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Dn,blending:Ns});a.uniforms.tEquirect.value=n;let r=new Qt(s,a),o=n.minFilter;return n.minFilter===Ea&&(n.minFilter=Ni),new uf(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}},xn=class extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}},kw={type:"move"},Ho=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let x of t.hand.values()){let g=n.getJointPose(x,i),u=this._getHandJoint(c,x);g!==null&&(u.matrix.fromArray(g.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=g.radius),u.visible=g!==null}let f=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,v=.005;c.inputState.pinching&&h>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&h<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(kw)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new xn;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}};var Ec=class e{constructor(t,n=1,i=1e3){this.isFog=!0,this.name="",this.color=new Ht(t),this.near=n,this.far=i}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Tc=class extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ui,this.environmentIntensity=1,this.environmentRotation=new Ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}};var $0=new O,Xw=new O,Ww=new Bt,ji=class{constructor(t=new O(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=$0.subVectors(i,n).cross(Xw.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){let i=t.delta($0),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:n.copy(t.start).addScaledVector(i,a)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||Ww.getNormalMatrix(t),s=this.coplanarPoint($0).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},ir=new cr,qw=new kt(.5,.5),Qh=new O,Vo=class{constructor(t=new ji,n=new ji,i=new ji,s=new ji,a=new ji,r=new ji){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Di,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],f=a[4],d=a[5],h=a[6],p=a[7],v=a[8],x=a[9],g=a[10],u=a[11],m=a[12],_=a[13],y=a[14],E=a[15];if(s[0].setComponents(c-r,p-f,u-v,E-m).normalize(),s[1].setComponents(c+r,p+f,u+v,E+m).normalize(),s[2].setComponents(c+o,p+d,u+x,E+_).normalize(),s[3].setComponents(c-o,p-d,u-x,E-_).normalize(),i)s[4].setComponents(l,h,g,y).normalize(),s[5].setComponents(c-l,p-h,u-g,E-y).normalize();else if(s[4].setComponents(c-l,p-h,u-g,E-y).normalize(),n===Di)s[5].setComponents(c+l,p+h,u+g,E+y).normalize();else if(n===mc)s[5].setComponents(l,h,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ir.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ir)}intersectsSprite(t){ir.center.set(0,0,0);let n=qw.distanceTo(t.center);return ir.radius=.7071067811865476+n,ir.applyMatrix4(t.matrixWorld),this.intersectsSphere(ir)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(Qh.x=s.normal.x>0?t.max.x:t.min.x,Qh.y=s.normal.y>0?t.max.y:t.min.y,Qh.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qh)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Go=class extends Cs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ht(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},WS=new Oe,og=new _c,jh=new cr,$h=new O,Ac=class extends dn{constructor(t=new en,n=new Go){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){let i=this.geometry,s=this.matrixWorld,a=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),jh.copy(i.boundingSphere),jh.applyMatrix4(s),jh.radius+=a,t.ray.intersectsSphere(jh)===!1)return;WS.copy(s).invert(),og.copy(t.ray).applyMatrix4(WS);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let v=h,x=p;v<x;v++){let g=c.getX(v);$h.fromBufferAttribute(d,g),qS($h,g,l,s,t,n,this)}}else{let h=Math.max(0,r.start),p=Math.min(d.count,r.start+r.count);for(let v=h,x=p;v<x;v++)$h.fromBufferAttribute(d,v),qS($h,v,l,s,t,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}};function qS(e,t,n,i,s,a,r){let o=og.distanceSqToPoint(e);if(o<n){let l=new O;og.closestPointToPoint(e,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}var ko=class extends fn{constructor(t,n,i,s,a,r,o,l,c){super(t,n,i,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},wc=class extends fn{constructor(t,n,i=Ta,s,a,r,o=vi,l=vi,c,f=Po,d=1){if(f!==Po&&f!==Qo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:t,height:n,depth:d};super(h,s,a,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Fo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}},Rc=class extends fn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Xo=class e extends en{constructor(t=1,n=1,i=4,s=8,a=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:n,capSegments:i,radialSegments:s,heightSegments:a},n=Math.max(0,n),i=Math.max(1,Math.floor(i)),s=Math.max(3,Math.floor(s)),a=Math.max(1,Math.floor(a));let r=[],o=[],l=[],c=[],f=n/2,d=Math.PI/2*t,h=n,p=2*d+h,v=i*2+a,x=s+1,g=new O,u=new O;for(let m=0;m<=v;m++){let _=0,y=0,E=0,A=0;if(m<=i){let b=m/i,M=b*Math.PI/2;y=-f-t*Math.cos(M),E=t*Math.sin(M),A=-t*Math.cos(M),_=b*d}else if(m<=i+a){let b=(m-i)/a;y=-f+b*n,E=t,A=0,_=d+b*h}else{let b=(m-i-a)/i,M=b*Math.PI/2;y=f+t*Math.sin(M),E=t*Math.cos(M),A=t*Math.sin(M),_=d+h+b*d}let w=Math.max(0,Math.min(1,_/p)),R=0;m===0?R=.5/s:m===v&&(R=-.5/s);for(let b=0;b<=s;b++){let M=b/s,D=M*Math.PI*2,U=Math.sin(D),z=Math.cos(D);u.x=-E*z,u.y=y,u.z=E*U,o.push(u.x,u.y,u.z),g.set(-E*z,A,E*U),g.normalize(),l.push(g.x,g.y,g.z),c.push(M+R,w)}if(m>0){let b=(m-1)*x;for(let M=0;M<s;M++){let D=b+M,U=b+M+1,z=m*x+M,V=m*x+M+1;r.push(D,U,z),r.push(U,V,z)}}}this.setIndex(r),this.setAttribute("position",new se(o,3)),this.setAttribute("normal",new se(l,3)),this.setAttribute("uv",new se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}},Cc=class e extends en{constructor(t=1,n=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:n,thetaStart:i,thetaLength:s},n=Math.max(3,n);let a=[],r=[],o=[],l=[],c=new O,f=new kt;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=n;d++,h+=3){let p=i+d/n*s;c.x=t*Math.cos(p),c.y=t*Math.sin(p),r.push(c.x,c.y,c.z),o.push(0,0,1),f.x=(r[h]/t+1)/2,f.y=(r[h+1]/t+1)/2,l.push(f.x,f.y)}for(let d=1;d<=n;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new se(r,3)),this.setAttribute("normal",new se(o,3)),this.setAttribute("uv",new se(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Wo=class e extends en{constructor(t=1,n=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),a=Math.floor(a);let f=[],d=[],h=[],p=[],v=0,x=[],g=i/2,u=0;m(),r===!1&&(t>0&&_(!0),n>0&&_(!1)),this.setIndex(f),this.setAttribute("position",new se(d,3)),this.setAttribute("normal",new se(h,3)),this.setAttribute("uv",new se(p,2));function m(){let y=new O,E=new O,A=0,w=(n-t)/i;for(let R=0;R<=a;R++){let b=[],M=R/a,D=M*(n-t)+t;for(let U=0;U<=s;U++){let z=U/s,V=z*l+o,Y=Math.sin(V),X=Math.cos(V);E.x=D*Y,E.y=-M*i+g,E.z=D*X,d.push(E.x,E.y,E.z),y.set(Y,w,X).normalize(),h.push(y.x,y.y,y.z),p.push(z,1-M),b.push(v++)}x.push(b)}for(let R=0;R<s;R++)for(let b=0;b<a;b++){let M=x[b][R],D=x[b+1][R],U=x[b+1][R+1],z=x[b][R+1];(t>0||b!==0)&&(f.push(M,D,z),A+=3),(n>0||b!==a-1)&&(f.push(D,U,z),A+=3)}c.addGroup(u,A,0),u+=A}function _(y){let E=v,A=new kt,w=new O,R=0,b=y===!0?t:n,M=y===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,g*M,0),h.push(0,M,0),p.push(.5,.5),v++;let D=v;for(let U=0;U<=s;U++){let V=U/s*l+o,Y=Math.cos(V),X=Math.sin(V);w.x=b*X,w.y=g*M,w.z=b*Y,d.push(w.x,w.y,w.z),h.push(0,M,0),A.x=Y*.5+.5,A.y=X*.5*M+.5,p.push(A.x,A.y),v++}for(let U=0;U<s;U++){let z=E+U,V=D+U;y===!0?f.push(V,V+1,z):f.push(V+1,V,z),R+=3}c.addGroup(u,R,y===!0?1:2),u+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Dc=class e extends Wo{constructor(t=1,n=1,i=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,n,i,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ff=class e extends en{constructor(t=[],n=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:s};let a=[],r=[];o(s),c(i),f(),this.setAttribute("position",new se(a,3)),this.setAttribute("normal",new se(a.slice(),3)),this.setAttribute("uv",new se(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(m){let _=new O,y=new O,E=new O;for(let A=0;A<n.length;A+=3)p(n[A+0],_),p(n[A+1],y),p(n[A+2],E),l(_,y,E,m)}function l(m,_,y,E){let A=E+1,w=[];for(let R=0;R<=A;R++){w[R]=[];let b=m.clone().lerp(y,R/A),M=_.clone().lerp(y,R/A),D=A-R;for(let U=0;U<=D;U++)U===0&&R===A?w[R][U]=b:w[R][U]=b.clone().lerp(M,U/D)}for(let R=0;R<A;R++)for(let b=0;b<2*(A-R)-1;b++){let M=Math.floor(b/2);b%2===0?(h(w[R][M+1]),h(w[R+1][M]),h(w[R][M])):(h(w[R][M+1]),h(w[R+1][M+1]),h(w[R+1][M]))}}function c(m){let _=new O;for(let y=0;y<a.length;y+=3)_.x=a[y+0],_.y=a[y+1],_.z=a[y+2],_.normalize().multiplyScalar(m),a[y+0]=_.x,a[y+1]=_.y,a[y+2]=_.z}function f(){let m=new O;for(let _=0;_<a.length;_+=3){m.x=a[_+0],m.y=a[_+1],m.z=a[_+2];let y=g(m)/2/Math.PI+.5,E=u(m)/Math.PI+.5;r.push(y,1-E)}v(),d()}function d(){for(let m=0;m<r.length;m+=6){let _=r[m+0],y=r[m+2],E=r[m+4],A=Math.max(_,y,E),w=Math.min(_,y,E);A>.9&&w<.1&&(_<.2&&(r[m+0]+=1),y<.2&&(r[m+2]+=1),E<.2&&(r[m+4]+=1))}}function h(m){a.push(m.x,m.y,m.z)}function p(m,_){let y=m*3;_.x=t[y+0],_.y=t[y+1],_.z=t[y+2]}function v(){let m=new O,_=new O,y=new O,E=new O,A=new kt,w=new kt,R=new kt;for(let b=0,M=0;b<a.length;b+=9,M+=6){m.set(a[b+0],a[b+1],a[b+2]),_.set(a[b+3],a[b+4],a[b+5]),y.set(a[b+6],a[b+7],a[b+8]),A.set(r[M+0],r[M+1]),w.set(r[M+2],r[M+3]),R.set(r[M+4],r[M+5]),E.copy(m).add(_).add(y).divideScalar(3);let D=g(E);x(A,M+0,m,D),x(w,M+2,_,D),x(R,M+4,y,D)}}function x(m,_,y,E){E<0&&m.x===1&&(r[_]=m.x-1),y.x===0&&y.z===0&&(r[_]=E/2/Math.PI+.5)}function g(m){return Math.atan2(m.z,-m.x)}function u(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.details)}};var Nc=class e extends ff{constructor(t=1,n=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new e(t.radius,t.detail)}},Ma=class e extends en{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,f=l+1,d=t/o,h=n/l,p=[],v=[],x=[],g=[];for(let u=0;u<f;u++){let m=u*h-r;for(let _=0;_<c;_++){let y=_*d-a;v.push(y,-m,0),x.push(0,0,1),g.push(_/o),g.push(1-u/l)}}for(let u=0;u<l;u++)for(let m=0;m<o;m++){let _=m+c*u,y=m+c*(u+1),E=m+1+c*(u+1),A=m+1+c*u;p.push(_,y,A),p.push(y,E,A)}this.setIndex(p),this.setAttribute("position",new se(v,3)),this.setAttribute("normal",new se(x,3)),this.setAttribute("uv",new se(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Uc=class e extends en{constructor(t=.5,n=1,i=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:n,thetaSegments:i,phiSegments:s,thetaStart:a,thetaLength:r},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],f=[],d=t,h=(n-t)/s,p=new O,v=new kt;for(let x=0;x<=s;x++){for(let g=0;g<=i;g++){let u=a+g/i*r;p.x=d*Math.cos(u),p.y=d*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/n+1)/2,v.y=(p.y/n+1)/2,f.push(v.x,v.y)}d+=h}for(let x=0;x<s;x++){let g=x*(i+1);for(let u=0;u<i;u++){let m=u+g,_=m,y=m+i+1,E=m+i+2,A=m+1;o.push(_,y,A),o.push(y,E,A)}}this.setIndex(o),this.setAttribute("position",new se(l,3)),this.setAttribute("normal",new se(c,3)),this.setAttribute("uv",new se(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var Ds=class e extends en{constructor(t=1,n=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let l=Math.min(r+o,Math.PI),c=0,f=[],d=new O,h=new O,p=[],v=[],x=[],g=[];for(let u=0;u<=i;u++){let m=[],_=u/i,y=0;u===0&&r===0?y=.5/n:u===i&&l===Math.PI&&(y=-.5/n);for(let E=0;E<=n;E++){let A=E/n;d.x=-t*Math.cos(s+A*a)*Math.sin(r+_*o),d.y=t*Math.cos(r+_*o),d.z=t*Math.sin(s+A*a)*Math.sin(r+_*o),v.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),g.push(A+y,1-_),m.push(c++)}f.push(m)}for(let u=0;u<i;u++)for(let m=0;m<n;m++){let _=f[u][m+1],y=f[u][m],E=f[u+1][m],A=f[u+1][m+1];(u!==0||r>0)&&p.push(_,y,A),(u!==i-1||l<Math.PI)&&p.push(y,E,A)}this.setIndex(p),this.setAttribute("position",new se(v,3)),this.setAttribute("normal",new se(x,3)),this.setAttribute("uv",new se(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ur=class e extends en{constructor(t=1,n=.4,i=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:a},i=Math.floor(i),s=Math.floor(s);let r=[],o=[],l=[],c=[],f=new O,d=new O,h=new O;for(let p=0;p<=i;p++)for(let v=0;v<=s;v++){let x=v/s*a,g=p/i*Math.PI*2;d.x=(t+n*Math.cos(g))*Math.cos(x),d.y=(t+n*Math.cos(g))*Math.sin(x),d.z=n*Math.sin(g),o.push(d.x,d.y,d.z),f.x=t*Math.cos(x),f.y=t*Math.sin(x),h.subVectors(d,f).normalize(),l.push(h.x,h.y,h.z),c.push(v/s),c.push(p/i)}for(let p=1;p<=i;p++)for(let v=1;v<=s;v++){let x=(s+1)*p+v-1,g=(s+1)*(p-1)+v-1,u=(s+1)*(p-1)+v,m=(s+1)*p+v;r.push(x,g,m),r.push(g,u,m)}this.setIndex(r),this.setAttribute("position",new se(o,3)),this.setAttribute("normal",new se(l,3)),this.setAttribute("uv",new se(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Hn=class extends Cs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ht(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ht(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tg,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};var df=class extends Cs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},pf=class extends Cs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function tf(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function Yw(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}var hr=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},mf=class extends hr{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ng,endingEnd:ng}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case ig:a=t,o=2*n-i;break;case sg:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ig:r=t,l=2*i-n;break;case sg:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,f=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*f,this._offsetNext=r*f}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,p=this._weightNext,v=(i-n)/(s-n),x=v*v,g=x*v,u=-h*g+2*h*x-h*v,m=(1+h)*g+(-1.5-2*h)*x+(-.5+h)*v+1,_=(-1-p)*g+(1.5+p)*x+.5*v,y=p*g-p*x;for(let E=0;E!==o;++E)a[E]=u*r[f+E]+m*r[c+E]+_*r[l+E]+y*r[d+E];return a}},gf=class extends hr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,f=(i-n)/(s-n),d=1-f;for(let h=0;h!==o;++h)a[h]=r[c+h]*d+r[l+h]*f;return a}},vf=class extends hr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},ii=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=tf(n,this.TimeBufferType),this.values=tf(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:tf(t.times,Array),values:tf(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new vf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new gf(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new mf(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let n;switch(t){case dc:n=this.InterpolantFactoryMethodDiscrete;break;case rf:n=this.InterpolantFactoryMethodLinear;break;case ef:n=this.InterpolantFactoryMethodSmooth;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return dc;case this.InterpolantFactoryMethodLinear:return rf;case this.InterpolantFactoryMethodSmooth:return ef}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&Yw(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===ef,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],f=t[o+1];if(c!==f&&(o!==1||c!==t[0]))if(s)l=!0;else{let d=o*i,h=d-i,p=d+i;for(let v=0;v!==i;++v){let x=n[d+v];if(x!==n[h+v]||x!==n[p+v]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let d=o*i,h=r*i;for(let p=0;p!==i;++p)n[h+p]=n[d+p]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,s}};ii.prototype.ValueTypeName="";ii.prototype.TimeBufferType=Float32Array;ii.prototype.ValueBufferType=Float32Array;ii.prototype.DefaultInterpolation=rf;var Sa=class extends ii{constructor(t,n,i){super(t,n,i)}};Sa.prototype.ValueTypeName="bool";Sa.prototype.ValueBufferType=Array;Sa.prototype.DefaultInterpolation=dc;Sa.prototype.InterpolantFactoryMethodLinear=void 0;Sa.prototype.InterpolantFactoryMethodSmooth=void 0;var _f=class extends ii{constructor(t,n,i,s){super(t,n,i,s)}};_f.prototype.ValueTypeName="color";var yf=class extends ii{constructor(t,n,i,s){super(t,n,i,s)}};yf.prototype.ValueTypeName="number";var xf=class extends hr{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let f=c+o;c!==f;c+=4)Rs.slerpFlat(a,0,r,c-o,r,c,l);return a}},Lc=class extends ii{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new xf(this.times,this.values,this.getValueSize(),t)}};Lc.prototype.ValueTypeName="quaternion";Lc.prototype.InterpolantFactoryMethodSmooth=void 0;var ba=class extends ii{constructor(t,n,i){super(t,n,i)}};ba.prototype.ValueTypeName="string";ba.prototype.ValueBufferType=Array;ba.prototype.DefaultInterpolation=dc;ba.prototype.InterpolantFactoryMethodLinear=void 0;ba.prototype.InterpolantFactoryMethodSmooth=void 0;var Mf=class extends ii{constructor(t,n,i,s){super(t,n,i,s)}};Mf.prototype.ValueTypeName="vector";var Sf=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this.abortController=new AbortController,this.itemStart=function(f){o++,a===!1&&s.onStart!==void 0&&s.onStart(f,r,o),a=!0},this.itemEnd=function(f){r++,s.onProgress!==void 0&&s.onProgress(f,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(f){s.onError!==void 0&&s.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,d){return c.push(f,d),this},this.removeHandler=function(f){let d=c.indexOf(f);return d!==-1&&c.splice(d,2),this},this.getHandler=function(f){for(let d=0,h=c.length;d<h;d+=2){let p=c[d],v=c[d+1];if(p.global&&(p.lastIndex=0),p.test(f))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Fb=new Sf,bf=class{constructor(t){this.manager=t!==void 0?t:Fb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};bf.DEFAULT_MATERIAL_NAME="__DEFAULT";var qo=class extends dn{constructor(t,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ht(t),this.intensity=n}dispose(){}copy(t,n){return super.copy(t,n),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let n=super.toJSON(t);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}},Oc=class extends qo{constructor(t,n,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ht(n)}copy(t,n){return super.copy(t,n),this.groundColor.copy(t.groundColor),this}},tg=new Oe,YS=new O,ZS=new O,Ef=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=Oi,this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vo,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new he(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let n=this.camera,i=this.matrix;YS.setFromMatrixPosition(t.matrixWorld),n.position.copy(YS),ZS.setFromMatrixPosition(t.target.matrixWorld),n.lookAt(ZS),n.updateMatrixWorld(),tg.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(tg,n.coordinateSystem,n.reversedDepth),n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(tg)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var KS=new Oe,uc=new O,eg=new O,lg=class extends Ef{constructor(){super(new hn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new kt(4,2),this._viewportCount=6,this._viewports=[new he(2,1,1,1),new he(0,1,1,1),new he(3,1,1,1),new he(1,1,1,1),new he(3,0,1,1),new he(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(t,n=0){let i=this.camera,s=this.matrix,a=t.distance||i.far;a!==i.far&&(i.far=a,i.updateProjectionMatrix()),uc.setFromMatrixPosition(t.matrixWorld),i.position.copy(uc),eg.copy(i.position),eg.add(this._cubeDirections[n]),i.up.copy(this._cubeUps[n]),i.lookAt(eg),i.updateMatrixWorld(),s.makeTranslation(-uc.x,-uc.y,-uc.z),KS.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(KS,i.coordinateSystem,i.reversedDepth)}},fr=class extends qo{constructor(t,n,i=0,s=2){super(t,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new lg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,n){return super.copy(t,n),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}},Ic=class extends Sc{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},cg=class extends Ef{constructor(){super(new Ic(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Yo=class extends qo{constructor(t,n){super(t,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new cg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Tf=class extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},Pc=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let n=performance.now();t=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=t}return t}};var Ng="\\[\\]\\.:\\/",Zw=new RegExp("["+Ng+"]","g"),Ug="[^"+Ng+"]",Kw="[^"+Ng.replace("\\.","")+"]",Jw=/((?:WC+[\/:])*)/.source.replace("WC",Ug),Qw=/(WCOD+)?/.source.replace("WCOD",Kw),jw=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Ug),$w=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Ug),tR=new RegExp("^"+Jw+Qw+jw+$w+"$"),eR=["material","materials","bones","map"],ug=class{constructor(t,n,i){let s=i||Te.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Te=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(Zw,"")}static parseTrackName(t){let n=tR.exec(t);if(n===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);eR.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let f=0;f<t.length;f++)if(t[f].name===c){c=f;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=ug;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var ZD=new Float32Array(1);function Lg(e,t,n,i){let s=nR(i);switch(n){case Mg:return e*t;case bg:return e*t/s.components*s.byteLength;case Vf:return e*t/s.components*s.byteLength;case Eg:return e*t*2/s.components*s.byteLength;case Gf:return e*t*2/s.components*s.byteLength;case Sg:return e*t*3/s.components*s.byteLength;case xi:return e*t*4/s.components*s.byteLength;case kf:return e*t*4/s.components*s.byteLength;case Fc:case Hc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Vc:case Gc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Wf:case Yf:return Math.max(e,16)*Math.max(t,8)/4;case Xf:case qf:return Math.max(e,8)*Math.max(t,8)/2;case Zf:case Kf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Jf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Qf:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case jf:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case $f:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case td:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ed:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case nd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case id:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case sd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ad:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case rd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case od:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ld:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case cd:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ud:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case hd:case fd:case dd:return Math.ceil(e/4)*Math.ceil(t/4)*16;case pd:case md:return Math.ceil(e/4)*Math.ceil(t/4)*8;case gd:case vd:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function nR(e){switch(e){case Oi:case vg:return{byteLength:1,components:1};case Zo:case _g:case Ko:return{byteLength:2,components:1};case Ff:case Hf:return{byteLength:2,components:4};case Ta:case zf:case es:return{byteLength:4,components:1};case yg:case xg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function c1(){let e=null,t=!1,n=null,i=null;function s(a,r){n(a,r),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function sR(e){let t=new WeakMap;function n(o,l){let c=o.array,f=o.usage,d=c.byteLength,h=e.createBuffer();e.bindBuffer(l,h),e.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let f=l.array,d=l.updateRanges;if(e.bindBuffer(c,o),d.length===0)e.bufferSubData(c,0,f);else{d.sort((p,v)=>p.start-v.start);let h=0;for(let p=1;p<d.length;p++){let v=d[h],x=d[p];x.start<=v.start+v.count+1?v.count=Math.max(v.count,x.start+x.count-v.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,v=d.length;p<v;p++){let x=d[p];e.bufferSubData(c,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let f=t.get(o);(!f||f.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}var aR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rR=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,oR=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lR=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cR=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uR=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hR=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,fR=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dR=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,pR=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,mR=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,gR=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,vR=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_R=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,yR=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,xR=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,MR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SR=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bR=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ER=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,TR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,AR=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,wR=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,RR=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,CR=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,DR=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,NR=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,UR=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,LR=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,OR=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,IR="gl_FragColor = linearToOutputTexel( gl_FragColor );",PR=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,zR=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,FR=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,HR=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,VR=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,GR=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kR=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,XR=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,WR=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qR=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,YR=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ZR=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KR=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,JR=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,QR=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,jR=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$R=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,eC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,iC=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,aC=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,rC=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,oC=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lC=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cC=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uC=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hC=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fC=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dC=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,pC=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mC=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gC=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,vC=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_C=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,yC=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xC=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,MC=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,SC=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bC=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,EC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,TC=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,AC=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,wC=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,RC=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,CC=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,DC=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NC=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,UC=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,LC=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,OC=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IC=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,PC=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,BC=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,zC=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FC=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,HC=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,VC=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,GC=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,kC=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,XC=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,WC=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,qC=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,YC=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ZC=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,KC=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,JC=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,QC=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jC=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$C=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,t2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,e2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,n2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,i2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,s2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,a2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,h2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,f2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,d2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,p2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,m2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,v2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,y2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,b2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,T2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,A2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,C2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,U2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,L2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,O2=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,I2=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,P2=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B2=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:aR,alphahash_pars_fragment:rR,alphamap_fragment:oR,alphamap_pars_fragment:lR,alphatest_fragment:cR,alphatest_pars_fragment:uR,aomap_fragment:hR,aomap_pars_fragment:fR,batching_pars_vertex:dR,batching_vertex:pR,begin_vertex:mR,beginnormal_vertex:gR,bsdfs:vR,iridescence_fragment:_R,bumpmap_pars_fragment:yR,clipping_planes_fragment:xR,clipping_planes_pars_fragment:MR,clipping_planes_pars_vertex:SR,clipping_planes_vertex:bR,color_fragment:ER,color_pars_fragment:TR,color_pars_vertex:AR,color_vertex:wR,common:RR,cube_uv_reflection_fragment:CR,defaultnormal_vertex:DR,displacementmap_pars_vertex:NR,displacementmap_vertex:UR,emissivemap_fragment:LR,emissivemap_pars_fragment:OR,colorspace_fragment:IR,colorspace_pars_fragment:PR,envmap_fragment:BR,envmap_common_pars_fragment:zR,envmap_pars_fragment:FR,envmap_pars_vertex:HR,envmap_physical_pars_fragment:QR,envmap_vertex:VR,fog_vertex:GR,fog_pars_vertex:kR,fog_fragment:XR,fog_pars_fragment:WR,gradientmap_pars_fragment:qR,lightmap_pars_fragment:YR,lights_lambert_fragment:ZR,lights_lambert_pars_fragment:KR,lights_pars_begin:JR,lights_toon_fragment:jR,lights_toon_pars_fragment:$R,lights_phong_fragment:tC,lights_phong_pars_fragment:eC,lights_physical_fragment:nC,lights_physical_pars_fragment:iC,lights_fragment_begin:sC,lights_fragment_maps:aC,lights_fragment_end:rC,logdepthbuf_fragment:oC,logdepthbuf_pars_fragment:lC,logdepthbuf_pars_vertex:cC,logdepthbuf_vertex:uC,map_fragment:hC,map_pars_fragment:fC,map_particle_fragment:dC,map_particle_pars_fragment:pC,metalnessmap_fragment:mC,metalnessmap_pars_fragment:gC,morphinstance_vertex:vC,morphcolor_vertex:_C,morphnormal_vertex:yC,morphtarget_pars_vertex:xC,morphtarget_vertex:MC,normal_fragment_begin:SC,normal_fragment_maps:bC,normal_pars_fragment:EC,normal_pars_vertex:TC,normal_vertex:AC,normalmap_pars_fragment:wC,clearcoat_normal_fragment_begin:RC,clearcoat_normal_fragment_maps:CC,clearcoat_pars_fragment:DC,iridescence_pars_fragment:NC,opaque_fragment:UC,packing:LC,premultiplied_alpha_fragment:OC,project_vertex:IC,dithering_fragment:PC,dithering_pars_fragment:BC,roughnessmap_fragment:zC,roughnessmap_pars_fragment:FC,shadowmap_pars_fragment:HC,shadowmap_pars_vertex:VC,shadowmap_vertex:GC,shadowmask_pars_fragment:kC,skinbase_vertex:XC,skinning_pars_vertex:WC,skinning_vertex:qC,skinnormal_vertex:YC,specularmap_fragment:ZC,specularmap_pars_fragment:KC,tonemapping_fragment:JC,tonemapping_pars_fragment:QC,transmission_fragment:jC,transmission_pars_fragment:$C,uv_pars_fragment:t2,uv_pars_vertex:e2,uv_vertex:n2,worldpos_vertex:i2,background_vert:s2,background_frag:a2,backgroundCube_vert:r2,backgroundCube_frag:o2,cube_vert:l2,cube_frag:c2,depth_vert:u2,depth_frag:h2,distanceRGBA_vert:f2,distanceRGBA_frag:d2,equirect_vert:p2,equirect_frag:m2,linedashed_vert:g2,linedashed_frag:v2,meshbasic_vert:_2,meshbasic_frag:y2,meshlambert_vert:x2,meshlambert_frag:M2,meshmatcap_vert:S2,meshmatcap_frag:b2,meshnormal_vert:E2,meshnormal_frag:T2,meshphong_vert:A2,meshphong_frag:w2,meshphysical_vert:R2,meshphysical_frag:C2,meshtoon_vert:D2,meshtoon_frag:N2,points_vert:U2,points_frag:L2,shadow_vert:O2,shadow_frag:I2,sprite_vert:P2,sprite_frag:B2},rt={common:{diffuse:{value:new Ht(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ht(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ht(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new Ht(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},ns={basic:{uniforms:Mn([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Mn([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Mn([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new Ht(0)},specular:{value:new Ht(1118481)},shininess:{value:30}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Mn([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new Ht(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Mn([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new Ht(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Mn([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Mn([rt.points,rt.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Mn([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Mn([rt.common,rt.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Mn([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Mn([rt.sprite,rt.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distanceRGBA:{uniforms:Mn([rt.common,rt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distanceRGBA_vert,fragmentShader:Vt.distanceRGBA_frag},shadow:{uniforms:Mn([rt.lights,rt.fog,{color:{value:new Ht(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};ns.physical={uniforms:Mn([ns.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new Ht(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new Ht(0)},specularColor:{value:new Ht(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};var _d={r:0,b:0,g:0},vr=new Ui,z2=new Oe;function F2(e,t,n,i,s,a,r){let o=new Ht(0),l=a===!0?0:1,c,f,d=null,h=0,p=null;function v(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?n:t).get(y)),y}function x(_){let y=!1,E=v(_);E===null?u(o,l):E&&E.isColor&&(u(E,1),y=!0);let A=e.xr.getEnvironmentBlendMode();A==="additive"?i.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,r),(e.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(_,y){let E=v(y);E&&(E.isCubeTexture||E.mapping===Bc)?(f===void 0&&(f=new Qt(new _i(1,1,1),new Li({name:"BackgroundCubeMaterial",uniforms:gr(ns.backgroundCube.uniforms),vertexShader:ns.backgroundCube.vertexShader,fragmentShader:ns.backgroundCube.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(A,w,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(f)),vr.copy(y.backgroundRotation),vr.x*=-1,vr.y*=-1,vr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(vr.y*=-1,vr.z*=-1),f.material.uniforms.envMap.value=E,f.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(z2.makeRotationFromEuler(vr)),f.material.toneMapped=$t.getTransfer(E.colorSpace)!==fe,(d!==E||h!==E.version||p!==e.toneMapping)&&(f.material.needsUpdate=!0,d=E,h=E.version,p=e.toneMapping),f.layers.enableAll(),_.unshift(f,f.geometry,f.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Qt(new Ma(2,2),new Li({name:"BackgroundMaterial",uniforms:gr(ns.background.uniforms),vertexShader:ns.background.vertexShader,fragmentShader:ns.background.fragmentShader,side:As,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=$t.getTransfer(E.colorSpace)!==fe,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||h!==E.version||p!==e.toneMapping)&&(c.material.needsUpdate=!0,d=E,h=E.version,p=e.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function u(_,y){_.getRGB(_d,Dg(e)),i.buffers.color.setClear(_d.r,_d.g,_d.b,y,r)}function m(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),l=y,u(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,u(o,l)},render:x,addToRenderList:g,dispose:m}}function H2(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null),a=s,r=!1;function o(M,D,U,z,V){let Y=!1,X=d(z,U,D);a!==X&&(a=X,c(a.object)),Y=p(M,z,U,V),Y&&v(M,z,U,V),V!==null&&t.update(V,e.ELEMENT_ARRAY_BUFFER),(Y||r)&&(r=!1,y(M,D,U,z),V!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return e.createVertexArray()}function c(M){return e.bindVertexArray(M)}function f(M){return e.deleteVertexArray(M)}function d(M,D,U){let z=U.wireframe===!0,V=i[M.id];V===void 0&&(V={},i[M.id]=V);let Y=V[D.id];Y===void 0&&(Y={},V[D.id]=Y);let X=Y[z];return X===void 0&&(X=h(l()),Y[z]=X),X}function h(M){let D=[],U=[],z=[];for(let V=0;V<n;V++)D[V]=0,U[V]=0,z[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:z,object:M,attributes:{},index:null}}function p(M,D,U,z){let V=a.attributes,Y=D.attributes,X=0,it=U.getAttributes();for(let G in it)if(it[G].location>=0){let ht=V[G],Et=Y[G];if(Et===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(Et=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(Et=M.instanceColor)),ht===void 0||ht.attribute!==Et||Et&&ht.data!==Et.data)return!0;X++}return a.attributesNum!==X||a.index!==z}function v(M,D,U,z){let V={},Y=D.attributes,X=0,it=U.getAttributes();for(let G in it)if(it[G].location>=0){let ht=Y[G];ht===void 0&&(G==="instanceMatrix"&&M.instanceMatrix&&(ht=M.instanceMatrix),G==="instanceColor"&&M.instanceColor&&(ht=M.instanceColor));let Et={};Et.attribute=ht,ht&&ht.data&&(Et.data=ht.data),V[G]=Et,X++}a.attributes=V,a.attributesNum=X,a.index=z}function x(){let M=a.newAttributes;for(let D=0,U=M.length;D<U;D++)M[D]=0}function g(M){u(M,0)}function u(M,D){let U=a.newAttributes,z=a.enabledAttributes,V=a.attributeDivisors;U[M]=1,z[M]===0&&(e.enableVertexAttribArray(M),z[M]=1),V[M]!==D&&(e.vertexAttribDivisor(M,D),V[M]=D)}function m(){let M=a.newAttributes,D=a.enabledAttributes;for(let U=0,z=D.length;U<z;U++)D[U]!==M[U]&&(e.disableVertexAttribArray(U),D[U]=0)}function _(M,D,U,z,V,Y,X){X===!0?e.vertexAttribIPointer(M,D,U,V,Y):e.vertexAttribPointer(M,D,U,z,V,Y)}function y(M,D,U,z){x();let V=z.attributes,Y=U.getAttributes(),X=D.defaultAttributeValues;for(let it in Y){let G=Y[it];if(G.location>=0){let ot=V[it];if(ot===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor)),ot!==void 0){let ht=ot.normalized,Et=ot.itemSize,Wt=t.get(ot);if(Wt===void 0)continue;let _e=Wt.buffer,Ae=Wt.type,ae=Wt.bytesPerElement,Z=Ae===e.INT||Ae===e.UNSIGNED_INT||ot.gpuType===zf;if(ot.isInterleavedBufferAttribute){let j=ot.data,pt=j.stride,Ut=ot.offset;if(j.isInstancedInterleavedBuffer){for(let bt=0;bt<G.locationSize;bt++)u(G.location+bt,j.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let bt=0;bt<G.locationSize;bt++)g(G.location+bt);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let bt=0;bt<G.locationSize;bt++)_(G.location+bt,Et/G.locationSize,Ae,ht,pt*ae,(Ut+Et/G.locationSize*bt)*ae,Z)}else{if(ot.isInstancedBufferAttribute){for(let j=0;j<G.locationSize;j++)u(G.location+j,ot.meshPerAttribute);M.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let j=0;j<G.locationSize;j++)g(G.location+j);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let j=0;j<G.locationSize;j++)_(G.location+j,Et/G.locationSize,Ae,ht,Et*ae,Et/G.locationSize*j*ae,Z)}}else if(X!==void 0){let ht=X[it];if(ht!==void 0)switch(ht.length){case 2:e.vertexAttrib2fv(G.location,ht);break;case 3:e.vertexAttrib3fv(G.location,ht);break;case 4:e.vertexAttrib4fv(G.location,ht);break;default:e.vertexAttrib1fv(G.location,ht)}}}}m()}function E(){R();for(let M in i){let D=i[M];for(let U in D){let z=D[U];for(let V in z)f(z[V].object),delete z[V];delete D[U]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;let D=i[M.id];for(let U in D){let z=D[U];for(let V in z)f(z[V].object),delete z[V];delete D[U]}delete i[M.id]}function w(M){for(let D in i){let U=i[D];if(U[M.id]===void 0)continue;let z=U[M.id];for(let V in z)f(z[V].object),delete z[V];delete U[M.id]}}function R(){b(),r=!0,a!==s&&(a=s,c(a.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:E,releaseStatesOfGeometry:A,releaseStatesOfProgram:w,initAttributes:x,enableAttribute:g,disableUnusedAttributes:m}}function V2(e,t,n){let i;function s(c){i=c}function a(c,f){e.drawArrays(i,c,f),n.update(f,i,1)}function r(c,f,d){d!==0&&(e.drawArraysInstanced(i,c,f,d),n.update(f,i,d))}function o(c,f,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,f,0,d);let p=0;for(let v=0;v<d;v++)p+=f[v];n.update(p,i,1)}function l(c,f,d,h){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)r(c[v],f[v],h[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,f,0,h,0,d);let v=0;for(let x=0;x<d;x++)v+=f[x]*h[x];n.update(v,i,1)}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function G2(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==xi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let R=w===Ko&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==Oi&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==es&&!R)}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",f=l(c);f!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);let d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),v=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),u=e.getParameter(e.MAX_VERTEX_ATTRIBS),m=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),_=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),E=v>0,A=e.getParameter(e.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:p,maxVertexTextures:v,maxTextureSize:x,maxCubemapSize:g,maxAttributes:u,maxVertexUniforms:m,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:E,maxSamples:A}}function k2(e){let t=this,n=null,i=0,s=!1,a=!1,r=new ji,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let p=d.length!==0||h||i!==0||s;return s=h,i=d.length,p},this.beginShadows=function(){a=!0,f(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){let v=d.clippingPlanes,x=d.clipIntersection,g=d.clipShadows,u=e.get(d);if(!s||v===null||v.length===0||a&&!g)a?f(null):c();else{let m=a?0:i,_=m*4,y=u.clippingState||null;l.value=y,y=f(v,h,_,p);for(let E=0;E!==_;++E)y[E]=n[E];u.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=m}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function f(d,h,p,v){let x=d!==null?d.length:0,g=null;if(x!==0){if(g=l.value,v!==!0||g===null){let u=p+x*4,m=h.matrixWorldInverse;o.getNormalMatrix(m),(g===null||g.length<u)&&(g=new Float32Array(u));for(let _=0,y=p;_!==x;++_,y+=4)r.copy(d[_]).applyMatrix4(m,o),r.normal.toArray(g,y),g[y+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,g}}function X2(e){let t=new WeakMap;function n(r,o){return o===If?r.mapping=pr:o===Pf&&(r.mapping=mr),r}function i(r){if(r&&r.isTexture){let o=r.mapping;if(o===If||o===Pf)if(t.has(r)){let l=t.get(r).texture;return n(l,r.mapping)}else{let l=r.image;if(l&&l.height>0){let c=new hf(l.height);return c.fromEquirectangularTexture(e,r),t.set(r,c),r.addEventListener("dispose",s),n(c.texture,r.mapping)}else return null}}return r}function s(r){let o=r.target;o.removeEventListener("dispose",s);let l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:i,dispose:a}}var tl=4,Hb=[.125,.215,.35,.446,.526,.582],xr=20,Og=new Ic,Vb=new Ht,Ig=null,Pg=0,Bg=0,zg=!1,yr=(1+Math.sqrt(5))/2,$o=1/yr,Gb=[new O(-yr,$o,0),new O(yr,$o,0),new O(-$o,0,yr),new O($o,0,yr),new O(0,yr,-$o),new O(0,yr,$o),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],W2=new O,Md=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=W2}=a;Ig=this._renderer.getRenderTarget(),Pg=this._renderer.getActiveCubeFace(),Bg=this._renderer.getActiveMipmapLevel(),zg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wb(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Xb(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ig,Pg,Bg),this._renderer.xr.enabled=zg,t.scissorTest=!1,yd(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===pr||t.mapping===mr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ig=this._renderer.getRenderTarget(),Pg=this._renderer.getActiveCubeFace(),Bg=this._renderer.getActiveMipmapLevel(),zg=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ni,minFilter:Ni,generateMipmaps:!1,type:Ko,format:xi,colorSpace:lr,depthBuffer:!1},s=kb(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=kb(t,n,i);let{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=q2(a)),this._blurMaterial=Y2(a,t,n)}return s}_compileMaterial(t){let n=new Qt(this._lodPlanes[0],t);this._renderer.compile(n,Og)}_sceneToCubeUV(t,n,i,s,a){let l=new hn(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Vb),d.toneMapping=Us,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null));let x=new ni({name:"PMREM.Background",side:Dn,depthWrite:!1,depthTest:!1}),g=new Qt(new _i,x),u=!1,m=t.background;m?m.isColor&&(x.color.copy(m),t.background=null,u=!0):(x.color.copy(Vb),u=!0);for(let _=0;_<6;_++){let y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+f[_],a.y,a.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+f[_],a.z)):(l.up.set(0,c[_],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+f[_]));let E=this._cubeSize;yd(s,y*E,_>2?E:0,E,E),d.setRenderTarget(s),u&&d.render(g,l),d.render(t,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=p,d.autoClear=h,t.background=m}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===pr||t.mapping===mr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wb()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Xb());let a=s?this._cubemapMaterial:this._equirectMaterial,r=new Qt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;yd(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Og)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodPlanes.length;for(let a=1;a<s;a++){let r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=Gb[(s-a-1)%Gb.length];this._blur(t,a-1,a,r,o)}n.autoClear=i}_blur(t,n,i,s,a){let r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,s,"latitudinal",a),this._halfBlur(r,t,i,i,s,"longitudinal",a)}_halfBlur(t,n,i,s,a,r,o){let l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let f=3,d=new Qt(this._lodPlanes[s],c),h=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(a)?Math.PI/(2*p):2*Math.PI/(2*xr-1),x=a/v,g=isFinite(a)?1+Math.floor(f*x):xr;g>xr&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${xr}`);let u=[],m=0;for(let w=0;w<xr;++w){let R=w/x,b=Math.exp(-R*R/2);u.push(b),w===0?m+=b:w<g&&(m+=2*b)}for(let w=0;w<u.length;w++)u[w]=u[w]/m;h.envMap.value=t.texture,h.samples.value=g,h.weights.value=u,h.latitudinal.value=r==="latitudinal",o&&(h.poleAxis.value=o);let{_lodMax:_}=this;h.dTheta.value=v,h.mipInt.value=_-i;let y=this._sizeLods[s],E=3*y*(s>_-tl?s-_+tl:0),A=4*(this._cubeSize-y);yd(n,E,A,3*y,2*y),l.setRenderTarget(n),l.render(d,Og)}};function q2(e){let t=[],n=[],i=[],s=e,a=e-tl+1+Hb.length;for(let r=0;r<a;r++){let o=Math.pow(2,s);n.push(o);let l=1/o;r>e-tl?l=Hb[r-e+tl-1]:r===0&&(l=0),i.push(l);let c=1/(o-2),f=-c,d=1+c,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,v=6,x=3,g=2,u=1,m=new Float32Array(x*v*p),_=new Float32Array(g*v*p),y=new Float32Array(u*v*p);for(let A=0;A<p;A++){let w=A%3*2/3-1,R=A>2?0:-1,b=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];m.set(b,x*v*A),_.set(h,g*v*A);let M=[A,A,A,A,A,A];y.set(M,u*v*A)}let E=new en;E.setAttribute("position",new Cn(m,x)),E.setAttribute("uv",new Cn(_,g)),E.setAttribute("faceIndex",new Cn(y,u)),t.push(E),s>tl&&s--}return{lodPlanes:t,sizeLods:n,sigmas:i}}function kb(e,t,n){let i=new $i(e,t,n);return i.texture.mapping=Bc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function yd(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function Y2(e,t,n){let i=new Float32Array(xr),s=new O(0,1,0);return new Li({name:"SphericalGaussianBlur",defines:{n:xr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Zg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function Xb(){return new Li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function Wb(){return new Li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zg(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ns,depthTest:!1,depthWrite:!1})}function Zg(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Z2(e){let t=new WeakMap,n=null;function i(o){if(o&&o.isTexture){let l=o.mapping,c=l===If||l===Pf,f=l===pr||l===mr;if(c||f){let d=t.get(o),h=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==h)return n===null&&(n=new Md(e)),d=c?n.fromEquirectangular(o,d):n.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let p=o.image;return c&&p&&p.height>0||f&&p&&s(p)?(n===null&&(n=new Md(e)),d=c?n.fromEquirectangular(o):n.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0,c=6;for(let f=0;f<c;f++)o[f]!==void 0&&l++;return l===c}function a(o){let l=o.target;l.removeEventListener("dispose",a);let c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:r}}function K2(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=e.getExtension("WEBGL_depth_texture")||e.getExtension("MOZ_WEBGL_depth_texture")||e.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=e.getExtension("EXT_texture_filter_anisotropic")||e.getExtension("MOZ_EXT_texture_filter_anisotropic")||e.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=e.getExtension("WEBGL_compressed_texture_s3tc")||e.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=e.getExtension("WEBGL_compressed_texture_pvrtc")||e.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=e.getExtension(i)}return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&zo("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function J2(e,t,n,i){let s={},a=new WeakMap;function r(d){let h=d.target;h.index!==null&&t.remove(h.index);for(let v in h.attributes)t.remove(h.attributes[v]);h.removeEventListener("dispose",r),delete s[h.id];let p=a.get(h);p&&(t.remove(p),a.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",r),s[h.id]=!0,n.memory.geometries++),h}function l(d){let h=d.attributes;for(let p in h)t.update(h[p],e.ARRAY_BUFFER)}function c(d){let h=[],p=d.index,v=d.attributes.position,x=0;if(p!==null){let m=p.array;x=p.version;for(let _=0,y=m.length;_<y;_+=3){let E=m[_+0],A=m[_+1],w=m[_+2];h.push(E,A,A,w,w,E)}}else if(v!==void 0){let m=v.array;x=v.version;for(let _=0,y=m.length/3-1;_<y;_+=3){let E=_+0,A=_+1,w=_+2;h.push(E,A,A,w,w,E)}}else return;let g=new(Cg(h)?Mc:xc)(h,1);g.version=x;let u=a.get(d);u&&t.remove(u),a.set(d,g)}function f(d){let h=a.get(d);if(h){let p=d.index;p!==null&&h.version<p.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:f}}function Q2(e,t,n){let i;function s(h){i=h}let a,r;function o(h){a=h.type,r=h.bytesPerElement}function l(h,p){e.drawElements(i,p,a,h*r),n.update(p,i,1)}function c(h,p,v){v!==0&&(e.drawElementsInstanced(i,p,a,h*r,v),n.update(p,i,v))}function f(h,p,v){if(v===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,a,h,0,v);let g=0;for(let u=0;u<v;u++)g+=p[u];n.update(g,i,1)}function d(h,p,v,x){if(v===0)return;let g=t.get("WEBGL_multi_draw");if(g===null)for(let u=0;u<h.length;u++)c(h[u]/r,p[u],x[u]);else{g.multiDrawElementsInstancedWEBGL(i,p,0,a,h,0,x,0,v);let u=0;for(let m=0;m<v;m++)u+=p[m]*x[m];n.update(u,i,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function j2(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function $2(e,t,n){let i=new WeakMap,s=new he;function a(r,o,l){let c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=f!==void 0?f.length:0,h=i.get(o);if(h===void 0||h.count!==d){let b=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",b)};h!==void 0&&h.texture.dispose();let p=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],u=o.morphAttributes.normal||[],m=o.morphAttributes.color||[],_=0;p===!0&&(_=1),v===!0&&(_=2),x===!0&&(_=3);let y=o.attributes.position.count*_,E=1;y>t.maxTextureSize&&(E=Math.ceil(y/t.maxTextureSize),y=t.maxTextureSize);let A=new Float32Array(y*E*4*d),w=new vc(A,y,E,d);w.type=es,w.needsUpdate=!0;let R=_*4;for(let M=0;M<d;M++){let D=g[M],U=u[M],z=m[M],V=y*E*4*M;for(let Y=0;Y<D.count;Y++){let X=Y*R;p===!0&&(s.fromBufferAttribute(D,Y),A[V+X+0]=s.x,A[V+X+1]=s.y,A[V+X+2]=s.z,A[V+X+3]=0),v===!0&&(s.fromBufferAttribute(U,Y),A[V+X+4]=s.x,A[V+X+5]=s.y,A[V+X+6]=s.z,A[V+X+7]=0),x===!0&&(s.fromBufferAttribute(z,Y),A[V+X+8]=s.x,A[V+X+9]=s.y,A[V+X+10]=s.z,A[V+X+11]=z.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new kt(y,E)},i.set(o,h),o.addEventListener("dispose",b)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let v=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(e,"morphTargetBaseInfluence",v),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:a}}function t3(e,t,n,i){let s=new WeakMap;function a(l){let c=i.render.frame,f=l.geometry,d=t.get(l,f);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let h=l.skeleton;s.get(h)!==c&&(h.update(),s.set(h,c))}return d}function r(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),n.remove(c.instanceMatrix),c.instanceColor!==null&&n.remove(c.instanceColor)}return{update:a,dispose:r}}var u1=new fn,qb=new wc(1,1),h1=new vc,f1=new cf,d1=new bc,Yb=[],Zb=[],Kb=new Float32Array(16),Jb=new Float32Array(9),Qb=new Float32Array(4);function nl(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=Yb[s];if(a===void 0&&(a=new Float32Array(s),Yb[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function Ye(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ze(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function bd(e,t){let n=Zb[t];n===void 0&&(n=new Int32Array(t),Zb[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function e3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function n3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2fv(this.addr,t),Ze(n,t)}}function i3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ye(n,t))return;e.uniform3fv(this.addr,t),Ze(n,t)}}function s3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4fv(this.addr,t),Ze(n,t)}}function a3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;Qb.set(i),e.uniformMatrix2fv(this.addr,!1,Qb),Ze(n,i)}}function r3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;Jb.set(i),e.uniformMatrix3fv(this.addr,!1,Jb),Ze(n,i)}}function o3(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(Ye(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ze(n,t)}else{if(Ye(n,i))return;Kb.set(i),e.uniformMatrix4fv(this.addr,!1,Kb),Ze(n,i)}}function l3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function c3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2iv(this.addr,t),Ze(n,t)}}function u3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ye(n,t))return;e.uniform3iv(this.addr,t),Ze(n,t)}}function h3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4iv(this.addr,t),Ze(n,t)}}function f3(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function d3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ye(n,t))return;e.uniform2uiv(this.addr,t),Ze(n,t)}}function p3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ye(n,t))return;e.uniform3uiv(this.addr,t),Ze(n,t)}}function m3(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ye(n,t))return;e.uniform4uiv(this.addr,t),Ze(n,t)}}function g3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(qb.compareFunction=Ag,a=qb):a=u1,n.setTexture2D(t||a,s)}function v3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||f1,s)}function _3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||d1,s)}function y3(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||h1,s)}function x3(e){switch(e){case 5126:return e3;case 35664:return n3;case 35665:return i3;case 35666:return s3;case 35674:return a3;case 35675:return r3;case 35676:return o3;case 5124:case 35670:return l3;case 35667:case 35671:return c3;case 35668:case 35672:return u3;case 35669:case 35673:return h3;case 5125:return f3;case 36294:return d3;case 36295:return p3;case 36296:return m3;case 35678:case 36198:case 36298:case 36306:case 35682:return g3;case 35679:case 36299:case 36307:return v3;case 35680:case 36300:case 36308:case 36293:return _3;case 36289:case 36303:case 36311:case 36292:return y3}}function M3(e,t){e.uniform1fv(this.addr,t)}function S3(e,t){let n=nl(t,this.size,2);e.uniform2fv(this.addr,n)}function b3(e,t){let n=nl(t,this.size,3);e.uniform3fv(this.addr,n)}function E3(e,t){let n=nl(t,this.size,4);e.uniform4fv(this.addr,n)}function T3(e,t){let n=nl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function A3(e,t){let n=nl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function w3(e,t){let n=nl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function R3(e,t){e.uniform1iv(this.addr,t)}function C3(e,t){e.uniform2iv(this.addr,t)}function D3(e,t){e.uniform3iv(this.addr,t)}function N3(e,t){e.uniform4iv(this.addr,t)}function U3(e,t){e.uniform1uiv(this.addr,t)}function L3(e,t){e.uniform2uiv(this.addr,t)}function O3(e,t){e.uniform3uiv(this.addr,t)}function I3(e,t){e.uniform4uiv(this.addr,t)}function P3(e,t,n){let i=this.cache,s=t.length,a=bd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTexture2D(t[r]||u1,a[r])}function B3(e,t,n){let i=this.cache,s=t.length,a=bd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||f1,a[r])}function z3(e,t,n){let i=this.cache,s=t.length,a=bd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||d1,a[r])}function F3(e,t,n){let i=this.cache,s=t.length,a=bd(n,s);Ye(i,a)||(e.uniform1iv(this.addr,a),Ze(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||h1,a[r])}function H3(e){switch(e){case 5126:return M3;case 35664:return S3;case 35665:return b3;case 35666:return E3;case 35674:return T3;case 35675:return A3;case 35676:return w3;case 5124:case 35670:return R3;case 35667:case 35671:return C3;case 35668:case 35672:return D3;case 35669:case 35673:return N3;case 5125:return U3;case 36294:return L3;case 36295:return O3;case 36296:return I3;case 35678:case 36198:case 36298:case 36306:case 35682:return P3;case 35679:case 36299:case 36307:return B3;case 35680:case 36300:case 36308:case 36293:return z3;case 36289:case 36303:case 36311:case 36292:return F3}}var Hg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=x3(n.type)}},Vg=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=H3(n.type)}},Gg=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},Fg=/(\w+)(\])?(\[|\.)?/g;function jb(e,t){e.seq.push(t),e.map[t.id]=t}function V3(e,t,n){let i=e.name,s=i.length;for(Fg.lastIndex=0;;){let a=Fg.exec(i),r=Fg.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){jb(n,c===void 0?new Hg(o,e,t):new Vg(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new Gg(o),jb(n,d)),n=d}}}var el=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let a=t.getActiveUniform(n,s),r=t.getUniformLocation(n,a.name);V3(a,r,this)}}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};function $b(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}var G3=37297,k3=0;function X3(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}var t1=new Bt;function W3(e){$t._getMatrix(t1,$t.workingColorSpace,e);let t=`mat3( ${t1.elements.map(n=>n.toFixed(4))} )`;switch($t.getTransfer(e)){case pc:return[t,"LinearTransferOETF"];case fe:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function e1(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+X3(e.getShaderSource(t),o)}else return a}function q3(e,t){let n=W3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function Y3(e,t){let n;switch(t){case _b:n="Linear";break;case yb:n="Reinhard";break;case xb:n="Cineon";break;case Of:n="ACESFilmic";break;case Sb:n="AgX";break;case bb:n="Neutral";break;case Mb:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),n="Linear"}return"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}var xd=new O;function Z3(){$t.getLuminanceCoefficients(xd);let e=xd.x.toFixed(4),t=xd.y.toFixed(4),n=xd.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function K3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(kc).join(`
`)}function J3(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function Q3(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function kc(e){return e!==""}function n1(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function i1(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var j3=/^[ \t]*#include +<([\w\d./]+)>/gm;function kg(e){return e.replace(j3,tD)}var $3=new Map;function tD(e,t){let n=Vt[t];if(n===void 0){let i=$3.get(t);if(i!==void 0)n=Vt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return kg(n)}var eD=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function s1(e){return e.replace(eD,nD)}function nD(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function a1(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function iD(e){let t="SHADOWMAP_TYPE_BASIC";return e.shadowMapType===fg?t="SHADOWMAP_TYPE_PCF":e.shadowMapType===Af?t="SHADOWMAP_TYPE_PCF_SOFT":e.shadowMapType===ts&&(t="SHADOWMAP_TYPE_VSM"),t}function sD(e){let t="ENVMAP_TYPE_CUBE";if(e.envMap)switch(e.envMapMode){case pr:case mr:t="ENVMAP_TYPE_CUBE";break;case Bc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function aD(e){let t="ENVMAP_MODE_REFLECTION";return e.envMap&&e.envMapMode===mr&&(t="ENVMAP_MODE_REFRACTION"),t}function rD(e){let t="ENVMAP_BLENDING_NONE";if(e.envMap)switch(e.combine){case mg:t="ENVMAP_BLENDING_MULTIPLY";break;case gb:t="ENVMAP_BLENDING_MIX";break;case vb:t="ENVMAP_BLENDING_ADD";break}return t}function oD(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),112)),texelHeight:i,maxMip:n}}function lD(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=iD(n),c=sD(n),f=aD(n),d=rD(n),h=oD(n),p=K3(n),v=J3(a),x=s.createProgram(),g,u,m=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(g=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(kc).join(`
`),g.length>0&&(g+=`
`),u=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v].filter(kc).join(`
`),u.length>0&&(u+=`
`)):(g=[a1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(kc).join(`
`),u=[a1(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,v,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Us?"#define TONE_MAPPING":"",n.toneMapping!==Us?Vt.tonemapping_pars_fragment:"",n.toneMapping!==Us?Y3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,q3("linearToOutputTexel",n.outputColorSpace),Z3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(kc).join(`
`)),r=kg(r),r=n1(r,n),r=i1(r,n),o=kg(o),o=n1(o,n),o=i1(o,n),r=s1(r),o=s1(o),n.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,u=["#define varying in",n.glslVersion===wg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===wg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);let _=m+g+r,y=m+u+o,E=$b(s,s.VERTEX_SHADER,_),A=$b(s,s.FRAGMENT_SHADER,y);s.attachShader(x,E),s.attachShader(x,A),n.index0AttributeName!==void 0?s.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function w(D){if(e.debug.checkShaderErrors){let U=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(E)||"",V=s.getShaderInfoLog(A)||"",Y=U.trim(),X=z.trim(),it=V.trim(),G=!0,ot=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(G=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,x,E,A);else{let ht=e1(s,E,"vertex"),Et=e1(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+Y+`
`+ht+`
`+Et)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(X===""||it==="")&&(ot=!1);ot&&(D.diagnostics={runnable:G,programLog:Y,vertexShader:{log:X,prefix:g},fragmentShader:{log:it,prefix:u}})}s.deleteShader(E),s.deleteShader(A),R=new el(s,x),b=Q3(s,x)}let R;this.getUniforms=function(){return R===void 0&&w(this),R};let b;this.getAttributes=function(){return b===void 0&&w(this),b};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(x,G3)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=k3++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=E,this.fragmentShader=A,this}var cD=0,Xg=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),a=this._getShaderStage(i),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Wg(t),n.set(t,i)),i}},Wg=class{constructor(t){this.id=cD++,this.code=t,this.usedTimes=0}};function uD(e,t,n,i,s,a,r){let o=new yc,l=new Xg,c=new Set,f=[],d=s.logarithmicDepthBuffer,h=s.vertexTextures,p=s.precision,v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function g(b,M,D,U,z){let V=U.fog,Y=z.geometry,X=b.isMeshStandardMaterial?U.environment:null,it=(b.isMeshStandardMaterial?n:t).get(b.envMap||X),G=it&&it.mapping===Bc?it.image.height:null,ot=v[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let ht=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,Et=ht!==void 0?ht.length:0,Wt=0;Y.morphAttributes.position!==void 0&&(Wt=1),Y.morphAttributes.normal!==void 0&&(Wt=2),Y.morphAttributes.color!==void 0&&(Wt=3);let _e,Ae,ae,Z;if(ot){let re=ns[ot];_e=re.vertexShader,Ae=re.fragmentShader}else _e=b.vertexShader,Ae=b.fragmentShader,l.update(b),ae=l.getVertexShaderID(b),Z=l.getFragmentShaderID(b);let j=e.getRenderTarget(),pt=e.state.buffers.depth.getReversed(),Ut=z.isInstancedMesh===!0,bt=z.isBatchedMesh===!0,jt=!!b.map,pn=!!b.matcap,N=!!it,we=!!b.aoMap,It=!!b.lightMap,Dt=!!b.bumpMap,vt=!!b.normalMap,Re=!!b.displacementMap,_t=!!b.emissiveMap,Ft=!!b.metalnessMap,Ke=!!b.roughnessMap,ze=b.anisotropy>0,C=b.clearcoat>0,S=b.dispersion>0,B=b.iridescence>0,q=b.sheen>0,Q=b.transmission>0,k=ze&&!!b.anisotropyMap,St=C&&!!b.clearcoatMap,st=C&&!!b.clearcoatNormalMap,yt=C&&!!b.clearcoatRoughnessMap,xt=B&&!!b.iridescenceMap,et=B&&!!b.iridescenceThicknessMap,ut=q&&!!b.sheenColorMap,Rt=q&&!!b.sheenRoughnessMap,Mt=!!b.specularMap,lt=!!b.specularColorMap,zt=!!b.specularIntensityMap,L=Q&&!!b.transmissionMap,nt=Q&&!!b.thicknessMap,at=!!b.gradientMap,dt=!!b.alphaMap,$=b.alphaTest>0,K=!!b.alphaHash,gt=!!b.extensions,Ot=Us;b.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Ot=e.toneMapping);let ye={shaderID:ot,shaderType:b.type,shaderName:b.name,vertexShader:_e,fragmentShader:Ae,defines:b.defines,customVertexShaderID:ae,customFragmentShaderID:Z,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:bt,batchingColor:bt&&z._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&z.instanceColor!==null,instancingMorph:Ut&&z.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:lr,alphaToCoverage:!!b.alphaToCoverage,map:jt,matcap:pn,envMap:N,envMapMode:N&&it.mapping,envMapCubeUVHeight:G,aoMap:we,lightMap:It,bumpMap:Dt,normalMap:vt,displacementMap:h&&Re,emissiveMap:_t,normalMapObjectSpace:vt&&b.normalMapType===wb,normalMapTangentSpace:vt&&b.normalMapType===Tg,metalnessMap:Ft,roughnessMap:Ke,anisotropy:ze,anisotropyMap:k,clearcoat:C,clearcoatMap:St,clearcoatNormalMap:st,clearcoatRoughnessMap:yt,dispersion:S,iridescence:B,iridescenceMap:xt,iridescenceThicknessMap:et,sheen:q,sheenColorMap:ut,sheenRoughnessMap:Rt,specularMap:Mt,specularColorMap:lt,specularIntensityMap:zt,transmission:Q,transmissionMap:L,thicknessMap:nt,gradientMap:at,opaque:b.transparent===!1&&b.blending===ar&&b.alphaToCoverage===!1,alphaMap:dt,alphaTest:$,alphaHash:K,combine:b.combine,mapUv:jt&&x(b.map.channel),aoMapUv:we&&x(b.aoMap.channel),lightMapUv:It&&x(b.lightMap.channel),bumpMapUv:Dt&&x(b.bumpMap.channel),normalMapUv:vt&&x(b.normalMap.channel),displacementMapUv:Re&&x(b.displacementMap.channel),emissiveMapUv:_t&&x(b.emissiveMap.channel),metalnessMapUv:Ft&&x(b.metalnessMap.channel),roughnessMapUv:Ke&&x(b.roughnessMap.channel),anisotropyMapUv:k&&x(b.anisotropyMap.channel),clearcoatMapUv:St&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:st&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:xt&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:et&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&x(b.sheenRoughnessMap.channel),specularMapUv:Mt&&x(b.specularMap.channel),specularColorMapUv:lt&&x(b.specularColorMap.channel),specularIntensityMapUv:zt&&x(b.specularIntensityMap.channel),transmissionMapUv:L&&x(b.transmissionMap.channel),thicknessMapUv:nt&&x(b.thicknessMap.channel),alphaMapUv:dt&&x(b.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(vt||ze),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!Y.attributes.uv&&(jt||dt),fog:!!V,useFog:b.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pt,skinning:z.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Wt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:b.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ot,decodeVideoTexture:jt&&b.map.isVideoTexture===!0&&$t.getTransfer(b.map.colorSpace)===fe,decodeVideoTextureEmissive:_t&&b.emissiveMap.isVideoTexture===!0&&$t.getTransfer(b.emissiveMap.colorSpace)===fe,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===yi,flipSided:b.side===Dn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:gt&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(gt&&b.extensions.multiDraw===!0||bt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return ye.vertexUv1s=c.has(1),ye.vertexUv2s=c.has(2),ye.vertexUv3s=c.has(3),c.clear(),ye}function u(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)M.push(D),M.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(m(M,b),_(M,b),M.push(e.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function m(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function _(b,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),M.gradientMap&&o.enable(22),b.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reversedDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),b.push(o.mask)}function y(b){let M=v[b.type],D;if(M){let U=ns[M];D=zb.clone(U.uniforms)}else D=b.uniforms;return D}function E(b,M){let D;for(let U=0,z=f.length;U<z;U++){let V=f[U];if(V.cacheKey===M){D=V,++D.usedTimes;break}}return D===void 0&&(D=new lD(e,M,b,a),f.push(D)),D}function A(b){if(--b.usedTimes===0){let M=f.indexOf(b);f[M]=f[f.length-1],f.pop(),b.destroy()}}function w(b){l.remove(b)}function R(){l.dispose()}return{getParameters:g,getProgramCacheKey:u,getUniforms:y,acquireProgram:E,releaseProgram:A,releaseShaderCache:w,programs:f,dispose:R}}function hD(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function fD(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.z!==t.z?e.z-t.z:e.id-t.id}function r1(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function o1(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(d,h,p,v,x,g){let u=e[t];return u===void 0?(u={id:d.id,object:d,geometry:h,material:p,groupOrder:v,renderOrder:d.renderOrder,z:x,group:g},e[t]=u):(u.id=d.id,u.object=d,u.geometry=h,u.material=p,u.groupOrder=v,u.renderOrder=d.renderOrder,u.z=x,u.group=g),t++,u}function o(d,h,p,v,x,g){let u=r(d,h,p,v,x,g);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):n.push(u)}function l(d,h,p,v,x,g){let u=r(d,h,p,v,x,g);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):n.unshift(u)}function c(d,h){n.length>1&&n.sort(d||fD),i.length>1&&i.sort(h||r1),s.length>1&&s.sort(h||r1)}function f(){for(let d=t,h=e.length;d<h;d++){let p=e[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:o,unshift:l,finish:f,sort:c}}function dD(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new o1,e.set(i,[r])):s>=a.length?(r=new o1,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function pD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new O,color:new Ht};break;case"SpotLight":n={position:new O,direction:new O,color:new Ht,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Ht,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Ht,groundColor:new Ht};break;case"RectAreaLight":n={color:new Ht,position:new O,halfWidth:new O,halfHeight:new O};break}return e[t.id]=n,n}}}function mD(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var gD=0;function vD(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function _D(e){let t=new pD,n=mD(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new O);let s=new O,a=new Oe,r=new Oe;function o(c){let f=0,d=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,v=0,x=0,g=0,u=0,m=0,_=0,y=0,E=0,A=0,w=0;c.sort(vD);for(let b=0,M=c.length;b<M;b++){let D=c[b],U=D.color,z=D.intensity,V=D.distance,Y=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=U.r*z,d+=U.g*z,h+=U.b*z;else if(D.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(D.sh.coefficients[X],z);w++}else if(D.isDirectionalLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let it=D.shadow,G=n.get(D);G.shadowIntensity=it.intensity,G.shadowBias=it.bias,G.shadowNormalBias=it.normalBias,G.shadowRadius=it.radius,G.shadowMapSize=it.mapSize,i.directionalShadow[p]=G,i.directionalShadowMap[p]=Y,i.directionalShadowMatrix[p]=D.shadow.matrix,m++}i.directional[p]=X,p++}else if(D.isSpotLight){let X=t.get(D);X.position.setFromMatrixPosition(D.matrixWorld),X.color.copy(U).multiplyScalar(z),X.distance=V,X.coneCos=Math.cos(D.angle),X.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),X.decay=D.decay,i.spot[x]=X;let it=D.shadow;if(D.map&&(i.spotLightMap[E]=D.map,E++,it.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[x]=it.matrix,D.castShadow){let G=n.get(D);G.shadowIntensity=it.intensity,G.shadowBias=it.bias,G.shadowNormalBias=it.normalBias,G.shadowRadius=it.radius,G.shadowMapSize=it.mapSize,i.spotShadow[x]=G,i.spotShadowMap[x]=Y,y++}x++}else if(D.isRectAreaLight){let X=t.get(D);X.color.copy(U).multiplyScalar(z),X.halfWidth.set(D.width*.5,0,0),X.halfHeight.set(0,D.height*.5,0),i.rectArea[g]=X,g++}else if(D.isPointLight){let X=t.get(D);if(X.color.copy(D.color).multiplyScalar(D.intensity),X.distance=D.distance,X.decay=D.decay,D.castShadow){let it=D.shadow,G=n.get(D);G.shadowIntensity=it.intensity,G.shadowBias=it.bias,G.shadowNormalBias=it.normalBias,G.shadowRadius=it.radius,G.shadowMapSize=it.mapSize,G.shadowCameraNear=it.camera.near,G.shadowCameraFar=it.camera.far,i.pointShadow[v]=G,i.pointShadowMap[v]=Y,i.pointShadowMatrix[v]=D.shadow.matrix,_++}i.point[v]=X,v++}else if(D.isHemisphereLight){let X=t.get(D);X.skyColor.copy(D.color).multiplyScalar(z),X.groundColor.copy(D.groundColor).multiplyScalar(z),i.hemi[u]=X,u++}}g>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=rt.LTC_FLOAT_1,i.rectAreaLTC2=rt.LTC_FLOAT_2):(i.rectAreaLTC1=rt.LTC_HALF_1,i.rectAreaLTC2=rt.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;let R=i.hash;(R.directionalLength!==p||R.pointLength!==v||R.spotLength!==x||R.rectAreaLength!==g||R.hemiLength!==u||R.numDirectionalShadows!==m||R.numPointShadows!==_||R.numSpotShadows!==y||R.numSpotMaps!==E||R.numLightProbes!==w)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=g,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=m,i.directionalShadowMap.length=m,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=m,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+E-A,i.spotLightMap.length=E,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=w,R.directionalLength=p,R.pointLength=v,R.spotLength=x,R.rectAreaLength=g,R.hemiLength=u,R.numDirectionalShadows=m,R.numPointShadows=_,R.numSpotShadows=y,R.numSpotMaps=E,R.numLightProbes=w,i.version=gD++)}function l(c,f){let d=0,h=0,p=0,v=0,x=0,g=f.matrixWorldInverse;for(let u=0,m=c.length;u<m;u++){let _=c[u];if(_.isDirectionalLight){let y=i.directional[d];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),d++}else if(_.isSpotLight){let y=i.spot[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(g),p++}else if(_.isRectAreaLight){let y=i.rectArea[v];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),r.identity(),a.copy(_.matrixWorld),a.premultiply(g),r.extractRotation(a),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),v++}else if(_.isPointLight){let y=i.point[h];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(g),h++}else if(_.isHemisphereLight){let y=i.hemi[x];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(g),x++}}}return{setup:o,setupView:l,state:i}}function l1(e){let t=new _D(e),n=[],i=[];function s(f){c.camera=f,n.length=0,i.length=0}function a(f){n.push(f)}function r(f){i.push(f)}function o(){t.setup(n)}function l(f){t.setupView(n,f)}let c={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function yD(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new l1(e),t.set(s,[o])):a>=r.length?(o=new l1(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}var xD=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MD=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function SD(e,t,n){let i=new Vo,s=new kt,a=new kt,r=new he,o=new df({depthPacking:Ab}),l=new pf,c={},f=n.maxTextureSize,d={[As]:Dn,[Dn]:As,[yi]:yi},h=new Li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:xD,fragmentShader:MD}),p=h.clone();p.defines.HORIZONTAL_PASS=1;let v=new en;v.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Qt(v,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fg;let u=this.type;this.render=function(A,w,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;let b=e.getRenderTarget(),M=e.getActiveCubeFace(),D=e.getActiveMipmapLevel(),U=e.state;U.setBlending(Ns),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let z=u!==ts&&this.type===ts,V=u===ts&&this.type!==ts;for(let Y=0,X=A.length;Y<X;Y++){let it=A[Y],G=it.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let ot=G.getFrameExtents();if(s.multiply(ot),a.copy(G.mapSize),(s.x>f||s.y>f)&&(s.x>f&&(a.x=Math.floor(f/ot.x),s.x=a.x*ot.x,G.mapSize.x=a.x),s.y>f&&(a.y=Math.floor(f/ot.y),s.y=a.y*ot.y,G.mapSize.y=a.y)),G.map===null||z===!0||V===!0){let Et=this.type!==ts?{minFilter:vi,magFilter:vi}:{};G.map!==null&&G.map.dispose(),G.map=new $i(s.x,s.y,Et),G.map.texture.name=it.name+".shadowMap",G.camera.updateProjectionMatrix()}e.setRenderTarget(G.map),e.clear();let ht=G.getViewportCount();for(let Et=0;Et<ht;Et++){let Wt=G.getViewport(Et);r.set(a.x*Wt.x,a.y*Wt.y,a.x*Wt.z,a.y*Wt.w),U.viewport(r),G.updateMatrices(it,Et),i=G.getFrustum(),y(w,R,G.camera,it,this.type)}G.isPointLightShadow!==!0&&this.type===ts&&m(G,R),G.needsUpdate=!1}u=this.type,g.needsUpdate=!1,e.setRenderTarget(b,M,D)};function m(A,w){let R=t.update(x);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new $i(s.x,s.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,e.setRenderTarget(A.mapPass),e.clear(),e.renderBufferDirect(w,null,R,h,x,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,e.setRenderTarget(A.map),e.clear(),e.renderBufferDirect(w,null,R,p,x,null)}function _(A,w,R,b){let M=null,D=R.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)M=D;else if(M=R.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let U=M.uuid,z=w.uuid,V=c[U];V===void 0&&(V={},c[U]=V);let Y=V[z];Y===void 0&&(Y=M.clone(),V[z]=Y,w.addEventListener("dispose",E)),M=Y}if(M.visible=w.visible,M.wireframe=w.wireframe,b===ts?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:d[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let U=e.properties.get(M);U.light=R}return M}function y(A,w,R,b,M){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===ts)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,A.matrixWorld);let z=t.update(A),V=A.material;if(Array.isArray(V)){let Y=z.groups;for(let X=0,it=Y.length;X<it;X++){let G=Y[X],ot=V[G.materialIndex];if(ot&&ot.visible){let ht=_(A,ot,b,M);A.onBeforeShadow(e,A,w,R,z,ht,G),e.renderBufferDirect(R,null,z,ht,A,G),A.onAfterShadow(e,A,w,R,z,ht,G)}}}else if(V.visible){let Y=_(A,V,b,M);A.onBeforeShadow(e,A,w,R,z,Y,null),e.renderBufferDirect(R,null,z,Y,A,null),A.onAfterShadow(e,A,w,R,z,Y,null)}}let U=A.children;for(let z=0,V=U.length;z<V;z++)y(U[z],w,R,b,M)}function E(A){A.target.removeEventListener("dispose",E);for(let R in c){let b=c[R],M=A.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}var bD={[wf]:Rf,[Cf]:Uf,[Df]:Lf,[rr]:Nf,[Rf]:wf,[Uf]:Cf,[Lf]:Df,[Nf]:rr};function ED(e,t){function n(){let L=!1,nt=new he,at=null,dt=new he(0,0,0,0);return{setMask:function($){at!==$&&!L&&(e.colorMask($,$,$,$),at=$)},setLocked:function($){L=$},setClear:function($,K,gt,Ot,ye){ye===!0&&($*=Ot,K*=Ot,gt*=Ot),nt.set($,K,gt,Ot),dt.equals(nt)===!1&&(e.clearColor($,K,gt,Ot),dt.copy(nt))},reset:function(){L=!1,at=null,dt.set(-1,0,0,0)}}}function i(){let L=!1,nt=!1,at=null,dt=null,$=null;return{setReversed:function(K){if(nt!==K){let gt=t.get("EXT_clip_control");K?gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.ZERO_TO_ONE_EXT):gt.clipControlEXT(gt.LOWER_LEFT_EXT,gt.NEGATIVE_ONE_TO_ONE_EXT),nt=K;let Ot=$;$=null,this.setClear(Ot)}},getReversed:function(){return nt},setTest:function(K){K?j(e.DEPTH_TEST):pt(e.DEPTH_TEST)},setMask:function(K){at!==K&&!L&&(e.depthMask(K),at=K)},setFunc:function(K){if(nt&&(K=bD[K]),dt!==K){switch(K){case wf:e.depthFunc(e.NEVER);break;case Rf:e.depthFunc(e.ALWAYS);break;case Cf:e.depthFunc(e.LESS);break;case rr:e.depthFunc(e.LEQUAL);break;case Df:e.depthFunc(e.EQUAL);break;case Nf:e.depthFunc(e.GEQUAL);break;case Uf:e.depthFunc(e.GREATER);break;case Lf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}dt=K}},setLocked:function(K){L=K},setClear:function(K){$!==K&&(nt&&(K=1-K),e.clearDepth(K),$=K)},reset:function(){L=!1,at=null,dt=null,$=null,nt=!1}}}function s(){let L=!1,nt=null,at=null,dt=null,$=null,K=null,gt=null,Ot=null,ye=null;return{setTest:function(re){L||(re?j(e.STENCIL_TEST):pt(e.STENCIL_TEST))},setMask:function(re){nt!==re&&!L&&(e.stencilMask(re),nt=re)},setFunc:function(re,is,Ii){(at!==re||dt!==is||$!==Ii)&&(e.stencilFunc(re,is,Ii),at=re,dt=is,$=Ii)},setOp:function(re,is,Ii){(K!==re||gt!==is||Ot!==Ii)&&(e.stencilOp(re,is,Ii),K=re,gt=is,Ot=Ii)},setLocked:function(re){L=re},setClear:function(re){ye!==re&&(e.clearStencil(re),ye=re)},reset:function(){L=!1,nt=null,at=null,dt=null,$=null,K=null,gt=null,Ot=null,ye=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,f={},d={},h=new WeakMap,p=[],v=null,x=!1,g=null,u=null,m=null,_=null,y=null,E=null,A=null,w=new Ht(0,0,0),R=0,b=!1,M=null,D=null,U=null,z=null,V=null,Y=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,it=0,G=e.getParameter(e.VERSION);G.indexOf("WebGL")!==-1?(it=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=it>=1):G.indexOf("OpenGL ES")!==-1&&(it=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=it>=2);let ot=null,ht={},Et=e.getParameter(e.SCISSOR_BOX),Wt=e.getParameter(e.VIEWPORT),_e=new he().fromArray(Et),Ae=new he().fromArray(Wt);function ae(L,nt,at,dt){let $=new Uint8Array(4),K=e.createTexture();e.bindTexture(L,K),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let gt=0;gt<at;gt++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(nt,0,e.RGBA,1,1,dt,0,e.RGBA,e.UNSIGNED_BYTE,$):e.texImage2D(nt+gt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,$);return K}let Z={};Z[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),Z[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),Z[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),Z[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),j(e.DEPTH_TEST),r.setFunc(rr),Dt(!1),vt(hg),j(e.CULL_FACE),we(Ns);function j(L){f[L]!==!0&&(e.enable(L),f[L]=!0)}function pt(L){f[L]!==!1&&(e.disable(L),f[L]=!1)}function Ut(L,nt){return d[L]!==nt?(e.bindFramebuffer(L,nt),d[L]=nt,L===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=nt),L===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=nt),!0):!1}function bt(L,nt){let at=p,dt=!1;if(L){at=h.get(nt),at===void 0&&(at=[],h.set(nt,at));let $=L.textures;if(at.length!==$.length||at[0]!==e.COLOR_ATTACHMENT0){for(let K=0,gt=$.length;K<gt;K++)at[K]=e.COLOR_ATTACHMENT0+K;at.length=$.length,dt=!0}}else at[0]!==e.BACK&&(at[0]=e.BACK,dt=!0);dt&&e.drawBuffers(at)}function jt(L){return v!==L?(e.useProgram(L),v=L,!0):!1}let pn={[ya]:e.FUNC_ADD,[$S]:e.FUNC_SUBTRACT,[tb]:e.FUNC_REVERSE_SUBTRACT};pn[eb]=e.MIN,pn[nb]=e.MAX;let N={[ib]:e.ZERO,[sb]:e.ONE,[ab]:e.SRC_COLOR,[nf]:e.SRC_ALPHA,[hb]:e.SRC_ALPHA_SATURATE,[cb]:e.DST_COLOR,[ob]:e.DST_ALPHA,[rb]:e.ONE_MINUS_SRC_COLOR,[sf]:e.ONE_MINUS_SRC_ALPHA,[ub]:e.ONE_MINUS_DST_COLOR,[lb]:e.ONE_MINUS_DST_ALPHA,[fb]:e.CONSTANT_COLOR,[db]:e.ONE_MINUS_CONSTANT_COLOR,[pb]:e.CONSTANT_ALPHA,[mb]:e.ONE_MINUS_CONSTANT_ALPHA};function we(L,nt,at,dt,$,K,gt,Ot,ye,re){if(L===Ns){x===!0&&(pt(e.BLEND),x=!1);return}if(x===!1&&(j(e.BLEND),x=!0),L!==jS){if(L!==g||re!==b){if((u!==ya||y!==ya)&&(e.blendEquation(e.FUNC_ADD),u=ya,y=ya),re)switch(L){case ar:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case dr:e.blendFunc(e.ONE,e.ONE);break;case dg:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case pg:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case ar:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case dr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case dg:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pg:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}m=null,_=null,E=null,A=null,w.set(0,0,0),R=0,g=L,b=re}return}$=$||nt,K=K||at,gt=gt||dt,(nt!==u||$!==y)&&(e.blendEquationSeparate(pn[nt],pn[$]),u=nt,y=$),(at!==m||dt!==_||K!==E||gt!==A)&&(e.blendFuncSeparate(N[at],N[dt],N[K],N[gt]),m=at,_=dt,E=K,A=gt),(Ot.equals(w)===!1||ye!==R)&&(e.blendColor(Ot.r,Ot.g,Ot.b,ye),w.copy(Ot),R=ye),g=L,b=!1}function It(L,nt){L.side===yi?pt(e.CULL_FACE):j(e.CULL_FACE);let at=L.side===Dn;nt&&(at=!at),Dt(at),L.blending===ar&&L.transparent===!1?we(Ns):we(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),r.setFunc(L.depthFunc),r.setTest(L.depthTest),r.setMask(L.depthWrite),a.setMask(L.colorWrite);let dt=L.stencilWrite;o.setTest(dt),dt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),_t(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?j(e.SAMPLE_ALPHA_TO_COVERAGE):pt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Dt(L){M!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),M=L)}function vt(L){L!==JS?(j(e.CULL_FACE),L!==D&&(L===hg?e.cullFace(e.BACK):L===QS?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):pt(e.CULL_FACE),D=L}function Re(L){L!==U&&(X&&e.lineWidth(L),U=L)}function _t(L,nt,at){L?(j(e.POLYGON_OFFSET_FILL),(z!==nt||V!==at)&&(e.polygonOffset(nt,at),z=nt,V=at)):pt(e.POLYGON_OFFSET_FILL)}function Ft(L){L?j(e.SCISSOR_TEST):pt(e.SCISSOR_TEST)}function Ke(L){L===void 0&&(L=e.TEXTURE0+Y-1),ot!==L&&(e.activeTexture(L),ot=L)}function ze(L,nt,at){at===void 0&&(ot===null?at=e.TEXTURE0+Y-1:at=ot);let dt=ht[at];dt===void 0&&(dt={type:void 0,texture:void 0},ht[at]=dt),(dt.type!==L||dt.texture!==nt)&&(ot!==at&&(e.activeTexture(at),ot=at),e.bindTexture(L,nt||Z[L]),dt.type=L,dt.texture=nt)}function C(){let L=ht[ot];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function S(){try{e.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function B(){try{e.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function q(){try{e.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Q(){try{e.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k(){try{e.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function St(){try{e.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function st(){try{e.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function yt(){try{e.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function xt(){try{e.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function et(){try{e.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ut(L){_e.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),_e.copy(L))}function Rt(L){Ae.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),Ae.copy(L))}function Mt(L,nt){let at=c.get(nt);at===void 0&&(at=new WeakMap,c.set(nt,at));let dt=at.get(L);dt===void 0&&(dt=e.getUniformBlockIndex(nt,L.name),at.set(L,dt))}function lt(L,nt){let dt=c.get(nt).get(L);l.get(nt)!==dt&&(e.uniformBlockBinding(nt,dt,L.__bindingPointIndex),l.set(nt,dt))}function zt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),f={},ot=null,ht={},d={},h=new WeakMap,p=[],v=null,x=!1,g=null,u=null,m=null,_=null,y=null,E=null,A=null,w=new Ht(0,0,0),R=0,b=!1,M=null,D=null,U=null,z=null,V=null,_e.set(0,0,e.canvas.width,e.canvas.height),Ae.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:j,disable:pt,bindFramebuffer:Ut,drawBuffers:bt,useProgram:jt,setBlending:we,setMaterial:It,setFlipSided:Dt,setCullFace:vt,setLineWidth:Re,setPolygonOffset:_t,setScissorTest:Ft,activeTexture:Ke,bindTexture:ze,unbindTexture:C,compressedTexImage2D:S,compressedTexImage3D:B,texImage2D:xt,texImage3D:et,updateUBOMapping:Mt,uniformBlockBinding:lt,texStorage2D:st,texStorage3D:yt,texSubImage2D:q,texSubImage3D:Q,compressedTexSubImage2D:k,compressedTexSubImage3D:St,scissor:ut,viewport:Rt,reset:zt}}function TD(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new kt,f=new WeakMap,d,h=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(C,S){return p?new OffscreenCanvas(C,S):gc("canvas")}function x(C,S,B){let q=1,Q=ze(C);if((Q.width>B||Q.height>B)&&(q=B/Math.max(Q.width,Q.height)),q<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let k=Math.floor(q*Q.width),St=Math.floor(q*Q.height);d===void 0&&(d=v(k,St));let st=S?v(k,St):d;return st.width=k,st.height=St,st.getContext("2d").drawImage(C,0,0,k,St),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+k+"x"+St+")."),st}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),C;return C}function g(C){return C.generateMipmaps}function u(C){e.generateMipmap(C)}function m(C){return C.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?e.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function _(C,S,B,q,Q=!1){if(C!==null){if(e[C]!==void 0)return e[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let k=S;if(S===e.RED&&(B===e.FLOAT&&(k=e.R32F),B===e.HALF_FLOAT&&(k=e.R16F),B===e.UNSIGNED_BYTE&&(k=e.R8)),S===e.RED_INTEGER&&(B===e.UNSIGNED_BYTE&&(k=e.R8UI),B===e.UNSIGNED_SHORT&&(k=e.R16UI),B===e.UNSIGNED_INT&&(k=e.R32UI),B===e.BYTE&&(k=e.R8I),B===e.SHORT&&(k=e.R16I),B===e.INT&&(k=e.R32I)),S===e.RG&&(B===e.FLOAT&&(k=e.RG32F),B===e.HALF_FLOAT&&(k=e.RG16F),B===e.UNSIGNED_BYTE&&(k=e.RG8)),S===e.RG_INTEGER&&(B===e.UNSIGNED_BYTE&&(k=e.RG8UI),B===e.UNSIGNED_SHORT&&(k=e.RG16UI),B===e.UNSIGNED_INT&&(k=e.RG32UI),B===e.BYTE&&(k=e.RG8I),B===e.SHORT&&(k=e.RG16I),B===e.INT&&(k=e.RG32I)),S===e.RGB_INTEGER&&(B===e.UNSIGNED_BYTE&&(k=e.RGB8UI),B===e.UNSIGNED_SHORT&&(k=e.RGB16UI),B===e.UNSIGNED_INT&&(k=e.RGB32UI),B===e.BYTE&&(k=e.RGB8I),B===e.SHORT&&(k=e.RGB16I),B===e.INT&&(k=e.RGB32I)),S===e.RGBA_INTEGER&&(B===e.UNSIGNED_BYTE&&(k=e.RGBA8UI),B===e.UNSIGNED_SHORT&&(k=e.RGBA16UI),B===e.UNSIGNED_INT&&(k=e.RGBA32UI),B===e.BYTE&&(k=e.RGBA8I),B===e.SHORT&&(k=e.RGBA16I),B===e.INT&&(k=e.RGBA32I)),S===e.RGB&&(B===e.UNSIGNED_INT_5_9_9_9_REV&&(k=e.RGB9_E5),B===e.UNSIGNED_INT_10F_11F_11F_REV&&(k=e.R11F_G11F_B10F)),S===e.RGBA){let St=Q?pc:$t.getTransfer(q);B===e.FLOAT&&(k=e.RGBA32F),B===e.HALF_FLOAT&&(k=e.RGBA16F),B===e.UNSIGNED_BYTE&&(k=St===fe?e.SRGB8_ALPHA8:e.RGBA8),B===e.UNSIGNED_SHORT_4_4_4_4&&(k=e.RGBA4),B===e.UNSIGNED_SHORT_5_5_5_1&&(k=e.RGB5_A1)}return(k===e.R16F||k===e.R32F||k===e.RG16F||k===e.RG32F||k===e.RGBA16F||k===e.RGBA32F)&&t.get("EXT_color_buffer_float"),k}function y(C,S){let B;return C?S===null||S===Ta||S===Jo?B=e.DEPTH24_STENCIL8:S===es?B=e.DEPTH32F_STENCIL8:S===Zo&&(B=e.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ta||S===Jo?B=e.DEPTH_COMPONENT24:S===es?B=e.DEPTH_COMPONENT32F:S===Zo&&(B=e.DEPTH_COMPONENT16),B}function E(C,S){return g(C)===!0||C.isFramebufferTexture&&C.minFilter!==vi&&C.minFilter!==Ni?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function A(C){let S=C.target;S.removeEventListener("dispose",A),R(S),S.isVideoTexture&&f.delete(S)}function w(C){let S=C.target;S.removeEventListener("dispose",w),M(S)}function R(C){let S=i.get(C);if(S.__webglInit===void 0)return;let B=C.source,q=h.get(B);if(q){let Q=q[S.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&b(C),Object.keys(q).length===0&&h.delete(B)}i.remove(C)}function b(C){let S=i.get(C);e.deleteTexture(S.__webglTexture);let B=C.source,q=h.get(B);delete q[S.__cacheKey],r.memory.textures--}function M(C){let S=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(S.__webglFramebuffer[q]))for(let Q=0;Q<S.__webglFramebuffer[q].length;Q++)e.deleteFramebuffer(S.__webglFramebuffer[q][Q]);else e.deleteFramebuffer(S.__webglFramebuffer[q]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[q])}else{if(Array.isArray(S.__webglFramebuffer))for(let q=0;q<S.__webglFramebuffer.length;q++)e.deleteFramebuffer(S.__webglFramebuffer[q]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let q=0;q<S.__webglColorRenderbuffer.length;q++)S.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[q]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let B=C.textures;for(let q=0,Q=B.length;q<Q;q++){let k=i.get(B[q]);k.__webglTexture&&(e.deleteTexture(k.__webglTexture),r.memory.textures--),i.remove(B[q])}i.remove(C)}let D=0;function U(){D=0}function z(){let C=D;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function V(C){let S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function Y(C,S){let B=i.get(C);if(C.isVideoTexture&&Ft(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&B.__version!==C.version){let q=C.image;if(q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Z(B,C,S);return}}else C.isExternalTexture&&(B.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,B.__webglTexture,e.TEXTURE0+S)}function X(C,S){let B=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Z(B,C,S);return}n.bindTexture(e.TEXTURE_2D_ARRAY,B.__webglTexture,e.TEXTURE0+S)}function it(C,S){let B=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&B.__version!==C.version){Z(B,C,S);return}n.bindTexture(e.TEXTURE_3D,B.__webglTexture,e.TEXTURE0+S)}function G(C,S){let B=i.get(C);if(C.version>0&&B.__version!==C.version){j(B,C,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,B.__webglTexture,e.TEXTURE0+S)}let ot={[or]:e.REPEAT,[_a]:e.CLAMP_TO_EDGE,[af]:e.MIRRORED_REPEAT},ht={[vi]:e.NEAREST,[Eb]:e.NEAREST_MIPMAP_NEAREST,[zc]:e.NEAREST_MIPMAP_LINEAR,[Ni]:e.LINEAR,[Bf]:e.LINEAR_MIPMAP_NEAREST,[Ea]:e.LINEAR_MIPMAP_LINEAR},Et={[Rb]:e.NEVER,[Ob]:e.ALWAYS,[Cb]:e.LESS,[Ag]:e.LEQUAL,[Db]:e.EQUAL,[Lb]:e.GEQUAL,[Nb]:e.GREATER,[Ub]:e.NOTEQUAL};function Wt(C,S){if(S.type===es&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===Ni||S.magFilter===Bf||S.magFilter===zc||S.magFilter===Ea||S.minFilter===Ni||S.minFilter===Bf||S.minFilter===zc||S.minFilter===Ea)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(C,e.TEXTURE_WRAP_S,ot[S.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,ot[S.wrapT]),(C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY)&&e.texParameteri(C,e.TEXTURE_WRAP_R,ot[S.wrapR]),e.texParameteri(C,e.TEXTURE_MAG_FILTER,ht[S.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,ht[S.minFilter]),S.compareFunction&&(e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,Et[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===vi||S.minFilter!==zc&&S.minFilter!==Ea||S.type===es&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let B=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function _e(C,S){let B=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",A));let q=S.source,Q=h.get(q);Q===void 0&&(Q={},h.set(q,Q));let k=V(S);if(k!==C.__cacheKey){Q[k]===void 0&&(Q[k]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,B=!0),Q[k].usedTimes++;let St=Q[C.__cacheKey];St!==void 0&&(Q[C.__cacheKey].usedTimes--,St.usedTimes===0&&b(S)),C.__cacheKey=k,C.__webglTexture=Q[k].texture}return B}function Ae(C,S,B){return Math.floor(Math.floor(C/B)/S)}function ae(C,S,B,q){let k=C.updateRanges;if(k.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,B,q,S.data);else{k.sort((et,ut)=>et.start-ut.start);let St=0;for(let et=1;et<k.length;et++){let ut=k[St],Rt=k[et],Mt=ut.start+ut.count,lt=Ae(Rt.start,S.width,4),zt=Ae(ut.start,S.width,4);Rt.start<=Mt+1&&lt===zt&&Ae(Rt.start+Rt.count-1,S.width,4)===lt?ut.count=Math.max(ut.count,Rt.start+Rt.count-ut.start):(++St,k[St]=Rt)}k.length=St+1;let st=e.getParameter(e.UNPACK_ROW_LENGTH),yt=e.getParameter(e.UNPACK_SKIP_PIXELS),xt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let et=0,ut=k.length;et<ut;et++){let Rt=k[et],Mt=Math.floor(Rt.start/4),lt=Math.ceil(Rt.count/4),zt=Mt%S.width,L=Math.floor(Mt/S.width),nt=lt,at=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,zt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,zt,L,nt,at,B,q,S.data)}C.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,st),e.pixelStorei(e.UNPACK_SKIP_PIXELS,yt),e.pixelStorei(e.UNPACK_SKIP_ROWS,xt)}}function Z(C,S,B){let q=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(q=e.TEXTURE_3D);let Q=_e(C,S),k=S.source;n.bindTexture(q,C.__webglTexture,e.TEXTURE0+B);let St=i.get(k);if(k.version!==St.__version||Q===!0){n.activeTexture(e.TEXTURE0+B);let st=$t.getPrimaries($t.workingColorSpace),yt=S.colorSpace===Ls?null:$t.getPrimaries(S.colorSpace),xt=S.colorSpace===Ls||st===yt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,xt);let et=x(S.image,!1,s.maxTextureSize);et=Ke(S,et);let ut=a.convert(S.format,S.colorSpace),Rt=a.convert(S.type),Mt=_(S.internalFormat,ut,Rt,S.colorSpace,S.isVideoTexture);Wt(q,S);let lt,zt=S.mipmaps,L=S.isVideoTexture!==!0,nt=St.__version===void 0||Q===!0,at=k.dataReady,dt=E(S,et);if(S.isDepthTexture)Mt=y(S.format===Qo,S.type),nt&&(L?n.texStorage2D(e.TEXTURE_2D,1,Mt,et.width,et.height):n.texImage2D(e.TEXTURE_2D,0,Mt,et.width,et.height,0,ut,Rt,null));else if(S.isDataTexture)if(zt.length>0){L&&nt&&n.texStorage2D(e.TEXTURE_2D,dt,Mt,zt[0].width,zt[0].height);for(let $=0,K=zt.length;$<K;$++)lt=zt[$],L?at&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,lt.width,lt.height,ut,Rt,lt.data):n.texImage2D(e.TEXTURE_2D,$,Mt,lt.width,lt.height,0,ut,Rt,lt.data);S.generateMipmaps=!1}else L?(nt&&n.texStorage2D(e.TEXTURE_2D,dt,Mt,et.width,et.height),at&&ae(S,et,ut,Rt)):n.texImage2D(e.TEXTURE_2D,0,Mt,et.width,et.height,0,ut,Rt,et.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){L&&nt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,dt,Mt,zt[0].width,zt[0].height,et.depth);for(let $=0,K=zt.length;$<K;$++)if(lt=zt[$],S.format!==xi)if(ut!==null)if(L){if(at)if(S.layerUpdates.size>0){let gt=Lg(lt.width,lt.height,S.format,S.type);for(let Ot of S.layerUpdates){let ye=lt.data.subarray(Ot*gt/lt.data.BYTES_PER_ELEMENT,(Ot+1)*gt/lt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,Ot,lt.width,lt.height,1,ut,ye)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,lt.width,lt.height,et.depth,ut,lt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,$,Mt,lt.width,lt.height,et.depth,0,lt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?at&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,$,0,0,0,lt.width,lt.height,et.depth,ut,Rt,lt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,$,Mt,lt.width,lt.height,et.depth,0,ut,Rt,lt.data)}else{L&&nt&&n.texStorage2D(e.TEXTURE_2D,dt,Mt,zt[0].width,zt[0].height);for(let $=0,K=zt.length;$<K;$++)lt=zt[$],S.format!==xi?ut!==null?L?at&&n.compressedTexSubImage2D(e.TEXTURE_2D,$,0,0,lt.width,lt.height,ut,lt.data):n.compressedTexImage2D(e.TEXTURE_2D,$,Mt,lt.width,lt.height,0,lt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?at&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,lt.width,lt.height,ut,Rt,lt.data):n.texImage2D(e.TEXTURE_2D,$,Mt,lt.width,lt.height,0,ut,Rt,lt.data)}else if(S.isDataArrayTexture)if(L){if(nt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,dt,Mt,et.width,et.height,et.depth),at)if(S.layerUpdates.size>0){let $=Lg(et.width,et.height,S.format,S.type);for(let K of S.layerUpdates){let gt=et.data.subarray(K*$/et.data.BYTES_PER_ELEMENT,(K+1)*$/et.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,K,et.width,et.height,1,ut,Rt,gt)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,Rt,et.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Mt,et.width,et.height,et.depth,0,ut,Rt,et.data);else if(S.isData3DTexture)L?(nt&&n.texStorage3D(e.TEXTURE_3D,dt,Mt,et.width,et.height,et.depth),at&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,Rt,et.data)):n.texImage3D(e.TEXTURE_3D,0,Mt,et.width,et.height,et.depth,0,ut,Rt,et.data);else if(S.isFramebufferTexture){if(nt)if(L)n.texStorage2D(e.TEXTURE_2D,dt,Mt,et.width,et.height);else{let $=et.width,K=et.height;for(let gt=0;gt<dt;gt++)n.texImage2D(e.TEXTURE_2D,gt,Mt,$,K,0,ut,Rt,null),$>>=1,K>>=1}}else if(zt.length>0){if(L&&nt){let $=ze(zt[0]);n.texStorage2D(e.TEXTURE_2D,dt,Mt,$.width,$.height)}for(let $=0,K=zt.length;$<K;$++)lt=zt[$],L?at&&n.texSubImage2D(e.TEXTURE_2D,$,0,0,ut,Rt,lt):n.texImage2D(e.TEXTURE_2D,$,Mt,ut,Rt,lt);S.generateMipmaps=!1}else if(L){if(nt){let $=ze(et);n.texStorage2D(e.TEXTURE_2D,dt,Mt,$.width,$.height)}at&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ut,Rt,et)}else n.texImage2D(e.TEXTURE_2D,0,Mt,ut,Rt,et);g(S)&&u(q),St.__version=k.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function j(C,S,B){if(S.image.length!==6)return;let q=_e(C,S),Q=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+B);let k=i.get(Q);if(Q.version!==k.__version||q===!0){n.activeTexture(e.TEXTURE0+B);let St=$t.getPrimaries($t.workingColorSpace),st=S.colorSpace===Ls?null:$t.getPrimaries(S.colorSpace),yt=S.colorSpace===Ls||St===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let xt=S.isCompressedTexture||S.image[0].isCompressedTexture,et=S.image[0]&&S.image[0].isDataTexture,ut=[];for(let K=0;K<6;K++)!xt&&!et?ut[K]=x(S.image[K],!0,s.maxCubemapSize):ut[K]=et?S.image[K].image:S.image[K],ut[K]=Ke(S,ut[K]);let Rt=ut[0],Mt=a.convert(S.format,S.colorSpace),lt=a.convert(S.type),zt=_(S.internalFormat,Mt,lt,S.colorSpace),L=S.isVideoTexture!==!0,nt=k.__version===void 0||q===!0,at=Q.dataReady,dt=E(S,Rt);Wt(e.TEXTURE_CUBE_MAP,S);let $;if(xt){L&&nt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,dt,zt,Rt.width,Rt.height);for(let K=0;K<6;K++){$=ut[K].mipmaps;for(let gt=0;gt<$.length;gt++){let Ot=$[gt];S.format!==xi?Mt!==null?L?at&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,Ot.width,Ot.height,Mt,Ot.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,zt,Ot.width,Ot.height,0,Ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?at&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,0,0,Ot.width,Ot.height,Mt,lt,Ot.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt,zt,Ot.width,Ot.height,0,Mt,lt,Ot.data)}}}else{if($=S.mipmaps,L&&nt){$.length>0&&dt++;let K=ze(ut[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,dt,zt,K.width,K.height)}for(let K=0;K<6;K++)if(et){L?at&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ut[K].width,ut[K].height,Mt,lt,ut[K].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,zt,ut[K].width,ut[K].height,0,Mt,lt,ut[K].data);for(let gt=0;gt<$.length;gt++){let ye=$[gt].image[K].image;L?at&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,ye.width,ye.height,Mt,lt,ye.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,zt,ye.width,ye.height,0,Mt,lt,ye.data)}}else{L?at&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Mt,lt,ut[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,zt,Mt,lt,ut[K]);for(let gt=0;gt<$.length;gt++){let Ot=$[gt];L?at&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,0,0,Mt,lt,Ot.image[K]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+K,gt+1,zt,Mt,lt,Ot.image[K])}}}g(S)&&u(e.TEXTURE_CUBE_MAP),k.__version=Q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function pt(C,S,B,q,Q,k){let St=a.convert(B.format,B.colorSpace),st=a.convert(B.type),yt=_(B.internalFormat,St,st,B.colorSpace),xt=i.get(S),et=i.get(B);if(et.__renderTarget=S,!xt.__hasExternalTextures){let ut=Math.max(1,S.width>>k),Rt=Math.max(1,S.height>>k);Q===e.TEXTURE_3D||Q===e.TEXTURE_2D_ARRAY?n.texImage3D(Q,k,yt,ut,Rt,S.depth,0,St,st,null):n.texImage2D(Q,k,yt,ut,Rt,0,St,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,C),_t(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,Q,et.__webglTexture,0,Re(S)):(Q===e.TEXTURE_2D||Q>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,Q,et.__webglTexture,k),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ut(C,S,B){if(e.bindRenderbuffer(e.RENDERBUFFER,C),S.depthBuffer){let q=S.depthTexture,Q=q&&q.isDepthTexture?q.type:null,k=y(S.stencilBuffer,Q),St=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=Re(S);_t(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,st,k,S.width,S.height):B?e.renderbufferStorageMultisample(e.RENDERBUFFER,st,k,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,k,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,St,e.RENDERBUFFER,C)}else{let q=S.textures;for(let Q=0;Q<q.length;Q++){let k=q[Q],St=a.convert(k.format,k.colorSpace),st=a.convert(k.type),yt=_(k.internalFormat,St,st,k.colorSpace),xt=Re(S);B&&_t(S)===!1?e.renderbufferStorageMultisample(e.RENDERBUFFER,xt,yt,S.width,S.height):_t(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,xt,yt,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,yt,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function bt(C,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(e.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let q=i.get(S.depthTexture);q.__renderTarget=S,(!q.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y(S.depthTexture,0);let Q=q.__webglTexture,k=Re(S);if(S.depthTexture.format===Po)_t(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0,k):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_ATTACHMENT,e.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Qo)_t(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0,k):e.framebufferTexture2D(e.FRAMEBUFFER,e.DEPTH_STENCIL_ATTACHMENT,e.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function jt(C){let S=i.get(C),B=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){let q=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),q){let Q=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,q.removeEventListener("dispose",Q)};q.addEventListener("dispose",Q),S.__depthDisposeCallback=Q}S.__boundDepthTexture=q}if(C.depthTexture&&!S.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");let q=C.texture.mipmaps;q&&q.length>0?bt(S.__webglFramebuffer[0],C):bt(S.__webglFramebuffer,C)}else if(B){S.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[q]),S.__webglDepthbuffer[q]===void 0)S.__webglDepthbuffer[q]=e.createRenderbuffer(),Ut(S.__webglDepthbuffer[q],C,!1);else{let Q=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,k=S.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,k),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,k)}}else{let q=C.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),Ut(S.__webglDepthbuffer,C,!1);else{let Q=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,k=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,k),e.framebufferRenderbuffer(e.FRAMEBUFFER,Q,e.RENDERBUFFER,k)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function pn(C,S,B){let q=i.get(C);S!==void 0&&pt(q.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),B!==void 0&&jt(C)}function N(C){let S=C.texture,B=i.get(C),q=i.get(S);C.addEventListener("dispose",w);let Q=C.textures,k=C.isWebGLCubeRenderTarget===!0,St=Q.length>1;if(St||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=S.version,r.memory.textures++),k){B.__webglFramebuffer=[];for(let st=0;st<6;st++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[st]=[];for(let yt=0;yt<S.mipmaps.length;yt++)B.__webglFramebuffer[st][yt]=e.createFramebuffer()}else B.__webglFramebuffer[st]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let st=0;st<S.mipmaps.length;st++)B.__webglFramebuffer[st]=e.createFramebuffer()}else B.__webglFramebuffer=e.createFramebuffer();if(St)for(let st=0,yt=Q.length;st<yt;st++){let xt=i.get(Q[st]);xt.__webglTexture===void 0&&(xt.__webglTexture=e.createTexture(),r.memory.textures++)}if(C.samples>0&&_t(C)===!1){B.__webglMultisampledFramebuffer=e.createFramebuffer(),B.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let st=0;st<Q.length;st++){let yt=Q[st];B.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,B.__webglColorRenderbuffer[st]);let xt=a.convert(yt.format,yt.colorSpace),et=a.convert(yt.type),ut=_(yt.internalFormat,xt,et,yt.colorSpace,C.isXRRenderTarget===!0),Rt=Re(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,Rt,ut,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,B.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer&&(B.__webglDepthRenderbuffer=e.createRenderbuffer(),Ut(B.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(k){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),Wt(e.TEXTURE_CUBE_MAP,S);for(let st=0;st<6;st++)if(S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)pt(B.__webglFramebuffer[st][yt],C,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,yt);else pt(B.__webglFramebuffer[st],C,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);g(S)&&u(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(St){for(let st=0,yt=Q.length;st<yt;st++){let xt=Q[st],et=i.get(xt),ut=e.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ut=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ut,et.__webglTexture),Wt(ut,xt),pt(B.__webglFramebuffer,C,xt,e.COLOR_ATTACHMENT0+st,ut,0),g(xt)&&u(ut)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(st=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,q.__webglTexture),Wt(st,S),S.mipmaps&&S.mipmaps.length>0)for(let yt=0;yt<S.mipmaps.length;yt++)pt(B.__webglFramebuffer[yt],C,S,e.COLOR_ATTACHMENT0,st,yt);else pt(B.__webglFramebuffer,C,S,e.COLOR_ATTACHMENT0,st,0);g(S)&&u(st),n.unbindTexture()}C.depthBuffer&&jt(C)}function we(C){let S=C.textures;for(let B=0,q=S.length;B<q;B++){let Q=S[B];if(g(Q)){let k=m(C),St=i.get(Q).__webglTexture;n.bindTexture(k,St),u(k),n.unbindTexture()}}}let It=[],Dt=[];function vt(C){if(C.samples>0){if(_t(C)===!1){let S=C.textures,B=C.width,q=C.height,Q=e.COLOR_BUFFER_BIT,k=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=i.get(C),st=S.length>1;if(st)for(let xt=0;xt<S.length;xt++)n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+xt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+xt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,St.__webglMultisampledFramebuffer);let yt=C.texture.mipmaps;yt&&yt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglFramebuffer);for(let xt=0;xt<S.length;xt++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(Q|=e.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(Q|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);let et=i.get(S[xt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,et,0)}e.blitFramebuffer(0,0,B,q,0,0,B,q,Q,e.NEAREST),l===!0&&(It.length=0,Dt.length=0,It.push(e.COLOR_ATTACHMENT0+xt),C.depthBuffer&&C.resolveDepthBuffer===!1&&(It.push(k),Dt.push(k),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Dt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,It))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let xt=0;xt<S.length;xt++){n.bindFramebuffer(e.FRAMEBUFFER,St.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+xt,e.RENDERBUFFER,St.__webglColorRenderbuffer[xt]);let et=i.get(S[xt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,St.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+xt,e.TEXTURE_2D,et,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,St.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&l){let S=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function Re(C){return Math.min(s.maxSamples,C.samples)}function _t(C){let S=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ft(C){let S=r.render.frame;f.get(C)!==S&&(f.set(C,S),C.update())}function Ke(C,S){let B=C.colorSpace,q=C.format,Q=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||B!==lr&&B!==Ls&&($t.getTransfer(B)===fe?(q!==xi||Q!==Oi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),S}function ze(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=z,this.resetTextureUnits=U,this.setTexture2D=Y,this.setTexture2DArray=X,this.setTexture3D=it,this.setTextureCube=G,this.rebindTextures=pn,this.setupRenderTarget=N,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=jt,this.setupFrameBufferTexture=pt,this.useMultisampledRTT=_t}function AD(e,t){function n(i,s=Ls){let a,r=$t.getTransfer(s);if(i===Oi)return e.UNSIGNED_BYTE;if(i===Ff)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Hf)return e.UNSIGNED_SHORT_5_5_5_1;if(i===yg)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===xg)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===vg)return e.BYTE;if(i===_g)return e.SHORT;if(i===Zo)return e.UNSIGNED_SHORT;if(i===zf)return e.INT;if(i===Ta)return e.UNSIGNED_INT;if(i===es)return e.FLOAT;if(i===Ko)return e.HALF_FLOAT;if(i===Mg)return e.ALPHA;if(i===Sg)return e.RGB;if(i===xi)return e.RGBA;if(i===Po)return e.DEPTH_COMPONENT;if(i===Qo)return e.DEPTH_STENCIL;if(i===bg)return e.RED;if(i===Vf)return e.RED_INTEGER;if(i===Eg)return e.RG;if(i===Gf)return e.RG_INTEGER;if(i===kf)return e.RGBA_INTEGER;if(i===Fc||i===Hc||i===Vc||i===Gc)if(r===fe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===Fc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Hc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Vc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Gc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===Fc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Hc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Vc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Gc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xf||i===Wf||i===qf||i===Yf)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Xf)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Wf)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===qf)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Yf)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Zf||i===Kf||i===Jf)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Zf||i===Kf)return r===fe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Jf)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Qf||i===jf||i===$f||i===td||i===ed||i===nd||i===id||i===sd||i===ad||i===rd||i===od||i===ld||i===cd||i===ud)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===Qf)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===jf)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===$f)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===td)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ed)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===nd)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===id)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===sd)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ad)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===rd)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===od)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ld)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===cd)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ud)return r===fe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===hd||i===fd||i===dd)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===hd)return r===fe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===fd)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===dd)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pd||i===md||i===gd||i===vd)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===pd)return a.COMPRESSED_RED_RGTC1_EXT;if(i===md)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===gd)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===vd)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Jo?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}var wD=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,RD=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,qg=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Rc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new Li({vertexShader:wD,fragmentShader:RD,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Qt(new Ma(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Yg=class extends ws{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,f=null,d=null,h=null,p=null,v=null,x=typeof XRWebGLBinding<"u",g=new qg,u={},m=n.getContextAttributes(),_=null,y=null,E=[],A=[],w=new kt,R=null,b=new hn;b.viewport=new he;let M=new hn;M.viewport=new he;let D=[b,M],U=new Tf,z=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Z){let j=E[Z];return j===void 0&&(j=new Ho,E[Z]=j),j.getTargetRaySpace()},this.getControllerGrip=function(Z){let j=E[Z];return j===void 0&&(j=new Ho,E[Z]=j),j.getGripSpace()},this.getHand=function(Z){let j=E[Z];return j===void 0&&(j=new Ho,E[Z]=j),j.getHandSpace()};function Y(Z){let j=A.indexOf(Z.inputSource);if(j===-1)return;let pt=E[j];pt!==void 0&&(pt.update(Z.inputSource,Z.frame,c||r),pt.dispatchEvent({type:Z.type,data:Z.inputSource}))}function X(){s.removeEventListener("select",Y),s.removeEventListener("selectstart",Y),s.removeEventListener("selectend",Y),s.removeEventListener("squeeze",Y),s.removeEventListener("squeezestart",Y),s.removeEventListener("squeezeend",Y),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",it);for(let Z=0;Z<E.length;Z++){let j=A[Z];j!==null&&(A[Z]=null,E[Z].disconnect(j))}z=null,V=null,g.reset();for(let Z in u)delete u[Z];t.setRenderTarget(_),p=null,h=null,d=null,s=null,y=null,ae.stop(),i.isPresenting=!1,t.setPixelRatio(R),t.setSize(w.width,w.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Z){a=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Z){o=Z,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Z){c=Z},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(Z){if(s=Z,s!==null){if(_=t.getRenderTarget(),s.addEventListener("select",Y),s.addEventListener("selectstart",Y),s.addEventListener("selectend",Y),s.addEventListener("squeeze",Y),s.addEventListener("squeezestart",Y),s.addEventListener("squeezeend",Y),s.addEventListener("end",X),s.addEventListener("inputsourceschange",it),m.xrCompatible!==!0&&await n.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(w),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Ut=null,bt=null;m.depth&&(bt=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,pt=m.stencil?Qo:Po,Ut=m.stencil?Jo:Ta);let jt={colorFormat:n.RGBA8,depthFormat:bt,scaleFactor:a};d=this.getBinding(),h=d.createProjectionLayer(jt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new $i(h.textureWidth,h.textureHeight,{format:xi,type:Oi,depthTexture:new wc(h.textureWidth,h.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{let pt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(s,n,pt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new $i(p.framebufferWidth,p.framebufferHeight,{format:xi,type:Oi,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ae.setContext(s),ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function it(Z){for(let j=0;j<Z.removed.length;j++){let pt=Z.removed[j],Ut=A.indexOf(pt);Ut>=0&&(A[Ut]=null,E[Ut].disconnect(pt))}for(let j=0;j<Z.added.length;j++){let pt=Z.added[j],Ut=A.indexOf(pt);if(Ut===-1){for(let jt=0;jt<E.length;jt++)if(jt>=A.length){A.push(pt),Ut=jt;break}else if(A[jt]===null){A[jt]=pt,Ut=jt;break}if(Ut===-1)break}let bt=E[Ut];bt&&bt.connect(pt)}}let G=new O,ot=new O;function ht(Z,j,pt){G.setFromMatrixPosition(j.matrixWorld),ot.setFromMatrixPosition(pt.matrixWorld);let Ut=G.distanceTo(ot),bt=j.projectionMatrix.elements,jt=pt.projectionMatrix.elements,pn=bt[14]/(bt[10]-1),N=bt[14]/(bt[10]+1),we=(bt[9]+1)/bt[5],It=(bt[9]-1)/bt[5],Dt=(bt[8]-1)/bt[0],vt=(jt[8]+1)/jt[0],Re=pn*Dt,_t=pn*vt,Ft=Ut/(-Dt+vt),Ke=Ft*-Dt;if(j.matrixWorld.decompose(Z.position,Z.quaternion,Z.scale),Z.translateX(Ke),Z.translateZ(Ft),Z.matrixWorld.compose(Z.position,Z.quaternion,Z.scale),Z.matrixWorldInverse.copy(Z.matrixWorld).invert(),bt[10]===-1)Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let ze=pn+Ft,C=N+Ft,S=Re-Ke,B=_t+(Ut-Ke),q=we*N/C*ze,Q=It*N/C*ze;Z.projectionMatrix.makePerspective(S,B,q,Q,ze,C),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert()}}function Et(Z,j){j===null?Z.matrixWorld.copy(Z.matrix):Z.matrixWorld.multiplyMatrices(j.matrixWorld,Z.matrix),Z.matrixWorldInverse.copy(Z.matrixWorld).invert()}this.updateCamera=function(Z){if(s===null)return;let j=Z.near,pt=Z.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(pt=g.depthFar)),U.near=M.near=b.near=j,U.far=M.far=b.far=pt,(z!==U.near||V!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),z=U.near,V=U.far),U.layers.mask=Z.layers.mask|6,b.layers.mask=U.layers.mask&3,M.layers.mask=U.layers.mask&5;let Ut=Z.parent,bt=U.cameras;Et(U,Ut);for(let jt=0;jt<bt.length;jt++)Et(bt[jt],Ut);bt.length===2?ht(U,b,M):U.projectionMatrix.copy(b.projectionMatrix),Wt(Z,U,Ut)};function Wt(Z,j,pt){pt===null?Z.matrix.copy(j.matrixWorld):(Z.matrix.copy(pt.matrixWorld),Z.matrix.invert(),Z.matrix.multiply(j.matrixWorld)),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.updateMatrixWorld(!0),Z.projectionMatrix.copy(j.projectionMatrix),Z.projectionMatrixInverse.copy(j.projectionMatrixInverse),Z.isPerspectiveCamera&&(Z.fov=Bo*2*Math.atan(1/Z.projectionMatrix.elements[5]),Z.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(Z){l=Z,h!==null&&(h.fixedFoveation=Z),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Z)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(Z){return u[Z]};let _e=null;function Ae(Z,j){if(f=j.getViewerPose(c||r),v=j,f!==null){let pt=f.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Ut=!1;pt.length!==U.cameras.length&&(U.cameras.length=0,Ut=!0);for(let N=0;N<pt.length;N++){let we=pt[N],It=null;if(p!==null)It=p.getViewport(we);else{let vt=d.getViewSubImage(h,we);It=vt.viewport,N===0&&(t.setRenderTargetTextures(y,vt.colorTexture,vt.depthStencilTexture),t.setRenderTarget(y))}let Dt=D[N];Dt===void 0&&(Dt=new hn,Dt.layers.enable(N),Dt.viewport=new he,D[N]=Dt),Dt.matrix.fromArray(we.transform.matrix),Dt.matrix.decompose(Dt.position,Dt.quaternion,Dt.scale),Dt.projectionMatrix.fromArray(we.projectionMatrix),Dt.projectionMatrixInverse.copy(Dt.projectionMatrix).invert(),Dt.viewport.set(It.x,It.y,It.width,It.height),N===0&&(U.matrix.copy(Dt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ut===!0&&U.cameras.push(Dt)}let bt=s.enabledFeatures;if(bt&&bt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();let N=d.getDepthInformation(pt[0]);N&&N.isValid&&N.texture&&g.init(N,s.renderState)}if(bt&&bt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let N=0;N<pt.length;N++){let we=pt[N].camera;if(we){let It=u[we];It||(It=new Rc,u[we]=It);let Dt=d.getCameraImage(we);It.sourceTexture=Dt}}}}for(let pt=0;pt<E.length;pt++){let Ut=A[pt],bt=E[pt];Ut!==null&&bt!==void 0&&bt.update(Ut,j,c||r)}_e&&_e(Z,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),v=null}let ae=new c1;ae.setAnimationLoop(Ae),this.setAnimationLoop=function(Z){_e=Z},this.dispose=function(){}}},_r=new Ui,CD=new Oe;function DD(e,t){function n(g,u){g.matrixAutoUpdate===!0&&g.updateMatrix(),u.value.copy(g.matrix)}function i(g,u){u.color.getRGB(g.fogColor.value,Dg(e)),u.isFog?(g.fogNear.value=u.near,g.fogFar.value=u.far):u.isFogExp2&&(g.fogDensity.value=u.density)}function s(g,u,m,_,y){u.isMeshBasicMaterial||u.isMeshLambertMaterial?a(g,u):u.isMeshToonMaterial?(a(g,u),d(g,u)):u.isMeshPhongMaterial?(a(g,u),f(g,u)):u.isMeshStandardMaterial?(a(g,u),h(g,u),u.isMeshPhysicalMaterial&&p(g,u,y)):u.isMeshMatcapMaterial?(a(g,u),v(g,u)):u.isMeshDepthMaterial?a(g,u):u.isMeshDistanceMaterial?(a(g,u),x(g,u)):u.isMeshNormalMaterial?a(g,u):u.isLineBasicMaterial?(r(g,u),u.isLineDashedMaterial&&o(g,u)):u.isPointsMaterial?l(g,u,m,_):u.isSpriteMaterial?c(g,u):u.isShadowMaterial?(g.color.value.copy(u.color),g.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function a(g,u){g.opacity.value=u.opacity,u.color&&g.diffuse.value.copy(u.color),u.emissive&&g.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.bumpMap&&(g.bumpMap.value=u.bumpMap,n(u.bumpMap,g.bumpMapTransform),g.bumpScale.value=u.bumpScale,u.side===Dn&&(g.bumpScale.value*=-1)),u.normalMap&&(g.normalMap.value=u.normalMap,n(u.normalMap,g.normalMapTransform),g.normalScale.value.copy(u.normalScale),u.side===Dn&&g.normalScale.value.negate()),u.displacementMap&&(g.displacementMap.value=u.displacementMap,n(u.displacementMap,g.displacementMapTransform),g.displacementScale.value=u.displacementScale,g.displacementBias.value=u.displacementBias),u.emissiveMap&&(g.emissiveMap.value=u.emissiveMap,n(u.emissiveMap,g.emissiveMapTransform)),u.specularMap&&(g.specularMap.value=u.specularMap,n(u.specularMap,g.specularMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest);let m=t.get(u),_=m.envMap,y=m.envMapRotation;_&&(g.envMap.value=_,_r.copy(y),_r.x*=-1,_r.y*=-1,_r.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(_r.y*=-1,_r.z*=-1),g.envMapRotation.value.setFromMatrix4(CD.makeRotationFromEuler(_r)),g.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=u.reflectivity,g.ior.value=u.ior,g.refractionRatio.value=u.refractionRatio),u.lightMap&&(g.lightMap.value=u.lightMap,g.lightMapIntensity.value=u.lightMapIntensity,n(u.lightMap,g.lightMapTransform)),u.aoMap&&(g.aoMap.value=u.aoMap,g.aoMapIntensity.value=u.aoMapIntensity,n(u.aoMap,g.aoMapTransform))}function r(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform))}function o(g,u){g.dashSize.value=u.dashSize,g.totalSize.value=u.dashSize+u.gapSize,g.scale.value=u.scale}function l(g,u,m,_){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.size.value=u.size*m,g.scale.value=_*.5,u.map&&(g.map.value=u.map,n(u.map,g.uvTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function c(g,u){g.diffuse.value.copy(u.color),g.opacity.value=u.opacity,g.rotation.value=u.rotation,u.map&&(g.map.value=u.map,n(u.map,g.mapTransform)),u.alphaMap&&(g.alphaMap.value=u.alphaMap,n(u.alphaMap,g.alphaMapTransform)),u.alphaTest>0&&(g.alphaTest.value=u.alphaTest)}function f(g,u){g.specular.value.copy(u.specular),g.shininess.value=Math.max(u.shininess,1e-4)}function d(g,u){u.gradientMap&&(g.gradientMap.value=u.gradientMap)}function h(g,u){g.metalness.value=u.metalness,u.metalnessMap&&(g.metalnessMap.value=u.metalnessMap,n(u.metalnessMap,g.metalnessMapTransform)),g.roughness.value=u.roughness,u.roughnessMap&&(g.roughnessMap.value=u.roughnessMap,n(u.roughnessMap,g.roughnessMapTransform)),u.envMap&&(g.envMapIntensity.value=u.envMapIntensity)}function p(g,u,m){g.ior.value=u.ior,u.sheen>0&&(g.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),g.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(g.sheenColorMap.value=u.sheenColorMap,n(u.sheenColorMap,g.sheenColorMapTransform)),u.sheenRoughnessMap&&(g.sheenRoughnessMap.value=u.sheenRoughnessMap,n(u.sheenRoughnessMap,g.sheenRoughnessMapTransform))),u.clearcoat>0&&(g.clearcoat.value=u.clearcoat,g.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(g.clearcoatMap.value=u.clearcoatMap,n(u.clearcoatMap,g.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,n(u.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(g.clearcoatNormalMap.value=u.clearcoatNormalMap,n(u.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Dn&&g.clearcoatNormalScale.value.negate())),u.dispersion>0&&(g.dispersion.value=u.dispersion),u.iridescence>0&&(g.iridescence.value=u.iridescence,g.iridescenceIOR.value=u.iridescenceIOR,g.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(g.iridescenceMap.value=u.iridescenceMap,n(u.iridescenceMap,g.iridescenceMapTransform)),u.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=u.iridescenceThicknessMap,n(u.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),u.transmission>0&&(g.transmission.value=u.transmission,g.transmissionSamplerMap.value=m.texture,g.transmissionSamplerSize.value.set(m.width,m.height),u.transmissionMap&&(g.transmissionMap.value=u.transmissionMap,n(u.transmissionMap,g.transmissionMapTransform)),g.thickness.value=u.thickness,u.thicknessMap&&(g.thicknessMap.value=u.thicknessMap,n(u.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=u.attenuationDistance,g.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(g.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(g.anisotropyMap.value=u.anisotropyMap,n(u.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=u.specularIntensity,g.specularColor.value.copy(u.specularColor),u.specularColorMap&&(g.specularColorMap.value=u.specularColorMap,n(u.specularColorMap,g.specularColorMapTransform)),u.specularIntensityMap&&(g.specularIntensityMap.value=u.specularIntensityMap,n(u.specularIntensityMap,g.specularIntensityMapTransform))}function v(g,u){u.matcap&&(g.matcap.value=u.matcap)}function x(g,u){let m=t.get(u).light;g.referencePosition.value.setFromMatrixPosition(m.matrixWorld),g.nearDistance.value=m.shadow.camera.near,g.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ND(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,_){let y=_.program;i.uniformBlockBinding(m,y)}function c(m,_){let y=s[m.id];y===void 0&&(v(m),y=f(m),s[m.id]=y,m.addEventListener("dispose",g));let E=_.program;i.updateUBOMapping(m,E);let A=t.render.frame;a[m.id]!==A&&(h(m),a[m.id]=A)}function f(m){let _=d();m.__bindingPointIndex=_;let y=e.createBuffer(),E=m.__size,A=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,E,A),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,_,y),y}function d(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(m){let _=s[m.id],y=m.uniforms,E=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,_);for(let A=0,w=y.length;A<w;A++){let R=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,M=R.length;b<M;b++){let D=R[b];if(p(D,A,b,E)===!0){let U=D.__offset,z=Array.isArray(D.value)?D.value:[D.value],V=0;for(let Y=0;Y<z.length;Y++){let X=z[Y],it=x(X);typeof X=="number"||typeof X=="boolean"?(D.__data[0]=X,e.bufferSubData(e.UNIFORM_BUFFER,U+V,D.__data)):X.isMatrix3?(D.__data[0]=X.elements[0],D.__data[1]=X.elements[1],D.__data[2]=X.elements[2],D.__data[3]=0,D.__data[4]=X.elements[3],D.__data[5]=X.elements[4],D.__data[6]=X.elements[5],D.__data[7]=0,D.__data[8]=X.elements[6],D.__data[9]=X.elements[7],D.__data[10]=X.elements[8],D.__data[11]=0):(X.toArray(D.__data,V),V+=it.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,U,D.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(m,_,y,E){let A=m.value,w=_+"_"+y;if(E[w]===void 0)return typeof A=="number"||typeof A=="boolean"?E[w]=A:E[w]=A.clone(),!0;{let R=E[w];if(typeof A=="number"||typeof A=="boolean"){if(R!==A)return E[w]=A,!0}else if(R.equals(A)===!1)return R.copy(A),!0}return!1}function v(m){let _=m.uniforms,y=0,E=16;for(let w=0,R=_.length;w<R;w++){let b=Array.isArray(_[w])?_[w]:[_[w]];for(let M=0,D=b.length;M<D;M++){let U=b[M],z=Array.isArray(U.value)?U.value:[U.value];for(let V=0,Y=z.length;V<Y;V++){let X=z[V],it=x(X),G=y%E,ot=G%it.boundary,ht=G+ot;y+=ot,ht!==0&&E-ht<it.storage&&(y+=E-ht),U.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=it.storage}}}let A=y%E;return A>0&&(y+=E-A),m.__size=y,m.__cache={},this}function x(m){let _={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(_.boundary=4,_.storage=4):m.isVector2?(_.boundary=8,_.storage=8):m.isVector3||m.isColor?(_.boundary=16,_.storage=12):m.isVector4?(_.boundary=16,_.storage=16):m.isMatrix3?(_.boundary=48,_.storage=48):m.isMatrix4?(_.boundary=64,_.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),_}function g(m){let _=m.target;_.removeEventListener("dispose",g);let y=r.indexOf(_.__bindingPointIndex);r.splice(y,1),e.deleteBuffer(s[_.id]),delete s[_.id],delete a[_.id]}function u(){for(let m in s)e.deleteBuffer(s[m]);r=[],s={},a={}}return{bind:l,update:c,dispose:u}}var Sd=class{constructor(t={}){let{canvas:n=Ib(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=r;let v=new Uint32Array(4),x=new Int32Array(4),g=null,u=null,m=[],_=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Us,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let y=this,E=!1;this._outputColorSpace=un;let A=0,w=0,R=null,b=-1,M=null,D=new he,U=new he,z=null,V=new Ht(0),Y=0,X=n.width,it=n.height,G=1,ot=null,ht=null,Et=new he(0,0,X,it),Wt=new he(0,0,X,it),_e=!1,Ae=new Vo,ae=!1,Z=!1,j=new Oe,pt=new O,Ut=new he,bt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},jt=!1;function pn(){return R===null?G:1}let N=i;function we(T,I){return n.getContext(T,I)}try{let T={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${"180"}`),n.addEventListener("webglcontextlost",at,!1),n.addEventListener("webglcontextrestored",dt,!1),n.addEventListener("webglcontextcreationerror",$,!1),N===null){let I="webgl2";if(N=we(I,T),N===null)throw we(I)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let It,Dt,vt,Re,_t,Ft,Ke,ze,C,S,B,q,Q,k,St,st,yt,xt,et,ut,Rt,Mt,lt,zt;function L(){It=new K2(N),It.init(),Mt=new AD(N,It),Dt=new G2(N,It,t,Mt),vt=new ED(N,It),Dt.reversedDepthBuffer&&h&&vt.buffers.depth.setReversed(!0),Re=new j2(N),_t=new hD,Ft=new TD(N,It,vt,_t,Dt,Mt,Re),Ke=new X2(y),ze=new Z2(y),C=new sR(N),lt=new H2(N,C),S=new J2(N,C,Re,lt),B=new t3(N,S,C,Re),et=new $2(N,Dt,Ft),st=new k2(_t),q=new uD(y,Ke,ze,It,Dt,lt,st),Q=new DD(y,_t),k=new dD,St=new yD(It),xt=new F2(y,Ke,ze,vt,B,p,l),yt=new SD(y,B,Dt),zt=new ND(N,Re,Dt,vt),ut=new V2(N,It,Re),Rt=new Q2(N,It,Re),Re.programs=q.programs,y.capabilities=Dt,y.extensions=It,y.properties=_t,y.renderLists=k,y.shadowMap=yt,y.state=vt,y.info=Re}L();let nt=new Yg(y,N);this.xr=nt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let T=It.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=It.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(T){T!==void 0&&(G=T,this.setSize(X,it,!1))},this.getSize=function(T){return T.set(X,it)},this.setSize=function(T,I,F=!0){if(nt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=T,it=I,n.width=Math.floor(T*G),n.height=Math.floor(I*G),F===!0&&(n.style.width=T+"px",n.style.height=I+"px"),this.setViewport(0,0,T,I)},this.getDrawingBufferSize=function(T){return T.set(X*G,it*G).floor()},this.setDrawingBufferSize=function(T,I,F){X=T,it=I,G=F,n.width=Math.floor(T*F),n.height=Math.floor(I*F),this.setViewport(0,0,T,I)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(Et)},this.setViewport=function(T,I,F,H){T.isVector4?Et.set(T.x,T.y,T.z,T.w):Et.set(T,I,F,H),vt.viewport(D.copy(Et).multiplyScalar(G).round())},this.getScissor=function(T){return T.copy(Wt)},this.setScissor=function(T,I,F,H){T.isVector4?Wt.set(T.x,T.y,T.z,T.w):Wt.set(T,I,F,H),vt.scissor(U.copy(Wt).multiplyScalar(G).round())},this.getScissorTest=function(){return _e},this.setScissorTest=function(T){vt.setScissorTest(_e=T)},this.setOpaqueSort=function(T){ot=T},this.setTransparentSort=function(T){ht=T},this.getClearColor=function(T){return T.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor(...arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha(...arguments)},this.clear=function(T=!0,I=!0,F=!0){let H=0;if(T){let P=!1;if(R!==null){let tt=R.texture.format;P=tt===kf||tt===Gf||tt===Vf}if(P){let tt=R.texture.type,ct=tt===Oi||tt===Ta||tt===Zo||tt===Jo||tt===Ff||tt===Hf,mt=xt.getClearColor(),ft=xt.getClearAlpha(),wt=mt.r,Nt=mt.g,Tt=mt.b;ct?(v[0]=wt,v[1]=Nt,v[2]=Tt,v[3]=ft,N.clearBufferuiv(N.COLOR,0,v)):(x[0]=wt,x[1]=Nt,x[2]=Tt,x[3]=ft,N.clearBufferiv(N.COLOR,0,x))}else H|=N.COLOR_BUFFER_BIT}I&&(H|=N.DEPTH_BUFFER_BIT),F&&(H|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",at,!1),n.removeEventListener("webglcontextrestored",dt,!1),n.removeEventListener("webglcontextcreationerror",$,!1),xt.dispose(),k.dispose(),St.dispose(),_t.dispose(),Ke.dispose(),ze.dispose(),B.dispose(),lt.dispose(),zt.dispose(),q.dispose(),nt.dispose(),nt.removeEventListener("sessionstart",Ii),nt.removeEventListener("sessionend",$g),wa.stop()};function at(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function dt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;let T=Re.autoReset,I=yt.enabled,F=yt.autoUpdate,H=yt.needsUpdate,P=yt.type;L(),Re.autoReset=T,yt.enabled=I,yt.autoUpdate=F,yt.needsUpdate=H,yt.type=P}function $(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function K(T){let I=T.target;I.removeEventListener("dispose",K),gt(I)}function gt(T){Ot(T),_t.remove(T)}function Ot(T){let I=_t.get(T).programs;I!==void 0&&(I.forEach(function(F){q.releaseProgram(F)}),T.isShaderMaterial&&q.releaseShaderCache(T))}this.renderBufferDirect=function(T,I,F,H,P,tt){I===null&&(I=bt);let ct=P.isMesh&&P.matrixWorld.determinant()<0,mt=R1(T,I,F,H,P);vt.setMaterial(H,ct);let ft=F.index,wt=1;if(H.wireframe===!0){if(ft=S.getWireframeAttribute(F),ft===void 0)return;wt=2}let Nt=F.drawRange,Tt=F.attributes.position,Zt=Nt.start*wt,de=(Nt.start+Nt.count)*wt;tt!==null&&(Zt=Math.max(Zt,tt.start*wt),de=Math.min(de,(tt.start+tt.count)*wt)),ft!==null?(Zt=Math.max(Zt,0),de=Math.min(de,ft.count)):Tt!=null&&(Zt=Math.max(Zt,0),de=Math.min(de,Tt.count));let Ie=de-Zt;if(Ie<0||Ie===1/0)return;lt.setup(P,H,mt,F,ft);let Ee,me=ut;if(ft!==null&&(Ee=C.get(ft),me=Rt,me.setIndex(Ee)),P.isMesh)H.wireframe===!0?(vt.setLineWidth(H.wireframeLinewidth*pn()),me.setMode(N.LINES)):me.setMode(N.TRIANGLES);else if(P.isLine){let At=H.linewidth;At===void 0&&(At=1),vt.setLineWidth(At*pn()),P.isLineSegments?me.setMode(N.LINES):P.isLineLoop?me.setMode(N.LINE_LOOP):me.setMode(N.LINE_STRIP)}else P.isPoints?me.setMode(N.POINTS):P.isSprite&&me.setMode(N.TRIANGLES);if(P.isBatchedMesh)if(P._multiDrawInstances!==null)zo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),me.renderMultiDrawInstances(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount,P._multiDrawInstances);else if(It.get("WEBGL_multi_draw"))me.renderMultiDraw(P._multiDrawStarts,P._multiDrawCounts,P._multiDrawCount);else{let At=P._multiDrawStarts,Ne=P._multiDrawCounts,te=P._multiDrawCount,Vn=ft?C.get(ft).bytesPerElement:1,Mr=_t.get(H).currentProgram.getUniforms();for(let Gn=0;Gn<te;Gn++)Mr.setValue(N,"_gl_DrawID",Gn),me.render(At[Gn]/Vn,Ne[Gn])}else if(P.isInstancedMesh)me.renderInstances(Zt,Ie,P.count);else if(F.isInstancedBufferGeometry){let At=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Ne=Math.min(F.instanceCount,At);me.renderInstances(Zt,Ie,Ne)}else me.render(Zt,Ie)};function ye(T,I,F){T.transparent===!0&&T.side===yi&&T.forceSinglePass===!1?(T.side=Dn,T.needsUpdate=!0,Yc(T,I,F),T.side=As,T.needsUpdate=!0,Yc(T,I,F),T.side=yi):Yc(T,I,F)}this.compile=function(T,I,F=null){F===null&&(F=T),u=St.get(F),u.init(I),_.push(u),F.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(u.pushLight(P),P.castShadow&&u.pushShadow(P))}),T!==F&&T.traverseVisible(function(P){P.isLight&&P.layers.test(I.layers)&&(u.pushLight(P),P.castShadow&&u.pushShadow(P))}),u.setupLights();let H=new Set;return T.traverse(function(P){if(!(P.isMesh||P.isPoints||P.isLine||P.isSprite))return;let tt=P.material;if(tt)if(Array.isArray(tt))for(let ct=0;ct<tt.length;ct++){let mt=tt[ct];ye(mt,F,P),H.add(mt)}else ye(tt,F,P),H.add(tt)}),u=_.pop(),H},this.compileAsync=function(T,I,F=null){let H=this.compile(T,I,F);return new Promise(P=>{function tt(){if(H.forEach(function(ct){_t.get(ct).currentProgram.isReady()&&H.delete(ct)}),H.size===0){P(T);return}setTimeout(tt,10)}It.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let re=null;function is(T){re&&re(T)}function Ii(){wa.stop()}function $g(){wa.start()}let wa=new c1;wa.setAnimationLoop(is),typeof self<"u"&&wa.setContext(self),this.setAnimationLoop=function(T){re=T,nt.setAnimationLoop(T),T===null?wa.stop():wa.start()},nt.addEventListener("sessionstart",Ii),nt.addEventListener("sessionend",$g),this.render=function(T,I){if(I!==void 0&&I.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),nt.enabled===!0&&nt.isPresenting===!0&&(nt.cameraAutoUpdate===!0&&nt.updateCamera(I),I=nt.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,I,R),u=St.get(T,_.length),u.init(I),_.push(u),j.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),Ae.setFromProjectionMatrix(j,Di,I.reversedDepth),Z=this.localClippingEnabled,ae=st.init(this.clippingPlanes,Z),g=k.get(T,m.length),g.init(),m.push(g),nt.enabled===!0&&nt.isPresenting===!0){let tt=y.xr.getDepthSensingMesh();tt!==null&&Rd(tt,I,-1/0,y.sortObjects)}Rd(T,I,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(ot,ht),jt=nt.enabled===!1||nt.isPresenting===!1||nt.hasDepthSensing()===!1,jt&&xt.addToRenderList(g,T),this.info.render.frame++,ae===!0&&st.beginShadows();let F=u.state.shadowsArray;yt.render(F,T,I),ae===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,P=g.transmissive;if(u.setupLights(),I.isArrayCamera){let tt=I.cameras;if(P.length>0)for(let ct=0,mt=tt.length;ct<mt;ct++){let ft=tt[ct];ev(H,P,T,ft)}jt&&xt.render(T);for(let ct=0,mt=tt.length;ct<mt;ct++){let ft=tt[ct];tv(g,T,ft,ft.viewport)}}else P.length>0&&ev(H,P,T,I),jt&&xt.render(T),tv(g,T,I);R!==null&&w===0&&(Ft.updateMultisampleRenderTarget(R),Ft.updateRenderTargetMipmap(R)),T.isScene===!0&&T.onAfterRender(y,T,I),lt.resetDefaultState(),b=-1,M=null,_.pop(),_.length>0?(u=_[_.length-1],ae===!0&&st.setGlobalState(y.clippingPlanes,u.state.camera)):u=null,m.pop(),m.length>0?g=m[m.length-1]:g=null};function Rd(T,I,F,H){if(T.visible===!1)return;if(T.layers.test(I.layers)){if(T.isGroup)F=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(I);else if(T.isLight)u.pushLight(T),T.castShadow&&u.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||Ae.intersectsSprite(T)){H&&Ut.setFromMatrixPosition(T.matrixWorld).applyMatrix4(j);let ct=B.update(T),mt=T.material;mt.visible&&g.push(T,ct,mt,F,Ut.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||Ae.intersectsObject(T))){let ct=B.update(T),mt=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ut.copy(T.boundingSphere.center)):(ct.boundingSphere===null&&ct.computeBoundingSphere(),Ut.copy(ct.boundingSphere.center)),Ut.applyMatrix4(T.matrixWorld).applyMatrix4(j)),Array.isArray(mt)){let ft=ct.groups;for(let wt=0,Nt=ft.length;wt<Nt;wt++){let Tt=ft[wt],Zt=mt[Tt.materialIndex];Zt&&Zt.visible&&g.push(T,ct,Zt,F,Ut.z,Tt)}}else mt.visible&&g.push(T,ct,mt,F,Ut.z,null)}}let tt=T.children;for(let ct=0,mt=tt.length;ct<mt;ct++)Rd(tt[ct],I,F,H)}function tv(T,I,F,H){let P=T.opaque,tt=T.transmissive,ct=T.transparent;u.setupLightsView(F),ae===!0&&st.setGlobalState(y.clippingPlanes,F),H&&vt.viewport(D.copy(H)),P.length>0&&qc(P,I,F),tt.length>0&&qc(tt,I,F),ct.length>0&&qc(ct,I,F),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function ev(T,I,F,H){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[H.id]===void 0&&(u.state.transmissionRenderTarget[H.id]=new $i(1,1,{generateMipmaps:!0,type:It.has("EXT_color_buffer_half_float")||It.has("EXT_color_buffer_float")?Ko:Oi,minFilter:Ea,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));let tt=u.state.transmissionRenderTarget[H.id],ct=H.viewport||D;tt.setSize(ct.z*y.transmissionResolutionScale,ct.w*y.transmissionResolutionScale);let mt=y.getRenderTarget(),ft=y.getActiveCubeFace(),wt=y.getActiveMipmapLevel();y.setRenderTarget(tt),y.getClearColor(V),Y=y.getClearAlpha(),Y<1&&y.setClearColor(16777215,.5),y.clear(),jt&&xt.render(F);let Nt=y.toneMapping;y.toneMapping=Us;let Tt=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),u.setupLightsView(H),ae===!0&&st.setGlobalState(y.clippingPlanes,H),qc(T,F,H),Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt),It.has("WEBGL_multisampled_render_to_texture")===!1){let Zt=!1;for(let de=0,Ie=I.length;de<Ie;de++){let Ee=I[de],me=Ee.object,At=Ee.geometry,Ne=Ee.material,te=Ee.group;if(Ne.side===yi&&me.layers.test(H.layers)){let Vn=Ne.side;Ne.side=Dn,Ne.needsUpdate=!0,nv(me,F,H,At,Ne,te),Ne.side=Vn,Ne.needsUpdate=!0,Zt=!0}}Zt===!0&&(Ft.updateMultisampleRenderTarget(tt),Ft.updateRenderTargetMipmap(tt))}y.setRenderTarget(mt,ft,wt),y.setClearColor(V,Y),Tt!==void 0&&(H.viewport=Tt),y.toneMapping=Nt}function qc(T,I,F){let H=I.isScene===!0?I.overrideMaterial:null;for(let P=0,tt=T.length;P<tt;P++){let ct=T[P],mt=ct.object,ft=ct.geometry,wt=ct.group,Nt=ct.material;Nt.allowOverride===!0&&H!==null&&(Nt=H),mt.layers.test(F.layers)&&nv(mt,I,F,ft,Nt,wt)}}function nv(T,I,F,H,P,tt){T.onBeforeRender(y,I,F,H,P,tt),T.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),P.onBeforeRender(y,I,F,H,T,tt),P.transparent===!0&&P.side===yi&&P.forceSinglePass===!1?(P.side=Dn,P.needsUpdate=!0,y.renderBufferDirect(F,I,H,P,T,tt),P.side=As,P.needsUpdate=!0,y.renderBufferDirect(F,I,H,P,T,tt),P.side=yi):y.renderBufferDirect(F,I,H,P,T,tt),T.onAfterRender(y,I,F,H,P,tt)}function Yc(T,I,F){I.isScene!==!0&&(I=bt);let H=_t.get(T),P=u.state.lights,tt=u.state.shadowsArray,ct=P.state.version,mt=q.getParameters(T,P.state,tt,I,F),ft=q.getProgramCacheKey(mt),wt=H.programs;H.environment=T.isMeshStandardMaterial?I.environment:null,H.fog=I.fog,H.envMap=(T.isMeshStandardMaterial?ze:Ke).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?I.environmentRotation:T.envMapRotation,wt===void 0&&(T.addEventListener("dispose",K),wt=new Map,H.programs=wt);let Nt=wt.get(ft);if(Nt!==void 0){if(H.currentProgram===Nt&&H.lightsStateVersion===ct)return sv(T,mt),Nt}else mt.uniforms=q.getUniforms(T),T.onBeforeCompile(mt,y),Nt=q.acquireProgram(mt,ft),wt.set(ft,Nt),H.uniforms=mt.uniforms;let Tt=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Tt.clippingPlanes=st.uniform),sv(T,mt),H.needsLights=D1(T),H.lightsStateVersion=ct,H.needsLights&&(Tt.ambientLightColor.value=P.state.ambient,Tt.lightProbe.value=P.state.probe,Tt.directionalLights.value=P.state.directional,Tt.directionalLightShadows.value=P.state.directionalShadow,Tt.spotLights.value=P.state.spot,Tt.spotLightShadows.value=P.state.spotShadow,Tt.rectAreaLights.value=P.state.rectArea,Tt.ltc_1.value=P.state.rectAreaLTC1,Tt.ltc_2.value=P.state.rectAreaLTC2,Tt.pointLights.value=P.state.point,Tt.pointLightShadows.value=P.state.pointShadow,Tt.hemisphereLights.value=P.state.hemi,Tt.directionalShadowMap.value=P.state.directionalShadowMap,Tt.directionalShadowMatrix.value=P.state.directionalShadowMatrix,Tt.spotShadowMap.value=P.state.spotShadowMap,Tt.spotLightMatrix.value=P.state.spotLightMatrix,Tt.spotLightMap.value=P.state.spotLightMap,Tt.pointShadowMap.value=P.state.pointShadowMap,Tt.pointShadowMatrix.value=P.state.pointShadowMatrix),H.currentProgram=Nt,H.uniformsList=null,Nt}function iv(T){if(T.uniformsList===null){let I=T.currentProgram.getUniforms();T.uniformsList=el.seqWithValue(I.seq,T.uniforms)}return T.uniformsList}function sv(T,I){let F=_t.get(T);F.outputColorSpace=I.outputColorSpace,F.batching=I.batching,F.batchingColor=I.batchingColor,F.instancing=I.instancing,F.instancingColor=I.instancingColor,F.instancingMorph=I.instancingMorph,F.skinning=I.skinning,F.morphTargets=I.morphTargets,F.morphNormals=I.morphNormals,F.morphColors=I.morphColors,F.morphTargetsCount=I.morphTargetsCount,F.numClippingPlanes=I.numClippingPlanes,F.numIntersection=I.numClipIntersection,F.vertexAlphas=I.vertexAlphas,F.vertexTangents=I.vertexTangents,F.toneMapping=I.toneMapping}function R1(T,I,F,H,P){I.isScene!==!0&&(I=bt),Ft.resetTextureUnits();let tt=I.fog,ct=H.isMeshStandardMaterial?I.environment:null,mt=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:lr,ft=(H.isMeshStandardMaterial?ze:Ke).get(H.envMap||ct),wt=H.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Nt=!!F.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Tt=!!F.morphAttributes.position,Zt=!!F.morphAttributes.normal,de=!!F.morphAttributes.color,Ie=Us;H.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(Ie=y.toneMapping);let Ee=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,me=Ee!==void 0?Ee.length:0,At=_t.get(H),Ne=u.state.lights;if(ae===!0&&(Z===!0||T!==M)){let Sn=T===M&&H.id===b;st.setState(H,T,Sn)}let te=!1;H.version===At.__version?(At.needsLights&&At.lightsStateVersion!==Ne.state.version||At.outputColorSpace!==mt||P.isBatchedMesh&&At.batching===!1||!P.isBatchedMesh&&At.batching===!0||P.isBatchedMesh&&At.batchingColor===!0&&P.colorTexture===null||P.isBatchedMesh&&At.batchingColor===!1&&P.colorTexture!==null||P.isInstancedMesh&&At.instancing===!1||!P.isInstancedMesh&&At.instancing===!0||P.isSkinnedMesh&&At.skinning===!1||!P.isSkinnedMesh&&At.skinning===!0||P.isInstancedMesh&&At.instancingColor===!0&&P.instanceColor===null||P.isInstancedMesh&&At.instancingColor===!1&&P.instanceColor!==null||P.isInstancedMesh&&At.instancingMorph===!0&&P.morphTexture===null||P.isInstancedMesh&&At.instancingMorph===!1&&P.morphTexture!==null||At.envMap!==ft||H.fog===!0&&At.fog!==tt||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==st.numPlanes||At.numIntersection!==st.numIntersection)||At.vertexAlphas!==wt||At.vertexTangents!==Nt||At.morphTargets!==Tt||At.morphNormals!==Zt||At.morphColors!==de||At.toneMapping!==Ie||At.morphTargetsCount!==me)&&(te=!0):(te=!0,At.__version=H.version);let Vn=At.currentProgram;te===!0&&(Vn=Yc(H,I,P));let Mr=!1,Gn=!1,il=!1,Ue=Vn.getUniforms(),si=At.uniforms;if(vt.useProgram(Vn.program)&&(Mr=!0,Gn=!0,il=!0),H.id!==b&&(b=H.id,Gn=!0),Mr||M!==T){vt.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ue.setValue(N,"projectionMatrix",T.projectionMatrix),Ue.setValue(N,"viewMatrix",T.matrixWorldInverse);let Un=Ue.map.cameraPosition;Un!==void 0&&Un.setValue(N,pt.setFromMatrixPosition(T.matrixWorld)),Dt.logarithmicDepthBuffer&&Ue.setValue(N,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Ue.setValue(N,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Gn=!0,il=!0)}if(P.isSkinnedMesh){Ue.setOptional(N,P,"bindMatrix"),Ue.setOptional(N,P,"bindMatrixInverse");let Sn=P.skeleton;Sn&&(Sn.boneTexture===null&&Sn.computeBoneTexture(),Ue.setValue(N,"boneTexture",Sn.boneTexture,Ft))}P.isBatchedMesh&&(Ue.setOptional(N,P,"batchingTexture"),Ue.setValue(N,"batchingTexture",P._matricesTexture,Ft),Ue.setOptional(N,P,"batchingIdTexture"),Ue.setValue(N,"batchingIdTexture",P._indirectTexture,Ft),Ue.setOptional(N,P,"batchingColorTexture"),P._colorsTexture!==null&&Ue.setValue(N,"batchingColorTexture",P._colorsTexture,Ft));let ai=F.morphAttributes;if((ai.position!==void 0||ai.normal!==void 0||ai.color!==void 0)&&et.update(P,F,Vn),(Gn||At.receiveShadow!==P.receiveShadow)&&(At.receiveShadow=P.receiveShadow,Ue.setValue(N,"receiveShadow",P.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(si.envMap.value=ft,si.flipEnvMap.value=ft.isCubeTexture&&ft.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&I.environment!==null&&(si.envMapIntensity.value=I.environmentIntensity),Gn&&(Ue.setValue(N,"toneMappingExposure",y.toneMappingExposure),At.needsLights&&C1(si,il),tt&&H.fog===!0&&Q.refreshFogUniforms(si,tt),Q.refreshMaterialUniforms(si,H,G,it,u.state.transmissionRenderTarget[T.id]),el.upload(N,iv(At),si,Ft)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(el.upload(N,iv(At),si,Ft),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Ue.setValue(N,"center",P.center),Ue.setValue(N,"modelViewMatrix",P.modelViewMatrix),Ue.setValue(N,"normalMatrix",P.normalMatrix),Ue.setValue(N,"modelMatrix",P.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Sn=H.uniformsGroups;for(let Un=0,Cd=Sn.length;Un<Cd;Un++){let Ra=Sn[Un];zt.update(Ra,Vn),zt.bind(Ra,Vn)}}return Vn}function C1(T,I){T.ambientLightColor.needsUpdate=I,T.lightProbe.needsUpdate=I,T.directionalLights.needsUpdate=I,T.directionalLightShadows.needsUpdate=I,T.pointLights.needsUpdate=I,T.pointLightShadows.needsUpdate=I,T.spotLights.needsUpdate=I,T.spotLightShadows.needsUpdate=I,T.rectAreaLights.needsUpdate=I,T.hemisphereLights.needsUpdate=I}function D1(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(T,I,F){let H=_t.get(T);H.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),_t.get(T.texture).__webglTexture=I,_t.get(T.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:F,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,I){let F=_t.get(T);F.__webglFramebuffer=I,F.__useDefaultFramebuffer=I===void 0};let N1=N.createFramebuffer();this.setRenderTarget=function(T,I=0,F=0){R=T,A=I,w=F;let H=!0,P=null,tt=!1,ct=!1;if(T){let ft=_t.get(T);if(ft.__useDefaultFramebuffer!==void 0)vt.bindFramebuffer(N.FRAMEBUFFER,null),H=!1;else if(ft.__webglFramebuffer===void 0)Ft.setupRenderTarget(T);else if(ft.__hasExternalTextures)Ft.rebindTextures(T,_t.get(T.texture).__webglTexture,_t.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Tt=T.depthTexture;if(ft.__boundDepthTexture!==Tt){if(Tt!==null&&_t.has(Tt)&&(T.width!==Tt.image.width||T.height!==Tt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ft.setupDepthRenderbuffer(T)}}let wt=T.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(ct=!0);let Nt=_t.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Nt[I])?P=Nt[I][F]:P=Nt[I],tt=!0):T.samples>0&&Ft.useMultisampledRTT(T)===!1?P=_t.get(T).__webglMultisampledFramebuffer:Array.isArray(Nt)?P=Nt[F]:P=Nt,D.copy(T.viewport),U.copy(T.scissor),z=T.scissorTest}else D.copy(Et).multiplyScalar(G).floor(),U.copy(Wt).multiplyScalar(G).floor(),z=_e;if(F!==0&&(P=N1),vt.bindFramebuffer(N.FRAMEBUFFER,P)&&H&&vt.drawBuffers(T,P),vt.viewport(D),vt.scissor(U),vt.setScissorTest(z),tt){let ft=_t.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+I,ft.__webglTexture,F)}else if(ct){let ft=I;for(let wt=0;wt<T.textures.length;wt++){let Nt=_t.get(T.textures[wt]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+wt,Nt.__webglTexture,F,ft)}}else if(T!==null&&F!==0){let ft=_t.get(T.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ft.__webglTexture,F)}b=-1},this.readRenderTargetPixels=function(T,I,F,H,P,tt,ct,mt=0){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ft=_t.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft){vt.bindFramebuffer(N.FRAMEBUFFER,ft);try{let wt=T.textures[mt],Nt=wt.format,Tt=wt.type;if(!Dt.textureFormatReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Dt.textureTypeReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=T.width-H&&F>=0&&F<=T.height-P&&(T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+mt),N.readPixels(I,F,H,P,Mt.convert(Nt),Mt.convert(Tt),tt))}finally{let wt=R!==null?_t.get(R).__webglFramebuffer:null;vt.bindFramebuffer(N.FRAMEBUFFER,wt)}}},this.readRenderTargetPixelsAsync=async function(T,I,F,H,P,tt,ct,mt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ft=_t.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ct!==void 0&&(ft=ft[ct]),ft)if(I>=0&&I<=T.width-H&&F>=0&&F<=T.height-P){vt.bindFramebuffer(N.FRAMEBUFFER,ft);let wt=T.textures[mt],Nt=wt.format,Tt=wt.type;if(!Dt.textureFormatReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Dt.textureTypeReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Zt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,Zt),N.bufferData(N.PIXEL_PACK_BUFFER,tt.byteLength,N.STREAM_READ),T.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+mt),N.readPixels(I,F,H,P,Mt.convert(Nt),Mt.convert(Tt),0);let de=R!==null?_t.get(R).__webglFramebuffer:null;vt.bindFramebuffer(N.FRAMEBUFFER,de);let Ie=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await Pb(N,Ie,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,Zt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,tt),N.deleteBuffer(Zt),N.deleteSync(Ie),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,I=null,F=0){let H=Math.pow(2,-F),P=Math.floor(T.image.width*H),tt=Math.floor(T.image.height*H),ct=I!==null?I.x:0,mt=I!==null?I.y:0;Ft.setTexture2D(T,0),N.copyTexSubImage2D(N.TEXTURE_2D,F,0,0,ct,mt,P,tt),vt.unbindTexture()};let U1=N.createFramebuffer(),L1=N.createFramebuffer();this.copyTextureToTexture=function(T,I,F=null,H=null,P=0,tt=null){tt===null&&(P!==0?(zo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=P,P=0):tt=0);let ct,mt,ft,wt,Nt,Tt,Zt,de,Ie,Ee=T.isCompressedTexture?T.mipmaps[tt]:T.image;if(F!==null)ct=F.max.x-F.min.x,mt=F.max.y-F.min.y,ft=F.isBox3?F.max.z-F.min.z:1,wt=F.min.x,Nt=F.min.y,Tt=F.isBox3?F.min.z:0;else{let ai=Math.pow(2,-P);ct=Math.floor(Ee.width*ai),mt=Math.floor(Ee.height*ai),T.isDataArrayTexture?ft=Ee.depth:T.isData3DTexture?ft=Math.floor(Ee.depth*ai):ft=1,wt=0,Nt=0,Tt=0}H!==null?(Zt=H.x,de=H.y,Ie=H.z):(Zt=0,de=0,Ie=0);let me=Mt.convert(I.format),At=Mt.convert(I.type),Ne;I.isData3DTexture?(Ft.setTexture3D(I,0),Ne=N.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(Ft.setTexture2DArray(I,0),Ne=N.TEXTURE_2D_ARRAY):(Ft.setTexture2D(I,0),Ne=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,I.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,I.unpackAlignment);let te=N.getParameter(N.UNPACK_ROW_LENGTH),Vn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),Mr=N.getParameter(N.UNPACK_SKIP_PIXELS),Gn=N.getParameter(N.UNPACK_SKIP_ROWS),il=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ee.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Ee.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,wt),N.pixelStorei(N.UNPACK_SKIP_ROWS,Nt),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Tt);let Ue=T.isDataArrayTexture||T.isData3DTexture,si=I.isDataArrayTexture||I.isData3DTexture;if(T.isDepthTexture){let ai=_t.get(T),Sn=_t.get(I),Un=_t.get(ai.__renderTarget),Cd=_t.get(Sn.__renderTarget);vt.bindFramebuffer(N.READ_FRAMEBUFFER,Un.__webglFramebuffer),vt.bindFramebuffer(N.DRAW_FRAMEBUFFER,Cd.__webglFramebuffer);for(let Ra=0;Ra<ft;Ra++)Ue&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_t.get(T).__webglTexture,P,Tt+Ra),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,_t.get(I).__webglTexture,tt,Ie+Ra)),N.blitFramebuffer(wt,Nt,ct,mt,Zt,de,ct,mt,N.DEPTH_BUFFER_BIT,N.NEAREST);vt.bindFramebuffer(N.READ_FRAMEBUFFER,null),vt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(P!==0||T.isRenderTargetTexture||_t.has(T)){let ai=_t.get(T),Sn=_t.get(I);vt.bindFramebuffer(N.READ_FRAMEBUFFER,U1),vt.bindFramebuffer(N.DRAW_FRAMEBUFFER,L1);for(let Un=0;Un<ft;Un++)Ue?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ai.__webglTexture,P,Tt+Un):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ai.__webglTexture,P),si?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Sn.__webglTexture,tt,Ie+Un):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,Sn.__webglTexture,tt),P!==0?N.blitFramebuffer(wt,Nt,ct,mt,Zt,de,ct,mt,N.COLOR_BUFFER_BIT,N.NEAREST):si?N.copyTexSubImage3D(Ne,tt,Zt,de,Ie+Un,wt,Nt,ct,mt):N.copyTexSubImage2D(Ne,tt,Zt,de,wt,Nt,ct,mt);vt.bindFramebuffer(N.READ_FRAMEBUFFER,null),vt.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else si?T.isDataTexture||T.isData3DTexture?N.texSubImage3D(Ne,tt,Zt,de,Ie,ct,mt,ft,me,At,Ee.data):I.isCompressedArrayTexture?N.compressedTexSubImage3D(Ne,tt,Zt,de,Ie,ct,mt,ft,me,Ee.data):N.texSubImage3D(Ne,tt,Zt,de,Ie,ct,mt,ft,me,At,Ee):T.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,tt,Zt,de,ct,mt,me,At,Ee.data):T.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,tt,Zt,de,Ee.width,Ee.height,me,Ee.data):N.texSubImage2D(N.TEXTURE_2D,tt,Zt,de,ct,mt,me,At,Ee);N.pixelStorei(N.UNPACK_ROW_LENGTH,te),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Vn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,Mr),N.pixelStorei(N.UNPACK_SKIP_ROWS,Gn),N.pixelStorei(N.UNPACK_SKIP_IMAGES,il),tt===0&&I.generateMipmaps&&N.generateMipmap(Ne),vt.unbindTexture()},this.initRenderTarget=function(T){_t.get(T).__webglFramebuffer===void 0&&Ft.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Ft.setTextureCube(T,0):T.isData3DTexture?Ft.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Ft.setTexture2DArray(T,0):Ft.setTexture2D(T,0),vt.unbindTexture()},this.resetState=function(){A=0,w=0,R=null,vt.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),n.unpackColorSpace=$t._getUnpackColorSpace()}};var Kg={punch:{startup:.1,active:.09,recovery:.17,damage:6.5,reach:1.3,knockback:.16,shake:.22},kick:{startup:.2,active:.12,recovery:.32,damage:11.5,reach:1.85,knockback:.4,shake:.4},super:{startup:.48,active:.3,recovery:.72,damage:27,reach:2.75,knockback:1.3,shake:.95}},Xc=100,Jg=60,LD=2,Aa=4.55,p1=1.45,m1=.95,Qg={facil:{speed:2.5,minThink:.65,maxThink:1.25,aggression:.5,block:.16,damage:.75,reaction:.3},normal:{speed:3.05,minThink:.38,maxThink:.85,aggression:.68,block:.34,damage:.9,reaction:.18},dificil:{speed:3.6,minThink:.2,maxThink:.52,aggression:.86,block:.55,damage:1.05,reaction:.1}};function Ed(e,t,n){let i=new Xo(e,Math.max(.01,t-e*2),5,10),s=new Qt(i,n);return s.position.y=-t/2,s.castShadow=!0,s}function g1(e,t,n,i){let s=new Hn({color:t,emissive:new Ht(t).multiplyScalar(.22),emissiveIntensity:1,roughness:.42,metalness:.45}),a=new Hn({color:n,emissive:n,emissiveIntensity:1.8,roughness:.3,metalness:.2}),r=new Hn({color:1120812,roughness:.55,metalness:.4}),o=new Hn({color:14262374,roughness:.65}),l=new xn,c=new xn;l.add(c);let f=new Qt(new Xo(.235,.4,6,14),s);f.position.y=1.2,f.castShadow=!0,c.add(f);let d=new Qt(new _i(.46,.11,.3),r);d.position.y=.93,d.castShadow=!0,c.add(d);let h=new Qt(new Ds(.075,12,12),a);h.position.set(0,1.32,.19),c.add(h);let p=new Qt(new ur(.15,.028,6,16),a);p.position.y=1.5,p.rotation.x=Math.PI/2,c.add(p);let v=new xn;v.position.y=1.66,c.add(v);let x=new Qt(new Ds(.155,18,16),o);x.castShadow=!0,v.add(x);let g=new Qt(new Ds(.168,18,12,0,Math.PI*2,0,Math.PI*.55),r);g.castShadow=!0,v.add(g);let u=new Qt(new _i(.22,.055,.04),a);u.position.set(0,.02,.145),v.add(u);let m=new Qt(new Dc(.045,.22,6),a);m.position.set(0,.21,-.01),v.add(m);function _(M,D){let U=new xn;U.position.set(.27*D,1.45,M),c.add(U);let z=new Qt(new Ds(.1,12,10),a);z.castShadow=!0,U.add(z),U.add(Ed(.075,.37,s));let V=new xn;V.position.y=-.37,U.add(V),V.add(Ed(.066,.33,o));let Y=new Qt(new Ds(.085,12,12),r);return Y.position.y=-.35,Y.castShadow=!0,V.add(Y),{shoulder:U,elbow:V}}let y=_(-.02,-1),E=_(.02,1);function A(M){let D=new xn;D.position.set(.13*M,.93,0),c.add(D),D.add(Ed(.085,.45,r));let U=new xn;U.position.y=-.45,D.add(U),U.add(Ed(.072,.42,s));let z=new Qt(new _i(.17,.09,.3),a);return z.position.set(0,-.45,.06),z.castShadow=!0,U.add(z),{hip:D,knee:U}}let w=A(-1),R=A(1);return{side:i,name:e,root:l,rig:{body:c,head:v,shoulderL:y.shoulder,elbowL:y.elbow,shoulderR:E.shoulder,elbowR:E.elbow,hipL:w.hip,kneeL:w.knee,hipR:R.hip,kneeR:R.knee,suit:s,trim:a},pos:new O(i==="player"?-1.6:1.6,0,0),y:0,vy:0,facing:i==="player"?1:-1,hp:Xc,meter:0,wins:0,blocking:!1,blockHeld:!1,attack:null,hitTimer:0,ko:!1,koTimer:0,moveX:0,moveZ:0,walkPhase:0,flash:0}}var jg=class{constructor(){this.ctx=null;this.noise=null}unlock(){if(!(typeof window>"u")){if(!this.ctx){let t=window.AudioContext??window.webkitAudioContext;if(!t)return;this.ctx=new t;let n=Math.floor(this.ctx.sampleRate*.5),i=this.ctx.createBuffer(1,n,this.ctx.sampleRate),s=i.getChannelData(0);for(let a=0;a<n;a+=1)s[a]=Math.random()*2-1;this.noise=i}this.ctx.resume()}}burst(t,n,i,s,a="bandpass"){let r=this.ctx;if(!r||!this.noise)return;let o=r.createBufferSource();o.buffer=this.noise;let l=r.createBiquadFilter();l.type=a,l.frequency.value=t,l.Q.value=n;let c=r.createGain(),f=r.currentTime;c.gain.setValueAtTime(s,f),c.gain.exponentialRampToValueAtTime(.001,f+i),o.connect(l).connect(c).connect(r.destination),o.start(f),o.stop(f+i+.02)}tone(t,n,i,s,a="sine"){let r=this.ctx;if(!r)return;let o=r.createOscillator(),l=r.createGain(),c=r.currentTime;o.type=a,o.frequency.setValueAtTime(t,c),o.frequency.exponentialRampToValueAtTime(Math.max(20,n),c+i),l.gain.setValueAtTime(s,c),l.gain.exponentialRampToValueAtTime(.001,c+i),o.connect(l).connect(r.destination),o.start(c),o.stop(c+i+.02)}punch(){this.burst(1500,1.1,.12,.35),this.tone(180,70,.14,.28)}kick(){this.burst(800,.9,.2,.4),this.tone(120,45,.22,.4)}superHit(){this.burst(500,.6,.5,.5,"lowpass"),this.tone(90,30,.5,.5,"sawtooth")}block(){this.burst(3e3,3,.09,.25),this.tone(420,300,.08,.12,"square")}whoosh(){this.burst(900,.7,.16,.12,"highpass")}jump(){this.tone(320,620,.12,.06,"triangle")}superCharge(){this.tone(80,900,.55,.12,"sawtooth"),this.burst(2e3,1.4,.55,.12)}bell(){this.tone(880,870,.5,.14,"triangle"),this.tone(1320,1310,.45,.07,"sine")}ko(){this.tone(150,50,.8,.35,"sawtooth"),this.burst(400,.5,.7,.3,"lowpass")}dispose(){this.ctx&&(this.ctx.close(),this.ctx=null)}},Td=class{constructor(t,n){this.clock=new Pc;this.sparks=[];this.shards=[];this.sfx=new jg;this.held={left:!1,right:!1,up:!1,down:!1,block:!1};this.queue=[];this.status="menu";this.paused=!1;this.difficulty="normal";this.round=1;this.roundTimer=Jg;this.introTimer=0;this.roundEndTimer=0;this.matchWinner=null;this.message="ARENA NEON";this.submessage="Escolha a dificuldade e entre na arena";this.combo=0;this.comboTimer=0;this.lastImpact=0;this.impactTarget=null;this.impactKind=null;this.aiBlockTimer=0;this.aiThinkTimer=0;this.aiMoveX=0;this.aiMoveZ=0;this.aiZTarget=0;this.shake=0;this.timeScale=1;this.timeScaleTarget=1;this.camX=0;this.zoom=0;this.elapsed=0;this.hudTimer=0;this.disposed=!1;this.resizeRaf=0;this.tick=()=>{if(this.disposed)return;let t=Math.min(this.clock.getDelta(),.05);this.paused||(this.simulate(t*this.timeScale),this.updateFighterVisual(this.player,t*this.timeScale),this.updateFighterVisual(this.enemy,t*this.timeScale),this.updateCamera(t)),this.renderer.render(this.scene,this.camera),this.hudTimer+=t,this.hudTimer>=.09&&(this.hudTimer=0,this.emitHud())};this.onKeyDown=t=>{let n=t.target;if(n&&(n.tagName==="INPUT"||n.tagName==="TEXTAREA"||n.isContentEditable)||t.ctrlKey||t.metaKey||t.altKey)return;let i=t.code,s=!0;switch(i){case"ArrowLeft":case"KeyA":this.held.left=!0;break;case"ArrowRight":case"KeyD":this.held.right=!0;break;case"ArrowUp":case"KeyW":this.held.up=!0;break;case"ArrowDown":case"KeyS":this.held.down=!0;break;case"KeyL":case"KeyC":case"ShiftLeft":case"ShiftRight":this.held.block=!0;break;case"KeyJ":case"KeyZ":t.repeat||this.press("punch");break;case"KeyK":case"KeyX":t.repeat||this.press("kick");break;case"KeyU":t.repeat||this.press("super");break;case"Space":t.repeat||this.press("jump");break;case"KeyP":case"Escape":t.repeat||this.togglePause();break;case"Enter":this.status==="matchEnd"&&!t.repeat&&this.rematch();break;default:s=!1}s&&t.preventDefault()};this.onKeyUp=t=>{switch(t.code){case"ArrowLeft":case"KeyA":this.held.left=!1;break;case"ArrowRight":case"KeyD":this.held.right=!1;break;case"ArrowUp":case"KeyW":this.held.up=!1;break;case"ArrowDown":case"KeyS":this.held.down=!1;break;case"KeyL":case"KeyC":case"ShiftLeft":case"ShiftRight":this.held.block=!1;break;default:break}};this.onBlur=()=>{this.held={left:!1,right:!1,up:!1,down:!1,block:!1}};this.container=t,this.callbacks=n,this.renderer=new Sd({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.setSize(t.clientWidth||800,t.clientHeight||480),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Af,this.renderer.outputColorSpace=un,this.renderer.toneMapping=Of,this.renderer.toneMappingExposure=1.05,this.renderer.domElement.style.display="block",this.renderer.domElement.style.width="100%",this.renderer.domElement.style.height="100%",t.appendChild(this.renderer.domElement),this.scene=new Tc,this.scene.background=new Ht(263438),this.scene.fog=new Ec(263438,13,34),this.camera=new hn(42,16/9,.1,90),this.camera.position.set(0,2.7,9.4),this.camera.lookAt(0,1.1,0),this.sparkGeo=new Uc(.34,.5,24),this.buildEnvironment(),this.hitLight=new fr(10483199,0,12,2),this.hitLight.position.set(0,1.4,.5),this.scene.add(this.hitLight);let{starField:i,shards:s,platformRing:a,floorGlow:r}=this.buildScenery();this.starField=i,this.shards=s,this.platformRing=a,this.floorGlow=r,this.player=g1("KAI",1929202,2282478,"player"),this.enemy=g1("VEX",12592732,16007006,"enemy"),this.scene.add(this.player.root,this.enemy.root),this.enemy.root.position.set(1.6,0,0),this.player.root.rotation.y=Math.PI/2,this.enemy.root.rotation.y=-Math.PI/2,this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(t),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",this.onBlur),this.emitHud(),this.renderer.setAnimationLoop(this.tick)}startMatch(t){this.sfx.unlock(),this.difficulty=t,this.player.wins=0,this.enemy.wins=0,this.player.meter=0,this.enemy.meter=0,this.round=1,this.matchWinner=null,this.paused=!1,this.beginRound(),this.sfx.bell(),this.emitHud()}rematch(){this.startMatch(this.difficulty)}goToMenu(){this.status="menu",this.paused=!1,this.matchWinner=null,this.round=1,this.resetFighters(),this.message="ARENA NEON",this.submessage="Escolha a dificuldade e entre na arena",this.emitHud()}pause(){this.status==="menu"||this.status==="matchEnd"||(this.paused=!0,this.queue=[],this.emitHud())}resume(){this.paused=!1,this.clock.getDelta(),this.emitHud()}togglePause(){this.paused?this.resume():this.pause()}setControl(t,n){this.held[t]=n,n&&this.sfx.unlock()}press(t){this.sfx.unlock(),!(this.status!=="fight"||this.paused)&&this.queue.length<2&&this.queue.push(t)}dispose(){this.disposed=!0,this.renderer.setAnimationLoop(null),this.observer.disconnect(),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("blur",this.onBlur),this.resizeRaf&&cancelAnimationFrame(this.resizeRaf),this.sfx.dispose(),this.scene.traverse(t=>{let n=t;n.geometry&&n.geometry.dispose();let i=n.material;Array.isArray(i)?i.forEach(s=>s.dispose()):i&&i.dispose()}),this.sparkGeo.dispose(),this.renderer.dispose(),this.renderer.domElement.parentElement===this.container&&this.container.removeChild(this.renderer.domElement)}buildEnvironment(){let t=new Oc(9090303,1706532,1.15);this.scene.add(t);let n=new Yo(16777215,2.4);n.position.set(4,9,6),n.castShadow=!0,n.shadow.mapSize.set(1024,1024),n.shadow.camera.left=-8,n.shadow.camera.right=8,n.shadow.camera.top=8,n.shadow.camera.bottom=-8,n.shadow.camera.far=30,n.shadow.bias=-.0012,this.scene.add(n);let i=new fr(2282478,45,18,2);i.position.set(-5.5,2.6,4),this.scene.add(i);let s=new fr(16007006,45,18,2);s.position.set(5.5,2.6,3.5),this.scene.add(s);let a=new Yo(8141549,1.2);a.position.set(-3,4,-6),this.scene.add(a)}buildScenery(){let t=new xn;this.scene.add(t);let n=new Hn({color:461334,roughness:.75,metalness:.4}),i=new Qt(new Ma(80,80),n);i.rotation.x=-Math.PI/2,i.position.y=-.32,i.receiveShadow=!0,t.add(i);let s=new Hn({color:725540,metalness:.8,roughness:.35}),a=new Hn({map:OD(),color:16777215,metalness:.65,roughness:.32}),r=new Hn({color:593176}),o=new Qt(new Wo(6.3,6,.62,64),[s,a,r]);o.position.y=-.31,o.receiveShadow=!0,t.add(o);let l=new ni({color:2282478,transparent:!0,opacity:.85}),c=new Qt(new ur(6.18,.055,8,128),l);c.rotation.x=-Math.PI/2,c.position.y=.012,t.add(c);let f=new Qt(new ur(5.45,.025,6,128),new ni({color:8141549,transparent:!0,opacity:.55}));f.rotation.x=-Math.PI/2,f.position.y=.015,t.add(f);let d=new Qt(new Cc(2.9,64),new ni({color:1981066,transparent:!0,opacity:.28,blending:dr,depthWrite:!1}));d.rotation.x=-Math.PI/2,d.position.y=.02,t.add(d);let h=new Hn({color:857382,metalness:.7,roughness:.4}),p=new ni({color:2282478}),v=new ni({color:16007006});for(let E=0;E<10;E+=1){let A=E/10*Math.PI*2,w=new Qt(new _i(.32,3.4,.32),h);w.position.set(Math.cos(A)*7.3,1.55,Math.sin(A)*7.3),w.castShadow=!0,t.add(w);let R=new Qt(new _i(.07,2.6,.07),E%2?v:p);R.position.set(Math.cos(A)*7.13,1.65,Math.sin(A)*7.13),t.add(R)}let x=new Qt(new Ma(7.6,1.9),new ni({map:ID(),transparent:!0,blending:dr,depthWrite:!1}));x.position.set(0,4.1,-7.3),t.add(x);let g=900,u=new Float32Array(g*3);for(let E=0;E<g;E+=1){let A=16+Math.random()*24,w=Math.random()*Math.PI*2,R=Math.random()*Math.PI*.55;u[E*3]=Math.cos(w)*A*Math.cos(R),u[E*3+1]=2+Math.sin(R)*A*.55,u[E*3+2]=Math.sin(w)*A*Math.cos(R)}let m=new en;m.setAttribute("position",new Cn(u,3));let _=new Ac(m,new Go({color:8246268,size:.085,transparent:!0,opacity:.75,sizeAttenuation:!0}));t.add(_);let y=[];for(let E=0;E<9;E+=1){let A=new Hn({color:E%2?947344:10295117,emissive:E%2?2282478:16007006,emissiveIntensity:.55,roughness:.25,metalness:.7,transparent:!0,opacity:.85}),w=new Qt(new Nc(.24+Math.random()*.2),A),R=E/9*Math.PI*2;w.position.set(Math.cos(R)*(8.5+Math.random()*2),1.4+Math.random()*3.4,Math.sin(R)*(8.5+Math.random()*2)),w.userData.spin=.2+Math.random()*.5,w.userData.baseY=w.position.y,w.userData.phase=Math.random()*Math.PI*2,y.push(w),t.add(w)}return{starField:_,shards:y,platformRing:c,floorGlow:d}}beginRound(){this.status="intro",this.introTimer=2.2,this.roundTimer=Jg,this.roundEndTimer=0,this.matchWinner=null,this.combo=0,this.comboTimer=0,this.resetFighters(),this.player.hp=Xc,this.enemy.hp=Xc,this.aiThinkTimer=1.15,this.aiBlockTimer=0,this.aiMoveX=0,this.aiMoveZ=0,this.queue=[],this.message=`ROUND ${this.round}`,this.submessage=this.round===1?"Melhor de 3 rounds":"Quem vencer leva a luta"}resetFighters(){for(let t of[this.player,this.enemy])t.pos.set(t.side==="player"?-1.6:1.6,0,0),t.y=0,t.vy=0,t.facing=t.side==="player"?1:-1,t.attack=null,t.hitTimer=0,t.ko=!1,t.koTimer=0,t.blocking=!1,t.blockHeld=!1,t.moveX=0,t.moveZ=0,t.flash=0,t.root.position.set(t.pos.x,0,0),t.rig.body.rotation.set(0,0,0),t.rig.body.position.set(0,0,0),t.root.rotation.y=t.facing===1?Math.PI/2:-Math.PI/2,t.rig.suit.emissiveIntensity=1}endRound(t,n){if(this.status!=="fight")return;this.status="roundEnd",this.roundEndTimer=3;let i=t==="player"?this.player:t==="enemy"?this.enemy:null;i&&(i.wins+=1),this.message=n==="ko"?"K.O.":"TEMPO ESGOTADO",i?(this.submessage=`${i.name} venceu o round`,i.wins>=LD&&(this.matchWinner=t)):this.submessage="Empate \u2014 ningu\xE9m pontuou",this.player.moveX=0,this.player.moveZ=0,this.enemy.moveX=0,this.enemy.moveZ=0,this.player.blocking=!1,this.enemy.blocking=!1,n==="ko"?this.sfx.ko():this.sfx.bell(),this.shake=Math.min(1.1,this.shake+.5),this.emitHud()}startAttack(t,n){if(!(t.attack||t.hitTimer>0||t.ko||t.y>.25)){if(n==="super"){if(t.meter<100)return;t.meter=0,this.sfx.superCharge(),this.timeScaleTarget=.32,this.zoom=-1.15,this.shake=Math.max(this.shake,.35)}else n==="punch"?this.sfx.whoosh():this.sfx.whoosh();t.attack={kind:n,t:0,hitDone:!1},t.blocking=!1}}inRange(t,n,i){let s=(n.pos.x-t.pos.x)*t.facing,a=Math.abs(n.pos.z-t.pos.z);return!(s<=0||s>i||a>(t.attack?.kind==="super"?1:.7)||n.y>1.05)}applyHit(t,n,i){let s=Kg[i],a=n.blocking&&!n.attack&&n.y<.3,r=t.side==="enemy"?Qg[this.difficulty].damage:1,o=s.damage*r*(a?.18:1);n.hp=Math.max(0,n.hp-o),n.hitTimer=a?.14:i==="super"?.85:i==="kick"?.45:.3,n.attack=null,n.flash=1,n.meter=Math.min(100,n.meter+(a?3:7)),t.meter=Math.min(100,t.meter+(a?1:i==="super"?0:8)),n.pos.x+=t.facing*s.knockback*(a?.4:1),n.pos.x=Xt.clamp(n.pos.x,-Aa,Aa),this.shake=Math.min(1.2,this.shake+s.shake*(a?.4:1)),this.hitLight.position.set((t.pos.x+n.pos.x)/2,1.35,.4),this.hitLight.intensity=a?8:i==="super"?60:26,a?this.spawnSpark((t.pos.x+n.pos.x)/2,1.3,n.pos.z,10875900,!1):this.spawnSpark((t.pos.x+n.pos.x)/2,1.2+Math.random()*.25,n.pos.z,i==="super"?16773544:t.side==="player"?6809849:16622767,i!=="punch"),i==="super"?this.sfx.superHit():i==="kick"?this.sfx.kick():this.sfx.punch(),a&&this.sfx.block(),this.impactTarget=n.side,this.impactKind=a?"block":"hit",this.lastImpact+=1,t.side==="player"&&!a&&(this.combo=this.comboTimer>0?this.combo+1:1,this.comboTimer=1.4),this.emitHud(),n.hp<=0&&!n.ko&&(n.ko=!0,n.koTimer=0,n.attack=null,this.endRound(t.side,"ko"))}updateAttack(t,n,i){let s=t.attack;if(!s)return;let a=Kg[s.kind];s.t+=i,!s.hitDone&&s.t>=a.startup&&s.t<=a.startup+a.active&&this.inRange(t,n,a.reach)&&(s.hitDone=!0,this.applyHit(t,n,s.kind));let r=a.startup+a.active+a.recovery;s.t>=r&&(t.attack=null,s.kind==="super"&&(this.timeScaleTarget=1))}stepFighter(t,n){if(t.ko){t.koTimer+=n,t.moveX=0,t.moveZ=0;return}t.hitTimer>0&&(t.hitTimer=Math.max(0,t.hitTimer-n));let i=Qg[this.difficulty],s=t.side==="player"?3.5:i.speed;t.blocking&&(s*=.42),t.attack&&(s*=.12),t.hitTimer>0&&(s=0),this.status==="fight"&&!this.paused&&(t.pos.x+=t.moveX*s*n,t.pos.z+=t.moveZ*s*n*.8,Math.abs(t.moveX)+Math.abs(t.moveZ)>.05&&(t.walkPhase+=n*(t.side==="player"?8.5:i.speed*2.8))),(t.y>0||t.vy!==0)&&(t.vy-=15*n,t.y+=t.vy*n,t.y<=0&&(t.y=0,t.vy=0)),t.pos.x=Xt.clamp(t.pos.x,-Aa,Aa),t.pos.z=Xt.clamp(t.pos.z,-p1,p1)}separateFighters(){let t=this.enemy.pos.x-this.player.pos.x;if(Math.abs(t)<m1){let n=(m1-Math.abs(t))/2,i=t>=0?1:-1;this.player.pos.x-=n*i,this.enemy.pos.x+=n*i,this.player.pos.x=Xt.clamp(this.player.pos.x,-Aa,Aa),this.enemy.pos.x=Xt.clamp(this.enemy.pos.x,-Aa,Aa)}this.player.facing=this.enemy.pos.x>=this.player.pos.x?1:-1,this.enemy.facing=this.player.pos.x<=this.enemy.pos.x?1:-1}updateAi(t){let n=this.enemy,i=this.player,s=Qg[this.difficulty];if(n.blockHeld=!1,this.aiMoveX=0,this.aiMoveZ=0,this.status!=="fight"||n.ko||n.hitTimer>0||n.attack)return;let a=Math.abs(i.pos.x-n.pos.x);if(this.aiBlockTimer>0){this.aiBlockTimer-=t,n.blockHeld=!0;return}if(i.attack&&!i.attack.hitDone&&a<2.5&&Math.random()<s.block*t*9){this.aiBlockTimer=.32,this.aiThinkTimer=Math.max(this.aiThinkTimer,.2);return}if(this.aiThinkTimer-=t,this.aiThinkTimer>0){this.aiMoveX=this.aiMoveX||0;return}if(this.aiThinkTimer=s.minThink+Math.random()*(s.maxThink-s.minThink),n.meter>=100&&a<2.4&&Math.random()<.45){this.startAttack(n,"super");return}if(a>3)this.aiMoveX=1,Math.random()<.18&&(n.vy=4.7,n.y=.01,this.sfx.jump()),Math.random()<.25&&(this.aiMoveZ=Math.random()<.5?-1:1);else if(a>1.75)Math.random()<s.aggression?this.startAttack(n,"kick"):(this.aiMoveX=1,Math.random()<.3&&(this.aiMoveZ=Math.random()<.5?-1:1));else if(a>1.15){let r=Math.random();r<s.aggression*.7?this.startAttack(n,"kick"):r<s.aggression?this.startAttack(n,"punch"):this.aiMoveX=r<.9?-1:1}else{let r=Math.random();r<s.aggression?this.startAttack(n,"punch"):r<s.aggression+.12?this.startAttack(n,"kick"):this.aiMoveX=-1,Math.random()<.2&&(this.aiBlockTimer=.25)}Math.random()<.25&&(this.aiZTarget=(Math.random()-.5)*2),Math.abs(n.pos.z-this.aiZTarget)>.15&&(this.aiMoveZ=n.pos.z>this.aiZTarget?-1:1)}simulate(t){if(this.elapsed+=t,this.status==="intro")this.introTimer-=t,this.introTimer<=.85&&this.introTimer>0&&(this.message="LUTE!",this.submessage="Boa sorte"),this.introTimer<=0&&(this.status="fight",this.roundTimer=Jg,this.message="",this.submessage="",this.sfx.bell(),this.emitHud());else if(this.status==="fight"){this.roundTimer=Math.max(0,this.roundTimer-t);let n=this.player;for(n.moveX=(this.held.right?1:0)-(this.held.left?1:0),n.moveZ=(this.held.down?1:0)-(this.held.up?1:0),n.blockHeld=this.held.block,n.blocking=n.blockHeld&&!n.attack&&n.hitTimer<=0&&!n.ko&&n.y<=.05;this.queue.length>0;){let s=this.queue.shift();if(!s)break;s==="jump"?n.y<=.01&&!n.attack&&(n.vy=4.9,n.y=.01,this.sfx.jump()):this.startAttack(n,s)}this.updateAi(t);let i=this.enemy;if(i.moveX=this.aiMoveX,i.moveZ=this.aiMoveZ,i.blockHeld=i.blockHeld||this.aiBlockTimer>0,i.blocking=i.blockHeld&&!i.attack&&i.hitTimer<=0&&!i.ko&&i.y<=.05,this.stepFighter(n,t),this.stepFighter(i,t),this.separateFighters(),this.updateAttack(n,i,t),this.updateAttack(i,n,t),this.comboTimer>0&&(this.comboTimer-=t,this.comboTimer<=0&&(this.combo=0)),this.roundTimer<=0){let s=this.player.hp,a=this.enemy.hp;this.endRound(s===a?null:s>a?"player":"enemy","time")}}else this.status==="roundEnd"&&(this.roundEndTimer-=t,this.player.moveX=0,this.player.moveZ=0,this.enemy.moveX=0,this.enemy.moveZ=0,this.player.blocking=!1,this.enemy.blocking=!1,this.stepFighter(this.player,t),this.stepFighter(this.enemy,t),this.roundEndTimer<=0&&(this.matchWinner?(this.status="matchEnd",this.message=this.matchWinner==="player"?"VIT\xD3RIA!":"DERROTA",this.submessage=this.matchWinner==="player"?"Voc\xEA dominou a arena neon":"VEX levou a melhor desta vez",this.emitHud()):(this.round+=1,this.beginRound(),this.sfx.bell(),this.emitHud())));this.shake=Math.max(0,this.shake-t*2.4),this.timeScale=Xt.damp(this.timeScale,this.timeScaleTarget,8,t),!this.player.attack&&!this.enemy.attack&&(this.timeScaleTarget=1),this.zoom=Xt.damp(this.zoom,this.player.attack?.kind==="super"||this.enemy.attack?.kind==="super"?-.9:0,4,t),this.hitLight.intensity=Xt.damp(this.hitLight.intensity,0,12,t),this.updateSparks(t),this.updateStage(t)}updateStage(t){let n=this.elapsed;this.floorGlow.scale.setScalar(1+Math.sin(n*1.6)*.05),this.platformRing.material.opacity=.65+Math.sin(n*2.2)*.2,this.starField.rotation.y+=t*.008;for(let i of this.shards)i.rotation.x+=t*i.userData.spin,i.rotation.y+=t*i.userData.spin*.7,i.position.y=i.userData.baseY+Math.sin(n*.9+i.userData.phase)*.25}spawnSpark(t,n,i,s,a){let r=new ni({color:s,transparent:!0,opacity:1,side:yi,blending:dr,depthWrite:!1}),o=new Qt(this.sparkGeo,r);if(o.position.set(t,n,i),o.scale.setScalar(a?.55:.32),o.quaternion.copy(this.camera.quaternion),this.scene.add(o),this.sparks.push({mesh:o,life:0,max:a?.42:.28,grow:a?3.4:2.4}),this.sparks.length>14){let l=this.sparks.shift();l&&this.removeSpark(l)}}removeSpark(t){this.scene.remove(t.mesh),t.mesh.material.dispose()}updateSparks(t){for(let n=this.sparks.length-1;n>=0;n-=1){let i=this.sparks[n];i.life+=t;let s=Math.min(1,i.life/i.max);i.mesh.scale.setScalar((i.mesh.scale.x||.3)*(1+t*4)+1e-4),i.mesh.material.opacity=1-s,i.mesh.quaternion.copy(this.camera.quaternion),s>=1&&(this.removeSpark(i),this.sparks.splice(n,1))}}updateFighterVisual(t,n){let i=t.rig,s=this.elapsed,a=Math.min(1.4,Math.abs(t.moveX)+Math.abs(t.moveZ)),r=Math.sin(s*2.1+(t.side==="player"?0:1.4))*.012,o=0,l=0,c=-.72,f=-.16,d=-1.95,h=-.95,p=.2,v=-1.9,x=.04,g=-.04,u=.28,m=.28;if(this.status==="menu"){let E=Math.sin(s*.9+(t.side==="player"?0:2))*.5;x=.06+E*.1,g=-.06-E*.1,r=Math.sin(s*1.6)*.02}else if(t.ko){let E=Math.min(1,t.koTimer/.75),A=1-Math.pow(1-E,3);o=-1.4*A,r=-.08*A,c=-2.4,h=-2.3,d=-.4,v=-.5,x=-.25,g=-.15,u=.7,m=.5}else if(t.y>.03)x=-.6,g=-.35,u=1.1,m=.85,c=-1.4,f=-.5,h=-1.5,p=.5,r=0;else if(t.hitTimer>0){let E=Math.min(1,t.hitTimer/.3);o=-.32*E,c=-1.5,f=-.55,d=-.8,h=-1.35,p=.5,v=-.9,u=.45,m=.45,r=-.02*E}else if(t.blocking)c=-1.28,f=-.52,d=-1.95,h=-1.42,p=.52,v=-1.8,o=.12,u=.5,m=.5,r=-.035;else if(t.attack){let E=t.attack,A=Kg[E.kind],w=A.startup+A.active+A.recovery,R=Math.min(1,E.t/w),b=Math.min(1,E.t/Math.max(.001,A.startup)),M=Math.min(1,Math.max(0,(E.t-A.startup-A.active)/Math.max(.001,A.recovery))),D=Math.max(0,b*(1-M));if(E.kind==="punch")h=Xt.lerp(-.95,-1.62,D),p=Xt.lerp(.2,.05,D),v=Xt.lerp(-1.9,-.04,D),o=-.1*D,r=-.01*D,x=.1+.1*R;else if(E.kind==="kick")g=Xt.lerp(-.04,-1.62,D),m=Xt.lerp(.55,.06,D),x=.14,u=.42,o=-.24*D,r=-.02,c=-1.15,h=-.5;else{let U=Math.min(1,E.t/(A.startup+A.active));c=Xt.lerp(-.72,-1.86,U),d=Xt.lerp(-1.95,-.06,U),h=Xt.lerp(-.95,-1.9,U),v=Xt.lerp(-1.9,-.05,U),f=-.3,p=.3,o=-.3*U,r=.06*U,u=.5,m=.5,x=-.15*U,g=-.2*U}}else if(a>.05){let E=Math.sin(t.walkPhase),A=Math.cos(t.walkPhase);x=E*.62,g=-E*.62,u=.3+Math.max(0,-E)*.55,m=.3+Math.max(0,E)*.55,r=Math.abs(A)*.035,c=-.72+E*.18,h=-.95-E*.18,l=-t.moveZ*.08,o=t.moveX!==0?.05:0}else r=Math.sin(s*2.1+(t.side==="player"?0:1.4))*.014,c=-.72+Math.sin(s*2.1)*.02,h=-.95-Math.sin(s*2.1)*.02;let _=t.attack||t.ko||t.hitTimer>0?22:13;i.body.position.y=Xt.damp(i.body.position.y,r,12,n),i.body.rotation.x=Xt.damp(i.body.rotation.x,o,_,n),i.body.rotation.z=Xt.damp(i.body.rotation.z,l,10,n),i.shoulderL.rotation.x=Xt.damp(i.shoulderL.rotation.x,c,_,n),i.shoulderL.rotation.z=Xt.damp(i.shoulderL.rotation.z,f,_,n),i.elbowL.rotation.x=Xt.damp(i.elbowL.rotation.x,d,_,n),i.shoulderR.rotation.x=Xt.damp(i.shoulderR.rotation.x,h,_,n),i.shoulderR.rotation.z=Xt.damp(i.shoulderR.rotation.z,p,_,n),i.elbowR.rotation.x=Xt.damp(i.elbowR.rotation.x,v,_,n),i.hipL.rotation.x=Xt.damp(i.hipL.rotation.x,x,18,n),i.hipR.rotation.x=Xt.damp(i.hipR.rotation.x,g,18,n),i.kneeL.rotation.x=Xt.damp(i.kneeL.rotation.x,u,18,n),i.kneeR.rotation.x=Xt.damp(i.kneeR.rotation.x,m,18,n),i.head.rotation.x=Xt.damp(i.head.rotation.x,o*.35,10,n),t.flash=Math.max(0,t.flash-n*4.5),i.suit.emissiveIntensity=1+t.flash*5,i.trim.emissiveIntensity=1.8+t.flash*3,t.root.position.set(t.pos.x,t.y,t.pos.z);let y=t.facing===1?Math.PI/2:-Math.PI/2;t.root.rotation.y=Xt.damp(t.root.rotation.y,y,12,n)}updateCamera(t){if(this.status==="menu"){let o=this.elapsed*.18;this.camX=Xt.damp(this.camX,Math.sin(o)*2.4,2,t),this.camera.position.set(this.camX,2.5+Math.sin(o*.7)*.2,8.6),this.camera.lookAt(0,1.15,0),this.camera.fov=Xt.damp(this.camera.fov,42,3,t),this.camera.updateProjectionMatrix();return}let n=(this.player.pos.x+this.enemy.pos.x)/2,i=Xt.clamp(n*.42,-1.6,1.6);this.camX=Xt.damp(this.camX,i,4,t);let s=(Math.random()-.5)*this.shake*.22,a=(Math.random()-.5)*this.shake*.16,r=9.4+this.zoom;this.camera.position.set(this.camX+s,2.65+a,r),this.camera.lookAt(n*.5+s*.5,1.08+a,0),this.camera.fov=Xt.damp(this.camera.fov,40+Math.abs(this.zoom)*8,4,t),this.camera.updateProjectionMatrix()}resize(){this.disposed||(this.resizeRaf&&cancelAnimationFrame(this.resizeRaf),this.resizeRaf=requestAnimationFrame(()=>{let t=this.container.clientWidth,n=this.container.clientHeight;t<=0||n<=0||(this.renderer.setSize(t,n,!1),this.camera.aspect=t/n,this.camera.updateProjectionMatrix())}))}emitHud(){this.callbacks.onHud({status:this.status,paused:this.paused,difficulty:this.difficulty,round:this.round,timer:Math.max(0,Math.ceil(this.roundTimer)),message:this.message,submessage:this.submessage,combo:this.combo,matchWinner:this.matchWinner,player:{hp:this.player.hp,maxHp:Xc,meter:this.player.meter,wins:this.player.wins},enemy:{hp:this.enemy.hp,maxHp:Xc,meter:this.enemy.meter,wins:this.enemy.wins},impact:this.lastImpact,impactTarget:this.impactTarget,impactKind:this.impactKind})}};function OD(){let e=document.createElement("canvas");e.width=512,e.height=512;let t=e.getContext("2d");if(!t)return new fn;t.fillStyle="#070b16",t.fillRect(0,0,512,512),t.strokeStyle="rgba(34, 211, 238, 0.16)",t.lineWidth=2;for(let i=0;i<=512;i+=64)t.beginPath(),t.moveTo(i,0),t.lineTo(i,512),t.stroke(),t.beginPath(),t.moveTo(0,i),t.lineTo(512,i),t.stroke();t.strokeStyle="rgba(124, 58, 237, 0.35)";for(let i=0;i<=512;i+=256)t.beginPath(),t.moveTo(i,0),t.lineTo(i,512),t.stroke(),t.beginPath(),t.moveTo(0,i),t.lineTo(512,i),t.stroke();let n=new ko(e);return n.wrapS=or,n.wrapT=or,n.repeat.set(2.5,2.5),n.colorSpace=un,n.anisotropy=4,n}function ID(){let e=document.createElement("canvas");e.width=1024,e.height=256;let t=e.getContext("2d");if(!t)return new fn;t.clearRect(0,0,1024,256),t.textAlign="center",t.textBaseline="middle",t.font="900 132px 'Arial Black', Impact, sans-serif",t.shadowColor="#22d3ee",t.shadowBlur=36,t.fillStyle="#a5f3fc",t.fillText("NEON",330,128),t.shadowColor="#f43f5e",t.fillStyle="#fecdd3",t.fillText("FIST",700,128),t.shadowBlur=0,t.font="700 34px 'Segoe UI', sans-serif",t.fillStyle="rgba(196, 181, 253, 0.9)",t.letterSpacing="14px",t.fillText("ARENA  \xB7  3D",512,218);let n=new ko(e);return n.colorSpace=un,n}var J=Sr(Wc()),zD=[{id:"facil",label:"F\xE1cil",hint:"IA mais lenta e defensiva"},{id:"normal",label:"Normal",hint:"Equil\xEDbrio entre ataque e defesa"},{id:"dificil",label:"Dif\xEDcil",hint:"IA agressiva e veloz"}];function b1(e,t){return Math.max(0,Math.min(1,e/Math.max(1,t)))}function x1({value:e,align:t}){let n=b1(e,100),i=n>.55?"from-emerald-400 to-cyan-400":n>.25?"from-amber-400 to-orange-500":"from-rose-500 to-red-600";return(0,J.jsx)("div",{className:`h-3 w-full overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-white/10 ${t==="right"?"rotate-180":""}`,children:(0,J.jsx)("div",{className:`h-full rounded-full bg-gradient-to-r ${i} transition-[width] duration-200 ease-out`,style:{width:`${n*100}%`}})})}function M1({value:e}){let t=b1(e,100),n=t>=1;return(0,J.jsxs)("div",{className:"flex items-center gap-2",children:[(0,J.jsx)("span",{className:`text-[10px] font-bold uppercase tracking-widest ${n?"text-cyan-300":"text-slate-500"}`,children:"Super"}),(0,J.jsx)("div",{className:"h-1.5 w-24 overflow-hidden rounded-full bg-slate-800/80 sm:w-40",children:(0,J.jsx)("div",{className:`h-full rounded-full transition-[width] duration-150 ${n?"bg-gradient-to-r from-amber-300 via-yellow-200 to-white shadow-[0_0_12px_rgba(253,224,71,0.9)]":"bg-gradient-to-r from-indigo-500 to-cyan-400"}`,style:{width:`${t*100}%`}})})]})}function S1({wins:e,align:t}){return(0,J.jsx)("div",{className:`flex gap-1.5 ${t==="right"?"flex-row-reverse":""}`,children:[0,1].map(n=>(0,J.jsx)("span",{className:`h-2.5 w-2.5 rotate-45 rounded-[2px] border ${n<e?"border-cyan-300 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]":"border-slate-500/60 bg-slate-800"}`},n))})}function wd({label:e,className:t,onDown:n,onUp:i}){return(0,J.jsx)("button",{type:"button","aria-label":e,className:`select-none touch-none active:scale-95 ${t}`,onPointerDown:s=>{s.preventDefault(),n()},onPointerUp:s=>{s.preventDefault(),i()},onPointerLeave:i,onPointerCancel:i,onContextMenu:s=>s.preventDefault(),children:e})}function E1({playerName:e="KAI",enemyName:t="VEX"}){let n=(0,Nn.useRef)(null),i=(0,Nn.useRef)(null),[s,a]=(0,Nn.useState)(null),[r,o]=(0,Nn.useState)("normal"),[l,c]=(0,Nn.useState)("menu"),[f,d]=(0,Nn.useState)(!1),[h,p]=(0,Nn.useState)(null);(0,Nn.useEffect)(()=>{let D=n.current;if(!D)return;let U=null;try{U=new Td(D,{onHud:a}),i.current=U,d(!0)}catch{p("N\xE3o foi poss\xEDvel iniciar o WebGL. Tente outro navegador ou ative a acelera\xE7\xE3o de hardware.")}return()=>{U?.dispose(),i.current=null}},[]);let v=(0,Nn.useCallback)(D=>{i.current&&(o(D),i.current.startMatch(D),c("playing"))},[]),x=(0,Nn.useCallback)(()=>{i.current?.goToMenu(),c("menu")},[]),g=(0,Nn.useCallback)(D=>({down:()=>i.current?.setControl(D,!0),up:()=>i.current?.setControl(D,!1)}),[]),u=g("left"),m=g("right"),_=g("up"),y=g("down"),E=g("block"),A=l==="menu",w=!A&&s?.status==="matchEnd",R=!A&&!w&&s?.paused,b=s?.player.wins??0,M=s?.enemy.wins??0;return(0,J.jsx)("div",{className:"relative w-full overflow-hidden rounded-3xl border border-slate-800 bg-[#04050e] shadow-2xl",children:(0,J.jsxs)("div",{className:"relative h-[min(78vh,720px)] min-h-[440px] w-full",children:[(0,J.jsx)("div",{ref:n,className:"absolute inset-0"}),(0,J.jsx)("div",{className:"pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,23,0.65)_100%)]"}),!A&&(0,J.jsx)("div",{className:"pointer-events-none absolute inset-x-0 top-0 p-3 sm:p-5",children:(0,J.jsxs)("div",{className:"mx-auto flex max-w-4xl items-start gap-3 sm:gap-5",children:[(0,J.jsxs)("div",{className:"flex-1 space-y-1.5",children:[(0,J.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,J.jsx)("span",{className:"text-xs font-black uppercase tracking-widest text-cyan-300 drop-shadow sm:text-sm",children:e}),(0,J.jsx)(S1,{wins:b,align:"right"})]}),(0,J.jsx)(x1,{value:s?.player.hp??100,align:"left"}),(0,J.jsx)(M1,{value:s?.player.meter??0})]}),(0,J.jsxs)("div",{className:"flex flex-col items-center pt-0.5",children:[(0,J.jsx)("span",{className:`rounded-xl border px-3 py-1 font-mono text-2xl font-bold leading-none backdrop-blur sm:text-3xl ${(s?.timer??60)<=10&&s?.status==="fight"?"border-rose-500/60 bg-rose-950/70 text-rose-300":"border-slate-700/70 bg-slate-950/70 text-white"}`,children:String(s?.timer??60).padStart(2,"0")}),(0,J.jsxs)("span",{className:"mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500",children:["Round ",s?.round??1]})]}),(0,J.jsxs)("div",{className:"flex-1 space-y-1.5",children:[(0,J.jsxs)("div",{className:"flex items-center justify-between gap-2",children:[(0,J.jsx)(S1,{wins:M,align:"left"}),(0,J.jsx)("span",{className:"text-xs font-black uppercase tracking-widest text-rose-300 drop-shadow sm:text-sm",children:t})]}),(0,J.jsx)(x1,{value:s?.enemy.hp??100,align:"right"}),(0,J.jsx)("div",{className:"flex justify-end",children:(0,J.jsx)(M1,{value:s?.enemy.meter??0})})]})]})}),!A&&(s?.combo??0)>1&&(0,J.jsx)("div",{className:"pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2",children:(0,J.jsxs)("span",{className:"rounded-xl border border-cyan-400/40 bg-cyan-500/15 px-3 py-1 font-mono text-lg font-black text-cyan-200 backdrop-blur",children:[s?.combo,"x COMBO"]})}),!A&&!w&&!R&&(s?.message??"")!==""&&(0,J.jsxs)("div",{className:"pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2",children:[(0,J.jsx)("span",{className:"animate-pulse text-4xl font-black uppercase italic tracking-tight text-white drop-shadow-[0_0_20px_rgba(34,211,238,0.65)] sm:text-6xl",children:s?.message}),s?.submessage?(0,J.jsx)("span",{className:"rounded-full bg-slate-950/60 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-300 backdrop-blur",children:s.submessage}):null]}),h&&(0,J.jsx)("div",{className:"absolute inset-0 flex items-center justify-center p-6",children:(0,J.jsx)("p",{className:"max-w-sm rounded-2xl border border-rose-500/40 bg-rose-950/80 p-4 text-center text-sm text-rose-100",children:h})}),!A&&!w&&(0,J.jsx)("div",{className:"absolute inset-x-0 bottom-0 p-2.5 sm:hidden",children:(0,J.jsxs)("div",{className:"flex items-end justify-between gap-2",children:[(0,J.jsxs)("div",{className:"grid grid-cols-3 gap-1.5",children:[(0,J.jsx)(wd,{label:"\u25C0",onDown:u.down,onUp:u.up,className:"h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur"}),(0,J.jsx)("div",{className:"flex flex-col gap-1.5",children:(0,J.jsx)(wd,{label:"\u25B2",onDown:_.down,onUp:_.up,className:"h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur"})}),(0,J.jsxs)("div",{className:"flex flex-col gap-1.5",children:[(0,J.jsx)(wd,{label:"\u25B6",onDown:m.down,onUp:m.up,className:"h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur"}),(0,J.jsx)(wd,{label:"\u25BC",onDown:y.down,onUp:y.up,className:"h-11 w-11 rounded-xl bg-slate-800/80 text-lg text-white backdrop-blur"})]})]}),(0,J.jsxs)("div",{className:"grid grid-cols-2 gap-1.5",children:[(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.press("punch"),className:"h-11 w-14 rounded-xl bg-cyan-600/85 text-xs font-bold text-white active:scale-95",children:"Soco"}),(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.press("kick"),className:"h-11 w-14 rounded-xl bg-indigo-600/85 text-xs font-bold text-white active:scale-95",children:"Chute"}),(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.press("jump"),className:"h-11 w-14 rounded-xl bg-slate-800/85 text-xs font-bold text-white active:scale-95",children:"Pular"}),(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.press("super"),className:"h-11 w-14 rounded-xl bg-amber-500/85 text-xs font-bold text-slate-950 active:scale-95",children:"Super"})]})]})}),!A&&(0,J.jsxs)("div",{className:"absolute bottom-2.5 right-2.5 hidden gap-2 sm:flex",children:[(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.togglePause(),className:"rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur transition hover:bg-slate-800",children:s?.paused?"Continuar":"Pausar"}),(0,J.jsx)("button",{type:"button",onClick:x,className:"rounded-lg border border-slate-700/70 bg-slate-950/60 px-3 py-1.5 text-[11px] font-semibold text-slate-300 backdrop-blur transition hover:bg-slate-800",children:"Menu"})]}),A&&(0,J.jsx)("div",{className:"absolute inset-0 flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-[2px]",children:(0,J.jsxs)("div",{className:"w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/85 p-5 shadow-[0_0_60px_rgba(34,211,238,0.15)] sm:p-7",children:[(0,J.jsxs)("div",{className:"flex items-center justify-between gap-3",children:[(0,J.jsxs)("div",{children:[(0,J.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.35em] text-cyan-400",children:"Arena 3D"}),(0,J.jsxs)("h2",{className:"mt-1 text-3xl font-black italic tracking-tight text-white",children:["NEON ",(0,J.jsx)("span",{className:"text-cyan-300",children:"FIST"})]})]}),(0,J.jsx)("span",{className:"rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan-200",children:"Melhor de 3"})]}),(0,J.jsxs)("p",{className:"mt-3 text-sm leading-relaxed text-slate-400",children:[e," encara ",t," na arena neon. Socos, chutes, defesa e golpe especial \u2014 escolha a dificuldade e entre no ringue."]}),(0,J.jsx)("div",{className:"mt-4 grid gap-2",children:zD.map(D=>{let U=r===D.id;return(0,J.jsxs)("button",{type:"button",onClick:()=>o(D.id),className:`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5 text-left transition ${U?"border-cyan-400/70 bg-cyan-500/15 text-white shadow-[0_0_18px_rgba(34,211,238,0.2)]":"border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60"}`,children:[(0,J.jsxs)("span",{children:[(0,J.jsx)("span",{className:"block text-sm font-bold",children:D.label}),(0,J.jsx)("span",{className:"block text-[11px] text-slate-400",children:D.hint})]}),(0,J.jsx)("span",{className:`h-3 w-3 rounded-full border ${U?"border-cyan-200 bg-cyan-300":"border-slate-600"}`})]},D.id)})}),(0,J.jsx)("button",{type:"button",disabled:!f,onClick:()=>v(r),className:"mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black uppercase tracking-widest text-white shadow-lg transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-50",children:f?"Entrar na arena":"Carregando arena..."}),(0,J.jsxs)("div",{className:"mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] text-slate-500 sm:grid-cols-3",children:[(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"A / D"})," mover"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"W"})," pular"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"Shift"})," bloquear"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"J"})," soco"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"K"})," chute"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"U"})," super"]}),(0,J.jsxs)("span",{children:[(0,J.jsx)("b",{className:"text-slate-300",children:"P"})," pausar"]}),(0,J.jsx)("span",{className:"sm:col-span-2",children:"No celular, use os bot\xF5es na tela."})]})]})}),w&&(0,J.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm",children:(0,J.jsxs)("div",{className:"w-full max-w-sm rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center",children:[(0,J.jsx)("p",{className:"text-[10px] font-black uppercase tracking-[0.35em] text-slate-500",children:"Resultado"}),(0,J.jsx)("h3",{className:`mt-2 text-4xl font-black italic tracking-tight ${s?.matchWinner==="player"?"text-cyan-300":"text-rose-400"}`,children:s?.matchWinner==="player"?"VIT\xD3RIA!":"DERROTA"}),(0,J.jsxs)("p",{className:"mt-1 text-sm text-slate-400",children:["Placar final: ",b," \xD7 ",M]}),(0,J.jsxs)("div",{className:"mt-5 grid gap-2",children:[(0,J.jsx)("button",{type:"button",onClick:()=>v(r),className:"h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-black uppercase tracking-widest text-white transition hover:from-cyan-400 hover:to-blue-500",children:"Revanche"}),(0,J.jsx)("button",{type:"button",onClick:x,className:"h-11 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-300 transition hover:bg-slate-800",children:"Trocar dificuldade"})]})]})}),R&&(0,J.jsx)("div",{className:"absolute inset-0 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-sm",children:(0,J.jsxs)("div",{className:"w-full max-w-xs rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center",children:[(0,J.jsx)("h3",{className:"text-xl font-black uppercase tracking-widest text-white",children:"Pausado"}),(0,J.jsxs)("div",{className:"mt-4 grid gap-2",children:[(0,J.jsx)("button",{type:"button",onClick:()=>i.current?.resume(),className:"h-10 rounded-xl bg-cyan-500 text-sm font-bold text-slate-950 transition hover:bg-cyan-400",children:"Continuar"}),(0,J.jsx)("button",{type:"button",onClick:x,className:"h-10 rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-slate-300 transition hover:bg-slate-800",children:"Sair para o menu"})]})]})})]})})}var w1=Sr(Wc()),T1=document.getElementById("root");T1&&(0,A1.createRoot)(T1).render((0,w1.jsx)(E1,{playerName:"KAI",enemyName:"VEX"}));})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2025 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
