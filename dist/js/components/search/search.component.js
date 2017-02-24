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
      }

      $scope.$on('search', showSearch);
		},
		controllerAs: 'search'
	});