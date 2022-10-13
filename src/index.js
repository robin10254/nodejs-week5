const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const noteRouter = require('./routes/noteRoutes');

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 27017;

app.use('/users', userRouter);
app.use('/notes', noteRouter);

app.get('/', (req, res) => {
    res.send('Notes API from Robin');
});

mongoose
    .connect(process.env.MONGO_LIVE_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port no. ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
