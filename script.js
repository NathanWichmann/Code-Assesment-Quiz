// these are the questions used the quiz, set up in an array. each section of the array has an easy id to get to in the array 
var questions = 
      [
        { 
          quest: "What does HTML stand for?",
          options: ["1. Hypercode Markup Language", "2. Hyperactive Mark Language", "3. Hypertext Markdown Listing",
                    "4. Hypertext Markup Language"],
                
                    answer: "4. Hypertext Markup Language"
        },
        
        { 
          quest: "What does CSS stand for?",
          options: ["1. Cascading Sign Signals", "2. Cascading Style Sheets", "3. Casandras Silly Symporium", 
                    "4. Carls Simple Signs" ],
                    answer: "2. Cascading Style Sheets"
        },

        {  
            quest: "Who is credited with inventing javaScript?",
            options: [ "1. Napster", "2. Netflix", "3. Nestle", "4. Netscape"],
            answer: "4. Netscape"
        },
        {
            
            quest: "What is a variable in JavaScript?",
            options: ["1. JavaScript includes variables which hold the data value and it can be changed anytime.", "2. Can not be changed at anytime",
                    "3. Is consistant all the time", "4. Can be changed, but will quickly change back at any time without notice"],
            answer: "1. JavaScript includes variables which hold the data value and it can be changed anytime."
                }
        ];
//these questions all console log in an array 
console.log (questions);

// this is the time allowed in the quiz 
var secondsLeft = 60;
// the index of the current question array is set to 0 
var currentQuestionIndex = 0;
// this attaches the dom to the start button in the html and the css
var startButton = document.querySelector("#start-button");
// this attaches the dom to the start button in the html and the css
var questionsEl = document.querySelector("#quiz-questions");
//the old way to attach the dom to html 
var choicesEl = document.getElementById('choices');
var timeEl = document.querySelector(".time");
var saveBtn = document.querySelector("#save");
var score = 0;
var timerId;


startButton.addEventListener("click", startQuiz)
document.getElementById("end-screen").style.display = "none";

// this function starts the quiz and does console.log working, also connects the timer and the questions together with the start button
function startQuiz() {
    console.log('working')
  //  questScreen.setAttribute();
//hide start btn
startButton.style.display = 'none';

 // TODO:
 // - set off timer
    setTime();
 //display questions/answers
 getQuestion()

};
var correct =0;
// this function allows the click to happen and be recorded in the consol for verification 
function choiceClick(){
    console.log('I WAS CLICKED')
    //is the clicking action 
    console.log(this.value)
        //if the correct answer is clicked with this value shows correct, if wrong answer is clicked alert window shows incorrect
        if(this.value !== questions[currentQuestionIndex].answer  ){
            feedback.textContent = "incorrect";
            feedback.style.fontSize = "50px";
            feedback.style.color= "red"
            score = score -5;
            secondsLeft -= 15;
        
         
        } else{
            feedback.textContent = "Correct!";
            feedback.style.fontSize = "50px";
            feedback.style.color= "green";
            score = score +5;
            

        }
    

    //moves on to the next question
    currentQuestionIndex++;
    // when the array is finsished end game, if not get next question
    if (currentQuestionIndex === questions.length) {
        endQuiz() 
    } else { 
        getQuestion();
    }
};



// this function creates a button class of answers with a value of current answers and clears the answers and goes to the next questions 
// after the alerts says correct or incorrect above 
function getAnswers(){
    choicesEl.innerHTML = "";
    var currentAnswers = questions[currentQuestionIndex].options
    for (let i = 0; i < currentAnswers.length; i++) {
        console.log(currentAnswers[i])
        var choice = document.createElement('button');
            choice.setAttribute('class', 'answers');
            choice.setAttribute('value', currentAnswers[i]);
            choice.textContent = currentAnswers[i];
            choice.onclick = choiceClick;
            choicesEl.appendChild(choice);
        }
};
// this function gets the questions from the #quest id and calls the answers 
function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var questEl = document.getElementById("quest")
   questEl.textContent = currentQuestion.quest;
    getAnswers()
};

function setTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left.";

    if(secondsLeft === 0 ||currentQuestionIndex === questions.length) {
     
      clearInterval(timerInterval);

      endQuiz()

    }

  }, 1000);
};
var initialEl = document.getElementById("initials")
var finalScoreEl = document.getElementById("final-score");
function saveLastScore() {
    console.log("working")
    var initialsScore = {
        initials: initials.value,
        score: score.value,
    };
    localStorage.setItem("initialsScore", JSON.stringify(initialsScore));
    
}
var lastScore = JSON.parse(localStorage.getItem("initialsScore"));
function renderLastScore () {
    
    if (lastScore !== null) {
        document.getElementById("final-score").innerHTML = finalScoreEl;
        document.getElementById("initials").innerHTML = initialEl;
} else {
    return;
  }
}
var saveButton = document.getElementById("save");
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveLastScore();
    renderLastScore();
    });

    



function endQuiz () {
    
    
    clearInterval(timerId);
    
    choicesEl.innerHTML = "";
    quest.innerHTML = "";
    feedback.innerHTML= "";
    
    document.getElementById("end-screen").style.display="block"



    

    // TODO: calculate or grab te score
    // TODO: ask the user for their name
    // sow them a list of  scoores
    // store the  new score in local storage
    
}


    
    
    startButton.addEventListener("click", startQuiz)





