// GCC Fit Assessor — Assessment page controller
// Renders questions from QUESTIONS, tracks answers, computes score on submit.

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("question-container");
  const progressLabel = document.getElementById("progress-label");

  let currentIndex = 0;
  const answers = {};

  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    progressLabel.textContent = `Question ${currentIndex + 1} of ${QUESTIONS.length}`;

    const optionsHtml = q.options
      .map(
        (opt, i) => `
        <label style="display:block; margin-bottom:0.5rem; cursor:pointer;">
          <input type="radio" name="answer" value="${i}" ${answers[q.id] === i ? "checked" : ""} />
          ${opt.label}
        </label>`
      )
      .join("");

    container.innerHTML = `
      <p id="question-text">${q.text}</p>
      <div id="options">${optionsHtml}</div>
      <button id="next-btn">${currentIndex === QUESTIONS.length - 1 ? "See My Score →" : "Next →"}</button>
    `;

    document.getElementById("next-btn").addEventListener("click", handleNext);
  }

  function handleNext() {
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
      alert("Please select an answer before continuing.");
      return;
    }
    answers[QUESTIONS[currentIndex].id] = parseInt(selected.value, 10);

    if (currentIndex < QUESTIONS.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    const result = calculateScore(answers);
    console.log("Assessment result:", result);

    container.innerHTML = `
      <h2>${result.score} / 100 — ${result.category}</h2>
      <p><strong>Top reasons:</strong></p>
      <ul>${result.topReasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      <p><strong>Recommended next step:</strong> ${result.nextStep}</p>
      <p class="muted">(Lead capture + saving comes in the next milestone — Day 4)</p>
    `;
    progressLabel.textContent = "Assessment complete";
  }

  renderQuestion();
});
