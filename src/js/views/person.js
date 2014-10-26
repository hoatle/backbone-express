var PersonView = Backbone.View.extend({
      render: function() {
              // This is method that can be called
        // once an object is init. You could 
        // also do this in the initialize event
        var source = $('#PersonTemplate').html();
        var template = Handlebars.compile(source);
        var html = template(this.model.toJSON());
        
        this.$el.html(html);
      }
    });