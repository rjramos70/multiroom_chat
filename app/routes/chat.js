module.exports = function(application){
	// requisições via POST
	application.post('/chat', function(req, res){
		application.app.controllers.chat.iniciaChat(application, req, res);
	});

	// requisições via GET
	application.get('/chat', function(req, res){
		application.app.controllers.chat.iniciaChat(application, req, res);
	});
}