;(function($, document, window) {
  var defaults = {
    toggleSelector: '.hm-toggle',
    mediaQuery: null
  };

  function Menu(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this.init();
  }

  Menu.prototype.init = function(options) {
    var _this = this;

    this.toggleEl = $(this.settings.toggleSelector);
    this.linkEls = this.getLinks();
    this.isOpen = false;

    if (this.linkEls.length === 0) {
      console.warn('No links found; hotMenu not created.');
      return;
    }

    // Add class for styling
    if (!this.element.hasClass('hm-links')) {
      this.element.addClass('hm-links');
    }

    // Add event listener
    this.toggleEl.on('click', function() {
      _this.toggle();
    });

    // Add listener for the media query at which the
    // menu should be active. This resets the link
    // height if the user extends the window beyond
    // the specified media query.
    if (typeof this.settings.mediaQuery === 'string') {
      this.mq = window.matchMedia(this.settings.mediaQuery);
      this.mq.addListener(function() {
        _this.handleMediaQueryChange(this);
      });
      this.handleMediaQueryChange(this.mq);
    }

    return this;
  };

  Menu.prototype.handleMediaQueryChange = function(mq){
    if (!mq.matches) {
      this.element.removeClass('hm-links');
      this.setLinkHeights('');
    } else {
      this.element.addClass('hm-links');
      if (this.isOpen) {
        this.setLinkHeights(this.linkHeight);
      }
    }
  };

  Menu.prototype.getLinks = function() {
    links = this.element.children();

    // In case the links are contained in a list
    if (links.is('ul','ol')) {
      links = links.children();
    }

    return links;
  };

  Menu.prototype.open = function() {
    // Calculate link heights
    this.setLinkHeights((window.innerHeight / this.linkEls.length) + 'px');
    this.toggleEl.addClass('active');
    this.element.removeClass('hidden')
      .animate({
        opacity: 1.0,
    }, 125)
      .addClass('active');
    this.isOpen = true;
  };

  Menu.prototype.close = function() {
    var _this = this;
    this.toggleEl.removeClass('active');
    this.element.animate({
      opacity: 0.0,
    }, {
      duration: 125,
      complete: function() {
        _this.element.addClass('hidden')
          .removeClass('active')
          .attr('style', '');
        _this.setLinkHeights('');
      }
    });
    this.isOpen = false;
  };

  Menu.prototype.toggle = function() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  };

  Menu.prototype.setLinkHeights = function(height) {
    this.linkEls.each(function() {
      $(this).css({
        'line-height': height,
        'height': height
      });
    });
  };

  $.fn.hotMenu = function(options) {
    return new Menu(this, options);
  };
})(jQuery, document, window);
