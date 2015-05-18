module.exports = function(prefix) {
    var mongoose = require('mongoose');
    var Schema = mongoose.Schema;


    var Article = new Schema({

        // _id: Number,
        id: {type: String, index: true},
        category: String,
        lieferant: String,
        externeId: String,
        zentralArtikel: { type: Schema.Types.ObjectId, ref: 'Central_Articles' },
        brand: String,
        name: String,
        description: String,
        marketingText: String,
        mehrWertSteuerSatz: Number,
        packungsEinheit: String,
        packungsInhalt: Number,
        verkaufsEinheit: String,
        preisBezugsGroesse: String,
        verkaufsPreis: Number,
        gewicht: Number,
        gebindeArtikel: Boolean,
        gewichtsVariabel: Boolean,
        wiegeArtikel: Boolean,
        vorbestellArtikel: Boolean,
        internetArtikel: Boolean,
        internetKategorie: String,
        LebensmittelVerordnung: Boolean,
        filenameBild: String
    });

    return mongoose.model(prefix+'Articles', Article);
}