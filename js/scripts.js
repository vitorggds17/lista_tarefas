// Selecionando elementos
const form = document.querySelector("#form");
const inputTarefa = document.querySelector("#tarefa");
const msgErroTarefa = document.querySelector("#msgErroTarefa");
const containerTarefas = document.querySelector("#containerTarefas");

// Eventos
form.addEventListener("submit", validarForm);
inputTarefa.addEventListener("input", removerErro);

// Funções

// Função que valida o formulário
function validarForm(event){
    event.preventDefault();

    // Verifica se usuário não informou uma tarefa
    if(inputTarefa.value === ""){
        exibirErro("Por favor, informe uma tarefa");

        return;
    }

    adicionarTarefa();
}

// Função que remove o erro do input de tarefa
function removerErro(){
    inputTarefa.classList.remove("erro");

    msgErroTarefa.innerText = "";
    msgErroTarefa.classList.remove("ativo");
}

// Função que exibe o erro do input de tarefa
function exibirErro(msg){
    inputTarefa.classList.add("erro");

    msgErroTarefa.innerText = msg;
    msgErroTarefa.classList.add("ativo");
}

// Função que adiciona uma tarefa
function adicionarTarefa(){
    const tarefa = document.createElement("div");
    let iconesSelecaoTarefa, iconesDelecaoTarefa;
    
    tarefa.classList.add("tarefa");
    tarefa.innerHTML = `<div class="box-selecao-tarefa">
                            <i class="bi bi-circle icone-selecao-tarefa"></i>
                        </div>
                        <div class="txt-tarefa">${inputTarefa.value}</div>
                        <div class="box-delecao-tarefa">
                            <i class="bi bi-trash-fill"></i>
                        </div>`;

    containerTarefas.appendChild(tarefa);

    inputTarefa.value = "";
    inputTarefa.focus();

    iconesSelecaoTarefa = document.querySelectorAll(".icone-selecao-tarefa");
    iconesDelecaoTarefa = document.querySelectorAll(".bi-trash-fill");

    iconesSelecaoTarefa.forEach(iconeSelecTarefa => {
        iconeSelecTarefa.addEventListener("click", marcarTarefa);
    });

    iconesDelecaoTarefa.forEach(iconeDelecTarefa => {
        iconeDelecTarefa.addEventListener("click", deletarTarefa);
    });
}

// Função que marca uma tarefa como concluída
function marcarTarefa(event){
    const tarefa = event.target.closest(".tarefa");

    // Verifica se tarefa não está marcada
    if(!tarefa.classList.contains("marcada")){
        tarefa.classList.add("marcada");

        event.target.classList.remove("bi-circle");
        event.target.classList.add("bi-check-circle-fill");

        containerTarefas.appendChild(tarefa);

        return;
    }

    tarefa.classList.remove("marcada");

    event.target.classList.remove("bi-check-circle-fill");
    event.target.classList.add("bi-circle");
}

// Funlção que deleta uma tarefa
function deletarTarefa(event){
    event.target.closest(".tarefa").remove();
}