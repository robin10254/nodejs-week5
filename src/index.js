const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/users', userRouter);
app.use('/notes', noteRouter);

mongoose
    .connect('mongodb+srv://admin:admin@cluster0.0yg8bty.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port no. ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
