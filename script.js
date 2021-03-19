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
// attaches the html to the javascript and the dom 
var startButton = document.querySelector("#start-button");
// attaches the html to the javascript and the dom 
var questionsEl = document.querySelector("#quiz-questions");
//the old way to attach the dom to html 
var choicesEl = document.getElementById('choices');
// attaches the html to the javascript and the dom 
var timeEl = document.querySelector(".time");
// attaches the html to the javascript and the dom 
var saveBtn = document.querySelector("save");
//sets the score to 0 
var score = 0;
// stops the time when quiz over 
var timerId;
// starts the quiz
startButton.addEventListener("click", startQuiz)
// hides the end-screen to the end 
document.getElementById("end-screen").style.display = "none";
//Get highscores from local Storage
var highscoreList = document.getElementById('listScore');
//conects the feedback to the html 
var feedback = document.getElementById("feedback")
//sets the highscores array to the local storage or an empty one
var highscoresArr = JSON.parse(localStorage.getItem('highscores')) || [];
//gets the listcore element 
var highscoreList = document.getElementById('listScore');
//gets the initials element
var initialEl = document.getElementById("initials");
//gets the final score element 
var finalScoreEl = document.getElementById("final-score");

console.log(feedback)

// this function starts the quiz and does console.log working, also connects the timer and the questions together with the start button
function startQuiz() {
    // console.log('working')
  //  questScreen.setAttribute();
//hide start btn
startButton.style.display = 'none';

 // TODO:
 // - set off timer
    setTime();
 //display questions/answers
 getQuestion()

};


// this function allows the click to happen and be recorded in the consol for verification 
function choiceClick(){
    // console.log('I WAS CLICKED')
    //is the clicking action 
    console.log(this.value)

        // if wrong answer is clicked alert window shows incorrect
        if(this.value !== questions[currentQuestionIndex].answer  ){
            feedback.innerText = "incorrect";
            feedback.style.fontSize = "50px";
            feedback.style.color= "red"
            score = score -5;
            secondsLeft -= 15;
        
        //if the correct answer is clicked with this value shows correct,
        } else{
            feedback.innerText = "Correct!";
            feedback.style.fontSize = "50px";
            feedback.style.color= "green";
            score = score +5;
            document.getElementById("feedback").style.display = "block";

        }
    
        document.getElementById("feedback").style.display = "block";
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
// time starts and stops with the quiz and shows seconds left on the screen after it starts
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
//stores initials and score to local storage 
function saveLastScore() {
    console.log("working")
    var initialsScore = {
        initials: initials.value,
        score: score
    };
    console.log(initialsScore)
    localStorage.setItem("initialsscore", JSON.stringify(initialsScore));
    
    console.log(highscoresArr)

    highscoresArr.push(initialsScore)

    localStorage.setItem("highscores", JSON.stringify(highscoresArr));
    
};

//render highscores 
function renderHighscores(){
    var highscoreDiv = document.getElementById('high-score')
    highscoreDiv.style.display = 'block';
   
       
    
    for (let i = 0; i < highscoresArr.length; i++) {
      console.log('HS', highscoresArr[i])
      var item = document.createElement('li');
      

      item.textContent = highscoresArr[i].initials + ' . ' + highscoresArr[i].score;
      highscoreList.append(item);
      
    }
}
// ends the quiz and clears the screen and shows the end-screen and score 
function endQuiz () {
    clearInterval(timerId);
    
    choicesEl.innerHTML = "";
    quest.innerHTML = "";
    feedback.innerHTML= "";
    
    document.getElementById("end-screen").style.display="block";
    document.getElementById("final-score").innerText = score;

   
}



var saveButton = document.getElementById("save");
//creates the event listener for save button and stops the default, saveLastSCORE and render highscores is called 
saveButton.addEventListener("click", function(event) {
    event.preventDefault();
    saveLastScore();
    renderHighscores();
    });
    
   
    //stops the display of high scores until called 
    document.getElementById("high-score").style.display = "none";
    //creates highscoreel and attactes to highscore in the html 
var highScoreEl = document.getElementById("high-score");


// end quiz function stops the time, clears the questions, answers and shows the end-screen
     startButton.addEventListener("click", startQuiz)





