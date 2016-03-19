angular.module('app').factory('mCookies', function() {
    return {
        create:function(key, value) {
            Cookies.set(key, value, { expires: 365 }, { path: '' });
        },
        read: function(key) {
            return Cookies.get(key);
        },
        readJSON: function(key) {
            return Cookies.getJSON(key);
        },
        remove: function(key) {
            Cookies.remove(key);
        }
    }
});
