const palavrasValidas = ['arroz', 'amora', 'teste']

const palavraDoDia = 'arroz'

let linha = 1

let entrada = []

let JogoAcabou = false // construa e use esse script//

function ouvinteDeTeclas (event) {
    let char = event.key.toUpperCase();
    let alfabeto = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q',
        'R','S','T','U','V','W','X','Y','Z', 'ENTER', 'BACKSPACE'];

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

function exibeLetra(letra) {
    let elId = `l${linha}c${entrada.length}`
    const el = document.getElementById(elId)
    el.textContent = entrada[entrada.length-1]
}

function validarEntrada() {
    console.log('validar se ' + entrada + ' é igual ' + palavraDoDia)
    if (entrada.length != 5){
        alert('Precisamos de uma palavra de 5 letras')
        return false
    }
    else{
        if (entrada.join('') == palavraDoDia.toUpperCase()){
            alert("Acertou!")
        document.getElementsByClassName(`linha-tab linha-tab${linha}`).toggle("correct")
    
    }
        entrada=[]
        return true 
    }

}


document.body.addEventListener('keydown', ouvinteDeTeclas)
