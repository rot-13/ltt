class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView
  template: _.template('<strong><%= index %>.</strong> <%= title %>')
  tagName: 'li'

  serializeData: ->
    title: @_playlistTitle()
    index: @_playlistIndex()

  _playlistTitle: ->
    @model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-')

  _playlistIndex: ->
    @model.collection.indexOf(@model) + 1


class App.Views.PlaylistView extends Backbone.Marionette.CollectionView
  childView: App.Views.PlaylistRowView
  tagName: 'ul'
  edgeBorderTemplate: "<div class='ul-border'></div>"

  onShow: ->
    @$el.parent().prepend(@edgeBorderTemplate)
    @$el.parent().append(@edgeBorderTemplate)
