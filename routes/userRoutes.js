const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

router
	.route('/')
	.get(userController.getAllUsers)
	.post(userController.createNewUser)

router
	.route('/:id')
	.get(userController.getUserById)
	.patch(userController.updateUserById)
	.delete(userController.deleteUserById)

module.exports = router
