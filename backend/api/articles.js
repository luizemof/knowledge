const queries = require('./queries')

module.exports = app => {
    const { existsOrError } = app.api.validations
    const dbConstants = { ...app.api.constants.db }

    const save = async (req, res) => {
        const article = { ...req.body }

        if (req.params.id) {
            article.id = req.params.id
        }

        try {
            existsOrError(article.name, 'Nome não informado')
            existsOrError(article.description, 'Descrição não informada')
            existsOrError(article.content, 'Conteúdo não informado')
            existsOrError(article.userId, 'Usuário não informado')
            existsOrError(article.categoryId, 'Categoria não informada')

            const user = await app.db(dbConstants.users).where({ id: article.userId })
            existsOrError(user, 'Usuário não encontrado')

            const category = await app.db(dbConstants.categories).where({ id: article.categoryId })
            existsOrError(category, 'Categoria não encontrada')

        } catch (msg) {
            res.status(400).send(msg)
        }

        if (article.id) {
            app.db(dbConstants.articles)
                .update(article)
                .where({ id: article.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(dbConstants.articles)
                .insert(article)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const limit = 10
    const get = async (req, res) => {
        const result = await app.db('articles').count('id').first()
        const count = parseInt(result.count)

        const page = req.query.page || 1
        app.db(dbConstants.articles)
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)
            .then(articles => res.json({ data: articles, count, limit }))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        const id = req.params.id
        app.db(dbConstants.articles)
            .where({ id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                res.json(article)
            })
            .catch(err => res.status(500).send(err))
    }

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId)
        const categoryIds = categories.rows.map(c => c.id)

        app.db({ a: dbConstants.articles, u: dbConstants.users })
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' })
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId'])
            .whereIn('categoryId', categoryIds)
            .orderBy('a.id', 'desc')
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const id = req.params.id
            const rows = await app.db(dbConstants.articles)
                .where({ id })
                .del()
                
            existsOrError(rows, 'Artigo não encontrado')
            res.status(204).send()

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    return { save, get, getById, getByCategory, remove }
}