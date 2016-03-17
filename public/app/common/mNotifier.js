angular.module('app').value('mToastr', toastr);

angular.module('app').factory('mNotifier', function(mToastr) {
    return {
        notify: function(msg) {
            mToastr.success(msg);
            console.log(msg);
        }
    }
});