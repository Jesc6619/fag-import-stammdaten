
module.exports = function(prefix) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var Customer = new Schema({

    	// _id: Number,
        id: String,
    	name: String
    });

    return mongoose.model(prefix+'Customers', Customer);
}



