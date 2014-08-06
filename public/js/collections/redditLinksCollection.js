(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Collections.RedditLinksCollection = (function(_super) {
    __extends(RedditLinksCollection, _super);

    function RedditLinksCollection() {
      _ref = RedditLinksCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RedditLinksCollection.prototype.model = App.Models.RedditLink;

    return RedditLinksCollection;

  })(Backbone.Collection);

}).call(this);
