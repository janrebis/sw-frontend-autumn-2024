import express from "express";
import pg from "pg";

const app = express();
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS favorites (
      id SERIAL PRIMARY KEY,
      city TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
}

app.get("/health", async (req, res) => {
  res.json({ ok: true });
});

app.post("/favorites", async (req, res) => {
  const { city } = req.body;
  if (!city) return res.status(400).json({ error: "city required" });

  const result = await pool.query(
    "INSERT INTO favorites(city) VALUES($1) RETURNING *",
    [city]
  );
  res.json(result.rows[0]);
});

app.get("/favorites", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM favorites ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

const port = process.env.PORT || 4000;

initDb()
  .then(() => {
    app.listen(port, () => console.log(`API running on :${port}`));
  })
  .catch((err) => {
    console.error("DB init failed:", err);
    process.exit(1);
  });