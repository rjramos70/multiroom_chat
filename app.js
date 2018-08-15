/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var server = app.listen(8000, function(){
	console.log('Servidor online');
})

/* Encapsulamos nossa requisição HTTP na variavel 'server',
fizemos o require do módulo 'socket.io' e utilizamos a mesma
porta para os dois protocolos escutarem requisições */
var io = require('socket.io').listen(server);

/* vamos criar uma variável global para podermos utilizar tanto do lado cliente,
quando do lado servidor, vamos usado o método set passando um nome e um valor */
app.set('io', io);

/* ------ Criar a conexão por websocket ----- */
/* informar que estamos escutando eventos de conexão */
io.on('connection', function(socket){

	console.log('Usuário se conectou.');


	/* Evento de desconexão */
	socket.on('disconnect', function(){
		console.log('Usuário se desconectou!');
	});

	/* Evento que recebe a mensagem digitada pelo usuário 'msgParaServidor' */
	socket.on('msgParaServidor', function(data){
		/* Assim que receber uma mensagem, emitir de volta para o cliente que digitou a mensagem */
		socket.emit(
			'msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		/* Assim que receber uma mensagem, emitir a mensage para os outros usuário que estão no chat, menos para quem enviou a mensagem */
		socket.broadcast.emit(
			'msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem }
		);

		/* Atualizar a relação de participantes */
		if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
			socket.emit(
				'participantesParaCliente', 
				{ apelido: data.apelido }
			);

			/* broadcast */
			socket.broadcast.emit(
				'participantesParaCliente', 
				{ apelido: data.apelido }
			);
		}

	});


});






