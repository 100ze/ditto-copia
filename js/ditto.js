function c(t){
    console.log(t);
}

const tabelaCustom = document.getElementById("tabela-custom");
const tabelaDefesa = document.getElementById("tabela-defesa");
const tabela4Movimentos = document.getElementById("tabela-4-movimentos");

const botaoFicha = document.getElementById("botao-ficha");
const botaoLimpar = document.getElementById("botao-limpar");

const ficha1 = {};
const ficha2 = {};

let fichaAtual = 1;

function adicionarFuncaoEmTabela(tabela, funcao){
    const botoes = tabela.querySelectorAll("button");

    for (let botao of botoes) {
        botao.addEventListener("click", funcao);
    }
}

function copie(){
    const tr = this.parentNode.parentNode;
    const inputs = tr.querySelectorAll("input");
    let valores = [];

    for (let input of inputs){
        valores.push(input.value);
    }

    navigator.clipboard.writeText(formate(valores));
}

function formate(arr){
    if(arr.length == 1){
        return arr[0];
    } else if (arr.length == 2){
        return arr[0] + "d6 + " + 
        arr[1];
    } else {
        return arr[0] + "d6 + " + 
        arr[1] + " + " +
        arr[2];
    }
}

function extraiValoresTabela(tabela){
    const inputs = tabela.querySelectorAll("input");
    let valores = [];

    for (let input of inputs) {
        valores.push(input.value);
    }

    return valores;
}

function salvaValoresNaFicha(ficha){
    ficha.tabelaCustom = extraiValoresTabela(tabelaCustom);
    ficha.tabelaDefesa = extraiValoresTabela(tabelaDefesa);
    ficha.tabela4Movimentos = extraiValoresTabela(tabela4Movimentos);
}

function insereValoresTabela(tabela, valoresFicha){
    if(valoresFicha instanceof Array){
        const inputs = tabela.querySelectorAll("input");
        let i = 0;

        for (let input of inputs) {
            input.value = valoresFicha[i];
            i++;
        }
    }
}

function insereValoresTodasAsTabelas(ficha){
   insereValoresTabela(tabelaCustom, ficha.tabelaCustom); 
   insereValoresTabela(tabelaDefesa, ficha.tabelaDefesa); 
   insereValoresTabela(tabela4Movimentos, ficha.tabela4Movimentos); 
}

function limparValoresTabelas(){
    const tabelas = [tabelaDefesa, tabela4Movimentos];

    for (let tabela of tabelas){
        const inputs = tabela.querySelectorAll("input");

        for (let input of inputs) {
            input.value = "";
        }
    }

    tabelaCustom.querySelector("input").value = "";
}

function mudarTextoBotao(){
    if(fichaAtual == 1){
        botaoFicha.innerText = "Ir para ficha 2";
    } else {
        botaoFicha.innerText = "Ir para ficha 1";
    } 
}

function mudarDeFicha(){
    if (fichaAtual == 1){
        salvaValoresNaFicha(ficha1);
        limparValoresTabelas();
        insereValoresTodasAsTabelas(ficha2);
    } else {
        salvaValoresNaFicha(ficha2);
        limparValoresTabelas();
        insereValoresTodasAsTabelas(ficha1);
    }

    fichaAtual = fichaAtual == 1 ? 2 : 1;
    mudarTextoBotao();
}

adicionarFuncaoEmTabela(tabelaCustom, copie);
adicionarFuncaoEmTabela(tabelaDefesa, copie);
adicionarFuncaoEmTabela(tabela4Movimentos, copie);

botaoFicha.addEventListener("click", mudarDeFicha);
botaoLimpar.addEventListener("click", limparValoresTabelas);