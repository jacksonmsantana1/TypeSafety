import { expect } from 'chai';
import Type from './index.js';

describe('TypeSafety => ', () => {
  it('typeOf() ', (done) => {
    let string = 'Some String';
    let number = 69;
    let boolean = true;

    let typeOf = Type.typeOf;
    let str = Type.str;
    let num = Type.num;
    let bool = Type.bool;

    try {
      expect(str(string)).to.be.equal(string);
      expect(num(number)).to.be.equal(number);
      expect(bool(boolean)).to.be.equal(boolean);
      done();
    } catch(e) {
      done(e);
    }
  });

  it('objectTypeOf() ', (done) => {
    let array = [];

    let objectTypeOf = Type.objectTypeOf;
    let arr = Type.arr;

    try {
      expect(arr(array)).to.be.equal(array);
      done();
    } catch(e) {
      done(e);
    }
  });

  it('arrayOf() ', () => {
    let str = Type.str;
    let arrayOf = Type.arrayOf;
    let arrStr = arrayOf(str);
    let arr = ['1', '2', '3'];

    expect(arrStr(arr)).to.be.eql(arr);
  });

  it('nil() ', () => {
    const nil = Type.nil;
    const nullValue = nil(null);
    const value = nil('String');

    expect(nullValue.isLeft).to.be.equal(true);
    expect(nullValue.toString()).to.be.equal('Either.Left(Null value)');
    expect(value.isRight).to.be.equal(true);
    expect(value.toString()).to.be.equal('Either.Right(String)');
  });

  it('undef() ', () => {
    const undef = Type.undef;
    const undefinedValue = undef(void 0);
    const value = undef('String');

    expect(undefinedValue.isLeft).to.be.equal(true);
    expect(undefinedValue.toString()).to.be.equal('Either.Left(Undefined value)');
    expect(value.isRight).to.be.equal(true);
    expect(value.toString()).to.be.equal('Either.Right(String)');
  });

  it('nan() ', () => {
    const nan = Type.nan;
    const nanValue = nan(NaN)
    const value = nan(1);

    expect(nanValue.isLeft).to.be.equal(true);
    expect(nanValue.toString()).to.be.equal('Either.Left(NaN value)');
    expect(value.isRight).to.be.equal(true);
    expect(value.toString()).to.be.equal('Either.Right(1)');
  });

  it('falsy() ', () => {
    const falsy = Type.falsy;
    const falseValue1 = falsy('');
    const falseValue2 = falsy('false');
    const falseValue3 = falsy(null);
    const falseValue4 = falsy(void 0);
    const falseValue5 = falsy('');
    const falseValue6 = falsy(Number.NaN);
    const truthy = falsy(1);

    expect(falseValue1.isRight).to.be.equal(true);
    expect(falseValue2.isRight).to.be.equal(true);
    expect(falseValue3.isRight).to.be.equal(true);
    expect(falseValue4.isRight).to.be.equal(true);
    expect(falseValue5.isRight).to.be.equal(true);
    expect(falseValue6.isRight).to.be.equal(true);
    expect(truthy.isLeft).to.be.equal(true);
    
    expect(falseValue1.get()).to.be.equal(false);
    expect(falseValue2.get()).to.be.equal(false);
    expect(falseValue3.get()).to.be.equal(false);
    expect(falseValue4.get()).to.be.equal(false);
    expect(falseValue5.get()).to.be.equal(false);
    expect(falseValue6.get()).to.be.equal(false);
    expect(truthy.toString()).to.be.equal('Either.Left(No falsy value was given)');
  });
  
  it('truthy() ', () => {
    const truthy = Type.truthy;
    const falseValue1 = truthy('');
    const falseValue2 = truthy('false');
    const falseValue3 = truthy(null);
    const falseValue4 = truthy(void 0);
    const falseValue5 = truthy('');
    const falseValue6 = truthy(Number.NaN);
    const _true = truthy(1);

    expect(falseValue1.isRight).to.be.equal(false);
    expect(falseValue2.isRight).to.be.equal(false);
    expect(falseValue3.isRight).to.be.equal(false);
    expect(falseValue4.isRight).to.be.equal(false);
    expect(falseValue5.isRight).to.be.equal(false);
    expect(falseValue6.isRight).to.be.equal(false);
    expect(_true.isLeft).to.be.equal(false);
    
    expect(_true.get()).to.be.equal(true);
  });

  it('strTypeOf() ', () => {
    const STR = Type.strTypeOf;
    const undef = STR(void 0);
    const nil = STR(null);
    const str = STR('STRING');
    const notStr1 = STR(1);
    const notStr2 = STR(false);
    const notStr3 = STR({});

    expect(undef.isLeft).to.eql(true);
    expect(nil.isLeft).to.be.eql(true);
    expect(notStr1.isLeft).to.be.eql(true);
    expect(notStr2.isLeft).to.be.eql(true);
    expect(notStr3.isLeft).to.be.eql(true);

    expect(undef.toString()).to.eql('Either.Left(Undefined value)');
    expect(nil.toString()).to.eql('Either.Left(Null value)');
    expect(notStr1.toString()).to.eql('Either.Left(Error: string expected, number given.)');
    expect(notStr2.toString()).to.eql('Either.Left(Error: string expected, boolean given.)');
    expect(notStr3.toString()).to.eql('Either.Left(Error: string expected, object given.)');

    expect(str.isRight).to.be.equal(true);
    expect(str.get()).to.be.equal('STRING');
  });

  it('numTypeOf() ', () => {
    const NUM = Type.numTypeOf;
    const undef = NUM(void 0);
    
    const nil = NUM(null);
    const nan = NUM((0/0));
    const num = NUM(1);

    const notNum1 = NUM('');
    const notNum2 = NUM(false);
    const notNum3 = NUM({});

    expect(undef.isLeft).to.eql(true);
    expect(nil.isLeft).to.be.eql(true);
    expect(nan.isLeft).to.be.eql(true);

    expect(notNum1.isLeft).to.be.eql(true);
    expect(notNum2.isLeft).to.be.eql(true);
    expect(notNum3.isLeft).to.be.eql(true);

    expect(undef.toString()).to.eql('Either.Left(Undefined value)');
    expect(nil.toString()).to.eql('Either.Left(Null value)');
    expect(nan.toString()).to.eql('Either.Left(NaN value)');

    expect(notNum1.toString()).to.eql('Either.Left(Error: number expected, string given.)');
    expect(notNum2.toString()).to.eql('Either.Left(Error: number expected, boolean given.)');
    expect(notNum3.toString()).to.eql('Either.Left(Error: number expected, object given.)');

    expect(num.isRight).to.be.equal(true);
    expect(num.get()).to.be.equal(1);
  });

  it('arrTypeOf() ', () => {
    const ARR = Type.ARR;

    const nil = ARR(null);
    const undef = ARR(undefined);
    const nan = ARR((0/0));
    const num = ARR(1);
    const bool = ARR(false);
    const str = ARR('STRING');
    const obj = ARR({});
    const fn = ARR(() => {});
    const arr = ARR([]);

    expect(nil.toString()).to.be.equal('Either.Left(Null value)');
    expect(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    expect(nan.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(num.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(bool.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(str.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(obj.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(fn.toString()).to.be.equal('Either.Left(Error: Array expected, something else given.)');
    expect(arr.get()).to.be.eql([]);
  });

  it('boolTypeOf() ', () => {
    const BOOL = Type.boolTypeOf;

    const nil = BOOL(null);
    const undef = BOOL(undefined);
    const nan = BOOL((0/0));
    const num = BOOL(1);
    const bool = BOOL(false);
    const str = BOOL('STRING');
    const obj = BOOL({});
    const fn = BOOL(() => {});
    const arr = BOOL([]);

    expect(nil.toString()).to.be.equal('Either.Left(Null value)');
    expect(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    expect(nan.toString()).to.be.equal('Either.Left(Error: boolean expected, number given.)');
    expect(num.toString()).to.be.equal('Either.Left(Error: boolean expected, number given.)');
    expect(str.toString()).to.be.equal('Either.Left(Error: boolean expected, string given.)');
    expect(obj.toString()).to.be.equal('Either.Left(Error: boolean expected, object given.)');
    expect(fn.toString()).to.be.equal('Either.Left(Error: boolean expected, function given.)');
    expect(arr.toString()).to.be.eql('Either.Left(Error: boolean expected, object given.)');
    expect(bool.get()).to.be.equal(false);
  });

  it('objectTypeOF()', () => {
    const OBJ = Type.objectTypeOF;
    const DATE = OBJ('Date');
    const FUNC = Type.FUNC;

    const nil = DATE(null);
    const undef = FUNC(undefined);
    const notDate = DATE(1);
    const notFunc = FUNC(1);
    
    const date = DATE(new Date());
    const func = FUNC(() => {});

    expect(nil.toString()).to.be.equal('Either.Left(Null value)');
    expect(undef.toString()).to.be.equal('Either.Left(Undefined value)');
    expect(date.isRight).to.be.equal(true);
    expect(func.isRight).to.be.equal(true);
    expect(notDate.toString()).to.be.equal('Either.Left(Error: Date expected, something else given.)');
    expect(notFunc.toString()).to.be.equal('Either.Left(Error: Function expected, something else given.)');
  });

  it('arrOF() ', () => {
    const arrOF = Type.arrayOF;
    const NUM = Type.numTypeOf;
    const arrOfNum = arrOF(NUM);
    const arr = arrOfNum([1, 2, 3]);

    expect(arr.get()[0].get()).to.be.equal(1);
    expect(arr.get()[1].get()).to.be.equal(2);
    expect(arr.get()[2].get()).to.be.equal(3);
  });
});
