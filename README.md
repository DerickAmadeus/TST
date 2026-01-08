# 🎌 AniLog Service (API Animelist)

![Node.js](https://img.shields.io/badge/Node.js-20232A?style=for-the-badge&logo=node.js&logoColor=61DAFB)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

> **AniLog** (Anime Logical Database) adalah layanan backend microservice yang berfungsi sebagai pusat manajemen katalog anime dan mesin rekomendasi cerdas.

## 📖 Tentang Proyek

**API Animelist** ini dirancang sebagai layanan RESTful yang ringan dan efisien untuk lingkungan dengan sumber daya terbatas (seperti STB). Dibangun di atas ekosistem Node.js, layanan ini bertindak sebagai *Source of Truth* untuk data anime, menghubungkan aplikasi frontend dengan basis data SQLite yang serverless.

Fokus utama layanan ini bukan hanya sekadar *data fetching*, melainkan menyediakan logika bisnis cerdas untuk pencarian dan rekomendasi konten.

## ✨ Fitur Utama

* **⚡ Lightweight Architecture:** Arsitektur microservice berbasis Node.js & Express yang cepat dan efisien.
* **🗄️ Serverless Database:** Menggunakan SQLite untuk persistensi data yang ringan tanpa konfigurasi server database yang rumit.
* **🔍 Smart Search Engine:** Mendukung pencarian judul anime secara *real-time* dengan fitur *partial match* (case-insensitive) dan validasi input otomatis (membedakan ID vs Judul).
* **🧠 Intelligence Engine:** Dilengkapi algoritma **Content-Based Filtering**. Sistem dapat menyarankan anime serupa berdasarkan analisis irisan genre (*genre intersection*) dan skor rating.
* **📄 Rich Metadata:** Menyediakan informasi lengkap mulai dari Sinopsis, Genre, Episode, Skor, hingga URL Gambar.

## 🛠️ Teknologi yang Digunakan

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite3
* **Library Pendukung:** `cors` (untuk keamanan akses).


Link microservice :  http://udinbanda.theokaitou.my.id
Available Endpoints : 
1. /anime (ex : http://udinbanda.theokaitou.my.id/anime)
2. /anime/:id (ex : http://udinbanda.theokaitou.my.id/anime/1)
3. /anime/:title (ex : http://udinbanda.theokaitou.my.id/naruto)
4. /recommend/:id (ex : http://udinbanda.theokaitou.my.id/recommend/1)
