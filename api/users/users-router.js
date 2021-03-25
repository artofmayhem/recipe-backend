const express = require("express")
const users = require('./users-model')

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await users.find())
	} catch(err) {
		next(err)
	}
})



module.exports = router