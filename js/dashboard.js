// GCC Fit Assessor — Dashboard page controller
document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("passcode-submit");
  const passcodeInput = document.getElementById("passcode-input");
  const gate = document.getElementById("passcode-gate");
  const leadsContainer = document.getElementById("leads-container");

  let savedPasscode = "";
  let requestInFlight = false;

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : String(str);
    return div.innerHTML;
  }

  function fetchWithTimeout(url, timeoutMs) {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeoutMs))
    ]);
  }

  submitBtn.addEventListener("click", () => {
    if (requestInFlight) return;
    attemptLoad(passcodeInput.value.trim(), submitBtn, "Enter");
  });
  passcodeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !requestInFlight) attemptLoad(passcodeInput.value.trim(), submitBtn, "Enter");
  });

  async function attemptLoad(passcode, btn, originalLabel) {
    if (!passcode) {
      alert("Please enter the passcode.");
      return;
    }
    if (!CONFIG.API_URL) {
      alert("Data connection not set up yet.");
      return;
    }

    requestInFlight = true;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Loading...`;

    try {
      const url = CONFIG.API_URL + "?action=getLeads&passcode=" + encodeURIComponent(passcode);
      const res = await fetchWithTimeout(url, 10000);
      const data = await res.json();

      if (data.status !== "ok") {
        alert(data.message === "Unauthorized" ? "Incorrect passcode." : "Error: " + data.message);
        btn.disabled = false;
        btn.textContent = originalLabel;
        requestInFlight = false;
        return;
      }

      savedPasscode = passcode;
      gate.style.display = "none";
      leadsContainer.style.display = "block";
      renderLeads(data.leads);
      requestInFlight = false;
    } catch (err) {
      const timedOut = err && err.message === "timeout";
      leadsContainer.style.display = "block";
      leadsContainer.innerHTML = `<div class="error-state">⚠ ${timedOut ? "Request took too long." : "Could not reach the server."}<br/><button id="err-retry-btn" style="margin-top:0.75rem;">Try again</button></div>`;
      document.getElementById("err-retry-btn").addEventListener("click", () => {
        if (requestInFlight) return;
        attemptLoad(passcode, btn, originalLabel);
      });
      btn.disabled = false;
      btn.textContent = originalLabel;
      requestInFlight = false;
    }
  }

  function renderLeads(leads) {
    if (!leads || leads.length === 0) {
      leadsContainer.innerHTML = `
        <div class="empty-state">
          <p style="margin:0 0 0.75rem;">No leads yet — they'll show up here as visitors complete the assessment.</p>
          <button id="refresh-btn" style="margin:0; padding:0.4rem 0.9rem; font-size:0.85rem;">Refresh</button>
        </div>`;
      attachRefresh();
      return;
    }

    const sorted = leads.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const rowsHtml = sorted
      .map((lead, i) => `
        <tr class="lead-row" data-index="${i}" tabindex="0" role="button" aria-expanded="false">
          <td>${escapeHtml(lead.name)}</td>
          <td>${escapeHtml(lead.email)}</td>
          <td>${escapeHtml(lead.score)}</td>
          <td>${escapeHtml(lead.category)}</td>
          <td>${escapeHtml(new Date(lead.timestamp).toLocaleDateString())}</td>
        </tr>
        <tr class="lead-detail" data-index="${i}" style="display:none; background:var(--color-bg);">
          <td colspan="5" style="padding:0.85rem;">
            <strong>Top reasons:</strong>
            <ul>${(lead.topReasons || []).map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
            <strong>Next step:</strong> ${escapeHtml(lead.nextStep)}<br/>
            <strong>Answers:</strong> ${escapeHtml(JSON.stringify(lead.answers))}
          </td>
        </tr>`)
      .join("");

    leadsContainer.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <p style="margin:0;">Leads (${leads.length})</p>
        <button id="refresh-btn" style="margin:0; padding:0.4rem 0.9rem; font-size:0.85rem;">Refresh</button>
      </div>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Score</th><th>Category</th><th>When</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;

    function toggleRow(row) {
      const idx = row.getAttribute("data-index");
      const detail = document.querySelector(`.lead-detail[data-index="${idx}"]`);
      const isOpen = detail.style.display !== "none";
      detail.style.display = isOpen ? "none" : "table-row";
      row.setAttribute("aria-expanded", String(!isOpen));
    }

    document.querySelectorAll(".lead-row").forEach((row) => {
      row.addEventListener("click", () => toggleRow(row));
      row.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggleRow(row); }
      });
    });

    attachRefresh();
  }

  function attachRefresh() {
    const refreshBtn = document.getElementById("refresh-btn");
    if (!refreshBtn) return;
    refreshBtn.addEventListener("click", () => {
      if (requestInFlight) return;
      attemptLoad(savedPasscode, refreshBtn, "Refresh");
    });
  }
});
