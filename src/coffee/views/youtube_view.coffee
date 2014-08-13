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
    firstId = _.first(@options.ids)
    allIds  = _.last(@options.ids, @options.ids.length - 1).join(',')

    params =
      autoplay: 1
      playlist: allIds
      controls: 1
      fs: 0
      autohide: 0
      modestbranding: 1
      rel: 0
      showinfo: 0

    "#{BASE_URL}/#{firstId}?#{$.param(params)}"
