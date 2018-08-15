module.exports.home = function(application, req, res){

	res.render('index', { validacao: {} });	// como já temos nossa view, simplesmente mandamos renderizar nossa view index.ejs

}