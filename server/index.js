require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/memorylane';
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

app.get('/api/health', (_,res)=>res.json({ok:true}));

app.get('/api/memories', async (req,res)=>{
  try{
    const r = await pool.query('SELECT * FROM memories ORDER BY date_created DESC');
    res.json(r.rows);
  }catch(e){ console.error(e); res.status(500).json({error:'db'}); }
});

app.get('/api/memories/:id', async (req,res)=>{
  try{
    const r = await pool.query('SELECT * FROM memories WHERE id=$1',[req.params.id]);
    if(!r.rows.length) return res.status(404).json({error:'not found'});
    res.json(r.rows[0]);
  }catch(e){ console.error(e); res.status(500).json({error:'db'}); }
});

app.post('/api/memories', async (req,res)=>{
  try{
    const { title, description, image_url, memory_date } = req.body;
    const r = await pool.query(
      `INSERT INTO memories (title, description, image_url, memory_date)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [title, description, image_url || null, memory_date || null]
    );
    res.status(201).json(r.rows[0]);
  }catch(e){ console.error(e); res.status(500).json({error:'db'}); }
});

app.put('/api/memories/:id', async (req,res)=>{
  try{
    const { title, description, image_url, memory_date } = req.body;
    const r = await pool.query(
      `UPDATE memories SET title=$1, description=$2, image_url=$3, memory_date=$4 WHERE id=$5 RETURNING *`,
      [title, description, image_url || null, memory_date || null, req.params.id]
    );
    if(!r.rows.length) return res.status(404).json({error:'not found'});
    res.json(r.rows[0]);
  }catch(e){ console.error(e); res.status(500).json({error:'db'}); }
});

app.delete('/api/memories/:id', async (req,res)=>{
  try{
    const r = await pool.query('DELETE FROM memories WHERE id=$1 RETURNING *',[req.params.id]);
    if(!r.rows.length) return res.status(404).json({error:'not found'});
    res.json({success:true});
  }catch(e){ console.error(e); res.status(500).json({error:'db'}); }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log('Server listening on',PORT));
