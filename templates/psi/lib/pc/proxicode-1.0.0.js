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
    arr2json: function(arr, key) {
      var jsn, obj;
      jsn = {};
      for (obj in arr) {
        jsn[arr[obj][key].toString()] = arr[obj];
      }
      return jsn;
    },
    json2arr: function(jsn) {
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

    function api(){
        //private
        var _userInfo = {};

        //privileged
        this.data=(function(){
            
            var _dataList=function(){
                var _id=0,_json2arr=app.util.json2arr,_ref=this;
                
                this.list={};
                this.getArr=function(){
                    return _json2arr(this.list);
                };
                this.transaction={
                    add:function(obj){
                        obj.id=_id++;
                        _ref.list[obj.id.toString()]=obj;
                    }
                };
            };
            
            //event
            function _eventList(){
                _dataList.call(this);
            };
            
            _eventList.prototype=Object.create(_dataList.prototype);
            _eventList.prototype.constructor=_eventList;
            
            //media
            function _mediaList(){
                _dataList.call(this);
            };
            
            _mediaList.prototype=Object.create(_dataList.prototype);
            _mediaList.prototype.constructor=_mediaList;
            
            //action
            function _actionList(){
                _dataList.call(this);
            };
            
            _actionList.prototype=Object.create(_dataList.prototype);
            _actionList.prototype.constructor=_actionList;
            
            //status
            function _statusList(){
                _dataList.call(this);
            };
            
            _statusList.prototype=Object.create(_dataList.prototype);
            _statusList.prototype.constructor=_statusList;
            
            return {
                eventList:new _eventList(),
                mediaList:new _mediaList(),
                actionList:new _actionList(),
                statusList:new _statusList()
            };
        }).call(this);
        
        this.util=app.util;

        this.loadToken=function(accInfo){
            //var _ref=this;
            return $.post("{0}/api-token-auth/".format(app.settings.apihost),{ptoken:btoa(accInfo.username+":"+accInfo.password)})
            .done(function(data, textStatus, jqXHR){
                if (data.token)
                    _userInfo.token=data.token;
            })
            .fail(function(xhr,err,obj){
                console.log('loadToken failed.');
            });
        };

        this.loadMediaList=function(){
            var _ref=this;
            return $.ajax({url:"{0}{1}/medias/".format(app.settings.apihost, app.settings.apipath),
                           headers:{Authorization: "Token "+_userInfo.token}})
            .done(function(data, textStatus, jqxhr) {
                if (jqxhr.status=="200")
                    _ref.data.mediaList.list=_ref.util.arr2json(data.results,'id');
            })
            .fail(function(xhr,err,obj){
                console.log('loadMeidaList failed.');
            });
        };
        
        this.loadActionList=function(){
            var _ref=this;
            return $.ajax({url:"{0}{1}/actions/".format(app.settings.apihost, app.settings.apipath),
                           headers:{Authorization: "Token "+_userInfo.token}})
            .done(function(data, textStatus, jqxhr) {
                if (jqxhr.status=="200")
                    _ref.data.actionList.list=_ref.util.arr2json(data.results,'id');
            })
            .fail(function(xhr,err,obj){
                console.log('loadActionList failed.');
            });
        };
        
        this.loadEventList=function(){
            var _ref=this;
            return $.ajax({url:"{0}{1}/events/".format(app.settings.apihost, app.settings.apipath),
                           headers:{Authorization: "Token "+_userInfo.token}})
            .done(function(data, textStatus, jqxhr) {
                if (jqxhr.status=="200")
                    _ref.data.eventList.list=_ref.util.arr2json(data.results,'id');
            })
            .fail(function(xhr,err,obj){
                console.log('loadEventList failed.');
            });
        };
        
        this.loadStatusList=function(){
            var _ref=this;
            return $.ajax({url:"{0}{1}/statuses/".format(app.settings.apihost, app.settings.apipath),
                           headers:{Authorization: "Token "+_userInfo.token}})
            .done(function(data, textStatus, jqxhr) {
                if (jqxhr.status=="200")
                    _ref.data.statusList.list=_ref.util.arr2json(data.results,'id');
            })
            .fail(function(xhr,err,obj){
                console.log('loadStatusList failed.');
            });
        };

        this.isAuthenticated=function(){
            return _userInfo.token?true:false;
        };

    };

    //public
    api.prototype = {
        init:function(accInfo){
            var _ref=this;
            return _ref.loadToken(accInfo)
                .then(function(data,status,xhr){
                    return _ref.loadMediaList();
                }).then(function(data,status,xhr){
                    return _ref.loadActionList();
                }).then(function(data,status,xhr){
                    return _ref.loadStatusList();
                });
        }
    };
    
    app.api=new api();
  
}).call(this);