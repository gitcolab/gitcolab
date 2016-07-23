var BackboneRouter = Backbone.Router.extend({
    routes: {
        "*actions": "defaultRoute"
    }
});
// Initiate the router
var Router = new BackboneRouter;

Router.on('route:defaultRoute', function(actions) {

});

Backbone.history.start();

export default Router;

