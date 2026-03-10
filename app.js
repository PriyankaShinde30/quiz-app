import { questions } from "./questions.js";

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");

const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progressText = document.getElementById("progress");
const timerElement = document.getElementById("timer");
const scoreText = document.getElementById("score-text");

let currentQuestionIndex = 0;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

function showQuestion() {
  nextBtn.style.display = "none";

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option");

    button.dataset.index = index;

    optionsContainer.appendChild(button);
  });
}

optionsContainer.addEventListener("click", handleAnswerClick);

function handleAnswerClick(event) {
  const selectedButton = event.target;

  const selectedIndex = Number(selectedButton.dataset.index);

  const correctIndex = questions[currentQuestionIndex].answer;

  if (selectedIndex == correctIndex) {
    score++;
    selectedButton.style.backgroundColor = "green";
  } else {
    selectedButton.style.backgroundColor = "red";
  }

  Array.from(optionsContainer.children).forEach((button, index) => {
    if (index === correctIndex) {
      button.style.backgroundColor = "green";
    }

    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion(){
    currentQuestionIndex++;

    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showResult();
    }
}

function showResult(){
    quizScreen.classList.add("hidden");
    restartBtn.classList.remove("hidden");
    scoreText.textContent = `You Scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz(){
    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    currentQuestionIndex = 0;
    score = 0;
}

let highScore = localStorage.getItem("highscore") || 0;
if(score > highScore){
    localStorage.setItem("highScore", score);
}