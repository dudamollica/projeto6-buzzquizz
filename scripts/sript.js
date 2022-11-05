//Variáveis Globais
let listaTodosQuizzes = [];
let quizzEscolhido;
let fimQuizz = 0;
let acertos = 0;
//Fim das Variáveis Globais


//LISTAGEM DE TODOS OS QUIZZES
const todosquizzesPromise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
todosquizzesPromise.then(quizzesData)

function quizzesData(resposta) {
    listaTodosQuizzes = resposta.data
    console.log(listaTodosQuizzes)
    randerizarTodosQuizzes()
}
function randerizarTodosQuizzes() {
    caixaTodosQuizzes = document.querySelector(".caixa-todos-quizzes")
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
function selecionarOpcao(opcao) {
    if (!opcao.classList.contains("naoClicaMais")) {
        fimQuizz += 1
        let opcaoID = opcao.id
        if (opcaoID == "true") {
            opcao.classList.add("texto-certo")
            opcao.classList.add("naoClicaMais")
            acertos += 1
        }
        else if (opcaoID == "false") {
            opcao.classList.add("texto-errado")
            opcao.classList.add("naoClicaMais")
        }
        for (let i = 0; i < quizzEscolhido.questions.length; i++) {
            let pergunta = document.getElementById(`${i}`)
            if (opcao.parentNode.id == i) {
                let todasRespostas = pergunta.querySelectorAll("div")
                for (o = 0; o < todasRespostas.length; o++) {
                    if (todasRespostas[o] != opcao) {
                        todasRespostas[o].classList.add("desmarcada")
                        todasRespostas[o].classList.add("naoClicaMais")
                        if (todasRespostas[o].id == "true") {
                            todasRespostas[o].classList.add("texto-certo")
                        }
                        else {
                            todasRespostas[o].classList.add("texto-errado")
                        }//FAZER SCROLL PARA PRÓXIMA PERGUNTA
                    }
                }
            }
        }
        console.log(fimQuizz)
        console.log(acertos)
        if (fimQuizz === quizzEscolhido.questions.length) {
            feedbackQuizz()
        }
    }
}
//FIM DA SELEÇÃO DA RESPOSTA

//FEEDBACK DO QUIZZ APARECE
function feedbackQuizz() {
    let feedbackQuizz = document.querySelector(".feedback-do-quizz")
    feedbackQuizz.classList.remove("escondido")
    feedbackQuizz.scrollIntoView()
}

//para reiniciar o quizz


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
        validador++;
    }

    const urlQuizz = document.querySelector(".urlQuizz").value;
    let padraoURL = /^https:\/\//i;
    if (padraoURL.test(urlQuizz)) {
        validador++;
    }
    else {
        alert("O formato da URL é inválido!");
    }

    const perguntaQuizz = document.querySelector(".perguntaQuizz");
    if (perguntaQuizz.value < 3) {
        alert("A quantidade mínima de perguntas deve ser maior ou igual à 3!");
    }
    else {
        validador++;
    }

    const nivelQuizz = document.querySelector(".nivelQuizz");
    if (nivelQuizz.value < 2) {
        alert("A quantidade mínima de níveis deve ser maior ou igual à 2!")
    }
    else {
        validador++;
    }

    if (validador === 4) {
        const elemento = document.querySelector(".containerGlobal");
        elemento.classList.add("escondido");
    }
}
//FIM JAVASCRIPT DO DESKTOP 8

