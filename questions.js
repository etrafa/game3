const fetchQuestions = () => {
  fetch("https://opentdb.com/api.php?amount=49&category=23&type=multiple").then(
    (response) => response.json().then((data) => console.log(data))
  );
};

fetchQuestions();
