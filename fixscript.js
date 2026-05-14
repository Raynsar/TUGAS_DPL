// Mengambil elemen form dari halaman
const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

// Mengambil data dari input form
function getFormData() {
  return {
    nama: document.getElementById("nama").value.trim(),
    pesan: document.getElementById("pesan").value.trim(),
  };
}

// Mengecek apakah data form sudah valid
function validateForm(data) {
  if (!data.nama || !data.pesan) {
    return {
      isValid: false,
      message: "Nama dan pesan wajib diisi.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
}

// Menampilkan pesan status ke pengguna
function showStatus(message) {
  statusText.textContent = message;
}

// Menangani proses submit form
function handleFormSubmit(e) {
  e.preventDefault();

  const data = getFormData();
  const validation = validateForm(data);

  if (!validation.isValid) {
    showStatus(validation.message);
    return;
  }

  showStatus(`Terima kasih, ${data.nama}. Pesanmu sudah tercatat (simulasi).`);
  form.reset();
}

// Menjalankan event listener jika form tersedia
if (form && statusText) {
  form.addEventListener("submit", handleFormSubmit);
}
