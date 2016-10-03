var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var MongoClient = require('mongodb').MongoClient;
var config = require('../config');

var devMode = process.env.NODE_ENV= 'development' ? true : false;
var journalSettings = devMode ? config.journalSettingsDev : config.journalSettings;
// console.log('journalSettings',journalSettings);
var port = process.env.PORT || 8080;

var getArticles = function(journal, query, projection, cb){
    var dbUrl = journalSettings[journal].dbUrl;
    var dbName = journalSettings[journal].mongo.name;
    var dbUser = journalSettings[journal].mongo.user;
    var dbPw = journalSettings[journal].mongo.password;
    var dbServer = journalSettings[journal].mongo.server;
    var dbPort= journalSettings[journal].mongo.port;

    var db = new Db(dbName, new Server(dbServer, dbPort));
    // Establish connection to db
    db.open(function(err, db) {
        if(err){
            console.error('DB Connection ERROR.',err);
            cb(err);
        }else{
            if (devMode){
                processArticlesQuery(db, query, projection, function(queryError, queryRes){
                    if (queryError){
                        console.error('queryError',queryError);
                    } else if(queryRes){
                        // console.log('queryRes',queryRes.length);
                        cb(null, queryRes);
                    }
                });
            } else {
                // Authenticate
                db.authenticate(dbUser, dbPw, function(authenticateError, userAuthenticated) {
                    if(authenticateError){
                        console.error(authenticateError);
                    }else if(userAuthenticated){
                        processArticlesQuery(db, query, projection, function(queryError, queryRes){
                            if (queryError){
                                console.error('queryError',queryError);
                            } else if(queryRes){
                                // console.log('queryRes',queryRes.length);
                                cb(null, queryRes);
                            }
                        });
                    }
                });
            }
        }
    });
};

var processArticlesQuery = function(db, query, projection, cb){
    db.collection('articles').find(query, projection).toArray(function(articlesErr, articles){
        if(articlesErr){
            cb(articlesErr);
        }else if(articles){
            // cb(null,articles.slice(0,1)); //local testing
            cb(null,articles);
        }else{
            cb(null,null);
        }
    });
};

module.exports = {
    getArticles: getArticles,
    processArticlesQuery: processArticlesQuery
};
