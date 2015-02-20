/**
 * Created by margintan on 15/2/13.
 */
(function () {
    module.exports = (function () {
        var _ajax = new XMLHttpRequest(),
            _callBack = {};

        function _get(obj) {

            obj.url = obj.url + "?" + obj.data;
            _ajax.send();

            return true;
        }

        function _post(obj) {

            _ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            _ajax.send(obj.data);

            return true;
        }

        _ajax.addEventListener("readystatechange", function () {
            if (_ajax.readyState == 4 && _ajax.status == 200) {
                _callBack.success && _callBack.success(_ajax.responseText);
            }
        }, false);

        return function (obj) {
            obj.method = obj.method.toLocaleUpperCase();
            _ajax.open(obj.method, obj.url, isNaN(obj.async));
            obj.data && ((obj.method === "GET" && _get(obj)) || (obj.method === "POST" && _post(obj)));
            _callBack.success = obj.success;
            _callBack.error = obj.error;
        };
    })();

})();