window.hjSiteSettings = window.hjSiteSettings || {"site_id":3875220,"rec_value":1.0,"state_change_listen_mode":"automatic","record":true,"continuous_capture_enabled":true,"recording_capture_keystrokes":true,"session_capture_console_consent":true,"anonymize_digits":true,"anonymize_emails":true,"suppress_all":false,"suppress_all_on_specific_pages":[],"suppress_text":false,"suppress_location":false,"user_attributes_enabled":true,"legal_name":null,"privacy_policy_url":null,"deferred_page_contents":[],"record_targeting_rules":[],"feedback_widgets":[],"heatmaps":[],"polls":[],"integrations":{"optimizely":{"tag_recordings":false},"abtasty":{"tag_recordings":false},"kissmetrics":{"send_user_id":false},"mixpanel":{"send_events":false},"unbounce":{"tag_recordings":false},"hubspot":{"enabled":false,"send_recordings":false,"send_surveys":false}},"features":["ask.popover_redesign","client_script.compression.pc","error_reporting","feedback.embeddable_widget","feedback.widgetV2","settings.billing_v2","survey.embeddable_widget","survey.image_question","survey.screenshots","survey.type_button"],"tracking_code_verified":true,"cs_project_id":null};

!function(){"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,n(i.key),i)}}function n(t){var n=function(t,n){if("object"!=e(t)||!t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var i=r.call(t,"string");if("object"!=e(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==e(n)?n:String(n)}var r,i=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.send=t,this.batchSize=n,this.flushInterval=r,this.buffer=[],this.flushTimer=null}var n,r;return n=e,(r=[{key:"getBuffer",value:function(){return this.buffer}},{key:"add",value:function(e){var t=this;this.buffer.push(e),this.buffer.length>=this.batchSize?this.flush():this.flushTimer||(this.flushTimer=setTimeout((function(){t.flush()}),this.flushInterval))}},{key:"flush",value:function(){this.buffer.length>0&&(this.send(this.buffer),this.buffer=[]),this.flushTimer&&(clearTimeout(this.flushTimer),this.flushTimer=null)}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}var o,a,c,u=function(){try{return"performance"in window&&"now"in window.performance}catch(e){return!1}},l={version:6,metricsUrl:(null===(r=window._hjSettings)||void 0===r?void 0:r.metricsUrl)||"https://metrics.hotjar.io",sampling:{metrics:.1,fieldMetrics:.01,debug:.5,universalDebug:.05*.1},browser:{hasPerformance:!1,shouldLogMetrics:!1,inLab:!1},buffer:{bufferSize:40,flushInterval:3e3}},d={isDebugEnabled:!1,isMetricsEnabled:!1,isFieldMetricsEnabled:!1,loggedMetrics:{},genericTags:{}},f=function(e,t,n){var r;d.loggedMetrics[e]=s(s({},d.loggedMetrics[e]),{},((r={})[t]=n||{},r))},h=function(e){if(!e)return"value";var t=Object.keys(e)[0];return t&&e[t]||"value"},g=function(e){var t,n=null!==(t=e.tag)&&void 0!==t?t:void 0;return d.isDebugEnabled?s(s(s({},n),e.extraTags),d.genericTags):n},p=function(e,t){if(!o)return!1;var n=d.isMetricsEnabled||d.isDebugEnabled;return"lab"===e&&(n=l.browser.inLab),"field"===e&&(n=d.isFieldMetricsEnabled),t?n&&t.flush:n},m=function(e){var t=!1,n="v=".concat(l.version),r="".concat(l.metricsUrl,"?").concat(n,"&site_id=").concat(window.hjSiteSettings.site_id)+(d.isDebugEnabled?"&debug=true":""),i=JSON.stringify(e);if("sendBeacon"in navigator)try{t=navigator.sendBeacon.bind(navigator)(r,i)}catch(e){}if(!1===t)try{var s=new XMLHttpRequest;s.open("POST",r),s.timeout=1e4,s.send(i)}catch(e){}l.browser.shouldLogMetrics&&console.debug("New Metrics: ",e)},v={getConfig:function(e){return l[e]},getState:function(e){return d[e]},start:function(){try{l.browser={hasPerformance:u(),shouldLogMetrics:/hjMetrics=1/.test(location.search),inLab:/hjLab=true/.test(location.search)};var e=v.time(),t=window.hjSiteSettings||{},n=t.features,r=t.site_id,s=new Set(n),a=l.sampling;return d.genericTags={site_id:r},d.isDebugEnabled=Math.random()<=a.universalDebug||s.has("client_script.metrics.debug")&&Math.random()<=a.debug,d.isMetricsEnabled=Math.random()<=a.metrics,d.isFieldMetricsEnabled=d.isMetricsEnabled&&Math.random()<=a.fieldMetrics,o=new i(m,l.buffer.bufferSize,l.buffer.flushInterval),e}catch(e){console.debug("Error in metrics.start",{error:e})}},reset:function(){d.loggedMetrics={}},stop:function(){d.isDebugEnabled=!1,d.isMetricsEnabled=!1,d.genericTags={}},count:function(e,t){var n=t.incr,r=t.tag,i=t.extraTags,a=t.type;try{var c,u=h(r),l=d.loggedMetrics[e],f=0;if(n?(f=(l&&l[u]||0)+(n.value||1),d.loggedMetrics[e]=s(s({},l),{},((c={})[u]=null!=n&&n.flush?0:f,c))):f=1,p(a,n)){var m={name:e,type:"count",value:f,tags:g({tag:r,extraTags:i})};o.add(m)}}catch(e){}},distr:function(e,t){var n=t.task,r=t.value,i=t.extraTags;p()&&o.add({name:e,type:"distribution",value:r,tags:g({tag:{task:n},extraTags:i})})},time:function(){try{if(!l.browser.hasPerformance)return;return performance.now()}catch(e){}},timeEnd:function(e,t){var n=t.tag,r=t.start,i=t.total,s=t.extraTags,a=t.type;try{var c=v.time();if(!i&&!c)return;var u=h(n),l=i||(r&&c?c-r:void 0);if(f(e,u,{}),l&&l>0&&p(a)){var d={name:e,type:"distribution",value:Math.round(l),tags:g({tag:n,extraTags:s})};o.add(d)}return c}catch(t){console.debug("Failed to send timer metric: ",{name:e,tag:n,error:t})}},timeIncr:function(e,t){var n,r,i,s,o=t.tag,a=t.start,c=t.flush,u=t.extraTags,l=t.type,g=hj.metrics.time(),p=a&&g?g-a:void 0,m=(n=e,{tagName:r=h(o),start:(s=(i=d.loggedMetrics[n])&&i[r]||{}).start,total:s.total}),b=p?p+(m.total||0):m.total;return f(e,m.tagName,{total:b}),c&&v.timeEnd(e,{tag:o,total:b,extraTags:u,type:l}),b},timeWatcher:function(){var e,t=0,n=!1,r=function(){var n,r=v.time();return t+=null!==(n=e&&r&&r-e)&&void 0!==n?n:0,e=v.time(),t};return{start:function(){if(!n)return n=!0,e=v.time()},incr:r,end:function(){var n=r();return t=0,e=void 0,n}}},getErrorMessage:function(e){return e instanceof Error?e.message:"string"==typeof e?e:""}};window.hj=window.hj||function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];(window.hj.q=window.hj.q||[]).push(t)},window.hj.metrics=v;var b,w,j,_,y,S,E=hj.metrics.start(),T=!(!window.CS_CONF||null===(a=window.CS_CONF.voc)||void 0===a||!a.enabled),M=!(window.CS_CONF||!(null!==(c=window.hjSiteSettings.features)&&void 0!==c&&c.includes("cs_lite")||window._hjSettings.csid));if(window.hjLazyModules=window.hjLazyModules||{SURVEY_V2:{js:"survey-v2.db3ff4337be14b0b5ac0.js"},SURVEY_BOOTSTRAPPER:{js:"survey-bootstrapper.5a85193a3fad2f251abc.js"},SURVEY_ISOLATED:{js:"survey-isolated.6c1feb15736ec9c3aa4a.js"},HEATMAP_RETAKER:{js:"heatmap-retaker.f79c0c7bb13d8a14bddc.js"},SURVEY_INVITATION:{js:"survey-invitation.1197fdfaac5b14f68efc.js"},NOTIFICATION:{js:"notification.86732657079a99e6ce8a.js"},PREACT_INCOMING_FEEDBACK:{js:"preact-incoming-feedback.e25e7ab712cb73398eb2.js"},SENTRY:{js:"sentry.58c81e3e25532810f6fd.js"},BROWSER_PERF:{js:"browser-perf.8417c6bba72228fa2e29.js"},USER_TEST:{js:"user-test.b2423fe133402dc80f21.js"}},T)window._uxa.push(["start:hotjar",window.hjSiteSettings]);else if(M){window.CS_CONF_BASE=(S=(y=(b=window.hjSiteSettings).suppress_all||b.suppress_text||(null===(w=b.suppress_all_on_specific_pages)||void 0===w?void 0:w.length))?function(e){var t,n,r,i,s,o;if((e.suppress_all||e.suppress_text)&&(n=".*"),null!==(t=e.suppress_all_on_specific_pages)&&void 0!==t&&t.length){var a=e.suppress_all_on_specific_pages.find((function(e){return"regex"===e.match_operation}));a&&(n=null==a?void 0:a.pattern),i=e.suppress_all_on_specific_pages,s={contains:"contain",ends_with:"end",exact:"exact",simple:"contain",starts_with:"start"},r=(o=i.filter((function(e){return Object.keys(s).includes(e.match_operation)})).map((function(e){return{operator:s[e.match_operation],value:e.pattern,ignoreQueryParams:"simple"===e.match_operation,ignoreURIFragments:"simple"===e.match_operation,ignoreCaseSensitivity:"simple"===e.match_operation,notOperator:e.negate}}))).length?o:void 0}return{replayRecordingMaskedUrlRegex:n,replayRecordingMaskedUrlRegexRules:r}}(b):null,{projectId:b.cs_project_id,hostnames:[window.location.hostname],sampleRate:b.continuous_capture_enabled?100:100*b.rec_value,replayRecordingRate:b.record?100:0,jsErrorsEnabled:b.session_capture_console_consent,customError:b.session_capture_console_consent&&{enabled:!0,consoleMessageLogLevels:["error"]},voc:null!==(j=b.feedback_widgets)&&void 0!==j&&j.length||null!==(_=b.polls)&&void 0!==_&&_.length?{enabled:1,siteId:b.site_id}:{enabled:0},whitelistedAttributes:!y&&b.recording_capture_keystrokes?["data-hj-allow"]:[],anonymisationMethod:S,anonymizeDigits:!!y||b.anonymize_digits,anonymizeEmails:!!y||b.anonymize_emails}),window._uxa=window._uxa||[];var R=window._hjSettings.environment,O="t.contentsquare.net";R&&"live"!==R&&(window._hjSettings.csid&&(window.CS_CONF_BASE.projectId=window._hjSettings.csid),O="t-staging.contentsquare.net");var x=document.createElement("script");x.type="text/javascript",x.async=!0,x.src="//".concat(O,"/uxa/smb/tag.js"),document.getElementsByTagName("head")[0].appendChild(x)}else window.hjBootstrap=window.hjBootstrap||function(e,t,n){var r,i=new RegExp("bot|google|headless|baidu|bing|msn|duckduckbot|teoma|slurp|yandex|phantomjs|pingdom|ahrefsbot|facebook","i"),s=(null===(r=window.navigator)||void 0===r?void 0:r.userAgent)||"unknown";if(i.test(s))return hj.metrics.count("session-rejection",{tag:{reason:"bot"}}),void console.warn("Hotjar not launching due to suspicious userAgent:",s);var o="http:"===window.location.protocol,a=Boolean(window._hjSettings.preview);if(o&&!a)return hj.metrics.count("session-rejection",{tag:{reason:"https"}}),void console.warn("For security reasons, Hotjar only works over HTTPS. Learn more: https://help.hotjar.com/hc/en-us/articles/115011624047");var c=function(e,t,n){window.hjBootstrapCalled=(window.hjBootstrapCalled||[]).concat(n),window.hj&&window.hj._init&&window.hj._init._verifyInstallation&&hj._init._verifyInstallation()};c(0,0,n);var u=window.document,l=u.head||u.getElementsByTagName("head")[0];hj.scriptDomain=e;var d=u.createElement("script");d.async=1,d.src=hj.scriptDomain+t,d.charset="utf-8",l.appendChild(d),c.revision="bb592f1",window.hjBootstrap=c},window.hjBootstrap("https://script.hotjar.com/","modules.8da33a8f469c3b5ffcec.js","3875220"),hj.metrics.timeEnd("resource-blocking-time",{tag:{resource:"hotjar-js"},start:E,type:"lab"})}();