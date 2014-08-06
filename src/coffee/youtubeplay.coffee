class window.YouTubePlayer
  constructor: (videoURLs) ->
    @videoURLs = videoURLs.map (redditLink)=>
      @idfromUrl(redditLink.get('videoUrl'))
    @videoURLs = _.compact(@videoURLs)

#    @videoURLs = ["http://www.youtube.com/v/yBl3CIaUW-g?enablejsapi=1&playerapiid=ytplayer&version=3"]
#    @videoURLs = ['yBl3CIaUW-g']
    window.onYouTubePlayerReady = (playerId)=>
      @ytplayer = document.getElementById("myytplayer");
      @ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
      @ytplayer.playVideo()
    window.onytplayerStateChange = (newState)=>
      if newState == 0
        @currentVideoIndex++
        @ytplayer.loadVideoById(@videoURLs[@currentVideoIndex])

  start: ->
    return if @videoURLs.empty
    params = { allowScriptAccess: "always" }
    atts = { id: "myytplayer" }
    @currentVideoIndex = 11
    swfobject.embedSWF(@buildYouTubeUrl(@videoURLs[@currentVideoIndex]), "ytapiplayer", "425", "356", "8", null, null, params, atts);

  buildYouTubeUrl: (videoId)->
    "http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=ytplayer&version=3"

  idfromUrl: (url)->
    regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    match = url.match(regExp)
    if (match && match[2].length == 11)
      match[2]
