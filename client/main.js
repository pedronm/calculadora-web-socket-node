window.onload = () => { 

    var frm = document.getElementById("frmMsgeria")
    var calculus = frm.elements['calculus']
    var resultado = frm.elements['resultado']
    var statusBar = frm.elements['status']
    var connBtnClose = frm.elements['desconectar']
    var calcular = frm.elements['calcular']
    var lastResponse = ''
    var socket = new WebSocket('ws:localhost:9990')
    
    //var adress = frm.elements['server'].value

    socket.onmessage = ( (message) => {
        if( message.data == null || message.data == undefined)
        {
            resultado.value = "Falha na execução do cálculo!"
        }else if(message.data != lastResponse){
            lastResponse = message.data
            resultado.value += `${calculus.value} = ${message.data} ` + '\n'
            statusBar.value = 'Executado com sucesso!'
        }

    })

    calcular.onclick = (event) =>  {
        event.preventDefault()

      socket.send(
        JSON.stringify({
            calc:calculus.value         
        }))
        
      statusBar.value = "Aguarde o processamento!"
    }

    connBtnClose.onclick = (event) => {
        event.preventDefault()

        socket.close()
    }

    resultado.onclick = () => resultado.value = ''
    
    socket.onerror = (error) => console.log("WebSocket Error: ", error)

    socket.onopen = (event) => {
        statusBar.value =
            "Conectado "
    }
    
    socket.onclose = () =>{
        statusBar.innerHtml = "Websocket desconectado."
    }

}