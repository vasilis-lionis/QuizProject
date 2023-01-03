const startButton = document.getElementById("start-btn")
const form = document.getElementById("form")
const questions = document.getElementById("sum_questions")
const category = document.getElementById("category")
const difficulty = document.getElementById("difficulty")
const type = document.getElementById("type")
const timer = document.getElementById("timer")
const check = document.getElementById("check")
var Check

function message(){
    if (checkFILE()){
        alert("good json")
        document.getElementById("label").innerHTML = "File Choosed"

alert("Στο μελλον θα υπαρξει καλυτερος τροπος με styles κτλ που να δειχνει στον χρηστη τι δεν εχει βαλει. Επισης επειδη καποιες κατηγοριες μπορει να μην εχουν τον αριθμο ερωτησεων που θες (πχ εαν βαλεις category Entartaitment boolean και 20 ερωτησεις κατα πασα πιθανοτητα δεν θα σου εμφανισει τιποτα γιατι δεν εχει τοσες ερωτησεις. Θα διορθωθει απλα ενημερωνω για το bug")

startButton.addEventListener('click',()=>{
    
    checkInputs()
    sendItems()
})

function readFile(){
    let reader = new FileReader()

    reader.readAsText(file.files[0])

    reader.onload = function(){
        json = reader.result
        message()
    }
}


function checkInputs(){

    timer_value = parseInt(timer.value)
    questions_value = parseInt(questions.value)

    var correctQuestions = false
    var correctTime = false

    if(InputType == "FILE"){
        if(questionsFILE.value == ""){
            setErrorFor(questionsFILE, 'Number of questions cannot be blank')
        }
        else if(isNaN(parseInt(questionsFILE.value))){
            setErrorFor(questionsFILE, 'Amount of questions must be number')
        }
        else if(questionsFILE.value > 50){
            setErrorFor(questionsFILE, 'Number of questions cannot be over 50')
        }
        else if(questionsFILE.value <= 0){
            setErrorFor(questionsFILE, 'Number of questions cannot be under 0')
        }
        else{
            setSuccessFor(questionsFILE)
            correctQuestions = true
        }

        if(timerFILE.value == "" && checkFILE.checked == true){
            setErrorFor(timerFILE, 'Please insert number of time')
        }else if ((timerFILE.value < 0 || timerFILE.value > 60) && checkFILE.checked == true){
            setErrorFor(timerFILE, 'Invalid input')
        }else if(isNaN(parseInt(timerFILE.value)) && checkFILE.checked == true){
            setErrorFor(timerFILE, 'Amount of time must be number')
        }
        else if (timerFILE.value != "" && checkFILE.checked == true){
            setSuccessFor(timerFILE)
            correctTime = true
        }
    }
    else if(InputType == "API"){
        if(questionsAPI.value == ""){
            setErrorFor(questionsAPI, 'Number of questions cannot be blank')
        } 
        else if(isNaN(parseInt(questionsAPI.value))){
            setErrorFor(questionsAPI, 'Amount of questions must be number')
        }
        else if(questionsAPI.value > 50){
            setErrorFor(questionsAPI, 'Number of questions cannot be over 50')
        }else if(questionsAPI.value <= 0){
            setErrorFor(questionsAPI, 'Number of questions cannot be under 0')
        }else{
            setSuccessFor(questionsAPI)
            correctQuestions = true
        }

    if(timer.value == "" && check.checked == true){
        setErrorFor(timer, 'Please insert number of time')
    }else if (timer.value > 60 && check.checked == true){
        setErrorFor(timer, 'The number of time is too big')
    }else if(isNaN(timer_value) && check.checked == true){
        setErrorFor(timer, 'Amount of time must be number')
    }

    if((filed)&&((correctTime && correctQuestions) ||(correctQuestions && checkFILE.checked == false))){
        checkJSON()
    }

    if((correctTime && correctQuestions) ||(correctQuestions && check.checked == false)){
        location.assign('Quiz.html')
    }
}

function setErrorFor(input, message){
    const formControl = input.parentElement //inputfield
    const small = formControl.querySelector('small')
    
    small.innerText = message
    formControl.className = 'input_field error'
}

function setSuccessFor(input){
    const formControl = input.parentElement
    formControl.className = 'input_field success'
}

