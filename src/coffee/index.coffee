window.App = new Backbone.Marionette.Application()

App.Models = {}
App.Views = {}

$ ->
  App.addRegions
    player: '.player'
    playlist: '.playlist'

  links = new App.Models.RedditLinksCollection

  $.getJSON('//reddit.com/r/listentothis/hot.json?jsonp=?').done (response) ->
    for link in response.data.children
      if link.data.domain in ['www.youtube.com', 'm.youtube.com', 'youtube.com', 'youtu.be']
        redditLink = new App.Models.RedditLink
          redditUrl: "http://reddit.com#{link.data.permalink}"
          youtubeId: getYoutubeId(link.data.url)
          title:     link.data.title
          videoUrl:  link.data.url

        links.add(redditLink)

    App.player.show(new App.Views.YoutubeView(collection: links))
    App.playlist.show(new App.Views.PlaylistView(collection: links))
