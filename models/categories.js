module.exports = function(prefix) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var Categorie = new Schema({

        // _id: Number,
        name: String,
        beschreibung: String,
        code: String
    });

    return mongoose.model(prefix+'categories', Categorie);
}