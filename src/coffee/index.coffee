window.App = new Backbone.Marionette.Application()

App.Models = {}
App.Views = {}

App.on "start", ->

  App.links = new App.Models.RedditLinksCollection

  App.addRegions
    player: '#player'

  $.getJSON("//reddit.com/r/listentothis/hot.json?jsonp=?").done (response) ->

    for link in response.data.children
      if link.data.domain in ["www.youtube.com", "m.youtube.com", "youtube.com", "youtu.be"]
        redditLink = new App.Models.RedditLink
          redditUrl: "http://reddit.com#{link.data.permalink}"
          youtubeId: getYoutubeId(link.data.url)
          title:     link.data.title
          videoUrl:  link.data.url

        App.links.add(redditLink)

    ids = App.links.pluck('youtubeId')
    App.player.show(new App.Views.YoutubeView(ids: ids))

$ -> App.start()