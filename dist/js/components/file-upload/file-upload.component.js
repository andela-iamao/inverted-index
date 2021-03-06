angular.module('fileUpload')
  .component('fileUpload', {
    templateUrl: 'js/components/file-upload/file-upload.template.html',
    controller: function fileUploadController($rootScope, $scope) {
      $scope.uploaded_files = [];

      function fileDetails() {
        $scope.uploaded_files = $rootScope.uploaded_files;
        $scope.$apply();
      }

      $scope.show = true;
      const self = this;

      function isValid(files) {
        const names = files.map((file) => {
          if (file.name.search(/.json/i) === -1) {
            self.error.push({ file: file.name, msg: ' is not a valid json file' });
            return false;
          }
          return true;
        });
        return names.indexOf(false) === -1;
      }

      $scope.check = () => {
        self.error = [];
        if ($scope.uploaded_files.length) {
          try {
            if (!isValid($scope.uploaded_files)) {
              throw TypeError;
            }
            $rootScope.changeInput($scope.uploaded_files, $rootScope.nextView, () => {
              if ($rootScope.error) {
                self.error.push({ message: $rootScope.error.message });
                $scope.$apply();
              }
            });
          } catch (error) {
            $scope.$apply();
          }
        } else {
          self.error.push({ message: 'You must select a json file' });
          $scope.$apply();
        }
      };

      function isView() {
        if ($rootScope.view === 'upload view') {
          $scope.show = true;
        } else {
          $scope.show = false;
        }
      }


      $scope.$on('process', () => {
        self.error = null;
        $scope.processing = true;
        $scope.$apply();
      });
      $scope.$on('files uploaded', fileDetails);
      $scope.$on('change view', isView);
    },
    controllerAs: 'uploadCtrl'
  });
