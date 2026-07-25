// GCC Fit Assessor — Assessment page controller
// Renders questions, tracks answers, computes score, captures lead, saves to backend.

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("question-container");
  const progressLabel = document.getElementById("progress-label");

  let currentIndex = 0;
  const answers = {};
  let result = null;

  function generateLeadId() {
    return "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
  }

  function renderProgressBar(current, total) {
    const pct = Math.round((current / total) * 100);
    return `
      <div class="progress-wrap">
        <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
        <div class="progress-text">Question ${current} of ${total}</div>
      </div>
    `;
  }

  function renderQuestion() {
    const q = QUESTIONS[currentIndex];
    progressLabel.innerHTML = renderProgressBar(currentIndex + 1, QUESTIONS.length);

    const optionsHtml = q.options
      .map((opt, i) => {
        const isChecked = answers[q.id] === i;
        return `
        <label class="option-label${isChecked ? " selected" : ""}" data-index="${i}">
          <input type="radio" name="answer" value="${i}" ${isChecked ? "checked" : ""} />
          ${opt.label}
        </label>`;
      })
      .join("");

    container.innerHTML = `
      <p id="question-text" style="font-size:1.1rem; font-weight:600; margin-bottom:1rem;">${q.text}</p>
      <div id="options">${optionsHtml}</div>
      <button id="next-btn">${currentIndex === QUESTIONS.length - 1 ? "See My Score →" : "Next →"}</button>
    `;

    document.querySelectorAll(".option-label").forEach((label) => {
      label.addEventListener("click", () => {
        document.querySelectorAll(".option-label").forEach((l) => l.classList.remove("selected"));
        label.classList.add("selected");
      });
    });

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
      result = calculateScore(answers);
      showPreview();
    }
  }

  function categoryClass(category) {
    if (category === "Strong Fit") return "strong";
    if (category === "Moderate Fit") return "moderate";
    return "low";
  }

  function scoreHeroHtml() {
    return `
      <div class="score-hero">
        <div class="score-number">${result.score}<span style="font-size:1.4rem; color:var(--color-muted);">/100</span></div>
        <span class="score-category ${categoryClass(result.category)}">${result.category}</span>
      </div>
    `;
  }

  function showPreview() {
    progressLabel.textContent = "";
    container.innerHTML = `
      ${scoreHeroHtml()}
      <p style="font-weight:600; margin-bottom:0.5rem;">Top reasons</p>
      <ul class="reasons-list">${result.topReasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      <p style="margin-top:1.25rem;">Enter your details to unlock your recommended next step:</p>
      <input type="text" id="lead-name" placeholder="Your name" />
      <input type="email" id="lead-email" placeholder="Your email" />
      <button id="unlock-btn">Unlock Full Report →</button>
    `;
    document.getElementById("unlock-btn").addEventListener("click", handleUnlock);
  }

  async function handleUnlock() {
    const name = document.getElementById("lead-name").value.trim();
    const email = document.getElementById("lead-email").value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      alert("Please enter your name.");
      return;
    }
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const leadId = generateLeadId();
    const payload = {
      name: name,
      email: email,
      score: result.score,
      category: result.category,
      topReasons: result.topReasons,
      nextStep: result.nextStep,
      answers: answers,
      leadId: leadId
    };

    showFullReport(true); // show full report immediately, saving indicator spinning

    try {
      const res = await fetch(CONFIG.API_URL, { method: "POST", body: JSON.stringify(payload) });
      const data = await res.json();
      updateSaveStatus(data.status === "ok", data.message, payload);
    } catch (err) {
      updateSaveStatus(false, null, payload);
    }
  }

  function updateSaveStatus(success, message, payload) {
    const statusEl = document.getElementById("save-status");
    if (!statusEl) return;
    if (success) {
      statusEl.innerHTML = `✓ Saved`;
      statusEl.style.color = "var(--color-success)";
    } else {
      statusEl.innerHTML = `⚠ Could not save${message ? " (" + message + ")" : ""} <button id="retry-btn" style="margin-left:0.5rem; padding:0.35rem 0.8rem; font-size:0.85rem;">Retry</button>`;
      statusEl.style.color = "var(--color-warning)";
      document.getElementById("retry-btn").addEventListener("click", async () => {
        statusEl.innerHTML = `<span class="spinner"></span> Saving...`;
        statusEl.style.color = "var(--color-muted)";
        try {
          const res = await fetch(CONFIG.API_URL, { method: "POST", body: JSON.stringify(payload) });
          const data = await res.json();
          updateSaveStatus(data.status === "ok", data.message, payload);
        } catch (err) {
          updateSaveStatus(false, null, payload);
        }
      });
    }
  }

  function showFullReport(saving) {
    progressLabel.textContent = "";
    container.innerHTML = `
      ${scoreHeroHtml()}
      <p style="font-weight:600; margin-bottom:0.5rem;">Top reasons</p>
      <ul class="reasons-list">${result.topReasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      <div class="next-step-box">
        <strong>Recommended next step</strong><br/>
        ${result.nextStep}
      </div>
      <div class="status-line" id="save-status">
        ${saving ? `<span class="spinner"></span> Saving...` : ""}
      </div>
    `;
  }

  renderQuestion();
});
