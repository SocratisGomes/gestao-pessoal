

//BOTÕES DAS ABAS
um.onclick = function(){
  location.href = '../home/index.html'
}
dois.onclick = function(){
  location.href = '../tarefas/tarefas.html'
}
quatro.onclick = function(){
  location.href = '../diario/diario.html'
}
// cinco.onclick = function(){
//   location.href = '../geral/geral.html'
// }

//CRUD
function createMes(mes,fncallback) {
  fetch("https://www.uuidgenerator.net/api/version4")
  .then((r) => r.text())
    .then((t) => {
      mes.id = t;
      let meses = readMeses();
      meses.push(mes);
     updateMes(meses);
     fncallback();
    })
    .catch((erro) => console.error(erro));
}
function readMeses() {
  // localStorage.clear()
  return JSON.parse(localStorage.getItem("meses")) || [];
}

// function readMeses(idTarefa) {
//   let mes = readMeses();
//   return mes.find((mes) => mes.id == idmes);
// }

function updateMes(meses) {
  localStorage.setItem("meses", JSON.stringify(meses));
}

// function updateMes(mesAtualizado) {
//   let mes = readMeses();
//   let indice = mes.findIndex((tarefa) => tarefa.id == mesAtualizado.id);
//   mes[indice] = mesAtualizado;
//   updateMes(mes);
// }

// function deleteTarefa(idExcluida) {
//   let tarefas = readMeses();
//   let indice = tarefas.findIndex((tarefa) => tarefa.id == idExcluida);
//   tarefas.splice(indice, 1);
//   updateTarefas(tarefas);
// }
// Inicia o banco de tarefas existentes no LocalStorage
function IniciaBanco(){
  // localStorage.setItem("tarefas", JSON.stringify([]));
  BancoMes = readMeses()
  let conteudo = "";
  BancoMes.forEach((item) => {
    conteudo += `
    <td class="celula-1">
      ${formataData(item.mes)}
    </td>
    <td class="celula-2"> 
      ${item.receita}
    </td>
    <td class="celula-3">
      ${item.despesa}
    </td>
    <td class="celula-4">
      ${item.sobra}
    </td>
    <td></td>
  </tr>
`;
  })
  corpoTabela.innerHTML = conteudo;
}


// Desenha a tabela com novas tarefas 
function mostraTabela() {
    // carrega dados
  let listaDeMeses = readMeses();
  dados = listaDeMeses.filter(
    (t) =>
      filtro.value === "" ||
      t.mes.toLowerCase().includes(filtro.value.toLowerCase())
  );

  // gera conteúdo da tabela
  let conteudo = "";
  dados.forEach((item) => {
    conteudo += `
  <tr id='linha-${item.id}'>
    <td class='selecao'>
          <input type="radio" name="campoSelecao" value="${item.id}" />
        </td>  
    <td class="celula-1">
      ${formataData(item.mes)}
    </td>
    <td class="celula-2"> 
      ${item.receita}
    </td>
    <td class="celula-3">
      ${item.despesa}
    </td>
    <td class="celula-4">
      ${item.sobra}
    </td>
    <td></td>
  </tr>
`;
  });
  corpoTabela.innerHTML = conteudo;

  // determina comportamento dos botões e outros componentes interativos
  let botoesSelecao = document.querySelectorAll("input[name=campoSelecao]");
  botoesSelecao.forEach((b) => {
    b.onclick = function (e) {
      btEditar.disabled = false;
      btExcluir.disabled = false;
    };
  });
  btAdicionar.disabled = false;
  btEditar.disabled = true;
  btExcluir.disabled = true;

  // atualiza gráfico de tarefas por prioridade
  // dadosGrafico = [0, 0, 0];
  // dados.forEach((t) => dadosGrafico[t.prioridade - 1]++);
  // chart.data.datasets[0].data = dadosGrafico;
  // chart.update();
}

// Mostra a janela modal para criação de nova tarefa
btAdicionar.onclick = function () {  
  campoMes.value = "";
  campoSal.value = "";
  campoExtra.value = "";
  campoNu.value = "";
  campoInter.value = "";
  campoC6.value = "";
  campoInvest.value = "";
  campoDinheiro.value = "";
  campoSobra.value = "";
  modalTarefa.style.display = "block";
  btMTCriar.style.display = "inline-block";
  btMTAlterar.style.display = "none";
  btMTExcluir.style.display = "none";
  btMTCriar.disabled = true;
  campoMes.focus();
};

// Verifica se os três campos estão preenchidos antes de criar ou alterar tarefa
let liberaBotaoMT = function () {
  let bloqueiaInput = document.getElementById('campoSobra') //Selecionando o input da sobra para bloquear alteração pelo usuáirio
  if (
    campoMes.value.length > 0 &&
    campoSal.value.length > 0 &&
    campoExtra.value.length > 0 &&
    campoNu.value.length > 0 &&
    campoInter.value.length > 0 &&
    campoC6.value.length > 0 &&
    campoInvest.value.length > 0 &&
    campoDinheiro.value.length > 0 
  ) {
    btMTCriar.disabled = false;
    btMTAlterar.disabled = false;
    bloqueiaInput.disabled = true; //Bloqueando digitação no input da sobra
    calculoSobra()    
  } else {
    btMTCriar.disabled = true;
    btMTAlterar.disabled = true;
  }
};
campoMes.onchange = liberaBotaoMT;
campoSal.onkeyup = liberaBotaoMT;
campoExtra.onkeyup = liberaBotaoMT;
campoNu.onkeyup = liberaBotaoMT;
campoInter.onkeyup = liberaBotaoMT;
campoC6.onkeyup = liberaBotaoMT;
campoInvest.onkeyup = liberaBotaoMT;
campoDinheiro.onkeyup = liberaBotaoMT;
campoSobra.onkeyup = liberaBotaoMT;

//Calcula a sobra das receitas - despesas e é add no campo sobra na mesma tela após o onkeyup
function calculoSobra(){
  let salario = parseFloat(document.getElementById('campoSal').value);
  let extra = parseFloat(document.getElementById('campoExtra').value);
  let nubank = parseFloat(document.getElementById('campoNu').value);
  let inter = parseFloat(document.getElementById('campoInter').value);
  let c6 = parseFloat(document.getElementById('campoC6').value);
  let invest = parseFloat(document.getElementById('campoInvest').value);
  let dinheiro = parseFloat(document.getElementById('campoDinheiro').value);
  let receita = salario + extra;
  let despesa = nubank + inter + c6 + invest + dinheiro;
  let result = receita - despesa;

  document.getElementById('campoSobra').value = result  
}

// Confirma a criação da tarefa
btMTCriar.onclick = function () {
  let salario = parseFloat(document.getElementById('campoSal').value);
  let extra = parseFloat(document.getElementById('campoExtra').value);
  let nubank = parseFloat(document.getElementById('campoNu').value);
  let inter = parseFloat(document.getElementById('campoInter').value);
  let c6 = parseFloat(document.getElementById('campoC6').value);
  let invest = parseFloat(document.getElementById('campoInvest').value);
  let dinheiro = parseFloat(document.getElementById('campoDinheiro').value);
  let receita = salario + extra;
  let despesa = nubank + inter + c6 + invest + dinheiro;
  let result = receita - despesa;

  let mes = {
    mes: campoMes.value,
    receita: receita,
    despesa: despesa,
    sobra: result,
  };
  createMes(mes, mostraTabela);
  modalTarefa.style.display = "none";
};

// // Mostra a janela modal para edição de uma tarefa existente
// btEditar.onclick = function () {
//   let selecoes = Array.from(
//     document.querySelectorAll("input[name=campoSelecao]")
//   );
//   let selecionado = selecoes.find((i) => i.checked == true);
//   if (selecionado) {
//     let tarefa = readTarefa(selecionado.value);
//     campoMes.value = tarefa.descricao;
//     campoSal.value = tarefa.data;
//     campoPrioridade.value = tarefa.prioridade;
//     campoID.value = tarefa.id;
//     campoMes.disabled = false;
//     campoSal.disabled = false;
//     campoPrioridade.disabled = false;
//     modalTarefa.style.display = "block";
//     btMTCriar.style.display = "none";
//     btMTAlterar.style.display = "inline-block";
//     btMTExcluir.style.display = "none";
//     btMTAlterar.disabled = false;
//     campoMes.focus();
//   }
// };

// // Confirma a alteração da tarefa
// btMTAlterar.onclick = function () {
//   let tarefaEditada = {
//     id: campoID.value,
//     descricao: campoMes.value,
//     data: campoSal.value,
//     prioridade: campoPrioridade.value,
//   };
//   updateTarefa(tarefaEditada);
//   modalTarefa.style.display = "none";
//   mostraTabela();
// };

// // Mostra a janela modal para exclusão de uma tarefa existente
// btExcluir.onclick = function () {
//   let selecoes = Array.from(
//     document.querySelectorAll("input[name=campoSelecao]")
//   );
//   let selecionado = selecoes.find((i) => i.checked == true);
//   if (selecionado) {
//     let tarefa = readTarefa(selecionado.value);
//     campoMes.value = tarefa.descricao;
//     campoSal.value = tarefa.data;
//     campoPrioridade.value = tarefa.prioridade;
//     campoID.value = tarefa.id;
//     campoMes.disabled = true;
//     campoSal.disabled = true;
//     campoPrioridade.disabled = true;
//     modalTarefa.style.display = "block";
//     btMTCriar.style.display = "none";
//     btMTAlterar.style.display = "none";
//     btMTExcluir.style.display = "inline-block";
//   }
// };

// // Confirma a exclusão da tarefa
// btMTExcluir.onclick = function () {
//   deleteTarefa(campoID.value);
//   modalTarefa.style.display = "none";
//   mostraTabela();
// };

// // Cancela a criação, alteração ou exclusão da tarefa
// btMTCancelar.onclick = function () {
//   modalTarefa.style.display = "none";
// };

// Configura o botão de fechar a janela modal
fechaModal.onclick = function () {
  modalTarefa.style.display = "none";
};

// // Ordenação pelas três colunas
// th1.onclick = () => {
//   let dados = readMeses();
//   dados.sort((a, b) =>
//     a.descricao.localeCompare(b.descricao, "pt-br", { sensitivity: "base" })
//   );
//   updateTarefas(dados);
//   mostraTabela();
// };
// th2.onclick = () => {
//   let dados = readMeses();
//   dados.sort((a, b) =>
//     a.data.localeCompare(b.data, "pt-br", { sensitivity: "base" })
//   );
//   updateTarefas(dados);
//   mostraTabela();
// };
// th3.onclick = () => {
//   let dados = readMeses();
//   dados.sort((a, b) =>
//     a.prioridade.localeCompare(b.prioridade, "pt-br", { sensitivity: "base" })
//   );
//   updateTarefas(dados);
//   mostraTabela();
// };

// // funções de apoio para formatar os valores da tabela
// function prioridade(p) {
//   let prioridades = ["Alta", "Média", "Baixa"];
//   return prioridades[parseInt(p) - 1];
// }
function formataData(d) {
  [ano, mes] = d.split("-");
  return mes + "-" + ano;
}

// // Funções para tratamento do filtro
// limpaFiltro.onclick = function () {
//   filtro.value = "";
//   mostraTabela();
// };

// filtro.onkeyup = function () {
//   mostraTabela();
// };

// // Após preparar todo o código, desenha a versão preliminar da tabela, com dados já existentes
IniciaBanco();
mostraTabela();
