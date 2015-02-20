var express, app, server, path, bodyParser,cookieParser,urlencodedParser, adminLogin, back, article;

express = require("express");
bodyParser = require("body-parser");
cookieParser = require("cookie-parser");
path = require("path");
app = express();

adminLogin = require("./controller/admin");
back = require("./controller/back");
article = require("./controller/article");

app.set("views", './views');
app.set("view engine", "jade");

app.use(
    cookieParser()
);

app.use(
    express.static(
        path.join(__dirname + "/css")
    )
);
app.use(
    express.static(
        path.join(__dirname + "/img")
    )
);
app.use(
    express.static(
        path.join(__dirname + "/js")
    )
);

urlencodedParser = bodyParser.urlencoded({ extended: false });

app.route("/admin").get(adminLogin.admin).post(urlencodedParser, adminLogin.login);
app.route("/back").get(back.page);
app.route("/article").post(urlencodedParser, article.newArticle);

server = app.listen(3000);