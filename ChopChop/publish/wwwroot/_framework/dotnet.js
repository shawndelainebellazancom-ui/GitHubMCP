//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Me.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Me.preferredIcuAsset=O(Me.config);let e="invariant"==Me.config.globalizationMode;if(!e)if(Me.preferredIcuAsset)Me.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Me.config.globalizationMode||"all"===Me.config.globalizationMode||"sharded"===Me.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Me.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Me.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Me.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!L(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,M=/[a-zA-Z]:[\\/]/;function L(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||M.test(e):U.test(e)}let P,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Me.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Me.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Me.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Me.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Me.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Me.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Me.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Me.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Me.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Me.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Me.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Me.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Me.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Me.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Me.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Me.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Me.allDownloadsQueued.promise;try{return Me.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Me.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;P;)await P.promise;try{++N,N==Me.maxParallelDownloads&&(Me.diagnosticTracing&&b("Throttling further parallel downloads"),P=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Me.config.remoteSources?Me.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Me.diagnosticTracing&&b(`Attempting to download '${t}'`):Me.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Me.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Me.actual_downloaded_assets_count),e):e}finally{if(--N,P&&N==Me.maxParallelDownloads-1){Me.diagnosticTracing&&b("Resuming more parallel downloads");const e=P;P=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Me.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Me.modulesUniqueQuery&&q[t]&&(e+=Me.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Me.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Me.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Me.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Me.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Me.loadedAssemblies.push(e.name),de++,Me.onDownloadResourceProgress&&Me.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Me.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Me.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Me.locateFile(t),"js-module-library-initializer");Me.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await import(/*! webpackIgnore: true */o)}Me.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Me.libraryInitializers)return;const o=[];for(let n=0;n<Me.libraryInitializers.length;n++){const r=Me.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Me.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Me.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Me.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Me.maxParallelDownloads=e.maxParallelDownloads||Me.maxParallelDownloads,Me.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Me.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Me.afterConfigLoaded.promise;let o;try{if(e.configSrc||Me.config&&0!==Object.keys(Me.config).length&&(Me.config.assets||Me.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Me.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Me.locateFile(t);let n=null;void 0!==Me.loadBootResource&&(n=Me.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await import(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await import(ce(o,"manifest"))).config;function s(e){return Me.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Me.config.applicationEnvironment&&(r.applicationEnvironment=Me.config.applicationEnvironment),ve(Me.config,r)}(e)),xe(),await we(null===(t=Me.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Me.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Me.config,Pe),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Me.afterConfigLoaded.promise_control.resolve(Me.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Me.config=e.config=Object.assign(Me.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Me.isChromium||Me.isFirefox)}async function Ae(e){const t=Me.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Me={},Le={},Pe={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Me,runtimeHelpers:Ue,diagnosticHelpers:Le,api:Pe};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Me.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Me.exitCode} ${Me.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Me.exitReason)}function Ke(e){Ze&&Ze(e||Me.exitReason),Xe(1,e||Me.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Me.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Me.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Me.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Me.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Me.allDownloadsQueued.promise_control.reject(e),Me.allDownloadsFinished.promise_control.reject(e),Me.afterConfigLoaded.promise_control.reject(e),Me.wasmCompilePromise.promise_control.reject(e),Me.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Me.config&&(Me.config.logExitCode?Me.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Me.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Me.config&&Me.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Me.exitCode=t,Me.exitReason||(Me.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Me.config&&Me.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await import(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Me=e.loaderHelpers,Le=e.diagnosticHelpers,Pe=e.api,Ne=e.internal,Object.assign(Pe,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"30000d883e06c122311a66894579bc12329a09d4",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Me,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Me.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Me.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await import(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Me.modulesUniqueQuery=t.substring(o)),Me.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Me.scriptDirectory=(n=Me.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Me.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Me.scriptDirectory).toString():L(e)?e:Me.scriptDirectory+e,Me.fetch_like=k,Me.out=console.log,Me.err=console.error,Me.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Me.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Me.isChromium=e.userAgent.includes("Chrome"),Me.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await import(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Me.diagnosticTracing&&b("mono config already received"):(ve(Me.config,n),Ue.monoThreadInfo=r,xe(),Me.diagnosticTracing&&b("mono config received"),st=!0,Me.afterConfigLoaded.promise_control.resolve(Me.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Me.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Me.afterConfigLoaded.promise,function(){const e=Me.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Me.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Me.wasmCompilePromise.promise_control.resolve(n)}catch(e){Me.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Me.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Pe}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=import(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=import(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Me.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=import(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Me.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Me.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Me.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "ChopChop",
  "resources": {
    "hash": "sha256-3YZ4fqkMg4T9C/ZNv5/wlJk6iqE69TvBDCaOreVoaVo=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.9g24l9wfhg.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.ph7fh99gkp.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.4tp9n7nyjh.wasm",
        "integrity": "sha256-GDJbz0ZAhRfKfbRjNC7ztCsT61zf9L4F2/wsgnmXlSI="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.afbydgdggi.wasm",
        "integrity": "sha256-VqtP9dN/sb17rjWKBEsA/Bed2dnXeaSGwy7fAxuQ5M4="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.xo2oe4wy1d.wasm",
        "integrity": "sha256-oQEuWdPLo30Vq8Bt6UTWQNvZt7ALaRIkCW9xaofstps="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.kds3rkcurd.wasm",
        "integrity": "sha256-mEI1mFsx5xToWVv630c07tBn4Mcfn0fm2v2+zfZJzGU="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.prn0r93kjb.wasm",
        "integrity": "sha256-VWdNaRQLXLZGUMmTe/PRX89Lu2keRlQ62e3Ae5PBCeg="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.x4fcf40x48.wasm",
        "integrity": "sha256-oRY+BHsjLQRpC4Bj8CNthPjZw/ulUlKBYMItWuHvgx4="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.z686e2v2bt.wasm",
        "integrity": "sha256-BQshpWALQ9Se/Cdpu2a8159OZrEc9qA6K08OZ8/PIgc="
      },
      {
        "virtualPath": "Microsoft.Extensions.AI.Abstractions.wasm",
        "name": "Microsoft.Extensions.AI.Abstractions.bs3437vkxf.wasm",
        "integrity": "sha256-1cR44hXUfhjHh+QKGxBWZVHSkSwE4YtFetHBWAycWEg="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.wsrjngwnc6.wasm",
        "integrity": "sha256-gIrTIpetRZxGBf1tsixZl09I9mCX41ichJKsoC08VYI="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.faxviewcav.wasm",
        "integrity": "sha256-ufuDU9B/PgzrBaw+P/OKKA2fHWp+t2ewVgAm1sRB7tc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.b0e1233ba1.wasm",
        "integrity": "sha256-1eSDtqB+paiNoOW5KBJ9hGjYJFAEYwfdXnaAEWkjaJM="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.zzlaxbpsyu.wasm",
        "integrity": "sha256-3+pbW/qRRNJP1S2dBrnINAMjz7S3X7fBeJb6oSl03MA="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.ff7m0ovk4q.wasm",
        "integrity": "sha256-5eDkx68Hi7fP2u8r6eJRhiIe1CfjLtOks6ny53hqlcI="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.lorw22frna.wasm",
        "integrity": "sha256-JY4x2+mb1FRg20trAa0XQKA0SAJ/6Q65Ov2/kWeSegQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.ybci7pbnrt.wasm",
        "integrity": "sha256-EhYp3mShqeP5E1HvQLhkOi3FhY65gUimgI01pgpRWVI="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.upb2hhgixa.wasm",
        "integrity": "sha256-LkMLqD5EI7/onqLUUvVHrfTje0XkXBz3jov1eVERXqc="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.o9je5vejwl.wasm",
        "integrity": "sha256-DPp5cKpBOLZ8M6YwgRePY5e4R12TcEcQARVXJg91toI="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.oekr5i8x9b.wasm",
        "integrity": "sha256-8PIIcaamGJjkXjHCpZesTv4bkQxoGSCVpvkDBnrdm1c="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.1zpzf8gkfl.wasm",
        "integrity": "sha256-Pf3vQUKhws1lcQ+zm0EljzRs0/f0rYyb1Vrfe1Yktmg="
      },
      {
        "virtualPath": "System.Security.Cryptography.Pkcs.wasm",
        "name": "System.Security.Cryptography.Pkcs.z7xjno75o4.wasm",
        "integrity": "sha256-77Wj4fAiYylJcWrZnE3FFCVzQQo4kEjCEmn9cyYjnXY="
      },
      {
        "virtualPath": "Telerik.DataSource.wasm",
        "name": "Telerik.DataSource.2rlerbmhwo.wasm",
        "integrity": "sha256-ngwBk6aCghgjrw0Suv4ItCElR4PvPVWvAFl2VP7JRAg="
      },
      {
        "virtualPath": "Telerik.Documents.Core.wasm",
        "name": "Telerik.Documents.Core.ecuit3p76a.wasm",
        "integrity": "sha256-HuNeDq4zHMQQyC/Vng4NKL1UOFz5j/mKcHEtZ2R/Fd4="
      },
      {
        "virtualPath": "Telerik.Documents.Fixed.wasm",
        "name": "Telerik.Documents.Fixed.tfr5of06u8.wasm",
        "integrity": "sha256-17HBD4WZcGLor9q3cI+3/Bf92xZ/xrKrpZZbo3joNE0="
      },
      {
        "virtualPath": "Telerik.Documents.Spreadsheet.wasm",
        "name": "Telerik.Documents.Spreadsheet.62ribvcy02.wasm",
        "integrity": "sha256-fmACbgJ8oLJjPbU01vv1dd6Na/r2txunk5CIn/jgAh4="
      },
      {
        "virtualPath": "Telerik.Documents.Spreadsheet.FormatProviders.Pdf.wasm",
        "name": "Telerik.Documents.Spreadsheet.FormatProviders.Pdf.a5t08gbfwl.wasm",
        "integrity": "sha256-jkuHlpjBL2NPmqHT3aaGDFRRq+Zf1YRvU6UZMggZuIo="
      },
      {
        "virtualPath": "Telerik.Documents.SpreadsheetStreaming.wasm",
        "name": "Telerik.Documents.SpreadsheetStreaming.6zqrke793n.wasm",
        "integrity": "sha256-Uv3hvVLWpeh/UsfAW7hFWZptBgmomVq4v3dnUcbRPUM="
      },
      {
        "virtualPath": "Telerik.FontIcons.wasm",
        "name": "Telerik.FontIcons.w3ynzed1f7.wasm",
        "integrity": "sha256-lOjrlDgyeu7eqaBNMsS/QeCfxbXVoQxGnGxtryvs/F0="
      },
      {
        "virtualPath": "Telerik.Licensing.Runtime.wasm",
        "name": "Telerik.Licensing.Runtime.8za6cd2cqx.wasm",
        "integrity": "sha256-FH3plJ8kZqAwl412BBrGgh1GZ3HmKE9rkOe+QoCbWAY="
      },
      {
        "virtualPath": "Telerik.Pivot.Core.wasm",
        "name": "Telerik.Pivot.Core.4dlji2oluc.wasm",
        "integrity": "sha256-6Ewjur3//pQhKWEYolqF4tzlriwksxLDPfvj7hfahFM="
      },
      {
        "virtualPath": "Telerik.Pivot.DataProviders.Xmla.wasm",
        "name": "Telerik.Pivot.DataProviders.Xmla.tzipzybhil.wasm",
        "integrity": "sha256-aecqrvvWfXlQQTimwY7q5DxGJ8fSUbIT4LNkipDSePo="
      },
      {
        "virtualPath": "Telerik.Recurrence.wasm",
        "name": "Telerik.Recurrence.wjzhn8pljl.wasm",
        "integrity": "sha256-xMr1JmXAQtixx4wLu/E8bhSqt+HZwXFL6aKjKZ3o1vY="
      },
      {
        "virtualPath": "Telerik.SvgIcons.wasm",
        "name": "Telerik.SvgIcons.71shndaasq.wasm",
        "integrity": "sha256-K5MtsZfUtTllbgjAV/PE34rOysnyOG9e9x1DKFG1YC0="
      },
      {
        "virtualPath": "Telerik.Blazor.wasm",
        "name": "Telerik.Blazor.n0r81agbdx.wasm",
        "integrity": "sha256-OfyGjwikvNbhroj1T+wfLylaU07A2w8HaC2w93bq/oI="
      },
      {
        "virtualPath": "Telerik.Zip.wasm",
        "name": "Telerik.Zip.dp9aqqj2bx.wasm",
        "integrity": "sha256-X/4PVADBOeWi/gnXA7xZBFGrA8QpfNsu79+yltRFyT4="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.pkoux9qmav.wasm",
        "integrity": "sha256-F4N1xMYd6kCj4O90Hk9bNuOLVyCmVEMT0clN4ZGTt3w="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.y2s9p14pjq.wasm",
        "integrity": "sha256-atMt0HdWHORNQU72cWb+rp32GVS/eDXL5gjhilDaUow="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.9seocdffdd.wasm",
        "integrity": "sha256-2fBn4YougWxXT+YDBBjsfY5gTb0keWg9alsbb7Zq/mY="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.kuugiwinnt.wasm",
        "integrity": "sha256-1E2wlYVmxHK+GardXmL9sK3QVtf2AQDURgwYISrwdYQ="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.9tyy1jfhd7.wasm",
        "integrity": "sha256-veG5hfdhsvF9BO2tdMQDb+f8XFbW0arjveFvdMdK0pA="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.9ieyu42447.wasm",
        "integrity": "sha256-8QsLfgoD80wjIJXum/ym7v3Yr6r/Bl5gC+5w2x0IJg4="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.6ihc97zzyn.wasm",
        "integrity": "sha256-nvhpvAQ0an45XvOTWv4i1XWWOxpIEjDS7D64cVFvrYY="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.889pq5k8qu.wasm",
        "integrity": "sha256-+MgCkh0EDF9MJpOzw9OQ42c4LkpZTqOMuCETKzRFWQs="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.cskhg1awkt.wasm",
        "integrity": "sha256-hCgIT2UGTl7JoprTKENsPPEu8H7JzoCpm0jgB8qjc7w="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.ra2oiz59tn.wasm",
        "integrity": "sha256-o2/nzgZjwqVPEfZ8lV904kPFx0SLxAcCo0tj1PWFXms="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.lfwa8nhuot.wasm",
        "integrity": "sha256-T+nOeniw+DmbfN65wiypHqrePdPY7p8nDsA5qzahWI4="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.6gw3xfyu6r.wasm",
        "integrity": "sha256-BsQd2jQPDstKzL8kwnu2apmz5xAH4cVKJcvWVA/y2h4="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.uih31wwr8q.wasm",
        "integrity": "sha256-dlwjbquKugxuT7CapbVzve7kQMe1h9HqdtWd11WIJvs="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.a5t0xs5vc7.wasm",
        "integrity": "sha256-cqv6ahe9rM3VmYXjbfUz2pSJcXS6upuwpUPyCR10cOU="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.y436hwh93p.wasm",
        "integrity": "sha256-YtazC2fGzZx8sO2cwbPYOG/AQgmBXbxVqqvjpU54VBY="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.zxe4kx6v2o.wasm",
        "integrity": "sha256-p/xoGjt1TaZsJGdOeOeC9dLWw06WPQVvzmrR2ed1xJA="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.l3xncduaq8.wasm",
        "integrity": "sha256-r7ikePd1TDjahb6DC5KNcxLgrmXuRB+tlzc+ViGX/ys="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.mwbvry7niu.wasm",
        "integrity": "sha256-BkFP0VPPt2M/dddvgevrsruNewDeiiC1emOW1h9ZrG4="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.wx44th3a7z.wasm",
        "integrity": "sha256-BMMN1V5C/DpbdncajqSzHAmlzWaGvW3WyVLQjJIYWmA="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.em8wegq5fs.wasm",
        "integrity": "sha256-Wh66uIFhguWUnsjyZmkzstYQn12bGjYIpdWeaj6pMHw="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.cnxk39zmfc.wasm",
        "integrity": "sha256-qMEcVdx+DlvAEfDb7V++20WAjd6e8ppbKIYmKWHtkRU="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.87s1993wmp.wasm",
        "integrity": "sha256-BOLWD+KFBdo4t6euwhnALp0TLy6mwB0KJqBOOJRTYfc="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.7wgynxixi6.wasm",
        "integrity": "sha256-B4WUFJ+JaBdKMr7WdQ2wUA9hj6srtDqW6QhAtbcJ+uc="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.n8ex9ly8ze.wasm",
        "integrity": "sha256-qfxE5vw5b+zZUeGiPUqnE8i/ecYl4+Zh6NUeXOLVV2w="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.lwfzh75lvp.wasm",
        "integrity": "sha256-uwcP0KHod4PDtwpBM+oDzhkDrRtYFEXUurjfCnquBQ4="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.g53df3rq1f.wasm",
        "integrity": "sha256-NNxPgv20zbYRgo5QVy6kiD/6TVA52jRY2ErR8e3Kl8o="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.s78pyo960b.wasm",
        "integrity": "sha256-KDhe3npwzNCOwjmS9OsWnjoRS4E/OshRkb/rBxDgqbw="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.0qvjljp5hn.wasm",
        "integrity": "sha256-WFivPfyoNfUud62aiUQjgL8Bx7TnCG4mzoXnNbvlLFY="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.richsmv2pp.wasm",
        "integrity": "sha256-XYLf8TFelhSl346ZHt0rmVCSXLE3JclSG9Yzyhpscck="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.of49dytpwh.wasm",
        "integrity": "sha256-tINajz2vSM5AJ1kN9gbiVmMsOfyII/7HD/1zaNb2F8s="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.rjgco7ka6i.wasm",
        "integrity": "sha256-xzKEuSJgHCZOKiKPl7bbFss+v585FjrW23i51G0aJy8="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.ays3uzldan.wasm",
        "integrity": "sha256-rnA8yJHVRLncNqLGSowsh83fvyd88RLNBjf8ysYy06I="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.ozlp3cwez6.wasm",
        "integrity": "sha256-lE4DhwFmEP1HuAVPpToPYzNMJRzn1qCE+f+EHpo5j2w="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.awc6nyl7do.wasm",
        "integrity": "sha256-NiqH7QeqqSeJvwUoL3vI9E6CvIIzNsvKDwfIfXRwTOE="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.2ukmohrg8e.wasm",
        "integrity": "sha256-+r6WrHzTIrRQS5TNhTz0rYjsTFyyPU3NCCvXVNe/7NE="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.bxzve93xd8.wasm",
        "integrity": "sha256-n8nNHTfHbmlqRjHjZeJJsM0a9qi2VfDUqLwpdhlYBsk="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.2lmw53tvtv.wasm",
        "integrity": "sha256-qiThZNSKlcbisohVN63ucSkRFpVl1ul43xn7GH37pMM="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.3undoeh4ao.wasm",
        "integrity": "sha256-69lYcF6QXSVvu+qFWicNELf1OJtLoQr+C+tjlAhb2Kk="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.0c6maxmlto.wasm",
        "integrity": "sha256-cCjN8fwIiOzElO3M+Tlr4JxcAagbgCv9AZGvWOzqPZU="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.vbj1skx2qr.wasm",
        "integrity": "sha256-GxQHMdZNgdEH02lDFjKm8JHUhd67r4D+8vF3v947vKg="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.k9ztotzzxp.wasm",
        "integrity": "sha256-yPNnJhJ+XMZq43c9iVX1q4aSTjP9+uDuCe55g/3aiWE="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.urgnk9b8le.wasm",
        "integrity": "sha256-VkOK+mjwXQnuCHgc7TSSpP5QYeLUVOq12PLNVNaKbKU="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.8x90otg5ax.wasm",
        "integrity": "sha256-xOENeGefIqylaz2lijuIsAlwoPd7/ONmiHb9zaYu2fM="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.tfti4oqacv.wasm",
        "integrity": "sha256-d5YO3ldjMKX3OH99eWozKB1YgtbuQ2spnHELh5ds5+I="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.soanpu6pj6.wasm",
        "integrity": "sha256-3Ca65oM+CehsQYLyvBJLTlzcmPggIr7+0M91BQfkank="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.htoz24i833.wasm",
        "integrity": "sha256-ZVq3GnmP4kwU2vkqEJde4r7OPiTRd9HjniiJ0U1BggI="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.0ywv2n8bu0.wasm",
        "integrity": "sha256-iPYBY1bFyXAa+wFhxVw/2kNd4i4PbrAvv8Sa/GfHrPM="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.ivpkne83xe.wasm",
        "integrity": "sha256-ApECKsyPgqaUtyBeh70eH7/J1EY85Ek9nPb3PMH+gdE="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.979um0bcyv.wasm",
        "integrity": "sha256-FRBoT8fbR1824i6OzE6p8RoyvT0KBW0uyjPUJO3ikr8="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.0rf9f6iq13.wasm",
        "integrity": "sha256-BGFKQ8UZzAmwwi7hgCsBxVis1eUuA3O86Rmg1x1VeWE="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.nfldmzmb56.wasm",
        "integrity": "sha256-ww9HU5R7BgwDU3fneWCn4roxD9qp5MuThQ0c6gWDq7A="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.a5ea0j107u.wasm",
        "integrity": "sha256-HqL/ZbDgXQxD7bstgSjus3My8AfxCPif3nz4qcGxO50="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.qd6vz5dsw4.wasm",
        "integrity": "sha256-DjnfyiJT4CEyoUxKWMF1eMsCn7Be4e1lTKynlybkqs4="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.a38dcrvrmi.wasm",
        "integrity": "sha256-yg2ivYdj04SEcUdqgLihhnN5fJUBMShrY9QwivRz1Lg="
      },
      {
        "virtualPath": "ChopChop.wasm",
        "name": "ChopChop.71zagcdfq3.wasm",
        "integrity": "sha256-JeBeiXkOA2jcb1VsahQaTQ4DlYakr82C7cZo9EfptPg="
      }
    ],
    "satelliteResources": {
      "bg-BG": [
        {
          "virtualPath": "Telerik.Blazor.resources.wasm",
          "name": "Telerik.Blazor.resources.4pqssyrmia.wasm",
          "integrity": "sha256-KAo2TyQQjbZtu1eSOv43++H1A1SDYwZ9mv3NtW+viG8="
        }
      ]
    }
  },
  "debugLevel": 0,
  "linkerEnabled": true,
  "globalizationMode": "invariant",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": true,
        "System.TimeZoneInfo.Invariant": false,
        "System.Globalization.PredefinedCulturesOnly": true,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
//# sourceMappingURL=dotnet.js.map
