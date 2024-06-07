//BOTÕES DAS ABAS
um.onclick = function(){
  location.href = 'index.html'    
}
dois.onclick = function(){
  location.href = '/tarefas/tarefas.html' 
}
tres.onclick = function(){
  location.href = '/financeiro/financeiro.html'
}
quatro.onclick = function(){
  location.href = '/diario/diario.html'
}
cinco.onclick = function(){
  location.href = '/geral/geral.html'
}

function mudaPagina(pagina){
  let abas = [...document.querySelectorAll(".aba")];
  console.log(abas)
  abas.forEach((e) => {
    e.classList.remove("abaSelecionada");
  });
  el.classList.add("abaSelecionada");
  window.open(pagina);
};
// const menu = document.querySelector("#menu");
// const home = document.querySelector("#um");
// const tarefas = document.querySelector("#dois");
// const financas = document.querySelector("#tres");
// const diario = document.querySelector("#quatro");
// const geral = document.querySelector("#cinco");

// // const principal = document.querySelector("#principal");

// home.addEventListener("click", (evt) => {
//   mudaPagina(evt.target, "../index/index.html");
// });

// tarefas.addEventListener("click", (evt) => {
//   mudaPagina(evt.target, "../tarefas/tarefas.html");
// });

// financas.addEventListener("click", (evt) => {
//   mudaPagina(evt.target, "../financeiro/financeiro.html");
// });

// diario.addEventListener("click", (evt) => {
//   mudaPagina(evt.target, ".../anotacoes/anotacoes.html");
// });

// geral.addEventListener("click", (evt) => {
//   mudaPagina(evt.target, "..../gestao/gestao.html");
// });

// const mudaPagina = (el, pagina) => {
//   const abas = [...document.querySelectorAll(".aba")];
//   abas.forEach((e) => {
//     e.classList.remove("abaSelecionada");
//   });
//   el.classList.add("abaSelecionada");
//   window.open(pagina, "Principal");
// };

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



