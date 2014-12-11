(function($, _, Backbone) {

Backbone.InfiniteCarousel = Backbone.View.extend({

  imageRenderer: Backbone.View.extend({

    tagName: 'figure',

    render: function() {
      $('<img />').attr('src', this.model.get('image')).appendTo(this.el);
    }

  }),

  animation: {},

  events: {
    'click button[rel = "prev"]': '_onPrevClick',
    'click button[rel = "next"]': '_onNextClick'
  },

  initialize: function(options) {
    _.extend(this, _.pick(options, 'imageView', 'animation'));

    this._prevButton = $('<button rel="prev" disabled="true">&laquo;</button>');
    this._nextButton = $('<button rel="next" disabled="true">&raquo;</button>');
    this._track = $('<div style="width: 400%;"></div>');

    $('<div style="width: 25%;"></div>').append(this.collection.getPage().map(this._renderImage, this)).appendTo(this._track);

    var controller = this;

    $('<div style="width: 25%;"></div>').append(this.collection.behind().map(this._renderImage, this)).prependTo(this._track).imagesLoaded(function() {
      controller._prevButton.removeAttr('disabled');
      controller._track.css('margin-left', '-100%');
    });
    
    $('<div style="width: 25%;"></div>').append(this.collection.ahead().map(this._renderImage, this)).appendTo(this._track).imagesLoaded(function() {
      controller._nextButton.removeAttr('disabled');
    });

    this.render();
  },

  _renderImage: function(i) {
    var v = new this.imageRenderer({ model: i });
    v.render();
    return v.el;
  },

  _onAnimationDone: function(collectionMethod, loadHandler) {
    $('<div style="width: 25%;"></div>').append(this.collection[collectionMethod]().map(this._renderImage, this)).imagesLoaded($.proxy(loadHandler, this));
  },

  _onPrevLoaded: function(instance) {
    $(instance.elements[0]).prependTo(this._track).parent().css('margin-left', '-100%').children().last().remove();
    this._prevButton.removeAttr('disabled');
  },

  _onPrevClick: function() {
    this.collection.retreat();
    this._prevButton.attr('disabled', true);
    this._track.animate({ marginLeft: '+=100%' }, _.extend({}, this.animation, { complete: $.proxy(this._onAnimationDone, this, 'behind', this._onPrevLoaded) }));
  },

  _onNextLoaded: function(instance) {
    $(instance.elements[0]).appendTo(this._track).parent().css('margin-left', '-100%').children().first().remove();
    this._nextButton.removeAttr('disabled');
  },

  _onNextClick: function() {
    this.collection.advance();
    this._nextButton.attr('disabled', true);
    this._track.animate({ marginLeft: '-=100%' }, _.extend({}, this.animation, { complete: $.proxy(this._onAnimationDone, this, 'ahead', this._onNextLoaded) }));
  },

  render: function() {
    this._track.appendTo(this.el).before(this._prevButton).after(this._nextButton);
  }

});

})(jQuery, _, Backbone);
