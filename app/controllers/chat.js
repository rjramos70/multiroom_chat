module.exports.iniciaChat = function(application, req, res){

	// Recebe o body do formulário e recuperar o valor do campo 'name="apelido"'
	var dadosForm = req.body;

	// Validando que o campo apelido não esteja vazio e que seja de tamanho entre 3 e 15 caracteres.
	req.assert('apelido', 'Nome ou apelido é obrigatório.').notEmpty();
	req.assert('apelido', 'Nome ou apelido deve conter entre 3 e 15 caracteres.').len(3, 15);

	var erros = req.validationErrors();

	if(erros){
		res.render('index', { validacao: erros });
		return;
	}



	/* emit()...  -->  Pedi para executar alguma ação */
	// recuperamos a variavel global 'io' da nossa instância 'application' e executamos a emissão da mensagem 'msgParaCliente'.
	application.get('io').emit(
		'msgParaCliente', 
		{ apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat.' }
	);


	/* on()... --> Ouvindo pedidos de execução */

	res.render('chat', { dadosForm: dadosForm });	// renderiza a view 'chat.ejs'

}