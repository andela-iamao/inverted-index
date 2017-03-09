angular.module('invertedIndex', ['indexTable', 'fileUpload', 'fileMenu', 'navBar', 'search'])
  .controller('UploadController', ['$rootScope', '$scope', ($rootScope, $scope) => {
    $rootScope.generatedIndex = [];

    const readFile = (file) => {
      return new Promise((resolve) => {
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
            $rootScope.error = { message: `${file.name} is an invalid JSON File` };
            resolve(false);
          }
        })(file);
        reader.readAsText(file);
      });
    };

    $scope.onUpload = () => {
      $rootScope.error = null;
      const files = document.getElementById('files').files;
      const uploaded = [];
      for (let i = 0; i < files.length; i += 1) {
        uploaded.push({ name: files[i].name, size: `${files[i].size} bytes`, fulldata: files[i] });
      }
      $rootScope.uploaded_files = uploaded;
      $rootScope.$broadcast('files uploaded');
    };

    $rootScope.InvertedIndex = new InvertedIndex();

    $rootScope.changeInput = (file, fn, callback) => {
      $rootScope.data = {};
      Object.keys(file).forEach((data) => {
        if ($rootScope.error) {
          callback();
        } else {
          readFile(file[data].fulldata).then((response) => {
            try {
              if ($rootScope.error) {
                throw TypeError;
              } else {
                $rootScope.data[file[data].name] = response;
                $rootScope.InvertedIndex.generateIndex(file[data].name, response);
                fn('menu view');
              }
            } catch (error) {
              if (!response) {
                callback();
              }
            }
          });
        }
      });
    };

    $rootScope.nextView = (view) => {
      $rootScope.view = view;
      $rootScope.$broadcast('change view');
    };
  }]);
