(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Models.RedditLink = (function(_super) {
    __extends(RedditLink, _super);

    function RedditLink() {
      _ref = RedditLink.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RedditLink.prototype["default"] = {
      linkUrl: null,
      title: null,
      redditUrl: null
    };

    return RedditLink;

  })(Backbone.Model);

}).call(this);
