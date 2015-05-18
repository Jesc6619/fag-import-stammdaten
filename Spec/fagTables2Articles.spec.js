/**
 * Created by Jens on 27-Apr-2015.
 */

require('./testConfig.js')
require('../fagTable.js');
require('../fagTables2Articles.js');

describe('When creating Articles from fag-tables', function () {
   
    var finished = false;
    var articles = [];

    var fileName27 = testConfig.path + testConfig.fileName27;
    var fileName5091341 = testConfig.path + testConfig.fileName5091341;
        
    beforeEach(function () {
        
        var table27 = new fagTable('Table_27');
        var table5091341 = new fagTable('Table_5091341');
        
        table27.readToEnd(fileName27, function (err, tab27) {
            
            table5091341.readToEnd(fileName5091341, function (err, tab5091341) {
               
                fagTables2Articles = new fagTables2Articles(tab27, tab5091341, 
                   function (dummy, callme) {
                        callme(null, {});
                });
                
                fagTables2Articles.forEachArticle(
                    function (articleModel) {
                        articles.push(articleModel);
                    }, 
                    function (fagTablesToA) {
                        finished = true;
                    }
                );
            });
        });
        
        
        waitsFor(function () {
            return finished == true;
        }, "should generate articles", 10000);
    });

    it('should object being initialized', function () {
        expect(fagTables2Articles).not.toBeUndefined();
        expect(fagTables2Articles).not.toBeNull();
    });
    
    it('should Tables being referenced', function () {
        
        var table27 = fagTables2Articles.Table27;
        var table5091341 = fagTables2Articles.Table5091341;
        
        expect(table27).not.toBeUndefined();
        expect(table27).not.toBeNull();
        expect(table27 instanceof fagTable);
        expect(table27.TableName).toBe('Table_27');
        
        expect(table5091341).not.toBeUndefined();
        expect(table5091341).not.toBeNull();
        expect(table5091341 instanceof fagTable);
        expect(table5091341.TableName).toBe('Table_5091341');
    });
    
    it('should have generated Articles', function () {

        expect(articles).not.toBeUndefined();
        expect(articles).not.toBeNull();
        expect(articles.length).toBeGreaterThan(0);

        articles.forEach(function (article) {
            expect(article).not.toBeUndefined();
            expect(article).not.toBeNull();
        });
    });
    
    it('should generated Articles have unambiguous IDs', function () {
        
        var ids = {};

        articles.forEach(function (article) {
            var id = article.id;
            expect(ids.hasOwnProperty(id)).toBe(false);
            ids[id] = article;
        });
    });

    it('should generated Articles have Category field filled', function () {
        
        articles.forEach(function (article) {
            var category = article.category;
            expect(category).not.toBeUndefined();
            expect(category).not.toBeNull();
            //console.log('article [' + article.id + '] has category ' + category);
        });
   });
 
})

