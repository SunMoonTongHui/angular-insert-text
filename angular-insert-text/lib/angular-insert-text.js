/**
 * Created by peng on 2015/8/16 0016.
 */

app.directive("spText", function () {
    return {
        require: 'ngModel',
        link: function($scope, $element, $attrs,ngModelController) {
            $scope.$on($attrs.spText, function(e, val) {
                var element = $element[0];
                if (document.selection) {
                    element.focus();
                    var sel = document.selection.createRange();
                    sel.text = val;
                    element.focus();
                } else if (element.selectionStart || element.selectionStart === 0) {
                    var startPos = element.selectionStart;
                    var endPos = element.selectionEnd;
                    var scrollTop = element.scrollTop;
                    element.value = element.value.substring(0, startPos) + val + element.value.substring(endPos, element.value.length);
                    element.focus();
                    element.selectionStart = startPos + val.length;
                    element.selectionEnd = startPos + val.length;
                    element.scrollTop = scrollTop;
                } else {
                    element.value += val;
                    element.focus();
                }
                ngModelController.$setViewValue($element.val());
            });
        }
    }
});
