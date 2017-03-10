angular.module('navBar')
  .component('navBar', {
    templateUrl: 'js/components/nav-bar/nav-bar.template.html',
    controller: function navBarController($scope, $rootScope) {
      const self = this;
      this.showSearch = false;
      this.files = [];
      this.query = '';
      this.openModal = (file) => {
        const query = self.query;
        if (query === '') {
          return null;
        }
        $rootScope.search_query = { query, file };
        (file === 'all') ? $rootScope.$broadcast('search all') : $rootScope.$broadcast('search');
        if (query.length === 0) {
          self.error = { message: 'Your search was empty' };
        } else {
          $('#myModal').modal('show');
        }
      };

      function isView() {
        if ($rootScope.view !== 'upload view') {
          self.showSearch = true;
          self.showBack = true;
          self.files = $rootScope.uploaded_files;
        }
        $scope.$apply();
      }
      $scope.$on('change view', isView);
    },
    controllerAs: 'navbar'
  });
