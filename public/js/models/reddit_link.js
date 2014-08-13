(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Models.RedditLink = (function(_super) {
    __extends(RedditLink, _super);

    function RedditLink() {
      _ref = RedditLink.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RedditLink.prototype.defaults = {
      linkUrl: null,
      youtubeId: null,
      title: null,
      redditUrl: null
    };

    return RedditLink;

  })(Backbone.Model);

  App.Models.RedditLinksCollection = (function(_super) {
    __extends(RedditLinksCollection, _super);

    function RedditLinksCollection() {
      _ref1 = RedditLinksCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    RedditLinksCollection.prototype.model = App.Models.RedditLink;

    return RedditLinksCollection;

  })(Backbone.Collection);

}).call(this);
