const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const cron = require("node-cron");
const errorController = require("./core/middlewares/errorController");
const AppError = require("./core/utils/AppError");
const clientRouter = require("./modules/client/clientRouter");
const adminRouter = require("./modules/admin/adminRouter");
const jwt = require('jsonwebtoken');


// const pageRouter = require("./modules/page/pageRouter");
// const faqRouter = require("./modules/faq/faqRouter");
// const statisticsRouter = require("./modules/statistics/statisticsRouter");
// const regionalOfficesRouter = require("./modules/regional-offices/regionalOfficesRouter");
// const metaInfoRouter = require("./modules/meta-info/metaInfoRouter");
const pressCenterRouter = require("./modules/press-center/pressCenterRouter");
// const pollsRouter = require("./modules/polls/pollsRouter");

// const usefulLinksRouter = require("./modules/useful-links/usefulLinksRouter");
// const blanksRouter = require("./modules/blanks/blanksRouter");
// const subscribersRouter = require("./modules/subscribers/subscribersRouter");
// const leadershipRouter = require("./modules/leadership/leadershipRouter");
// const galleryItemRouter = require("./modules/gallery-item/galleryItemRouter");
// const openDataRouter = require("./modules/open-data/openDataRouter");

const tempFileCleaner = require("./core/middlewares/tempFileCleaner");
const authRouter = require("./modules/login/authRouter");

cron.schedule("0 07 11 * * *", () => {
  tempFileCleaner();
});

const app = express();
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/static"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(flash());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      // secure: true
    },
  })
);


app.use(function (req, res, next) {
    const err = req.session.error;
    const msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = "";
    if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
    if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
    next();
});



app.use("/login", authRouter);
app.use("/admin", adminRouter);
app.use("/:lang", clientRouter);

// app.use("/:lang/press-center", pressCenterRouter);
// app.use("/:lang/page", pageRouter);
// app.use("/:lang/faq", faqRouter);
// app.use("/:lang/statistics", statisticsRouter);
// app.use("/:lang/regional-offices", regionalOfficesRouter);
// app.use("/:lang/meta-info", metaInfoRouter);
// app.use("/:lang/polls", pollsRouter);
// app.use("/:lang/attachments", attachmentRouter);
// app.use("/:lang/admin/useful-links", usefulLinksRouter);
// app.use("/:lang/blanks", blanksRouter);
// app.use("/:lang/subscribers", subscribersRouter);
// app.use("/:lang/leaderships", leadershipRouter);
// app.use("/:lang/gallery-item", galleryItemRouter);
// app.use("/:lang/open-data", openDataRouter);

app.get("/", (req, res) => {
  res.redirect("/uz");
});

app.all("*", (req, res, next) => {
  res.redirect("/");
});

app.use(errorController);
module.exports = app;
