const express = require('express')
const tourController = require('../controllers/tourController')

const router = express.Router()

// router.param('id', tourController.checkID)

router
	.route('/')
	.get(tourController.getAllTours)
	.post(tourController.createTour)

router
	.route('/:id')
	.get(tourController.getTourById)
	.patch(tourController.updateTourById)
	.delete(tourController.deleteTourById)

module.exports = router
