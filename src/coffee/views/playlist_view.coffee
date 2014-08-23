class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView
  template: _.template("<div class='title'><strong><%= index %>.</strong> <span><%= title %></span><span class='genre'><%= genre %></span></div><div class='link' title='See in Reddit'>➜</div>")
  tagName: 'li'

  events:
    'click .title': '_onSongClick'
    'click .link': '_onLinkClick'

  serializeData: ->
    title: @_playlistTitle()
    genre: @_playlistGenre()
    index: @_playlistIndex() + 1

  _playlistTitle: ->
    @model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-')

  _playlistGenre: ->
    genre = @model.get('genre')
    "[#{genre}]" if genre

  _playlistIndex: ->
    @model.collection.indexOf(@model)

  _onSongClick: ->
    return if @$el.hasClass('playing')
    App.trigger('playlist:selected', @_playlistIndex())

  _onLinkClick: ->
    window.open(@model.get('redditUrl'), '_blank')

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
