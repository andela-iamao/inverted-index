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
	
	describe('Test suite for helper functions', () => {
	
	  it('Should sort an unsorted object alphabetically', () => {
	    const sortedObject = helpers.sort(model.unorderedObject);
	    expect(Object.keys(sortedObject))
	    .toEqual(Object.keys(model.orderedObject));
	  });
	
	  it('Should return an array of titles when given a json', () => {
	    expect(helpers.fetchTitle(model.validJsonTestData)).toEqual(['A good bot', 'A bad bot']);
	  });
	
	  it('Should return true if every key in object contains array with null value', () => {
	    expect(helpers.allIsNull(model.nullObject)).toEqual(true);
	  });
	
	  it('Should return true if a title was found in an array of titles', () => {
	    expect(helpers.isFound('A good bot', ['A good bot', 'A bad bot'])).toEqual(true);
	  });
	
	  it('Should return true if a title was found in an array of titles', () => {
	    expect(helpers.isFound('A red bot', ['A good bot', 'A bad bot'])).toEqual(false);
	  });
	
	  it('Should return a lowercase string without any symbols', () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl'))
	    .toEqual('nothing like breaking like glass wrote the blonde girl');
	  });
	
	  it('Should return null when matching symbols when string has been striped', () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl').match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/))
	    .toEqual(null);
	  });
	});
	
	describe('Test suite for Inverted Index Class', () => {
	  const InvertedIndexTest = new InvertedIndex();
	
	   console.log('Indices are', InvertedIndexTest.indices);
	
	  describe('Should test for the instance of InvertedIndexTest', () => {
	    it('Should return true if InvertedIndexTest is an instance of Object', () => {
	      expect(InvertedIndexTest instanceof Object).toBe(true);
	    });
	
	    it('Should return false if InvertedIndexTest is not an instance of Array', () => {
	      expect(InvertedIndexTest instanceof Array).toBe(false);
	    });
	
	    it('Should return true if InvertedIndexTest is an instance of InvertedIndex class', () => {
	      expect(InvertedIndexTest instanceof InvertedIndex).toBe(true);
	    });
	
	    it('Should return false if InvertedIndexTest is not an instance of FakeInvertedIndex class', () => {
	      expect(InvertedIndexTest instanceof model.FakeInvertedIndex).toBe(false);
	    });
	  });
	
	
	  describe('Should test for validity of data', () => {
	    it('should return true on valid json data', () => {
	      expect(InvertedIndexTest.isValid(model.validJsonTestData)).toBe(true);
	    });
	
	    it('should return false on invalid json data', () => {
	      expect(InvertedIndexTest.isValid(model.fake_data)).toBe(false);
	    });
	
	    it('should return false on false for null', () => {
	      expect(InvertedIndexTest.isValid(null)).toBe(false);
	    });
	
	    it('should return false on empty arguments', () => {
	      expect(InvertedIndexTest.isValid()).toBe(false);
	    });
	
	    it('should return false on wrong format', () => {
	      expect(InvertedIndexTest.isValid(model.invalidData)).toBe(false);
	    });
	
	    it('should return false on  invalid arguments', () => {
	      expect(InvertedIndexTest.isValid('A json file')).toBe(false);
	      expect(InvertedIndexTest.isValid([])).toBe(false);
	      expect(InvertedIndexTest.isValid(32323)).toBe(false);
	    });
	
	    it('should return false when title or text field is empty', () => {
	      expect(InvertedIndexTest.isValid([{ title: 'Great', text: '' }]))
	      .toBe(false);
	      expect(InvertedIndexTest
	      .isValid([
	        { title: '', author: 'Scott Fizgerald', text: 'Gatsby and Daisy' }]))
	        .toBe(false);
	    });
	  });
	
	
	  describe('Should generate index from data', () => {
	    it('should return index from data', () => {
	      expect(InvertedIndexTest.generateIndex('test1', model.validJsonTestData))
	      .toEqual(model.index);
	    });
	
	    it('Should store generated data in an instance variable', () => {
	      expect(InvertedIndexTest.indices).toEqual(model.indices);
	    });
	
	    it('Should return null for undefined and null argument', () => {
	      expect(InvertedIndexTest.generateIndex()).toEqual(null);
	      expect(InvertedIndexTest.generateIndex(null)).toEqual(null);
	    });
	
	    it('Should return null for non Array parameters', () => {
	      expect(InvertedIndexTest.generateIndex({})).toEqual(null);
	      expect(InvertedIndexTest.generateIndex(2323)).toEqual(null);
	      expect(InvertedIndexTest.generateIndex('edge cases'))
	      .toEqual(null);
	    });
	
	    it('Should return null for invalid data structure', () => {
	      expect(InvertedIndexTest.generateIndex('fake data', model.fake_data))
	      .toEqual(null);
	    });
	  });
	
	
	  describe('Should search for data in a generated index', () => {
	    it('should search the generated index', () => {
	      expect(InvertedIndexTest.search('bad good bot knock', 'test1'))
	      .toEqual(model.searchResults[0]);
	    });
	
	    it('should return null if word is not found in indices', () => {
	      expect(InvertedIndexTest.search('a really good knock for the bot', 'test1')).toEqual(model.searchResults[1]);
	    });
	
	    it('should return null if query is not found in indices', () => {
	      expect(InvertedIndexTest.search('He sticks to his wild side', 'test1')).toEqual(null);
	    });
	
	    it('should search all the generated index', () => {
	      InvertedIndexTest.generateIndex('test two', model.validJsonTestDataTwo);
	      expect(InvertedIndexTest
	      .searchAll('tomorrow helps the devil give a bot a knock'))
	      .toEqual(model.searchResults[4]);
	    });
	
	    it('should search all the generated index', () => {
	      expect(InvertedIndexTest
	      .searchAll('He sticks to his wild side'))
	      .toEqual(model.searchResults[3]);
	    });
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
	  }
	
	  /**
	   * Generates index for a valid json file
	   * @param {String} fileName - A string for name of file to be indexed
	   * @param   {Array} data - an Array of objects to be indexed
	   * @returns {Object} in key value pair where each word is key
	   * and value is an  array of titles
	   */
	  generateIndex(fileName, data) {
	    if (!this.isValid(data)) {
	      return null;
	    }
	    const index = {};
	    data.forEach((book) => {
	      const text = helpers.stripStr(book.text).split(' ');
	      text.forEach((word) => {
	        if (index[word]) {
	          const wordArray = index[word];
	          if (wordArray.indexOf(book.title) === -1) {
	            wordArray.push(book.title);
	            index[word] = wordArray;
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
	   * @param   {Object} filename - generated index to search in
	   * @returns {Object} result - in key value pair where each word in the query is key
	   * and value is an  array of titles
	   */
	  search(query, filename) {
	    const words = Object.keys(this.indices[filename]);
	    const queryArray = helpers.stripStr(query).split(' ');
	    const result = {};
	    queryArray.forEach((word) => {
	      if (words.indexOf(word) !== -1 && word !== ' ') {
	        result[word] = this.indices[filename][word];
	      } else if (words.indexOf(word) === -1 && word !== '') {    
	        result[word] = [null];
	      }
	    });
	    console.log(helpers.allIsNull(result));
	    return helpers.allIsNull(result) ? null : result;
	  }
	
	
	  /**
	   * Searches for a keyword or phrase within multiple generated indices
	   * @param   {String} query - word or phrase to search for
	   * @param   {Array} dataset - Array containing all generated index in which to search in
	   * @returns {Object} searchResults - Object containing mapping of file name to the search
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
	   * @returns {Object} sorted - sorted object
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
	  allIsNull(data) {
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
	    {
	      title: 'A good bot',
	      text: 'Give a good bot a penny a day'
	    },
	    {
	      title: 'A bad bot',
	      text: 'Give a bad bot a knock on the head'
	    }
	  ],
	
	  validJsonTestDataTwo: [
	    {
	      title: 'Gone With The Wind',
	      text: 'After all, tomorrow is another day.'
	    },
	    {
	      title: 'Crime and Punishment',
	      text: 'When reason fails, the devil helps.'
	    }
	  ],
	
	  nullObject: {
	    a: [null],
	    he: [null],
	    look: [null],
	    said: [null]
	  },
	
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
	    test1: {
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
	
	  fake_data: [
	    {
	      title: 'A good bot',
	      tex: 'Give a good bot a penny a day'
	    }
	  ],
	
	  search_all_result: {
	    test1: {
	      tomorrow: [null],
	      helps: [null],
	      devil: [null],
	      a: ['A good bot', 'A bad bot'],
	      the: ['A bad bot'],
	      give: ['A good bot', 'A bad bot'],
	      bot: ['A good bot', 'A bad bot'],
	      knock: ['A bad bot']
	    },
	    'test two': {
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
	
	  FakeInvertedIndex,
	
	  invalidData: [
	    {
	      name: 'Alice',
	      fame: 'Alice falls into a rabbit hole and enters a world full of imagination.'
	    },
	    {
	      name: 'The Lord',
	      fame: 'An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring.'
	    }
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
	      test1: null,
	      'test two': null
	    },
	    {
	      test1: {
	        tomorrow: [null],
	        helps: [null],
	        devil: [null],
	        a: ['A good bot', 'A bad bot'],
	        the: ['A bad bot'],
	        give: ['A good bot', 'A bad bot'],
	        bot: ['A good bot', 'A bad bot'],
	        knock: ['A bad bot']
	      },
	      'test two': {
	        a: [null],
	        give: [null],
	        bot: [null],
	        knock: [null],
	        tomorrow: ['Gone With The Wind'],
	        helps: ['Crime and Punishment'],
	        the: ['Crime and Punishment'],
	        devil: ['Crime and Punishment'],
	      }
	    }
	  ]
	};
	
	module.exports = model;


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEyNGQyZjczZmZmYzhmY2NjYTE/NDU4NyIsIndlYnBhY2s6Ly8vLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2ludmVydGVkLWluZGV4LmpzPzI0MzAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9oZWxwZXJzLmpzPzZmOTkiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zcGVjL3Rlc3Rtb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLHVHQUFzRyxPQUFPO0FBQzdHO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7O0FBR0g7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNB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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImludmVydGVkLWluZGV4LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTI0ZDJmNzNmZmZjOGZjY2NhMSIsImNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuLi9qcy9oZWxwZXJzJyk7XG5jb25zdCBJbnZlcnRlZEluZGV4ID0gcmVxdWlyZSgnLi4vanMvaW52ZXJ0ZWQtaW5kZXgnKTtcbmNvbnN0IG1vZGVsID0gcmVxdWlyZSgnLi90ZXN0bW9kZWxzJyk7XG5cbmRlc2NyaWJlKCdUZXN0IHN1aXRlIGZvciBoZWxwZXIgZnVuY3Rpb25zJywgKCkgPT4ge1xuXG4gIGl0KCdTaG91bGQgc29ydCBhbiB1bnNvcnRlZCBvYmplY3QgYWxwaGFiZXRpY2FsbHknLCAoKSA9PiB7XG4gICAgY29uc3Qgc29ydGVkT2JqZWN0ID0gaGVscGVycy5zb3J0KG1vZGVsLnVub3JkZXJlZE9iamVjdCk7XG4gICAgZXhwZWN0KE9iamVjdC5rZXlzKHNvcnRlZE9iamVjdCkpXG4gICAgLnRvRXF1YWwoT2JqZWN0LmtleXMobW9kZWwub3JkZXJlZE9iamVjdCkpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiBhbiBhcnJheSBvZiB0aXRsZXMgd2hlbiBnaXZlbiBhIGpzb24nLCAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuZmV0Y2hUaXRsZShtb2RlbC52YWxpZEpzb25UZXN0RGF0YSkpLnRvRXF1YWwoWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKTtcbiAgfSk7XG5cbiAgaXQoJ1Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBldmVyeSBrZXkgaW4gb2JqZWN0IGNvbnRhaW5zIGFycmF5IHdpdGggbnVsbCB2YWx1ZScsICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5hbGxJc051bGwobW9kZWwubnVsbE9iamVjdCkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgYSB0aXRsZSB3YXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzJywgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzRm91bmQoJ0EgZ29vZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKS50b0VxdWFsKHRydWUpO1xuICB9KTtcblxuICBpdCgnU2hvdWxkIHJldHVybiB0cnVlIGlmIGEgdGl0bGUgd2FzIGZvdW5kIGluIGFuIGFycmF5IG9mIHRpdGxlcycsICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc0ZvdW5kKCdBIHJlZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKS50b0VxdWFsKGZhbHNlKTtcbiAgfSk7XG5cbiAgaXQoJ1Nob3VsZCByZXR1cm4gYSBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgYW55IHN5bWJvbHMnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuc3RyaXBTdHIoJ1wiI05vdGhJbmcgbGlLZSBicmVhS2luZyBsSWtlIGdsQXNzIVwiLCB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKSlcbiAgICAudG9FcXVhbCgnbm90aGluZyBsaWtlIGJyZWFraW5nIGxpa2UgZ2xhc3Mgd3JvdGUgdGhlIGJsb25kZSBnaXJsJyk7XG4gIH0pO1xuXG4gIGl0KCdTaG91bGQgcmV0dXJuIG51bGwgd2hlbiBtYXRjaGluZyBzeW1ib2xzIHdoZW4gc3RyaW5nIGhhcyBiZWVuIHN0cmlwZWQnLCAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuc3RyaXBTdHIoJ1wiI05vdGhJbmcgbGlLZSBicmVhS2luZyBsSWtlIGdsQXNzIVwiLCB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKS5tYXRjaCgvWy0hJCVeJiooKV8rfH49YHt9XFxbXFxdOlwiOyc8Pj8sLlxcL10vKSlcbiAgICAudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ1Rlc3Qgc3VpdGUgZm9yIEludmVydGVkIEluZGV4IENsYXNzJywgKCkgPT4ge1xuICBjb25zdCBJbnZlcnRlZEluZGV4VGVzdCA9IG5ldyBJbnZlcnRlZEluZGV4KCk7XG5cbiAgIGNvbnNvbGUubG9nKCdJbmRpY2VzIGFyZScsIEludmVydGVkSW5kZXhUZXN0LmluZGljZXMpO1xuXG4gIGRlc2NyaWJlKCdTaG91bGQgdGVzdCBmb3IgdGhlIGluc3RhbmNlIG9mIEludmVydGVkSW5kZXhUZXN0JywgKCkgPT4ge1xuICAgIGl0KCdTaG91bGQgcmV0dXJuIHRydWUgaWYgSW52ZXJ0ZWRJbmRleFRlc3QgaXMgYW4gaW5zdGFuY2Ugb2YgT2JqZWN0JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0IGluc3RhbmNlb2YgT2JqZWN0KS50b0JlKHRydWUpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCByZXR1cm4gZmFsc2UgaWYgSW52ZXJ0ZWRJbmRleFRlc3QgaXMgbm90IGFuIGluc3RhbmNlIG9mIEFycmF5JywgKCkgPT4ge1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0IGluc3RhbmNlb2YgQXJyYXkpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCByZXR1cm4gdHJ1ZSBpZiBJbnZlcnRlZEluZGV4VGVzdCBpcyBhbiBpbnN0YW5jZSBvZiBJbnZlcnRlZEluZGV4IGNsYXNzJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0IGluc3RhbmNlb2YgSW52ZXJ0ZWRJbmRleCkudG9CZSh0cnVlKTtcbiAgICB9KTtcblxuICAgIGl0KCdTaG91bGQgcmV0dXJuIGZhbHNlIGlmIEludmVydGVkSW5kZXhUZXN0IGlzIG5vdCBhbiBpbnN0YW5jZSBvZiBGYWtlSW52ZXJ0ZWRJbmRleCBjbGFzcycsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdCBpbnN0YW5jZW9mIG1vZGVsLkZha2VJbnZlcnRlZEluZGV4KS50b0JlKGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuICBkZXNjcmliZSgnU2hvdWxkIHRlc3QgZm9yIHZhbGlkaXR5IG9mIGRhdGEnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gdHJ1ZSBvbiB2YWxpZCBqc29uIGRhdGEnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaXNWYWxpZChtb2RlbC52YWxpZEpzb25UZXN0RGF0YSkpLnRvQmUodHJ1ZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBvbiBpbnZhbGlkIGpzb24gZGF0YScsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5pc1ZhbGlkKG1vZGVsLmZha2VfZGF0YSkpLnRvQmUoZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2Ugb24gZmFsc2UgZm9yIG51bGwnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaXNWYWxpZChudWxsKSkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBvbiBlbXB0eSBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaXNWYWxpZCgpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIG9uIHdyb25nIGZvcm1hdCcsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5pc1ZhbGlkKG1vZGVsLmludmFsaWREYXRhKSkudG9CZShmYWxzZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBvbiAgaW52YWxpZCBhcmd1bWVudHMnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaXNWYWxpZCgnQSBqc29uIGZpbGUnKSkudG9CZShmYWxzZSk7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaXNWYWxpZChbXSkpLnRvQmUoZmFsc2UpO1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmlzVmFsaWQoMzIzMjMpKS50b0JlKGZhbHNlKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIHdoZW4gdGl0bGUgb3IgdGV4dCBmaWVsZCBpcyBlbXB0eScsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5pc1ZhbGlkKFt7IHRpdGxlOiAnR3JlYXQnLCB0ZXh0OiAnJyB9XSkpXG4gICAgICAudG9CZShmYWxzZSk7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAgIC5pc1ZhbGlkKFtcbiAgICAgICAgeyB0aXRsZTogJycsIGF1dGhvcjogJ1Njb3R0IEZpemdlcmFsZCcsIHRleHQ6ICdHYXRzYnkgYW5kIERhaXN5JyB9XSkpXG4gICAgICAgIC50b0JlKGZhbHNlKTtcbiAgICB9KTtcbiAgfSk7XG5cblxuICBkZXNjcmliZSgnU2hvdWxkIGdlbmVyYXRlIGluZGV4IGZyb20gZGF0YScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiBpbmRleCBmcm9tIGRhdGEnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgndGVzdDEnLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YSkpXG4gICAgICAudG9FcXVhbChtb2RlbC5pbmRleCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHN0b3JlIGdlbmVyYXRlZCBkYXRhIGluIGFuIGluc3RhbmNlIHZhcmlhYmxlJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmluZGljZXMpLnRvRXF1YWwobW9kZWwuaW5kaWNlcyk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHJldHVybiBudWxsIGZvciB1bmRlZmluZWQgYW5kIG51bGwgYXJndW1lbnQnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgpKS50b0VxdWFsKG51bGwpO1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgobnVsbCkpLnRvRXF1YWwobnVsbCk7XG4gICAgfSk7XG5cbiAgICBpdCgnU2hvdWxkIHJldHVybiBudWxsIGZvciBub24gQXJyYXkgcGFyYW1ldGVycycsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KHt9KSkudG9FcXVhbChudWxsKTtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KDIzMjMpKS50b0VxdWFsKG51bGwpO1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgoJ2VkZ2UgY2FzZXMnKSlcbiAgICAgIC50b0VxdWFsKG51bGwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ1Nob3VsZCByZXR1cm4gbnVsbCBmb3IgaW52YWxpZCBkYXRhIHN0cnVjdHVyZScsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KCdmYWtlIGRhdGEnLCBtb2RlbC5mYWtlX2RhdGEpKVxuICAgICAgLnRvRXF1YWwobnVsbCk7XG4gICAgfSk7XG4gIH0pO1xuXG5cbiAgZGVzY3JpYmUoJ1Nob3VsZCBzZWFyY2ggZm9yIGRhdGEgaW4gYSBnZW5lcmF0ZWQgaW5kZXgnLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBzZWFyY2ggdGhlIGdlbmVyYXRlZCBpbmRleCcsICgpID0+IHtcbiAgICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5zZWFyY2goJ2JhZCBnb29kIGJvdCBrbm9jaycsICd0ZXN0MScpKVxuICAgICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1swXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIHdvcmQgaXMgbm90IGZvdW5kIGluIGluZGljZXMnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3Quc2VhcmNoKCdhIHJlYWxseSBnb29kIGtub2NrIGZvciB0aGUgYm90JywgJ3Rlc3QxJykpLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1sxXSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBpbmRpY2VzJywgKCkgPT4ge1xuICAgICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LnNlYXJjaCgnSGUgc3RpY2tzIHRvIGhpcyB3aWxkIHNpZGUnLCAndGVzdDEnKSkudG9FcXVhbChudWxsKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2VhcmNoIGFsbCB0aGUgZ2VuZXJhdGVkIGluZGV4JywgKCkgPT4ge1xuICAgICAgSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgndGVzdCB0d28nLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YVR3byk7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAgIC5zZWFyY2hBbGwoJ3RvbW9ycm93IGhlbHBzIHRoZSBkZXZpbCBnaXZlIGEgYm90IGEga25vY2snKSlcbiAgICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbNF0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBzZWFyY2ggYWxsIHRoZSBnZW5lcmF0ZWQgaW5kZXgnLCAoKSA9PiB7XG4gICAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAgIC5zZWFyY2hBbGwoJ0hlIHN0aWNrcyB0byBoaXMgd2lsZCBzaWRlJykpXG4gICAgICAudG9FcXVhbChtb2RlbC5zZWFyY2hSZXN1bHRzWzNdKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9zcGVjL2ludmVydGVkLWluZGV4LnNwZWMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiY29uc3QgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG4vKipcbiAqIEBjbGFzcyBJbnZlcnRlZEluZGV4XG4gKi9cbmNsYXNzIEludmVydGVkSW5kZXgge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEludmVydGVkSW5kZXguXG4gICAqIEBtZW1iZXJPZiBJbnZlcnRlZEluZGV4XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGljZXMgPSB7fTtcbiAgICB0aGlzLmZldGNoVGl0bGUgPSBoZWxwZXJzLmZldGNoVGl0bGU7XG4gICAgdGhpcy5pc0ZvdW5kID0gaGVscGVycy5pc0ZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBmaWxlIGlzIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YSAtIGZpbGUgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHZhbGlkaXR5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgZmlsZSBpcyB2YWxpZCBhbmQgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAqL1xuICBpc1ZhbGlkKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZGF0YS5tYXAoKGJvb2spID0+IHtcbiAgICAgIGlmICghYm9vay50aXRsZSB8fCAhYm9vay50ZXh0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvb2sudGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICYmIHR5cGVvZiBib29rLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWxpZC5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGluZGV4IGZvciBhIHZhbGlkIGpzb24gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBBIHN0cmluZyBmb3IgbmFtZSBvZiBmaWxlIHRvIGJlIGluZGV4ZWRcbiAgICogQHBhcmFtICAge0FycmF5fSBkYXRhIC0gYW4gQXJyYXkgb2Ygb2JqZWN0cyB0byBiZSBpbmRleGVkXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGluIGtleSB2YWx1ZSBwYWlyIHdoZXJlIGVhY2ggd29yZCBpcyBrZXlcbiAgICogYW5kIHZhbHVlIGlzIGFuICBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIGdlbmVyYXRlSW5kZXgoZmlsZU5hbWUsIGRhdGEpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRhKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0ge307XG4gICAgZGF0YS5mb3JFYWNoKChib29rKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gaGVscGVycy5zdHJpcFN0cihib29rLnRleHQpLnNwbGl0KCcgJyk7XG4gICAgICB0ZXh0LmZvckVhY2goKHdvcmQpID0+IHtcbiAgICAgICAgaWYgKGluZGV4W3dvcmRdKSB7XG4gICAgICAgICAgY29uc3Qgd29yZEFycmF5ID0gaW5kZXhbd29yZF07XG4gICAgICAgICAgaWYgKHdvcmRBcnJheS5pbmRleE9mKGJvb2sudGl0bGUpID09PSAtMSkge1xuICAgICAgICAgICAgd29yZEFycmF5LnB1c2goYm9vay50aXRsZSk7XG4gICAgICAgICAgICBpbmRleFt3b3JkXSA9IHdvcmRBcnJheTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod29yZCAhPT0gJycpIHtcbiAgICAgICAgICBpbmRleFt3b3JkXSA9IFtib29rLnRpdGxlXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluZGljZXNbZmlsZU5hbWVdID0gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgICByZXR1cm4gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gYSBnZW5lcmF0ZWQgaW5kZXhcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9IGZpbGVuYW1lIC0gZ2VuZXJhdGVkIGluZGV4IHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXN1bHQgLSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmQgaW4gdGhlIHF1ZXJ5IGlzIGtleVxuICAgKiBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5LCBmaWxlbmFtZSkge1xuICAgIGNvbnN0IHdvcmRzID0gT2JqZWN0LmtleXModGhpcy5pbmRpY2VzW2ZpbGVuYW1lXSk7XG4gICAgY29uc3QgcXVlcnlBcnJheSA9IGhlbHBlcnMuc3RyaXBTdHIocXVlcnkpLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgcXVlcnlBcnJheS5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgICBpZiAod29yZHMuaW5kZXhPZih3b3JkKSAhPT0gLTEgJiYgd29yZCAhPT0gJyAnKSB7XG4gICAgICAgIHJlc3VsdFt3b3JkXSA9IHRoaXMuaW5kaWNlc1tmaWxlbmFtZV1bd29yZF07XG4gICAgICB9IGVsc2UgaWYgKHdvcmRzLmluZGV4T2Yod29yZCkgPT09IC0xICYmIHdvcmQgIT09ICcnKSB7ICAgIFxuICAgICAgICByZXN1bHRbd29yZF0gPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coaGVscGVycy5hbGxJc051bGwocmVzdWx0KSk7XG4gICAgcmV0dXJuIGhlbHBlcnMuYWxsSXNOdWxsKHJlc3VsdCkgPyBudWxsIDogcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIG11bHRpcGxlIGdlbmVyYXRlZCBpbmRpY2VzXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGRhdGFzZXQgLSBBcnJheSBjb250YWluaW5nIGFsbCBnZW5lcmF0ZWQgaW5kZXggaW4gd2hpY2ggdG8gc2VhcmNoIGluXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlYXJjaFJlc3VsdHMgLSBPYmplY3QgY29udGFpbmluZyBtYXBwaW5nIG9mIGZpbGUgbmFtZSB0byB0aGUgc2VhcmNoXG4gICAqIHJlc3VsdCBpbiBlYWNoIGZpbGVcbiAgICovXG4gIHNlYXJjaEFsbChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZGljZXMpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICBzZWFyY2hSZXN1bHRzW2ZpbGVOYW1lXSA9IHRoaXMuc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cbn1cblxud2luZG93LkludmVydGVkSW5kZXggPSBJbnZlcnRlZEluZGV4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaW52ZXJ0ZWQtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCBoZWxwZXJzID0ge1xuICAvKipcbiAgICogU29ydCBhbiBvYmplY3QgYWxwaGFiZXRpY2FsbHlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbiB1bnNvcnRlZCBPYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gc29ydGVkIC0gc29ydGVkIG9iamVjdFxuICAgKi9cbiAgc29ydChkYXRhKSB7XG4gICAgY29uc3Qgc29ydGVkID0ge307XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuc29ydCgpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgc29ydGVkW2tleV0gPSBkYXRhW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvcnRlZDtcbiAgfSxcblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHRoZSB0aXRsZXMgZnJvbSBhbiBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGl0bGUga2V5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSB2YWxpZCBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGl0bGUga2V5XG4gICAqIEByZXR1cm5zIHtBcnJheX0gLSBhbiBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIGZldGNoVGl0bGUoZGF0YSkge1xuICAgIHJldHVybiBkYXRhLm1hcChpdGVtID0+IGl0ZW0udGl0bGUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWxsIGtleSBpbiB0aGUgb2JqZWN0IGlzIGNvbnRhaW5zIG51bGwgaW4gdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gT2JqZWN0IGNvbnRhaW5pbmcgZ2VuZXJhdGVkIGluZGljZXNcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmF1bHVlcyBvZiBhbGwga2V5cyBhcmUgbnVsbFxuICAgKi9cbiAgYWxsSXNOdWxsKGRhdGEpIHtcbiAgICBjb25zdCBkYXRhTGVuID0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoO1xuICAgIGxldCBudWxsVmFsdWUgPSAwO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGlmIChkYXRhW2ldLmluZGV4T2YobnVsbCkgIT09IC0xKSB7XG4gICAgICAgIG51bGxWYWx1ZSArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsVmFsdWUgPT09IGRhdGFMZW47XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGl0bGUgaXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtIHRpdGxlIHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtBcnJheX0gdGl0bGVzIC0gYXJyYXkgb2YgdGl0bGVzIHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRpdGxlIHdhcyBmb3VuZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0ZvdW5kKHRpdGxlLCB0aXRsZXMpIHtcbiAgICByZXR1cm4gdGl0bGVzLmluZGV4T2YodGl0bGUpICE9PSAtMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSBhIHN0cmluZyBhbmQgY29udmVydHMgdG8gbG93ZXJjYXNlXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHdob2xlU3RyaW5nIC0gY29udGFpbnMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBhIGxvd2VyY2FzZSBzdHJpbmcgd2l0aG91dCBzeW1ib2xzXG4gICAqL1xuICBzdHJpcFN0cih3aG9sZVN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygd2hvbGVTdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlU3RyaW5nLnJlcGxhY2UoL1teYS16QS1aIF0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiY2xhc3MgRmFrZUludmVydGVkSW5kZXgge1xuXG59XG5cbmNvbnN0IG1vZGVsID0ge1xuXG4gIG9yZGVyZWRPYmplY3Q6IHtcbiAgICBhOiAnJyxcbiAgICBhbGljZTogJycsXG4gICAgYWxsaWFuY2U6ICcnLFxuICAgIGRvcms6ICcnLFxuICAgIGZhdGU6ICcnLFxuICAgIGxvcmQ6ICcnLFxuICAgIHpvZTogJydcbiAgfSxcblxuICB1bm9yZGVyZWRPYmplY3Q6IHtcbiAgICBhbGxpYW5jZTogJycsXG4gICAgem9lOiAnJyxcbiAgICBkb3JrOiAnJyxcbiAgICBsb3JkOiAnJyxcbiAgICBhOiAnJyxcbiAgICBmYXRlOiAnJyxcbiAgICBhbGljZTogJydcbiAgfSxcblxuICB2YWxpZEpzb25UZXN0RGF0YTogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnQSBnb29kIGJvdCcsXG4gICAgICB0ZXh0OiAnR2l2ZSBhIGdvb2QgYm90IGEgcGVubnkgYSBkYXknXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0EgYmFkIGJvdCcsXG4gICAgICB0ZXh0OiAnR2l2ZSBhIGJhZCBib3QgYSBrbm9jayBvbiB0aGUgaGVhZCdcbiAgICB9XG4gIF0sXG5cbiAgdmFsaWRKc29uVGVzdERhdGFUd286IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ0dvbmUgV2l0aCBUaGUgV2luZCcsXG4gICAgICB0ZXh0OiAnQWZ0ZXIgYWxsLCB0b21vcnJvdyBpcyBhbm90aGVyIGRheS4nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NyaW1lIGFuZCBQdW5pc2htZW50JyxcbiAgICAgIHRleHQ6ICdXaGVuIHJlYXNvbiBmYWlscywgdGhlIGRldmlsIGhlbHBzLidcbiAgICB9XG4gIF0sXG5cbiAgbnVsbE9iamVjdDoge1xuICAgIGE6IFtudWxsXSxcbiAgICBoZTogW251bGxdLFxuICAgIGxvb2s6IFtudWxsXSxcbiAgICBzYWlkOiBbbnVsbF1cbiAgfSxcblxuICBpbmRleDoge1xuICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgcGVubnk6IFsnQSBnb29kIGJvdCddLFxuICAgIGRheTogWydBIGdvb2QgYm90J10sXG4gICAgYmFkOiBbJ0EgYmFkIGJvdCddLFxuICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgIG9uOiBbJ0EgYmFkIGJvdCddLFxuICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICBoZWFkOiBbJ0EgYmFkIGJvdCddXG4gIH0sXG5cbiAgaW5kaWNlczoge1xuICAgIHRlc3QxOiB7XG4gICAgICBnaXZlOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBnb29kOiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGJvdDogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgcGVubnk6IFsnQSBnb29kIGJvdCddLFxuICAgICAgZGF5OiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGJhZDogWydBIGJhZCBib3QnXSxcbiAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgb246IFsnQSBiYWQgYm90J10sXG4gICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICBoZWFkOiBbJ0EgYmFkIGJvdCddXG4gICAgfVxuICB9LFxuXG4gIGZha2VfZGF0YTogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnQSBnb29kIGJvdCcsXG4gICAgICB0ZXg6ICdHaXZlIGEgZ29vZCBib3QgYSBwZW5ueSBhIGRheSdcbiAgICB9XG4gIF0sXG5cbiAgc2VhcmNoX2FsbF9yZXN1bHQ6IHtcbiAgICB0ZXN0MToge1xuICAgICAgdG9tb3Jyb3c6IFtudWxsXSxcbiAgICAgIGhlbHBzOiBbbnVsbF0sXG4gICAgICBkZXZpbDogW251bGxdLFxuICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXVxuICAgIH0sXG4gICAgJ3Rlc3QgdHdvJzoge1xuICAgICAgYTogW251bGxdLFxuICAgICAgZ2l2ZTogW251bGxdLFxuICAgICAgYm90OiBbbnVsbF0sXG4gICAgICBrbm9jazogW251bGxdLFxuICAgICAgdG9tb3Jyb3c6IFsnR29uZSBXaXRoIFRoZSBXaW5kJ10sXG4gICAgICBoZWxwczogWydDcmltZSBhbmQgUHVuaXNobWVudCddLFxuICAgICAgdGhlOiBbJ0NyaW1lIGFuZCBQdW5pc2htZW50J10sXG4gICAgICBkZXZpbDogWydDcmltZSBhbmQgUHVuaXNobWVudCddLFxuICAgIH1cbiAgfSxcblxuICBGYWtlSW52ZXJ0ZWRJbmRleCxcblxuICBpbnZhbGlkRGF0YTogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdBbGljZScsXG4gICAgICBmYW1lOiAnQWxpY2UgZmFsbHMgaW50byBhIHJhYmJpdCBob2xlIGFuZCBlbnRlcnMgYSB3b3JsZCBmdWxsIG9mIGltYWdpbmF0aW9uLidcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdUaGUgTG9yZCcsXG4gICAgICBmYW1lOiAnQW4gdW51c3VhbCBhbGxpYW5jZSBvZiBtYW4sIGVsZiwgZHdhcmYsIHdpemFyZCBhbmQgaG9iYml0IHNlZWsgdG8gZGVzdHJveSBhIHBvd2VyZnVsIHJpbmcuJ1xuICAgIH1cbiAgXSxcblxuICBzZWFyY2hSZXN1bHRzOiBbXG4gICAge1xuICAgICAgYmFkOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICAgIGdvb2Q6IFsnQSBnb29kIGJvdCddXG4gICAgfSxcbiAgICB7XG4gICAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICByZWFsbHk6IFtudWxsXSxcbiAgICAgIGdvb2Q6IFsnQSBnb29kIGJvdCddLFxuICAgICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgICBmb3I6IFtudWxsXSxcbiAgICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICAgIGJvdDogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddXG4gICAgfSxcbiAgICBudWxsLFxuICAgIHtcbiAgICAgIHRlc3QxOiBudWxsLFxuICAgICAgJ3Rlc3QgdHdvJzogbnVsbFxuICAgIH0sXG4gICAge1xuICAgICAgdGVzdDE6IHtcbiAgICAgICAgdG9tb3Jyb3c6IFtudWxsXSxcbiAgICAgICAgaGVscHM6IFtudWxsXSxcbiAgICAgICAgZGV2aWw6IFtudWxsXSxcbiAgICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddXG4gICAgICB9LFxuICAgICAgJ3Rlc3QgdHdvJzoge1xuICAgICAgICBhOiBbbnVsbF0sXG4gICAgICAgIGdpdmU6IFtudWxsXSxcbiAgICAgICAgYm90OiBbbnVsbF0sXG4gICAgICAgIGtub2NrOiBbbnVsbF0sXG4gICAgICAgIHRvbW9ycm93OiBbJ0dvbmUgV2l0aCBUaGUgV2luZCddLFxuICAgICAgICBoZWxwczogWydDcmltZSBhbmQgUHVuaXNobWVudCddLFxuICAgICAgICB0aGU6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgICAgZGV2aWw6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgIH1cbiAgICB9XG4gIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy90ZXN0bW9kZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=