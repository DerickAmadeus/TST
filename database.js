// database.js
const sqlite3 = require('sqlite3').verbose();

// Nama file database (nanti muncul sendiri di folder)
const DB_SOURCE = "db_anime.sqlite";

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      // Kalau gagal konek
      console.error(err.message);
      throw err;
    } else {
      console.log('Terhubung ke database SQLite.');
      
      // Bikin tabel 'anime' kalau belum ada
      db.run(`CREATE TABLE IF NOT EXISTS anime (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT, 
            episodes INTEGER, 
            status TEXT,
            score REAL
            )`,
      (err) => {
          if (err) {
              // Table sudah ada (biasanya aman diabaikan)
          } else {
              // Insert data dummy awal (optional, biar gak kosong pas dites)
              // Cek dulu apakah tabel kosong
              db.get("SELECT count(*) as count FROM anime", (err, row) => {
                  if(row.count === 0) {
                      const insert = 'INSERT INTO anime (title, episodes, status, score) VALUES (?,?,?,?)';
                      db.run(insert, ["Naruto", 220, "Finished", 7.9]);
                      db.run(insert, ["One Piece", 1000, "Ongoing", 8.9]);
                      console.log("Data dummy berhasil ditambahkan.");
                  }
              });
          }
      });  
    }
});

module.exports = db;