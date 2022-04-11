let questionsBlock = document.querySelector('.faq__questions');
questionsBlock.addEventListener('click', (e)=>{
    let answer = e.target.parentElement.querySelector('.faq__answer');
    let questionBlock = e.target.parentElement;
    let prevQuestionBlock = questionBlock.previousSibling.previousSibling;

    if (answer.style.maxHeight && (e.target.parentElement.classList.contains('faq__question')) && (!e.target.classList.contains('faq__questions'))) {
        answer.style.maxHeight = null;
        questionBlock.classList.toggle('active-answer');

        if (questionBlock.id === 'first-question'){
            questionBlock.style.borderTop = '1px solid rgb(197, 35, 45)';
        }else{
            prevQuestionBlock.style.borderBottom = '1px solid rgb(197, 35, 45)';
        }

      } else if (!e.target.classList.contains('title') && (!e.target.classList.contains('faq__questions'))) {
        answer.style.maxHeight = (answer.scrollHeight + 35) + "px";
        prevQuestionBlock.style.borderBottom = 'none';
        questionBlock.classList.toggle('active-answer');

        if (e.target.parentElement.classList.contains('faq__question')){
            questionBlock.style.borderTop = 'none'
        }

      } 
})
