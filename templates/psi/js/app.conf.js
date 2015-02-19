(function() {
 var app={};
  app.settings = {
    dev: true,
    apipath: ["/obj",""][0],
    apihost: ["http://localhost:9000", ""][0],
    mediapath: ["/media"][0],
    apppath: ["/psi/", "/assets/"][0]
  };
  window.app=app;

}).call(this);
