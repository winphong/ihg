require("express-async-errors");
const config = require("config");
const express = require("express");
const app = express();
const path = require("path");

require("./startup/db")();
require("./startup/cors")(app);
require("./startup/routes")(app);

app.use(express.static(path.join(__dirname, "images")));

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  // winston.info(`Listening on port ${port}...`);
  console.log(`Listening on port ${port}...`);
});
module.exports = server;
