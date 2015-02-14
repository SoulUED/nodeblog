module.exports = {
    page: function (req, res) {
        if (req.cookies.name == "2") {
            res.render("back");
            return;
        }

        res.redirect("/admin");
    }
};