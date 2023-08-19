const jwt = require('jsonwebtoken');

const LoginMiddleware = (req, res, next) => {

    const token = req.cookies['auth-token'];

    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (isValid) {
            next();
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { LoginMiddleware }