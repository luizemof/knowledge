const admin = require('./admin')

module.exports = app => {
    app.post('/signin', app.api.auth.signIn)
    app.post('/validateToken', app.api.auth.validateToken)
    app.post('/signup', app.api.users.signUp)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.users.save))
        .get(admin(app.api.users.get))

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.users.save))
        .get(admin(app.api.users.getById))
        .delete(admin(app.api.users.remove))

    app.route('/categories')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.categories.get))
        .post(admin(app.api.categories.save))

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getTree)

    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.categories.getById)
        .put(admin(app.api.categories.save))
        .delete(admin(app.api.categories.remove))

    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.articles.get))
        .post(admin(app.api.articles.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getById)
        .put(admin(app.api.articles.save))
        .delete(admin(app.api.articles.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.articles.getByCategory)
    
    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stats.get)
}