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
				if ($scope.uploaded_files.length) {
					$scope.uploaded_files.map((file) => {
						if (file.name.search(/.json/i) === -1) {
							next = false;
							self.error.push({file : file.name, msg: ' is not a valid json file'});
						}
					});
					if (next) {
						$rootScope.nextView(nextview);
					} else {
						console.log(self.error);
						$scope.$apply();
					}
				}
			}
	  	
			function isView() {
				console.log('changing view');
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