angular.module('fileMenu')
	.component('fileMenu', {
		templateUrl : 'js/components/file-menu/file-menu.template.html',
		controller : function fileMenuController ($rootScope, $scope) {
			this.show = false;
			$scope.show_menu = false;
			$scope.uploads = [];
			const self = this;
			this.createIndex = (filename) => {
				self.index = true;
				$rootScope.index_data = {name: filename, data: $rootScope.InvertedIndex.indices[filename], title:this.fetchTitle($rootScope.data[filename]), isFound:this.isFound};
				$rootScope.$broadcast('setdata');
			}

			//this.isValid = $rootScope.InvertedIndex.isValid;
      this.fetchTitle = $rootScope.InvertedIndex.fetchTitle;
      this.isFound = $rootScope.InvertedIndex.isFound;
			$rootScope.generatedIndex = {};
			function render(data, fn) {
				$scope.uploads = data;
				fn();
			}

      function searchData() {
        self.result = self.InvertedIndex.search($rootScope.query, $rootScope.filename);
        $scope.$apply();
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

      $scope.$on('earch', searchData);
			$scope.$on('change view', isView);
		},
		controllerAs : 'menu'
	})