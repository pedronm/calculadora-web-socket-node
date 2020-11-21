const express = require("express");
const bodyParser = require('body-parser')
const parser = bodyParser.json()
const math = require("calc-module");
const app = express();
const http = require("http");
const https = require("https");
const port = 3400;
const portS = 3500;

http.createServer(app).listen(port)
https.createServer(app).listen(portS)

app.get('/calculus', parser, (req,res) => 
{	
    
    var resposta = ''

    var calc = req.body.calc
    var ops = math.calcsToArray(calc)

    if(ops != null && ops != undefined)
    {   
        resposta = math.doTheMathWArray(ops)
    }
    else{
     res.status(500).send('Operacao nao encontrada.')
    }

    res.json({resultado : resposta})
     
})