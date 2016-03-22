angular.module('app').value('mToastr', toastr);

angular.module('app').factory('mNotifier', function(mToastr) {
    return {
        notify: function(msg) {
            mToastr.options.positionClass = "toast-top-center";
            mToastr.success(msg);
            console.log(msg);
        },
        error: function(msg) {
            mToastr.options.positionClass = "toast-top-center";
            mToastr.error(msg);
            console.log(msg);
        }
    }
});