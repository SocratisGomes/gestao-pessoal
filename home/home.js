
//Relógio digital
function relogio(){
    let horas = document.getElementById('horas')
    let minutos = document.getElementById('minutos')
    let segundos = document.getElementById('segundos')
  
    let date = new Date();
    let horaAtual = date.getHours()
    let minutoAtual = date.getMinutes()
    let segundoAtual = date.getSeconds()
  
    horas.textContent = fixTime(horaAtual)
    minutos.textContent = fixTime(minutoAtual)
    segundos.textContent = fixTime(segundoAtual)
  }
  
  function fixTime(time){
    return time < 10 ? '0'+time : time
  }
  relogio()
  setInterval(relogio, 1000)


