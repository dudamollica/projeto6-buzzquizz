//Variáveis Globais
let listaTodosQuizzes=[];
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
    caixaTodosQuizzes.innerHTML+= `<li class="quizz" id="${quizz.id}" onclick="abrirQuiz(this)">
    <div class="background-quizz-lista-todos"><img class="background-quizz-lista-todos" src="${quizz.image}"/></div>
    <div class="degrade-quizz-lista-todos"> <p class="titulo-quiz-lista">"${quizz.title}"</p> </div></li>`
    }
}
//FIM DA LISTAGEM DE TODOS OS QUIZZES


//ABRIR UM QUIZZ
function abrirQuiz(quizzClicado){
    let idQuizzClicado=Number(quizzClicado.id)
 for (let i=0;i<listaTodosQuizzes.length;i++){
    let quizz= listaTodosQuizzes[i]
    let quizzID=quizz.id
    if(quizzID===idQuizzClicado){
    console.log(quizz)
    //para aparecer a tela do quizz
    let telaInicial= document.querySelector(".tela-inicial")
    telaInicial.classList.add("escondido") 
    let quizzExecutando=document.querySelector(".quizz-executando")
    quizzExecutando.classList.remove("escondido")

    //para aparecer as infos do quizz que clicou
    let tituloQuizz=document.querySelector(".titulo-desse-quizz h1")
    tituloQuizz.innerHTML=""
    tituloQuizz.innerHTML+=quizz.title
    let imgTituloQuizz=document.querySelector(".titulo-desse-quizz img")
    imgTituloQuizz.setAttribute('src', quizz.image)
    imgTituloQuizz.scrollIntoView()
    
    //para gerar as perguntas do quizz
    let quizzExecutandoPergunta=document.querySelector(".quizz-executando-pergunta")
        quizzExecutandoPergunta.innerHTML=""
    for (let i=0;i<quizz.questions.length;i++){
        quizzExecutandoPergunta.innerHTML+=
        `<div id="${i+100}"class="titulo-da-pergunta">${quizz.questions[i].title}</div>
         <ul id="${i}" class="opcoes-da-pergunta"></ul>`
       let titulo=document.getElementById(`${i+100}`) 
        titulo.style.backgroundColor=quizz.questions[i].color
    }
    //Embaralhar as Respostas
    function comparador() { 
    return (Math.random() - 0.5) }
    // para gerar as respostas das respectivas perguntas embaralhadas
    for (let i=0;i<quizz.questions.length;i++){
        quizz.questions[i].answers.sort(comparador)
    let respostaPergunta=document.getElementById(`${i}`) 
     for(let o=0;o<quizz.questions[i].answers.length;o++){
        respostaPergunta.innerHTML+=`<div class="caixa-de-opcao">
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


//SAIR DO QUIZZ PARA HOME
function sairQuizzParaHome(){
    window.location.reload()
}


//INÍCIO JAVASCRIPT DO DESKTOP 8
const verificarConfigQuizz = () =>{
    let validador = 0;

    const tituloQuizz = document.querySelector(".tituloQuizz");
    if(tituloQuizz.value.length < 20 || tituloQuizz.value.length > 65){
        alert(`O número de caracteres é: ${tituloQuizz.value.length}! O mínimo é 20 e o máximo é 65`);
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

    const perguntaQuizz = document.querySelector(".perguntaQuizz");
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
    }
}
//FIM JAVASCRIPT DO DESKTOP 8

