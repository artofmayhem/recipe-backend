const express = require('express')
const recipes = require('./recipes_model')

const router = express.Router()

//GET ALL RECIPES
router.get('/', async ( req, res, next ) => {
    try {
        const results = await recipes.getRecipes()
        res.status(200).json(results)
    }
    catch (err){
        next(err)
    }
})

//GET RECIPE BY ID
router.get('/:id', async ( req, res, next) => {
    try {
        const results = await recipes.getRecipes(req.params.id)
        res.status(200).json(results)
    }
    catch (err){
        next(err)
    }
})

//ADD RECIPE
router.post('/', async ( req, res, next) => {
    try {
        const result = await recipes.addRecipe(req.body)
        res.status(201).json(result)
    } catch(err){
        next(err)
    }
})

//UPDATE RECIPE

//DELETE RECIPES

router.delete('/:id', async ( req, res, next ) => {
    try {
        await recipes.removeRecipe(req.params.id)
        res.status(200).json({
            message: 'recipe successfully deleted'
        })
    } catch(err){
        next(err)
    }
})



module.exports = router