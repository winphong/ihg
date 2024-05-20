require("express-async-errors");
const config = require("config");
const express = require("express");
const app = express();
const path = require("path");

require("./startup/cors")(app);
require("./startup/db")();
require("./startup/routes")(app);

app.use(express.static(path.join(__dirname, "frontend", "public")));

const port = process.env.PORT || 3000;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "public", "index.html"));
});

const server = app.listen(port, () => {
  // winston.info(`Listening on port ${port}...`);
  console.log(`Listening on port ${port}...`);
});
module.exports = server;
