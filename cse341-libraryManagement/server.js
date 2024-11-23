const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./models");
const dotEnv = require("dotenv");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

dotEnv.config();

app.use(bodyParser.json());
//Basic express-session initialization

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));
//init passport on every route call
app.use(passport.initialize());
//allowing passport to use session
app.use(passport.session());

db.mongoose.connect(db.url).then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.error("Cannot connect to MongoDB"+error);
});

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*",);
    res.setHeader("Access-COntrol-Allow-Headers", 
        "Origin, X-requested-With, Content-Type, Accept, Z-Key, Authorization");
    res.setHeader("Access-Control-Allow-Methods", 
        "POST, GET, PUT, PATCH, OPTIONS DELETE");
    next();
});

app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

app.use("/github/callback", passport.authenticate("github",{
    failureRedirect: "/api-docs", session: false }),
    (req, res)=>{
        req.session.user = req.user;
        res.redirect("/");
    })
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", require("./routes"));


process.on("uncaughtException", (error, origin)=>{
    console.log(`caught exception: ${error}\nException origin: ${origin}`);
});


const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log("App listening on PORT: "+PORT);
})

