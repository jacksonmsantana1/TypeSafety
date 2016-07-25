'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _data = require('data.either');

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var map = _ramda2.default.map;
var isNil = _ramda2.default.isNil;

/**
 * TypeSafety
 * @constructor
 */
var TypeSafety = function TypeSafety() {};

/**
 * Return an Either.Left if value is null
 * otherwise return an Either.Right(a)
 * @param a
 */
TypeSafety.prototype.nil = function nil(a) {
  if (a === null) {
    return _data2.default.Left('Null value');
  }

  return _data2.default.Right(a);
};

TypeSafety.nil = TypeSafety.prototype.nil;

/**
 * Return an Either.Left if value is undefined
 * otherwise return an Either.Right(a)
 * @param a
 */
TypeSafety.prototype.undef = function undef(a) {
  if (a === undefined) {
    return _data2.default.Left('Undefined value');
  }

  return _data2.default.Right(a);
};

TypeSafety.undef = TypeSafety.prototype.undef;

/**
 * Number -> Right(Number) | Left(Error)
 * @param a
 */
TypeSafety.prototype.nan = function nan(num) {
  if (Number.isNaN(num)) {
    return _data2.default.Left('NaN value');
  }

  return _data2.default.Right(num);
};

TypeSafety.nan = TypeSafety.prototype.nan;

/**
 * Number -> Right(Number) | Left(Error)
 * @param a
 */
TypeSafety.prototype.falsy = function falsy(a) {
  if (a === '' || a === 0 || isNil(a) || a === 'false' || Number.isNaN(a) || !a) {
    return _data2.default.Right(false);
  }

  return _data2.default.Left('No falsy value was given');
};

TypeSafety.falsy = TypeSafety.prototype.falsy;

/**
 * Number -> Right(Number) | Left(Error)
 * @param a
 */
TypeSafety.prototype.truthy = function truthy(a) {
  if (a !== '' && a !== 0 && !isNil(a) && a !== 'false' && !Number.isNaN(a) && !!a) {
    return _data2.default.Right(true);
  }

  return _data2.default.Left('No truthy value was given');
};

TypeSafety.truthy = TypeSafety.prototype.truthy;

/**
 * typeOf
 * @param type
 * @returns {Function}
 */
TypeSafety.prototype.typeOf = function typeOf(type) {
  return function typeOfX(x) {
    if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === type) {
      return x;
    }

    throw new TypeError('Error: ' + type + ' expected, ' + (typeof x === 'undefined' ? 'undefined' : _typeof(x)) + ' given.');
  };
};

TypeSafety.typeOf = TypeSafety.prototype.typeOf;

/**
 *
 * @param type
 * @returns {typeOFX}
 */
TypeSafety.prototype.typeOF = function typeOF(type) {
  return function typeOFX(x) {
    if ((typeof x === 'undefined' ? 'undefined' : _typeof(x)) === type) {
      return _data2.default.Right(x);
    }

    return _data2.default.Left('Error: ' + type + ' expected, ' + (typeof x === 'undefined' ? 'undefined' : _typeof(x)) + ' given.');
  };
};

TypeSafety.typeOF = TypeSafety.prototype.typeOF;

/**
 * objectTypeOf
 * @param name
 * @returns {Function}
 */
TypeSafety.prototype.objectTypeOf = function objectTypeOf(name) {
  return function objTypeOfO(o) {
    if (Object.prototype.toString.call(o) === '[object ' + name + ']') {
      return o;
    }

    throw new TypeError('Error: ' + name + ' expected, something else given.');
  };
};

TypeSafety.objectTypeOf = TypeSafety.prototype.objectTypeOf;

/**
 * objectTypeOF
 * @param name
 * @returns {Function}
 */
TypeSafety.prototype.objectTypeOF = function objectTypeOF(name) {
  return function objTypeOfO(o) {
    if (o === null) {
      return _data2.default.Left('Null value');
    } else if (o === undefined) {
      return _data2.default.Left('Undefined value');
    } else if (Object.prototype.toString.call(o) === '[object ' + name + ']') {
      return _data2.default.Right(o);
    }

    return _data2.default.Left('Error: ' + name + ' expected, something else given.');
  };
};

TypeSafety.objectTypeOF = TypeSafety.prototype.objectTypeOF;

// Types
TypeSafety.str = TypeSafety.typeOf('string');
TypeSafety.STR = TypeSafety.typeOF('string');

TypeSafety.num = TypeSafety.typeOf('number');
TypeSafety.NUM = TypeSafety.typeOF('number');

TypeSafety.bool = TypeSafety.typeOf('boolean');
TypeSafety.BOOL = TypeSafety.typeOF('boolean');

//Objects Types
TypeSafety.obj = TypeSafety.objectTypeOf('Object');

TypeSafety.func = TypeSafety.typeOf('function');
TypeSafety.FUNC = TypeSafety.objectTypeOF('Function');

TypeSafety.arr = TypeSafety.objectTypeOf('Array');
TypeSafety.ARR = TypeSafety.objectTypeOF('Array');

/**
 * arrayOf
 * @param f
 * @returns {Function}
 */
TypeSafety.prototype.arrayOf = function arrayOf(f) {
  return function arrayOfA(a) {
    return map(TypeSafety.func(f), TypeSafety.arr(a));
  };
};

TypeSafety.arrayOf = TypeSafety.prototype.arrayOf;

/**
 * arrayOF
 * @param f
 * @returns {Function}
 */
TypeSafety.prototype.arrayOF = function arrayOF(f) {
  return function arrayOFA(a) {
    return TypeSafety.ARR(a).map(map(TypeSafety.func(f)));
  };
};

TypeSafety.arrayOF = TypeSafety.prototype.arrayOF;

/**
 * String -> Right(String) | Left(Error)
 * @type {TypeSafety.arrTypeOf|*}
 */
TypeSafety.prototype.strTypeOf = function strTypeOf(str) {
  return TypeSafety.undef(str).chain(TypeSafety.nil).chain(TypeSafety.STR);
};

TypeSafety.strTypeOf = TypeSafety.prototype.strTypeOf;

/**
 * Number -> Right(Number) | Left(Error)
 * @param n
 * @returns {*}
 */
TypeSafety.prototype.boolTypeOf = function boolTypeOf(n) {
  return TypeSafety.nil(n).chain(TypeSafety.undef).chain(TypeSafety.BOOL);
};

TypeSafety.boolTypeOf = TypeSafety.prototype.boolTypeOf;

/**
 * Number -> Right(Number) | Left(Error)
 * @param n
 * @returns {*}
 */
TypeSafety.prototype.numTypeOf = function numTypeOf(n) {
  return TypeSafety.nil(n).chain(TypeSafety.undef).chain(TypeSafety.NUM).chain(TypeSafety.nan);
};

TypeSafety.numTypeOf = TypeSafety.prototype.numTypeOf;

module.exports = TypeSafety;