const express = require('express');
const connectDB = require('./Data/database');
const authRouter = require('./Routes/authRouter')
const loginRouter = require('./Routes/loginRouter')


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

app.use('/auth', authRouter)
app.use('/authlogin', loginRouter)

//Public Route
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'HELLO WORLD!' });
});


const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
});
