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
        console.log(self.generatedData);
        self.isFound = $rootScope.InvertedIndex.isFound;
        self.titles = $rootScope.InvertedIndex.fetchTitle($rootScope.data[self.filename]);
        self.data = $rootScope.InvertedIndex.search(self.query, $rootScope.InvertedIndex.generateIndex($rootScope.data[self.filename]));
        console.log(self.data);
        console.log(self.titles);
      }

      $scope.$on('search', showSearch);
		},
		controllerAs: 'search'
	});