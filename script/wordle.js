
// A linha precisa ser iniciada como 1
let linha = 1
let coluna = 1

function alocarNoQuadradinho(teclaValida){
// Gerando um id do quadradinho na combinação Linha + posição na coluna 
    let idLinhaColuna = `l${linha}c${coluna}`
    let quadradinho = document.getElementById(idLinhaColuna);
    console.log(quadradinho);
    quadradinho.textContent = teclaValida;
    coluna += 1    
}

// Essa função verifica quais teclas estão sendo clicadas e se ela é válida.
function tratandoTecla (event_){
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    let letraDoEvento = event_.key.toUpperCase()

    if (alfabeto.includes(letraDoEvento)){
    // só chama até a coluna ser o número de cinco.
        if (coluna <= 5){
            alocarNoQuadradinho(letraDoEvento)
        }

    }


}

// Esse é um evento que acionará vários BOs do código
document.body.addEventListener("keydown", tratandoTecla)