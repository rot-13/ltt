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
      var ids, link, redditLink, _i, _len, _ref, _ref1;
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
      return App.player.show(new App.Views.YoutubeView({
        ids: ids
      }));
    });
  });

  $(function() {
    return App.start();
  });

}).call(this);

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

(function() {
  window.getYoutubeId = function(url) {
    var getLocation, getParam, location;
    getLocation = function(url) {
      var a;
      a = document.createElement("a");
      a.href = url;
      return a;
    };
    getParam = function(search, name) {
      var regex, results;
      regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      results = regex.exec(location);
      if (results === null) {
        return "";
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
      }
    };
    location = getLocation(url);
    if (location.hostname === "youtu.be") {
      return location.pathname.slice(1);
    } else if (location.pathname === "/attribution_link") {
      return getParam(getParam(location.search("u"), "v"));
    } else {
      return getParam(location.search, "v");
    }
  };

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.YoutubeView = (function(_super) {
    var BASE_URL;

    __extends(YoutubeView, _super);

    function YoutubeView() {
      _ref = YoutubeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BASE_URL = 'https://www.youtube.com/embed';

    YoutubeView.prototype.template = _.template("");

    YoutubeView.prototype.tagName = 'iframe';

    YoutubeView.prototype.onRender = function() {
      this.$el.attr({
        width: '100%'
      });
      this.$el.attr({
        height: '100%'
      });
      this.$el.attr({
        frameborder: 0
      });
      return this.$el.attr({
        src: this._embeddedPlayerURL()
      });
    };

    YoutubeView.prototype._embeddedPlayerURL = function() {
      var allIds, firstId, params;
      firstId = _.first(this.options.ids);
      allIds = _.last(this.options.ids, this.options.ids.length - 1).join(',');
      params = {
        autoplay: 1,
        playlist: allIds,
        controls: 1,
        fs: 0,
        autohide: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      };
      return "" + BASE_URL + "/" + firstId + "?" + ($.param(params));
    };

    return YoutubeView;

  })(Backbone.Marionette.ItemView);

}).call(this);

(function() {
  window.App = new Backbone.Marionette.Application();

  App.Models = {};

  App.Views = {};

  App.on("start", function() {
    var links;
    App.addRegions({
      player: '.player',
      playlist: '.playlist'
    });
    links = new App.Models.RedditLinksCollection;
    return $.getJSON("//reddit.com/r/listentothis/hot.json?jsonp=?").done(function(response) {
      var link, redditLink, _i, _len, _ref, _ref1;
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
          links.add(redditLink);
        }
      }
      App.player.show(new App.Views.YoutubeView({
        collection: links
      }));
      return App.playlist.show(new App.Views.PlaylistView({
        collection: links
      }));
    });
  });

  $(function() {
    return App.start();
  });

}).call(this);

(function() {
  window.App = new Backbone.Marionette.Application();

  App.Models = {};

  App.Views = {};

  $(function() {
    var links;
    App.addRegions({
      player: '.player',
      playlist: '.playlist'
    });
    links = new App.Models.RedditLinksCollection;
    return $.getJSON('//reddit.com/r/listentothis/hot.json?limit=40&jsonp=?').done(function(response) {
      var link, redditLink, _i, _len, _ref, _ref1;
      _ref = response.data.children;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        link = _ref[_i];
        if ((_ref1 = link.data.domain) === 'www.youtube.com' || _ref1 === 'm.youtube.com' || _ref1 === 'youtube.com' || _ref1 === 'youtu.be') {
          redditLink = new App.Models.RedditLink({
            redditUrl: "http://reddit.com" + link.data.permalink,
            youtubeId: getYoutubeId(link.data.url),
            title: link.data.title,
            videoUrl: link.data.url
          });
          links.add(redditLink);
        }
      }
      App.player.show(new App.Views.YoutubeView({
        collection: links
      }));
      return App.playlist.show(new App.Views.PlaylistView({
        collection: links
      }));
    });
  });

}).call(this);

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

(function() {
  window.getYoutubeId = function(url) {
    var match, regExp;
    regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    }
  };

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.PlaylistRowView = (function(_super) {
    __extends(PlaylistRowView, _super);

    function PlaylistRowView() {
      _ref = PlaylistRowView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlaylistRowView.prototype.template = _.template("<div class='title'><strong><%= index %>.</strong> <span><%= title %></span></div><div class='link' title='See in Reddit'>➜</div>");

    PlaylistRowView.prototype.tagName = 'li';

    PlaylistRowView.prototype.events = {
      'click .title': '_onSongClick',
      'click .link': '_onLinkClick'
    };

    PlaylistRowView.prototype.serializeData = function() {
      return {
        title: this._playlistTitle(),
        index: this._playlistIndex() + 1
      };
    };

    PlaylistRowView.prototype._playlistTitle = function() {
      return this.model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-');
    };

    PlaylistRowView.prototype._playlistIndex = function() {
      return this.model.collection.indexOf(this.model);
    };

    PlaylistRowView.prototype._onSongClick = function() {
      if (this.$el.hasClass('playing')) {
        return;
      }
      return App.trigger('playlist:selected', this._playlistIndex());
    };

    PlaylistRowView.prototype._onLinkClick = function() {
      return window.open(this.model.get('redditUrl'), '_blank');
    };

    return PlaylistRowView;

  })(Backbone.Marionette.ItemView);

  App.Views.PlaylistView = (function(_super) {
    __extends(PlaylistView, _super);

    function PlaylistView() {
      _ref1 = PlaylistView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PlaylistView.prototype.childView = App.Views.PlaylistRowView;

    PlaylistView.prototype.tagName = 'ul';

    PlaylistView.prototype.edgeBorderTemplate = "<div class='ul-border'></div>";

    PlaylistView.prototype.ANIMATION_DURATION = 300;

    PlaylistView.prototype.ROW_HEIGHT = 30;

    PlaylistView.prototype.initialize = function() {
      return this.listenTo(App, 'youtube:playing', this._onYoutubePlaying);
    };

    PlaylistView.prototype.onShow = function() {
      this.$el.parent().prepend(this.edgeBorderTemplate);
      return this.$el.parent().append(this.edgeBorderTemplate);
    };

    PlaylistView.prototype._onYoutubePlaying = function(index) {
      var offset, playingRow;
      playingRow = this.$el.find('li').removeClass('playing').eq(index);
      playingRow.addClass('playing');
      offset = 30 * (index - 1);
      return this.$el.animate({
        scrollTop: offset
      }, this.ANIMATION_DURATION);
    };

    return PlaylistView;

  })(Backbone.Marionette.CollectionView);

}).call(this);

(function() {
  var _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.ShareView = (function(_super) {
    __extends(ShareView, _super);

    function ShareView() {
      _ref = ShareView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ShareView.prototype.template = _.template('<strong><%= index %>.</strong> <span><%= title %></span>');

    ShareView.prototype.tagName = 'li';

    ShareView.prototype.events = {
      'click': '_onClick'
    };

    ShareView.prototype.serializeData = function() {
      return {
        title: this._playlistTitle(),
        index: this._playlistIndex() + 1
      };
    };

    ShareView.prototype._playlistTitle = function() {
      return this.model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-');
    };

    ShareView.prototype._playlistIndex = function() {
      return this.model.collection.indexOf(this.model);
    };

    ShareView.prototype._onClick = function() {
      if (this.$el.hasClass('playing')) {
        return;
      }
      return App.trigger('playlist:selected', this._playlistIndex());
    };

    return ShareView;

  })(Backbone.Marionette.ItemView);

  App.Views.PlaylistView = (function(_super) {
    __extends(PlaylistView, _super);

    function PlaylistView() {
      _ref1 = PlaylistView.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    PlaylistView.prototype.childView = App.Views.PlaylistRowView;

    PlaylistView.prototype.tagName = 'ul';

    PlaylistView.prototype.edgeBorderTemplate = "<div class='ul-border'></div>";

    PlaylistView.prototype.ANIMATION_DURATION = 300;

    PlaylistView.prototype.ROW_HEIGHT = 30;

    PlaylistView.prototype.initialize = function() {
      return this.listenTo(App, 'youtube:playing', this._onYoutubePlaying);
    };

    PlaylistView.prototype.onShow = function() {
      this.$el.parent().prepend(this.edgeBorderTemplate);
      return this.$el.parent().append(this.edgeBorderTemplate);
    };

    PlaylistView.prototype._onYoutubePlaying = function(index) {
      var offset, playingRow;
      playingRow = this.$el.find('li').removeClass('playing').eq(index);
      playingRow.addClass('playing');
      offset = 30 * (index - 1);
      return this.$el.animate({
        scrollTop: offset
      }, this.ANIMATION_DURATION);
    };

    return PlaylistView;

  })(Backbone.Marionette.CollectionView);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  App.Views.YoutubeView = (function(_super) {
    var BASE_URL;

    __extends(YoutubeView, _super);

    function YoutubeView() {
      _ref = YoutubeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BASE_URL = 'https://www.youtube.com/embed';

    YoutubeView.prototype.template = _.template('');

    YoutubeView.prototype.tagName = 'iframe';

    YoutubeView.prototype.id = 'youtube';

    YoutubeView.prototype.initialize = function() {
      return this.listenTo(App, 'playlist:selected', this._onPlaylistSelected);
    };

    YoutubeView.prototype.onRender = function() {
      this._addPlayerAttributes();
      return this._addJavascriptAPI();
    };

    YoutubeView.prototype._addPlayerAttributes = function() {
      return this.$el.attr({
        width: '100%',
        height: '100%',
        frameborder: 0,
        src: this._embeddedPlayerURL()
      });
    };

    YoutubeView.prototype._addJavascriptAPI = function() {
      var firstScriptTag, tag,
        _this = this;
      tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      return window.onYouTubeIframeAPIReady = function() {
        return _this._onYoutubeReady();
      };
    };

    YoutubeView.prototype._onYoutubeReady = function() {
      return this.API = new YT.Player('youtube', {
        events: {
          onStateChange: function(event) {
            if (event.data !== 1) {
              return;
            }
            return App.trigger('youtube:playing', event.target.getPlaylistIndex());
          }
        }
      });
    };

    YoutubeView.prototype._onPlaylistSelected = function(index) {
      if (this.API) {
        return this.API.playVideoAt(index);
      }
    };

    YoutubeView.prototype._embeddedPlayerURL = function() {
      var allIds, firstId, ids, params;
      ids = this.collection.pluck('youtubeId');
      firstId = _.first(ids);
      allIds = _.last(ids, ids.length - 1).join(',');
      params = {
        autoplay: 1,
        playlist: allIds,
        controls: 1,
        fs: 0,
        autohide: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        loop: 1,
        version: 3,
        enablejsapi: 1
      };
      return "" + BASE_URL + "/" + firstId + "?" + ($.param(params));
    };

    return YoutubeView;

  })(Backbone.Marionette.ItemView);

}).call(this);
