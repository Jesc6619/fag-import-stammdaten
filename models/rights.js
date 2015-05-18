var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Group = new Schema({

	// _id: Number,
	name: String,
    domain: String,
    members: [String]
});

module.exports = mongoose.model('Groups', Group);



