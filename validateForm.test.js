const { validateForm } = require("./utils");

test("valid jika nama dan pesan terisi", () => {
  expect(validateForm("Arva", "Halo")).toBeTruthy();
});

test("invalid jika nama kosong", () => {
  expect(validateForm("", "Halo")).toBeFalsy();
});

test("invalid jika pesan kosong", () => {
  expect(validateForm("Arva", "")).toBeFalsy();
});

test("invalid jika keduanya kosong", () => {
  expect(validateForm("", "")).toBeFalsy();
});