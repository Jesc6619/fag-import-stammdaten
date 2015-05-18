/**
 * Created by Jens on 27-Apr-2015.
 */
var FagTable = require('./fagTable.js');
var FagData2Articles = require('./fagTables2Articles.js');
var importConfig = require('./fagDataImport.config.js');
var dbAccess = require('./dbAccess.js')();

fagDataImport = function (config, dbAccess) {
    
    if (!(this instanceof fagDataImport)) {
        return new fagDataImport(config, dbAccess);
    }
    var that = this;
    
    that.config = config;
    that.dbAccess = dbAccess;

    that.noOfProcessedArticles = 0;
    that.noOfSuccessfullyArticles = 0;
    that.noOfAddedArticles = 0;
    that.noOfUpdatedArticles = 0;
    that.noOfArticlesToProcess = 0;

    that.importArticle = function (whenAllFinished) {

        that.dbAccess.openDb(function () {
                            console.log('DB is open');
            var table5091341 = new fagTable('Table_5091341');

            table5091341.readToEnd(mkPath(that.config.fileName5091341), function (err, tab5091341) {
                
                var table27 = new fagTable('Table_27');
                table27.readToEnd(mkPath(that.config.fileName27), function (err, tab27) { 

                    that.noOfArticlesToProcess = tab27.count();

                    fagTablesToArticles = new fagTables2Articles(tab27, tab5091341, that.dbAccess.findOrCreateArticle);
                    
                    fagTablesToArticles.forEachArticleToImport(
                                function(articleModel) {
                                        
                                    storeArticleModel(articleModel, whenAllFinished);

                                });

                });
            });
        });        
    };

    var storeArticleModel = function (articleModel, whenAllFinished) {

        var isNew = articleModel.isNew;

        that.dbAccess.saveArticle(articleModel, function (err, savedArticle) {

            that.noOfProcessedArticles++;

            // called when "saveArticle" is finished
            if(err != null) {

                console.log('error saving article ' + articleModel.id + ' ' + err);
            }
            else {

                that.noOfSuccessfullyArticles++;
                if( isNew ) {
                    that.noOfAddedArticles++;
                } else {
                    that.noOfUpdatedArticles++;
                }

                if( (that.noOfSuccessfullyArticles % 100) == 0) {

                    console.log('Processed ' + that.noOfProcessedArticles + ' articles. ' + that.noOfAddedArticles + ' added. ' + that.noOfUpdatedArticles + ' updated.');
                    //console.log('Article ' + savedArticle.id + ' successfully ' + (isNew ? 'added' : 'updated'));
                }

                if(that.noOfProcessedArticles == that.noOfArticlesToProcess) {

                    // we are about to process the last Article
                    if( whenAllFinished ) {

                        whenAllFinished(that);
                    }
                }
            }
        }); 
    };

    var mkPath = function (fileName) {
        return that.config.path + fileName;

    }
}

//=================================================================================================
//             MAIN
//=================================================================================================
var fagImport = new fagDataImport(importConfig, dbAccess);
fagImport.importArticle(function (fagImported) 
{
    console.log('Total processed:'        + fagImported.noOfProcessedArticles    + ' Articles.');
    console.log('Successfully processed:' + fagImported.noOfSuccessfullyArticles + ' Articles.');
    console.log('Added:'                  + fagImported.noOfAddedArticles        + ' Articles.');
    console.log('Updated:'                + fagImported.noOfUpdatedArticles      + ' Articles.');
    process.exit();
});
