describe("Unit Test script.js", () => {
  beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
  });

  test("menampilkan pesan error jika nama kosong", () => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="nama" value="" />
        <textarea id="pesan">Halo admin</textarea>
        <button type="submit">Kirim</button>
      </form>
      <p id="form-status"></p>
    `;

    require("../script.js");

    const form = document.getElementById("contact-form");
    const statusText = document.getElementById("form-status");

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(statusText.textContent).toBe("Nama dan pesan wajib diisi.");
  });

  test("menampilkan pesan error jika pesan kosong", () => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="nama" value="Raysar" />
        <textarea id="pesan"></textarea>
        <button type="submit">Kirim</button>
      </form>
      <p id="form-status"></p>
    `;

    require("../script.js");

    const form = document.getElementById("contact-form");
    const statusText = document.getElementById("form-status");

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(statusText.textContent).toBe("Nama dan pesan wajib diisi.");
  });

  test("menampilkan pesan sukses jika nama dan pesan diisi", () => {
    document.body.innerHTML = `
      <form id="contact-form">
        <input id="nama" value="Raysar" />
        <textarea id="pesan">Saya ingin bertanya</textarea>
        <button type="submit">Kirim</button>
      </form>
      <p id="form-status"></p>
    `;

    const form = document.getElementById("contact-form");

    // Spy: test double untuk memantau apakah form.reset() dipanggil
    const resetSpy = jest.spyOn(form, "reset");

    require("../script.js");

    const statusText = document.getElementById("form-status");

    form.dispatchEvent(
      new Event("submit", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(statusText.textContent).toBe(
      "Terima kasih, Raysar. Pesanmu sudah tercatat (simulasi)."
    );

    expect(resetSpy).toHaveBeenCalledTimes(1);
  });

  test("memanggil scrollIntoView saat link section diklik", () => {
    document.body.innerHTML = `
      <a href="#tentang" id="link-tentang">Tentang</a>
      <section id="tentang"></section>
    `;

    const target = document.getElementById("tentang");

    // Mock: menggantikan fungsi scrollIntoView asli dengan fungsi tiruan
    target.scrollIntoView = jest.fn();

    require("../script.js");

    const link = document.getElementById("link-tentang");

    link.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });
});