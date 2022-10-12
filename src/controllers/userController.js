const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const SECRET_KEY = 'NOTESAPI';

// eslint-disable-next-line consistent-return
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email,
            password: hashedPassword,
            username,
        });

        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

        console.log(token);

        // eslint-disable-next-line object-shorthand
        res.status(201).json({ user: result, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// eslint-disable-next-line consistent-return
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(404).json({ message: 'Invalid Credentials' });
        }

        // eslint-disable-next-line no-underscore-dangle
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

        res.status(201).json({ user: existingUser, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { signup, signin };
