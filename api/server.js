const express = require('express')
const helmet = require('helmet')
const recipesRouter = require('./recipes/recipes_router')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
    res.json({message: 'Welcome to Secret Family Recipes'})
})
server.use('/api/recipes', recipesRouter)


module.exports = server
