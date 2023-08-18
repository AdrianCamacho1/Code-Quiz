var win = document.querySelector(".win");
var lose = document.querySelector(".lose");
var timerElement = document.querySelector(".timer-count");
var startButton = document.querySelector(".start-button");
var timerCount = document.querySelector("#timer-count")

var winCounter = 0;
var loseCounter = 0;
var isWin = false;
var timer;
var timerCount;
var currentQuestionIndex = 0;

var questions = [
  {
    question: "what is an array?", 
    answers: [
      {text: "Function", correct: false},
      {text: "Object", correct: true},
      {text: "String", correct: false},
      {text: "Interval", correct: false}
    ]
  },
  {
    question: "When would i use setinterval?", 
    answers: [
      {text: "I would use it to set the speed of a fixed time", correct: true},
      {text: "I would use it to set an array of numbers", correct: false},
      {text: "I would use it to set the length of time", correct: false},
      {text: "I would use it to return a number", correct: false}
    ]
  },
  {
    question: "In css what is the value for white?", 
    answers: [
      {text: "#000", correct: false},
      {text: "#222", correct: false},
      {text: "#111", correct: false},
      {text: "#fff", correct: true}
    ]
  },
  {
    question: "How do Intervals count?", 
    answers: [
      {text: "In milliseconds", correct: true},
      {text: "In half seconds", correct: false},
      {text: "In seconds", correct: false},
      {text: "In nanoseconds", correct: false}
    ]
  },
  {
    question: "What character would I use to call an id in css", 
    answers: [
      {text: "#", correct: true},
      {text: ".", correct: false},
      {text: ";", correct: false},
      {text: "$", correct: false}
    ]
  },
  {
    question: "What does the document:querySelector() method do?", 
    answers: [
      {text: "interface returns an element object representing the element whose id property matches the specified string.", correct: false},
      {text: " interface sets up a function that will be called whenever the specified event is delivered to the target.", correct: false},
      {text: "returns the first element within the document that matches the specified selector, or group of selectors.", correct: true},
      {text: "instructs the browser to display a dialog with an optional message, and to wait until the user dismisses the dialog.", correct: false}
    ]
  },
  {
    question: "what does return do?", 
    answers: [
      {text: "It ends the string", correct: false},
      {text: "It ends the Object", correct: false},
      {text: "It ends the function", correct: true},
      {text: "it ends the Interval", correct: false}
    ]
  },
  {
    question: "What would I use to use a function everytime the user inputs?", 
    answers: [
      {text: "Button", correct: false},
      {text: "addEventListener", correct: true},
      {text: "var", correct: false},
      {text: "let", correct: false}
    ]
  },
];
console.log(questions)

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer-buttons");
var nextButton = document.getElementById("next-btn");


function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    var button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  var selectedBtn = e.target;
  var isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = 'You made it to the end but did you beat the time?';
  nextButton.innerHTML = "Play Again?";
  nextButton.style.display = "block";
}

function handleNextButton(){

  if (currentQuestionIndex === 0){
    countdown()
  }


  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

function countdown() {
  var timeLeft = 30;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerCount.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerCount.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerCount.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      loseGame();
    }
  }, 1000);
}

startQuiz();
