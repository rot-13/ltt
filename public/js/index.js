(function() {
  window.App = new Backbone.Marionette.Application();

  App.Models = {};

  App.Views = {};

  App.on("start", function() {
    App.links = new App.Models.RedditLinksCollection;
    App.addRegions({
      player: '#player'
    });
    return $.getJSON("//reddit.com/r/listentothis/hot.json?jsonp=?").done(function(response) {
      var height, ids, link, redditLink, width, _i, _len, _ref, _ref1;
      _ref = response.data.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if ((_ref1 = link.data.domain) === "www.youtube.com" || _ref1 === "m.youtube.com" || _ref1 === "youtube.com" || _ref1 === "youtu.be") {
          redditLink = new App.Models.RedditLink({
            redditUrl: "http://reddit.com" + link.data.permalink,
            youtubeId: getYoutubeId(link.data.url),
            title: link.data.title,
            videoUrl: link.data.url
          });
          App.links.add(redditLink);
        }
      }
      ids = App.links.pluck('youtubeId');
      width = App.player.$el.width();
      height = App.player.$el.height();
      return App.player.show(new App.Views.YoutubeView({
        width: width,
        height: height,
        ids: ids
      }));
    });
  });

  $(function() {
    return App.start();
  });

}).call(this);
