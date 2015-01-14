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

        //$('#login-block').fadeOut(500, function () {});
    });

}])
.controller('beta', ['$scope', '$window', function (sc, wi) {
    var __settings = app.settings;

    sc.getToken = function (acct) {
        if (!acct || !acct.user || !acct.pwd)
            return;

        app.api.getToken({username: acct.user, password: acct.pwd})
                .success(function (data, textStatus, jqxhr) {
                    $('.form-signin .form-control').val('');
                }).fail(function (jqXHR, textStatus) {
            $('.form-signin .form-control').addClass('err');
        }).always(function (ref1, ref2, ref3) {
            if (app.api.isAuthenticated()) {
                var go2url = wi.location.pathname;
                wi.location.replace(go2url + '#/scheduler');
            }
        });

    };
    sc.inputUser = function (e) {
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
    sc.$on('$routeChangeSuccess', function () {
        if (!app.api.isAuthenticated()) {
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

    sc.socialEvent = function () {
        return app.api.transaction.getAllSocialEvents()
    };

    sc.getMediaType = function (n) {
        return app.schema.mediaType[n];
    };

    sc.getActionType = function (n) {
        return app.schema.actionType[n];
    };

    sc.getStatusType = function (n) {
        return app.schema.statusType[n];
    };

    function _ref1(arr) {
        var _ref = [];
        for (var i = 0; i < arr.length; i++) {
            _ref.push({
                id: i,
                name: arr[i]
            });
        }
        return _ref;
    }
    ;

    sc.mediaList = function () {
        return _ref1(app.schema.mediaType);
    };

    sc.actionList = function () {
        return _ref1(app.schema.actionType);
    };

    sc.statusList = function () {
        return _ref1(app.schema.statusType);
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
            
            app.api.transaction.addAnEvent({
                media: event.media-1,
                action: event.action-1,
                eventdate: _ref.toLocaleDateString()+' '+_ref.toLocaleTimeString(),
                message: event.message,
                status: 2
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
