const asyncHandler = require("express-async-handler");
const Note = require("../Model/noteModel");
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });
  res.json(notes);
});
const createNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;
  if (!title || !content || !category) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "please fill all the fields" });
  } else {
    // console.log(req.user._id);
    const note = new Note({ user: req.user._id, title, category, content });
    const createdNote = await note.save();
    res.status(200).json({ Status: "SUCCESS", message: "super", createdNote });
  }
});
const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note) {
    res.status(200).json({ Status: "SUCCESS", message: "good", note });
  } else {
    res.status(400).json({ Status: "INVALID", message: "Can't get the note" });
  }
});
const updateNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !content || !category) {
    res
      .status(400)
      .json({ Status: "INVALID", message: "please fill all the fields" });
  }
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (note) {
    res.status(200).json({ Status: "SUCCESS", data: note });
  } else {
    res
      .status(400)
      .json({ Status: "INVALID", message: "note not found update user" });
  }
});
const deleteNote = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deltedNote = await Note.findByIdAndDelete(id);
  if (deltedNote) {
    res
      .status(200)
      .json({ Status: "SUCCESS", message: "deleted Successfully" });
  } else {
    res.status(400).json({ Status: "INVALID", message: "can't delete" });
  }
});
module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };
