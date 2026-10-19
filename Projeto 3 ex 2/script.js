
const formDespesa = document.getElementById("formDespesa");
const descricao = document.getElementById("descricao");
const valor = document.getElementById("valor");
const data = document.getElementById("data");

const filtroData = document.getElementById("filtroData");
const btnTodas = document.getElementById("btnTodas");
const btnExcluirTudo = document.getElementById("btnExcluirTudo");

const listaDespesas = document.getElementById("listaDespesas");
const quantidade = document.getElementById("quantidade");
const tipoFiltro = document.getElementById("tipoFiltro");
const total = document.getElementById("total");
const mensagemVazia = document.getElementById("mensagemVazia");

const CHAVE = "despesas";
const SEPARADOR = "||";


function formatarMoeda(numero) {
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


function formatarData(dataISO) {
    const partes = dataISO.split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
}


formDespesa.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = descricao.value.trim();
    const valorNumerico = Number(valor.value);
    const dataSelecionada = data.value;

    if (nome === "" || valorNumerico <= 0 || !dataSelecionada) {
        alert("Preencha todos os campos corretamente.");
        return;
    }

    
    if (nome.includes(":") || nome.includes("|")) {
        alert("A descrição não pode conter : ou |.");
        return;
    }

    const registro =
        nome + ":" + valorNumerico + ":" + dataSelecionada;

    const dadosAntigos = localStorage.getItem(CHAVE);

    if (dadosAntigos === null || dadosAntigos === "") {
        localStorage.setItem(CHAVE, registro);
    } else {
        localStorage.setItem(
            CHAVE,
            dadosAntigos + SEPARADOR + registro
        );
    }

    formDespesa.reset();

    
    renderizarDespesas();
});


function renderizarDespesas() {
    listaDespesas.innerHTML = "";

    const dados = localStorage.getItem(CHAVE);
    const filtro = filtroData.value;

    let totalGasto = 0;
    let quantidadeItens = 0;

    if (dados !== null && dados !== "") {
        const registros = dados.split(SEPARADOR);

        for (const registro of registros) {
            const campos = registro.split(":");

            if (campos.length !== 3) {
                continue;
            }

            const nome = campos[0];
            const valorNumerico = Number(campos[1]);
            const dataDespesa = campos[2];

            
            if (filtro !== "" && dataDespesa !== filtro) {
                continue;
            }

            const linha = document.createElement("tr");

            const colunaData = document.createElement("td");
            const colunaDescricao = document.createElement("td");
            const colunaValor = document.createElement("td");

            colunaData.textContent = formatarData(dataDespesa);
            colunaDescricao.textContent = nome;
            colunaValor.textContent = formatarMoeda(valorNumerico);

            linha.append(
                colunaData,
                colunaDescricao,
                colunaValor
            );

            listaDespesas.appendChild(linha);

            totalGasto += valorNumerico;
            quantidadeItens++;
        }
    }

    quantidade.textContent = quantidadeItens;
    total.textContent = formatarMoeda(totalGasto);

    tipoFiltro.textContent = filtro
        ? "(Data: " + formatarData(filtro) + ")"
        : "(Todas as datas)";

    mensagemVazia.hidden = quantidadeItens !== 0;
}


filtroData.addEventListener("change", function() {
    renderizarDespesas();
});


btnTodas.addEventListener("click", function() {
    filtroData.value = "";
    renderizarDespesas();
});


btnExcluirTudo.addEventListener("click", function() {
    const dados = localStorage.getItem(CHAVE);

    if (dados === null || dados === "") {
        alert("Não existem despesas para excluir.");
        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir todas as despesas?"
    );

    if (confirmar) {
        localStorage.removeItem(CHAVE);
        filtroData.value = "";
        renderizarDespesas();
    }
});


renderizarDespesas();
