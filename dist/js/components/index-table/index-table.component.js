angular.module('invertedIndex', ['indexTable']).
    controller('UploadController', ['$rootScope','$scope', ($rootScope, $scope, $state) => {
  
      const readFile = (file) => {
        
        return new Promise((resolve, reject) => {
          const reader = new FileReader(); 
          let data = [];
          reader.onload = ( (theFile) =>{
            return (event) => {
              let json_data = JSON.parse(event.target.result);
              if (json_data) {
                data = json_data;
                resolve(data);
              } else {
                reject(Error('Invalid data'));
              }
            }
          })(file);
          
          reader.readAsText(file);
        });
        
      }
      
      $scope.changeInput = () => {
        const file = document.getElementById('files').files[0];
        readFile(file).then((response) => {
           $rootScope.data = response;
           $rootScope.$broadcast('reload');
        });
      };
}])

angular.module('indexTable')
  .component('indexTable', {
		templateUrl : 'js/components/index-table/index-table.template.html',
    controller : function InvertedTableController($rootScope, $scope) {
      const self = this;
      $scope.generatedIndex = [];
      this.InvertedIndex = new InvertedIndex();
      function setData (){
        self.data = ($rootScope.data) ? $rootScope.data : false; 
        if (self.data) {
          self.title = self.InvertedIndex.fetchTitle(self.data);
          self.genIndex = self.InvertedIndex.generateIndex(self.data);
          $scope.generatedIndex.push(genIndex);
          $scope.$apply();
        }
      }
      
      $scope.$on('reload', setData);
      setData();
      
    },
		controllerAs : 'index'
	});