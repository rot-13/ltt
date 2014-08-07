window.App = new Backbone.Marionette.Application()

App.Models = {}
App.Views = {}
App.Services = {}

App.on "start", ->

  App.links = new App.Models.RedditLinksCollection

  $.getJSON("//reddit.com/r/listentothis/hot.json?jsonp=?").done (response) ->

    for link in response.data.children
      if link.data.domain in ["www.youtube.com", "m.youtube.com", "youtube.com", "youtu.be"]
        redditLink = new App.Models.RedditLink
          redditUrl: "http://reddit.com#{link.data.permalink}"
          youtubeId: getYoutubeId(link.data.url)
          title: link.data.title
          videoUrl: link.data.url

      App.links.add(redditLink)

    App.player = new App.Services.YouTubePlayer(App.links)
    App.player.start()

    $(".next-button").on "click", App.player.playNextVideo

$ ->
  App.start()