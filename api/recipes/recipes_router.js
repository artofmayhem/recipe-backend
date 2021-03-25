const express = require('express')
const recipes = require('./recipes_model')

const router = express.Router()

router.get('/', async ( req, res, next ) => {
    try {
        const results = await recipes.getRecipes()
        res.status(200).json(results)
    }
    catch (err){
        next(err)
    }
})

module.exports = router