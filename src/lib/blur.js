(function () {
    var _blur, _isResize, stackBlurImage;

    stackBlurImage = require("./StackBlur");

    window.addEventListener("resize", function (){
        if (_isResize) {
            return "isResizing";
        }

        _isResize = true;
        setTimeout(function () {

            stackBlurImage(_blur, "blur-bg", 40, false );

            _isResize = false;
        }, 100);

    }, false);

    _blur = document.createElement("img");
    _blur.src = "/bg.jpg";

    _blur.addEventListener("load", function () {
        stackBlurImage(_blur, "blur-bg", 40, false );
    }, false);

    module.exports = _blur;
})();