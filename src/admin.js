(function (){
    var login, blur;

    login = require("./lib/login");
    blur = require("./lib/blur");

    blur.addEventListener("load", function () {
        login.init();
    }, false);
})();