module.exports = {
    makeCsv: function(articlesData){
        var resultCsvString = '';
        resultCsvString += '"Found at Altmetric"';
        resultCsvString += ',"Score"';
        resultCsvString += ',"Title"';
        resultCsvString += ',"Journal"';
        resultCsvString += ',"URL"';
        resultCsvString += ',"Most recent mention"';
        resultCsvString += ',"DOI"';
        resultCsvString += ',"Handle"';
        resultCsvString += ',"PMID"';
        resultCsvString += ',"ArXiv ID"';
        resultCsvString += ',"Reddit threads"';
        resultCsvString += ',"Bloggers"';
        resultCsvString += ',"Tweeters"';
        resultCsvString += ',"Google+ authors"';
        resultCsvString += ',"News outlets"';
        resultCsvString += ',"Facebook walls"';
        resultCsvString += ',"Wikipedia pages"';
        resultCsvString += ',"Mendeley readers"';
        resultCsvString += ',"CiteULike readers"';
        resultCsvString += ',"Connotea readers"';
        resultCsvString += ',"Score percentile (journal)"';
        resultCsvString += ',"Score percentile (all)"';
        resultCsvString += ',"Score percentiles (journal, same age)"';
        resultCsvString += ',"Score percentile (all, same age)"';
        resultCsvString += ',"Small image"';
        resultCsvString += ',"Medium image"';
        resultCsvString += ',"Journal ISSNs"';
        resultCsvString += ',"Altmetric ID"';

        articlesData.forEach(function(a){
            resultCsvString += '\r\n';
            resultCsvString += '"' + a.found+ '"';
            resultCsvString += ',"' + a.score+ '"';
            resultCsvString += ',"' + a.title+ '"';
            resultCsvString += ',"' + a.journal+ '"';
            resultCsvString += ',"' + a.url+ '"';
            resultCsvString += ',"' + a.last_updated+ '"';
            resultCsvString += ',"' + a.doi+ '"';
            resultCsvString += ',"' + a.handle+ '"';
            resultCsvString += ',"' + a.pmid+ '"';
            resultCsvString += ',"' + a.arxiv_id+ '"';
            resultCsvString += ',"' + a.redit_threads+ '"';
            resultCsvString += ',"' + a.bloggers+ '"';
            resultCsvString += ',"' + a.tweeters+ '"';
            resultCsvString += ',"' + a.google_plus+ '"';
            resultCsvString += ',"' + a.news+ '"';
            resultCsvString += ',"' + a.facebook+ '"';
            resultCsvString += ',"' + a.wikipedia+ '"';
            resultCsvString += ',"' + a.mendeley+ '"';
            resultCsvString += ',"' + a.citeulike+ '"';
            resultCsvString += ',"' + a.connotea+ '"';
            resultCsvString += ',"' + a.score_pct_journal+ '"';
            resultCsvString += ',"' + a.score_pct_all+ '"';
            resultCsvString += ',"' + a.score_pct_journal_similar+ '"';
            resultCsvString += ',"' + a.score_pct_article_similar+ '"';
            resultCsvString += ',"' + a.image_small+ '"';
            resultCsvString += ',"' + a.image_medium+ '"';
            resultCsvString += ',"' + a.issns+ '"';
            resultCsvString += ',"' + a.altmetric_id+ '"';
        });

        return resultCsvString;
    }
};
