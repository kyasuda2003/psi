(function() {
  String.prototype.format = function() {
    var args;
    args = void 0;
    args = Array.prototype.slice.call(arguments, 0);
    return this.toString().replace(/{(\d+)}/g, function(match, number) {
      if (typeof args[number] !== "undefined") {
        return args[number];
      } else {
        return match;
      }
    });
  };

  app.util = {
    array2json: function(arr, key) {
      var jsn, obj;
      jsn = {};
      for (obj in arr) {
        jsn[arr[obj][key].toString()] = arr[obj];
      }
      return jsn;
    },
    json2array: function(jsn) {
      return $.map(jsn, function(value, index) {
        return [value];
      });
    },
    getRenderedArr: function(arr, size) {
      var i, newArr;
      newArr = [];
      i = 0;
      while (i < arr.length) {
        newArr.push(arr.slice(i, i + size));
        i += size;
      }
      return newArr;
    },
    getProducts1RowTable: function(numInARow) {
      var cat, _ref, _ref1;
      _ref = {};
      for (cat in app.data.categories) {
        _ref[cat] = app.data.categories[cat];
        _ref1 = $.map(app.data.products, function(value, index) {
          if (value.categories.indexOf(_ref[cat].id) > -1) {
            return [value];
          }
        });
        _ref[cat].prodArray = app.util.getRenderedArr(_ref1, numInARow);
      }
      return _ref;
    }
  };

  app.ui = {
    popupBlock: function(blockId, colour, opac, display) {
      $("#" + blockId).each(function(index, val) {
        $(this).remove();
      });
      return $("<div id='" + blockId + "' class='block-window'></div>").css({
        height: "100%",
        width: "100%",
        "z-index": "4000",
        opacity: opac,
        position: "fixed",
        top: "0",
        left: "0",
        display: (display ? "block" : "none"),
        "background-color": colour,
        "background-image": (colour === "white" ? "url('" + app.settings.apppath + "img/temp-load.gif')" : ""),
        "background-repeat": "no-repeat",
        "background-position": "center"
      });
    },
    switchView: function(obj, win, path) {
      $(".menu ul li").removeClass("active");
      $(obj).parent().attr({
        "class": "active"
      });
      if (win.location.href.indexOf(path) > -1) {
        return;
      }
      $("body").append(app.ui.popupBlock("login-block", "white", "1", false));
      $("#login-block").fadeIn(500, function() {
        $.when(app.api.getAllCategories(), app.api.getAllPhotos(), app.api.getAllProducts()).done(function() {
          win.location.replace(win.location.pathname + path);
        });
      });
    }
  };

  app.api = (function() {
    var _this = this,
        _userInfo = {},
        _data={
            eventList:{}
        };
    
    return {
      getToken:function(accInfo){
        return $.post("{0}/api-token-auth/".format(app.settings.apihost),accInfo)
                .success(function(data, textStatus, jqXHR){
                    if (data.token)
                        _userInfo.token=data.token;
                });
      },
      transaction:{
            addAnEvent:function(event){
                event.id=Object.keys(_data.eventList).length;
                _data.eventList[event.id.toString()]=event;
            },
            getAllSocialEvents:function(){
                return $.map(_data.eventList, function(value, index) {
                    return [value];
                });
            }
      },
      isAuthenticated:function(){
          return _userInfo.token?true:false;
      }
    };
  })();
  
  app.schema={
      mediaType:['facebook',
                 'twitter',
                 'google'],
      actionType:['Post',
                'Birthday',
                'Gift'],
      statusType:['scheduled',
              'processed',
              'pending']
  };

}).call(this);