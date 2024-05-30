const cabecalho = document.querySelector("#cabecalho");
const menu = document.querySelector("#menu");
const inicio = document.querySelector("#um");
const tarefas = document.querySelector("#dois");
const anotacoes = document.querySelector("#tres");
const financeiro = document.querySelector("#quatro");
const gestao = document.querySelector("#cinco");
const pSeis = document.querySelector("#seis");
const principal = document.querySelector("#principal");

inicio.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./inicio/inicio.html");
});

tarefas.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./tarefas/tarefas.html");
});

anotacoes.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./anotacoes/anotacoes.html");
});

financeiro.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./financeiro/financeiro.html");
});

gestao.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./gestao/gestao.html");
});

pSeis.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./personalizar/personalizar.html");
});

const mudaPagina = (el, pagina) => {
  const abas = [...document.querySelectorAll(".aba")];
  abas.forEach((e) => {
    e.classList.remove("abaSelecionada");
  });
  el.classList.add("abaSelecionada");
  window.open(pagina, "ifPrincipal");
};

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
