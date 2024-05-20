const mongoose = require("mongoose");

module.exports = function () {
  const db = process.env.DB_URL;
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.error("Unable to connect to database"));
};
