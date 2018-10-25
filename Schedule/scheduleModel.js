const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const Schedule = new mongoose.Schema({
	type: {
		type: String,
		required: true,
		default: ''
	},
	content: {
		title: {
			type: String,
			default: 'Event'
		},
		description: {
			type: String,
			default: null
		}
	},
	time: {
		start: {
			default: null
		},
		end: {
			default: null
		}
	},
	reminder: {
		reminder_Id: ObjectId, // reserach a bit more on this.
		type: String,
		default: null
	},
	checkList: {
		checkList_Id: ObjectId, // need alternate
		default: null
	},
	icon: {
		type: String,
		default: null
	},
	location: {
		type: String, // need research
		default: null
	},
	color: {
		type: String, // need some thinking
		default: null
	}
});

module.exports = mongoose.model('Schedule', Schedule);
