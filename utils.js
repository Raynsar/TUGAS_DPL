function validateForm(nama, pesan) {
  return nama && pesan;
}

function smoothScroll(target) {
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

module.exports = {
  validateForm,
  smoothScroll,
};