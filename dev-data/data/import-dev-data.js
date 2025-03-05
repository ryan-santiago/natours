const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Tour = require('../../models/tourModel')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD,
)
mongoose.connect(DB, {}).then(() => console.log('DB Connection Successful!'))

// READ JSON FILE
const tours = JSON.parse(
	fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
)

// IMPORT DATA
const importData = async () => {
	try {
		await Tour.create(tours)
		console.log('Data Tour Loaded')
		process.exit()
	} catch (err) {
		console.log(err)
	}
}

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		await Tour.deleteMany()
		console.log('Data Deleted')
		process.exit()
	} catch (err) {
		console.log(err)
	}
}

if (process.argv[2] === '--import') {
	importData()
} else if (process.argv[2] === '--delete') {
	deleteData()
}
