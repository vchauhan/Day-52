// Assessment page controller.
// Today (foundation day): verifies the page loads and the Next button responds.
// Real question rendering + scoring wiring happens on feature-build day.

document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.getElementById("next-btn");
  const questionText = document.getElementById("question-text");

  nextBtn.addEventListener("click", () => {
    questionText.textContent = "Navigation works ✔ (real questions coming soon)";
  });
});
