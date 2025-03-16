const Tour = require('../models/tourModel')

exports.getAllTours = async (req, res) => {
	try {
		//filtering setup
		const queryObj = {...req.query}
		const excludedFields = ['page', 'sort', 'limit', 'fields']
		excludedFields.forEach((el) => delete queryObj[el])

		//advance filtering
		let queryStr = JSON.stringify(queryObj)
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

		let query = Tour.find(JSON.parse(queryStr))

		if (req.query.sort) {
			const sortBy = req.query.sort.split(',').join(' ')
			query = query.sort(sortBy)
		}

		const tours = await query

		res.status(200).json({
			status: 'success',
			results: tours.length,
			data: {
				tours,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}

exports.getTourById = async (req, res) => {
	try {
		const tour = await Tour.findById(req.params.id)

		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}

exports.createTour = async (req, res) => {
	try {
		const newTour = await Tour.create(req.body)

		res.status(200).json({
			status: 'success',
			data: {
				tour: newTour,
			},
		})
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: err,
		})
	}
}

exports.updateTourById = async (req, res) => {
	try {
		const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		res.status(200).json({
			status: 'success',
			data: {
				tour,
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}

exports.deleteTourById = async (req, res) => {
	try {
		await Tour.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: 'success',
			data: null,
		})
	} catch (err) {
		res.status(404).json({
			status: 'fail',
			message: err,
		})
	}
}
