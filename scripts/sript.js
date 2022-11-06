//Variáveis Globais
let listaTodosQuizzes=[];
let perguntaQuizz;
//Fim das Variáveis Globais

//LISTAGEM DE TODOS OS QUIZZES
const todosquizzesPromise= axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
todosquizzesPromise.then(quizzesData)

function quizzesData(resposta){
    listaTodosQuizzes=resposta.data
    console.log(listaTodosQuizzes)
    randerizarTodosQuizzes()
}
function randerizarTodosQuizzes(){
    caixaTodosQuizzes= document.querySelector(".caixa-todos-quizzes")
    caixaTodosQuizzes.innerHTML=""
    //filtrar mensagens que o usuário criou
    for (let i=0; i<listaTodosQuizzes.length;i++){
    let quizz = listaTodosQuizzes[i]//depois colocar array filtrada 
    caixaTodosQuizzes.innerHTML+= `<li class="quizz">
    <div class="background-quizz-lista-todos"><img class="background-quizz-lista-todos" src="${quizz.image}"/></div>
    <div class="degrade-quizz-lista-todos"> <p class="titulo-quiz-lista">"${quizz.title}"</p> </div></li>`
    }
}
//FIM DA LISTAGEM DE TODOS OS QUIZZES

//INÍCIO JAVASCRIPT DO DESKTOP 8
const verificarConfigQuizz = () =>{
    let validador = 0;

    const tituloQuizz = document.querySelector(".tituloQuizz");
    if(tituloQuizz.value.length < 20 || tituloQuizz.value.length > 65){
        alert(`O número de caracteres do Título é: ${tituloQuizz.value.length}! O mínimo é 20 e o máximo é 65`);
    }
    else{
        validador++;
    }

    const urlQuizz = document.querySelector(".urlQuizz").value;
    let padraoURL = /^https:\/\//i;
    if(padraoURL.test(urlQuizz)){
        validador++;
    }
    else{
        alert("O formato da URL é inválido!");
    }

    perguntaQuizz = document.querySelector(".perguntaQuizz");
    if(perguntaQuizz.value < 3){
        alert("A quantidade mínima de perguntas deve ser maior ou igual à 3!");
    }
    else{
        validador++;
    }

    const nivelQuizz = document.querySelector(".nivelQuizz");
    if(nivelQuizz.value < 2){
        alert("A quantidade mínima de níveis deve ser maior ou igual à 2!")
    }
    else{
        validador++;
    }

    if(validador === 4){
        const elemento = document.querySelector(".containerGlobal");
        elemento.classList.add("escondido");
        const item = document.querySelector(".containerGlobalPerguntas");
        item.classList.remove("escondido");

        const element = document.querySelector(".containerPerguntas main");
        element.innerHTML = "";

        for(let i = 1; i <= perguntaQuizz.value; i++){
            const perguntas = `
            <div class="conteudoPergunta">
                <header>
                    <div class="pergunta">
                        <h3>Pergunta ${i}</h3>
                    </div>

                    <div>
                        <ion-icon class="icone" name="create-outline"></ion-icon>
                    </div>
                </header>

                <div class="caixa">
                    <div class="divDosInput">
                        <ul>
                            <li><input class="textoPergunta${i}" type="text" placeholder="Texto da pergunta" minlength="20" required /></li>
                            <li><input  class="corFundoPergunta${i}" type="text" placeholder="Cor de fundo da pergunta" minlength="20" required /></li>
                        </ul>
                    </div>

                    <div class="subtitulo"><span class="pergunta">Resposta correta</span></div>

                    <div class="divDosInput">
                        <ul>
                            <li><input class="textoRespostaCorreta${i}" type="text" placeholder="Resposta correta" minlength="1" required /></li>
                            <li><input class="urlImagemCorreta${i}" type="url" placeholder="URL da imagem" required /></li>
                        </ul>
                    </div>

                    <div class="subtitulo"><span class="pergunta">Respostas incorretas</span></div>

                    <div class="divDosInput">
                        <ul>
                            <li><input class="incorretaTipo${i} " type="text" placeholder="Resposta incorreta 1" minlength="1" required /></li>
                            <li><input class="ultimoInput incorretaImagemTipo${i}" type="url" placeholder="URL da imagem 1" required /></li>

                            <li><input class="iincorretaTipo${i} " type="text" placeholder="Resposta incorreta 2" minlength="1" required /></li>
                            <li><input class="ultimoInput iincorretaImagemTipo${i}" type="url" placeholder="URL da imagem 2" required /></li>

                            <li><input class="iiincorretaTipo${i} " type="text" placeholder="Resposta incorreta 3" minlength="1" required /></li>
                            <li><input class="ultimoInput iiincorretaImagemTipo${i}" type="url" placeholder="URL da imagem 3" required /></li>
                        </ul>
                    </div>

                </div>

            </div>
            `
            element.innerHTML += perguntas;
        }
    }
}
//FIM JAVASCRIPT DO DESKTOP 8

//INÍCIO JAVASCRIPT DO DESKTOP 9

//ATIVANDO FUNÇÃO DEPOIS QUE CLICAR NO BOTÃO
const verificarConfigPerguntas = () => {
    let transformador = Number(perguntaQuizz.value);
    let padraoURL = /^https:\/\//i;
    let validadorTituloPergunta, validadorCorFundoPergunta, validadorRespostaCorreta,
    validadorImagemCorreta, validadorQuantidadeRespostas1, validadorQuantidadeRespostas2,
    validadorQuantidadeRespostas3 = 0;

    //VERIFICAÇÃO DO TITULO DA PERGUNTA
    for(let i = 1; i <= perguntaQuizz.value; i++){
        const elemento = document.querySelector(`.textoPergunta${i}`);
        if(elemento.value.length < 20){
            alert(`O número de caracteres do Texto da pergunta ${i} é: ${elemento.value.length}! O mínimo é 20 caracteres!`);
        }
        else{
            validadorTituloPergunta++;
        }
    }

    //VERIFICAÇÕ DA COR DE FUNDO DA PERGUNTA
    for(let i = 1; i <= perguntaQuizz.value; i++){
        const elemento2 = document.querySelector(`.corFundoPergunta${i}`).value;
        if(elemento2[0] !== "#"){
            alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
        }

        if(elemento2[0] === "#"){
            if(elemento2.length !== 7){
                alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
            }
        }
        
        if(elemento2[0] === "#" && elemento2.length === 7){
            
            for(let j = 1; j <= (elemento2.length - 1); j++){
                if((elemento2[j] === "A") || (elemento2[j] === "a") ||
                (elemento2[j] === "B") || (elemento2[j] === "b") ||
                (elemento2[j] === "C") || (elemento2[j] === "c") ||
                (elemento2[j] === "D") || (elemento2[j] === "d") ||
                (elemento2[j] === "E") || (elemento2[j] === "e") ||
                (elemento2[j] === "F") || (elemento2[j] === "f") ||
                (elemento2[j] === "0") || (elemento2[j] === "1") ||
                (elemento2[j] === "2") || (elemento2[j] === "3") ||
                (elemento2[j] === "4") || (elemento2[j] === "5") ||
                (elemento2[j] === "6") || (elemento2[j] === "7") ||
                (elemento2[j] === "8") || (elemento2[j] === "9")){
                    validadorCorFundoPergunta++;
                }
                else{
                    alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
                    validadorCorFundoPergunta = 0;
                    break;
                }
            }
        }
    }

    //VERIFICAÇÃO DO TEXTO DAS RESPOSTAS CORRETAS
    for(let i = 1; i <= perguntaQuizz.value; i++){
        const elemento3 = document.querySelector(`.textoRespostaCorreta${i}`).value;

        if(elemento3.length === 0){
            alert(`A resposta correta da Pergunta ${i} não pode ser vazia!`);
        }
        else{
            validadorRespostaCorreta++;
        }
    }

    //VERIFICAÇÃO DA URL DAS RESPOSTAS CORRETAS
    for(let i = 1; i <= perguntaQuizz.value; i++){
        const elemento4 = document.querySelector(`.urlImagemCorreta${i}`).value;
        if(padraoURL.test(elemento4)){
            validadorImagemCorreta++;
        }
        else{
            alert(`O formato da URL da resposta correta da Pergunta ${i} é inválido!`);
        }
    }

    //VERIFICAÇÃO DE TER PELO MENOS 1 RESPOSTA INCORRETA
    for(let i = 1; i <= perguntaQuizz.value; i++){
        const incorreta1 = document.querySelector(`.incorretaTipo${i}`).value;
        const incorreta2 = document.querySelector(`.iincorretaTipo${i}`).value;
        const incorreta3 = document.querySelector(`.iiincorretaTipo${i}`).value;

        const incorretaImagem1 = document.querySelector(`.incorretaImagemTipo${i}`).value;
        const incorretaImagem2 = document.querySelector(`.iincorretaImagemTipo${i}`).value;
        const incorretaImagem3 = document.querySelector(`.iiincorretaImagemTipo${i}`).value;

        if((incorreta1 === "") && (incorreta2 === "") && (incorreta3 === "")){
            alert(`Na Pergunta ${i}, deve haver pelo menos 1 resposta incorreta!`);
        }
        else if((incorreta1 !== "") && (incorreta2 === "") && (incorreta3 === "")){
            if(padraoURL.test(incorretaImagem1)){
                validadorQuantidadeRespostas1++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if((incorreta1 === "") && (incorreta2 !== "") && (incorreta3 === "")){
            if(padraoURL.test(incorretaImagem2)){
                validadorQuantidadeRespostas2++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if((incorreta1 === "") && (incorreta2 === "") && (incorreta3 !== "")){
            if(padraoURL.test(incorretaImagem3)){
                validadorQuantidadeRespostas3++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if((incorreta1 !== "") && (incorreta2 !== "") && (incorreta3 === "")){
            if(padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem2)){
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas2++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if((incorreta1 !== "") && (incorreta2 === "") && (incorreta3 !== "")){
            if(padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem3)){
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas3++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if((incorreta1 === "") && (incorreta2 !== "") && (incorreta3 !== "")){
            if(padraoURL.test(incorretaImagem2) && padraoURL.test(incorretaImagem3)){
                validadorQuantidadeRespostas2++;
                validadorQuantidadeRespostas3++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else{
            if(padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem2) && padraoURL.test(incorretaImagem3)){
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas2++;
                validadorQuantidadeRespostas3++;
            }
            else{
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
    }

    /*if((validadorTituloPergunta === transformador) && (validadorCorFundoPergunta % transformador === 0)
        && (validadorRespostaCorreta === transformador) && (validadorImagemCorreta === transformador)
        && (validadorQuantidadeRespostas1 === transformador) && (validadorQuantidadeRespostas2 === transformador)
        && (validadorQuantidadeRespostas3 === transformador)){
        const elementoVerificador = document.querySelector(".containerGlobalPerguntas");
        elementoVerificador.classList.add("escondido");

        const elementoLiberar = document.querySelector(classe que contem a div do desktop10);
        elementoLiberar.classList.remove(escondido);
    }
    */
}
//FIM JAVASCRIPT DO DESKTOP 9
