const jwt = require('jsonwebtoken');

const SECRET_KEY = 'NOTESAPI';

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        if (token) {
            // eslint-disable-next-line prefer-destructuring
            token = token.split(' ')[1];
            const user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        } else {
            res.status(401).json({ message: 'Unauthorized User' });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized User' });
    }
};

module.exports = auth;
