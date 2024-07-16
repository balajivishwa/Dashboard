const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

app.use(cors());
app.use(express.json());

app.get('/dishes', async (req, res) => {
  const result = await pool.query('SELECT * FROM dishes');
  res.json(result.rows);
});

app.post('/dishes', async (req, res) => {
  const { name, description, price } = req.body;
  const result = await pool.query(
    'INSERT INTO dishes (name, description, price) VALUES ($1, $2, $3) RETURNING *',
    [name, description, price]
  );
  res.json(result.rows[0]);
});

app.put('/dishes/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, price, published_status } = req.body;
  const result = await pool.query(
    'UPDATE dishes SET name = $1, description = $2, price = $3, published_status = $4 WHERE id = $5 RETURNING *',
    [name, description, price, published_status, id]
  );
  res.json(result.rows[0]);
});

app.patch('/dishes/:id/publish', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE dishes SET published_status = NOT published_status WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
