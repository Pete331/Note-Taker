const express = require("express");
const router = require("./route");

// start server and give PORT
const app = express();
const PORT = process.env.PORT || 3000;
// below 2 lines to do with body parser (now built in)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", router);

// set public folder as static
app.use(express.static('public'));


// start the server listening
app.listen(PORT, function () {
  console.log("Note Taker is happening on PORT " + PORT);
});
