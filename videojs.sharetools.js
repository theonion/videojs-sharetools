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
    facebook: function(settings){
        return "https://www.facebook.com/sharer/sharer.php?u=" + settings.shareUrl;
    },
    twitter: function(settings){
        return "https://twitter.com/share?url=" + settings.shareUrl;
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
        overlay.innerHTML = '<div class="sharetool"></div><a href="#close" class="close"><span>Close</span></a>';

        var shareTool = overlay.getElementsByTagName("div")[0];
        if(settings.facebook) {
            var facebook = document.createElement('a');
            facebook.className = "fb";
            facebook.href = settings.facebook(settings);
            facebook.innerHTML = "<span>Facebook</span>";
            shareTool.appendChild(facebook);
        }
        if(settings.twitter) {
            var twitter = document.createElement('a');
            twitter.className = "tw";
            twitter.href = settings.twitter(settings);
            twitter.innerHTML = "<span>Twitter</span>";
            shareTool.appendChild(twitter);
        }
        if(settings.embed) {
            var embed = document.createElement('a');
            embed.className = "em";
            embed.href = "#em";
            embed.innerHTML = "<span>Embed</span>";
            shareTool.appendChild(embed);

            var embedDiv = document.createElement('div');
            embedDiv.className = "embedtool";
            embedDiv.innerHTML = "<textarea>" + settings.embed(settings) + "</textarea>";
            embedDiv.style.display = "none";
            overlay.appendChild(embedDiv);

            embed.onclick = function(e){
                shareTool.style.display = "none";
                embedDiv.style.display = "block";
                embedDiv.getElementsByTagName('textarea')[0].select();
            };

        }

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