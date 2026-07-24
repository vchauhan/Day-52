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
      result = calculateScore(answers);
      showPreview();
    }
  }

  function showPreview() {
    progressLabel.textContent = "Assessment complete";
    container.innerHTML = `
      <h2>${result.score} / 100 — ${result.category}</h2>
      <p><strong>Top reasons:</strong></p>
      <ul>${result.topReasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      <p>Enter your details to unlock your recommended next step:</p>
      <input type="text" id="lead-name" placeholder="Name" />
      <input type="email" id="lead-email" placeholder="Email" />
      <button id="unlock-btn">Unlock Full Report</button>
      <p id="save-status" class="muted"></p>
    `;
    document.getElementById("unlock-btn").addEventListener("click", handleUnlock);
  }

  async function handleUnlock() {
    const name = document.getElementById("lead-name").value.trim();
    const email = document.getElementById("lead-email").value.trim();
    const statusEl = document.getElementById("save-status");
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

    statusEl.textContent = "Saving...";
    showFullReport(); // reveal immediately per Architecture doc — don't block UI on save

    try {
      const res = await fetch(CONFIG.API_URL, {
        method: "POST",
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const savedStatusEl = document.getElementById("save-status");
      if (data.status === "ok") {
        if (savedStatusEl) savedStatusEl.textContent = "✓ Saved";
      } else {
        if (savedStatusEl) savedStatusEl.textContent = "⚠ Could not save (" + data.message + ") — retry below";
        addRetryButton(payload);
      }
    } catch (err) {
      const savedStatusEl = document.getElementById("save-status");
      if (savedStatusEl) savedStatusEl.textContent = "⚠ Could not save — retry below";
      addRetryButton(payload);
    }
  }

  function addRetryButton(payload) {
    const statusEl = document.getElementById("save-status");
    if (!statusEl) return;
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Retry saving";
    retryBtn.style.marginLeft = "0.5rem";
    retryBtn.addEventListener("click", async () => {
      statusEl.textContent = "Saving...";
      try {
        const res = await fetch(CONFIG.API_URL, { method: "POST", body: JSON.stringify(payload) });
        const data = await res.json();
        statusEl.textContent = data.status === "ok" ? "✓ Saved" : "⚠ Could not save (" + data.message + ")";
      } catch (err) {
        statusEl.textContent = "⚠ Still failing — check your connection";
      }
    });
    statusEl.appendChild(retryBtn);
  }

  function showFullReport() {
    container.innerHTML = `
      <h2>${result.score} / 100 — ${result.category}</h2>
      <p><strong>Top reasons:</strong></p>
      <ul>${result.topReasons.map((r) => `<li>${r}</li>`).join("")}</ul>
      <p><strong>Recommended next step:</strong> ${result.nextStep}</p>
      <p id="save-status" class="muted">Saving...</p>
    `;
  }

  renderQuestion();
});
