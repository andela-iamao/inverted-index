const helpers = require('../js/helpers');
const InvertedIndex = require('../js/inverted-index');
const model = require('./testmodels');

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
