angular.module('app').factory('mCookies', function() {
    return {
        create:function(key, value) {
            Cookies.set(key, value, { expires: 365 });
        },
        update:function(key, value) {
            Cookies.set(key, value, { expires: 365 });
        },
        insert:function(key, value) {
            var cookie = Cookies.get(key);
            Cookies.set(key, cookie + ',' + value);
        },
        insertJSON:function(key, value) {
            var string = value.join(", ");
            var cookie = Cookies.get(key);
            Cookies.set(key, cookie + ", " + string);
        },
        remove:function(key, value) {
            var cookie = Cookies.get(key);
            cookie = cookie.replace(value, '');
            Cookies.set(key, cookie);
        },
        createJSON:function(key, value) {
            //var json = JSON.stringify(value);
            var string = value.join(", ");
            Cookies.set(key, string, { expires: 365 });
        },
        read: function(key) {
            return Cookies.get(key);
        },
        readJSON: function(key) {
            var json = Cookies.getJSON(key);
            return json.split(",");
        },
        delete: function(key) {
            Cookies.remove(key);
        },
        resetAll: function() {
            Cookies.remove('prefs');
            Cookies.remove('suggestions');
            Cookies.remove('breakfast');
            Cookies.remove('lunch');
            Cookies.remove('dinner');
            Cookies.remove('snacks');
            Cookies.remove('easy');
            Cookies.remove('medium');
            Cookies.remove('hard');
            Cookies.remove('omitted');
            Cookies.remove('hasequipment');
        }
    }
});
