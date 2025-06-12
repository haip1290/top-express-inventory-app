const express = require("express");
const indexRoute = require("./routes/indexRoute");
const app = express();

app.set("view engine", "ejs");

app.use("/", indexRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
