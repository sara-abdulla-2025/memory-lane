import React, { useState, useEffect } from 'react';
import './AddMemoryModal.css';
export default function AddMemoryModal({ initial, onSubmit, onClose }){
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('');
  const [date,setDate]=useState('');
  const [imageUrl,setImageUrl]=useState('');
  useEffect(()=>{ if(initial){ setTitle(initial.title||''); setDescription(initial.description||''); setDate(initial.memory_date||''); setImageUrl(initial.image_url||''); } else { setTitle(''); setDescription(''); setDate(''); setImageUrl(''); } },[initial]);
  const isFormComplete = title.trim()!=='' && description.trim()!=='' && date.trim()!=='';
  const handleSubmit = (e)=>{ e.preventDefault(); if(!isFormComplete) return; onSubmit({ title, description, image_url: imageUrl || null, memory_date: date || null }); onClose(); };
  return (
    <div className="backdrop">
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{initial ? 'Edit Memory' : 'Add a New Memory'}</h2>
        <input required placeholder="Memory Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <input placeholder="Image URL (optional)" value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
        <input type="date" value={date||''} onChange={e=>setDate(e.target.value)} />
        <button type="submit" className="save-btn" disabled={!isFormComplete}>Save</button>
        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}
