// GCC Fit Assessor — Dashboard page controller
// Passcode-gated fetch of leads from the Apps Script backend.

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("passcode-submit");
  const passcodeInput = document.getElementById("passcode-input");
  const gate = document.getElementById("passcode-gate");
  const leadsContainer = document.getElementById("leads-container");

  let savedPasscode = "";

  submitBtn.addEventListener("click", () => attemptLoad(passcodeInput.value.trim(), submitBtn, "Enter"));

  async function attemptLoad(passcode, btn, originalLabel) {
    if (!passcode) {
      alert("Please enter the passcode.");
      return;
    }
    if (!CONFIG.API_URL) {
      alert("Data connection not set up yet.");
      return;
    }

    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Loading...`;

    try {
      const url = CONFIG.API_URL + "?action=getLeads&passcode=" + encodeURIComponent(passcode);
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "ok") {
        alert(data.message === "Unauthorized" ? "Incorrect passcode." : "Error: " + data.message);
        btn.disabled = false;
        btn.textContent = originalLabel;
        return;
      }

      savedPasscode = passcode;
      gate.style.display = "none";
      leadsContainer.style.display = "block";
      renderLeads(data.leads);
    } catch (err) {
      alert("Could not reach the server. Check your connection and try again.");
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  }

  function renderLeads(leads) {
    if (!leads || leads.length === 0) {
      leadsContainer.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <p class="muted" style="margin:0;">No leads yet.</p>
          <button id="refresh-btn" style="margin:0; padding:0.4rem 0.9rem; font-size:0.85rem;">Refresh</button>
        </div>`;
      attachRefresh();
      return;
    }

    const sorted = leads.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const rowsHtml = sorted
      .map(
        (lead, i) => `
        <tr class="lead-row" data-index="${i}">
          <td>${escapeHtml(lead.name)}</td>
          <td>${escapeHtml(lead.email)}</td>
          <td>${lead.score}</td>
          <td>${escapeHtml(lead.category)}</td>
          <td>${new Date(lead.timestamp).toLocaleDateString()}</td>
        </tr>
        <tr class="lead-detail" data-index="${i}" style="display:none; background:#0f172a;">
          <td colspan="5" style="padding:0.75rem;">
            <strong>Top reasons:</strong>
            <ul>${lead.topReasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
            <strong>Next step:</strong> ${escapeHtml(lead.nextStep)}<br/>
            <strong>Answers:</strong> ${escapeHtml(JSON.stringify(lead.answers))}
          </td>
        </tr>`
      )
      .join("");

    leadsContainer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <p style="margin:0;">Leads (${leads.length})</p>
        <button id="refresh-btn" style="margin:0; padding:0.4rem 0.9rem; font-size:0.85rem;">Refresh</button>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Score</th><th>Category</th><th>When</th></tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;

    document.querySelectorAll(".lead-row").forEach((row) => {
      row.addEventListener("click", () => {
        const idx = row.getAttribute("data-index");
        const detail = document.querySelector(`.lead-detail[data-index="${idx}"]`);
        detail.style.display = detail.style.display === "none" ? "table-row" : "none";
      });
    });

    attachRefresh();
  }

  function attachRefresh() {
    const refreshBtn = document.getElementById("refresh-btn");
    if (!refreshBtn) return;
    refreshBtn.addEventListener("click", () => attemptLoad(savedPasscode, refreshBtn, "Refresh"));
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});
