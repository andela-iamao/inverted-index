class Helpers {
	sort(data) {
		let sorted = {};
		Object.keys(data).sort().forEach((key) => {
			sorted[key] = data[key];
		});
		return sorted;
	}

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

	isFound(x, y) {
   	 if (y.indexOf(x) === -1) {
   	   return 'y';
   	 }
   	 return 'x';
 	 }	
}