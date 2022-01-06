"using strict";

const playButtonEl = document.querySelector(".hexagon-shape");
const menuContainerEl = document.querySelector(".menu-container");
const spinnerContainerEl = document.querySelector(".spinner-container");
const spinnerButtonEl = document.querySelector(".spinner-button");
const spinnerWheelEl = document.querySelector(".spinner-wheel");
const spinWheelTextEl = document.querySelector(".spin-wheel-text");
const buttonContainerEl = document.querySelector(".question-options");
const questionTypeContainer = document.querySelector(".question-type");
const questionTypeTextEl = document.querySelector(".question-type-text");
const questionTextEl = document.querySelector(".question-text");
const firstOptionEl = document.querySelector(".first-option");
const secondOptionEl = document.querySelector(".second-option");
const thirdOptionEl = document.querySelector(".third-option");
const fourthOptionEl = document.querySelector(".fourth-option");
const answerCheckerText = document.querySelector(".answer-checker-text");
const nextQuestionButton = document.querySelector(".next-question-button");
const questionContainer = document.querySelector(".question-container");
const userAnswerContainer = document.querySelector(".user-answer-counter");
const userCorrectAnswerEl = document.querySelector(".user-correct-answer");
const userWrongAnswerEl = document.querySelector(".user-wrong-answer");
const questionLeftEl = document.querySelector(".question-left");

let questionType,
  randomNumber,
  correctAnswer,
  randomQuestionNumber,
  questionAnswers;
let userCorrectAnswerCounter = 0;
let userWrongAnswerCounter = 0;
let questionLeftCounter = 10;

answerCheckerText.style.display = "none";
nextQuestionButton.style.display = "none";
questionContainer.style.display = "none";

const spinWheelDegrees = [
  { degree: 25, questionType: "science", category: 17 },
  { degree: 75, questionType: "movie", category: 11 },
  { degree: 125, questionType: "geography", category: 22 },
  { degree: 175, questionType: "history", category: 23 },
  { degree: 225, questionType: "art", category: 25 },
  { degree: 280, questionType: "sports", category: 21 },
  { degree: 340, questionType: "random", category: 20 },
];

const backgroundType = () => {
  if (questionType === "science") {
    questionTypeContainer.style.backgroundColor = "#5CB85C";
  } else if (questionType === "movie") {
    questionTypeContainer.style.backgroundColor = "#B94AA2";
  } else if (questionType === "geography") {
    questionTypeContainer.style.backgroundColor = "#3B9AC7";
  } else if (questionType === "history") {
    questionTypeContainer.style.backgroundColor = "#F0AD4E";
  } else if (questionType === "art") {
    questionTypeContainer.style.backgroundColor = "#D9534F";
  } else if (questionType === "sports") {
    questionTypeContainer.style.backgroundColor = "#DF691A";
  } else if (questionType === "randomly") {
    questionTypeContainer.style.backgroundColor = `#684399`;
  }
};

const selectQuestionType = () => {
  randomNumber = Math.trunc(Math.random() * 7);
  spinWheelTextEl.textContent = "We're choosing a question for you...";
  spinnerWheelEl.classList.add("spinner-wheel-active");
  setTimeout(() => {
    spinnerWheelEl.classList.remove("spinner-wheel-active");
    spinnerWheelEl.classList.add("spinner-wheel-active-fast");
  }, 2000);
  setTimeout(() => {
    spinnerWheelEl.classList.remove("spinner-wheel-active-fast");
    spinnerWheelEl.style.transform = `rotate(${spinWheelDegrees[randomNumber].degree}deg)`;
    spinWheelTextEl.textContent = `You will be asked ${spinWheelDegrees[randomNumber].questionType} question.`;
    questionType = spinWheelDegrees[randomNumber].questionType;
  }, 3000);
  setTimeout(() => {
    spinWheelTextEl.textContent = "Get Ready...";
  }, 4000);
  setTimeout(() => {
    spinnerContainerEl.style.display = "none";
    questionContainer.style.display = "block";
    questionTextEl.style.display = "block";
    fetchHistoryQuestion(spinWheelDegrees[randomNumber].category);
  }, 5000);
};

const resetTheSettings = () => {
  questionContainer.style.display = "none";
  spinnerContainerEl.style.display = "block";
  spinWheelTextEl.textContent = "SPIN THE WHEEL TO CHOOSE QUESTION TYPE.";
  answerCheckerText.style.display = "none";
  buttonContainerEl.style.display = "block";
  nextQuestionButton.style.display = "none";
  userAnswerContainer.style.display = "none";
};

spinnerButtonEl.addEventListener("click", () => {
  selectQuestionType();
});

const fetchHistoryQuestion = (category) => {
  fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`
  ).then((response) =>
    response.json().then((data) => {
      console.log(data);
      randomQuestionNumber = Math.trunc(Math.random() * 10 + 1);
      console.log(randomQuestionNumber);
      questionTypeTextEl.textContent = questionType.toUpperCase();
      questionAnwsers = [
        data.results[randomQuestionNumber].correct_answer,
        data.results[randomQuestionNumber].incorrect_answers,
      ]
        .flat()
        .sort(() => Math.random() - 0.5);
      correctAnswer = data.results[randomQuestionNumber].correct_answer;
      firstOptionEl.textContent = questionAnwsers[0];
      secondOptionEl.textContent = questionAnwsers[1];
      thirdOptionEl.textContent = questionAnwsers[2];
      fourthOptionEl.textContent = questionAnwsers[3];
      questionTextEl.innerHTML = data.results[randomQuestionNumber].question;
      console.log(data.results[randomQuestionNumber].question);
      backgroundType();
    })
  );
};

const correctAnswerChecker = (target) => {
  if (target === correctAnswer) {
    console.log("correct");
    questionTextEl.style.display = "none";
    answerCheckerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    questionLeftCounter = questionLeftCounter - 1;
    questionLeftEl.textContent = questionLeftCounter;
    userCorrectAnswerCounter = userCorrectAnswerCounter + 1;
    userCorrectAnswerEl.textContent = userCorrectAnswerCounter;
    setTimeout(() => {
      answerCheckerText.style.display = "none";
      userAnswerContainer.style.display = "block";
      buttonContainerEl.style.display = "none";
      questionTypeTextEl.textContent = "RESULTS";
    }, 2000);
  } else {
    console.log("incorrect");
    questionTextEl.style.display = "none";
    answerCheckerText.textContent = "WRONG";
    answerCheckerText.style.color = "#ff0000";
    answerCheckerText.style.display = "block";
    nextQuestionButton.style.display = "block";
    questionLeftCounter = questionLeftCounter - 1;
    questionLeftEl.textContent = questionLeftCounter;
    userWrongAnswerCounter = userWrongAnswerCounter + 1;
    userWrongAnswerEl.textContent = userWrongAnswerCounter;
    setTimeout(() => {
      answerCheckerText.style.display = "none";
      userAnswerContainer.style.display = "block";
      buttonContainerEl.style.display = "none";
      questionTypeTextEl.textContent = "RESULTS";
    }, 2000);
  }
};

firstOptionEl.addEventListener("click", () => {
  correctAnswerChecker(firstOptionEl.innerHTML);
});
secondOptionEl.addEventListener("click", () => {
  correctAnswerChecker(secondOptionEl.innerHTML);
});
thirdOptionEl.addEventListener("click", () => {
  correctAnswerChecker(thirdOptionEl.innerHTML);
});
fourthOptionEl.addEventListener("click", () => {
  correctAnswerChecker(fourthOptionEl.innerHTML);
});

nextQuestionButton.addEventListener("click", () => {
  resetTheSettings();
});
