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
	  it('should sort unordered objects alphabetically',
	   () => {
	     const sortedObject = helpers.sort(model.unorderedObject);
	     expect(Object.keys(sortedObject))
	    .toEqual(Object.keys(model.orderedObject));
	   });
	});
	
	describe('fetchTitle function', () => {
	  it('should compile all value of title key in an array of objects',
	  () => {
	    expect(helpers.fetchTitle(model.validJsonTestData[0]))
	    .toEqual(['A good bot', 'A bad bot']);
	  });
	});
	
	describe('allIsEmpty function', () => {
	  it('should return true if every key in object is null',
	  () => {
	    expect(helpers.allIsEmpty(model.searchResults[5])).toEqual(true);
	  });
	});
	
	describe('isFound function', () => {
	  it('should return true if string is found in array',
	  () => {
	    expect(helpers.isFound('A good bot', ['A good bot', 'A bad bot']))
	    .toEqual(true);
	  });
	
	  it('should return false if string is not found in array',
	  () => {
	    expect(helpers.isFound('A red bot', ['A good bot', 'A bad bot']))
	    .toEqual(false);
	  });
	});
	
	describe('stripStr function', () => {
	  it('should return lowercase string without any symbols',
	  () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl'))
	    .toEqual('nothing like breaking like glass wrote the blonde girl');
	  });
	  it('should return null when searching for symbols in striped string',
	  () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl')
	    .match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/))
	    .toEqual(null);
	  });
	  it('should return null when input is not of type String',
	  () => {
	    expect(helpers.stripStr(32239923023)).toEqual(null);
	  });
	});
	
	describe('isValid function',
	() => {
	  it('should return true if input is in a valid format',
	  () => {
	    expect(helpers.isValid(model.validJsonTestData[0])).toBe(true);
	  });
	
	  it('should return false if input is in an invalid format',
	  () => {
	    expect(helpers.isValid(model.invalidData[1])).toBe(false);
	  });
	
	  it('shoul return false if null is passed in',
	  () => {
	    expect(helpers.isValid(null)).toBe(false);
	  });
	
	  it('should return false if nothing is passed in',
	  () => {
	    expect(helpers.isValid()).toBe(false);
	  });
	
	  it('should return false if input is not an Array of objects',
	  () => {
	    expect(helpers.isValid('A json file')).toBe(false);
	    expect(helpers.isValid([])).toBe(false);
	    expect(helpers.isValid(32323)).toBe(false);
	  });
	
	  it('should return false if the text key is empty',
	  () => {
	    expect(helpers.isValid([{ title: 'Great', text: '' }]))
	    .toBe(false);
	  });
	  it('should return false if the title key is empty',
	  () => {
	    expect(helpers
	    .isValid([
	      { title: '', author: 'Scott Fizgerald', text: 'Gatsby and Daisy' }]))
	      .toBe(false);
	  });
	});
	
	
	describe('generateIndex function',
	() => {
	  it('should return generated inverted index for an input',
	  () => {
	    expect(InvertedIndexTest
	    .generateIndex('book1', model.validJsonTestData[0]))
	    .toEqual(model.index);
	  });
	
	  it('should return null for an empty input',
	  () => {
	    expect(InvertedIndexTest.generateIndex()).toEqual(null);
	  });
	
	  it('should return null if null is passed in',
	  () => {
	    expect(InvertedIndexTest.generateIndex(null)).toEqual(null);
	  });
	
	  it('should return null fif input is not of type Array',
	  () => {
	    expect(InvertedIndexTest.generateIndex({})).toEqual(null);
	    expect(InvertedIndexTest.generateIndex(2323)).toEqual(null);
	    expect(InvertedIndexTest.generateIndex('edge cases'))
	    .toEqual(null);
	  });
	
	  it('should return null if data is not in a valid format',
	  () => {
	    expect(InvertedIndexTest
	    .generateIndex('invalid data', model.invalidData[0]))
	    .toEqual(null);
	    expect(InvertedIndexTest
	    .generateIndex('invalid data', model.invalidData[1]))
	    .toEqual(null);
	  });
	});
	
	describe('Indices property', () => {
	  it('should return object of all generated Index',
	  () => {
	    expect(InvertedIndexTest.indices).toEqual(model.indices);
	  });
	});
	
	
	describe('Search function',
	() => {
	  it('should return search results for query string in file name',
	  () => {
	    expect(InvertedIndexTest.search('bad good bot knock', 'book1'))
	    .toEqual(model.searchResults[0]);
	  });
	
	  it('should return null if search query is not found in file',
	  () => {
	    expect(InvertedIndexTest
	    .search('a really good knock for the bot', 'book1'))
	    .toEqual(model.searchResults[1]);
	  });
	});
	
	describe('searchAll function',
	() => {
	  it('should return search results for query string in all generated files',
	  () => {
	    InvertedIndexTest
	    .generateIndex('book2', model.validJsonTestData[1]);
	    expect(InvertedIndexTest
	    .searchAll('tomorrow helps the devil give a bot a knock'))
	    .toEqual(model.searchResults[4]);
	  });
	
	  it('should return filename to null if search query is not found in file',
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
	
	  // Generated Index Model
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
	
	  // Indices Model
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDQ3Y2E2YjE3NGZhMmQyOGQxNTU/Y2ZhMiIsIndlYnBhY2s6Ly8vLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2ludmVydGVkLWluZGV4LmpzPzI0MzAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9oZWxwZXJzLmpzPzZmOTkiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zcGVjL3Rlc3Rtb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLE9BQU87QUFDckM7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVI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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJpbnZlcnRlZC1pbmRleC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNDQ3Y2E2YjE3NGZhMmQyOGQxNTUiLCJjb25zdCBoZWxwZXJzID0gcmVxdWlyZSgnLi4vanMvaGVscGVycycpO1xuY29uc3QgSW52ZXJ0ZWRJbmRleCA9IHJlcXVpcmUoJy4uL2pzL2ludmVydGVkLWluZGV4Jyk7XG5jb25zdCBtb2RlbCA9IHJlcXVpcmUoJy4vdGVzdG1vZGVscycpO1xuXG5jb25zdCBJbnZlcnRlZEluZGV4VGVzdCA9IG5ldyBJbnZlcnRlZEluZGV4KCk7XG5cbmRlc2NyaWJlKCdzb3J0IGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHNvcnQgdW5vcmRlcmVkIG9iamVjdHMgYWxwaGFiZXRpY2FsbHknLFxuICAgKCkgPT4ge1xuICAgICBjb25zdCBzb3J0ZWRPYmplY3QgPSBoZWxwZXJzLnNvcnQobW9kZWwudW5vcmRlcmVkT2JqZWN0KTtcbiAgICAgZXhwZWN0KE9iamVjdC5rZXlzKHNvcnRlZE9iamVjdCkpXG4gICAgLnRvRXF1YWwoT2JqZWN0LmtleXMobW9kZWwub3JkZXJlZE9iamVjdCkpO1xuICAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2ZldGNoVGl0bGUgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgY29tcGlsZSBhbGwgdmFsdWUgb2YgdGl0bGUga2V5IGluIGFuIGFycmF5IG9mIG9iamVjdHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuZmV0Y2hUaXRsZShtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwoWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2FsbElzRW1wdHkgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZXZlcnkga2V5IGluIG9iamVjdCBpcyBudWxsJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmFsbElzRW1wdHkobW9kZWwuc2VhcmNoUmVzdWx0c1s1XSkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdpc0ZvdW5kIGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHN0cmluZyBpcyBmb3VuZCBpbiBhcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc0ZvdW5kKCdBIGdvb2QgYm90JywgWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKSlcbiAgICAudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgc3RyaW5nIGlzIG5vdCBmb3VuZCBpbiBhcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc0ZvdW5kKCdBIHJlZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKVxuICAgIC50b0VxdWFsKGZhbHNlKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ3N0cmlwU3RyIGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgYW55IHN5bWJvbHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuc3RyaXBTdHIoJ1wiI05vdGhJbmcgbGlLZSBicmVhS2luZyBsSWtlIGdsQXNzIVwiLCB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKSlcbiAgICAudG9FcXVhbCgnbm90aGluZyBsaWtlIGJyZWFraW5nIGxpa2UgZ2xhc3Mgd3JvdGUgdGhlIGJsb25kZSBnaXJsJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIHdoZW4gc2VhcmNoaW5nIGZvciBzeW1ib2xzIGluIHN0cmlwZWQgc3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzXG4gICAgLnN0cmlwU3RyKCdcIiNOb3RoSW5nIGxpS2UgYnJlYUtpbmcgbElrZSBnbEFzcyFcIiwgd3JvdGUgdGhlIGJsb25kZSBnaXJsJylcbiAgICAubWF0Y2goL1stISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjsnPD4/LC5cXC9dLykpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIHdoZW4gaW5wdXQgaXMgbm90IG9mIHR5cGUgU3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLnN0cmlwU3RyKDMyMjM5OTIzMDIzKSkudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2lzVmFsaWQgZnVuY3Rpb24nLFxuKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGlucHV0IGlzIGluIGEgdmFsaWQgZm9ybWF0JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQobW9kZWwudmFsaWRKc29uVGVzdERhdGFbMF0pKS50b0JlKHRydWUpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBpbnB1dCBpcyBpbiBhbiBpbnZhbGlkIGZvcm1hdCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKG1vZGVsLmludmFsaWREYXRhWzFdKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bCByZXR1cm4gZmFsc2UgaWYgbnVsbCBpcyBwYXNzZWQgaW4nLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZChudWxsKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG5vdGhpbmcgaXMgcGFzc2VkIGluJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGlucHV0IGlzIG5vdCBhbiBBcnJheSBvZiBvYmplY3RzJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoJ0EganNvbiBmaWxlJykpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoW10pKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKDMyMzIzKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSB0ZXh0IGtleSBpcyBlbXB0eScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKFt7IHRpdGxlOiAnR3JlYXQnLCB0ZXh0OiAnJyB9XSkpXG4gICAgLnRvQmUoZmFsc2UpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHRpdGxlIGtleSBpcyBlbXB0eScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVyc1xuICAgIC5pc1ZhbGlkKFtcbiAgICAgIHsgdGl0bGU6ICcnLCBhdXRob3I6ICdTY290dCBGaXpnZXJhbGQnLCB0ZXh0OiAnR2F0c2J5IGFuZCBEYWlzeScgfV0pKVxuICAgICAgLnRvQmUoZmFsc2UpO1xuICB9KTtcbn0pO1xuXG5cbmRlc2NyaWJlKCdnZW5lcmF0ZUluZGV4IGZ1bmN0aW9uJyxcbigpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gZ2VuZXJhdGVkIGludmVydGVkIGluZGV4IGZvciBhbiBpbnB1dCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnYm9vazEnLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwobW9kZWwuaW5kZXgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGZvciBhbiBlbXB0eSBpbnB1dCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIG51bGwgaXMgcGFzc2VkIGluJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KG51bGwpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGZpZiBpbnB1dCBpcyBub3Qgb2YgdHlwZSBBcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgoMjMyMykpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgoJ2VkZ2UgY2FzZXMnKSlcbiAgICAudG9FcXVhbChudWxsKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBkYXRhIGlzIG5vdCBpbiBhIHZhbGlkIGZvcm1hdCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnaW52YWxpZCBkYXRhJywgbW9kZWwuaW52YWxpZERhdGFbMF0pKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdpbnZhbGlkIGRhdGEnLCBtb2RlbC5pbnZhbGlkRGF0YVsxXSkpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdJbmRpY2VzIHByb3BlcnR5JywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3Qgb2YgYWxsIGdlbmVyYXRlZCBJbmRleCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaW5kaWNlcykudG9FcXVhbChtb2RlbC5pbmRpY2VzKTtcbiAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnU2VhcmNoIGZ1bmN0aW9uJyxcbigpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIHF1ZXJ5IHN0cmluZyBpbiBmaWxlIG5hbWUnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LnNlYXJjaCgnYmFkIGdvb2QgYm90IGtub2NrJywgJ2Jvb2sxJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1swXSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgc2VhcmNoIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2goJ2EgcmVhbGx5IGdvb2Qga25vY2sgZm9yIHRoZSBib3QnLCAnYm9vazEnKSlcbiAgICAudG9FcXVhbChtb2RlbC5zZWFyY2hSZXN1bHRzWzFdKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ3NlYXJjaEFsbCBmdW5jdGlvbicsXG4oKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIHNlYXJjaCByZXN1bHRzIGZvciBxdWVyeSBzdHJpbmcgaW4gYWxsIGdlbmVyYXRlZCBmaWxlcycsXG4gICgpID0+IHtcbiAgICBJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdib29rMicsIG1vZGVsLnZhbGlkSnNvblRlc3REYXRhWzFdKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuc2VhcmNoQWxsKCd0b21vcnJvdyBoZWxwcyB0aGUgZGV2aWwgZ2l2ZSBhIGJvdCBhIGtub2NrJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1s0XSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZpbGVuYW1lIHRvIG51bGwgaWYgc2VhcmNoIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2hBbGwoJ0hlIHN0aWNrcyB0byBoaXMgd2lsZCBzaWRlJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1szXSk7XG4gIH0pO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy9pbnZlcnRlZC1pbmRleC5zcGVjLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuLyoqXG4gKiBAY2xhc3MgSW52ZXJ0ZWRJbmRleFxuICovXG5jbGFzcyBJbnZlcnRlZEluZGV4IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbnZlcnRlZEluZGV4LlxuICAgKiBAbWVtYmVyT2YgSW52ZXJ0ZWRJbmRleFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRpY2VzID0ge307XG4gICAgdGhpcy5mZXRjaFRpdGxlID0gaGVscGVycy5mZXRjaFRpdGxlO1xuICAgIHRoaXMuaXNGb3VuZCA9IGhlbHBlcnMuaXNGb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgaW5kZXggZm9yIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlTmFtZSAtIEEgc3RyaW5nIGZvciBuYW1lIG9mIGZpbGUgdG8gYmUgaW5kZXhlZFxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGZpbGVDb250ZW50cyAtIGFuIEFycmF5IG9mIG9iamVjdHMgdG8gYmUgaW5kZXhlZFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmQgaXMga2V5XG4gICAqIGFuZCB2YWx1ZSBpcyBhbiAgYXJyYXkgb2YgdGl0bGVzXG4gICAqL1xuICBnZW5lcmF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudHMpIHtcbiAgICBpZiAoIWhlbHBlcnMuaXNWYWxpZChmaWxlQ29udGVudHMpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB7fTtcbiAgICBmaWxlQ29udGVudHMuZm9yRWFjaCgoYm9vaykgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGhlbHBlcnMuc3RyaXBTdHIoYm9vay50ZXh0KS5zcGxpdCgnICcpO1xuICAgICAgdGV4dC5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgICAgIGlmIChpbmRleFt3b3JkXSkge1xuICAgICAgICAgIGNvbnN0IHdvcmRMaXN0ID0gaW5kZXhbd29yZF07XG4gICAgICAgICAgaWYgKHdvcmRMaXN0LmluZGV4T2YoYm9vay50aXRsZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB3b3JkTGlzdC5wdXNoKGJvb2sudGl0bGUpO1xuICAgICAgICAgICAgaW5kZXhbd29yZF0gPSB3b3JkTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod29yZCAhPT0gJycpIHtcbiAgICAgICAgICBpbmRleFt3b3JkXSA9IFtib29rLnRpdGxlXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluZGljZXNbZmlsZU5hbWVdID0gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgICByZXR1cm4gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gYSBnZW5lcmF0ZWQgaW5kZXhcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9IGZpbGVOYW1lIC0gZ2VuZXJhdGVkIGluZGV4IHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXN1bHQgLSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmRcbiAgICogaW4gdGhlIHF1ZXJ5IGlzIGtleSBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSkge1xuICAgIGNvbnN0IHdvcmRzID0gT2JqZWN0LmtleXModGhpcy5pbmRpY2VzW2ZpbGVOYW1lXSk7XG4gICAgY29uc3QgcXVlcnlMaXN0ID0gaGVscGVycy5zdHJpcFN0cihxdWVyeSkuc3BsaXQoJyAnKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBxdWVyeUxpc3QuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgICAgaWYgKHdvcmRzLmluZGV4T2Yod29yZCkgIT09IC0xICYmIHdvcmQgIT09ICcgJykge1xuICAgICAgICByZXN1bHRbd29yZF0gPSB0aGlzLmluZGljZXNbZmlsZU5hbWVdW3dvcmRdO1xuICAgICAgfSBlbHNlIGlmICh3b3Jkcy5pbmRleE9mKHdvcmQpID09PSAtMSAmJiB3b3JkICE9PSAnJykge1xuICAgICAgICByZXN1bHRbd29yZF0gPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlbHBlcnMuYWxsSXNFbXB0eShyZXN1bHQpID8gbnVsbCA6IHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gbXVsdGlwbGUgZ2VuZXJhdGVkXG4gICAqIGluZGljZXNcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YXNldCAtIEFycmF5IGNvbnRhaW5pbmcgYWxsIGdlbmVyYXRlZCBpbmRleFxuICAgKiBpbiB3aGljaCB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VhcmNoUmVzdWx0cyAtIE9iamVjdCBjb250YWluaW5nIG1hcHBpbmcgb2ZcbiAgICogZmlsZSBuYW1lIHRvIHRoZSBzZWFyY2hcbiAgICogcmVzdWx0IGluIGVhY2ggZmlsZVxuICAgKi9cbiAgc2VhcmNoQWxsKHF1ZXJ5KSB7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5kaWNlcykuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcbiAgICAgIHNlYXJjaFJlc3VsdHNbZmlsZU5hbWVdID0gdGhpcy5zZWFyY2gocXVlcnksIGZpbGVOYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0cztcbiAgfVxufVxuXG53aW5kb3cuSW52ZXJ0ZWRJbmRleCA9IEludmVydGVkSW5kZXg7XG5cbm1vZHVsZS5leHBvcnRzID0gSW52ZXJ0ZWRJbmRleDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9pbnZlcnRlZC1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IGhlbHBlcnMgPSB7XG4gIC8qKlxuICAgKiBTb3J0IGFuIG9iamVjdCBhbHBoYWJldGljYWxseVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFuIHVuc29ydGVkIE9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIHNvcnRlZCBvYmplY3RcbiAgICovXG4gIHNvcnQoZGF0YSkge1xuICAgIGNvbnN0IHNvcnRlZCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHNvcnRlZFtrZXldID0gZGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3J0ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCB0aGUgdGl0bGVzIGZyb20gYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gdmFsaWQgYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IC0gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqL1xuICBmZXRjaFRpdGxlKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiBpdGVtLnRpdGxlKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFsbCBrZXkgaW4gdGhlIG9iamVjdCBpcyBjb250YWlucyBudWxsIGluIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIE9iamVjdCBjb250YWluaW5nIGdlbmVyYXRlZCBpbmRpY2VzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHZhdWx1ZXMgb2YgYWxsIGtleXMgYXJlIG51bGxcbiAgICovXG4gIGFsbElzRW1wdHkoZGF0YSkge1xuICAgIGNvbnN0IGRhdGFMZW4gPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGg7XG4gICAgbGV0IG51bGxWYWx1ZSA9IDA7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaWYgKGRhdGFbaV0uaW5kZXhPZihudWxsKSAhPT0gLTEpIHtcbiAgICAgICAgbnVsbFZhbHVlICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG51bGxWYWx1ZSA9PT0gZGF0YUxlbjtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGZpbGUgaXMgYSB2YWxpZCBqc29uIGZpbGVcbiAgICogQHBhcmFtICAge0FycmF5fSBkYXRhIC0gZmlsZSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdmFsaWRpdHlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiBmaWxlIGlzIHZhbGlkIGFuZCBmYWxzZSBpZiBvdGhlcndpc2VcbiAgICovXG4gIGlzVmFsaWQoZGF0YSkge1xuICAgIGlmICghZGF0YSB8fCAhQXJyYXkuaXNBcnJheShkYXRhKSB8fCBkYXRhLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWQgPSBkYXRhLm1hcCgoYm9vaykgPT4ge1xuICAgICAgaWYgKCFib29rLnRpdGxlIHx8ICFib29rLnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9vay50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICYmIHR5cGVvZiBib29rLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWxpZC5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGl0bGUgaXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtIHRpdGxlIHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtBcnJheX0gdGl0bGVzIC0gYXJyYXkgb2YgdGl0bGVzIHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRpdGxlIHdhcyBmb3VuZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0ZvdW5kKHRpdGxlLCB0aXRsZXMpIHtcbiAgICByZXR1cm4gdGl0bGVzLmluZGV4T2YodGl0bGUpICE9PSAtMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSBhIHN0cmluZyBhbmQgY29udmVydHMgdG8gbG93ZXJjYXNlXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHdob2xlU3RyaW5nIC0gY29udGFpbnMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBhIGxvd2VyY2FzZSBzdHJpbmcgd2l0aG91dCBzeW1ib2xzXG4gICAqL1xuICBzdHJpcFN0cih3aG9sZVN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygd2hvbGVTdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlU3RyaW5nLnJlcGxhY2UoL1teYS16QS1aIF0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiY2xhc3MgRmFrZUludmVydGVkSW5kZXgge1xuXG59XG5cbmNvbnN0IG1vZGVsID0ge1xuXG4gIG9yZGVyZWRPYmplY3Q6IHtcbiAgICBhOiAnJyxcbiAgICBhbGljZTogJycsXG4gICAgYWxsaWFuY2U6ICcnLFxuICAgIGRvcms6ICcnLFxuICAgIGZhdGU6ICcnLFxuICAgIGxvcmQ6ICcnLFxuICAgIHpvZTogJydcbiAgfSxcblxuICB1bm9yZGVyZWRPYmplY3Q6IHtcbiAgICBhbGxpYW5jZTogJycsXG4gICAgem9lOiAnJyxcbiAgICBkb3JrOiAnJyxcbiAgICBsb3JkOiAnJyxcbiAgICBhOiAnJyxcbiAgICBmYXRlOiAnJyxcbiAgICBhbGljZTogJydcbiAgfSxcblxuICB2YWxpZEpzb25UZXN0RGF0YTogW1xuICAgIFt7XG4gICAgICB0aXRsZTogJ0EgZ29vZCBib3QnLFxuICAgICAgdGV4dDogJ0dpdmUgYSBnb29kIGJvdCBhIHBlbm55IGEgZGF5J1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdBIGJhZCBib3QnLFxuICAgICAgdGV4dDogJ0dpdmUgYSBiYWQgYm90IGEga25vY2sgb24gdGhlIGhlYWQnXG4gICAgfV0sXG4gICAgW3tcbiAgICAgIHRpdGxlOiAnR29uZSBXaXRoIFRoZSBXaW5kJyxcbiAgICAgIHRleHQ6ICdBZnRlciBhbGwsIHRvbW9ycm93IGlzIGFub3RoZXIgZGF5LidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnLFxuICAgICAgdGV4dDogJ1doZW4gcmVhc29uIGZhaWxzLCB0aGUgZGV2aWwgaGVscHMuJ1xuICAgIH1dXG4gIF0sXG5cbiAgLy8gR2VuZXJhdGVkIEluZGV4IE1vZGVsXG4gIGluZGV4OiB7XG4gICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBnb29kOiBbJ0EgZ29vZCBib3QnXSxcbiAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBwZW5ueTogWydBIGdvb2QgYm90J10sXG4gICAgZGF5OiBbJ0EgZ29vZCBib3QnXSxcbiAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgb246IFsnQSBiYWQgYm90J10sXG4gICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgIGhlYWQ6IFsnQSBiYWQgYm90J11cbiAgfSxcblxuICAvLyBJbmRpY2VzIE1vZGVsXG4gIGluZGljZXM6IHtcbiAgICBib29rMToge1xuICAgICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIHBlbm55OiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGRheTogWydBIGdvb2QgYm90J10sXG4gICAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICAgIG9uOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgaGVhZDogWydBIGJhZCBib3QnXVxuICAgIH1cbiAgfSxcblxuICBGYWtlSW52ZXJ0ZWRJbmRleCxcblxuICBpbnZhbGlkRGF0YTogW1xuICAgIFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0FsaWNlJyxcbiAgICAgICAgZmFtZTogJ0FsaWNlIGZhbGxzIGludG8gYSByYWJiaXQgaG9sZSBhbmQgZW50ZXJzIGEgd29ybGQgZnVsbCBvZiBpbWFnaW5hdGlvbi4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnVGhlIExvcmQnLFxuICAgICAgICBmYW1lOiAnQW4gdW51c3VhbCBhbGxpYW5jZSBvZiBtYW4sIGVsZiwgZHdhcmYsIHdpemFyZCBhbmQgaG9iYml0IHNlZWsgdG8gZGVzdHJveSBhIHBvd2VyZnVsIHJpbmcuJ1xuICAgICAgfVxuICAgIF0sXG4gICAgW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0EgZ29vZCBib3QnLFxuICAgICAgICB0ZXg6ICdHaXZlIGEgZ29vZCBib3QgYSBwZW5ueSBhIGRheSdcbiAgICAgIH1cbiAgICBdXG4gIF0sXG5cbiAgc2VhcmNoUmVzdWx0czogW1xuICAgIHtcbiAgICAgIGJhZDogWydBIGJhZCBib3QnXSxcbiAgICAgIGJvdDogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgICBnb29kOiBbJ0EgZ29vZCBib3QnXVxuICAgIH0sXG4gICAge1xuICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgcmVhbGx5OiBbbnVsbF0sXG4gICAgICBnb29kOiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgZm9yOiBbbnVsbF0sXG4gICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXVxuICAgIH0sXG4gICAgbnVsbCxcbiAgICB7XG4gICAgICBib29rMTogbnVsbCxcbiAgICAgIGJvb2syOiBudWxsXG4gICAgfSxcbiAgICB7XG4gICAgICBib29rMToge1xuICAgICAgICB0b21vcnJvdzogW251bGxdLFxuICAgICAgICBoZWxwczogW251bGxdLFxuICAgICAgICBkZXZpbDogW251bGxdLFxuICAgICAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICAgICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgICAga25vY2s6IFsnQSBiYWQgYm90J11cbiAgICAgIH0sXG4gICAgICBib29rMjoge1xuICAgICAgICBhOiBbbnVsbF0sXG4gICAgICAgIGdpdmU6IFtudWxsXSxcbiAgICAgICAgYm90OiBbbnVsbF0sXG4gICAgICAgIGtub2NrOiBbbnVsbF0sXG4gICAgICAgIHRvbW9ycm93OiBbJ0dvbmUgV2l0aCBUaGUgV2luZCddLFxuICAgICAgICBoZWxwczogWydDcmltZSBhbmQgUHVuaXNobWVudCddLFxuICAgICAgICB0aGU6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgICAgZGV2aWw6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGE6IFtudWxsXSxcbiAgICAgIGhlOiBbbnVsbF0sXG4gICAgICBsb29rOiBbbnVsbF0sXG4gICAgICBzYWlkOiBbbnVsbF1cbiAgICB9XG4gIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy90ZXN0bW9kZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=