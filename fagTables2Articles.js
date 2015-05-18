/**
 * Created by Jens on 05-Apr-2015.
 */

fagTables2Articles = function (table27, table5091341, articleFactoryFunc) {
    
    if (!(this instanceof fagTables2Articles)) {
        return new fagTables2Articles(table27, table5091341, articleFactoryFunc);
    }
    var that = this;
    
    that.Table27 = table27;
    that.Table5091341 = table5091341;
    that.articleFactoryFunc = articleFactoryFunc;

    that.forEachArticleToImport = function (iteratorFunc) {

        
        that.Table27.forEach(function (row27) {
            
            var articleNr = row27['Nr.'];
            var row5091341 = that.Table5091341.findWhere({ 'Artikelnr.' : articleNr });
            
            var searchCriteria = { id: articleNr };

            that.articleFactoryFunc( searchCriteria,
                                     function (err, article_model) {
                                        if (article_model != null) {

                                            var filledArticle = fillArticleModel(article_model, row27, row5091341);

                                            iteratorFunc(filledArticle);
                                        }
                                    });
        });
        
        
        
        return that;
    }

    var fillArticleModel = function (article_model, row27, row5091341){

        article_model.id                     = row27['Nr.'                       ];
        article_model.category               = (row5091341 != null)
                                                  ? row5091341['Klasse'] : ""     ;
        article_model.category2              = ""                                 ;  // evl. Obergruppencode + Gruppencode + Untergruppencode ( '-' dazwischen)
        article_model.lieferant              = row27['Hauptlieferant'            ];
        article_model.externeId              = row27['Herstellerartikelnummer'   ];
        article_model.zentralArtikel         = null                               ;  // TBD
                                            
        article_model.brand                  = ""                                 ;  // leer (evtl.Hersteller)
        article_model.name                   = row27['Beschreibung'              ];
        article_model.description            = row27['Beschreibung'              ] 
                                             + row27['Beschreibung2'             ] 
                                             + row27['Beschreibung3'             ];
        article_model.marketingText          = ""                                 ;  // leer
        article_model.mehrWertSteuerSatz     = row27['MWSt Produktbuchungsgruppe'];
        article_model.packungsEinheit        = row27['Verkaufseinheit'           ];
        article_model.packungsInhalt         = null                               ;  // TBD
        article_model.verkaufsEinheit        = ""                                 ;  // TBD
        article_model.preisBezugsGroesse     = row27['Basiseinheitencode'        ];
        article_model.verkaufsPreis          = null                               ;  // TBD
        article_model.gewicht                = null                               ;  // TBD
        article_model.gebindeArtikel         = null                               ;  // TBD
        article_model.gewichtsVariabel       = row27['Variable Mengeneinheit'    ];  // TBD
        article_model.wiegeArtikel           = null                               ;  // TBD
        article_model.vorbestellArtikel      = null                               ;  // TBD
        article_model.internetArtikel        = null                               ;  // TBD
        article_model.internetKategorie      = ""                                 ;  // TBD
        article_model.LebensmittelVerordnung = null                               ;  // TBD
        article_model.filenameBild           = ""                                 ;  // TBD

        article_model.lieferant = row27['Hauptlieferant'];
        
        return article_model;
    }
 }
