class App.Models.RedditLink extends Backbone.Model

  defaults:
    linkUrl: null
    title: null
    redditUrl: null

class App.Collections.RedditLinksCollection extends Backbone.Collection
  model: App.Models.RedditLink