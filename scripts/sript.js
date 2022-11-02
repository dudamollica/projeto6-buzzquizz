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