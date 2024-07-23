const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, mail, password, confirmPassword } = req.body;

    if (!name) {
        return res.status(422).json({ msg: 'Nome Obrigatório!' });
    }

    if (!mail) {
        return res.status(422).json({ msg: 'Email Obrigatório!' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'Senha Obrigatória' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'As senhas não coincidem' });
    }

    try {
        const userExists = await User.findOne({ mail });
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (userExists) {
            return res.status(404).json({ msg: 'Email já registrado. Por favor utilize outro!' });
        }

        const newUser = new User({
            name,
            mail,
            password: hashPassword
        });

        await newUser.save();
        res.status(200).json({ msg: 'Usuário registrado com sucesso!' });

    } catch (err) {
        res.status(500).json({ msg: 'Erro ao registrar usuário', err });
    }
};

module.exports = {
    register,
};
