(function () {
    var dateTimePicker = function ($timeout, $parse) {
        return {
            require: '?ngModel',
            restrict: 'AE',
            link: function (scope, elem, attrs) {
              return $timeout(function() {
                var ngModelGetter = $parse(attrs['ngModel']);
                
                var format = attrs.format || 'DD/MM/YYYY h:mm a';
                
                return $(elem).datetimepicker({
                  locale: 'es',
                  format: format,
                }).on('dp.change', function(event) {
                  scope.$apply(function() {
                    return ngModelGetter.assign(scope, event.target.value);
                  });
                });
              });
            }
        };
    }

    angular.module('todoApp').directive('dateTimePicker', dateTimePicker);
})();
