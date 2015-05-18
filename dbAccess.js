/**
 * Created by Jens on 15-May-2015.
 */
module.exports = function() {

    var mongoose = require('mongoose');
    var DbConfig = require('./configuration/mongo');
    var Article = require('./models/articles')(DbConfig.prefix);
    
    
    return {
        openDb : function(whenDbOpened) {

            mongoose.connect(DbConfig.url);
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function (callback) {
                whenDbOpened();
            });
        },

        // Note: This function always returns a single Article, no matter how many Articles are matching the searchCriteria.
        findOrCreateArticle : function (searchCriteria, whenFoundOrCreated) {
        
            var existingArticle = Article.findOne(searchCriteria, '*', function (err, existingArticle) {
            
                if (err) {
                
                    whenFoundOrCreated(err, null);
                }
                else {
                
                    whenFoundOrCreated(null, (existingArticle == null)
                                                    ? new Article()
                                                    : existingArticle);
                }
            });
        },

        saveArticle : function (articleModel, whenFinished) {
        
            var isNew = articleModel.isNew;
        
            articleModel.save(function (err, savedArticle) {
            
                if (err) {
                
                    //console.log('error saving article ' + articleModel.id);
                    if (whenFinished) {
                        whenFinished(err, null)
                    }
                } 
                else {
                
                    //console.log('Article ' + savedArticle.id + ' successfully ' + (isNew ? 'added' : 'updated'));
                
                    if (whenFinished) {
                        whenFinished(null, savedArticle)
                    }
                }
            });
            }
    };
}
