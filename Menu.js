const startButton = document.getElementById("start-btn")
const form = document.getElementById("form")
const questions = document.getElementById("sum_questions")
const category = document.getElementById("category")
const difficulty = document.getElementById("difficulty")
const type = document.getElementById("type")
const timer = document.getElementById("timer")
const check = document.getElementById("check")
const file = document.getElementById("file")
var Check
var filed = false

function checkFILE(){
    alert("EIMAI GIT")
    try{
        json = JSON.parse(json)
    }catch(e) {
        return false
    }
    return true
    
}

function message(){
    if (checkFILE()){
        alert("good json")
    }else{
        alert("bad json")
    }
    filed = true
    //alert(typeof json)
    //checkJSON()
}

startButton.addEventListener('click',()=>{
    checkInputs()
    sendItems()
})

function readFile(){
    let reader = new FileReader()

    reader.readAsText(file.files[0])

    reader.onload = function() {
        json = reader.result
        message()
    }
}


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

    if((filed)&&((correctTime && correctQuestions) ||(correctQuestions && check.checked == false))){
        checkJSON()
    }
    else if((correctTime && correctQuestions) ||(correctQuestions && check.checked == false)){
        getFile()
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

function getFile(){

    var link = `https://opentdb.com/api.php?amount=${questions.value}`
    
    var file = "Documents/10-Entertainment_ Books.oq"
    var file_peinaw = "Documents/quiz_peinaw.json"
    var file2 = "10-Entertainment_ Books.oq"

    if(category.value != 0){
        link += `&category=${category.value}`
    }
    if(difficulty.value != ""){
        link += `&difficulty=${difficulty.value}`
    }
    if(type.value != ""){
        link += `&type=${type.value}` 
    }

    fetch(link)
    .then(response => {
        return response.json() //retunrs our data
    })              
    .then(jsondata => {
        //json file
        json = jsondata
        checkJSON()
    })
}

function sendItems(){
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const Timer = timer.value
        const Questions = questions.value
        if (check.checked == true){
            Check = 1
        } 
        else{
            Check = 0
        }
        localStorage.setItem('questions',Questions)
        localStorage.setItem('Timer', Timer)
        localStorage.setItem('check', Check)
        
    })
}

function checkJSON(){
    if(json.results.length == 0){
        alert("EIMAI MESA REEEEEEEEEEE")
    }else{
        json = JSON.stringify(json)
        localStorage.setItem('json', json)
        goToQuiz()
    }
}

function goToQuiz(){
    location.assign('Quiz.html')
}
