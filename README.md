# TUGAS DPL

Repository ini berisi project sederhana berbasis HTML, CSS, dan JavaScript yang digunakan untuk pengerjaan tugas mata kuliah DPL.

## Struktur Project

```txt
TUGAS_DPL/
├── index.html
├── style.css
├── script.js
├── tests/
│   └── script.test.js
├── package.json
└── README.md
```

---

## Tugas DPL 9 - Analisis Pelanggaran SOLID

Pada tugas DPL 9, dilakukan analisis terhadap kode `script.js` untuk menemukan pelanggaran prinsip SOLID.

### Kode yang Dianalisis

Kode yang dianalisis terdapat pada file:

```txt
script.js
```

Pada kode awal, beberapa tanggung jawab masih digabung dalam satu file, yaitu:

* Mengatur smooth scroll.
* Mengatur validasi form kontak.
* Menampilkan pesan status.
* Melakukan reset form.

### Prinsip SOLID yang Diperbaiki

#### 1. Single Responsibility Principle / SRP

Kode awal kurang sesuai dengan SRP karena beberapa logika dicampur langsung di dalam event listener.

Perbaikan yang dilakukan:

* Menambahkan class `SmoothScroller` untuk menangani proses scroll.
* Menambahkan class `ContactFormValidator` untuk menangani validasi form.

Dengan perubahan ini, setiap bagian kode memiliki tanggung jawab yang lebih jelas.

#### 2. Dependency Inversion Principle / DIP

Kode awal masih bergantung langsung pada detail implementasi seperti `scrollIntoView()` dan validasi langsung di dalam event submit.

Perbaikan yang dilakukan:

* Proses scroll dipindahkan ke class `SmoothScroller`.
* Proses validasi dipindahkan ke class `ContactFormValidator`.

Dengan begitu, kode utama menjadi lebih rapi dan lebih mudah dikembangkan.

---

## Tugas DPL 11 - Unit Testing

Pada tugas DPL 11, ditambahkan unit testing untuk menguji fitur pada `script.js`.

### File yang Ditambahkan

```txt
package.json
tests/script.test.js
```

### Fitur yang Diuji

Unit test dibuat untuk menguji:

* Pesan error muncul jika nama kosong.
* Pesan error muncul jika pesan kosong.
* Pesan sukses muncul jika nama dan pesan diisi.
* Form melakukan reset setelah submit berhasil.
* Smooth scroll berjalan ketika link section diklik.

### Test Double yang Digunakan

Test double yang digunakan adalah:

* `spy` pada `form.reset()`
* `mock` pada `scrollIntoView()`

Spy digunakan untuk memastikan fungsi `form.reset()` dipanggil setelah form berhasil dikirim.

Mock digunakan untuk menggantikan fungsi `scrollIntoView()` agar dapat diuji tanpa melakukan scroll sungguhan di browser.

---

## Cara Menjalankan Unit Test

Install dependency terlebih dahulu:

```bash
npm install
```

Jalankan unit test:

```bash
npm test
```

Jika berhasil, maka akan muncul hasil seperti:

```txt
PASS tests/script.test.js
```
<img width="1600" height="805" alt="image" src="https://github.com/user-attachments/assets/122db316-d87a-4e32-9d7d-01727008efa3" />

---

## Kesimpulan

Pada project ini dilakukan dua pengerjaan utama:

1. Refactor kode pada `script.js` agar lebih sesuai dengan prinsip SOLID.
2. Penambahan unit test menggunakan Jest untuk menguji fitur form kontak dan smooth scroll.

Perubahan ini membuat kode lebih rapi, lebih mudah dibaca, dan lebih mudah diuji.
