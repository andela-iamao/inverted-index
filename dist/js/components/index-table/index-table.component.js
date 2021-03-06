angular.module('indexTable')
  .component('indexTable', {
    templateUrl: 'js/components/index-table/index-table.template.html',
    controller: function InvertedTableController($rootScope, $scope) {
      function onData() {
        $scope.dataset = $rootScope.index_data;
      }

      $scope.$on('setdata', onData);
    },
    controllerAs: 'index'
  });
