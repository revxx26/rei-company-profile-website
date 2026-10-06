# Deploy manual ke Render

Proyek ini memakai Next.js server dan optimasi gambar. Pilih **Web Service**, bukan Static Site. Konfigurasi disiapkan saja; belum ada deploy atau perubahan pada akun Render.

## Pengaturan Dashboard

1. Upload/push isi proyek ke repositori Git yang akan dihubungkan ke Render. Sertakan `src`, `public`, `scripts`, `package.json`, `package-lock.json`, konfigurasi Next/TypeScript/PostCSS/ESLint, dan `.node-version`. Jangan upload `node_modules`, `.next`, file `.env`, atau folder screenshot `review`.
2. Pilih **New → Web Service**, lalu hubungkan repositori.
3. Isi pengaturan berikut:

| Pengaturan | Nilai |
| --- | --- |
| Runtime | Node |
| Root Directory | Kosong jika `package.json` berada di root repo; `rei-sistem` jika proyek ada di subfolder itu |
| Build Command | `npm ci --include=dev && npm run check:assets && npm run lint && npm run build` |
| Start Command | `npm start` |
| Health Check Path | `/` |
| Auto Deploy | Off, sesuai deploy manual |
| Region | Singapore |
| Node | `24.15.0`, sudah ditentukan oleh `.node-version` |

4. Environment variables: `NODE_ENV=production`, `NEXT_TELEMETRY_DISABLED=1`. Tidak ada API key, database, SMTP, atau environment variable publik wajib. Jika `NODE_VERSION` sudah ada di Dashboard, hapus override lama atau samakan menjadi `24.15.0` karena nilainya mengalahkan `.node-version`.
5. Klik Create Web Service. Untuk update berikutnya, push perubahan lalu pilih **Manual Deploy → Deploy latest commit**.

`npm start` bind ke `0.0.0.0`. Next.js membaca `PORT` dari Render; tidak perlu menulis port localhost atau mengganti kode. Sertakan dev dependencies saat build karena TypeScript, Tailwind dan ESLint diperlukan, meskipun `NODE_ENV=production`.

`render.yaml` juga tersedia sebagai Blueprint opsional. File itu memilih plan Free dan menonaktifkan auto deploy. Deploy pertama tetap berjalan saat service dibuat. Jika repo menggunakan subfolder, sesuaikan `rootDir` pada Blueprint atau gunakan langkah Dashboard di atas. Panduan: [Next.js di Render](https://render.com/docs/deploy-nextjs-app), [port binding](https://render.com/docs/web-services#port-binding), [versi Node](https://render.com/docs/node-version), [Blueprint](https://render.com/docs/blueprint-spec).

## Periksa sesudah live

- Homepage, gambar, video hero dan artikel `/news/client-gathering` terbuka; URL artikel yang tidak ada menghasilkan 404.
- Layanan: cari, ganti kategori, buka/tutup popup, lalu Copy link. Buka link yang disalin di tab lain. Domain link mengikuti alamat situs live secara otomatis.
- Training: pilih October/September, gunakan panah carousel, buka detail, lihat gambar full size, dan salin link. Refresh link detail tetap membuka popup yang benar.
- Publikasi: filter, View more/View less, gambar regulasi full size, dan PDF magazine beserta navigasi halaman/zoom.
- HP: menu, bahasa EN/ID, dropdown, tombol dan card. Saat ditekan, warna/border memberikan feedback; tidak perlu mouse hover. Cek Safari iOS dan Chrome Android pada perangkat fisik untuk validasi sentuhan terakhir.
- Form kontak: coba validasi isian dan pastikan pesan masuk ke draf WhatsApp/email. Form belum mengirim melalui server atau menyimpan database.

Website tetap merupakan **redesign concept** dengan `noindex`, tanpa dark mode. Konten training adalah snapshot yang dipublikasikan REI, bukan jadwal live. Video hero adalah ilustrasi stock Mixkit; asal dan lisensinya dicatat di `review/hero-consultancy-media.md`.

Plan Free memiliki batasan operasional dan bisa sleep saat tidak digunakan; permintaan pertama dapat lebih lambat. Ini perlu dibedakan dari kegagalan aplikasi. Lihat [batasan plan Free Render](https://render.com/docs/free). Tidak ada upload atau data pengunjung yang perlu disimpan di disk service.
