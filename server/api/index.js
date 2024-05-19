require("express-async-errors");
const express = require("express");

const app = express();

require("../startup/cors")(app);
require("../startup/db")();
require("../startup/routes")(app);

module.exports = app;
