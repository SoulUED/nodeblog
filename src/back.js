(function (){
    var _blur, Vue,container, Cli, textInput, Edit, Ajax, currentFocusDom;

    _blur = require("./lib/blur");
    Vue = require("./lib/vue.min");
    Ajax = require("./lib/ajax");

    container = document.getElementById("container");

    _blur.addEventListener("load", function () {
        container.style.display = "block";
        setTimeout(function () {
            textInput.dom.focus();
            currentFocusDom = textInput.dom;
        });
    }, false);

    document.documentElement.addEventListener("click", function (e) {
        if (e.srcElement != currentFocusDom) {
            currentFocusDom.focus();
        }
    }, false);

    textInput = {
        dom: document.getElementById("text-input"),
        getCli: function (e) {
            if (e.keyCode == 13) {
                textInput.verifyCli(Cli.$data.currentCli);
                return;
            }

            Cli.$data.currentCli = this.value;
            return this;
        },
        lsCli: function () {
            Cli.$data.historyResult.push({
                inputCli: "ls",
                content: [{
                    title: "1",
                    author: "2",
                    time: "2012-2-2"
                },
                    {
                        title: "1",
                        author: "2",
                        time: "2012-2-2"
                    }
                ]
            });
            return this;
        },
        errorCli: function (cli, text) {
            Cli.$data.historyResult.push({
                inputCli: cli,
                content: [{
                    title: text
                }],
                isError: true
            });
            return this;
        },
        wCli: function () {
            Edit.postInf();
            return this;
        },
        clearCli: function () {
            Cli.$data.historyResult = [];
            return this;
        },
        newArticle: function () {
            this.disableInput();
            Edit.init();
            return this;
        },
        editCli: function () {
            this.clearInputText().disableInput();
            Edit.recoverEdit().dom.focus();
            return this;
        },
        verifyCli: function (cli) {
            this.clearInputText();

           /* if (Cli.$data.isEdit == true) {
                if (cli != ":w" || cli!= "edit") {
                    this.errorCli(cli, "the cli is error , please inputting  a give up cli or save cli !");
                    return;
                }
            }*/
            switch (cli) {
                case  "ls":
                    this.lsCli(cli);
                    break;
                case "clear":
                    this.clearCli();
                    break;
                case "new Article":
                    this.newArticle();
                    break;
                case ":w":
                    if (Cli.$data.isEdit) {
                        this.wCli();
                        break;
                    }
                case "edit":
                    if (Cli.$data.isEdit) {
                        this.editCli();
                        break
                    }
                default:
                    this.errorCli(cli, "the cli errors, please check it ! ");
            }
            return this;
        },
        clearInputText: function () {
            Cli.$data.currentCli = this.dom.value = "";
            return this;
        },
        disableInput: function () {
            this.dom.disabled = true;
            return this;
        },
        recoverInput: function () {
            this.dom.disabled = false;
            return this;
        },
        focusInput: function () {
            this.dom.focus();
            return this;
        }
    };

    Vue.directive("contenteditable", {
        twoWay: true,
        bind: function () {
            this.handle = function () {
                this.set(this.el.innerText)
            }.bind(this);

            this.el.addEventListener("input", this.handle);
        },
        unbind: function () {
            this.el.removeEventListener("input", this.handle);
        }
    });

    Edit = {
        init: function () {
            var _date, _this;
            _date = new Date();
            _this = this;
            this._time  = _date.getDate() + "," + (_date.getMonth() + 1) + "," + _date.getFullYear();

            Cli.$data.editInit = Cli.$data.editInit + "," + _date.getSeconds() + "," + this._time;
            Cli.$data.isEdit = true;

            Vue.nextTick(function () {
                _this.dom = document.getElementById("edit");
                _this.dom.focus();
            });

            return this;
        },
        disabledEdit: function () {
            this.dom.setAttribute("contenteditable", false);
            return this;
        },
        recoverEdit: function () {
            this.dom.setAttribute("contenteditable", true);
            return this;
        },
        exitEdit: function (e) {
            if (e.keyCode == 27) {
                Edit.getTitle();
                textInput.recoverInput();
                textInput.focusInput();
                currentFocusDom = textInput.dom;
            }
            return this;
        },
        getTitle: function () {
            var _text,
                _title;

            _text = Cli.$data.editContent;
            _title = _text.match(/.*/)[0];
            _text = _text.replace(_title, "").replace(/(^\s*)|(\s*$)/g,"");

            this.sendTitle = _title;
            this.sendContent = _text;

            return this;
        },
        postInf: function () {
            Ajax({
                method: "post",
                url: "/article",
                data: "title=" + Edit.sendTitle + "&content=" + Edit.sendContent,
                success: function (data) {
                    Cli.$data.historyResult.push({
                        inputCli: ":w",
                        content: [{
                            title: "new Article success"
                        }],
                        isSuccess: true
                    });
                    Edit.recoverInit();
                }
            });
            return this;
        },
        recoverInit: function () {
            Cli.$data.isEdit = false;
            Cli.$data.editInit = "";
        }
    };

    Cli = new Vue({
        el: "#container",
        data: {
            historyResult: [],
            isEdit: false,
            editInit: "Author: SoulUED, at ",
            editContent: ""
        },
        methods: {
            addKeyUp: function () {
                textInput.dom.addEventListener("keyup", textInput.getCli, false);
            },
            removeKeyUp: function () {
                textInput.dom.removeEventListener("keyup", textInput.getCli, false);
            },
            addEscEvent: function (e) {
                textInput.disableInput();
                e.srcElement.addEventListener("keyup", Edit.exitEdit, false);
            },
            removeEscEvent: function (e) {
                e.srcElement.removeEventListener("keyup", Edit.exitEdit, false);
            }
        }
    })
})();