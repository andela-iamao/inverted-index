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

	const helpers = __webpack_require__(1);
	const InvertedIndex = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../js/inverted-index\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	const model = __webpack_require__(2);
	
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
/* 2 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY1ZTg3YTA2M2E0N2M2NjY0YjY/ZDQxMSIsIndlYnBhY2s6Ly8vLi9kaXN0L3NwZWMvaW52ZXJ0ZWQtaW5kZXguc3BlYy5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9zcGVjL3Rlc3Rtb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLE9BQU87QUFDckM7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJpbnZlcnRlZC1pbmRleC5zcGVjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZmY1ZTg3YTA2M2E0N2M2NjY0YjYiLCJjb25zdCBoZWxwZXJzID0gcmVxdWlyZSgnLi4vanMvaGVscGVycycpO1xuY29uc3QgSW52ZXJ0ZWRJbmRleCA9IHJlcXVpcmUoJy4uL2pzL2ludmVydGVkLWluZGV4Jyk7XG5jb25zdCBtb2RlbCA9IHJlcXVpcmUoJy4vdGVzdG1vZGVscycpO1xuXG5jb25zdCBJbnZlcnRlZEluZGV4VGVzdCA9IG5ldyBJbnZlcnRlZEluZGV4KCk7XG5cbmRlc2NyaWJlKCdzb3J0IGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHNvcnQgdW5vcmRlcmVkIG9iamVjdHMgYWxwaGFiZXRpY2FsbHknLFxuICAgKCkgPT4ge1xuICAgICBjb25zdCBzb3J0ZWRPYmplY3QgPSBoZWxwZXJzLnNvcnQobW9kZWwudW5vcmRlcmVkT2JqZWN0KTtcbiAgICAgZXhwZWN0KE9iamVjdC5rZXlzKHNvcnRlZE9iamVjdCkpXG4gICAgLnRvRXF1YWwoT2JqZWN0LmtleXMobW9kZWwub3JkZXJlZE9iamVjdCkpO1xuICAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2ZldGNoVGl0bGUgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgY29tcGlsZSBhbGwgdmFsdWUgb2YgdGl0bGUga2V5IGluIGFuIGFycmF5IG9mIG9iamVjdHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuZmV0Y2hUaXRsZShtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwoWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2FsbElzRW1wdHkgZnVuY3Rpb24nLCAoKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgaWYgZXZlcnkga2V5IGluIG9iamVjdCBpcyBudWxsJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmFsbElzRW1wdHkobW9kZWwuc2VhcmNoUmVzdWx0c1s1XSkpLnRvRXF1YWwodHJ1ZSk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdpc0ZvdW5kIGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIHN0cmluZyBpcyBmb3VuZCBpbiBhcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc0ZvdW5kKCdBIGdvb2QgYm90JywgWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddKSlcbiAgICAudG9FcXVhbCh0cnVlKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgc3RyaW5nIGlzIG5vdCBmb3VuZCBpbiBhcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc0ZvdW5kKCdBIHJlZCBib3QnLCBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10pKVxuICAgIC50b0VxdWFsKGZhbHNlKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ3N0cmlwU3RyIGZ1bmN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgYW55IHN5bWJvbHMnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnNcbiAgICAuc3RyaXBTdHIoJ1wiI05vdGhJbmcgbGlLZSBicmVhS2luZyBsSWtlIGdsQXNzIVwiLCB3cm90ZSB0aGUgYmxvbmRlIGdpcmwnKSlcbiAgICAudG9FcXVhbCgnbm90aGluZyBsaWtlIGJyZWFraW5nIGxpa2UgZ2xhc3Mgd3JvdGUgdGhlIGJsb25kZSBnaXJsJyk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIHdoZW4gc2VhcmNoaW5nIGZvciBzeW1ib2xzIGluIHN0cmlwZWQgc3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzXG4gICAgLnN0cmlwU3RyKCdcIiNOb3RoSW5nIGxpS2UgYnJlYUtpbmcgbElrZSBnbEFzcyFcIiwgd3JvdGUgdGhlIGJsb25kZSBnaXJsJylcbiAgICAubWF0Y2goL1stISQlXiYqKClfK3x+PWB7fVxcW1xcXTpcIjsnPD4/LC5cXC9dLykpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIHdoZW4gaW5wdXQgaXMgbm90IG9mIHR5cGUgU3RyaW5nJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLnN0cmlwU3RyKDMyMjM5OTIzMDIzKSkudG9FcXVhbChudWxsKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ2lzVmFsaWQgZnVuY3Rpb24nLFxuKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGlmIGlucHV0IGlzIGluIGEgdmFsaWQgZm9ybWF0JyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQobW9kZWwudmFsaWRKc29uVGVzdERhdGFbMF0pKS50b0JlKHRydWUpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBpZiBpbnB1dCBpcyBpbiBhbiBpbnZhbGlkIGZvcm1hdCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKG1vZGVsLmludmFsaWREYXRhWzFdKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bCByZXR1cm4gZmFsc2UgaWYgbnVsbCBpcyBwYXNzZWQgaW4nLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KGhlbHBlcnMuaXNWYWxpZChudWxsKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIG5vdGhpbmcgaXMgcGFzc2VkIGluJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIGlucHV0IGlzIG5vdCBhbiBBcnJheSBvZiBvYmplY3RzJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoJ0EganNvbiBmaWxlJykpLnRvQmUoZmFsc2UpO1xuICAgIGV4cGVjdChoZWxwZXJzLmlzVmFsaWQoW10pKS50b0JlKGZhbHNlKTtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKDMyMzIzKSkudG9CZShmYWxzZSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGlmIHRoZSB0ZXh0IGtleSBpcyBlbXB0eScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVycy5pc1ZhbGlkKFt7IHRpdGxlOiAnR3JlYXQnLCB0ZXh0OiAnJyB9XSkpXG4gICAgLnRvQmUoZmFsc2UpO1xuICB9KTtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgaWYgdGhlIHRpdGxlIGtleSBpcyBlbXB0eScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoaGVscGVyc1xuICAgIC5pc1ZhbGlkKFtcbiAgICAgIHsgdGl0bGU6ICcnLCBhdXRob3I6ICdTY290dCBGaXpnZXJhbGQnLCB0ZXh0OiAnR2F0c2J5IGFuZCBEYWlzeScgfV0pKVxuICAgICAgLnRvQmUoZmFsc2UpO1xuICB9KTtcbn0pO1xuXG5cbmRlc2NyaWJlKCdnZW5lcmF0ZUluZGV4IGZ1bmN0aW9uJyxcbigpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gZ2VuZXJhdGVkIGludmVydGVkIGluZGV4IGZvciBhbiBpbnB1dCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnYm9vazEnLCBtb2RlbC52YWxpZEpzb25UZXN0RGF0YVswXSkpXG4gICAgLnRvRXF1YWwobW9kZWwuaW5kZXgpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGZvciBhbiBlbXB0eSBpbnB1dCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCgpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGlmIG51bGwgaXMgcGFzc2VkIGluJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdC5nZW5lcmF0ZUluZGV4KG51bGwpKS50b0VxdWFsKG51bGwpO1xuICB9KTtcblxuICBpdCgnc2hvdWxkIHJldHVybiBudWxsIGZpZiBpbnB1dCBpcyBub3Qgb2YgdHlwZSBBcnJheScsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuZ2VuZXJhdGVJbmRleCh7fSkpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgoMjMyMykpLnRvRXF1YWwobnVsbCk7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LmdlbmVyYXRlSW5kZXgoJ2VkZ2UgY2FzZXMnKSlcbiAgICAudG9FcXVhbChudWxsKTtcbiAgfSk7XG5cbiAgaXQoJ3Nob3VsZCByZXR1cm4gbnVsbCBpZiBkYXRhIGlzIG5vdCBpbiBhIHZhbGlkIGZvcm1hdCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuZ2VuZXJhdGVJbmRleCgnaW52YWxpZCBkYXRhJywgbW9kZWwuaW52YWxpZERhdGFbMF0pKVxuICAgIC50b0VxdWFsKG51bGwpO1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdpbnZhbGlkIGRhdGEnLCBtb2RlbC5pbnZhbGlkRGF0YVsxXSkpXG4gICAgLnRvRXF1YWwobnVsbCk7XG4gIH0pO1xufSk7XG5cbmRlc2NyaWJlKCdJbmRpY2VzIHByb3BlcnR5JywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIHJldHVybiBvYmplY3Qgb2YgYWxsIGdlbmVyYXRlZCBJbmRleCcsXG4gICgpID0+IHtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3QuaW5kaWNlcykudG9FcXVhbChtb2RlbC5pbmRpY2VzKTtcbiAgfSk7XG59KTtcblxuXG5kZXNjcmliZSgnU2VhcmNoIGZ1bmN0aW9uJyxcbigpID0+IHtcbiAgaXQoJ3Nob3VsZCByZXR1cm4gc2VhcmNoIHJlc3VsdHMgZm9yIHF1ZXJ5IHN0cmluZyBpbiBmaWxlIG5hbWUnLFxuICAoKSA9PiB7XG4gICAgZXhwZWN0KEludmVydGVkSW5kZXhUZXN0LnNlYXJjaCgnYmFkIGdvb2QgYm90IGtub2NrJywgJ2Jvb2sxJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1swXSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIG51bGwgaWYgc2VhcmNoIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2goJ2EgcmVhbGx5IGdvb2Qga25vY2sgZm9yIHRoZSBib3QnLCAnYm9vazEnKSlcbiAgICAudG9FcXVhbChtb2RlbC5zZWFyY2hSZXN1bHRzWzFdKTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ3NlYXJjaEFsbCBmdW5jdGlvbicsXG4oKSA9PiB7XG4gIGl0KCdzaG91bGQgcmV0dXJuIHNlYXJjaCByZXN1bHRzIGZvciBxdWVyeSBzdHJpbmcgaW4gYWxsIGdlbmVyYXRlZCBmaWxlcycsXG4gICgpID0+IHtcbiAgICBJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5nZW5lcmF0ZUluZGV4KCdib29rMicsIG1vZGVsLnZhbGlkSnNvblRlc3REYXRhWzFdKTtcbiAgICBleHBlY3QoSW52ZXJ0ZWRJbmRleFRlc3RcbiAgICAuc2VhcmNoQWxsKCd0b21vcnJvdyBoZWxwcyB0aGUgZGV2aWwgZ2l2ZSBhIGJvdCBhIGtub2NrJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1s0XSk7XG4gIH0pO1xuXG4gIGl0KCdzaG91bGQgcmV0dXJuIGZpbGVuYW1lIHRvIG51bGwgaWYgc2VhcmNoIHF1ZXJ5IGlzIG5vdCBmb3VuZCBpbiBmaWxlJyxcbiAgKCkgPT4ge1xuICAgIGV4cGVjdChJbnZlcnRlZEluZGV4VGVzdFxuICAgIC5zZWFyY2hBbGwoJ0hlIHN0aWNrcyB0byBoaXMgd2lsZCBzaWRlJykpXG4gICAgLnRvRXF1YWwobW9kZWwuc2VhcmNoUmVzdWx0c1szXSk7XG4gIH0pO1xufSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3Qvc3BlYy9pbnZlcnRlZC1pbmRleC5zcGVjLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNvbnN0IGhlbHBlcnMgPSB7XG4gIC8qKlxuICAgKiBTb3J0IGFuIG9iamVjdCBhbHBoYWJldGljYWxseVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGFuIHVuc29ydGVkIE9iamVjdFxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSAtIHNvcnRlZCBvYmplY3RcbiAgICovXG4gIHNvcnQoZGF0YSkge1xuICAgIGNvbnN0IHNvcnRlZCA9IHt9O1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIHNvcnRlZFtrZXldID0gZGF0YVtrZXldO1xuICAgIH0pO1xuICAgIHJldHVybiBzb3J0ZWQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZldGNoIGFsbCB0aGUgdGl0bGVzIGZyb20gYW4gYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcGFyYW0ge0FycmF5fSBkYXRhIC0gdmFsaWQgYXJyYXkgb2Ygb2JqZWN0cyBjb250YWluaW5nIHRpdGxlIGtleVxuICAgKiBAcmV0dXJucyB7QXJyYXl9IC0gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqL1xuICBmZXRjaFRpdGxlKGRhdGEpIHtcbiAgICByZXR1cm4gZGF0YS5tYXAoaXRlbSA9PiBpdGVtLnRpdGxlKTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGFsbCBrZXkgaW4gdGhlIG9iamVjdCBpcyBjb250YWlucyBudWxsIGluIHRoZSBhcnJheVxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIE9iamVjdCBjb250YWluaW5nIGdlbmVyYXRlZCBpbmRpY2VzXG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgdGhlIHZhdWx1ZXMgb2YgYWxsIGtleXMgYXJlIG51bGxcbiAgICovXG4gIGFsbElzRW1wdHkoZGF0YSkge1xuICAgIGNvbnN0IGRhdGFMZW4gPSBPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGg7XG4gICAgbGV0IG51bGxWYWx1ZSA9IDA7XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgaWYgKGRhdGFbaV0uaW5kZXhPZihudWxsKSAhPT0gLTEpIHtcbiAgICAgICAgbnVsbFZhbHVlICs9IDE7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG51bGxWYWx1ZSA9PT0gZGF0YUxlbjtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGZpbGUgaXMgYSB2YWxpZCBqc29uIGZpbGVcbiAgICogQHBhcmFtICAge0FycmF5fSBkYXRhIC0gZmlsZSBpbiB3aGljaCB0byBkZXRlcm1pbmUgdmFsaWRpdHlcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiBmaWxlIGlzIHZhbGlkIGFuZCBmYWxzZSBpZiBvdGhlcndpc2VcbiAgICovXG4gIGlzVmFsaWQoZGF0YSkge1xuICAgIGlmICghZGF0YSB8fCAhQXJyYXkuaXNBcnJheShkYXRhKSB8fCBkYXRhLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdmFsaWQgPSBkYXRhLm1hcCgoYm9vaykgPT4ge1xuICAgICAgaWYgKCFib29rLnRpdGxlIHx8ICFib29rLnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9vay50aXRsZSA9PT0gJ3N0cmluZydcbiAgICAgICYmIHR5cGVvZiBib29rLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWxpZC5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGl0bGUgaXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtIHRpdGxlIHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtBcnJheX0gdGl0bGVzIC0gYXJyYXkgb2YgdGl0bGVzIHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRpdGxlIHdhcyBmb3VuZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0ZvdW5kKHRpdGxlLCB0aXRsZXMpIHtcbiAgICByZXR1cm4gdGl0bGVzLmluZGV4T2YodGl0bGUpICE9PSAtMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSBhIHN0cmluZyBhbmQgY29udmVydHMgdG8gbG93ZXJjYXNlXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHdob2xlU3RyaW5nIC0gY29udGFpbnMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBhIGxvd2VyY2FzZSBzdHJpbmcgd2l0aG91dCBzeW1ib2xzXG4gICAqL1xuICBzdHJpcFN0cih3aG9sZVN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygd2hvbGVTdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlU3RyaW5nLnJlcGxhY2UoL1teYS16QS1aIF0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSIsImNsYXNzIEZha2VJbnZlcnRlZEluZGV4IHtcblxufVxuXG5jb25zdCBtb2RlbCA9IHtcblxuICBvcmRlcmVkT2JqZWN0OiB7XG4gICAgYTogJycsXG4gICAgYWxpY2U6ICcnLFxuICAgIGFsbGlhbmNlOiAnJyxcbiAgICBkb3JrOiAnJyxcbiAgICBmYXRlOiAnJyxcbiAgICBsb3JkOiAnJyxcbiAgICB6b2U6ICcnXG4gIH0sXG5cbiAgdW5vcmRlcmVkT2JqZWN0OiB7XG4gICAgYWxsaWFuY2U6ICcnLFxuICAgIHpvZTogJycsXG4gICAgZG9yazogJycsXG4gICAgbG9yZDogJycsXG4gICAgYTogJycsXG4gICAgZmF0ZTogJycsXG4gICAgYWxpY2U6ICcnXG4gIH0sXG5cbiAgdmFsaWRKc29uVGVzdERhdGE6IFtcbiAgICBbe1xuICAgICAgdGl0bGU6ICdBIGdvb2QgYm90JyxcbiAgICAgIHRleHQ6ICdHaXZlIGEgZ29vZCBib3QgYSBwZW5ueSBhIGRheSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnQSBiYWQgYm90JyxcbiAgICAgIHRleHQ6ICdHaXZlIGEgYmFkIGJvdCBhIGtub2NrIG9uIHRoZSBoZWFkJ1xuICAgIH1dLFxuICAgIFt7XG4gICAgICB0aXRsZTogJ0dvbmUgV2l0aCBUaGUgV2luZCcsXG4gICAgICB0ZXh0OiAnQWZ0ZXIgYWxsLCB0b21vcnJvdyBpcyBhbm90aGVyIGRheS4nXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0NyaW1lIGFuZCBQdW5pc2htZW50JyxcbiAgICAgIHRleHQ6ICdXaGVuIHJlYXNvbiBmYWlscywgdGhlIGRldmlsIGhlbHBzLidcbiAgICB9XVxuICBdLFxuXG4gIC8vIEdlbmVyYXRlZCBJbmRleCBNb2RlbFxuICBpbmRleDoge1xuICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICBhOiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgcGVubnk6IFsnQSBnb29kIGJvdCddLFxuICAgIGRheTogWydBIGdvb2QgYm90J10sXG4gICAgYmFkOiBbJ0EgYmFkIGJvdCddLFxuICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgIG9uOiBbJ0EgYmFkIGJvdCddLFxuICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICBoZWFkOiBbJ0EgYmFkIGJvdCddXG4gIH0sXG5cbiAgLy8gSW5kaWNlcyBNb2RlbFxuICBpbmRpY2VzOiB7XG4gICAgYm9vazE6IHtcbiAgICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGdvb2Q6IFsnQSBnb29kIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICBwZW5ueTogWydBIGdvb2QgYm90J10sXG4gICAgICBkYXk6IFsnQSBnb29kIGJvdCddLFxuICAgICAgYmFkOiBbJ0EgYmFkIGJvdCddLFxuICAgICAga25vY2s6IFsnQSBiYWQgYm90J10sXG4gICAgICBvbjogWydBIGJhZCBib3QnXSxcbiAgICAgIHRoZTogWydBIGJhZCBib3QnXSxcbiAgICAgIGhlYWQ6IFsnQSBiYWQgYm90J11cbiAgICB9XG4gIH0sXG5cbiAgRmFrZUludmVydGVkSW5kZXgsXG5cbiAgaW52YWxpZERhdGE6IFtcbiAgICBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdBbGljZScsXG4gICAgICAgIGZhbWU6ICdBbGljZSBmYWxscyBpbnRvIGEgcmFiYml0IGhvbGUgYW5kIGVudGVycyBhIHdvcmxkIGZ1bGwgb2YgaW1hZ2luYXRpb24uJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1RoZSBMb3JkJyxcbiAgICAgICAgZmFtZTogJ0FuIHVudXN1YWwgYWxsaWFuY2Ugb2YgbWFuLCBlbGYsIGR3YXJmLCB3aXphcmQgYW5kIGhvYmJpdCBzZWVrIHRvIGRlc3Ryb3kgYSBwb3dlcmZ1bCByaW5nLidcbiAgICAgIH1cbiAgICBdLFxuICAgIFtcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdBIGdvb2QgYm90JyxcbiAgICAgICAgdGV4OiAnR2l2ZSBhIGdvb2QgYm90IGEgcGVubnkgYSBkYXknXG4gICAgICB9XG4gICAgXVxuICBdLFxuXG4gIHNlYXJjaFJlc3VsdHM6IFtcbiAgICB7XG4gICAgICBiYWQ6IFsnQSBiYWQgYm90J10sXG4gICAgICBib3Q6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J11cbiAgICB9LFxuICAgIHtcbiAgICAgIGE6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgIHJlYWxseTogW251bGxdLFxuICAgICAgZ29vZDogWydBIGdvb2QgYm90J10sXG4gICAgICBrbm9jazogWydBIGJhZCBib3QnXSxcbiAgICAgIGZvcjogW251bGxdLFxuICAgICAgdGhlOiBbJ0EgYmFkIGJvdCddLFxuICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J11cbiAgICB9LFxuICAgIG51bGwsXG4gICAge1xuICAgICAgYm9vazE6IG51bGwsXG4gICAgICBib29rMjogbnVsbFxuICAgIH0sXG4gICAge1xuICAgICAgYm9vazE6IHtcbiAgICAgICAgdG9tb3Jyb3c6IFtudWxsXSxcbiAgICAgICAgaGVscHM6IFtudWxsXSxcbiAgICAgICAgZGV2aWw6IFtudWxsXSxcbiAgICAgICAgYTogWydBIGdvb2QgYm90JywgJ0EgYmFkIGJvdCddLFxuICAgICAgICB0aGU6IFsnQSBiYWQgYm90J10sXG4gICAgICAgIGdpdmU6IFsnQSBnb29kIGJvdCcsICdBIGJhZCBib3QnXSxcbiAgICAgICAgYm90OiBbJ0EgZ29vZCBib3QnLCAnQSBiYWQgYm90J10sXG4gICAgICAgIGtub2NrOiBbJ0EgYmFkIGJvdCddXG4gICAgICB9LFxuICAgICAgYm9vazI6IHtcbiAgICAgICAgYTogW251bGxdLFxuICAgICAgICBnaXZlOiBbbnVsbF0sXG4gICAgICAgIGJvdDogW251bGxdLFxuICAgICAgICBrbm9jazogW251bGxdLFxuICAgICAgICB0b21vcnJvdzogWydHb25lIFdpdGggVGhlIFdpbmQnXSxcbiAgICAgICAgaGVscHM6IFsnQ3JpbWUgYW5kIFB1bmlzaG1lbnQnXSxcbiAgICAgICAgdGhlOiBbJ0NyaW1lIGFuZCBQdW5pc2htZW50J10sXG4gICAgICAgIGRldmlsOiBbJ0NyaW1lIGFuZCBQdW5pc2htZW50J10sXG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBhOiBbbnVsbF0sXG4gICAgICBoZTogW251bGxdLFxuICAgICAgbG9vazogW251bGxdLFxuICAgICAgc2FpZDogW251bGxdXG4gICAgfVxuICBdXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZGVsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kaXN0L3NwZWMvdGVzdG1vZGVscy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEiXSwic291cmNlUm9vdCI6IiJ9