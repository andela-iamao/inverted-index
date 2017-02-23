angular.module('navBar')
	.component('navBar', {
		templateUrl : 'js/components/nav-bar/nav-bar.template.html',
		controller : function navBarController($scope, $rootScope) {
			const self = this;
			this.showSearch = false;
			this.files;

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