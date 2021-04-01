const express = require('express')
const helmet = require('helmet')
const authenticate = require('./users/users-auth-middleware')
const recipesRouter = require('./recipes/recipes_router')
const usersRouter = require('./users/users-router')

const cors = require('cors')

const cookieParser = require('cookie-parser')

const server = express()
server.use(express.json())
server.use(helmet())

server.use(cors({ 
	credentials: true, 
	allowedHeaders: ['Content-Type', 'Authorization', 'authorization'
]
}))


server.use(cookieParser())

server.get('/', (req, res) => {
    res.json({message: 'Welcome to Secret Family Recipes'})
})
server.use('/api/recipes', authenticate, recipesRouter)
server.use('/api/users', usersRouter)

server.use((err, req, res, next) => { //eslint-disable-line
	console.log(err)
	
	res.status(500).json({
		message: "Something went wrong",
	})
})


module.exports = server
