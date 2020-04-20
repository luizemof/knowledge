module.exports = app => {
    const db = createDBConstants()
    return { db }
}

function createDBConstants() {
    const articles = 'articles'
    const categories = 'categories'
    const users = 'users'
    return { articles, categories, users }
}