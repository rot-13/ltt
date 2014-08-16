class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView
  template: _.template('<%= title %>')
  tagName: 'li'

  serializeData: ->
    title: @_truncatedTitle()

  _truncatedTitle: ->
    @model.get('title').replace(/\s*\(.*?\)\s*/g, '').replace(/\s*\[.*?\]\s*/g, '').replace('--', '-')


class App.Views.PlaylistView extends Backbone.Marionette.CollectionView
  childView: App.Views.PlaylistRowView
  tagName: 'ul'