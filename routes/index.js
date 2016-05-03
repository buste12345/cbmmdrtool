/**
 * This file is where you define your application routes and controllers.
 * 
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 * 
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 * 
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 * 
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 * 
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
	functions: importRoutes('./functions')
};

// Setup Route Bindings
exports = module.exports = function(app) {
	
	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.get('/blog/post/:post', routes.views.post);
	app.get('/mmdr/:mmdr', routes.views.mmdr);
	app.get('/mdashboard/:groupdid?', routes.views.mdashboard);
	
	/*mmdr gui*/
	app.all('/mgui', routes.views.mmdrgui);
	
	/*API VIEWS*/
	app.get('/api/post/list', keystone.middleware.api, routes.api.posts.list);
	app.all('/api/post/create', keystone.middleware.api, routes.api.posts.create);
	app.get('/api/post/:id', keystone.middleware.api, routes.api.posts.get);
	app.all('/api/post/:id/update', keystone.middleware.api, routes.api.posts.update);
	app.get('/api/post/:id/remove', keystone.middleware.api, routes.api.posts.remove);
	
	app.all('/api/mmdr/bothome', keystone.middleware.api, routes.api.mmdrs.bothome);
	app.all('/api/mmdr/updatemmdr', keystone.middleware.api, routes.api.mmdrs.updatemmdr);
	app.get('/api/mmdr/getlast', keystone.middleware.api, routes.api.mmdrs.getlast);
	app.all('/api/mmdr/create', keystone.middleware.api, routes.api.mmdrs.create);
	app.get('/api/mmdr/:mrdid', keystone.middleware.api, routes.api.mmdrs.get);

	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
	
};
