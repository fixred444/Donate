# NYALA BERSAMA

Website donasi berbasis Next.js dengan QRIS statis. Proyek ini **tidak menggunakan Midtrans atau Supabase**.

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Deploy ke Vercel

1. Upload seluruh isi folder proyek ke root repository GitHub (pastikan `package.json` berada di root).
2. Import repository tersebut ke Vercel.
3. Framework preset: Next.js. Build command: `npm run build`.
4. Tidak perlu environment variable untuk pembayaran/database.

## Cara donasi

Donatur memilih program dan nominal, lalu website menampilkan QRIS statis dari `public/qris-donasi.jpg`. Untuk QRIS statis, donatur perlu memasukkan nominal secara manual jika aplikasi memintanya. Pengelola harus memeriksa mutasi/bukti transaksi secara manual. Website tidak dapat mendeteksi pembayaran atau mengubah status menjadi berhasil secara otomatis hanya dari gambar QRIS.

## Sebelum dipublikasikan

- Pastikan QRIS memang milik organisasi/pengelola yang berwenang dan nama merchant yang muncul sesuai.
- Ganti angka terkumpul yang masih berupa data contoh di `components/HomeClient.tsx`.
- Lengkapi identitas pengelola, kontak, kebijakan privasi, serta laporan penggunaan dana.
- Tambahkan cara resmi bagi donatur untuk mengirim bukti pembayaran dan untuk pengelola melakukan verifikasi.
