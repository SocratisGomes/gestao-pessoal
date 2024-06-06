/* 
TAREFAS
number: id
string: descricao
number: data
number: prioridade
*/

function createTarefa(tarefa, fncallback) {
  fetch("https://www.uuidgenerator.net/api/version4")
    .then((r) => r.text())
    .then((t) => {
      tarefa.id = t;
      let tarefas = readTarefas();
      tarefas.push(tarefa);
      updateTarefas(tarefas);
      fncallback();
    })
    .catch((erro) => console.error(erro));
}

function readTarefas() {
  return JSON.parse(localStorage.getItem("mes")) || [];
}

function readTarefa(idTarefa) {
  let tarefas = readTarefas();
  return tarefas.find((tarefa) => tarefa.id == idTarefa);
}

function updateTarefas(tarefas) {
  localStorage.setItem("mes", JSON.stringify(tarefas));
}

function updateTarefa(tarefaAtualizada) {
  let tarefas = readTarefas();
  let indice = tarefas.findIndex((tarefa) => tarefa.id == tarefaAtualizada.id);
  tarefas[indice] = tarefaAtualizada;
  updateTarefas(tarefas);
}

function deleteTarefa(idExcluida) {
  let tarefas = readTarefas();
  let indice = tarefas.findIndex((tarefa) => tarefa.id == idExcluida);
  tarefas.splice(indice, 1);
  updateTarefas(tarefas);
}
