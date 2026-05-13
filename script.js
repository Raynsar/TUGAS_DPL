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
// DIP fix: logika high-level tidak langsung pegang getElementById.
// Jika struktur HTML berubah, cukup ubah di sini saja.
function getFormData() {
  return {
    nama:  document.getElementById("nama")?.value.trim()  ?? "",
    pesan: document.getElementById("pesan")?.value.trim() ?? "",
  };
}

// ─── 2. VALIDATOR ───────────────────────────────────────────
// SRP fix: fungsi ini HANYA tahu tentang aturan validasi.
// OCP fix: tambah aturan baru = tambah blok if di sini,
//          tanpa menyentuh handler atau renderer sama sekali.
function validateFormData({ nama, pesan }) {
  if (!nama)          return { valid: false, message: "Nama wajib diisi." };
  if (nama.length < 2) return { valid: false, message: "Nama minimal 2 karakter." };
  if (!pesan)         return { valid: false, message: "Pesan wajib diisi." };
  if (pesan.length < 5) return { valid: false, message: "Pesan terlalu pendek." };
  return { valid: true, message: null };
}

// ─── 3. SUBMISSION HANDLER ──────────────────────────────────
// SRP fix: HANYA mengurus logika "apa yang terjadi setelah valid".
// OCP fix: swap simulasi → fetch API tanpa ubah fungsi lain.
function submitFormData({ nama }) {
  // Simulasi pengiriman — ganti blok ini dengan fetch() jika sudah ada backend
  return {
    success: true,
    message: `Terima kasih, ${nama}. Pesanmu sudah tercatat!`,
  };
}

// ─── 4. UI RENDERER ─────────────────────────────────────────
// SRP fix: HANYA mengurus update tampilan status ke DOM.
// Tidak tahu soal validasi maupun logika submit.
function renderStatus(statusEl, message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent  = message;
  statusEl.style.color  = isError ? "#f87171" : "#34d399";
}

// ─── 5. CONTROLLER / ORCHESTRATOR ───────────────────────────
// Merangkai semua modul. Tidak mengerjakan logika sendiri,
// hanya mendelegasikan ke fungsi yang tepat.
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