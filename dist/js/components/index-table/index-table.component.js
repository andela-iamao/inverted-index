angular.module('indexTable')
  .component('indexTable', {
		templateUrl : 'js/components/index-table/index-table.template.html',
    controller : function InvertedTableController($rootScope, $scope) {
      const self = this;
      $scope.generatedIndex = [];
      
      this.InvertedIndex = new InvertedIndex();
      function setData (){
        self.data = ($rootScope.data) ? $rootScope.data : false; 
        if (self.data) {
          self.title = self.InvertedIndex.fetchTitle(self.data);
          self.genIndex = self.InvertedIndex.generateIndex(self.data);
          $scope.generatedIndex.push(genIndex);
          $scope.$apply();
        }
      }

      $scope.$on('reload', setData);
      setData();
      
    },
		controllerAs : 'index'
	});