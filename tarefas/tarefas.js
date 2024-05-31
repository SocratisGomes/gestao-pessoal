content.onload = function () {
  iniciaBanco();
};
function iniciaBanco() {
  // localStorage.setItem("tarefas", JSON.stringify([]));
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
    console.log(tarefa.id)
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

//Mostra popup para exclusão de uma tarefa existente
btExcluir.onclick = function () {
  let bancoTarefas = JSON.parse(localStorage.getItem("tarefas"));
  console.log(bancoTarefas);
  let selecoes = [...document.querySelectorAll("name=campoSelecao")];

  console.log(selecoes);
  // let selecoes = document.querySelectorAll('imput[campoSelecao]')
  let selecionado = selecoes.find((i) => i.checked == true);
  console.log(selecionado);
  if (selecionado) {
    bancoTarefas = selecionado.value;
    console.log(selecionado.value);
    campoDescricao.value = tarefa.descricao;
    console.log(selecionado.value);
    campoData.value = tarefa.data;
    campoPrioridade.value = tarefa.prioridade;
    campoID.value = tarefa.id;
    campoDescricao.disabled = true;
    campoData.disabled = true;
    campoPrioridade.disabled = true;
    modalTarefa.style.display = "block";
    btMTCriar.style.display = "none";
    btMTAlterar.style.display = "none";
    btMTExcluir.style.display = "inline-block";
  }
};

// Confirma a exclusão da tarefa
btMTExcluir.onclick = function () {
  deleteTarefa(campoID.value);
  modalTarefa.style.display = "none";
  mostraTabela();
};

// Cancela a criação, alteração ou exclusão da tarefa
btMTCancelar.onclick = function () {
  modalTarefa.style.display = "none";
};
