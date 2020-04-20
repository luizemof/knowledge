const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const { existsOrError, notExistsOrError, equalsOrError } = app.api.validations
    const dt_users = app.api.constants.db.users

    const encryptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }
    const saveUser = async (res, user) => {
        try {
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.passwordConfirm, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.passwordConfirm, 'Senhas não conferem')

            const userFromDB = await app.db(dt_users).where({ email: user.email }).first()

            if (!user.id) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }

        } catch (msg) {
            return res.status(400).send(msg)
        }

        user.password = encryptPassword(user.password)
        delete user.passwordConfirm

        if (user.id) {
            app.db(dt_users)
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(dt_users)
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

    }

    const save = async (req, res) => {
        const user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            admin: req.body.admin ? req.body.admin : false
        }

        if (req.params.id)
            user.id = req.params.id

        await saveUser(res, user)
    }

    const signUp = async (req, res) => {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            admin: false
        }

        await saveUser(res, user)
    }

    const get = (req, res) => {
        app.db(dt_users)
            .select('id', 'name', 'email', 'admin')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        const id = req.params.id
        if (id) {
            app.db(dt_users)
                .select('id', 'name', 'email', 'admin')
                .where({ id })
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
        } else {
            res.status(400).send('parameterId missing')
        }
    }

    const remove = async (req, res) => {
        const id = req.params.id

        try {
            existsOrError(id, 'Id não informado.')
            const rows = await app.db(dt_users).where({ id }).del()

            existsOrError(rows, 'Usuário não encontrado.')
            res.status(204).send()
        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, remove, signUp }
}