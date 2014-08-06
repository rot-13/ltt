(function() {
  window.YouTubePlayer = (function() {
    function YouTubePlayer(videoURLs) {
      var _this = this;
      this.videoURLs = videoURLs.map(function(redditLink) {
        return _this.idfromUrl(redditLink.get('videoUrl'));
      });
      this.videoURLs = _.compact(this.videoURLs);
      console.log(this.videoURLs);
      window.onYouTubePlayerReady = function(playerId) {
        _this.ytplayer = document.getElementById("myytplayer");
        _this.ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
        return _this.ytplayer.playVideo();
      };
      window.onytplayerStateChange = function(newState) {
        if (newState === 0) {
          _this.currentVideoIndex++;
          return _this.ytplayer.loadVideoById(_this.videoURLs[_this.currentVideoIndex]);
        }
      };
    }

    YouTubePlayer.prototype.start = function() {
      var atts, params;
      if (this.videoURLs.empty) {
        return;
      }
      params = {
        allowScriptAccess: "always"
      };
      atts = {
        id: "myytplayer"
      };
      this.currentVideoIndex = 11;
      return swfobject.embedSWF(this.buildYouTubeUrl(this.videoURLs[this.currentVideoIndex]), "ytapiplayer", "425", "356", "8", null, null, params, atts);
    };

    YouTubePlayer.prototype.buildYouTubeUrl = function(videoId) {
      return "http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=ytplayer&version=3";
    };

    YouTubePlayer.prototype.idfromUrl = function(url) {
      var match, regExp;
      regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      match = url.match(regExp);
      if (match && match[2].length === 11) {
        return match[2];
      }
    };

    return YouTubePlayer;

  })();

}).call(this);
