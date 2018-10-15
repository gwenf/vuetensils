!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("va11y-ui",[],e):"object"==typeof exports?exports["va11y-ui"]=e():t["va11y-ui"]=e()}(this,function(){return function(n){var i={};function o(t){if(i[t])return i[t].exports;var e=i[t]={i:t,l:!1,exports:{}};return n[t].call(e.exports,e,e.exports,o),e.l=!0,e.exports}return o.m=n,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=4)}([function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){"use strict";n.r(e);n(1);var i="va11y-hidden",o={name:i,functional:!0,render:function(t,e){return t("span",{class:i},[e.children])}},s=(n(0),n(2),"va11y-alert"),r={name:s,components:{Hidden:o},props:{visible:{type:[Boolean,Number],default:!1},dismissible:{type:Boolean,default:!0}},model:{prop:"visible",event:"change"},data:function(){return{timerId:null}},methods:{show:function(){this.$emit("show"),this.$emit("change",!0)},hide:function(){this.$emit("hide"),"number"==typeof this.visible?(this.$emit("timer-update",0),this.$emit("change",0)):this.$emit("change",!1),this.clearTimer()},toggle:function(){this.$emit("toggle",this.visible),this.$emit("change",this.visible)},clearTimer:function(){this.timerId&&(clearInterval(this.timerId),this.timerId=null)}},destroyed:function(){this.clearTimer()},render:function(t){var e=this;if(!this.visible)return t(!1);var n=t(!1);if(this.dismissible){var i=this.$slots.close;i||(i=t("span",{attrs:{"aria-label":"Close"}},"x")),n=t("button",{class:"".concat(s,"__close va11y-btn--plain"),on:{click:function(t){e.hide(t)}}},[i])}return t("div",{class:["".concat(s),this.dismissible?"".concat(s,"--dismissible"):""]},[this.$slots.default,n])}},a=27,c=(n(3),"va11y-modal"),l={name:c,props:{visible:{type:Boolean,default:!1},dismissible:{type:Boolean,default:!0}},model:{prop:"visible",event:"change"},methods:{show:function(){this.$emit("show"),this.$emit("change",!0)},hide:function(){this.$emit("hide"),this.$emit("change",!1)},toggle:function(){this.$emit("toggle",this.visible),this.$emit("change",this.visible)},onFocusout:function(t){var e=this.$refs.content,n=e.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');this.visible&&e&&!e.contains(t.relatedTarget)&&n&&n.focus()}},watch:{visible:{handler:function(t,e){var n=this;!0===t&&t!=e&&this.$nextTick(function(){n.$refs.content.focus()})}}},render:function(t){var e=this;if(!this.visible)return t(!1);var n=this.$slots,i=t(!1);if(this.dismissible){var o=this.$slots.close;o||(o=t("span",{attrs:{"aria-label":"Close"}},"x")),i=t("button",{class:"".concat(c,"__close va11y-btn--plain"),on:{click:function(t){e.hide(t)}}},[o])}var s=t("div",{ref:"content",class:"".concat(c),attrs:{tabindex:"-1"},on:{focusout:this.onFocusout}},[i,n.default]);return t("div",{attrs:{role:"dialog","aria-hidden":this.visible?null:"true"},class:"".concat(c,"__wrapper"),on:{click:function(t){t.target.classList.contains("".concat(c,"__wrapper"))&&e.dismissible&&e.hide()},keydown:function(t){t.keyCode===a&&e.hide()}}},[s])}};n.d(e,"Va11yHidden",function(){return u}),n.d(e,"Va11yAlert",function(){return f}),n.d(e,"Va11yModal",function(){return d});e.default={install:function(t,e){t.component(o.name,o),t.component(r.name,r),t.component(l.name,l)}};var u={install:function(t,e){t.component(o.name,o)}},f={install:function(t,e){t.component(r.name,r)}},d={install:function(t,e){t.component(l.name,l)}}}])});