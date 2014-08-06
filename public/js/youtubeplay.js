(function() {
  var YouTubePlayer;

  YouTubePlayer = (function() {
    function YouTubePlayer(videoURLs) {
      this.videoURLs = videoURLs != null ? videoURLs : ["http://www.youtube.com/v/yBl3CIaUW-g?enablejsapi=1&playerapiid=ytplayer&version=3"];
      window.onYouTubePlayerReady = function(playerId) {
        var ytplayer;
        ytplayer = document.getElementById("myytplayer");
        return ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
      };
      window.onytplayerStateChange = function(newState) {
        if (newState === 0) {
          return alert("Player's new state: " + newState);
        }
      };
    }

    return YouTubePlayer;

  })();

  ({
    start: function() {
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
      this.currentVideoIndex = 0;
      return swfobject.embedSWF(this.videoURLs[this.currentVideoIndex], "ytapiplayer", "425", "356", "8", null, null, params, atts);
    }
  });

}).call(this);
