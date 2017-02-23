angular.module('fileMenu')
	.component('fileMenu', {
		templateUrl : 'js/components/file-menu/file-menu.template.html',
		controller : function fileMenuController ($rootScope, $scope) {
			this.show = false;
			$scope.show_menu = false;
			$scope.uploads = [];
			const self = this;
			function render(data, fn) {
				$scope.uploads = data;
				fn();
			}
			function isView() {
				render($rootScope.uploaded_files, () => {
					if ($rootScope.view === 'menu view') {
						self.show_menu = true;
					} else {
						self.show_menu = false;
					}
					$scope.$apply();
				});
			}

			$scope.$on('change view', isView)
		},
		controllerAs : 'menu'
	})