class App.Models.RedditLink extends Backbone.Model

  defaults:
    linkUrl: null
    youtubeId: null
    title: null
    redditUrl: null

class App.Models.RedditLinksCollection extends Backbone.Collection
  model: App.Models.RedditLink