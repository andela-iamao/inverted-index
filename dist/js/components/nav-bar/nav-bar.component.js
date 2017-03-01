angular.module('navBar')
	.component('navBar', {
		templateUrl : 'js/components/nav-bar/nav-bar.template.html',
		controller : function navBarController($scope, $rootScope) {
			const self = this;
			this.showSearch = false;
			this.files;
			this.query = '';
			this.openModal = (file) => {
				let query = self.query;
				console.log("The file is ", self.files)
                console.log($rootScope.uploaded_files);
				$rootScope.search_query = {query, file}
                if (file === 'all') {
                  $rootScope.$broadcast('search all');
                } else {
                  $rootScope.$broadcast('search');
                }
//				(file === 'all') ? $rootScope.$broadcast('search all') : $rootScope.$broadcast('search');
				$('#myModal').modal('show');
			}

			function isView() {
				if ($rootScope.view !== 'upload view') {
					self.showSearch = true;
					console.log($rootScope.uploaded_files);
					self.files = $rootScope.uploaded_files;
				}
				$scope.$apply();
			}
			$scope.$on('change view', isView)
		},
		controllerAs : 'navbar'
	});