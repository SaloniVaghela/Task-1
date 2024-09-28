const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

const indexRoutes = require("./routes/index");

app.set("view engine", "ejs"); 
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
