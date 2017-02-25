class InvertedIndex {

	/**
	 * 
	 * 
	 * @param {any} data 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	isValid(data) {
		if(!data) return false;
		if(data.constructor !== Array) return false;
		if(data.length < 1) return false;
		for (let index in data) {
			if (!data[index].title || !data[index].text) {
				return false;
			} else if (data[index].title.constructor !== String || data[index].text.constructor !== String) {
				return false;
			}
		}
		return true;
	}

	/**
	 * 
	 * 
	 * @param {any} data 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	sort(data) {
		let sorted = {};
		Object.keys(data).sort().forEach((key) => {
			sorted[key] = data[key];
		});
		return sorted;
	}

	/**
	 * 
	 * 
	 * @param {any} data 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	generateIndex(data) {
		let index = {};
		let sorted_index = {};
		data.map((book) => {
			let text = book.text.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(" ");
			for (let word in text) {
				if (index[text[word]]) {
					let word_array = index[text[word]];
					if (word_array.indexOf(book.title) === -1 ) {
						word_array.push(book.title);
						index[text[word]] = word_array;
					}
				} else {
					index[text[word]] = [book.title];
				}
			}
		});
		
		sorted_index = this.sort(index);
		return sorted_index;
	}
  
  /**
	 * 
	 * 
	 * @param {any} query 
	 * @param {any} data 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	search(query, data) {
    const words= Object.keys(data)
    const query_array = query.split(" ");
    let result = {};
    let sorted_result = {};
    for (let q in query_array) {
      if (words.indexOf(query_array[q]) !== -1) {
        result[query_array[q]] = data[query_array[q]]
      }
    }
    sorted_result = this.sort(result);
    return sorted_result;
  }

	/**
	 * 
	 * 
	 * @param {any} data 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	fetchTitle(data) {
		let title = data.map((item) => {
			return item.title;
		});
		return title;
	}
  
  /**
	 * 
	 * 
	 * @param {any} x 
	 * @param {any} y 
	 * @returns 
	 * 
	 * @memberOf InvertedIndex
	 */
	isFound(titles, list) {
		return (list.indexOf(titles) === -1) ? false : true;
	}
}