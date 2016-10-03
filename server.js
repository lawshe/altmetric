var express = require('express');
var async = require('async');
var databaseFxns = require('./fxns/databaseFxns.js');
var altmetricFxns = require('./fxns/altmetricFxns.js');
var generalFxns = require('./fxns/generalFxns.js');
var config = require('./config');

var app = express();
var port = process.env.PORT || 3333;

app.use(express.static('public'));

// to do - also query for artiles with pmid and no doi

app.get('/', function(req, res) {
    res.sendFile(process.env.PWD  + '/templates/home.html');
});


app.get('/:journal', function(req, res) {
    var journal = req.params.journal;
    var query = { $or: [ { 'ids.doi': { $exists: true } }, { 'ids.pmid': { $exists: true } } ] };
    var projection = {ids:true};
    if(journal && config.journalSettings[journal] && config.journalSettingsDev[journal]){
        databaseFxns.getArticles(journal, query, projection, function(articlesError, articlesRes){
            if (articlesError) {
                console.error('articlesError', articlesError);
            } else if(articlesRes && articlesRes.length > 0){
                async.mapSeries(articlesRes, function(article, map_cb){
                    altmetricFxns.queryAlmetricDoi(article.ids, function(altmetricDoiError, altmetricDoiResult){
                        if (altmetricDoiError) {
                            map_cb(altmetricDoiError);
                        } else if(altmetricDoiResult) {
                            map_cb(null, altmetricDoiResult);
                        } else {
                            altmetricFxns.queryAlmetricPmid(article.ids, function(altmetricPmidError, altmetricPmidResult){
                                if (altmetricPmidError) {
                                    map_cb(altmetricPmidError);
                                } else if (altmetricPmidResult) {
                                    map_cb(null, altmetricPmidResult);
                                } else {
                                    // Not found via DOI or PMID, but we still need the full object with default values for csv
                                    var artIdOb = {};
                                    if (article.ids.doi) {
                                        artIdOb.doi = article.ids.doi;
                                    }
                                    if (article.ids.pmid) {
                                        artIdOb.pmid = article.ids.pmid;
                                    }
                                    altmetricFxns.handleAltmetricResponse(artIdOb, false, function(result){
                                        if(result){
                                            // console.log('..queryAlmetric res', result.doi);
                                            map_cb(null, result);
                                        }
                                    });
                                }
                            });
                        }
                    });
    			}, function(mapError, almetricArticlesData){
                    var csvData = generalFxns.makeCsv(almetricArticlesData);
                    console.log(csvData);
                    res.writeHead(200, {
                        'Content-Type': 'text/csv'
                    });
                    res.write(csvData);
                    res.end();
    			});
            } else {
                res.send('No articles found');
            }
        });
    } else{
        res.sendFile(process.env.PWD  + '/templates/404.html');
    }
});

app.listen(port, function(){

});

console.log("Server started");
