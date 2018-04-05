

const kvArray = [
  ['A', '01000001'], 
  ['B', '01000010'], 
  ['C', '01000011'], 
  ['D', '01000100'], 
  ['E', '01000101'], 
  ['F', '01000110'], 
  ['G', '01000111'],
  ['H', '01001000'], 
  ['I', '01001001'], 
  ['J', '01001010'], 
  ['K', '01001011'], 
  ['L', '01001100'], 
  ['M', '01001101'], 
  ['N', '01001110'], 
  ['O', '01001111'], 
  ['P', '01010000'], 
  ['Q', '01010001'], 
  ['R', '01010010'], 
  ['S', '01010011'], 
  ['T', '01010100'], 
  ['U', '01010101'], 
  ['V', '01010110'], 
  ['W', '01010111'], 
  ['X', '01011000'], 
  ['Y', '01011001'], 
  ['Z', '01011010'],
  ['a', '01100001'], 
  ['b', '01100010'], 
  ['c', '01100011'], 
  ['d', '01100100'], 
  ['e', '01100101'], 
  ['f', '01100110'], 
  ['g', '01100111'],
  ['h', '01101000'], 
  ['i', '01101001'], 
  ['j', '01101010'], 
  ['k', '01101011'], 
  ['l', '01101100'], 
  ['m', '01101101'], 
  ['n', '01101110'], 
  ['o', '01101111'], 
  ['p', '01110000'], 
  ['q', '01110001'], 
  ['r', '01110010'], 
  ['s', '01110011'], 
  ['t', '01110100'], 
  ['u', '01110101'], 
  ['v', '01110110'], 
  ['w', '01110111'], 
  ['x', '01111000'], 
  ['y', '01111001'], 
  ['z', '01111010'] 
];

const charMap = new Map(kvArray);

let A2BModule;

A2BModule = {
  /*
  module that handles conversion from ascii to binary
  */

 charToBinary: (char) => {
   /*
   consumes a char (single character) and returns its representation in binary
   the conversion is based on external map of characters
   if the character cannot be found the function returns undefined
   */

   return charMap.get(char); 
 },

  splitToIndividualChars: (string) => {
    /*
    consumes a string and returns an array of its all characters without spaces or
    other interpunciton signs
    returns an empty array if the given string is empty or contains only interpunction characters
    the result array contains only of characters from charMap that have a binary representation
    */

    const raw = Array.from(string);

    // replace all disallowed characters as undefined
    let result = raw.map( (el) => {
      if (charMap.get(el) !== undefined) {
        return el;
      }
    });

    // get rid of undefined elements
    result = result.filter( el => el !== undefined ); 

    return result;
  },

  convertAsciiToBinary: (string) => {
    /*
    consumes a string and returns its binary representation
    uses only the characters in charMap which have its binary form
    */

    // convert string into an array of elements that have binary representation
    const elements = A2BModule.splitToIndividualChars(string);

    // create an array of binary representation of the elements
    const result = elements.map( el => A2BModule.charToBinary(el) );

    return result.join('');
  }

};


if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
  module.exports = A2BModule;
}
