var _count = "admin",
    _password = "adminsb";

module.exports = {
    admin: function(req, res) {
        if (req.cookies.name == "2") {
            res.redirect("/back");
            return;
        }
        res.render("admin");
    },
    login: function (req, res) {
        var _body;

        _body = req.body;
        if (_body.user_name == _count && _body.password == _password) {
            res.cookie("name","2");
            res.send({
                url: "/back"
            });
        }else{
            res.send(false);
        }
    }
};