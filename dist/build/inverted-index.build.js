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


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEyNGQyZjczZmZmYzhmY2NjYTEiLCJ3ZWJwYWNrOi8vLy4vZGlzdC9qcy9pbnZlcnRlZC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L2pzL2hlbHBlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDdENBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsTUFBTTtBQUNyQixnQkFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixnQkFBZSxNQUFNO0FBQ3JCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTyxzRDtBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QixnQkFBZSxNQUFNO0FBQ3JCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7OztBQzdHQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLE9BQU87QUFDcEIsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYSxNQUFNO0FBQ25CLGdCQUFlLE1BQU07QUFDckI7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsY0FBYSxPQUFPO0FBQ3BCLGdCQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLGNBQWEsT0FBTztBQUNwQixjQUFhLE1BQU07QUFDbkIsZ0JBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxnQkFBZSxPQUFPO0FBQ3RCLGdCQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSIsImZpbGUiOiJpbnZlcnRlZC1pbmRleC5idWlsZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMjRkMmY3M2ZmZmM4ZmNjY2ExIiwiY29uc3QgaGVscGVycyA9IHJlcXVpcmUoJy4vaGVscGVycycpO1xuXG4vKipcbiAqIEBjbGFzcyBJbnZlcnRlZEluZGV4XG4gKi9cbmNsYXNzIEludmVydGVkSW5kZXgge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIEludmVydGVkSW5kZXguXG4gICAqIEBtZW1iZXJPZiBJbnZlcnRlZEluZGV4XG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluZGljZXMgPSB7fTtcbiAgICB0aGlzLmZldGNoVGl0bGUgPSBoZWxwZXJzLmZldGNoVGl0bGU7XG4gICAgdGhpcy5pc0ZvdW5kID0gaGVscGVycy5pc0ZvdW5kO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBmaWxlIGlzIGEgdmFsaWQganNvbiBmaWxlXG4gICAqIEBwYXJhbSAgIHtBcnJheX0gZGF0YSAtIGZpbGUgaW4gd2hpY2ggdG8gZGV0ZXJtaW5lIHZhbGlkaXR5XG4gICAqIEByZXR1cm5zIHtCb29sZWFufSAtIHRydWUgaWYgZmlsZSBpcyB2YWxpZCBhbmQgZmFsc2UgaWYgb3RoZXJ3aXNlXG4gICAqL1xuICBpc1ZhbGlkKGRhdGEpIHtcbiAgICBpZiAoIWRhdGEgfHwgIUFycmF5LmlzQXJyYXkoZGF0YSkgfHwgZGF0YS5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHZhbGlkID0gZGF0YS5tYXAoKGJvb2spID0+IHtcbiAgICAgIGlmICghYm9vay50aXRsZSB8fCAhYm9vay50ZXh0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvb2sudGl0bGUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICYmIHR5cGVvZiBib29rLnRleHQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB2YWxpZC5pbmRleE9mKGZhbHNlKSA9PT0gLTE7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGluZGV4IGZvciBhIHZhbGlkIGpzb24gZmlsZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmlsZU5hbWUgLSBBIHN0cmluZyBmb3IgbmFtZSBvZiBmaWxlIHRvIGJlIGluZGV4ZWRcbiAgICogQHBhcmFtICAge0FycmF5fSBkYXRhIC0gYW4gQXJyYXkgb2Ygb2JqZWN0cyB0byBiZSBpbmRleGVkXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGluIGtleSB2YWx1ZSBwYWlyIHdoZXJlIGVhY2ggd29yZCBpcyBrZXlcbiAgICogYW5kIHZhbHVlIGlzIGFuICBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIGdlbmVyYXRlSW5kZXgoZmlsZU5hbWUsIGRhdGEpIHtcbiAgICBpZiAoIXRoaXMuaXNWYWxpZChkYXRhKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IGluZGV4ID0ge307XG4gICAgZGF0YS5mb3JFYWNoKChib29rKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gaGVscGVycy5zdHJpcFN0cihib29rLnRleHQpLnNwbGl0KCcgJyk7XG4gICAgICB0ZXh0LmZvckVhY2goKHdvcmQpID0+IHtcbiAgICAgICAgaWYgKGluZGV4W3dvcmRdKSB7XG4gICAgICAgICAgY29uc3Qgd29yZEFycmF5ID0gaW5kZXhbd29yZF07XG4gICAgICAgICAgaWYgKHdvcmRBcnJheS5pbmRleE9mKGJvb2sudGl0bGUpID09PSAtMSkge1xuICAgICAgICAgICAgd29yZEFycmF5LnB1c2goYm9vay50aXRsZSk7XG4gICAgICAgICAgICBpbmRleFt3b3JkXSA9IHdvcmRBcnJheTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAod29yZCAhPT0gJycpIHtcbiAgICAgICAgICBpbmRleFt3b3JkXSA9IFtib29rLnRpdGxlXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmluZGljZXNbZmlsZU5hbWVdID0gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgICByZXR1cm4gaGVscGVycy5zb3J0KGluZGV4KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZWFyY2hlcyBmb3IgYSBrZXl3b3JkIG9yIHBocmFzZSB3aXRoaW4gYSBnZW5lcmF0ZWQgaW5kZXhcbiAgICogQHBhcmFtICAge1N0cmluZ30gcXVlcnkgLSB3b3JkIG9yIHBocmFzZSB0byBzZWFyY2ggZm9yXG4gICAqIEBwYXJhbSAgIHtPYmplY3R9IGZpbGVuYW1lIC0gZ2VuZXJhdGVkIGluZGV4IHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXN1bHQgLSBpbiBrZXkgdmFsdWUgcGFpciB3aGVyZSBlYWNoIHdvcmQgaW4gdGhlIHF1ZXJ5IGlzIGtleVxuICAgKiBhbmQgdmFsdWUgaXMgYW4gIGFycmF5IG9mIHRpdGxlc1xuICAgKi9cbiAgc2VhcmNoKHF1ZXJ5LCBmaWxlbmFtZSkge1xuICAgIGNvbnN0IHdvcmRzID0gT2JqZWN0LmtleXModGhpcy5pbmRpY2VzW2ZpbGVuYW1lXSk7XG4gICAgY29uc3QgcXVlcnlBcnJheSA9IGhlbHBlcnMuc3RyaXBTdHIocXVlcnkpLnNwbGl0KCcgJyk7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgcXVlcnlBcnJheS5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgICBpZiAod29yZHMuaW5kZXhPZih3b3JkKSAhPT0gLTEgJiYgd29yZCAhPT0gJyAnKSB7XG4gICAgICAgIHJlc3VsdFt3b3JkXSA9IHRoaXMuaW5kaWNlc1tmaWxlbmFtZV1bd29yZF07XG4gICAgICB9IGVsc2UgaWYgKHdvcmRzLmluZGV4T2Yod29yZCkgPT09IC0xICYmIHdvcmQgIT09ICcnKSB7ICAgIFxuICAgICAgICByZXN1bHRbd29yZF0gPSBbbnVsbF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coaGVscGVycy5hbGxJc051bGwocmVzdWx0KSk7XG4gICAgcmV0dXJuIGhlbHBlcnMuYWxsSXNOdWxsKHJlc3VsdCkgPyBudWxsIDogcmVzdWx0O1xuICB9XG5cblxuICAvKipcbiAgICogU2VhcmNoZXMgZm9yIGEga2V5d29yZCBvciBwaHJhc2Ugd2l0aGluIG11bHRpcGxlIGdlbmVyYXRlZCBpbmRpY2VzXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHF1ZXJ5IC0gd29yZCBvciBwaHJhc2UgdG8gc2VhcmNoIGZvclxuICAgKiBAcGFyYW0gICB7QXJyYXl9IGRhdGFzZXQgLSBBcnJheSBjb250YWluaW5nIGFsbCBnZW5lcmF0ZWQgaW5kZXggaW4gd2hpY2ggdG8gc2VhcmNoIGluXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHNlYXJjaFJlc3VsdHMgLSBPYmplY3QgY29udGFpbmluZyBtYXBwaW5nIG9mIGZpbGUgbmFtZSB0byB0aGUgc2VhcmNoXG4gICAqIHJlc3VsdCBpbiBlYWNoIGZpbGVcbiAgICovXG4gIHNlYXJjaEFsbChxdWVyeSkge1xuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSB7fTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmluZGljZXMpLmZvckVhY2goKGZpbGVOYW1lKSA9PiB7XG4gICAgICBzZWFyY2hSZXN1bHRzW2ZpbGVOYW1lXSA9IHRoaXMuc2VhcmNoKHF1ZXJ5LCBmaWxlTmFtZSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlYXJjaFJlc3VsdHM7XG4gIH1cbn1cblxud2luZG93LkludmVydGVkSW5kZXggPSBJbnZlcnRlZEluZGV4O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVydGVkSW5kZXg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Rpc3QvanMvaW52ZXJ0ZWQtaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJjb25zdCBoZWxwZXJzID0ge1xuICAvKipcbiAgICogU29ydCBhbiBvYmplY3QgYWxwaGFiZXRpY2FsbHlcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgLSBhbiB1bnNvcnRlZCBPYmplY3RcbiAgICogQHJldHVybnMge09iamVjdH0gc29ydGVkIC0gc29ydGVkIG9iamVjdFxuICAgKi9cbiAgc29ydChkYXRhKSB7XG4gICAgY29uc3Qgc29ydGVkID0ge307XG4gICAgT2JqZWN0LmtleXMoZGF0YSkuc29ydCgpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgc29ydGVkW2tleV0gPSBkYXRhW2tleV07XG4gICAgfSk7XG4gICAgcmV0dXJuIHNvcnRlZDtcbiAgfSxcblxuICAvKipcbiAgICogRmV0Y2ggYWxsIHRoZSB0aXRsZXMgZnJvbSBhbiBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGl0bGUga2V5XG4gICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgLSB2YWxpZCBhcnJheSBvZiBvYmplY3RzIGNvbnRhaW5pbmcgdGl0bGUga2V5XG4gICAqIEByZXR1cm5zIHtBcnJheX0gLSBhbiBhcnJheSBvZiB0aXRsZXNcbiAgICovXG4gIGZldGNoVGl0bGUoZGF0YSkge1xuICAgIHJldHVybiBkYXRhLm1hcChpdGVtID0+IGl0ZW0udGl0bGUpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYWxsIGtleSBpbiB0aGUgb2JqZWN0IGlzIGNvbnRhaW5zIG51bGwgaW4gdGhlIGFycmF5XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gT2JqZWN0IGNvbnRhaW5pbmcgZ2VuZXJhdGVkIGluZGljZXNcbiAgICogQHJldHVybnMge0Jvb2xlYW59IC0gdHJ1ZSBpZiB0aGUgdmF1bHVlcyBvZiBhbGwga2V5cyBhcmUgbnVsbFxuICAgKi9cbiAgYWxsSXNOdWxsKGRhdGEpIHtcbiAgICBjb25zdCBkYXRhTGVuID0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoO1xuICAgIGxldCBudWxsVmFsdWUgPSAwO1xuICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGkpID0+IHtcbiAgICAgIGlmIChkYXRhW2ldLmluZGV4T2YobnVsbCkgIT09IC0xKSB7XG4gICAgICAgIG51bGxWYWx1ZSArPSAxO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBudWxsVmFsdWUgPT09IGRhdGFMZW47XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgdGl0bGUgaXMgZm91bmQgaW4gYW4gYXJyYXkgb2YgdGl0bGVzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSAtIHRpdGxlIHRvIHNlYXJjaCBmb3JcbiAgICogQHBhcmFtIHtBcnJheX0gdGl0bGVzIC0gYXJyYXkgb2YgdGl0bGVzIHRvIHNlYXJjaCBpblxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gLSB0cnVlIGlmIHRpdGxlIHdhcyBmb3VuZCBhbmQgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBpc0ZvdW5kKHRpdGxlLCB0aXRsZXMpIHtcbiAgICByZXR1cm4gdGl0bGVzLmluZGV4T2YodGl0bGUpICE9PSAtMTtcbiAgfSxcblxuICAvKipcbiAgICogUmVtb3ZlcyBzcGVjaWFsIGNoYXJhY3RlcnMgZnJvbSBhIHN0cmluZyBhbmQgY29udmVydHMgdG8gbG93ZXJjYXNlXG4gICAqIEBwYXJhbSAgIHtTdHJpbmd9IHdob2xlU3RyaW5nIC0gY29udGFpbnMgYSBzdHJpbmdcbiAgICogQHJldHVybnMge1N0cmluZ30gLSBhIGxvd2VyY2FzZSBzdHJpbmcgd2l0aG91dCBzeW1ib2xzXG4gICAqL1xuICBzdHJpcFN0cih3aG9sZVN0cmluZykge1xuICAgIGlmICh0eXBlb2Ygd2hvbGVTdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHdob2xlU3RyaW5nLnJlcGxhY2UoL1teYS16QS1aIF0vZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGVscGVycztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGlzdC9qcy9oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIl0sInNvdXJjZVJvb3QiOiIifQ==