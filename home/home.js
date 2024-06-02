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

  /// Cria o gráfico de tarefas por prioridade
let dadosGrafico = [0, 0, 0];
let seriesGrafico = {
  labels: ["Alta", "Média", "Baixa"],
  datasets: [
    {
      label: "Tarefas",
      data: dadosGrafico,
      borderWidth: 1,
    },
  ],
};
let chart = new Chart(grafico, {
  type: "bar",
  data: seriesGrafico,
  options: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
});