const mongoose = require("mongoose");
const config = require("config");

module.exports = function(startupDebugger) {
  mongoose
    .connect(config.get("mongo.connectionString"), config.get("mongo.options"))
    .then(() =>
      startupDebugger(
        `Connected to mongo db [${config.get("mongo.connectionString")}]`
      )
    )
    .catch(ex => console.error(ex.message));
};
