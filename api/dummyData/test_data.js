const newRecipe = {
    "recipe_name": "Test Dish",
    "recipe_description": "It is just real dang darn good",
    "recipe_source": "original creation",
    "user_id": 2,
    "image_source": "https://thestayathomechef.com/wp-content/uploads/2017/08/Most-Amazing-Lasagna-2-e1574792735811.jpg",
    "category_id": 2,
    "ingredients": [{
        "ingredient_name": "beef",
        "quantity": "not sure but it is a lot"
    }
    ,{
        "ingredient_name": "tester three food",
        "quantity": "so much more"
    }],
    "instructions": [{
        "instruction": "mix it together",
        "step_number": 1
    },{
        "instruction": "mix it even more",
        "step_number": 2
    },{
        "instruction": "bake it please",
        "step_number": 3
    }]
  }



const updatedRecipe = {
    "recipe_id": 1,
    "recipe_name": "Update Test",
    "recipe_description": "Real good beans with garlic",
    "recipe_source": "Nana",
    "user_id": 1,
    "submitted_by": "jimbo",
    "image_source": "https://assets.bonappetit.com/photos/5c38c88f3a94835decfc5934/1:1/w_1600%2Cc_limit/crispy-fried-green-beans.jpg",
    "category_id": 1,
    "ingredients": [
        {
            "ingredient_name": "green beans",
            "quantity": "1lb"
        },
        {
            "ingredient_name": "olive oil",
            "quantity": "1/3 cup"
        },
        {
            "ingredient_name": "kosher salt",
            "quantity": "pinch"
        },
        {
            "ingredient_name": "garlic",
            "quantity": "6 cloves"
        },
        {
            "ingredient_name": "red pepper flakes",
            "quantity": "1 tsp"
        },
        {
            "ingredient_name": "capers",
            "quantity": "1 tbsp"
        }
    ],
    "instructions": [
        {
            "instruction": "Transfer beans to a platter. Spoon caper-garlic mixture over and pour some oil over too; season with salt.",
            "step_number": 4
        },
        {
            "instruction": "Continue to cook, turning occasionally, until browned all over and tender, about 5 minutes longer. Season with salt. Add garlic, capers, and red pepper flakes. Cook, tossing occasionally, just until garlic turns golden, about 1 minute.",
            "step_number": 3
        },
        {
            "instruction": "Heat oil in a large skillet over high until shimmering. Add green beans (the dryer they are, the less they will spatter when they hit the oil) and cook, covering skillet as needed if beans are spattering, until browned underneath, about 3 minutes. Turn beans with tongs and redistribute them so they brown evenly (don’t toss them since hot oil can easily slosh out of the skillet if you try to show off)",
            "step_number": 2
        },
        {
            "instruction": "Prep ingredients by trimming green beans and pat dry any moisture; drain and choo the capers; and slice the garlic",
            "step_number": 1
        }
    ]
}

module.exports = {
    newRecipe,
    updatedRecipe
}