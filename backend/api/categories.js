module.exports = app => {
    const { existsOrError, notExistsOrError, notEqualsOrError } = app.api.validations;
    const dt_categories = app.api.constants.db.categories
    const dt_articles = app.api.constants.db.articles

    const get = (req, res) => {
        app.db(dt_categories)
            .then(categories => res.json(withPath(categories)))
            .catch(err => res.status(500).send(err))
    }

    const withPath = categories => {
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent ? parent[0] : null
        }
        const categoriesWithPath = categories.map(category => {
            let parent = getParent(categories, category.parentId)
            let path = category.name

            while (parent) {
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }

            return { ...category, path }
        })

        categoriesWithPath.sort((a, b) => {
            let comp = 0
            if (a.path < b.path) {
                comp = -1
            } else if (b.path < a.path) {
                comp = 1
            }

            return comp
        })

        return categoriesWithPath
    }

    const getById = (req, res) => {
        app.db(dt_categories)
            .where({ id: req.params.id })
            .then(category => res.json(category[0]))
            .catch(err => res.status(500).send(err))
    }

    const save = (req, res) => {
        const category = {
            id: req.body.id,
            name: req.body.name,
            parentId: req.body.parentId
        }

        if (req.params.id != undefined && category.id != req.params.id) {
            res.status(400).send('Id da categoria difere do id da chamada')
            return
        }

        try {
            console.log(category)
            existsOrError(category.name, 'Nome não informado')
            notEqualsOrError(category.id, category.parentId, 'A categoria pai não pode ser a categoria')
        } catch (msg) {
            res.status(400).send(msg)
            return
        }

        if (category.id) {
            app.db(dt_categories)
                .update(category)
                .where({ id: category.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db(dt_categories)
                .insert(category)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const remove = async (req, res) => {
        try {
            const categoryId = req.params.id
            existsOrError(categoryId, 'Id não informado')

            const subCategories = await app.db(dt_categories).where({ parentId: categoryId })
            notExistsOrError(subCategories, 'A categoria possui subcategorias')
            console.log(subCategories)

            const articles = await app.db(dt_articles).where({ categoryId })
            notExistsOrError(articles, 'A categoria possui artigos')

            const rows = await app.db(dt_categories).where({ id: categoryId }).del()
            existsOrError(rows, 'Categoria não encontrada')

            res.status(204).send()

        } catch (msg) {
            res.status(500).send(msg)
        }
    }

    const toTree = (categories, tree) => {
        if (!tree) {
            tree = categories.filter(category => !category.parentId)
        }

        tree = tree.map(parentNode => {
            const isChild = node => node.parentId == parentNode.id
            parentNode.children = toTree(categories, categories.filter(isChild))
            return parentNode
        })

        return tree;
    }

    const getTree = (req, res) => {
        app.db(dt_categories)
            .then(categories => res.json(toTree(categories)))
            .catch(err => res.status(500).send(err))
    }

    return { get, getById, getTree, save, remove }
}