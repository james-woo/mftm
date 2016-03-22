angular.module('app').factory('mCookies', function() {
    return {
        create:function(key, value) {
            Cookies.set(key, value, { expires: 365 }, { path: '' });
        },
        update:function(key, value) {
            Cookies.set(key, value, { expires: 365 }, { path: '' });
        },
        insert:function(key, value) {
            var cookie = Cookies.get(key);
            Cookies.set(key, cookie + value);
        },
        remove:function(key, value) {
            var cookie = Cookies.get(key);
            cookie = cookie.replace(value, '');
            Cookies.set(key, cookie);
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
        delete: function(key) {
            Cookies.remove(key);
        }
    }
});
