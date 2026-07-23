// Dashboard page controller.
// Today (foundation day): verifies the passcode UI responds.
// Real API call to Apps Script (getLeads) is wired once CONFIG.API_URL exists (Day 4/6).

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("passcode-submit");
  const gate = document.getElementById("passcode-gate");
  const leadsContainer = document.getElementById("leads-container");

  submitBtn.addEventListener("click", () => {
    if (!CONFIG.API_URL) {
      alert("Data connection not set up yet — coming on Day 4.");
      return;
    }
    // fetchLeads() will be implemented once the API exists.
  });
});
