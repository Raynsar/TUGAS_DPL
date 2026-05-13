// Smooth scroll untuk semua link yang menuju section (#...)
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Form kontak (simulasi)
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

if (form && statusText) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (!nama || !pesan) {
      statusText.textContent = "Nama dan pesan wajib diisi.";
      return;
    }

    statusText.textContent = `Terima kasih, ${nama}. Pesanmu sudah tercatat (simulasi).`;
    form.reset();
  });
}