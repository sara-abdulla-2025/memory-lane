import React from 'react';
import './MemoryCard.css';
export default function MemoryCard({mem,onDelete,onEdit}){
  return (
    <article className="card fade-in">
      <div className="photo-wrap"><img src={mem.image_url || 'https://placehold.co/600x400?text=Memory'} alt={mem.title}/></div>
      <div className="card-body">
        <h3 className="card-title">{mem.title}</h3>
        <p className="card-desc">{mem.description}</p>
        <div className="card-actions">
          <button className="btn edit" onClick={onEdit}>Edit</button>
          <button className="btn delete" onClick={()=>onDelete(mem.id)}>Delete</button>
        </div>
      </div>
    </article>
  );
}
