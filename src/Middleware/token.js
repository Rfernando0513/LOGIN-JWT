const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ msg: 'Acesso Negado!' });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ msg: 'Token inválido!' });
        }
        req.user = user; 
        next();
    });
};

module.exports = checkToken;
