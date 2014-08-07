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
          title: link.data.title
          videoUrl: link.data.url

      App.links.add(redditLink)

    player = new App.Services.YouTubePlayer(App.links)
    player.start()

$ ->
  App.start()