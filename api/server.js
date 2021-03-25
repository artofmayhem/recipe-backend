const express = require('express')
const helmet = require('helmet')
const recipesRouter = require('./recipes/recipes_router')
const usersRouter = require('./users/users-router')
const cors = require('cors')

const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.get('/', (req, res) => {
    res.json({message: 'Welcome to Secret Family Recipes'})
})
server.use('/api/recipes', recipesRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { //eslint-disable-line
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})


module.exports = server
