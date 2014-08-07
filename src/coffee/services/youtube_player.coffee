class App.Services.YouTubePlayer

  constructor: (redditLinks) ->
    @redditLinks = redditLinks

    window.onYouTubePlayerReady = (_) =>
      @ytplayer = document.getElementById("myytplayer")
      @ytplayer.addEventListener("onStateChange", "onytplayerStateChange")
      @ytplayer.playVideo()
    window.onytplayerStateChange = (newState)=>
      if newState == 0
        @currentVideoIndex++
        @ytplayer.loadVideoById(@redditLinks.at(@currentVideoIndex).get("youtubeId"))

  start: ->
    return if @redditLinks.empty
    params = { allowScriptAccess: "always" }
    atts = { id: "myytplayer" }
    @currentVideoIndex = 0
    swfobject.embedSWF(@buildYouTubeUrl(@redditLinks.at(@currentVideoIndex).get("youtubeId")), "player", "500", "400", "8", null, null, params, atts);

  buildYouTubeUrl: (videoId)->
    "http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=ytplayer&version=3"
