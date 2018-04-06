'use strict';
const expect = require('chai').expect;
const MyModules = require('./scripts.js');
const A2BModule = MyModules.A2B;
const B2AModule = MyModules.B2A;

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
    expected = ['a', 'n', 'o', 't', 'h', 'e', 'r', ' ', 't', 'e', 'x', 't'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = '.another text!';
    expected = ['.', 'a', 'n', 'o', 't', 'h', 'e', 'r', ' ', 't', 'e', 'x', 't', '!'];
    actual = A2BModule.splitToIndividualChars(input);
    expect(actual).to.eql(expected);

    input = '.!?1234"{-';
    expected = ['.', '!', '?', '-'];
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
    expected = '0101010001000101010110000101010000100000010101000101011101001111';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);
   
    input = 'TEXT - TWO.';
    expected = '0101010001000101010110000101010000100000001011010010000001010100010101110100111100101110';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);

    input = 'Open source.';
    expected = '010011110111000001100101011011100010000001110011011011110111010101110010011000110110010100101110';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.equal(expected);

    input = '.!?1234"{-';
    expected = '00101110001000010011111100101101';
    actual = A2BModule.convertAsciiToBinary(input); 
    expect(actual).to.eql(expected);
  });
});


describe('B2AModule', () => {
  it('should exist', () => {
    const B2AModule = require('./scripts.js');
    expect(B2AModule).to.not.be.undefined;
  });
});

describe('#binaryToChar()', () => {
  it('should convert a single char in its binary form to text', () => {
    let input = '01111010';
    let expected = 'z';
    let actual = B2AModule.binaryToChar(input);
    expect(actual).to.equal(expected);

    input = '01001011';
    expected = 'K';
    actual = B2AModule.binaryToChar(input);
    expect(actual).to.equal(expected);

    input = '01001';
    expected = undefined;
    actual = B2AModule.binaryToChar(input);
    expect(actual).to.equal(expected);

    input = '00000000';
    expected = undefined;
    actual = B2AModule.binaryToChar(input);
    expect(actual).to.equal(expected);
    
  });
});

describe('#splitToBytes()', () => {
  it('should split given string of binaries into an array where each element contains one byte (8 chars)', () => {
    let input = '01010100011001010111001101110100';
    let expected = ['01010100', '01100101', '01110011', '01110100'];
    let actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '010010010110111001000101';
    expected = ['01001001', '01101110', '01000101'];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '0100100101101110010001';
    expected = ['01001001', '01101110'];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '2010010010110111001000101';
    expected = ['01001001', '01101110', '01000101'];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '01001001111111110110111001000101';
    expected = ['01001001', '01101110', '01000101'];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '20100.k10010110111001jh5000101';
    expected = ['01001001', '01101110', '01000101'];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);

    input = '00101';
    expected = [];
    actual = B2AModule.splitToBytes(input);
    expect(actual).to.eql(expected);
  });
});

describe('#convertBinaryToAscii()', () => {
  it('should convert given binary string to ascii characters', () => {
    let input = '0100111101110000011001010110111000100000011100110110111101110101011100100110001101100101';
    let expected = 'Open source';
    let actual = B2AModule.convertBinaryToAscii(input); 
    expect(actual).to.equal(expected);

    input = '01010100010001010101100001010100';
    expected = 'TEXT';
    actual = B2AModule.convertBinaryToAscii(input); 
    expect(actual).to.equal(expected);

    input = '0101010001000101010110000101010000100000001011010010000001010100010101110100111100101110';
    expected = 'TEXT - TWO.';
    actual = B2AModule.convertBinaryToAscii(input); 
    expect(actual).to.equal(expected);

    input = '0000000';
    expected = '';
    actual = B2AModule.convertBinaryToAscii(input); 
    expect(actual).to.equal(expected);

    input = '00101110001000010011111100101101';
    expected = '.!?-';
    actual = B2AModule.convertBinaryToAscii(input); 
    expect(actual).to.equal(expected);
    
  });
});









