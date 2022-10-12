const NoteModel = require('../models/note');

const createNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new NoteModel({
        title,
        description,
        userId: req.userId,
    });

    try {
        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    const newNote = new NoteModel({
        title,
        description,
        userId: req.userId,
    });

    try {
        await NoteModel.findByIdAndUpdate(id, newNote, { new: true });
        res.status(200).json(newNote);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await NoteModel.findByIdAndRemove(id);
        res.status(202).json(note);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const getNote = async (req, res) => {
    try {
        const notes = await NoteModel.find({ userId: req.userId });
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getNote,
};
