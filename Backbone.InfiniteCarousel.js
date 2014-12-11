(function($, _, Backbone) {

Backbone.InfiniteCarousel = Backbone.View.extend({

  imageView: Backbone.View.extend({

    tagName: 'figure',

    render: function() {
      $('<img />').attr('src', this.model.get('image')).appendTo(this.el);
    }

  }),

  animation: {},

  initialize: function(options) {
    _.extend(this, _.pick(options, 'imageView', 'animation'));

    this._prevButton = $('<button></button>').html('&laquo;').attr({ rel: 'prev', disabled: true }).on('click', { controller: this }, this._onPrevClick);
    this._nextButton = $('<button></button>').html('&raquo;').attr({ rel: 'next', disabled: true }).on('click', { controller: this }, this._onNextClick);
    this._track = $('<div></div>').width('400%');

    $('<div></div>').width('25%').append(this.collection.getPage().map(this._renderImage, this)).appendTo(this._track);

    var controller = this;

    $('<div></div>').width('25%').append(this.collection.behind().map(this._renderImage, this)).prependTo(this._track).imagesLoaded(function() {
      controller._prevButton.removeAttr('disabled');
      controller._track.css('margin-left', '-100%');
    });
    
    $('<div></div>').width('25%').append(this.collection.ahead().map(this._renderImage, this)).appendTo(this._track).imagesLoaded(function() {
      controller._nextButton.removeAttr('disabled');
    });

    this.render();
  },

  _renderImage: function(i) {
    var v = new this.imageView({ model: i });
    v.render();
    return v.el;
  },

  _onPrevClick: function(event) {
    var controller = event.data.controller;

    function after() {
      $('<div></div>').width('25%').append(controller.collection.behind().map(controller._renderImage, controller)).imagesLoaded(function() {
        $(this.elements[0]).prependTo(controller._track).parent().css('margin-left', '-100%').children().last().remove();
        controller._prevButton.removeAttr('disabled');
      });
    }

    controller.collection.retreat();
    controller._prevButton.attr('disabled', true);
    controller._track.animate({ marginLeft: '+=100%' }, _.extend({}, controller.animation, { complete: after }));
  },

  _onNextClick: function(event) {
    var controller = event.data.controller;

    function after() {
      $('<div></div>').width('25%').append(controller.collection.ahead().map(controller._renderImage, controller)).imagesLoaded(function() {
        $(this.elements[0]).appendTo(controller._track).parent().css('margin-left', '-100%').children().first().remove();
        controller._nextButton.removeAttr('disabled');
      });
    }

    controller.collection.advance();
    controller._nextButton.attr('disabled', true);
    controller._track.animate({ marginLeft: '-=100%' }, _.extend({}, controller.animation, { complete: after }));
  },

  render: function() {
    this._track.appendTo(this.el).before(this._prevButton).after(this._nextButton);
  }

});

})(jQuery, _, Backbone);
