String.prototype.rightChars = function(n){
  if (n <= 0) {
    return "";
  }
  else if (n > this.length) {
    return this;
  }
  else {
    return this.substring(this.length, this.length - n);
  }
};

(function($) {
  var opts,
      highlight,
      clearText,
      type,
      spanWithColor,
      clearDelay,
      typeDelay,
      clearData,
      isNumber,
      typeWithAttribute,
      getHighlightInterval,
      getTypeInterval,
      intervalHandle,
      typerInterval;

  spanWithColor = function(color, backgroundColor) {
    if (color === 'rgba(0, 0, 0, 0)') {
      color = 'rgb(255, 255, 255)';
    }

    return $('<span></span>')
      .css('color', color)
      .css('background-color', backgroundColor);
  };

  isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  clearData = function ($e) {
    $e.removeData([
      'typePosition',
      'highlightPosition',
      'leftStop',
      'rightStop',
      'primaryColor',
      'backgroundColor',
      'text',
      'typing'
    ]);
  };

  type = function ($e) {
    var
      // position = $e.data('typePosition'),
      text = $e.data('text'),
      oldLeft = $e.data('oldLeft'),
      oldRight = $e.data('oldRight');

    // if (!isNumber(position)) {
      // position = $e.data('leftStop');
    // }

    if (!text || text.length === 0) {
      clearData($e);
      return;
    }

    $e.text(
      oldLeft +
      text.charAt(0) +
      oldRight
    ).data({
      oldLeft: oldLeft + text.charAt(0),
      text: text.substring(1)
    });

    // $e.text($e.text() + text.substring(position, position + 1));

    // $e.data('typePosition', position + 1);

    setTimeout(function () {
      type($e);
    }, getTypeInterval());
  };

  clearText = function ($e) {
    $e.find('span').remove();

    setTimeout(function () {
      type($e);
    }, typeDelay());
  };

  highlight = function ($e) {
    var
      position = $e.data('highlightPosition'),
      leftText,
      highlightedText,
      rightText;

    if (!isNumber(position)) {
      position = $e.data('rightStop') + 1;
    }

    if (position <= $e.data('leftStop')) {
      setTimeout(function () {
        clearText($e);
      }, clearDelay());
      return;
    }

    leftText = $e.text().substring(0, position - 1);
    highlightedText = $e.text().substring(position - 1, $e.data('rightStop') + 1);
    rightText = $e.text().substring($e.data('rightStop') + 1);

    $e.html(leftText)
      .append(
        spanWithColor(
            $e.data('backgroundColor'),
            opts.tapeColor === 'auto' ? $e.data('primaryColor') : opts.tapeColor
          )
          .append(highlightedText)
      )
      .append(rightText);

    $e.data('highlightPosition', position - 1);

    setTimeout(function () {
      return highlight($e);
    }, getHighlightInterval());
  };

  typeWithAttribute = (function () {
    var last = 0;

    return function($e) {
      var targets;

      if ($e.data('typing')) {
        return;
      }

      try {
        targets = JSON.parse($e.attr(opts.typerDataAttr)).targets;
      } catch (e) {}

      if (typeof targets === "undefined") {
        targets = $.map($e.attr(opts.typerDataAttr).split(','), function (e) {
          return $.trim(e);
        });
      }

      if (opts.typerOrder === 'random') {
        $e.typeTo(targets[Math.floor(Math.random()*targets.length)]);
      }
      else if (opts.typerOrder === 'sequential') {
        $e.typeTo(targets[last]);
        last = (last < targets.length - 1) ? last + 1 : 0;
      }
      else {
        console.error("Type order of '" + opts.typerOrder + "' not supported");
        clearInterval(intervalHandle);
      }
    };
  })();

  //-- Methods to attach to jQuery sets

  $.fn.typer = function(options) {
    var $elements = $(this);

    opts = jQuery.extend({}, $.fn.typer.defaults, options);

    return $elements.each(function () {
      var $e = $(this);

      if (typeof $e.attr(opts.typerDataAttr) === "undefined") {
        return;
      }

      typeWithAttribute($e);
      intervalHandle = setInterval(function () {
        typeWithAttribute($e);
      }, typerInterval());
    });
  };

  $.fn.typeTo = function (newString) {
    var
      $e = $(this),
      currentText = $e.text(),
      i = 0,
      j = 0;

    if (currentText === newString) {
      if (opts.debug === true) {
        console.log("Our strings our equal, nothing to type");
      }
      return $e;
    }

    if (currentText !== $e.html()) {
      if (opts.debug === true) {
        console.error("Typer does not work on elements with child elements.");
      }
      return $e;
    }

    $e.data('typing', true);

    if (opts.highlightEverything !== true) {
      while (currentText.charAt(i) === newString.charAt(i)) {
        i++;
      }

      while (currentText.rightChars(j) === newString.rightChars(j)) {
        j++;
      }
    }

    newString = newString.substring(i, newString.length - j + 1);

    $e.data({
      oldLeft: currentText.substring(0, i),
      oldRight: currentText.rightChars(j - 1),
      leftStop: i,
      rightStop: currentText.length - j,
      primaryColor: opts.tapeColor === 'auto' ? $e.data('primaryColor') : opts.tapeColor,
      backgroundColor: $e.css('background-color'),
      text: newString
    });

    highlight($e);

    return $e;
  };

  //-- Helper methods. These can one day be customized further to include things like ranges of delays.

  getHighlightInterval = function () {
    return opts.highlightSpeed;
  };

  getTypeInterval = function () {
    return opts.typeSpeed;
  };

  clearDelay = function () {
    return opts.clearDelay;
  };

  typeDelay = function () {
    return opts.typeDelay;
  };

  typerInterval = function () {
    return opts.typerInterval;
  };

  $.fn.typer.defaults = {
    highlightSpeed      : 20,
    typeSpeed           : 100,
    clearDelay          : 500,
    typeDelay           : 200,
    clearOnHighlight    : true,
    highlightEverything : true,
    typerDataAttr       : 'data-typer-targets',
    typerInterval       : 2000,
    debug               : false,
    tapeColor           : 'auto',
    typerOrder          : 'random',
  };

})(jQuery);
