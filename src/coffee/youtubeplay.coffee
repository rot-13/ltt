class window.YouTubePlayer
  constructor: (videoURLs) ->
    @videoURLs = videoURLs.map (redditLink)->
      redditLink.get('videoUrl')

    @videoURLs = ["http://www.youtube.com/v/yBl3CIaUW-g?enablejsapi=1&playerapiid=ytplayer&version=3"]
    window.onYouTubePlayerReady = (playerId)->
      ytplayer = document.getElementById("myytplayer");
      ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
    window.onytplayerStateChange = (newState)->
      if newState == 0
        alert("Player's new state: " + newState);

  start: ->
    return if @videoURLs.empty
    params = { allowScriptAccess: "always" }
    atts = { id: "myytplayer" }
    @currentVideoIndex = 0
    swfobject.embedSWF(@videoURLs[@currentVideoIndex], "ytapiplayer", "425", "356", "8", null, null, params, atts);
