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
var json = ""
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

function readFile(){ //UPLOAD FILE
    let reader = new FileReader()

    reader.readAsText(file.files[0])

    reader.onload = function(){
        json = reader.result
        message()
    }
}

function message(){ //MESSAGE FOR THE UPLOAD STATE
    if (CheckFILE()){
        alert("File Saved")
        document.getElementById("label").innerHTML = "File Chosen"
        filed = true
    }else{
        alert("This is a wrong schema JSON File")       
    }
    
}

function CheckFILE(){ //JSON VALIDATION 
    try{
        json = JSON.parse(json)
    }catch(e) {
        return false
    }
    return true 
}

//event which triggered when the user presed the "Start Quiz" button from the api form
startButtonAPI.addEventListener('click',()=>{
    InputType = "API"
    api = true
    filed = false
    checkInputs()
    sendItems()
})

//event which triggered when the user presed the "Start Quiz" button from the file form
startButtonFILE.addEventListener('click',()=>{
    InputType = "FILE"
    api = false
    if(filed){
        if ((json.results.length < questionsFILE.value) && filed){
            alert("This file has fewer questions about 'question number' input and it will game with "+json.results.length + " questions")
            questionsFILE.value = json.results.length
        }
    }
    checkInputs()
    sendItems()
})

//function that chooses the correct vars and then checking them with the checkInputsByType function
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
        FileFilteringJson(json)
        //checkJSON()
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
        finaljson = jsondata
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
        const Type = type.value

        if (check.checked == true){
            Check = 1
        } 
        else{
            Check = 0
        }

        localStorage.setItem('Timer', Timer)
        localStorage.setItem('check', Check)
        localStorage.setItem('type', Type)
    })
}
var Questions 
function checkJSON(){
    if(finaljson.results.length == 0){ //CHECKS IF FOR SOME REASON THE FINAL JSON HASNT ANY QUESTIONS
        alert("This inputs didn't give any questions")
        return
    }
    else if(finaljson.results.length < questionsFILE.value){ //CHECKS IF THE GIVE FILE HAS LESS QUESTIONS THAN USER'S INPUT
        alert("This file has fewer questions about 'question number' input and it will game with "+finaljson.results.length + " questions")
        Questions = finaljson.results.length
    }
    else if (InputType == "FILE"){ //IF THE OTHERS ARE FALSE AND IT RUNS A "FILE" QUIZ
        Questions = questionsFILE.value
    }else if(InputType == "API"){ //AND HERE IF IT RUNS A "API" QUIZ 
        Questions = questionsAPI.value
    }

    localStorage.setItem('questions',Questions) //SENDS THE AMOUNT OF QUESTIONS
    finaljson = JSON.stringify(finaljson) //STRING PARSING THE JSON FILE TO SEND IT WITHOUT PROBLEMS 
    localStorage.setItem('json', finaljson) //SENDS THE "FINALJSON" FILE WITH THE FINAL FORM 
    goToQuiz()
}

function goToQuiz(){
    location.assign('Quiz.html')
}

var finaljson = {
        "response_code": 0,
        "results": []
    }

function FileFilteringJson(unfilteredjson){
    if((difficultyFILE.value != "") || (typeFILE.value != "")){
        for(let i=0; i<unfilteredjson.results.length; i++){
            if((difficultyFILE.value == unfilteredjson.results[i].difficulty) && (typeFILE.value == unfilteredjson.results[i].type)){
                finaljson.results.push(unfilteredjson.results[i])
            }
        }
    }
    else{
        finaljson = unfilteredjson
    }
    console.log(finaljson)
    checkJSON()
}