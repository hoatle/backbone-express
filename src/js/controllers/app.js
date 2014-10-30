var AppView = Backbone.View.extend({
  el: $('body'),

  initialize: function () {
    this.collection = new MediaCollection();
    this.user = new UserModel();

    var injector = {
      app: this,
      collec
    }
  }
});