'use strict';

// Declare app level module which depends on filters, and services
angular.module('pcApp', ['pcApp.filters', 'pcApp.services', 'pcApp.directives', 'pcApp.controllers']).
  config(['$routeProvider', function(rp) {
     
    rp.when('/index', {templateUrl: app.settings.apppath+'partials/alpha.html', controller: 'alpha'});
    rp.when('/login', {templateUrl: app.settings.apppath+'partials/beta.html', controller: 'beta'});
    rp.when('/scheduler', {templateUrl: app.settings.apppath+'partials/gamma.html', controller: 'gamma'});
    rp.otherwise({redirectTo: '/index'});
  }]);
