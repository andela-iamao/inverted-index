angular.module('search')
	.component('search', {
		templateUrl: 'js/components/search/search.template.html',
		controller: function SearchController($scope, $rootScope) {
      this.query = '';
      this.filename = '';
      const self = this;
      function showSearch() { 
        self.query = $rootScope.search_query.query;
        self.filename = $rootScope.search_query.file;
        self.generatedData = $rootScope.generatedIndex;
        self.isFound = $rootScope.InvertedIndex.isFound;
        self.titles = $rootScope.InvertedIndex.fetchTitle($rootScope.data[self.filename]);
        self.data = $rootScope.InvertedIndex.search(self.query, $rootScope.InvertedIndex.generateIndex($rootScope.data[self.filename]));
        console.log(self.data);
        console.log(self.titles);
      }

      function showAllResult() {
        self.all = true;
        console.log('searching all');
//        const SARInvertedIndex = new $rootScope.InvertedIndex();
        const arg = [];
        const titles = {};
        $rootScope.uploaded_files.forEach((data) => {
          const file = $rootScope.data[data.name];
          arg.push({name: data.name, data: $rootScope.InvertedIndex.generateIndex(file)});
//          self.titles_all = $rootScope.InvertedIndex.fetchTitle($rootScope.data[self.filename]);
//          titles.push({name: data.name, titles: $rootScope.InvertedIndex.fetchTitle($rootScope.data[data.name])});
//          arg[data.name] = $rootScope.InvertedIndex.generateIndex(file);
          titles[data.name] = $rootScope.InvertedIndex.fetchTitle($rootScope.data[data.name]);
        });
        console.log(titles);
        self.titles_all = titles;
        self.isFound = $rootScope.InvertedIndex.isFound;
        self.query = $rootScope.search_query.query;
        self.filename = $rootScope.search_query.file;
        
        self.all_search = $rootScope.InvertedIndex.searchAll($rootScope.search_query.query, arg);
        console.log(self.all_search);
      }
          
      $scope.$on('search all', showAllResult);
      $scope.$on('search', showSearch);
		},
		controllerAs: 'search'
	});