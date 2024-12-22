(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScaleRuler = factory());
})(this, (function () { 'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var es_array_concat = {};

  var globalThis_1;
  var hasRequiredGlobalThis;

  function requireGlobalThis () {
  	if (hasRequiredGlobalThis) return globalThis_1;
  	hasRequiredGlobalThis = 1;
  	var check = function (it) {
  	  return it && it.Math === Math && it;
  	};

  	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  	globalThis_1 =
  	  // eslint-disable-next-line es/no-global-this -- safe
  	  check(typeof globalThis == 'object' && globalThis) ||
  	  check(typeof window == 'object' && window) ||
  	  // eslint-disable-next-line no-restricted-globals -- safe
  	  check(typeof self == 'object' && self) ||
  	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  	  check(typeof globalThis_1 == 'object' && globalThis_1) ||
  	  // eslint-disable-next-line no-new-func -- fallback
  	  (function () { return this; })() || Function('return this')();
  	return globalThis_1;
  }

  var objectGetOwnPropertyDescriptor = {};

  var fails;
  var hasRequiredFails;

  function requireFails () {
  	if (hasRequiredFails) return fails;
  	hasRequiredFails = 1;
  	fails = function (exec) {
  	  try {
  	    return !!exec();
  	  } catch (error) {
  	    return true;
  	  }
  	};
  	return fails;
  }

  var descriptors;
  var hasRequiredDescriptors;

  function requireDescriptors () {
  	if (hasRequiredDescriptors) return descriptors;
  	hasRequiredDescriptors = 1;
  	var fails = requireFails();

  	// Detect IE8's incomplete defineProperty implementation
  	descriptors = !fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  	});
  	return descriptors;
  }

  var functionBindNative;
  var hasRequiredFunctionBindNative;

  function requireFunctionBindNative () {
  	if (hasRequiredFunctionBindNative) return functionBindNative;
  	hasRequiredFunctionBindNative = 1;
  	var fails = requireFails();

  	functionBindNative = !fails(function () {
  	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  	  var test = (function () { /* empty */ }).bind();
  	  // eslint-disable-next-line no-prototype-builtins -- safe
  	  return typeof test != 'function' || test.hasOwnProperty('prototype');
  	});
  	return functionBindNative;
  }

  var functionCall;
  var hasRequiredFunctionCall;

  function requireFunctionCall () {
  	if (hasRequiredFunctionCall) return functionCall;
  	hasRequiredFunctionCall = 1;
  	var NATIVE_BIND = requireFunctionBindNative();

  	var call = Function.prototype.call;

  	functionCall = NATIVE_BIND ? call.bind(call) : function () {
  	  return call.apply(call, arguments);
  	};
  	return functionCall;
  }

  var objectPropertyIsEnumerable = {};

  var hasRequiredObjectPropertyIsEnumerable;

  function requireObjectPropertyIsEnumerable () {
  	if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
  	hasRequiredObjectPropertyIsEnumerable = 1;
  	var $propertyIsEnumerable = {}.propertyIsEnumerable;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// Nashorn ~ JDK8 bug
  	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  	// `Object.prototype.propertyIsEnumerable` method implementation
  	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  	  var descriptor = getOwnPropertyDescriptor(this, V);
  	  return !!descriptor && descriptor.enumerable;
  	} : $propertyIsEnumerable;
  	return objectPropertyIsEnumerable;
  }

  var createPropertyDescriptor;
  var hasRequiredCreatePropertyDescriptor;

  function requireCreatePropertyDescriptor () {
  	if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
  	hasRequiredCreatePropertyDescriptor = 1;
  	createPropertyDescriptor = function (bitmap, value) {
  	  return {
  	    enumerable: !(bitmap & 1),
  	    configurable: !(bitmap & 2),
  	    writable: !(bitmap & 4),
  	    value: value
  	  };
  	};
  	return createPropertyDescriptor;
  }

  var functionUncurryThis;
  var hasRequiredFunctionUncurryThis;

  function requireFunctionUncurryThis () {
  	if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
  	hasRequiredFunctionUncurryThis = 1;
  	var NATIVE_BIND = requireFunctionBindNative();

  	var FunctionPrototype = Function.prototype;
  	var call = FunctionPrototype.call;
  	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

  	functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  	  return function () {
  	    return call.apply(fn, arguments);
  	  };
  	};
  	return functionUncurryThis;
  }

  var classofRaw;
  var hasRequiredClassofRaw;

  function requireClassofRaw () {
  	if (hasRequiredClassofRaw) return classofRaw;
  	hasRequiredClassofRaw = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	var toString = uncurryThis({}.toString);
  	var stringSlice = uncurryThis(''.slice);

  	classofRaw = function (it) {
  	  return stringSlice(toString(it), 8, -1);
  	};
  	return classofRaw;
  }

  var indexedObject;
  var hasRequiredIndexedObject;

  function requireIndexedObject () {
  	if (hasRequiredIndexedObject) return indexedObject;
  	hasRequiredIndexedObject = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var classof = requireClassofRaw();

  	var $Object = Object;
  	var split = uncurryThis(''.split);

  	// fallback for non-array-like ES3 and non-enumerable old V8 strings
  	indexedObject = fails(function () {
  	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  	  // eslint-disable-next-line no-prototype-builtins -- safe
  	  return !$Object('z').propertyIsEnumerable(0);
  	}) ? function (it) {
  	  return classof(it) === 'String' ? split(it, '') : $Object(it);
  	} : $Object;
  	return indexedObject;
  }

  var isNullOrUndefined;
  var hasRequiredIsNullOrUndefined;

  function requireIsNullOrUndefined () {
  	if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
  	hasRequiredIsNullOrUndefined = 1;
  	// we can't use just `it == null` since of `document.all` special case
  	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  	isNullOrUndefined = function (it) {
  	  return it === null || it === undefined;
  	};
  	return isNullOrUndefined;
  }

  var requireObjectCoercible;
  var hasRequiredRequireObjectCoercible;

  function requireRequireObjectCoercible () {
  	if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
  	hasRequiredRequireObjectCoercible = 1;
  	var isNullOrUndefined = requireIsNullOrUndefined();

  	var $TypeError = TypeError;

  	// `RequireObjectCoercible` abstract operation
  	// https://tc39.es/ecma262/#sec-requireobjectcoercible
  	requireObjectCoercible = function (it) {
  	  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  	  return it;
  	};
  	return requireObjectCoercible;
  }

  var toIndexedObject;
  var hasRequiredToIndexedObject;

  function requireToIndexedObject () {
  	if (hasRequiredToIndexedObject) return toIndexedObject;
  	hasRequiredToIndexedObject = 1;
  	// toObject with fallback for non-array-like ES3 strings
  	var IndexedObject = requireIndexedObject();
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	toIndexedObject = function (it) {
  	  return IndexedObject(requireObjectCoercible(it));
  	};
  	return toIndexedObject;
  }

  var isCallable;
  var hasRequiredIsCallable;

  function requireIsCallable () {
  	if (hasRequiredIsCallable) return isCallable;
  	hasRequiredIsCallable = 1;
  	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  	var documentAll = typeof document == 'object' && document.all;

  	// `IsCallable` abstract operation
  	// https://tc39.es/ecma262/#sec-iscallable
  	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  	isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  	  return typeof argument == 'function' || argument === documentAll;
  	} : function (argument) {
  	  return typeof argument == 'function';
  	};
  	return isCallable;
  }

  var isObject$1;
  var hasRequiredIsObject;

  function requireIsObject () {
  	if (hasRequiredIsObject) return isObject$1;
  	hasRequiredIsObject = 1;
  	var isCallable = requireIsCallable();

  	isObject$1 = function (it) {
  	  return typeof it == 'object' ? it !== null : isCallable(it);
  	};
  	return isObject$1;
  }

  var getBuiltIn;
  var hasRequiredGetBuiltIn;

  function requireGetBuiltIn () {
  	if (hasRequiredGetBuiltIn) return getBuiltIn;
  	hasRequiredGetBuiltIn = 1;
  	var globalThis = requireGlobalThis();
  	var isCallable = requireIsCallable();

  	var aFunction = function (argument) {
  	  return isCallable(argument) ? argument : undefined;
  	};

  	getBuiltIn = function (namespace, method) {
  	  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
  	};
  	return getBuiltIn;
  }

  var objectIsPrototypeOf;
  var hasRequiredObjectIsPrototypeOf;

  function requireObjectIsPrototypeOf () {
  	if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
  	hasRequiredObjectIsPrototypeOf = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
  	return objectIsPrototypeOf;
  }

  var environmentUserAgent;
  var hasRequiredEnvironmentUserAgent;

  function requireEnvironmentUserAgent () {
  	if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
  	hasRequiredEnvironmentUserAgent = 1;
  	var globalThis = requireGlobalThis();

  	var navigator = globalThis.navigator;
  	var userAgent = navigator && navigator.userAgent;

  	environmentUserAgent = userAgent ? String(userAgent) : '';
  	return environmentUserAgent;
  }

  var environmentV8Version;
  var hasRequiredEnvironmentV8Version;

  function requireEnvironmentV8Version () {
  	if (hasRequiredEnvironmentV8Version) return environmentV8Version;
  	hasRequiredEnvironmentV8Version = 1;
  	var globalThis = requireGlobalThis();
  	var userAgent = requireEnvironmentUserAgent();

  	var process = globalThis.process;
  	var Deno = globalThis.Deno;
  	var versions = process && process.versions || Deno && Deno.version;
  	var v8 = versions && versions.v8;
  	var match, version;

  	if (v8) {
  	  match = v8.split('.');
  	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  	  // but their correct versions are not interesting for us
  	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  	}

  	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  	// so check `userAgent` even if `.v8` exists, but 0
  	if (!version && userAgent) {
  	  match = userAgent.match(/Edge\/(\d+)/);
  	  if (!match || match[1] >= 74) {
  	    match = userAgent.match(/Chrome\/(\d+)/);
  	    if (match) version = +match[1];
  	  }
  	}

  	environmentV8Version = version;
  	return environmentV8Version;
  }

  var symbolConstructorDetection;
  var hasRequiredSymbolConstructorDetection;

  function requireSymbolConstructorDetection () {
  	if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
  	hasRequiredSymbolConstructorDetection = 1;
  	/* eslint-disable es/no-symbol -- required for testing */
  	var V8_VERSION = requireEnvironmentV8Version();
  	var fails = requireFails();
  	var globalThis = requireGlobalThis();

  	var $String = globalThis.String;

  	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  	symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
  	  var symbol = Symbol('symbol detection');
  	  // Chrome 38 Symbol has incorrect toString conversion
  	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  	  // of course, fail.
  	  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
  	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  	});
  	return symbolConstructorDetection;
  }

  var useSymbolAsUid;
  var hasRequiredUseSymbolAsUid;

  function requireUseSymbolAsUid () {
  	if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
  	hasRequiredUseSymbolAsUid = 1;
  	/* eslint-disable es/no-symbol -- required for testing */
  	var NATIVE_SYMBOL = requireSymbolConstructorDetection();

  	useSymbolAsUid = NATIVE_SYMBOL &&
  	  !Symbol.sham &&
  	  typeof Symbol.iterator == 'symbol';
  	return useSymbolAsUid;
  }

  var isSymbol;
  var hasRequiredIsSymbol;

  function requireIsSymbol () {
  	if (hasRequiredIsSymbol) return isSymbol;
  	hasRequiredIsSymbol = 1;
  	var getBuiltIn = requireGetBuiltIn();
  	var isCallable = requireIsCallable();
  	var isPrototypeOf = requireObjectIsPrototypeOf();
  	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  	var $Object = Object;

  	isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  	  return typeof it == 'symbol';
  	} : function (it) {
  	  var $Symbol = getBuiltIn('Symbol');
  	  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
  	};
  	return isSymbol;
  }

  var tryToString;
  var hasRequiredTryToString;

  function requireTryToString () {
  	if (hasRequiredTryToString) return tryToString;
  	hasRequiredTryToString = 1;
  	var $String = String;

  	tryToString = function (argument) {
  	  try {
  	    return $String(argument);
  	  } catch (error) {
  	    return 'Object';
  	  }
  	};
  	return tryToString;
  }

  var aCallable;
  var hasRequiredACallable;

  function requireACallable () {
  	if (hasRequiredACallable) return aCallable;
  	hasRequiredACallable = 1;
  	var isCallable = requireIsCallable();
  	var tryToString = requireTryToString();

  	var $TypeError = TypeError;

  	// `Assert: IsCallable(argument) is true`
  	aCallable = function (argument) {
  	  if (isCallable(argument)) return argument;
  	  throw new $TypeError(tryToString(argument) + ' is not a function');
  	};
  	return aCallable;
  }

  var getMethod;
  var hasRequiredGetMethod;

  function requireGetMethod () {
  	if (hasRequiredGetMethod) return getMethod;
  	hasRequiredGetMethod = 1;
  	var aCallable = requireACallable();
  	var isNullOrUndefined = requireIsNullOrUndefined();

  	// `GetMethod` abstract operation
  	// https://tc39.es/ecma262/#sec-getmethod
  	getMethod = function (V, P) {
  	  var func = V[P];
  	  return isNullOrUndefined(func) ? undefined : aCallable(func);
  	};
  	return getMethod;
  }

  var ordinaryToPrimitive;
  var hasRequiredOrdinaryToPrimitive;

  function requireOrdinaryToPrimitive () {
  	if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
  	hasRequiredOrdinaryToPrimitive = 1;
  	var call = requireFunctionCall();
  	var isCallable = requireIsCallable();
  	var isObject = requireIsObject();

  	var $TypeError = TypeError;

  	// `OrdinaryToPrimitive` abstract operation
  	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
  	ordinaryToPrimitive = function (input, pref) {
  	  var fn, val;
  	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  	  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  	  throw new $TypeError("Can't convert object to primitive value");
  	};
  	return ordinaryToPrimitive;
  }

  var sharedStore = {exports: {}};

  var isPure;
  var hasRequiredIsPure;

  function requireIsPure () {
  	if (hasRequiredIsPure) return isPure;
  	hasRequiredIsPure = 1;
  	isPure = false;
  	return isPure;
  }

  var defineGlobalProperty;
  var hasRequiredDefineGlobalProperty;

  function requireDefineGlobalProperty () {
  	if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
  	hasRequiredDefineGlobalProperty = 1;
  	var globalThis = requireGlobalThis();

  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var defineProperty = Object.defineProperty;

  	defineGlobalProperty = function (key, value) {
  	  try {
  	    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  	  } catch (error) {
  	    globalThis[key] = value;
  	  } return value;
  	};
  	return defineGlobalProperty;
  }

  var hasRequiredSharedStore;

  function requireSharedStore () {
  	if (hasRequiredSharedStore) return sharedStore.exports;
  	hasRequiredSharedStore = 1;
  	var IS_PURE = requireIsPure();
  	var globalThis = requireGlobalThis();
  	var defineGlobalProperty = requireDefineGlobalProperty();

  	var SHARED = '__core-js_shared__';
  	var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

  	(store.versions || (store.versions = [])).push({
  	  version: '3.39.0',
  	  mode: IS_PURE ? 'pure' : 'global',
  	  copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
  	  license: 'https://github.com/zloirock/core-js/blob/v3.39.0/LICENSE',
  	  source: 'https://github.com/zloirock/core-js'
  	});
  	return sharedStore.exports;
  }

  var shared;
  var hasRequiredShared;

  function requireShared () {
  	if (hasRequiredShared) return shared;
  	hasRequiredShared = 1;
  	var store = requireSharedStore();

  	shared = function (key, value) {
  	  return store[key] || (store[key] = value || {});
  	};
  	return shared;
  }

  var toObject;
  var hasRequiredToObject;

  function requireToObject () {
  	if (hasRequiredToObject) return toObject;
  	hasRequiredToObject = 1;
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	var $Object = Object;

  	// `ToObject` abstract operation
  	// https://tc39.es/ecma262/#sec-toobject
  	toObject = function (argument) {
  	  return $Object(requireObjectCoercible(argument));
  	};
  	return toObject;
  }

  var hasOwnProperty_1;
  var hasRequiredHasOwnProperty;

  function requireHasOwnProperty () {
  	if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
  	hasRequiredHasOwnProperty = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var toObject = requireToObject();

  	var hasOwnProperty = uncurryThis({}.hasOwnProperty);

  	// `HasOwnProperty` abstract operation
  	// https://tc39.es/ecma262/#sec-hasownproperty
  	// eslint-disable-next-line es/no-object-hasown -- safe
  	hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  	  return hasOwnProperty(toObject(it), key);
  	};
  	return hasOwnProperty_1;
  }

  var uid;
  var hasRequiredUid;

  function requireUid () {
  	if (hasRequiredUid) return uid;
  	hasRequiredUid = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	var id = 0;
  	var postfix = Math.random();
  	var toString = uncurryThis(1.0.toString);

  	uid = function (key) {
  	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  	};
  	return uid;
  }

  var wellKnownSymbol;
  var hasRequiredWellKnownSymbol;

  function requireWellKnownSymbol () {
  	if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
  	hasRequiredWellKnownSymbol = 1;
  	var globalThis = requireGlobalThis();
  	var shared = requireShared();
  	var hasOwn = requireHasOwnProperty();
  	var uid = requireUid();
  	var NATIVE_SYMBOL = requireSymbolConstructorDetection();
  	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  	var Symbol = globalThis.Symbol;
  	var WellKnownSymbolsStore = shared('wks');
  	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

  	wellKnownSymbol = function (name) {
  	  if (!hasOwn(WellKnownSymbolsStore, name)) {
  	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
  	      ? Symbol[name]
  	      : createWellKnownSymbol('Symbol.' + name);
  	  } return WellKnownSymbolsStore[name];
  	};
  	return wellKnownSymbol;
  }

  var toPrimitive;
  var hasRequiredToPrimitive;

  function requireToPrimitive () {
  	if (hasRequiredToPrimitive) return toPrimitive;
  	hasRequiredToPrimitive = 1;
  	var call = requireFunctionCall();
  	var isObject = requireIsObject();
  	var isSymbol = requireIsSymbol();
  	var getMethod = requireGetMethod();
  	var ordinaryToPrimitive = requireOrdinaryToPrimitive();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var $TypeError = TypeError;
  	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  	// `ToPrimitive` abstract operation
  	// https://tc39.es/ecma262/#sec-toprimitive
  	toPrimitive = function (input, pref) {
  	  if (!isObject(input) || isSymbol(input)) return input;
  	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  	  var result;
  	  if (exoticToPrim) {
  	    if (pref === undefined) pref = 'default';
  	    result = call(exoticToPrim, input, pref);
  	    if (!isObject(result) || isSymbol(result)) return result;
  	    throw new $TypeError("Can't convert object to primitive value");
  	  }
  	  if (pref === undefined) pref = 'number';
  	  return ordinaryToPrimitive(input, pref);
  	};
  	return toPrimitive;
  }

  var toPropertyKey;
  var hasRequiredToPropertyKey;

  function requireToPropertyKey () {
  	if (hasRequiredToPropertyKey) return toPropertyKey;
  	hasRequiredToPropertyKey = 1;
  	var toPrimitive = requireToPrimitive();
  	var isSymbol = requireIsSymbol();

  	// `ToPropertyKey` abstract operation
  	// https://tc39.es/ecma262/#sec-topropertykey
  	toPropertyKey = function (argument) {
  	  var key = toPrimitive(argument, 'string');
  	  return isSymbol(key) ? key : key + '';
  	};
  	return toPropertyKey;
  }

  var documentCreateElement;
  var hasRequiredDocumentCreateElement;

  function requireDocumentCreateElement () {
  	if (hasRequiredDocumentCreateElement) return documentCreateElement;
  	hasRequiredDocumentCreateElement = 1;
  	var globalThis = requireGlobalThis();
  	var isObject = requireIsObject();

  	var document = globalThis.document;
  	// typeof document.createElement is 'object' in old IE
  	var EXISTS = isObject(document) && isObject(document.createElement);

  	documentCreateElement = function (it) {
  	  return EXISTS ? document.createElement(it) : {};
  	};
  	return documentCreateElement;
  }

  var ie8DomDefine;
  var hasRequiredIe8DomDefine;

  function requireIe8DomDefine () {
  	if (hasRequiredIe8DomDefine) return ie8DomDefine;
  	hasRequiredIe8DomDefine = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var fails = requireFails();
  	var createElement = requireDocumentCreateElement();

  	// Thanks to IE8 for its funny defineProperty
  	ie8DomDefine = !DESCRIPTORS && !fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty(createElement('div'), 'a', {
  	    get: function () { return 7; }
  	  }).a !== 7;
  	});
  	return ie8DomDefine;
  }

  var hasRequiredObjectGetOwnPropertyDescriptor;

  function requireObjectGetOwnPropertyDescriptor () {
  	if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
  	hasRequiredObjectGetOwnPropertyDescriptor = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var call = requireFunctionCall();
  	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();
  	var toIndexedObject = requireToIndexedObject();
  	var toPropertyKey = requireToPropertyKey();
  	var hasOwn = requireHasOwnProperty();
  	var IE8_DOM_DEFINE = requireIe8DomDefine();

  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// `Object.getOwnPropertyDescriptor` method
  	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  	  O = toIndexedObject(O);
  	  P = toPropertyKey(P);
  	  if (IE8_DOM_DEFINE) try {
  	    return $getOwnPropertyDescriptor(O, P);
  	  } catch (error) { /* empty */ }
  	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
  	};
  	return objectGetOwnPropertyDescriptor;
  }

  var objectDefineProperty = {};

  var v8PrototypeDefineBug;
  var hasRequiredV8PrototypeDefineBug;

  function requireV8PrototypeDefineBug () {
  	if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
  	hasRequiredV8PrototypeDefineBug = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var fails = requireFails();

  	// V8 ~ Chrome 36-
  	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
  	v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
  	    value: 42,
  	    writable: false
  	  }).prototype !== 42;
  	});
  	return v8PrototypeDefineBug;
  }

  var anObject;
  var hasRequiredAnObject;

  function requireAnObject () {
  	if (hasRequiredAnObject) return anObject;
  	hasRequiredAnObject = 1;
  	var isObject = requireIsObject();

  	var $String = String;
  	var $TypeError = TypeError;

  	// `Assert: Type(argument) is Object`
  	anObject = function (argument) {
  	  if (isObject(argument)) return argument;
  	  throw new $TypeError($String(argument) + ' is not an object');
  	};
  	return anObject;
  }

  var hasRequiredObjectDefineProperty;

  function requireObjectDefineProperty () {
  	if (hasRequiredObjectDefineProperty) return objectDefineProperty;
  	hasRequiredObjectDefineProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var IE8_DOM_DEFINE = requireIe8DomDefine();
  	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
  	var anObject = requireAnObject();
  	var toPropertyKey = requireToPropertyKey();

  	var $TypeError = TypeError;
  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var $defineProperty = Object.defineProperty;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  	var ENUMERABLE = 'enumerable';
  	var CONFIGURABLE = 'configurable';
  	var WRITABLE = 'writable';

  	// `Object.defineProperty` method
  	// https://tc39.es/ecma262/#sec-object.defineproperty
  	objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  	  anObject(O);
  	  P = toPropertyKey(P);
  	  anObject(Attributes);
  	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
  	    var current = $getOwnPropertyDescriptor(O, P);
  	    if (current && current[WRITABLE]) {
  	      O[P] = Attributes.value;
  	      Attributes = {
  	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
  	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
  	        writable: false
  	      };
  	    }
  	  } return $defineProperty(O, P, Attributes);
  	} : $defineProperty : function defineProperty(O, P, Attributes) {
  	  anObject(O);
  	  P = toPropertyKey(P);
  	  anObject(Attributes);
  	  if (IE8_DOM_DEFINE) try {
  	    return $defineProperty(O, P, Attributes);
  	  } catch (error) { /* empty */ }
  	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  	  if ('value' in Attributes) O[P] = Attributes.value;
  	  return O;
  	};
  	return objectDefineProperty;
  }

  var createNonEnumerableProperty;
  var hasRequiredCreateNonEnumerableProperty;

  function requireCreateNonEnumerableProperty () {
  	if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
  	hasRequiredCreateNonEnumerableProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var definePropertyModule = requireObjectDefineProperty();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();

  	createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
  	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
  	} : function (object, key, value) {
  	  object[key] = value;
  	  return object;
  	};
  	return createNonEnumerableProperty;
  }

  var makeBuiltIn = {exports: {}};

  var functionName;
  var hasRequiredFunctionName;

  function requireFunctionName () {
  	if (hasRequiredFunctionName) return functionName;
  	hasRequiredFunctionName = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var hasOwn = requireHasOwnProperty();

  	var FunctionPrototype = Function.prototype;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

  	var EXISTS = hasOwn(FunctionPrototype, 'name');
  	// additional protection from minified / mangled / dropped function names
  	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

  	functionName = {
  	  EXISTS: EXISTS,
  	  PROPER: PROPER,
  	  CONFIGURABLE: CONFIGURABLE
  	};
  	return functionName;
  }

  var inspectSource;
  var hasRequiredInspectSource;

  function requireInspectSource () {
  	if (hasRequiredInspectSource) return inspectSource;
  	hasRequiredInspectSource = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var isCallable = requireIsCallable();
  	var store = requireSharedStore();

  	var functionToString = uncurryThis(Function.toString);

  	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  	if (!isCallable(store.inspectSource)) {
  	  store.inspectSource = function (it) {
  	    return functionToString(it);
  	  };
  	}

  	inspectSource = store.inspectSource;
  	return inspectSource;
  }

  var weakMapBasicDetection;
  var hasRequiredWeakMapBasicDetection;

  function requireWeakMapBasicDetection () {
  	if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
  	hasRequiredWeakMapBasicDetection = 1;
  	var globalThis = requireGlobalThis();
  	var isCallable = requireIsCallable();

  	var WeakMap = globalThis.WeakMap;

  	weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
  	return weakMapBasicDetection;
  }

  var sharedKey;
  var hasRequiredSharedKey;

  function requireSharedKey () {
  	if (hasRequiredSharedKey) return sharedKey;
  	hasRequiredSharedKey = 1;
  	var shared = requireShared();
  	var uid = requireUid();

  	var keys = shared('keys');

  	sharedKey = function (key) {
  	  return keys[key] || (keys[key] = uid(key));
  	};
  	return sharedKey;
  }

  var hiddenKeys;
  var hasRequiredHiddenKeys;

  function requireHiddenKeys () {
  	if (hasRequiredHiddenKeys) return hiddenKeys;
  	hasRequiredHiddenKeys = 1;
  	hiddenKeys = {};
  	return hiddenKeys;
  }

  var internalState;
  var hasRequiredInternalState;

  function requireInternalState () {
  	if (hasRequiredInternalState) return internalState;
  	hasRequiredInternalState = 1;
  	var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
  	var globalThis = requireGlobalThis();
  	var isObject = requireIsObject();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var hasOwn = requireHasOwnProperty();
  	var shared = requireSharedStore();
  	var sharedKey = requireSharedKey();
  	var hiddenKeys = requireHiddenKeys();

  	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  	var TypeError = globalThis.TypeError;
  	var WeakMap = globalThis.WeakMap;
  	var set, get, has;

  	var enforce = function (it) {
  	  return has(it) ? get(it) : set(it, {});
  	};

  	var getterFor = function (TYPE) {
  	  return function (it) {
  	    var state;
  	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
  	      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
  	    } return state;
  	  };
  	};

  	if (NATIVE_WEAK_MAP || shared.state) {
  	  var store = shared.state || (shared.state = new WeakMap());
  	  /* eslint-disable no-self-assign -- prototype methods protection */
  	  store.get = store.get;
  	  store.has = store.has;
  	  store.set = store.set;
  	  /* eslint-enable no-self-assign -- prototype methods protection */
  	  set = function (it, metadata) {
  	    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  	    metadata.facade = it;
  	    store.set(it, metadata);
  	    return metadata;
  	  };
  	  get = function (it) {
  	    return store.get(it) || {};
  	  };
  	  has = function (it) {
  	    return store.has(it);
  	  };
  	} else {
  	  var STATE = sharedKey('state');
  	  hiddenKeys[STATE] = true;
  	  set = function (it, metadata) {
  	    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  	    metadata.facade = it;
  	    createNonEnumerableProperty(it, STATE, metadata);
  	    return metadata;
  	  };
  	  get = function (it) {
  	    return hasOwn(it, STATE) ? it[STATE] : {};
  	  };
  	  has = function (it) {
  	    return hasOwn(it, STATE);
  	  };
  	}

  	internalState = {
  	  set: set,
  	  get: get,
  	  has: has,
  	  enforce: enforce,
  	  getterFor: getterFor
  	};
  	return internalState;
  }

  var hasRequiredMakeBuiltIn;

  function requireMakeBuiltIn () {
  	if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
  	hasRequiredMakeBuiltIn = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var isCallable = requireIsCallable();
  	var hasOwn = requireHasOwnProperty();
  	var DESCRIPTORS = requireDescriptors();
  	var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
  	var inspectSource = requireInspectSource();
  	var InternalStateModule = requireInternalState();

  	var enforceInternalState = InternalStateModule.enforce;
  	var getInternalState = InternalStateModule.get;
  	var $String = String;
  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var defineProperty = Object.defineProperty;
  	var stringSlice = uncurryThis(''.slice);
  	var replace = uncurryThis(''.replace);
  	var join = uncurryThis([].join);

  	var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  	});

  	var TEMPLATE = String(String).split('String');

  	var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
  	  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
  	    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  	  }
  	  if (options && options.getter) name = 'get ' + name;
  	  if (options && options.setter) name = 'set ' + name;
  	  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
  	    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
  	    else value.name = name;
  	  }
  	  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
  	    defineProperty(value, 'length', { value: options.arity });
  	  }
  	  try {
  	    if (options && hasOwn(options, 'constructor') && options.constructor) {
  	      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
  	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
  	    } else if (value.prototype) value.prototype = undefined;
  	  } catch (error) { /* empty */ }
  	  var state = enforceInternalState(value);
  	  if (!hasOwn(state, 'source')) {
  	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  	  } return value;
  	};

  	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  	// eslint-disable-next-line no-extend-native -- required
  	Function.prototype.toString = makeBuiltIn$1(function toString() {
  	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
  	}, 'toString');
  	return makeBuiltIn.exports;
  }

  var defineBuiltIn;
  var hasRequiredDefineBuiltIn;

  function requireDefineBuiltIn () {
  	if (hasRequiredDefineBuiltIn) return defineBuiltIn;
  	hasRequiredDefineBuiltIn = 1;
  	var isCallable = requireIsCallable();
  	var definePropertyModule = requireObjectDefineProperty();
  	var makeBuiltIn = requireMakeBuiltIn();
  	var defineGlobalProperty = requireDefineGlobalProperty();

  	defineBuiltIn = function (O, key, value, options) {
  	  if (!options) options = {};
  	  var simple = options.enumerable;
  	  var name = options.name !== undefined ? options.name : key;
  	  if (isCallable(value)) makeBuiltIn(value, name, options);
  	  if (options.global) {
  	    if (simple) O[key] = value;
  	    else defineGlobalProperty(key, value);
  	  } else {
  	    try {
  	      if (!options.unsafe) delete O[key];
  	      else if (O[key]) simple = true;
  	    } catch (error) { /* empty */ }
  	    if (simple) O[key] = value;
  	    else definePropertyModule.f(O, key, {
  	      value: value,
  	      enumerable: false,
  	      configurable: !options.nonConfigurable,
  	      writable: !options.nonWritable
  	    });
  	  } return O;
  	};
  	return defineBuiltIn;
  }

  var objectGetOwnPropertyNames = {};

  var mathTrunc;
  var hasRequiredMathTrunc;

  function requireMathTrunc () {
  	if (hasRequiredMathTrunc) return mathTrunc;
  	hasRequiredMathTrunc = 1;
  	var ceil = Math.ceil;
  	var floor = Math.floor;

  	// `Math.trunc` method
  	// https://tc39.es/ecma262/#sec-math.trunc
  	// eslint-disable-next-line es/no-math-trunc -- safe
  	mathTrunc = Math.trunc || function trunc(x) {
  	  var n = +x;
  	  return (n > 0 ? floor : ceil)(n);
  	};
  	return mathTrunc;
  }

  var toIntegerOrInfinity;
  var hasRequiredToIntegerOrInfinity;

  function requireToIntegerOrInfinity () {
  	if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
  	hasRequiredToIntegerOrInfinity = 1;
  	var trunc = requireMathTrunc();

  	// `ToIntegerOrInfinity` abstract operation
  	// https://tc39.es/ecma262/#sec-tointegerorinfinity
  	toIntegerOrInfinity = function (argument) {
  	  var number = +argument;
  	  // eslint-disable-next-line no-self-compare -- NaN check
  	  return number !== number || number === 0 ? 0 : trunc(number);
  	};
  	return toIntegerOrInfinity;
  }

  var toAbsoluteIndex;
  var hasRequiredToAbsoluteIndex;

  function requireToAbsoluteIndex () {
  	if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
  	hasRequiredToAbsoluteIndex = 1;
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();

  	var max = Math.max;
  	var min = Math.min;

  	// Helper for a popular repeating case of the spec:
  	// Let integer be ? ToInteger(index).
  	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  	toAbsoluteIndex = function (index, length) {
  	  var integer = toIntegerOrInfinity(index);
  	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
  	};
  	return toAbsoluteIndex;
  }

  var toLength;
  var hasRequiredToLength;

  function requireToLength () {
  	if (hasRequiredToLength) return toLength;
  	hasRequiredToLength = 1;
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();

  	var min = Math.min;

  	// `ToLength` abstract operation
  	// https://tc39.es/ecma262/#sec-tolength
  	toLength = function (argument) {
  	  var len = toIntegerOrInfinity(argument);
  	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  	};
  	return toLength;
  }

  var lengthOfArrayLike;
  var hasRequiredLengthOfArrayLike;

  function requireLengthOfArrayLike () {
  	if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
  	hasRequiredLengthOfArrayLike = 1;
  	var toLength = requireToLength();

  	// `LengthOfArrayLike` abstract operation
  	// https://tc39.es/ecma262/#sec-lengthofarraylike
  	lengthOfArrayLike = function (obj) {
  	  return toLength(obj.length);
  	};
  	return lengthOfArrayLike;
  }

  var arrayIncludes;
  var hasRequiredArrayIncludes;

  function requireArrayIncludes () {
  	if (hasRequiredArrayIncludes) return arrayIncludes;
  	hasRequiredArrayIncludes = 1;
  	var toIndexedObject = requireToIndexedObject();
  	var toAbsoluteIndex = requireToAbsoluteIndex();
  	var lengthOfArrayLike = requireLengthOfArrayLike();

  	// `Array.prototype.{ indexOf, includes }` methods implementation
  	var createMethod = function (IS_INCLUDES) {
  	  return function ($this, el, fromIndex) {
  	    var O = toIndexedObject($this);
  	    var length = lengthOfArrayLike(O);
  	    if (length === 0) return !IS_INCLUDES && -1;
  	    var index = toAbsoluteIndex(fromIndex, length);
  	    var value;
  	    // Array#includes uses SameValueZero equality algorithm
  	    // eslint-disable-next-line no-self-compare -- NaN check
  	    if (IS_INCLUDES && el !== el) while (length > index) {
  	      value = O[index++];
  	      // eslint-disable-next-line no-self-compare -- NaN check
  	      if (value !== value) return true;
  	    // Array#indexOf ignores holes, Array#includes - not
  	    } else for (;length > index; index++) {
  	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
  	    } return !IS_INCLUDES && -1;
  	  };
  	};

  	arrayIncludes = {
  	  // `Array.prototype.includes` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.includes
  	  includes: createMethod(true),
  	  // `Array.prototype.indexOf` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  	  indexOf: createMethod(false)
  	};
  	return arrayIncludes;
  }

  var objectKeysInternal;
  var hasRequiredObjectKeysInternal;

  function requireObjectKeysInternal () {
  	if (hasRequiredObjectKeysInternal) return objectKeysInternal;
  	hasRequiredObjectKeysInternal = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var hasOwn = requireHasOwnProperty();
  	var toIndexedObject = requireToIndexedObject();
  	var indexOf = requireArrayIncludes().indexOf;
  	var hiddenKeys = requireHiddenKeys();

  	var push = uncurryThis([].push);

  	objectKeysInternal = function (object, names) {
  	  var O = toIndexedObject(object);
  	  var i = 0;
  	  var result = [];
  	  var key;
  	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  	  // Don't enum bug & hidden keys
  	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
  	    ~indexOf(result, key) || push(result, key);
  	  }
  	  return result;
  	};
  	return objectKeysInternal;
  }

  var enumBugKeys;
  var hasRequiredEnumBugKeys;

  function requireEnumBugKeys () {
  	if (hasRequiredEnumBugKeys) return enumBugKeys;
  	hasRequiredEnumBugKeys = 1;
  	// IE8- don't enum bug keys
  	enumBugKeys = [
  	  'constructor',
  	  'hasOwnProperty',
  	  'isPrototypeOf',
  	  'propertyIsEnumerable',
  	  'toLocaleString',
  	  'toString',
  	  'valueOf'
  	];
  	return enumBugKeys;
  }

  var hasRequiredObjectGetOwnPropertyNames;

  function requireObjectGetOwnPropertyNames () {
  	if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
  	hasRequiredObjectGetOwnPropertyNames = 1;
  	var internalObjectKeys = requireObjectKeysInternal();
  	var enumBugKeys = requireEnumBugKeys();

  	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  	// `Object.getOwnPropertyNames` method
  	// https://tc39.es/ecma262/#sec-object.getownpropertynames
  	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
  	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  	  return internalObjectKeys(O, hiddenKeys);
  	};
  	return objectGetOwnPropertyNames;
  }

  var objectGetOwnPropertySymbols = {};

  var hasRequiredObjectGetOwnPropertySymbols;

  function requireObjectGetOwnPropertySymbols () {
  	if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
  	hasRequiredObjectGetOwnPropertySymbols = 1;
  	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  	return objectGetOwnPropertySymbols;
  }

  var ownKeys;
  var hasRequiredOwnKeys;

  function requireOwnKeys () {
  	if (hasRequiredOwnKeys) return ownKeys;
  	hasRequiredOwnKeys = 1;
  	var getBuiltIn = requireGetBuiltIn();
  	var uncurryThis = requireFunctionUncurryThis();
  	var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
  	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
  	var anObject = requireAnObject();

  	var concat = uncurryThis([].concat);

  	// all object keys, includes non-enumerable and symbols
  	ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  	  var keys = getOwnPropertyNamesModule.f(anObject(it));
  	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  	};
  	return ownKeys;
  }

  var copyConstructorProperties;
  var hasRequiredCopyConstructorProperties;

  function requireCopyConstructorProperties () {
  	if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
  	hasRequiredCopyConstructorProperties = 1;
  	var hasOwn = requireHasOwnProperty();
  	var ownKeys = requireOwnKeys();
  	var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
  	var definePropertyModule = requireObjectDefineProperty();

  	copyConstructorProperties = function (target, source, exceptions) {
  	  var keys = ownKeys(source);
  	  var defineProperty = definePropertyModule.f;
  	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  	  for (var i = 0; i < keys.length; i++) {
  	    var key = keys[i];
  	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
  	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  	    }
  	  }
  	};
  	return copyConstructorProperties;
  }

  var isForced_1;
  var hasRequiredIsForced;

  function requireIsForced () {
  	if (hasRequiredIsForced) return isForced_1;
  	hasRequiredIsForced = 1;
  	var fails = requireFails();
  	var isCallable = requireIsCallable();

  	var replacement = /#|\.prototype\./;

  	var isForced = function (feature, detection) {
  	  var value = data[normalize(feature)];
  	  return value === POLYFILL ? true
  	    : value === NATIVE ? false
  	    : isCallable(detection) ? fails(detection)
  	    : !!detection;
  	};

  	var normalize = isForced.normalize = function (string) {
  	  return String(string).replace(replacement, '.').toLowerCase();
  	};

  	var data = isForced.data = {};
  	var NATIVE = isForced.NATIVE = 'N';
  	var POLYFILL = isForced.POLYFILL = 'P';

  	isForced_1 = isForced;
  	return isForced_1;
  }

  var _export;
  var hasRequired_export;

  function require_export () {
  	if (hasRequired_export) return _export;
  	hasRequired_export = 1;
  	var globalThis = requireGlobalThis();
  	var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var defineGlobalProperty = requireDefineGlobalProperty();
  	var copyConstructorProperties = requireCopyConstructorProperties();
  	var isForced = requireIsForced();

  	/*
  	  options.target         - name of the target object
  	  options.global         - target is the global object
  	  options.stat           - export as static methods of target
  	  options.proto          - export as prototype methods of target
  	  options.real           - real prototype method for the `pure` version
  	  options.forced         - export even if the native feature is available
  	  options.bind           - bind methods to the target, required for the `pure` version
  	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  	  options.sham           - add a flag to not completely full polyfills
  	  options.enumerable     - export as enumerable property
  	  options.dontCallGetSet - prevent calling a getter on target
  	  options.name           - the .name of the function if it does not match the key
  	*/
  	_export = function (options, source) {
  	  var TARGET = options.target;
  	  var GLOBAL = options.global;
  	  var STATIC = options.stat;
  	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  	  if (GLOBAL) {
  	    target = globalThis;
  	  } else if (STATIC) {
  	    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  	  } else {
  	    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  	  }
  	  if (target) for (key in source) {
  	    sourceProperty = source[key];
  	    if (options.dontCallGetSet) {
  	      descriptor = getOwnPropertyDescriptor(target, key);
  	      targetProperty = descriptor && descriptor.value;
  	    } else targetProperty = target[key];
  	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
  	    // contained in target
  	    if (!FORCED && targetProperty !== undefined) {
  	      if (typeof sourceProperty == typeof targetProperty) continue;
  	      copyConstructorProperties(sourceProperty, targetProperty);
  	    }
  	    // add a flag to not completely full polyfills
  	    if (options.sham || (targetProperty && targetProperty.sham)) {
  	      createNonEnumerableProperty(sourceProperty, 'sham', true);
  	    }
  	    defineBuiltIn(target, key, sourceProperty, options);
  	  }
  	};
  	return _export;
  }

  var isArray;
  var hasRequiredIsArray;

  function requireIsArray () {
  	if (hasRequiredIsArray) return isArray;
  	hasRequiredIsArray = 1;
  	var classof = requireClassofRaw();

  	// `IsArray` abstract operation
  	// https://tc39.es/ecma262/#sec-isarray
  	// eslint-disable-next-line es/no-array-isarray -- safe
  	isArray = Array.isArray || function isArray(argument) {
  	  return classof(argument) === 'Array';
  	};
  	return isArray;
  }

  var doesNotExceedSafeInteger;
  var hasRequiredDoesNotExceedSafeInteger;

  function requireDoesNotExceedSafeInteger () {
  	if (hasRequiredDoesNotExceedSafeInteger) return doesNotExceedSafeInteger;
  	hasRequiredDoesNotExceedSafeInteger = 1;
  	var $TypeError = TypeError;
  	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

  	doesNotExceedSafeInteger = function (it) {
  	  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  	  return it;
  	};
  	return doesNotExceedSafeInteger;
  }

  var createProperty;
  var hasRequiredCreateProperty;

  function requireCreateProperty () {
  	if (hasRequiredCreateProperty) return createProperty;
  	hasRequiredCreateProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var definePropertyModule = requireObjectDefineProperty();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();

  	createProperty = function (object, key, value) {
  	  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  	  else object[key] = value;
  	};
  	return createProperty;
  }

  var toStringTagSupport;
  var hasRequiredToStringTagSupport;

  function requireToStringTagSupport () {
  	if (hasRequiredToStringTagSupport) return toStringTagSupport;
  	hasRequiredToStringTagSupport = 1;
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  	var test = {};

  	test[TO_STRING_TAG] = 'z';

  	toStringTagSupport = String(test) === '[object z]';
  	return toStringTagSupport;
  }

  var classof;
  var hasRequiredClassof;

  function requireClassof () {
  	if (hasRequiredClassof) return classof;
  	hasRequiredClassof = 1;
  	var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  	var isCallable = requireIsCallable();
  	var classofRaw = requireClassofRaw();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  	var $Object = Object;

  	// ES3 wrong here
  	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

  	// fallback for IE11 Script Access Denied error
  	var tryGet = function (it, key) {
  	  try {
  	    return it[key];
  	  } catch (error) { /* empty */ }
  	};

  	// getting tag from ES6+ `Object.prototype.toString`
  	classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  	  var O, tag, result;
  	  return it === undefined ? 'Undefined' : it === null ? 'Null'
  	    // @@toStringTag case
  	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
  	    // builtinTag case
  	    : CORRECT_ARGUMENTS ? classofRaw(O)
  	    // ES3 arguments fallback
  	    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  	};
  	return classof;
  }

  var isConstructor;
  var hasRequiredIsConstructor;

  function requireIsConstructor () {
  	if (hasRequiredIsConstructor) return isConstructor;
  	hasRequiredIsConstructor = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var isCallable = requireIsCallable();
  	var classof = requireClassof();
  	var getBuiltIn = requireGetBuiltIn();
  	var inspectSource = requireInspectSource();

  	var noop = function () { /* empty */ };
  	var construct = getBuiltIn('Reflect', 'construct');
  	var constructorRegExp = /^\s*(?:class|function)\b/;
  	var exec = uncurryThis(constructorRegExp.exec);
  	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  	var isConstructorModern = function isConstructor(argument) {
  	  if (!isCallable(argument)) return false;
  	  try {
  	    construct(noop, [], argument);
  	    return true;
  	  } catch (error) {
  	    return false;
  	  }
  	};

  	var isConstructorLegacy = function isConstructor(argument) {
  	  if (!isCallable(argument)) return false;
  	  switch (classof(argument)) {
  	    case 'AsyncFunction':
  	    case 'GeneratorFunction':
  	    case 'AsyncGeneratorFunction': return false;
  	  }
  	  try {
  	    // we can't check .prototype since constructors produced by .bind haven't it
  	    // `Function#toString` throws on some built-it function in some legacy engines
  	    // (for example, `DOMQuad` and similar in FF41-)
  	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  	  } catch (error) {
  	    return true;
  	  }
  	};

  	isConstructorLegacy.sham = true;

  	// `IsConstructor` abstract operation
  	// https://tc39.es/ecma262/#sec-isconstructor
  	isConstructor = !construct || fails(function () {
  	  var called;
  	  return isConstructorModern(isConstructorModern.call)
  	    || !isConstructorModern(Object)
  	    || !isConstructorModern(function () { called = true; })
  	    || called;
  	}) ? isConstructorLegacy : isConstructorModern;
  	return isConstructor;
  }

  var arraySpeciesConstructor;
  var hasRequiredArraySpeciesConstructor;

  function requireArraySpeciesConstructor () {
  	if (hasRequiredArraySpeciesConstructor) return arraySpeciesConstructor;
  	hasRequiredArraySpeciesConstructor = 1;
  	var isArray = requireIsArray();
  	var isConstructor = requireIsConstructor();
  	var isObject = requireIsObject();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var SPECIES = wellKnownSymbol('species');
  	var $Array = Array;

  	// a part of `ArraySpeciesCreate` abstract operation
  	// https://tc39.es/ecma262/#sec-arrayspeciescreate
  	arraySpeciesConstructor = function (originalArray) {
  	  var C;
  	  if (isArray(originalArray)) {
  	    C = originalArray.constructor;
  	    // cross-realm fallback
  	    if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined;
  	    else if (isObject(C)) {
  	      C = C[SPECIES];
  	      if (C === null) C = undefined;
  	    }
  	  } return C === undefined ? $Array : C;
  	};
  	return arraySpeciesConstructor;
  }

  var arraySpeciesCreate;
  var hasRequiredArraySpeciesCreate;

  function requireArraySpeciesCreate () {
  	if (hasRequiredArraySpeciesCreate) return arraySpeciesCreate;
  	hasRequiredArraySpeciesCreate = 1;
  	var arraySpeciesConstructor = requireArraySpeciesConstructor();

  	// `ArraySpeciesCreate` abstract operation
  	// https://tc39.es/ecma262/#sec-arrayspeciescreate
  	arraySpeciesCreate = function (originalArray, length) {
  	  return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length);
  	};
  	return arraySpeciesCreate;
  }

  var arrayMethodHasSpeciesSupport;
  var hasRequiredArrayMethodHasSpeciesSupport;

  function requireArrayMethodHasSpeciesSupport () {
  	if (hasRequiredArrayMethodHasSpeciesSupport) return arrayMethodHasSpeciesSupport;
  	hasRequiredArrayMethodHasSpeciesSupport = 1;
  	var fails = requireFails();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var V8_VERSION = requireEnvironmentV8Version();

  	var SPECIES = wellKnownSymbol('species');

  	arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  	  // We can't use this feature detection in V8 since it causes
  	  // deoptimization and serious performance degradation
  	  // https://github.com/zloirock/core-js/issues/677
  	  return V8_VERSION >= 51 || !fails(function () {
  	    var array = [];
  	    var constructor = array.constructor = {};
  	    constructor[SPECIES] = function () {
  	      return { foo: 1 };
  	    };
  	    return array[METHOD_NAME](Boolean).foo !== 1;
  	  });
  	};
  	return arrayMethodHasSpeciesSupport;
  }

  var hasRequiredEs_array_concat;

  function requireEs_array_concat () {
  	if (hasRequiredEs_array_concat) return es_array_concat;
  	hasRequiredEs_array_concat = 1;
  	var $ = require_export();
  	var fails = requireFails();
  	var isArray = requireIsArray();
  	var isObject = requireIsObject();
  	var toObject = requireToObject();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
  	var createProperty = requireCreateProperty();
  	var arraySpeciesCreate = requireArraySpeciesCreate();
  	var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var V8_VERSION = requireEnvironmentV8Version();

  	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');

  	// We can't use this feature detection in V8 since it causes
  	// deoptimization and serious performance degradation
  	// https://github.com/zloirock/core-js/issues/679
  	var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  	  var array = [];
  	  array[IS_CONCAT_SPREADABLE] = false;
  	  return array.concat()[0] !== array;
  	});

  	var isConcatSpreadable = function (O) {
  	  if (!isObject(O)) return false;
  	  var spreadable = O[IS_CONCAT_SPREADABLE];
  	  return spreadable !== undefined ? !!spreadable : isArray(O);
  	};

  	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat');

  	// `Array.prototype.concat` method
  	// https://tc39.es/ecma262/#sec-array.prototype.concat
  	// with adding support of @@isConcatSpreadable and @@species
  	$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  	  // eslint-disable-next-line no-unused-vars -- required for `.length`
  	  concat: function concat(arg) {
  	    var O = toObject(this);
  	    var A = arraySpeciesCreate(O, 0);
  	    var n = 0;
  	    var i, k, length, len, E;
  	    for (i = -1, length = arguments.length; i < length; i++) {
  	      E = i === -1 ? O : arguments[i];
  	      if (isConcatSpreadable(E)) {
  	        len = lengthOfArrayLike(E);
  	        doesNotExceedSafeInteger(n + len);
  	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
  	      } else {
  	        doesNotExceedSafeInteger(n + 1);
  	        createProperty(A, n++, E);
  	      }
  	    }
  	    A.length = n;
  	    return A;
  	  }
  	});
  	return es_array_concat;
  }

  requireEs_array_concat();

  var es_array_indexOf = {};

  var functionUncurryThisClause;
  var hasRequiredFunctionUncurryThisClause;

  function requireFunctionUncurryThisClause () {
  	if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
  	hasRequiredFunctionUncurryThisClause = 1;
  	var classofRaw = requireClassofRaw();
  	var uncurryThis = requireFunctionUncurryThis();

  	functionUncurryThisClause = function (fn) {
  	  // Nashorn bug:
  	  //   https://github.com/zloirock/core-js/issues/1128
  	  //   https://github.com/zloirock/core-js/issues/1130
  	  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
  	};
  	return functionUncurryThisClause;
  }

  var arrayMethodIsStrict;
  var hasRequiredArrayMethodIsStrict;

  function requireArrayMethodIsStrict () {
  	if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
  	hasRequiredArrayMethodIsStrict = 1;
  	var fails = requireFails();

  	arrayMethodIsStrict = function (METHOD_NAME, argument) {
  	  var method = [][METHOD_NAME];
  	  return !!method && fails(function () {
  	    // eslint-disable-next-line no-useless-call -- required for testing
  	    method.call(null, argument || function () { return 1; }, 1);
  	  });
  	};
  	return arrayMethodIsStrict;
  }

  var hasRequiredEs_array_indexOf;

  function requireEs_array_indexOf () {
  	if (hasRequiredEs_array_indexOf) return es_array_indexOf;
  	hasRequiredEs_array_indexOf = 1;
  	/* eslint-disable es/no-array-prototype-indexof -- required for testing */
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThisClause();
  	var $indexOf = requireArrayIncludes().indexOf;
  	var arrayMethodIsStrict = requireArrayMethodIsStrict();

  	var nativeIndexOf = uncurryThis([].indexOf);

  	var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0;
  	var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf');

  	// `Array.prototype.indexOf` method
  	// https://tc39.es/ecma262/#sec-array.prototype.indexof
  	$({ target: 'Array', proto: true, forced: FORCED }, {
  	  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
  	    var fromIndex = arguments.length > 1 ? arguments[1] : undefined;
  	    return NEGATIVE_ZERO
  	      // convert -0 to +0
  	      ? nativeIndexOf(this, searchElement, fromIndex) || 0
  	      : $indexOf(this, searchElement, fromIndex);
  	  }
  	});
  	return es_array_indexOf;
  }

  requireEs_array_indexOf();

  var es_array_sort = {};

  var deletePropertyOrThrow;
  var hasRequiredDeletePropertyOrThrow;

  function requireDeletePropertyOrThrow () {
  	if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
  	hasRequiredDeletePropertyOrThrow = 1;
  	var tryToString = requireTryToString();

  	var $TypeError = TypeError;

  	deletePropertyOrThrow = function (O, P) {
  	  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  	};
  	return deletePropertyOrThrow;
  }

  var toString;
  var hasRequiredToString;

  function requireToString () {
  	if (hasRequiredToString) return toString;
  	hasRequiredToString = 1;
  	var classof = requireClassof();

  	var $String = String;

  	toString = function (argument) {
  	  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  	  return $String(argument);
  	};
  	return toString;
  }

  var arraySlice;
  var hasRequiredArraySlice;

  function requireArraySlice () {
  	if (hasRequiredArraySlice) return arraySlice;
  	hasRequiredArraySlice = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	arraySlice = uncurryThis([].slice);
  	return arraySlice;
  }

  var arraySort;
  var hasRequiredArraySort;

  function requireArraySort () {
  	if (hasRequiredArraySort) return arraySort;
  	hasRequiredArraySort = 1;
  	var arraySlice = requireArraySlice();

  	var floor = Math.floor;

  	var sort = function (array, comparefn) {
  	  var length = array.length;

  	  if (length < 8) {
  	    // insertion sort
  	    var i = 1;
  	    var element, j;

  	    while (i < length) {
  	      j = i;
  	      element = array[i];
  	      while (j && comparefn(array[j - 1], element) > 0) {
  	        array[j] = array[--j];
  	      }
  	      if (j !== i++) array[j] = element;
  	    }
  	  } else {
  	    // merge sort
  	    var middle = floor(length / 2);
  	    var left = sort(arraySlice(array, 0, middle), comparefn);
  	    var right = sort(arraySlice(array, middle), comparefn);
  	    var llength = left.length;
  	    var rlength = right.length;
  	    var lindex = 0;
  	    var rindex = 0;

  	    while (lindex < llength || rindex < rlength) {
  	      array[lindex + rindex] = (lindex < llength && rindex < rlength)
  	        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
  	        : lindex < llength ? left[lindex++] : right[rindex++];
  	    }
  	  }

  	  return array;
  	};

  	arraySort = sort;
  	return arraySort;
  }

  var environmentFfVersion;
  var hasRequiredEnvironmentFfVersion;

  function requireEnvironmentFfVersion () {
  	if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
  	hasRequiredEnvironmentFfVersion = 1;
  	var userAgent = requireEnvironmentUserAgent();

  	var firefox = userAgent.match(/firefox\/(\d+)/i);

  	environmentFfVersion = !!firefox && +firefox[1];
  	return environmentFfVersion;
  }

  var environmentIsIeOrEdge;
  var hasRequiredEnvironmentIsIeOrEdge;

  function requireEnvironmentIsIeOrEdge () {
  	if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
  	hasRequiredEnvironmentIsIeOrEdge = 1;
  	var UA = requireEnvironmentUserAgent();

  	environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
  	return environmentIsIeOrEdge;
  }

  var environmentWebkitVersion;
  var hasRequiredEnvironmentWebkitVersion;

  function requireEnvironmentWebkitVersion () {
  	if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
  	hasRequiredEnvironmentWebkitVersion = 1;
  	var userAgent = requireEnvironmentUserAgent();

  	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

  	environmentWebkitVersion = !!webkit && +webkit[1];
  	return environmentWebkitVersion;
  }

  var hasRequiredEs_array_sort;

  function requireEs_array_sort () {
  	if (hasRequiredEs_array_sort) return es_array_sort;
  	hasRequiredEs_array_sort = 1;
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThis();
  	var aCallable = requireACallable();
  	var toObject = requireToObject();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var deletePropertyOrThrow = requireDeletePropertyOrThrow();
  	var toString = requireToString();
  	var fails = requireFails();
  	var internalSort = requireArraySort();
  	var arrayMethodIsStrict = requireArrayMethodIsStrict();
  	var FF = requireEnvironmentFfVersion();
  	var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
  	var V8 = requireEnvironmentV8Version();
  	var WEBKIT = requireEnvironmentWebkitVersion();

  	var test = [];
  	var nativeSort = uncurryThis(test.sort);
  	var push = uncurryThis(test.push);

  	// IE8-
  	var FAILS_ON_UNDEFINED = fails(function () {
  	  test.sort(undefined);
  	});
  	// V8 bug
  	var FAILS_ON_NULL = fails(function () {
  	  test.sort(null);
  	});
  	// Old WebKit
  	var STRICT_METHOD = arrayMethodIsStrict('sort');

  	var STABLE_SORT = !fails(function () {
  	  // feature detection can be too slow, so check engines versions
  	  if (V8) return V8 < 70;
  	  if (FF && FF > 3) return;
  	  if (IE_OR_EDGE) return true;
  	  if (WEBKIT) return WEBKIT < 603;

  	  var result = '';
  	  var code, chr, value, index;

  	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  	  for (code = 65; code < 76; code++) {
  	    chr = String.fromCharCode(code);

  	    switch (code) {
  	      case 66: case 69: case 70: case 72: value = 3; break;
  	      case 68: case 71: value = 4; break;
  	      default: value = 2;
  	    }

  	    for (index = 0; index < 47; index++) {
  	      test.push({ k: chr + index, v: value });
  	    }
  	  }

  	  test.sort(function (a, b) { return b.v - a.v; });

  	  for (index = 0; index < test.length; index++) {
  	    chr = test[index].k.charAt(0);
  	    if (result.charAt(result.length - 1) !== chr) result += chr;
  	  }

  	  return result !== 'DGBEFHACIJK';
  	});

  	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

  	var getSortCompare = function (comparefn) {
  	  return function (x, y) {
  	    if (y === undefined) return -1;
  	    if (x === undefined) return 1;
  	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
  	    return toString(x) > toString(y) ? 1 : -1;
  	  };
  	};

  	// `Array.prototype.sort` method
  	// https://tc39.es/ecma262/#sec-array.prototype.sort
  	$({ target: 'Array', proto: true, forced: FORCED }, {
  	  sort: function sort(comparefn) {
  	    if (comparefn !== undefined) aCallable(comparefn);

  	    var array = toObject(this);

  	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

  	    var items = [];
  	    var arrayLength = lengthOfArrayLike(array);
  	    var itemsLength, index;

  	    for (index = 0; index < arrayLength; index++) {
  	      if (index in array) push(items, array[index]);
  	    }

  	    internalSort(items, getSortCompare(comparefn));

  	    itemsLength = lengthOfArrayLike(items);
  	    index = 0;

  	    while (index < itemsLength) array[index] = items[index++];
  	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

  	    return array;
  	  }
  	});
  	return es_array_sort;
  }

  requireEs_array_sort();

  var es_array_splice = {};

  var arraySetLength;
  var hasRequiredArraySetLength;

  function requireArraySetLength () {
  	if (hasRequiredArraySetLength) return arraySetLength;
  	hasRequiredArraySetLength = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var isArray = requireIsArray();

  	var $TypeError = TypeError;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// Safari < 13 does not throw an error in this case
  	var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  	  // makes no sense without proper strict mode support
  	  if (this !== undefined) return true;
  	  try {
  	    // eslint-disable-next-line es/no-object-defineproperty -- safe
  	    Object.defineProperty([], 'length', { writable: false }).length = 1;
  	  } catch (error) {
  	    return error instanceof TypeError;
  	  }
  	}();

  	arraySetLength = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  	  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
  	    throw new $TypeError('Cannot set read only .length');
  	  } return O.length = length;
  	} : function (O, length) {
  	  return O.length = length;
  	};
  	return arraySetLength;
  }

  var hasRequiredEs_array_splice;

  function requireEs_array_splice () {
  	if (hasRequiredEs_array_splice) return es_array_splice;
  	hasRequiredEs_array_splice = 1;
  	var $ = require_export();
  	var toObject = requireToObject();
  	var toAbsoluteIndex = requireToAbsoluteIndex();
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var setArrayLength = requireArraySetLength();
  	var doesNotExceedSafeInteger = requireDoesNotExceedSafeInteger();
  	var arraySpeciesCreate = requireArraySpeciesCreate();
  	var createProperty = requireCreateProperty();
  	var deletePropertyOrThrow = requireDeletePropertyOrThrow();
  	var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();

  	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice');

  	var max = Math.max;
  	var min = Math.min;

  	// `Array.prototype.splice` method
  	// https://tc39.es/ecma262/#sec-array.prototype.splice
  	// with adding support of @@species
  	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  	  splice: function splice(start, deleteCount /* , ...items */) {
  	    var O = toObject(this);
  	    var len = lengthOfArrayLike(O);
  	    var actualStart = toAbsoluteIndex(start, len);
  	    var argumentsLength = arguments.length;
  	    var insertCount, actualDeleteCount, A, k, from, to;
  	    if (argumentsLength === 0) {
  	      insertCount = actualDeleteCount = 0;
  	    } else if (argumentsLength === 1) {
  	      insertCount = 0;
  	      actualDeleteCount = len - actualStart;
  	    } else {
  	      insertCount = argumentsLength - 2;
  	      actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart);
  	    }
  	    doesNotExceedSafeInteger(len + insertCount - actualDeleteCount);
  	    A = arraySpeciesCreate(O, actualDeleteCount);
  	    for (k = 0; k < actualDeleteCount; k++) {
  	      from = actualStart + k;
  	      if (from in O) createProperty(A, k, O[from]);
  	    }
  	    A.length = actualDeleteCount;
  	    if (insertCount < actualDeleteCount) {
  	      for (k = actualStart; k < len - actualDeleteCount; k++) {
  	        from = k + actualDeleteCount;
  	        to = k + insertCount;
  	        if (from in O) O[to] = O[from];
  	        else deletePropertyOrThrow(O, to);
  	      }
  	      for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1);
  	    } else if (insertCount > actualDeleteCount) {
  	      for (k = len - actualDeleteCount; k > actualStart; k--) {
  	        from = k + actualDeleteCount - 1;
  	        to = k + insertCount - 1;
  	        if (from in O) O[to] = O[from];
  	        else deletePropertyOrThrow(O, to);
  	      }
  	    }
  	    for (k = 0; k < insertCount; k++) {
  	      O[k + actualStart] = arguments[k + 2];
  	    }
  	    setArrayLength(O, len - actualDeleteCount + insertCount);
  	    return A;
  	  }
  	});
  	return es_array_splice;
  }

  requireEs_array_splice();

  var es_object_assign = {};

  var objectKeys;
  var hasRequiredObjectKeys;

  function requireObjectKeys () {
  	if (hasRequiredObjectKeys) return objectKeys;
  	hasRequiredObjectKeys = 1;
  	var internalObjectKeys = requireObjectKeysInternal();
  	var enumBugKeys = requireEnumBugKeys();

  	// `Object.keys` method
  	// https://tc39.es/ecma262/#sec-object.keys
  	// eslint-disable-next-line es/no-object-keys -- safe
  	objectKeys = Object.keys || function keys(O) {
  	  return internalObjectKeys(O, enumBugKeys);
  	};
  	return objectKeys;
  }

  var objectAssign;
  var hasRequiredObjectAssign;

  function requireObjectAssign () {
  	if (hasRequiredObjectAssign) return objectAssign;
  	hasRequiredObjectAssign = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var uncurryThis = requireFunctionUncurryThis();
  	var call = requireFunctionCall();
  	var fails = requireFails();
  	var objectKeys = requireObjectKeys();
  	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
  	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
  	var toObject = requireToObject();
  	var IndexedObject = requireIndexedObject();

  	// eslint-disable-next-line es/no-object-assign -- safe
  	var $assign = Object.assign;
  	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	var defineProperty = Object.defineProperty;
  	var concat = uncurryThis([].concat);

  	// `Object.assign` method
  	// https://tc39.es/ecma262/#sec-object.assign
  	objectAssign = !$assign || fails(function () {
  	  // should have correct order of operations (Edge bug)
  	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
  	    enumerable: true,
  	    get: function () {
  	      defineProperty(this, 'b', {
  	        value: 3,
  	        enumerable: false
  	      });
  	    }
  	  }), { b: 2 })).b !== 1) return true;
  	  // should work with symbols and should have deterministic property order (V8 bug)
  	  var A = {};
  	  var B = {};
  	  // eslint-disable-next-line es/no-symbol -- safe
  	  var symbol = Symbol('assign detection');
  	  var alphabet = 'abcdefghijklmnopqrst';
  	  A[symbol] = 7;
  	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
  	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  	  var T = toObject(target);
  	  var argumentsLength = arguments.length;
  	  var index = 1;
  	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  	  while (argumentsLength > index) {
  	    var S = IndexedObject(arguments[index++]);
  	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
  	    var length = keys.length;
  	    var j = 0;
  	    var key;
  	    while (length > j) {
  	      key = keys[j++];
  	      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
  	    }
  	  } return T;
  	} : $assign;
  	return objectAssign;
  }

  var hasRequiredEs_object_assign;

  function requireEs_object_assign () {
  	if (hasRequiredEs_object_assign) return es_object_assign;
  	hasRequiredEs_object_assign = 1;
  	var $ = require_export();
  	var assign = requireObjectAssign();

  	// `Object.assign` method
  	// https://tc39.es/ecma262/#sec-object.assign
  	// eslint-disable-next-line es/no-object-assign -- required for testing
  	$({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  	  assign: assign
  	});
  	return es_object_assign;
  }

  requireEs_object_assign();

  var es_object_freeze = {};

  var freezing;
  var hasRequiredFreezing;

  function requireFreezing () {
  	if (hasRequiredFreezing) return freezing;
  	hasRequiredFreezing = 1;
  	var fails = requireFails();

  	freezing = !fails(function () {
  	  // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
  	  return Object.isExtensible(Object.preventExtensions({}));
  	});
  	return freezing;
  }

  var internalMetadata = {exports: {}};

  var objectGetOwnPropertyNamesExternal = {};

  var hasRequiredObjectGetOwnPropertyNamesExternal;

  function requireObjectGetOwnPropertyNamesExternal () {
  	if (hasRequiredObjectGetOwnPropertyNamesExternal) return objectGetOwnPropertyNamesExternal;
  	hasRequiredObjectGetOwnPropertyNamesExternal = 1;
  	/* eslint-disable es/no-object-getownpropertynames -- safe */
  	var classof = requireClassofRaw();
  	var toIndexedObject = requireToIndexedObject();
  	var $getOwnPropertyNames = requireObjectGetOwnPropertyNames().f;
  	var arraySlice = requireArraySlice();

  	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  	  ? Object.getOwnPropertyNames(window) : [];

  	var getWindowNames = function (it) {
  	  try {
  	    return $getOwnPropertyNames(it);
  	  } catch (error) {
  	    return arraySlice(windowNames);
  	  }
  	};

  	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
  	objectGetOwnPropertyNamesExternal.f = function getOwnPropertyNames(it) {
  	  return windowNames && classof(it) === 'Window'
  	    ? getWindowNames(it)
  	    : $getOwnPropertyNames(toIndexedObject(it));
  	};
  	return objectGetOwnPropertyNamesExternal;
  }

  var arrayBufferNonExtensible;
  var hasRequiredArrayBufferNonExtensible;

  function requireArrayBufferNonExtensible () {
  	if (hasRequiredArrayBufferNonExtensible) return arrayBufferNonExtensible;
  	hasRequiredArrayBufferNonExtensible = 1;
  	// FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
  	var fails = requireFails();

  	arrayBufferNonExtensible = fails(function () {
  	  if (typeof ArrayBuffer == 'function') {
  	    var buffer = new ArrayBuffer(8);
  	    // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
  	    if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 });
  	  }
  	});
  	return arrayBufferNonExtensible;
  }

  var objectIsExtensible;
  var hasRequiredObjectIsExtensible;

  function requireObjectIsExtensible () {
  	if (hasRequiredObjectIsExtensible) return objectIsExtensible;
  	hasRequiredObjectIsExtensible = 1;
  	var fails = requireFails();
  	var isObject = requireIsObject();
  	var classof = requireClassofRaw();
  	var ARRAY_BUFFER_NON_EXTENSIBLE = requireArrayBufferNonExtensible();

  	// eslint-disable-next-line es/no-object-isextensible -- safe
  	var $isExtensible = Object.isExtensible;
  	var FAILS_ON_PRIMITIVES = fails(function () { });

  	// `Object.isExtensible` method
  	// https://tc39.es/ecma262/#sec-object.isextensible
  	objectIsExtensible = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible(it) {
  	  if (!isObject(it)) return false;
  	  if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false;
  	  return $isExtensible ? $isExtensible(it) : true;
  	} : $isExtensible;
  	return objectIsExtensible;
  }

  var hasRequiredInternalMetadata;

  function requireInternalMetadata () {
  	if (hasRequiredInternalMetadata) return internalMetadata.exports;
  	hasRequiredInternalMetadata = 1;
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThis();
  	var hiddenKeys = requireHiddenKeys();
  	var isObject = requireIsObject();
  	var hasOwn = requireHasOwnProperty();
  	var defineProperty = requireObjectDefineProperty().f;
  	var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
  	var getOwnPropertyNamesExternalModule = requireObjectGetOwnPropertyNamesExternal();
  	var isExtensible = requireObjectIsExtensible();
  	var uid = requireUid();
  	var FREEZING = requireFreezing();

  	var REQUIRED = false;
  	var METADATA = uid('meta');
  	var id = 0;

  	var setMetadata = function (it) {
  	  defineProperty(it, METADATA, { value: {
  	    objectID: 'O' + id++, // object ID
  	    weakData: {}          // weak collections IDs
  	  } });
  	};

  	var fastKey = function (it, create) {
  	  // return a primitive with prefix
  	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  	  if (!hasOwn(it, METADATA)) {
  	    // can't set metadata to uncaught frozen object
  	    if (!isExtensible(it)) return 'F';
  	    // not necessary to add metadata
  	    if (!create) return 'E';
  	    // add missing metadata
  	    setMetadata(it);
  	  // return object ID
  	  } return it[METADATA].objectID;
  	};

  	var getWeakData = function (it, create) {
  	  if (!hasOwn(it, METADATA)) {
  	    // can't set metadata to uncaught frozen object
  	    if (!isExtensible(it)) return true;
  	    // not necessary to add metadata
  	    if (!create) return false;
  	    // add missing metadata
  	    setMetadata(it);
  	  // return the store of weak collections IDs
  	  } return it[METADATA].weakData;
  	};

  	// add metadata on freeze-family methods calling
  	var onFreeze = function (it) {
  	  if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it);
  	  return it;
  	};

  	var enable = function () {
  	  meta.enable = function () { /* empty */ };
  	  REQUIRED = true;
  	  var getOwnPropertyNames = getOwnPropertyNamesModule.f;
  	  var splice = uncurryThis([].splice);
  	  var test = {};
  	  test[METADATA] = 1;

  	  // prevent exposing of metadata key
  	  if (getOwnPropertyNames(test).length) {
  	    getOwnPropertyNamesModule.f = function (it) {
  	      var result = getOwnPropertyNames(it);
  	      for (var i = 0, length = result.length; i < length; i++) {
  	        if (result[i] === METADATA) {
  	          splice(result, i, 1);
  	          break;
  	        }
  	      } return result;
  	    };

  	    $({ target: 'Object', stat: true, forced: true }, {
  	      getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
  	    });
  	  }
  	};

  	var meta = internalMetadata.exports = {
  	  enable: enable,
  	  fastKey: fastKey,
  	  getWeakData: getWeakData,
  	  onFreeze: onFreeze
  	};

  	hiddenKeys[METADATA] = true;
  	return internalMetadata.exports;
  }

  var hasRequiredEs_object_freeze;

  function requireEs_object_freeze () {
  	if (hasRequiredEs_object_freeze) return es_object_freeze;
  	hasRequiredEs_object_freeze = 1;
  	var $ = require_export();
  	var FREEZING = requireFreezing();
  	var fails = requireFails();
  	var isObject = requireIsObject();
  	var onFreeze = requireInternalMetadata().onFreeze;

  	// eslint-disable-next-line es/no-object-freeze -- safe
  	var $freeze = Object.freeze;
  	var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1); });

  	// `Object.freeze` method
  	// https://tc39.es/ecma262/#sec-object.freeze
  	$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
  	  freeze: function freeze(it) {
  	    return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it;
  	  }
  	});
  	return es_object_freeze;
  }

  requireEs_object_freeze();

  var es_object_keys = {};

  var hasRequiredEs_object_keys;

  function requireEs_object_keys () {
  	if (hasRequiredEs_object_keys) return es_object_keys;
  	hasRequiredEs_object_keys = 1;
  	var $ = require_export();
  	var toObject = requireToObject();
  	var nativeKeys = requireObjectKeys();
  	var fails = requireFails();

  	var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

  	// `Object.keys` method
  	// https://tc39.es/ecma262/#sec-object.keys
  	$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  	  keys: function keys(it) {
  	    return nativeKeys(toObject(it));
  	  }
  	});
  	return es_object_keys;
  }

  requireEs_object_keys();

  var es_object_toString = {};

  var objectToString;
  var hasRequiredObjectToString;

  function requireObjectToString () {
  	if (hasRequiredObjectToString) return objectToString;
  	hasRequiredObjectToString = 1;
  	var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  	var classof = requireClassof();

  	// `Object.prototype.toString` method implementation
  	// https://tc39.es/ecma262/#sec-object.prototype.tostring
  	objectToString = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  	  return '[object ' + classof(this) + ']';
  	};
  	return objectToString;
  }

  var hasRequiredEs_object_toString;

  function requireEs_object_toString () {
  	if (hasRequiredEs_object_toString) return es_object_toString;
  	hasRequiredEs_object_toString = 1;
  	var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var toString = requireObjectToString();

  	// `Object.prototype.toString` method
  	// https://tc39.es/ecma262/#sec-object.prototype.tostring
  	if (!TO_STRING_TAG_SUPPORT) {
  	  defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true });
  	}
  	return es_object_toString;
  }

  requireEs_object_toString();

  var es_parseFloat = {};

  var whitespaces;
  var hasRequiredWhitespaces;

  function requireWhitespaces () {
  	if (hasRequiredWhitespaces) return whitespaces;
  	hasRequiredWhitespaces = 1;
  	// a string of all valid unicode whitespaces
  	whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  	return whitespaces;
  }

  var stringTrim;
  var hasRequiredStringTrim;

  function requireStringTrim () {
  	if (hasRequiredStringTrim) return stringTrim;
  	hasRequiredStringTrim = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var requireObjectCoercible = requireRequireObjectCoercible();
  	var toString = requireToString();
  	var whitespaces = requireWhitespaces();

  	var replace = uncurryThis(''.replace);
  	var ltrim = RegExp('^[' + whitespaces + ']+');
  	var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

  	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  	var createMethod = function (TYPE) {
  	  return function ($this) {
  	    var string = toString(requireObjectCoercible($this));
  	    if (TYPE & 1) string = replace(string, ltrim, '');
  	    if (TYPE & 2) string = replace(string, rtrim, '$1');
  	    return string;
  	  };
  	};

  	stringTrim = {
  	  // `String.prototype.{ trimLeft, trimStart }` methods
  	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  	  start: createMethod(1),
  	  // `String.prototype.{ trimRight, trimEnd }` methods
  	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  	  end: createMethod(2),
  	  // `String.prototype.trim` method
  	  // https://tc39.es/ecma262/#sec-string.prototype.trim
  	  trim: createMethod(3)
  	};
  	return stringTrim;
  }

  var numberParseFloat;
  var hasRequiredNumberParseFloat;

  function requireNumberParseFloat () {
  	if (hasRequiredNumberParseFloat) return numberParseFloat;
  	hasRequiredNumberParseFloat = 1;
  	var globalThis = requireGlobalThis();
  	var fails = requireFails();
  	var uncurryThis = requireFunctionUncurryThis();
  	var toString = requireToString();
  	var trim = requireStringTrim().trim;
  	var whitespaces = requireWhitespaces();

  	var charAt = uncurryThis(''.charAt);
  	var $parseFloat = globalThis.parseFloat;
  	var Symbol = globalThis.Symbol;
  	var ITERATOR = Symbol && Symbol.iterator;
  	var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity
  	  // MS Edge 18- broken with boxed symbols
  	  || (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)); }));

  	// `parseFloat` method
  	// https://tc39.es/ecma262/#sec-parsefloat-string
  	numberParseFloat = FORCED ? function parseFloat(string) {
  	  var trimmedString = trim(toString(string));
  	  var result = $parseFloat(trimmedString);
  	  return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result;
  	} : $parseFloat;
  	return numberParseFloat;
  }

  var hasRequiredEs_parseFloat;

  function requireEs_parseFloat () {
  	if (hasRequiredEs_parseFloat) return es_parseFloat;
  	hasRequiredEs_parseFloat = 1;
  	var $ = require_export();
  	var $parseFloat = requireNumberParseFloat();

  	// `parseFloat` method
  	// https://tc39.es/ecma262/#sec-parsefloat-string
  	$({ global: true, forced: parseFloat !== $parseFloat }, {
  	  parseFloat: $parseFloat
  	});
  	return es_parseFloat;
  }

  requireEs_parseFloat();

  var web_domCollections_forEach = {};

  var domIterables;
  var hasRequiredDomIterables;

  function requireDomIterables () {
  	if (hasRequiredDomIterables) return domIterables;
  	hasRequiredDomIterables = 1;
  	// iterable DOM collections
  	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  	domIterables = {
  	  CSSRuleList: 0,
  	  CSSStyleDeclaration: 0,
  	  CSSValueList: 0,
  	  ClientRectList: 0,
  	  DOMRectList: 0,
  	  DOMStringList: 0,
  	  DOMTokenList: 1,
  	  DataTransferItemList: 0,
  	  FileList: 0,
  	  HTMLAllCollection: 0,
  	  HTMLCollection: 0,
  	  HTMLFormElement: 0,
  	  HTMLSelectElement: 0,
  	  MediaList: 0,
  	  MimeTypeArray: 0,
  	  NamedNodeMap: 0,
  	  NodeList: 1,
  	  PaintRequestList: 0,
  	  Plugin: 0,
  	  PluginArray: 0,
  	  SVGLengthList: 0,
  	  SVGNumberList: 0,
  	  SVGPathSegList: 0,
  	  SVGPointList: 0,
  	  SVGStringList: 0,
  	  SVGTransformList: 0,
  	  SourceBufferList: 0,
  	  StyleSheetList: 0,
  	  TextTrackCueList: 0,
  	  TextTrackList: 0,
  	  TouchList: 0
  	};
  	return domIterables;
  }

  var domTokenListPrototype;
  var hasRequiredDomTokenListPrototype;

  function requireDomTokenListPrototype () {
  	if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
  	hasRequiredDomTokenListPrototype = 1;
  	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  	var documentCreateElement = requireDocumentCreateElement();

  	var classList = documentCreateElement('span').classList;
  	var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  	domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
  	return domTokenListPrototype;
  }

  var functionBindContext;
  var hasRequiredFunctionBindContext;

  function requireFunctionBindContext () {
  	if (hasRequiredFunctionBindContext) return functionBindContext;
  	hasRequiredFunctionBindContext = 1;
  	var uncurryThis = requireFunctionUncurryThisClause();
  	var aCallable = requireACallable();
  	var NATIVE_BIND = requireFunctionBindNative();

  	var bind = uncurryThis(uncurryThis.bind);

  	// optional / simple context binding
  	functionBindContext = function (fn, that) {
  	  aCallable(fn);
  	  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
  	    return fn.apply(that, arguments);
  	  };
  	};
  	return functionBindContext;
  }

  var arrayIteration;
  var hasRequiredArrayIteration;

  function requireArrayIteration () {
  	if (hasRequiredArrayIteration) return arrayIteration;
  	hasRequiredArrayIteration = 1;
  	var bind = requireFunctionBindContext();
  	var uncurryThis = requireFunctionUncurryThis();
  	var IndexedObject = requireIndexedObject();
  	var toObject = requireToObject();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var arraySpeciesCreate = requireArraySpeciesCreate();

  	var push = uncurryThis([].push);

  	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
  	var createMethod = function (TYPE) {
  	  var IS_MAP = TYPE === 1;
  	  var IS_FILTER = TYPE === 2;
  	  var IS_SOME = TYPE === 3;
  	  var IS_EVERY = TYPE === 4;
  	  var IS_FIND_INDEX = TYPE === 6;
  	  var IS_FILTER_REJECT = TYPE === 7;
  	  var NO_HOLES = TYPE === 5 || IS_FIND_INDEX;
  	  return function ($this, callbackfn, that, specificCreate) {
  	    var O = toObject($this);
  	    var self = IndexedObject(O);
  	    var length = lengthOfArrayLike(self);
  	    var boundFunction = bind(callbackfn, that);
  	    var index = 0;
  	    var create = specificCreate || arraySpeciesCreate;
  	    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined;
  	    var value, result;
  	    for (;length > index; index++) if (NO_HOLES || index in self) {
  	      value = self[index];
  	      result = boundFunction(value, index, O);
  	      if (TYPE) {
  	        if (IS_MAP) target[index] = result; // map
  	        else if (result) switch (TYPE) {
  	          case 3: return true;              // some
  	          case 5: return value;             // find
  	          case 6: return index;             // findIndex
  	          case 2: push(target, value);      // filter
  	        } else switch (TYPE) {
  	          case 4: return false;             // every
  	          case 7: push(target, value);      // filterReject
  	        }
  	      }
  	    }
  	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  	  };
  	};

  	arrayIteration = {
  	  // `Array.prototype.forEach` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  	  forEach: createMethod(0),
  	  // `Array.prototype.map` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.map
  	  map: createMethod(1),
  	  // `Array.prototype.filter` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.filter
  	  filter: createMethod(2),
  	  // `Array.prototype.some` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.some
  	  some: createMethod(3),
  	  // `Array.prototype.every` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.every
  	  every: createMethod(4),
  	  // `Array.prototype.find` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.find
  	  find: createMethod(5),
  	  // `Array.prototype.findIndex` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  	  findIndex: createMethod(6),
  	  // `Array.prototype.filterReject` method
  	  // https://github.com/tc39/proposal-array-filtering
  	  filterReject: createMethod(7)
  	};
  	return arrayIteration;
  }

  var arrayForEach;
  var hasRequiredArrayForEach;

  function requireArrayForEach () {
  	if (hasRequiredArrayForEach) return arrayForEach;
  	hasRequiredArrayForEach = 1;
  	var $forEach = requireArrayIteration().forEach;
  	var arrayMethodIsStrict = requireArrayMethodIsStrict();

  	var STRICT_METHOD = arrayMethodIsStrict('forEach');

  	// `Array.prototype.forEach` method implementation
  	// https://tc39.es/ecma262/#sec-array.prototype.foreach
  	arrayForEach = !STRICT_METHOD ? function forEach(callbackfn /* , thisArg */) {
  	  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  	// eslint-disable-next-line es/no-array-prototype-foreach -- safe
  	} : [].forEach;
  	return arrayForEach;
  }

  var hasRequiredWeb_domCollections_forEach;

  function requireWeb_domCollections_forEach () {
  	if (hasRequiredWeb_domCollections_forEach) return web_domCollections_forEach;
  	hasRequiredWeb_domCollections_forEach = 1;
  	var globalThis = requireGlobalThis();
  	var DOMIterables = requireDomIterables();
  	var DOMTokenListPrototype = requireDomTokenListPrototype();
  	var forEach = requireArrayForEach();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

  	var handlePrototype = function (CollectionPrototype) {
  	  // some Chrome versions have non-configurable methods on DOMTokenList
  	  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
  	    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  	  } catch (error) {
  	    CollectionPrototype.forEach = forEach;
  	  }
  	};

  	for (var COLLECTION_NAME in DOMIterables) {
  	  if (DOMIterables[COLLECTION_NAME]) {
  	    handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype);
  	  }
  	}

  	handlePrototype(DOMTokenListPrototype);
  	return web_domCollections_forEach;
  }

  requireWeb_domCollections_forEach();

  var es_array_slice = {};

  var hasRequiredEs_array_slice;

  function requireEs_array_slice () {
  	if (hasRequiredEs_array_slice) return es_array_slice;
  	hasRequiredEs_array_slice = 1;
  	var $ = require_export();
  	var isArray = requireIsArray();
  	var isConstructor = requireIsConstructor();
  	var isObject = requireIsObject();
  	var toAbsoluteIndex = requireToAbsoluteIndex();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var toIndexedObject = requireToIndexedObject();
  	var createProperty = requireCreateProperty();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var arrayMethodHasSpeciesSupport = requireArrayMethodHasSpeciesSupport();
  	var nativeSlice = requireArraySlice();

  	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');

  	var SPECIES = wellKnownSymbol('species');
  	var $Array = Array;
  	var max = Math.max;

  	// `Array.prototype.slice` method
  	// https://tc39.es/ecma262/#sec-array.prototype.slice
  	// fallback for not array-like ES3 strings and DOM objects
  	$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
  	  slice: function slice(start, end) {
  	    var O = toIndexedObject(this);
  	    var length = lengthOfArrayLike(O);
  	    var k = toAbsoluteIndex(start, length);
  	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
  	    var Constructor, result, n;
  	    if (isArray(O)) {
  	      Constructor = O.constructor;
  	      // cross-realm fallback
  	      if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
  	        Constructor = undefined;
  	      } else if (isObject(Constructor)) {
  	        Constructor = Constructor[SPECIES];
  	        if (Constructor === null) Constructor = undefined;
  	      }
  	      if (Constructor === $Array || Constructor === undefined) {
  	        return nativeSlice(O, k, fin);
  	      }
  	    }
  	    result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0));
  	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
  	    result.length = n;
  	    return result;
  	  }
  	});
  	return es_array_slice;
  }

  requireEs_array_slice();

  var es_number_toFixed = {};

  var thisNumberValue;
  var hasRequiredThisNumberValue;

  function requireThisNumberValue () {
  	if (hasRequiredThisNumberValue) return thisNumberValue;
  	hasRequiredThisNumberValue = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	// `thisNumberValue` abstract operation
  	// https://tc39.es/ecma262/#sec-thisnumbervalue
  	thisNumberValue = uncurryThis(1.0.valueOf);
  	return thisNumberValue;
  }

  var stringRepeat;
  var hasRequiredStringRepeat;

  function requireStringRepeat () {
  	if (hasRequiredStringRepeat) return stringRepeat;
  	hasRequiredStringRepeat = 1;
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();
  	var toString = requireToString();
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	var $RangeError = RangeError;

  	// `String.prototype.repeat` method implementation
  	// https://tc39.es/ecma262/#sec-string.prototype.repeat
  	stringRepeat = function repeat(count) {
  	  var str = toString(requireObjectCoercible(this));
  	  var result = '';
  	  var n = toIntegerOrInfinity(count);
  	  if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions');
  	  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str;
  	  return result;
  	};
  	return stringRepeat;
  }

  var hasRequiredEs_number_toFixed;

  function requireEs_number_toFixed () {
  	if (hasRequiredEs_number_toFixed) return es_number_toFixed;
  	hasRequiredEs_number_toFixed = 1;
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThis();
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();
  	var thisNumberValue = requireThisNumberValue();
  	var $repeat = requireStringRepeat();
  	var fails = requireFails();

  	var $RangeError = RangeError;
  	var $String = String;
  	var floor = Math.floor;
  	var repeat = uncurryThis($repeat);
  	var stringSlice = uncurryThis(''.slice);
  	var nativeToFixed = uncurryThis(1.0.toFixed);

  	var pow = function (x, n, acc) {
  	  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
  	};

  	var log = function (x) {
  	  var n = 0;
  	  var x2 = x;
  	  while (x2 >= 4096) {
  	    n += 12;
  	    x2 /= 4096;
  	  }
  	  while (x2 >= 2) {
  	    n += 1;
  	    x2 /= 2;
  	  } return n;
  	};

  	var multiply = function (data, n, c) {
  	  var index = -1;
  	  var c2 = c;
  	  while (++index < 6) {
  	    c2 += n * data[index];
  	    data[index] = c2 % 1e7;
  	    c2 = floor(c2 / 1e7);
  	  }
  	};

  	var divide = function (data, n) {
  	  var index = 6;
  	  var c = 0;
  	  while (--index >= 0) {
  	    c += data[index];
  	    data[index] = floor(c / n);
  	    c = (c % n) * 1e7;
  	  }
  	};

  	var dataToString = function (data) {
  	  var index = 6;
  	  var s = '';
  	  while (--index >= 0) {
  	    if (s !== '' || index === 0 || data[index] !== 0) {
  	      var t = $String(data[index]);
  	      s = s === '' ? t : s + repeat('0', 7 - t.length) + t;
  	    }
  	  } return s;
  	};

  	var FORCED = fails(function () {
  	  return nativeToFixed(0.00008, 3) !== '0.000' ||
  	    nativeToFixed(0.9, 0) !== '1' ||
  	    nativeToFixed(1.255, 2) !== '1.25' ||
  	    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128';
  	}) || !fails(function () {
  	  // V8 ~ Android 4.3-
  	  nativeToFixed({});
  	});

  	// `Number.prototype.toFixed` method
  	// https://tc39.es/ecma262/#sec-number.prototype.tofixed
  	$({ target: 'Number', proto: true, forced: FORCED }, {
  	  toFixed: function toFixed(fractionDigits) {
  	    var number = thisNumberValue(this);
  	    var fractDigits = toIntegerOrInfinity(fractionDigits);
  	    var data = [0, 0, 0, 0, 0, 0];
  	    var sign = '';
  	    var result = '0';
  	    var e, z, j, k;

  	    // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
  	    if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits');
  	    // eslint-disable-next-line no-self-compare -- NaN check
  	    if (number !== number) return 'NaN';
  	    if (number <= -1e21 || number >= 1e21) return $String(number);
  	    if (number < 0) {
  	      sign = '-';
  	      number = -number;
  	    }
  	    if (number > 1e-21) {
  	      e = log(number * pow(2, 69, 1)) - 69;
  	      z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
  	      z *= 0x10000000000000;
  	      e = 52 - e;
  	      if (e > 0) {
  	        multiply(data, 0, z);
  	        j = fractDigits;
  	        while (j >= 7) {
  	          multiply(data, 1e7, 0);
  	          j -= 7;
  	        }
  	        multiply(data, pow(10, j, 1), 0);
  	        j = e - 1;
  	        while (j >= 23) {
  	          divide(data, 1 << 23);
  	          j -= 23;
  	        }
  	        divide(data, 1 << j);
  	        multiply(data, 1, 1);
  	        divide(data, 2);
  	        result = dataToString(data);
  	      } else {
  	        multiply(data, 0, z);
  	        multiply(data, 1 << -e, 0);
  	        result = dataToString(data) + repeat('0', fractDigits);
  	      }
  	    }
  	    if (fractDigits > 0) {
  	      k = result.length;
  	      result = sign + (k <= fractDigits
  	        ? '0.' + repeat('0', fractDigits - k) + result
  	        : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits));
  	    } else {
  	      result = sign + result;
  	    } return result;
  	  }
  	});
  	return es_number_toFixed;
  }

  requireEs_number_toFixed();

  var es_regexp_toString = {};

  var regexpFlags;
  var hasRequiredRegexpFlags;

  function requireRegexpFlags () {
  	if (hasRequiredRegexpFlags) return regexpFlags;
  	hasRequiredRegexpFlags = 1;
  	var anObject = requireAnObject();

  	// `RegExp.prototype.flags` getter implementation
  	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  	regexpFlags = function () {
  	  var that = anObject(this);
  	  var result = '';
  	  if (that.hasIndices) result += 'd';
  	  if (that.global) result += 'g';
  	  if (that.ignoreCase) result += 'i';
  	  if (that.multiline) result += 'm';
  	  if (that.dotAll) result += 's';
  	  if (that.unicode) result += 'u';
  	  if (that.unicodeSets) result += 'v';
  	  if (that.sticky) result += 'y';
  	  return result;
  	};
  	return regexpFlags;
  }

  var regexpGetFlags;
  var hasRequiredRegexpGetFlags;

  function requireRegexpGetFlags () {
  	if (hasRequiredRegexpGetFlags) return regexpGetFlags;
  	hasRequiredRegexpGetFlags = 1;
  	var call = requireFunctionCall();
  	var hasOwn = requireHasOwnProperty();
  	var isPrototypeOf = requireObjectIsPrototypeOf();
  	var regExpFlags = requireRegexpFlags();

  	var RegExpPrototype = RegExp.prototype;

  	regexpGetFlags = function (R) {
  	  var flags = R.flags;
  	  return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
  	    ? call(regExpFlags, R) : flags;
  	};
  	return regexpGetFlags;
  }

  var hasRequiredEs_regexp_toString;

  function requireEs_regexp_toString () {
  	if (hasRequiredEs_regexp_toString) return es_regexp_toString;
  	hasRequiredEs_regexp_toString = 1;
  	var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
  	var defineBuiltIn = requireDefineBuiltIn();
  	var anObject = requireAnObject();
  	var $toString = requireToString();
  	var fails = requireFails();
  	var getRegExpFlags = requireRegexpGetFlags();

  	var TO_STRING = 'toString';
  	var RegExpPrototype = RegExp.prototype;
  	var nativeToString = RegExpPrototype[TO_STRING];

  	var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b'; });
  	// FF44- RegExp#toString has a wrong name
  	var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING;

  	// `RegExp.prototype.toString` method
  	// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
  	if (NOT_GENERIC || INCORRECT_NAME) {
  	  defineBuiltIn(RegExpPrototype, TO_STRING, function toString() {
  	    var R = anObject(this);
  	    var pattern = $toString(R.source);
  	    var flags = $toString(getRegExpFlags(R));
  	    return '/' + pattern + '/' + flags;
  	  }, { unsafe: true });
  	}
  	return es_regexp_toString;
  }

  requireEs_regexp_toString();

  var getDataType = function getDataType(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  };
  // 是否为对象
  var isObject = function isObject(data) {
    return getDataType(data) === 'object';
  };
  // 合并
  var _deepMerge = function deepMerge(data1, data2) {
    var data = {};
    for (var i in data1) {
      if (i in data2) {
        if (isObject(data1[i] && isObject(data2[i]))) {
          data[i] = _deepMerge(data1[i], data2[i]);
        } else {
          data[i] = data2[i];
        }
      } else {
        data[i] = data1[i];
      }
    }
    for (var _i in data2) {
      if (!(_i in data1)) {
        data[_i] = data2[_i];
      }
    }
    return data;
  };
  var toFixed = function toFixed(num) {
    var decimal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    return +num.toFixed(decimal);
  };
  var getGridSize = function getGridSize(scale) {
    if (scale <= 0.25) return 40;
    if (scale <= 0.5) return 20;
    if (scale <= 1) return 10;
    if (scale <= 2) return 5;
    if (scale <= 4) return 2;
    return 1;
  };
  // 获取元素的offsetTop和offsetLeft
  var getOffset = function getOffset(node) {
    var rect = node.getBoundingClientRect();
    var top = rect.top + (document.body.scrollTop || document.documentElement.scrollTop);
    var left = rect.left + (document.body.scrollLeft || document.documentElement.scrollLeft);
    return {
      top: top,
      left: left
    };
  };
  // 设置样式
  var setStyle = function setStyle(node, styles) {
    for (var i in styles) {
      node.style[i] = styles[i];
    }
  };
  // 获取点击target的pageX和pageY
  var getTargetCoordinate = function getTargetCoordinate(e) {
    var pageX = e.pageX || (document.body.scrollLeft || document.documentElement.scrollLeft) + e.clienntX || 0;
    var pageY = e.pageY || (document.body.scrollTop || document.documentElement.scrollTop) + e.clienntY || 0;
    return {
      pageX: pageX,
      pageY: pageY
    };
  };

  var defaultOpt = {
    // 画布缩放比例
    scale: 1,
    // 最大缩放比例
    maxScale: 10,
    // 最小缩放比例
    minScale: 0.1,
    // 初始化是否自动居中
    autoCenter: true,
    // 初始化时是否自动计算画布缩放比例，此时忽略scale
    autoScale: 1,
    // 是否自动计算容器的宽高，默认false，为true会监控container宽高变化并重新绘制
    containerAutoSize: false,
    // 容器宽度，containerAutoSize为true后，不取该值
    width: 1000,
    // 容器高度，containerAutoSize为true后，不取该值
    height: 500,
    padding: 80,
    verticalPadding: undefined,
    horizontalPadding: undefined,
    canvasWidth: 1920,
    canvasHeight: 2000,
    // 是否代理放大和缩小快捷键 ctrl+ "+" 和 ctrl + "-"
    proxyScaleKey: true,
    // 是否展示滚动条
    showScrollBar: true,
    // 是否展示标尺
    showRuler: true,
    // 是否使用定位线
    usePositionLine: true,
    positionLineConfig: {
      lineColor: '#24aa61',
      padding: 3,
      adsorptionXList: [],
      adsorptionYList: [],
      // 吸附距离
      adsorpGap: 4
    },
    // 画布的样式
    canvasStyle: {},
    // 滚动条配置
    scrollConfig: {
      backgroundColor: '#000000',
      opacity: 0.4
    },
    // 标尺配置
    rulerConfig: {
      // 垂直标尺的宽度
      verticalRulerWidth: 30,
      // 水平标尺的高度
      horizontalRulerHeight: 30,
      // 标尺背景色
      bgColor: '#efefef',
      // 标尺数值的颜色
      fontColor: '#000000',
      // 标尺数值的字体大小
      fontSize: 12,
      // 标尺数值的字体
      fontFamily: 'Arial',
      // 标尺刻度线的颜色
      lineColor: '#000000'
    },
    // 画布缩放回调
    onScale: function onScale() {},
    // 画布移动回调
    onMove: function onMove() {}
  };
  Object.freeze(defaultOpt);
  var ScaleRuler = /*#__PURE__*/function () {
    function ScaleRuler(options) {
      _classCallCheck(this, ScaleRuler);
      this._init(options);
    }
    return _createClass(ScaleRuler, [{
      key: "_init",
      value: function _init(options) {
        if (!isObject(options)) {
          throw TypeError('options必须为对象');
        }
        var opt = _deepMerge(defaultOpt, options);
        this._checkOptions(opt);
        // todo 所有的计算数据都改为私有变量，不让外部获取
        opt.containerConfig = {};
        opt.canvasConfig = {};
        this.opt = opt;
        this._initContainer();
        this._initCanvas();
        if (opt.proxyScaleKey) {
          document.addEventListener('keydown', this._keydownEvent);
        }
        if (opt.showScrollBar) {
          opt.wheelTimer = null;
        }
      }
    }, {
      key: "_checkOptions",
      value: function _checkOptions(opt) {
        if (!opt.el) {
          throw Error('容器不能为空');
        }
        var containerEl = opt.el instanceof HTMLElement ? opt.el : document.querySelector(opt.el);
        if (!containerEl) {
          throw Error(opt.el + '容器不存在');
        }
        if (!document.body.contains(containerEl) && !document.documentElement.contains(containerEl)) {
          throw Error('页面上不存在该容器');
        }
        opt.containerEl = containerEl;
        var minScale = opt.minScale,
          maxScale = opt.maxScale;
        if (minScale <= 0) {
          throw Error('minScale必须大于0');
        }
        if (maxScale <= 0) {
          throw Error('maxScale必须大于0');
        }
        if (maxScale < minScale) {
          throw Error('minScale不能大于maxScale');
        }
      }
      // 快捷键放大缩小
    }, {
      key: "_keydownEvent",
      value: function _keydownEvent(e) {
        var keyCode = e.keyCode;
        if ((e.metaKey || e.ctrlKey) && (keyCode === 187 || keyCode === 189)) {
          e.preventDefault();
          var newScale = this.opt.scale + (keyCode === 187 ? 0.05 : -0.05);
          this.changeScale(newScale);
        }
      }

      // 获取移动边界
    }, {
      key: "_setTranslateBoundary",
      value: function _setTranslateBoundary(realWidth, realHeight) {
        var opt = this.opt;
        var width = opt.width,
          height = opt.height,
          horizontalPadding = opt.horizontalPadding,
          verticalPadding = opt.verticalPadding;
        var maxTranslateX = Math.max((width - realWidth) / 2, horizontalPadding);
        var maxTranslateY = Math.max((height - realHeight) / 2, verticalPadding);
        var minTranslateX = realWidth + 2 * horizontalPadding > width ? width - (realWidth + horizontalPadding) : maxTranslateX;
        var minTranslateY = realHeight + 2 * verticalPadding > height ? height - (realHeight + verticalPadding) : maxTranslateY;
        opt.canvasConfig.maxTranslateX = maxTranslateX;
        opt.canvasConfig.maxTranslateY = maxTranslateY;
        opt.canvasConfig.minTranslateX = minTranslateX;
        opt.canvasConfig.minTranslateY = minTranslateY;
      }
      // 初始化容器
    }, {
      key: "_initContainer",
      value: function _initContainer() {
        var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var opt = this.opt;
        var width, height;
        if (opt.containerAutoSize) {
          width = parseFloat(opt.containerEl.offsetWidth);
          height = parseFloat(opt.containerEl.offsetHeight);
          // 缓存原宽高
          opt.containerConfig.originWidth = width;
          opt.containerConfig.originHeight = height;
          // 自动监听containerEl宽高变化
          if (!opt.addResize) {
            this._onContainerResize();
          }
        } else {
          width = opt.width;
          height = opt.height;
          opt.containerEl.style.width = width + 'px';
          opt.containerEl.style.height = height + 'px';
        }
        var styles = getComputedStyle(opt.containerEl);
        if (styles.boxSizing === 'border-box') {
          width -= parseFloat(styles.borderLeftWidth) + parseFloat(styles.borderRightWidth);
          height -= parseFloat(styles.borderTopWidth) + parseFloat(styles.borderBottomWidth);
        }
        opt.width = width;
        opt.height = height;
        if (styles.position === 'static') {
          opt.containerEl.style.position = 'relative';
        }
        opt.horizontalPadding = opt.horizontalPadding || opt.padding;
        opt.verticalPadding = opt.verticalPadding || opt.padding;
        opt.containerEl.style.overflow = 'hidden';
        if (opt.showRuler) {
          this._initRuler(resize);
        }
      }
      // 监听容器变化
    }, {
      key: "_onContainerResize",
      value: function _onContainerResize() {
        var _this = this;
        var opt = this.opt;
        var containerEl = opt.containerEl,
          containerConfig = opt.containerConfig;
        containerConfig.addResize = true;
        var resizeObserver = new ResizeObserver(function (entries) {
          var _iterator = _createForOfIteratorHelper(entries),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var entry = _step.value;
              if (entry.target === containerEl) {
                var width = containerEl.offsetWidth;
                var height = containerEl.offsetHeight;
                if (width !== containerConfig.originWidth || height !== containerConfig.originHeight) {
                  _this._initContainer(true);
                  _this._initCanvas(true);
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        });
        resizeObserver.observe(containerEl);
      }
    }, {
      key: "_repaintRuler",
      value: function _repaintRuler(isVertical) {
        var opt = this.opt;
        var rulerConfig = opt.rulerConfig,
          canvasConfig = opt.canvasConfig,
          scale = opt.scale;
        var ctx = isVertical ? opt.vCtx : opt.hCtx;
        var padding = isVertical ? rulerConfig.verticalRulerWidth : rulerConfig.horizontalRulerHeight;
        var width = isVertical ? padding : opt.width;
        var height = isVertical ? opt.height : padding;
        ctx.clearRect(0, 0, width, height);
        var translateX = canvasConfig.translateX,
          translateY = canvasConfig.translateY;
        var translate = isVertical ? translateY : translateX;
        ctx.save();
        ctx.fillStyle = rulerConfig.bgColor;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
        var gridSize = getGridSize(scale);
        var gridPixel = gridSize * scale;
        var ratio = window.devicePixelRatio;
        var distance = -translate;
        var startValue = Math.floor(distance / gridPixel);
        var endValue = Math.floor(((isVertical ? height : width) - translate) / gridPixel);
        ctx.save();
        ctx.fillStyle = rulerConfig.lineColor;
        ctx.font = "".concat(rulerConfig.fontSize * ratio, "px ").concat(rulerConfig.fontFamily);
        ctx.translate(0.5, 0.5);
        ctx.scale(1 / ratio, 1 / ratio);
        if (isVertical) {
          ctx.fillRect((padding - 1) * ratio, 0, 1, height * ratio);
        } else {
          ctx.fillRect(0, (padding - 1) * ratio, width * ratio, 1);
        }
        for (var i = startValue; i <= endValue; i++) {
          ctx.fillStyle = rulerConfig.lineColor;
          var x = (translate + i * gridPixel) * ratio;
          var gap = padding / 4;
          if (i % 10 === 0) {
            gap = padding * 4 / 5;
          } else if (i % 5 === 0) {
            gap = padding / 3;
          }
          if (isVertical) {
            ctx.fillRect((padding - gap) * ratio, x, gap * ratio, 1);
          } else {
            ctx.fillRect(x, (padding - gap) * ratio, 1, gap * ratio);
            if (i % 10 === 0) {
              ctx.fillStyle = rulerConfig.fontColor;
              ctx.fillText(String(i * gridSize), x + 2 * ratio, (padding + 8 - gap) * ratio);
            }
          }
        }
        ctx.restore();
        if (isVertical) {
          ctx.font = "".concat(rulerConfig.fontSize, "px ").concat(rulerConfig.fontFamily);
          var _i = startValue;
          while (_i <= endValue) {
            if (_i % 10) {
              _i++;
            } else {
              ctx.save();
              var y = translate + _i * gridPixel + padding / 2;
              ctx.translate(y + padding / 5, y - padding * 6 / 5);
              ctx.rotate(Math.PI / 2);
              ctx.fillText(String(_i * gridSize), padding * 4 / 5, y);
              _i += 10;
              ctx.restore();
            }
          }
        }
      }
      // 初始化标尺
    }, {
      key: "_initRuler",
      value: function _initRuler() {
        var opt = this.opt;
        var rulerConfig = opt.rulerConfig;
        if (!opt.hRuler) {
          opt.hRuler = this._createRuler(false);
          opt.hCtx = opt.hRuler.getContext('2d');
        }
        if (!opt.vRuler) {
          opt.vRuler = this._createRuler(true);
          opt.vCtx = opt.vRuler.getContext('2d');
        }
        opt.hRuler.setAttribute('width', opt.width);
        opt.hRuler.setAttribute('height', rulerConfig.horizontalRulerHeight);
        opt.vRuler.setAttribute('height', opt.height);
        opt.vRuler.setAttribute('width', rulerConfig.verticalRulerWidth);
      }
    }, {
      key: "_createRuler",
      value: function _createRuler(isVertical) {
        var opt = this.opt;
        var ruler = document.createElement('canvas');
        ruler.style.position = 'absolute';
        ruler.style.left = 0;
        ruler.style.top = 0;
        ruler.style.zIndex = isVertical ? 100 : 101;
        opt.containerEl.appendChild(ruler);
        if (opt.usePositionLine) {
          this._initPositionLine(opt, isVertical, ruler);
        }
        return ruler;
      }
    }, {
      key: "_initPositionLine",
      value: function _initPositionLine(opt, isVertical, ruler) {
        var _this2 = this;
        var positionLineConfig = opt.positionLineConfig,
          rulerConfig = opt.rulerConfig;
        positionLineConfig.id = positionLineConfig.id || 0;
        positionLineConfig.lines = positionLineConfig.lines || {};
        var lineColor = positionLineConfig.lineColor,
          padding = positionLineConfig.padding;
        var positionLineWrapEl = positionLineConfig.positionLineWrapEl;
        if (!positionLineWrapEl) {
          positionLineWrapEl = document.createElement('div');
          positionLineConfig.positionLineWrapEl = positionLineWrapEl;
          opt.containerEl.appendChild(positionLineWrapEl);
        }
        var offset = getOffset(ruler);
        var self = this;
        function rulerMouseMoveEvent(e) {
          if (!rulerConfig.isMouseDown) return;
          e.preventDefault();
          var targetCoordinate = getTargetCoordinate(e);
          var nodeInfo = positionLineConfig.currentNodeInfo;
          if (!nodeInfo) return;
          var positionEl = nodeInfo.positionEl,
            dir = nodeInfo.dir,
            tipEl = nodeInfo.tipEl;
          var isY = dir === 'y';
          var translate = 0;
          if (isY) {
            positionEl.style.visibility = targetCoordinate.pageY > offset.top + rulerConfig.horizontalRulerHeight ? 'visible' : 'none';
            translate = targetCoordinate.pageY - offset.top;
          } else {
            positionEl.style.visibility = targetCoordinate.pageX > offset.left + rulerConfig.verticalRulerWidth ? 'visible' : 'none';
            translate = targetCoordinate.pageX - offset.left;
          }
          var coordinate = self._getCoordinate(opt, dir, translate);
          // 检查吸附线
          var info = self._checkAdSorptionLine(coordinate, dir, translate);
          self._changeNodeTranslate(dir, info.translate, positionEl);
          nodeInfo.translate = info.translate;
          nodeInfo.coordinate = info.coordinate;
          tipEl.innerHTML = "".concat(dir.toUpperCase(), ": ").concat(toFixed(info.coordinate), " px");
        }
        ruler.addEventListener('mousedown', function () {
          rulerConfig.isMouseDown = true;
          var positionEl = document.createElement('div');
          var positionElStyle = {
            position: 'absolute',
            visibility: 'hidden',
            backgroundColor: 'transparent',
            zIndex: 1000
          };
          var lineEl = document.createElement('div');
          var lineElStyle = {
            position: 'absolute',
            backgroundColor: lineColor
          };
          // todo 根据定位线的位置判断tipEl的位置，以免遮挡
          var tipEl = document.createElement('div');
          var tipElStyle = {
            position: 'absolute',
            padding: '5px',
            lineHeight: '18px',
            minWidth: '80px',
            backgroundColor: 'rgba(0,0,0,.8)',
            color: '#fff',
            fontSize: '12px',
            borderRadius: '4px',
            userSelect: 'none',
            textAlign: 'center'
          };
          var dir = 'y';
          if (isVertical) {
            Object.assign(positionElStyle, {
              width: 2 * padding + 1 + 'px',
              height: opt.height + 'px',
              cursor: 'col-resize',
              top: 0,
              left: -padding + 'px'
            });
            Object.assign(lineElStyle, {
              top: 0,
              height: '100%',
              width: '1px',
              left: padding + 'px'
            });
            Object.assign(tipElStyle, {
              top: '50%',
              right: 2 * padding + 6 + 'px',
              transform: "translate(0, -50%)"
            });
            // 水平方向定位线
            dir = 'x';
          } else {
            Object.assign(positionElStyle, {
              height: 2 * padding + 1 + 'px',
              width: opt.width + 'px',
              cursor: 'row-resize',
              left: 0,
              top: -padding + 'px'
            });
            Object.assign(lineElStyle, {
              left: 0,
              width: '100%',
              height: '1px',
              top: padding + 'px'
            });
            Object.assign(tipElStyle, {
              left: '50%',
              bottom: 2 * padding + 6 + 'px',
              transform: "translate(-50%, 0)"
            });
          }
          setStyle(positionEl, positionElStyle);
          setStyle(lineEl, lineElStyle);
          setStyle(tipEl, tipElStyle);
          positionEl.setAttribute('data-id', positionLineConfig.id);
          positionEl.appendChild(lineEl);
          positionEl.appendChild(tipEl);
          positionLineWrapEl.appendChild(positionEl);
          var nodeInfo = {
            positionEl: positionEl,
            id: positionLineConfig.id,
            tipEl: tipEl,
            translate: 0,
            dir: dir
          };
          positionLineConfig.lines[positionLineConfig.id++] = nodeInfo;
          positionLineConfig.currentNodeInfo = nodeInfo;
          document.addEventListener('mousemove', rulerMouseMoveEvent);
          document.addEventListener('mouseup', function (e) {
            if (!rulerConfig.isMouseDown) return;
            rulerConfig.isMouseDown = false;
            var targetCoordinate = getTargetCoordinate(e);
            var nodeInfo = positionLineConfig.currentNodeInfo;
            if (nodeInfo) {
              var _positionEl = nodeInfo.positionEl,
                _dir = nodeInfo.dir,
                _tipEl = nodeInfo.tipEl,
                id = nodeInfo.id;
              var isY = _dir === 'y';
              if (!isY && targetCoordinate.pageX <= offset.left + rulerConfig.verticalRulerWidth || isY && targetCoordinate.pageY <= offset.top + rulerConfig.horizontalRulerHeight) {
                positionLineWrapEl.removeChild(_positionEl);
                delete positionLineConfig.lines[id];
              } else {
                _tipEl.style.display = 'none';
                // positionEl事件监听
                _this2._addPosisitionLineEvent(nodeInfo, offset);
              }
            }
            positionLineConfig.currentNodeInfo = null;
            document.removeEventListener('mousemove', rulerMouseMoveEvent);
          });
        });
      }
    }, {
      key: "_coordinateToTranslate",
      value: function _coordinateToTranslate(coordinate, dir) {
        var _this$opt = this.opt,
          scale = _this$opt.scale,
          canvasConfig = _this$opt.canvasConfig;
        var translateX = canvasConfig.translateX,
          translateY = canvasConfig.translateY;
        var distance = coordinate * scale;
        var translate = (dir === 'y' ? translateY : translateX) + distance;
        return translate;
      }
      // 检查吸附线
    }, {
      key: "_checkAdSorptionLine",
      value: function _checkAdSorptionLine(coordinate, dir, translate) {
        var _this$opt$positionLin = this.opt.positionLineConfig,
          adsorptionXList = _this$opt$positionLin.adsorptionXList,
          adsorptionYList = _this$opt$positionLin.adsorptionYList,
          adsorpGap = _this$opt$positionLin.adsorpGap;
        var list = dir === 'y' ? adsorptionYList : adsorptionXList;
        var res = {
          coordinate: coordinate,
          translate: translate
        };
        var len = list.length;
        if (len > 0) {
          var start = 0;
          while (start < len) {
            var value = list[start];
            if (Math.abs(coordinate - value) <= adsorpGap) {
              // 可以吸附
              res.coordinate = value;
              res.translate = this._coordinateToTranslate(value, dir);
              break;
            } else {
              if (value > coordinate) {
                break;
              }
            }
            start++;
          }
        }
        return res;
      }
      // 给定位线增加事件监听
    }, {
      key: "_addPosisitionLineEvent",
      value: function _addPosisitionLineEvent(nodeInfo, offset) {
        var positionEl = nodeInfo.positionEl,
          tipEl = nodeInfo.tipEl,
          dir = nodeInfo.dir;
        var _this$opt2 = this.opt,
          positionLineConfig = _this$opt2.positionLineConfig,
          rulerConfig = _this$opt2.rulerConfig;
        positionEl.addEventListener('mouseenter', function () {
          tipEl.style.display = 'block';
        });
        positionEl.addEventListener('mouseleave', function () {
          tipEl.style.display = 'none';
        });
        positionEl.addEventListener('mousedown', function (e) {
          e.preventDefault();
          positionLineConfig.isMouseDown = true;
          var targetCoordinate = getTargetCoordinate(e);
          nodeInfo.start = dir === 'y' ? targetCoordinate.pageY : targetCoordinate.pageX;
          nodeInfo.originTranslate = nodeInfo.translate;
          nodeInfo.tipEl.style.display = 'block';
          positionLineConfig.currentNodeInfo = nodeInfo;
          document.addEventListener('mousemove', positionLineMoveEvent);
        });
        var self = this;
        function positionLineMoveEvent(e) {
          if (!positionLineConfig.isMouseDown) return;
          e.preventDefault();
          var nodeInfo = positionLineConfig.currentNodeInfo;
          var targetCoordinate = getTargetCoordinate(e);
          var dir = nodeInfo.dir,
            tipEl = nodeInfo.tipEl,
            start = nodeInfo.start,
            _nodeInfo$originTrans = nodeInfo.originTranslate,
            originTranslate = _nodeInfo$originTrans === void 0 ? 0 : _nodeInfo$originTrans,
            positionEl = nodeInfo.positionEl;
          var isY = dir === 'y';
          var move = (isY ? targetCoordinate.pageY : targetCoordinate.pageX) - start;
          var translate = originTranslate + move;
          // 更新坐标数据
          var coordinate = self._getCoordinate(self.opt, dir, translate);
          // 检查吸附线
          var info = self._checkAdSorptionLine(coordinate, dir, translate);
          self._changeNodeTranslate(dir, info.translate, positionEl);
          nodeInfo.translate = info.translate;
          nodeInfo.coordinate = info.coordinate;
          tipEl.innerHTML = "".concat(dir.toUpperCase(), ": ").concat(toFixed(info.coordinate), " px");
        }
        document.addEventListener('mouseup', function (e) {
          if (!positionLineConfig.isMouseDown) return;
          positionLineConfig.isMouseDown = false;
          var nodeInfo = positionLineConfig.currentNodeInfo;
          if (nodeInfo) {
            var _positionEl2 = nodeInfo.positionEl,
              _dir2 = nodeInfo.dir,
              id = nodeInfo.id;
            var isY = _dir2 === 'y';
            var targetCoordinate = getTargetCoordinate(e);
            if (!isY && targetCoordinate.pageX <= offset.left + rulerConfig.verticalRulerWidth || isY && targetCoordinate.pageY <= offset.top + rulerConfig.horizontalRulerHeight) {
              _positionEl2.parentNode.removeChild(_positionEl2);
              delete positionLineConfig.lines[id];
            } else {
              delete nodeInfo.originTranslate;
              delete nodeInfo.start;
            }
          }
          positionLineConfig.currentNodeInfo = null;
          document.removeEventListener('mousemove', positionLineMoveEvent);
        });
      }
    }, {
      key: "_getCoordinate",
      value: function _getCoordinate(opt, dir, translate) {
        var scale = opt.scale,
          canvasConfig = opt.canvasConfig;
        var translateX = canvasConfig.translateX,
          translateY = canvasConfig.translateY;
        var distance = translate - (dir === 'y' ? translateY : translateX);
        return distance / scale;
      }
      // 初始化画布
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        var opt = this.opt;
        var canvas = opt.canvasEl;
        if (!canvas) {
          canvas = document.createElement('div');
          canvas.style.position = 'absolute';
          canvas.style.left = 0;
          canvas.style.top = 0;
          // todo 移动的时候取消给定位线添加缓动参数
          canvas.style.transition = 'transform 300ms';
          canvas.style.transformOrigin = '0 0';
          opt.canvasEl = canvas;
          // 增加四个边坐标的吸附线
          this._modifyAdsortptionLine([{
            value: opt.canvasWidth,
            dir: 'x'
          }, {
            value: 0,
            dir: 'x'
          }, {
            value: 0,
            dir: 'y'
          }, {
            value: opt.canvasHeight,
            dir: 'y'
          }]);
          opt.containerEl.appendChild(canvas);
          opt.containerEl.addEventListener('mousewheel', this._mousewheelEvent.bind(this));
        }
        canvas.style.width = opt.canvasWidth + 'px';
        canvas.style.height = opt.canvasHeight + 'px';
        var scale = opt.scale,
          autoScale = opt.autoScale,
          autoCenter = opt.autoCenter;

        // 自动计算缩放比例
        if (autoScale) {
          var scaleX = (opt.width - 2 * opt.horizontalPadding) / opt.canvasWidth;
          var scaleY = (opt.height - 2 * opt.verticalPadding) / opt.canvasHeight;
          scale = Math.min(scaleX, scaleY);
        }
        var translateX = 0;
        var translateY = 0;
        // 自动居中
        var realWidth = opt.canvasWidth * scale;
        var realHeight = opt.canvasHeight * scale;
        if (autoCenter) {
          translateX = Math.floor((opt.width - realWidth) / 2);
          translateY = Math.floor((opt.height - realHeight) / 2);
        }
        this._setTranslateBoundary(realWidth, realHeight);
        opt.scale = scale;
        if (isObject(opt.canvasStyle)) {
          for (var i in opt.canvasStyle) {
            opt.canvasEl.style[i] = opt.canvasStyle[i];
          }
        }
        this._transform(translateX, translateY, true);
        this._checkLarge();
      }
    }, {
      key: "_transform",
      value: function _transform(translateX, translateY) {
        var opt = this.opt;
        var scale = opt.scale,
          canvasConfig = opt.canvasConfig;
        opt.canvasEl.style.transform = "translate(".concat(translateX, "px, ").concat(translateY, "px) scale(").concat(scale, ")");
        var changeX = translateX - canvasConfig.translateX;
        var changeY = translateY - canvasConfig.translateY;
        canvasConfig.translateX = translateX;
        canvasConfig.translateY = translateY;
        if (opt.showRuler) {
          this._repaintRuler(false);
          this._repaintRuler(true);
        }
        // 改变所有定位线的translate
        if (opt.usePositionLine) {
          this._changeLinesTranslate(changeX, changeY);
        }
      }
      // 检查与wrap的大小
    }, {
      key: "_checkLarge",
      value: function _checkLarge() {
        var opt = this.opt;
        var scale = opt.scale,
          canvasConfig = opt.canvasConfig,
          containerConfig = opt.containerConfig,
          showScrollBar = opt.showScrollBar,
          scrollConfig = opt.scrollConfig;
        var translateX = canvasConfig.translateX,
          translateY = canvasConfig.translateY;
        // 画布加上两侧padding的宽度
        var totalWidth = opt.canvasWidth * scale + 2 * opt.horizontalPadding;
        // 画布加上两侧padding的高度
        var totalHeight = opt.canvasHeight * scale + 2 * opt.verticalPadding;
        canvasConfig.totalWidth = totalWidth;
        canvasConfig.totalHeight = totalHeight;
        var isXLarge = opt.width < totalWidth;
        var isYLarge = opt.height < totalHeight;
        containerConfig.isLarge = isXLarge || isYLarge;
        containerConfig.isXLarge = isXLarge;
        containerConfig.isYLarge = isYLarge;
        // 是否展示滚动条
        if (showScrollBar) {
          var verticalDisplay = 'none';
          var horizontalDisplay = 'none';
          // 水平方向滚动条
          if (isXLarge) {
            horizontalDisplay = 'block';
            // 未展示过滚动条
            if (!opt.hScrollBar) {
              opt.hScrollBar = this._createScollBar(false);
            }
            // 滚动条左边距离
            var left = opt.horizontalPadding - translateX;
            opt.hScrollBar.style.left = opt.width * (left / totalWidth) + 'px';
            // 滚动条宽度百分比
            var percentage = opt.width / totalWidth;
            // 滚动条宽度
            var width = percentage * opt.width;
            opt.hScrollBar.style.width = width + 'px';
            scrollConfig.width = width;
          }
          if (opt.hScrollBar) {
            opt.hScrollBar.style.display = horizontalDisplay;
          }
          if (isYLarge) {
            if (!opt.vScollBar) {
              opt.vScollBar = this._createScollBar(true);
            }
            verticalDisplay = 'block';
            var top = opt.verticalPadding - translateY;
            opt.vScollBar.style.top = opt.height * (top / totalHeight) + 'px';
            var _percentage = opt.height / totalHeight;
            var height = _percentage * opt.height;
            opt.vScollBar.style.height = height + 'px';
            scrollConfig.height = height;
          }
          if (opt.vScollBar) {
            opt.vScollBar.style.display = verticalDisplay;
          }
        }
      }
      // 移动单个定位线
    }, {
      key: "_changeNodeTranslate",
      value: function _changeNodeTranslate(dir, translate, node) {
        var transform = dir === 'y' ? "0, ".concat(translate, "px") : "".concat(translate, "px, 0");
        node.style.transform = "translate(".concat(transform, ")");
      }
      // 改变定位线的tranlate,不改变坐标值
    }, {
      key: "_changeLinesTranslate",
      value: function _changeLinesTranslate(changeX, changeY) {
        var _this3 = this;
        var opt = this.opt;
        var lines = opt.positionLineConfig.lines;
        var ids = Object.keys(lines);
        ids.forEach(function (id) {
          var nodeInfo = lines[id];
          var dir = nodeInfo.dir,
            positionEl = nodeInfo.positionEl;
          var translate = nodeInfo.translate;
          translate += dir === 'y' ? changeY : changeX;
          _this3._changeNodeTranslate(dir, translate, positionEl);
          nodeInfo.translate = translate;
        });
      }
      // 鼠标滚轮事件
    }, {
      key: "_mousewheelEvent",
      value: function _mousewheelEvent(e) {
        var _this4 = this;
        e.preventDefault();
        // 双指事件
        if (e.metaKey || e.ctrlKey) {
          var changeScale = -1 * e.deltaY / 100;
          var newScale = this.opt.scale + changeScale;
          this.changeScale(newScale);
        } else {
          var _this$opt3 = this.opt,
            scrollConfig = _this$opt3.scrollConfig,
            containerConfig = _this$opt3.containerConfig,
            canvasConfig = _this$opt3.canvasConfig,
            hScrollBar = _this$opt3.hScrollBar,
            vScollBar = _this$opt3.vScollBar;
          if (!containerConfig.isLarge || scrollConfig.isDown) return;
          e.preventDefault();
          if (this.opt.wheelTimer) {
            clearTimeout(this.opt.wheelTimer);
          }
          var moveX = -e.deltaX;
          var moveY = -e.deltaY;
          var scrollDirection = '';
          var _this$opt$scrollConfi = this.opt.scrollConfig.opacity,
            opacity = _this$opt$scrollConfi === void 0 ? 0.4 : _this$opt$scrollConfi;
          var translateX = canvasConfig.translateX,
            translateY = canvasConfig.translateY;
          if (containerConfig.isXLarge && Math.abs(moveX) > Math.abs(moveY)) {
            scrollDirection = 'h';
            translateX += moveX;
            translateX = Math.max(Math.min(translateX, canvasConfig.maxTranslateX), canvasConfig.minTranslateX);
            var left = this.opt.horizontalPadding - translateX;
            // 展示
            hScrollBar.style.opacity = opacity;
            if (vScollBar) vScollBar.style.opacity = 0;
            hScrollBar.style.left = this.opt.width * (left / canvasConfig.totalWidth) + 'px';
            this._transform(translateX, translateY);
            this._onMove(translateX, translateY);
          }
          if (containerConfig.isYLarge && Math.abs(moveY) > Math.abs(moveX)) {
            scrollDirection = 'v';
            translateY += moveY;
            translateY = Math.max(Math.min(translateY, canvasConfig.maxTranslateY), canvasConfig.minTranslateY);
            // 展示
            vScollBar.style.opacity = opacity;
            if (hScrollBar) hScrollBar.style.opacity = 0;
            var top = this.opt.verticalPadding - translateY;
            vScollBar.style.top = this.opt.height * (top / canvasConfig.totalHeight) + 'px';
            this._transform(translateX, translateY);
            this._onMove(translateX, translateY);
          }
          // 不滚动后300ms隐藏滚动条
          if (scrollDirection) {
            this.opt.wheelTimer = setTimeout(function () {
              if (_this4.opt.scrollConfig.isMouseEnter) return;
              var bar = scrollDirection === 'h' ? hScrollBar : vScollBar;
              bar.style.opacity = 0;
            }, 1000);
          }
        }
      }
      // 移动回调
    }, {
      key: "_onMove",
      value: function _onMove(translateX, translateY) {
        if (typeof this.opt.onMove === 'function') {
          this.opt.onMove(translateX, translateY);
        }
      }
    }, {
      key: "_createScollBar",
      value: function _createScollBar(isVertical) {
        var opt = this.opt;
        var scrollConfig = opt.scrollConfig;
        var self = this;
        var bar = document.createElement('div');
        var styles = {
          position: 'absolute',
          display: 'none',
          borderRadius: '4px',
          backgroundColor: '#000000',
          opacity: 0,
          transition: 'opacity 300ms',
          cursor: 'pointer',
          zIndex: 200
        };
        if (isVertical) {
          styles.right = 0;
          styles.width = '8px';
        } else {
          styles.bottom = 0;
          styles.height = '8px';
        }
        setStyle(bar, styles);
        var mousemoveEvent = function mousemoveEvent(e) {
          e.preventDefault();
          if (!opt.scrollConfig.isDown) return;
          var scrollConfig = opt.scrollConfig,
            canvasConfig = opt.canvasConfig;
          var translateX = canvasConfig.translateX,
            translateY = canvasConfig.translateY;
          var targetCoordinate = getTargetCoordinate(e);
          if (isVertical) {
            var move = targetCoordinate.pageY - scrollConfig.startY;
            var barTop = scrollConfig.top + move;
            barTop = Math.min(Math.max(0, barTop), opt.height - scrollConfig.height);
            bar.style.top = barTop + 'px';
            var top = barTop * canvasConfig.totalHeight / opt.height;
            translateY = opt.verticalPadding - top;
          } else {
            var _move = targetCoordinate.pageX - scrollConfig.startX;
            var barLeft = scrollConfig.left + _move;
            barLeft = Math.min(Math.max(0, barLeft), opt.width - scrollConfig.width);
            bar.style.left = barLeft + 'px';
            var left = barLeft * canvasConfig.totalWidth / opt.width;
            translateX = opt.horizontalPadding - left;
          }
          self._transform(translateX, translateY);
          self.onMove(translateX, translateY);
        };
        var mousedownEvent = function mousedownEvent(e) {
          scrollConfig.isDown = true;
          var targetCoordinate = getTargetCoordinate(e);
          if (isVertical) {
            scrollConfig.startY = targetCoordinate.pageY;
            scrollConfig.top = parseFloat(this.style.top);
          } else {
            scrollConfig.left = parseFloat(this.style.left);
            scrollConfig.startX = targetCoordinate.pageX;
          }
          document.addEventListener('mousemove', mousemoveEvent);
        };
        bar.addEventListener('mouseenter', function () {
          scrollConfig.isMouseEnter = true;
          bar.style.opacity = scrollConfig.opacity;
          // 另一个隐藏
          if (isVertical) {
            if (scrollConfig.hScrollBar) scrollConfig.hScrollBar.style.opacity = 0;
          } else {
            if (scrollConfig.vScrollBar) scrollConfig.vScrollBar.style.opacity = 0;
          }
        });
        bar.addEventListener('mouseleave', function () {
          if (scrollConfig.isDown) return;
          scrollConfig.isMouseEnter = false;
          bar.style.opacity = 0;
        });
        // 鼠标按下事件
        bar.addEventListener('mousedown', mousedownEvent);
        // 鼠标按下松开
        document.addEventListener('mouseup', function () {
          scrollConfig.isDown = false;
          scrollConfig.isMouseEnter = false;
          document.removeEventListener('mousemove', mousemoveEvent);
        });
        opt.containerEl.appendChild(bar);
        return bar;
      }

      // 获取画布元素
    }, {
      key: "getCanvasEl",
      value: function getCanvasEl() {
        return this.opt.canvasEl;
      }
      // 更新画布的宽高
    }, {
      key: "updateCanvasRect",
      value: function updateCanvasRect(_ref) {
        var canvasWidth = _ref.canvasWidth,
          canvasHeight = _ref.canvasHeight;
        if (canvasHeight) {
          this.opt.canvasHeight = canvasHeight;
        }
        if (canvasWidth) {
          this.opt.canvasWidth = canvasWidth;
        }
        this._initCanvas();
      }
      // 修改吸附线
    }, {
      key: "_modifyAdsortptionLine",
      value: function _modifyAdsortptionLine(data) {
        var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var _this$opt$positionLin2 = this.opt.positionLineConfig,
          adsorptionXList = _this$opt$positionLin2.adsorptionXList,
          adsorptionYList = _this$opt$positionLin2.adsorptionYList;
        data.forEach(function (_ref2) {
          var dir = _ref2.dir,
            value = _ref2.value;
          var list = dir === 'y' ? adsorptionYList : adsorptionXList;
          var index = list.indexOf(value);
          if (index > -1) {
            if (remove) {
              list.splice(index, 1);
            }
          } else {
            if (!remove) {
              list.push(value);
            }
          }
        });
        if (!remove) {
          // 排序
          adsorptionXList.sort(function (a, b) {
            return a - b;
          });
          adsorptionYList.sort(function (a, b) {
            return a - b;
          });
        }
      }
      // 删除吸附线
    }, {
      key: "removeAdsotptionLine",
      value: function removeAdsotptionLine(data) {
        this._modifyAdsortptionLine(data, true);
      }
      // 增加吸附线
    }, {
      key: "addAdsortptionLine",
      value: function addAdsortptionLine(data) {
        this._modifyAdsortptionLine(data);
      }
      // 改变大小
    }, {
      key: "changeScale",
      value: function changeScale(newScale) {
        var opt = this.opt;
        var scale = opt.scale,
          canvasConfig = opt.canvasConfig;
        var translateX = canvasConfig.translateX,
          translateY = canvasConfig.translateY;
        newScale = Math.min(Math.max(newScale, opt.minScale), opt.maxScale);
        var change = newScale - scale;
        opt.scale = newScale;
        var newCanvasW = opt.canvasWidth * newScale;
        var newCanvasH = opt.canvasHeight * newScale;
        this._setTranslateBoundary(newCanvasW, newCanvasH);
        translateX -= change * opt.canvasWidth / 2;
        translateY -= change * opt.canvasHeight / 2;
        translateX = Math.max(Math.min(translateX, canvasConfig.maxTranslateX), canvasConfig.minTranslateY);
        translateY = Math.max(Math.min(translateY, canvasConfig.maxTranslateY), canvasConfig.minTranslateY);
        this._transform(translateX, translateY);
        // 回调onScale
        if (typeof opt.onScale === 'function') {
          opt.onScale(opt.scale);
        }
        this._checkLarge();
      }
    }]);
  }();

  return ScaleRuler;

}));
