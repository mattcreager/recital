/* globals $f, jQuery */

/*
* Add a ToC to a Vimeo Video
* Original author: @matt_creager
* Licensed under the MIT license
*/

;(function ($, window, document) {
  var pluginName = 'recital'
  var defaults = { tocClass: '.recital-toc', currentBookmark: -1 }

  function Plugin (element, options) {
    this.element = $(element)
    this.options = $.extend({}, defaults, options)
    this._defaults = defaults
    this._name = pluginName

    this.init()
  }

  Plugin.prototype.init = function () {
    this.player = $f(this.element.find('iframe')[0])
    this.toc = this.element.find(this.options.tocClass + ' a')

    var _this = this
    this.player.addEvent('ready', function () {
      _this.player.addEvent('playProgress', _this.onPlayProgress.bind(_this))
      _this.player.addEvent('finish', _this.clearCurrent.bind(_this))
      _this.toc.on('click', _this.onClickBookmark.bind(_this))
    })
  }

  Plugin.prototype.onClickBookmark = function (e) {
    this.player.api('seekTo', $(e.target).data('seek-to'))
    this.setCurrent(e.target)

    e.preventDefault()
  }

  Plugin.prototype.onPlayProgress = function (data, id) {
    var currentBookmark = this.options.currentBookmark
    var newBookmark = this.toc
      .map(function (index, el) { return +$(el).data('seek-to') })
      .toArray().reduce(function (accum, seconds, index) {
        accum = data.seconds < seconds ? accum : index

        return accum
      }, -1)

    if (currentBookmark === newBookmark || newBookmark === -1) return

    currentBookmark = newBookmark
    this.setCurrent(this.toc[currentBookmark])
  }

  Plugin.prototype.setCurrent = function (bookmark) {
    if ($(bookmark).parents('li').hasClass('recital-current')) return

    this.clearCurrent()
    $(bookmark).parents('li').addClass('recital-current')
  }

  Plugin.prototype.clearCurrent = function () {
    this.toc.each(function (index, bookmark) {
      if (!$(bookmark).parents('li').hasClass('recital-current')) return

      $(bookmark).parents('li').removeClass('recital-current')
    })
  }

  // lightweight wrapper preventing multiple instantiations
  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options))
      }
    })
  }

})(jQuery, window, document)
