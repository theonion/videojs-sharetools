(function(vjs) {
  'use strict';

  var extend = function (obj) {
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
  };

  var defaults = {
    showOnPause: false,
    shareUrl: window.location,
    facebook: function(settings){
        return "https://www.facebook.com/sharer/sharer.php?u=" + settings.shareUrl;
    },
    twitter: function(settings){
        return "https://twitter.com/share?url=" + settings.shareUrl;
    }
  };

  var ShareTools = function (player, settings) {

    // return share tools functions
    return {
      open: false,
      setup: function() {

        this.open = true;

        // pause video
        if (!player.paused()) {
          player.pause();
        }

        // prepare overlay
        var overlay = document.createElement("div");
        overlay.className = "sharetools-overlay";
        overlay.innerHTML = "<div class=\"sharetool\"><span class=\"text\">Share this video</span></div>";

        // set up individual share buttons
        var shareToolDiv = overlay.getElementsByTagName("div")[0];
        if(settings.facebook) {
          var facebook = document.createElement('a');
          facebook.className = "fb";
          facebook.target = "_blank";
          facebook.href = settings.facebook(settings);
          facebook.innerHTML = "<span>Facebook</span>";
          shareToolDiv.appendChild(facebook);
        }
        if(settings.twitter) {
          var twitter = document.createElement('a');
          twitter.className = "tw";
          twitter.target = "_blank";
          twitter.href = settings.twitter(settings);
          twitter.innerHTML = "<span>Twitter</span>";
          shareToolDiv.appendChild(twitter);
        }
        if(settings.embed) {
          var embed = document.createElement('a');
          embed.className = "em";
          embed.innerHTML = "<span>Embed</span>";
          shareToolDiv.appendChild(embed);

          var embedDiv = document.createElement('div');

          embedDiv.className = "embedtool";
          embedDiv.innerHTML = "<textarea class=\"textarea\"></textarea>";
          embedDiv.style.display = "none";
          overlay.appendChild(embedDiv);

          embed.onclick = function(e){
            e.stopPropagation();
            var textArea = embedDiv.children[0];
            shareToolDiv.style.display = "none";
            embedDiv.style.display = "block";
            textArea.appendChild(document.createTextNode(settings.embed(settings)));
            textArea.select();
            return false;
          };
        }

        overlay.onclick = this.overlayClickEvent;
        document.addEventListener('keyup', this.keyUpEvent, false);
        player.el().insertBefore(overlay, player.controlBar.el());
      },
      keyUpEvent: function(e) {
        if (e.keyCode === 27) {
          this.teardown();
        }
      },
      overlayClickEvent: function(e) {
        var c_name = e.target.className;
        this.teardown();
      },
      teardown: function() {
        var overlays = player.el().getElementsByClassName('sharetools-overlay');
        if (overlays.length > 0) {
          document.removeEventListener('keyup', this.keyUpEvent);
          player.el().removeChild(overlays[0]);
        }
        this.open = false;
      }
    };
  };

  var initShareToolsPlugin = function (options) {

    var player = this;
    var settings = extend({}, defaults, options || {});

    player.sharetools = new ShareTools(player, settings);

    // create share button
    var shareButton = document.createElement('div');
    shareButton.className = 'vjs-sharetools-button vjs-control';
    shareButton.innerHTML = '<div><span class="vjs-control-text">Share</span></div>';
    player.controlBar.el().appendChild(shareButton);

    if (settings.showOnPause) {
      player.on('pause', function() {
        if (!player.seeking() && !player.ended() && !player.sharetools.open) {
          player.sharetools.setup();
        }
      });
    }

    player.on('play', function() {
      player.sharetools.teardown();
    });

    shareButton.onclick = function(e) {
      if (player.sharetools.open) {
        player.sharetools.teardown();
      } else {
        player.sharetools.setup();
      }
    };

  };

  vjs.plugin('sharetools', initShareToolsPlugin);

}(window.videojs));
