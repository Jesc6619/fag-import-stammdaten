module.exports = function(prefix) {
    var mongoose = require('mongoose');

    var bcrypt = require('bcryptjs');
    var SALT_WORK_FACTOR = 10;


    var Schema = mongoose.Schema;
    var Account = new Schema({

    	// _id: Number,
        login: String, // need to be unique//
    	firstName: String,
    	lastName: String,
    	customer: { type: Schema.Types.ObjectId, ref: 'Customers' },
    	password: String,
        locked: Boolean
    });

    //Password verification
    Account.methods.comparePassword = function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            if (err) {
                return cb(err);
            } else {
                cb(isMatch);
            }
        });
    };


    Account.methods.setPassword = function(password) {

        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        var newHash = bcrypt.hashSync(password, salt);
        this.password = newHash;
      };

    return mongoose.model(prefix+'Accounts', Account);
}

