angular.module('search')
	.component('search', {
		templateUrl: 'js/components/search/search.template.html',
		controller: function SearchController($scope, $rootScope) {
      const self = this;
      this.query = '';
      this.filename = '';
      function showSearch() { 
        self.all = false;
        self.query = $rootScope.search_query.query;
        self.filename = $rootScope.search_query.file;
        self.isFound = $rootScope.InvertedIndex.isFound;
        self.titles = $rootScope.InvertedIndex.fetchTitle($rootScope.data[self.filename]);
        self.data = $rootScope.InvertedIndex.search(self.query, self.filename);
      }

      function showAllResult() {
        self.all = true;
        self.titles_all = {};
        $rootScope.uploaded_files.forEach((data) => {
          self.titles_all[data.name] = $rootScope.InvertedIndex.fetchTitle($rootScope.data[data.name]);
        });
        self.isFound = $rootScope.InvertedIndex.isFound;
        self.query = $rootScope.search_query.query;
        self.filename = $rootScope.search_query.file;
        self.all_search = $rootScope.InvertedIndex.searchAll(self.query);
      }
          
      $scope.$on('search all', showAllResult);
      $scope.$on('search', showSearch);
		},
		controllerAs: 'search'
	});