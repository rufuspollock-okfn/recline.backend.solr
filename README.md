A simple javascript library that wraps the SOLR JSON API and conforms to the
[Recline Backend specification][backend].

Part of the [Recline][] suite of data libraries.

[backend]: http://okfnlabs.org/recline/docs/backends.html
[Recline]: http://okfnlabs.org/recline/

## Usage

Get data from the API:

    recline.Backend.Solr.query({
      url: 'url-of-solr-endpoint'
    })
      .done(function(result) {
        // structure of result is below
        console.log(result);
      });

The result of fetch has a convenient structure of the following form:

    result = {
      records: // array of Objects
      fields: // array of Field Objects as per http://www.dataprotocols.org/en/latest/json-table-schema.html
      total: // total number of results
    }

## Dependencies

* underscore
* jQuery (optional) - only if you want ajax requests
* underscore.deferred (optional) - only needed if no jQuery

One of the reasons for the different options is that it ensures you can use
this library in the browser *and* in webworkers (where jQuery does not
function).

