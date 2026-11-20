let savedWords = JSON.parse(localStorage.getItem("savedWords")) || [];

let currentQuestion = 0;
let totalQuestion = savedWords.length;
let quizWords = [...savedWords];

const totalWords = document.getElementById("totalwords");
totalWords.textContent = savedWords.length;
//console.log(savedWords);

const emptyContainer = document.getElementById("emptycontainer");
const quizCard = document.getElementById("quizcard");

if (savedWords.length === 0) {
  emptyContainer.classList.remove("hidden");
  quizCard.classList.add("hidden");
} else {
  emptyContainer.classList.add("hidden");
  quizCard.classList.remove("hidden");
}
const question = document.getElementById("question");

const answer = document.getElementById("answer");
const revealAnsBtn = document.getElementById("revealAnsBtn");

const knewBtn = document.getElementById("knewBtn");
const didntknewBtn = document.getElementById("didntknewBtn");

let randomword;
function showQuestion() {
  const randomIndex = Math.floor(Math.random() * quizWords.length);

  randomword = quizWords[randomIndex];
  const definition = randomword.meanings[0].definitions[0].definition;
  question.textContent = definition;

  answer.textContent = "";
  answer.classList.add("hidden");

  revealAnsBtn.classList.remove("hidden");
  knewBtn.classList.add("hidden");
  didntknewBtn.classList.add("hidden");

  quizWords.splice(randomIndex, 1);
  //console.log(randomword);
}

let hasAnswered = false;
const message = document.getElementById("message");

function nextQuestion() {
  currentQuestion++;

  if (quizWords.length > 0) {
    hasAnswered = false;
    showQuestion();
  } else {
    question.classList.add("hidden");
    answer.classList.add("hidden");
    revealAnsBtn.classList.add("hidden");
    knewBtn.classList.add("hidden");
    didntknewBtn.classList.add("hidden");

    message.textContent = "Quiz completed! You answered all saved words.";
    message.classList.remove("hidden");

    const questionInstruction = document.getElementById("questioninstruction");
    questionInstruction.classList.add("hidden");
  }
}

revealAnsBtn.addEventListener("click", () => {
  answer.textContent = randomword.word;

  answer.classList.remove("hidden");
  revealAnsBtn.classList.add("hidden");

  knewBtn.classList.remove("hidden");
  didntknewBtn.classList.remove("hidden");
});

if (quizWords.length > 0) {
  showQuestion();
}

let totalAttempts = localStorage.getItem("totalAttempt") || 0;
let correctAnswers = localStorage.getItem("correctAnswer") || 0;

const accuracy = document.getElementById("accuracy");

function updateAccuracy(){
   if (totalAttempts > 0) {
  accuracy.textContent =
    Math.round((correctAnswers / totalAttempts) * 100) + "%";
} else {
  accuracy.textContent = "0 %";
}
}

knewBtn.addEventListener("click", () => {
  if (hasAnswered) return;
  hasAnswered = true;

  totalAttempts++;
  correctAnswers++;

  localStorage.setItem("totalAttempt", totalAttempts);
  localStorage.setItem("correctAnswer", correctAnswers);
  
  updateAccuracy();
  nextQuestion();
  //console.log(totalAttempts, correctAnswers);
});

didntknewBtn.addEventListener("click", () => {
  if (hasAnswered) return;
  hasAnswered = true;

  totalAttempts++;

  localStorage.setItem("totalAttempt", totalAttempts);

  updateAccuracy();
  nextQuestion();
  // console.log(totalAttempts, correctAnswers);
});

updateAccuracy();
