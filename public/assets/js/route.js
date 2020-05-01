const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");


const publicPath = __dirname + "/../..";
router.get("/", function (req, res) {
    res.sendFile(path.join(publicPath, "index.html"))
})

router.get("/notes", function (req, res) {
    res.sendFile(path.join(publicPath, "notes.html"))
})

module.exports = router;
