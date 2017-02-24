angular.module('invertedIndex', ['indexTable', 'fileUpload', 'fileMenu', 'navBar', 'search']).
  controller('UploadController', ['$rootScope','$scope', ($rootScope, $scope, $state) => {
    const readFile = (file) => {

      return new Promise((resolve, reject) => {

        const reader = new FileReader(); 
        let data = [];

        reader.onload = ((theFile) =>{
          return (event) => {
            try {
              let json_data = JSON.parse(event.target.result);
              if (json_data) {
                data = json_data;
                resolve(data);
              }
            } catch (error){
              resolve(false);
            }
          }
        })(file);
        
          reader.readAsText(file); 
        
      });
    }

    const checkUpload = (event) => {
      console.log('fileuploaded', event);
    }
    
    $scope.onUpload = () => {
        const files = document.getElementById('files').files;
        let uploaded = [];
        for (let i = 0; i < files.length; i++) {
          uploaded.push({ 'name': files[i].name, 'size': files[i].size + ' bytes', 'fulldata': files[i]})
        }
        $rootScope.uploaded_files = uploaded;
        $rootScope.$broadcast('files uploaded');
        //$scope.changeInput(files);
    }

    $rootScope.changeInput = (file, fn, callback) => {
      //const file = document.getElementById('files').files[0];
      $rootScope.data = [];
      Object.keys(file).map((data) => {
        console.log(file[data].fulldata)
        readFile(file[data].fulldata).then((response, error) => {
          //console.log(error);
          console.log(response);
          if(!response) {
            console.log('error')
            $rootScope.error = {message : 'Invalid JSON File'};
            callback();
          } else {
            $rootScope.data.push(response);
            fn('menu view');    
          }
          
          //console.log($rootScope.data);
                   
        })
      })
      
      //$rootScope.$broadcast('reload');
    };

    $rootScope.nextView = (view) => {
      $rootScope.view = view;
      $rootScope.$broadcast('change view');
    }
}]);