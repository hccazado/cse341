const express = require("express");
const passport = require("passport");
const routes = express.Router();

routes.get("/login", passport.authenticate("github"), (req, res) => {});
routes.get("/logout", (err, req, res, next) => {
    req.logout((err)=>{
        if(err) {
            return next(err);
        }
        res.redirect("/");
    });
});


routes.use("/customers", require("./customers"));
routes.use("/books", require("./books"));
routes.use("/library", require("./library"));

routes.get("/",(req, res)=>{
    // #swagger.ignore = true
    res.send((req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : `Logged out`));
});

module.exports = routes;