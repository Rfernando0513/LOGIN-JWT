const User = require('../Models/User');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



const login = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail) {
        return res.status(422).json({ msg: 'Email Obrigatório!' });
    }

    if (!password) {
        return res.status(422).json({ msg: 'Senha Obrigatória!' });
    }

    try {
        const user = await User.findOne({ mail: mail });

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado!' });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            return res.status(422).json({ msg: 'Senha incorreta!' });
        }

        const secret = process.env.SECRET;
        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ msg: 'Autenticação realizada com sucesso', token, userId: user._id });

    } catch (error) {
        return res.status(500).json({ msg: 'Erro ao fazer login', error });
    }
};

const loginPrivate = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ msg: 'Id de usuário inválido!' });
    }

    try {
        const user = await User.findById(id, '-password');

        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado' });
        }

        res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ msg: 'Erro ao buscar usuário', error });
    }
};

module.exports = {
    login,
    loginPrivate,
};
