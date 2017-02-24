angular.module('fileUpload')
	.component('fileUpload', {
		templateUrl : 'js/components/file-upload/file-upload.template.html',
		controller : function fileUploadController($rootScope, $scope) {
			$scope.uploaded_files = [];
			
			function fileDetails() {
		   		$scope.uploaded_files = $rootScope.uploaded_files;
    			$scope.$apply();
    		}
			
    

			$scope.show = true;
			const self = this;
		
			$scope.check = (nextview) => {
				let next = true;
				self.error = [];
       
        if ($rootScope.error) {
          console.log("Big ass error")
          self.error.push({message : $rootScope.error.msg})
        } else {
          console.log($scope.uploaded_files);
          if ($scope.uploaded_files.length) {
            $scope.uploaded_files.map((file) => {
              if (file.name.search(/.json/i) === -1) {
                next = false;
                self.error.push({file : file.name, msg: ' is not a valid json file'});
              }
            });
            if (next) {
              console.log(next, 'is next');
              $rootScope.changeInput($scope.uploaded_files, $rootScope.nextView, ()=> {
                if ($rootScope.error) {
                  console.log("Big ass error")
                  self.error.push({message : $rootScope.error.message})
                  $scope.$apply();
                }
              });
              
           } else {
              console.log(self.error);
              $scope.$apply();
            }
          } else {
            self.error.push({message: 'You must select a json file'});
            $scope.$apply();
          }
        }
			}
	  	
			function isView() {
				if ($rootScope.view === 'upload view') {
					$scope.show = true;
				} else {
					$scope.show = false;
				}
				$scope.$apply();
	  	}

	  	$scope.$on('files uploaded', fileDetails);
	  	$scope.$on('change view', isView);
		},
	controllerAs : 'uploadCtrl'
})