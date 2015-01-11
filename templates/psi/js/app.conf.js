(function() {
 var app={};
  app.settings = {
    dev: true,
    apipath: ["/obj",""][1],
    apihost: ["http://localhost:9000", ""][1],
    mediapath: ["/media"][0],
    apppath: ["/psi/", "/assets/"][1]
  };
  window.app=app;

}).call(this);
