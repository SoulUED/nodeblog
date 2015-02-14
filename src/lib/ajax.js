/**
 * Created by margintan on 15/2/13.
 */
(function () {
    var Ajax = (function () {
        var _ajax = new XMLHttpRequest();

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

        return function (obj) {

            obj.method = obj.method.toLocaleUpperCase();

            _ajax.open(obj.method, obj.url, isNaN(obj.async));
            obj.data && ((obj.method === "GET" && _get(obj)) || (obj.method === "POST" && _post(obj)));

            _ajax.addEventListener("readystatechange", function () {
                if (_ajax.readyState == 4 && _ajax.status == 200) {
                    obj.success(_ajax.responseText);
                }
            }, false);
        }
    })();

    module.exports = Ajax;
})();