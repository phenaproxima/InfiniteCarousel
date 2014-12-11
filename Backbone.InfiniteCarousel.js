(function($, _, Backbone) {

var ImageView = Backbone.View.extend({

  tagName: 'figure',

  render: function() {
    $('<img />').attr('src', this.model.get('image')).appendTo(this.el);
  }

});

Backbone.InfiniteCarousel = Backbone.View.extend({

  initialize: function() {
    this._prevButton = $('<button></button>').html('&laquo;').attr({ rel: 'prev', disabled: true }).on('click', { controller: this }, this._onPrevClick);
    this._nextButton = $('<button></button>').html('&raquo;').attr({ rel: 'next', disabled: true }).on('click', { controller: this }, this._onNextClick);
    this._track = $('<div></div>').width('400%');

    $('<div></div>').width('25%').append(this.collection.getPage().map(this._renderImage)).appendTo(this._track);

    var controller = this;

    $('<div></div>').width('25%').append(this.collection.behind().map(this._renderImage)).prependTo(this._track).imagesLoaded(function() {
      controller._prevButton.removeAttr('disabled');
      controller._track.css('margin-left', '-100%');
    });
    
    $('<div></div>').width('25%').append(this.collection.ahead().map(this._renderImage)).appendTo(this._track).imagesLoaded(function() {
      controller._nextButton.removeAttr('disabled');
    });

    this.render();
  },

  _renderImage: function(i) {
    var v = new ImageView({ model: i });
    v.render();
    return v.el;
  },

  _onPrevClick: function(event) {
    var controller = event.data.controller;

    controller.collection.retreat();
    controller._prevButton.attr('disabled', true);
    controller._track.animate({ marginLeft: '+=100%' }, function() {
      $(this).children().last().remove();
      $('<div></div>').width('25%').append(controller.collection.behind().map(controller._renderImage)).imagesLoaded(function() {
        $(this.elements[0]).prependTo(controller._track);
        controller._track.css('margin-left', '-100%');
        controller._prevButton.removeAttr('disabled');
      });
    });
  },

  _onNextClick: function(event) {
    var controller = event.data.controller;

    controller.collection.advance();
    controller._nextButton.attr('disabled', true);
    controller._track.animate({ marginLeft: '-=100%' }, function() {
      $(this).children().first().remove();
      $('<div></div>').width('25%').append(controller.collection.ahead().map(controller._renderImage)).imagesLoaded(function() {
        $(this.elements[0]).appendTo(controller._track);
        controller._track.css('margin-left', '-100%');
        controller._nextButton.removeAttr('disabled');
      });
    });
  },

  render: function() {
    this._track.appendTo(this.el).before(this._prevButton).after(this._nextButton);
  }

});

})(jQuery, _, Backbone);
