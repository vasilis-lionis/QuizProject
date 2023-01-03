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
var filed = false

tabs.forEach((tab,index) =>{
    tab.addEventListener('click', () =>{
        contents.forEach((content) =>{
            content.classList.remove('is-active')
        })
        tabs.forEach((tab) => {
            tab.classList.remove('is-active')
        })

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
        alert("good json")
        document.getElementById("label").innerHTML = "File Chosen"
    }else{
        alert("bad json")
    }
    filed = true
}

startButtonAPI.addEventListener('click',()=>{
    InputType = "API"
    checkInputs()
    sendItems()
})

startButtonFILE.addEventListener('click',()=>{
    InputType = "FILE"
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

        if(timerAPI.value == "" && checkAPI.checked == true){
            setErrorFor(timerAPI, 'Please insert number of time')
        }else if ((timerAPI.value < 0 || timerAPI.value > 60) && checkAPI.checked == true){
            setErrorFor(timerAPI, 'Invalid input')
        }else if(isNaN(parseInt(timerAPI.value)) && checkAPI.checked == true){
            setErrorFor(timerAPI, 'Amount of time must be number')
        }
        else if (timerAPI.value != "" && checkAPI.checked == true){
            setSuccessFor(timerAPI)
            correctTime = true
        }
    }

    if((filed)&&((correctTime && correctQuestions) ||(correctQuestions && checkFILE.checked == false))){
        checkJSON()
    }
    else if((correctTime && correctQuestions) ||(correctQuestions && checkAPI.checked == false)){
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
        formAPI.addEventListener('submit', function(e){
            e.preventDefault()
            const Timer = timerAPI.value 
            const Questions = questionsAPI.value
            const Type = typeAPI.value
            if (checkAPI.checked == true){
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
    else if(InputType == "FILE"){
        formFILE.addEventListener('submit', function(e){
            e.preventDefault()
            const Timer = timerFILE.value 
            const Questions = questionsFILE.value
            const Type = typeFILE.value
            if (checkFILE.checked == true){
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
}

function checkJSON(){
    if(json.results.length == 0){
        alert("No questions")
    }else{
        json = JSON.stringify(json)
        localStorage.setItem('json', json)
        goToQuiz()
    }
}

function goToQuiz(){
    location.assign('Quiz.html')
}
