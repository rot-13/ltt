class App.Services.YouTubePlayer

  constructor: (redditLinks) ->
    @redditLinks = redditLinks

    window.onYouTubePlayerReady = () =>
      @ytplayer = document.getElementById("myytplayer")
      @ytplayer.addEventListener("onStateChange", "onytplayerStateChange")
      @ytplayer.playVideo()

    window.onytplayerStateChange = (newState)=>
      if newState == 0
        @playNextVideo()

  start: ->
    return if @redditLinks.empty
    @currentVideoIndex = 0
    params = { allowScriptAccess: "always" }
    atts = { id: "myytplayer" }
    youtubeId = @redditLinks.at(@currentVideoIndex).get("youtubeId")
    youtubeUrl = "http://www.youtube.com/v/" + youtubeId + "?enablejsapi=1&playerapiid=ytplayer&version=3"
    swfobject.embedSWF(youtubeUrl, "player", "500", "400", "8", null, null, params, atts);

  playNextVideo: () =>
    @currentVideoIndex++
    @ytplayer.loadVideoById(@redditLinks.at(@currentVideoIndex).get("youtubeId"))

