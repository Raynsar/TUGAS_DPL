document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============================================================
// CONTACT FORM — REFACTORED (SOLID)
// ============================================================

// ─── 1. DATA ACCESSOR ───────────────────────────────────────
function getFormData() {
  return {
    nama:  document.getElementById("nama")?.value.trim()  ?? "",
    pesan: document.getElementById("pesan")?.value.trim() ?? "",
  };
}

// ─── 2. VALIDATOR ───────────────────────────────────────────
function validateFormData({ nama, pesan }) {
  const n = (nama  ?? "").trim();
  const p = (pesan ?? "").trim();
  if (!n)           return { valid: false, message: "Nama wajib diisi." };
  if (n.length < 2) return { valid: false, message: "Nama minimal 2 karakter." };
  if (!p)           return { valid: false, message: "Pesan wajib diisi." };
  if (p.length < 5) return { valid: false, message: "Pesan terlalu pendek." };
  return { valid: true, message: null };
}

// ─── 3. SUBMISSION HANDLER ──────────────────────────────────
function submitFormData({ nama }) {
  return {
    success: true,
    message: `Terima kasih, ${nama}. Pesanmu sudah tercatat!`,
  };
}

// ─── 4. UI RENDERER ─────────────────────────────────────────
function renderStatus(statusEl, message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent = message;
  statusEl.style.color = isError ? "#f87171" : "#34d399";
}

// ─── 5. CONTROLLER / ORCHESTRATOR ───────────────────────────
function initContactForm(formEl, statusEl) {
  if (!formEl || !statusEl) return;

  formEl.addEventListener("submit", (e) => {
    e.preventDefault();

    const data       = getFormData();
    const validation = validateFormData(data);

    if (!validation.valid) {
      renderStatus(statusEl, validation.message, true);
      return;
    }

    const result = submitFormData(data);
    renderStatus(statusEl, result.message, false);
    formEl.reset();
  });
}

// ─── MOUNT ──────────────────────────────────────────────────
const form       = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");
initContactForm(form, statusText);

// ─── EXPORTS (untuk unit testing) ───────────────────────────
if (typeof module !== "undefined") {
  module.exports = {
    getFormData,
    validateFormData,
    submitFormData,
    renderStatus,
    initContactForm,
  };
}