class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView
  template: _.template($('#row-template').html())
  tagName: 'li'

  events:
    'click': '_onClick'

  serializeData: ->
    title: @_playlistTitle()
    index: @_playlistIndex() + 1
    url: @model.get('redditUrl')

  _playlistTitle: ->
    @model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-')

  _playlistIndex: ->
    @model.collection.indexOf(@model)

  _onClick: ->
    return if @$el.hasClass('playing')
    App.trigger('playlist:selected', @_playlistIndex())


class App.Views.PlaylistView extends Backbone.Marionette.CollectionView
  childView: App.Views.PlaylistRowView
  tagName: 'ul'
  edgeBorderTemplate: "<div class='ul-border'></div>"

  ANIMATION_DURATION: 300
  ROW_HEIGHT: 30

  initialize: ->
    @listenTo(App, 'youtube:playing', @_onYoutubePlaying)

  onShow: ->
    @$el.parent().prepend(@edgeBorderTemplate)
    @$el.parent().append(@edgeBorderTemplate)

  _onYoutubePlaying: (index) ->
    playingRow = @$el.find('li').removeClass('playing').eq(index)

    playingRow.addClass('playing')
    offset = 30 * (index - 1)
    @$el.animate({scrollTop: offset}, @ANIMATION_DURATION)
