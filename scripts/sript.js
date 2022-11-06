//Variáveis Globais
let listaTodosQuizzes = [];
let perguntaQuizz;
let nivelQuizz;
let quizzEscolhido;
let fimQuizz = 0;
let acertos = 0;
//Fim das Variáveis Globais

// quizz para testes
let quizzTeste = {
    title: "Título do quizz",
    image: "https://cdn.w600.comps.canstockphoto.com.br/selo-palavra-vazio-vetor-clip-arte_csp6017046.jpg",
    questions: [
        {
            title: "Título da pergunta 1",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 2",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        },
        {
            title: "Título da pergunta 3",
            color: "#123456",
            answers: [
                {
                    text: "Texto da resposta 1",
                    image: "https://http.cat/411.jpg",
                    isCorrectAnswer: true
                },
                {
                    text: "Texto da resposta 2",
                    image: "https://http.cat/412.jpg",
                    isCorrectAnswer: false
                }
            ]
        }
    ],
    levels: [
        {
            title: "Título do nível 1",
            image: "https://http.cat/411.jpg",
            text: "Descrição do nível 1",
            minValue: 0
        },
        {
            title: "Título do nível 2",
            image: "https://http.cat/412.jpg",
            text: "Descrição do nível 2",
            minValue: 50
        }
    ]
}
// fim da variável de quizz para teste



//LISTAGEM DE TODOS OS QUIZZES
const todosquizzesPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
todosquizzesPromise.then(quizzesData)

function quizzesData(resposta) {
    listaTodosQuizzes = resposta.data
    console.log(listaTodosQuizzes)
    randerizarTodosQuizzes()
}
function randerizarTodosQuizzes() {
   let caixaTodosQuizzes = document.querySelector(".caixa-todos-quizzes")
    caixaTodosQuizzes.innerHTML = ""
    //filtrar mensagens que o usuário criou
    for (let i = 0; i < listaTodosQuizzes.length; i++) {
        let quizz = listaTodosQuizzes[i]//depois colocar array filtrada 
        caixaTodosQuizzes.innerHTML += `<li class="quizz" id="${quizz.id}" onclick="abrirQuiz(this)">
    <div class="background-quizz-lista-todos"><img class="background-quizz-lista-todos" src="${quizz.image}"/></div>
    <div class="degrade-quizz-lista-todos"> <p class="titulo-quiz-lista">"${quizz.title}"</p> </div></li>`
    }
}
//FIM DA LISTAGEM DE TODOS OS QUIZZES


//ABRIR UM QUIZZ
function abrirQuiz(quizzClicado) {
    let idQuizzClicado = Number(quizzClicado.id)
    for (let i = 0; i < listaTodosQuizzes.length; i++) {
        quizz = listaTodosQuizzes[i]
        let quizzID = quizz.id
        if (quizzID === idQuizzClicado) {
            quizzEscolhido = quizz
            console.log(quizz)
            //para aparecer a tela do quizz
            let telaInicial = document.querySelector(".tela-inicial")
            telaInicial.classList.add("escondido")
            let quizzExecutando = document.querySelector(".quizz-executando")
            quizzExecutando.classList.remove("escondido")

            //para aparecer as infos do quizz que clicou
            let tituloQuizz = document.querySelector(".titulo-desse-quizz h1")
            tituloQuizz.innerHTML = ""
            tituloQuizz.innerHTML += quizz.title
            let imgTituloQuizz = document.querySelector(".titulo-desse-quizz img")
            imgTituloQuizz.setAttribute('src', quizz.image)
            imgTituloQuizz.scrollIntoView()

            //para gerar as perguntas do quizz
            let quizzExecutandoPergunta = document.querySelector(".quizz-executando-pergunta")
            quizzExecutandoPergunta.innerHTML = ""
            for (let i = 0; i < quizz.questions.length; i++) {
                quizzExecutandoPergunta.innerHTML +=
                    `<div id="corTitulo${i}"class="titulo-da-pergunta">${quizz.questions[i].title}</div>
         <ul id="${i}" class="opcoes-da-pergunta"></ul>`
                let titulo = document.getElementById(`corTitulo${i}`)
                titulo.style.backgroundColor = quizz.questions[i].color
            }
            //Embaralhar as Respostas
            function comparador() {
                return (Math.random() - 0.5)
            }
            // para gerar as respostas das respectivas perguntas embaralhadas
            for (let i = 0; i < quizz.questions.length; i++) {
                quizz.questions[i].answers.sort(comparador)
                let respostaPergunta = document.getElementById(`${i}`)
                for (let o = 0; o < quizz.questions[i].answers.length; o++) {
                    respostaPergunta.innerHTML +=
                        `<div class="caixa-de-opcao" id="${quizz.questions[i].answers[o].isCorrectAnswer}" onclick="selecionarOpcao(this)">
        <img src="${quizz.questions[i].answers[o].image}"
            alt="">
        <p>${quizz.questions[i].answers[o].text}</p>
        </div>`
                }
            }
        }
    }
}
//FIM DO ABRIR UM QUIZZ


//SELEÇÃO DA RESPOSTA
function selecionarOpcao(opcao){
    if (!opcao.classList.contains("naoClicaMais")){
    fimQuizz+=1
    let opcaoID= opcao.id
    if (opcaoID=="true"){
    opcao.classList.add("texto-certo")
    opcao.classList.add("naoClicaMais")
    acertos+=1
    }
    else if(opcaoID=="false"){
    opcao.classList.add("texto-errado")
    opcao.classList.add("naoClicaMais")
    }
    for (let i=0;i<quizzEscolhido.questions.length;i++){
        let pergunta=document.getElementById(`${i}`)
        if (opcao.parentNode.id==i){
        let todasRespostas=pergunta.querySelectorAll("div")
        for(o=0;o<todasRespostas.length;o++){
        if(todasRespostas[o]!=opcao){
        todasRespostas[o].classList.add("desmarcada")
        todasRespostas[o].classList.add("naoClicaMais")
        if(todasRespostas[o].id=="true"){
        todasRespostas[o].classList.add("texto-certo")
        }
        else{
        todasRespostas[o].classList.add("texto-errado")
    } 
      if (!pergunta.classList.contains("naoClicaMais")){
     scroll= pergunta.lastElementChild
     setTimeout(function() { scroll.scrollIntoView()}, 2000)}
}}}}
    if(fimQuizz===quizzEscolhido.questions.length){
        setTimeout(function() {feedbackQuizz()}, 2000)
    }
}}
//FIM DA SELEÇÃO DA RESPOSTA


//FEEDBACK DO QUIZZ
function feedbackQuizz() {
    let paginaFeedback = document.querySelector(".feedback-do-quizz")
    let porcentagemDeAcerto = Math.round((acertos * 100) / quizzEscolhido.questions.length)
    for (let i = 0; i < quizz.levels.length; i++) {
        if (porcentagemDeAcerto >= quizzEscolhido.levels[i].minValue) {
            paginaFeedback.innerHTML = ""
            paginaFeedback.innerHTML += `
    <div class="quizz-executando-resultado">
        <div class="titulo-do-resultado">
        ${porcentagemDeAcerto}% de acerto: ${quizzEscolhido.levels[i].title}
        </div>

        <div class="resultado-do-quizz">
            <img src="${quizzEscolhido.levels[i].image}"
                alt="">
            <p>${quizzEscolhido.levels[i].text}</p>

        </div>
    </div>

    <button class="restart-button" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
    <button class="home-button" onclick="sairQuizzParaHome()">Voltar para Home</button>`}
    }
    let feedbackQuizz = document.querySelector(".feedback-do-quizz")
    feedbackQuizz.classList.remove("escondido")
    feedbackQuizz.scrollIntoView()
}
//para reiniciar o quizz
function reiniciarQuizz() {
    abrirQuiz(quizzEscolhido)
    fimQuizz = 0;
    acertos = 0;
    let feedbackQuizz = document.querySelector(".feedback-do-quizz")
    feedbackQuizz.classList.add("escondido")

    let paginaFeedback = document.querySelector(".feedback-do-quizz")
    paginaFeedback.innerHTML = ""
    paginaFeedback.innerHTML += ` <div class="quizz-executando-resultado">
    <div class="titulo-do-resultado">
        Você não acertou a % mínima para entrar em algum nível
    </div>
    <div class="resultado-do-quizz">
        <img src="https://p2.trrsf.com/image/fget/cf/648/0/images.terra.com/2022/10/14/1804648676-robbie-coltrane.jpg"
            alt="">
        <p>Meus pêsames, vc pegou um quizz de alguém que não leu corretamente os requisito</p>
    </div>
    <button class="restart-button" onclick="reiniciarQuizz()">Reiniciar Quizz</button>
    <button class="home-button" onclick="sairQuizzParaHome()">Voltar para Home</button>
</div>`
}
//sair do quizz para home
function sairQuizzParaHome() {
    window.location.reload()
}
//FIM DO FEEDBACK DO QUIZZ


//INÍCIO JAVASCRIPT DO DESKTOP 8
const verificarConfigQuizz = () => {
    let validador = 0;

    const tituloQuizz = document.querySelector(".tituloQuizz");
    if (tituloQuizz.value.length < 20 || tituloQuizz.value.length > 65) {
        alert(`O número de caracteres é: ${tituloQuizz.value.length}! O mínimo é 20 e o máximo é 65`);
    }
    else {
        quizzTeste.title = tituloQuizz.value;
        validador++;
    }

    const urlQuizz = document.querySelector(".urlQuizz").value;
    let padraoURL = /^https:\/\//i;
    if (padraoURL.test(urlQuizz)) {
        quizzTeste.image = urlQuizz;
        validador++;
    }
    else {
        alert("O formato da URL é inválido!");
    }

    perguntaQuizz = document.querySelector(".perguntaQuizz");
    if (perguntaQuizz.value < 3) {
        alert("A quantidade mínima de perguntas deve ser maior ou igual à 3!");
    }
    else {
        validador++;
    }

    nivelQuizz = document.querySelector(".nivelQuizz");
    if (nivelQuizz.value < 2) {
        alert("A quantidade mínima de níveis deve ser maior ou igual à 2!");
    }
    else {
        nivelQuizz = Number(nivelQuizz.value);
        validador++;
    }

    if (validador === 4) {
        const elemento = document.querySelector(".containerGlobal");
        elemento.classList.add("escondido");
        const item = document.querySelector(".containerGlobalPerguntas");
        item.classList.remove("escondido");

        const element = document.querySelector(".containerPerguntas main");
        element.innerHTML = "";

        for (let i = 1; i <= perguntaQuizz.value; i++) {
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
    quizzTeste.questions = [];
    for (let i = 0; i < perguntaQuizz; i++) {
        (quizzTeste.questions).push({
            title: "Título da pergunta 1",
            color: "#123456",
            answers: []
        })
    }

    for (let i = 1; i <= perguntaQuizz.value; i++) {
        const elemento = document.querySelector(`.textoPergunta${i}`);
        if (elemento.value.length < 20) {
            alert(`O número de caracteres do Texto da pergunta ${i} é: ${elemento.value.length}! O mínimo é 20 caracteres!`);
        }
        else {
            quizzTeste.questions[i - 1].title = elemento.value;
            validadorTituloPergunta++;
        }
    }

    //VERIFICAÇÕ DA COR DE FUNDO DA PERGUNTA
    for (let i = 1; i <= perguntaQuizz.value; i++) {
        const elemento2 = document.querySelector(`.corFundoPergunta${i}`).value;
        if (elemento2[0] !== "#") {
            alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
        }

        if (elemento2[0] === "#") {
            if (elemento2.length !== 7) {
                alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
            }
        }

        if (elemento2[0] === "#" && elemento2.length === 7) {

            for (let j = 1; j <= (elemento2.length - 1); j++) {
                if ((elemento2[j] === "A") || (elemento2[j] === "a") ||
                    (elemento2[j] === "B") || (elemento2[j] === "b") ||
                    (elemento2[j] === "C") || (elemento2[j] === "c") ||
                    (elemento2[j] === "D") || (elemento2[j] === "d") ||
                    (elemento2[j] === "E") || (elemento2[j] === "e") ||
                    (elemento2[j] === "F") || (elemento2[j] === "f") ||
                    (elemento2[j] === "0") || (elemento2[j] === "1") ||
                    (elemento2[j] === "2") || (elemento2[j] === "3") ||
                    (elemento2[j] === "4") || (elemento2[j] === "5") ||
                    (elemento2[j] === "6") || (elemento2[j] === "7") ||
                    (elemento2[j] === "8") || (elemento2[j] === "9")) {
                    validadorCorFundoPergunta++;
                }
                else {
                    alert(`A cor de fundo da Pergunta ${i} está inválida! Deve ser digitado no formato Hexadecimal!`);
                    validadorCorFundoPergunta = 0;
                    break;
                }
            }
            quizzTeste.questions[i - 1].color = elemento2;
        }
    }


    //VERIFICAÇÃO DO TEXTO DAS RESPOSTAS CORRETAS
    for (let i = 1; i <= perguntaQuizz.value; i++) {
        const elemento3 = document.querySelector(`.textoRespostaCorreta${i}`).value;

        if (elemento3.length === 0) {
            alert(`A resposta correta da Pergunta ${i} não pode ser vazia!`);
        }
        else {
            (quizzTeste.questions[i - 1].answers).push({
                text: elemento3,
                image: "https://http.cat/411.jpg",
                isCorrectAnswer: true
            })
            validadorRespostaCorreta++;
        }
    }

    //VERIFICAÇÃO DA URL DAS RESPOSTAS CORRETAS
    for (let i = 1; i <= perguntaQuizz.value; i++) {
        const elemento4 = document.querySelector(`.urlImagemCorreta${i}`).value;
        if (padraoURL.test(elemento4)) {
            quizzTeste.questions[i - 1].answers[0] = elemento4;
            validadorImagemCorreta++;
        }
        else {
            alert(`O formato da URL da resposta correta da Pergunta ${i} é inválido!`);
        }
    }

    //VERIFICAÇÃO DE TER PELO MENOS 1 RESPOSTA INCORRETA
    for (let i = 1; i <= perguntaQuizz.value; i++) {
        const incorreta1 = document.querySelector(`.incorretaTipo${i}`).value;
        const incorreta2 = document.querySelector(`.iincorretaTipo${i}`).value;
        const incorreta3 = document.querySelector(`.iiincorretaTipo${i}`).value;

        const incorretaImagem1 = document.querySelector(`.incorretaImagemTipo${i}`).value;
        const incorretaImagem2 = document.querySelector(`.iincorretaImagemTipo${i}`).value;
        const incorretaImagem3 = document.querySelector(`.iiincorretaImagemTipo${i}`).value;

        if ((incorreta1 === "") && (incorreta2 === "") && (incorreta3 === "")) {
            alert(`Na Pergunta ${i}, deve haver pelo menos 1 resposta incorreta!`);
        }
        else if ((incorreta1 !== "") && (incorreta2 === "") && (incorreta3 === "")) {
            if (padraoURL.test(incorretaImagem1)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta1,
                    image: incorretaImagem1,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas1++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if ((incorreta1 === "") && (incorreta2 !== "") && (incorreta3 === "")) {
            if (padraoURL.test(incorretaImagem2)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta2,
                    image: incorretaImagem2,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas2++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if ((incorreta1 === "") && (incorreta2 === "") && (incorreta3 !== "")) {
            if (padraoURL.test(incorretaImagem3)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta3,
                    image: incorretaImagem3,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas3++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if ((incorreta1 !== "") && (incorreta2 !== "") && (incorreta3 === "")) {
            if (padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem2)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta1,
                    image: incorretaImagem1,
                    isCorrectAnswer: false
                }, {
                    text: incorreta2,
                    image: incorretaImagem2,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas2++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if ((incorreta1 !== "") && (incorreta2 === "") && (incorreta3 !== "")) {
            if (padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem3)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta1,
                    image: incorretaImagem1,
                    isCorrectAnswer: false
                }, {
                    text: incorreta3,
                    image: incorretaImagem3,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas3++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else if ((incorreta1 === "") && (incorreta2 !== "") && (incorreta3 !== "")) {
            if (padraoURL.test(incorretaImagem2) && padraoURL.test(incorretaImagem3)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta2,
                    image: incorretaImagem2,
                    isCorrectAnswer: false
                }, {
                    text: incorreta3,
                    image: incorretaImagem3,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas2++;
                validadorQuantidadeRespostas3++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
        else {
            if (padraoURL.test(incorretaImagem1) && padraoURL.test(incorretaImagem2) && padraoURL.test(incorretaImagem3)) {
                (quizzTeste.questions[i - 1].answers).push({
                    text: incorreta1,
                    image: incorretaImagem1,
                    isCorrectAnswer: false
                }, {
                    text: incorreta2,
                    image: incorretaImagem2,
                    isCorrectAnswer: false
                }, {
                    text: incorreta3,
                    image: incorretaImagem3,
                    isCorrectAnswer: false
                })
                validadorQuantidadeRespostas1++;
                validadorQuantidadeRespostas2++;
                validadorQuantidadeRespostas3++;
            }
            else {
                alert(`A URL de alguma resposta incorreta é inválido ou não está preenchido!`);
            }
        }
    }

    if ((validadorTituloPergunta === transformador) && (validadorCorFundoPergunta % transformador === 0)
        && (validadorRespostaCorreta === transformador) && (validadorImagemCorreta === transformador)
        && (validadorQuantidadeRespostas1 === transformador) && (validadorQuantidadeRespostas2 === transformador)
        && (validadorQuantidadeRespostas3 === transformador)) {
        const elementoVerificador = document.querySelector(".containerGlobalPerguntas");
        elementoVerificador.classList.add("escondido");

        //renderizarNiveis(nivelQuizz);
    }
}
//FIM JAVASCRIPT DO DESKTOP 9


// DEKTOP 10

function renderizarNiveis(niveis) {
    const telaNiveis = document.querySelector(".criacao-dos-niveis");
    telaNiveis.classList.remove("escondido");

    const divNiveis = document.querySelector(".criacao-dos-niveis .containerConteudo main");

    divNiveis.innerHTML = "";

    for (let i = 1; i <= niveis; i++) {

        divNiveis.innerHTML += `<div class="configQuizz-niveis">
    <div class="descricao-da-config">
        <p>Nível ${i}</p>
        <ion-icon onclick="abrirCaixaAbaixo(this)" class="" name="create-outline"></ion-icon>
    </div>
    <ul class="escondido">
        <li><input class="titulo-nivel-quizz" type="text" placeholder="Título do nível" minlength="10"
                required /></li>
        <li><input class="nota-nivel-quizz" type="number" placeholder="% de acerto mínima" min="0"
                max="100" required /></li>
        <li><input class="url-img-quizz" type="url" placeholder="URL da imagem do nível" required />
        </li>
        <li><textarea class="desc-nivel-quizz" cols="30" rows="1" type="text"
                placeholder="Descrição do nível" minlength="30" required></textarea>
        </li>
    </ul>
</div>`}

}



// abre a ul para ver as configurações de cada nível de quizz
function abrirCaixaAbaixo(marca) {
    marca.classList.add("escondido");
    const divAvo = ((marca.parentNode).parentNode);
    const filhos = divAvo.children;
    filhos[1].classList.remove("escondido");
}


// verifica se os níveis foram preenchidos de forma correta, se sim, envia o quiz para o servidor
function verificarNivelQuizz() {
    const niveis = document.querySelectorAll(".configQuizz-niveis");
    let validador = 0

    quizzTeste.levels = [];

    for (let i = 0; i < niveis.length; i++) {
        let n = 0

        let nivelTitulo = ((niveis[i].children)[1].children[0]).children[0].value;
        let nivelNota = ((niveis[i].children)[1].children[1]).children[0].value;
        let nivelUrl = ((niveis[i].children)[1].children[2]).children[0].value;
        let nivelDesc = ((niveis[i].children)[1].children[3]).children[0].value;

        if (nivelTitulo.length >= 10) {
            n++;
        }
        else {
            alert(`Nivel ${i + 1}: o titulo precisa ter pelo menos 10 caracteres`);
        }

        if (nivelNota >= 0 && nivelNota <= 100) {
            n++;
        }
        else {
            alert(`Nivel ${i + 1}: a porcetagem é entre 0 e 100`);
        }

        let padraoURL = /^https:\/\//i;
        if (padraoURL.test(nivelUrl)) {
            n++;
        }
        else {
            alert(`Nivel ${i + 1}: url da imagem inválida`);
        }
        if (nivelDesc.length >= 30) {
            n++;
        }
        else {
            alert(`Nivel ${i + 1}: A descrição precisa de pelo menos 30 caracteres`);
        }

        if (n >= 4) {
            (quizzTeste.levels).push({
                title: nivelTitulo,
                image: nivelUrl,
                text: nivelDesc,
                minValue: nivelNota,
            })
            validador++;
        }
    }

    if (validador == niveis.length) {
        alert("prencheu certo os niveis!");
    }
    else {
        quizzTeste.levels = []
        alert("preencha corretamente os campos");
        console.log(quizzTeste.levels);
    }

}
