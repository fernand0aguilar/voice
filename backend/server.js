const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./api/config");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to database!"))
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ msg: "Welcome to application." });
});

require("./api/routes/customer.routes")(app);

// set port, listen for requests

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log('app listening on port %s!', PORT);
});

module.exports = app;
