this.recline = this.recline || {};
this.recline.Backend = this.recline.Backend || {};
this.recline.Backend.Solr = this.recline.Backend.Solr || {};

(function($, my) {
  my.__type__ = 'solr';

  // use either jQuery or Underscore Deferred depending on what is available
  var Deferred = _.isUndefined(this.jQuery) ? _.Deferred : jQuery.Deferred;

  // ### fetch
  //
  // dataset must have a solr or url attribute pointing to solr endpoint
  my.fetch = function(dataset) {
    return my.query({}, dataset);
  };

  // TODO - much work on proper query support is needed!!
  my.query = function(queryObj, dataset) {
    var q = queryObj.q || '*:*';
    var data = {
      q: q,
      rows: queryObj.size || 10,
      start: queryObj.from || 0,
      wt: 'json'
    };
    var jqxhr = $.ajax({
      url: dataset.solr || dataset.url,
      data: data,
      dataType: 'jsonp',
      jsonp: 'json.wrf'
    });
    var dfd = new Deferred();
    jqxhr.done(function(results) {
      // if we get 0 results we cannot get fields
      var fields = []
      if (results.response.numFound > 0) {
        fields =  _.map(_.keys(results.response.docs[0]), function(fieldName) {
          return { id: fieldName };
        });
      }
      var out = {
        fields: fields,
        total: results.response.numFound,
        records: results.response.docs
      };
      dfd.resolve(out);  
    });
    return dfd.promise();
  };

}(jQuery, this.recline.Backend.Solr));
