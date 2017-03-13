angular.module('navBar')
  .component('navBar', {
    templateUrl: 'js/components/nav-bar/nav-bar.template.html',
    controller: function navBarController($scope, $rootScope) {
      const self = this;
      this.showSearch = false;
      this.files = [];
      this.query = '';
      /**
       * Pass user's query and file name to $rootScope.search_query,
       * broadcast appropriate message and open search modal
       * 
       * @param {String} filename
       * @returns 
       */
      this.openModal = (filename) => {
        const query = self.query;
        if (query === '') {
          return null;
        }
        $rootScope.search_query = { query, filename };
        (filename === 'all') ? $rootScope.$broadcast('search all') : $rootScope.$broadcast('search');
        $('#myModal').modal('show');
      };

      this.goBack = () => {
        $rootScope.view = 'upload view';
        $rootScope.$broadcast('change view');
      }

      $scope.$on('change view', () => {
        if ($rootScope.view !== 'upload view') {
          self.showSearch = true;
          self.showBack = true;
          self.files = $rootScope.uploaded_files;
          $scope.$apply();
        } else {
          self.showSearch = false;
          self.showBack = false;
        }
      });
    },
    controllerAs: 'navbar'
  });
