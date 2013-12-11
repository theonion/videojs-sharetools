(function(vjs) {
  var
  extend = function(obj) {
    var arg, i, k;
    for (i = 1; i < arguments.length; i++) {
      arg = arguments[i];
      for (k in arg) {
        if (arg.hasOwnProperty(k)) {
          obj[k] = arg[k];
        }
      }
    }
    return obj;
  },

  defaults = {
    shareUrl: document.location,
    sharers: {
        facebook: function(settings){
            return "https://www.facebook.com/sharer/sharer.php?u=" + settings.shareUrl;
        },
        twitter: function(settings){
            return "https://twitter.com/share?url=" + settings.shareUrl;
        }
    }
  },

  shareTools = function(options) {
    var player = this;
    var settings = extend({}, defaults, options || {});

    var shareButton = document.createElement("div");
    shareButton.className = "vjs-sharetools-button vjs-control";
    shareButton.innerHTML = '<div><span class="vjs-control-text">Share</span></div>';
    player.controlBar.el().appendChild(shareButton);

    shareButton.open = false;
    shareButton.onclick = function(e) {
        shareTools.setup();
    };

    shareTools.setup = function() {
        player.pause();
        shareTools.open = true;
        var overlay = document.createElement("div");
        overlay.className = "sharetools-overlay";

        overlay.innerHTML = '<a href="#fb"><span>Facebook</span></a> <a href="#tw"><span>Twitter</span></a> <a href="#em"><span>Embed</span></a> <a href="#close" class="close"><span>Close</span></a>';

        overlay.getElementsByClassName('close')[0].onclick = shareTools.teardown;
        player.el().appendChild(overlay);
    };

    shareTools.teardown = function() {
        var overlay = player.el().getElementsByClassName('sharetools-overlay')[0];
        player.el().removeChild(overlay);
    };

  };

  vjs.plugin('sharetools', shareTools);
}(window.videojs));