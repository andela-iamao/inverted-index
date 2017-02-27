angular.module('indexTable')
  .component('indexTable', {
		templateUrl : 'js/components/index-table/index-table.template.html',
    controller : function InvertedTableController($rootScope, $scope) {
      const self = this;
      $scope.generatedIndex = [];
      
      function onData () {
        $scope.dataset = $rootScope.index_data;
      }

      //this.InvertedIndex = new InvertedIndex();
      function setData (){
        self.data = $rootScope.data ? $rootScope.data : null; 
        // if (self.data) {
        //   self.title = self.InvertedIndex.fetchTitle(self.data);
        //   self.genIndex = self.InvertedIndex.generateIndex(self.data);
        //   $scope.generatedIndex.push(genIndex);
        //   $scope.$apply();
        // }
      }

      $scope.$on('reload', setData);
      $scope.$on('setdata', onData);
      setData();
      
    },
		controllerAs : 'index'
	});