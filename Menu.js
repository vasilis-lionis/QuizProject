const startButtonAPI = document.getElementById("start-btn")
const startButtonFILE = document.getElementById("start-btn file")
const formAPI = document.getElementById("form API")
const formFILE = document.getElementById("form FILE")
const questionsAPI = document.getElementById("sum_questions API")
const questionsFILE = document.getElementById("sum_questions FILE")
const categoryAPI = document.getElementById("category API")
const categoryFILE = document.getElementById("category FILE")
const difficultyAPI = document.getElementById("difficulty API")
const difficultyFILE = document.getElementById("difficulty FILE")
const typeAPI = document.getElementById("type API")
const typeFILE = document.getElementById("type FILE")
const timerAPI = document.getElementById("timer API")
const timerFILE = document.getElementById("timer FILE")
const checkAPI = document.getElementById("check API")
const checkFILE = document.getElementById("check FILE")
const file = document.getElementById("file")
let tabs = document.querySelectorAll(".tabs__toggle"),
    contents = document.querySelectorAll('.tabs__content')
var Check
//vars for right function call or error message 
var api = false 
var filed = false

tabs.forEach((tab,index) =>{
    tab.addEventListener('click', (e) =>{
        contents.forEach((content) =>{
            content.classList.remove('is-active')
        })
        tabs.forEach((tab) => {
            tab.classList.remove('is-active')
        })

        var line = document.querySelector(".line")
        line.style.width = e.target.offsetWidth + "px"
        line.style.left = e.target.offsetLeft + "px"

        contents[index].classList.add('is-active')
        tabs[index].classList.add('is-active')
    })
})


function CheckFILE(){
    try{
        json = JSON.parse(json)
    }catch(e) {
        return false
    }
    return true 
}

function message(){
    if (CheckFILE()){
        alert("File Saved")
        document.getElementById("label").innerHTML = "File Chosen"
        filed = true
    }else{
        alert("This is a wrong schema JSON File")       
    }
}

function readFile(){
    let reader = new FileReader()

    reader.readAsText(file.files[0])

    reader.onload = function(){
        json = reader.result
        message()
    }
}

startButtonAPI.addEventListener('click',()=>{
    InputType = "API"
    api = true
    filed = false
    checkInputs()
    sendItems()
})

startButtonFILE.addEventListener('click',()=>{
    InputType = "FILE"
    api = false
    checkInputs()
    sendItems()
})

function checkInputs(){
    if(InputType == "FILE"){
        checkInputsByType(questionsFILE,timerFILE,checkFILE)
    }
    else if(InputType == "API"){
        checkInputsByType(questionsAPI,timerAPI,checkAPI)
    }
}

function checkInputsByType(questions,timer,check){
    var correctQuestions = false
    var correctTime = false

    if(questions.value == ""){
        setErrorFor(questions, 'Number of questions cannot be blank')
    }
    else if(isNaN(parseInt(questions.value))){
        setErrorFor(questions, 'Amount of questions must be number')
    }
    else if(questions.value > 50){
        setErrorFor(questions, 'Number of questions cannot be over 50')
    }
    else if(questions.value <= 0){
        setErrorFor(questions, 'Number of questions cannot be under 0')
    }
    else{
        setSuccessFor(questions)
        correctQuestions = true
    }

    if(timer.value == "" && check.checked == true){
        setErrorFor(timer, 'Please insert number of time')
    }else if ((timer.value < 0 || timer.value > 60) && check.checked == true){
        setErrorFor(timer, 'Invalid input')
    }else if(isNaN(parseInt(timer.value)) && check.checked == true){
        setErrorFor(timer, 'Amount of time must be number')
    }
    else if (timer.value != "" && check.checked == true){
        setSuccessFor(timer)
        correctTime = true
    }

    Travels(correctQuestions,correctTime,check) 
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

function Travels(correctQuestions,correctTime,check){
    if((filed)&&((correctTime && correctQuestions) ||(correctQuestions && check.checked == false))){
        checkJSON()
    }
    else if((!filed) && (!api)){
        alert("You do not upload a Quiz file")
    }
    else if((correctTime && correctQuestions)||(correctQuestions && check.checked == false)){
        getFile()
    }
}


function getFile(){
    var link = `https://opentdb.com/api.php?amount=${questionsAPI.value}`
    
    var file = "Documents/10-Entertainment_ Books.oq"
    var file_peinaw = "Documents/quiz_peinaw.json"
    var file2 = "10-Entertainment_ Books.oq"


    if(categoryAPI.value != 0){
        link += `&category=${categoryAPI.value}`
    }
    if(difficultyAPI.value != ""){
        link += `&difficulty=${difficultyAPI.value}`
    }
    if(typeAPI.value != ""){
        link += `&type=${typeAPI.value}` 
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
    if(InputType == "API"){
        sendItemsByType(formAPI,questionsAPI,timerAPI,typeAPI,checkAPI)
    }
    else if(InputType == "FILE"){
        sendItemsByType(formFILE,questionsFILE,timerFILE,typeFILE,checkFILE)
    }
}

function sendItemsByType(form,questions,timer,type,check){
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const Timer = timer.value 
        const Questions = questions.value
        const Type = type.value
        if (check.checked == true){
            Check = 1
        } 
        else{
            Check = 0
        }
        localStorage.setItem('questions',Questions)
        localStorage.setItem('Timer', Timer)
        localStorage.setItem('check', Check)
        localStorage.setItem('type', Type)
    })
}

function checkJSON(){
    if(json.results.length == 0){
        alert("This inputs didn't give any questions")
    }else{
        json = JSON.stringify(json)
        localStorage.setItem('json', json)
        goToQuiz()
    }
}

function goToQuiz(){
    location.assign('Quiz.html')
}


