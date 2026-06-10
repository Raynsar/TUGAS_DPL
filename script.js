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

function getFormData() {
  return {
    nama:  document.getElementById("nama")?.value.trim()  ?? "",
    pesan: document.getElementById("pesan")?.value.trim() ?? "",
  };
}

function validateFormData({ nama, pesan }) {
  if (!nama)          return { valid: false, message: "Nama wajib diisi." };
  if (nama.length < 2) return { valid: false, message: "Nama minimal 2 karakter." };
  if (!pesan)         return { valid: false, message: "Pesan wajib diisi." };
  if (pesan.length < 5) return { valid: false, message: "Pesan terlalu pendek." };
  return { valid: true, message: null };
}

function submitFormData({ nama }) {
  
  return {
    success: true,
    message: `Terima kasih, ${nama}. Pesanmu sudah tercatat!`,
  };
}

function renderStatus(statusEl, message, isError = false) {
  if (!statusEl) return;
  statusEl.textContent  = message;
  statusEl.style.color  = isError ? "#f87171" : "#34d399";
}

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