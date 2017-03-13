angular.module('indexTable')
  .component('indexTable', {
    templateUrl: 'js/components/index-table/index-table.template.html',
    controller: ($rootScope, $scope) => {
      $scope.$on('setdata', () => {
        $scope.dataset = $rootScope.index_data;
      });
    },
    controllerAs: 'index'
  });
