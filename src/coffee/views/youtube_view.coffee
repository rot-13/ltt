class App.Views.YoutubeView extends Backbone.Marionette.ItemView

  BASE_URL = 'https://www.youtube.com/embed'

  template: _.template("")
  tagName: 'iframe'

  onRender: ->
    @$el.attr(width: '100%')
    @$el.attr(height: '100%')
    @$el.attr(frameborder: 0)
    @$el.attr(src: @_embeddedPlayerURL())

  _embeddedPlayerURL: ->
    ids = @collection.pluck('youtubeId')

    firstId = _.first(ids)
    allIds  = _.last(ids, ids.length - 1).join(',')

    params =
      autoplay: 1
      playlist: allIds
      controls: 1
      fs: 0
      autohide: 0
      modestbranding: 1
      rel: 0
      showinfo: 0
      loop: 1
      version: 3
      enablejsapi: 1

    "#{BASE_URL}/#{firstId}?#{$.param(params)}"
