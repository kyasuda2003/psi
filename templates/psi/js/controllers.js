'use strict';

/* Controllers */
angular.module('pcApp.controllers', [])
.controller('alpha', ['$scope', function (sc) {
    var __settings = app.settings;
    sc.$on('$routeChangeSuccess', function () {
        $('.nav.navbar-nav li').removeClass('active');
        $('.nav.navbar-nav li:eq(0)').addClass('active');
        $('div.pc-authenticate-only-section').fadeIn(150, function () {
        });
        
    });

}])
.controller('beta', ['$scope', '$window', function (sc, wi) {
    var __settings = app.settings;

    sc.getAuthenticated = function(acct){
        if (!acct || !acct.user || !acct.pwd)
            return;

        app.api.init({username: acct.user, password: acct.pwd})
            .then(function(data) {
                $('.form-signin .form-control').val('');

                if (app.api.isAuthenticated()) {
                    var go2url = wi.location.pathname;
                    wi.location.replace(go2url + '#/scheduler');
                }
            },function (jqXHR, textStatus) {
                $('.form-signin .form-control').addClass('err');
            });

    };
    
    sc.inputUser = function(e){
        $('.form-signin .form-control').removeClass('err');
    };

    sc.$on('$routeChangeSuccess', function () {
        $('.nav.navbar-nav li').removeClass('active');
        $('div.pc-authenticate-only-section').fadeIn(150, function () {
        });
        //$('.nav.navbar-nav li:eq(1)').addClass('active');

        //$('#login-block').fadeOut(500, function (){});
    });

}])
.controller('gamma', ['$scope', '$window', function (sc, wi) {
    var _api=app.api;
        
    sc.$on('$routeChangeSuccess', function () {
        if (!_api.isAuthenticated()) {
            var go2url = wi.location.pathname;
            wi.location.replace(go2url + '#/login');
            return;
        }

        $('.nav.navbar-nav li').removeClass('active');
        $('.nav.navbar-nav li:eq(1)').addClass('active');

        $('.pc-datetimepicker').datetimepicker({
            defaultDate: new Date(),
            minDate: new Date()
        });

        $('div.pc-authenticate-only-section').fadeIn(150, function () {
        });
    });
    
    sc.$on('$viewContentLoaded',function(){
        //app.api.transaction.loadMediaType();
    });

    sc.getEvent = function (n) {
        return _api.data.eventList.list[n];
    };

    sc.getMedia = function (n) {
        return _api.data.mediaList.list[n].name;
    };

    sc.getAction = function (n) {
        return _api.data.actionList.list[n].name;
    };

    sc.getStatus = function (n) {
        return _api.data.statusList.list[n].name;
    };
    
    sc.mediaList = function () {
    //    return _ref1(app.api.data.mediaList.getArr());
        return app.api.data.mediaList.getArr();
    };

    sc.actionList = function () {
        return app.api.data.actionList.getArr();
    };

    sc.statusList = function () {
        return app.api.data.statusList.getArr();
    };
    
    sc.eventList = function () {
        return app.api.data.eventList.getArr();
    };
    
    sc.event={};
    
    sc.addEvent = function (event) {
        try {
            $('#eventdate').removeClass('err');
            $('#sel-media').removeClass('err');
            $('#sel-action').removeClass('err');
            $('#txt-message').removeClass('err');
                
            var _ref = new Date($('#eventdate').val());

            if (_ref.getDate()=='NaN'||_ref=='Invalid Date'){
                $('#eventdate').addClass('err');
                return;
            }
                        
            if (!event){
                $('#eventdate').addClass('err');
                $('#sel-media').addClass('err');
                $('#sel-action').addClass('err');
                $('#txt-message').addClass('err');
                return;
            }
             
            if (!event.media) {
                $('#sel-media').addClass('err');
                return;
            }
                        
            if (!event.action){
                $('#sel-action').addClass('err');
                return;
            }
            
            if (!event.message){
                $('#txt-message').addClass('err');
                return;
            }
            
            app.api.data.eventList.transaction.add({
                media: event.media,
                action: event.action,
                eventdate: _ref.toLocaleDateString()+' '+_ref.toLocaleTimeString(),
                message: event.message,
                status: 3
            });
            
            sc.event={};
        }
        catch (e) {
            $('#eventdate').addClass('err');
            $('#sel-media').addClass('err');
            $('#sel-action').addClass('err');
            $('#txt-message').addClass('err');
            console.debug(e);
        }
    };
}]);
