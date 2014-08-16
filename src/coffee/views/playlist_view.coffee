class App.Views.PlaylistRowView extends Backbone.Marionette.ItemView
  template: _.template('')

class App.Views.PlaylistView extends Backbone.Marionette.CollectionView
  childView: App.Views.PlaylistRowView
