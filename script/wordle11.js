const palavrasValidas = ['arroz', 'amora', 'teste']

let palavraDoDia = 'arroz'
palavraDoDia = palavraDoDia.toUpperCase()

let linha = 1

let entrada = []


// ocorrencias conta quantas vezes uma determinada letra estar presente na palavra do dia. O que ajuda na transformação de letras corretas deslocadas. 

function calculaOcorrencia(palavraContada){
    return palavraContada.split('').reduce(function(letras, letraNova) {if (Object.keys(letras).includes(letraNova)) letras[letraNova] += 1
        else letras[letraNova] = 1
        return letras 
    }, {})
}

const ocorrenciasPalavraDoDia = calculaOcorrencia(palavraDoDia)


function ouvinteDeTeclas (event) {
    let char = event.key.toUpperCase();
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
       if (!validarEntrada()) return; 
        linha += 1
        return;
    }

    if (char == 'BACKSPACE'){
        if (entrada.length !=0 ){
            let elId = `l${linha}c${entrada.length}`
            const el = document.getElementById(elId)
            el.textContent = ''
            entrada.pop();
        }
        return;
    }
    if (entrada.length < 5){
        entrada.push(char)  
    }
    if (entrada.length <= 5){
        exibeLetra()  
    }

}

function fimDeJogo(){
    alert("O jogo acabou!")
    location.reload()
}

function exibeLetra(letra) {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = entrada[entrada.length-1]
}

function validarEntrada() {
    const ocorrencias = Object.assign({}, ocorrenciasPalavraDoDia)
    // Foi preciso usar o .join porque a entrada já vem como array
    const ocorrenciaDaEntrada = calculaOcorrencia(entrada.join(''))


    // Trava para ter 5 letras
    if (entrada.length != 5){
        alert('Precisamos de uma palavra de 5 letras')
        return false
    }
    // validador de fullcorrect
    if (entrada.join('') == palavraDoDia.toUpperCase()){
        for (i = 0; i < 5; i++){
        document.getElementById(`l${linha}c${i+1}`).classList.toggle("fullcorrect")
        }
        return
    }


    // validador de algumas letras fullcorrect
    for (i = 0; i < 5; i ++){ 
        letra = entrada[i];
        if (entrada[i] == palavraDoDia[i]){
            document.getElementById(`l${linha}c${i+1}`).classList.toggle("fullcorrect")
            // ocorrencias[letra]--
            continue
        }
        if (palavraDoDia.includes(letra) && ocorrenciaDaEntrada[letra] <= ocorrencias[letra]){
            document.getElementById(`l${linha}c${i+1}`).classList.toggle("correct")
            // ocorrencias[letra]--
            continue
        }  
        document.getElementById(`l${linha}c${i+1}`).classList.toggle("incorrect")}
    // debugger
    
    entrada=[]
    return true
}

    document.body.addEventListener('keydown', ouvinteDeTeclas)