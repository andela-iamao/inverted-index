angular.module('indexTable')
  .component('indexTable', {
		templateUrl : 'js/components/index-table/index-table.template.html',
    controller : function InvertedTableController($rootScope, $scope) {
      const self = this;
      
      function onData () {
        $scope.dataset = $rootScope.index_data;
      }

      function setData (){
        self.data = $rootScope.data ? $rootScope.data : null;
      }

      $scope.$on('reload', setData);
      $scope.$on('setdata', onData);
      
    },
		controllerAs : 'index'
	});