/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const helpers = __webpack_require__(2);
	const InvertedIndex = __webpack_require__(1);
	const model = __webpack_require__(3);
	
	const InvertedIndexTest = new InvertedIndex();
	
	describe('sort function', () => {
	  it('Should sort unordered objects alphabetically',
	   () => {
	     const sortedObject = helpers.sort(model.unorderedObject);
	     expect(Object.keys(sortedObject))
	    .toEqual(Object.keys(model.orderedObject));
	   });
	});
	
	describe('Fetch title function', () => {
	  it('Should compile all value of title key in an array of objects',
	  () => {
	    expect(helpers.fetchTitle(model.validJsonTestData[0]))
	    .toEqual(['A good bot', 'A bad bot']);
	  });
	});
	
	describe('Check if every key in object is null', () => {
	  it('should return true if every key in object is null',
	  () => {
	    expect(helpers.allIsEmpty(model.searchResults[5])).toEqual(true);
	  });
	});
	
	describe('Check for string in an array', () => {
	  it('should return true if string is found in array',
	  () => {
	    expect(helpers.isFound('A good bot', ['A good bot', 'A bad bot']))
	    .toEqual(true);
	  });
	
	  it('Should return false if string is not found in array',
	  () => {
	    expect(helpers.isFound('A red bot', ['A good bot', 'A bad bot']))
	    .toEqual(false);
	  });
	});
	
	describe('Strip string function', () => {
	  it('Should return lowercase string without any symbols',
	  () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl'))
	    .toEqual('nothing like breaking like glass wrote the blonde girl');
	  });
	  it('Should return null when searching for symbols in striped string',
	  () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl')
	    .match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/))
	    .toEqual(null);
	  });
	  it('Should return null when input is not of type String',
	  () => {
	    expect(helpers.stripStr(32239923023)).toEqual(null);
	  });
	});
	
	describe('Validity of an input',
	() => {
	  it('Should return true if input is in a valid format',
	  () => {
	    expect(helpers.isValid(model.validJsonTestData[0])).toBe(true);
	  });
	
	  it('Should return false if input is in an invalid format',
	  () => {
	    expect(helpers.isValid(model.invalidData[1])).toBe(false);
	  });
	
	  it('Shoul return false if null is passed in',
	  () => {
	    expect(helpers.isValid(null)).toBe(false);
	  });
	
	  it('Should return false if nothing is passed in',
	  () => {
	    expect(helpers.isValid()).toBe(false);
	  });
	
	  it('Should return false if input is not an Array of objects',
	  () => {
	    expect(helpers.isValid('A json file')).toBe(false);
	    expect(helpers.isValid([])).toBe(false);
	    expect(helpers.isValid(32323)).toBe(false);
	  });
	
	  it('Should return false if the text key is empty',
	  () => {
	    expect(helpers.isValid([{ title: 'Great', text: '' }]))
	    .toBe(false);
	  });
	  it('Should return false if the title key is empty',
	  () => {
	    expect(helpers
	    .isValid([
	      { title: '', author: 'Scott Fizgerald', text: 'Gatsby and Daisy' }]))
	      .toBe(false);
	  });
	});
	
	
	describe('Generate inverted index function',
	() => {
	  it('Should return generated inverted index for an input',
	  () => {
	    expect(InvertedIndexTest
	    .generateIndex('book1', model.validJsonTestData[0]))
	    .toEqual(model.index);
	  });
	
	  it('Should return null for an empty input',
	  () => {
	    expect(InvertedIndexTest.generateIndex()).toEqual(null);
	  });
	
	  it('Should return null if null is passed in',
	  () => {
	    expect(InvertedIndexTest.generateIndex(null)).toEqual(null);
	  });
	
	  it('Should return null fif input is not of type Array',
	  () => {
	    expect(InvertedIndexTest.generateIndex({})).toEqual(null);
	    expect(InvertedIndexTest.generateIndex(2323)).toEqual(null);
	    expect(InvertedIndexTest.generateIndex('edge cases'))
	    .toEqual(null);
	  });
	
	  it('Should return null if data is not in a valid format',
	  () => {
	    expect(InvertedIndexTest
	    .generateIndex('invalid data', model.invalidData[0]))
	    .toEqual(null);
	    expect(InvertedIndexTest
	    .generateIndex('invalid data', model.invalidData[1]))
	    .toEqual(null);
	  });
	});
	
	describe('Save generated index', () => {
	  it('Should return object of all generated Index',
	  () => {
	    expect(InvertedIndexTest.indices).toEqual(model.indices);
	  });
	});
	
	
	describe('Search function',
	() => {
	  it('Should return search results for query string in file name',
	  () => {
	    expect(InvertedIndexTest.search('bad good bot knock', 'book1'))
	    .toEqual(model.searchResults[0]);
	  });
	
	  it('Should return null if search query is not found in file',
	  () => {
	    expect(InvertedIndexTest
	    .search('a really good knock for the bot', 'book1'))
	    .toEqual(model.searchResults[1]);
	  });
	});
	
	describe('Search in all files function',
	() => {
	  it('Should return search results for query string in all generated files',
	  () => {
	    InvertedIndexTest
	    .generateIndex('book2', model.validJsonTestData[1]);
	    expect(InvertedIndexTest
	    .searchAll('tomorrow helps the devil give a bot a knock'))
	    .toEqual(model.searchResults[4]);
	  });
	
	  it('Should return filename to null if search query is not found in file',
	  () => {
	    expect(InvertedIndexTest
	    .searchAll('He sticks to his wild side'))
	    .toEqual(model.searchResults[3]);
	  });
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const helpers = __webpack_require__(2);
	
	/**
	 * @class InvertedIndex
	 */
	class InvertedIndex {
	
	  /**
	   * Creates an instance of InvertedIndex.
	   * @memberOf InvertedIndex
	   */
	  constructor() {
	    this.indices = {};
	    this.fetchTitle = helpers.fetchTitle;
	    this.isFound = helpers.isFound;
	  }
	
	  /**
	   * Generates index for a valid json file
	   * @param {String} fileName - A string for name of file to be indexed
	   * @param   {Array} fileContents - an Array of objects to be indexed
	   * @returns {Object} in key value pair where each word is key
	   * and value is an  array of titles
	   */
	  generateIndex(fileName, fileContents) {
	    if (!helpers.isValid(fileContents)) {
	      return null;
	    }
	    const index = {};
	    fileContents.forEach((book) => {
	      const text = helpers.stripStr(book.text).split(' ');
	      text.forEach((word) => {
	        if (index[word]) {
	          const wordList = index[word];
	          if (wordList.indexOf(book.title) === -1) {
	            wordList.push(book.title);
	            index[word] = wordList;
	          }
	        } else if (word !== '') {
	          index[word] = [book.title];
	        }
	      });
	    });
	
	    this.indices[fileName] = helpers.sort(index);
	    return helpers.sort(index);
	  }
	
	  /**
	   * Searches for a keyword or phrase within a generated index
	   * @param   {String} query - word or phrase to search for
	   * @param   {Object} fileName - generated index to search in
	   * @returns {Object} result - in key value pair where each word
	   * in the query is key and value is an  array of titles
	   */
	  search(query, fileName) {
	    const words = Object.keys(this.indices[fileName]);
	    const queryList = helpers.stripStr(query).split(' ');
	    const result = {};
	    queryList.forEach((word) => {
	      if (words.indexOf(word) !== -1 && word !== ' ') {
	        result[word] = this.indices[fileName][word];
	      } else if (words.indexOf(word) === -1 && word !== '') {
	        result[word] = [null];
	      }
	    });
	    return helpers.allIsEmpty(result) ? null : result;
	  }
	
	  /**
	   * Searches for a keyword or phrase within multiple generated
	   * indices
	   * @param   {String} query - word or phrase to search for
	   * @param   {Array} dataset - Array containing all generated index
	   * in which to search in
	   * @returns {Object} searchResults - Object containing mapping of
	   * file name to the search
	   * result in each file
	   */
	  searchAll(query) {
	    const searchResults = {};
	    Object.keys(this.indices).forEach((fileName) => {
	      searchResults[fileName] = this.search(query, fileName);
	    });
	    return searchResults;
	  }
	}
	
	window.InvertedIndex = InvertedIndex;
	
	module.exports = InvertedIndex;


/***/ },
/* 2 */
/***/ function(module, exports) {

	const helpers = {
	  /**
	   * Sort an object alphabetically
	   * @param {Object} data - an unsorted Object
	   * @returns {Object} - sorted object
	   */
	  sort(data) {
	    const sorted = {};
	    Object.keys(data).sort().forEach((key) => {
	      sorted[key] = data[key];
	    });
	    return sorted;
	  },
	
	  /**
	   * Fetch all the titles from an array of objects containing title key
	   * @param {Array} data - valid array of objects containing title key
	   * @returns {Array} - an array of titles
	   */
	  fetchTitle(data) {
	    return data.map(item => item.title);
	  },
	
	  /**
	   * Checks if all key in the object is contains null in the array
	   * @param {Object} data - Object containing generated indices
	   * @returns {Boolean} - true if the vaulues of all keys are null
	   */
	  allIsEmpty(data) {
	    const dataLen = Object.keys(data).length;
	    let nullValue = 0;
	    Object.keys(data).forEach((i) => {
	      if (data[i].indexOf(null) !== -1) {
	        nullValue += 1;
	      }
	    });
	    return nullValue === dataLen;
	  },
	
	  /**
	   * Checks if file is a valid json file
	   * @param   {Array} data - file in which to determine validity
	   * @returns {Boolean} - true if file is valid and false if otherwise
	   */
	  isValid(data) {
	    if (!data || !Array.isArray(data) || data.length < 1) {
	      return false;
	    }
	    const valid = data.map((book) => {
	      if (!book.title || !book.text) {
	        return false;
	      } else if (typeof book.title === 'string'
	      && typeof book.text === 'string') {
	        return true;
	      }
	    });
	    return valid.indexOf(false) === -1;
	  },
	
	  /**
	   * Check if a title is found in an array of titles
	   * @param {String} title - title to search for
	   * @param {Array} titles - array of titles to search in
	   * @returns {Boolean} - true if title was found and false otherwise
	   */
	  isFound(title, titles) {
	    return titles.indexOf(title) !== -1;
	  },
	
	  /**
	   * Removes special characters from a string and converts to lowercase
	   * @param   {String} wholeString - contains a string
	   * @returns {String} - a lowercase string without symbols
	   */
	  stripStr(wholeString) {
	    if (typeof wholeString !== 'string') {
	      return null;
	    }
	    return wholeString.replace(/[^a-zA-Z ]/g, '').toLowerCase();
	  }
	};
	
	module.exports = helpers;


/***/ },
/* 3 */
/***/ function(module, exports) {

	class FakeInvertedIndex {
	
	}
	
	const model = {
	
	  orderedObject: {
	    a: '',
	    alice: '',
	    alliance: '',
	    dork: '',
	    fate: '',
	    lord: '',
	    zoe: ''
	  },
	
	  unorderedObject: {
	    alliance: '',
	    zoe: '',
	    dork: '',
	    lord: '',
	    a: '',
	    fate: '',
	    alice: ''
	  },
	
	  validJsonTestData: [
	    [{
	      title: 'A good bot',
	      text: 'Give a good bot a penny a day'
	    },
	    {
	      title: 'A bad bot',
	      text: 'Give a bad bot a knock on the head'
	    }],
	    [{
	      title: 'Gone With The Wind',
	      text: 'After all, tomorrow is another day.'
	    },
	    {
	      title: 'Crime and Punishment',
	      text: 'When reason fails, the devil helps.'
	    }]
	  ],
	
	  index: {
	    give: ['A good bot', 'A bad bot'],
	    a: ['A good bot', 'A bad bot'],
	    good: ['A good bot'],
	    bot: ['A good bot', 'A bad bot'],
	    penny: ['A good bot'],
	    day: ['A good bot'],
	    bad: ['A bad bot'],
	    knock: ['A bad bot'],
	    on: ['A bad bot'],
	    the: ['A bad bot'],
	    head: ['A bad bot']
	  },
	
	  indices: {
	    book1: {
	      give: ['A good bot', 'A bad bot'],
	      a: ['A good bot', 'A bad bot'],
	      good: ['A good bot'],
	      bot: ['A good bot', 'A bad bot'],
	      penny: ['A good bot'],
	      day: ['A good bot'],
	      bad: ['A bad bot'],
	      knock: ['A bad bot'],
	      on: ['A bad bot'],
	      the: ['A bad bot'],
	      head: ['A bad bot']
	    }
	  },
	
	  FakeInvertedIndex,
	
	  invalidData: [
	    [
	      {
	        name: 'Alice',
	        fame: 'Alice falls into a rabbit hole and enters a world full of imagination.'
	      },
	      {
	        name: 'The Lord',
	        fame: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
	      }
	    ],
	    [
	      {
	        title: 'A good bot',
	        tex: 'Give a good bot a penny a day'
	      }
	    ]
	  ],
	
	  searchResults: [
	    {
	      bad: ['A bad bot'],
	      bot: ['A good bot', 'A bad bot'],
	      knock: ['A bad bot'],
	      good: ['A good bot']
	    },
	    {
	      a: ['A good bot', 'A bad bot'],
	      really: [null],
	      good: ['A good bot'],
	      knock: ['A bad bot'],
	      for: [null],
	      the: ['A bad bot'],
	      bot: ['A good bot', 'A bad bot']
	    },
	    null,
	    {
	      book1: null,
	      book2: null
	    },
	    {
	      book1: {
	        tomorrow: [null],
	        helps: [null],
	        devil: [null],
	        a: ['A good bot', 'A bad bot'],
	        the: ['A bad bot'],
	        give: ['A good bot', 'A bad bot'],
	        bot: ['A good bot', 'A bad bot'],
	        knock: ['A bad bot']
	      },
	      book2: {
	        a: [null],
	        give: [null],
	        bot: [null],
	        knock: [null],
	        tomorrow: ['Gone With The Wind'],
	        helps: ['Crime and Punishment'],
	        the: ['Crime and Punishment'],
	        devil: ['Crime and Punishment'],
	      }
	    },
	    {
	      a: [null],
	      he: [null],
	      look: [null],
	      said: [null]
	    }
	  ]
	};
	
	module.exports = model;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODU4OGUyMTZmMmIwMTNmNDNhODU/ODAwOSIsIndlYnBhY2s6Ly8vLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2ludmVydGVkLWluZGV4LmpzPzI0MzAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9oZWxwZXJzLmpzPzZmOTkiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zcGVjL3Rlc3Rtb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLE9BQU87QUFDckM7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVI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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImludmVydGVkLWluZGV4LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA4NTg4ZTIxNmYyYjAxM2Y0M2E4NSIsImNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuLi9qcy9oZWxwZXJzJyk7XG5jb25zdCBJbnZlcnRlZEluZGV4ID0gcmVxdWlyZSgnLi4vanMvaW52ZXJ0ZWQtaW5kZXgnKTtcbmNvbnN0IG1vZGVsID0gcmVxdWlyZSgnLi90ZXN0bW9kZWxzJyk7XG5cbmNvbnN0IEludmVydGVkSW5kZXhUZXN0ID0gbmV3IEludmVydGVkSW5kZXgoKTtcblxuZGVzY3JpYmUoJ3NvcnQgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdTaG91bGQgc29ydCB1bm9yZGVyZWQgb2JqZWN0cyBhbHBoYWJldGljYWxseScsXG4gICAoKSA9PiB7XG4gICAgIGNvbnN0IHNvcnRlZE9iamVjdCA9IGhlbHBlcnMuc29ydChtb2RlbC51bm9yZGVyZWRPYmplY3QpO1xuICAgICBleHBlY3QoT2JqZWN0LmtleXMoc29ydGVkT2JqZWN0KSlcbiAgICAudG9FcXVhbChPYmplY3Qua2V5cyhtb2RlbC5vcmRlcmVkT2JqZWN0KSk7XG4gICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnRmV0Y2ggdGl0bGUgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdTaG91bGQgY29tcGlsZSBhbGwgdmFsdWUgb2YgdGl0bGUga2V5IGluIGFuIGFycmF5IG9mIG9iamVjdHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuZmV0Y2hUaXRsZShtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwoWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ0NoZWNrIGlmIGV2ZXJ5IGtleSBpbiBvYmplY3QgaXMgbnVsbCcsICgpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBldmVyeSBrZXkgaW4gb2JqZWN0IGlzIG51bGwnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuYWxsSXNFbXB0eShtb2RlbC5zZWFyY2hSZXN1bHRzWzVdKSkudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ0NoZWNrIGZvciBzdHJpbmcgaW4gYW4gYXJyYXknLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgc3RyaW5nIGlzIGZvdW5kIGluIGFycmF5JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzRm91bmQoJ0EgZ29vZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKVxuICAgIC50b0VxdWFsKHRydWUpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiBzdHJpbmcgaXMgbm90IGZvdW5kIGluIGFycmF5JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzRm91bmQoJ0EgcmVkIGJvdCcsIFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSkpXG4gICAgLnRvRXF1YWwoZmFsc2UpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnU3RyaXAgc3RyaW5nIGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnU2hvdWxkIHJldHVybiBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgYW55IHN5bWJvbHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuc3RyaXBTdHIoJ1wiI05vdGhJbmcgbGlLZSBicmVhS2luZyBsSWtlIGdsQXNzIVwiLCB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKSlcbiAgICAudG9FcXVhbCgnbm90aGluZyBsaWtlIGJyZWFraW5nIGxpa2UgZ2xhc3Mgd3JvdGUgdGhlIGJsb25kZSBnaXJsJyk7XG4gIH0pO1xuICBpdCgnU2hvdWxkIHJldHVybiBudWxsIHdoZW4gc2VhcmNoaW5nIGZvciBzeW1ib2xzIGluIHN0cmlwZWQgc3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzXG4gICAgLnN0cmlwU3RyKCdcIiNOb3RoSW5nIGxpS2UgYnJlYUtpbmcgbElrZSBnbEFzcyFcIiwgd3JvdGUgdGhlIGJsb25kZSBnaXJsJylcbiAgICAubWF0Y2goL1stISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjsnPD4/LC5cXC9dLykpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuICBpdCgnU2hvdWxkIHJldHVybiBudWxsIHdoZW4gaW5wdXQgaXMgbm90IG9mIHR5cGUgU3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLnN0cmlwU3RyKDMyMjM5OTIzMDIzKSkudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ1ZhbGlkaXR5IG9mIGFuIGlucHV0JyxcbigpID0+IHtcbiAgaXQoJ1Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBpbnB1dCBpcyBpbiBhIHZhbGlkIGZvcm1hdCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKG1vZGVsLnZhbGlkSnNvblRlc3REYXRhWzBdKSkudG9CZSh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgaW5wdXQgaXMgaW4gYW4gaW52YWxpZCBmb3JtYXQnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZChtb2RlbC5pbnZhbGlkRGF0YVsxXSkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnU2hvdWwgcmV0dXJuIGZhbHNlIGlmIG51bGwgaXMgcGFzc2VkIGluJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQobnVsbCkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiBub3RoaW5nIGlzIHBhc3NlZCBpbicsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKCkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiBpbnB1dCBpcyBub3QgYW4gQXJyYXkgb2Ygb2JqZWN0cycsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKCdBIGpzb24gZmlsZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKFtdKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZCgzMjMyMykpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBmYWxzZSBpZiB0aGUgdGV4dCBrZXkgaXMgZW1wdHknLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZChbeyB0aXRsZTogJ0dyZWF0JywgdGV4dDogJycgfV0pKVxuICAgIC50b0JlKGZhbHNlKTtcbiAgfSk7XG4gIGl0KCdTaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSB0aXRsZSBrZXkgaXMgZW1wdHknLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuaXNWYWxpZChbXG4gICAgICB7IHRpdGxlOiAnJywgYXV0aG9yOiAnU2NvdHQgRml6Z2VyYWxkJywgdGV4dDogJ0dhdHNieSBhbmQgRGFpc3knIH1dKSlcbiAgICAgIC50b0JlKGZhbHNlKTtcbiAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnR2VuZXJhdGUgaW52ZXJ0ZWQgaW5kZXggZnVuY3Rpb24nLFxuKCkgPT4ge1xuICBpdCgnU2hvdWxkIHJldHVybiBnZW5lcmF0ZWQgaW52ZXJ0ZWQgaW5kZXggZm9yIGFuIGlucHV0JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdib29rMScsIG1vZGVsLnZhbGlkSnNvblRlc3REYXRhWzBdKSlcbiAgICAudG9FcXVhbChtb2RlbC5pbmRleCk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIG51bGwgZm9yIGFuIGVtcHR5IGlucHV0JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KCkpLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIG51bGwgaWYgbnVsbCBpcyBwYXNzZWQgaW4nLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIG51bGwgZmlmIGlucHV0IGlzIG5vdCBvZiB0eXBlIEFycmF5JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KHt9KSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgyMzIzKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgnZWRnZSBjYXNlcycpKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBudWxsIGlmIGRhdGEgaXMgbm90IGluIGEgdmFsaWQgZm9ybWF0JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdpbnZhbGlkIGRhdGEnLCBtb2RlbC5pbnZhbGlkRGF0YVswXSkpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0XG4gICAgLmdlbmVyYXRlSW5kZXgoJ2ludmFsaWQgZGF0YScsIG1vZGVsLmludmFsaWREYXRhWzFdKSlcbiAgICAudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ1NhdmUgZ2VuZXJhdGVkIGluZGV4JywgKCkgPT4ge1xuICBpdCgnU2hvdWxkIHJldHVybiBvYmplY3Qgb2YgYWxsIGdlbmVyYXRlZCBJbmRleCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaW5kaWNlcykudG9FcXVhbChtb2RlbC5pbmRpY2VzKTtcbiAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnU2VhcmNoIGZ1bmN0aW9uJyxcbigpID0+IHtcbiAgaXQoJ1Nob3VsZCByZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIHF1ZXJ5IHN0cmluZyBpbiBmaWxlIG5hbWUnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LnNlYXJjaCgnYmFkIGdvb2QgYm90IGtub2NrJywgJ2Jvb2sxJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1swXSk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIG51bGwgaWYgc2VhcmNoIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2goJ2EgcmVhbGx5IGdvb2Qga25vY2sgZm9yIHRoZSBib3QnLCAnYm9vazEnKSlcbiAgICAudG9FcXVhbChtb2RlbC5zZWFyY2hSZXN1bHRzWzFdKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ1NlYXJjaCBpbiBhbGwgZmlsZXMgZnVuY3Rpb24nLFxuKCkgPT4ge1xuICBpdCgnU2hvdWxkIHJldHVybiBzZWFyY2ggcmVzdWx0cyBmb3IgcXVlcnkgc3RyaW5nIGluIGFsbCBnZW5lcmF0ZWQgZmlsZXMnLFxuICAoKSA9PiB7XG4gICAgSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnYm9vazInLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YVsxXSk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0XG4gICAgLnNlYXJjaEFsbCgndG9tb3Jyb3cgaGVscHMgdGhlIGRldmlsIGdpdmUgYSBib3QgYSBrbm9jaycpKVxuICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbNF0pO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBmaWxlbmFtZSB0byBudWxsIGlmIHNlYXJjaCBxdWVyeSBpcyBub3QgZm91bmQgaW4gZmlsZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuc2VhcmNoQWxsKCdIZSBzdGlja3MgdG8gaGlzIHdpbGQgc2lkZScpKVxuICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbM10pO1xuICB9KTtcbn0pO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEiLCJjb25zdCBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbi8qKlxuICogQGNsYXNzIEludmVydGVkSW5kZXhcbiAqL1xuY2xhc3MgSW52ZXJ0ZWRJbmRleCB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW52ZXJ0ZWRJbmRleC5cbiAgICogQG1lbWJlck9mIEludmVydGVkSW5kZXhcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kaWNlcyA9IHt9O1xuICAgIHRoaXMuZmV0Y2hUaXRsZSA9IGhlbHBlcnMuZmV0Y2hUaXRsZTtcbiAgICB0aGlzLmlzRm91bmQgPSBoZWxwZXJzLmlzRm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGluZGV4IGZvciBhIHZhbGlkIGpzb24gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBBIHN0cmluZyBmb3IgbmFtZSBvZiBmaWxlIHRvIGJlIGluZGV4ZWRcbiAgICogQHBhcmFtICAge0FycmF5fSBmaWxlQ29udGVudHMgLSBhbiBBcnJheSBvZiBvYmplY3RzIHRvIGJlIGluZGV4ZWRcbiAgICogQHJldHVybnMge09iamVjdH0gaW4ga2V5IHZhbHVlIHBhaXIgd2hlcmUgZWFjaCB3b3JkIGlzIGtleVxuICAgKiBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgZ2VuZXJhdGVJbmRleChmaWxlTmFtZSwgZmlsZUNvbnRlbnRzKSB7XG4gICAgaWYgKCFoZWxwZXJzLmlzVmFsaWQoZmlsZUNvbnRlbnRzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0ge307XG4gICAgZmlsZUNvbnRlbnRzLmZvckVhY2goKGJvb2spID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBoZWxwZXJzLnN0cmlwU3RyKGJvb2sudGV4dCkuc3BsaXQoJyAnKTtcbiAgICAgIHRleHQuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXhbd29yZF0pIHtcbiAgICAgICAgICBjb25zdCB3b3JkTGlzdCA9IGluZGV4W3dvcmRdO1xuICAgICAgICAgIGlmICh3b3JkTGlzdC5pbmRleE9mKGJvb2sudGl0bGUpID09PSAtMSkge1xuICAgICAgICAgICAgd29yZExpc3QucHVzaChib29rLnRpdGxlKTtcbiAgICAgICAgICAgIGluZGV4W3dvcmRdID0gd29yZExpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHdvcmQgIT09ICcnKSB7XG4gICAgICAgICAgaW5kZXhbd29yZF0gPSBbYm9vay50aXRsZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbmRpY2VzW2ZpbGVOYW1lXSA9IGhlbHBlcnMuc29ydChpbmRleCk7XG4gICAgcmV0dXJuIGhlbHBlcnMuc29ydChpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIGEgZ2VuZXJhdGVkIGluZGV4XG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7T2JqZWN0fSBmaWxlTmFtZSAtIGdlbmVyYXRlZCBpbmRleCB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge09iamVjdH0gcmVzdWx0IC0gaW4ga2V5IHZhbHVlIHBhaXIgd2hlcmUgZWFjaCB3b3JkXG4gICAqIGluIHRoZSBxdWVyeSBpcyBrZXkgYW5kIHZhbHVlIGlzIGFuICBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSwgZmlsZU5hbWUpIHtcbiAgICBjb25zdCB3b3JkcyA9IE9iamVjdC5rZXlzKHRoaXMuaW5kaWNlc1tmaWxlTmFtZV0pO1xuICAgIGNvbnN0IHF1ZXJ5TGlzdCA9IGhlbHBlcnMuc3RyaXBTdHIocXVlcnkpLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgcXVlcnlMaXN0LmZvckVhY2goKHdvcmQpID0+IHtcbiAgICAgIGlmICh3b3Jkcy5pbmRleE9mKHdvcmQpICE9PSAtMSAmJiB3b3JkICE9PSAnICcpIHtcbiAgICAgICAgcmVzdWx0W3dvcmRdID0gdGhpcy5pbmRpY2VzW2ZpbGVOYW1lXVt3b3JkXTtcbiAgICAgIH0gZWxzZSBpZiAod29yZHMuaW5kZXhPZih3b3JkKSA9PT0gLTEgJiYgd29yZCAhPT0gJycpIHtcbiAgICAgICAgcmVzdWx0W3dvcmRdID0gW251bGxdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoZWxwZXJzLmFsbElzRW1wdHkocmVzdWx0KSA/IG51bGwgOiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIG11bHRpcGxlIGdlbmVyYXRlZFxuICAgKiBpbmRpY2VzXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGRhdGFzZXQgLSBBcnJheSBjb250YWluaW5nIGFsbCBnZW5lcmF0ZWQgaW5kZXhcbiAgICogaW4gd2hpY2ggdG8gc2VhcmNoIGluXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlYXJjaFJlc3VsdHMgLSBPYmplY3QgY29udGFpbmluZyBtYXBwaW5nIG9mXG4gICAqIGZpbGUgbmFtZSB0byB0aGUgc2VhcmNoXG4gICAqIHJlc3VsdCBpbiBlYWNoIGZpbGVcbiAgICovXG4gIHNlYXJjaEFsbChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZGljZXMpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICBzZWFyY2hSZXN1bHRzW2ZpbGVOYW1lXSA9IHRoaXMuc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cbn1cblxud2luZG93LkludmVydGVkSW5kZXggPSBJbnZlcnRlZEluZGV4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaW52ZXJ0ZWQtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCBoZWxwZXJzID0ge1xuICAvKipcbiAgICogU29ydCBhbiBvYmplY3QgYWxwaGFiZXRpY2FsbHlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbiB1bnNvcnRlZCBPYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gLSBzb3J0ZWQgb2JqZWN0XG4gICAqL1xuICBzb3J0KGRhdGEpIHtcbiAgICBjb25zdCBzb3J0ZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5zb3J0KCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBzb3J0ZWRba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gc29ydGVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgdGhlIHRpdGxlcyBmcm9tIGFuIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyB0aXRsZSBrZXlcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIHZhbGlkIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyB0aXRsZSBrZXlcbiAgICogQHJldHVybnMge0FycmF5fSAtIGFuIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgZmV0Y2hUaXRsZShkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEubWFwKGl0ZW0gPT4gaXRlbS50aXRsZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwga2V5IGluIHRoZSBvYmplY3QgaXMgY29udGFpbnMgbnVsbCBpbiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBPYmplY3QgY29udGFpbmluZyBnZW5lcmF0ZWQgaW5kaWNlc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2YXVsdWVzIG9mIGFsbCBrZXlzIGFyZSBudWxsXG4gICAqL1xuICBhbGxJc0VtcHR5KGRhdGEpIHtcbiAgICBjb25zdCBkYXRhTGVuID0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoO1xuICAgIGxldCBudWxsVmFsdWUgPSAwO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGlmIChkYXRhW2ldLmluZGV4T2YobnVsbCkgIT09IC0xKSB7XG4gICAgICAgIG51bGxWYWx1ZSArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsVmFsdWUgPT09IGRhdGFMZW47XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBmaWxlIGlzIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YSAtIGZpbGUgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHZhbGlkaXR5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgZmlsZSBpcyB2YWxpZCBhbmQgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAqL1xuICBpc1ZhbGlkKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZGF0YS5tYXAoKGJvb2spID0+IHtcbiAgICAgIGlmICghYm9vay50aXRsZSB8fCAhYm9vay50ZXh0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvb2sudGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAmJiB0eXBlb2YgYm9vay50ZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsaWQuaW5kZXhPZihmYWxzZSkgPT09IC0xO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRpdGxlIGlzIGZvdW5kIGluIGFuIGFycmF5IG9mIHRpdGxlc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgLSB0aXRsZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRpdGxlcyAtIGFycmF5IG9mIHRpdGxlcyB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiB0aXRsZSB3YXMgZm91bmQgYW5kIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgaXNGb3VuZCh0aXRsZSwgdGl0bGVzKSB7XG4gICAgcmV0dXJuIHRpdGxlcy5pbmRleE9mKHRpdGxlKSAhPT0gLTE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3BlY2lhbCBjaGFyYWN0ZXJzIGZyb20gYSBzdHJpbmcgYW5kIGNvbnZlcnRzIHRvIGxvd2VyY2FzZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSB3aG9sZVN0cmluZyAtIGNvbnRhaW5zIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gYSBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgc3ltYm9sc1xuICAgKi9cbiAgc3RyaXBTdHIod2hvbGVTdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHdob2xlU3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB3aG9sZVN0cmluZy5yZXBsYWNlKC9bXmEtekEtWiBdL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcnM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNsYXNzIEZha2VJbnZlcnRlZEluZGV4IHtcblxufVxuXG5jb25zdCBtb2RlbCA9IHtcblxuICBvcmRlcmVkT2JqZWN0OiB7XG4gICAgYTogJycsXG4gICAgYWxpY2U6ICcnLFxuICAgIGFsbGlhbmNlOiAnJyxcbiAgICBkb3JrOiAnJyxcbiAgICBmYXRlOiAnJyxcbiAgICBsb3JkOiAnJyxcbiAgICB6b2U6ICcnXG4gIH0sXG5cbiAgdW5vcmRlcmVkT2JqZWN0OiB7XG4gICAgYWxsaWFuY2U6ICcnLFxuICAgIHpvZTogJycsXG4gICAgZG9yazogJycsXG4gICAgbG9yZDogJycsXG4gICAgYTogJycsXG4gICAgZmF0ZTogJycsXG4gICAgYWxpY2U6ICcnXG4gIH0sXG5cbiAgdmFsaWRKc29uVGVzdERhdGE6IFtcbiAgICBbe1xuICAgICAgdGl0bGU6ICdBIGdvb2QgYm90JyxcbiAgICAgIHRleHQ6ICdHaXZlIGEgZ29vZCBib3QgYSBwZW5ueSBhIGRheSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQSBiYWQgYm90JyxcbiAgICAgIHRleHQ6ICdHaXZlIGEgYmFkIGJvdCBhIGtub2NrIG9uIHRoZSBoZWFkJ1xuICAgIH1dLFxuICAgIFt7XG4gICAgICB0aXRsZTogJ0dvbmUgV2l0aCBUaGUgV2luZCcsXG4gICAgICB0ZXh0OiAnQWZ0ZXIgYWxsLCB0b21vcnJvdyBpcyBhbm90aGVyIGRheS4nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NyaW1lIGFuZCBQdW5pc2htZW50JyxcbiAgICAgIHRleHQ6ICdXaGVuIHJlYXNvbiBmYWlscywgdGhlIGRldmlsIGhlbHBzLidcbiAgICB9XVxuICBdLFxuXG4gIGluZGV4OiB7XG4gICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBnb29kOiBbJ0EgZ29vZCBib3QnXSxcbiAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBwZW5ueTogWydBIGdvb2QgYm90J10sXG4gICAgZGF5OiBbJ0EgZ29vZCBib3QnXSxcbiAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgb246IFsnQSBiYWQgYm90J10sXG4gICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgIGhlYWQ6IFsnQSBiYWQgYm90J11cbiAgfSxcblxuICBpbmRpY2VzOiB7XG4gICAgYm9vazE6IHtcbiAgICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGdvb2Q6IFsnQSBnb29kIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBwZW5ueTogWydBIGdvb2QgYm90J10sXG4gICAgICBkYXk6IFsnQSBnb29kIGJvdCddLFxuICAgICAgYmFkOiBbJ0EgYmFkIGJvdCddLFxuICAgICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgICBvbjogWydBIGJhZCBib3QnXSxcbiAgICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICAgIGhlYWQ6IFsnQSBiYWQgYm90J11cbiAgICB9XG4gIH0sXG5cbiAgRmFrZUludmVydGVkSW5kZXgsXG5cbiAgaW52YWxpZERhdGE6IFtcbiAgICBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdBbGljZScsXG4gICAgICAgIGZhbWU6ICdBbGljZSBmYWxscyBpbnRvIGEgcmFiYml0IGhvbGUgYW5kIGVudGVycyBhIHdvcmxkIGZ1bGwgb2YgaW1hZ2luYXRpb24uJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1RoZSBMb3JkJyxcbiAgICAgICAgZmFtZTogJ0FuIHVudXN1YWwgYWxsaWFuY2Ugb2YgbWFuLCBlbGYsIGR3YXJmLCB3aXphcmQgYW5kIGhvYmJpdCBzZWVrIHRvIGRlc3Ryb3kgYSBwb3dlcmZ1bCByaW5nLidcbiAgICAgIH1cbiAgICBdLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBIGdvb2QgYm90JyxcbiAgICAgICAgdGV4OiAnR2l2ZSBhIGdvb2QgYm90IGEgcGVubnkgYSBkYXknXG4gICAgICB9XG4gICAgXVxuICBdLFxuXG4gIHNlYXJjaFJlc3VsdHM6IFtcbiAgICB7XG4gICAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J11cbiAgICB9LFxuICAgIHtcbiAgICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIHJlYWxseTogW251bGxdLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICAgIGZvcjogW251bGxdLFxuICAgICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J11cbiAgICB9LFxuICAgIG51bGwsXG4gICAge1xuICAgICAgYm9vazE6IG51bGwsXG4gICAgICBib29rMjogbnVsbFxuICAgIH0sXG4gICAge1xuICAgICAgYm9vazE6IHtcbiAgICAgICAgdG9tb3Jyb3c6IFtudWxsXSxcbiAgICAgICAgaGVscHM6IFtudWxsXSxcbiAgICAgICAgZGV2aWw6IFtudWxsXSxcbiAgICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddXG4gICAgICB9LFxuICAgICAgYm9vazI6IHtcbiAgICAgICAgYTogW251bGxdLFxuICAgICAgICBnaXZlOiBbbnVsbF0sXG4gICAgICAgIGJvdDogW251bGxdLFxuICAgICAgICBrbm9jazogW251bGxdLFxuICAgICAgICB0b21vcnJvdzogWydHb25lIFdpdGggVGhlIFdpbmQnXSxcbiAgICAgICAgaGVscHM6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgICAgdGhlOiBbJ0NyaW1lIGFuZCBQdW5pc2htZW50J10sXG4gICAgICAgIGRldmlsOiBbJ0NyaW1lIGFuZCBQdW5pc2htZW50J10sXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBhOiBbbnVsbF0sXG4gICAgICBoZTogW251bGxdLFxuICAgICAgbG9vazogW251bGxdLFxuICAgICAgc2FpZDogW251bGxdXG4gICAgfVxuICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGVsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L3NwZWMvdGVzdG1vZGVscy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9