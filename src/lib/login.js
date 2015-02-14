/**
 * Created by margintan on 15/2/12.
 */
(function (){
    var _login, Ajax;

    Ajax = require("./ajax.js");

    _login = {};

    _login.btn = document.getElementsByClassName("btn")[0];

    _login.error = function () {
        this._userInput.focus();
        this._btn.value = "用户名或者密码错误";
        this._btn.classList.add("btn-error");

        setTimeout(function () {
            _login._btn.classList.remove("btn-error");
            _login._btn.value = "提交";
        },2000);
    };

    _login.init = function () {
        var self = this;

        document.getElementById("login-form").innerHTML = '<form action="/admin" method="post" class="login"> <div class="input-group"> <label for="user-name">U</label> <input type="text" id="user-name" name="user_name" class="input-common" placeholder="sername" /> </div> <div class="input-group"> <label for="user-password">P</label> <input type="password" name="password" id="user-password" class="input-common" placeholder="assword" /> </div> ' +
        '<input type="submit" class="btn"/>' +
        '</form>';

        this._form = document.getElementsByClassName("login")[0];
        this._btn = document.getElementsByClassName("btn")[0];

        this._form.addEventListener("submit", function (e) {
            var _data, _srcElement, _isEmpty;

            e.preventDefault();

            _srcElement = e.srcElement;
            _isEmpty = false;
            self._userInput = _srcElement[0];

            if (!_login.empty(self._userInput.value)) {
                _data = "user_name=" + self._userInput.value + "&" + "password=" + _srcElement[1].value;
                _login.send(_data);
            }else {
                _isEmpty = true;
                notifyInput(self._userInput);

                self._userInput.addEventListener("input", function () {
                    if (!_login.empty(this.value)) {
                        _isEmpty = false;
                    }

                    if (!_isEmpty) {
                        self._userInput.parentNode.classList.remove("input-group-error");
                    }

                }, false);
            }


        }, false);
    };

    _login.send = function (data) {
        Ajax({
            method: "post",
            url: "/admin",
            data: data,
            success: function (data) {
                data = JSON.parse(data);
                if (!data) {
                    _login.error();
                    return;
                }

                window.location.replace(data.url);
            }
        })
    };

    _login.empty = function (string) {
        string = string.replace(/^\s$\s/g, "");

        if (string.length == 0) {
            return true;
        }
    };

    function notifyInput(ele) {
        ele.parentNode.classList.add("input-group-error");
        ele.focus();
    }

    module.exports = _login;
})();