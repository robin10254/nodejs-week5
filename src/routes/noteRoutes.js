const express = require('express');

// eslint-disable-next-line object-curly-newline
const { getNote, createNote, deleteNote, updateNote } = require('../controllers/noteController');
const auth = require('../middlewares/auth');

const noteRouter = express.Router();

noteRouter.get('/', auth, getNote);
noteRouter.post('/', auth, createNote);
noteRouter.delete('/:id', auth, deleteNote);
noteRouter.put('/:id', auth, updateNote);

module.exports = noteRouter;
