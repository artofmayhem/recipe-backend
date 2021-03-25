const db = require('../data/db-config')


//GET ALL RECIPES
const getRecipes = async (recipe_id) => {

    const results = await db({r: 'recipes'})
        .join({u: 'users'}, 'r.user_id', 'u.user_id') //join with user table to get the username of user who submitted recipe
        .join({i: 'images'}, 'r.image_id', 'i.image_id') //join with 'images' table to get the url for the image
        .join({c: 'categories'}, 'r.category_id', 'c.category_id') //join with 'categories' to get the recipe category
        .join({ri: 'recipes_ingredients'}, 'r.recipe_id', 'ri.recipe_id') //join with 'recipes_ingredients' for corresponding ingredient ids and quantity
        .leftJoin({ig: 'ingredients'}, 'ri.ingredient_id', 'ig. ingredient_id') //join with 'ingredients' for ingredient name
        .leftJoin({in: 'instructions'}, 'r.recipe_id', 'in.recipe_id') //join with 'instructions' for instruction and step number
        .modify(function(filterRecipes){
            if(recipe_id){
                filterRecipes.where('r.recipe_id',recipe_id)
            }
        }) //If recipe id given as parameter then filter recipes
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

//ADD RECIPE

const addRecipe = async (recipe) => {

    //Add image and get image id
    const [imageID] = await db('images')
        .insert({
            image_source: recipe.image_source
        },'image_id')

    //Add recipe and get recipe id
    const [rID] = await db('recipes')
        .insert({
            recipe_name: recipe.recipe_name,
            recipe_description: recipe.recipe_description,
            recipe_source: recipe.recipe_source,
            user_id: recipe.user_id,
            image_id: imageID,
            category_id: recipe.category_id
        }, 'recipe_id')

    //Add each ingredient to the ingredient table, then get id, and add to recipes_ingredients table with the corresponding quantity

    const ingredients = recipe.ingredients

    for (const ingredient of ingredients) {

        //Check if ingredient exists in ingredient table 
        
        //Add ingredient and get ingredient_id
        const [ingredientID] = await db('ingredients')
            .insert({
                ingredient_name: ingredient.ingredient_name
            }, 'ingredient_id')

        //Insert recipe, ingredient and quantity into recipes_ingredients junction table
        await db('recipes_ingredients')
            .insert({
                recipe_id: rID,
                ingredient_id: ingredientID,
                quantity: ingredient.quantity
            })
      }

    //Add each instruction to the instructions table
    
    const instructions = recipe.instructions

    for (const instruction of instructions){

        await db('instructions')
            .insert({
                instruction: instruction.instruction,
                step_number: instruction.step_number,
                recipe_id: rID
            })

    }

    return getRecipes(rID)



    // await db('ingredients')
    //     .insert({
    //         ingredient_name: 
    //     })
    

    // return await getRecipes(rID[0])
}


module.exports = {
    getRecipes,
    addRecipe
}