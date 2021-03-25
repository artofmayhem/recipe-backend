const db = require('../data/db-config')

//Returns ingredients for a recipe

const getIngredients = (recipe_id) => {
    return db({ri: 'recipes_ingredients'})
        .join({i: 'ingredients'}, 'ri.ingredient_id', 'i.ingredient_id')
        .where('ri.recipe_id',recipe_id)
        .select(
            "i.ingredient_name",
            "ri.quantity"
            )
}

//Returns all recipes

const getRecipes = async () => {
    const recipes = await db({r: 'recipes'})
        .join({u: 'users'}, 'r.user_id', 'u.user_id')
        .join({i: 'images'}, 'r.image_id', 'i.image_id')
        .join({c: 'categories'}, 'r.category_id', 'c.category_id')
        .select('*')

    return recipes.map(recipe => {
        return {
            ...recipe,
            ingredients: recipe.recipe_id
        }
    })
}





module.exports = {
    getRecipes
}