/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	module.exports = __webpack_require__(22);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.2.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	function getScrollParent(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;

	  if (position === 'fixed') {
	    return el;
	  }

	  var parent = el;
	  while (parent = parent.parentNode) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      return parent;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        return parent;
	      }
	    }
	  }

	  return document.body;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin(doc) {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = doc._tetherZeroElement;
	  if (typeof node === 'undefined') {
	    node = doc.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    doc.body.appendChild(node);

	    doc._tetherZeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = {};

	    var rect = node.getBoundingClientRect();
	    for (var k in rect) {
	      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
	      zeroPosCache[id][k] = rect[k];
	    }

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = {};
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = el.getBoundingClientRect();
	  for (var k in rect) {
	    box[k] = rect[k];
	  }

	  var origin = getOrigin(doc);

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	function getScrollBarSize() {
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  return { width: width, height: width };
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  if (el.className instanceof SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getScrollParent: getScrollParent,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParent = _TetherBase$Utils.getScrollParent;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (typeof pendingTimeout !== 'undefined') {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function () {
	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParent !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParent !== 'undefined') {
	        this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this3) {
	          tethers.splice(i, 1);
	          return;
	        }
	      });
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this4 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this4.getClass('element-attached') + '-' + side);
	        all.push(_this4.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this4._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this4.element, _this4._addAttachClasses, all);
	        if (!(_this4.options.addTargetClasses === false)) {
	          updateClasses(_this4.target, _this4._addAttachClasses, all);
	        }

	        delete _this4._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this5 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this5.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this5.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var scrollbarSize = undefined;
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this5.cache('target-offsetparent', function () {
	            return getOffsetParent(_this5.target);
	          });
	          var offsetPosition = _this5.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this6 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this6.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this6.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this6.cache('target-offsetparent', function () {
	            return getOffsetParent(_this6.target);
	          });

	          if (getOffsetParent(_this6.element) !== offsetParent) {
	            defer(function () {
	              _this6.element.parentNode.removeChild(_this6.element);
	              offsetParent.appendChild(_this6.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        var offsetParentIsBody = true;
	        var currentNode = this.element.parentNode;
	        while (currentNode && currentNode.tagName !== 'BODY') {
	          if (getComputedStyle(currentNode).position !== 'static') {
	            offsetParentIsBody = false;
	            break;
	          }

	          currentNode = currentNode.parentNode;
	        }

	        if (!offsetParentIsBody) {
	          this.element.parentNode.removeChild(this.element);
	          document.body.appendChild(this.element);
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this6.element.style, writeCSS);
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})();

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParent;
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top += height;
	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _jquery = __webpack_require__(3);

	var _jquery2 = _interopRequireDefault(_jquery);

	__webpack_require__(5);

	__webpack_require__(12);

	__webpack_require__(20);

	window.$ = _jquery2['default'];
	window.jQuery = _jquery2['default'];

	(0, _jquery2['default'])(function () {
	    (0, _jquery2['default'])('#diff-file--list').collapse({
	        toggle: false
	    });

	    (0, _jquery2['default'])('.collapse-file-diff').click(function () {
	        console.log('dd');
	        (0, _jquery2['default'])('#diff-file--list').collapse('show');
	    });
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.1.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-04-28T16:01Z
	 */

	(function( global, factory ) {

		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}

	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//

	var arr = [];

	var slice = arr.slice;

	var concat = arr.concat;

	var push = arr.push;

	var indexOf = arr.indexOf;

	var class2type = {};

	var toString = class2type.toString;

	var hasOwn = class2type.hasOwnProperty;

	var support = {};



	var
		// Use the correct document accordingly with window argument (sandbox)
		document = window.document,

		version = "2.1.4",

		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},

		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,

		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};

	jQuery.fn = jQuery.prototype = {
		// The current version of jQuery being used
		jquery: version,

		constructor: jQuery,

		// Start with an empty selector
		selector: "",

		// The default length of a jQuery object is 0
		length: 0,

		toArray: function() {
			return slice.call( this );
		},

		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?

				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :

				// Return all the elements in a clean array
				slice.call( this );
		},

		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {

			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );

			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;

			// Return the newly-formed element set
			return ret;
		},

		// Execute a callback for every element in the matched set.
		// (You can seed the arguments with an array of args, but this is
		// only used internally.)
		each: function( callback, args ) {
			return jQuery.each( this, callback, args );
		},

		map: function( callback ) {
			return this.pushStack( jQuery.map(this, function( elem, i ) {
				return callback.call( elem, i, elem );
			}));
		},

		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},

		first: function() {
			return this.eq( 0 );
		},

		last: function() {
			return this.eq( -1 );
		},

		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
		},

		end: function() {
			return this.prevObject || this.constructor(null);
		},

		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};

	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[0] || {},
			i = 1,
			length = arguments.length,
			deep = false;

		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;

			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}

		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
			target = {};
		}

		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}

		for ( ; i < length; i++ ) {
			// Only deal with non-null/undefined values
			if ( (options = arguments[ i ]) != null ) {
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];

					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}

					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray(src) ? src : [];

						} else {
							clone = src && jQuery.isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );

					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}

		// Return the modified object
		return target;
	};

	jQuery.extend({
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

		// Assume jQuery is ready without the ready module
		isReady: true,

		error: function( msg ) {
			throw new Error( msg );
		},

		noop: function() {},

		isFunction: function( obj ) {
			return jQuery.type(obj) === "function";
		},

		isArray: Array.isArray,

		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},

		isNumeric: function( obj ) {
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
		},

		isPlainObject: function( obj ) {
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}

			if ( obj.constructor &&
					!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}

			// If the function hasn't returned already, we're confident that
			// |obj| is a plain object, created by {} or constructed with new Object
			return true;
		},

		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},

		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call(obj) ] || "object" :
				typeof obj;
		},

		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;

			code = jQuery.trim( code );

			if ( code ) {
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf("use strict") === 1 ) {
					script = document.createElement("script");
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
				// Otherwise, avoid the DOM node creation, insertion
				// and removal by using an indirect global eval
					indirect( code );
				}
			}
		},

		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},

		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},

		// args is for internal usage only
		each: function( obj, callback, args ) {
			var value,
				i = 0,
				length = obj.length,
				isArray = isArraylike( obj );

			if ( args ) {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.apply( obj[ i ], args );

						if ( value === false ) {
							break;
						}
					}
				}

			// A special, fast, case for the most common use of each
			} else {
				if ( isArray ) {
					for ( ; i < length; i++ ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				} else {
					for ( i in obj ) {
						value = callback.call( obj[ i ], i, obj[ i ] );

						if ( value === false ) {
							break;
						}
					}
				}
			}

			return obj;
		},

		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];

			if ( arr != null ) {
				if ( isArraylike( Object(arr) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}

			return ret;
		},

		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},

		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;

			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}

			first.length = i;

			return first;
		},

		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;

			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}

			return matches;
		},

		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var value,
				i = 0,
				length = elems.length,
				isArray = isArraylike( elems ),
				ret = [];

			// Go through the array, translating each of the items to their new values
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}

			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );

					if ( value != null ) {
						ret.push( value );
					}
				}
			}

			// Flatten any nested arrays
			return concat.apply( [], ret );
		},

		// A global GUID counter for objects
		guid: 1,

		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;

			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}

			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}

			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};

			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;

			return proxy;
		},

		now: Date.now,

		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	});

	// Populate the class2type map
	jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	});

	function isArraylike( obj ) {

		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = "length" in obj && obj.length,
			type = jQuery.type( obj );

		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.nodeType === 1 && length ) {
			return true;
		}

		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.0-pre
	 * http://sizzlejs.com/
	 *
	 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2014-12-16
	 */
	(function( window ) {

	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,

		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,

		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},

		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,

		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},

		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

		// Regular expressions

		// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
		// http://www.w3.org/TR/css3-syntax/#characters
		characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

		// Loosely modeled on CSS identifier characters
		// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
		// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = characterEncoding.replace( "w", "w#" ),

		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",

		pseudos = ":(" + characterEncoding + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",

		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),

		matchExpr = {
			"ID": new RegExp( "^#(" + characterEncoding + ")" ),
			"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
			"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},

		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,

		rnative = /^[^{]+\{\s*\[native \w/,

		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

		rsibling = /[+~]/,
		rescape = /'|\\/g,

		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},

		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};

	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?

			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :

			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}

	function Sizzle( selector, context, results, seed ) {
		var match, elem, m, nodeType,
			// QSA vars
			i, groups, old, nid, newContext, newSelector;

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}

		context = context || document;
		results = results || [];
		nodeType = context.nodeType;

		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

			return results;
		}

		if ( !seed && documentIsHTML ) {

			// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
				// Speed-up: Sizzle("#ID")
				if ( (m = match[1]) ) {
					if ( nodeType === 9 ) {
						elem = context.getElementById( m );
						// Check parentNode to catch when Blackberry 4.6 returns
						// nodes that are no longer in the document (jQuery #6963)
						if ( elem && elem.parentNode ) {
							// Handle the case where IE, Opera, and Webkit return items
							// by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}
					} else {
						// Context is not a document
						if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
							contains( context, elem ) && elem.id === m ) {
							results.push( elem );
							return results;
						}
					}

				// Speed-up: Sizzle("TAG")
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Speed-up: Sizzle(".CLASS")
				} else if ( (m = match[3]) && support.getElementsByClassName ) {
					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// QSA path
			if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
				nid = old = expando;
				newContext = context;
				newSelector = nodeType !== 1 && selector;

				// qSA works strangely on Element-rooted queries
				// We can work around this by specifying an extra ID on the root
				// and working up from there (Thanks to Andrew Dupont for the technique)
				// IE 8 doesn't work on object elements
				if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
					groups = tokenize( selector );

					if ( (old = context.getAttribute("id")) ) {
						nid = old.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", nid );
					}
					nid = "[id='" + nid + "'] ";

					i = groups.length;
					while ( i-- ) {
						groups[i] = nid + toSelector( groups[i] );
					}
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
					newSelector = groups.join(",");
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch(qsaError) {
					} finally {
						if ( !old ) {
							context.removeAttribute("id");
						}
					}
				}
			}
		}

		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}

	/**
	 * Create key-value caches of limited size
	 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];

		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}

	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}

	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");

		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}

	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = attrs.length;

		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}

	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );

		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}

		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}

		return a ? 1 : -1;
	}

	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}

	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;

				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}

	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}

	// Expose support vars for convenience
	support = Sizzle.support = {};

	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};

	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;

		// If no document and documentElement is available, return
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}

		// Set our document
		document = doc;
		docElem = doc.documentElement;
		parent = doc.defaultView;

		// Support: IE>8
		// If iframe document is assigned to "document" variable and if iframe has been reloaded,
		// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
		// IE6-8 do not support the defaultView property so parent will be undefined
		if ( parent && parent !== parent.top ) {
			// IE11 does not have attachEvent, so all must suffer
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}

		/* Support tests
		---------------------------------------------------------------------- */
		documentIsHTML = !isXML( doc );

		/* Attributes
		---------------------------------------------------------------------- */

		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});

		/* getElement(s)By*
		---------------------------------------------------------------------- */

		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( doc.createComment("") );
			return !div.getElementsByTagName("*").length;
		});

		// Support: IE<9
		support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
		});

		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					return m && m.parentNode ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];

			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}

		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );

				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :

			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );

				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}

					return tmp;
				}
				return results;
			};

		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};

		/* QSA/matchesSelector
		---------------------------------------------------------------------- */

		// QSA and matchesSelector support

		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];

		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];

		if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\f]' msallowcapture=''>" +
					"<option selected=''></option></select>";

				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}

				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}

				// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}

				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}

				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});

			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = doc.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );

				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}

				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}

				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}

		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {

			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );

				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}

		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );

		// Element contains another
		// Purposefully does not implement inclusive descendent
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};

		/* Sorting
		---------------------------------------------------------------------- */

		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {

			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}

			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :

				// Otherwise we know they are disconnected
				1;

			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}

			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];

			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === doc ? -1 :
					b === doc ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;

			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}

			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}

			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}

			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :

				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};

		return doc;
	};

	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};

	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );

		if ( support.matchesSelector && documentIsHTML &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

			try {
				var ret = matches.call( elem, expr );

				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}

		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};

	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};

	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}

		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;

		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};

	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};

	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;

		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );

		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}

		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;

		return results;
	};

	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;

		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes

		return ret;
	};

	Expr = Sizzle.selectors = {

		// Can be adjusted by the user
		cacheLength: 50,

		createPseudo: markFunction,

		match: matchExpr,

		attrHandle: {},

		find: {},

		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},

		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );

				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}

				return match.slice( 0, 4 );
			},

			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();

				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}

					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}

				return match;
			},

			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];

				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}

				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";

				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}

				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},

		filter: {

			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},

			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];

				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},

			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );

					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}

					result += "";

					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},

			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";

				return first === 1 && last === 0 ?

					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :

					function( elem, context, xml ) {
						var cache, outerCache, node, diff, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType;

						if ( parent ) {

							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}

							start = [ forward ? parent.firstChild : parent.lastChild ];

							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
								// Seek `elem` from a previously-cached index
								outerCache = parent[ expando ] || (parent[ expando ] = {});
								cache = outerCache[ type ] || [];
								nodeIndex = cache[0] === dirruns && cache[1];
								diff = cache[0] === dirruns && cache[2];
								node = nodeIndex && parent.childNodes[ nodeIndex ];

								while ( (node = ++nodeIndex && node && node[ dir ] ||

									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {

									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										outerCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}

							// Use previously-cached element index if available
							} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
								diff = cache[1];

							// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
							} else {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
										// Cache the index of each encountered element
										if ( useCache ) {
											(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}

							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},

			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );

				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}

				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}

				return fn;
			}
		},

		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );

				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;

						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),

			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),

			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),

			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),

			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},

			"root": function( elem ) {
				return elem === docElem;
			},

			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},

			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},

			"disabled": function( elem ) {
				return elem.disabled === true;
			},

			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},

			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}

				return elem.selected === true;
			},

			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},

			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},

			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},

			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},

			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},

			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&

					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},

			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),

			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),

			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),

			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),

			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};

	Expr.pseudos["nth"] = Expr.pseudos["eq"];

	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}

	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();

	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];

		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}

		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;

		while ( soFar ) {

			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}

			matched = false;

			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}

			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}

			if ( !matched ) {
				break;
			}
		}

		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};

	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}

	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;

		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :

			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, outerCache,
					newCache = [ dirruns, doneName ];

				// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
							if ( (oldCache = outerCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								outerCache[ dir ] = newCache;

								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}

	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}

	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}

	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;

		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}

		return newUnmatched;
	}

	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,

				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,

				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

						// ...intermediate processing is necessary
						[] :

						// ...otherwise use results directly
						results :
					matcherIn;

			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}

			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );

				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}

			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}

					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

							seed[temp] = !(results[temp] = elem);
						}
					}
				}

			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}

	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,

			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];

		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}

		return elementMatcher( matchers );
	}

	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;

				if ( outermost ) {
					outermostContext = context !== document && context;
				}

				// Add elements passing elementMatchers directly to results
				// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context, xml ) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}

					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}

						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}

				// Apply set filters to unmatched elements
				matchedCount += i;
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}

					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}

						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}

					// Add matches to results
					push.apply( results, setMatched );

					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {

						Sizzle.uniqueSort( results );
					}
				}

				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}

				return unmatched;
			};

		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}

	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];

		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}

			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};

	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );

		results = results || [];

		// Try to minimize operations if there is no seed and only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;

				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}

				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}

		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};

	// One-time assignments

	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;

	// Initialize against the default document
	setDocument();

	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});

	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}

	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}

	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}

	return Sizzle;

	})( window );



	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[":"] = jQuery.expr.pseudos;
	jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;



	var rneedsContext = jQuery.expr.match.needsContext;

	var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



	var risSimple = /^.[^:#\[\.,]*$/;

	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			});

		}

		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			});

		}

		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}

			qualifier = jQuery.filter( qualifier, elements );
		}

		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
		});
	}

	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	};

	jQuery.fn.extend({
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;

			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter(function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				}) );
			}

			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}

			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow(this, selector || [], false) );
		},
		not: function( selector ) {
			return this.pushStack( winnow(this, selector || [], true) );
		},
		is: function( selector ) {
			return !!winnow(
				this,

				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	});


	// Initialize a jQuery object


	// A central reference to the root jQuery(document)
	var rootjQuery,

		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

		init = jQuery.fn.init = function( selector, context ) {
			var match, elem;

			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}

			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];

				} else {
					match = rquickExpr.exec( selector );
				}

				// Match html or make sure no context is specified for #id
				if ( match && (match[1] || !context) ) {

					// HANDLE: $(html) -> $(array)
					if ( match[1] ) {
						context = context instanceof jQuery ? context[0] : context;

						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[1],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );

						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );

								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}

						return this;

					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[2] );

						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[0] = elem;
						}

						this.context = document;
						this.selector = selector;
						return this;
					}

				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || rootjQuery ).find( selector );

				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}

			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[0] = selector;
				this.length = 1;
				return this;

			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return typeof rootjQuery.ready !== "undefined" ?
					rootjQuery.ready( selector ) :
					// Execute immediately if ready is not present
					selector( jQuery );
			}

			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}

			return jQuery.makeArray( selector, this );
		};

	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;

	// Initialize central reference
	rootjQuery = jQuery( document );


	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};

	jQuery.extend({
		dir: function( elem, dir, until ) {
			var matched = [],
				truncate = until !== undefined;

			while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
				if ( elem.nodeType === 1 ) {
					if ( truncate && jQuery( elem ).is( until ) ) {
						break;
					}
					matched.push( elem );
				}
			}
			return matched;
		},

		sibling: function( n, elem ) {
			var matched = [];

			for ( ; n; n = n.nextSibling ) {
				if ( n.nodeType === 1 && n !== elem ) {
					matched.push( n );
				}
			}

			return matched;
		}
	});

	jQuery.fn.extend({
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;

			return this.filter(function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[i] ) ) {
						return true;
					}
				}
			});
		},

		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;

			for ( ; i < l; i++ ) {
				for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
					// Always skip document fragments
					if ( cur.nodeType < 11 && (pos ?
						pos.index(cur) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors)) ) {

						matched.push( cur );
						break;
					}
				}
			}

			return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
		},

		// Determine the position of an element within the set
		index: function( elem ) {

			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}

			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}

			// Locate the position of the desired element
			return indexOf.call( this,

				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},

		add: function( selector, context ) {
			return this.pushStack(
				jQuery.unique(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},

		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter(selector)
			);
		}
	});

	function sibling( cur, dir ) {
		while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
		return cur;
	}

	jQuery.each({
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return jQuery.dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return jQuery.dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return jQuery.dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return jQuery.dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return jQuery.sibling( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );

			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}

			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}

			if ( this.length > 1 ) {
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.unique( matched );
				}

				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}

			return this.pushStack( matched );
		};
	});
	var rnotwhite = (/\S+/g);



	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		});
		return object;
	}

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {

		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			( optionsCache[ options ] || createOptions( options ) ) :
			jQuery.extend( {}, options );

		var // Last fire value (for non-forgettable lists)
			memory,
			// Flag to know if list was already fired
			fired,
			// Flag to know if list is currently firing
			firing,
			// First callback to fire (used internally by add and fireWith)
			firingStart,
			// End of the loop when firing
			firingLength,
			// Index of currently firing callback (modified by remove if needed)
			firingIndex,
			// Actual callback list
			list = [],
			// Stack of fire calls for repeatable lists
			stack = !options.once && [],
			// Fire callbacks
			fire = function( data ) {
				memory = options.memory && data;
				fired = true;
				firingIndex = firingStart || 0;
				firingStart = 0;
				firingLength = list.length;
				firing = true;
				for ( ; list && firingIndex < firingLength; firingIndex++ ) {
					if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
						memory = false; // To prevent further calls using add
						break;
					}
				}
				firing = false;
				if ( list ) {
					if ( stack ) {
						if ( stack.length ) {
							fire( stack.shift() );
						}
					} else if ( memory ) {
						list = [];
					} else {
						self.disable();
					}
				}
			},
			// Actual Callbacks object
			self = {
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
						// First, we save the current length
						var start = list.length;
						(function add( args ) {
							jQuery.each( args, function( _, arg ) {
								var type = jQuery.type( arg );
								if ( type === "function" ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && type !== "string" ) {
									// Inspect recursively
									add( arg );
								}
							});
						})( arguments );
						// Do we need to add the callbacks to the
						// current firing batch?
						if ( firing ) {
							firingLength = list.length;
						// With memory, if we're not firing then
						// we should call right away
						} else if ( memory ) {
							firingStart = start;
							fire( memory );
						}
					}
					return this;
				},
				// Remove a callback from the list
				remove: function() {
					if ( list ) {
						jQuery.each( arguments, function( _, arg ) {
							var index;
							while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
								list.splice( index, 1 );
								// Handle firing indexes
								if ( firing ) {
									if ( index <= firingLength ) {
										firingLength--;
									}
									if ( index <= firingIndex ) {
										firingIndex--;
									}
								}
							}
						});
					}
					return this;
				},
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
				},
				// Remove all callbacks from the list
				empty: function() {
					list = [];
					firingLength = 0;
					return this;
				},
				// Have the list do nothing anymore
				disable: function() {
					list = stack = memory = undefined;
					return this;
				},
				// Is it disabled?
				disabled: function() {
					return !list;
				},
				// Lock the list in its current state
				lock: function() {
					stack = undefined;
					if ( !memory ) {
						self.disable();
					}
					return this;
				},
				// Is it locked?
				locked: function() {
					return !stack;
				},
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( list && ( !fired || stack ) ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						if ( firing ) {
							stack.push( args );
						} else {
							fire( args );
						}
					}
					return this;
				},
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};

		return self;
	};


	jQuery.extend({

		Deferred: function( func ) {
			var tuples = [
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks("memory") ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred(function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[1] ](function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.done( newDefer.resolve )
											.fail( newDefer.reject )
											.progress( newDefer.notify );
									} else {
										newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
									}
								});
							});
							fns = null;
						}).promise();
					},
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};

			// Keep pipe for back-compat
			promise.pipe = promise.then;

			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];

				// promise[ done | fail | progress ] = list.add
				promise[ tuple[1] ] = list.add;

				// Handle state
				if ( stateString ) {
					list.add(function() {
						// state = [ resolved | rejected ]
						state = stateString;

					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}

				// deferred[ resolve | reject | notify ]
				deferred[ tuple[0] ] = function() {
					deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[0] + "With" ] = list.fireWith;
			});

			// Make the deferred a promise
			promise.promise( deferred );

			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}

			// All done!
			return deferred;
		},

		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,

				// the count of uncompleted subordinates
				remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

				// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},

				progressValues, progressContexts, resolveContexts;

			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject )
							.progress( updateFunc( i, progressContexts, progressValues ) );
					} else {
						--remaining;
					}
				}
			}

			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}

			return deferred.promise();
		}
	});


	// The deferred used on DOM ready
	var readyList;

	jQuery.fn.ready = function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	};

	jQuery.extend({
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,

		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,

		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},

		// Handle when the DOM is ready
		ready: function( wait ) {

			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}

			// Remember that the DOM is ready
			jQuery.isReady = true;

			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}

			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );

			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	});

	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );
		jQuery.ready();
	}

	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {

			readyList = jQuery.Deferred();

			// Catch cases where $(document).ready() is called after the browser event has already occurred.
			// We once tried to use readyState "interactive" here, but it caused issues like the one
			// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
			if ( document.readyState === "complete" ) {
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				setTimeout( jQuery.ready );

			} else {

				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed, false );

				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed, false );
			}
		}
		return readyList.promise( obj );
	};

	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();




	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[0], key ) : emptyGet;
	};


	/**
	 * Determines whether an object can have data
	 */
	jQuery.acceptData = function( owner ) {
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};


	function Data() {
		// Support: Android<4,
		// Old WebKit does not have Object.preventExtensions/freeze method,
		// return new empty object instead with no [[set]] accessor
		Object.defineProperty( this.cache = {}, 0, {
			get: function() {
				return {};
			}
		});

		this.expando = jQuery.expando + Data.uid++;
	}

	Data.uid = 1;
	Data.accepts = jQuery.acceptData;

	Data.prototype = {
		key: function( owner ) {
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return the key for a frozen object.
			if ( !Data.accepts( owner ) ) {
				return 0;
			}

			var descriptor = {},
				// Check if the owner object already has a cache key
				unlock = owner[ this.expando ];

			// If not, create one
			if ( !unlock ) {
				unlock = Data.uid++;

				// Secure it in a non-enumerable, non-writable property
				try {
					descriptor[ this.expando ] = { value: unlock };
					Object.defineProperties( owner, descriptor );

				// Support: Android<4
				// Fallback to a less secure definition
				} catch ( e ) {
					descriptor[ this.expando ] = unlock;
					jQuery.extend( owner, descriptor );
				}
			}

			// Ensure the cache object
			if ( !this.cache[ unlock ] ) {
				this.cache[ unlock ] = {};
			}

			return unlock;
		},
		set: function( owner, data, value ) {
			var prop,
				// There may be an unlock assigned to this node,
				// if there is no entry for this "owner", create one inline
				// and set the unlock as though an owner entry had always existed
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;

			// Handle: [ owner, { properties } ] args
			} else {
				// Fresh assignments by object are shallow copied
				if ( jQuery.isEmptyObject( cache ) ) {
					jQuery.extend( this.cache[ unlock ], data );
				// Otherwise, copy the properties one-by-one to the cache object
				} else {
					for ( prop in data ) {
						cache[ prop ] = data[ prop ];
					}
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			// Either a valid cache is found, or will be created.
			// New caches will be created and the unlock returned,
			// allowing direct access to the newly created
			// empty data object. A valid owner object must be provided.
			var cache = this.cache[ this.key( owner ) ];

			return key === undefined ?
				cache : cache[ key ];
		},
		access: function( owner, key, value ) {
			var stored;
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					((key && typeof key === "string") && value === undefined) ) {

				stored = this.get( owner, key );

				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase(key) );
			}

			// [*]When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );

			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				unlock = this.key( owner ),
				cache = this.cache[ unlock ];

			if ( key === undefined ) {
				this.cache[ unlock ] = {};

			} else {
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}

				i = name.length;
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
		},
		hasData: function( owner ) {
			return !jQuery.isEmptyObject(
				this.cache[ owner[ this.expando ] ] || {}
			);
		},
		discard: function( owner ) {
			if ( owner[ this.expando ] ) {
				delete this.cache[ owner[ this.expando ] ];
			}
		}
	};
	var data_priv = new Data();

	var data_user = new Data();



	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /([A-Z])/g;

	function dataAttr( elem, key, data ) {
		var name;

		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
			data = elem.getAttribute( name );

			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch( e ) {}

				// Make sure we set the data so it isn't changed later
				data_user.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}

	jQuery.extend({
		hasData: function( elem ) {
			return data_user.hasData( elem ) || data_priv.hasData( elem );
		},

		data: function( elem, name, data ) {
			return data_user.access( elem, name, data );
		},

		removeData: function( elem, name ) {
			data_user.remove( elem, name );
		},

		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to data_priv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return data_priv.access( elem, name, data );
		},

		_removeData: function( elem, name ) {
			data_priv.remove( elem, name );
		}
	});

	jQuery.fn.extend({
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;

			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = data_user.get( elem );

					if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {

							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice(5) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						data_priv.set( elem, "hasDataAttrs", true );
					}
				}

				return data;
			}

			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each(function() {
					data_user.set( this, key );
				});
			}

			return access( this, function( value ) {
				var data,
					camelKey = jQuery.camelCase( key );

				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
					// Attempt to get data from the cache
					// with the key as-is
					data = data_user.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to get data from the cache
					// with the key camelized
					data = data_user.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}

					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}

					// We tried really hard, but the data doesn't exist.
					return;
				}

				// Set the data...
				this.each(function() {
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = data_user.get( this, camelKey );

					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					data_user.set( this, camelKey, value );

					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf("-") !== -1 && data !== undefined ) {
						data_user.set( this, key, value );
					}
				});
			}, null, value, arguments.length > 1, null, true );
		},

		removeData: function( key ) {
			return this.each(function() {
				data_user.remove( this, key );
			});
		}
	});


	jQuery.extend({
		queue: function( elem, type, data ) {
			var queue;

			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = data_priv.get( elem, type );

				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = data_priv.access( elem, type, jQuery.makeArray(data) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},

		dequeue: function( elem, type ) {
			type = type || "fx";

			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};

			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}

			if ( fn ) {

				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}

				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}

			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},

		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return data_priv.get( elem, key ) || data_priv.access( elem, key, {
				empty: jQuery.Callbacks("once memory").add(function() {
					data_priv.remove( elem, [ type + "queue", key ] );
				})
			});
		}
	});

	jQuery.fn.extend({
		queue: function( type, data ) {
			var setter = 2;

			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}

			if ( arguments.length < setter ) {
				return jQuery.queue( this[0], type );
			}

			return data === undefined ?
				this :
				this.each(function() {
					var queue = jQuery.queue( this, type, data );

					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );

					if ( type === "fx" && queue[0] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				});
		},
		dequeue: function( type ) {
			return this.each(function() {
				jQuery.dequeue( this, type );
			});
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};

			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";

			while ( i-- ) {
				tmp = data_priv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	});
	var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

	var isHidden = function( elem, el ) {
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
		};

	var rcheckableType = (/^(?:checkbox|radio)$/i);



	(function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );

		// Support: Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );

		div.appendChild( input );

		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	})();
	var strundefined = typeof undefined;



	support.focusinBubbles = "onfocusin" in window;


	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
		rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

	function returnTrue() {
		return true;
	}

	function returnFalse() {
		return false;
	}

	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}

	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {

		global: {},

		add: function( elem, types, handler, data, selector ) {

			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.get( elem );

			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}

			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}

			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}

			// Init the element's event structure and main handler, if this is the first
			if ( !(events = elemData.events) ) {
				events = elemData.events = {};
			}
			if ( !(eventHandle = elemData.handle) ) {
				eventHandle = elemData.handle = function( e ) {
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}

			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}

				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};

				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;

				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};

				// handleObj is passed to all event handlers
				handleObj = jQuery.extend({
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join(".")
				}, handleObjIn );

				// Init the event handler queue if we're the first
				if ( !(handlers = events[ type ]) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;

					// Only use addEventListener if the special events handler returns false
					if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle, false );
						}
					}
				}

				if ( special.add ) {
					special.add.call( elem, handleObj );

					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}

				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}

				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}

		},

		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {

			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = data_priv.hasData( elem ) && data_priv.get( elem );

			if ( !elemData || !(events = elemData.events) ) {
				return;
			}

			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[t] ) || [];
				type = origType = tmp[1];
				namespaces = ( tmp[2] || "" ).split( "." ).sort();

				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}

				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];

					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );

						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}

				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
						jQuery.removeEvent( elem, type, elemData.handle );
					}

					delete events[ type ];
				}
			}

			// Remove the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				delete elemData.handle;
				data_priv.remove( elem, "events" );
			}
		},

		trigger: function( event, data, elem, onlyHandlers ) {

			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

			cur = tmp = elem = elem || document;

			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}

			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}

			if ( type.indexOf(".") >= 0 ) {
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split(".");
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf(":") < 0 && "on" + type;

			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );

			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join(".");
			event.namespace_re = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
				null;

			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}

			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );

			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}

			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}

				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === (elem.ownerDocument || document) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}

			// Fire handlers on the event path
			i = 0;
			while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;

				// jQuery handler
				handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}

				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;

			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {

				if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
					jQuery.acceptData( elem ) ) {

					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];

						if ( tmp ) {
							elem[ ontype ] = null;
						}

						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;

						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}

			return event.result;
		},

		dispatch: function( event ) {

			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );

			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};

			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[0] = event;
			event.delegateTarget = this;

			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}

			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );

			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;

				j = 0;
				while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

						event.handleObj = handleObj;
						event.data = handleObj.data;

						ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
								.apply( matched.elem, args );

						if ( ret !== undefined ) {
							if ( (event.result = ret) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}

			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}

			return event.result;
		},

		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;

			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			// Avoid non-left-click bubbling in Firefox (#3861)
			if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

				for ( ; cur !== this; cur = cur.parentNode || this ) {

					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.disabled !== true || event.type !== "click" ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];

							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";

							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) >= 0 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push({ elem: cur, handlers: matches });
						}
					}
				}
			}

			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
			}

			return handlerQueue;
		},

		// Includes some event props shared by KeyEvent and MouseEvent
		props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

		fixHooks: {},

		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function( event, original ) {

				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}

				return event;
			}
		},

		mouseHooks: {
			props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;

				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;

					event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}

				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}

				return event;
			}
		},

		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}

			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];

			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

			event = new jQuery.Event( originalEvent );

			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}

			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}

			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}

			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},

		special: {
			load: {
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},

				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},

			beforeunload: {
				postDispatch: function( event ) {

					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		},

		simulate: function( type, elem, event, bubble ) {
			// Piggyback on a donor event to simulate a different one.
			// Fake originalEvent to avoid donor's stopPropagation, but if the
			// simulated event prevents default then we do the same on the donor.
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true,
					originalEvent: {}
				}
			);
			if ( bubble ) {
				jQuery.event.trigger( e, null, elem );
			} else {
				jQuery.event.dispatch.call( elem, e );
			}
			if ( e.isDefaultPrevented() ) {
				event.preventDefault();
			}
		}
	};

	jQuery.removeEvent = function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	};

	jQuery.Event = function( src, props ) {
		// Allow instantiation without the 'new' keyword
		if ( !(this instanceof jQuery.Event) ) {
			return new jQuery.Event( src, props );
		}

		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;

			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;

		// Event type
		} else {
			this.type = src;
		}

		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}

		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();

		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};

	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,

		preventDefault: function() {
			var e = this.originalEvent;

			this.isDefaultPrevented = returnTrue;

			if ( e && e.preventDefault ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;

			this.isPropagationStopped = returnTrue;

			if ( e && e.stopPropagation ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;

			this.isImmediatePropagationStopped = returnTrue;

			if ( e && e.stopImmediatePropagation ) {
				e.stopImmediatePropagation();
			}

			this.stopPropagation();
		}
	};

	// Create mouseenter/leave events using mouseover/out and event-time checks
	// Support: Chrome 15+
	jQuery.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,

			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;

				// For mousenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	});

	// Support: Firefox, Chrome, Safari
	// Create "bubbling" focus and blur events
	if ( !support.focusinBubbles ) {
		jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
					jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
				};

			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix );

					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = data_priv.access( doc, fix ) - 1;

					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						data_priv.remove( doc, fix );

					} else {
						data_priv.access( doc, fix, attaches );
					}
				}
			};
		});
	}

	jQuery.fn.extend({

		on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
			var origFn, type;

			// Types can be a map of types/handlers
			if ( typeof types === "object" ) {
				// ( types-Object, selector, data )
				if ( typeof selector !== "string" ) {
					// ( types-Object, data )
					data = data || selector;
					selector = undefined;
				}
				for ( type in types ) {
					this.on( type, selector, data, types[ type ], one );
				}
				return this;
			}

			if ( data == null && fn == null ) {
				// ( types, fn )
				fn = selector;
				data = selector = undefined;
			} else if ( fn == null ) {
				if ( typeof selector === "string" ) {
					// ( types, selector, fn )
					fn = data;
					data = undefined;
				} else {
					// ( types, data, fn )
					fn = data;
					data = selector;
					selector = undefined;
				}
			}
			if ( fn === false ) {
				fn = returnFalse;
			} else if ( !fn ) {
				return this;
			}

			if ( one === 1 ) {
				origFn = fn;
				fn = function( event ) {
					// Can use an empty set, since event contains the info
					jQuery().off( event );
					return origFn.apply( this, arguments );
				};
				// Use same guid so caller can remove using origFn
				fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
			}
			return this.each( function() {
				jQuery.event.add( this, types, fn, data, selector );
			});
		},
		one: function( types, selector, data, fn ) {
			return this.on( types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each(function() {
				jQuery.event.remove( this, types, fn, selector );
			});
		},

		trigger: function( type, data ) {
			return this.each(function() {
				jQuery.event.trigger( type, data, this );
			});
		},
		triggerHandler: function( type, data ) {
			var elem = this[0];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	});


	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
		rtagName = /<([\w:]+)/,
		rhtml = /<|&#?\w+;/,
		rnoInnerhtml = /<(?:script|style|link)/i,
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptType = /^$|\/(?:java|ecma)script/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

		// We have to close these tags to support XHTML (#13200)
		wrapMap = {

			// Support: IE9
			option: [ 1, "<select multiple='multiple'>", "</select>" ],

			thead: [ 1, "<table>", "</table>" ],
			col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
			tr: [ 2, "<table><tbody>", "</tbody></table>" ],
			td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

			_default: [ 0, "", "" ]
		};

	// Support: IE9
	wrapMap.optgroup = wrapMap.option;

	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;

	// Support: 1.x compatibility
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

			elem.getElementsByTagName("tbody")[0] ||
				elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
			elem;
	}

	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );

		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute("type");
		}

		return elem;
	}

	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			data_priv.set(
				elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
			);
		}
	}

	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

		if ( dest.nodeType !== 1 ) {
			return;
		}

		// 1. Copy private data: events, handlers, etc.
		if ( data_priv.hasData( src ) ) {
			pdataOld = data_priv.access( src );
			pdataCur = data_priv.set( dest, pdataOld );
			events = pdataOld.events;

			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};

				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}

		// 2. Copy user data
		if ( data_user.hasData( src ) ) {
			udataOld = data_user.access( src );
			udataCur = jQuery.extend( {}, udataOld );

			data_user.set( dest, udataCur );
		}
	}

	function getAll( context, tag ) {
		var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
				context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
				[];

		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}

	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();

		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;

		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}

	jQuery.extend({
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );

			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {

				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}

			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );

					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}

			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}

			// Return the cloned set
			return clone;
		},

		buildFragment: function( elems, context, scripts, selection ) {
			var elem, tmp, tag, wrap, contains, j,
				fragment = context.createDocumentFragment(),
				nodes = [],
				i = 0,
				l = elems.length;

			for ( ; i < l; i++ ) {
				elem = elems[ i ];

				if ( elem || elem === 0 ) {

					// Add nodes directly
					if ( jQuery.type( elem ) === "object" ) {
						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

					// Convert non-html into a text node
					} else if ( !rhtml.test( elem ) ) {
						nodes.push( context.createTextNode( elem ) );

					// Convert html into DOM nodes
					} else {
						tmp = tmp || fragment.appendChild( context.createElement("div") );

						// Deserialize a standard representation
						tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
						wrap = wrapMap[ tag ] || wrapMap._default;
						tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

						// Descend through wrappers to the right content
						j = wrap[ 0 ];
						while ( j-- ) {
							tmp = tmp.lastChild;
						}

						// Support: QtWebKit, PhantomJS
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( nodes, tmp.childNodes );

						// Remember the top-level container
						tmp = fragment.firstChild;

						// Ensure the created nodes are orphaned (#12392)
						tmp.textContent = "";
					}
				}
			}

			// Remove wrapper from fragment
			fragment.textContent = "";

			i = 0;
			while ( (elem = nodes[ i++ ]) ) {

				// #4087 - If origin and destination elements are the same, and this is
				// that element, do not do anything
				if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
					continue;
				}

				contains = jQuery.contains( elem.ownerDocument, elem );

				// Append to fragment
				tmp = getAll( fragment.appendChild( elem ), "script" );

				// Preserve script evaluation history
				if ( contains ) {
					setGlobalEval( tmp );
				}

				// Capture executables
				if ( scripts ) {
					j = 0;
					while ( (elem = tmp[ j++ ]) ) {
						if ( rscriptType.test( elem.type || "" ) ) {
							scripts.push( elem );
						}
					}
				}
			}

			return fragment;
		},

		cleanData: function( elems ) {
			var data, elem, type, key,
				special = jQuery.event.special,
				i = 0;

			for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
				if ( jQuery.acceptData( elem ) ) {
					key = elem[ data_priv.expando ];

					if ( key && (data = data_priv.cache[ key ]) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );

								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
						if ( data_priv.cache[ key ] ) {
							// Discard any remaining `private` data
							delete data_priv.cache[ key ];
						}
					}
				}
				// Discard any remaining `user` data
				delete data_user.cache[ elem[ data_user.expando ] ];
			}
		}
	});

	jQuery.fn.extend({
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each(function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					});
			}, null, value, arguments.length );
		},

		append: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			});
		},

		prepend: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			});
		},

		before: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			});
		},

		after: function() {
			return this.domManip( arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			});
		},

		remove: function( selector, keepData /* Internal Use Only */ ) {
			var elem,
				elems = selector ? jQuery.filter( selector, this ) : this,
				i = 0;

			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( !keepData && elem.nodeType === 1 ) {
					jQuery.cleanData( getAll( elem ) );
				}

				if ( elem.parentNode ) {
					if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
						setGlobalEval( getAll( elem, "script" ) );
					}
					elem.parentNode.removeChild( elem );
				}
			}

			return this;
		},

		empty: function() {
			var elem,
				i = 0;

			for ( ; (elem = this[i]) != null; i++ ) {
				if ( elem.nodeType === 1 ) {

					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );

					// Remove any remaining nodes
					elem.textContent = "";
				}
			}

			return this;
		},

		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

			return this.map(function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			});
		},

		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;

				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}

				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

					value = value.replace( rxhtmlTag, "<$1></$2>" );

					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};

							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}

						elem = 0;

					// If using innerHTML throws an exception, use the fallback method
					} catch( e ) {}
				}

				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},

		replaceWith: function() {
			var arg = arguments[ 0 ];

			// Make the changes, replacing each context element with the new content
			this.domManip( arguments, function( elem ) {
				arg = this.parentNode;

				jQuery.cleanData( getAll( this ) );

				if ( arg ) {
					arg.replaceChild( elem, this );
				}
			});

			// Force removal if there was no new content (e.g., from empty arguments)
			return arg && (arg.length || arg.nodeType) ? this : this.remove();
		},

		detach: function( selector ) {
			return this.remove( selector, true );
		},

		domManip: function( args, callback ) {

			// Flatten any nested arrays
			args = concat.apply( [], args );

			var fragment, first, scripts, hasScripts, node, doc,
				i = 0,
				l = this.length,
				set = this,
				iNoClone = l - 1,
				value = args[ 0 ],
				isFunction = jQuery.isFunction( value );

			// We can't cloneNode fragments that contain checked, in WebKit
			if ( isFunction ||
					( l > 1 && typeof value === "string" &&
						!support.checkClone && rchecked.test( value ) ) ) {
				return this.each(function( index ) {
					var self = set.eq( index );
					if ( isFunction ) {
						args[ 0 ] = value.call( this, index, self.html() );
					}
					self.domManip( args, callback );
				});
			}

			if ( l ) {
				fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
				first = fragment.firstChild;

				if ( fragment.childNodes.length === 1 ) {
					fragment = first;
				}

				if ( first ) {
					scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
					hasScripts = scripts.length;

					// Use the original fragment for the last item instead of the first because it can end up
					// being emptied incorrectly in certain situations (#8070).
					for ( ; i < l; i++ ) {
						node = fragment;

						if ( i !== iNoClone ) {
							node = jQuery.clone( node, true, true );

							// Keep references to cloned scripts for later restoration
							if ( hasScripts ) {
								// Support: QtWebKit
								// jQuery.merge because push.apply(_, arraylike) throws
								jQuery.merge( scripts, getAll( node, "script" ) );
							}
						}

						callback.call( this[ i ], node, i );
					}

					if ( hasScripts ) {
						doc = scripts[ scripts.length - 1 ].ownerDocument;

						// Reenable scripts
						jQuery.map( scripts, restoreScript );

						// Evaluate executable scripts on first document insertion
						for ( i = 0; i < hasScripts; i++ ) {
							node = scripts[ i ];
							if ( rscriptType.test( node.type || "" ) &&
								!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

								if ( node.src ) {
									// Optional AJAX dependency, but won't run scripts if not present
									if ( jQuery._evalUrl ) {
										jQuery._evalUrl( node.src );
									}
								} else {
									jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
								}
							}
						}
					}
				}
			}

			return this;
		}
	});

	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;

			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );

				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}

			return this.pushStack( ret );
		};
	});


	var iframe,
		elemdisplay = {};

	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var style,
			elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

			// getDefaultComputedStyle might be reliably used only on attached element
			display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

				// Use of this method is a temporary fix (more like optimization) until something better comes along,
				// since it was removed from specification and supported only in FF
				style.display : jQuery.css( elem[ 0 ], "display" );

		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();

		return display;
	}

	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];

		if ( !display ) {
			display = actualDisplay( nodeName, doc );

			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {

				// Use the already-created iframe if possible
				iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;

				// Support: IE
				doc.write();
				doc.close();

				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}

			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}

		return display;
	}
	var rmargin = (/^margin/);

	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

	var getStyles = function( elem ) {
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			if ( elem.ownerDocument.defaultView.opener ) {
				return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
			}

			return window.getComputedStyle( elem, null );
		};



	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
		}

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// Support: iOS < 6
			// A tribute to the "awesome hack by Dean Edwards"
			// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret !== undefined ?
			// Support: IE
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}


	function addGetHookIf( conditionFn, hookFn ) {
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}

				// Hook needed; redefine it so that the support test is not executed again.
				return (this.get = hookFn).apply( this, arguments );
			}
		};
	}


	(function() {
		var pixelPositionVal, boxSizingReliableVal,
			docElem = document.documentElement,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );

		if ( !div.style ) {
			return;
		}

		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";

		container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
			"position:absolute";
		container.appendChild( div );

		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computePixelPositionAndBoxSizingReliable() {
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
				"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
				"border:1px;padding:1px;width:4px;position:absolute";
			div.innerHTML = "";
			docElem.appendChild( container );

			var divStyle = window.getComputedStyle( div, null );
			pixelPositionVal = divStyle.top !== "1%";
			boxSizingReliableVal = divStyle.width === "4px";

			docElem.removeChild( container );
		}

		// Support: node.js jsdom
		// Don't assume that getComputedStyle is a property of the global object
		if ( window.getComputedStyle ) {
			jQuery.extend( support, {
				pixelPosition: function() {

					// This test is executed only once but we still do memoizing
					// since we can use the boxSizingReliable pre-computing.
					// No need to check if the test was already performed, though.
					computePixelPositionAndBoxSizingReliable();
					return pixelPositionVal;
				},
				boxSizingReliable: function() {
					if ( boxSizingReliableVal == null ) {
						computePixelPositionAndBoxSizingReliable();
					}
					return boxSizingReliableVal;
				},
				reliableMarginRight: function() {

					// Support: Android 2.3
					// Check if div with explicit width and no margin-right incorrectly
					// gets computed margin-right based on width of container. (#3333)
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// This support function is only executed once so no memoizing is needed.
					var ret,
						marginDiv = div.appendChild( document.createElement( "div" ) );

					// Reset CSS: box-sizing; display; margin; border; padding
					marginDiv.style.cssText = div.style.cssText =
						// Support: Firefox<29, Android 2.3
						// Vendor-prefix box-sizing
						"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
						"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
					marginDiv.style.marginRight = marginDiv.style.width = "0";
					div.style.width = "1px";
					docElem.appendChild( container );

					ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

					docElem.removeChild( container );
					div.removeChild( marginDiv );

					return ret;
				}
			});
		}
	})();


	// A method for quickly swapping in/out CSS properties to get correct calculations.
	jQuery.swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	};


	var
		// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
		rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},

		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( style, name ) {

		// Shortcut for names that are not vendor prefixed
		if ( name in style ) {
			return name;
		}

		// Check for vendor prefixed names
		var capName = name[0].toUpperCase() + name.slice(1),
			origName = name,
			i = cssPrefixes.length;

		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in style ) {
				return name;
			}
		}

		return origName;
	}

	function setPositiveNumber( elem, value, subtract ) {
		var matches = rnumsplit.exec( value );
		return matches ?
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
			value;
	}

	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
			// If we already have the right measurement, avoid augmentation
			4 :
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,

			val = 0;

		for ( ; i < 4; i += 2 ) {
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}

			if ( isBorderBox ) {
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}

				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}

		return val;
	}

	function getWidthOrHeight( elem, name, extra ) {

		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}

			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test(val) ) {
				return val;
			}

			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );

			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}

		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}

	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;

		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}

			values[ index ] = data_priv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}

				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
				}
			} else {
				hidden = isHidden( elem );

				if ( display !== "none" || !hidden ) {
					data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}

		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}

		return elements;
	}

	jQuery.extend({

		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {

						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},

		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},

		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},

		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {

			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}

			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;

			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;

				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && (ret = rrelNum.exec( value )) ) {
					value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
					// Fixes bug #9237
					type = "number";
				}

				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}

				// If a number, add 'px' to the (except for certain CSS properties)
				if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
					value += "px";
				}

				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}

				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
					style[ name ] = value;
				}

			} else {
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
					return ret;
				}

				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},

		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );

			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}

			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}

			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}

			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
			}
			return val;
		}
	});

	jQuery.each([ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {

					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
						jQuery.swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						}) :
						getWidthOrHeight( elem, name, extra );
				}
			},

			set: function( elem, value, extra ) {
				var styles = extra && getStyles( elem );
				return setPositiveNumber( elem, value, extra ?
					augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					) : 0
				);
			}
		};
	});

	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return jQuery.swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);

	// These hooks are used by animate to expand properties
	jQuery.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},

					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split(" ") : [ value ];

				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}

				return expanded;
			}
		};

		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	});

	jQuery.fn.extend({
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;

				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;

					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}

					return map;
				}

				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}

			return this.each(function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			});
		}
	});


	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;

	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || "swing";
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];

			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];

			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;

			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}

			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};

	Tween.prototype.init.prototype = Tween.prototype;

	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;

				if ( tween.elem[ tween.prop ] != null &&
					(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
					return tween.elem[ tween.prop ];
				}

				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};

	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};

	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		}
	};

	jQuery.fx = Tween.prototype.init;

	// Back Compat <1.8 extension point
	jQuery.fx.step = {};




	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
		rrun = /queueHooks$/,
		animationPrefilters = [ defaultPrefilter ],
		tweeners = {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value ),
					target = tween.cur(),
					parts = rfxnum.exec( value ),
					unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

					// Starting value computation is required for potential unit mismatches
					start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
						rfxnum.exec( jQuery.css( tween.elem, prop ) ),
					scale = 1,
					maxIterations = 20;

				if ( start && start[ 3 ] !== unit ) {
					// Trust units reported by jQuery.css
					unit = unit || start[ 3 ];

					// Make sure we update the tween properties later on
					parts = parts || [];

					// Iteratively approximate from a nonzero starting point
					start = +target || 1;

					do {
						// If previous iteration zeroed out, double until we get *something*.
						// Use string for doubling so we don't accidentally see scale as unchanged below
						scale = scale || ".5";

						// Adjust and apply
						start = start / scale;
						jQuery.style( tween.elem, prop, start + unit );

					// Update scale, tolerating zero or NaN from tween.cur(),
					// break the loop if scale is unchanged or perfect, or if we've just had enough
					} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
				}

				// Update tween properties
				if ( parts ) {
					start = tween.start = +start || +target || 0;
					tween.unit = unit;
					// If a +=/-= token was provided, we're doing a relative animation
					tween.end = parts[ 1 ] ?
						start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
						+parts[ 2 ];
				}

				return tween;
			} ]
		};

	// Animations created synchronously will run synchronously
	function createFxNow() {
		setTimeout(function() {
			fxNow = undefined;
		});
		return ( fxNow = jQuery.now() );
	}

	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };

		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}

		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}

		return attrs;
	}

	function createTween( value, prop, animation ) {
		var tween,
			collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( (tween = collection[ index ].call( animation, prop, value )) ) {

				// We're done with this property
				return tween;
			}
		}
	}

	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = data_priv.get( elem, "fxshow" );

		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;

			anim.always(function() {
				// Ensure the complete handler is called before this completes
				anim.always(function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				});
			});
		}

		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );

			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}

		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}

		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {

					// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}

		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = data_priv.access( elem, "fxshow", {} );
			}

			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done(function() {
					jQuery( elem ).hide();
				});
			}
			anim.done(function() {
				var prop;

				data_priv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			});
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}

		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
			style.display = display;
		}
	}

	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;

		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}

			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}

			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];

				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}

	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = animationPrefilters.length,
			deferred = jQuery.Deferred().always( function() {
				// Don't match elem in the :animated selector
				delete tick.elem;
			}),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;

				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}

				deferred.notifyWith( elem, [ animation, percent, remaining ]);

				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise({
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, { specialEasing: {} }, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}

					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			}),
			props = animation.props;

		propFilter( props, animation.opts.specialEasing );

		for ( ; index < length ; index++ ) {
			result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				return result;
			}
		}

		jQuery.map( props, createTween, animation );

		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}

		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			})
		);

		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}

	jQuery.Animation = jQuery.extend( Animation, {

		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.split(" ");
			}

			var prop,
				index = 0,
				length = props.length;

			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				tweeners[ prop ] = tweeners[ prop ] || [];
				tweeners[ prop ].unshift( callback );
			}
		},

		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				animationPrefilters.unshift( callback );
			} else {
				animationPrefilters.push( callback );
			}
		}
	});

	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}

		// Queueing
		opt.old = opt.complete;

		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};

		return opt;
	};

	jQuery.fn.extend({
		fadeTo: function( speed, to, easing, callback ) {

			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()

				// Animate to the value specified
				.end().animate({ opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );

					// Empty animations, or finishing resolves immediately
					if ( empty || data_priv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;

			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};

			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}

			return this.each(function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = data_priv.get( this );

				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}

				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}

				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			});
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each(function() {
				var index,
					data = data_priv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;

				// Enable finishing flag on private data
				data.finish = true;

				// Empty the queue first
				jQuery.queue( this, type, [] );

				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}

				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}

				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}

				// Turn off finishing flag
				delete data.finish;
			});
		}
	});

	jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	});

	// Generate shortcuts for custom animations
	jQuery.each({
		slideDown: genFx("show"),
		slideUp: genFx("hide"),
		slideToggle: genFx("toggle"),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	});

	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;

		fxNow = jQuery.now();

		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};

	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};

	jQuery.fx.interval = 13;

	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};

	jQuery.fx.stop = function() {
		clearInterval( timerId );
		timerId = null;
	};

	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	};


	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	};


	(function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );

		input.type = "checkbox";

		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";

		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;

		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;

		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	})();


	var nodeHook, boolHook,
		attrHandle = jQuery.expr.attrHandle;

	jQuery.fn.extend({
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},

		removeAttr: function( name ) {
			return this.each(function() {
				jQuery.removeAttr( this, name );
			});
		}
	});

	jQuery.extend({
		attr: function( elem, name, value ) {
			var hooks, ret,
				nType = elem.nodeType;

			// don't get/set attributes on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === strundefined ) {
				return jQuery.prop( elem, name, value );
			}

			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
			}

			if ( value !== undefined ) {

				if ( value === null ) {
					jQuery.removeAttr( elem, name );

				} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
					return ret;

				} else {
					elem.setAttribute( name, value + "" );
					return value;
				}

			} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
				return ret;

			} else {
				ret = jQuery.find.attr( elem, name );

				// Non-existent attributes return null, we normalize to undefined
				return ret == null ?
					undefined :
					ret;
			}
		},

		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );

			if ( attrNames && elem.nodeType === 1 ) {
				while ( (name = attrNames[i++]) ) {
					propName = jQuery.propFix[ name ] || name;

					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
						// Set corresponding property to false
						elem[ propName ] = false;
					}

					elem.removeAttribute( name );
				}
			}
		},

		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		}
	});

	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;

		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	});




	var rfocusable = /^(?:input|select|textarea|button)$/i;

	jQuery.fn.extend({
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},

		removeProp: function( name ) {
			return this.each(function() {
				delete this[ jQuery.propFix[ name ] || name ];
			});
		}
	});

	jQuery.extend({
		propFix: {
			"for": "htmlFor",
			"class": "className"
		},

		prop: function( elem, name, value ) {
			var ret, hooks, notxml,
				nType = elem.nodeType;

			// Don't get/set properties on text, comment and attribute nodes
			if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}

			notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

			if ( notxml ) {
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}

			if ( value !== undefined ) {
				return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
					ret :
					( elem[ name ] = value );

			} else {
				return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
					ret :
					elem[ name ];
			}
		},

		propHooks: {
			tabIndex: {
				get: function( elem ) {
					return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
						elem.tabIndex :
						-1;
				}
			}
		}
	});

	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			}
		};
	}

	jQuery.each([
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	});




	var rclass = /[\t\r\n\f]/g;

	jQuery.fn.extend({
		addClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).addClass( value.call( this, j, this.className ) );
				});
			}

			if ( proceed ) {
				// The disjunction here is for better compressibility (see removeClass)
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						" "
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}

						// only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		removeClass: function( value ) {
			var classes, elem, cur, clazz, j, finalValue,
				proceed = arguments.length === 0 || typeof value === "string" && value,
				i = 0,
				len = this.length;

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( j ) {
					jQuery( this ).removeClass( value.call( this, j, this.className ) );
				});
			}
			if ( proceed ) {
				classes = ( value || "" ).match( rnotwhite ) || [];

				for ( ; i < len; i++ ) {
					elem = this[ i ];
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( elem.className ?
						( " " + elem.className + " " ).replace( rclass, " " ) :
						""
					);

					if ( cur ) {
						j = 0;
						while ( (clazz = classes[j++]) ) {
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}

						// Only assign if different to avoid unneeded rendering.
						finalValue = value ? jQuery.trim( cur ) : "";
						if ( elem.className !== finalValue ) {
							elem.className = finalValue;
						}
					}
				}
			}

			return this;
		},

		toggleClass: function( value, stateVal ) {
			var type = typeof value;

			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}

			if ( jQuery.isFunction( value ) ) {
				return this.each(function( i ) {
					jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
				});
			}

			return this.each(function() {
				if ( type === "string" ) {
					// Toggle individual class names
					var className,
						i = 0,
						self = jQuery( this ),
						classNames = value.match( rnotwhite ) || [];

					while ( (className = classNames[ i++ ]) ) {
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}

				// Toggle whole class name
				} else if ( type === strundefined || type === "boolean" ) {
					if ( this.className ) {
						// store className if set
						data_priv.set( this, "__className__", this.className );
					}

					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
				}
			});
		},

		hasClass: function( selector ) {
			var className = " " + selector + " ",
				i = 0,
				l = this.length;
			for ( ; i < l; i++ ) {
				if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
					return true;
				}
			}

			return false;
		}
	});




	var rreturn = /\r/g;

	jQuery.fn.extend({
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[0];

			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

					if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
						return ret;
					}

					ret = elem.value;

					return typeof ret === "string" ?
						// Handle most common string cases
						ret.replace(rreturn, "") :
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}

				return;
			}

			isFunction = jQuery.isFunction( value );

			return this.each(function( i ) {
				var val;

				if ( this.nodeType !== 1 ) {
					return;
				}

				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}

				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";

				} else if ( typeof val === "number" ) {
					val += "";

				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					});
				}

				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

				// If set returns undefined, fall back to normal setting
				if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			});
		}
	});

	jQuery.extend({
		valHooks: {
			option: {
				get: function( elem ) {
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						jQuery.trim( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;

					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];

						// IE6-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

							// Get the specific value for the option
							value = jQuery( option ).val();

							// We don't need an array for one selects
							if ( one ) {
								return value;
							}

							// Multi-Selects return an array
							values.push( value );
						}
					}

					return values;
				},

				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;

					while ( i-- ) {
						option = options[ i ];
						if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
							optionSet = true;
						}
					}

					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	});

	// Radios and checkboxes getter/setter
	jQuery.each([ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute("value") === null ? "on" : elem.value;
			};
		}
	});




	// Return jQuery for attributes-only inclusion


	jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	});

	jQuery.fn.extend({
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		},

		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},

		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
		}
	});


	var nonce = jQuery.now();

	var rquery = (/\?/);



	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};


	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}

		// Support: IE9
		try {
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}

		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};


	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
		rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},

		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},

		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),

		// Document location
		ajaxLocation = window.location.href,

		// Segment location into parts
		ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {

		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {

			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}

			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

			if ( jQuery.isFunction( func ) ) {
				// For each dataType in the dataTypeExpression
				while ( (dataType = dataTypes[i++]) ) {
					// Prepend if requested
					if ( dataType[0] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

					// Otherwise append
					} else {
						(structure[ dataType ] = structure[ dataType ] || []).push( func );
					}
				}
			}
		};
	}

	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

		var inspected = {},
			seekingTransport = ( structure === transports );

		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			});
			return selected;
		}

		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}

	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};

		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}

		return target;
	}

	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {

		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;

		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
			}
		}

		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}

		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}

		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}

	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();

		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}

		current = dataTypes.shift();

		// Convert to each sequential dataType
		while ( current ) {

			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}

			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}

			prev = current;
			current = dataTypes.shift();

			if ( current ) {

			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {

					current = prev;

				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {

					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];

					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {

							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {

								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];

									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}

					// Apply converter (if not an equivalence)
					if ( conv !== true ) {

						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s[ "throws" ] ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
							}
						}
					}
				}
			}
		}

		return { state: "success", data: response };
	}

	jQuery.extend({

		// Counter for holding the number of active queries
		active: 0,

		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},

		ajaxSettings: {
			url: ajaxLocation,
			type: "GET",
			isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/

			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},

			contents: {
				xml: /xml/,
				html: /html/,
				json: /json/
			},

			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},

			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {

				// Convert anything to text
				"* text": String,

				// Text to html (true = no transformation)
				"text html": true,

				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,

				// Parse text as xml
				"text xml": jQuery.parseXML
			},

			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},

		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?

				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},

		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),

		// Main method
		ajax: function( url, options ) {

			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}

			// Force options to be an object
			options = options || {};

			var transport,
				// URL without anti-cache param
				cacheURL,
				// Response headers
				responseHeadersString,
				responseHeaders,
				// timeout handle
				timeoutTimer,
				// Cross-domain detection vars
				parts,
				// To know if global events are to be dispatched
				fireGlobals,
				// Loop variable
				i,
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
				// Callbacks context
				callbackContext = s.context || s,
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks("once memory"),
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
				// The jqXHR state
				state = 0,
				// Default abort message
				strAbort = "canceled",
				// Fake xhr
				jqXHR = {
					readyState: 0,

					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( (match = rheaders.exec( responseHeadersString )) ) {
									responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},

					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},

					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},

					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},

					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},

					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};

			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;

			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
				.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;

			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

			// A cross-domain request is in order when we have a protocol:host:port mismatch
			if ( s.crossDomain == null ) {
				parts = rurl.exec( s.url.toLowerCase() );
				s.crossDomain = !!( parts &&
					( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
						( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
							( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
				);
			}

			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}

			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;

			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger("ajaxStart");
			}

			// Uppercase the type
			s.type = s.type.toUpperCase();

			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );

			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;

			// More options handling for requests with no content
			if ( !s.hasContent ) {

				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}

				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?

						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :

						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}

			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}

			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}

			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
					s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);

			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}

			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already and return
				return jqXHR.abort();
			}

			// Aborting is no longer a cancellation
			strAbort = "abort";

			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}

			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;

				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = setTimeout(function() {
						jqXHR.abort("timeout");
					}, s.timeout );
				}

				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}

			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;

				// Called once
				if ( state === 2 ) {
					return;
				}

				// State is "done" now
				state = 2;

				// Clear timeout if it exists
				if ( timeoutTimer ) {
					clearTimeout( timeoutTimer );
				}

				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;

				// Cache response headers
				responseHeadersString = headers || "";

				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;

				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;

				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}

				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );

				// If successful, handle type chaining
				if ( isSuccess ) {

					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader("Last-Modified");
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader("etag");
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}

					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";

					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";

					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}

				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";

				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}

				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;

				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}

				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger("ajaxStop");
					}
				}
			}

			return jqXHR;
		},

		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},

		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	});

	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}

			return jQuery.ajax({
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			});
		};
	});


	jQuery._evalUrl = function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	};


	jQuery.fn.extend({
		wrapAll: function( html ) {
			var wrap;

			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapAll( html.call(this, i) );
				});
			}

			if ( this[ 0 ] ) {

				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}

				wrap.map(function() {
					var elem = this;

					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}

					return elem;
				}).append( this );
			}

			return this;
		},

		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each(function( i ) {
					jQuery( this ).wrapInner( html.call(this, i) );
				});
			}

			return this.each(function() {
				var self = jQuery( this ),
					contents = self.contents();

				if ( contents.length ) {
					contents.wrapAll( html );

				} else {
					self.append( html );
				}
			});
		},

		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );

			return this.each(function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
			});
		},

		unwrap: function() {
			return this.parent().each(function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			}).end();
		}
	});


	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
	};
	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};




	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;

	function buildParams( prefix, obj, traditional, add ) {
		var name;

		if ( jQuery.isArray( obj ) ) {
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
					// Treat each array item as a scalar.
					add( prefix, v );

				} else {
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
				}
			});

		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}

		} else {
			// Serialize scalar item.
			add( prefix, obj );
		}
	}

	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};

	jQuery.fn.extend({
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map(function() {
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			})
			.filter(function() {
				var type = this.type;

				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			})
			.map(function( i, elem ) {
				var val = jQuery( this ).val();

				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						}) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			}).get();
		}
	});


	jQuery.ajaxSettings.xhr = function() {
		try {
			return new XMLHttpRequest();
		} catch( e ) {}
	};

	var xhrId = 0,
		xhrCallbacks = {},
		xhrSuccessStatus = {
			// file protocol always yields status code 0, assume 200
			0: 200,
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();

	// Support: IE9
	// Open requests must be manually aborted on unload (#5280)
	// See https://support.microsoft.com/kb/2856746 for more info
	if ( window.attachEvent ) {
		window.attachEvent( "onunload", function() {
			for ( var key in xhrCallbacks ) {
				xhrCallbacks[ key ]();
			}
		});
	}

	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;

	jQuery.ajaxTransport(function( options ) {
		var callback;

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}

					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								delete xhrCallbacks[ id ];
								callback = xhr.onload = xhr.onerror = null;

								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
									complete(
										// file: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
										// Support: IE9
										// Accessing binary-data responseText throws an exception
										// (#11426)
										typeof xhr.responseText === "string" ? {
											text: xhr.responseText
										} : undefined,
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};

					// Listen to events
					xhr.onload = callback();
					xhr.onerror = callback("error");

					// Create the abort callback
					callback = xhrCallbacks[ id ] = callback("abort");

					try {
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},

				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	// Install script dataType
	jQuery.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /(?:java|ecma)script/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	});

	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	});

	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery("<script>").prop({
						async: true,
						charset: s.scriptCharset,
						src: s.url
					}).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	});




	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;

	// Default jsonp settings
	jQuery.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	});

	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
			);

		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;

			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}

			// Use data converter to retrieve json after script execution
			s.converters["script json"] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};

			// force json dataType
			s.dataTypes[ 0 ] = "json";

			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};

			// Clean-up function (fires after converters)
			jqXHR.always(function() {
				// Restore preexisting value
				window[ callbackName ] = overwritten;

				// Save back as free
				if ( s[ callbackName ] ) {
					// make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;

					// save the callback name for future use
					oldCallbacks.push( callbackName );
				}

				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}

				responseContainer = overwritten = undefined;
			});

			// Delegate to script
			return "script";
		}
	});




	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );

		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}

		return jQuery.merge( [], parsed.childNodes );
	};


	// Keep a copy of the old load method
	var _load = jQuery.fn.load;

	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}

		var selector, type, response,
			self = this,
			off = url.indexOf(" ");

		if ( off >= 0 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}

		// If it's a function
		if ( jQuery.isFunction( params ) ) {

			// We assume that it's the callback
			callback = params;
			params = undefined;

		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}

		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax({
				url: url,

				// if "type" variable is undefined, then "GET" method will be used
				type: type,
				dataType: "html",
				data: params
			}).done(function( responseText ) {

				// Save response for use in complete callback
				response = arguments;

				self.html( selector ?

					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

					// Otherwise use the full result
					responseText );

			}).complete( callback && function( jqXHR, status ) {
				self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
			});
		}

		return this;
	};




	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	});




	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};




	var docElem = window.document.documentElement;

	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}

	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};

			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}

			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;

			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}

			if ( jQuery.isFunction( options ) ) {
				options = options.call( elem, i, curOffset );
			}

			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}

			if ( "using" in options ) {
				options.using.call( elem, props );

			} else {
				curElem.css( props );
			}
		}
	};

	jQuery.fn.extend({
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each(function( i ) {
						jQuery.offset.setOffset( this, options, i );
					});
			}

			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;

			if ( !doc ) {
				return;
			}

			docElem = doc.documentElement;

			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}

			// Support: BlackBerry 5, iOS 3 (original iPhone)
			// If we don't have gBCR, just use 0,0 rather than error
			if ( typeof elem.getBoundingClientRect !== strundefined ) {
				box = elem.getBoundingClientRect();
			}
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},

		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}

			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };

			// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();

			} else {
				// Get *real* offsetParent
				offsetParent = this.offsetParent();

				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}

				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}

			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},

		offsetParent: function() {
			return this.map(function() {
				var offsetParent = this.offsetParent || docElem;

				while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
					offsetParent = offsetParent.offsetParent;
				}

				return offsetParent || docElem;
			});
		}
	});

	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;

		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );

				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}

				if ( win ) {
					win.scrollTo(
						!top ? val : window.pageXOffset,
						top ? val : window.pageYOffset
					);

				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length, null );
		};
	});

	// Support: Safari<7+, Chrome<37+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	});


	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

				return access( this, function( elem, type, value ) {
					var doc;

					if ( jQuery.isWindow( elem ) ) {
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}

					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;

						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}

					return value === undefined ?
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :

						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		});
	});


	// The number of elements contained in the matched element set
	jQuery.fn.size = function() {
		return this.length;
	};

	jQuery.fn.andSelf = jQuery.fn.addBack;




	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.

	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}




	var
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,

		// Map over the $ in case of overwrite
		_$ = window.$;

	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	};

	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( typeof noGlobal === strundefined ) {
		window.jQuery = window.$ = jQuery;
	}




	return jQuery;

	}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	module.exports = __webpack_require__(10);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./bootstrap.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/sass-loader/index.js!./bootstrap.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "/*!\n * Bootstrap v4.0.0-alpha.2 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active {\n  outline: 0; }\n\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  img {\n    max-width: 100% !important; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important; }\n  .label {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-moz-viewport {\n  width: device-width; }\n\n@-ms-viewport {\n  width: device-width; }\n\n@-o-viewport {\n  width: device-width; }\n\n@-webkit-viewport {\n  width: device-width; }\n\n@viewport {\n  width: device-width; }\n\nhtml {\n  font-size: 16px;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #373a3c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #818a91; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #0275d8;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #014c8c;\n    text-decoration: underline; }\n  a:focus {\n    outline: thin dotted;\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation; }\n\ntable {\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #818a91;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  margin: 0;\n  line-height: inherit;\n  border-radius: 0; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  box-sizing: inherit;\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1 {\n  font-size: 2.5rem; }\n\nh2 {\n  font-size: 2rem; }\n\nh3 {\n  font-size: 1.75rem; }\n\nh4 {\n  font-size: 1.5rem; }\n\nh5 {\n  font-size: 1.25rem; }\n\nh6 {\n  font-size: 1rem; }\n\n.h1 {\n  font-size: 2.5rem; }\n\n.h2 {\n  font-size: 2rem; }\n\n.h3 {\n  font-size: 1.75rem; }\n\n.h4 {\n  font-size: 1.5rem; }\n\n.h5 {\n  font-size: 1.25rem; }\n\n.h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: .2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.dl-horizontal {\n  margin-right: -1.875rem;\n  margin-left: -1.875rem; }\n  .dl-horizontal::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  line-height: 1.5;\n  color: #818a91; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\n.img-fluid, .carousel-inner > .carousel-item > img,\n.carousel-inner > .carousel-item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto; }\n\n.img-rounded {\n  border-radius: 0.3rem; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  line-height: 1.5;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all .2s ease-in-out;\n  display: inline-block;\n  max-width: 100%;\n  height: auto; }\n\n.img-circle {\n  border-radius: 50%; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #818a91; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace; }\n\ncode {\n  padding: .2rem .4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n\nkbd {\n  padding: .2rem .4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  line-height: 1.5;\n  color: #373a3c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 0.9375rem;\n  padding-right: 0.9375rem; }\n  .container::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 544px) {\n    .container {\n      max-width: 576px; } }\n  @media (min-width: 768px) {\n    .container {\n      max-width: 720px; } }\n  @media (min-width: 992px) {\n    .container {\n      max-width: 940px; } }\n  @media (min-width: 1200px) {\n    .container {\n      max-width: 1140px; } }\n\n.container-fluid {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 0.9375rem;\n  padding-right: 0.9375rem; }\n  .container-fluid::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.row {\n  margin-left: -0.9375rem;\n  margin-right: -0.9375rem; }\n  .row::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n  position: relative;\n  min-height: 1px;\n  padding-left: 0.9375rem;\n  padding-right: 0.9375rem; }\n\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left; }\n\n.col-xs-1 {\n  width: 8.33333%; }\n\n.col-xs-2 {\n  width: 16.66667%; }\n\n.col-xs-3 {\n  width: 25%; }\n\n.col-xs-4 {\n  width: 33.33333%; }\n\n.col-xs-5 {\n  width: 41.66667%; }\n\n.col-xs-6 {\n  width: 50%; }\n\n.col-xs-7 {\n  width: 58.33333%; }\n\n.col-xs-8 {\n  width: 66.66667%; }\n\n.col-xs-9 {\n  width: 75%; }\n\n.col-xs-10 {\n  width: 83.33333%; }\n\n.col-xs-11 {\n  width: 91.66667%; }\n\n.col-xs-12 {\n  width: 100%; }\n\n.col-xs-pull-0 {\n  right: auto; }\n\n.col-xs-pull-1 {\n  right: 8.33333%; }\n\n.col-xs-pull-2 {\n  right: 16.66667%; }\n\n.col-xs-pull-3 {\n  right: 25%; }\n\n.col-xs-pull-4 {\n  right: 33.33333%; }\n\n.col-xs-pull-5 {\n  right: 41.66667%; }\n\n.col-xs-pull-6 {\n  right: 50%; }\n\n.col-xs-pull-7 {\n  right: 58.33333%; }\n\n.col-xs-pull-8 {\n  right: 66.66667%; }\n\n.col-xs-pull-9 {\n  right: 75%; }\n\n.col-xs-pull-10 {\n  right: 83.33333%; }\n\n.col-xs-pull-11 {\n  right: 91.66667%; }\n\n.col-xs-pull-12 {\n  right: 100%; }\n\n.col-xs-push-0 {\n  left: auto; }\n\n.col-xs-push-1 {\n  left: 8.33333%; }\n\n.col-xs-push-2 {\n  left: 16.66667%; }\n\n.col-xs-push-3 {\n  left: 25%; }\n\n.col-xs-push-4 {\n  left: 33.33333%; }\n\n.col-xs-push-5 {\n  left: 41.66667%; }\n\n.col-xs-push-6 {\n  left: 50%; }\n\n.col-xs-push-7 {\n  left: 58.33333%; }\n\n.col-xs-push-8 {\n  left: 66.66667%; }\n\n.col-xs-push-9 {\n  left: 75%; }\n\n.col-xs-push-10 {\n  left: 83.33333%; }\n\n.col-xs-push-11 {\n  left: 91.66667%; }\n\n.col-xs-push-12 {\n  left: 100%; }\n\n.col-xs-offset-0 {\n  margin-left: 0%; }\n\n.col-xs-offset-1 {\n  margin-left: 8.33333%; }\n\n.col-xs-offset-2 {\n  margin-left: 16.66667%; }\n\n.col-xs-offset-3 {\n  margin-left: 25%; }\n\n.col-xs-offset-4 {\n  margin-left: 33.33333%; }\n\n.col-xs-offset-5 {\n  margin-left: 41.66667%; }\n\n.col-xs-offset-6 {\n  margin-left: 50%; }\n\n.col-xs-offset-7 {\n  margin-left: 58.33333%; }\n\n.col-xs-offset-8 {\n  margin-left: 66.66667%; }\n\n.col-xs-offset-9 {\n  margin-left: 75%; }\n\n.col-xs-offset-10 {\n  margin-left: 83.33333%; }\n\n.col-xs-offset-11 {\n  margin-left: 91.66667%; }\n\n.col-xs-offset-12 {\n  margin-left: 100%; }\n\n@media (min-width: 544px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left; }\n  .col-sm-1 {\n    width: 8.33333%; }\n  .col-sm-2 {\n    width: 16.66667%; }\n  .col-sm-3 {\n    width: 25%; }\n  .col-sm-4 {\n    width: 33.33333%; }\n  .col-sm-5 {\n    width: 41.66667%; }\n  .col-sm-6 {\n    width: 50%; }\n  .col-sm-7 {\n    width: 58.33333%; }\n  .col-sm-8 {\n    width: 66.66667%; }\n  .col-sm-9 {\n    width: 75%; }\n  .col-sm-10 {\n    width: 83.33333%; }\n  .col-sm-11 {\n    width: 91.66667%; }\n  .col-sm-12 {\n    width: 100%; }\n  .col-sm-pull-0 {\n    right: auto; }\n  .col-sm-pull-1 {\n    right: 8.33333%; }\n  .col-sm-pull-2 {\n    right: 16.66667%; }\n  .col-sm-pull-3 {\n    right: 25%; }\n  .col-sm-pull-4 {\n    right: 33.33333%; }\n  .col-sm-pull-5 {\n    right: 41.66667%; }\n  .col-sm-pull-6 {\n    right: 50%; }\n  .col-sm-pull-7 {\n    right: 58.33333%; }\n  .col-sm-pull-8 {\n    right: 66.66667%; }\n  .col-sm-pull-9 {\n    right: 75%; }\n  .col-sm-pull-10 {\n    right: 83.33333%; }\n  .col-sm-pull-11 {\n    right: 91.66667%; }\n  .col-sm-pull-12 {\n    right: 100%; }\n  .col-sm-push-0 {\n    left: auto; }\n  .col-sm-push-1 {\n    left: 8.33333%; }\n  .col-sm-push-2 {\n    left: 16.66667%; }\n  .col-sm-push-3 {\n    left: 25%; }\n  .col-sm-push-4 {\n    left: 33.33333%; }\n  .col-sm-push-5 {\n    left: 41.66667%; }\n  .col-sm-push-6 {\n    left: 50%; }\n  .col-sm-push-7 {\n    left: 58.33333%; }\n  .col-sm-push-8 {\n    left: 66.66667%; }\n  .col-sm-push-9 {\n    left: 75%; }\n  .col-sm-push-10 {\n    left: 83.33333%; }\n  .col-sm-push-11 {\n    left: 91.66667%; }\n  .col-sm-push-12 {\n    left: 100%; }\n  .col-sm-offset-0 {\n    margin-left: 0%; }\n  .col-sm-offset-1 {\n    margin-left: 8.33333%; }\n  .col-sm-offset-2 {\n    margin-left: 16.66667%; }\n  .col-sm-offset-3 {\n    margin-left: 25%; }\n  .col-sm-offset-4 {\n    margin-left: 33.33333%; }\n  .col-sm-offset-5 {\n    margin-left: 41.66667%; }\n  .col-sm-offset-6 {\n    margin-left: 50%; }\n  .col-sm-offset-7 {\n    margin-left: 58.33333%; }\n  .col-sm-offset-8 {\n    margin-left: 66.66667%; }\n  .col-sm-offset-9 {\n    margin-left: 75%; }\n  .col-sm-offset-10 {\n    margin-left: 83.33333%; }\n  .col-sm-offset-11 {\n    margin-left: 91.66667%; }\n  .col-sm-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 768px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left; }\n  .col-md-1 {\n    width: 8.33333%; }\n  .col-md-2 {\n    width: 16.66667%; }\n  .col-md-3 {\n    width: 25%; }\n  .col-md-4 {\n    width: 33.33333%; }\n  .col-md-5 {\n    width: 41.66667%; }\n  .col-md-6 {\n    width: 50%; }\n  .col-md-7 {\n    width: 58.33333%; }\n  .col-md-8 {\n    width: 66.66667%; }\n  .col-md-9 {\n    width: 75%; }\n  .col-md-10 {\n    width: 83.33333%; }\n  .col-md-11 {\n    width: 91.66667%; }\n  .col-md-12 {\n    width: 100%; }\n  .col-md-pull-0 {\n    right: auto; }\n  .col-md-pull-1 {\n    right: 8.33333%; }\n  .col-md-pull-2 {\n    right: 16.66667%; }\n  .col-md-pull-3 {\n    right: 25%; }\n  .col-md-pull-4 {\n    right: 33.33333%; }\n  .col-md-pull-5 {\n    right: 41.66667%; }\n  .col-md-pull-6 {\n    right: 50%; }\n  .col-md-pull-7 {\n    right: 58.33333%; }\n  .col-md-pull-8 {\n    right: 66.66667%; }\n  .col-md-pull-9 {\n    right: 75%; }\n  .col-md-pull-10 {\n    right: 83.33333%; }\n  .col-md-pull-11 {\n    right: 91.66667%; }\n  .col-md-pull-12 {\n    right: 100%; }\n  .col-md-push-0 {\n    left: auto; }\n  .col-md-push-1 {\n    left: 8.33333%; }\n  .col-md-push-2 {\n    left: 16.66667%; }\n  .col-md-push-3 {\n    left: 25%; }\n  .col-md-push-4 {\n    left: 33.33333%; }\n  .col-md-push-5 {\n    left: 41.66667%; }\n  .col-md-push-6 {\n    left: 50%; }\n  .col-md-push-7 {\n    left: 58.33333%; }\n  .col-md-push-8 {\n    left: 66.66667%; }\n  .col-md-push-9 {\n    left: 75%; }\n  .col-md-push-10 {\n    left: 83.33333%; }\n  .col-md-push-11 {\n    left: 91.66667%; }\n  .col-md-push-12 {\n    left: 100%; }\n  .col-md-offset-0 {\n    margin-left: 0%; }\n  .col-md-offset-1 {\n    margin-left: 8.33333%; }\n  .col-md-offset-2 {\n    margin-left: 16.66667%; }\n  .col-md-offset-3 {\n    margin-left: 25%; }\n  .col-md-offset-4 {\n    margin-left: 33.33333%; }\n  .col-md-offset-5 {\n    margin-left: 41.66667%; }\n  .col-md-offset-6 {\n    margin-left: 50%; }\n  .col-md-offset-7 {\n    margin-left: 58.33333%; }\n  .col-md-offset-8 {\n    margin-left: 66.66667%; }\n  .col-md-offset-9 {\n    margin-left: 75%; }\n  .col-md-offset-10 {\n    margin-left: 83.33333%; }\n  .col-md-offset-11 {\n    margin-left: 91.66667%; }\n  .col-md-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 992px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left; }\n  .col-lg-1 {\n    width: 8.33333%; }\n  .col-lg-2 {\n    width: 16.66667%; }\n  .col-lg-3 {\n    width: 25%; }\n  .col-lg-4 {\n    width: 33.33333%; }\n  .col-lg-5 {\n    width: 41.66667%; }\n  .col-lg-6 {\n    width: 50%; }\n  .col-lg-7 {\n    width: 58.33333%; }\n  .col-lg-8 {\n    width: 66.66667%; }\n  .col-lg-9 {\n    width: 75%; }\n  .col-lg-10 {\n    width: 83.33333%; }\n  .col-lg-11 {\n    width: 91.66667%; }\n  .col-lg-12 {\n    width: 100%; }\n  .col-lg-pull-0 {\n    right: auto; }\n  .col-lg-pull-1 {\n    right: 8.33333%; }\n  .col-lg-pull-2 {\n    right: 16.66667%; }\n  .col-lg-pull-3 {\n    right: 25%; }\n  .col-lg-pull-4 {\n    right: 33.33333%; }\n  .col-lg-pull-5 {\n    right: 41.66667%; }\n  .col-lg-pull-6 {\n    right: 50%; }\n  .col-lg-pull-7 {\n    right: 58.33333%; }\n  .col-lg-pull-8 {\n    right: 66.66667%; }\n  .col-lg-pull-9 {\n    right: 75%; }\n  .col-lg-pull-10 {\n    right: 83.33333%; }\n  .col-lg-pull-11 {\n    right: 91.66667%; }\n  .col-lg-pull-12 {\n    right: 100%; }\n  .col-lg-push-0 {\n    left: auto; }\n  .col-lg-push-1 {\n    left: 8.33333%; }\n  .col-lg-push-2 {\n    left: 16.66667%; }\n  .col-lg-push-3 {\n    left: 25%; }\n  .col-lg-push-4 {\n    left: 33.33333%; }\n  .col-lg-push-5 {\n    left: 41.66667%; }\n  .col-lg-push-6 {\n    left: 50%; }\n  .col-lg-push-7 {\n    left: 58.33333%; }\n  .col-lg-push-8 {\n    left: 66.66667%; }\n  .col-lg-push-9 {\n    left: 75%; }\n  .col-lg-push-10 {\n    left: 83.33333%; }\n  .col-lg-push-11 {\n    left: 91.66667%; }\n  .col-lg-push-12 {\n    left: 100%; }\n  .col-lg-offset-0 {\n    margin-left: 0%; }\n  .col-lg-offset-1 {\n    margin-left: 8.33333%; }\n  .col-lg-offset-2 {\n    margin-left: 16.66667%; }\n  .col-lg-offset-3 {\n    margin-left: 25%; }\n  .col-lg-offset-4 {\n    margin-left: 33.33333%; }\n  .col-lg-offset-5 {\n    margin-left: 41.66667%; }\n  .col-lg-offset-6 {\n    margin-left: 50%; }\n  .col-lg-offset-7 {\n    margin-left: 58.33333%; }\n  .col-lg-offset-8 {\n    margin-left: 66.66667%; }\n  .col-lg-offset-9 {\n    margin-left: 75%; }\n  .col-lg-offset-10 {\n    margin-left: 83.33333%; }\n  .col-lg-offset-11 {\n    margin-left: 91.66667%; }\n  .col-lg-offset-12 {\n    margin-left: 100%; } }\n\n@media (min-width: 1200px) {\n  .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n    float: left; }\n  .col-xl-1 {\n    width: 8.33333%; }\n  .col-xl-2 {\n    width: 16.66667%; }\n  .col-xl-3 {\n    width: 25%; }\n  .col-xl-4 {\n    width: 33.33333%; }\n  .col-xl-5 {\n    width: 41.66667%; }\n  .col-xl-6 {\n    width: 50%; }\n  .col-xl-7 {\n    width: 58.33333%; }\n  .col-xl-8 {\n    width: 66.66667%; }\n  .col-xl-9 {\n    width: 75%; }\n  .col-xl-10 {\n    width: 83.33333%; }\n  .col-xl-11 {\n    width: 91.66667%; }\n  .col-xl-12 {\n    width: 100%; }\n  .col-xl-pull-0 {\n    right: auto; }\n  .col-xl-pull-1 {\n    right: 8.33333%; }\n  .col-xl-pull-2 {\n    right: 16.66667%; }\n  .col-xl-pull-3 {\n    right: 25%; }\n  .col-xl-pull-4 {\n    right: 33.33333%; }\n  .col-xl-pull-5 {\n    right: 41.66667%; }\n  .col-xl-pull-6 {\n    right: 50%; }\n  .col-xl-pull-7 {\n    right: 58.33333%; }\n  .col-xl-pull-8 {\n    right: 66.66667%; }\n  .col-xl-pull-9 {\n    right: 75%; }\n  .col-xl-pull-10 {\n    right: 83.33333%; }\n  .col-xl-pull-11 {\n    right: 91.66667%; }\n  .col-xl-pull-12 {\n    right: 100%; }\n  .col-xl-push-0 {\n    left: auto; }\n  .col-xl-push-1 {\n    left: 8.33333%; }\n  .col-xl-push-2 {\n    left: 16.66667%; }\n  .col-xl-push-3 {\n    left: 25%; }\n  .col-xl-push-4 {\n    left: 33.33333%; }\n  .col-xl-push-5 {\n    left: 41.66667%; }\n  .col-xl-push-6 {\n    left: 50%; }\n  .col-xl-push-7 {\n    left: 58.33333%; }\n  .col-xl-push-8 {\n    left: 66.66667%; }\n  .col-xl-push-9 {\n    left: 75%; }\n  .col-xl-push-10 {\n    left: 83.33333%; }\n  .col-xl-push-11 {\n    left: 91.66667%; }\n  .col-xl-push-12 {\n    left: 100%; }\n  .col-xl-offset-0 {\n    margin-left: 0%; }\n  .col-xl-offset-1 {\n    margin-left: 8.33333%; }\n  .col-xl-offset-2 {\n    margin-left: 16.66667%; }\n  .col-xl-offset-3 {\n    margin-left: 25%; }\n  .col-xl-offset-4 {\n    margin-left: 33.33333%; }\n  .col-xl-offset-5 {\n    margin-left: 41.66667%; }\n  .col-xl-offset-6 {\n    margin-left: 50%; }\n  .col-xl-offset-7 {\n    margin-left: 58.33333%; }\n  .col-xl-offset-8 {\n    margin-left: 66.66667%; }\n  .col-xl-offset-9 {\n    margin-left: 75%; }\n  .col-xl-offset-10 {\n    margin-left: 83.33333%; }\n  .col-xl-offset-11 {\n    margin-left: 91.66667%; }\n  .col-xl-offset-12 {\n    margin-left: 100%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    line-height: 1.5;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: #f9f9f9; }\n\n.table-hover tbody tr:hover {\n  background-color: #f5f5f5; }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: #f5f5f5; }\n\n.table-hover .table-active:hover {\n  background-color: #e8e8e8; }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: #e8e8e8; }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  min-height: 0.01%;\n  overflow-x: auto; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #373a3c; }\n\n.thead-default th {\n  color: #55595c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #eceeef;\n  background-color: #373a3c; }\n  .table-inverse.table-bordered {\n    border: 0; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #55595c; }\n\n.table-reflow thead {\n  float: left; }\n\n.table-reflow tbody {\n  display: block;\n  white-space: nowrap; }\n\n.table-reflow th,\n.table-reflow td {\n  border-top: 1px solid #eceeef;\n  border-left: 1px solid #eceeef; }\n  .table-reflow th:last-child,\n  .table-reflow td:last-child {\n    border-right: 1px solid #eceeef; }\n\n.table-reflow thead:last-child tr:last-child th,\n.table-reflow thead:last-child tr:last-child td,\n.table-reflow tbody:last-child tr:last-child th,\n.table-reflow tbody:last-child tr:last-child td,\n.table-reflow tfoot:last-child tr:last-child th,\n.table-reflow tfoot:last-child tr:last-child td {\n  border-bottom: 1px solid #eceeef; }\n\n.table-reflow tr {\n  float: left; }\n  .table-reflow tr th,\n  .table-reflow tr td {\n    display: block !important;\n    border: 1px solid #eceeef; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #55595c;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 0.25rem; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    border-color: #66afe9;\n    outline: none; }\n  .form-control::placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.form-control-label {\n  padding: 0.375rem 0.75rem;\n  margin-bottom: 0; }\n\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 2.25rem; }\n  input[type=\"date\"].input-sm,\n  .input-group-sm input[type=\"date\"].form-control,\n  input[type=\"time\"].input-sm,\n  .input-group-sm\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].input-sm,\n  .input-group-sm\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].input-sm,\n  .input-group-sm\n  input[type=\"month\"].form-control {\n    line-height: 1.8625rem; }\n  input[type=\"date\"].input-lg,\n  .input-group-lg input[type=\"date\"].form-control,\n  input[type=\"time\"].input-lg,\n  .input-group-lg\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].input-lg,\n  .input-group-lg\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].input-lg,\n  .input-group-lg\n  input[type=\"month\"].form-control {\n    line-height: 3.16667rem; } }\n\n.form-control-static {\n  min-height: 2.25rem;\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  margin-bottom: 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.275rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.25rem;\n  font-size: 1.25rem;\n  line-height: 1.33333;\n  border-radius: 0.3rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem; }\n  .radio label,\n  .checkbox label {\n    padding-left: 1.25rem;\n    margin-bottom: 0;\n    font-weight: normal;\n    cursor: pointer; }\n    .radio label input:only-child,\n    .checkbox label input:only-child {\n      position: static; }\n\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-top: .25rem;\n  margin-left: -1.25rem; }\n\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -.25rem; }\n\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  font-weight: normal;\n  vertical-align: middle;\n  cursor: pointer; }\n\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: .75rem; }\n\ninput[type=\"radio\"]:disabled, input[type=\"radio\"].disabled,\ninput[type=\"checkbox\"]:disabled,\ninput[type=\"checkbox\"].disabled {\n  cursor: not-allowed; }\n\n.radio-inline.disabled,\n.checkbox-inline.disabled {\n  cursor: not-allowed; }\n\n.radio.disabled label,\n.checkbox.disabled label {\n  cursor: not-allowed; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  background-size: 1.4625rem 1.4625rem; }\n\n.has-success .text-help,\n.has-success .form-control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #5cb85c; }\n\n.has-success .form-control {\n  border-color: #5cb85c; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-feedback {\n  color: #5cb85c; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MTIgNzkyIj48cGF0aCBmaWxsPSIjNWNiODVjIiBkPSJNMjMzLjggNjEwYy0xMy4zIDAtMjYtNi0zNC0xNi44TDkwLjUgNDQ4LjhDNzYuMyA0MzAgODAgNDAzLjMgOTguOCAzODljMTguOC0xNC4yIDQ1LjUtMTAuNCA1OS44IDguNGw3MiA5NUw0NTEuMyAyNDJjMTIuNS0yMCAzOC44LTI2LjIgNTguOC0xMy43IDIwIDEyLjQgMjYgMzguNyAxMy43IDU4LjhMMjcwIDU5MGMtNy40IDEyLTIwLjIgMTkuNC0zNC4zIDIwaC0yeiIvPjwvc3ZnPg==\"); }\n\n.has-warning .text-help,\n.has-warning .form-control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #f0ad4e; }\n\n.has-warning .form-control {\n  border-color: #f0ad4e; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-feedback {\n  color: #f0ad4e; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MTIgNzkyIj48cGF0aCBmaWxsPSIjZjBhZDRlIiBkPSJNNjAzIDY0MC4ybC0yNzguNS01MDljLTMuOC02LjYtMTAuOC0xMC42LTE4LjUtMTAuNnMtMTQuNyA0LTE4LjUgMTAuNkw5IDY0MC4yYy0zLjcgNi41LTMuNiAxNC40LjIgMjAuOCAzLjggNi41IDEwLjggMTAuNCAxOC4zIDEwLjRoNTU3YzcuNiAwIDE0LjYtNCAxOC40LTEwLjQgMy41LTYuNCAzLjYtMTQuNCAwLTIwLjh6bS0yNjYuNC0zMGgtNjEuMlY1NDloNjEuMnY2MS4yem0wLTEwN2gtNjEuMlYzMDRoNjEuMnYxOTl6Ii8+PC9zdmc+\"); }\n\n.has-danger .text-help,\n.has-danger .form-control-label,\n.has-danger .radio,\n.has-danger .checkbox,\n.has-danger .radio-inline,\n.has-danger .checkbox-inline,\n.has-danger.radio label,\n.has-danger.checkbox label,\n.has-danger.radio-inline label,\n.has-danger.checkbox-inline label {\n  color: #d9534f; }\n\n.has-danger .form-control {\n  border-color: #d9534f; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-feedback {\n  color: #d9534f; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MTIgNzkyIj48cGF0aCBmaWxsPSIjZDk1MzRmIiBkPSJNNDQ3IDU0NC40Yy0xNC40IDE0LjQtMzcuNiAxNC40LTUyIDBsLTg5LTkyLjctODkgOTIuN2MtMTQuNSAxNC40LTM3LjcgMTQuNC01MiAwLTE0LjQtMTQuNC0xNC40LTM3LjYgMC01Mmw5Mi40LTk2LjMtOTIuNC05Ni4zYy0xNC40LTE0LjQtMTQuNC0zNy42IDAtNTJzMzcuNi0xNC4zIDUyIDBsODkgOTIuOCA4OS4yLTkyLjdjMTQuNC0xNC40IDM3LjYtMTQuNCA1MiAwIDE0LjMgMTQuNCAxNC4zIDM3LjYgMCA1MkwzNTQuNiAzOTZsOTIuNCA5Ni40YzE0LjQgMTQuNCAxNC40IDM3LjYgMCA1MnoiLz48L3N2Zz4=\"); }\n\n@media (min-width: 544px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .form-control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n    .form-inline .radio label,\n    .form-inline .checkbox label {\n      padding-left: 0; }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.375rem 1rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: thin dotted;\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn.focus {\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    background-image: none;\n    outline: 0; }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b;\n    background-image: none; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #014682;\n      border-color: #01315a; }\n  .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary:disabled:focus, .btn-primary:disabled.focus {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary.disabled:hover, .btn-primary:disabled:hover {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-secondary {\n  color: #373a3c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:active, .btn-secondary.active,\n  .open > .btn-secondary.dropdown-toggle {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad;\n    background-image: none; }\n    .btn-secondary:active:hover, .btn-secondary:active:focus, .btn-secondary:active.focus, .btn-secondary.active:hover, .btn-secondary.active:focus, .btn-secondary.active.focus,\n    .open > .btn-secondary.dropdown-toggle:hover,\n    .open > .btn-secondary.dropdown-toggle:focus,\n    .open > .btn-secondary.dropdown-toggle.focus {\n      color: #373a3c;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-secondary.disabled:focus, .btn-secondary.disabled.focus, .btn-secondary:disabled:focus, .btn-secondary:disabled.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary.disabled:hover, .btn-secondary:disabled:hover {\n    background-color: #fff;\n    border-color: #ccc; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2;\n    background-image: none; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1f7e9a; }\n  .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info:disabled:focus, .btn-info:disabled.focus {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info.disabled:hover, .btn-info:disabled:hover {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641;\n    background-image: none; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #2d672d; }\n  .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success:disabled:focus, .btn-success:disabled.focus {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success.disabled:hover, .btn-success:disabled:hover {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316;\n    background-image: none; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #b06d0f; }\n  .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning:disabled:focus, .btn-warning:disabled.focus {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning.disabled:hover, .btn-warning:disabled:hover {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a;\n    background-image: none; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #8b211e; }\n  .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger:disabled:focus, .btn-danger:disabled.focus {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger.disabled:hover, .btn-danger:disabled:hover {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-primary-outline {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-primary-outline:focus, .btn-primary-outline.focus, .btn-primary-outline:active, .btn-primary-outline.active,\n  .open > .btn-primary-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary-outline:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary-outline.disabled:focus, .btn-primary-outline.disabled.focus, .btn-primary-outline:disabled:focus, .btn-primary-outline:disabled.focus {\n    border-color: #43a7fd; }\n  .btn-primary-outline.disabled:hover, .btn-primary-outline:disabled:hover {\n    border-color: #43a7fd; }\n\n.btn-secondary-outline {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-secondary-outline:focus, .btn-secondary-outline.focus, .btn-secondary-outline:active, .btn-secondary-outline.active,\n  .open > .btn-secondary-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-secondary-outline:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-secondary-outline.disabled:focus, .btn-secondary-outline.disabled.focus, .btn-secondary-outline:disabled:focus, .btn-secondary-outline:disabled.focus {\n    border-color: white; }\n  .btn-secondary-outline.disabled:hover, .btn-secondary-outline:disabled:hover {\n    border-color: white; }\n\n.btn-info-outline {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-info-outline:focus, .btn-info-outline.focus, .btn-info-outline:active, .btn-info-outline.active,\n  .open > .btn-info-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info-outline:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info-outline.disabled:focus, .btn-info-outline.disabled.focus, .btn-info-outline:disabled:focus, .btn-info-outline:disabled.focus {\n    border-color: #b0e1ef; }\n  .btn-info-outline.disabled:hover, .btn-info-outline:disabled:hover {\n    border-color: #b0e1ef; }\n\n.btn-success-outline {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-success-outline:focus, .btn-success-outline.focus, .btn-success-outline:active, .btn-success-outline.active,\n  .open > .btn-success-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success-outline:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success-outline.disabled:focus, .btn-success-outline.disabled.focus, .btn-success-outline:disabled:focus, .btn-success-outline:disabled.focus {\n    border-color: #a3d7a3; }\n  .btn-success-outline.disabled:hover, .btn-success-outline:disabled:hover {\n    border-color: #a3d7a3; }\n\n.btn-warning-outline {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-warning-outline:focus, .btn-warning-outline.focus, .btn-warning-outline:active, .btn-warning-outline.active,\n  .open > .btn-warning-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning-outline:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning-outline.disabled:focus, .btn-warning-outline.disabled.focus, .btn-warning-outline:disabled:focus, .btn-warning-outline:disabled.focus {\n    border-color: #f8d9ac; }\n  .btn-warning-outline.disabled:hover, .btn-warning-outline:disabled:hover {\n    border-color: #f8d9ac; }\n\n.btn-danger-outline {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-danger-outline:focus, .btn-danger-outline.focus, .btn-danger-outline:active, .btn-danger-outline.active,\n  .open > .btn-danger-outline.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger-outline:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger-outline.disabled:focus, .btn-danger-outline.disabled.focus, .btn-danger-outline:disabled:focus, .btn-danger-outline:disabled.focus {\n    border-color: #eba5a3; }\n  .btn-danger-outline.disabled:hover, .btn-danger-outline:disabled:hover {\n    border-color: #eba5a3; }\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #014c8c;\n    text-decoration: underline;\n    background-color: transparent; }\n  .btn-link:disabled:focus, .btn-link:disabled:hover {\n    color: #818a91;\n    text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.25rem;\n  font-size: 1.25rem;\n  line-height: 1.33333;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 5px; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity .15s linear; }\n  .fade.in {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.in {\n    display: block; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition-timing-function: ease;\n  transition-duration: .35s;\n  transition-property: height; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-right: .25rem;\n  margin-left: .25rem;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  font-size: 1rem;\n  color: #373a3c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #e5e5e5; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #373a3c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #2b2d2f;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n  .dropdown-item.active, .dropdown-item.active:focus, .dropdown-item.active:hover {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8;\n    outline: 0; }\n  .dropdown-item.disabled, .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    color: #818a91; }\n  .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    text-decoration: none;\n    cursor: not-allowed;\n    background-color: transparent;\n    background-image: none;\n    filter: \"progid:DXImageTransform.Microsoft.gradient(enabled = false)\"; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.open > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: #818a91;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  content: \"\";\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    float: left; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px; }\n\n.btn-toolbar {\n  margin-left: -5px; }\n  .btn-toolbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .btn-toolbar .btn-group,\n  .btn-toolbar .input-group {\n    float: left; }\n  .btn-toolbar > .btn,\n  .btn-toolbar > .btn-group,\n  .btn-toolbar > .input-group {\n    margin-left: 5px; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn-group > .btn + .dropdown-toggle {\n  padding-right: 8px;\n  padding-left: 8px; }\n\n.btn-group > .btn-lg + .dropdown-toggle, .btn-group-lg.btn-group > .btn + .dropdown-toggle {\n  padding-right: 12px;\n  padding-left: 12px; }\n\n.btn .caret {\n  margin-left: 0; }\n\n.btn-lg .caret, .btn-group-lg > .btn .caret {\n  border-width: 0.3em 0.3em 0;\n  border-bottom-width: 0; }\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\n  border-width: 0 0.3em 0.3em; }\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%; }\n\n.btn-group-vertical > .btn-group::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none; }\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-bottom-left-radius: 0.25rem;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1;\n  color: #55595c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid #ccc;\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.275rem 0.75rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.25rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:first-child {\n  border-right: 0; }\n\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.input-group-addon:last-child {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:first-child > .btn,\n  .input-group-btn:first-child > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:last-child > .btn,\n  .input-group-btn:last-child > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:last-child > .btn:focus, .input-group-btn:last-child > .btn:active, .input-group-btn:last-child > .btn:hover,\n    .input-group-btn:last-child > .btn-group:focus,\n    .input-group-btn:last-child > .btn-group:active,\n    .input-group-btn:last-child > .btn-group:hover {\n      z-index: 3; }\n\n.c-input {\n  position: relative;\n  display: inline;\n  padding-left: 1.5rem;\n  color: #555;\n  cursor: pointer; }\n  .c-input > input {\n    position: absolute;\n    z-index: -1;\n    opacity: 0; }\n    .c-input > input:checked ~ .c-indicator {\n      color: #fff;\n      background-color: #0074d9; }\n    .c-input > input:focus ~ .c-indicator {\n      box-shadow: 0 0 0 .075rem #fff, 0 0 0 .2rem #0074d9; }\n    .c-input > input:active ~ .c-indicator {\n      color: #fff;\n      background-color: #84c6ff; }\n  .c-input + .c-input {\n    margin-left: 1rem; }\n\n.c-indicator {\n  position: absolute;\n  top: 0;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  font-size: 65%;\n  line-height: 1rem;\n  color: #eee;\n  text-align: center;\n  user-select: none;\n  background-color: #eee;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.c-checkbox .c-indicator {\n  border-radius: .25rem; }\n\n.c-checkbox input:checked ~ .c-indicator {\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTYuNCwxTDUuNywxLjdMMi45LDQuNUwyLjEsMy43TDEuNCwzTDAsNC40bDAuNywwLjdsMS41LDEuNWwwLjcsMC43bDAuNy0wLjdsMy41LTMuNWwwLjctMC43TDYuNCwxTDYuNCwxeiINCgkvPg0KPC9zdmc+DQo=); }\n\n.c-checkbox input:indeterminate ~ .c-indicator {\n  background-color: #0074d9;\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iOHB4IiBoZWlnaHQ9IjhweCIgdmlld0JveD0iMCAwIDggOCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgOCA4IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0wLDN2Mmg4VjNIMHoiLz4NCjwvc3ZnPg0K); }\n\n.c-radio .c-indicator {\n  border-radius: 50%; }\n\n.c-radio input:checked ~ .c-indicator {\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNy4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgOCA4IiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA4IDgiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTQsMUMyLjMsMSwxLDIuMywxLDRzMS4zLDMsMywzczMtMS4zLDMtM1M1LjcsMSw0LDF6Ii8+DQo8L3N2Zz4NCg==); }\n\n.c-inputs-stacked .c-input {\n  display: inline; }\n  .c-inputs-stacked .c-input::after {\n    display: block;\n    margin-bottom: .25rem;\n    content: \"\"; }\n  .c-inputs-stacked .c-input + .c-input {\n    margin-left: 0; }\n\n.c-select {\n  display: inline-block;\n  max-width: 100%;\n  padding: .375rem 1.75rem .375rem .75rem;\n  padding-right: .75rem \\9;\n  color: #55595c;\n  vertical-align: middle;\n  background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAUCAMAAACzvE1FAAAADFBMVEUzMzMzMzMzMzMzMzMKAG/3AAAAA3RSTlMAf4C/aSLHAAAAPElEQVR42q3NMQ4AIAgEQTn//2cLdRKppSGzBYwzVXvznNWs8C58CiussPJj8h6NwgorrKRdTvuV9v16Afn0AYFOB7aYAAAAAElFTkSuQmCC) no-repeat right 0.75rem center;\n  background-image: none \\9;\n  background-size: 8px 10px;\n  border: 1px solid #ccc;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .c-select:focus {\n    border-color: #51a7e8;\n    outline: none; }\n  .c-select::-ms-expand {\n    opacity: 0; }\n\n.c-select-sm {\n  padding-top: 3px;\n  padding-bottom: 3px;\n  font-size: 12px; }\n  .c-select-sm:not([multiple]) {\n    height: 26px;\n    min-height: 26px; }\n\n.file {\n  position: relative;\n  display: inline-block;\n  height: 2.5rem;\n  cursor: pointer; }\n\n.file input {\n  min-width: 14rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.file-custom {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: .5rem 1rem;\n  line-height: 1.5;\n  color: #555;\n  user-select: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: .25rem; }\n\n.file-custom::after {\n  content: \"Choose file...\"; }\n\n.file-custom::before {\n  position: absolute;\n  top: -.075rem;\n  right: -.075rem;\n  bottom: -.075rem;\n  z-index: 6;\n  display: block;\n  height: 2.5rem;\n  padding: .5rem 1rem;\n  line-height: 1.5;\n  color: #555;\n  content: \"Browse\";\n  background-color: #eee;\n  border: 1px solid #ddd;\n  border-radius: 0 .25rem .25rem 0; }\n\n.nav {\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: inline-block; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #818a91; }\n    .nav-link.disabled, .nav-link.disabled:focus, .nav-link.disabled:hover {\n      color: #818a91;\n      cursor: not-allowed;\n      background-color: transparent; }\n\n.nav-inline .nav-item {\n  display: inline-block; }\n\n.nav-inline .nav-item + .nav-item,\n.nav-inline .nav-link + .nav-link {\n  margin-left: 1rem; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .nav-tabs .nav-item {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs .nav-item + .nav-item {\n      margin-left: .2rem; }\n  .nav-tabs .nav-link {\n    display: block;\n    padding: 0.5em 1em;\n    border: 1px solid transparent;\n    border-radius: 0.25rem 0.25rem 0 0; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled, .nav-tabs .nav-link.disabled:focus, .nav-tabs .nav-link.disabled:hover {\n      color: #818a91;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active, .nav-tabs .nav-link.active:focus, .nav-tabs .nav-link.active:hover,\n  .nav-tabs .nav-item.open .nav-link,\n  .nav-tabs .nav-item.open .nav-link:focus,\n  .nav-tabs .nav-item.open .nav-link:hover {\n    color: #55595c;\n    background-color: #fff;\n    border-color: #ddd #ddd transparent; }\n\n.nav-pills::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.nav-pills .nav-item {\n  float: left; }\n  .nav-pills .nav-item + .nav-item {\n    margin-left: .2rem; }\n\n.nav-pills .nav-link {\n  display: block;\n  padding: 0.5em 1em;\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active, .nav-pills .nav-link.active:focus, .nav-pills .nav-link.active:hover,\n.nav-pills .nav-item.open .nav-link,\n.nav-pills .nav-item.open .nav-link:focus,\n.nav-pills .nav-item.open .nav-link:hover {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-stacked .nav-item {\n  display: block;\n  float: none; }\n  .nav-stacked .nav-item + .nav-item {\n    margin-top: .2rem;\n    margin-left: 0; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.navbar {\n  position: relative;\n  padding: 0.5rem 1rem; }\n  .navbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 544px) {\n    .navbar {\n      border-radius: 0.25rem; } }\n\n.navbar-full {\n  z-index: 1000; }\n  @media (min-width: 544px) {\n    .navbar-full {\n      border-radius: 0; } }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n  @media (min-width: 544px) {\n    .navbar-fixed-top,\n    .navbar-fixed-bottom {\n      border-radius: 0; } }\n\n.navbar-fixed-top {\n  top: 0; }\n\n.navbar-fixed-bottom {\n  bottom: 0; }\n\n.navbar-sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1030;\n  width: 100%; }\n  @media (min-width: 544px) {\n    .navbar-sticky-top {\n      border-radius: 0; } }\n\n.navbar-brand {\n  float: left;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n  .navbar-brand > img {\n    display: block; }\n\n.navbar-divider {\n  float: left;\n  width: 1px;\n  padding-top: .425rem;\n  padding-bottom: .425rem;\n  margin-right: 1rem;\n  margin-left: 1rem;\n  overflow: hidden; }\n  .navbar-divider::before {\n    content: \"\\A0\"; }\n\n.navbar-toggler {\n  padding: .5rem .75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: none;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n@media (min-width: 544px) {\n  .navbar-toggleable-xs {\n    display: block !important; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    display: block !important; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    display: block !important; } }\n\n.navbar-nav .nav-item {\n  float: left; }\n\n.navbar-nav .nav-link {\n  display: block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n  .navbar-nav .nav-link + .nav-link {\n    margin-left: 1rem; }\n\n.navbar-nav .nav-item + .nav-item {\n  margin-left: 1rem; }\n\n.navbar-light .navbar-brand {\n  color: rgba(0, 0, 0, 0.8); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover {\n    color: rgba(0, 0, 0, 0.8); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.3); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.6); }\n\n.navbar-light .navbar-nav .open > .nav-link, .navbar-light .navbar-nav .open > .nav-link:focus, .navbar-light .navbar-nav .open > .nav-link:hover,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link:focus,\n.navbar-light .navbar-nav .active > .nav-link:hover,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.open:focus,\n.navbar-light .navbar-nav .nav-link.open:hover,\n.navbar-light .navbar-nav .nav-link.active,\n.navbar-light .navbar-nav .nav-link.active:focus,\n.navbar-light .navbar-nav .nav-link.active:hover {\n  color: rgba(0, 0, 0, 0.8); }\n\n.navbar-light .navbar-divider {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.navbar-dark .navbar-brand {\n  color: white; }\n  .navbar-dark .navbar-brand:focus, .navbar-dark .navbar-brand:hover {\n    color: white; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n\n.navbar-dark .navbar-nav .open > .nav-link, .navbar-dark .navbar-nav .open > .nav-link:focus, .navbar-dark .navbar-nav .open > .nav-link:hover,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link:focus,\n.navbar-dark .navbar-nav .active > .nav-link:hover,\n.navbar-dark .navbar-nav .nav-link.open,\n.navbar-dark .navbar-nav .nav-link.open:focus,\n.navbar-dark .navbar-nav .nav-link.open:hover,\n.navbar-dark .navbar-nav .nav-link.active,\n.navbar-dark .navbar-nav .nav-link.active:focus,\n.navbar-dark .navbar-nav .nav-link.active:hover {\n  color: white; }\n\n.navbar-dark .navbar-divider {\n  background-color: rgba(255, 255, 255, 0.075); }\n\n.card {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem;\n  background-color: #fff;\n  border: 1px solid #e5e5e5;\n  border-radius: 0.25rem; }\n\n.card-block {\n  padding: 1.25rem; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-radius: 0.25rem 0.25rem 0 0; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-radius: 0 0 0.25rem 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid #e5e5e5; }\n  .card-header:first-child {\n    border-radius: 0.25rem 0.25rem 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f5f5f5;\n  border-top: 1px solid #e5e5e5; }\n  .card-footer:last-child {\n    border-radius: 0 0 0.25rem 0.25rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n\n.card-primary-outline {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-secondary-outline {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-info-outline {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-success-outline {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-warning-outline {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-danger-outline {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse .card-header,\n.card-inverse .card-footer {\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n\n.card-inverse .card-header,\n.card-inverse .card-footer,\n.card-inverse .card-title,\n.card-inverse .card-blockquote {\n  color: #fff; }\n\n.card-inverse .card-link,\n.card-inverse .card-text,\n.card-inverse .card-blockquote > footer {\n  color: rgba(255, 255, 255, 0.65); }\n\n.card-inverse .card-link:focus, .card-inverse .card-link:hover {\n  color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: 0.25rem; }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-radius: 0.25rem 0.25rem 0 0; }\n\n.card-img-bottom {\n  border-radius: 0 0 0.25rem 0.25rem; }\n\n@media (min-width: 544px) {\n  .card-deck {\n    display: table;\n    table-layout: fixed;\n    border-spacing: 1.25rem 0; }\n    .card-deck .card {\n      display: table-cell;\n      width: 1%;\n      vertical-align: top; }\n  .card-deck-wrapper {\n    margin-right: -1.25rem;\n    margin-left: -1.25rem; } }\n\n@media (min-width: 544px) {\n  .card-group {\n    display: table;\n    width: 100%;\n    table-layout: fixed; }\n    .card-group .card {\n      display: table-cell;\n      vertical-align: top; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 544px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .breadcrumb > li {\n    float: left; }\n    .breadcrumb > li + li::before {\n      padding-right: .5rem;\n      padding-left: .5rem;\n      color: #818a91;\n      content: \"/\"; }\n  .breadcrumb > .active {\n    color: #818a91; }\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 0.25rem; }\n\n.page-item {\n  display: inline; }\n  .page-item:first-child .page-link {\n    margin-left: 0;\n    border-bottom-left-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .page-item:last-child .page-link {\n    border-bottom-right-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {\n    z-index: 2;\n    color: #fff;\n    cursor: default;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {\n    color: #818a91;\n    cursor: not-allowed;\n    background-color: #fff;\n    border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  float: left;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.5;\n  color: #0275d8;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #014c8c;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  line-height: 1.33333; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.275rem 0.75rem;\n  font-size: 0.875rem;\n  line-height: 1.5; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.pager {\n  padding-left: 0;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  text-align: center;\n  list-style: none; }\n  .pager::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .pager li {\n    display: inline; }\n    .pager li > a,\n    .pager li > span {\n      display: inline-block;\n      padding: 5px 14px;\n      background-color: #fff;\n      border: 1px solid #ddd;\n      border-radius: 15px; }\n    .pager li > a:focus, .pager li > a:hover {\n      text-decoration: none;\n      background-color: #eceeef; }\n  .pager .disabled > a, .pager .disabled > a:focus, .pager .disabled > a:hover {\n    color: #818a91;\n    cursor: not-allowed;\n    background-color: #fff; }\n  .pager .disabled > span {\n    color: #818a91;\n    cursor: not-allowed;\n    background-color: #fff; }\n\n.pager-next > a,\n.pager-next > span {\n  float: right; }\n\n.pager-prev > a,\n.pager-prev > span {\n  float: left; }\n\n.label {\n  display: inline-block;\n  padding: .25em .4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .label:empty {\n    display: none; }\n\n.btn .label {\n  position: relative;\n  top: -1px; }\n\na.label:focus, a.label:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.label-pill {\n  padding-right: .6em;\n  padding-left: .6em;\n  border-radius: 10rem; }\n\n.label-default {\n  background-color: #818a91; }\n  .label-default[href]:focus, .label-default[href]:hover {\n    background-color: #687077; }\n\n.label-primary {\n  background-color: #0275d8; }\n  .label-primary[href]:focus, .label-primary[href]:hover {\n    background-color: #025aa5; }\n\n.label-success {\n  background-color: #5cb85c; }\n  .label-success[href]:focus, .label-success[href]:hover {\n    background-color: #449d44; }\n\n.label-info {\n  background-color: #5bc0de; }\n  .label-info[href]:focus, .label-info[href]:hover {\n    background-color: #31b0d5; }\n\n.label-warning {\n  background-color: #f0ad4e; }\n  .label-warning[href]:focus, .label-warning[href]:hover {\n    background-color: #ec971f; }\n\n.label-danger {\n  background-color: #d9534f; }\n  .label-danger[href]:focus, .label-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 544px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 15px;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .alert > p,\n  .alert > ul {\n    margin-bottom: 0; }\n  .alert > p + p {\n    margin-top: 5px; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible {\n  padding-right: 35px; }\n  .alert-dismissible .close {\n    position: relative;\n    top: -2px;\n    right: -21px;\n    color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: block;\n  width: 100%;\n  height: 1rem;\n  margin-bottom: 1rem; }\n\n.progress[value] {\n  color: #0074d9;\n  border: 0;\n  appearance: none; }\n\n.progress[value]::-webkit-progress-bar {\n  background-color: #eee;\n  border-radius: 0.25rem; }\n\n.progress[value]::-webkit-progress-value::before {\n  content: attr(value); }\n\n.progress[value]::-webkit-progress-value {\n  background-color: #0074d9;\n  border-top-left-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.progress[value=\"100\"]::-webkit-progress-value {\n  border-top-right-radius: 0.25rem;\n  border-bottom-right-radius: 0.25rem; }\n\n@media screen and (min-width: 0\\0) {\n  .progress {\n    background-color: #eee;\n    border-radius: 0.25rem; }\n  .progress-bar {\n    display: inline-block;\n    height: 1rem;\n    text-indent: -999rem;\n    background-color: #0074d9;\n    border-top-left-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .progress[width^=\"0\"] {\n    min-width: 2rem;\n    color: #818a91;\n    background-color: transparent;\n    background-image: none; }\n  .progress[width=\"100%\"] {\n    border-top-right-radius: 0.25rem;\n    border-bottom-right-radius: 0.25rem; } }\n\n.progress-striped[value]::-webkit-progress-value {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-striped[value]::-moz-progress-bar {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-bar-striped {\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-size: 1rem 1rem; } }\n\n.progress-animated[value]::-webkit-progress-value {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-animated[value]::-moz-progress-bar {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-animated .progress-bar-striped {\n    animation: progress-bar-stripes 2s linear infinite; } }\n\n.progress-success[value]::-webkit-progress-value {\n  background-color: #5cb85c; }\n\n.progress-success[value]::-moz-progress-bar {\n  background-color: #5cb85c; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-success .progress-bar {\n    background-color: #5cb85c; } }\n\n.progress-info[value]::-webkit-progress-value {\n  background-color: #5bc0de; }\n\n.progress-info[value]::-moz-progress-bar {\n  background-color: #5bc0de; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-info .progress-bar {\n    background-color: #5bc0de; } }\n\n.progress-warning[value]::-webkit-progress-value {\n  background-color: #f0ad4e; }\n\n.progress-warning[value]::-moz-progress-bar {\n  background-color: #f0ad4e; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-warning .progress-bar {\n    background-color: #f0ad4e; } }\n\n.progress-danger[value]::-webkit-progress-value {\n  background-color: #d9534f; }\n\n.progress-danger[value]::-moz-progress-bar {\n  background-color: #d9534f; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-danger .progress-bar {\n    background-color: #d9534f; } }\n\n.media {\n  margin-top: 15px; }\n  .media:first-child {\n    margin-top: 0; }\n\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1; }\n\n.media-body {\n  width: 10000px; }\n\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top; }\n\n.media-middle {\n  vertical-align: middle; }\n\n.media-bottom {\n  vertical-align: bottom; }\n\n.media-object {\n  display: block; }\n  .media-object.img-thumbnail {\n    max-width: none; }\n\n.media-right {\n  padding-left: 10px; }\n\n.media-left {\n  padding-right: 10px; }\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.media-list {\n  padding-left: 0;\n  list-style: none; }\n\n.list-group {\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: .75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n\n.list-group-flush .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0; }\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0; }\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0; }\n\na.list-group-item,\nbutton.list-group-item {\n  width: 100%;\n  color: #555;\n  text-align: inherit; }\n  a.list-group-item .list-group-item-heading,\n  button.list-group-item .list-group-item-heading {\n    color: #333; }\n  a.list-group-item:focus, a.list-group-item:hover,\n  button.list-group-item:focus,\n  button.list-group-item:hover {\n    color: #555;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n\n.list-group-item.disabled, .list-group-item.disabled:focus, .list-group-item.disabled:hover {\n  color: #818a91;\n  cursor: not-allowed;\n  background-color: #eceeef; }\n  .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading {\n    color: inherit; }\n  .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text {\n    color: #818a91; }\n\n.list-group-item.active, .list-group-item.active:focus, .list-group-item.active:hover {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .list-group-item.active .list-group-item-heading,\n  .list-group-item.active .list-group-item-heading > small,\n  .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n  .list-group-item.active:focus .list-group-item-heading > small,\n  .list-group-item.active:focus .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n  .list-group-item.active:hover .list-group-item-heading > small,\n  .list-group-item.active:hover .list-group-item-heading > .small {\n    color: inherit; }\n  .list-group-item.active .list-group-item-text, .list-group-item.active:focus .list-group-item-text, .list-group-item.active:hover .list-group-item-text {\n    color: #a8d6fe; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active, a.list-group-item-success.active:focus, a.list-group-item-success.active:hover,\n  button.list-group-item-success.active,\n  button.list-group-item-success.active:focus,\n  button.list-group-item-success.active:hover {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active, a.list-group-item-info.active:focus, a.list-group-item-info.active:hover,\n  button.list-group-item-info.active,\n  button.list-group-item-info.active:focus,\n  button.list-group-item-info.active:hover {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active, a.list-group-item-warning.active:focus, a.list-group-item-warning.active:hover,\n  button.list-group-item-warning.active,\n  button.list-group-item-warning.active:focus,\n  button.list-group-item-warning.active:hover {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active, a.list-group-item-danger.active:focus, a.list-group-item-danger.active:hover,\n  button.list-group-item-danger.active,\n  button.list-group-item-danger.active:focus,\n  button.list-group-item-danger.active:hover {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9 {\n  padding-bottom: 42.85714%; }\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%; }\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%; }\n\n.embed-responsive-1by1 {\n  padding-bottom: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .2; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .5; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0;\n  -webkit-overflow-scrolling: touch; }\n  .modal.fade .modal-dialog {\n    transition: transform .3s ease-out;\n    transform: translate(0, -25%); }\n  .modal.in .modal-dialog {\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.in {\n    opacity: 0.5; }\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5; }\n  .modal-header::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.modal-header .close {\n  margin-top: -2px; }\n\n.modal-title {\n  margin: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  padding: 15px; }\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5; }\n  .modal-footer::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .modal-footer .btn + .btn {\n    margin-bottom: 0;\n    margin-left: 5px; }\n  .modal-footer .btn-group .btn + .btn {\n    margin-left: -1px; }\n  .modal-footer .btn-block + .btn-block {\n    margin-left: 0; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 544px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto; }\n  .modal-sm {\n    width: 300px; } }\n\n@media (min-width: 768px) {\n  .modal-lg {\n    width: 900px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 0.875rem;\n  opacity: 0; }\n  .tooltip.in {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-arrow, .tooltip.bs-tether-element-attached-bottom .tooltip-arrow {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-arrow, .tooltip.bs-tether-element-attached-left .tooltip-arrow {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-arrow, .tooltip.bs-tether-element-attached-top .tooltip-arrow {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-arrow, .tooltip.bs-tether-element-attached-right .tooltip-arrow {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  font-size: 0.875rem;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top .popover-arrow, .popover.bs-tether-element-attached-bottom .popover-arrow {\n      bottom: -11px;\n      left: 50%;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25);\n      border-bottom-width: 0; }\n      .popover.popover-top .popover-arrow::after, .popover.bs-tether-element-attached-bottom .popover-arrow::after {\n        bottom: 1px;\n        margin-left: -10px;\n        content: \"\";\n        border-top-color: #fff;\n        border-bottom-width: 0; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right .popover-arrow, .popover.bs-tether-element-attached-left .popover-arrow {\n      top: 50%;\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25);\n      border-left-width: 0; }\n      .popover.popover-right .popover-arrow::after, .popover.bs-tether-element-attached-left .popover-arrow::after {\n        bottom: -10px;\n        left: 1px;\n        content: \"\";\n        border-right-color: #fff;\n        border-left-width: 0; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom .popover-arrow, .popover.bs-tether-element-attached-top .popover-arrow {\n      top: -11px;\n      left: 50%;\n      margin-left: -11px;\n      border-top-width: 0;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n      .popover.popover-bottom .popover-arrow::after, .popover.bs-tether-element-attached-top .popover-arrow::after {\n        top: 1px;\n        margin-left: -10px;\n        content: \"\";\n        border-top-width: 0;\n        border-bottom-color: #fff; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left .popover-arrow, .popover.bs-tether-element-attached-right .popover-arrow {\n      top: 50%;\n      right: -11px;\n      margin-top: -11px;\n      border-right-width: 0;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n      .popover.popover-left .popover-arrow::after, .popover.bs-tether-element-attached-right .popover-arrow::after {\n        right: 1px;\n        bottom: -10px;\n        content: \"\";\n        border-right-width: 0;\n        border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: -0.7rem -0.7rem 0 0; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover-arrow, .popover-arrow::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover-arrow {\n  border-width: 11px; }\n\n.popover-arrow::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .carousel-inner > .carousel-item {\n    position: relative;\n    display: none;\n    transition: .6s ease-in-out left; }\n    .carousel-inner > .carousel-item > img,\n    .carousel-inner > .carousel-item > a > img {\n      line-height: 1; }\n    @media all and (transform-3d), (-webkit-transform-3d) {\n      .carousel-inner > .carousel-item {\n        transition: transform .6s ease-in-out;\n        backface-visibility: hidden;\n        perspective: 1000px; }\n        .carousel-inner > .carousel-item.next, .carousel-inner > .carousel-item.active.right {\n          left: 0;\n          transform: translate3d(100%, 0, 0); }\n        .carousel-inner > .carousel-item.prev, .carousel-inner > .carousel-item.active.left {\n          left: 0;\n          transform: translate3d(-100%, 0, 0); }\n        .carousel-inner > .carousel-item.next.left, .carousel-inner > .carousel-item.prev.right, .carousel-inner > .carousel-item.active {\n          left: 0;\n          transform: translate3d(0, 0, 0); } }\n  .carousel-inner > .active,\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    display: block; }\n  .carousel-inner > .active {\n    left: 0; }\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .carousel-inner > .next {\n    left: 100%; }\n  .carousel-inner > .prev {\n    left: -100%; }\n  .carousel-inner > .next.left,\n  .carousel-inner > .prev.right {\n    left: 0; }\n  .carousel-inner > .active.left {\n    left: -100%; }\n  .carousel-inner > .active.right {\n    left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 15%;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  opacity: 0.5; }\n  .carousel-control.left {\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\n  .carousel-control.right {\n    right: 0;\n    left: auto;\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\n  .carousel-control:focus, .carousel-control:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    position: absolute;\n    top: 50%;\n    z-index: 5;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    margin-top: -10px;\n    font-family: serif;\n    line-height: 1; }\n  .carousel-control .icon-prev {\n    left: 50%;\n    margin-left: -10px; }\n  .carousel-control .icon-next {\n    right: 50%;\n    margin-right: -10px; }\n  .carousel-control .icon-prev::before {\n    content: \"\\2039\"; }\n  .carousel-control .icon-next::before {\n    content: \"\\203A\"; }\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  padding-left: 0;\n  margin-left: -30%;\n  text-align: center;\n  list-style: none; }\n  .carousel-indicators li {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 1px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: transparent;\n    border: 1px solid #fff;\n    border-radius: 10px; }\n  .carousel-indicators .active {\n    width: 12px;\n    height: 12px;\n    margin: 0;\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n  .carousel-caption .btn {\n    text-shadow: none; }\n\n@media (min-width: 544px) {\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px; }\n  .carousel-control .icon-prev {\n    margin-left: -15px; }\n  .carousel-control .icon-next {\n    margin-right: -15px; }\n  .carousel-caption {\n    right: 20%;\n    left: 20%;\n    padding-bottom: 30px; }\n  .carousel-indicators {\n    bottom: 20px; } }\n\n.clearfix::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.pull-xs-left {\n  float: left !important; }\n\n.pull-xs-right {\n  float: right !important; }\n\n.pull-xs-none {\n  float: none !important; }\n\n@media (min-width: 544px) {\n  .pull-sm-left {\n    float: left !important; }\n  .pull-sm-right {\n    float: right !important; }\n  .pull-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .pull-md-left {\n    float: left !important; }\n  .pull-md-right {\n    float: right !important; }\n  .pull-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .pull-lg-left {\n    float: left !important; }\n  .pull-lg-right {\n    float: right !important; }\n  .pull-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .pull-xl-left {\n    float: left !important; }\n  .pull-xl-right {\n    float: right !important; }\n  .pull-xl-none {\n    float: none !important; } }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.text-hide {\n  font: \"0/0\" a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-xs-left {\n  text-align: left !important; }\n\n.text-xs-right {\n  text-align: right !important; }\n\n.text-xs-center {\n  text-align: center !important; }\n\n@media (min-width: 544px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-muted {\n  color: #818a91; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c; }\n\n.bg-inverse {\n  color: #eceeef;\n  background-color: #373a3c; }\n\n.bg-faded {\n  background-color: #f7f7f9; }\n\n.bg-primary {\n  color: #fff !important;\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5; }\n\n.bg-success {\n  color: #fff !important;\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44; }\n\n.bg-info {\n  color: #fff !important;\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5; }\n\n.bg-warning {\n  color: #fff !important;\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f; }\n\n.bg-danger {\n  color: #fff !important;\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c; }\n\n.m-x-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.m-a-0 {\n  margin: 0 0 !important; }\n\n.m-t-0 {\n  margin-top: 0 !important; }\n\n.m-r-0 {\n  margin-right: 0 !important; }\n\n.m-b-0 {\n  margin-bottom: 0 !important; }\n\n.m-l-0 {\n  margin-left: 0 !important; }\n\n.m-x-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.m-y-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-a-1 {\n  margin: 1rem 1rem !important; }\n\n.m-t-1 {\n  margin-top: 1rem !important; }\n\n.m-r-1 {\n  margin-right: 1rem !important; }\n\n.m-b-1 {\n  margin-bottom: 1rem !important; }\n\n.m-l-1 {\n  margin-left: 1rem !important; }\n\n.m-x-1 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.m-y-1 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-a-2 {\n  margin: 1.5rem 1.5rem !important; }\n\n.m-t-2 {\n  margin-top: 1.5rem !important; }\n\n.m-r-2 {\n  margin-right: 1.5rem !important; }\n\n.m-b-2 {\n  margin-bottom: 1.5rem !important; }\n\n.m-l-2 {\n  margin-left: 1.5rem !important; }\n\n.m-x-2 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.m-y-2 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-a-3 {\n  margin: 3rem 3rem !important; }\n\n.m-t-3 {\n  margin-top: 3rem !important; }\n\n.m-r-3 {\n  margin-right: 3rem !important; }\n\n.m-b-3 {\n  margin-bottom: 3rem !important; }\n\n.m-l-3 {\n  margin-left: 3rem !important; }\n\n.m-x-3 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.m-y-3 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-a-0 {\n  padding: 0 0 !important; }\n\n.p-t-0 {\n  padding-top: 0 !important; }\n\n.p-r-0 {\n  padding-right: 0 !important; }\n\n.p-b-0 {\n  padding-bottom: 0 !important; }\n\n.p-l-0 {\n  padding-left: 0 !important; }\n\n.p-x-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.p-y-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-a-1 {\n  padding: 1rem 1rem !important; }\n\n.p-t-1 {\n  padding-top: 1rem !important; }\n\n.p-r-1 {\n  padding-right: 1rem !important; }\n\n.p-b-1 {\n  padding-bottom: 1rem !important; }\n\n.p-l-1 {\n  padding-left: 1rem !important; }\n\n.p-x-1 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.p-y-1 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-a-2 {\n  padding: 1.5rem 1.5rem !important; }\n\n.p-t-2 {\n  padding-top: 1.5rem !important; }\n\n.p-r-2 {\n  padding-right: 1.5rem !important; }\n\n.p-b-2 {\n  padding-bottom: 1.5rem !important; }\n\n.p-l-2 {\n  padding-left: 1.5rem !important; }\n\n.p-x-2 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.p-y-2 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-a-3 {\n  padding: 3rem 3rem !important; }\n\n.p-t-3 {\n  padding-top: 3rem !important; }\n\n.p-r-3 {\n  padding-right: 3rem !important; }\n\n.p-b-3 {\n  padding-bottom: 3rem !important; }\n\n.p-l-3 {\n  padding-left: 3rem !important; }\n\n.p-x-3 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.p-y-3 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.pos-f-t {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 543px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 544px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(jQuery, __webpack_provided_window_dot_Tether, Tether) {/*!
	 * Bootstrap v4.0.0-alpha.2 (http://getbootstrap.com)
	 * Copyright 2011-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	if (typeof jQuery === 'undefined') {
	  throw new Error('Bootstrap\'s JavaScript requires jQuery')
	}

	+function ($) {
	  var version = $.fn.jquery.split(' ')[0].split('.')
	  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 3)) {
	    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v3.0.0')
	  }
	}(jQuery);


	+function ($) {

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): util.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	'use strict';

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var Util = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Private TransitionEnd Helpers
	   * ------------------------------------------------------------------------
	   */

	  var transition = false;

	  var TransitionEndEvent = {
	    WebkitTransition: 'webkitTransitionEnd',
	    MozTransition: 'transitionend',
	    OTransition: 'oTransitionEnd otransitionend',
	    transition: 'transitionend'
	  };

	  // shoutout AngusCroll (https://goo.gl/pxwQGp)
	  function toType(obj) {
	    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
	  }

	  function isElement(obj) {
	    return (obj[0] || obj).nodeType;
	  }

	  function getSpecialTransitionEndEvent() {
	    return {
	      bindType: transition.end,
	      delegateType: transition.end,
	      handle: function handle(event) {
	        if ($(event.target).is(this)) {
	          return event.handleObj.handler.apply(this, arguments);
	        }
	      }
	    };
	  }

	  function transitionEndTest() {
	    if (window.QUnit) {
	      return false;
	    }

	    var el = document.createElement('bootstrap');

	    for (var _name in TransitionEndEvent) {
	      if (el.style[_name] !== undefined) {
	        return { end: TransitionEndEvent[_name] };
	      }
	    }

	    return false;
	  }

	  function transitionEndEmulator(duration) {
	    var _this = this;

	    var called = false;

	    $(this).one(Util.TRANSITION_END, function () {
	      called = true;
	    });

	    setTimeout(function () {
	      if (!called) {
	        Util.triggerTransitionEnd(_this);
	      }
	    }, duration);

	    return this;
	  }

	  function setTransitionEndSupport() {
	    transition = transitionEndTest();

	    $.fn.emulateTransitionEnd = transitionEndEmulator;

	    if (Util.supportsTransitionEnd()) {
	      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
	    }
	  }

	  /**
	   * --------------------------------------------------------------------------
	   * Public Util Api
	   * --------------------------------------------------------------------------
	   */

	  var Util = {

	    TRANSITION_END: 'bsTransitionEnd',

	    getUID: function getUID(prefix) {
	      do {
	        prefix += ~ ~(Math.random() * 1000000); // "~~" acts like a faster Math.floor() here
	      } while (document.getElementById(prefix));
	      return prefix;
	    },

	    getSelectorFromElement: function getSelectorFromElement(element) {
	      var selector = element.getAttribute('data-target');

	      if (!selector) {
	        selector = element.getAttribute('href') || '';
	        selector = /^#[a-z]/i.test(selector) ? selector : null;
	      }

	      return selector;
	    },

	    reflow: function reflow(element) {
	      new Function('bs', 'return bs')(element.offsetHeight);
	    },

	    triggerTransitionEnd: function triggerTransitionEnd(element) {
	      $(element).trigger(transition.end);
	    },

	    supportsTransitionEnd: function supportsTransitionEnd() {
	      return Boolean(transition);
	    },

	    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
	      for (var property in configTypes) {
	        if (configTypes.hasOwnProperty(property)) {
	          var expectedTypes = configTypes[property];
	          var value = config[property];
	          var valueType = undefined;

	          if (value && isElement(value)) {
	            valueType = 'element';
	          } else {
	            valueType = toType(value);
	          }

	          if (!new RegExp(expectedTypes).test(valueType)) {
	            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
	          }
	        }
	      }
	    }
	  };

	  setTransitionEndSupport();

	  return Util;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): alert.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Alert = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'alert';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.alert';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 150;

	  var Selector = {
	    DISMISS: '[data-dismiss="alert"]'
	  };

	  var Event = {
	    CLOSE: 'close' + EVENT_KEY,
	    CLOSED: 'closed' + EVENT_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    ALERT: 'alert',
	    FADE: 'fade',
	    IN: 'in'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Alert = (function () {
	    function Alert(element) {
	      _classCallCheck(this, Alert);

	      this._element = element;
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Alert, [{
	      key: 'close',

	      // public

	      value: function close(element) {
	        element = element || this._element;

	        var rootElement = this._getRootElement(element);
	        var customEvent = this._triggerCloseEvent(rootElement);

	        if (customEvent.isDefaultPrevented()) {
	          return;
	        }

	        this._removeElement(rootElement);
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);
	        this._element = null;
	      }

	      // private

	    }, {
	      key: '_getRootElement',
	      value: function _getRootElement(element) {
	        var selector = Util.getSelectorFromElement(element);
	        var parent = false;

	        if (selector) {
	          parent = $(selector)[0];
	        }

	        if (!parent) {
	          parent = $(element).closest('.' + ClassName.ALERT)[0];
	        }

	        return parent;
	      }
	    }, {
	      key: '_triggerCloseEvent',
	      value: function _triggerCloseEvent(element) {
	        var closeEvent = $.Event(Event.CLOSE);

	        $(element).trigger(closeEvent);
	        return closeEvent;
	      }
	    }, {
	      key: '_removeElement',
	      value: function _removeElement(element) {
	        $(element).removeClass(ClassName.IN);

	        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
	          this._destroyElement(element);
	          return;
	        }

	        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
	      }
	    }, {
	      key: '_destroyElement',
	      value: function _destroyElement(element) {
	        $(element).detach().trigger(Event.CLOSED).remove();
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $element = $(this);
	          var data = $element.data(DATA_KEY);

	          if (!data) {
	            data = new Alert(this);
	            $element.data(DATA_KEY, data);
	          }

	          if (config === 'close') {
	            data[config](this);
	          }
	        });
	      }
	    }, {
	      key: '_handleDismiss',
	      value: function _handleDismiss(alertInstance) {
	        return function (event) {
	          if (event) {
	            event.preventDefault();
	          }

	          alertInstance.close(this);
	        };
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }]);

	    return Alert;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Alert._jQueryInterface;
	  $.fn[NAME].Constructor = Alert;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Alert._jQueryInterface;
	  };

	  return Alert;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): button.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Button = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'button';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.button';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];

	  var ClassName = {
	    ACTIVE: 'active',
	    BUTTON: 'btn',
	    FOCUS: 'focus'
	  };

	  var Selector = {
	    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
	    DATA_TOGGLE: '[data-toggle="buttons"]',
	    INPUT: 'input',
	    ACTIVE: '.active',
	    BUTTON: '.btn'
	  };

	  var Event = {
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
	    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Button = (function () {
	    function Button(element) {
	      _classCallCheck(this, Button);

	      this._element = element;
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Button, [{
	      key: 'toggle',

	      // public

	      value: function toggle() {
	        var triggerChangeEvent = true;
	        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

	        if (rootElement) {
	          var input = $(this._element).find(Selector.INPUT)[0];

	          if (input) {
	            if (input.type === 'radio') {
	              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
	                triggerChangeEvent = false;
	              } else {
	                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

	                if (activeElement) {
	                  $(activeElement).removeClass(ClassName.ACTIVE);
	                }
	              }
	            }

	            if (triggerChangeEvent) {
	              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
	              $(this._element).trigger('change');
	            }
	          }
	        } else {
	          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
	        }

	        if (triggerChangeEvent) {
	          $(this._element).toggleClass(ClassName.ACTIVE);
	        }
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);
	        this._element = null;
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);

	          if (!data) {
	            data = new Button(this);
	            $(this).data(DATA_KEY, data);
	          }

	          if (config === 'toggle') {
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }]);

	    return Button;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
	    event.preventDefault();

	    var button = event.target;

	    if (!$(button).hasClass(ClassName.BUTTON)) {
	      button = $(button).closest(Selector.BUTTON);
	    }

	    Button._jQueryInterface.call($(button), 'toggle');
	  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
	    var button = $(event.target).closest(Selector.BUTTON)[0];
	    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Button._jQueryInterface;
	  $.fn[NAME].Constructor = Button;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Button._jQueryInterface;
	  };

	  return Button;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): carousel.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Carousel = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'carousel';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.carousel';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 600;

	  var Default = {
	    interval: 5000,
	    keyboard: true,
	    slide: false,
	    pause: 'hover',
	    wrap: true
	  };

	  var DefaultType = {
	    interval: '(number|boolean)',
	    keyboard: 'boolean',
	    slide: '(boolean|string)',
	    pause: '(string|boolean)',
	    wrap: 'boolean'
	  };

	  var Direction = {
	    NEXT: 'next',
	    PREVIOUS: 'prev'
	  };

	  var Event = {
	    SLIDE: 'slide' + EVENT_KEY,
	    SLID: 'slid' + EVENT_KEY,
	    KEYDOWN: 'keydown' + EVENT_KEY,
	    MOUSEENTER: 'mouseenter' + EVENT_KEY,
	    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
	    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    CAROUSEL: 'carousel',
	    ACTIVE: 'active',
	    SLIDE: 'slide',
	    RIGHT: 'right',
	    LEFT: 'left',
	    ITEM: 'carousel-item'
	  };

	  var Selector = {
	    ACTIVE: '.active',
	    ACTIVE_ITEM: '.active.carousel-item',
	    ITEM: '.carousel-item',
	    NEXT_PREV: '.next, .prev',
	    INDICATORS: '.carousel-indicators',
	    DATA_SLIDE: '[data-slide], [data-slide-to]',
	    DATA_RIDE: '[data-ride="carousel"]'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Carousel = (function () {
	    function Carousel(element, config) {
	      _classCallCheck(this, Carousel);

	      this._items = null;
	      this._interval = null;
	      this._activeElement = null;

	      this._isPaused = false;
	      this._isSliding = false;

	      this._config = this._getConfig(config);
	      this._element = $(element)[0];
	      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

	      this._addEventListeners();
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Carousel, [{
	      key: 'next',

	      // public

	      value: function next() {
	        if (!this._isSliding) {
	          this._slide(Direction.NEXT);
	        }
	      }
	    }, {
	      key: 'nextWhenVisible',
	      value: function nextWhenVisible() {
	        // Don't call next when the page isn't visible
	        if (!document.hidden) {
	          this.next();
	        }
	      }
	    }, {
	      key: 'prev',
	      value: function prev() {
	        if (!this._isSliding) {
	          this._slide(Direction.PREVIOUS);
	        }
	      }
	    }, {
	      key: 'pause',
	      value: function pause(event) {
	        if (!event) {
	          this._isPaused = true;
	        }

	        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
	          Util.triggerTransitionEnd(this._element);
	          this.cycle(true);
	        }

	        clearInterval(this._interval);
	        this._interval = null;
	      }
	    }, {
	      key: 'cycle',
	      value: function cycle(event) {
	        if (!event) {
	          this._isPaused = false;
	        }

	        if (this._interval) {
	          clearInterval(this._interval);
	          this._interval = null;
	        }

	        if (this._config.interval && !this._isPaused) {
	          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
	        }
	      }
	    }, {
	      key: 'to',
	      value: function to(index) {
	        var _this2 = this;

	        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

	        var activeIndex = this._getItemIndex(this._activeElement);

	        if (index > this._items.length - 1 || index < 0) {
	          return;
	        }

	        if (this._isSliding) {
	          $(this._element).one(Event.SLID, function () {
	            return _this2.to(index);
	          });
	          return;
	        }

	        if (activeIndex === index) {
	          this.pause();
	          this.cycle();
	          return;
	        }

	        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

	        this._slide(direction, this._items[index]);
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $(this._element).off(EVENT_KEY);
	        $.removeData(this._element, DATA_KEY);

	        this._items = null;
	        this._config = null;
	        this._element = null;
	        this._interval = null;
	        this._isPaused = null;
	        this._isSliding = null;
	        this._activeElement = null;
	        this._indicatorsElement = null;
	      }

	      // private

	    }, {
	      key: '_getConfig',
	      value: function _getConfig(config) {
	        config = $.extend({}, Default, config);
	        Util.typeCheckConfig(NAME, config, DefaultType);
	        return config;
	      }
	    }, {
	      key: '_addEventListeners',
	      value: function _addEventListeners() {
	        if (this._config.keyboard) {
	          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
	        }

	        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
	          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
	        }
	      }
	    }, {
	      key: '_keydown',
	      value: function _keydown(event) {
	        event.preventDefault();

	        if (/input|textarea/i.test(event.target.tagName)) {
	          return;
	        }

	        switch (event.which) {
	          case 37:
	            this.prev();break;
	          case 39:
	            this.next();break;
	          default:
	            return;
	        }
	      }
	    }, {
	      key: '_getItemIndex',
	      value: function _getItemIndex(element) {
	        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
	        return this._items.indexOf(element);
	      }
	    }, {
	      key: '_getItemByDirection',
	      value: function _getItemByDirection(direction, activeElement) {
	        var isNextDirection = direction === Direction.NEXT;
	        var isPrevDirection = direction === Direction.PREVIOUS;
	        var activeIndex = this._getItemIndex(activeElement);
	        var lastItemIndex = this._items.length - 1;
	        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

	        if (isGoingToWrap && !this._config.wrap) {
	          return activeElement;
	        }

	        var delta = direction === Direction.PREVIOUS ? -1 : 1;
	        var itemIndex = (activeIndex + delta) % this._items.length;

	        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
	      }
	    }, {
	      key: '_triggerSlideEvent',
	      value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
	        var slideEvent = $.Event(Event.SLIDE, {
	          relatedTarget: relatedTarget,
	          direction: directionalClassname
	        });

	        $(this._element).trigger(slideEvent);

	        return slideEvent;
	      }
	    }, {
	      key: '_setActiveIndicatorElement',
	      value: function _setActiveIndicatorElement(element) {
	        if (this._indicatorsElement) {
	          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

	          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

	          if (nextIndicator) {
	            $(nextIndicator).addClass(ClassName.ACTIVE);
	          }
	        }
	      }
	    }, {
	      key: '_slide',
	      value: function _slide(direction, element) {
	        var _this3 = this;

	        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
	        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

	        var isCycling = Boolean(this._interval);

	        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

	        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
	          this._isSliding = false;
	          return;
	        }

	        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
	        if (slideEvent.isDefaultPrevented()) {
	          return;
	        }

	        if (!activeElement || !nextElement) {
	          // some weirdness is happening, so we bail
	          return;
	        }

	        this._isSliding = true;

	        if (isCycling) {
	          this.pause();
	        }

	        this._setActiveIndicatorElement(nextElement);

	        var slidEvent = $.Event(Event.SLID, {
	          relatedTarget: nextElement,
	          direction: directionalClassName
	        });

	        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

	          $(nextElement).addClass(direction);

	          Util.reflow(nextElement);

	          $(activeElement).addClass(directionalClassName);
	          $(nextElement).addClass(directionalClassName);

	          $(activeElement).one(Util.TRANSITION_END, function () {
	            $(nextElement).removeClass(directionalClassName).removeClass(direction);

	            $(nextElement).addClass(ClassName.ACTIVE);

	            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

	            _this3._isSliding = false;

	            setTimeout(function () {
	              return $(_this3._element).trigger(slidEvent);
	            }, 0);
	          }).emulateTransitionEnd(TRANSITION_DURATION);
	        } else {
	          $(activeElement).removeClass(ClassName.ACTIVE);
	          $(nextElement).addClass(ClassName.ACTIVE);

	          this._isSliding = false;
	          $(this._element).trigger(slidEvent);
	        }

	        if (isCycling) {
	          this.cycle();
	        }
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);
	          var _config = $.extend({}, Default, $(this).data());

	          if (typeof config === 'object') {
	            $.extend(_config, config);
	          }

	          var action = typeof config === 'string' ? config : _config.slide;

	          if (!data) {
	            data = new Carousel(this, _config);
	            $(this).data(DATA_KEY, data);
	          }

	          if (typeof config === 'number') {
	            data.to(config);
	          } else if (typeof action === 'string') {
	            if (data[action] === undefined) {
	              throw new Error('No method named "' + action + '"');
	            }
	            data[action]();
	          } else if (_config.interval) {
	            data.pause();
	            data.cycle();
	          }
	        });
	      }
	    }, {
	      key: '_dataApiClickHandler',
	      value: function _dataApiClickHandler(event) {
	        var selector = Util.getSelectorFromElement(this);

	        if (!selector) {
	          return;
	        }

	        var target = $(selector)[0];

	        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
	          return;
	        }

	        var config = $.extend({}, $(target).data(), $(this).data());
	        var slideIndex = this.getAttribute('data-slide-to');

	        if (slideIndex) {
	          config.interval = false;
	        }

	        Carousel._jQueryInterface.call($(target), config);

	        if (slideIndex) {
	          $(target).data(DATA_KEY).to(slideIndex);
	        }

	        event.preventDefault();
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }]);

	    return Carousel;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

	  $(window).on(Event.LOAD_DATA_API, function () {
	    $(Selector.DATA_RIDE).each(function () {
	      var $carousel = $(this);
	      Carousel._jQueryInterface.call($carousel, $carousel.data());
	    });
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Carousel._jQueryInterface;
	  $.fn[NAME].Constructor = Carousel;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Carousel._jQueryInterface;
	  };

	  return Carousel;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): collapse.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Collapse = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'collapse';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.collapse';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 600;

	  var Default = {
	    toggle: true,
	    parent: ''
	  };

	  var DefaultType = {
	    toggle: 'boolean',
	    parent: 'string'
	  };

	  var Event = {
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    IN: 'in',
	    COLLAPSE: 'collapse',
	    COLLAPSING: 'collapsing',
	    COLLAPSED: 'collapsed'
	  };

	  var Dimension = {
	    WIDTH: 'width',
	    HEIGHT: 'height'
	  };

	  var Selector = {
	    ACTIVES: '.panel > .in, .panel > .collapsing',
	    DATA_TOGGLE: '[data-toggle="collapse"]'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Collapse = (function () {
	    function Collapse(element, config) {
	      _classCallCheck(this, Collapse);

	      this._isTransitioning = false;
	      this._element = element;
	      this._config = this._getConfig(config);
	      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

	      this._parent = this._config.parent ? this._getParent() : null;

	      if (!this._config.parent) {
	        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
	      }

	      if (this._config.toggle) {
	        this.toggle();
	      }
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Collapse, [{
	      key: 'toggle',

	      // public

	      value: function toggle() {
	        if ($(this._element).hasClass(ClassName.IN)) {
	          this.hide();
	        } else {
	          this.show();
	        }
	      }
	    }, {
	      key: 'show',
	      value: function show() {
	        var _this4 = this;

	        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
	          return;
	        }

	        var actives = undefined;
	        var activesData = undefined;

	        if (this._parent) {
	          actives = $.makeArray($(Selector.ACTIVES));
	          if (!actives.length) {
	            actives = null;
	          }
	        }

	        if (actives) {
	          activesData = $(actives).data(DATA_KEY);
	          if (activesData && activesData._isTransitioning) {
	            return;
	          }
	        }

	        var startEvent = $.Event(Event.SHOW);
	        $(this._element).trigger(startEvent);
	        if (startEvent.isDefaultPrevented()) {
	          return;
	        }

	        if (actives) {
	          Collapse._jQueryInterface.call($(actives), 'hide');
	          if (!activesData) {
	            $(actives).data(DATA_KEY, null);
	          }
	        }

	        var dimension = this._getDimension();

	        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

	        this._element.style[dimension] = 0;
	        this._element.setAttribute('aria-expanded', true);

	        if (this._triggerArray.length) {
	          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
	        }

	        this.setTransitioning(true);

	        var complete = function complete() {
	          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

	          _this4._element.style[dimension] = '';

	          _this4.setTransitioning(false);

	          $(_this4._element).trigger(Event.SHOWN);
	        };

	        if (!Util.supportsTransitionEnd()) {
	          complete();
	          return;
	        }

	        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
	        var scrollSize = 'scroll' + capitalizedDimension;

	        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

	        this._element.style[dimension] = this._element[scrollSize] + 'px';
	      }
	    }, {
	      key: 'hide',
	      value: function hide() {
	        var _this5 = this;

	        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
	          return;
	        }

	        var startEvent = $.Event(Event.HIDE);
	        $(this._element).trigger(startEvent);
	        if (startEvent.isDefaultPrevented()) {
	          return;
	        }

	        var dimension = this._getDimension();
	        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

	        this._element.style[dimension] = this._element[offsetDimension] + 'px';

	        Util.reflow(this._element);

	        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

	        this._element.setAttribute('aria-expanded', false);

	        if (this._triggerArray.length) {
	          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
	        }

	        this.setTransitioning(true);

	        var complete = function complete() {
	          _this5.setTransitioning(false);
	          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
	        };

	        this._element.style[dimension] = 0;

	        if (!Util.supportsTransitionEnd()) {
	          complete();
	          return;
	        }

	        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	      }
	    }, {
	      key: 'setTransitioning',
	      value: function setTransitioning(isTransitioning) {
	        this._isTransitioning = isTransitioning;
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);

	        this._config = null;
	        this._parent = null;
	        this._element = null;
	        this._triggerArray = null;
	        this._isTransitioning = null;
	      }

	      // private

	    }, {
	      key: '_getConfig',
	      value: function _getConfig(config) {
	        config = $.extend({}, Default, config);
	        config.toggle = Boolean(config.toggle); // coerce string values
	        Util.typeCheckConfig(NAME, config, DefaultType);
	        return config;
	      }
	    }, {
	      key: '_getDimension',
	      value: function _getDimension() {
	        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
	        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
	      }
	    }, {
	      key: '_getParent',
	      value: function _getParent() {
	        var _this6 = this;

	        var parent = $(this._config.parent)[0];
	        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

	        $(parent).find(selector).each(function (i, element) {
	          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
	        });

	        return parent;
	      }
	    }, {
	      key: '_addAriaAndCollapsedClass',
	      value: function _addAriaAndCollapsedClass(element, triggerArray) {
	        if (element) {
	          var isOpen = $(element).hasClass(ClassName.IN);
	          element.setAttribute('aria-expanded', isOpen);

	          if (triggerArray.length) {
	            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
	          }
	        }
	      }

	      // static

	    }], [{
	      key: '_getTargetFromElement',
	      value: function _getTargetFromElement(element) {
	        var selector = Util.getSelectorFromElement(element);
	        return selector ? $(selector)[0] : null;
	      }
	    }, {
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $this = $(this);
	          var data = $this.data(DATA_KEY);
	          var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

	          if (!data && _config.toggle && /show|hide/.test(config)) {
	            _config.toggle = false;
	          }

	          if (!data) {
	            data = new Collapse(this, _config);
	            $this.data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }]);

	    return Collapse;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	    event.preventDefault();

	    var target = Collapse._getTargetFromElement(this);
	    var data = $(target).data(DATA_KEY);
	    var config = data ? 'toggle' : $(this).data();

	    Collapse._jQueryInterface.call($(target), config);
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Collapse._jQueryInterface;
	  $.fn[NAME].Constructor = Collapse;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Collapse._jQueryInterface;
	  };

	  return Collapse;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): dropdown.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Dropdown = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'dropdown';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.dropdown';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];

	  var Event = {
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    CLICK: 'click' + EVENT_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
	    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    BACKDROP: 'dropdown-backdrop',
	    DISABLED: 'disabled',
	    OPEN: 'open'
	  };

	  var Selector = {
	    BACKDROP: '.dropdown-backdrop',
	    DATA_TOGGLE: '[data-toggle="dropdown"]',
	    FORM_CHILD: '.dropdown form',
	    ROLE_MENU: '[role="menu"]',
	    ROLE_LISTBOX: '[role="listbox"]',
	    NAVBAR_NAV: '.navbar-nav',
	    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Dropdown = (function () {
	    function Dropdown(element) {
	      _classCallCheck(this, Dropdown);

	      this._element = element;

	      this._addEventListeners();
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Dropdown, [{
	      key: 'toggle',

	      // public

	      value: function toggle() {
	        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
	          return false;
	        }

	        var parent = Dropdown._getParentFromElement(this);
	        var isActive = $(parent).hasClass(ClassName.OPEN);

	        Dropdown._clearMenus();

	        if (isActive) {
	          return false;
	        }

	        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

	          // if mobile we use a backdrop because click events don't delegate
	          var dropdown = document.createElement('div');
	          dropdown.className = ClassName.BACKDROP;
	          $(dropdown).insertBefore(this);
	          $(dropdown).on('click', Dropdown._clearMenus);
	        }

	        var relatedTarget = { relatedTarget: this };
	        var showEvent = $.Event(Event.SHOW, relatedTarget);

	        $(parent).trigger(showEvent);

	        if (showEvent.isDefaultPrevented()) {
	          return false;
	        }

	        this.focus();
	        this.setAttribute('aria-expanded', 'true');

	        $(parent).toggleClass(ClassName.OPEN);
	        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

	        return false;
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);
	        $(this._element).off(EVENT_KEY);
	        this._element = null;
	      }

	      // private

	    }, {
	      key: '_addEventListeners',
	      value: function _addEventListeners() {
	        $(this._element).on(Event.CLICK, this.toggle);
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);

	          if (!data) {
	            $(this).data(DATA_KEY, data = new Dropdown(this));
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config].call(this);
	          }
	        });
	      }
	    }, {
	      key: '_clearMenus',
	      value: function _clearMenus(event) {
	        if (event && event.which === 3) {
	          return;
	        }

	        var backdrop = $(Selector.BACKDROP)[0];
	        if (backdrop) {
	          backdrop.parentNode.removeChild(backdrop);
	        }

	        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

	        for (var i = 0; i < toggles.length; i++) {
	          var _parent = Dropdown._getParentFromElement(toggles[i]);
	          var relatedTarget = { relatedTarget: toggles[i] };

	          if (!$(_parent).hasClass(ClassName.OPEN)) {
	            continue;
	          }

	          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
	            continue;
	          }

	          var hideEvent = $.Event(Event.HIDE, relatedTarget);
	          $(_parent).trigger(hideEvent);
	          if (hideEvent.isDefaultPrevented()) {
	            continue;
	          }

	          toggles[i].setAttribute('aria-expanded', 'false');

	          $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
	        }
	      }
	    }, {
	      key: '_getParentFromElement',
	      value: function _getParentFromElement(element) {
	        var parent = undefined;
	        var selector = Util.getSelectorFromElement(element);

	        if (selector) {
	          parent = $(selector)[0];
	        }

	        return parent || element.parentNode;
	      }
	    }, {
	      key: '_dataApiKeydownHandler',
	      value: function _dataApiKeydownHandler(event) {
	        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
	          return;
	        }

	        event.preventDefault();
	        event.stopPropagation();

	        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
	          return;
	        }

	        var parent = Dropdown._getParentFromElement(this);
	        var isActive = $(parent).hasClass(ClassName.OPEN);

	        if (!isActive && event.which !== 27 || isActive && event.which === 27) {

	          if (event.which === 27) {
	            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
	            $(toggle).trigger('focus');
	          }

	          $(this).trigger('click');
	          return;
	        }

	        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

	        items = items.filter(function (item) {
	          return item.offsetWidth || item.offsetHeight;
	        });

	        if (!items.length) {
	          return;
	        }

	        var index = items.indexOf(event.target);

	        if (event.which === 38 && index > 0) {
	          // up
	          index--;
	        }

	        if (event.which === 40 && index < items.length - 1) {
	          // down
	          index++;
	        }

	        if (! ~index) {
	          index = 0;
	        }

	        items[index].focus();
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }]);

	    return Dropdown;
	  })();

	  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
	    e.stopPropagation();
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Dropdown._jQueryInterface;
	  $.fn[NAME].Constructor = Dropdown;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Dropdown._jQueryInterface;
	  };

	  return Dropdown;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): modal.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Modal = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'modal';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.modal';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 300;
	  var BACKDROP_TRANSITION_DURATION = 150;

	  var Default = {
	    backdrop: true,
	    keyboard: true,
	    focus: true,
	    show: true
	  };

	  var DefaultType = {
	    backdrop: '(boolean|string)',
	    keyboard: 'boolean',
	    focus: 'boolean',
	    show: 'boolean'
	  };

	  var Event = {
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    FOCUSIN: 'focusin' + EVENT_KEY,
	    RESIZE: 'resize' + EVENT_KEY,
	    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
	    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
	    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
	    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
	    BACKDROP: 'modal-backdrop',
	    OPEN: 'modal-open',
	    FADE: 'fade',
	    IN: 'in'
	  };

	  var Selector = {
	    DIALOG: '.modal-dialog',
	    DATA_TOGGLE: '[data-toggle="modal"]',
	    DATA_DISMISS: '[data-dismiss="modal"]',
	    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Modal = (function () {
	    function Modal(element, config) {
	      _classCallCheck(this, Modal);

	      this._config = this._getConfig(config);
	      this._element = element;
	      this._dialog = $(element).find(Selector.DIALOG)[0];
	      this._backdrop = null;
	      this._isShown = false;
	      this._isBodyOverflowing = false;
	      this._ignoreBackdropClick = false;
	      this._originalBodyPadding = 0;
	      this._scrollbarWidth = 0;
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Modal, [{
	      key: 'toggle',

	      // public

	      value: function toggle(relatedTarget) {
	        return this._isShown ? this.hide() : this.show(relatedTarget);
	      }
	    }, {
	      key: 'show',
	      value: function show(relatedTarget) {
	        var _this7 = this;

	        var showEvent = $.Event(Event.SHOW, {
	          relatedTarget: relatedTarget
	        });

	        $(this._element).trigger(showEvent);

	        if (this._isShown || showEvent.isDefaultPrevented()) {
	          return;
	        }

	        this._isShown = true;

	        this._checkScrollbar();
	        this._setScrollbar();

	        $(document.body).addClass(ClassName.OPEN);

	        this._setEscapeEvent();
	        this._setResizeEvent();

	        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

	        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
	          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
	            if ($(event.target).is(_this7._element)) {
	              _this7._ignoreBackdropClick = true;
	            }
	          });
	        });

	        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
	      }
	    }, {
	      key: 'hide',
	      value: function hide(event) {
	        if (event) {
	          event.preventDefault();
	        }

	        var hideEvent = $.Event(Event.HIDE);

	        $(this._element).trigger(hideEvent);

	        if (!this._isShown || hideEvent.isDefaultPrevented()) {
	          return;
	        }

	        this._isShown = false;

	        this._setEscapeEvent();
	        this._setResizeEvent();

	        $(document).off(Event.FOCUSIN);

	        $(this._element).removeClass(ClassName.IN);

	        $(this._element).off(Event.CLICK_DISMISS);
	        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

	        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

	          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
	        } else {
	          this._hideModal();
	        }
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);

	        $(window).off(EVENT_KEY);
	        $(document).off(EVENT_KEY);
	        $(this._element).off(EVENT_KEY);
	        $(this._backdrop).off(EVENT_KEY);

	        this._config = null;
	        this._element = null;
	        this._dialog = null;
	        this._backdrop = null;
	        this._isShown = null;
	        this._isBodyOverflowing = null;
	        this._ignoreBackdropClick = null;
	        this._originalBodyPadding = null;
	        this._scrollbarWidth = null;
	      }

	      // private

	    }, {
	      key: '_getConfig',
	      value: function _getConfig(config) {
	        config = $.extend({}, Default, config);
	        Util.typeCheckConfig(NAME, config, DefaultType);
	        return config;
	      }
	    }, {
	      key: '_showElement',
	      value: function _showElement(relatedTarget) {
	        var _this8 = this;

	        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

	        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
	          // don't move modals dom position
	          document.body.appendChild(this._element);
	        }

	        this._element.style.display = 'block';
	        this._element.scrollTop = 0;

	        if (transition) {
	          Util.reflow(this._element);
	        }

	        $(this._element).addClass(ClassName.IN);

	        if (this._config.focus) {
	          this._enforceFocus();
	        }

	        var shownEvent = $.Event(Event.SHOWN, {
	          relatedTarget: relatedTarget
	        });

	        var transitionComplete = function transitionComplete() {
	          if (_this8._config.focus) {
	            _this8._element.focus();
	          }
	          $(_this8._element).trigger(shownEvent);
	        };

	        if (transition) {
	          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
	        } else {
	          transitionComplete();
	        }
	      }
	    }, {
	      key: '_enforceFocus',
	      value: function _enforceFocus() {
	        var _this9 = this;

	        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
	        .on(Event.FOCUSIN, function (event) {
	          if (_this9._element !== event.target && !$(_this9._element).has(event.target).length) {
	            _this9._element.focus();
	          }
	        });
	      }
	    }, {
	      key: '_setEscapeEvent',
	      value: function _setEscapeEvent() {
	        var _this10 = this;

	        if (this._isShown && this._config.keyboard) {
	          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
	            if (event.which === 27) {
	              _this10.hide();
	            }
	          });
	        } else if (!this._isShown) {
	          $(this._element).off(Event.KEYDOWN_DISMISS);
	        }
	      }
	    }, {
	      key: '_setResizeEvent',
	      value: function _setResizeEvent() {
	        if (this._isShown) {
	          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
	        } else {
	          $(window).off(Event.RESIZE);
	        }
	      }
	    }, {
	      key: '_hideModal',
	      value: function _hideModal() {
	        var _this11 = this;

	        this._element.style.display = 'none';
	        this._showBackdrop(function () {
	          $(document.body).removeClass(ClassName.OPEN);
	          _this11._resetAdjustments();
	          _this11._resetScrollbar();
	          $(_this11._element).trigger(Event.HIDDEN);
	        });
	      }
	    }, {
	      key: '_removeBackdrop',
	      value: function _removeBackdrop() {
	        if (this._backdrop) {
	          $(this._backdrop).remove();
	          this._backdrop = null;
	        }
	      }
	    }, {
	      key: '_showBackdrop',
	      value: function _showBackdrop(callback) {
	        var _this12 = this;

	        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

	        if (this._isShown && this._config.backdrop) {
	          var doAnimate = Util.supportsTransitionEnd() && animate;

	          this._backdrop = document.createElement('div');
	          this._backdrop.className = ClassName.BACKDROP;

	          if (animate) {
	            $(this._backdrop).addClass(animate);
	          }

	          $(this._backdrop).appendTo(document.body);

	          $(this._element).on(Event.CLICK_DISMISS, function (event) {
	            if (_this12._ignoreBackdropClick) {
	              _this12._ignoreBackdropClick = false;
	              return;
	            }
	            if (event.target !== event.currentTarget) {
	              return;
	            }
	            if (_this12._config.backdrop === 'static') {
	              _this12._element.focus();
	            } else {
	              _this12.hide();
	            }
	          });

	          if (doAnimate) {
	            Util.reflow(this._backdrop);
	          }

	          $(this._backdrop).addClass(ClassName.IN);

	          if (!callback) {
	            return;
	          }

	          if (!doAnimate) {
	            callback();
	            return;
	          }

	          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
	        } else if (!this._isShown && this._backdrop) {
	          $(this._backdrop).removeClass(ClassName.IN);

	          var callbackRemove = function callbackRemove() {
	            _this12._removeBackdrop();
	            if (callback) {
	              callback();
	            }
	          };

	          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
	            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
	          } else {
	            callbackRemove();
	          }
	        } else if (callback) {
	          callback();
	        }
	      }

	      // ----------------------------------------------------------------------
	      // the following methods are used to handle overflowing modals
	      // todo (fat): these should probably be refactored out of modal.js
	      // ----------------------------------------------------------------------

	    }, {
	      key: '_handleUpdate',
	      value: function _handleUpdate() {
	        this._adjustDialog();
	      }
	    }, {
	      key: '_adjustDialog',
	      value: function _adjustDialog() {
	        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

	        if (!this._isBodyOverflowing && isModalOverflowing) {
	          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
	        }

	        if (this._isBodyOverflowing && !isModalOverflowing) {
	          this._element.style.paddingRight = this._scrollbarWidth + 'px~';
	        }
	      }
	    }, {
	      key: '_resetAdjustments',
	      value: function _resetAdjustments() {
	        this._element.style.paddingLeft = '';
	        this._element.style.paddingRight = '';
	      }
	    }, {
	      key: '_checkScrollbar',
	      value: function _checkScrollbar() {
	        var fullWindowWidth = window.innerWidth;
	        if (!fullWindowWidth) {
	          // workaround for missing window.innerWidth in IE8
	          var documentElementRect = document.documentElement.getBoundingClientRect();
	          fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
	        }
	        this._isBodyOverflowing = document.body.clientWidth < fullWindowWidth;
	        this._scrollbarWidth = this._getScrollbarWidth();
	      }
	    }, {
	      key: '_setScrollbar',
	      value: function _setScrollbar() {
	        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

	        this._originalBodyPadding = document.body.style.paddingRight || '';

	        if (this._isBodyOverflowing) {
	          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
	        }
	      }
	    }, {
	      key: '_resetScrollbar',
	      value: function _resetScrollbar() {
	        document.body.style.paddingRight = this._originalBodyPadding;
	      }
	    }, {
	      key: '_getScrollbarWidth',
	      value: function _getScrollbarWidth() {
	        // thx d.walsh
	        var scrollDiv = document.createElement('div');
	        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
	        document.body.appendChild(scrollDiv);
	        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	        document.body.removeChild(scrollDiv);
	        return scrollbarWidth;
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config, relatedTarget) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);
	          var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

	          if (!data) {
	            data = new Modal(this, _config);
	            $(this).data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config](relatedTarget);
	          } else if (_config.show) {
	            data.show(relatedTarget);
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }]);

	    return Modal;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	    var _this13 = this;

	    var target = undefined;
	    var selector = Util.getSelectorFromElement(this);

	    if (selector) {
	      target = $(selector)[0];
	    }

	    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

	    if (this.tagName === 'A') {
	      event.preventDefault();
	    }

	    var $target = $(target).one(Event.SHOW, function (showEvent) {
	      if (showEvent.isDefaultPrevented()) {
	        // only register focus restorer if modal will actually get shown
	        return;
	      }

	      $target.one(Event.HIDDEN, function () {
	        if ($(_this13).is(':visible')) {
	          _this13.focus();
	        }
	      });
	    });

	    Modal._jQueryInterface.call($(target), config, this);
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Modal._jQueryInterface;
	  $.fn[NAME].Constructor = Modal;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Modal._jQueryInterface;
	  };

	  return Modal;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): scrollspy.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var ScrollSpy = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'scrollspy';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.scrollspy';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];

	  var Default = {
	    offset: 10,
	    method: 'auto',
	    target: ''
	  };

	  var DefaultType = {
	    offset: 'number',
	    method: 'string',
	    target: '(string|element)'
	  };

	  var Event = {
	    ACTIVATE: 'activate' + EVENT_KEY,
	    SCROLL: 'scroll' + EVENT_KEY,
	    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    DROPDOWN_ITEM: 'dropdown-item',
	    DROPDOWN_MENU: 'dropdown-menu',
	    NAV_LINK: 'nav-link',
	    NAV: 'nav',
	    ACTIVE: 'active'
	  };

	  var Selector = {
	    DATA_SPY: '[data-spy="scroll"]',
	    ACTIVE: '.active',
	    LIST_ITEM: '.list-item',
	    LI: 'li',
	    LI_DROPDOWN: 'li.dropdown',
	    NAV_LINKS: '.nav-link',
	    DROPDOWN: '.dropdown',
	    DROPDOWN_ITEMS: '.dropdown-item',
	    DROPDOWN_TOGGLE: '.dropdown-toggle'
	  };

	  var OffsetMethod = {
	    OFFSET: 'offset',
	    POSITION: 'position'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var ScrollSpy = (function () {
	    function ScrollSpy(element, config) {
	      _classCallCheck(this, ScrollSpy);

	      this._element = element;
	      this._scrollElement = element.tagName === 'BODY' ? window : element;
	      this._config = this._getConfig(config);
	      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
	      this._offsets = [];
	      this._targets = [];
	      this._activeTarget = null;
	      this._scrollHeight = 0;

	      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

	      this.refresh();
	      this._process();
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(ScrollSpy, [{
	      key: 'refresh',

	      // public

	      value: function refresh() {
	        var _this14 = this;

	        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

	        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

	        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

	        this._offsets = [];
	        this._targets = [];

	        this._scrollHeight = this._getScrollHeight();

	        var targets = $.makeArray($(this._selector));

	        targets.map(function (element) {
	          var target = undefined;
	          var targetSelector = Util.getSelectorFromElement(element);

	          if (targetSelector) {
	            target = $(targetSelector)[0];
	          }

	          if (target && (target.offsetWidth || target.offsetHeight)) {
	            // todo (fat): remove sketch reliance on jQuery position/offset
	            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
	          }
	        }).filter(function (item) {
	          return item;
	        }).sort(function (a, b) {
	          return a[0] - b[0];
	        }).forEach(function (item) {
	          _this14._offsets.push(item[0]);
	          _this14._targets.push(item[1]);
	        });
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeData(this._element, DATA_KEY);
	        $(this._scrollElement).off(EVENT_KEY);

	        this._element = null;
	        this._scrollElement = null;
	        this._config = null;
	        this._selector = null;
	        this._offsets = null;
	        this._targets = null;
	        this._activeTarget = null;
	        this._scrollHeight = null;
	      }

	      // private

	    }, {
	      key: '_getConfig',
	      value: function _getConfig(config) {
	        config = $.extend({}, Default, config);

	        if (typeof config.target !== 'string') {
	          var id = $(config.target).attr('id');
	          if (!id) {
	            id = Util.getUID(NAME);
	            $(config.target).attr('id', id);
	          }
	          config.target = '#' + id;
	        }

	        Util.typeCheckConfig(NAME, config, DefaultType);

	        return config;
	      }
	    }, {
	      key: '_getScrollTop',
	      value: function _getScrollTop() {
	        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
	      }
	    }, {
	      key: '_getScrollHeight',
	      value: function _getScrollHeight() {
	        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
	      }
	    }, {
	      key: '_process',
	      value: function _process() {
	        var scrollTop = this._getScrollTop() + this._config.offset;
	        var scrollHeight = this._getScrollHeight();
	        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

	        if (this._scrollHeight !== scrollHeight) {
	          this.refresh();
	        }

	        if (scrollTop >= maxScroll) {
	          var target = this._targets[this._targets.length - 1];

	          if (this._activeTarget !== target) {
	            this._activate(target);
	          }
	        }

	        if (this._activeTarget && scrollTop < this._offsets[0]) {
	          this._activeTarget = null;
	          this._clear();
	          return;
	        }

	        for (var i = this._offsets.length; i--;) {
	          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

	          if (isActiveTarget) {
	            this._activate(this._targets[i]);
	          }
	        }
	      }
	    }, {
	      key: '_activate',
	      value: function _activate(target) {
	        this._activeTarget = target;

	        this._clear();

	        var queries = this._selector.split(',');
	        queries = queries.map(function (selector) {
	          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
	        });

	        var $link = $(queries.join(','));

	        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
	          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
	          $link.addClass(ClassName.ACTIVE);
	        } else {
	          // todo (fat) this is kinda sus…
	          // recursively add actives to tested nav-links
	          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
	        }

	        $(this._scrollElement).trigger(Event.ACTIVATE, {
	          relatedTarget: target
	        });
	      }
	    }, {
	      key: '_clear',
	      value: function _clear() {
	        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);
	          var _config = typeof config === 'object' && config || null;

	          if (!data) {
	            data = new ScrollSpy(this, _config);
	            $(this).data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }]);

	    return ScrollSpy;
	  })();

	  $(window).on(Event.LOAD_DATA_API, function () {
	    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

	    for (var i = scrollSpys.length; i--;) {
	      var $spy = $(scrollSpys[i]);
	      ScrollSpy._jQueryInterface.call($spy, $spy.data());
	    }
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = ScrollSpy._jQueryInterface;
	  $.fn[NAME].Constructor = ScrollSpy;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return ScrollSpy._jQueryInterface;
	  };

	  return ScrollSpy;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): tab.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Tab = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'tab';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.tab';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var DATA_API_KEY = '.data-api';
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 150;

	  var Event = {
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
	  };

	  var ClassName = {
	    DROPDOWN_MENU: 'dropdown-menu',
	    ACTIVE: 'active',
	    FADE: 'fade',
	    IN: 'in'
	  };

	  var Selector = {
	    A: 'a',
	    LI: 'li',
	    DROPDOWN: '.dropdown',
	    UL: 'ul:not(.dropdown-menu)',
	    FADE_CHILD: '> .nav-item .fade, > .fade',
	    ACTIVE: '.active',
	    ACTIVE_CHILD: '> .nav-item > .active, > .active',
	    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
	    DROPDOWN_TOGGLE: '.dropdown-toggle',
	    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Tab = (function () {
	    function Tab(element) {
	      _classCallCheck(this, Tab);

	      this._element = element;
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * Data Api implementation
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Tab, [{
	      key: 'show',

	      // public

	      value: function show() {
	        var _this15 = this;

	        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
	          return;
	        }

	        var target = undefined;
	        var previous = undefined;
	        var ulElement = $(this._element).closest(Selector.UL)[0];
	        var selector = Util.getSelectorFromElement(this._element);

	        if (ulElement) {
	          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
	          previous = previous[previous.length - 1];
	        }

	        var hideEvent = $.Event(Event.HIDE, {
	          relatedTarget: this._element
	        });

	        var showEvent = $.Event(Event.SHOW, {
	          relatedTarget: previous
	        });

	        if (previous) {
	          $(previous).trigger(hideEvent);
	        }

	        $(this._element).trigger(showEvent);

	        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
	          return;
	        }

	        if (selector) {
	          target = $(selector)[0];
	        }

	        this._activate(this._element, ulElement);

	        var complete = function complete() {
	          var hiddenEvent = $.Event(Event.HIDDEN, {
	            relatedTarget: _this15._element
	          });

	          var shownEvent = $.Event(Event.SHOWN, {
	            relatedTarget: previous
	          });

	          $(previous).trigger(hiddenEvent);
	          $(_this15._element).trigger(shownEvent);
	        };

	        if (target) {
	          this._activate(target, target.parentNode, complete);
	        } else {
	          complete();
	        }
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        $.removeClass(this._element, DATA_KEY);
	        this._element = null;
	      }

	      // private

	    }, {
	      key: '_activate',
	      value: function _activate(element, container, callback) {
	        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
	        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

	        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

	        if (active && isTransitioning) {
	          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	        } else {
	          complete();
	        }

	        if (active) {
	          $(active).removeClass(ClassName.IN);
	        }
	      }
	    }, {
	      key: '_transitionComplete',
	      value: function _transitionComplete(element, active, isTransitioning, callback) {
	        if (active) {
	          $(active).removeClass(ClassName.ACTIVE);

	          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

	          if (dropdownChild) {
	            $(dropdownChild).removeClass(ClassName.ACTIVE);
	          }

	          active.setAttribute('aria-expanded', false);
	        }

	        $(element).addClass(ClassName.ACTIVE);
	        element.setAttribute('aria-expanded', true);

	        if (isTransitioning) {
	          Util.reflow(element);
	          $(element).addClass(ClassName.IN);
	        } else {
	          $(element).removeClass(ClassName.FADE);
	        }

	        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

	          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
	          if (dropdownElement) {
	            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
	          }

	          element.setAttribute('aria-expanded', true);
	        }

	        if (callback) {
	          callback();
	        }
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var $this = $(this);
	          var data = $this.data(DATA_KEY);

	          if (!data) {
	            data = data = new Tab(this);
	            $this.data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }]);

	    return Tab;
	  })();

	  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
	    event.preventDefault();
	    Tab._jQueryInterface.call($(this), 'show');
	  });

	  /**
	   * ------------------------------------------------------------------------
	   * jQuery
	   * ------------------------------------------------------------------------
	   */

	  $.fn[NAME] = Tab._jQueryInterface;
	  $.fn[NAME].Constructor = Tab;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Tab._jQueryInterface;
	  };

	  return Tab;
	})(jQuery);

	/* global Tether */

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): tooltip.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Tooltip = (function ($) {

	  /**
	   * Check for Tether dependency
	   * Tether - http://github.hubspot.com/tether/
	   */
	  if (__webpack_provided_window_dot_Tether === undefined) {
	    throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
	  }

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'tooltip';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.tooltip';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var JQUERY_NO_CONFLICT = $.fn[NAME];
	  var TRANSITION_DURATION = 150;
	  var CLASS_PREFIX = 'bs-tether';

	  var Default = {
	    animation: true,
	    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
	    trigger: 'hover focus',
	    title: '',
	    delay: 0,
	    html: false,
	    selector: false,
	    placement: 'top',
	    offset: '0 0',
	    constraints: []
	  };

	  var DefaultType = {
	    animation: 'boolean',
	    template: 'string',
	    title: '(string|element|function)',
	    trigger: 'string',
	    delay: '(number|object)',
	    html: 'boolean',
	    selector: '(string|boolean)',
	    placement: '(string|function)',
	    offset: 'string',
	    constraints: 'array'
	  };

	  var AttachmentMap = {
	    TOP: 'bottom center',
	    RIGHT: 'middle left',
	    BOTTOM: 'top center',
	    LEFT: 'middle right'
	  };

	  var HoverState = {
	    IN: 'in',
	    OUT: 'out'
	  };

	  var Event = {
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    INSERTED: 'inserted' + EVENT_KEY,
	    CLICK: 'click' + EVENT_KEY,
	    FOCUSIN: 'focusin' + EVENT_KEY,
	    FOCUSOUT: 'focusout' + EVENT_KEY,
	    MOUSEENTER: 'mouseenter' + EVENT_KEY,
	    MOUSELEAVE: 'mouseleave' + EVENT_KEY
	  };

	  var ClassName = {
	    FADE: 'fade',
	    IN: 'in'
	  };

	  var Selector = {
	    TOOLTIP: '.tooltip',
	    TOOLTIP_INNER: '.tooltip-inner'
	  };

	  var TetherClass = {
	    element: false,
	    enabled: false
	  };

	  var Trigger = {
	    HOVER: 'hover',
	    FOCUS: 'focus',
	    CLICK: 'click',
	    MANUAL: 'manual'
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Tooltip = (function () {
	    function Tooltip(element, config) {
	      _classCallCheck(this, Tooltip);

	      // private
	      this._isEnabled = true;
	      this._timeout = 0;
	      this._hoverState = '';
	      this._activeTrigger = {};
	      this._tether = null;

	      // protected
	      this.element = element;
	      this.config = this._getConfig(config);
	      this.tip = null;

	      this._setListeners();
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    // getters

	    _createClass(Tooltip, [{
	      key: 'enable',

	      // public

	      value: function enable() {
	        this._isEnabled = true;
	      }
	    }, {
	      key: 'disable',
	      value: function disable() {
	        this._isEnabled = false;
	      }
	    }, {
	      key: 'toggleEnabled',
	      value: function toggleEnabled() {
	        this._isEnabled = !this._isEnabled;
	      }
	    }, {
	      key: 'toggle',
	      value: function toggle(event) {
	        if (event) {
	          var dataKey = this.constructor.DATA_KEY;
	          var context = $(event.currentTarget).data(dataKey);

	          if (!context) {
	            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
	            $(event.currentTarget).data(dataKey, context);
	          }

	          context._activeTrigger.click = !context._activeTrigger.click;

	          if (context._isWithActiveTrigger()) {
	            context._enter(null, context);
	          } else {
	            context._leave(null, context);
	          }
	        } else {

	          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
	            this._leave(null, this);
	            return;
	          }

	          this._enter(null, this);
	        }
	      }
	    }, {
	      key: 'dispose',
	      value: function dispose() {
	        clearTimeout(this._timeout);

	        this.cleanupTether();

	        $.removeData(this.element, this.constructor.DATA_KEY);

	        $(this.element).off(this.constructor.EVENT_KEY);

	        if (this.tip) {
	          $(this.tip).remove();
	        }

	        this._isEnabled = null;
	        this._timeout = null;
	        this._hoverState = null;
	        this._activeTrigger = null;
	        this._tether = null;

	        this.element = null;
	        this.config = null;
	        this.tip = null;
	      }
	    }, {
	      key: 'show',
	      value: function show() {
	        var _this16 = this;

	        var showEvent = $.Event(this.constructor.Event.SHOW);

	        if (this.isWithContent() && this._isEnabled) {
	          $(this.element).trigger(showEvent);

	          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

	          if (showEvent.isDefaultPrevented() || !isInTheDom) {
	            return;
	          }

	          var tip = this.getTipElement();
	          var tipId = Util.getUID(this.constructor.NAME);

	          tip.setAttribute('id', tipId);
	          this.element.setAttribute('aria-describedby', tipId);

	          this.setContent();

	          if (this.config.animation) {
	            $(tip).addClass(ClassName.FADE);
	          }

	          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

	          var attachment = this._getAttachment(placement);

	          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

	          $(this.element).trigger(this.constructor.Event.INSERTED);

	          this._tether = new Tether({
	            attachment: attachment,
	            element: tip,
	            target: this.element,
	            classes: TetherClass,
	            classPrefix: CLASS_PREFIX,
	            offset: this.config.offset,
	            constraints: this.config.constraints,
	            addTargetClasses: false
	          });

	          Util.reflow(tip);
	          this._tether.position();

	          $(tip).addClass(ClassName.IN);

	          var complete = function complete() {
	            var prevHoverState = _this16._hoverState;
	            _this16._hoverState = null;

	            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

	            if (prevHoverState === HoverState.OUT) {
	              _this16._leave(null, _this16);
	            }
	          };

	          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
	            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
	            return;
	          }

	          complete();
	        }
	      }
	    }, {
	      key: 'hide',
	      value: function hide(callback) {
	        var _this17 = this;

	        var tip = this.getTipElement();
	        var hideEvent = $.Event(this.constructor.Event.HIDE);
	        var complete = function complete() {
	          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
	            tip.parentNode.removeChild(tip);
	          }

	          _this17.element.removeAttribute('aria-describedby');
	          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
	          _this17.cleanupTether();

	          if (callback) {
	            callback();
	          }
	        };

	        $(this.element).trigger(hideEvent);

	        if (hideEvent.isDefaultPrevented()) {
	          return;
	        }

	        $(tip).removeClass(ClassName.IN);

	        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

	          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
	        } else {
	          complete();
	        }

	        this._hoverState = '';
	      }

	      // protected

	    }, {
	      key: 'isWithContent',
	      value: function isWithContent() {
	        return Boolean(this.getTitle());
	      }
	    }, {
	      key: 'getTipElement',
	      value: function getTipElement() {
	        return this.tip = this.tip || $(this.config.template)[0];
	      }
	    }, {
	      key: 'setContent',
	      value: function setContent() {
	        var $tip = $(this.getTipElement());

	        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

	        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

	        this.cleanupTether();
	      }
	    }, {
	      key: 'setElementContent',
	      value: function setElementContent($element, content) {
	        var html = this.config.html;
	        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
	          // content is a DOM node or a jQuery
	          if (html) {
	            if (!$(content).parent().is($element)) {
	              $element.empty().append(content);
	            }
	          } else {
	            $element.text($(content).text());
	          }
	        } else {
	          $element[html ? 'html' : 'text'](content);
	        }
	      }
	    }, {
	      key: 'getTitle',
	      value: function getTitle() {
	        var title = this.element.getAttribute('data-original-title');

	        if (!title) {
	          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
	        }

	        return title;
	      }
	    }, {
	      key: 'cleanupTether',
	      value: function cleanupTether() {
	        if (this._tether) {
	          this._tether.destroy();
	        }
	      }

	      // private

	    }, {
	      key: '_getAttachment',
	      value: function _getAttachment(placement) {
	        return AttachmentMap[placement.toUpperCase()];
	      }
	    }, {
	      key: '_setListeners',
	      value: function _setListeners() {
	        var _this18 = this;

	        var triggers = this.config.trigger.split(' ');

	        triggers.forEach(function (trigger) {
	          if (trigger === 'click') {
	            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
	          } else if (trigger !== Trigger.MANUAL) {
	            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
	            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

	            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
	          }
	        });

	        if (this.config.selector) {
	          this.config = $.extend({}, this.config, {
	            trigger: 'manual',
	            selector: ''
	          });
	        } else {
	          this._fixTitle();
	        }
	      }
	    }, {
	      key: '_fixTitle',
	      value: function _fixTitle() {
	        var titleType = typeof this.element.getAttribute('data-original-title');
	        if (this.element.getAttribute('title') || titleType !== 'string') {
	          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
	          this.element.setAttribute('title', '');
	        }
	      }
	    }, {
	      key: '_enter',
	      value: function _enter(event, context) {
	        var dataKey = this.constructor.DATA_KEY;

	        context = context || $(event.currentTarget).data(dataKey);

	        if (!context) {
	          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
	          $(event.currentTarget).data(dataKey, context);
	        }

	        if (event) {
	          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
	        }

	        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
	          context._hoverState = HoverState.IN;
	          return;
	        }

	        clearTimeout(context._timeout);

	        context._hoverState = HoverState.IN;

	        if (!context.config.delay || !context.config.delay.show) {
	          context.show();
	          return;
	        }

	        context._timeout = setTimeout(function () {
	          if (context._hoverState === HoverState.IN) {
	            context.show();
	          }
	        }, context.config.delay.show);
	      }
	    }, {
	      key: '_leave',
	      value: function _leave(event, context) {
	        var dataKey = this.constructor.DATA_KEY;

	        context = context || $(event.currentTarget).data(dataKey);

	        if (!context) {
	          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
	          $(event.currentTarget).data(dataKey, context);
	        }

	        if (event) {
	          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
	        }

	        if (context._isWithActiveTrigger()) {
	          return;
	        }

	        clearTimeout(context._timeout);

	        context._hoverState = HoverState.OUT;

	        if (!context.config.delay || !context.config.delay.hide) {
	          context.hide();
	          return;
	        }

	        context._timeout = setTimeout(function () {
	          if (context._hoverState === HoverState.OUT) {
	            context.hide();
	          }
	        }, context.config.delay.hide);
	      }
	    }, {
	      key: '_isWithActiveTrigger',
	      value: function _isWithActiveTrigger() {
	        for (var trigger in this._activeTrigger) {
	          if (this._activeTrigger[trigger]) {
	            return true;
	          }
	        }

	        return false;
	      }
	    }, {
	      key: '_getConfig',
	      value: function _getConfig(config) {
	        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

	        if (config.delay && typeof config.delay === 'number') {
	          config.delay = {
	            show: config.delay,
	            hide: config.delay
	          };
	        }

	        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

	        return config;
	      }
	    }, {
	      key: '_getDelegateConfig',
	      value: function _getDelegateConfig() {
	        var config = {};

	        if (this.config) {
	          for (var key in this.config) {
	            if (this.constructor.Default[key] !== this.config[key]) {
	              config[key] = this.config[key];
	            }
	          }
	        }

	        return config;
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);
	          var _config = typeof config === 'object' ? config : null;

	          if (!data && /destroy|hide/.test(config)) {
	            return;
	          }

	          if (!data) {
	            data = new Tooltip(this, _config);
	            $(this).data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',
	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }, {
	      key: 'NAME',
	      get: function get() {
	        return NAME;
	      }
	    }, {
	      key: 'DATA_KEY',
	      get: function get() {
	        return DATA_KEY;
	      }
	    }, {
	      key: 'Event',
	      get: function get() {
	        return Event;
	      }
	    }, {
	      key: 'EVENT_KEY',
	      get: function get() {
	        return EVENT_KEY;
	      }
	    }, {
	      key: 'DefaultType',
	      get: function get() {
	        return DefaultType;
	      }
	    }]);

	    return Tooltip;
	  })();

	  $.fn[NAME] = Tooltip._jQueryInterface;
	  $.fn[NAME].Constructor = Tooltip;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Tooltip._jQueryInterface;
	  };

	  return Tooltip;
	})(jQuery);

	/**
	 * --------------------------------------------------------------------------
	 * Bootstrap (v4.0.0-alpha.2): popover.js
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 * --------------------------------------------------------------------------
	 */

	var Popover = (function ($) {

	  /**
	   * ------------------------------------------------------------------------
	   * Constants
	   * ------------------------------------------------------------------------
	   */

	  var NAME = 'popover';
	  var VERSION = '4.0.0-alpha';
	  var DATA_KEY = 'bs.popover';
	  var EVENT_KEY = '.' + DATA_KEY;
	  var JQUERY_NO_CONFLICT = $.fn[NAME];

	  var Default = $.extend({}, Tooltip.Default, {
	    placement: 'right',
	    trigger: 'click',
	    content: '',
	    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
	  });

	  var DefaultType = $.extend({}, Tooltip.DefaultType, {
	    content: '(string|element|function)'
	  });

	  var ClassName = {
	    FADE: 'fade',
	    IN: 'in'
	  };

	  var Selector = {
	    TITLE: '.popover-title',
	    CONTENT: '.popover-content',
	    ARROW: '.popover-arrow'
	  };

	  var Event = {
	    HIDE: 'hide' + EVENT_KEY,
	    HIDDEN: 'hidden' + EVENT_KEY,
	    SHOW: 'show' + EVENT_KEY,
	    SHOWN: 'shown' + EVENT_KEY,
	    INSERTED: 'inserted' + EVENT_KEY,
	    CLICK: 'click' + EVENT_KEY,
	    FOCUSIN: 'focusin' + EVENT_KEY,
	    FOCUSOUT: 'focusout' + EVENT_KEY,
	    MOUSEENTER: 'mouseenter' + EVENT_KEY,
	    MOUSELEAVE: 'mouseleave' + EVENT_KEY
	  };

	  /**
	   * ------------------------------------------------------------------------
	   * Class Definition
	   * ------------------------------------------------------------------------
	   */

	  var Popover = (function (_Tooltip) {
	    _inherits(Popover, _Tooltip);

	    function Popover() {
	      _classCallCheck(this, Popover);

	      _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
	    }

	    /**
	     * ------------------------------------------------------------------------
	     * jQuery
	     * ------------------------------------------------------------------------
	     */

	    _createClass(Popover, [{
	      key: 'isWithContent',

	      // overrides

	      value: function isWithContent() {
	        return this.getTitle() || this._getContent();
	      }
	    }, {
	      key: 'getTipElement',
	      value: function getTipElement() {
	        return this.tip = this.tip || $(this.config.template)[0];
	      }
	    }, {
	      key: 'setContent',
	      value: function setContent() {
	        var $tip = $(this.getTipElement());

	        // we use append for html objects to maintain js events
	        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
	        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

	        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

	        this.cleanupTether();
	      }

	      // private

	    }, {
	      key: '_getContent',
	      value: function _getContent() {
	        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
	      }

	      // static

	    }], [{
	      key: '_jQueryInterface',
	      value: function _jQueryInterface(config) {
	        return this.each(function () {
	          var data = $(this).data(DATA_KEY);
	          var _config = typeof config === 'object' ? config : null;

	          if (!data && /destroy|hide/.test(config)) {
	            return;
	          }

	          if (!data) {
	            data = new Popover(this, _config);
	            $(this).data(DATA_KEY, data);
	          }

	          if (typeof config === 'string') {
	            if (data[config] === undefined) {
	              throw new Error('No method named "' + config + '"');
	            }
	            data[config]();
	          }
	        });
	      }
	    }, {
	      key: 'VERSION',

	      // getters

	      get: function get() {
	        return VERSION;
	      }
	    }, {
	      key: 'Default',
	      get: function get() {
	        return Default;
	      }
	    }, {
	      key: 'NAME',
	      get: function get() {
	        return NAME;
	      }
	    }, {
	      key: 'DATA_KEY',
	      get: function get() {
	        return DATA_KEY;
	      }
	    }, {
	      key: 'Event',
	      get: function get() {
	        return Event;
	      }
	    }, {
	      key: 'EVENT_KEY',
	      get: function get() {
	        return EVENT_KEY;
	      }
	    }, {
	      key: 'DefaultType',
	      get: function get() {
	        return DefaultType;
	      }
	    }]);

	    return Popover;
	  })(Tooltip);

	  $.fn[NAME] = Popover._jQueryInterface;
	  $.fn[NAME].Constructor = Popover;
	  $.fn[NAME].noConflict = function () {
	    $.fn[NAME] = JQUERY_NO_CONFLICT;
	    return Popover._jQueryInterface;
	  };

	  return Popover;
	})(jQuery);

	}(jQuery);

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(11), __webpack_require__(11)))

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(13);
	module.exports = __webpack_require__(15);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./selectize.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./selectize.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "/**\n * selectize.css (v0.12.1)\n * Copyright (c) 2013–2015 Brian Reavis & contributors\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\"); you may not use this\n * file except in compliance with the License. You may obtain a copy of the License at:\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software distributed under\n * the License is distributed on an \"AS IS\" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF\n * ANY KIND, either express or implied. See the License for the specific language\n * governing permissions and limitations under the License.\n *\n * @author Brian Reavis <brian@thirdroute.com>\n */\n\n.selectize-control.plugin-drag_drop.multi > .selectize-input > div.ui-sortable-placeholder {\n  visibility: visible !important;\n  background: #f2f2f2 !important;\n  background: rgba(0, 0, 0, 0.06) !important;\n  border: 0 none !important;\n  -webkit-box-shadow: inset 0 0 12px 4px #ffffff;\n  box-shadow: inset 0 0 12px 4px #ffffff;\n}\n.selectize-control.plugin-drag_drop .ui-sortable-placeholder::after {\n  content: '!';\n  visibility: hidden;\n}\n.selectize-control.plugin-drag_drop .ui-sortable-helper {\n  -webkit-box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);\n}\n.selectize-dropdown-header {\n  position: relative;\n  padding: 5px 8px;\n  border-bottom: 1px solid #d0d0d0;\n  background: #f8f8f8;\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n.selectize-dropdown-header-close {\n  position: absolute;\n  right: 8px;\n  top: 50%;\n  color: #303030;\n  opacity: 0.4;\n  margin-top: -12px;\n  line-height: 20px;\n  font-size: 20px !important;\n}\n.selectize-dropdown-header-close:hover {\n  color: #000000;\n}\n.selectize-dropdown.plugin-optgroup_columns .optgroup {\n  border-right: 1px solid #f2f2f2;\n  border-top: 0 none;\n  float: left;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.selectize-dropdown.plugin-optgroup_columns .optgroup:last-child {\n  border-right: 0 none;\n}\n.selectize-dropdown.plugin-optgroup_columns .optgroup:before {\n  display: none;\n}\n.selectize-dropdown.plugin-optgroup_columns .optgroup-header {\n  border-top: 0 none;\n}\n.selectize-control.plugin-remove_button [data-value] {\n  position: relative;\n  padding-right: 24px !important;\n}\n.selectize-control.plugin-remove_button [data-value] .remove {\n  z-index: 1;\n  /* fixes ie bug (see #392) */\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  width: 17px;\n  text-align: center;\n  font-weight: bold;\n  font-size: 12px;\n  color: inherit;\n  text-decoration: none;\n  vertical-align: middle;\n  display: inline-block;\n  padding: 2px 0 0 0;\n  border-left: 1px solid #d0d0d0;\n  -webkit-border-radius: 0 2px 2px 0;\n  -moz-border-radius: 0 2px 2px 0;\n  border-radius: 0 2px 2px 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.selectize-control.plugin-remove_button [data-value] .remove:hover {\n  background: rgba(0, 0, 0, 0.05);\n}\n.selectize-control.plugin-remove_button [data-value].active .remove {\n  border-left-color: #cacaca;\n}\n.selectize-control.plugin-remove_button .disabled [data-value] .remove:hover {\n  background: none;\n}\n.selectize-control.plugin-remove_button .disabled [data-value] .remove {\n  border-left-color: #ffffff;\n}\n.selectize-control {\n  position: relative;\n}\n.selectize-dropdown,\n.selectize-input,\n.selectize-input input {\n  color: #303030;\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 18px;\n  -webkit-font-smoothing: inherit;\n}\n.selectize-input,\n.selectize-control.single .selectize-input.input-active {\n  background: #ffffff;\n  cursor: text;\n  display: inline-block;\n}\n.selectize-input {\n  border: 1px solid #d0d0d0;\n  padding: 8px 8px;\n  display: inline-block;\n  width: 100%;\n  overflow: hidden;\n  position: relative;\n  z-index: 1;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  border-radius: 3px;\n}\n.selectize-control.multi .selectize-input.has-items {\n  padding: 6px 8px 3px;\n}\n.selectize-input.full {\n  background-color: #ffffff;\n}\n.selectize-input.disabled,\n.selectize-input.disabled * {\n  cursor: default !important;\n}\n.selectize-input.focus {\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.15);\n}\n.selectize-input.dropdown-active {\n  -webkit-border-radius: 3px 3px 0 0;\n  -moz-border-radius: 3px 3px 0 0;\n  border-radius: 3px 3px 0 0;\n}\n.selectize-input > * {\n  vertical-align: baseline;\n  display: -moz-inline-stack;\n  display: inline-block;\n  zoom: 1;\n  *display: inline;\n}\n.selectize-control.multi .selectize-input > div {\n  cursor: pointer;\n  margin: 0 3px 3px 0;\n  padding: 2px 6px;\n  background: #f2f2f2;\n  color: #303030;\n  border: 0 solid #d0d0d0;\n}\n.selectize-control.multi .selectize-input > div.active {\n  background: #e8e8e8;\n  color: #303030;\n  border: 0 solid #cacaca;\n}\n.selectize-control.multi .selectize-input.disabled > div,\n.selectize-control.multi .selectize-input.disabled > div.active {\n  color: #7d7d7d;\n  background: #ffffff;\n  border: 0 solid #ffffff;\n}\n.selectize-input > input {\n  display: inline-block !important;\n  padding: 0 !important;\n  min-height: 0 !important;\n  max-height: none !important;\n  max-width: 100% !important;\n  margin: 0 2px 0 0 !important;\n  text-indent: 0 !important;\n  border: 0 none !important;\n  background: none !important;\n  line-height: inherit !important;\n  -webkit-user-select: auto !important;\n  -webkit-box-shadow: none !important;\n  box-shadow: none !important;\n}\n.selectize-input > input::-ms-clear {\n  display: none;\n}\n.selectize-input > input:focus {\n  outline: none !important;\n}\n.selectize-input::after {\n  content: ' ';\n  display: block;\n  clear: left;\n}\n.selectize-input.dropdown-active::before {\n  content: ' ';\n  display: block;\n  position: absolute;\n  background: #f0f0f0;\n  height: 1px;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n.selectize-dropdown {\n  position: absolute;\n  z-index: 10;\n  border: 1px solid #d0d0d0;\n  background: #ffffff;\n  margin: -1px 0 0 0;\n  border-top: 0 none;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);\n  -webkit-border-radius: 0 0 3px 3px;\n  -moz-border-radius: 0 0 3px 3px;\n  border-radius: 0 0 3px 3px;\n}\n.selectize-dropdown [data-selectable] {\n  cursor: pointer;\n  overflow: hidden;\n}\n.selectize-dropdown [data-selectable] .highlight {\n  background: rgba(125, 168, 208, 0.2);\n  -webkit-border-radius: 1px;\n  -moz-border-radius: 1px;\n  border-radius: 1px;\n}\n.selectize-dropdown [data-selectable],\n.selectize-dropdown .optgroup-header {\n  padding: 5px 8px;\n}\n.selectize-dropdown .optgroup:first-child .optgroup-header {\n  border-top: 0 none;\n}\n.selectize-dropdown .optgroup-header {\n  color: #303030;\n  background: #ffffff;\n  cursor: default;\n}\n.selectize-dropdown .active {\n  background-color: #f5fafd;\n  color: #495c68;\n}\n.selectize-dropdown .active.create {\n  color: #495c68;\n}\n.selectize-dropdown .create {\n  color: rgba(48, 48, 48, 0.5);\n}\n.selectize-dropdown-content {\n  overflow-y: auto;\n  overflow-x: hidden;\n  max-height: 200px;\n}\n.selectize-control.single .selectize-input,\n.selectize-control.single .selectize-input input {\n  cursor: pointer;\n}\n.selectize-control.single .selectize-input.input-active,\n.selectize-control.single .selectize-input.input-active input {\n  cursor: text;\n}\n.selectize-control.single .selectize-input:after {\n  content: ' ';\n  display: block;\n  position: absolute;\n  top: 50%;\n  right: 15px;\n  margin-top: -3px;\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-width: 5px 5px 0 5px;\n  border-color: #808080 transparent transparent transparent;\n}\n.selectize-control.single .selectize-input.dropdown-active:after {\n  margin-top: -4px;\n  border-width: 0 5px 5px 5px;\n  border-color: transparent transparent #808080 transparent;\n}\n.selectize-control.rtl.single .selectize-input:after {\n  left: 15px;\n  right: auto;\n}\n.selectize-control.rtl .selectize-input > input {\n  margin: 0 4px 0 -2px !important;\n}\n.selectize-control .selectize-input.disabled {\n  opacity: 0.5;\n  background-color: #fafafa;\n}\n", ""]);

	// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * selectize.js (v0.12.1)
	 * Copyright (c) 2013–2015 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	/*jshint curly:false */
	/*jshint browser:true */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3),__webpack_require__(16),__webpack_require__(18)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory(require('jquery'), require('sifter'), require('microplugin'));
		} else {
			root.Selectize = factory(root.jQuery, root.Sifter, root.MicroPlugin);
		}
	}(this, function($, Sifter, MicroPlugin) {
		'use strict';

		var highlight = function($element, pattern) {
			if (typeof pattern === 'string' && !pattern.length) return;
			var regex = (typeof pattern === 'string') ? new RegExp(pattern, 'i') : pattern;
		
			var highlight = function(node) {
				var skip = 0;
				if (node.nodeType === 3) {
					var pos = node.data.search(regex);
					if (pos >= 0 && node.data.length > 0) {
						var match = node.data.match(regex);
						var spannode = document.createElement('span');
						spannode.className = 'highlight';
						var middlebit = node.splitText(pos);
						var endbit = middlebit.splitText(match[0].length);
						var middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
						skip = 1;
					}
				} else if (node.nodeType === 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
					for (var i = 0; i < node.childNodes.length; ++i) {
						i += highlight(node.childNodes[i]);
					}
				}
				return skip;
			};
		
			return $element.each(function() {
				highlight(this);
			});
		};
		
		var MicroEvent = function() {};
		MicroEvent.prototype = {
			on: function(event, fct){
				this._events = this._events || {};
				this._events[event] = this._events[event] || [];
				this._events[event].push(fct);
			},
			off: function(event, fct){
				var n = arguments.length;
				if (n === 0) return delete this._events;
				if (n === 1) return delete this._events[event];
		
				this._events = this._events || {};
				if (event in this._events === false) return;
				this._events[event].splice(this._events[event].indexOf(fct), 1);
			},
			trigger: function(event /* , args... */){
				this._events = this._events || {};
				if (event in this._events === false) return;
				for (var i = 0; i < this._events[event].length; i++){
					this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
				}
			}
		};
		
		/**
		 * Mixin will delegate all MicroEvent.js function in the destination object.
		 *
		 * - MicroEvent.mixin(Foobar) will make Foobar able to use MicroEvent
		 *
		 * @param {object} the object which will support MicroEvent
		 */
		MicroEvent.mixin = function(destObject){
			var props = ['on', 'off', 'trigger'];
			for (var i = 0; i < props.length; i++){
				destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
			}
		};
		
		var IS_MAC        = /Mac/.test(navigator.userAgent);
		
		var KEY_A         = 65;
		var KEY_COMMA     = 188;
		var KEY_RETURN    = 13;
		var KEY_ESC       = 27;
		var KEY_LEFT      = 37;
		var KEY_UP        = 38;
		var KEY_P         = 80;
		var KEY_RIGHT     = 39;
		var KEY_DOWN      = 40;
		var KEY_N         = 78;
		var KEY_BACKSPACE = 8;
		var KEY_DELETE    = 46;
		var KEY_SHIFT     = 16;
		var KEY_CMD       = IS_MAC ? 91 : 17;
		var KEY_CTRL      = IS_MAC ? 18 : 17;
		var KEY_TAB       = 9;
		
		var TAG_SELECT    = 1;
		var TAG_INPUT     = 2;
		
		// for now, android support in general is too spotty to support validity
		var SUPPORTS_VALIDITY_API = !/android/i.test(window.navigator.userAgent) && !!document.createElement('form').validity;
		
		var isset = function(object) {
			return typeof object !== 'undefined';
		};
		
		/**
		 * Converts a scalar to its best string representation
		 * for hash keys and HTML attribute values.
		 *
		 * Transformations:
		 *   'str'     -> 'str'
		 *   null      -> ''
		 *   undefined -> ''
		 *   true      -> '1'
		 *   false     -> '0'
		 *   0         -> '0'
		 *   1         -> '1'
		 *
		 * @param {string} value
		 * @returns {string|null}
		 */
		var hash_key = function(value) {
			if (typeof value === 'undefined' || value === null) return null;
			if (typeof value === 'boolean') return value ? '1' : '0';
			return value + '';
		};
		
		/**
		 * Escapes a string for use within HTML.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_html = function(str) {
			return (str + '')
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;')
				.replace(/"/g, '&quot;');
		};
		
		/**
		 * Escapes "$" characters in replacement strings.
		 *
		 * @param {string} str
		 * @returns {string}
		 */
		var escape_replace = function(str) {
			return (str + '').replace(/\$/g, '$$$$');
		};
		
		var hook = {};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked before the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.before = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				fn.apply(self, arguments);
				return original.apply(self, arguments);
			};
		};
		
		/**
		 * Wraps `method` on `self` so that `fn`
		 * is invoked after the original method.
		 *
		 * @param {object} self
		 * @param {string} method
		 * @param {function} fn
		 */
		hook.after = function(self, method, fn) {
			var original = self[method];
			self[method] = function() {
				var result = original.apply(self, arguments);
				fn.apply(self, arguments);
				return result;
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be invoked once.
		 *
		 * @param {function} fn
		 * @returns {function}
		 */
		var once = function(fn) {
			var called = false;
			return function() {
				if (called) return;
				called = true;
				fn.apply(this, arguments);
			};
		};
		
		/**
		 * Wraps `fn` so that it can only be called once
		 * every `delay` milliseconds (invoked on the falling edge).
		 *
		 * @param {function} fn
		 * @param {int} delay
		 * @returns {function}
		 */
		var debounce = function(fn, delay) {
			var timeout;
			return function() {
				var self = this;
				var args = arguments;
				window.clearTimeout(timeout);
				timeout = window.setTimeout(function() {
					fn.apply(self, args);
				}, delay);
			};
		};
		
		/**
		 * Debounce all fired events types listed in `types`
		 * while executing the provided `fn`.
		 *
		 * @param {object} self
		 * @param {array} types
		 * @param {function} fn
		 */
		var debounce_events = function(self, types, fn) {
			var type;
			var trigger = self.trigger;
			var event_args = {};
		
			// override trigger method
			self.trigger = function() {
				var type = arguments[0];
				if (types.indexOf(type) !== -1) {
					event_args[type] = arguments;
				} else {
					return trigger.apply(self, arguments);
				}
			};
		
			// invoke provided function
			fn.apply(self, []);
			self.trigger = trigger;
		
			// trigger queued events
			for (type in event_args) {
				if (event_args.hasOwnProperty(type)) {
					trigger.apply(self, event_args[type]);
				}
			}
		};
		
		/**
		 * A workaround for http://bugs.jquery.com/ticket/6696
		 *
		 * @param {object} $parent - Parent element to listen on.
		 * @param {string} event - Event name.
		 * @param {string} selector - Descendant selector to filter by.
		 * @param {function} fn - Event handler.
		 */
		var watchChildEvent = function($parent, event, selector, fn) {
			$parent.on(event, selector, function(e) {
				var child = e.target;
				while (child && child.parentNode !== $parent[0]) {
					child = child.parentNode;
				}
				e.currentTarget = child;
				return fn.apply(this, [e]);
			});
		};
		
		/**
		 * Determines the current selection within a text input control.
		 * Returns an object containing:
		 *   - start
		 *   - length
		 *
		 * @param {object} input
		 * @returns {object}
		 */
		var getSelection = function(input) {
			var result = {};
			if ('selectionStart' in input) {
				result.start = input.selectionStart;
				result.length = input.selectionEnd - result.start;
			} else if (document.selection) {
				input.focus();
				var sel = document.selection.createRange();
				var selLen = document.selection.createRange().text.length;
				sel.moveStart('character', -input.value.length);
				result.start = sel.text.length - selLen;
				result.length = selLen;
			}
			return result;
		};
		
		/**
		 * Copies CSS properties from one element to another.
		 *
		 * @param {object} $from
		 * @param {object} $to
		 * @param {array} properties
		 */
		var transferStyles = function($from, $to, properties) {
			var i, n, styles = {};
			if (properties) {
				for (i = 0, n = properties.length; i < n; i++) {
					styles[properties[i]] = $from.css(properties[i]);
				}
			} else {
				styles = $from.css();
			}
			$to.css(styles);
		};
		
		/**
		 * Measures the width of a string within a
		 * parent element (in pixels).
		 *
		 * @param {string} str
		 * @param {object} $parent
		 * @returns {int}
		 */
		var measureString = function(str, $parent) {
			if (!str) {
				return 0;
			}
		
			var $test = $('<test>').css({
				position: 'absolute',
				top: -99999,
				left: -99999,
				width: 'auto',
				padding: 0,
				whiteSpace: 'pre'
			}).text(str).appendTo('body');
		
			transferStyles($parent, $test, [
				'letterSpacing',
				'fontSize',
				'fontFamily',
				'fontWeight',
				'textTransform'
			]);
		
			var width = $test.width();
			$test.remove();
		
			return width;
		};
		
		/**
		 * Sets up an input to grow horizontally as the user
		 * types. If the value is changed manually, you can
		 * trigger the "update" handler to resize:
		 *
		 * $input.trigger('update');
		 *
		 * @param {object} $input
		 */
		var autoGrow = function($input) {
			var currentWidth = null;
		
			var update = function(e, options) {
				var value, keyCode, printable, placeholder, width;
				var shift, character, selection;
				e = e || window.event || {};
				options = options || {};
		
				if (e.metaKey || e.altKey) return;
				if (!options.force && $input.data('grow') === false) return;
		
				value = $input.val();
				if (e.type && e.type.toLowerCase() === 'keydown') {
					keyCode = e.keyCode;
					printable = (
						(keyCode >= 97 && keyCode <= 122) || // a-z
						(keyCode >= 65 && keyCode <= 90)  || // A-Z
						(keyCode >= 48 && keyCode <= 57)  || // 0-9
						keyCode === 32 // space
					);
		
					if (keyCode === KEY_DELETE || keyCode === KEY_BACKSPACE) {
						selection = getSelection($input[0]);
						if (selection.length) {
							value = value.substring(0, selection.start) + value.substring(selection.start + selection.length);
						} else if (keyCode === KEY_BACKSPACE && selection.start) {
							value = value.substring(0, selection.start - 1) + value.substring(selection.start + 1);
						} else if (keyCode === KEY_DELETE && typeof selection.start !== 'undefined') {
							value = value.substring(0, selection.start) + value.substring(selection.start + 1);
						}
					} else if (printable) {
						shift = e.shiftKey;
						character = String.fromCharCode(e.keyCode);
						if (shift) character = character.toUpperCase();
						else character = character.toLowerCase();
						value += character;
					}
				}
		
				placeholder = $input.attr('placeholder');
				if (!value && placeholder) {
					value = placeholder;
				}
		
				width = measureString(value, $input) + 4;
				if (width !== currentWidth) {
					currentWidth = width;
					$input.width(width);
					$input.triggerHandler('resize');
				}
			};
		
			$input.on('keydown keyup update blur', update);
			update();
		};
		
		var Selectize = function($input, settings) {
			var key, i, n, dir, input, self = this;
			input = $input[0];
			input.selectize = self;
		
			// detect rtl environment
			var computedStyle = window.getComputedStyle && window.getComputedStyle(input, null);
			dir = computedStyle ? computedStyle.getPropertyValue('direction') : input.currentStyle && input.currentStyle.direction;
			dir = dir || $input.parents('[dir]:first').attr('dir') || '';
		
			// setup default state
			$.extend(self, {
				order            : 0,
				settings         : settings,
				$input           : $input,
				tabIndex         : $input.attr('tabindex') || '',
				tagType          : input.tagName.toLowerCase() === 'select' ? TAG_SELECT : TAG_INPUT,
				rtl              : /rtl/i.test(dir),
		
				eventNS          : '.selectize' + (++Selectize.count),
				highlightedValue : null,
				isOpen           : false,
				isDisabled       : false,
				isRequired       : $input.is('[required]'),
				isInvalid        : false,
				isLocked         : false,
				isFocused        : false,
				isInputHidden    : false,
				isSetup          : false,
				isShiftDown      : false,
				isCmdDown        : false,
				isCtrlDown       : false,
				ignoreFocus      : false,
				ignoreBlur       : false,
				ignoreHover      : false,
				hasOptions       : false,
				currentResults   : null,
				lastValue        : '',
				caretPos         : 0,
				loading          : 0,
				loadedSearches   : {},
		
				$activeOption    : null,
				$activeItems     : [],
		
				optgroups        : {},
				options          : {},
				userOptions      : {},
				items            : [],
				renderCache      : {},
				onSearchChange   : settings.loadThrottle === null ? self.onSearchChange : debounce(self.onSearchChange, settings.loadThrottle)
			});
		
			// search system
			self.sifter = new Sifter(this.options, {diacritics: settings.diacritics});
		
			// build options table
			if (self.settings.options) {
				for (i = 0, n = self.settings.options.length; i < n; i++) {
					self.registerOption(self.settings.options[i]);
				}
				delete self.settings.options;
			}
		
			// build optgroup table
			if (self.settings.optgroups) {
				for (i = 0, n = self.settings.optgroups.length; i < n; i++) {
					self.registerOptionGroup(self.settings.optgroups[i]);
				}
				delete self.settings.optgroups;
			}
		
			// option-dependent defaults
			self.settings.mode = self.settings.mode || (self.settings.maxItems === 1 ? 'single' : 'multi');
			if (typeof self.settings.hideSelected !== 'boolean') {
				self.settings.hideSelected = self.settings.mode === 'multi';
			}
		
			self.initializePlugins(self.settings.plugins);
			self.setupCallbacks();
			self.setupTemplates();
			self.setup();
		};
		
		// mixins
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		MicroEvent.mixin(Selectize);
		MicroPlugin.mixin(Selectize);
		
		// methods
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		
		$.extend(Selectize.prototype, {
		
			/**
			 * Creates all elements and sets up event bindings.
			 */
			setup: function() {
				var self      = this;
				var settings  = self.settings;
				var eventNS   = self.eventNS;
				var $window   = $(window);
				var $document = $(document);
				var $input    = self.$input;
		
				var $wrapper;
				var $control;
				var $control_input;
				var $dropdown;
				var $dropdown_content;
				var $dropdown_parent;
				var inputMode;
				var timeout_blur;
				var timeout_focus;
				var classes;
				var classes_plugins;
		
				inputMode         = self.settings.mode;
				classes           = $input.attr('class') || '';
		
				$wrapper          = $('<div>').addClass(settings.wrapperClass).addClass(classes).addClass(inputMode);
				$control          = $('<div>').addClass(settings.inputClass).addClass('items').appendTo($wrapper);
				$control_input    = $('<input type="text" autocomplete="off" />').appendTo($control).attr('tabindex', $input.is(':disabled') ? '-1' : self.tabIndex);
				$dropdown_parent  = $(settings.dropdownParent || $wrapper);
				$dropdown         = $('<div>').addClass(settings.dropdownClass).addClass(inputMode).hide().appendTo($dropdown_parent);
				$dropdown_content = $('<div>').addClass(settings.dropdownContentClass).appendTo($dropdown);
		
				if(self.settings.copyClassesToDropdown) {
					$dropdown.addClass(classes);
				}
		
				$wrapper.css({
					width: $input[0].style.width
				});
		
				if (self.plugins.names.length) {
					classes_plugins = 'plugin-' + self.plugins.names.join(' plugin-');
					$wrapper.addClass(classes_plugins);
					$dropdown.addClass(classes_plugins);
				}
		
				if ((settings.maxItems === null || settings.maxItems > 1) && self.tagType === TAG_SELECT) {
					$input.attr('multiple', 'multiple');
				}
		
				if (self.settings.placeholder) {
					$control_input.attr('placeholder', settings.placeholder);
				}
		
				// if splitOn was not passed in, construct it from the delimiter to allow pasting universally
				if (!self.settings.splitOn && self.settings.delimiter) {
					var delimiterEscaped = self.settings.delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
					self.settings.splitOn = new RegExp('\\s*' + delimiterEscaped + '+\\s*');
				}
		
				if ($input.attr('autocorrect')) {
					$control_input.attr('autocorrect', $input.attr('autocorrect'));
				}
		
				if ($input.attr('autocapitalize')) {
					$control_input.attr('autocapitalize', $input.attr('autocapitalize'));
				}
		
				self.$wrapper          = $wrapper;
				self.$control          = $control;
				self.$control_input    = $control_input;
				self.$dropdown         = $dropdown;
				self.$dropdown_content = $dropdown_content;
		
				$dropdown.on('mouseenter', '[data-selectable]', function() { return self.onOptionHover.apply(self, arguments); });
				$dropdown.on('mousedown click', '[data-selectable]', function() { return self.onOptionSelect.apply(self, arguments); });
				watchChildEvent($control, 'mousedown', '*:not(input)', function() { return self.onItemSelect.apply(self, arguments); });
				autoGrow($control_input);
		
				$control.on({
					mousedown : function() { return self.onMouseDown.apply(self, arguments); },
					click     : function() { return self.onClick.apply(self, arguments); }
				});
		
				$control_input.on({
					mousedown : function(e) { e.stopPropagation(); },
					keydown   : function() { return self.onKeyDown.apply(self, arguments); },
					keyup     : function() { return self.onKeyUp.apply(self, arguments); },
					keypress  : function() { return self.onKeyPress.apply(self, arguments); },
					resize    : function() { self.positionDropdown.apply(self, []); },
					blur      : function() { return self.onBlur.apply(self, arguments); },
					focus     : function() { self.ignoreBlur = false; return self.onFocus.apply(self, arguments); },
					paste     : function() { return self.onPaste.apply(self, arguments); }
				});
		
				$document.on('keydown' + eventNS, function(e) {
					self.isCmdDown = e[IS_MAC ? 'metaKey' : 'ctrlKey'];
					self.isCtrlDown = e[IS_MAC ? 'altKey' : 'ctrlKey'];
					self.isShiftDown = e.shiftKey;
				});
		
				$document.on('keyup' + eventNS, function(e) {
					if (e.keyCode === KEY_CTRL) self.isCtrlDown = false;
					if (e.keyCode === KEY_SHIFT) self.isShiftDown = false;
					if (e.keyCode === KEY_CMD) self.isCmdDown = false;
				});
		
				$document.on('mousedown' + eventNS, function(e) {
					if (self.isFocused) {
						// prevent events on the dropdown scrollbar from causing the control to blur
						if (e.target === self.$dropdown[0] || e.target.parentNode === self.$dropdown[0]) {
							return false;
						}
						// blur on click outside
						if (!self.$control.has(e.target).length && e.target !== self.$control[0]) {
							self.blur(e.target);
						}
					}
				});
		
				$window.on(['scroll' + eventNS, 'resize' + eventNS].join(' '), function() {
					if (self.isOpen) {
						self.positionDropdown.apply(self, arguments);
					}
				});
				$window.on('mousemove' + eventNS, function() {
					self.ignoreHover = false;
				});
		
				// store original children and tab index so that they can be
				// restored when the destroy() method is called.
				this.revertSettings = {
					$children : $input.children().detach(),
					tabindex  : $input.attr('tabindex')
				};
		
				$input.attr('tabindex', -1).hide().after(self.$wrapper);
		
				if ($.isArray(settings.items)) {
					self.setValue(settings.items);
					delete settings.items;
				}
		
				// feature detect for the validation API
				if (SUPPORTS_VALIDITY_API) {
					$input.on('invalid' + eventNS, function(e) {
						e.preventDefault();
						self.isInvalid = true;
						self.refreshState();
					});
				}
		
				self.updateOriginalInput();
				self.refreshItems();
				self.refreshState();
				self.updatePlaceholder();
				self.isSetup = true;
		
				if ($input.is(':disabled')) {
					self.disable();
				}
		
				self.on('change', this.onChange);
		
				$input.data('selectize', self);
				$input.addClass('selectized');
				self.trigger('initialize');
		
				// preload options
				if (settings.preload === true) {
					self.onSearchChange('');
				}
		
			},
		
			/**
			 * Sets up default rendering functions.
			 */
			setupTemplates: function() {
				var self = this;
				var field_label = self.settings.labelField;
				var field_optgroup = self.settings.optgroupLabelField;
		
				var templates = {
					'optgroup': function(data) {
						return '<div class="optgroup">' + data.html + '</div>';
					},
					'optgroup_header': function(data, escape) {
						return '<div class="optgroup-header">' + escape(data[field_optgroup]) + '</div>';
					},
					'option': function(data, escape) {
						return '<div class="option">' + escape(data[field_label]) + '</div>';
					},
					'item': function(data, escape) {
						return '<div class="item">' + escape(data[field_label]) + '</div>';
					},
					'option_create': function(data, escape) {
						return '<div class="create">Add <strong>' + escape(data.input) + '</strong>&hellip;</div>';
					}
				};
		
				self.settings.render = $.extend({}, templates, self.settings.render);
			},
		
			/**
			 * Maps fired events to callbacks provided
			 * in the settings used when creating the control.
			 */
			setupCallbacks: function() {
				var key, fn, callbacks = {
					'initialize'      : 'onInitialize',
					'change'          : 'onChange',
					'item_add'        : 'onItemAdd',
					'item_remove'     : 'onItemRemove',
					'clear'           : 'onClear',
					'option_add'      : 'onOptionAdd',
					'option_remove'   : 'onOptionRemove',
					'option_clear'    : 'onOptionClear',
					'optgroup_add'    : 'onOptionGroupAdd',
					'optgroup_remove' : 'onOptionGroupRemove',
					'optgroup_clear'  : 'onOptionGroupClear',
					'dropdown_open'   : 'onDropdownOpen',
					'dropdown_close'  : 'onDropdownClose',
					'type'            : 'onType',
					'load'            : 'onLoad',
					'focus'           : 'onFocus',
					'blur'            : 'onBlur'
				};
		
				for (key in callbacks) {
					if (callbacks.hasOwnProperty(key)) {
						fn = this.settings[callbacks[key]];
						if (fn) this.on(key, fn);
					}
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a click event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onClick: function(e) {
				var self = this;
		
				// necessary for mobile webkit devices (manual focus triggering
				// is ignored unless invoked within a click event)
				if (!self.isFocused) {
					self.focus();
					e.preventDefault();
				}
			},
		
			/**
			 * Triggered when the main control element
			 * has a mouse down event.
			 *
			 * @param {object} e
			 * @return {boolean}
			 */
			onMouseDown: function(e) {
				var self = this;
				var defaultPrevented = e.isDefaultPrevented();
				var $target = $(e.target);
		
				if (self.isFocused) {
					// retain focus by preventing native handling. if the
					// event target is the input it should not be modified.
					// otherwise, text selection within the input won't work.
					if (e.target !== self.$control_input[0]) {
						if (self.settings.mode === 'single') {
							// toggle dropdown
							self.isOpen ? self.close() : self.open();
						} else if (!defaultPrevented) {
							self.setActiveItem(null);
						}
						return false;
					}
				} else {
					// give control focus
					if (!defaultPrevented) {
						window.setTimeout(function() {
							self.focus();
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered when the value of the control has been changed.
			 * This should propagate the event to the original DOM
			 * input / select element.
			 */
			onChange: function() {
				this.$input.trigger('change');
			},
		
			/**
			 * Triggered on <input> paste.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onPaste: function(e) {
				var self = this;
				if (self.isFull() || self.isInputHidden || self.isLocked) {
					e.preventDefault();
				} else {
					// If a regex or string is included, this will split the pasted
					// input and create Items for each separate value
					if (self.settings.splitOn) {
						setTimeout(function() {
							var splitInput = $.trim(self.$control_input.val() || '').split(self.settings.splitOn);
							for (var i = 0, n = splitInput.length; i < n; i++) {
								self.createItem(splitInput[i]);
							}
						}, 0);
					}
				}
			},
		
			/**
			 * Triggered on <input> keypress.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyPress: function(e) {
				if (this.isLocked) return e && e.preventDefault();
				var character = String.fromCharCode(e.keyCode || e.which);
				if (this.settings.create && this.settings.mode === 'multi' && character === this.settings.delimiter) {
					this.createItem();
					e.preventDefault();
					return false;
				}
			},
		
			/**
			 * Triggered on <input> keydown.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyDown: function(e) {
				var isInput = e.target === this.$control_input[0];
				var self = this;
		
				if (self.isLocked) {
					if (e.keyCode !== KEY_TAB) {
						e.preventDefault();
					}
					return;
				}
		
				switch (e.keyCode) {
					case KEY_A:
						if (self.isCmdDown) {
							self.selectAll();
							return;
						}
						break;
					case KEY_ESC:
						if (self.isOpen) {
							e.preventDefault();
							e.stopPropagation();
							self.close();
						}
						return;
					case KEY_N:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_DOWN:
						if (!self.isOpen && self.hasOptions) {
							self.open();
						} else if (self.$activeOption) {
							self.ignoreHover = true;
							var $next = self.getAdjacentOption(self.$activeOption, 1);
							if ($next.length) self.setActiveOption($next, true, true);
						}
						e.preventDefault();
						return;
					case KEY_P:
						if (!e.ctrlKey || e.altKey) break;
					case KEY_UP:
						if (self.$activeOption) {
							self.ignoreHover = true;
							var $prev = self.getAdjacentOption(self.$activeOption, -1);
							if ($prev.length) self.setActiveOption($prev, true, true);
						}
						e.preventDefault();
						return;
					case KEY_RETURN:
						if (self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
							e.preventDefault();
						}
						return;
					case KEY_LEFT:
						self.advanceSelection(-1, e);
						return;
					case KEY_RIGHT:
						self.advanceSelection(1, e);
						return;
					case KEY_TAB:
						if (self.settings.selectOnTab && self.isOpen && self.$activeOption) {
							self.onOptionSelect({currentTarget: self.$activeOption});
		
							// Default behaviour is to jump to the next field, we only want this
							// if the current field doesn't accept any more entries
							if (!self.isFull()) {
								e.preventDefault();
							}
						}
						if (self.settings.create && self.createItem()) {
							e.preventDefault();
						}
						return;
					case KEY_BACKSPACE:
					case KEY_DELETE:
						self.deleteSelection(e);
						return;
				}
		
				if ((self.isFull() || self.isInputHidden) && !(IS_MAC ? e.metaKey : e.ctrlKey)) {
					e.preventDefault();
					return;
				}
			},
		
			/**
			 * Triggered on <input> keyup.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onKeyUp: function(e) {
				var self = this;
		
				if (self.isLocked) return e && e.preventDefault();
				var value = self.$control_input.val() || '';
				if (self.lastValue !== value) {
					self.lastValue = value;
					self.onSearchChange(value);
					self.refreshOptions();
					self.trigger('type', value);
				}
			},
		
			/**
			 * Invokes the user-provide option provider / loader.
			 *
			 * Note: this function is debounced in the Selectize
			 * constructor (by `settings.loadDelay` milliseconds)
			 *
			 * @param {string} value
			 */
			onSearchChange: function(value) {
				var self = this;
				var fn = self.settings.load;
				if (!fn) return;
				if (self.loadedSearches.hasOwnProperty(value)) return;
				self.loadedSearches[value] = true;
				self.load(function(callback) {
					fn.apply(self, [value, callback]);
				});
			},
		
			/**
			 * Triggered on <input> focus.
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			onFocus: function(e) {
				var self = this;
				var wasFocused = self.isFocused;
		
				if (self.isDisabled) {
					self.blur();
					e && e.preventDefault();
					return false;
				}
		
				if (self.ignoreFocus) return;
				self.isFocused = true;
				if (self.settings.preload === 'focus') self.onSearchChange('');
		
				if (!wasFocused) self.trigger('focus');
		
				if (!self.$activeItems.length) {
					self.showInput();
					self.setActiveItem(null);
					self.refreshOptions(!!self.settings.openOnFocus);
				}
		
				self.refreshState();
			},
		
			/**
			 * Triggered on <input> blur.
			 *
			 * @param {object} e
			 * @param {Element} dest
			 */
			onBlur: function(e, dest) {
				var self = this;
				if (!self.isFocused) return;
				self.isFocused = false;
		
				if (self.ignoreFocus) {
					return;
				} else if (!self.ignoreBlur && document.activeElement === self.$dropdown_content[0]) {
					// necessary to prevent IE closing the dropdown when the scrollbar is clicked
					self.ignoreBlur = true;
					self.onFocus(e);
					return;
				}
		
				var deactivate = function() {
					self.close();
					self.setTextboxValue('');
					self.setActiveItem(null);
					self.setActiveOption(null);
					self.setCaret(self.items.length);
					self.refreshState();
		
					// IE11 bug: element still marked as active
					(dest || document.body).focus();
		
					self.ignoreFocus = false;
					self.trigger('blur');
				};
		
				self.ignoreFocus = true;
				if (self.settings.create && self.settings.createOnBlur) {
					self.createItem(null, false, deactivate);
				} else {
					deactivate();
				}
			},
		
			/**
			 * Triggered when the user rolls over
			 * an option in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionHover: function(e) {
				if (this.ignoreHover) return;
				this.setActiveOption(e.currentTarget, false);
			},
		
			/**
			 * Triggered when the user clicks on an option
			 * in the autocomplete dropdown menu.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onOptionSelect: function(e) {
				var value, $target, $option, self = this;
		
				if (e.preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
		
				$target = $(e.currentTarget);
				if ($target.hasClass('create')) {
					self.createItem(null, function() {
						if (self.settings.closeAfterSelect) {
							self.close();
						}
					});
				} else {
					value = $target.attr('data-value');
					if (typeof value !== 'undefined') {
						self.lastQuery = null;
						self.setTextboxValue('');
						self.addItem(value);
						if (self.settings.closeAfterSelect) {
							self.close();
						} else if (!self.settings.hideSelected && e.type && /mouse/.test(e.type)) {
							self.setActiveOption(self.getOption(value));
						}
					}
				}
			},
		
			/**
			 * Triggered when the user clicks on an item
			 * that has been selected.
			 *
			 * @param {object} e
			 * @returns {boolean}
			 */
			onItemSelect: function(e) {
				var self = this;
		
				if (self.isLocked) return;
				if (self.settings.mode === 'multi') {
					e.preventDefault();
					self.setActiveItem(e.currentTarget, e);
				}
			},
		
			/**
			 * Invokes the provided method that provides
			 * results to a callback---which are then added
			 * as options to the control.
			 *
			 * @param {function} fn
			 */
			load: function(fn) {
				var self = this;
				var $wrapper = self.$wrapper.addClass(self.settings.loadingClass);
		
				self.loading++;
				fn.apply(self, [function(results) {
					self.loading = Math.max(self.loading - 1, 0);
					if (results && results.length) {
						self.addOption(results);
						self.refreshOptions(self.isFocused && !self.isInputHidden);
					}
					if (!self.loading) {
						$wrapper.removeClass(self.settings.loadingClass);
					}
					self.trigger('load', results);
				}]);
			},
		
			/**
			 * Sets the input field of the control to the specified value.
			 *
			 * @param {string} value
			 */
			setTextboxValue: function(value) {
				var $input = this.$control_input;
				var changed = $input.val() !== value;
				if (changed) {
					$input.val(value).triggerHandler('update');
					this.lastValue = value;
				}
			},
		
			/**
			 * Returns the value of the control. If multiple items
			 * can be selected (e.g. <select multiple>), this returns
			 * an array. If only one item can be selected, this
			 * returns a string.
			 *
			 * @returns {mixed}
			 */
			getValue: function() {
				if (this.tagType === TAG_SELECT && this.$input.attr('multiple')) {
					return this.items;
				} else {
					return this.items.join(this.settings.delimiter);
				}
			},
		
			/**
			 * Resets the selected items to the given value.
			 *
			 * @param {mixed} value
			 */
			setValue: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					this.clear(silent);
					this.addItems(value, silent);
				});
			},
		
			/**
			 * Sets the selected item.
			 *
			 * @param {object} $item
			 * @param {object} e (optional)
			 */
			setActiveItem: function($item, e) {
				var self = this;
				var eventName;
				var i, idx, begin, end, item, swap;
				var $last;
		
				if (self.settings.mode === 'single') return;
				$item = $($item);
		
				// clear the active selection
				if (!$item.length) {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [];
					if (self.isFocused) {
						self.showInput();
					}
					return;
				}
		
				// modify selection
				eventName = e && e.type.toLowerCase();
		
				if (eventName === 'mousedown' && self.isShiftDown && self.$activeItems.length) {
					$last = self.$control.children('.active:last');
					begin = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$last[0]]);
					end   = Array.prototype.indexOf.apply(self.$control[0].childNodes, [$item[0]]);
					if (begin > end) {
						swap  = begin;
						begin = end;
						end   = swap;
					}
					for (i = begin; i <= end; i++) {
						item = self.$control[0].childNodes[i];
						if (self.$activeItems.indexOf(item) === -1) {
							$(item).addClass('active');
							self.$activeItems.push(item);
						}
					}
					e.preventDefault();
				} else if ((eventName === 'mousedown' && self.isCtrlDown) || (eventName === 'keydown' && this.isShiftDown)) {
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
						$item.removeClass('active');
					} else {
						self.$activeItems.push($item.addClass('active')[0]);
					}
				} else {
					$(self.$activeItems).removeClass('active');
					self.$activeItems = [$item.addClass('active')[0]];
				}
		
				// ensure control has focus
				self.hideInput();
				if (!this.isFocused) {
					self.focus();
				}
			},
		
			/**
			 * Sets the selected item in the dropdown menu
			 * of available options.
			 *
			 * @param {object} $object
			 * @param {boolean} scroll
			 * @param {boolean} animate
			 */
			setActiveOption: function($option, scroll, animate) {
				var height_menu, height_item, y;
				var scroll_top, scroll_bottom;
				var self = this;
		
				if (self.$activeOption) self.$activeOption.removeClass('active');
				self.$activeOption = null;
		
				$option = $($option);
				if (!$option.length) return;
		
				self.$activeOption = $option.addClass('active');
		
				if (scroll || !isset(scroll)) {
		
					height_menu   = self.$dropdown_content.height();
					height_item   = self.$activeOption.outerHeight(true);
					scroll        = self.$dropdown_content.scrollTop() || 0;
					y             = self.$activeOption.offset().top - self.$dropdown_content.offset().top + scroll;
					scroll_top    = y;
					scroll_bottom = y - height_menu + height_item;
		
					if (y + height_item > height_menu + scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_bottom}, animate ? self.settings.scrollDuration : 0);
					} else if (y < scroll) {
						self.$dropdown_content.stop().animate({scrollTop: scroll_top}, animate ? self.settings.scrollDuration : 0);
					}
		
				}
			},
		
			/**
			 * Selects all items (CTRL + A).
			 */
			selectAll: function() {
				var self = this;
				if (self.settings.mode === 'single') return;
		
				self.$activeItems = Array.prototype.slice.apply(self.$control.children(':not(input)').addClass('active'));
				if (self.$activeItems.length) {
					self.hideInput();
					self.close();
				}
				self.focus();
			},
		
			/**
			 * Hides the input element out of view, while
			 * retaining its focus.
			 */
			hideInput: function() {
				var self = this;
		
				self.setTextboxValue('');
				self.$control_input.css({opacity: 0, position: 'absolute', left: self.rtl ? 10000 : -10000});
				self.isInputHidden = true;
			},
		
			/**
			 * Restores input visibility.
			 */
			showInput: function() {
				this.$control_input.css({opacity: 1, position: 'relative', left: 0});
				this.isInputHidden = false;
			},
		
			/**
			 * Gives the control focus.
			 */
			focus: function() {
				var self = this;
				if (self.isDisabled) return;
		
				self.ignoreFocus = true;
				self.$control_input[0].focus();
				window.setTimeout(function() {
					self.ignoreFocus = false;
					self.onFocus();
				}, 0);
			},
		
			/**
			 * Forces the control out of focus.
			 *
			 * @param {Element} dest
			 */
			blur: function(dest) {
				this.$control_input[0].blur();
				this.onBlur(null, dest);
			},
		
			/**
			 * Returns a function that scores an object
			 * to show how good of a match it is to the
			 * provided query.
			 *
			 * @param {string} query
			 * @param {object} options
			 * @return {function}
			 */
			getScoreFunction: function(query) {
				return this.sifter.getScoreFunction(query, this.getSearchOptions());
			},
		
			/**
			 * Returns search options for sifter (the system
			 * for scoring and sorting results).
			 *
			 * @see https://github.com/brianreavis/sifter.js
			 * @return {object}
			 */
			getSearchOptions: function() {
				var settings = this.settings;
				var sort = settings.sortField;
				if (typeof sort === 'string') {
					sort = [{field: sort}];
				}
		
				return {
					fields      : settings.searchField,
					conjunction : settings.searchConjunction,
					sort        : sort
				};
			},
		
			/**
			 * Searches through available options and returns
			 * a sorted array of matches.
			 *
			 * Returns an object containing:
			 *
			 *   - query {string}
			 *   - tokens {array}
			 *   - total {int}
			 *   - items {array}
			 *
			 * @param {string} query
			 * @returns {object}
			 */
			search: function(query) {
				var i, value, score, result, calculateScore;
				var self     = this;
				var settings = self.settings;
				var options  = this.getSearchOptions();
		
				// validate user-provided result scoring function
				if (settings.score) {
					calculateScore = self.settings.score.apply(this, [query]);
					if (typeof calculateScore !== 'function') {
						throw new Error('Selectize "score" setting must be a function that returns a function');
					}
				}
		
				// perform search
				if (query !== self.lastQuery) {
					self.lastQuery = query;
					result = self.sifter.search(query, $.extend(options, {score: calculateScore}));
					self.currentResults = result;
				} else {
					result = $.extend(true, {}, self.currentResults);
				}
		
				// filter out selected items
				if (settings.hideSelected) {
					for (i = result.items.length - 1; i >= 0; i--) {
						if (self.items.indexOf(hash_key(result.items[i].id)) !== -1) {
							result.items.splice(i, 1);
						}
					}
				}
		
				return result;
			},
		
			/**
			 * Refreshes the list of available options shown
			 * in the autocomplete dropdown menu.
			 *
			 * @param {boolean} triggerDropdown
			 */
			refreshOptions: function(triggerDropdown) {
				var i, j, k, n, groups, groups_order, option, option_html, optgroup, optgroups, html, html_children, has_create_option;
				var $active, $active_before, $create;
		
				if (typeof triggerDropdown === 'undefined') {
					triggerDropdown = true;
				}
		
				var self              = this;
				var query             = $.trim(self.$control_input.val());
				var results           = self.search(query);
				var $dropdown_content = self.$dropdown_content;
				var active_before     = self.$activeOption && hash_key(self.$activeOption.attr('data-value'));
		
				// build markup
				n = results.items.length;
				if (typeof self.settings.maxOptions === 'number') {
					n = Math.min(n, self.settings.maxOptions);
				}
		
				// render and group available options individually
				groups = {};
				groups_order = [];
		
				for (i = 0; i < n; i++) {
					option      = self.options[results.items[i].id];
					option_html = self.render('option', option);
					optgroup    = option[self.settings.optgroupField] || '';
					optgroups   = $.isArray(optgroup) ? optgroup : [optgroup];
		
					for (j = 0, k = optgroups && optgroups.length; j < k; j++) {
						optgroup = optgroups[j];
						if (!self.optgroups.hasOwnProperty(optgroup)) {
							optgroup = '';
						}
						if (!groups.hasOwnProperty(optgroup)) {
							groups[optgroup] = [];
							groups_order.push(optgroup);
						}
						groups[optgroup].push(option_html);
					}
				}
		
				// sort optgroups
				if (this.settings.lockOptgroupOrder) {
					groups_order.sort(function(a, b) {
						var a_order = self.optgroups[a].$order || 0;
						var b_order = self.optgroups[b].$order || 0;
						return a_order - b_order;
					});
				}
		
				// render optgroup headers & join groups
				html = [];
				for (i = 0, n = groups_order.length; i < n; i++) {
					optgroup = groups_order[i];
					if (self.optgroups.hasOwnProperty(optgroup) && groups[optgroup].length) {
						// render the optgroup header and options within it,
						// then pass it to the wrapper template
						html_children = self.render('optgroup_header', self.optgroups[optgroup]) || '';
						html_children += groups[optgroup].join('');
						html.push(self.render('optgroup', $.extend({}, self.optgroups[optgroup], {
							html: html_children
						})));
					} else {
						html.push(groups[optgroup].join(''));
					}
				}
		
				$dropdown_content.html(html.join(''));
		
				// highlight matching terms inline
				if (self.settings.highlight && results.query.length && results.tokens.length) {
					for (i = 0, n = results.tokens.length; i < n; i++) {
						highlight($dropdown_content, results.tokens[i].regex);
					}
				}
		
				// add "selected" class to selected options
				if (!self.settings.hideSelected) {
					for (i = 0, n = self.items.length; i < n; i++) {
						self.getOption(self.items[i]).addClass('selected');
					}
				}
		
				// add create option
				has_create_option = self.canCreate(query);
				if (has_create_option) {
					$dropdown_content.prepend(self.render('option_create', {input: query}));
					$create = $($dropdown_content[0].childNodes[0]);
				}
		
				// activate
				self.hasOptions = results.items.length > 0 || has_create_option;
				if (self.hasOptions) {
					if (results.items.length > 0) {
						$active_before = active_before && self.getOption(active_before);
						if ($active_before && $active_before.length) {
							$active = $active_before;
						} else if (self.settings.mode === 'single' && self.items.length) {
							$active = self.getOption(self.items[0]);
						}
						if (!$active || !$active.length) {
							if ($create && !self.settings.addPrecedence) {
								$active = self.getAdjacentOption($create, 1);
							} else {
								$active = $dropdown_content.find('[data-selectable]:first');
							}
						}
					} else {
						$active = $create;
					}
					self.setActiveOption($active);
					if (triggerDropdown && !self.isOpen) { self.open(); }
				} else {
					self.setActiveOption(null);
					if (triggerDropdown && self.isOpen) { self.close(); }
				}
			},
		
			/**
			 * Adds an available option. If it already exists,
			 * nothing will happen. Note: this does not refresh
			 * the options list dropdown (use `refreshOptions`
			 * for that).
			 *
			 * Usage:
			 *
			 *   this.addOption(data)
			 *
			 * @param {object|array} data
			 */
			addOption: function(data) {
				var i, n, value, self = this;
		
				if ($.isArray(data)) {
					for (i = 0, n = data.length; i < n; i++) {
						self.addOption(data[i]);
					}
					return;
				}
		
				if (value = self.registerOption(data)) {
					self.userOptions[value] = true;
					self.lastQuery = null;
					self.trigger('option_add', value, data);
				}
			},
		
			/**
			 * Registers an option to the pool of options.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOption: function(data) {
				var key = hash_key(data[this.settings.valueField]);
				if (!key || this.options.hasOwnProperty(key)) return false;
				data.$order = data.$order || ++this.order;
				this.options[key] = data;
				return key;
			},
		
			/**
			 * Registers an option group to the pool of option groups.
			 *
			 * @param {object} data
			 * @return {boolean|string}
			 */
			registerOptionGroup: function(data) {
				var key = hash_key(data[this.settings.optgroupValueField]);
				if (!key) return false;
		
				data.$order = data.$order || ++this.order;
				this.optgroups[key] = data;
				return key;
			},
		
			/**
			 * Registers a new optgroup for options
			 * to be bucketed into.
			 *
			 * @param {string} id
			 * @param {object} data
			 */
			addOptionGroup: function(id, data) {
				data[this.settings.optgroupValueField] = id;
				if (id = this.registerOptionGroup(data)) {
					this.trigger('optgroup_add', id, data);
				}
			},
		
			/**
			 * Removes an existing option group.
			 *
			 * @param {string} id
			 */
			removeOptionGroup: function(id) {
				if (this.optgroups.hasOwnProperty(id)) {
					delete this.optgroups[id];
					this.renderCache = {};
					this.trigger('optgroup_remove', id);
				}
			},
		
			/**
			 * Clears all existing option groups.
			 */
			clearOptionGroups: function() {
				this.optgroups = {};
				this.renderCache = {};
				this.trigger('optgroup_clear');
			},
		
			/**
			 * Updates an option available for selection. If
			 * it is visible in the selected items or options
			 * dropdown, it will be re-rendered automatically.
			 *
			 * @param {string} value
			 * @param {object} data
			 */
			updateOption: function(value, data) {
				var self = this;
				var $item, $item_new;
				var value_new, index_item, cache_items, cache_options, order_old;
		
				value     = hash_key(value);
				value_new = hash_key(data[self.settings.valueField]);
		
				// sanity checks
				if (value === null) return;
				if (!self.options.hasOwnProperty(value)) return;
				if (typeof value_new !== 'string') throw new Error('Value must be set in option data');
		
				order_old = self.options[value].$order;
		
				// update references
				if (value_new !== value) {
					delete self.options[value];
					index_item = self.items.indexOf(value);
					if (index_item !== -1) {
						self.items.splice(index_item, 1, value_new);
					}
				}
				data.$order = data.$order || order_old;
				self.options[value_new] = data;
		
				// invalidate render cache
				cache_items = self.renderCache['item'];
				cache_options = self.renderCache['option'];
		
				if (cache_items) {
					delete cache_items[value];
					delete cache_items[value_new];
				}
				if (cache_options) {
					delete cache_options[value];
					delete cache_options[value_new];
				}
		
				// update the item if it's selected
				if (self.items.indexOf(value_new) !== -1) {
					$item = self.getItem(value);
					$item_new = $(self.render('item', data));
					if ($item.hasClass('active')) $item_new.addClass('active');
					$item.replaceWith($item_new);
				}
		
				// invalidate last query because we might have updated the sortField
				self.lastQuery = null;
		
				// update dropdown contents
				if (self.isOpen) {
					self.refreshOptions(false);
				}
			},
		
			/**
			 * Removes a single option.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			removeOption: function(value, silent) {
				var self = this;
				value = hash_key(value);
		
				var cache_items = self.renderCache['item'];
				var cache_options = self.renderCache['option'];
				if (cache_items) delete cache_items[value];
				if (cache_options) delete cache_options[value];
		
				delete self.userOptions[value];
				delete self.options[value];
				self.lastQuery = null;
				self.trigger('option_remove', value);
				self.removeItem(value, silent);
			},
		
			/**
			 * Clears all options.
			 */
			clearOptions: function() {
				var self = this;
		
				self.loadedSearches = {};
				self.userOptions = {};
				self.renderCache = {};
				self.options = self.sifter.items = {};
				self.lastQuery = null;
				self.trigger('option_clear');
				self.clear();
			},
		
			/**
			 * Returns the jQuery element of the option
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getOption: function(value) {
				return this.getElementWithValue(value, this.$dropdown_content.find('[data-selectable]'));
			},
		
			/**
			 * Returns the jQuery element of the next or
			 * previous selectable option.
			 *
			 * @param {object} $option
			 * @param {int} direction  can be 1 for next or -1 for previous
			 * @return {object}
			 */
			getAdjacentOption: function($option, direction) {
				var $options = this.$dropdown.find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			},
		
			/**
			 * Finds the first element with a "data-value" attribute
			 * that matches the given value.
			 *
			 * @param {mixed} value
			 * @param {object} $els
			 * @return {object}
			 */
			getElementWithValue: function(value, $els) {
				value = hash_key(value);
		
				if (typeof value !== 'undefined' && value !== null) {
					for (var i = 0, n = $els.length; i < n; i++) {
						if ($els[i].getAttribute('data-value') === value) {
							return $($els[i]);
						}
					}
				}
		
				return $();
			},
		
			/**
			 * Returns the jQuery element of the item
			 * matching the given value.
			 *
			 * @param {string} value
			 * @returns {object}
			 */
			getItem: function(value) {
				return this.getElementWithValue(value, this.$control.children());
			},
		
			/**
			 * "Selects" multiple items at once. Adds them to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItems: function(values, silent) {
				var items = $.isArray(values) ? values : [values];
				for (var i = 0, n = items.length; i < n; i++) {
					this.isPending = (i < n - 1);
					this.addItem(items[i], silent);
				}
			},
		
			/**
			 * "Selects" an item. Adds it to the list
			 * at the current caret position.
			 *
			 * @param {string} value
			 * @param {boolean} silent
			 */
			addItem: function(value, silent) {
				var events = silent ? [] : ['change'];
		
				debounce_events(this, events, function() {
					var $item, $option, $options;
					var self = this;
					var inputMode = self.settings.mode;
					var i, active, value_next, wasFull;
					value = hash_key(value);
		
					if (self.items.indexOf(value) !== -1) {
						if (inputMode === 'single') self.close();
						return;
					}
		
					if (!self.options.hasOwnProperty(value)) return;
					if (inputMode === 'single') self.clear(silent);
					if (inputMode === 'multi' && self.isFull()) return;
		
					$item = $(self.render('item', self.options[value]));
					wasFull = self.isFull();
					self.items.splice(self.caretPos, 0, value);
					self.insertAtCaret($item);
					if (!self.isPending || (!wasFull && self.isFull())) {
						self.refreshState();
					}
		
					if (self.isSetup) {
						$options = self.$dropdown_content.find('[data-selectable]');
		
						// update menu / remove the option (if this is not one item being added as part of series)
						if (!self.isPending) {
							$option = self.getOption(value);
							value_next = self.getAdjacentOption($option, 1).attr('data-value');
							self.refreshOptions(self.isFocused && inputMode !== 'single');
							if (value_next) {
								self.setActiveOption(self.getOption(value_next));
							}
						}
		
						// hide the menu if the maximum number of items have been selected or no options are left
						if (!$options.length || self.isFull()) {
							self.close();
						} else {
							self.positionDropdown();
						}
		
						self.updatePlaceholder();
						self.trigger('item_add', value, $item);
						self.updateOriginalInput({silent: silent});
					}
				});
			},
		
			/**
			 * Removes the selected item matching
			 * the provided value.
			 *
			 * @param {string} value
			 */
			removeItem: function(value, silent) {
				var self = this;
				var $item, i, idx;
		
				$item = (typeof value === 'object') ? value : self.getItem(value);
				value = hash_key($item.attr('data-value'));
				i = self.items.indexOf(value);
		
				if (i !== -1) {
					$item.remove();
					if ($item.hasClass('active')) {
						idx = self.$activeItems.indexOf($item[0]);
						self.$activeItems.splice(idx, 1);
					}
		
					self.items.splice(i, 1);
					self.lastQuery = null;
					if (!self.settings.persist && self.userOptions.hasOwnProperty(value)) {
						self.removeOption(value, silent);
					}
		
					if (i < self.caretPos) {
						self.setCaret(self.caretPos - 1);
					}
		
					self.refreshState();
					self.updatePlaceholder();
					self.updateOriginalInput({silent: silent});
					self.positionDropdown();
					self.trigger('item_remove', value, $item);
				}
			},
		
			/**
			 * Invokes the `create` method provided in the
			 * selectize options that should provide the data
			 * for the new item, given the user input.
			 *
			 * Once this completes, it will be added
			 * to the item list.
			 *
			 * @param {string} value
			 * @param {boolean} [triggerDropdown]
			 * @param {function} [callback]
			 * @return {boolean}
			 */
			createItem: function(input, triggerDropdown) {
				var self  = this;
				var caret = self.caretPos;
				input = input || $.trim(self.$control_input.val() || '');
		
				var callback = arguments[arguments.length - 1];
				if (typeof callback !== 'function') callback = function() {};
		
				if (typeof triggerDropdown !== 'boolean') {
					triggerDropdown = true;
				}
		
				if (!self.canCreate(input)) {
					callback();
					return false;
				}
		
				self.lock();
		
				var setup = (typeof self.settings.create === 'function') ? this.settings.create : function(input) {
					var data = {};
					data[self.settings.labelField] = input;
					data[self.settings.valueField] = input;
					return data;
				};
		
				var create = once(function(data) {
					self.unlock();
		
					if (!data || typeof data !== 'object') return callback();
					var value = hash_key(data[self.settings.valueField]);
					if (typeof value !== 'string') return callback();
		
					self.setTextboxValue('');
					self.addOption(data);
					self.setCaret(caret);
					self.addItem(value);
					self.refreshOptions(triggerDropdown && self.settings.mode !== 'single');
					callback(data);
				});
		
				var output = setup.apply(this, [input, create]);
				if (typeof output !== 'undefined') {
					create(output);
				}
		
				return true;
			},
		
			/**
			 * Re-renders the selected item lists.
			 */
			refreshItems: function() {
				this.lastQuery = null;
		
				if (this.isSetup) {
					this.addItem(this.items);
				}
		
				this.refreshState();
				this.updateOriginalInput();
			},
		
			/**
			 * Updates all state-dependent attributes
			 * and CSS classes.
			 */
			refreshState: function() {
				var invalid, self = this;
				if (self.isRequired) {
					if (self.items.length) self.isInvalid = false;
					self.$control_input.prop('required', invalid);
				}
				self.refreshClasses();
			},
		
			/**
			 * Updates all state-dependent CSS classes.
			 */
			refreshClasses: function() {
				var self     = this;
				var isFull   = self.isFull();
				var isLocked = self.isLocked;
		
				self.$wrapper
					.toggleClass('rtl', self.rtl);
		
				self.$control
					.toggleClass('focus', self.isFocused)
					.toggleClass('disabled', self.isDisabled)
					.toggleClass('required', self.isRequired)
					.toggleClass('invalid', self.isInvalid)
					.toggleClass('locked', isLocked)
					.toggleClass('full', isFull).toggleClass('not-full', !isFull)
					.toggleClass('input-active', self.isFocused && !self.isInputHidden)
					.toggleClass('dropdown-active', self.isOpen)
					.toggleClass('has-options', !$.isEmptyObject(self.options))
					.toggleClass('has-items', self.items.length > 0);
		
				self.$control_input.data('grow', !isFull && !isLocked);
			},
		
			/**
			 * Determines whether or not more items can be added
			 * to the control without exceeding the user-defined maximum.
			 *
			 * @returns {boolean}
			 */
			isFull: function() {
				return this.settings.maxItems !== null && this.items.length >= this.settings.maxItems;
			},
		
			/**
			 * Refreshes the original <select> or <input>
			 * element to reflect the current state.
			 */
			updateOriginalInput: function(opts) {
				var i, n, options, label, self = this;
				opts = opts || {};
		
				if (self.tagType === TAG_SELECT) {
					options = [];
					for (i = 0, n = self.items.length; i < n; i++) {
						label = self.options[self.items[i]][self.settings.labelField] || '';
						options.push('<option value="' + escape_html(self.items[i]) + '" selected="selected">' + escape_html(label) + '</option>');
					}
					if (!options.length && !this.$input.attr('multiple')) {
						options.push('<option value="" selected="selected"></option>');
					}
					self.$input.html(options.join(''));
				} else {
					self.$input.val(self.getValue());
					self.$input.attr('value',self.$input.val());
				}
		
				if (self.isSetup) {
					if (!opts.silent) {
						self.trigger('change', self.$input.val());
					}
				}
			},
		
			/**
			 * Shows/hide the input placeholder depending
			 * on if there items in the list already.
			 */
			updatePlaceholder: function() {
				if (!this.settings.placeholder) return;
				var $input = this.$control_input;
		
				if (this.items.length) {
					$input.removeAttr('placeholder');
				} else {
					$input.attr('placeholder', this.settings.placeholder);
				}
				$input.triggerHandler('update', {force: true});
			},
		
			/**
			 * Shows the autocomplete dropdown containing
			 * the available options.
			 */
			open: function() {
				var self = this;
		
				if (self.isLocked || self.isOpen || (self.settings.mode === 'multi' && self.isFull())) return;
				self.focus();
				self.isOpen = true;
				self.refreshState();
				self.$dropdown.css({visibility: 'hidden', display: 'block'});
				self.positionDropdown();
				self.$dropdown.css({visibility: 'visible'});
				self.trigger('dropdown_open', self.$dropdown);
			},
		
			/**
			 * Closes the autocomplete dropdown menu.
			 */
			close: function() {
				var self = this;
				var trigger = self.isOpen;
		
				if (self.settings.mode === 'single' && self.items.length) {
					self.hideInput();
				}
		
				self.isOpen = false;
				self.$dropdown.hide();
				self.setActiveOption(null);
				self.refreshState();
		
				if (trigger) self.trigger('dropdown_close', self.$dropdown);
			},
		
			/**
			 * Calculates and applies the appropriate
			 * position of the dropdown.
			 */
			positionDropdown: function() {
				var $control = this.$control;
				var offset = this.settings.dropdownParent === 'body' ? $control.offset() : $control.position();
				offset.top += $control.outerHeight(true);
		
				this.$dropdown.css({
					width : $control.outerWidth(),
					top   : offset.top,
					left  : offset.left
				});
			},
		
			/**
			 * Resets / clears all selected items
			 * from the control.
			 *
			 * @param {boolean} silent
			 */
			clear: function(silent) {
				var self = this;
		
				if (!self.items.length) return;
				self.$control.children(':not(input)').remove();
				self.items = [];
				self.lastQuery = null;
				self.setCaret(0);
				self.setActiveItem(null);
				self.updatePlaceholder();
				self.updateOriginalInput({silent: silent});
				self.refreshState();
				self.showInput();
				self.trigger('clear');
			},
		
			/**
			 * A helper method for inserting an element
			 * at the current caret position.
			 *
			 * @param {object} $el
			 */
			insertAtCaret: function($el) {
				var caret = Math.min(this.caretPos, this.items.length);
				if (caret === 0) {
					this.$control.prepend($el);
				} else {
					$(this.$control[0].childNodes[caret]).before($el);
				}
				this.setCaret(caret + 1);
			},
		
			/**
			 * Removes the current selected item(s).
			 *
			 * @param {object} e (optional)
			 * @returns {boolean}
			 */
			deleteSelection: function(e) {
				var i, n, direction, selection, values, caret, option_select, $option_select, $tail;
				var self = this;
		
				direction = (e && e.keyCode === KEY_BACKSPACE) ? -1 : 1;
				selection = getSelection(self.$control_input[0]);
		
				if (self.$activeOption && !self.settings.hideSelected) {
					option_select = self.getAdjacentOption(self.$activeOption, -1).attr('data-value');
				}
		
				// determine items that will be removed
				values = [];
		
				if (self.$activeItems.length) {
					$tail = self.$control.children('.active:' + (direction > 0 ? 'last' : 'first'));
					caret = self.$control.children(':not(input)').index($tail);
					if (direction > 0) { caret++; }
		
					for (i = 0, n = self.$activeItems.length; i < n; i++) {
						values.push($(self.$activeItems[i]).attr('data-value'));
					}
					if (e) {
						e.preventDefault();
						e.stopPropagation();
					}
				} else if ((self.isFocused || self.settings.mode === 'single') && self.items.length) {
					if (direction < 0 && selection.start === 0 && selection.length === 0) {
						values.push(self.items[self.caretPos - 1]);
					} else if (direction > 0 && selection.start === self.$control_input.val().length) {
						values.push(self.items[self.caretPos]);
					}
				}
		
				// allow the callback to abort
				if (!values.length || (typeof self.settings.onDelete === 'function' && self.settings.onDelete.apply(self, [values]) === false)) {
					return false;
				}
		
				// perform removal
				if (typeof caret !== 'undefined') {
					self.setCaret(caret);
				}
				while (values.length) {
					self.removeItem(values.pop());
				}
		
				self.showInput();
				self.positionDropdown();
				self.refreshOptions(true);
		
				// select previous option
				if (option_select) {
					$option_select = self.getOption(option_select);
					if ($option_select.length) {
						self.setActiveOption($option_select);
					}
				}
		
				return true;
			},
		
			/**
			 * Selects the previous / next item (depending
			 * on the `direction` argument).
			 *
			 * > 0 - right
			 * < 0 - left
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceSelection: function(direction, e) {
				var tail, selection, idx, valueLength, cursorAtEdge, $tail;
				var self = this;
		
				if (direction === 0) return;
				if (self.rtl) direction *= -1;
		
				tail = direction > 0 ? 'last' : 'first';
				selection = getSelection(self.$control_input[0]);
		
				if (self.isFocused && !self.isInputHidden) {
					valueLength = self.$control_input.val().length;
					cursorAtEdge = direction < 0
						? selection.start === 0 && selection.length === 0
						: selection.start === valueLength;
		
					if (cursorAtEdge && !valueLength) {
						self.advanceCaret(direction, e);
					}
				} else {
					$tail = self.$control.children('.active:' + tail);
					if ($tail.length) {
						idx = self.$control.children(':not(input)').index($tail);
						self.setActiveItem(null);
						self.setCaret(direction > 0 ? idx + 1 : idx);
					}
				}
			},
		
			/**
			 * Moves the caret left / right.
			 *
			 * @param {int} direction
			 * @param {object} e (optional)
			 */
			advanceCaret: function(direction, e) {
				var self = this, fn, $adj;
		
				if (direction === 0) return;
		
				fn = direction > 0 ? 'next' : 'prev';
				if (self.isShiftDown) {
					$adj = self.$control_input[fn]();
					if ($adj.length) {
						self.hideInput();
						self.setActiveItem($adj);
						e && e.preventDefault();
					}
				} else {
					self.setCaret(self.caretPos + direction);
				}
			},
		
			/**
			 * Moves the caret to the specified index.
			 *
			 * @param {int} i
			 */
			setCaret: function(i) {
				var self = this;
		
				if (self.settings.mode === 'single') {
					i = self.items.length;
				} else {
					i = Math.max(0, Math.min(self.items.length, i));
				}
		
				if(!self.isPending) {
					// the input must be moved by leaving it in place and moving the
					// siblings, due to the fact that focus cannot be restored once lost
					// on mobile webkit devices
					var j, n, fn, $children, $child;
					$children = self.$control.children(':not(input)');
					for (j = 0, n = $children.length; j < n; j++) {
						$child = $($children[j]).detach();
						if (j <  i) {
							self.$control_input.before($child);
						} else {
							self.$control.append($child);
						}
					}
				}
		
				self.caretPos = i;
			},
		
			/**
			 * Disables user input on the control. Used while
			 * items are being asynchronously created.
			 */
			lock: function() {
				this.close();
				this.isLocked = true;
				this.refreshState();
			},
		
			/**
			 * Re-enables user input on the control.
			 */
			unlock: function() {
				this.isLocked = false;
				this.refreshState();
			},
		
			/**
			 * Disables user input on the control completely.
			 * While disabled, it cannot receive focus.
			 */
			disable: function() {
				var self = this;
				self.$input.prop('disabled', true);
				self.$control_input.prop('disabled', true).prop('tabindex', -1);
				self.isDisabled = true;
				self.lock();
			},
		
			/**
			 * Enables the control so that it can respond
			 * to focus and user input.
			 */
			enable: function() {
				var self = this;
				self.$input.prop('disabled', false);
				self.$control_input.prop('disabled', false).prop('tabindex', self.tabIndex);
				self.isDisabled = false;
				self.unlock();
			},
		
			/**
			 * Completely destroys the control and
			 * unbinds all event listeners so that it can
			 * be garbage collected.
			 */
			destroy: function() {
				var self = this;
				var eventNS = self.eventNS;
				var revertSettings = self.revertSettings;
		
				self.trigger('destroy');
				self.off();
				self.$wrapper.remove();
				self.$dropdown.remove();
		
				self.$input
					.html('')
					.append(revertSettings.$children)
					.removeAttr('tabindex')
					.removeClass('selectized')
					.attr({tabindex: revertSettings.tabindex})
					.show();
		
				self.$control_input.removeData('grow');
				self.$input.removeData('selectize');
		
				$(window).off(eventNS);
				$(document).off(eventNS);
				$(document.body).off(eventNS);
		
				delete self.$input[0].selectize;
			},
		
			/**
			 * A helper method for rendering "item" and
			 * "option" templates, given the data.
			 *
			 * @param {string} templateName
			 * @param {object} data
			 * @returns {string}
			 */
			render: function(templateName, data) {
				var value, id, label;
				var html = '';
				var cache = false;
				var self = this;
				var regex_tag = /^[\t \r\n]*<([a-z][a-z0-9\-_]*(?:\:[a-z][a-z0-9\-_]*)?)/i;
		
				if (templateName === 'option' || templateName === 'item') {
					value = hash_key(data[self.settings.valueField]);
					cache = !!value;
				}
		
				// pull markup from cache if it exists
				if (cache) {
					if (!isset(self.renderCache[templateName])) {
						self.renderCache[templateName] = {};
					}
					if (self.renderCache[templateName].hasOwnProperty(value)) {
						return self.renderCache[templateName][value];
					}
				}
		
				// render markup
				html = self.settings.render[templateName].apply(this, [data, escape_html]);
		
				// add mandatory attributes
				if (templateName === 'option' || templateName === 'option_create') {
					html = html.replace(regex_tag, '<$1 data-selectable');
				}
				if (templateName === 'optgroup') {
					id = data[self.settings.optgroupValueField] || '';
					html = html.replace(regex_tag, '<$1 data-group="' + escape_replace(escape_html(id)) + '"');
				}
				if (templateName === 'option' || templateName === 'item') {
					html = html.replace(regex_tag, '<$1 data-value="' + escape_replace(escape_html(value || '')) + '"');
				}
		
				// update cache
				if (cache) {
					self.renderCache[templateName][value] = html;
				}
		
				return html;
			},
		
			/**
			 * Clears the render cache for a template. If
			 * no template is given, clears all render
			 * caches.
			 *
			 * @param {string} templateName
			 */
			clearCache: function(templateName) {
				var self = this;
				if (typeof templateName === 'undefined') {
					self.renderCache = {};
				} else {
					delete self.renderCache[templateName];
				}
			},
		
			/**
			 * Determines whether or not to display the
			 * create item prompt, given a user input.
			 *
			 * @param {string} input
			 * @return {boolean}
			 */
			canCreate: function(input) {
				var self = this;
				if (!self.settings.create) return false;
				var filter = self.settings.createFilter;
				return input.length
					&& (typeof filter !== 'function' || filter.apply(self, [input]))
					&& (typeof filter !== 'string' || new RegExp(filter).test(input))
					&& (!(filter instanceof RegExp) || filter.test(input));
			}
		
		});
		
		
		Selectize.count = 0;
		Selectize.defaults = {
			options: [],
			optgroups: [],
		
			plugins: [],
			delimiter: ',',
			splitOn: null, // regexp or string for splitting up values from a paste command
			persist: true,
			diacritics: true,
			create: false,
			createOnBlur: false,
			createFilter: null,
			highlight: true,
			openOnFocus: true,
			maxOptions: 1000,
			maxItems: null,
			hideSelected: null,
			addPrecedence: false,
			selectOnTab: false,
			preload: false,
			allowEmptyOption: false,
			closeAfterSelect: false,
		
			scrollDuration: 60,
			loadThrottle: 300,
			loadingClass: 'loading',
		
			dataAttr: 'data-data',
			optgroupField: 'optgroup',
			valueField: 'value',
			labelField: 'text',
			optgroupLabelField: 'label',
			optgroupValueField: 'value',
			lockOptgroupOrder: false,
		
			sortField: '$order',
			searchField: ['text'],
			searchConjunction: 'and',
		
			mode: null,
			wrapperClass: 'selectize-control',
			inputClass: 'selectize-input',
			dropdownClass: 'selectize-dropdown',
			dropdownContentClass: 'selectize-dropdown-content',
		
			dropdownParent: null,
		
			copyClassesToDropdown: true,
		
			/*
			load                 : null, // function(query, callback) { ... }
			score                : null, // function(search) { ... }
			onInitialize         : null, // function() { ... }
			onChange             : null, // function(value) { ... }
			onItemAdd            : null, // function(value, $item) { ... }
			onItemRemove         : null, // function(value) { ... }
			onClear              : null, // function() { ... }
			onOptionAdd          : null, // function(value, data) { ... }
			onOptionRemove       : null, // function(value) { ... }
			onOptionClear        : null, // function() { ... }
			onOptionGroupAdd     : null, // function(id, data) { ... }
			onOptionGroupRemove  : null, // function(id) { ... }
			onOptionGroupClear   : null, // function() { ... }
			onDropdownOpen       : null, // function($dropdown) { ... }
			onDropdownClose      : null, // function($dropdown) { ... }
			onType               : null, // function(str) { ... }
			onDelete             : null, // function(values) { ... }
			*/
		
			render: {
				/*
				item: null,
				optgroup: null,
				optgroup_header: null,
				option: null,
				option_create: null
				*/
			}
		};
		
		
		$.fn.selectize = function(settings_user) {
			var defaults             = $.fn.selectize.defaults;
			var settings             = $.extend({}, defaults, settings_user);
			var attr_data            = settings.dataAttr;
			var field_label          = settings.labelField;
			var field_value          = settings.valueField;
			var field_optgroup       = settings.optgroupField;
			var field_optgroup_label = settings.optgroupLabelField;
			var field_optgroup_value = settings.optgroupValueField;
		
			/**
			 * Initializes selectize from a <input type="text"> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_textbox = function($input, settings_element) {
				var i, n, values, option;
		
				var data_raw = $input.attr(attr_data);
		
				if (!data_raw) {
					var value = $.trim($input.val() || '');
					if (!settings.allowEmptyOption && !value.length) return;
					values = value.split(settings.delimiter);
					for (i = 0, n = values.length; i < n; i++) {
						option = {};
						option[field_label] = values[i];
						option[field_value] = values[i];
						settings_element.options.push(option);
					}
					settings_element.items = values;
				} else {
					settings_element.options = JSON.parse(data_raw);
					for (i = 0, n = settings_element.options.length; i < n; i++) {
						settings_element.items.push(settings_element.options[i][field_value]);
					}
				}
			};
		
			/**
			 * Initializes selectize from a <select> element.
			 *
			 * @param {object} $input
			 * @param {object} settings_element
			 */
			var init_select = function($input, settings_element) {
				var i, n, tagName, $children, order = 0;
				var options = settings_element.options;
				var optionsMap = {};
		
				var readData = function($el) {
					var data = attr_data && $el.attr(attr_data);
					if (typeof data === 'string' && data.length) {
						return JSON.parse(data);
					}
					return null;
				};
		
				var addOption = function($option, group) {
					$option = $($option);
		
					var value = hash_key($option.attr('value'));
					if (!value && !settings.allowEmptyOption) return;
		
					// if the option already exists, it's probably been
					// duplicated in another optgroup. in this case, push
					// the current group to the "optgroup" property on the
					// existing option so that it's rendered in both places.
					if (optionsMap.hasOwnProperty(value)) {
						if (group) {
							var arr = optionsMap[value][field_optgroup];
							if (!arr) {
								optionsMap[value][field_optgroup] = group;
							} else if (!$.isArray(arr)) {
								optionsMap[value][field_optgroup] = [arr, group];
							} else {
								arr.push(group);
							}
						}
						return;
					}
		
					var option             = readData($option) || {};
					option[field_label]    = option[field_label] || $option.text();
					option[field_value]    = option[field_value] || value;
					option[field_optgroup] = option[field_optgroup] || group;
		
					optionsMap[value] = option;
					options.push(option);
		
					if ($option.is(':selected')) {
						settings_element.items.push(value);
					}
				};
		
				var addGroup = function($optgroup) {
					var i, n, id, optgroup, $options;
		
					$optgroup = $($optgroup);
					id = $optgroup.attr('label');
		
					if (id) {
						optgroup = readData($optgroup) || {};
						optgroup[field_optgroup_label] = id;
						optgroup[field_optgroup_value] = id;
						settings_element.optgroups.push(optgroup);
					}
		
					$options = $('option', $optgroup);
					for (i = 0, n = $options.length; i < n; i++) {
						addOption($options[i], id);
					}
				};
		
				settings_element.maxItems = $input.attr('multiple') ? null : 1;
		
				$children = $input.children();
				for (i = 0, n = $children.length; i < n; i++) {
					tagName = $children[i].tagName.toLowerCase();
					if (tagName === 'optgroup') {
						addGroup($children[i]);
					} else if (tagName === 'option') {
						addOption($children[i]);
					}
				}
			};
		
			return this.each(function() {
				if (this.selectize) return;
		
				var instance;
				var $input = $(this);
				var tag_name = this.tagName.toLowerCase();
				var placeholder = $input.attr('placeholder') || $input.attr('data-placeholder');
				if (!placeholder && !settings.allowEmptyOption) {
					placeholder = $input.children('option[value=""]').text();
				}
		
				var settings_element = {
					'placeholder' : placeholder,
					'options'     : [],
					'optgroups'   : [],
					'items'       : []
				};
		
				if (tag_name === 'select') {
					init_select($input, settings_element);
				} else {
					init_textbox($input, settings_element);
				}
		
				instance = new Selectize($input, $.extend(true, {}, defaults, settings_element, settings_user));
			});
		};
		
		$.fn.selectize.defaults = Selectize.defaults;
		$.fn.selectize.support = {
			validity: SUPPORTS_VALIDITY_API
		};
		
		
		Selectize.define('drag_drop', function(options) {
			if (!$.fn.sortable) throw new Error('The "drag_drop" plugin requires jQuery UI "sortable".');
			if (this.settings.mode !== 'multi') return;
			var self = this;
		
			self.lock = (function() {
				var original = self.lock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.disable();
					return original.apply(self, arguments);
				};
			})();
		
			self.unlock = (function() {
				var original = self.unlock;
				return function() {
					var sortable = self.$control.data('sortable');
					if (sortable) sortable.enable();
					return original.apply(self, arguments);
				};
			})();
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(this, arguments);
		
					var $control = self.$control.sortable({
						items: '[data-value]',
						forcePlaceholderSize: true,
						disabled: self.isLocked,
						start: function(e, ui) {
							ui.placeholder.css('width', ui.helper.css('width'));
							$control.css({overflow: 'visible'});
						},
						stop: function() {
							$control.css({overflow: 'hidden'});
							var active = self.$activeItems ? self.$activeItems.slice() : null;
							var values = [];
							$control.children('[data-value]').each(function() {
								values.push($(this).attr('data-value'));
							});
							self.setValue(values);
							self.setActiveItem(active);
						}
					});
				};
			})();
		
		});
		
		Selectize.define('dropdown_header', function(options) {
			var self = this;
		
			options = $.extend({
				title         : 'Untitled',
				headerClass   : 'selectize-dropdown-header',
				titleRowClass : 'selectize-dropdown-header-title',
				labelClass    : 'selectize-dropdown-header-label',
				closeClass    : 'selectize-dropdown-header-close',
		
				html: function(data) {
					return (
						'<div class="' + data.headerClass + '">' +
							'<div class="' + data.titleRowClass + '">' +
								'<span class="' + data.labelClass + '">' + data.title + '</span>' +
								'<a href="javascript:void(0)" class="' + data.closeClass + '">&times;</a>' +
							'</div>' +
						'</div>'
					);
				}
			}, options);
		
			self.setup = (function() {
				var original = self.setup;
				return function() {
					original.apply(self, arguments);
					self.$dropdown_header = $(options.html(options));
					self.$dropdown.prepend(self.$dropdown_header);
				};
			})();
		
		});
		
		Selectize.define('optgroup_columns', function(options) {
			var self = this;
		
			options = $.extend({
				equalizeWidth  : true,
				equalizeHeight : true
			}, options);
		
			this.getAdjacentOption = function($option, direction) {
				var $options = $option.closest('[data-group]').find('[data-selectable]');
				var index    = $options.index($option) + direction;
		
				return index >= 0 && index < $options.length ? $options.eq(index) : $();
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, $option, $options, $optgroup;
		
					if (this.isOpen && (e.keyCode === KEY_LEFT || e.keyCode === KEY_RIGHT)) {
						self.ignoreHover = true;
						$optgroup = this.$activeOption.closest('[data-group]');
						index = $optgroup.find('[data-selectable]').index(this.$activeOption);
		
						if(e.keyCode === KEY_LEFT) {
							$optgroup = $optgroup.prev('[data-group]');
						} else {
							$optgroup = $optgroup.next('[data-group]');
						}
		
						$options = $optgroup.find('[data-selectable]');
						$option  = $options.eq(Math.min($options.length - 1, index));
						if ($option.length) {
							this.setActiveOption($option);
						}
						return;
					}
		
					return original.apply(this, arguments);
				};
			})();
		
			var getScrollbarWidth = function() {
				var div;
				var width = getScrollbarWidth.width;
				var doc = document;
		
				if (typeof width === 'undefined') {
					div = doc.createElement('div');
					div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
					div = div.firstChild;
					doc.body.appendChild(div);
					width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
					doc.body.removeChild(div);
				}
				return width;
			};
		
			var equalizeSizes = function() {
				var i, n, height_max, width, width_last, width_parent, $optgroups;
		
				$optgroups = $('[data-group]', self.$dropdown_content);
				n = $optgroups.length;
				if (!n || !self.$dropdown_content.width()) return;
		
				if (options.equalizeHeight) {
					height_max = 0;
					for (i = 0; i < n; i++) {
						height_max = Math.max(height_max, $optgroups.eq(i).height());
					}
					$optgroups.css({height: height_max});
				}
		
				if (options.equalizeWidth) {
					width_parent = self.$dropdown_content.innerWidth() - getScrollbarWidth();
					width = Math.round(width_parent / n);
					$optgroups.css({width: width});
					if (n > 1) {
						width_last = width_parent - width * (n - 1);
						$optgroups.eq(n - 1).css({width: width_last});
					}
				}
			};
		
			if (options.equalizeHeight || options.equalizeWidth) {
				hook.after(this, 'positionDropdown', equalizeSizes);
				hook.after(this, 'refreshOptions', equalizeSizes);
			}
		
		
		});
		
		Selectize.define('remove_button', function(options) {
			if (this.settings.mode === 'single') return;
		
			options = $.extend({
				label     : '&times;',
				title     : 'Remove',
				className : 'remove',
				append    : true
			}, options);
		
			var self = this;
			var html = '<a href="javascript:void(0)" class="' + options.className + '" tabindex="-1" title="' + escape_html(options.title) + '">' + options.label + '</a>';
		
			/**
			 * Appends an element as a child (with raw HTML).
			 *
			 * @param {string} html_container
			 * @param {string} html_element
			 * @return {string}
			 */
			var append = function(html_container, html_element) {
				var pos = html_container.search(/(<\/[^>]+>\s*)$/);
				return html_container.substring(0, pos) + html_element + html_container.substring(pos);
			};
		
			this.setup = (function() {
				var original = self.setup;
				return function() {
					// override the item rendering method to add the button to each
					if (options.append) {
						var render_item = self.settings.render.item;
						self.settings.render.item = function(data) {
							return append(render_item.apply(this, arguments), html);
						};
					}
		
					original.apply(this, arguments);
		
					// add event listener
					this.$control.on('click', '.' + options.className, function(e) {
						e.preventDefault();
						if (self.isLocked) return;
		
						var $item = $(e.currentTarget).parent();
						self.setActiveItem($item);
						if (self.deleteSelection()) {
							self.setCaret(self.items.length);
						}
					});
		
				};
			})();
		
		});
		
		Selectize.define('restore_on_backspace', function(options) {
			var self = this;
		
			options.text = options.text || function(option) {
				return option[this.settings.labelField];
			};
		
			this.onKeyDown = (function() {
				var original = self.onKeyDown;
				return function(e) {
					var index, option;
					if (e.keyCode === KEY_BACKSPACE && this.$control_input.val() === '' && !this.$activeItems.length) {
						index = this.caretPos - 1;
						if (index >= 0 && index < this.items.length) {
							option = this.options[this.items[index]];
							if (this.deleteSelection(e)) {
								this.setTextboxValue(options.text.apply(this, [option]));
								this.refreshOptions(true);
							}
							e.preventDefault();
							return;
						}
					}
					return original.apply(this, arguments);
				};
			})();
		});
		

		return Selectize;
	}));

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function($) {/**
	 * sifter.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.Sifter = factory();
		}
	}(this, function() {

		/**
		 * Textually searches arrays and hashes of objects
		 * by property (or multiple properties). Designed
		 * specifically for autocomplete.
		 *
		 * @constructor
		 * @param {array|object} items
		 * @param {object} items
		 */
		var Sifter = function(items, settings) {
			this.items = items;
			this.settings = settings || {diacritics: true};
		};

		/**
		 * Splits a search string into an array of individual
		 * regexps to be used to match results.
		 *
		 * @param {string} query
		 * @returns {array}
		 */
		Sifter.prototype.tokenize = function(query) {
			query = trim(String(query || '').toLowerCase());
			if (!query || !query.length) return [];

			var i, n, regex, letter;
			var tokens = [];
			var words = query.split(/ +/);

			for (i = 0, n = words.length; i < n; i++) {
				regex = escape_regex(words[i]);
				if (this.settings.diacritics) {
					for (letter in DIACRITICS) {
						if (DIACRITICS.hasOwnProperty(letter)) {
							regex = regex.replace(new RegExp(letter, 'g'), DIACRITICS[letter]);
						}
					}
				}
				tokens.push({
					string : words[i],
					regex  : new RegExp(regex, 'i')
				});
			}

			return tokens;
		};

		/**
		 * Iterates over arrays and hashes.
		 *
		 * ```
		 * this.iterator(this.items, function(item, id) {
		 *    // invoked for each item
		 * });
		 * ```
		 *
		 * @param {array|object} object
		 */
		Sifter.prototype.iterator = function(object, callback) {
			var iterator;
			if (is_array(object)) {
				iterator = Array.prototype.forEach || function(callback) {
					for (var i = 0, n = this.length; i < n; i++) {
						callback(this[i], i, this);
					}
				};
			} else {
				iterator = function(callback) {
					for (var key in this) {
						if (this.hasOwnProperty(key)) {
							callback(this[key], key, this);
						}
					}
				};
			}

			iterator.apply(object, [callback]);
		};

		/**
		 * Returns a function to be used to score individual results.
		 *
		 * Good matches will have a higher score than poor matches.
		 * If an item is not a match, 0 will be returned by the function.
		 *
		 * @param {object|string} search
		 * @param {object} options (optional)
		 * @returns {function}
		 */
		Sifter.prototype.getScoreFunction = function(search, options) {
			var self, fields, tokens, token_count;

			self        = this;
			search      = self.prepareSearch(search, options);
			tokens      = search.tokens;
			fields      = search.options.fields;
			token_count = tokens.length;

			/**
			 * Calculates how close of a match the
			 * given value is against a search token.
			 *
			 * @param {mixed} value
			 * @param {object} token
			 * @return {number}
			 */
			var scoreValue = function(value, token) {
				var score, pos;

				if (!value) return 0;
				value = String(value || '');
				pos = value.search(token.regex);
				if (pos === -1) return 0;
				score = token.string.length / value.length;
				if (pos === 0) score += 0.5;
				return score;
			};

			/**
			 * Calculates the score of an object
			 * against the search query.
			 *
			 * @param {object} token
			 * @param {object} data
			 * @return {number}
			 */
			var scoreObject = (function() {
				var field_count = fields.length;
				if (!field_count) {
					return function() { return 0; };
				}
				if (field_count === 1) {
					return function(token, data) {
						return scoreValue(data[fields[0]], token);
					};
				}
				return function(token, data) {
					for (var i = 0, sum = 0; i < field_count; i++) {
						sum += scoreValue(data[fields[i]], token);
					}
					return sum / field_count;
				};
			})();

			if (!token_count) {
				return function() { return 0; };
			}
			if (token_count === 1) {
				return function(data) {
					return scoreObject(tokens[0], data);
				};
			}

			if (search.options.conjunction === 'and') {
				return function(data) {
					var score;
					for (var i = 0, sum = 0; i < token_count; i++) {
						score = scoreObject(tokens[i], data);
						if (score <= 0) return 0;
						sum += score;
					}
					return sum / token_count;
				};
			} else {
				return function(data) {
					for (var i = 0, sum = 0; i < token_count; i++) {
						sum += scoreObject(tokens[i], data);
					}
					return sum / token_count;
				};
			}
		};

		/**
		 * Returns a function that can be used to compare two
		 * results, for sorting purposes. If no sorting should
		 * be performed, `null` will be returned.
		 *
		 * @param {string|object} search
		 * @param {object} options
		 * @return function(a,b)
		 */
		Sifter.prototype.getSortFunction = function(search, options) {
			var i, n, self, field, fields, fields_count, multiplier, multipliers, get_field, implicit_score, sort;

			self   = this;
			search = self.prepareSearch(search, options);
			sort   = (!search.query && options.sort_empty) || options.sort;

			/**
			 * Fetches the specified sort field value
			 * from a search result item.
			 *
			 * @param  {string} name
			 * @param  {object} result
			 * @return {mixed}
			 */
			get_field = function(name, result) {
				if (name === '$score') return result.score;
				return self.items[result.id][name];
			};

			// parse options
			fields = [];
			if (sort) {
				for (i = 0, n = sort.length; i < n; i++) {
					if (search.query || sort[i].field !== '$score') {
						fields.push(sort[i]);
					}
				}
			}

			// the "$score" field is implied to be the primary
			// sort field, unless it's manually specified
			if (search.query) {
				implicit_score = true;
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						implicit_score = false;
						break;
					}
				}
				if (implicit_score) {
					fields.unshift({field: '$score', direction: 'desc'});
				}
			} else {
				for (i = 0, n = fields.length; i < n; i++) {
					if (fields[i].field === '$score') {
						fields.splice(i, 1);
						break;
					}
				}
			}

			multipliers = [];
			for (i = 0, n = fields.length; i < n; i++) {
				multipliers.push(fields[i].direction === 'desc' ? -1 : 1);
			}

			// build function
			fields_count = fields.length;
			if (!fields_count) {
				return null;
			} else if (fields_count === 1) {
				field = fields[0].field;
				multiplier = multipliers[0];
				return function(a, b) {
					return multiplier * cmp(
						get_field(field, a),
						get_field(field, b)
					);
				};
			} else {
				return function(a, b) {
					var i, result, a_value, b_value, field;
					for (i = 0; i < fields_count; i++) {
						field = fields[i].field;
						result = multipliers[i] * cmp(
							get_field(field, a),
							get_field(field, b)
						);
						if (result) return result;
					}
					return 0;
				};
			}
		};

		/**
		 * Parses a search query and returns an object
		 * with tokens and fields ready to be populated
		 * with results.
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.prepareSearch = function(query, options) {
			if (typeof query === 'object') return query;

			options = extend({}, options);

			var option_fields     = options.fields;
			var option_sort       = options.sort;
			var option_sort_empty = options.sort_empty;

			if (option_fields && !is_array(option_fields)) options.fields = [option_fields];
			if (option_sort && !is_array(option_sort)) options.sort = [option_sort];
			if (option_sort_empty && !is_array(option_sort_empty)) options.sort_empty = [option_sort_empty];

			return {
				options : options,
				query   : String(query || '').toLowerCase(),
				tokens  : this.tokenize(query),
				total   : 0,
				items   : []
			};
		};

		/**
		 * Searches through all items and returns a sorted array of matches.
		 *
		 * The `options` parameter can contain:
		 *
		 *   - fields {string|array}
		 *   - sort {array}
		 *   - score {function}
		 *   - filter {bool}
		 *   - limit {integer}
		 *
		 * Returns an object containing:
		 *
		 *   - options {object}
		 *   - query {string}
		 *   - tokens {array}
		 *   - total {int}
		 *   - items {array}
		 *
		 * @param {string} query
		 * @param {object} options
		 * @returns {object}
		 */
		Sifter.prototype.search = function(query, options) {
			var self = this, value, score, search, calculateScore;
			var fn_sort;
			var fn_score;

			search  = this.prepareSearch(query, options);
			options = search.options;
			query   = search.query;

			// generate result scoring function
			fn_score = options.score || self.getScoreFunction(search);

			// perform search and sort
			if (query.length) {
				self.iterator(self.items, function(item, id) {
					score = fn_score(item);
					if (options.filter === false || score > 0) {
						search.items.push({'score': score, 'id': id});
					}
				});
			} else {
				self.iterator(self.items, function(item, id) {
					search.items.push({'score': 1, 'id': id});
				});
			}

			fn_sort = self.getSortFunction(search, options);
			if (fn_sort) search.items.sort(fn_sort);

			// apply limits
			search.total = search.items.length;
			if (typeof options.limit === 'number') {
				search.items = search.items.slice(0, options.limit);
			}

			return search;
		};

		// utilities
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		var cmp = function(a, b) {
			if (typeof a === 'number' && typeof b === 'number') {
				return a > b ? 1 : (a < b ? -1 : 0);
			}
			a = asciifold(String(a || ''));
			b = asciifold(String(b || ''));
			if (a > b) return 1;
			if (b > a) return -1;
			return 0;
		};

		var extend = function(a, b) {
			var i, n, k, object;
			for (i = 1, n = arguments.length; i < n; i++) {
				object = arguments[i];
				if (!object) continue;
				for (k in object) {
					if (object.hasOwnProperty(k)) {
						a[k] = object[k];
					}
				}
			}
			return a;
		};

		var trim = function(str) {
			return (str + '').replace(/^\s+|\s+$|/g, '');
		};

		var escape_regex = function(str) {
			return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
		};

		var is_array = Array.isArray || (typeof $ !== 'undefined' && $.isArray) || function(object) {
			return Object.prototype.toString.call(object) === '[object Array]';
		};

		var DIACRITICS = {
			'a': '[aÀÁÂÃÄÅàáâãäåĀāąĄ]',
			'c': '[cÇçćĆčČ]',
			'd': '[dđĐďĎð]',
			'e': '[eÈÉÊËèéêëěĚĒēęĘ]',
			'i': '[iÌÍÎÏìíîïĪī]',
			'l': '[lłŁ]',
			'n': '[nÑñňŇńŃ]',
			'o': '[oÒÓÔÕÕÖØòóôõöøŌō]',
			'r': '[rřŘ]',
			's': '[sŠšśŚ]',
			't': '[tťŤ]',
			'u': '[uÙÚÛÜùúûüůŮŪū]',
			'y': '[yŸÿýÝ]',
			'z': '[zŽžżŻźŹ]'
		};

		var asciifold = (function() {
			var i, n, k, chunk;
			var foreignletters = '';
			var lookup = {};
			for (k in DIACRITICS) {
				if (DIACRITICS.hasOwnProperty(k)) {
					chunk = DIACRITICS[k].substring(2, DIACRITICS[k].length - 1);
					foreignletters += chunk;
					for (i = 0, n = chunk.length; i < n; i++) {
						lookup[chunk.charAt(i)] = k;
					}
				}
			}
			var regexp = new RegExp('[' +  foreignletters + ']', 'g');
			return function(str) {
				return str.replace(regexp, function(foreignletter) {
					return lookup[foreignletter];
				}).toLowerCase();
			};
		})();


		// export
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

		return Sifter;
	}));


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(19);

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * microplugin.js
	 * Copyright (c) 2013 Brian Reavis & contributors
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
	 * file except in compliance with the License. You may obtain a copy of the License at:
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software distributed under
	 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
	 * ANY KIND, either express or implied. See the License for the specific language
	 * governing permissions and limitations under the License.
	 *
	 * @author Brian Reavis <brian@thirdroute.com>
	 */

	(function(root, factory) {
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.MicroPlugin = factory();
		}
	}(this, function() {
		var MicroPlugin = {};

		MicroPlugin.mixin = function(Interface) {
			Interface.plugins = {};

			/**
			 * Initializes the listed plugins (with options).
			 * Acceptable formats:
			 *
			 * List (without options):
			 *   ['a', 'b', 'c']
			 *
			 * List (with options):
			 *   [{'name': 'a', options: {}}, {'name': 'b', options: {}}]
			 *
			 * Hash (with options):
			 *   {'a': { ... }, 'b': { ... }, 'c': { ... }}
			 *
			 * @param {mixed} plugins
			 */
			Interface.prototype.initializePlugins = function(plugins) {
				var i, n, key;
				var self  = this;
				var queue = [];

				self.plugins = {
					names     : [],
					settings  : {},
					requested : {},
					loaded    : {}
				};

				if (utils.isArray(plugins)) {
					for (i = 0, n = plugins.length; i < n; i++) {
						if (typeof plugins[i] === 'string') {
							queue.push(plugins[i]);
						} else {
							self.plugins.settings[plugins[i].name] = plugins[i].options;
							queue.push(plugins[i].name);
						}
					}
				} else if (plugins) {
					for (key in plugins) {
						if (plugins.hasOwnProperty(key)) {
							self.plugins.settings[key] = plugins[key];
							queue.push(key);
						}
					}
				}

				while (queue.length) {
					self.require(queue.shift());
				}
			};

			Interface.prototype.loadPlugin = function(name) {
				var self    = this;
				var plugins = self.plugins;
				var plugin  = Interface.plugins[name];

				if (!Interface.plugins.hasOwnProperty(name)) {
					throw new Error('Unable to find "' +  name + '" plugin');
				}

				plugins.requested[name] = true;
				plugins.loaded[name] = plugin.fn.apply(self, [self.plugins.settings[name] || {}]);
				plugins.names.push(name);
			};

			/**
			 * Initializes a plugin.
			 *
			 * @param {string} name
			 */
			Interface.prototype.require = function(name) {
				var self = this;
				var plugins = self.plugins;

				if (!self.plugins.loaded.hasOwnProperty(name)) {
					if (plugins.requested[name]) {
						throw new Error('Plugin has circular dependency ("' + name + '")');
					}
					self.loadPlugin(name);
				}

				return plugins.loaded[name];
			};

			/**
			 * Registers a plugin.
			 *
			 * @param {string} name
			 * @param {function} fn
			 */
			Interface.define = function(name, fn) {
				Interface.plugins[name] = {
					'name' : name,
					'fn'   : fn
				};
			};
		};

		var utils = {
			isArray: Array.isArray || function(vArg) {
				return Object.prototype.toString.call(vArg) === '[object Array]';
			}
		};

		return MicroPlugin;
	}));

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./app.scss", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./../../../../node_modules/sass-loader/index.js!./app.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, "a:hover {\n  text-decoration: none; }\n\n.clearbox {\n  clear: both; }\n\n.list-no-style {\n  list-style: none; }\n\n.btn-inverse {\n  background: #fff;\n  padding: 5px 8px;\n  font-weight: bold;\n  border: 1px solid #e5e5e5; }\n  .btn-inverse:hover {\n    color: #fff; }\n\n.btn-inverse.btn-primary {\n  color: #4183c4;\n  border-color: #4183c4; }\n\n.btn-inverse.btn-danger {\n  color: #d9534f;\n  border-color: #d43f3a; }\n\n.btn-inverse.btn-danger.disabled {\n  color: #D9534E;\n  background: #fff; }\n\n#glob > .container {\n  margin-top: 10px; }\n\n.navbar {\n  border-radius: 0;\n  padding-top: 2px;\n  padding-bottom: 2px; }\n\n.navbar .navbar-form .form-group {\n  margin-bottom: 0; }\n\n.navbar .navbar-form input {\n  height: 31px;\n  margin-top: 5px; }\n\n.subnav-links {\n  margin-bottom: 10px; }\n\n.panel .btn-primary {\n  margin-top: 10px; }\n\n.pagehead h1 {\n  margin-top: 0px; }\n\n.form-control {\n  width: 67%; }\n\n.form-login {\n  width: 500px;\n  margin: 60px auto; }\n\n.dashboard .btn.dropdown-toggle {\n  height: 38px;\n  border-left-width: 0px; }\n\n#dashboard-sidebar-menu li.active a {\n  background: #f5f5f5; }\n\n#dashboard-sidebar .card {\n  border-top: 0;\n  border-radius: 0; }\n\n.dashboard #dashboard-sidebar-menu .card-header h4 {\n  padding: 0; }\n\n.organization.team.show .org-name, .organization.show .org-name {\n  font-size: 20px; }\n\n.organization.team.show .list-item {\n  position: relative;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid #eee;\n  list-style: none; }\n  .organization.team.show .list-item img {\n    float: left; }\n  .organization.team.show .list-item .infos {\n    float: left;\n    margin-left: 10px; }\n\n.organization.show .head-orga img {\n  float: left; }\n\n.organization.show .head-orga h1 {\n  float: left;\n  margin-left: 10px; }\n\n.organization.show .option-orga {\n  margin-top: 35px; }\n\n.organization.show .orga-teams {\n  color: #333333;\n  font-weight: bold; }\n  .organization.show .orga-teams strong {\n    float: right; }\n\n.organization.show .repositories {\n  list-style: none;\n  padding-left: 0px; }\n  .organization.show .repositories li {\n    border-bottom: 1px solid #eee;\n    padding-top: 10px;\n    padding-bottom: 10px; }\n    .organization.show .repositories li h3 {\n      margin: 0; }\n\n.project.show .repo-head h1 {\n  margin-top: 10px; }\n\n.project .repo-meta {\n  padding: 20px 0 20px;\n  clear: both; }\n\n.project.show .overall {\n  clear: both;\n  border-radius: 3px;\n  border: 1px solid #ddd;\n  position: relative;\n  margin-bottom: 10px; }\n\n.project.show .overall li {\n  float: left; }\n\n.project.show #tree-content-holder,\n.project.tree #tree-content-holder,\n.project.blob #tree-content-holder,\n.project.commit #tree-content-holder {\n  clear: both;\n  border: 1px solid #eeeeee;\n  border-radius: 3px; }\n  .project.show #tree-content-holder .table,\n  .project.tree #tree-content-holder .table,\n  .project.blob #tree-content-holder .table,\n  .project.commit #tree-content-holder .table {\n    margin-bottom: 0; }\n  .project.show #tree-content-holder .table thead,\n  .project.tree #tree-content-holder .table thead,\n  .project.blob #tree-content-holder .table thead,\n  .project.commit #tree-content-holder .table thead {\n    display: none; }\n  .project.show #tree-content-holder .commit-head,\n  .project.tree #tree-content-holder .commit-head,\n  .project.blob #tree-content-holder .commit-head,\n  .project.commit #tree-content-holder .commit-head {\n    background: #e6f1f6;\n    padding: 10px; }\n  .project.show #tree-content-holder .commit-meta,\n  .project.tree #tree-content-holder .commit-meta,\n  .project.blob #tree-content-holder .commit-meta,\n  .project.commit #tree-content-holder .commit-meta {\n    padding: 10px; }\n    .project.show #tree-content-holder .commit-meta img,\n    .project.tree #tree-content-holder .commit-meta img,\n    .project.blob #tree-content-holder .commit-meta img,\n    .project.commit #tree-content-holder .commit-meta img {\n      border-radius: 3px; }\n\n.project.show #readme {\n  margin-top: 20px; }\n  .project.show #readme > h3 {\n    background-color: #f5f5f5;\n    margin: 0;\n    border-radius: 3px 3px 0 0;\n    border: 1px solid #d8d8d8;\n    border-bottom: 0;\n    padding: 9px 10px 10px;\n    font-size: 14px;\n    line-height: 17px; }\n  .project.show #readme .markdown-render {\n    background-color: #fff;\n    border: 1px solid #ddd;\n    border-bottom-left-radius: 3px;\n    border-bottom-right-radius: 3px;\n    padding: 30px;\n    word-wrap: break-word; }\n\n.project.show #repo-clone-url {\n  margin-top: 9px;\n  box-shadow: none;\n  border-right: 0px;\n  border-right-color: #fff;\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.project.show .head-orga img {\n  float: left;\n  margin-right: 30px; }\n\n.project.show .head-orga h1 {\n  display: table-cell;\n  vertical-align: middle;\n  width: 560px; }\n\n.project.show .option-orga {\n  margin-top: 30px;\n  padding-top: 30px;\n  border-bottom: 1px solid #eee;\n  border-top: 1px solid #eee;\n  clear: both; }\n\n.project.show .option-orga .control-label {\n  padding-top: 5px;\n  margin-right: 15px; }\n\n.project.show .repositories {\n  position: relative;\n  padding-top: 30px;\n  padding-bottom: 30px;\n  list-style: none;\n  border-bottom: 1px solid #eee; }\n\n.project.show .repositories li .description {\n  color: #666;\n  font-size: 14px; }\n\n.project.show .repositories li .last-updated {\n  color: #888;\n  font-size: 13px; }\n\n.project.show h1,\n.project.tree h1,\n.project.blob h1,\n.project.commit h1 {\n  margin-top: 0;\n  margin-bottom: 20px;\n  font-size: 20px;\n  font-weight: normal;\n  line-height: 28px; }\n\n.project.blob .file-box .file {\n  position: relative;\n  margin-top: 20px;\n  margin-bottom: 15px;\n  border: 1px solid #ddd;\n  border-radius: 3px; }\n\n.project.blob .file-box .file pre {\n  border: none; }\n\n.project.blog .file-box .line-number,\n.project.commit .file .line-number {\n  font-size: 12px;\n  line-height: 18px;\n  color: rgba(0, 0, 0, 0.3);\n  vertical-align: top;\n  text-align: right;\n  border: solid #eee;\n  border-width: 0 1px 0 0;\n  padding-left: 10px;\n  padding-right: 10px;\n  border-width: 0 1px 0 0; }\n\n.project.commit .file {\n  border: 1px solid #ddd;\n  border-radius: 3px;\n  margin-bottom: 20px; }\n  .project.commit .file pre {\n    border: none;\n    background: none; }\n\n.project.commit .file-changes {\n  position: relative;\n  margin-bottom: 15px; }\n\n.project.commit .file header {\n  padding: 5px 10px;\n  text-shadow: 0 1px 0 #fff;\n  border-bottom: 1px solid #d8d8d8;\n  background-color: #f7f7f7;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px; }\n  .project.commit .file header .diff-file-label {\n    line-height: 33px; }\n\n.project.commit .diff-summary {\n  margin-bottom: 20px;\n  padding: 0; }\n  .project.commit .diff-summary li input {\n    float: left;\n    margin-right: 10px; }\n  .project.commit .diff-summary li a {\n    float: left; }\n\n.project .breadcrumb {\n  clear: both; }\n\n.git-log {\n  width: 100%; }\n  .git-log th {\n    padding-bottom: 10px; }\n  .git-log td .message {\n    padding: 8px 10px;\n    border: 1px solid #e5e5e5;\n    border-radius: 3px; }\n\n.user.show .tab-content ul {\n  padding-left: 0; }\n\n.user.show .profile-info ul {\n  padding-left: 0; }\n\n.user.settings.ssh_keys .ssh-keys p {\n  padding: 15px; }\n\n.user.settings.ssh_keys .ssh-keys .panel-body {\n  padding: 0; }\n  .user.settings.ssh_keys .ssh-keys .panel-body ul {\n    padding: 0; }\n\n.user.settings.ssh_keys .list-keys li {\n  list-style: none;\n  border-top: 1px solid #ddd;\n  line-height: 18px;\n  padding: 15px; }\n", ""]);

	// exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	$('.autocomplete-field').selectize({
	    valueField: 'id',
	    labelField: 'name',
	    searchField: 'name',
	    maxItems: 1,
	    create: false,
	    render: {
	        option: function option(item, escape) {
	            return '<div>' + '<img width="20" height="20" class="avatar" src="' + escape(item.avatar) + '" />' + '<span class="username">' + escape(item.name) + '</span>' + '</div>';
	        }
	    },
	    load: function load(query, callback) {
	        if (!query.length) return callback();
	        $.ajax({
	            url: '/api/1/user/autocomplete?q=' + encodeURIComponent(query),
	            type: 'GET',
	            error: function error() {
	                callback();
	            },
	            success: function success(res) {
	                callback(res.data.slice(0, 10));
	            }
	        });
	    },
	    onChange: function onChange(value) {
	        $('.add-to-team').submit();
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }
/******/ ]);
