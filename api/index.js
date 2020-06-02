require("dotenv").config();
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const PORT = process.env.API_PORT;

// MongoDB Connection
const connection = require("./db/connection");
const MONGO_URI =
    process.env.NODE_ENV === "production"
        ? process.env.MONGO_PRODUCTION
        : process.env.MONGO_DEV;
connection(MONGO_URI);

const localStrategy = require("./passport/localStrategy");
let indexRouter = require('./routes/index.js');

app.use(express.json({limit: '50mb'}))
app.use(
    bodyParser.urlencoded({
        extended: false,
        limit: '50mb' 
    })
);
app.use(bodyParser.json());

app.use(cors());

passport.use("local-login", localStrategy);

app.use(express.static(path.join(__dirname, '../build')));
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')))

app.use('/api', indexRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
}); 


server.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
