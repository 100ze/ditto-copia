function c(t){
    console.log(t);
}

const tabelaCustom = document.getElementById("tabela-custom");
const tabelaDefesa = document.getElementById("tabela-defesa");
const tabela4Movimentos = document.getElementById("tabela-4-movimentos");

const botoesFichas = document.querySelectorAll(".botao-ficha");
const botaoLimpar = document.getElementById("botao-limpar");
const inputNomePokemon = document.getElementById("nome-pokemon");

const fichas = [];
for (let i = 0; i < 6; i++){
    fichas[i] = {};
}

let numeroDaFichaAtual = 1;

function getFicha(indice){
    return fichas[indice - 1];
}

function adicionarFuncaoEmTabela(tabela, funcao){
    const botoes = tabela.querySelectorAll("button");

    for (let botao of botoes) {
        botao.addEventListener("click", funcao);
    }
}

function adicionarFuncaoEmBotao(botoes, funcao){
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
    if (isNaN(arr[0])){
        return arr[0];
    }

    let rolagem = "";

    if(arr[0] && arr[0] > 0){
        rolagem += arr[0] + "d6";

        if(arr[1]){
            rolagem += " + " + arr[1];
        }

        if(arr[2]){
            rolagem += " + " + arr[2];
        }
    } else {
        rolagem = "O pobre Ditto não foi capaz de acompanhar o seu raciocínio superior :(";
    }

    return rolagem;
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
    ficha.inputNomePokemon = inputNomePokemon.value;
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

function insereValorNomePokemon(nome){
    if (nome){
        inputNomePokemon.value = nome;
    } else {
        inputNomePokemon.value = "";
    }
}

function insereValoresTodasAsTabelas(ficha){
   insereValoresTabela(tabelaCustom, ficha.tabelaCustom); 
   insereValoresTabela(tabelaDefesa, ficha.tabelaDefesa); 
   insereValoresTabela(tabela4Movimentos, ficha.tabela4Movimentos); 
}

function limparValores(limparBotao = false){
    const tabelas = [tabelaDefesa, tabela4Movimentos];

    for (let tabela of tabelas){
        const inputs = tabela.querySelectorAll("input");

        for (let input of inputs) {
            input.value = "";
        }
    }

    tabelaCustom.querySelector("input").value = "";
    inputNomePokemon.value = "";

    if (limparBotao){
        botoesFichas[numeroDaFichaAtual - 1].textContent = numeroDaFichaAtual;
    }
}

function mudarDeFicha(){
    const proximaFicha = getFicha(this.value);
    const fichaAtual =  getFicha(numeroDaFichaAtual);

    salvaValoresNaFicha(fichaAtual);
    limparValores();
    insereValoresTodasAsTabelas(proximaFicha);
    insereValorNomePokemon(proximaFicha.inputNomePokemon);

    numeroDaFichaAtual = this.value;
}

function mudarTextoBotao(){
    const texto = this.value;
    const botaoDaFicha = botoesFichas[numeroDaFichaAtual - 1];

    if(texto){
        botaoDaFicha.textContent = texto;
    } else {
        botaoDaFicha.textContent = numeroDaFichaAtual;
    }
}

function funcaoBotaoLimpar(){
    limparValores(true);
}

adicionarFuncaoEmTabela(tabelaCustom, copie);
adicionarFuncaoEmTabela(tabelaDefesa, copie);
adicionarFuncaoEmTabela(tabela4Movimentos, copie);

adicionarFuncaoEmBotao(botoesFichas, mudarDeFicha);

botaoLimpar.addEventListener("click", funcaoBotaoLimpar);
inputNomePokemon.addEventListener("keyup", mudarTextoBotao);