InfiniteCarousel
================

A simple, responsive, infinite carousel with on-demand lazy-loading, for Backbone.

This is a very simple carousel script. It's a lot less robust and full-featured than
other carousels, but its approach does provide several advantages for certain use
cases.

I wrote this script because I needed a responsive carousel which supported transparent,
on-demand lazy loading. I wanted to be certain that users would never see a "loading"
graphic or inadvertently download dozens of images they'd never see. The carousel
also needed to loop infinitely in both directions.

The main difference is that other carousels are usually strongly tied to concrete DOM
elements -- the elements of the carousel are already present on the page, and are
turned into a carousel. InfiniteCarousel, on the other hand, starts with metadata about
the carousel elements, building them from the ground up. It's a straight-up programmatic
approach, and it affords you a great deal of flexibility.

InfiniteCarousel handles responsiveness with aplomb, too. Because it generates and
controls the carousel's elements (rather than trying to corral them into a working
carousel), it takes an amazingly elegant approach to responsive resizing. Unlike other
carousels, which need to do a bunch of math to resize carousel items, InfiniteCarousel
simply lets the browser do it. In other words, this thing will even be responsive in
legacy versions of IE. (Not that you should be using them.)

Dependencies
------------

* jQuery (or Zepto)
* Backbone (and Underscore)
* ImagesLoaded: http://imagesloaded.desandro.com
* Backbone.InfiniteCollection: https://github.com/phenaproxima/Backbone.InfiniteCollection
