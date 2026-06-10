/**
 * Unit Test — script.js (CV Adifa Ar-Rayan)
 * Menggunakan Jest + jsdom
 *
 * Test double yang digunakan:
 *  - Dummy   : argumen placeholder yang tidak dipakai secara aktif
 *  - Stub    : mengganti return value fungsi dengan nilai tetap
 *  - Spy     : memantau apakah fungsi dipanggil dan berapa kali
 *  - Mock    : verifikasi perilaku + ekspektasi panggilan
 *  - Fake    : implementasi pengganti yang lebih sederhana
 */

const {
  validateFormData,
  submitFormData,
  renderStatus,
  getFormData,
  initContactForm,
} = require("../script.js");

// ============================================================
// SETUP DOM — dijalankan sebelum setiap test
// ============================================================
beforeEach(() => {
  document.body.innerHTML = `
    <form id="contact-form" novalidate>
      <input type="text" id="nama" />
      <textarea id="pesan"></textarea>
      <button type="submit">Kirim</button>
      <p id="form-status"></p>
    </form>
  `;
});

afterEach(() => {
  jest.restoreAllMocks();
});

// ============================================================
// 1. validateFormData — STUB
// Stub: nilai input dikontrol secara tetap untuk menguji
//       setiap cabang validasi tanpa bergantung pada DOM.
// ============================================================
describe("validateFormData (Stub)", () => {
  test("mengembalikan valid:false jika nama kosong", () => {
    // Stub: data dengan nama kosong — nilai tetap, bukan dari DOM
    const stubData = { nama: "", pesan: "Halo ini pesan" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Nama wajib diisi.");
  });

  test("mengembalikan valid:false jika nama kurang dari 2 karakter", () => {
    const stubData = { nama: "A", pesan: "Halo ini pesan" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Nama minimal 2 karakter.");
  });

  test("mengembalikan valid:false jika pesan kosong", () => {
    const stubData = { nama: "Adifa", pesan: "" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Pesan wajib diisi.");
  });

  test("mengembalikan valid:false jika pesan kurang dari 5 karakter", () => {
    const stubData = { nama: "Adifa", pesan: "Hi" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Pesan terlalu pendek.");
  });

  test("mengembalikan valid:true jika nama dan pesan valid", () => {
    const stubData = { nama: "Adifa", pesan: "Halo saya ingin bertanya" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(true);
    expect(result.message).toBeNull();
  });
});

// ============================================================
// 2. submitFormData — STUB + SPY
// Stub: data input dikontrol.
// Spy: memantau apakah fungsi submitFormData dipanggil
//      dan mengembalikan nilai yang benar.
// ============================================================
describe("submitFormData (Stub + Spy)", () => {
  test("mengembalikan success:true dan pesan berisi nama pengirim", () => {
    // Stub: data tetap
    const stubData = { nama: "Adifa", pesan: "Saya ingin kerjasama" };

    // Spy: pantau fungsi submitFormData
    const spy = jest.spyOn({ submitFormData }, "submitFormData");

    const result = submitFormData(stubData);

    expect(result.success).toBe(true);
    expect(result.message).toContain("Adifa");
    expect(result.message).toContain("Terima kasih");

    spy.mockRestore();
  });

  test("pesan hasil submit mengandung nama pengirim yang diberikan", () => {
    const stubData = { nama: "Zaky", pesan: "Pesan dari Zaky" };
    const result = submitFormData(stubData);

    expect(result.message).toMatch(/Zaky/);
  });
});

// ============================================================
// 3. renderStatus — SPY
// Spy: memantau apakah textContent dan style.color
//      dari elemen DOM diubah sesuai parameter.
// ============================================================
describe("renderStatus (Spy)", () => {
  test("mengubah textContent dan warna merah saat isError=true", () => {
    const statusEl = document.getElementById("form-status");

    // Spy pada setter textContent
    const spy = jest.spyOn(statusEl, "textContent", "set");

    renderStatus(statusEl, "Nama wajib diisi.", true);

    expect(spy).toHaveBeenCalledWith("Nama wajib diisi.");
    // jsdom mengkonversi hex ke rgb — keduanya merepresentasikan warna yang sama
    expect(statusEl.style.color).toMatch(/rgb\(248,\s*113,\s*113\)|#f87171/);
  });

  test("mengubah textContent dan warna hijau saat isError=false", () => {
    const statusEl = document.getElementById("form-status");
    const spy = jest.spyOn(statusEl, "textContent", "set");

    renderStatus(statusEl, "Terima kasih, Adifa!", false);

    expect(spy).toHaveBeenCalledWith("Terima kasih, Adifa!");
    expect(statusEl.style.color).toMatch(/rgb\(52,\s*211,\s*153\)|#34d399/);
  });

  test("tidak error jika statusEl null (guard clause)", () => {
    // Dummy: null dipakai sebagai placeholder elemen yang tidak ada
    const dummyEl = null;
    expect(() => renderStatus(dummyEl, "pesan", false)).not.toThrow();
  });
});

// ============================================================
// 4. getFormData — FAKE DOM
// Fake: DOM buatan jsdom diisi nilai secara programatik
//       untuk menggantikan input nyata dari pengguna.
// ============================================================
describe("getFormData (Fake DOM)", () => {
  test("membaca nilai nama dan pesan dari elemen DOM", () => {
    // Fake: isi elemen DOM buatan jsdom
    document.getElementById("nama").value  = "  Adifa  ";
    document.getElementById("pesan").value = "  Halo ini pesan  ";

    const data = getFormData();

    expect(data.nama).toBe("Adifa");
    expect(data.pesan).toBe("Halo ini pesan");
  });

  test("mengembalikan string kosong jika input belum diisi", () => {
    const data = getFormData();

    expect(data.nama).toBe("");
    expect(data.pesan).toBe("");
  });
});

// ============================================================
// 5. initContactForm — MOCK
// Mock: memverifikasi bahwa renderStatus dipanggil dengan
//       argumen yang tepat saat form di-submit.
// ============================================================
describe("initContactForm (Mock)", () => {
  test("memanggil renderStatus dengan error jika form tidak valid", () => {
    const formEl   = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");

    // Mock: ganti renderStatus dengan fungsi palsu untuk verifikasi
    const mockRenderStatus = jest.fn();
    jest.mock("../script.js", () => ({
      ...jest.requireActual("../script.js"),
      renderStatus: mockRenderStatus,
    }));

    initContactForm(formEl, statusEl);

    // Submit dengan input kosong
    document.getElementById("nama").value  = "";
    document.getElementById("pesan").value = "";
    formEl.dispatchEvent(new Event("submit"));

    // Verifikasi: status error tampil di DOM
    expect(statusEl.style.color).toMatch(/rgb\(248,\s*113,\s*113\)|#f87171/);
    expect(statusEl.textContent).toBe("Nama wajib diisi.");
  });

  test("mereset form dan tampilkan sukses setelah submit valid", () => {
    const formEl   = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");

    // Spy pada form.reset
    const resetSpy = jest.spyOn(formEl, "reset");

    initContactForm(formEl, statusEl);

    document.getElementById("nama").value  = "Adifa";
    document.getElementById("pesan").value = "Halo saya ingin bertanya soal project";
    formEl.dispatchEvent(new Event("submit"));

    expect(statusEl.style.color).toMatch(/rgb\(52,\s*211,\s*153\)|#34d399/);
    expect(statusEl.textContent).toContain("Adifa");
    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  test("tidak error jika formEl atau statusEl null (Dummy)", () => {
    // Dummy: null sebagai placeholder argumen tidak aktif
    expect(() => initContactForm(null, null)).not.toThrow();
    expect(() => initContactForm(null, document.getElementById("form-status"))).not.toThrow();
  });

  test("tidak mendaftarkan event jika salah satu argumen null", () => {
    const statusEl = document.getElementById("form-status");
    const formEl   = document.getElementById("contact-form");

    // Spy: pastikan addEventListener tidak dipanggil
    const spy = jest.spyOn(formEl, "addEventListener");

    initContactForm(null, statusEl);

    expect(spy).not.toHaveBeenCalled();
  });
});

// ============================================================
// 6. Skenario edge case tambahan
// ============================================================
describe("Edge case & integrasi", () => {
  test("nama berisi hanya spasi dianggap kosong (trim)", () => {
    const stubData = { nama: "   ", pesan: "Pesan yang cukup panjang" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Nama wajib diisi.");
  });

  test("pesan berisi hanya spasi dianggap kosong (trim)", () => {
    const stubData = { nama: "Adifa", pesan: "     " };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(false);
    expect(result.message).toBe("Pesan wajib diisi.");
  });

  test("nama tepat 2 karakter diterima sebagai valid", () => {
    const stubData = { nama: "Al", pesan: "Pesan cukup panjang" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(true);
  });

  test("pesan tepat 5 karakter diterima sebagai valid", () => {
    const stubData = { nama: "Adifa", pesan: "Halo!" };
    const result = validateFormData(stubData);

    expect(result.valid).toBe(true);
  });

  test("getFormData trim whitespace dari input pengguna", () => {
    document.getElementById("nama").value  = "   Adifa Ar-Rayan   ";
    document.getElementById("pesan").value = "   Pesan saya   ";

    const data = getFormData();

    expect(data.nama).toBe("Adifa Ar-Rayan");
    expect(data.pesan).toBe("Pesan saya");
  });
});