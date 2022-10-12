const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();
const PORT = 27017;

app.use(express.json());

app.use('/users', userRouter);
app.use('/notes', noteRouter);

mongoose
    .connect('mongodb://localhost:27017/crud')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port no. ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
