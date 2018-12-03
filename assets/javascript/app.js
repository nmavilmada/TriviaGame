//  create object called mcqDataBase to  hold questions and answers
var mcqDataBase = [
    {
        question: 'What is the capital of USA?',
        answers: ["Denver", "Annapolis", "Washington D.C", "San Fransisco"],
        correctAnswerIndex: 2
    },
    {
        question: 'What is the capital of Mexico?',
        answers: ["Mexico city", "Cancun", "Acapulco", "Tijuana"],
        correctAnswerIndex: 0
    },
    {
        question: 'What is the capital of Argentina?',
        answers: ["Palermo", "Buenos Aires", "Santa Fe", "Rosario"],
        correctAnswerIndex: 1
    },
    {
        question: 'What is the capital of Sri Lanka?',
        answers: ["Polonnaruwa", "Kandy", "Colombo", "Sri Jayawardenepura Kotte"],
        correctAnswerIndex: 3
    },
    {
        question: 'What is the capital of Netherlands?',
        answers: ["Rotterdam", "Amsterdam", "Leiden", "The Hague"],
        correctAnswerIndex: 1
    }
];

// create countDownTimer variable of 30 seconds
const countDownTimer = 30;
// create questionIndex  = 0 to assign an index number to each question in the mcqDatabase
var questionIndex = 0;
// create answerIndex  = 0 to assign an index number to each answer set  in the mcqDatabase
var answerIndex = 0;
var mcqAnswers = 4;

var countDown = countDownTimer ;
//  create variable counter = setInterval(countDownT,1000);
var counter;
//  create variable mcqTimer = setTimeout(timeOut,countDownTimer*1000);
var mcqTimer;

// initialize game by creating a document ready function
// once start button is pressed it will disapear and dispaly all the questions

// create empty object answers that will store the last clicked answer to each question
var answers = {};

$(document).ready(function(){
    $('.start-button').on("click",function(){
        $(this).hide();
        displayQuestions();
        mcqTimer = setTimeout(timeOut,countDownTimer*1000);
        counter = setInterval(countDownT,1000);
    })
});
// store correct answer inside answers and increament total
function getTotalAnswered() {
    var total = 0
    for(var i = 0; i < mcqDataBase.length; i++) {
        if (answers[i]) {
            total++;
        }
    }
    return total;
}


function getNumberOfCorrectAnswers() {

    var total = 0
    for(var i = 0; i < mcqDataBase.length; i++) {
        if (answers[i] && answers[i].isCorrect) {
            total++;
        }
    }
    return total;

}

function getNumberOfInCorrectAnswers() {

    var total = 0
    for(var i = 0; i < mcqDataBase.length; i++) {
        if (answers[i] && !answers[i].isCorrect) {
            total++;
        }
    }
    return total;

}

function displaySummary(){
    if(getTotalAnswered() === mcqDataBase.length){
        $('.body-section').hide();
        $('.summary').append(`<div><h3>Number of Correct Answers : ${getNumberOfCorrectAnswers()}</h3></div>`);
        $('.summary').append(`<div><h3>Number of Incorrect Answers : ${getNumberOfInCorrectAnswers()}</h3></div>`);

        clearInterval(counter);
        clearTimeout(mcqTimer);

        return;
    }
}

function timeOut(){
    alert ("tinme")
    var totalAnswered = getTotalAnswered();
    var unasweredTotal = mcqDataBase.length - totalAnswered; 
    if( unasweredTotal > 0) {

        for(var i = 0; i < mcqDataBase.length; i++) {
            if (!answers[i]) {
                answers[i] = {
                    isCorrect: false
                };
            }
        }
    }
    displaySummary();
}

function countDownT(){
    if(countDown > 0){
        countDown = countDown-1;
        $(".count-down-timer").text(countDown);
    }
}




function displayQuestions(){
    console.log('test');
    for (var i = 0; i < mcqDataBase.length;i++){
        
        $('.questionBank').append($('<h3/>',{ class: 'question-' + i }));
        var questions = mcqDataBase[i].question;
        $(".question-"+i).text(questions);

        var answerSet = mcqDataBase[i].answers;

        for(var j = 0;j < answerSet.length;j++){ 
            
            $('.questionBank').append($('<p/>',{ class: `answer-${i}-${j}`}));
            
            $(`.answer-${i}-${j}`).html(`<div class="radio"><label><input type="radio" name="optradio-${i}" class="answer-btn" aIndex="${j}" qIndex="${i}">${answerSet[j]}</label></div>`);

        } 
    }

    $('.answer-btn').on("click", function () {
        var answerIndex = parseInt($(this).attr("aIndex"));
        var questionIndex = parseInt($(this).attr("qIndex"));

        if(getTotalAnswered() === mcqDataBase.length){
            return;
        }

        
     
        if (mcqDataBase[questionIndex].correctAnswerIndex === answerIndex) {

            answers[questionIndex] = {
                currentAnswer: answerIndex,
                isCorrect: true
            }
    
        } else {

            answers[questionIndex] = {
                currentAnswer: answerIndex,
                isCorrect: false
            }
        }
        
        displaySummary();

    });

}
 

       



