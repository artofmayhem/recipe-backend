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
const whitelist = ['http://localhost:3000', 'http://localhost:5000', 'https://secret-family-recipes-101.herokuapp.com/']
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
		callback(null, true)
		} 
		else {
		callback(new Error('Not allowed by CORS'))
		}
	}
  }

server.use(cors(corsOptions))


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
