const mongoose = require("mongoose");

// CREATE SCHEMA
const Schema = mongoose.Schema;
const NoteSchema = new Schema({
  title: String,
  body: String
});

// CREATE MONGOOSE MODEL
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;