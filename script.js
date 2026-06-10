class SmoothScroller {
  scrollTo(target) {
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
class ContactFormValidator {
  validate(nama, pesan) {
    if (!nama || !pesan) {
      return {
        valid: false,
        message: "Nama dan pesan wajib diisi.",
      };
    }

    return {
      valid: true,
      message: `Terima kasih, ${nama}. Pesanmu sudah tercatat (simulasi).`,
    };
  }
}
// Smooth scroll untuk semua link yang menuju section (#...)
const scroller = new SmoothScroller();

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const href = link.getAttribute("href");
    if (!href || href === "#") return;

          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            scroller.scrollTo(target);
        }
  });
});

// Form kontak (simulasi)
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");
const validator = new ContactFormValidator();

if (form && statusText) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

      const nama = document.getElementById("nama").value.trim();
      const pesan = document.getElementById("pesan").value.trim();
      
      const result = validator.validate(nama, pesan);
      statusText.textContent = result.message;
      
      if (!result.valid) {
        return;
      }
      
      form.reset();
  });
}
