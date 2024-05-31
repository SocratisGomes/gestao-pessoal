const cabecalho = document.querySelector("#cabecalho");
const menu = document.querySelector("#menu");
const home = document.querySelector("#um");
const tarefas = document.querySelector("#dois");
const anotacoes = document.querySelector("#tres");
const financeiro = document.querySelector("#quatro");
const gestao = document.querySelector("#cinco");
const pSeis = document.querySelector("#seis");
const principal = document.querySelector("#principal");

home.addEventListener("click", (evt) => {
  mudaPagina(evt.target, "./home/home.html");
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


