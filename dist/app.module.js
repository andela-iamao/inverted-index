angular.module('invertedIndex', ['indexTable', 'fileUpload', 'fileMenu', 'navBar', 'search']).
  controller('UploadController', ['$rootScope','$scope', ($rootScope, $scope) => {
    $rootScope.generatedIndex = [];

    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        let data = [];

        reader.onload = (() => (event) => {
          try {
            const jsonData = JSON.parse(event.target.result);
            if (jsonData) {
              data = jsonData;
              resolve(data);
            }
          } catch (error) {
            $rootScope.error = { message: 'Invalid JSON File' };
            resolve(false);
          }
        })(file);
        reader.readAsText(file);
      });
    };

    $scope.onUpload = () => {
      const files = document.getElementById('files').files;
      const uploaded = [];
      for (let i = 0; i < files.length; i++) {
        uploaded.push({ name: files[i].name, size: `${files[i].size} bytes`, fulldata: files[i] });
      }
      $rootScope.uploaded_files = uploaded;
      $rootScope.$broadcast('files uploaded');
    };

    $rootScope.InvertedIndex = new InvertedIndex();

    $rootScope.changeInput = (file, fn, callback) => {
      $rootScope.data = {};
      try {
        Object.keys(file).forEach((data) => {
          if ($rootScope.error) {
            callback();
          } else {
          readFile(file[data].fulldata).then((response) => {
            if (response === false) {
              throw TypeError;
            } else {
              $rootScope.data[file[data].name] = response;
              $rootScope.InvertedIndex.generateIndex(file[data].name, response);
              fn('menu view');
            }
          });
          }
        });
      } catch (error) {
        $rootScope.error = { message: 'Invalid JSON File' };
        callback();
      }
    };

    $rootScope.nextView = (view) => {
      $rootScope.view = view;
      $rootScope.$broadcast('change view');
    };
  }]);
