# Nyala Bersama — website donasi QRIS statis

Website Next.js untuk menampilkan program bantuan dan menerima donasi melalui gambar QRIS statis yang diberikan pengelola.

## Pembayaran QRIS statis
- Gambar QRIS tersimpan di `public/qris-donasi.jpg`.
- Donatur memilih program dan nominal, mengisi nama, lalu website menampilkan QRIS.
- QRIS ini terbaca sebagai merchant **FEL STORE**, Kabupaten Deli Serdang. Pastikan identitas merchant tersebut memang benar dan mendapat izin dari pemilik QRIS sebelum website dipublikasikan.
- QRIS statis tidak memuat nominal transaksi dan tidak mengirim webhook/notifikasi ke website. Donatur perlu memasukkan nominal secara manual jika diminta, menyimpan bukti pembayaran, lalu mengirimkannya ke pengelola.
- Website tidak mengklaim pembayaran berhasil secara otomatis. Pengelola harus mencocokkan mutasi/saldo dan bukti pembayaran secara manual.

## Jalankan lokal
1. Install Node.js 20+.
2. `npm install`
3. `npm run dev`

## Deploy ke Vercel
1. Upload seluruh isi folder project ini ke repository GitHub.
2. Import repository di Vercel sebagai project Next.js.
3. Deploy. Untuk alur QRIS statis di halaman ini, tidak diperlukan kredensial Midtrans.

## Sebelum menerima donasi sungguhan
- Pastikan pemilik QRIS mengizinkan penggunaannya untuk penggalangan dana ini. Jangan gunakan QRIS milik toko/pihak lain tanpa izin.
- Pastikan nama merchant yang tampil di aplikasi pembayar cocok dengan informasi yang diumumkan kepada donatur.
- Lengkapi identitas pengelola, kontak, kebijakan privasi, tujuan penggunaan dana, target, biaya, dan laporan penyaluran.
- Angka progres kampanye di halaman awal masih data contoh; jangan tampilkan sebagai jumlah donasi nyata.
- Buat proses pencatatan manual yang aman dan jangan mengumumkan donasi berhasil sebelum pembayaran benar-benar diperiksa.

## Catatan teknis
Website ini saat ini hanya menampilkan QRIS statis. Konfirmasi otomatis, tanda terima email, dan rekap donasi aktual belum diaktifkan.
