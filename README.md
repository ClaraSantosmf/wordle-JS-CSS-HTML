# WORLD

Inspirando no jogo hospedado em NewYork Times. 
https://www.nytimes.com/games/wordle/index.html

Esse jogo tem sempre respostas em expressões nordestinas.
https://clarasantosmf.github.io/wordle-JS-CSS-HTML/

Wordle, o ponta pé inicial que passei está neste outro (repo aqui)[https://github.com/huogerac/letreiro-v2]. 

* Verde posição correta, amarela para existe, mas em outra posição, cinza não existe ocorrência da letra.
* Mudar de linha quando apertar ENTER
* Remover uma letra quando apertar BACKSPACE
* Parar de jogar quando acertar a palavra ou atingir as 6 tentativas
* Não permitir ENTER antes das 5 letras, nem BACK quando não tiver entrada.
* Há uma lista de palavras válidas inicial (Há 1000 palavras iniciais) e exibir a mensagem 'X Não existe no banco de dados' quando a linha não tiver uma palavra da lista
* Há uma lista fixa com base nos dias do mês.
* Ao iniciar, pegar da data atual (new Date()) o valor YYYMMDD e achar a palavra do dia da estrutura acima
* Usar localStorage e salvar as tentativas e não permitir que o usuário jogue mais de uma vez, ou se fechar tudo, continue onde parou
* Está tratado o caso onde a palavra do dia é FESTA e tentamos MISSA ou OSSOS, um S vai ser verde os demais são cinza, dado que FESTA tem apenas 1
### PONTO EXTRA SE TIVER
* Mostrar um modal quando terminar de jogar - Do to
* Mostrar animação igual o jogo original na validação - Do to
