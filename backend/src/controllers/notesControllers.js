import note from "../../models/Note.js";

//get all
export const getAllNotes = async (_, res) => {
  try {
    const notes = await note.find({ user: _.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//create notes

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!req.user._id) {
      return res.json({ success: false, message: "Login to create notes" });
    }

    const note = new note({
      title,
      content,
      user: req.user._id,
    });

    await note.save();
    res.json({ success: true, message: "Note Created Successfully" });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};
//upd notes
export const updateNotes = async (req, res) => {
  try {
    const note = await note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to upadte this note",
      });
    }

    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to update this note",
      });
    }

    const updatedNote = await note.findByIdAndUpdate(
      req.params.id,
      req.params.body,
      { new: true }
    );

    res.json({ success: true, note: updatedNote });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" }, err);
  }
};
//delete notes
export const deleteNotes = async (req, res) => {
  try {
    const note = await note.findOne({ _id: req.params.id, user: req.user._id });

    if (!note) {
      return res
        .status(401)
        .json({ success: false, message: "Note not found" });
    }
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to delete this note",
      });
    }

    await note.deleteOne();
    res.json({ success: true, message: "Note deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal sever error" });
  }
};
