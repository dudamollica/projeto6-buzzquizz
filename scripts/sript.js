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
    caixaTodosQuizzes.innerHTML+= `<li class="quizz">
    <div class="background"><img class="background" src="${quizz.image}"/></div>
    <div class="degrade"> <p class="titulo-quiz-lista">"${quizz.title}"</p> </div></li>`
    }
}
//FIM DA LISTAGEM DE TODOS OS QUIZZES