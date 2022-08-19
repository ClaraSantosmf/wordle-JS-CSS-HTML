// Palavra do dia está fixa, deve ser trocado pela API. Vamos trabalhar ela em uppercase https://rapidapi.com/sheharyar566/api/random-words5/?utm_source=ANIA-KUBOW&utm_medium=DevRel&utm_campaign=DevRel

const palavrasPossiveis ={
'01': ['APOIS', 'Pronto'],
'02': ['AVEXE','Se apresse'],
'03':['APOIS', 'Sinônimo de então'], 
'04':['AVIAR', 'Apesar'],
'05':['BANHA', 'Tomar banho'],
'06':['BABAO', 'Puxa-saco'],
'07':['BESTA', 'Desnorteado'],
'08':['BOIAR', 'Perdido'],
'09':['BULIR', 'Mexer'],
'10':['CARAI', 'Xingamento'],
'11':['CABRA', 'Homem'],
'12':['ACUNHA', 'Apresse'],
'13':['BRIBA', 'Inceto'],
'14':['FROXO', 'Pessoa com pouca coragem'],
'15':['FILAR', 'Colar na escola'],
'14':['GIBAO', 'Casaco de couro'],
'16':['GRAXA', 'Molho de carne'],
'17':['MUIER', 'Mulher'],
'18':['MANGA', 'Fruta e xingamento'],
'19':['MASSA', 'Muito bom'],
'20':['MIGUE', 'Disfarçar'],
'21':['PENSE', 'Ironia'],
'22':['RELAR', 'Arranhar'],
'23':['TORAR', 'Forçar, intensidade'],
'24':['RONXA', 'Hematoma'],
'25':['CHEIRO', 'Beijo'],
'26':['ZOADA', 'Muito RUim'],
'27':['MACHO', 'Homem'],
'28':['OPAIO', 'Olhe para isso'],
'29':['MERMO', 'Mesma coisa, igual'],
'30':['ZUADA', 'Muito barulho'],
'31':['VALHA', 'Deus me livre']}

const diaDeHoje = new Date().getDate()
console.log(diaDeHoje)

const palavraDoDia = Object.values(palavrasPossiveis[diaDeHoje])[0]

const dica = Object.values(palavrasPossiveis[diaDeHoje])[1]

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

function venceuJogo(){
    let contador = 0
    startConfetti();
    setInterval(function(){
        if (contador == 5){
            stopConfetti()
        }
        contador++
    }, 1000)
    return
}


function fimDeJogo(){
}

// Função que escuta o teclado e trata os casos com a captura do key do evento

function ouvinteDeTeclas (key) {
    let char = key;
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

    // ifs que permite apenas inserção de teclas válidas.

    if (!alfabeto.includes(char)) {
        console.log('tecla inválida', char)
        return null;
    }

    if (char == 'ENTER') {
        if ((Object.values(palavrasPossiveis).map(a => a[0])).includes(entrada.join(''))){
            if (!validarEntrada()) return; 
            if (linha > 6){
                fimDeJogo()};
             linha += 1
             return;
        } else {
            alert('Essa não é uma expressão nordestina')
        }
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
    // const ocorrenciaDaEntrada = calculaOcorrencia(entrada.join(''))
    const ocorrenciaDaEntrada = {}

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
        venceuJogo()
        return
    }

    // validador de cores
    // validador de algumas letras fullcorrect

    for (i = 0; i < 5; i ++){ 
        let letra = entrada[i];
        if (letra == palavraDoDia[i]){
            document.getElementById(`l${linha}c${i+1}`).classList.add("fullcorrect")
            ocorrenciaDaEntrada[letra] = (ocorrenciaDaEntrada[letra] || 0) + 1
            continue
            
        }
        // se eu considerar que ocorrencia da letra da entrada for maior que ocorrencia da palavra do dia, afeta e pinta tudo de amarelo. Caso considere o contrário, ele limita os amarelos a partir da quarta linha. pq?

        if (palavraDoDia.includes(letra) && (ocorrenciaDaEntrada[letra] || 0) < ocorrenciasPalavraDoDia[letra]){
            document.getElementById(`l${linha}c${i+1}`).classList.add("correct")
            ocorrenciaDaEntrada[letra] = (ocorrenciaDaEntrada[letra] || 0) + 1
            // ocorrenciaDaEntrada[letra]--
            continue
            
        }  
        document.getElementById(`l${linha}c${i+1}`).classList.add("incorrect")}
    entrada=[]
    return true
}

    document.body.addEventListener('keydown', function(e){return ouvinteDeTeclas(e.key.toUpperCase())})

    const teclas  = document.querySelectorAll('.tecla')

    function tecladoVirtual(event) {
        if(event.target.classList.contains('delete')){
            return ouvinteDeTeclas('BACKSPACE')
        } else {
            return ouvinteDeTeclas(event.target.innerHTML.toUpperCase())
        }
        
    }
   
    document.getElementById("dica").innerText = dica
            
 
// const ocorrencias = Object.assign({}, ocorrenciasPalavraDoDia)
// DESAFIOS
// Locahistorege para saber quantas vezes o cara jogou, se ele jogou.
// share, como compartilhar nas redes sociais? Tudo verdinho quando acabei
// Palavra válida - listar palavras com cinco eltras com uma constante
// navegador sabe que é tres vezes

