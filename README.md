# Altmetric

Node app to query [Altmetric API](http://api.altmetric.com/). Article list is obtained from a MongoDB, which is then used to query via DOI or PMID for Altmetric data. All article data is then downloaded in a CSV.

## Getting Started
Data must be in a MongoDB with schema below. Use config.js.ex to create config.js. 
 
 `
{
    ids: {
        doi: '',
        pmid: ''
    }
}
 `
