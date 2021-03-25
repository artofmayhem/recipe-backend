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
    const results = await db({r: 'recipes'})
        .join({u: 'users'}, 'r.user_id', 'u.user_id')
        .join({i: 'images'}, 'r.image_id', 'i.image_id')
        .join({c: 'categories'}, 'r.category_id', 'c.category_id')
        .join({ri: 'recipes_ingredients'}, 'r.recipe_id', 'ri.recipe_id')
        .leftJoin({ig: 'ingredients'}, 'ri.ingredient_id', 'ig. ingredient_id')
        // .join({in: 'instructions'}, 'r.recipe_id', 'in.recipe_id')
        .select(
            'r.recipe_id',
            'r.recipe_name',
            'r.recipe_description',
            'r.recipe_source',
            'u.user_username as submitted_by',
            'i.image_source',
            'c.category_name',
            'ig.ingredient_name',
            'ri.quantity',
            // 'in.instruction',
            // 'in.step_number'
            )

        let newResults = results.reduce((acc, current) => {
            
            let temp = acc.find( recipe => recipe.recipe_id === current.recipe_id)

            if(!temp) {
                acc.push(temp = {...current, ingredients: []})
            } 
            
            else {
                temp.ingredients.push({
                    ingredient: current.ingredient_name,
                    quantity: current.quantity
                })
            }
   
            return acc
            }, [])
        
        newResults = newResults.map(({ingredient_name, quantity, ...rest }) => rest)
    
    return newResults

}




module.exports = {
    getRecipes,
    getIngredients
}