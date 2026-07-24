// GCC Fit Assessor — Dashboard page controller
// Passcode-gated fetch of leads from the Apps Script backend.

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("passcode-submit");
  const passcodeInput = document.getElementById("passcode-input");
  const gate = document.getElementById("passcode-gate");
  const leadsContainer = document.getElementById("leads-container");

  submitBtn.addEventListener("click", async () => {
    const passcode = passcodeInput.value.trim();
    if (!passcode) {
      alert("Please enter the passcode.");
      return;
    }
    if (!CONFIG.API_URL) {
      alert("Data connection not set up yet.");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Loading...";

    try {
      const url = CONFIG.API_URL + "?action=getLeads&passcode=" + encodeURIComponent(passcode);
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "ok") {
        alert(data.message === "Unauthorized" ? "Incorrect passcode." : "Error: " + data.message);
        submitBtn.disabled = false;
        submitBtn.textContent = "Enter";
        return;
      }

      gate.style.display = "none";
      leadsContainer.style.display = "block";
      renderLeads(data.leads);
    } catch (err) {
      alert("Could not reach the server. Check your connection and try again.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Enter";
    }
  });

  function renderLeads(leads) {
    if (!leads || leads.length === 0) {
      leadsContainer.innerHTML = `<p class="muted">No leads yet.</p>`;
      return;
    }

    const sorted = leads.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const rowsHtml = sorted
      .map(
        (lead, i) => `
        <tr class="lead-row" data-index="${i}" style="cursor:pointer; border-bottom:1px solid #334155;">
          <td style="padding:0.5rem;">${escapeHtml(lead.name)}</td>
          <td style="padding:0.5rem;">${escapeHtml(lead.email)}</td>
          <td style="padding:0.5rem;">${lead.score}</td>
          <td style="padding:0.5rem;">${escapeHtml(lead.category)}</td>
          <td style="padding:0.5rem;">${new Date(lead.timestamp).toLocaleDateString()}</td>
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
      <p>Leads (${leads.length})</p>
      <table style="width:100%; border-collapse:collapse;">
        <thead>
          <tr style="text-align:left; border-bottom:2px solid #334155;">
            <th style="padding:0.5rem;">Name</th>
            <th style="padding:0.5rem;">Email</th>
            <th style="padding:0.5rem;">Score</th>
            <th style="padding:0.5rem;">Category</th>
            <th style="padding:0.5rem;">When</th>
          </tr>
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
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
});
