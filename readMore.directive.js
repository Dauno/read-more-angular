(function() {
	'use strict';
  angular
    .module('demo')
	  .directive('readMore', readMore);

	  function readMore() {
		var directive = {
			restrict: 'AE',
			scope: {
				text:'@',
				moreText:'@',
				lessText:'@',
				limit : '@',
			},
			template: [
				'<span></span>',
				'<a href="#" ng-click="ctrld.toggle()" >',
					'&nbsp; {{ctrld.collapsed ? ctrld.moreText : ctrld.lessText }}',
				'</a>'
			].join(''),
			controller: ControllerD,
			controllerAs: 'ctrld',
			bindToController: true
		};

		return directive;

		ControllerD.$inject = ['$filter', '$element'];

		function ControllerD($filter, $element) {
			var vm = this;
			vm.collapsed = true;
			vm.toggle = toggle;


			main();

			function main() {
				angular.element($element[0].querySelector('span')).html($filter('limitTo')(vm.text, vm.limit));
				if (vm.text.length < vm.limit) {
					angular.element($element[0].querySelector('a')).remove();
				}
			}

			function toggle() {
				if (vm.collapsed) {
					angular.element($element[0].querySelector('span')).html($filter('limitTo')(vm.text, vm.text.length));
				}
				else {
					angular.element($element[0].querySelector('span')).html($filter('limitTo')(vm.text, vm.limit));
				}
				vm.collapsed = !vm.collapsed;
			}
		}
	}

})();
