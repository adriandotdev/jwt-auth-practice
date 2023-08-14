const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const LoginController = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: 'Invalid credentials. Please check your username and password.' });

    const signedJWT = jwt.sign(username, process.env.JWT_SECRET_KEY);

    res.cookie('token', signedJWT, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });

    res.status(200).send({ message: "Logged In" });
}

const RegisterController = async (req, res) => {

    const { givenName, middleName, lastName, password } = req.body;

    /** THERE ARE NO VALIDATIONS YET */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return res.json({ givenName, middleName, lastName, password: hashedPassword });
}

module.exports = { LoginController, RegisterController }