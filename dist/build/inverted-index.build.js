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

	module.exports = __webpack_require__(1);


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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjFhMTI2YjA4NzI4OTQxZDM3YTMiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9pbnZlcnRlZC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLE1BQU07QUFDckIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsTUFBTTtBQUNyQjtBQUNBLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7Ozs7O0FDMUZBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixnQkFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFhLE1BQU07QUFDbkIsZ0JBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGNBQWEsTUFBTTtBQUNuQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLGdCQUFlLE9BQU87QUFDdEIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6ImludmVydGVkLWluZGV4LmJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMjFhMTI2YjA4NzI4OTQxZDM3YTMiLCJjb25zdCBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbi8qKlxuICogQGNsYXNzIEludmVydGVkSW5kZXhcbiAqL1xuY2xhc3MgSW52ZXJ0ZWRJbmRleCB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgSW52ZXJ0ZWRJbmRleC5cbiAgICogQG1lbWJlck9mIEludmVydGVkSW5kZXhcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5kaWNlcyA9IHt9O1xuICAgIHRoaXMuZmV0Y2hUaXRsZSA9IGhlbHBlcnMuZmV0Y2hUaXRsZTtcbiAgICB0aGlzLmlzRm91bmQgPSBoZWxwZXJzLmlzRm91bmQ7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGluZGV4IGZvciBhIHZhbGlkIGpzb24gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBBIHN0cmluZyBmb3IgbmFtZSBvZiBmaWxlIHRvIGJlIGluZGV4ZWRcbiAgICogQHBhcmFtICAge0FycmF5fSBmaWxlQ29udGVudHMgLSBhbiBBcnJheSBvZiBvYmplY3RzIHRvIGJlIGluZGV4ZWRcbiAgICogQHJldHVybnMge09iamVjdH0gaW4ga2V5IHZhbHVlIHBhaXIgd2hlcmUgZWFjaCB3b3JkIGlzIGtleVxuICAgKiBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgZ2VuZXJhdGVJbmRleChmaWxlTmFtZSwgZmlsZUNvbnRlbnRzKSB7XG4gICAgaWYgKCFoZWxwZXJzLmlzVmFsaWQoZmlsZUNvbnRlbnRzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0ge307XG4gICAgZmlsZUNvbnRlbnRzLmZvckVhY2goKGJvb2spID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBoZWxwZXJzLnN0cmlwU3RyKGJvb2sudGV4dCkuc3BsaXQoJyAnKTtcbiAgICAgIHRleHQuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXhbd29yZF0pIHtcbiAgICAgICAgICBjb25zdCB3b3JkTGlzdCA9IGluZGV4W3dvcmRdO1xuICAgICAgICAgIGlmICh3b3JkTGlzdC5pbmRleE9mKGJvb2sudGl0bGUpID09PSAtMSkge1xuICAgICAgICAgICAgd29yZExpc3QucHVzaChib29rLnRpdGxlKTtcbiAgICAgICAgICAgIGluZGV4W3dvcmRdID0gd29yZExpc3Q7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHdvcmQgIT09ICcnKSB7XG4gICAgICAgICAgaW5kZXhbd29yZF0gPSBbYm9vay50aXRsZV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbmRpY2VzW2ZpbGVOYW1lXSA9IGhlbHBlcnMuc29ydChpbmRleCk7XG4gICAgcmV0dXJuIGhlbHBlcnMuc29ydChpbmRleCk7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIGEgZ2VuZXJhdGVkIGluZGV4XG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7T2JqZWN0fSBmaWxlTmFtZSAtIGdlbmVyYXRlZCBpbmRleCB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge09iamVjdH0gcmVzdWx0IC0gaW4ga2V5IHZhbHVlIHBhaXIgd2hlcmUgZWFjaCB3b3JkXG4gICAqIGluIHRoZSBxdWVyeSBpcyBrZXkgYW5kIHZhbHVlIGlzIGFuICBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIHNlYXJjaChxdWVyeSwgZmlsZU5hbWUpIHtcbiAgICBjb25zdCB3b3JkcyA9IE9iamVjdC5rZXlzKHRoaXMuaW5kaWNlc1tmaWxlTmFtZV0pO1xuICAgIGNvbnN0IHF1ZXJ5TGlzdCA9IGhlbHBlcnMuc3RyaXBTdHIocXVlcnkpLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgcXVlcnlMaXN0LmZvckVhY2goKHdvcmQpID0+IHtcbiAgICAgIGlmICh3b3Jkcy5pbmRleE9mKHdvcmQpICE9PSAtMSAmJiB3b3JkICE9PSAnICcpIHtcbiAgICAgICAgcmVzdWx0W3dvcmRdID0gdGhpcy5pbmRpY2VzW2ZpbGVOYW1lXVt3b3JkXTtcbiAgICAgIH0gZWxzZSBpZiAod29yZHMuaW5kZXhPZih3b3JkKSA9PT0gLTEgJiYgd29yZCAhPT0gJycpIHtcbiAgICAgICAgcmVzdWx0W3dvcmRdID0gW251bGxdO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBoZWxwZXJzLmFsbElzRW1wdHkocmVzdWx0KSA/IG51bGwgOiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIG11bHRpcGxlIGdlbmVyYXRlZFxuICAgKiBpbmRpY2VzXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGRhdGFzZXQgLSBBcnJheSBjb250YWluaW5nIGFsbCBnZW5lcmF0ZWQgaW5kZXhcbiAgICogaW4gd2hpY2ggdG8gc2VhcmNoIGluXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlYXJjaFJlc3VsdHMgLSBPYmplY3QgY29udGFpbmluZyBtYXBwaW5nIG9mXG4gICAqIGZpbGUgbmFtZSB0byB0aGUgc2VhcmNoXG4gICAqIHJlc3VsdCBpbiBlYWNoIGZpbGVcbiAgICovXG4gIHNlYXJjaEFsbChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZGljZXMpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICBzZWFyY2hSZXN1bHRzW2ZpbGVOYW1lXSA9IHRoaXMuc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cbn1cblxud2luZG93LkludmVydGVkSW5kZXggPSBJbnZlcnRlZEluZGV4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaW52ZXJ0ZWQtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCBoZWxwZXJzID0ge1xuICAvKipcbiAgICogU29ydCBhbiBvYmplY3QgYWxwaGFiZXRpY2FsbHlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbiB1bnNvcnRlZCBPYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gLSBzb3J0ZWQgb2JqZWN0XG4gICAqL1xuICBzb3J0KGRhdGEpIHtcbiAgICBjb25zdCBzb3J0ZWQgPSB7fTtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5zb3J0KCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBzb3J0ZWRba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9KTtcbiAgICByZXR1cm4gc29ydGVkO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGZXRjaCBhbGwgdGhlIHRpdGxlcyBmcm9tIGFuIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyB0aXRsZSBrZXlcbiAgICogQHBhcmFtIHtBcnJheX0gZGF0YSAtIHZhbGlkIGFycmF5IG9mIG9iamVjdHMgY29udGFpbmluZyB0aXRsZSBrZXlcbiAgICogQHJldHVybnMge0FycmF5fSAtIGFuIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgZmV0Y2hUaXRsZShkYXRhKSB7XG4gICAgcmV0dXJuIGRhdGEubWFwKGl0ZW0gPT4gaXRlbS50aXRsZSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhbGwga2V5IGluIHRoZSBvYmplY3QgaXMgY29udGFpbnMgbnVsbCBpbiB0aGUgYXJyYXlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBPYmplY3QgY29udGFpbmluZyBnZW5lcmF0ZWQgaW5kaWNlc1xuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRoZSB2YXVsdWVzIG9mIGFsbCBrZXlzIGFyZSBudWxsXG4gICAqL1xuICBhbGxJc0VtcHR5KGRhdGEpIHtcbiAgICBjb25zdCBkYXRhTGVuID0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoO1xuICAgIGxldCBudWxsVmFsdWUgPSAwO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGlmIChkYXRhW2ldLmluZGV4T2YobnVsbCkgIT09IC0xKSB7XG4gICAgICAgIG51bGxWYWx1ZSArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsVmFsdWUgPT09IGRhdGFMZW47XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBmaWxlIGlzIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YSAtIGZpbGUgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHZhbGlkaXR5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgZmlsZSBpcyB2YWxpZCBhbmQgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAqL1xuICBpc1ZhbGlkKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZGF0YS5tYXAoKGJvb2spID0+IHtcbiAgICAgIGlmICghYm9vay50aXRsZSB8fCAhYm9vay50ZXh0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvb2sudGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAmJiB0eXBlb2YgYm9vay50ZXh0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gdmFsaWQuaW5kZXhPZihmYWxzZSkgPT09IC0xO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIHRpdGxlIGlzIGZvdW5kIGluIGFuIGFycmF5IG9mIHRpdGxlc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gdGl0bGUgLSB0aXRsZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSB7QXJyYXl9IHRpdGxlcyAtIGFycmF5IG9mIHRpdGxlcyB0byBzZWFyY2ggaW5cbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiB0aXRsZSB3YXMgZm91bmQgYW5kIGZhbHNlIG90aGVyd2lzZVxuICAgKi9cbiAgaXNGb3VuZCh0aXRsZSwgdGl0bGVzKSB7XG4gICAgcmV0dXJuIHRpdGxlcy5pbmRleE9mKHRpdGxlKSAhPT0gLTE7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3BlY2lhbCBjaGFyYWN0ZXJzIGZyb20gYSBzdHJpbmcgYW5kIGNvbnZlcnRzIHRvIGxvd2VyY2FzZVxuICAgKiBAcGFyYW0gICB7U3RyaW5nfSB3aG9sZVN0cmluZyAtIGNvbnRhaW5zIGEgc3RyaW5nXG4gICAqIEByZXR1cm5zIHtTdHJpbmd9IC0gYSBsb3dlcmNhc2Ugc3RyaW5nIHdpdGhvdXQgc3ltYm9sc1xuICAgKi9cbiAgc3RyaXBTdHIod2hvbGVTdHJpbmcpIHtcbiAgICBpZiAodHlwZW9mIHdob2xlU3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB3aG9sZVN0cmluZy5yZXBsYWNlKC9bXmEtekEtWiBdL2csICcnKS50b0xvd2VyQ2FzZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhlbHBlcnM7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSJdLCJzb3VyY2VSb290IjoiIn0=