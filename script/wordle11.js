// Palavra do dia está fixa, deve ser trocado pela API. Vamos trabalhar ela em uppercase https://rapidapi.com/sheharyar566/api/random-words5/?utm_source=ANIA-KUBOW&utm_medium=DevRel&utm_campaign=DevRel

let palavraDoDia = 'arroz'.toUpperCase()

// Linha inicial

let linha = 1

// array que receberá as letras de cada rodada. Esse será reiniciado a cada linha 

let entrada = []

// Função calculaOcorrencia é um reduce que contabiliza quantas vezes uma determinada letra estar presente na palavra do dia em formato de dicionário. Isso ajuda na comparação da entrada com a palavra do dia. 

function calculaOcorrencia(palavraContada){
    return palavraContada.split('').reduce(function(letras, letraNova) {if (Object.keys(letras).includes(letraNova)) letras[letraNova] += 1
        else letras[letraNova] = 1
        return letras 
    }, {})
}
// Palavra transformada pela função

const ocorrenciasPalavraDoDia = calculaOcorrencia(palavraDoDia)


// Função para finalizar o jogo

function fimDeJogo(){
    alert("JOGO CABO!")
}

// Função que escuta o teclado e trata os casos com a captura do key do evento

function ouvinteDeTeclas (event) {
    let char = event.key.toUpperCase();
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    // ifs que permite apenas inserção de teclas válidas.

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
       if (!validarEntrada()) return; 
       if (linha > 6){
           fimDeJogo()}
           ;
        linha += 1
        return;
    }

    //If localiza o ID o último quadradinho preenchido, coloca um espao vazio com textContent e retira o elemento da lista 

    if (char == 'BACKSPACE'){
        if (entrada.length !=0 ){
            let elId = `l${linha}c${entrada.length}`
            const el = document.getElementById(elId)
            el.textContent = ''
            entrada.pop();
        }
        return;
    }

    //if com limitador de inserção de elementos quando a entrada e exibição de letras acima de 5.  

    if (entrada.length < 5){
        entrada.push(char)  
    }
    if (entrada.length <= 5){
        exibeLetra()  
    }

}

// Função que exibte letra no local correto

function exibeLetra(letra) {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = entrada[entrada.length-1]
}

// Função que captura entrada 

function validarEntrada() {

// Foi preciso usar o .join porque a entrada já vem como array
const ocorrenciaDaEntrada = calculaOcorrencia(entrada.join(''))

    // Trava para que haja 5 letras
    if (entrada.length != 5){
        alert('Precisamos de uma palavra de 5 letras')
        return false
    }

    // Validador de Palavra certa.

    if (entrada.join('') == palavraDoDia.toUpperCase()){
        for (i = 0; i < 5; i++){
        document.getElementById(`l${linha}c${i+1}`).classList.add("fullcorrect")
        }
        return
    }

    // validador de cores
    // validador de algumas letras fullcorrect

    for (i = 0; i < 5; i ++){ 
        letra = entrada[i];
        if (entrada[i] == palavraDoDia[i]){
            document.getElementById(`l${linha}c${i+1}`).classList.add("fullcorrect")
            // ocorrencias[letra]--
            continue
            
        }
        // se eu considerar que ocorrencia da letra da entrada for maior que ocorrencia da palavra do dia, afeta e pinta tudo de amarelo. Caso considere o contrário, ele limita os amarelos a partir da quarta linha. pq?

        if (palavraDoDia.includes(letra) && ocorrenciaDaEntrada[letra] >= ocorrenciasPalavraDoDia[letra]){
            document.getElementById(`l${linha}c${i+1}`).classList.add("correct")
            ocorrenciaDaEntrada[letra]--
            continue
            
        }  
        document.getElementById(`l${linha}c${i+1}`).classList.add("incorrect")}
    entrada=[]
    return true
}

    document.body.addEventListener('keydown', ouvinteDeTeclas)



// const ocorrencias = Object.assign({}, ocorrenciasPalavraDoDia)
// DESAFIOS
// Locahistorege para saber quantas vezes o cara jogou, se ele jogou.
// share, como compartilhar nas redes sociais? Tudo verdinho quando acabei
// Palavra válida - listar palavras com cinco eltras com uma constante
// navegador sabe que é tres vezes

