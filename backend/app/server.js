const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOption));

const db = require("./app/models");
db.sequelize.sync({force: true}).then(() =>
{
    console.log("Drop and re-sync db.");
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

//simple route
app.get("/", (req,res) => {
    res.json({message: "Welcome"});
});

app.get("/home", (req,res) => {
    res.json({message: "Welcome to home"});
});

require("./app/routes/expense.routes")(app);

// app.post("/homeindex", (req,res) => {
//     res.json({message: req});
// });

const PORT = process.env.port || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});
