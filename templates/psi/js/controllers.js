'use strict';

/* Controllers */
angular.module('pcApp.controllers', [])
.controller('alpha', ['$scope', function (sc) {
    var __settings = app.settings;
    sc.$on('$routeChangeSuccess', function () {
        $('.nav.navbar-nav li').removeClass('active');
        $('.nav.navbar-nav li:eq(0)').addClass('active');
        
        //$('#login-block').fadeOut(500, function () {});
    });
    
}])
.controller('beta', ['$scope','$window', function (sc,wi) {
    var __settings = app.settings;
    
    sc.getToken=function(acct){
        if (!acct||!acct.user||!acct.pwd)
            return;
        
        app.api.getToken({username:acct.user,password:acct.pwd})
        .success(function(data,textStatus,jqxhr){
            $('.form-signin .form-control').val('');
        }).fail(function(jqXHR,textStatus){
            $('.form-signin .form-control').addClass('err');
        }).always(function(ref1,ref2,ref3){
            if (app.api.isAuthenticated()){
                var go2url=wi.location.pathname;
                wi.location.replace(go2url+'#/scheduler');
            }
        });
        
    };
    sc.inputUser=function(e){
        $('.form-signin .form-control').removeClass('err');
    };
    
    sc.$on('$routeChangeSuccess', function () {
        $('.nav.navbar-nav li').removeClass('active');
        //$('.nav.navbar-nav li:eq(1)').addClass('active');
        
        //$('#login-block').fadeOut(500, function (){});
    });
    
}])
.controller('gamma', ['$scope','$window', function (sc,wi) {
    sc.$on('$routeChangeSuccess', function () {
        if (!app.api.isAuthenticated()){
            var go2url=wi.location.pathname;
            wi.location.replace(go2url+'#/login');
        }    

        $('.nav.navbar-nav li').removeClass('active');
        $('.nav.navbar-nav li:eq(1)').addClass('active');
        
        $('.pc-datetimepicker').datetimepicker({
            defaultDate: new Date()
        });

        $('#login-block').fadeOut(500, function (){});
    });
}]);
