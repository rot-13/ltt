class App.Views.YoutubeView extends Backbone.Marionette.ItemView

  BASE_URL = 'https://www.youtube.com/embed'

  template: _.template('')
  tagName: 'iframe'
  id: 'youtube'

  onRender: ->
    @_addPlayerAttributes()
    @_addJavascriptAPI()

  _addPlayerAttributes: ->
    @$el.attr(
      width: '100%'
      height: '100%'
      frameborder: 0
      src: @_embeddedPlayerURL()
    )

  _addJavascriptAPI: ->
    tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
    window.onYouTubeIframeAPIReady = => @_onYoutubeReady()

  _onYoutubeReady: ->
    @API = new YT.Player('youtube',
      events:
        onStateChange: (event) ->
          return if event.data != 1
          App.trigger('youtube:playing', event.target.getPlaylistIndex())
    )

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
