(function() {
  window.App = new Backbone.Marionette.Application();

  App.Models = {};

  App.Collections = {};

  App.Views = {};

  App.on("start", function() {
    App.links = new App.Collections.RedditLinksCollection;
    return $.getJSON("//reddit.com/r/listentothis/hot.json?jsonp=?").done(function(response) {
      var link, redditLink, _i, _len, _ref, _ref1, _results;
      _ref = response.data.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if ((_ref1 = link.data.domain) === "www.youtube.com" || _ref1 === "m.youtube.com" || _ref1 === "youtube.com" || _ref1 === "youtu.be") {
          redditLink = new App.Models.RedditLink({
            redditUrl: "http://reddit.com" + link.data.permalink,
            title: link.data.title,
            videoUrl: link.data.url
          });
        }
        _results.push(App.links.add(redditLink));
      }
      return _results;
    });
  });

  $(function() {
    return App.start();
  });

}).call(this);
