const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest mammal on Earth?",
    answers: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
  {
    question: "Who wrote the play 'Romeo and Juliet'?",
    answers: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Leo Tolstoy",
    ],
    correctAnswer: "William Shakespeare",
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    question: "What is the world's longest river?",
    answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    correctAnswer: "Nile",
  },
  {
    question: "Which gas makes up the majority of Earth's atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Nitrogen",
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Venus", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "How many continents are there on Earth?",
    answers: ["5", "6", "7", "8"],
    correctAnswer: "7",
  },
  {
    question: "Which gas do plants release during photosynthesis?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Oxygen",
  },
];

let currentQuestionIndex = 0;
let timeLeft = 600; // 10 minutes in seconds
let userAnswers = new Array(questions.length).fill(null);
let timerInterval;

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer").textContent = `${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function displayQuestion() {
  const questionText = document.getElementById("question-text");
  const answerChoices = document.getElementById("answer-choices");
  const currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = `${currentQuestionIndex + 1}) ${
    currentQuestion.question
  }`;
  answerChoices.innerHTML = "";

  currentQuestion.answers.forEach((answer, index) => {
    const li = document.createElement("li");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.id = `answer-${index}`;
    radio.value = answer;
    const label = document.createElement("label");
    label.htmlFor = `answer-${index}`;
    label.textContent = answer;
    li.appendChild(radio);
    li.appendChild(label);
    answerChoices.appendChild(li);
  });

  const nextButton = document.getElementById("next-button");
  nextButton.disabled = true;

  const radioInputs = document.querySelectorAll('input[type="radio"]');
  radioInputs.forEach((radio) => {
    radio.addEventListener("change", () => {
      nextButton.disabled = false;
    });
  });
}

function handleNextButtonClick() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (selectedAnswer) {
    userAnswers[currentQuestionIndex] = selectedAnswer.value;
  }

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}

document
  .getElementById("next-button")
  .addEventListener("click", handleNextButtonClick);

function endQuiz() {
  clearInterval(timerInterval);
  document.getElementById("timer").innerText= "Quiz Done!"

  const totalQuestions = questions.length;
  let correctAnswers = 0;

  for (let i = 0; i < totalQuestions; i++) {
    if (userAnswers[i] === questions[i].correctAnswer) {
      correctAnswers++;
    }
  }

  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(1);

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("result-container");
  resultContainer.innerHTML = `
        <p>Your Score: ${correctAnswers} out of ${totalQuestions}</p>
        <p>Percentage: ${percentage}%</p>
    `;

  document.querySelector(".quiz-container").appendChild(resultContainer);

  document.getElementById("question-text").textContent = "Quiz completed!";
  document.getElementById("answer-choices").innerHTML = "";
  document.getElementById("next-button").style.display = "none";
}

displayQuestion();
updateTimer();

timerInterval = setInterval(() => {
  if (timeLeft > 0) {
    timeLeft--;
    updateTimer();
  } else {
    endQuiz();
  }
}, 1000);
