const fs = require('fs')

const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
)

exports.checkID = (req, res, next, val) => {
	req.params.id = val * 1
	const tour = tours.find((el) => el.id === req.params.id)
	if (!tour) {
		return res.status(404).json({
			status: 'failed',
			message: 'Not Found',
		})
	}
	next()
}

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.price) {
		return res.status(400).json({
			status: 'fail',
			message: 'Missing name or price',
		})
	}
	next()
}

exports.getAllTours = (req, res) => {
	res.status(200).json({
		status: 'success',
		result: tours.length,
		reqtime: req.requestTime,
		data: {
			tours,
		},
	})
}

exports.getTourById = (req, res) => {
	const tour = tours.find((el) => el.id === req.params.id)

	res.status(200).json({
		status: 'success',
		data: {
			tour,
		},
	})
}

exports.createNewTour = (req, res) => {
	const newId = tours[tours.length - 1].id + 1
	const newTour = { id: newId, ...req.body }
	tours.push(newTour)

	fs.writeFile(
		`${__dirname}/dev-data/data/tours-simple.json`,
		JSON.stringify(tours),
		(err) => {
			res.status(201).json({
				status: 'success',
				result: tours.length,
				data: {
					tour: newTour,
				},
			})
		},
	)
}

exports.updateTourById = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: 'Updated Data',
	})
}

exports.deleteTourById = (req, res) => {
	res.status(200).json({
		status: 'success',
		data: null,
	})
}
