'use strict';
const expect = require('chai').expect;
const A2BModule = require('./scripts.js');

describe('A2BModule', () => {
  it('should exist', () => {
    const A2BModule = require('./scripts.js');
    expect(A2BModule).to.not.be.undefined;
  });
});

describe('#charToBinary()', () => {
  it('should convert a single char to its binary form', () => {
    let input = 'A';
    let expected = '01000001';
    let actual = A2BModule.charToBinary(input);
    expect(actual).to.equal(expected);

    input = 'B';
    expected = '01000010';
    actual = A2BModule.charToBinary(input);
    expect(actual).to.equal(expected);

    input = 'ł';
    expected = undefined;
    actual = A2BModule.charToBinary(input);
    expect(actual).to.equal(expected);
    
  });
});

describe('#splitToIndividualChars()', () => {
  it('should split a given text into an array without interpunction signs', () => {
    let input = 'TEXT';
    let expected = ['T', 'E', 'X', 'T'];
    let actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = 'text';
    expected = ['t', 'e', 'x', 't'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = 'another';
    expected = ['a', 'n', 'o', 't', 'h', 'e', 'r'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);
   
    input = 'another text';
    expected = ['a', 'n', 'o', 't', 'h', 'e', 'r', 't', 'e', 'x', 't'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = '.another text!';
    expected = ['a', 'n', 'o', 't', 'h', 'e', 'r', 't', 'e', 'x', 't'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = '.!?1234"{-';
    expected = [];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

  });
});

describe('#convertAsciiToBinary()', () => {
  it('should convert ascii text to its binary form', () => {
    let input = 'TEXT';
    let expected = '01010100010001010101100001010100';
    let actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);

    input = 'TEXT TWO';
    expected = '01010100010001010101100001010100010101000101011101001111';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);
   
    input = 'TEXT - TWO.';
    expected = '01010100010001010101100001010100010101000101011101001111';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);

    input = 'Open source.';
    expected = '01001111011100000110010101101110011100110110111101110101011100100110001101100101';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);

    input = '.!?1234"{-';
    expected = '';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.eql(expected);
  });
});










