var request = require('request');

var altmetricApi = 'http://api.altmetric.com/';
var almetricApiDoiPath = '/v1/doi/';
var almetricApiPmidPath = '/v1/pmid/';

var handleAltmetricResponse = function(almetricJson, found, cb) {
    var result = {};
    if (almetricJson){
        // console.log('almetricJson',almetricJson);
        result.found = found ? 'Yes' : 'No';
        result.score = almetricJson.score ? almetricJson.score : '';
        result.title = almetricJson.title ? almetricJson.title : '';
        result.journal = almetricJson.journal ? almetricJson.journal : '';
        result.url = almetricJson.url ? almetricJson.url : '';
        result.last_updated = almetricJson.last_updated ? new Date(almetricJson.last_updated * 1000).toUTCString().replace(',', '') : '';
        result.doi = almetricJson.doi ? almetricJson.doi : '';
        result.handle = almetricJson.handle ? almetricJson.handle : '';
        result.pmid = almetricJson.pmid ? almetricJson.pmid : '';
        result.arxiv_id = almetricJson.arxiv_id ? almetricJson.arxiv_id : '';
        result.redit_threads = almetricJson.cited_by_rdts_count ? almetricJson.cited_by_rdts_count : '';
        result.bloggers = almetricJson.cited_by_feeds_count ? almetricJson.cited_by_feeds_count : '';
        result.tweeters = almetricJson.cited_by_tweeters_coun ? almetricJson.cited_by_tweeters_count : '';
        result.google_plus = almetricJson.cited_by_gplus_count ? almetricJson.cited_by_gplus_count : '';
        result.news = almetricJson.cited_by_msm_count ? almetricJson.cited_by_msm_count : '';
        result.facebook = almetricJson.cited_by_fbwalls_count ? almetricJson.cited_by_fbwalls_count : '';
        result.wikipedia = almetricJson.cited_by_wikipedia_count ? almetricJson.cited_by_wikipedia_count : '';
        result.mendeley = almetricJson.readers && almetricJson.readers.mendeley ? almetricJson.readers.mendeley : '';
        result.citeulike = almetricJson.readers && almetricJson.readers.citeulike ? almetricJson.readers.citeulike : '';
        result.connotea = almetricJson.readers && almetricJson.readers.connotea ? almetricJson.readers.connotea : '';
        result.score_pct_journal = almetricJson.context && almetricJson.context.journal.pct ? almetricJson.context.journal.pct : '';
        result.score_pct_all = almetricJson.context && almetricJson.context.all.pct ? almetricJson.context.all.pct : '';
        result.score_pct_journal_similar = almetricJson.context && almetricJson.context.similar_age_journal_3m.pct ? almetricJson.context.similar_age_journal_3m.pct : '';
        result.score_pct_article_similar = almetricJson.context && almetricJson.context.similar_age_3m.pct ? almetricJson.context.similar_age_3m.pct : '';
        result.image_small = almetricJson.images && almetricJson.images.small ? almetricJson.images.small : '';
        result.image_medium = almetricJson.images &&  almetricJson.images.medium ? almetricJson.images.medium : '';
        result.altmetric_id = almetricJson.altmetric_id ? almetricJson.altmetric_id : '';

        result.issns = '';
        if (almetricJson.issns){
            almetricJson.issns.forEach(function(issn){
                result.issns += issn + ' ';
            });
            result.issns = result.issns.trim();
        }
    }

    cb(result);
};

var queryAlmetricDoi = function(ids, cb) {
    if(ids.doi){
        var doi = ids.doi.replace('http://dx.doi.org/', '');
        var url = altmetricApi + almetricApiDoiPath + doi;
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                handleAltmetricResponse(body, true, function(result){
                    if(result){
                        console.log(result.score);
                        cb(null, result);
                    }
                });
            } else if(response.statusCode === 404){
                console.error('404! DOI: ' + doi);
                cb(null);
            } else if(error){
                console.error('Altmetric API error: ' + doi, error);
                cb(error);
            }
        });
    } else{
        cb(null);
    }
};


var queryAlmetricPmid = function(ids, cb) {
    if(ids.pmid){
        var pmid = ids.pmid;
        var url = altmetricApi + almetricApiPmidPath + pmid;
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                handleAltmetricResponse(body, true, function(result){
                    if(result){
                        console.log(result.score);
                        cb(null, result);
                    }
                });
            } else if(response.statusCode === 404){
                console.error('404! PMID: ' + pmid);
                cb(null);
            } else if(error){
                console.error('Altmetric API error: ' + pmid, error);
                cb(error);
            }
        });
    } else{
        cb(null);
    }
};

module.exports = {
    queryAlmetricDoi: queryAlmetricDoi,
    queryAlmetricPmid: queryAlmetricPmid,
    handleAltmetricResponse: handleAltmetricResponse
};
