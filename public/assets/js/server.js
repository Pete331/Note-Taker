const express = require("express");
const router = require("./route");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

// start the server listening
app.listen(PORT, function () {
  console.log("Restaurant is happening on PORT " + PORT);
});
