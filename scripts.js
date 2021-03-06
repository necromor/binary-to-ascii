

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
  ['z', '01111010'],
  [' ', '00100000'],
  ['.', '00101110'],
  [',', '00101100'],
  ['!', '00100001'],
  ['?', '00111111'],
  ['-', '00101101'],
  [':', '00111010'],
  [';', '00111011']
];

const charMap = new Map(kvArray);

let A2BModule, B2AModule, MainModule;

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
    consumes a string and returns an array of its all characters without punctuation signs
    returns an empty array if the given string is empty or contains only punctuation signs
    the result array contains only of characters from charMap that have a binary representation
    */

    const raw = Array.from(string);

    // replace all disallowed characters as undefined
    let result = raw.map( (el) => {
      if (charMap.has(el)) {
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

B2AModule = {
  /*
  module that handles conversion from binary to ascii
  */

  binaryToChar: (binary) => {
    /*
    consumes a char in binary form and converts it to ascii using charMap
    returns undefined if binary is incomplete or unknown
    */

    const keys = Array.from(charMap.keys());
    const values = Array.from(charMap.values());
    const index = values.indexOf(binary);

    return keys[index];
  },

  splitToBytes: (binary) => {
    /*
    consumes a string of binaries and returns an arry of individual chars in binary form
    ommits incomplete binaries and signs that are not 0 or 1
    */
 
    const len = binary.length;

    if (len < 8 ) { return []; }

    let result = [];
    let str = '';

    for (let i = 0; i < len; i++) {
      // if current string has exactly 8 chars add it to array
      // it counts as a loop iteration so we must get back one
      if (str.length === 8) {
        // check if the binary character is in our charMap
        if (Array.from(charMap.values()).indexOf(str) !== -1) {
          result.push(str);
        }
        str = '';
        i--;
      } else {
        // check if the current string is 0 or 1
        const chr = binary.substr(i,1);
        if ( chr === '0' || chr === '1') {
          str += chr;
        }
      }
    }
    
    // add the last part if it has 8 characters
    if (str.length === 8) {
      result.push(str);
    }

    return result;
  },

  convertBinaryToAscii: (binary) => {
    /*
    consumes a string in binary form and returns it transformed to text
    */

    // convert string into an array of binary 
    const elements = B2AModule.splitToBytes(binary);

    // create an array of binary representation of the elements
    const result = elements.map( el => B2AModule.binaryToChar(el) );

    return result.join('');
  }

};

MainModule = {
  /*
  module responsible for all the UI interactions 
  */

  DOMel: {
    text_a2b: document.querySelector('#text__a2b'),
    text_b2a: document.querySelector('#text__b2a')
  },

  convertB2A: () => {
    /*
    gets the text from text__b2a and converts it to ascii form
    */

    MainModule.DOMel.text_a2b.value = B2AModule.convertBinaryToAscii(MainModule.DOMel.text_b2a.value);
  },

  convertA2B: () => {
    /*
    gets the text from text__a2b and converts it to binary form
    */

    MainModule.DOMel.text_b2a.value = A2BModule.convertAsciiToBinary(MainModule.DOMel.text_a2b.value);
  },

  registerEvents: function() {
    /*
    function that registers events on buttons
    */

    document.querySelector('#btn__b2a').addEventListener('click', MainModule.convertB2A); 
    document.querySelector('#btn__a2b').addEventListener('click', MainModule.convertA2B); 
  },

  init: () => {
    MainModule.registerEvents();
  }

};

MainModule.init();

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
  module.exports = {
    A2B: A2BModule,
    B2A: B2AModule
  }
}
