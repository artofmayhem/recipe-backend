const db = require('../data/db-config')


//GET ALL RECIPES
const getRecipes = async () => {

    const results = await db({r: 'recipes'})
        .join({u: 'users'}, 'r.user_id', 'u.user_id') //join with user table to get the username of user who submitted recipe
        .join({i: 'images'}, 'r.image_id', 'i.image_id') //join with 'images' table to get the url for the image
        .join({c: 'categories'}, 'r.category_id', 'c.category_id') //join with 'categories' to get the recipe category
        .join({ri: 'recipes_ingredients'}, 'r.recipe_id', 'ri.recipe_id') //join with 'recipes_ingredients' for corresponding ingredient ids and quantity
        .leftJoin({ig: 'ingredients'}, 'ri.ingredient_id', 'ig. ingredient_id') //join with 'ingredients' for ingredient name
        .leftJoin({in: 'instructions'}, 'r.recipe_id', 'in.recipe_id') //join with 'instructions' for instruction and step number
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
            'in.step_number',
            'in.instruction'
            )

        /*
        Reduce the results down, so each recipe has an array of ingredients and an array of instructions
        */
        let newResults = results.reduce((acc, current) => {
            let temp = acc.find( recipe => recipe.recipe_id === current.recipe_id) //Find recipe matching the current recipe_id

            //If can't find the recipe add the empty ingredients and instructions array
            if(!temp) {
                acc.push(temp = {
                    ...current, 
                    ingredients: [],
                    instructions: []
                })
            }

            //Check to see if current ingredient is already in the ingredients array. If not, then push ingredient.
            if(!temp.ingredients.find(ingredient => ingredient.ingredient === current.ingredient_name)){
                temp.ingredients.push({
                    ingredient: current.ingredient_name,
                    quantity: current.quantity
                })
            }

            //Check to see if current instruction is already in the instructions array. If not then, push instruction.
            if(!temp.instructions.find(instruction => instruction.step_number === current.step_number)){
                temp.instructions.push({
                    instruction: current.instruction,
                    step_number: current.step_number
                })
            }

            return acc
            }, [])

         
        // Reverse the order of instructions array, so they are in ascending order
        newResults = newResults.map(recipe => {
            return {
                ...recipe,
                instructions: [...recipe.instructions].reverse()
            }
        })
        
        // Remove the remaining ingredient_name, quantity, instruction, and step_number from each recipe
        newResults = newResults.map(({
            ingredient_name, 
            quantity,
            instruction,
            step_number, 
            ...rest }) => rest)
    
    return newResults
}


module.exports = {
    getRecipes
}