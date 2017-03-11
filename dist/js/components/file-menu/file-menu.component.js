angular.module('fileMenu')
  .component('fileMenu', {
    templateUrl: 'js/components/file-menu/file-menu.template.html',
    controller: function fileMenuController($rootScope, $scope) {
      this.show = false;
      $scope.show_menu = false;
      $scope.uploads = [];
      const self = this;

      /**
       * set this.index to true, pass an object with details of file
       * into $rootScope.index_data, then broadcast a message
       * 
       * @param {String} filename 
       * @returns{undefined}
       */
      this.createIndex = (filename) => {
        self.index = true;
        $rootScope.index_data = { name: filename,
          data: $rootScope.InvertedIndex.indices[filename],
          title: this.fetchTitle($rootScope.data[filename]),
          isFound: this.isFound };
        $rootScope.$broadcast('setdata');
      };

      this.fetchTitle = $rootScope.InvertedIndex.fetchTitle;
      this.isFound = $rootScope.InvertedIndex.isFound;

      /**
       * set $scope.uploads to a value and execute a function
       * 
       * @param {Array} data - value to pass into $scope.uploads
       * @param {Function} callback - function to execute after updating
       * $scope.uploads
       * @returns {undefined}
       */
      function render(data, callback) {
        $scope.uploads = data;
        callback();
      }

      $scope.$on('change view', () => {
        render($rootScope.uploaded_files, () => {
          if ($rootScope.view === 'menu view') {
            self.show_menu = true;
            $scope.$apply();
          } else {
            self.show_menu = false;
          }
        });
      });
    },
    controllerAs: 'menu'
  });
