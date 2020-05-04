const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// variables for directory locations
const htmlPath = __dirname + "/public";
const dbPath = __dirname + "/db";

// route for index.html page
router.get("/", function (req, res) {
  res.sendFile(path.join(htmlPath, "index.html"));
});

// route for notes.html page
router.get("/notes", function (req, res) {
  res.sendFile(path.join(htmlPath, "notes.html"));
});

// route for getting the notes from the json file
router.get("/api/notes", function (req, res) {
  res.sendFile(path.join(dbPath, "db.json"));
});

// route for adding a note to the db.json file
router.post("/api/notes", function (req, res) {
  const note = req.body;
  //   adds id parameter to object with generated id
  note.id = uuidv4();

  //   reads json db file and pushes note onto notes
  fs.readFile(dbPath + "/db.json", function (err, data) {
    if (err) console.log("error", err);
    let notes;

    notes = JSON.parse(data);
    notes.push(note);

    // writes notes objects to json file
    fs.writeFile(dbPath + "/db.json", JSON.stringify(notes), function (err) {
      if (err) console.log("error", err);
      res.json(true);
    });
  });
});

// route for deleting a note from the db.json file
router.delete("/api/notes/:id", function (req, res) {
  //   gets the id of the note of the deleted button pushed
  const idValue = req.params.id;
  //   reads the json file and filters out the objects that dont include the clicked id
  fs.readFile(dbPath + "/db.json", function (err, data) {
    if (err) console.log("error", err);
    let notes;
    notes = JSON.parse(data);
    notes = notes.filter(function (obj) {
      return obj.id !== idValue;
    });
    // writes the new json file with the update notes (without the removed item)
    fs.writeFile(dbPath + "/db.json", JSON.stringify(notes), function (err) {
        if (err) console.log("error", err);
      res.json(true);
    });
  });
});

module.exports = router;
