
let questions = [];
let current = 0;

fetch('intrebari.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestion();
  });

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.question;
  const ul = document.getElementById("options");
  ul.innerHTML = "";
  document.getElementById("next").disabled = true;

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.textContent = opt;
    li.onclick = () => handleAnswer(li, i, q.correct);
    ul.appendChild(li);
  });
}

function handleAnswer(selected, index, correctIndex) {
  const options = document.querySelectorAll("#options li");
  options.forEach((li, i) => {
    li.onclick = null;
    if (i === correctIndex) li.classList.add("correct");
    if (i === index && i !== correctIndex) li.classList.add("wrong");
  });
  document.getElementById("next").disabled = false;
}

document.getElementById("next").onclick = () => {
  if (++current < questions.length) {
    showQuestion();
  } else {
    document.querySelector(".container").innerHTML = "<h2>Ai terminat chestionarul!</h2>";
  }
};
