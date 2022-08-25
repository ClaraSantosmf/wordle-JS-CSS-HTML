// Palavra do dia está fixa, deve ser trocado pela API. Vamos trabalhar ela em uppercase https://rapidapi.com/sheharyar566/api/random-words5/?utm_source=ANIA-KUBOW&utm_medium=DevRel&utm_campaign=DevRel

const diaDeHoje = new Date().getDate()
console.log(diaDeHoje)

const palavraDoDia = Object.values(palavrasPossiveis[diaDeHoje])[0]

let dicaDoDia = Object.values(palavrasPossiveis[diaDeHoje])[1]
let dica = `Dica: ${dicaDoDia}`
// Linha inicial

let linha = 1
let jogoComecou = false

// Lista de palavras que irão para o localstore
let palavrasTentadas = JSON.parse(localStorage.getItem("palavras")) || []

// array que receberá as letras de cada rodada. Esse será reiniciado a cada linha 

let entrada = []

// Função para atualizar o locastorage
function limparStorage(palavraDoDia){
    let parametro = localStorage.palavraParametro
    if (!parametro){
        localStorage.setItem('palavraParametro', palavraDoDia)
    }
    else {
        if (parametro != palavraDoDia){
            localStorage.clear()
            localStorage.setItem('palavraParametro', palavraDoDia)
        }
        return
    }
    }
limparStorage(palavraDoDia)

// Função calculaOcorrencia é um reduce que contabiliza quantas vezes uma determinada letra estar presente na palavra do dia em formato de dicionário. Isso ajuda na comparação da entrada com a palavra do dia. 

function calculaOcorrencia(palavraContada) {
    return palavraContada.split('').reduce(function (letras, letraNova) {
        if (Object.keys(letras).includes(letraNova)) letras[letraNova] += 1
        else letras[letraNova] = 1
        return letras
    }, {})
}
// Palavra transformada pela função

const ocorrenciasPalavraDoDia = calculaOcorrencia(palavraDoDia)


// FUnções para finalizar o jogo

function venceuJogo() {
    let contador = 0
    startConfetti();
    setInterval(function () {
        if (contador == 5) {
            stopConfetti()
        }
        contador++
    }, 1000)
    document.body.removeEventListener('keydown', passarTeclaApertada)
    return
}


function fimDeJogo() {
    dica = `Você perdeu, a palavra do dia era ${palavraDoDia}`
    document.getElementById("dica").innerText = dica
    document.body.removeEventListener('keydown', passarTeclaApertada)
}

// Função que escuta o teclado e trata os casos com a captura do key do evento

function ouvinteDeTeclas(key) {
    let char = key;
    let alfabeto = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'ENTER', 'BACKSPACE'];

    // ifs que permite apenas inserção de teclas válidas.

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
        if (entrada.length != 5) {
            alert('Precisamos de uma palavra de 5 letras')
            return false
        }
        if (wordList.includes(entrada.join(''))) {
            validarEntrada()
            if (linha > 6) {
                fimDeJogo()
            };
            linha += 1
            return;
        } else {
            alert(`A palavra ${entrada.join('')} não existe em nosso banco de dados.`)
        }
    }

    //If localiza o ID o último quadradinho preenchido, coloca um espao vazio com textContent e retira o elemento da lista 

    if (char == 'BACKSPACE') {
        if (entrada.length != 0) {
            let elId = `l${linha}c${entrada.length}`
            const el = document.getElementById(elId)
            el.textContent = ''
            entrada.pop();
        }
        return;
    }

    //if com limitador de inserção de elementos quando a entrada e exibição de letras acima de 5.  

    if (entrada.length < 5 && char != "ENTER") {
        entrada.push(char)
    }
    if (entrada.length <= 5) {
        exibeLetra()
    }

}

// Função que exibe letra no local correto

function exibeLetra() {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = entrada[entrada.length - 1]
}

// função que captura evento do locastorage. 

function armazemDeLocalStorage() {
    // Essa função captura o array de cada tentativa e conserva o estado. Criando uma variável para JS que captura os itens do localStorage pela chave palavras, que me retornará um JSON.Foi necessário escolher o json para que possamos interar isso. 
    let itensDoLocalStorage = JSON.parse(localStorage.getItem("palavras"))
    // O problema que ocorre aqui é, cada vez que rolar um reload da página, a linha anterior acaba recriando o objeto, então, para evitar isso, itensDoLocalStorage será copiado a cada nova palavra
    if (!itensDoLocalStorage) {
        jogoComecou = true
        return
    }
    // palavrasTentadas.push(...itensDoLocalStorage)
    // palavrasTentadas.push(itensDoLocalStorage)
    if (localStorage.length > 0) {
        carregandoLocalStorage(itensDoLocalStorage)

    }
    jogoComecou = true
    return
}

function carregandoLocalStorage(itensDoLocalStorage) {
    for (palavraTentada of itensDoLocalStorage) {
        for (i = 0; i < (palavraTentada.length); i++) {
            ouvinteDeTeclas(palavraTentada[i])
        }
        ouvinteDeTeclas('ENTER')
    }
    return
}

function validarEntrada() {
    // Construindo localstore
    palavrasTentadas[linha - 1] = entrada.join('')
    if (jogoComecou) localStorage.setItem('palavras', JSON.stringify(palavrasTentadas))
    const ocorrenciaDaEntrada = {}
    if (entrada.join('') == palavraDoDia.toUpperCase()) {
        for (i = 0; i < 5; i++) {
            document.getElementById(`l${linha}c${i + 1}`).classList.add("fullcorrect")
            classeDeColorir = "fullcorrect"
        }
        for (letra of entrada){
            pintar_teclado(letra, classeDeColorir)
        }
        venceuJogo()
        return
    }

    // validador de cores
    // validador de algumas letras fullcorrect

    for (i = 0; i < 5; i++) {
        let letra = entrada[i];
        if (letra == palavraDoDia[i]) {
            document.getElementById(`l${linha}c${i + 1}`).classList.add("fullcorrect")
            classeDeColorir = "fullcorrect"
            ocorrenciaDaEntrada[letra] = (ocorrenciaDaEntrada[letra] || 0) + 1
            pintar_teclado(letra, classeDeColorir)
            continue

        }


        if (palavraDoDia.includes(letra) && (ocorrenciaDaEntrada[letra] || 0) < ocorrenciasPalavraDoDia[letra]) {
            document.getElementById(`l${linha}c${i + 1}`).classList.add("correct")
            ocorrenciaDaEntrada[letra] = (ocorrenciaDaEntrada[letra] || 0) + 1
            classeDeColorir = "correct"
            pintar_teclado(letra, classeDeColorir)
            continue

        }
        document.getElementById(`l${linha}c${i + 1}`).classList.add("incorrect")
        classeDeColorir = "incorrect"
        pintar_teclado(letra, classeDeColorir)
    }
    entrada = []

    if (linha == 6) {
        fimDeJogo()
    }
    return true


}

function pintar_teclado(letra, classeDeColorir){
    document.getElementById(`${letra}`).classList.add(classeDeColorir)
}



function passarTeclaApertada(e) { return ouvinteDeTeclas(e.key.toUpperCase()) }

const teclas = document.querySelectorAll('.tecla')

function tecladoVirtual(event) {
    if (event.target.classList.contains('delete')) {
        return ouvinteDeTeclas('BACKSPACE')
    } else {
        return ouvinteDeTeclas(event.target.innerHTML.toUpperCase())
    }

}

document.body.addEventListener('keydown', passarTeclaApertada)
document.getElementById("dica").innerText = dica

// DESAFIOS
// share, como compartilhar nas redes sociais? Tudo verdinho quando acabei

