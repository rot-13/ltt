(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Services.YouTubePlayer = (function() {
    function YouTubePlayer(redditLinks) {
      this.playNextVideo = __bind(this.playNextVideo, this);
      var _this = this;
      this.redditLinks = redditLinks;
      window.onYouTubePlayerReady = function() {
        _this.ytplayer = document.getElementById("myytplayer");
        _this.ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
        return _this.ytplayer.playVideo();
      };
      window.onytplayerStateChange = function(newState) {
        if (newState === 0) {
          return _this.playNextVideo();
        }
      };
    }

    YouTubePlayer.prototype.start = function() {
      var atts, params, youtubeId, youtubeUrl;
      if (this.redditLinks.empty) {
        return;
      }
      this.currentVideoIndex = 0;
      params = {
        allowScriptAccess: "always"
      };
      atts = {
        id: "myytplayer"
      };
      youtubeId = this.redditLinks.at(this.currentVideoIndex).get("youtubeId");
      youtubeUrl = "http://www.youtube.com/v/" + youtubeId + "?enablejsapi=1&playerapiid=ytplayer&version=3";
      return swfobject.embedSWF(youtubeUrl, "player", "500", "400", "8", null, null, params, atts);
    };

    YouTubePlayer.prototype.playNextVideo = function() {
      this.currentVideoIndex++;
      return this.ytplayer.loadVideoById(this.redditLinks.at(this.currentVideoIndex).get("youtubeId"));
    };

    return YouTubePlayer;

  })();

}).call(this);
