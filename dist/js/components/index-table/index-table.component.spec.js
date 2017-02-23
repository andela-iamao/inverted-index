'use strict';

describe('indexTable', () => {

	beforeEach(module('indexTable'));

	describe('InvertedTableController', () => {
		let ctrl;

		beforeEach(inject(($componentController) => {
			ctrl = $componentController('indexTable');
		}));

    const data = [
      {
        'title' : 'A good bot',
        'text' : 'Give a good bot a penny a day'
      },
      {
        'title' : 'A bad bot',
        'text' : 'Give a bad bot a knock on the head'
      }
    ];
    
    const index = {'give':['A good bot', 'A bad bot'], 
    'a':['A good bot', 'A bad bot'], 
    'good':['A good bot'], 
    'bot':['A good bot', 'A bad bot'], 
    'penny':['A good bot'], 
    'day':['A good bot'], 
    'bad':['A bad bot'], 
    'knock':['A bad bot'], 
    'on' : ['A bad bot'], 
    'the' : ['A bad bot'], 
    'head' : ['A bad bot']}
        
    const fake_data = [
      {
        'title' : 'A good bot',
        'tex' : 'Give a good bot a penny a day'
      }
    ];

    class FakeInvertedIndex {

    }

    describe('Should test for the instance of ctrl.InvertedIndex', () => {
      it('Should return true if ctrl.InvertedIndex is an instance of Object', () => {
        expect(ctrl.InvertedIndex instanceof Object).toBe(true);
      });
      it('Should return false if ctrl.InvertedIndex is not an instance of Array', () => {
        expect(ctrl.InvertedIndex instanceof Array).toBe(false);
      });
      it('Should return true if ctrl.InvertedIndex is an instance of InvertedIndex class', () => {
        expect(ctrl.InvertedIndex instanceof InvertedIndex).toBe(true);
      });
      it('Should return false if ctrl.InvertedIndex is not an instance of FakeInvertedIndex class', () => {
        expect(ctrl.InvertedIndex instanceof FakeInvertedIndex).toBe(false);
      });
    })
    
    describe('Should test for validity of data', () =>{
      it('should return true on valid json data', ()=>{
        expect(ctrl.InvertedIndex.isValid(data)).toBe(true);
      });
      it('should return false on invalid json data', ()=>{
        expect(ctrl.InvertedIndex.isValid(fake_data)).toBe(false);
      });
      it('should return false on false for null', ()=>{
        expect(ctrl.InvertedIndex.isValid(null)).toBe(false);
      });
      it('should return false on empty arguments', ()=>{
        expect(ctrl.InvertedIndex.isValid()).toBe(false);
      });
      it('should return false on  invalid arguments', ()=>{
        expect(ctrl.InvertedIndex.isValid('A json file')).toBe(false);
        expect(ctrl.InvertedIndex.isValid([])).toBe(false);
        expect(ctrl.InvertedIndex.isValid(32323)).toBe(false);
      });
      it('should return false when title or text field is empty', ()=>{
        expect(ctrl.InvertedIndex.isValid([{'title':'Great', 'text':''}])).toBe(false);
        expect(ctrl.InvertedIndex.isValid([{'title':'', 'author':'Scott Fizgerald', 'text':'Gatsby and Daisy'}])).toBe(false);
      }); 
    })
		
    describe('Should generate index from data', ()=> {
      it('should return index from data', ()=>{
        expect(ctrl.InvertedIndex.generateIndex(data)).toEqual(index);
      });
    })
     it('should search the generated index', ()=>{
			expect(ctrl.InvertedIndex.search('bad  good bot    knock', ctrl.InvertedIndex.generateIndex(data))).toEqual({
        'bad' : ['A bad bot'],
        'bot' : ['A good bot', 'A bad bot'],
        'knock' : ['A bad bot'],
        'good' : ['A good bot']
      });


		});
	});
});