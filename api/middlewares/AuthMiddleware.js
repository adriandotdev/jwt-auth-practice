const jwt = require('jsonwebtoken');

const LoginMiddleware = (req, res, next) => {

    const token = req.cookies['auth-token'];

    try {
        const isValid = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (isValid) {

            req.isValid = true;
            req.id = jwt.decode(token);
            next();
        }
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = { LoginMiddleware }