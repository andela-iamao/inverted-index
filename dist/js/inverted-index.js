//const Helpers = require('./helpers');
/**
 * @class InvertedIndex
 */
class InvertedIndex {

  /**
   * Creates an instance of InvertedIndex.
   * @memberOf InvertedIndex
   */
  constructor() {
    this.generated_index = {};
  }
}

InvertedIndex.prototype.search = (query, data) => {
  const words = Object.keys(data);
  const queryArray = query.split(' ');
  const result = {};
  let sortedResult = {};
  queryArray.map((q) => {
    if (words.indexOf(q) !== -1) {
      result[q] = data[q];
    }
    return null;
  });
  sortedResult = sort(result);
  return sortedResult;
};

InvertedIndex.prototype.fetchTitle = fetchTitle;
InvertedIndex.prototype.isFound = isFound;

InvertedIndex.prototype.isValid = (data) => {
  if (!data) return false;
  if (data.constructor !== Array) return false;
  if (data.length < 1) return false;
  const valid = data.map(book => (((
      !book.title || !book.text) ? false :
      (book.title.constructor === String && book.text.constructor === String))));
  return (valid.indexOf(false) === -1);
};

InvertedIndex.prototype.generateIndex = (data) => {
  const index = {};
  data.map((book) => {
    const text = book.text.replace(/[^a-zA-Z ]/g, '').toLowerCase().split(' ');
    text.forEach((word) => {
      if (index[word]) {
        const wordArray = index[word];
        if (wordArray.indexOf(book.title) === -1) {
          wordArray.push(book.title);
          index[word] = wordArray;
        }
      } else {
        index[word] = [book.title];
      }
    });
    return null;
  });
  const sortedIndex = sort(index);
  return sortedIndex;
};
//module.exports = InvertedIndex;