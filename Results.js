const Sum = document.getElementById('sum')
const tries = document.getElementById('tries')
const correct = document.getElementById('correct')
const wrong = document.getElementById('wrong')
const percent = document.getElementById('percent')
const score = document.getElementById('score')
const apotelesma = localStorage.getItem('sum')
const Tries = localStorage.getItem('tries')
const Correct = localStorage.getItem('correct')
const Time = localStorage.getItem('time')
var restart = 0

Sum.textContent = apotelesma
tries.textContent = Tries
correct.textContent = Correct
if(Time == 0){
    wrong.textContent = 0
}else{
    wrong.textContent = apotelesma - Correct
}

percent.textContent = parseFloat((Correct/apotelesma)*100).toFixed(2) + '%'
score.textContent = (Correct)*100 

function Click(){
    return location.replace('Quiz.html')
}