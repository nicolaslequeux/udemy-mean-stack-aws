const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // "Bearer qhjguwiuzaxbzhkb" : 'Bearer' = convention with token
        const token = req.headers.authorization.split(" ")[1];
        // const decodedToken = jwt.verify(token, "secret_long_string");
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        // I can add new field on the req data (be carefull nor overwrite existing ones)
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch (error) {
        res.status(401).json({ message: 'You are not authenticated! (from auth middleware checker)' })
    }
}