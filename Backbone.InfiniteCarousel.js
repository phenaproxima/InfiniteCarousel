(function($, _, Backbone) {

var views = {};

views.ImageView = Backbone.View.extend({

  tagName: 'figure',

  initialize: function() {
    this.render();
  },

  render: function() {
    $('<img />').attr('src', this.model.get('image')).appendTo(this.el);
  }

});
  
var Page = Backbone.View.extend({

  initialize: function() {
    this.render();
  },
  
  _renderImage: function(i) {
    (new views.ImageView({ model: i })).$el.appendTo(this.el);
  },
  
  render: function() {
    this.collection.forEach(this._renderImage, this);
  }

});

Backbone.InfiniteCarousel = Backbone.View.extend({

  initialize: function() {
    this.render();
  },
  
  _onPrevious: function(event) {
    $(this).next().animate({ marginLeft: '+=100%' });
  },

  _onNext: function(event) {
    $(this).prev().animate({ marginLeft: '-=100%' });
  },

  render: function() {
    this.track = $('<div></div>').css({ width: '400%', marginLeft: '-100%' }).appendTo(this.el);
    new Page({ collection: this.collection.getPage() }).$el.appendTo(this.track);
    new Page({ collection: this.collection.behind() }).$el.prependTo(this.track);
    new Page({ collection: this.collection.ahead() }).$el.appendTo(this.track);
    $('<button rel="prev">&laquo;</button>').insertBefore(this.track).on('click', this._onPrevious);
    $('<button rel="next">&raquo;</button>').insertAfter(this.track).on('click', this._onNext);
  }

}, views);

})(jQuery, _, Backbone);
