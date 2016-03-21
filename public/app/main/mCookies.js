angular.module('app').factory('mCookies', function() {
    return {
        create:function(key, value) {
            Cookies.set(key, value, { expires: 365 }, { path: '' });
        },
        createJSON:function(key, value) {
            var json = JSON.stringify(value);
            Cookies.set(key,value , { expires: 365 }, { path: '' });
        },
        read: function(key) {
            return Cookies.get(key);
        },
        readJSON: function(key) {
            var json = Cookies.getJSON(key);
            return JSON.parse(json);
        },
        remove: function(key) {
            Cookies.remove(key);
        }
    }
});
