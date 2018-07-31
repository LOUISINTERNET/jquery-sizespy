// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;
(function($, window, document, undefined) {
    "use strict";
    var pluginName = "sizeSpy",
        defaults = {
            spanTarget: false,
            cssPrefix: 'sizespy',
            spanStyles: {
                "position": "absolute",
                "left": "0",
                "top": "0",
                "background-color": "red",
                "color": "white",
                "padding": "3px 6px",
                "font-family": "sans-serif",
                "font-weight": "bold",
                "z-index": "99999"
            },
            containerStyles: {
                "outline": "1px dashed red"
            },
            targetStyles: {
                "position": "relative"
            }
        };
    // The actual plugin constructor
    function SizeSpy(element, options) {
        this.element = $(element);


        if (typeof(options) === 'undefined') {
            options = {};
        }

        // merge span and container styles
        var spanStyles = $.extend({}, defaults.spanStyles, options.spanStyles);
        var targetStyles = $.extend({}, defaults.targetStyles, options.targetStyles);
        var containerStyles = $.extend({}, defaults.containerStyles, options.containerStyles);
        this.settings = $.extend({}, defaults, options);
        this.settings.spanStyles = spanStyles;
        this.settings.containerStyles = containerStyles;
        this.settings.targetStyles = targetStyles;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    // Avoid Plugin.prototype conflicts
    $.extend(SizeSpy.prototype, {
        init: function() {
            this.createDebugSpan();
            this.updateSpan();
            this.bindResizeEvent();
        },
        createDebugSpan: function() {
            this.span = $('<span />').addClass(this.settings.cssPrefix + '-span').css(this.settings.spanStyles);
            this.getSpanTarget().prepend(this.span);
        },
        getSpanTarget: function() {
            var target;
            if (this.settings.spanTarget === 'wrap') {
                target = $('<div />').css($.extend(this.settings.containerStyles, this.settings.targetStyles));
                this.element.wrap(target);
                target = this.element.parent();
            } else {
                target = this.element;
                if (this.settings.spanTarget) {
                    target = this.element.closest(this.settings.spanTarget);
                }
                target.css($.extend(this.settings.containerStyles, this.settings.targetStyles));
            } 
            
            return target;
        },
        updateSpan: function() {
            this.span.html(this.element.outerWidth() + 'x' + this.element.outerHeight());
        },
        bindResizeEvent: function() {
            var self = this;
            $(window).on('resize orientationChange', function() {
                self.updateSpan();
            });
        }
    });
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new SizeSpy(this, options));
            }
        });
    };
})(jQuery, window, document);