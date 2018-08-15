/* importar o módulo do framework 'express' */
var express = require('express');

/* importar o módulo 'consign' */
var consign = require('consign');

/* importa o módulo 'body-parser' */
var bodyParser = require('body-parser');

/* importar o módulo do 'express-validator' */
var expressValidator = require('express-validator');

/* iniciar o objeto do 'express' */
var app = express();	// essa é a instância que a nossa 'app.js' espera no require

/* setar as variaveis 'view engine' e 'views' do 'express' */
app.set('view engine', 'ejs');
app.set('views', './app/views');	// seta onde se localiza a estrutura de pastas e arquivos views do projeto

/* configur o middleware 'express.static' */
app.use(express.static('./app/public'));	// carrega os arquivos publicos como CSS, JS, Images

/* configurar o middleware 'body-parser' */
app.use(bodyParser.urlencoded({ extended: true }));	// para fazer o parser quando houver uma requisição ao nosso servidor via formulário.

/* configurar o middleware 'express-validator' já iniciando a função com () */
app.use(expressValidator());

/* efetua o autoload das rotas, dos modelos e dos controllers para o objeto 'app' */
consign()
	.include('app/routes')		// include das nossas rotas.
	.then('app/models')			// include dos nossos modelos
	.then('app/controllers')	// include dos nossos controllers
	.into(app);					// informa que todos os controllers e routes vão ser incluído dentro de nosso objeto 'app'


/* exportando o objeto 'app' */
module.exports = app;
