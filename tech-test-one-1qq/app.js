const question = document.getElementById("question");
const answer = document.getElementById("answer");
const submit = document.getElementById("submit");
const response = document.getElementById("response");

question.innerText = "Do you like pizza??";

submit.onclick = (event) => {
    event.preventDefault();
    if(answer.value.toLowerCase() === 'yes'){
        response.innerText = "That's correct!";
    } else {
        response.innerText = "Wrong answer!";
    }
}