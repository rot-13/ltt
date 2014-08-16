class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView

class App.Views.PlaylistView extends Backbone.Marionette.CollectionView
  childView: App.Views.PlaylistRowView
