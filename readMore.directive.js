(function() {
	'use strict';
  angular
    .module('demo')
	  .directive('readMore', readMore);

	  function readMore($compile, $filter) {
		var directive = {
			restrict: 'AE',
			scope: {
				text:'@',
				moreText:'@',
				lessText:'@',
				limit : '@',
			},
			link: linkFunc
		};

		return directive;

		function linkFunc(scope, el, attrs) {
			scope.collapsed = true;
			scope.toggle = toggle;
			var limitText = '';
			var originText = '';
			var limit = '';

			main();

			function main() {
				limit = scope.$eval(attrs.limit);
				attrs.$observe('text', function(text) {
					originText = text;
					limitText = $filter('limitTo')(text, limit);
					generate(limitText);
				});
			}

			function generate(text) {
				el.html(text);
				if (originText.length > limit) {
					var toggleButton = $compile('<a href="#" ng-click="toggle()" >&nbsp; {{collapsed ? moreText : lessText }}</a>')(scope);
					el.append(toggleButton);
				}
			}

			function toggle() {
				if (scope.collapsed) {
					generate(originText);
				}
				else {
					generate(limitText);
				}
				scope.collapsed = !scope.collapsed;
			}
		}
	}

})();
