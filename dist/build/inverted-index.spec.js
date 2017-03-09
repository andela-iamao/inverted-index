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
	
	describe('Test suite for helper functions', () => {
	  it('Given an unordered object, function should return an alphabetically ordered version of the object',
	   () => {
	     const sortedObject = helpers.sort(model.unorderedObject);
	     expect(Object.keys(sortedObject))
	    .toEqual(Object.keys(model.orderedObject));
	   });
	
	  it('Given a json object, where each object contains a title key, function should compile all title values into an array and return it',
	  () => {
	    expect(helpers.fetchTitle(model.validJsonTestData[0]))
	    .toEqual(['A good bot', 'A bad bot']);
	  });
	
	  it('Given that every key in an object has the value of null, function return true',
	  () => {
	    expect(helpers.allIsEmpty(model.searchResults[5])).toEqual(true);
	  });
	
	  it('Given a string, function should check a given array if the string matches the string in an index, if found function return true',
	  () => {
	    expect(helpers.isFound('A good bot', ['A good bot', 'A bad bot'])).toEqual(true);
	  });
	
	  it('Given a string, function should check a given array if the string matches the string in an index, if found function return false',
	  () => {
	    expect(helpers.isFound('A red bot', ['A good bot', 'A bad bot'])).toEqual(false);
	  });
	
	  it('Given a string, function should remove all special symbols, convert the string to lowercase and return the new value',
	  () => {
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl'))
	    .toEqual('nothing like breaking like glass wrote the blonde girl');
	    expect(helpers
	    .stripStr('"#NothIng liKe breaKing lIke glAss!", wrote the blonde girl')
	    .match(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/))
	    .toEqual(null);
	  });
	});
	
	describe('Given that a parameter is passed into this method, it should check if the parameter is in a valid format',
	() => {
	  it('Given a valid json object, function should return true',
	  () => {
	    expect(helpers.isValid(model.validJsonTestData[0])).toBe(true);
	  });
	
	  it('Given an invalid json object, function should return false',
	  () => {
	    expect(helpers.isValid(model.invalidData[1])).toBe(false);
	  });
	
	  it('Given that null is passed in as an argument, function should return false',
	  () => {
	    expect(helpers.isValid(null)).toBe(false);
	  });
	
	  it('Given that nothing is passed in as an argument, function should return false',
	  () => {
	    expect(helpers.isValid()).toBe(false);
	  });
	
	  it('Given that a non object data type is passed as an argument, function should return false',
	  () => {
	    expect(helpers.isValid('A json file')).toBe(false);
	    expect(helpers.isValid([])).toBe(false);
	    expect(helpers.isValid(32323)).toBe(false);
	  });
	
	  it('Given that there is neither a text key or title key in the json object, function should return false',
	  () => {
	    expect(helpers.isValid([{ title: 'Great', text: '' }]))
	    .toBe(false);
	    expect(helpers
	    .isValid([
	      { title: '', author: 'Scott Fizgerald', text: 'Gatsby and Daisy' }]))
	      .toBe(false);
	  });
	});
	
	
	describe('Given a file name and a valid json object, method should return a generated index',
	() => {
	  it('Given a file name and a valid json object, method should return a generated index',
	  () => {
	    expect(InvertedIndexTest
	    .generateIndex('book1', model.validJsonTestData[0]))
	    .toEqual(model.index);
	  });
	
	  it('Given that an index was generated, the index should be stores in the indices property of the class',
	  () => {
	    expect(InvertedIndexTest.indices).toEqual(model.indices);
	  });
	
	  it('Given that an empty parameter or a null value is passed in, method should return null',
	  () => {
	    expect(InvertedIndexTest.generateIndex()).toEqual(null);
	    expect(InvertedIndexTest.generateIndex(null)).toEqual(null);
	  });
	
	  it('Given that the parameter passed in is not an object, method should return null',
	  () => {
	    expect(InvertedIndexTest.generateIndex({})).toEqual(null);
	    expect(InvertedIndexTest.generateIndex(2323)).toEqual(null);
	    expect(InvertedIndexTest.generateIndex('edge cases'))
	    .toEqual(null);
	  });
	
	  it('Given that the object passed in is in an invalid format, method should return null',
	  () => {
	    expect(InvertedIndexTest.generateIndex('invalid data', model.invalidData[0]))
	    .toEqual(null);
	    expect(InvertedIndexTest.generateIndex('invalid data', model.invalidData[1]))
	    .toEqual(null);
	  });
	});
	
	
	describe('Given that a searh query is passed in as well as a file name, method should search for the query in the file name stored in the indices property',
	() => {
	  it('Given a search query and a file name is passed into the method, method should return the words found in tht file',
	  () => {
	    expect(InvertedIndexTest.search('bad good bot knock', 'book1'))
	    .toEqual(model.searchResults[0]);
	  });
	
	  it('Given the search query is not found in the indices, method should return null',
	  () => {
	    expect(InvertedIndexTest
	    .search('a really good knock for the bot', 'book1'))
	    .toEqual(model.searchResults[1]);
	  });
	
	  it('Given the query is not found in the indices property, method should return null', () => {
	    expect(InvertedIndexTest
	    .search('He sticks to his wild side', 'book1'))
	    .toEqual(null);
	  });
	});
	
	describe('Given a search query, method should search the query in all files in the indices',
	() => {
	  it('Given a search query menthod, should return an object mapping each word found to file name in indices',
	  () => {
	    InvertedIndexTest
	    .generateIndex('book2', model.validJsonTestData[1]);
	    expect(InvertedIndexTest
	    .searchAll('tomorrow helps the devil give a bot a knock'))
	    .toEqual(model.searchResults[4]);
	  });
	
	  it('Given a search query is not found in the indices, method should return null',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjFhMTI2YjA4NzI4OTQxZDM3YTM/MTViOCIsIndlYnBhY2s6Ly8vLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2ludmVydGVkLWluZGV4LmpzPzI0MzAiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9oZWxwZXJzLmpzPzZmOTkiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zcGVjL3Rlc3Rtb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLE9BQU87QUFDckM7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsOEJBQTZCLDJCQUEyQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQSxRQUFPLGlF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QUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImludmVydGVkLWluZGV4LnNwZWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyMWExMjZiMDg3Mjg5NDFkMzdhMyIsImNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuLi9qcy9oZWxwZXJzJyk7XG5jb25zdCBJbnZlcnRlZEluZGV4ID0gcmVxdWlyZSgnLi4vanMvaW52ZXJ0ZWQtaW5kZXgnKTtcbmNvbnN0IG1vZGVsID0gcmVxdWlyZSgnLi90ZXN0bW9kZWxzJyk7XG5cbmNvbnN0IEludmVydGVkSW5kZXhUZXN0ID0gbmV3IEludmVydGVkSW5kZXgoKTtcblxuZGVzY3JpYmUoJ1Rlc3Qgc3VpdGUgZm9yIGhlbHBlciBmdW5jdGlvbnMnLCAoKSA9PiB7XG4gIGl0KCdHaXZlbiBhbiB1bm9yZGVyZWQgb2JqZWN0LCBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGFuIGFscGhhYmV0aWNhbGx5IG9yZGVyZWQgdmVyc2lvbiBvZiB0aGUgb2JqZWN0JyxcbiAgICgpID0+IHtcbiAgICAgY29uc3Qgc29ydGVkT2JqZWN0ID0gaGVscGVycy5zb3J0KG1vZGVsLnVub3JkZXJlZE9iamVjdCk7XG4gICAgIGV4cGVjdChPYmplY3Qua2V5cyhzb3J0ZWRPYmplY3QpKVxuICAgIC50b0VxdWFsKE9iamVjdC5rZXlzKG1vZGVsLm9yZGVyZWRPYmplY3QpKTtcbiAgIH0pO1xuXG4gIGl0KCdHaXZlbiBhIGpzb24gb2JqZWN0LCB3aGVyZSBlYWNoIG9iamVjdCBjb250YWlucyBhIHRpdGxlIGtleSwgZnVuY3Rpb24gc2hvdWxkIGNvbXBpbGUgYWxsIHRpdGxlIHZhbHVlcyBpbnRvIGFuIGFycmF5IGFuZCByZXR1cm4gaXQnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuZmV0Y2hUaXRsZShtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwoWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKTtcbiAgfSk7XG5cbiAgaXQoJ0dpdmVuIHRoYXQgZXZlcnkga2V5IGluIGFuIG9iamVjdCBoYXMgdGhlIHZhbHVlIG9mIG51bGwsIGZ1bmN0aW9uIHJldHVybiB0cnVlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmFsbElzRW1wdHkobW9kZWwuc2VhcmNoUmVzdWx0c1s1XSkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xuXG4gIGl0KCdHaXZlbiBhIHN0cmluZywgZnVuY3Rpb24gc2hvdWxkIGNoZWNrIGEgZ2l2ZW4gYXJyYXkgaWYgdGhlIHN0cmluZyBtYXRjaGVzIHRoZSBzdHJpbmcgaW4gYW4gaW5kZXgsIGlmIGZvdW5kIGZ1bmN0aW9uIHJldHVybiB0cnVlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzRm91bmQoJ0EgZ29vZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKS50b0VxdWFsKHRydWUpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gYSBzdHJpbmcsIGZ1bmN0aW9uIHNob3VsZCBjaGVjayBhIGdpdmVuIGFycmF5IGlmIHRoZSBzdHJpbmcgbWF0Y2hlcyB0aGUgc3RyaW5nIGluIGFuIGluZGV4LCBpZiBmb3VuZCBmdW5jdGlvbiByZXR1cm4gZmFsc2UnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNGb3VuZCgnQSByZWQgYm90JywgWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKSkudG9FcXVhbChmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdHaXZlbiBhIHN0cmluZywgZnVuY3Rpb24gc2hvdWxkIHJlbW92ZSBhbGwgc3BlY2lhbCBzeW1ib2xzLCBjb252ZXJ0IHRoZSBzdHJpbmcgdG8gbG93ZXJjYXNlIGFuZCByZXR1cm4gdGhlIG5ldyB2YWx1ZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVyc1xuICAgIC5zdHJpcFN0cignXCIjTm90aEluZyBsaUtlIGJyZWFLaW5nIGxJa2UgZ2xBc3MhXCIsIHdyb3RlIHRoZSBibG9uZGUgZ2lybCcpKVxuICAgIC50b0VxdWFsKCdub3RoaW5nIGxpa2UgYnJlYWtpbmcgbGlrZSBnbGFzcyB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKTtcbiAgICBleHBlY3QoaGVscGVyc1xuICAgIC5zdHJpcFN0cignXCIjTm90aEluZyBsaUtlIGJyZWFLaW5nIGxJa2UgZ2xBc3MhXCIsIHdyb3RlIHRoZSBibG9uZGUgZ2lybCcpXG4gICAgLm1hdGNoKC9bLSEkJV4mKigpXyt8fj1ge31cXFtcXF06XCI7Jzw+PywuXFwvXS8pKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnR2l2ZW4gdGhhdCBhIHBhcmFtZXRlciBpcyBwYXNzZWQgaW50byB0aGlzIG1ldGhvZCwgaXQgc2hvdWxkIGNoZWNrIGlmIHRoZSBwYXJhbWV0ZXIgaXMgaW4gYSB2YWxpZCBmb3JtYXQnLFxuKCkgPT4ge1xuICBpdCgnR2l2ZW4gYSB2YWxpZCBqc29uIG9iamVjdCwgZnVuY3Rpb24gc2hvdWxkIHJldHVybiB0cnVlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQobW9kZWwudmFsaWRKc29uVGVzdERhdGFbMF0pKS50b0JlKHRydWUpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gYW4gaW52YWxpZCBqc29uIG9iamVjdCwgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBmYWxzZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKG1vZGVsLmludmFsaWREYXRhWzFdKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdHaXZlbiB0aGF0IG51bGwgaXMgcGFzc2VkIGluIGFzIGFuIGFyZ3VtZW50LCBmdW5jdGlvbiBzaG91bGQgcmV0dXJuIGZhbHNlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQobnVsbCkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCBub3RoaW5nIGlzIHBhc3NlZCBpbiBhcyBhbiBhcmd1bWVudCwgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBmYWxzZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKCkpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCBhIG5vbiBvYmplY3QgZGF0YSB0eXBlIGlzIHBhc3NlZCBhcyBhbiBhcmd1bWVudCwgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBmYWxzZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKCdBIGpzb24gZmlsZScpKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKFtdKSkudG9CZShmYWxzZSk7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZCgzMjMyMykpLnRvQmUoZmFsc2UpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCB0aGVyZSBpcyBuZWl0aGVyIGEgdGV4dCBrZXkgb3IgdGl0bGUga2V5IGluIHRoZSBqc29uIG9iamVjdCwgZnVuY3Rpb24gc2hvdWxkIHJldHVybiBmYWxzZScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKFt7IHRpdGxlOiAnR3JlYXQnLCB0ZXh0OiAnJyB9XSkpXG4gICAgLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChoZWxwZXJzXG4gICAgLmlzVmFsaWQoW1xuICAgICAgeyB0aXRsZTogJycsIGF1dGhvcjogJ1Njb3R0IEZpemdlcmFsZCcsIHRleHQ6ICdHYXRzYnkgYW5kIERhaXN5JyB9XSkpXG4gICAgICAudG9CZShmYWxzZSk7XG4gIH0pO1xufSk7XG5cblxuZGVzY3JpYmUoJ0dpdmVuIGEgZmlsZSBuYW1lIGFuZCBhIHZhbGlkIGpzb24gb2JqZWN0LCBtZXRob2Qgc2hvdWxkIHJldHVybiBhIGdlbmVyYXRlZCBpbmRleCcsXG4oKSA9PiB7XG4gIGl0KCdHaXZlbiBhIGZpbGUgbmFtZSBhbmQgYSB2YWxpZCBqc29uIG9iamVjdCwgbWV0aG9kIHNob3VsZCByZXR1cm4gYSBnZW5lcmF0ZWQgaW5kZXgnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0XG4gICAgLmdlbmVyYXRlSW5kZXgoJ2Jvb2sxJywgbW9kZWwudmFsaWRKc29uVGVzdERhdGFbMF0pKVxuICAgIC50b0VxdWFsKG1vZGVsLmluZGV4KTtcbiAgfSk7XG5cbiAgaXQoJ0dpdmVuIHRoYXQgYW4gaW5kZXggd2FzIGdlbmVyYXRlZCwgdGhlIGluZGV4IHNob3VsZCBiZSBzdG9yZXMgaW4gdGhlIGluZGljZXMgcHJvcGVydHkgb2YgdGhlIGNsYXNzJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5pbmRpY2VzKS50b0VxdWFsKG1vZGVsLmluZGljZXMpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCBhbiBlbXB0eSBwYXJhbWV0ZXIgb3IgYSBudWxsIHZhbHVlIGlzIHBhc3NlZCBpbiwgbWV0aG9kIHNob3VsZCByZXR1cm4gbnVsbCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgpKS50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KG51bGwpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCB0aGUgcGFyYW1ldGVyIHBhc3NlZCBpbiBpcyBub3QgYW4gb2JqZWN0LCBtZXRob2Qgc2hvdWxkIHJldHVybiBudWxsJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KHt9KSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgyMzIzKSkudG9FcXVhbChudWxsKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgnZWRnZSBjYXNlcycpKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhhdCB0aGUgb2JqZWN0IHBhc3NlZCBpbiBpcyBpbiBhbiBpbnZhbGlkIGZvcm1hdCwgbWV0aG9kIHNob3VsZCByZXR1cm4gbnVsbCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgnaW52YWxpZCBkYXRhJywgbW9kZWwuaW52YWxpZERhdGFbMF0pKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KCdpbnZhbGlkIGRhdGEnLCBtb2RlbC5pbnZhbGlkRGF0YVsxXSkpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xufSk7XG5cblxuZGVzY3JpYmUoJ0dpdmVuIHRoYXQgYSBzZWFyaCBxdWVyeSBpcyBwYXNzZWQgaW4gYXMgd2VsbCBhcyBhIGZpbGUgbmFtZSwgbWV0aG9kIHNob3VsZCBzZWFyY2ggZm9yIHRoZSBxdWVyeSBpbiB0aGUgZmlsZSBuYW1lIHN0b3JlZCBpbiB0aGUgaW5kaWNlcyBwcm9wZXJ0eScsXG4oKSA9PiB7XG4gIGl0KCdHaXZlbiBhIHNlYXJjaCBxdWVyeSBhbmQgYSBmaWxlIG5hbWUgaXMgcGFzc2VkIGludG8gdGhlIG1ldGhvZCwgbWV0aG9kIHNob3VsZCByZXR1cm4gdGhlIHdvcmRzIGZvdW5kIGluIHRodCBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5zZWFyY2goJ2JhZCBnb29kIGJvdCBrbm9jaycsICdib29rMScpKVxuICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbMF0pO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhlIHNlYXJjaCBxdWVyeSBpcyBub3QgZm91bmQgaW4gdGhlIGluZGljZXMsIG1ldGhvZCBzaG91bGQgcmV0dXJuIG51bGwnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0XG4gICAgLnNlYXJjaCgnYSByZWFsbHkgZ29vZCBrbm9jayBmb3IgdGhlIGJvdCcsICdib29rMScpKVxuICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbMV0pO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gdGhlIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiB0aGUgaW5kaWNlcyBwcm9wZXJ0eSwgbWV0aG9kIHNob3VsZCByZXR1cm4gbnVsbCcsICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuc2VhcmNoKCdIZSBzdGlja3MgdG8gaGlzIHdpbGQgc2lkZScsICdib29rMScpKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICB9KTtcbn0pO1xuXG5kZXNjcmliZSgnR2l2ZW4gYSBzZWFyY2ggcXVlcnksIG1ldGhvZCBzaG91bGQgc2VhcmNoIHRoZSBxdWVyeSBpbiBhbGwgZmlsZXMgaW4gdGhlIGluZGljZXMnLFxuKCkgPT4ge1xuICBpdCgnR2l2ZW4gYSBzZWFyY2ggcXVlcnkgbWVudGhvZCwgc2hvdWxkIHJldHVybiBhbiBvYmplY3QgbWFwcGluZyBlYWNoIHdvcmQgZm91bmQgdG8gZmlsZSBuYW1lIGluIGluZGljZXMnLFxuICAoKSA9PiB7XG4gICAgSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnYm9vazInLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YVsxXSk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0XG4gICAgLnNlYXJjaEFsbCgndG9tb3Jyb3cgaGVscHMgdGhlIGRldmlsIGdpdmUgYSBib3QgYSBrbm9jaycpKVxuICAgIC50b0VxdWFsKG1vZGVsLnNlYXJjaFJlc3VsdHNbNF0pO1xuICB9KTtcblxuICBpdCgnR2l2ZW4gYSBzZWFyY2ggcXVlcnkgaXMgbm90IGZvdW5kIGluIHRoZSBpbmRpY2VzLCBtZXRob2Qgc2hvdWxkIHJldHVybiBudWxsJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2hBbGwoJ0hlIHN0aWNrcyB0byBoaXMgd2lsZCBzaWRlJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1szXSk7XG4gIH0pO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy9pbnZlcnRlZC1pbmRleC5zcGVjLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxuLyoqXG4gKiBAY2xhc3MgSW52ZXJ0ZWRJbmRleFxuICovXG5jbGFzcyBJbnZlcnRlZEluZGV4IHtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBpbnN0YW5jZSBvZiBJbnZlcnRlZEluZGV4LlxuICAgKiBAbWVtYmVyT2YgSW52ZXJ0ZWRJbmRleFxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbmRpY2VzID0ge307XG4gICAgdGhpcy5mZXRjaFRpdGxlID0gaGVscGVycy5mZXRjaFRpdGxlO1xuICAgIHRoaXMuaXNGb3VuZCA9IGhlbHBlcnMuaXNGb3VuZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgaW5kZXggZm9yIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWxlTmFtZSAtIEEgc3RyaW5nIGZvciBuYW1lIG9mIGZpbGUgdG8gYmUgaW5kZXhlZFxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGZpbGVDb250ZW50cyAtIGFuIEFycmF5IG9mIG9iamVjdHMgdG8gYmUgaW5kZXhlZFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmQgaXMga2V5XG4gICAqIGFuZCB2YWx1ZSBpcyBhbiAgYXJyYXkgb2YgdGl0bGVzXG4gICAqL1xuICBnZW5lcmF0ZUluZGV4KGZpbGVOYW1lLCBmaWxlQ29udGVudHMpIHtcbiAgICBpZiAoIWhlbHBlcnMuaXNWYWxpZChmaWxlQ29udGVudHMpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgaW5kZXggPSB7fTtcbiAgICBmaWxlQ29udGVudHMuZm9yRWFjaCgoYm9vaykgPT4ge1xuICAgICAgY29uc3QgdGV4dCA9IGhlbHBlcnMuc3RyaXBTdHIoYm9vay50ZXh0KS5zcGxpdCgnICcpO1xuICAgICAgdGV4dC5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgICAgIGlmIChpbmRleFt3b3JkXSkge1xuICAgICAgICAgIGNvbnN0IHdvcmRMaXN0ID0gaW5kZXhbd29yZF07XG4gICAgICAgICAgaWYgKHdvcmRMaXN0LmluZGV4T2YoYm9vay50aXRsZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB3b3JkTGlzdC5wdXNoKGJvb2sudGl0bGUpO1xuICAgICAgICAgICAgaW5kZXhbd29yZF0gPSB3b3JkTGlzdDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod29yZCAhPT0gJycpIHtcbiAgICAgICAgICBpbmRleFt3b3JkXSA9IFtib29rLnRpdGxlXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluZGljZXNbZmlsZU5hbWVdID0gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgICByZXR1cm4gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gYSBnZW5lcmF0ZWQgaW5kZXhcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9IGZpbGVOYW1lIC0gZ2VuZXJhdGVkIGluZGV4IHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXN1bHQgLSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmRcbiAgICogaW4gdGhlIHF1ZXJ5IGlzIGtleSBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSkge1xuICAgIGNvbnN0IHdvcmRzID0gT2JqZWN0LmtleXModGhpcy5pbmRpY2VzW2ZpbGVOYW1lXSk7XG4gICAgY29uc3QgcXVlcnlMaXN0ID0gaGVscGVycy5zdHJpcFN0cihxdWVyeSkuc3BsaXQoJyAnKTtcbiAgICBjb25zdCByZXN1bHQgPSB7fTtcbiAgICBxdWVyeUxpc3QuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgICAgaWYgKHdvcmRzLmluZGV4T2Yod29yZCkgIT09IC0xICYmIHdvcmQgIT09ICcgJykge1xuICAgICAgICByZXN1bHRbd29yZF0gPSB0aGlzLmluZGljZXNbZmlsZU5hbWVdW3dvcmRdO1xuICAgICAgfSBlbHNlIGlmICh3b3Jkcy5pbmRleE9mKHdvcmQpID09PSAtMSAmJiB3b3JkICE9PSAnJykge1xuICAgICAgICByZXN1bHRbd29yZF0gPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGhlbHBlcnMuYWxsSXNFbXB0eShyZXN1bHQpID8gbnVsbCA6IHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gbXVsdGlwbGUgZ2VuZXJhdGVkXG4gICAqIGluZGljZXNcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YXNldCAtIEFycmF5IGNvbnRhaW5pbmcgYWxsIGdlbmVyYXRlZCBpbmRleFxuICAgKiBpbiB3aGljaCB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge09iamVjdH0gc2VhcmNoUmVzdWx0cyAtIE9iamVjdCBjb250YWluaW5nIG1hcHBpbmcgb2ZcbiAgICogZmlsZSBuYW1lIHRvIHRoZSBzZWFyY2hcbiAgICogcmVzdWx0IGluIGVhY2ggZmlsZVxuICAgKi9cbiAgc2VhcmNoQWxsKHF1ZXJ5KSB7XG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5kaWNlcykuZm9yRWFjaCgoZmlsZU5hbWUpID0+IHtcbiAgICAgIHNlYXJjaFJlc3VsdHNbZmlsZU5hbWVdID0gdGhpcy5zZWFyY2gocXVlcnksIGZpbGVOYW1lKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VhcmNoUmVzdWx0cztcbiAgfVxufVxuXG53aW5kb3cuSW52ZXJ0ZWRJbmRleCA9IEludmVydGVkSW5kZXg7XG5cbm1vZHVsZS5leHBvcnRzID0gSW52ZXJ0ZWRJbmRleDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9pbnZlcnRlZC1pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImNvbnN0IGhlbHBlcnMgPSB7XG4gIC8qKlxuICAgKiBTb3J0IGFuIG9iamVjdCBhbHBoYWJldGljYWxseVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFuIHVuc29ydGVkIE9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIHNvcnRlZCBvYmplY3RcbiAgICovXG4gIHNvcnQoZGF0YSkge1xuICAgIGNvbnN0IHNvcnRlZCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHNvcnRlZFtrZXldID0gZGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3J0ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCB0aGUgdGl0bGVzIGZyb20gYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gdmFsaWQgYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IC0gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqL1xuICBmZXRjaFRpdGxlKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiBpdGVtLnRpdGxlKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFsbCBrZXkgaW4gdGhlIG9iamVjdCBpcyBjb250YWlucyBudWxsIGluIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIE9iamVjdCBjb250YWluaW5nIGdlbmVyYXRlZCBpbmRpY2VzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHZhdWx1ZXMgb2YgYWxsIGtleXMgYXJlIG51bGxcbiAgICovXG4gIGFsbElzRW1wdHkoZGF0YSkge1xuICAgIGNvbnN0IGRhdGFMZW4gPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGg7XG4gICAgbGV0IG51bGxWYWx1ZSA9IDA7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaWYgKGRhdGFbaV0uaW5kZXhPZihudWxsKSAhPT0gLTEpIHtcbiAgICAgICAgbnVsbFZhbHVlICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG51bGxWYWx1ZSA9PT0gZGF0YUxlbjtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGZpbGUgaXMgYSB2YWxpZCBqc29uIGZpbGVcbiAgICogQHBhcmFtICAge0FycmF5fSBkYXRhIC0gZmlsZSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdmFsaWRpdHlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiBmaWxlIGlzIHZhbGlkIGFuZCBmYWxzZSBpZiBvdGhlcndpc2VcbiAgICovXG4gIGlzVmFsaWQoZGF0YSkge1xuICAgIGlmICghZGF0YSB8fCAhQXJyYXkuaXNBcnJheShkYXRhKSB8fCBkYXRhLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWQgPSBkYXRhLm1hcCgoYm9vaykgPT4ge1xuICAgICAgaWYgKCFib29rLnRpdGxlIHx8ICFib29rLnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9vay50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICYmIHR5cGVvZiBib29rLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWxpZC5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGl0bGUgaXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtIHRpdGxlIHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtBcnJheX0gdGl0bGVzIC0gYXJyYXkgb2YgdGl0bGVzIHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRpdGxlIHdhcyBmb3VuZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0ZvdW5kKHRpdGxlLCB0aXRsZXMpIHtcbiAgICByZXR1cm4gdGl0bGVzLmluZGV4T2YodGl0bGUpICE9PSAtMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSBhIHN0cmluZyBhbmQgY29udmVydHMgdG8gbG93ZXJjYXNlXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHdob2xlU3RyaW5nIC0gY29udGFpbnMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBhIGxvd2VyY2FzZSBzdHJpbmcgd2l0aG91dCBzeW1ib2xzXG4gICAqL1xuICBzdHJpcFN0cih3aG9sZVN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygd2hvbGVTdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlU3RyaW5nLnJlcGxhY2UoL1teYS16QS1aIF0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiY2xhc3MgRmFrZUludmVydGVkSW5kZXgge1xuXG59XG5cbmNvbnN0IG1vZGVsID0ge1xuXG4gIG9yZGVyZWRPYmplY3Q6IHtcbiAgICBhOiAnJyxcbiAgICBhbGljZTogJycsXG4gICAgYWxsaWFuY2U6ICcnLFxuICAgIGRvcms6ICcnLFxuICAgIGZhdGU6ICcnLFxuICAgIGxvcmQ6ICcnLFxuICAgIHpvZTogJydcbiAgfSxcblxuICB1bm9yZGVyZWRPYmplY3Q6IHtcbiAgICBhbGxpYW5jZTogJycsXG4gICAgem9lOiAnJyxcbiAgICBkb3JrOiAnJyxcbiAgICBsb3JkOiAnJyxcbiAgICBhOiAnJyxcbiAgICBmYXRlOiAnJyxcbiAgICBhbGljZTogJydcbiAgfSxcblxuICB2YWxpZEpzb25UZXN0RGF0YTogW1xuICAgIFt7XG4gICAgICB0aXRsZTogJ0EgZ29vZCBib3QnLFxuICAgICAgdGV4dDogJ0dpdmUgYSBnb29kIGJvdCBhIHBlbm55IGEgZGF5J1xuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdBIGJhZCBib3QnLFxuICAgICAgdGV4dDogJ0dpdmUgYSBiYWQgYm90IGEga25vY2sgb24gdGhlIGhlYWQnXG4gICAgfV0sXG4gICAgW3tcbiAgICAgIHRpdGxlOiAnR29uZSBXaXRoIFRoZSBXaW5kJyxcbiAgICAgIHRleHQ6ICdBZnRlciBhbGwsIHRvbW9ycm93IGlzIGFub3RoZXIgZGF5LidcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnLFxuICAgICAgdGV4dDogJ1doZW4gcmVhc29uIGZhaWxzLCB0aGUgZGV2aWwgaGVscHMuJ1xuICAgIH1dXG4gIF0sXG5cbiAgaW5kZXg6IHtcbiAgICBnaXZlOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgIGdvb2Q6IFsnQSBnb29kIGJvdCddLFxuICAgIGJvdDogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgIHBlbm55OiBbJ0EgZ29vZCBib3QnXSxcbiAgICBkYXk6IFsnQSBnb29kIGJvdCddLFxuICAgIGJhZDogWydBIGJhZCBib3QnXSxcbiAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICBvbjogWydBIGJhZCBib3QnXSxcbiAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgaGVhZDogWydBIGJhZCBib3QnXVxuICB9LFxuXG4gIGluZGljZXM6IHtcbiAgICBib29rMToge1xuICAgICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIHBlbm55OiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGRheTogWydBIGdvb2QgYm90J10sXG4gICAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICAgIG9uOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgaGVhZDogWydBIGJhZCBib3QnXVxuICAgIH1cbiAgfSxcblxuICBGYWtlSW52ZXJ0ZWRJbmRleCxcblxuICBpbnZhbGlkRGF0YTogW1xuICAgIFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ0FsaWNlJyxcbiAgICAgICAgZmFtZTogJ0FsaWNlIGZhbGxzIGludG8gYSByYWJiaXQgaG9sZSBhbmQgZW50ZXJzIGEgd29ybGQgZnVsbCBvZiBpbWFnaW5hdGlvbi4nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnVGhlIExvcmQnLFxuICAgICAgICBmYW1lOiAnQW4gdW51c3VhbCBhbGxpYW5jZSBvZiBtYW4sIGVsZiwgZHdhcmYsIHdpemFyZCBhbmQgaG9iYml0IHNlZWsgdG8gZGVzdHJveSBhIHBvd2VyZnVsIHJpbmcuJ1xuICAgICAgfVxuICAgIF0sXG4gICAgW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ0EgZ29vZCBib3QnLFxuICAgICAgICB0ZXg6ICdHaXZlIGEgZ29vZCBib3QgYSBwZW5ueSBhIGRheSdcbiAgICAgIH1cbiAgICBdXG4gIF0sXG5cbiAgc2VhcmNoUmVzdWx0czogW1xuICAgIHtcbiAgICAgIGJhZDogWydBIGJhZCBib3QnXSxcbiAgICAgIGJvdDogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgICBnb29kOiBbJ0EgZ29vZCBib3QnXVxuICAgIH0sXG4gICAge1xuICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgcmVhbGx5OiBbbnVsbF0sXG4gICAgICBnb29kOiBbJ0EgZ29vZCBib3QnXSxcbiAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgZm9yOiBbbnVsbF0sXG4gICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXVxuICAgIH0sXG4gICAgbnVsbCxcbiAgICB7XG4gICAgICBib29rMTogbnVsbCxcbiAgICAgIGJvb2syOiBudWxsXG4gICAgfSxcbiAgICB7XG4gICAgICBib29rMToge1xuICAgICAgICB0b21vcnJvdzogW251bGxdLFxuICAgICAgICBoZWxwczogW251bGxdLFxuICAgICAgICBkZXZpbDogW251bGxdLFxuICAgICAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICAgICAgZ2l2ZTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgICAga25vY2s6IFsnQSBiYWQgYm90J11cbiAgICAgIH0sXG4gICAgICBib29rMjoge1xuICAgICAgICBhOiBbbnVsbF0sXG4gICAgICAgIGdpdmU6IFtudWxsXSxcbiAgICAgICAgYm90OiBbbnVsbF0sXG4gICAgICAgIGtub2NrOiBbbnVsbF0sXG4gICAgICAgIHRvbW9ycm93OiBbJ0dvbmUgV2l0aCBUaGUgV2luZCddLFxuICAgICAgICBoZWxwczogWydDcmltZSBhbmQgUHVuaXNobWVudCddLFxuICAgICAgICB0aGU6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgICAgZGV2aWw6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGE6IFtudWxsXSxcbiAgICAgIGhlOiBbbnVsbF0sXG4gICAgICBsb29rOiBbbnVsbF0sXG4gICAgICBzYWlkOiBbbnVsbF1cbiAgICB9XG4gIF1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kZWw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy90ZXN0bW9kZWxzLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=