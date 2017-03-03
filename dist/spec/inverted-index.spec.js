const InvertedIndex = require('../js/inverted-index');
const model = require('./testmodels');
const helpers = require('../js/helpers');


describe('Test suite for helper functions', () => {
  it('Should sort an unsorted object alphabetically', () => {
    const sortedObject = helpers.sort(model.unorderedObject);
    expect(Object.keys(sortedObject))
    .toEqual(Object.keys(model.orderedObject));
  });
});

describe('Test suite for Inverted Index Class', () => {
  const InvertedIndexTest = new InvertedIndex();

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
      expect(InvertedIndexTest.search(model.searchQueries[0], 'test1'))
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
      .toEqual(model.search_all_result);
    });
  });
});
