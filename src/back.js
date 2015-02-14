(function (){
    var _blur, Vue,container, Cli, textInput;

    _blur = require("./lib/blur");
    Vue = require("./lib/vue.min");

    container = document.getElementById("container");

    _blur.addEventListener("load", function () {
        container.style.display = "block";
        textInput.dom.focus();
    }, false);

    textInput = {
        dom: document.getElementById("text-input"),
        getCli: function (e) {
            if (e.keyCode == 13) {
                textInput.verifyCli(Cli.$data.currentCli);
                return;
            }

            Cli.$data.currentCli = this.value;
        },
        verifyCli: function (cli) {
            this.clearInputText();

            switch (cli) {
                case  "ls":
                    Cli.$data.historyResult.push({
                        inputCli: cli,
                        content: ["success", "success"],
                        isError: false
                    });
                    break;
                default:
                    Cli.$data.historyResult.push({
                        inputCli: cli,
                        content: ["the cli errors, please check it ! "],
                        isError: true
                    });
            }
        },
        clearInputText: function () {
            Cli.$data.currentCli = this.dom.value = "";
        }
    };

    Cli = new Vue({
        el: "#container",
        data: {
            historyResult: []
        },
        methods: {
            addKeyUp: function () {
                textInput.dom.addEventListener("keyup", textInput.getCli, false);
            },
            removeKeyUp: function () {
                textInput.dom.addEventListener("keyup",  textInput.getCli, false);
            }
        }
    });

})();