const http = require("http");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port:9990 });

const API_URL = 'http://localhost:3400'

wss.on("connection", (ws) => {
    ws.on("message", (message) => {

		var options = {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'content-length': Buffer.byteLength(message),
				'charset' : 'UTF-8'
			}
		}	

		const req = http.request(`${API_URL}/calculus`,options, (res) => {
			
			res.setEncoding('utf8')

			res.on('data', (res) => {
				ws.send(JSON.parse(res).resultado)
			})
		})
		req.on('error', (e) =>{
			console.log('Erro ao conectar', e)
			ws.send(e)
		})
		req.write(message)
		req.end()		

    })
});
