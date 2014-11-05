var AppView = Backbone.View.extend({
  el: $('body'),

  initialize: function () {
    this.collection = new MediaCollection();
    this.user = new UserModel();

    var injector = {
      app: this,
      collection: this.collection
    };

    this.video = new VideoPlayer(injector);
    this.form = new CreateItemForm(injector);
    this.playlist = new Playlist(injector);
    this.router = new Router(injector);
  }
});


$(function(){
  window.app = new AppView();
  Backbone.History.start();
});