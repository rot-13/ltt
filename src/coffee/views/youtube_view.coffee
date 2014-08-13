class App.Views.YoutubeView extends Backbone.Marionette.ItemView

  BASE_URL = 'https://www.youtube.com/embed'

  template: _.template("")
  tagName: 'iframe'

  onRender: ->
    @$el.attr(width: @options.width)
    @$el.attr(height: @options.height)
    @$el.attr(frameborder: 0)
    @$el.attr(src: @_embeddedPlayerURL())

  _embeddedPlayerURL: ->
    firstId = _.first(@options.ids)
    allIds  = @options.ids.join(',')

    "#{BASE_URL}/#{firstId}?autoplay=1&playlist=#{allIds}"
