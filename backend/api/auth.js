const { authSecret } = require('../.env')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jwt-simple')

module.exports = app => {
    const dt_users = app.api.constants.db.users

    const signIn = async (req, res) => {
        const body = { ...req.body }
        if (!body.email || !body.password) {
            res.status(400).send('Email ou senha não informados')
        }

        const user = await app.db(dt_users).where({ email: body.email }).first()
        if (!user) {
            res.status(401).send('Usuário não encontado')
        }

        const isMatch = bcrypt.compareSync(body.password, user.password)
        if (!isMatch) {
            res.status(401).send('Senha inválida')
        }
        const nowInSeconds = Math.floor(Date.now() / 1000)
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: nowInSeconds,
            exp: getExpirationDate(nowInSeconds)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = (req, res) => {
        const { token } = req.body
        let isValid = false

        try {
            if (!token) {
                res.status(400).send('Token não enviado')
            } else {
                isValid = jwt.decode(token, authSecret)
            }
        } catch { }

        res.send(!!isValid);
    }

    return { signIn, validateToken }
}

function getExpirationDate(now) {
    const seconds = 60
    const minutes = 60
    const hours = 24
    const days = 3

    return now + (seconds * minutes * hours * days)
}