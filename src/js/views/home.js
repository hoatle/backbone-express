var HomeView = Backbone.View.extend({

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html(this.template());
        return this;
    }

});

var Viewport = Backbone.View.extend({
    
    // target item.
    el: '#content',
    
    // display a string to the target item
    render: function( str ) {
        
        console.log(str);
        
    }
});

var Menu = Backbone.View.extend({
    
    el: '#menu',
    
    events: {
        'click a' : 'onClick'
    },
    
    onClick: function( e ) {
        
        // uncomment this row to make it work!
        //router.navigate('/');
        
    }

});

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
