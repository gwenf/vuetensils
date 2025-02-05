/**
 * @param {{ to: string }} props
 * @param {{ attrs: { href: string } }} data
 * @return { string }
 */
function getTag(ref, ref$1) {
  var to = ref.to;
  var attrs = ref$1.attrs;

  if (to) {
    return "RouterLink"
  }
  if (attrs && attrs.href) {
    return "a"
  }
  return "button"
}

var script = {
  name: "VAction",
  functional: true,
  render: function render(h, ref) {
    var data = ref.data;
    var listeners = ref.listeners;
    var props = ref.props;
    var children = ref.children;

    var tag = getTag(props, data);
    var options = Object.assign({}, data,
      {props: props,
      class: ["vts-action"],
      on: listeners});
    if (tag === "RouterLink") {
      options.nativeOn = listeners;
    }

    return h(tag, options, children)
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;

/* template */

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * A simple component for notifiying users of specific information. Good for informative snippets, error messages, and more. It can be shown or hidden dynamically, and even supports auto-hiding after a given time.
 */
var script$1 = {
  name: "VAlert",
  model: {
    prop: "visible",
    event: "update",
  },

  props: {
    /**
     * HTML tag used to wrap the component.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Determines whether the alert is visible. Also binds with `v-model`.
     */
    visible: {
      type: [Boolean, Number],
      default: true,
    },
    /**
     * Allows a user to dismiss this alert.
     */
    dismissible: {
      type: Boolean,
      default: false,
    },
    /**
     * Aria-label that is not visibly, but screen readers will read for the dismiss button.
     */
    dismissLabel: {
      type: [String, Boolean],
      default: "Dismiss this alert",
    },
    /**
     * The transition name if you want to add one.
     */
    transition: {
      type: String,
      default: undefined,
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    dismissed: false,
    timerId: null,
  }); },

  watch: {
    visible: {
      handler: function handler(visible) {
        if (visible) {
          this.dismissed = false;
        }
        if (typeof visible === "number") {
          this.clearTimer(); // Clear timers in case this.visible watcher adds multiples
          this.countdown();
        }
      },
      immediate: true,
    },
  },

  beforeDestroy: function beforeDestroy() {
    this.clearTimer();
  },

  methods: {
    dismiss: function dismiss() {
      /**
       * Fired when a user manually dismissed an alert
       * @event dismiss
       * @type { undefined }
       */
      this.$emit("dismiss");
      this.dismissed = true;
      if (typeof this.visible === "number") {
        this.$emit("update", 0);
        this.clearTimer();
      } else {
        this.$emit("update", false);
      }
    },

    countdown: function countdown() {
      var this$1 = this;

      var ref = this;
      var visible = ref.visible;
      if (visible <= 0) { return }

      this.timerId = setTimeout(function () {
        /**
         * Fired whenever the visibility changes. Either through user interaction, or a countdown timer
         * @event update
         * @type { boolean/number }
         */
        this$1.$emit("update", visible - 1);
      }, 1000);
    },

    clearTimer: function clearTimer() {
      var ref = this;
      var timerId = ref.timerId;
      if (timerId) {
        clearInterval(timerId);
        this.timerId = null;
      }
    },
  },
};

/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.transition}},[(!_vm.dismissed && !!_vm.visible)?_c(_vm.tag,{tag:"component",class:['vts-alert', _vm.classes.root],attrs:{"role":"alert"}},[_vm._t("default"),_vm._v(" "),(_vm.dismissible)?_c('button',{class:['vts-alert__dismiss', _vm.classes.dismiss],attrs:{"aria-label":_vm.dismissLabel},on:{"click":_vm.dismiss}},[_vm._t("dismiss",[_vm._v("\n        ×\n      ")])],2):_vm._e()],2):_vm._e()],1)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = undefined;
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

function randomString(
  length,
  allowed
) {
  if ( length === void 0 ) length = 10;
  if ( allowed === void 0 ) allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var result = "";
  for (var i = 0; i < length; i++) {
    result += allowed.charAt(Math.floor(Math.random() * allowed.length));
  }
  return result
}

function safeSlot(h, slot) {
  return slot && slot.length > 1 ? h("div", slot) : slot
}

//
/**
 * A renderless component for awaiting promises to resolve; great for making HTTP requests. Supports showing pending, resolved, or rejected promises.
 */
var script$2 = {
  name: "VAsync",
  props: {
    /**
     * A promise or function that returns a promise.
     */
    await: {
      type: [Promise, Function],
      default: function () { return Promise.resolve(); },
    },
    /**
     * The default value to provide for the `results`. Useful if the promise resolve value is undefined.
     */
    default: {
      type: undefined,
      default: undefined,
    },
  },

  data: function data() {
    return {
      pending: false,
      results: this.default,
      error: null,
      done: false,
    }
  },

  watch: {
    await: {
      handler: "awaitOn",
      immediate: true,
    },

    pending: {
      handler: function handler(pending) {
        /**
         * Fired whenever the pending status changes.
         * @event pending
         * @type { boolean }
         */
        this.$emit("pending", pending);
      },
      immediate: true,
    },
  },

  methods: {
    awaitOn: function awaitOn(promise) {
      var this$1 = this;

      if (!promise) { return }

      promise = typeof promise === "function" ? promise() : promise;

      if (!promise.then) { return }

      this.pending = true;
      this.results = this.default;
      this.error = null;

      return promise
        .then(function (results) {
          this$1.results = typeof results === "undefined" ? this$1.default : results;
          /**
           * Fired after promise has resolved with the resolved value.
           * @event resolve
           * @type { unknown }
           */
          this$1.$emit("resolve", results);
        })
        .catch(function (error) {
          if (error instanceof Error) {
            error = {
              name: error.name,
              message: error.message,
            };
          }
          this$1.error = error;
          /**
           * Fired after promise has rejected with the rejected error.
           * @event reject
           * @type { error }
           */
          this$1.$emit("reject", error);
        })
        .finally(function () {
          this$1.pending = false;
          this$1.done = true;
          /**
           * Fired after promise has fulfilled, regardless of success or failure.
           * @event finally
           * @type { undefined }
           */
          this$1.$emit("finally");
        })
    },
  },

  render: function render(h) {
    var ref = this;
    var pending = ref.pending;
    var error = ref.error;
    var results = ref.results;
    var done = ref.done;

    /** @slot Rendered while the promise is in a pending state */
    var pendingSlot = this.$scopedSlots.pending;
    /** @slot Rendered when the promise has rejected. Provides the caught error. */
    var rejectedSlot = this.$scopedSlots.rejected;
    /** @slot Rendered when the promise has resolved. Provides the results. */
    var resolvedSlot = this.$scopedSlots.resolved;
    /** @slot Provides the status of the component for pending state, error, or results. */
    var defaultSlot = this.$scopedSlots.default;

    if (pending && pendingSlot) {
      return safeSlot(h, pendingSlot())
    }

    if (done && error && rejectedSlot) {
      return safeSlot(h, rejectedSlot(error))
    }

    if (done && !error && resolvedSlot) {
      return safeSlot(h, resolvedSlot(results))
    }

    if (!defaultSlot) { return }

    return safeSlot(
      h,
      defaultSlot({
        pending: pending,
        results: results,
        error: error,
      })
    )
  },
};

/* script */
var __vue_script__$2 = script$2;

/* template */

  /* style */
  var __vue_inject_styles__$2 = undefined;
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = undefined;
  /* functional template */
  var __vue_is_functional_template__$2 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$3 = {
  // https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html
};

var isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return function (id, style) { return addStyle(id, style); };
}
var HEAD;
var styles = {};
function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        var code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                { style.element.setAttribute('media', css.media); }
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            var index = style.ids.size - 1;
            var textNode = document.createTextNode(code);
            var nodes = style.element.childNodes;
            if (nodes[index])
                { style.element.removeChild(nodes[index]); }
            if (nodes.length)
                { style.element.insertBefore(textNode, nodes[index]); }
            else
                { style.element.appendChild(textNode); }
        }
    }
}

/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)};
var __vue_staticRenderFns__$1 = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"datepicker",attrs:{"id":"myDatepicker"}},[_c('div',{staticClass:"date"},[_c('label',{attrs:{"for":"id-textbox-1"}},[_vm._v("\n      Date\n      "),_c('input',{attrs:{"id":"id-textbox-1","type":"text","placeholder":"mm/dd/yyyy","aria-autocomplete":"none"}})]),_vm._v(" "),_c('button',{staticClass:"icon",attrs:{"aria-label":"Choose Date"}},[_vm._v("\n      calendar btn\n    ")])]),_vm._v(" "),_c('div',{staticClass:"datepickerDialog",attrs:{"id":"id-datepicker-1","role":"dialog","aria-modal":"true","aria-labelledby":"id-dialog-label"}},[_c('div',{staticClass:"header"},[_c('button',{staticClass:"prevYear",attrs:{"aria-label":"previous year"}},[_c('span',{staticClass:"fas fa-angle-double-left fa-lg"})]),_vm._v(" "),_c('button',{staticClass:"prevMonth",attrs:{"aria-label":"previous month"}},[_c('span',{staticClass:"fas fa-angle-left fa-lg"})]),_vm._v(" "),_c('h2',{staticClass:"monthYear",attrs:{"id":"id-dialog-label","aria-live":"polite"}},[_vm._v("\n        Month Year\n      ")]),_vm._v(" "),_c('button',{staticClass:"nextMonth",attrs:{"aria-label":"next month"}},[_c('span',{staticClass:"fas fa-angle-right fa-lg"})]),_vm._v(" "),_c('button',{staticClass:"nextYear",attrs:{"aria-label":"next year"}},[_c('span',{staticClass:"fas fa-angle-double-right fa-lg"})])]),_vm._v(" "),_c('table',{staticClass:"dates",attrs:{"id":"myDatepickerGrid","role":"grid","aria-labelledby":"id-dialog-label"}},[_c('thead',[_c('tr',[_c('th',{attrs:{"scope":"col","abbr":"Sunday"}},[_vm._v("\n            Su\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Monday"}},[_vm._v("\n            Mo\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Tuesday"}},[_vm._v("\n            Tu\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Wednesday"}},[_vm._v("\n            We\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Thursday"}},[_vm._v("\n            Th\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Friday"}},[_vm._v("\n            Fr\n          ")]),_vm._v(" "),_c('th',{attrs:{"scope":"col","abbr":"Saturday"}},[_vm._v("\n            Sa\n          ")])])]),_vm._v(" "),_c('tbody',[_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              25\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              26\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              27\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              28\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              29\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              30\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              1\n            ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              2\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              3\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              4\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              5\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              6\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              7\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              8\n            ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              9\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              10\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              11\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              12\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              13\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"0"}},[_vm._v("\n              14\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              15\n            ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              16\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              17\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              18\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              19\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              20\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              21\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              22\n            ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              23\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              24\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              25\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              26\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              27\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              28\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              29\n            ")])])]),_vm._v(" "),_c('tr',[_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              30\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1"}},[_vm._v("\n              31\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              1\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              2\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              3\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              4\n            ")])]),_vm._v(" "),_c('td',{staticClass:"dateCell"},[_c('button',{staticClass:"dateButton",attrs:{"tabindex":"-1","disabled":""}},[_vm._v("\n              5\n            ")])])])])]),_vm._v(" "),_c('div',{staticClass:"dialogButtonGroup"},[_c('button',{staticClass:"dialogButton",attrs:{"value":"cancel"}},[_vm._v("\n        Cancel\n      ")]),_vm._v(" "),_c('button',{staticClass:"dialogButton",attrs:{"value":"ok"}},[_vm._v("\n        OK\n      ")])]),_vm._v(" "),_c('div',{staticClass:"message",attrs:{"aria-live":"polite"}},[_vm._v("\n      Test\n    ")])])])}];

  /* style */
  var __vue_inject_styles__$3 = function (inject) {
    if (!inject) { return }
    inject("data-v-441050f0_0", { source: ".datepicker{margin-top:1em;position:relative}.datepicker button.icon{padding:4px;margin:0;border:transparent 2px solid;border-radius:5px;text-align:left;background-color:#fff;position:relative;left:-4px;top:3px}.datepicker button.icon:focus{outline:0;border-color:#3079e8}.datepicker span.arrow{margin:0;padding:0;display:none;background:0 0}.datepicker input{margin:0;width:20%}.datepicker .datepickerDialog{position:absolute;width:45%;clear:both;display:none;border:3px solid #3079e8;margin-top:1em;border-radius:5px;padding:0;background-color:#fff}.datepicker .header{cursor:default;background-color:#3079e8;padding:7px;font-weight:700;text-transform:uppercase;color:#fff;display:flex;justify-content:space-around}.datepicker .header h2{margin:0;padding:0;display:inline-block;font-size:1em;color:#fff;text-transform:none;font-weight:700}.datepicker .header button{border-style:none;background:0 0}.datepicker .datepickerDialog button::-moz-focus-inner{border:0}.datepicker .nextMonth,.datepicker .nextYear,.datepicker .prevMonth,.datepicker .prevYear{padding:4px;width:24px;height:24px;color:#fff}.datepicker .nextMonth:focus,.datepicker .nextYear:focus,.datepicker .prevMonth:focus,.datepicker .prevYear:focus{padding:2px;border:2px solid #fff;border-radius:4px;outline:0}.datepicker .dialogButtonGroup{text-align:right;margin-top:1em;margin-bottom:1em;margin-right:1em}.datepicker .dialogButton{padding:5px;margin-left:1em;width:5em;background-color:#dae7fa;font-size:.85em;color:#000;outline:0;border:1px solid #dae7fa;border-radius:5px}.datepicker .dialogButton:focus{padding:4px;border:2px solid #000}.datepicker .fa-calendar-alt{color:#78aaf7}.datepicker .monthYear{display:inline-block;width:12em;text-align:center}.datepicker table.dates{width:100%;padding-left:1em;padding-right:1em;padding-top:1em}.datepicker table.dates td,.datepicker table.dates th{text-align:center}.datepicker .dateRow{border:1px solid #000}.datepicker .dateCell{outline:0;border:0;padding:0;margin:0;height:40px;width:40px}.datepicker .dateButton{padding:0;margin:0;line-height:inherit;height:100%;width:100%;border:1px solid #eee;border-radius:5px;font-size:15px;background:#eee}.datepicker .dateButton:focus,.datepicker .dateButton:hover{padding:0;background-color:#dae7fa}.datepicker .dateButton:focus{border-width:2px;border-color:#646464;outline:0}.datepicker .dateButton[aria-selected]{border-color:#646464}.datepicker .dateButton[tabindex=\"0\"]{background-color:#dae7fa}.datepicker .disabled{color:#afafaf}.datepicker .disabled:hover{color:#000}.datepicker .dateButton:disabled{color:#777;background-color:#fff;border:none;cursor:not-allowed}.datepicker .message{padding-top:.25em;padding-left:1em;height:1.75em;background:#3079e8;color:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = undefined;
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    createInjector,
    undefined,
    undefined
  );

var keycodes = {
  ENTER: 13,
  SPACE: 32,
  TAB: 9,
  ESC: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

var FOCUSABLE = [
  "a[href]",
  "area[href]",
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  "select:not([disabled]):not([aria-hidden])",
  "textarea:not([disabled]):not([aria-hidden])",
  "button:not([disabled]):not([aria-hidden])",
  "iframe",
  "object",
  "embed",
  "[contenteditable]",
  '[tabindex]:not([tabindex^="-"])'
];

var NAME = "vts-dialog";
/**
 * A dialog component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the dialog until it is closed. It supports being closed by clicking outside the dialog content or pressing the ESC key.
 */
var script$4 = {
  name: "VDialog",
  inheritAttrs: false,

  model: {
    prop: "showing",
    event: "update",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the dialog content.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Flag to enable/prevent the dialog from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the dialog to.
     */
    width: {
      type: String,
      default: "",
    },
    /**
     * CSS max-width to set the dialog to.
     */
    maxWidth: {
      type: String,
      default: "",
    },
    /**
     * Prevents the page from being scrolled while the dialog is open.
     */
    noScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * Transition name to apply to the dialog.
     */
    transition: {
      type: String,
      default: "",
    },
    /**
     * Transition name to apply to the background.
     */
    bgTransition: {
      type: String,
      default: "",
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localShow: this.showing,
      activeElement: null,
    }
  },

  watch: {
    showing: function showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler: function handler(next, prev) {
        if (typeof window === "undefined") { return }

        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();

          var ref = this;
          var activeElement = ref.activeElement;
          if (activeElement && activeElement.focus) {
            this.$nextTick(function () {
              activeElement.focus();
            });
          }
        }

        this.$emit("update", next);
      },
    },
  },

  destroyed: function destroyed() {
    this.onClose();
  },

  methods: {
    onOpen: function onOpen() {
      var this$1 = this;

      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.addEventListener("click", onClick);
      window.addEventListener("keydown", onKeydown);
      noScroll && document.body.style.setProperty("overflow", "hidden");
      this.$nextTick(function () { return this$1.$refs.content.focus(); });
    },
    onClose: function onClose() {
      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeydown);
      noScroll && document.body.style.removeProperty("overflow");
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains("vts-dialog") && this.dismissible) {
        this.localShow = false;
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          var focusedItemIndex = focusable.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    },
  },

  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var localShow = ref.localShow;
    var $scopedSlots = ref.$scopedSlots;
    var classes = ref.classes;

    if (!localShow && !$scopedSlots.toggle) {
      return h(false)
    }

    var children = [];

    if ($scopedSlots.toggle) {
      children.push(
        $scopedSlots.toggle({
          on: {
            click: function () { return (this$1.localShow = true); },
          },
          bind: {
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
          attrs: {
            // TODO: deprecated
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
        })
      );
    }

    if (localShow) {
      var content = h(
        this.tag,
        {
          ref: "content",
          class: [(NAME + "__content"), classes.content],
          style: {
            width: this.width,
            maxWidth: this.maxWidth,
          },
          attrs: {
            tabindex: "-1",
            role: "dialog",
          },
        },
        [this.$slots.default]
      );
      content = h(
        "transition",
        {
          props: { name: this.transition },
        },
        [content]
      );

      var modal = h(
        "div",
        {
          class: [NAME, classes.root, classes.bg, this.$attrs.class],
        },
        [content]
      );

      children.push(
        h(
          "transition",
          {
            props: { name: this.bgTransition, appear: true },
          },
          [modal]
        )
      );
    }

    return h("span", children)
  },
};

/* script */
var __vue_script__$4 = script$4;

/* template */

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-47e30c7e_0", { source: ".vts-dialog{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;top:0;right:0;bottom:0;left:0}.vts-dialog__content:focus{outline:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = undefined;
  /* functional template */
  var __vue_is_functional_template__$4 = undefined;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    createInjector,
    undefined,
    undefined
  );

var NAME$1 = "vts-drawer";

/**
 * A convenient sidebar that can be toggled on or off. When opened, it traps the user's focus so that keyboard navigation will remain within the sidebar until it is closed. It also supports being closed by pressing the ESC key.
 */
var script$5 = {
  name: "VDrawer",
  model: {
    prop: "showing",
    event: "update",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    tag: {
      type: String,
      default: "aside",
    },
    /**
     * Flag to place the drawer on the right side.
     */
    right: Boolean,
    /**
     * CSS width value.
     */
    width: {
      type: String,
      default: "",
    },
    /**
     * CSS max-width value.
     */
    maxWidth: {
      type: String,
      default: "",
    },
    /**
     * Disable page scrolling when drawer is open.
     */
    noScroll: Boolean,
    /**
     * Vue transition name.
     */
    transition: {
      type: String,
      default: "",
    },
    /**
     * Vue transition name for the background.
     */
    bgTransition: {
      type: String,
      default: "",
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localShow: this.showing,
      activeElement: null,
    }
  },

  watch: {
    showing: function showing(next) {
      this.localShow = next;
    },
    localShow: {
      handler: function handler(next, prev) {
        if (typeof window === "undefined") { return }

        if (next && next != prev) {
          this.activeElement = document.activeElement;
          this.onOpen();
        } else {
          this.onClose();

          var ref = this;
          var activeElement = ref.activeElement;
          if (activeElement && activeElement.focus) {
            this.$nextTick(function () {
              activeElement.focus();
            });
          }
        }

        this.$emit("update", next);
      },
    },
  },

  destroyed: function destroyed() {
    this.onClose();
  },

  methods: {
    onOpen: function onOpen() {
      var this$1 = this;

      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.addEventListener("click", onClick);
      window.addEventListener("keydown", onKeydown);
      noScroll && document.body.style.setProperty("overflow", "hidden");
      this.$nextTick(function () { return this$1.$refs.content.focus(); });
    },
    onClose: function onClose() {
      var ref = this;
      var onClick = ref.onClick;
      var onKeydown = ref.onKeydown;
      var noScroll = ref.noScroll;
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeydown);
      noScroll && document.body.style.removeProperty("overflow");
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains(NAME$1)) {
        this.localShow = false;
      }
    },
    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.localShow = false;
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          var focusedItemIndex = focusable.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    },
  },

  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var localShow = ref.localShow;
    var $scopedSlots = ref.$scopedSlots;
    var classes = ref.classes;

    if (!localShow && !$scopedSlots.toggle) {
      return h(false)
    }

    var children = [];

    if ($scopedSlots.toggle) {
      children.push(
        $scopedSlots.toggle({
          on: {
            click: function () { return (this$1.localShow = true); },
          },
          bind: {
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
          attrs: {
            // TODO: deprecated
            type: "button",
            role: "button",
            "aria-haspopup": true,
            "aria-expanded": "" + localShow,
          },
        })
      );
    }

    if (localShow) {
      var content = h(
        this.tag,
        {
          ref: "content",
          class: [
            (NAME$1 + "__content"),
            { "vts-drawer__content--right": !!this.right },
            classes.content ],
          style: {
            width: this.width,
            maxWidth: this.maxWidth,
          },
          attrs: {
            tabindex: "-1",
            // role: "dialog", // TODO: ?
          },
        },
        [this.$slots.default]
      );
      content = h(
        "transition",
        {
          props: { name: this.transition, appear: true },
        },
        [content]
      );

      var component = h(
        "div",
        {
          class: [NAME$1, classes.root, classes.bg, this.$attrs.class],
        },
        [content]
      );

      children.push(
        h(
          "transition",
          {
            props: { name: this.bgTransition, appear: true },
          },
          [component]
        )
      );
    }

    return h("span", children)
  },
};

/* script */
var __vue_script__$5 = script$5;

/* template */

  /* style */
  var __vue_inject_styles__$5 = function (inject) {
    if (!inject) { return }
    inject("data-v-290fdc7a_0", { source: ".vts-drawer{position:fixed;z-index:100;top:0;right:0;bottom:0;left:0}.vts-drawer__content{overflow:auto;max-width:300px;height:100%}.vts-drawer__content:focus{outline:0}.vts-drawer__content--right{margin-left:auto}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = undefined;
  /* functional template */
  var __vue_is_functional_template__$5 = undefined;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Adds a button that can show/hide dropdown content when it is hovered over, or clicked. When it is clicked, the content will persist until the user clicks out or focuses out. Includes relevant ARIA attributes for the hidden content.
 */
var script$6 = {
  name: "VDrawer",
  props: {
    /**
     * The toggle button text.
     */
    text: {
      type: String,
      default: "",
    },
    /**
     * Where the content should be placed in relation to the button.
     *
     * Options: 'bottom', 'top'
     */
    position: {
      type: String,
      default: "bottom",
      validator: function validator(value) {
        return ["top", "bottom"].includes(value)
      },
    },
    /**
     * The transition name.
     */
    transition: {
      type: String,
      default: "",
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    isHovered: false,
    isFocused: false,
  }); },

  mounted: function mounted() {
    var ref = this;
    var onClickout = ref.onClickout;
    document.addEventListener("click", onClickout);
    this.$once("hook:beforeDestroy", function () {
      document.removeEventListener("click", onClickout);
    });
  },

  methods: {
    onClickout: function onClickout(e) {
      if (!this.$el.contains(e.target)) {
        this.isFocused = false;
      }
    },

    onFocusout: function onFocusout(event) {
      if (!this.$el.contains(event.relatedTarget)) {
        this.isFocused = false;
      }
    },
  },
};

/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-dropdown', _vm.classes.root],on:{"mouseenter":function($event){_vm.isHovered = true;},"mouseleave":function($event){_vm.isHovered = false;},"focus":function($event){_vm.isFocused = true;},"blur":function($event){_vm.isFocused = false;},"focusout":_vm.onFocusout}},[_c('button',{class:['vts-dropdown__trigger', _vm.classes.trigger],attrs:{"aria-expanded":!!_vm.isHovered || !!_vm.isFocused,"aria-haspopup":"true"},on:{"click":function($event){_vm.isFocused = !_vm.isFocused;}}},[_vm._t("trigger",[_vm._v("\n      "+_vm._s(_vm.text)+"\n    ")])],2),_vm._v(" "),_c('transition',{attrs:{"name":_vm.transition}},[(!!_vm.isHovered || !!_vm.isFocused)?_c('div',{staticClass:"vts-dropdown__content",class:[("vts-dropdown__content--" + _vm.position), _vm.classes.content]},[_vm._t("default")],2):_vm._e()])],1)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$6 = function (inject) {
    if (!inject) { return }
    inject("data-v-3f410af4_0", { source: ".vts-dropdown{display:inline-block;position:relative}.vts-dropdown__content{position:absolute;z-index:5;min-width:100%}.vts-dropdown__content--top{top:0;transform:translateY(-100%)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = undefined;
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$7 = {
  name: "VFile",
  model: {
    prop: "files",
    event: "update",
  },

  props: {
    label: {
      type: String,
      required: true
    },

    files: {
      type: Array,
      default: function () { return []; }
    },

    classes: {
      type: Object,
      default: function () { return ({}); }
    },
  },

  data: function () { return ({
    localFiles: [],
    droppable: false,
  }); },

  watch: {
    files: function files(files$1) {
      this.localFiles = files$1;
    },
    localFiles: function localFiles() {
      this.droppable = false;
    },
  },

  created: function created() {
    this.id = this.$attrs.id || 'vts-' + randomString(4);
  },

  methods: {
    onChange: function onChange(event) {
      var files = Array.from(event.target.files);
      this.localFiles = files;
      this.$emit("update", files);
    },

    onDrop: function onDrop(event) {
      var files = Array.from(event.dataTransfer.files);
      var isMulti = this.$attrs.multiple != null;
      if (!isMulti && files.length > 1) {
        files.length = 1;
      }
      this.localFiles = files;
      this.$emit("update", files);
    },

    // clear() {
    //   this.localFiles = []
    //   this.$refs.input.value = null
    //   this.$emit("update", [])
    // },
  },
};

/* script */
var __vue_script__$7 = script$7;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:[
    'vts-file',
    {
      'vts-file--droppable': _vm.droppable,
      'vts-file--selected': !!_vm.localFiles.length,
    },
    _vm.classes.label ],attrs:{"for":_vm.id}},[_c('input',_vm._g(_vm._b({ref:"input",class:['vts-file__input', _vm.classes.input],attrs:{"id":_vm.id,"type":"file"},on:{"change":_vm.onChange}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('span',{class:['vts-file__text', _vm.classes.text]},[_vm._t("label",[_vm._v(_vm._s(_vm.label))])],2),_vm._v(" "),_c('div',{staticClass:"vts-file__dropzone",on:{"dragenter":function($event){$event.preventDefault();_vm.droppable = true;}}},[_vm._t("default",[(_vm.localFiles.length)?_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("\n        "+_vm._s(_vm.localFiles.length > 1
            ? ((_vm.localFiles.length) + " files selected")
            : _vm.localFiles[0].name)+"\n      ")]):_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("\n        Choose files or drop here\n      ")])],null,{ files: _vm.localFiles, droppable: _vm.droppable }),_vm._v(" "),(_vm.droppable)?_c('span',{staticClass:"vts-file__overlay",on:{"drop":function($event){$event.preventDefault();return _vm.onDrop($event)},"dragenter":function($event){$event.stopPropagation();_vm.droppable = true;},"dragleave":function($event){$event.stopPropagation();_vm.droppable = false;},"dragover":function($event){$event.preventDefault();}}},[_vm._t("overlay")],2):_vm._e()],2)])};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$7 = function (inject) {
    if (!inject) { return }
    inject("data-v-95ee0afc_0", { source: ".vts-file__input{position:absolute;overflow:hidden;clip:rect(0 0 0 0);width:1px;height:1px;margin:-1px;border:0;padding:0}.vts-file__dropzone{position:relative}.vts-file__overlay{position:absolute;top:0;right:0;bottom:0;left:0}input:focus~.vts-file__dropzone{outline-width:1px;outline-style:auto;outline-color:Highlight;outline-color:-webkit-focus-ring-color}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$7 = undefined;
  /* module identifier */
  var __vue_module_identifier__$7 = undefined;
  /* functional template */
  var __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$7 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script$8 = {
  name: "VForm",
  props: {
    lazy: Boolean,
  },

  data: function () { return ({
    dirty: false,
    localInputs: {},
  }); },

  computed: {
    event: function event() {
      return this.lazy ? "change" : "input"
    },

    valid: function valid() {
      return !Object.values(this.localInputs).find(function (input) { return !input.valid; })
    },

    error: function error() {
      return !this.valid && this.dirty
    },

    inputs: function inputs() {
      var inputs = {};
      var ref = this;
      var localInputs = ref.localInputs;

      for (var key in localInputs) {
        var input = localInputs[key];
        inputs[key] = Object.assign({}, input,
          {error: input.dirty && !input.valid});
      }
      return inputs
    },
  },

  mounted: function mounted() {
    var this$1 = this;

    var els = Array.from(this.$el.querySelectorAll("input, textarea, select"));

    var localInputs = {};

    els.forEach(function (input) {
      var name = input.name || randomString(6);
      var validity = input.validity;

      localInputs[name] = {
        value: input.value,
        valid: input.validity.valid,
        dirty: false,
        invalid: {
          type: validity.typeMismatch,
          required: validity.valueMissing,
          minlength: validity.tooShort,
          maxlength: validity.tooLong,
          min: validity.rangeOverflow,
          max: validity.rangeUnderflow,
          pattern: validity.patternMismatch,
        },
      };

      input.addEventListener("blur", this$1.onBlur, { once: true });
      this$1.$once("hook:beforeDestroy", function () {
        input.removeEventListener("blur", this$1.onBlur);
      });
    });
    this.localInputs = localInputs;
  },

  methods: {
    onEvent: function onEvent(ref) {
      var target = ref.target;

      var ref$1 = this;
      var localInputs = ref$1.localInputs;
      var validity = target.validity;

      localInputs[target.name] = Object.assign({}, localInputs[target.name],
        {value: target.value,
        valid: target.validity.valid,
        invalid: {
          type: validity.typeMismatch,
          required: validity.valueMissing,
          minlength: validity.tooShort,
          maxlength: validity.tooLong,
          min: validity.rangeOverflow,
          max: validity.rangeUnderflow,
          pattern: validity.patternMismatch,
        }});
      this.localInputs = localInputs;
    },
    onBlur: function onBlur(ref) {
      var target = ref.target;

      this.dirty = true;
      this.localInputs[target.name].dirty = true;
    },

    clear: function clear() {
      var els = Array.from(
        this.$el.querySelectorAll("input, textarea, select")
      );
      els.forEach(function (input) {
        input.value = "";
      });
    },
  },
};

/* script */
var __vue_script__$8 = script$8;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',_vm._g(_vm._b({class:[
    'vts-form',
    {
      'vts-form--invalid': !_vm.valid,
      'vts-form--dirty': _vm.dirty,
      'vts-form--error': _vm.error,
    } ],attrs:{"method":_vm.$attrs.method || 'POST'},on:_vm._d({},[_vm.event,_vm.onEvent])},'form',_vm.$attrs,false),_vm.$listeners),[_vm._t("default",null,null,{ valid: _vm.valid, dirty: _vm.dirty, error: _vm.error, inputs: _vm.inputs, clear: _vm.clear })],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$8 = undefined;
  /* scoped */
  var __vue_scope_id__$8 = undefined;
  /* module identifier */
  var __vue_module_identifier__$8 = undefined;
  /* functional template */
  var __vue_is_functional_template__$8 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$8 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var NAME$2 = "vts-img";

/**
 * Drop in replacement for the HTML `<img>` tag which supports lazy-loading. Improves load times by waiting for the image to scroll into view before actually downloading it.
 *
 Note: This component uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) which is not supported by Internet Explorer.
 */
var script$9 = {
  name: "VImg",
  inheritAttrs: false,
  // functional: true, // TODO

  props: {
    /**
     * Same as the HTML attribute
     */
    src: {
      type: String,
      required: true,
    },
    /**
     * Same as the HTML attribute
     */
    srcset: {
      type: String,
      default: "",
    },
    /**
     * URL of the blurred placeholder image to use if you need one (ideally a very small image).
     */
    placeholder: {
      type: String,
      default: "",
    },
    /**
     * CSS background styles for the placeholder in case you just want colors.
     */
    background: {
      type: String,
      default: "",
    },

    transitionDuration: {
      type: [Number, String],
      default: 300,
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  computed: {
    dataUrl: function dataUrl() {
      var ref = this.$attrs;
      var width = ref.width;
      var height = ref.height;
      if (!width || !height) { return "" }

      var w = 100;
      var canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = (height / width) * w;

      return canvas.toDataURL()
    },
  },

  watch: {
    src: {
      handler: "init",
    },
    srcset: {
      handler: "init",
    },
  },

  mounted: function mounted() {
    this.init();
  },

  methods: {
    init: function init() {
      var this$1 = this;

      this.observer = new IntersectionObserver(this.handler);
      this.observer.observe(this.$el);

      this.$once("hook:beforeDestroy", function () {
        this$1.observer.disconnect();
      });
    },

    handler: function handler(ref) {
      var entry = ref[0];

      var ref$1 = this;
      var $el = ref$1.$el;

      if (entry.isIntersecting) {
        // Element is in viewport
        $el.classList.add((NAME$2 + "--loading"));
        this.loadImg();
        this.observer.disconnect();
      }
    },

    loadImg: function loadImg() {
      var ref = this;
      var src = ref.src;
      var srcset = ref.srcset;
      var ref$1 = this.$refs;
      var img = ref$1.img;

      img.addEventListener("load", this.onLoad);

      if (srcset) {
        img.srcset = srcset;
      }
      img.src = src;
    },

    onLoad: function onLoad() {
      var ref = this;
      var $el = ref.$el;
      var ref$1 = this.$refs;
      var img = ref$1.img;
      var placeholder = ref$1.placeholder;

      $el.classList.remove((NAME$2 + "--loading"));
      $el.classList.add((NAME$2 + "--loaded"));

      if (placeholder) {
        img.addEventListener("transitionend", function onTransitionEnd() {
          placeholder.remove();
          img.removeEventListener("transitionend", onTransitionEnd);
        });
      }

      img.removeEventListener("load", this.onLoad);
    },
  },
};

/* script */
var __vue_script__$9 = script$9;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('picture',{class:['vts-img', _vm.classes.root]},[(_vm.dataUrl)?_c('div',{ref:"placeholder",class:['vts-img__placeholder', _vm.classes.placeholder],style:({ background: _vm.background })},[_c('img',_vm._b({attrs:{"src":_vm.placeholder || _vm.dataUrl,"alt":""}},'img',_vm.$attrs,false))]):_vm._e(),_vm._v(" "),_c('img',_vm._g(_vm._b({ref:"img",class:['vts-img__img', _vm.classes.img],style:({
      transitionDuration: (_vm.transitionDuration + "ms"),
    }),attrs:{"src":_vm.dataUrl,"alt":_vm.$attrs.alt || ''}},'img',_vm.$attrs,false),_vm.$listeners))])};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$9 = function (inject) {
    if (!inject) { return }
    inject("data-v-acb22332_0", { source: ".vts-img{display:inline-block;position:relative}.vts-img img{vertical-align:top}.vts-img__placeholder{position:absolute;overflow:hidden}.vts-img__placeholder img{transform:scale(1.05);filter:blur(10px)}.vts-img__img{opacity:0;transition-property:opacity;transition-timing-function:ease}.vts-img--loaded .vts-img__img{opacity:1}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$9 = undefined;
  /* module identifier */
  var __vue_module_identifier__$9 = undefined;
  /* functional template */
  var __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$9 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

//

/**
 * Input component that automatically includes labels, validation, and aria descriptions for any errors.
 */
var script$a = {
  name: "VInput",
  inheritAttrs: false,

  model: {
    event: "update",
  },

  props: {
    /**
     * Every input should have a label with the exception of `radio` which supports labels for the `options` prop.
     */
    label: {
      type: String,
      required: true,
    },

    /**
     * The input value. Works for all inputs except type `radio`. See `options` prop.
     */
    value: {
      type: [String, Number, Boolean, Array],
      default: "",
    },

    /**
     * An array of options used for inputs of type `radio` or type `select`
     */
    options: {
      type: Array,
      default: function () { return []; },
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      localValue: this.value, // Required for weird bug when nested in VForm
      valid: true,
      anyInvalid: false, // TODO: deprecate
      dirty: false,
      invalid: {},
    }
  },

  computed: {
    tag: function tag() {
      var ref = this.$attrs;
      var type = ref.type;
      if (type === "textarea") {
        return "textarea"
      }
      if (type === "select") {
        return "select"
      }
      return "input"
    },

    computedOptions: function computedOptions() {
      var this$1 = this;

      return this.options.map(function (item) {
        // Each item should be an object with at least value and label which we can bind to later
        item = typeof item === "object" ? item : { value: item };
        Object.assign(item, this$1.$attrs);
        item.label = item.label || item.value;
        item.name = item.name || this$1.id;
        item.required = true;
        return item
      })
    },

    isMultiple: function isMultiple() {
      var ref = this.$attrs;
      var multiple = ref.multiple;
      return multiple != null && multiple != "false"
    },

    error: function error() {
      return !this.valid && this.dirty
    },
  },

  watch: {
    value: function value(next) {
      this.localValue = next;
    },
    localValue: {
      handler: "validate",
    },
  },

  created: function created() {
    // Might cause an issue with SSR
    var ref = this.$attrs;
    var id = ref.id;
    var name = ref.name;
    this.id = id || "vts-" + randomString(4);
    this.name = name || this.id;
  },

  mounted: function mounted() {
    this.validate();
  },

  methods: {
    onInput: function onInput(ref) {
      var target = ref.target;

      var ref$1 = this.$attrs;
      var type = ref$1.type;
      var isMultiple = this.isMultiple;

      var value;

      if (type === "checkbox") {
        value = target.checked;
      } else if (type === "select" && isMultiple) {
        value = [];
        target.options.forEach(function (option) {
          // for of not supported
          if (option.selected) {
            value.push(option.value);
          }
        });
      } else {
        value = target.value;
      }

      /**
       * @event update
       * @type { any }
       */
      this.$emit("update", value);
      this.validate();
    },

    validate: function validate() {
      var input = this.$refs.input;
      if (Array.isArray(input)) { return }

      var validity = input.validity;

      // https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/

      this.anyInvalid = !validity.valid; // TODO: deprecate
      this.valid = validity.valid;
      this.invalid = {
        type: validity.typeMismatch,
        required: validity.valueMissing,
        minlength: validity.tooShort,
        maxlength: validity.tooLong,
        min: validity.rangeOverflow,
        max: validity.rangeUnderflow,
        pattern: validity.patternMismatch,
      };
    },
  },
};

/* script */
var __vue_script__$a = script$a;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[
    'vts-input',
    ("vts-input--" + (_vm.$attrs.type || 'text')),
    {
      'vts-input--required': _vm.$attrs.hasOwnProperty('required'),
      'vts-input--invalid': !_vm.valid,
      'vts-input--dirty': _vm.dirty,
      'vts-input--error': _vm.error,
    },
    _vm.classes.root ]},[(_vm.$attrs.type === 'radio')?_c('fieldset',{class:['vts-input__fieldset', _vm.classes.fieldset]},[(_vm.label)?_c('legend',{class:['vts-input__legend', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.computedOptions),function(option,index){return _c('label',{key:option.value,class:['vts-input__label', _vm.classes.label],attrs:{"for":(_vm.id + "__input-" + index)}},[_c('input',_vm._g(_vm._b({ref:"input",refInFor:true,class:['vts-input__input', _vm.classes.input],attrs:{"id":(_vm.id + "__input-" + index),"type":_vm.$attrs.type,"name":option.name,"aria-invalid":!_vm.valid,"aria-describedby":_vm.error && (_vm.id + "__description")},domProps:{"checked":_vm.localValue === option.value,"value":option.value},on:{"input":function($event){return _vm.$emit('update', option.value)},"~blur":function($event){_vm.dirty = true;}}},'input',_vm.$attrs,false),_vm.$listeners)),_vm._v(" "),_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n        "+_vm._s(option.label)+"\n      ")])])})],2):_c('label',{class:['vts-input__label', _vm.classes.label],attrs:{"for":(_vm.id + "__input")}},[(_vm.$attrs.type !== 'checkbox')?_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e(),_vm._v(" "),(_vm.$attrs.type === 'select')?_c('select',_vm._g(_vm._b({ref:"input",class:['vts-input__input', _vm.classes.input],attrs:{"id":(_vm.id + "__input"),"name":_vm.name,"aria-invalid":!_vm.valid,"aria-describedby":_vm.error && (_vm.id + "__description")},on:{"blur":_vm.onInput,"~blur":function($event){_vm.dirty = true;}}},'select',_vm.$attrs,false),_vm.$listeners),_vm._l((_vm.computedOptions),function(option,i){return _c('option',_vm._b({key:i,domProps:{"selected":_vm.localValue.includes(option.value)}},'option',option,false),[_vm._v("\n        "+_vm._s(option.label)+"\n      ")])}),0):_c(_vm.tag,_vm._g(_vm._b({ref:"input",tag:"component",class:['vts-input__input', _vm.classes.input],attrs:{"id":(_vm.id + "__input"),"value":_vm.localValue,"aria-invalid":!_vm.valid,"aria-describedby":_vm.error && (_vm.id + "__description"),"checked":_vm.$attrs.type === 'checkbox' && _vm.localValue === true},on:{"input":_vm.onInput,"~blur":function($event){_vm.dirty = true;}}},'component',_vm.$attrs,false),_vm.$listeners),[(_vm.tag === 'textarea')?[_vm._v("\n        "+_vm._s(_vm.localValue)+"\n      ")]:_vm._e()],2),_vm._v(" "),(_vm.$attrs.type === 'checkbox')?_c('span',{class:['vts-input__text', _vm.classes.text]},[_vm._v("\n      "+_vm._s(_vm.label)+"\n    ")]):_vm._e()],1),_vm._v(" "),(_vm.$scopedSlots.description)?_c('div',{class:['vts-input__description', _vm.classes.description],attrs:{"id":(_vm.id + "__description"),"role":"alert"}},[_vm._t("description",null,null,{ valid: _vm.valid, dirty: _vm.dirty, error: _vm.error, invalid: _vm.invalid, anyInvalid: _vm.anyInvalid })],2):_vm._e()])};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$a = undefined;
  /* scoped */
  var __vue_scope_id__$a = undefined;
  /* module identifier */
  var __vue_module_identifier__$a = undefined;
  /* functional template */
  var __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$a = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Uses [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver) to fire events when content enters or exits the screen.
 */
var script$b = {
  name: "VIntersect",
  props: {
    /**
     * The IntersectionObserver threshold value.
     */
    threshold: {
      type: [Number, Array],
      default: function () { return null; },
    },
    /**
     * The IntersectionObserver root value.
     */
    root: {
      type: String,
      default: undefined,
    },
    /**
     * The IntersectionObserver rootMargin value.
     */
    rootMargin: {
      type: String,
      default: undefined,
    },

    options: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    entry: {},
  }); },

  mounted: function mounted() {
    var this$1 = this;

    var ref = this;
    var root = ref.root;
    var threshold = ref.threshold;
    var rootMargin = ref.rootMargin;
    var options = ref.options;
    var handler = ref.handler;
    var observerOptions = Object.assign({}, options,
      {root: root,
      threshold: threshold,
      rootMargin: rootMargin});

    this.observer = new IntersectionObserver(handler, observerOptions);
    this.observer.observe(this.$el);

    this.$once("hook:beforeDestroy", function () {
      this$1.observer.disconnect();
    });
  },

  methods: {
    handler: function handler(ref) {
      var entry = ref[0];

      this.entry = entry;
      // console.log(entry)
      if (entry.isIntersecting) {
        /**
         * Fired when the observed element enters the screen.
         * @event enter
         * @type { IntersectionObserverEntry }
         */
        this.$emit("enter", entry);
      } else {
        /**
         * Fired when the observed element exits the screen.
         * @event exit
         * @type { IntersectionObserverEntry }
         */
        this.$emit("exit", entry);
      }
      /**
       * Fired when the observed element enters or exits the screen.
       * @event change
       * @type { IntersectionObserverEntry }
       */
      this.$emit("change", entry);
    },
  },

  render: function render(h) {
    // @slot Content to be tracked with IntersectionObserver
    var ref = this;
    var entry = ref.entry;

    /** @slot Slot content providing isIntersecting */
    var defaultSlot = this.$slots.default;
    var scopedSlot = this.$scopedSlots.default;

    if (defaultSlot) {
      return safeSlot(h, defaultSlot)
    }

    return safeSlot(h, scopedSlot(entry))
  },
};

/* script */
var __vue_script__$b = script$b;

/* template */

  /* style */
  var __vue_inject_styles__$b = undefined;
  /* scoped */
  var __vue_scope_id__$b = undefined;
  /* module identifier */
  var __vue_module_identifier__$b = undefined;
  /* functional template */
  var __vue_is_functional_template__$b = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$b = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    undefined,
    undefined,
    undefined
  );

//

/**
 * A modal/dialogue component for showing users content which overlays the rest of the applications. When opened, it traps the user's focus so that keyboard navigation will remain within the modal until it is closed. It supports being closed by clicking outside the modal content or pressing the ESC key.
 */
var script$c = {
  model: {
    prop: "showing",
    event: "change",
  },

  props: {
    /**
     * @model
     */
    showing: Boolean,
    /**
     * HTML component for the modal content.
     */
    tag: {
      type: String,
      default: "div",
    },
    /**
     * Flag to enable/prevent the modal from being closed.
     */
    dismissible: {
      type: Boolean,
      default: true,
    },
    /**
     * CSS width to set the modal to.
     */
    width: {
      type: String,
      default: undefined
    },
    /**
     * CSS max-width to set the modal to.
     */
    maxWidth: {
      type: String,
      default: undefined
    },
    /**
     * Prevents the page from being scrolled while the modal is open.
     */
    noScroll: {
      type: Boolean,
      default: false,
    },
    /**
     * Transition name to apply to the modal.
     */
    transition: {
      type: String,
      default: undefined
    },
    /**
     * Transition name to apply to the background.
     */
    bgTransition: {
      type: String,
      default: undefined
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  watch: {
    showing: {
      handler: function handler(next, prev) {
        var this$1 = this;

        if (typeof window !== "undefined") {
          if (next && next != prev) {
            this.noScroll &&
              document.body.style.setProperty("overflow", "hidden");
            this.$nextTick(function () {
              this$1.$refs.content.focus();
            });
          } else {
            this.noScroll && document.body.style.removeProperty("overflow");
          }
        }
      },
    },
  },

  mounted: function mounted() {
    console.warn(
      "Vuetensil's VModal is deprecated. Please use VDialog instead."
    );
  },

  methods: {
    show: function show() {
      /**
       * Fired when the modal opens.
       * @event show
       * @type { boolean }
       */
      this.$emit("show");
      this.$emit("change", true);
    },
    hide: function hide() {
      /**
       * Fired when the modal closes.
       * @event hide
       * @type { boolean }
       */
      this.$emit("hide");
      this.$emit("change", false);
    },
    toggle: function toggle() {
      var ref = this;
      var showing = ref.showing;
      var event = showing ? "hide" : "show";
      this.$emit(event, !showing);
      /**
       * Fired whenever the modal opens or closes.
       * @event change
       * @type { boolean }
       */
      this.$emit("change", !showing);
    },
    onClick: function onClick(event) {
      if (event.target.classList.contains("vts-modal") && this.dismissible) {
        this.hide();
      }
    },

    onKeydown: function onKeydown(event) {
      if (event.keyCode === keycodes.ESC) {
        this.hide();
      }
      if (event.keyCode === keycodes.TAB) {
        var content = this.$refs.content;
        if (!content) { return }

        var focusable = Array.from(content.querySelectorAll(FOCUSABLE));

        if (!focusable.length) {
          event.preventDefault();
          return
        }

        if (!content.contains(document.activeElement)) {
          event.preventDefault();
          focusable[0].focus();
        } else {
          var focusedItemIndex = focusable.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusable[focusable.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusable.length - 1) {
            focusable[0].focus();
            event.preventDefault();
          }
        }
      }
    },
  },
};

/* script */
var __vue_script__$c = script$c;

/* template */
var __vue_render__$7 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.bgTransition}},[(_vm.showing)?_c('div',{class:['vts-modal', _vm.classes.root],on:{"click":_vm.onClick,"keydown":_vm.onKeydown}},[_c('transition',{attrs:{"name":_vm.transition,"appear":""}},[_c(_vm.tag,{ref:"content",tag:"component",class:['vts-modal__content', _vm.classes.content],style:({ width: _vm.width, maxWidth: _vm.maxWidth }),attrs:{"tabindex":"-1","role":"dialog"}},[_vm._t("default")],2)],1)],1):_vm._e()])};
var __vue_staticRenderFns__$7 = [];

  /* style */
  var __vue_inject_styles__$c = function (inject) {
    if (!inject) { return }
    inject("data-v-7f4623d4_0", { source: ".vts-modal{display:flex;align-items:center;justify-content:center;position:fixed;z-index:100;top:0;right:0;bottom:0;left:0;background:rgba(0,0,0,.2)}.vts-modal [tabindex=\"-1\"]:focus{outline:0}.vts-modal__content{overflow:auto;max-width:70vw;max-height:80vh;background:#fff}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$c = undefined;
  /* module identifier */
  var __vue_module_identifier__$c = undefined;
  /* functional template */
  var __vue_is_functional_template__$c = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$c = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    createInjector,
    undefined,
    undefined
  );

//
//
//
//
//
//

var script$d = {
  name: "VResize",
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },

  data: function () { return ({
    width: undefined,
    height: undefined,
  }); },

  mounted: function mounted() {
    var fn = this.updateDimensions;
    fn();
    window.addEventListener("resize", fn);
    this.$once("hook:beforeDestroy", function () {
      window.removeEventListener("resize", fn);
    });
  },

  methods: {
    updateDimensions: function updateDimensions() {
      var el = this.$el;
      this.width = el.offsetWidth;
      this.height = el.offsetHeight;
    },
  },
};

/* script */
var __vue_script__$d = script$d;

/* template */
var __vue_render__$8 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",staticClass:"vts-resize"},[_vm._t("default",null,null,{ width: _vm.width, height: _vm.height })],2)};
var __vue_staticRenderFns__$8 = [];

  /* style */
  var __vue_inject_styles__$d = undefined;
  /* scoped */
  var __vue_scope_id__$d = undefined;
  /* module identifier */
  var __vue_module_identifier__$d = undefined;
  /* functional template */
  var __vue_is_functional_template__$d = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$d = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$e = {
  name: "VSkip",
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  // mounted() {
  //   window.addEventListener(
  //     "hashchange",
  //     () => {
  //       this.skipTo(location.hash.substring(1))
  //     },
  //     false
  //   )
  //   if (location.hash && location.hash.substring(1)) {
  //     this.skipTo(location.hash.substring(1))
  //   }
  // },
  skipTo: function skipTo(id) {
    if (!id) { return }

    var target = window.document.getElementById(id.slice(1));
    if (!target) { return }

    if (
      !["a", "select", "input", "button", "textarea"].includes(
        target.tagName.toLowerCase()
      )
    ) {
      target.setAttribute("tabindex", "-1");
    }
    target.focus();
  },
};

/* script */
var __vue_script__$e = script$e;

/* template */
var __vue_render__$9 = function (_h,_vm) {var _c=_vm._c;return _c('a',_vm._g(_vm._b({ref:_vm.data.ref,class:['vts-skip',
           _vm.data.class,
           _vm.data.staticClass],style:([_vm.data.style, _vm.data.staticStyle]),attrs:{"href":_vm.props.to},on:{"click":function($event){return _vm.$options.skipTo(_vm.props.to)}}},'a',_vm.data.attrs,false),_vm.listeners),[_vm._t("default",[_vm._v("Skip to main content")])],2)};
var __vue_staticRenderFns__$9 = [];

  /* style */
  var __vue_inject_styles__$e = function (inject) {
    if (!inject) { return }
    inject("data-v-3e597e64_0", { source: ".vts-skip{position:fixed;z-index:1000;top:0;left:-10000px;border:3px solid;padding:.5rem;color:#000;background-color:#fff}.vts-skip:focus{left:0}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$e = undefined;
  /* module identifier */
  var __vue_module_identifier__$e = undefined;
  /* functional template */
  var __vue_is_functional_template__$e = true;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$e = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
    undefined,
    undefined
  );

//

// const NAME = "vts-tabs"

/**
 * Show and hide content based on which tabs are selected.
 *
 * Implements best practices for accessible tab components based on W3C. Includes HTML5 role attributes (tablist, tab, tabpanel), aria attributes (aria-label, aria-selected, aria-controls, aria-labelledby), and ideal keyboard navigation.
 *
 * Keyboard navigation to the tabs only targets active tab. `right` key activates next tab (horizontal orientation) or loops around to start. `left` key activates previous tab (horizontal orientation) or loops around to end. `down` key activates next tab (vertical orientation) or loops around to start. `down` key activates previous tab (vertical orientation) or loops around to end. (in horizontal orientation), `home` key activates first tab. `end` key activates last tab.
 */
var script$f = {
  name: "VTabs",

  props: {
    /**
     * Support for aria-label attribute
     */
    label: {
      type: String,
      default: undefined,
    },
    /**
     * Support for aria-orientation attribute
     */
    orientation: {
      type: String,
      default: "horizontal",
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    activeIndex: 0,
  }); },

  computed: {
    tablist: function tablist() {
      return Object.keys(this.$slots)
    },
  },

  created: function created() {
    var ref = this.$attrs;
    var id = ref.id;
    this.id = id ? id : ("vts-" + (randomString(4)));
  },

  methods: {
    onKeydown: function onKeydown(event) {
      var keyCode = event.keyCode;
      switch (keyCode) {
        case keycodes.END:
          event.preventDefault();
          this.activeIndex = this.tablist.length - 1;
          this.setFocus();
          break
        case keycodes.HOME:
          event.preventDefault();
          this.activeIndex = 0;
          this.setFocus();
          break
        // Up and down are in keydown because we need to prevent page scroll >:)
        case keycodes.LEFT:
        case keycodes.RIGHT:
        case keycodes.UP:
        case keycodes.DOWN:
          this.determineOrientation(event);
          break
      }
    },

    // When a tablist's aria-orientation is set to vertical, only up and down arrow should function. In all other cases only left and right arrow function.
    determineOrientation: function determineOrientation(event) {
      var keyCode = event.keyCode;
      var proceed = false;
      if (this.orientation === "vertical") {
        if (keyCode === keycodes.UP || keyCode === keycodes.DOWN) {
          event.preventDefault();
          proceed = true;
        }
      } else {
        if (keyCode === keycodes.LEFT || keyCode === keycodes.RIGHT) {
          proceed = true;
        }
      }
      if (proceed) {
        this.switchTabOnArrowPress(event);
        this.setFocus();
      }
    },

    // Either focus the next, previous, first, or last tab depening on key pressed
    switchTabOnArrowPress: function switchTabOnArrowPress(event) {
      var keyCode = event.keyCode;
      var directions = {};
      directions[keycodes.LEFT] = -1;
      directions[keycodes.UP] = -1;
      directions[keycodes.RIGHT] = 1;
      directions[keycodes.DOWN] = 1;

      /* istanbul ignore next */
      if (!directions[keyCode]) { return }

      var activeIndex = this.activeIndex;
      var tabLength = this.$refs.tab.length;
      var nextIndex = activeIndex + directions[keyCode];

      if (nextIndex < 0) {
        this.activeIndex = tabLength - 1;
      } else if (nextIndex >= tabLength) {
        this.activeIndex = 0;
      } else {
        this.activeIndex = nextIndex;
      }
    },

    setFocus: function setFocus() {
      this.$refs.tab[this.activeIndex].focus();
    },
  },
};

/* script */
var __vue_script__$f = script$f;

/* template */
var __vue_render__$a = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.tablist.length)?_c('div',{class:['vts-tabs', _vm.classes.root]},[_c('div',{class:['vts-tabs__tablist', _vm.classes.tablist],attrs:{"role":"tablist","aria-label":_vm.label,"aria-orientation":_vm.orientation}},_vm._l((_vm.tablist),function(tab,index){return _c('button',{key:tab,ref:"tab",refInFor:true,class:[("vts-tabs__tab vts-tabs__tab--" + index), _vm.classes.tab],attrs:{"id":(_vm.id + "-tab-" + index),"aria-selected":index === _vm.activeIndex,"tabindex":index === _vm.activeIndex ? false : -1,"aria-controls":(_vm.id + "-panel-" + index),"role":"tab"},on:{"keydown":_vm.onKeydown,"click":function($event){_vm.activeIndex = index;}}},[_vm._v("\n      "+_vm._s(tab)+"\n    ")])}),0),_vm._v(" "),_vm._l((_vm.tablist),function(tab,index){return _c('div',{key:tab,class:[("vts-tabs__panel vts-tabs__panel--" + index), _vm.classes.panel],attrs:{"id":(_vm.id + "-panel-" + index),"aria-labelledby":(_vm.id + "-tab-" + index),"hidden":index !== _vm.activeIndex,"tabindex":"0","role":"tabpanel"}},[_vm._t(tab)],2)})],2):_vm._e()};
var __vue_staticRenderFns__$a = [];

  /* style */
  var __vue_inject_styles__$f = undefined;
  /* scoped */
  var __vue_scope_id__$f = undefined;
  /* module identifier */
  var __vue_module_identifier__$f = undefined;
  /* functional template */
  var __vue_is_functional_template__$f = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$f = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$g = {
  name: "VTable",
  props: {
    headers: {
      type: Array,
      default: function () { return []; },
    },
    items: {
      type: Array,
      default: function () { return []; },
    },
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 100,
    },
    orderBy: {
      type: String,
      default: null,
    },
    order: {
      type: String,
      default: null,
    },
    caption: {
      type: String,
      default: "",
    },
    // TODO: sortable prop
  },

  data: function data() {
    return {
      sortBy: this.orderBy,
      sortOrder: this.order && this.order.toUpperCase(),
      currentPage: this.page,
      tabindex: null,
    }
  },

  computed: {
    cHeaders: function cHeaders() {
      return this.headers.reduce(function (headers, item) {
        /* eslint-disable-next-line no-param-reassign */
        headers[item.key] = Object.assign({}, {sortable: true},
          item);
        return headers
      }, {})
    },

    cItems: function cItems() {
      var ref = this;
      var items = ref.items;
      var sortBy = ref.sortBy;
      var sortOrder = ref.sortOrder;
      var currentPage = ref.currentPage;
      var perPage = ref.perPage;
      var cHeaders = ref.cHeaders;

      var cItems = items.map(function (original) {
        var data = {};
        Object.keys(cHeaders).forEach(function (key) {
          data[key] = original[key];
        });
        return {
          original: original,
          data: data,
        }
      });

      if (sortBy && sortOrder) {
        var multiplier = sortOrder === "ASC" ? 1 : -1;
        var isNum = Number.isFinite(cItems[0].data[sortBy]);

        cItems = cItems.sort(function (a, b) {
          var aVal = a.data[sortBy];
          var bVal = b.data[sortBy];

          if (isNum) {
            return (aVal - bVal) * multiplier
          }

          if (aVal < bVal) { return -1 * multiplier }
          if (aVal > bVal) { return 1 * multiplier }
          return 0
        });
      }

      if (perPage > -1) {
        var offset = (Math.max(currentPage, 1) - 1) * perPage;
        cItems = cItems.slice(offset, offset + perPage);
      }

      return cItems
    },

    lastPage: function lastPage() {
      return Math.ceil(this.items.length / this.perPage)
    },
  },

  mounted: function mounted() {
    var ref = this.$refs.container;
    var scrollWidth = ref.scrollWidth;
    var clientWidth = ref.clientWidth;
    var scrollable = scrollWidth > clientWidth;
    this.tabindex = scrollable ? "0" : null;
  },

  methods: {
    onSort: function onSort(key) {
      var ref = this;
      var sortBy = ref.sortBy;
      var sortOrder = ref.sortOrder;
      this.currentPage = 1;

      if (key !== sortBy) {
        this.sortBy = key;
        this.sortOrder = "ASC";
        return
      }

      switch (sortOrder) {
        case "ASC":
          this.sortOrder = "DESC";
          break
        case "DESC":
          this.sortOrder = null;
          break
        default:
          this.sortOrder = "ASC";
      }
    },

    goToPage: function goToPage(page) {
      var ref = this;
      var lastPage = ref.lastPage;
      this.currentPage = Math.min(Math.max(1, page), lastPage);
    },

    emitRowClick: function emitRowClick(item) {
      this.$emit("click:row", item.original);
    },

    ariaSort: function ariaSort(header) {
      var order = "descending";

      if (this.sortBy !== header.key) {
        order = null;
      } else if (this.sortOrder === "ASC") {
        order = "ascending";
      }

      return order
    },
    ariaLabel: function ariaLabel(header) {
      var order = "default";

      if (!this.sortOrder) {
        order = "ascending";
      } else if (this.sortOrder === "ASC") {
        order = "descending";
      }

      return ["sort by", header.text || header.key, "in", order, "order"].join(
        " "
      )
    },
  },
};

/* script */
var __vue_script__$g = script$g;

/* template */
var __vue_render__$b = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticClass:"table-container",attrs:{"tabindex":"0","role":"group","aria-labelledby":"caption"}},[_c('table',[(_vm.caption)?_c('caption',{attrs:{"id":"caption"}},[_vm._v("\n      "+_vm._s(_vm.caption)+"\n    ")]):_vm._e(),_vm._v(" "),(_vm.headers.length)?_c('thead',[_c('tr',_vm._l((_vm.cHeaders),function(header,key){return _c('th',{key:key,attrs:{"aria-sort":_vm.ariaSort(header)}},[_vm._v("\n          "+_vm._s(header.text || header.key)+"\n\n          "),_vm._v(" "),(header.sortable)?_c('button',{attrs:{"aria-label":_vm.ariaLabel(header)},on:{"click":function($event){return _vm.onSort(header.key)}}},[(header.key === _vm.sortBy && _vm.sortOrder === 'ASC')?[_vm._v("\n              ↑\n            ")]:(header.key === _vm.sortBy && _vm.sortOrder === 'DESC')?[_vm._v("\n              ↓\n            ")]:[_vm._v("\n              ↕\n            ")]],2):_vm._e()])}),0)]):_vm._e(),_vm._v(" "),_c('tbody',[_vm._t("default",_vm._l((_vm.cItems),function(item,index){return _c('tr',{key:item.id,attrs:{"tabindex":"0"},on:{"click":function($event){return _vm.emitRowClick(item)},"keyup":function($event){return _vm.emitRowClick(item)}}},[_vm._l((item.data),function(value,key){return _vm._t(_vm.items[index].id ? ("row." + (_vm.items[index].id)) : null,[_c('td',{key:key},[_vm._t(("column." + key),[_vm._v("\n                "+_vm._s(value)+"\n              ")],null,{ cell: value, item: item, column: key, row: index + 1 })],2)],null,{ item: item, column: key, row: index + 1 })})],2)}),null,Object.assign({}, {items: _vm.cItems}, _vm.$data, {perPage: _vm.perPage}))],2)]),_vm._v(" "),_vm._t("pagination",[(_vm.lastPage > 1)?_c('div',[_c('button',{attrs:{"disabled":_vm.currentPage === 1,"aria-label":"go to previous page"},on:{"click":function($event){return _vm.goToPage(_vm.currentPage - 1)}}},[_vm._v("\n        Prev\n      ")]),_vm._v(" "),_c('ul',_vm._l((_vm.lastPage),function(pageNum){return _c('li',{key:pageNum},[_c('button',{attrs:{"disabled":pageNum === _vm.currentPage,"aria-label":("go to page " + pageNum)},on:{"click":function($event){return _vm.goToPage(pageNum)}}},[_vm._v("\n            "+_vm._s(pageNum)+"\n          ")])])}),0),_vm._v(" "),_c('button',{attrs:{"disabled":_vm.currentPage === _vm.lastPage,"aria-label":"go to next page"},on:{"click":function($event){return _vm.goToPage(_vm.currentPage + 1)}}},[_vm._v("\n        Next\n      ")])]):_vm._e()],null,{ currentPage: _vm.currentPage, lastPage: _vm.lastPage, goToPage: _vm.goToPage })],2)};
var __vue_staticRenderFns__$b = [];

  /* style */
  var __vue_inject_styles__$g = function (inject) {
    if (!inject) { return }
    inject("data-v-6240d854_0", { source: ".table-container{overflow-x:auto}@media (min-width:400px){.table-container{display:block}.lists-container{display:none}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$g = undefined;
  /* module identifier */
  var __vue_module_identifier__$g = undefined;
  /* functional template */
  var __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$g = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

//
/**
 * Toggle the visibility of content. Useful for something like an FAQ page, for example. Includes ARIA attributes for expandable content and is keyboard friendly.
 */
var script$h = {
  name: "VToggle",
  model: {
    prop: "open",
    event: "update",
  },

  props: {
    open: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: "",
    },

    disabled: Boolean,

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function data() {
    return {
      isOpen: this.open,
    }
  },

  watch: {
    open: function open(next) {
      this.isOpen = next;
    },
    isOpen: function isOpen(isOpen$1) {
      if (typeof window === "undefined") { return }
      this.$emit("update", isOpen$1);
      this.$emit(isOpen$1 ? "open" : "close");
    },
  },

  created: function created() {
    var ref = this.$attrs;
    var id = ref.id;
    this.id = id ? id : ("vts-" + (randomString(4)));
  },

  methods: {
    collapse: function collapse(el) {
      el.style.height = 0;
    },

    expand: function expand(el) {
      el.style.overflow = "hidden";
      el.style.height = (el.scrollHeight) + "px";
      // Force repaint to make sure the animation is triggered correctly.
      el.scrollHeight;
    },

    resetHeight: function resetHeight(el) {
      el.style.overflow = "visible";
      el.style.height = "";
    },
  },
};

/* script */
var __vue_script__$h = script$h;

/* template */
var __vue_render__$c = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['vts-toggle', { 'vts-toggle--open': _vm.isOpen }, _vm.classes.root]},[_c('button',_vm._g({ref:"label",class:['vts-toggle__label', _vm.classes.label],attrs:{"id":(_vm.id + "-label"),"disabled":_vm.disabled,"aria-controls":(_vm.id + "-content"),"aria-expanded":String(_vm.isOpen)},on:{"click":function($event){_vm.isOpen = !_vm.isOpen;}}},_vm.$listeners),[_vm._v("\n    "+_vm._s(_vm.label)+"\n\n    "),_vm._t("label",null,null,{ isOpen: _vm.isOpen })],2),_vm._v(" "),_c('transition',{on:{"before-enter":_vm.collapse,"enter":_vm.expand,"after-enter":_vm.resetHeight,"before-leave":_vm.expand,"leave":_vm.collapse}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen && !_vm.disabled),expression:"isOpen && !disabled"}],class:['vts-toggle__content', _vm.classes.content],attrs:{"id":(_vm.id + "-content"),"aria-labelledby":(_vm.id + "-label"),"aria-hidden":!_vm.isOpen,"role":"region"}},[_vm._t("default",null,null,{ isOpen: _vm.isOpen })],2)])],1)};
var __vue_staticRenderFns__$c = [];

  /* style */
  var __vue_inject_styles__$h = function (inject) {
    if (!inject) { return }
    inject("data-v-62bc4550_0", { source: ".vts-toggle__content{transition:height .3s ease}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$h = undefined;
  /* module identifier */
  var __vue_module_identifier__$h = undefined;
  /* functional template */
  var __vue_is_functional_template__$h = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$h = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    createInjector,
    undefined,
    undefined
  );

var script$i = {
  name: "VTooltip",
  props: {
    tag: {
      type: String,
      default: "span",
    },

    id: {
      type: String,
      default: function () { return ("vts-" + (randomString(4))); },
    },

    focus: {
      type: Boolean,
      default: false,
    },

    classes: {
      type: Object,
      default: function () { return ({}); },
    },
  },

  data: function () { return ({
    show: false,
  }); },

  render: function render(h) {
    var this$1 = this;

    var ref = this;
    var tag = ref.tag;
    var show = ref.show;
    var id = ref.id;
    var focus = ref.focus;
    var classes = ref.classes;

    var defaultSlot = this.$scopedSlots.default();
    var tooltip = this.$scopedSlots.tooltip();

    var content = h(
      "span",
      {
        class: [
          "vts-tooltip__content",
          {
            "vts-tooltip__content--visible": show,
          },
          classes.content ],
        attrs: {
          id: (id + "__content"),
          role: "tooltip",
          "aria-hidden": !show + "",
        },
      },
      tooltip
    );

    var on = {
      focus: function () { return (this$1.show = true); },
      blur: function () { return (this$1.show = false); }, // TODO: this should not run if the next target is inside the tooltip
    };
    // add hover events unless focus only
    if (!focus) {
      on.mouseenter = function () { return (this$1.show = true); };
      on.mouseleave = function () { return (this$1.show = false); };
    }

    var parent = h(
      tag,
      {
        class: ["vts-tooltip", classes.toggle],
        on: on,
        attrs: { id: id, tabindex: 0, "aria-describedby": (id + "__content") },
      },
      [defaultSlot, content]
    );

    return parent
  },
};

/* script */
var __vue_script__$i = script$i;

/* template */

  /* style */
  var __vue_inject_styles__$i = function (inject) {
    if (!inject) { return }
    inject("data-v-b3487d72_0", { source: ".vts-tooltip{position:relative}.vts-tooltip__content{position:absolute;top:0;left:50%;transform:translate(-50%,-100%)}.vts-tooltip__content[aria-hidden=true]{display:none}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$i = undefined;
  /* module identifier */
  var __vue_module_identifier__$i = undefined;
  /* functional template */
  var __vue_is_functional_template__$i = undefined;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$i = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    createInjector,
    undefined,
    undefined
  );

var autofocus = {
  inserted: function (el) { return el.focus(); },
};

var clickout = {
  bind: function bind(el, binding) {
    binding.stop = function (e) { return e.stopPropagation(); };

    document.body.addEventListener("click", binding.value);
    el.addEventListener("click", binding.stop);
  },
  unbind: function unbind(el, binding) {
    document.body.removeEventListener("click", binding.value);
    el.removeEventListener("click", binding.stop);
  },
};

/**
 * Copies a string of text to the user's clipboard
 * @param {String} content The content within the downloaded file
 */
function copyToClipboard(content) {
  var activeEl = document.activeElement;

  var textarea = document.createElement("textarea");
  textarea.value = content;

  textarea.setAttribute("readonly", ""); // Prevent keyboard from showing on mobile
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  textarea.style.fontSize = "12pt"; // Prevent zooming on iOS

  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  activeEl && activeEl.focus();
}

var copy = {
  bind: function bind(el, binding) {
    binding.handler = function () { return copyToClipboard(binding.value); };
    el.addEventListener("click", binding.handler);
  },
  unbind: function unbind(el, binding) {
    el.removeEventListener("click", binding.handler);
  },
  update: function update(el, binding) {
    el.removeEventListener("click", binding.handler);
    binding.handler = function () { return copyToClipboard(binding.value); };
    el.addEventListener("click", binding.handler);
  },
};

function unbind(el) {
  if (!el._vobserver) { return }
  el._vobserver.unobserve(el);
  delete el._vobserver;
}

var intersect = {
  inserted: function (el, ref) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    var options = Object.assign({}, value);
    var enter = modifiers.enter;
    var exit = modifiers.exit;
    var once = modifiers.once;

    if (options.root) {
      options.root =
        typeof options.root === "string"
          ? document.querySelector(options.root)
          : options.root;
    }

    var listeners = Object.assign({}, value);

    // Support passing direct function
    if (value instanceof Function) {
      if (enter) { listeners.onEnter = value; }
      if (exit) { listeners.onExit = value; }
      if (!enter && !exit) { listeners.onChange = value; }
    }

    var observer = new IntersectionObserver(function (ref) {
      var entry = ref[0];

      // Firefox doesn't properly handle the isIntersecting prop
      var isThresholdArray = Array.isArray(options.threshold);
      var clone = {};
      for (var key in entry) {
        clone[key] = entry[key];
      }
      clone.isIntersecting = isThresholdArray
        ? options.threshold.includes(entry.intersectionRatio)
        : entry.intersectionRatio === options.threshold;

      if (clone.isIntersecting) {
        listeners.onEnter && listeners.onEnter(clone, el);
      } else {
        listeners.onExit && listeners.onExit(clone, el);
      }
      listeners.onChange && listeners.onChange(clone, el);

      if (once) {
        unbind(el);
      }
    }, options);
    observer.observe(el);
    el._vobserver = observer;
  },

  unbind: unbind,
};

// @ts-check
/**
 * @param {string} str
 * @return {string}
 */
var capitalize = function (str) { return str[0].toUpperCase() + str.slice(1); };

/**
 * @param {number} str
 * @param {string} currency
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
function currency(str, currency, locale) {
  if ( locale === void 0 ) locale = navigator.language;

  // Alternative: (73.57).toLocaleString('de-DE',{style:'currency',currency:'EUR'});
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(str)
}

/**
 * @param {number} str
 * @param {string} [locale = navigator.language]
 * @return {string}
 */
function number(str, locale) {
  if ( locale === void 0 ) locale = navigator.language;

  return new Intl.NumberFormat(locale).format(str)
}

/**
 * @param {string} str
 * @param {string} placeholder
 * @return {string}
 */
var placeholder = function (str, placeholder) { return str || placeholder; };

/**
 * @param {string} str
 * @param {string} plural
 * @param {number} qty
 * @return {string}
 */
function plural(str, plural, qty) {
  return qty === 0 || qty > 1 ? plural : str
}

/**
 * @param {string} str
 * @param {number} [length = 100]
 * @param {string} [append = '...']
 * @return {string}
 */
function truncate(str, length, append) {
  if ( length === void 0 ) length = 100;
  if ( append === void 0 ) append = "...";

  // TODO: dont split last word
  if (str.length > length) {
    return str.substring(0, length - append.length) + append
  } else {
    return str
  }
}

/**
 * TODO:
 * (https://www.npmjs.com/package/vue2-filters)
 * truncate
 * scientific notation
 * filterBy
 * find
 * sortBy
 * mask?
 */

export { __vue_component__ as VAction, __vue_component__$1 as VAlert, __vue_component__$2 as VAsync, __vue_component__$3 as VDate, __vue_component__$4 as VDialog, __vue_component__$5 as VDrawer, __vue_component__$6 as VDropdown, __vue_component__$7 as VFile, __vue_component__$8 as VForm, __vue_component__$9 as VImg, __vue_component__$a as VInput, __vue_component__$b as VIntersect, __vue_component__$c as VModal, __vue_component__$d as VResize, __vue_component__$e as VSkip, __vue_component__$g as VTable, __vue_component__$f as VTabs, __vue_component__$h as VToggle, __vue_component__$i as VTooltip, autofocus, capitalize, clickout, copy, currency, intersect, number, placeholder, plural, truncate };
