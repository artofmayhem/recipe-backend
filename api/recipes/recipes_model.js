const db = require('../data/db-config')


//Returns all recipes

const getRecipes = () => {
    return db('recipes')
        .select('*')
}

module.exports = {
    getRecipes
}