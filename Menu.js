const startButton = document.getElementById("start-btn")
const form = document.getElementById("form")
const questions = document.getElementById("sum_questions")
const category = document.getElementById("category")
const difficulty = document.getElementById("difficulty")
const type = document.getElementById("type")
const timer = document.getElementById("timer")
const check = document.getElementById("check")
var Check


alert("Στο μελλον θα υπαρξει καλυτερος τροπος με styles κτλ που να δειχνει στον χρηστη τι δεν εχει βαλει. Επισης επειδη καποιες κατηγοριες μπορει να μην εχουν τον αριθμο ερωτησεων που θες (πχ εαν βαλεις category Entartaitment boolean και 20 ερωτησεις κατα πασα πιθανοτητα δεν θα σου εμφανισει τιποτα γιατι δεν εχει τοσες ερωτησεις. Θα διορθωθει απλα ενημερωνω για το bug")

startButton.addEventListener('click',()=>{
    
    checkInputs()

    form.addEventListener('submit', function(e){
        e.preventDefault();
    
        const Questions =  questions.value
        const Category = category.value
        const Difficulty = difficulty.value
        const Type = type.value
        const Timer = timer.value
        if (check.checked == true){
            Check = 1
        } 
        else{
            Check = 0
        }        
    
        localStorage.setItem('questions', Questions)
        localStorage.setItem('category', Category)
        localStorage.setItem('difficulty', Difficulty)
        localStorage.setItem('type', Type)
        localStorage.setItem('Timer', Timer)
        localStorage.setItem('check', Check)
    
    })

})

function checkInputs(){

    timer_value = parseInt(timer.value)
    questions_value = parseInt(questions.value)

    var correctQuestions = false
    var correctTime = false

    if(questions.value == ""){
        setErrorFor(questions, 'Number of questions cannot be blank')
    }else if(isNaN(questions_value)){
        setErrorFor(questions, 'Amount of questions must be number')
    }
    else if(questions.value > 50){
        setErrorFor(questions, 'Number of questions cannot be over 50')
    }else if(questions.value <= 0){
        setErrorFor(questions, 'Number of questions cannot be under 0')
    }else{
        setSuccessFor(questions)
        correctQuestions = true
    }

    if(timer.value == "" && check.checked == true){
        setErrorFor(timer, 'Please insert number of time')
    }else if (timer.value > 60 && check.checked == true){
        setErrorFor(timer, 'The number of time is too big')
    }else if(isNaN(timer_value) && check.checked == true){
        setErrorFor(timer, 'Amount of time must be number')
    }
    else if (timer.value != "" && check.checked == true){
        setSuccessFor(timer)
        correctTime = true
    }

    if((correctTime && correctQuestions) ||(correctQuestions && check.checked == false)){
        location.assign('Quiz.html')
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement //.inputfield
    const small = formControl.querySelector('small')
    
    small.innerText = message
    formControl.className = 'input_field error'
}

function setSuccessFor(input){
    const formControl = input.parentElement
    formControl.className = 'input_field success'
}

