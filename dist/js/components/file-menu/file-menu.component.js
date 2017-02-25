angular.module('fileMenu')
	.component('fileMenu', {
		templateUrl : 'js/components/file-menu/file-menu.template.html',
		controller : function fileMenuController ($rootScope, $scope) {
			this.show = false;
			$scope.show_menu = false;
			$scope.uploads = [];
			const self = this;
			this.createIndex = (filename) => {
				self.index = {name: filename, data: this.InvertedIndex.generateIndex($rootScope.data[filename]), title:this.InvertedIndex.fetchTitle($rootScope.data[filename]), isFound:this.InvertedIndex.isFound};
				$rootScope.index_data = self.index;
				addIndex(self.index)
				$rootScope.$broadcast('setdata');
			}
			this.InvertedIndex = new InvertedIndex();
			$rootScope.generatedIndex = {};
			function render(data, fn) {
				$scope.uploads = data;
				fn();
			}

			function addIndex(index) {
				const found = $rootScope.generatedIndex.map((data) => {
					if (index.name === data.name) {
						return false;
					}
				})
				if (found.indexOf(false) === -1) {
					$rootScope.generatedIndex.push(index)
				}
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