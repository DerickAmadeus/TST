const express = require("express");
const cors = require("cors");
const db = require("./database.js");

const app = express();
const PORT = 6767;

app.use(cors());
app.use(express.json());

// Helper untuk parsing genre
const parseGenres = (genreStr) => {
    if (!genreStr) return [];
    try {
        return JSON.parse(genreStr.replace(/'/g, '"'));
    } catch (e) {
        return genreStr.replace(/[\[\]']/g, '').split(',').map(s => s.trim());
    }
};

// --- ENDPOINTS ---

// 1. GET ALL ANIME (Support Query Param ?q=)
app.get("/anime", (req, res) => {
    const q = req.query.q;
    // Disini SELECT * lebih aman biar kalau mau nampilin gambar/genre di frontend bisa
    let sql = "SELECT animeID, title, score, image_url, genres FROM anime"; 
    let params = [];

    if (q) {
        sql += " WHERE title LIKE ?";
        params.push('%' + q + '%');
    }
    
    // Batasi hasil biar ringan
    sql += " LIMIT 50";

    db.all(sql, params, (err, rows) => {
        if (err) return res.status(400).json({ "error": err.message });
        res.json({
            "message": "success",
            "count": rows.length,
            "data": rows
        });
    });
});

// 2. GET ANIME BY ID
app.get("/anime/:id", (req, res, next) => {
    const id = req.params.id;

    // Cek angka
    if (!/^\d+$/.test(id)) {
        return next();
    }

    const sql = "SELECT * FROM anime WHERE animeID = ?";
    db.get(sql, [id], (err, row) => {
        if (err) return res.status(400).json({ "error": err.message });
        if (!row) return res.status(404).json({ "message": "Anime ID not found" });
        
        row.genres = parseGenres(row.genres);
        res.json({ "message": "success", "data": row });
    });
});

// 3. GET ANIME BY TITLE
app.get("/anime/:title", (req, res) => {
    // PERBAIKAN: Tambahkan WHERE clause dan include image_url
    const sql = "SELECT animeID, title, score, image_url, genres FROM anime WHERE LOWER(title) LIKE ?";
    const params = ['%' + req.params.title.toLowerCase() + '%'];
    
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(400).json({ "error": err.message });
        if (!rows || rows.length === 0) {
            return res.status(404).json({ "message": "Anime title not found" });
        }
    
        
        res.json({
            "message": "success",
            "count": rows.length,
            "data": rows
        });
    });
});

// 4. RECOMMENDATION SYSTEM
app.get("/recommend/:id", (req, res) => {
    const targetId = req.params.id;

    if (!/^\d+$/.test(targetId)) {
        return res.status(400).json({ message: "ID harus berupa angka" });
    }

    // PERBAIKAN: Tambahkan WHERE dan SELECT * (karena butuh genres)
    const sqlTarget = "SELECT * FROM anime WHERE animeID = ?";
    
    db.get(sqlTarget, [targetId], (err, targetAnime) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!targetAnime) return res.status(404).json({ message: "Anime source not found" });

        const targetGenres = parseGenres(targetAnime.genres);
        
        // Ambil anime lain untuk dibandingkan
        const sqlAll = "SELECT * FROM anime WHERE animeID != ?";
        
        db.all(sqlAll, [targetId], (err, allAnime) => {
            if (err) return res.status(500).json({ error: err.message });

            const recommendations = allAnime.map(anime => {
                const currentGenres = parseGenres(anime.genres);
                
                const intersection = currentGenres.filter(g => 
                    targetGenres.some(tg => tg.toLowerCase() === g.toLowerCase())
                );
                
                const similarityScore = (intersection.length * 2) + (anime.score || 0);

                return {
                    animeID: anime.animeID,
                    title: anime.title,
                    image_url: anime.image_url,
                    score: anime.score,
                    genres: currentGenres,
                    similarity_score: similarityScore,
                    matched_genres: intersection
                };
            });

            recommendations.sort((a, b) => b.similarity_score - a.similarity_score);
            const top5 = recommendations.slice(0, 5);

            res.json({
                source: {
                    id: targetAnime.animeID,
                    title: targetAnime.title,
                    genres: targetGenres
                },
                recommendations: top5
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Test ID: http://localhost:${PORT}/anime/1`);
    console.log(`Test Title: http://localhost:${PORT}/anime/naruto`);
});