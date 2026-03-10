import { questions } from "./questions.js";

const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const startHighScore = document.getElementById("start-high-score");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const progressFill = document.getElementById("progress-fill");

const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const progressText = document.getElementById("progress");
const timerElement = document.getElementById("timer");
const scoreText = document.getElementById("score-detail");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

function updateStartHighScore() {
  const storedHighScore = localStorage.getItem("highScore") || 0;
  startHighScore.textContent = `${storedHighScore}%`;
}

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

function startTimer() {
  timerElement.textContent = `${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `${timeLeft}s`;

    if (timeLeft == 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;

  showQuestion();
}

function showQuestion() {
  optionsContainer.classList.remove("answered");
  nextBtn.style.display = "none";

  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;

  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

  optionsContainer.innerHTML = "";

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;

  progressFill.style.width = `${progressPercent}%`;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option");

    button.dataset.index = index;

    optionsContainer.appendChild(button);
  });

  clearInterval(timer);
  timeLeft = 30;
  startTimer();
}

optionsContainer.addEventListener("click", handleAnswerClick);

function handleAnswerClick(event) {
  const selectedButton = event.target.closest(".option");

  if (!selectedButton) return;

  if (optionsContainer.classList.contains("answered")) return;
  optionsContainer.classList.add("answered");
  clearInterval(timer);

  const selectedIndex = Number(selectedButton.dataset.index);

  const correctIndex = questions[currentQuestionIndex].answer;

  if (selectedIndex == correctIndex) {
    score++;
    console.log(score);
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }

  Array.from(optionsContainer.children).forEach((button, index) => {
    if (index === correctIndex) {
      button.classList.add("correct");
    }

    button.disabled = true;
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  if (score <= 4) {
    resultTitle.textContent = "Good Effort!";
    resultMessage.textContent =
      "Practice more and try again to improve your score.";
  } else if (score <= 8) {
    resultTitle.textContent = "Great Job!";
    resultMessage.textContent = "Wow! Well done, you have good knowledge.";
  } else {
    resultTitle.textContent = "Congratulations!";
    resultMessage.textContent =
      "Excellent! You have great knowledge of JavaScript.";
  }

  const percentage = Math.round((score / questions.length) * 100);

  const percentageElement = document.getElementById("percentage");
  const scoreDetail = document.getElementById("score-detail");
  const highScoreElement = document.getElementById("high-score");

  scoreDetail.textContent = `${score}/${questions.length}`;

  let highScore = localStorage.getItem("highScore") || 0;

  if (percentage > highScore) {
    localStorage.setItem("highScore", percentage);
    highScore = percentage;
  }

  highScoreElement.textContent = `${highScore}%`;
}

restartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");

  updateStartHighScore();
  currentQuestionIndex = 0;
  score = 0;
}

let highScore = localStorage.getItem("highScore") || 0;
if (score > highScore) {
  localStorage.setItem("highScore", score);
}
