'use strict';

var _chai = require('chai');

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TypeSafety => ', function () {
  it('typeOf() ', function (done) {
    var string = 'Some String';
    var number = 69;
    var boolean = true;

    var typeOf = _index2.default.typeOf;
    var str = _index2.default.str;
    var num = _index2.default.num;
    var bool = _index2.default.bool;

    try {
      (0, _chai.expect)(str(string)).to.be.equal(string);
      (0, _chai.expect)(num(number)).to.be.equal(number);
      (0, _chai.expect)(bool(boolean)).to.be.equal(boolean);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('objectTypeOf() ', function (done) {
    var array = [];

    var objectTypeOf = _index2.default.objectTypeOf;
    var arr = _index2.default.arr;

    try {
      (0, _chai.expect)(arr(array)).to.be.equal(array);
      done();
    } catch (e) {
      done(e);
    }
  });

  it('arrayOf() ', function () {
    var str = _index2.default.str;
    var arrayOf = _index2.default.arrayOf;
    var arrStr = arrayOf(str);
    var arr = ['1', '2', '3'];

    (0, _chai.expect)(arrStr(arr)).to.be.eql(arr);
  });

  it('nil() ', function () {
    var nil = _index2.default.nil;
    var nullValue = nil(null);
    var value = nil('String');

    (0, _chai.expect)(nullValue.isLeft).to.be.equal(true);
    (0, _chai.expect)(nullValue.toString()).to.be.equal('Either.Left(Null value)');
    (0, _chai.expect)(value.isRight).to.be.equal(true);
    (0, _chai.expect)(value.toString()).to.be.equal('Either.Right(String)');
  });

  it('undef() ', function () {
    var undef = _index2.default.undef;
    var undefinedValue = undef(void 0);
    var value = undef('String');

    (0, _chai.expect)(undefinedValue.isLeft).to.be.equal(true);
    (0, _chai.expect)(undefinedValue.toString()).to.be.equal('Either.Left(Undefined value)');
    (0, _chai.expect)(value.isRight).to.be.equal(true);
    (0, _chai.expect)(value.toString()).to.be.equal('Either.Right(String)');
  });

  it('nan() ', function () {
    var nan = _index2.default.nan;
    var nanValue = nan(NaN);
    var value = nan(1);

    (0, _chai.expect)(nanValue.isLeft).to.be.equal(true);
    (0, _chai.expect)(nanValue.toString()).to.be.equal('Either.Left(NaN value)');
    (0, _chai.expect)(value.isRight).to.be.equal(true);
    (0, _chai.expect)(value.toString()).to.be.equal('Either.Right(1)');
  });

  it('falsy() ', function () {
    var falsy = _index2.default.falsy;
    var falseValue1 = falsy('');
    var falseValue2 = falsy('false');
    var falseValue3 = falsy(null);
    var falseValue4 = falsy(void 0);
    var falseValue5 = falsy('');
    var falseValue6 = falsy(Number.NaN);
    var truthy = falsy(1);

    (0, _chai.expect)(falseValue1.isRight).to.be.equal(true);
    (0, _chai.expect)(falseValue2.isRight).to.be.equal(true);
    (0, _chai.expect)(falseValue3.isRight).to.be.equal(true);
    (0, _chai.expect)(falseValue4.isRight).to.be.equal(true);
    (0, _chai.expect)(falseValue5.isRight).to.be.equal(true);
    (0, _chai.expect)(falseValue6.isRight).to.be.equal(true);
    (0, _chai.expect)(truthy.isLeft).to.be.equal(true);

    (0, _chai.expect)(falseValue1.get()).to.be.equal(false);
    (0, _chai.expect)(falseValue2.get()).to.be.equal(false);
    (0, _chai.expect)(falseValue3.get()).to.be.equal(false);
    (0, _chai.expect)(falseValue4.get()).to.be.equal(false);
    (0, _chai.expect)(falseValue5.get()).to.be.equal(false);
    (0, _chai.expect)(falseValue6.get()).to.be.equal(false);
    (0, _chai.expect)(truthy.toString()).to.be.equal('Either.Left(No falsy value was given)');
  });

  it('truthy() ', function () {
    var truthy = _index2.default.truthy;
    var falseValue1 = truthy('');
    var falseValue2 = truthy('false');
    var falseValue3 = truthy(null);
    var falseValue4 = truthy(void 0);
    var falseValue5 = truthy('');
    var falseValue6 = truthy(Number.NaN);
    var _true = truthy(1);

    (0, _chai.expect)(falseValue1.isRight).to.be.equal(false);
    (0, _chai.expect)(falseValue2.isRight).to.be.equal(false);
    (0, _chai.expect)(falseValue3.isRight).to.be.equal(false);
    (0, _chai.expect)(falseValue4.isRight).to.be.equal(false);
    (0, _chai.expect)(falseValue5.isRight).to.be.equal(false);
    (0, _chai.expect)(falseValue6.isRight).to.be.equal(false);
    (0, _chai.expect)(_true.isLeft).to.be.equal(false);

    (0, _chai.expect)(_true.get()).to.be.equal(true);
  });

  it('strTypeOf() ', function () {
    var STR = _index2.default.strTypeOf;
    var undef = STR(void 0);
    var nil = STR(null);
    var str = STR('STRING');
    var notStr1 = STR(1);
    var notStr2 = STR(false);
    var notStr3 = STR({});

    (0, _chai.expect)(undef.isLeft).to.eql(true);
    (0, _chai.expect)(nil.isLeft).to.be.eql(true);
    (0, _chai.expect)(notStr1.isLeft).to.be.eql(true);
    (0, _chai.expect)(notStr2.isLeft).to.be.eql(true);
    (0, _chai.expect)(notStr3.isLeft).to.be.eql(true);

    (0, _chai.expect)(undef.toString()).to.eql('Either.Left(Undefined value)');
    (0, _chai.expect)(nil.toString()).to.eql('Either.Left(Null value)');
    (0, _chai.expect)(notStr1.toString()).to.eql('Either.Left(Error: string expected, number given.)');
    (0, _chai.expect)(notStr2.toString()).to.eql('Either.Left(Error: string expected, boolean given.)');
    (0, _chai.expect)(notStr3.toString()).to.eql('Either.Left(Error: string expected, object given.)');

    (0, _chai.expect)(str.isRight).to.be.equal(true);
    (0, _chai.expect)(str.get()).to.be.equal('STRING');
  });

  it('numTypeOf() ', function () {
    var NUM = _index2.default.numTypeOf;
    var undef = NUM(void 0);

    var nil = NUM(null);
    var nan = NUM(0 / 0);
    var num = NUM(1);

    var notNum1 = NUM('');
    var notNum2 = NUM(false);
    var notNum3 = NUM({});

    (0, _chai.expect)(undef.isLeft).to.eql(true);
    (0, _chai.expect)(nil.isLeft).to.be.eql(true);
    (0, _chai.expect)(nan.isLeft).to.be.eql(true);

    (0, _chai.expect)(notNum1.isLeft).to.be.eql(true);
    (0, _chai.expect)(notNum2.isLeft).to.be.eql(true);
    (0, _chai.expect)(notNum3.isLeft).to.be.eql(true);

    (0, _chai.expect)(undef.toString()).to.eql('Either.Left(Undefined value)');
    (0, _chai.expect)(nil.toString()).to.eql('Either.Left(Null value)');
    (0, _chai.expect)(nan.toString()).to.eql('Either.Left(NaN value)');

    (0, _chai.expect)(notNum1.toString()).to.eql('Either.Left(Error: number expected, string given.)');
    (0, _chai.expect)(notNum2.toString()).to.eql('Either.Left(Error: number expected, boolean given.)');
    (0, _chai.expect)(notNum3.toString()).to.eql('Either.Left(Error: number expected, object given.)');

    (0, _chai.expect)(num.isRight).to.be.equal(true);
    (0, _chai.expect)(num.get()).to.be.equal(1);
  });

  it('arrTypeOf() ', function () {
    var ARR = _index2.default.ARR;

    var nil = ARR(null);
    var undef = ARR(undefined);
    var nan = ARR(0 / 0);
    var num = ARR(1);
    var bool = ARR(false);
    var str = ARR('STRING');
    var obj = ARR({});
    var fn = ARR(function () {});
    var arr = ARR([]);

    (0, _chai.expect)(nil.toString()).to.be.equal('Either.Left(Null value)');
    (0, _chai.expect)(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    (0, _chai.expect)(nan.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(num.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(bool.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(str.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(obj.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(fn.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    (0, _chai.expect)(arr.get()).to.be.eql([]);
  });

  it('boolTypeOf() ', function () {
    var BOOL = _index2.default.boolTypeOf;

    var nil = BOOL(null);
    var undef = BOOL(undefined);
    var nan = BOOL(0 / 0);
    var num = BOOL(1);
    var bool = BOOL(false);
    var str = BOOL('STRING');
    var obj = BOOL({});
    var fn = BOOL(function () {});
    var arr = BOOL([]);

    (0, _chai.expect)(nil.toString()).to.be.equal('Either.Left(Null value)');
    (0, _chai.expect)(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    (0, _chai.expect)(nan.toString()).to.be.equal('Either.Left(Error: boolean expected, number given.)');
    (0, _chai.expect)(num.toString()).to.be.equal('Either.Left(Error: boolean expected, number given.)');
    (0, _chai.expect)(str.toString()).to.be.equal('Either.Left(Error: boolean expected, string given.)');
    (0, _chai.expect)(obj.toString()).to.be.equal('Either.Left(Error: boolean expected, object given.)');
    (0, _chai.expect)(fn.toString()).to.be.equal('Either.Left(Error: boolean expected, function given.)');
    (0, _chai.expect)(arr.toString()).to.be.eql('Either.Left(Error: boolean expected, object given.)');
    (0, _chai.expect)(bool.get()).to.be.equal(false);
  });

  it('objectTypeOF()', function () {
    var OBJ = _index2.default.objectTypeOF;
    var DATE = OBJ('Date');
    var FUNC = _index2.default.FUNC;

    var nil = DATE(null);
    var undef = FUNC(undefined);
    var notDate = DATE(1);
    var notFunc = FUNC(1);

    var date = DATE(new Date());
    var func = FUNC(function () {});

    (0, _chai.expect)(nil.toString()).to.be.equal('Either.Left(Null value)');
    (0, _chai.expect)(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    (0, _chai.expect)(date.isRight).to.be.equal(true);
    (0, _chai.expect)(func.isRight).to.be.equal(true);
    (0, _chai.expect)(notDate.toString()).to.be.equal('Either.Left(Error: Date expected, something else given.)');
    (0, _chai.expect)(notFunc.toString()).to.be.equal('Either.Left(Error: Function expected, something else given.)');
  });

  it('arrOF() ', function () {
    var arrOF = _index2.default.arrayOF;
    var NUM = _index2.default.numTypeOf;
    var arrOfNum = arrOF(NUM);
    var arr = arrOfNum([1, 2, 3]);

    (0, _chai.expect)(arr.get()[0].get()).to.be.equal(1);
    (0, _chai.expect)(arr.get()[1].get()).to.be.equal(2);
    (0, _chai.expect)(arr.get()[2].get()).to.be.equal(3);
  });
});