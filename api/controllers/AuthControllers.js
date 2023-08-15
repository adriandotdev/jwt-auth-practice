const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const LoginController = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ message: 'Invalid credentials. Please check your username and password.' });

    const user = await User.findOne({ username })

    if (!user) return res.status(400).json({ message: 'Username not found' });

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) return res.status(400).json({ message: 'Incorrect password' });

    const signedJWT = jwt.sign(user.username, process.env.JWT_SECRET_KEY);

    res.cookie('token', signedJWT, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // Expires in 7 days
    });

    console.log("LOGGED IN");
    res.status(200).send({ message: "Logged In" });
}

const RegisterController = async (req, res) => {

    const { givenName, middleName, lastName, username, password } = req.body;

    /** THERE ARE NO VALIDATIONS YET */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ givenName, middleName, lastName, username, password: hashedPassword });

    user.save().then(() => console.log("USER SAVED"))

    console.log({ givenName, middleName, lastName, username, password: hashedPassword })
    return res.json({ givenName, middleName, lastName, username, password: hashedPassword });
}

module.exports = { LoginController, RegisterController }