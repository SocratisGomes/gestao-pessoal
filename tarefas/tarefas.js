content.onload = function () {
  iniciaBanco();
};
function iniciaBanco() {
  let bancoTarefas = JSON.parse(localStorage.getItem("tarefas"));
  let conteudo = "";
  bancoTarefas.map((tarefa) => {
    conteudo += `
          <tr id='linha-${tarefa.id}'>
            <td class='selecao'>
            <input type="radio" name="campoSelecao" value="${tarefa.id}"/></td>
            <td class="celula-1">${tarefa.descricao}</td>
            <td class="celula-2">${formataData(tarefa.data)}</td>
            <td class="celula-3">${prioridade(tarefa.prioridade)}</td>
            <td></td>
          </tr>`;
    // modalTarefa.style.display = "none";
    corpoTabela.innerHTML = conteudo;
  });
}
//Botão para adicionar tarefas
btAdicionar.onclick = function () {
  campoDescricao.value = "";
  campoData.value = "";
  campoPrioridade.value = "";
  campoDescricao.disabled = false;
  campoData.disabled = false;
  campoPrioridade.disabled = false;
  modalTarefa.style.display = "block";
  btMTCriar.style.display = "inline-block";
  btMTAlterar.style.display = "none";
  btMTExcluir.style.display = "none";
  btMTCriar.disabled = true;
  campoDescricao.focus();
};

fechaModal.onclick = function () {
  modalTarefa.style.display = "none";
};

// Verifica se os três campos estão preenchidos antes de criar ou alterar tarefa
let liberaBotaoMT = function () {
  if (
    campoDescricao.value.length > 0 &&
    campoData.value.length > 0 &&
    campoPrioridade.value.length > 0
  ) {
    btMTCriar.disabled = false;
    btMTAlterar.disabled = false;
  } else {
    btMTCriar.disabled = true;
    btMTAlterar.disabled = true;
  }
};
campoDescricao.onkeyup = liberaBotaoMT;
campoData.onchange = liberaBotaoMT;
campoPrioridade.onchange = liberaBotaoMT;

// Confirma a criação da tarefa
btMTCriar.onclick = function () {
  let bancoTarefas = JSON.parse(localStorage.getItem("tarefas"));
  console.log(bancoTarefas);
  if (bancoTarefas == null) {
    bancoTarefas = [];
  }
  let tarefa = {
    descricao: campoDescricao.value,
    data: campoData.value,
    prioridade: campoPrioridade.value,
  };
  bancoTarefas.push(tarefa);

  //gera conteúdo da tabela
  let conteudo = "";
  conteudo += `
        <tr id='linha-${tarefa.id}'>
          <td class='selecao'>
          <input type="radio" name="campoSelecao" value="${tarefa.id}"/></td>
          <td class="celula-1">${tarefa.descricao}</td>
          <td class="celula-2">${formataData(tarefa.data)}</td>
          <td class="celula-3">${prioridade(tarefa.prioridade)}</td>
          <td></td>
        </tr>`;
  modalTarefa.style.display = "none";
  corpoTabela.innerHTML += conteudo;
  localStorage.setItem("tarefas", JSON.stringify(bancoTarefas));
  //comando abaixo limpa o localStorage
  // localStorage.setItem("tarefas", JSON.stringify([]));
};

// funções de apoio para formatar os valores da tabela
function prioridade(p) {
  let prioridades = ["Alta", "Média", "Baixa"];
  return prioridades[parseInt(p) - 1];
}

function formataData(d) {
  [ano, mes, dia] = d.split("-");
  return dia + "-" + mes + "-" + ano;
}
