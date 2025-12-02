import { useState, useEffect } from 'react';
import MemoryCard from './components/MemoryCard';
import AddMemoryModal from './components/AddMemoryModal';
import './index.css';
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export default function App(){
  const [memories,setMemories]=useState([]);
  const [showModal,setShowModal]=useState(false);
  const [editing,setEditing]=useState(null);
  const load=async()=>{ try{ const r=await fetch(`${API_BASE}/memories`); const d=await r.json(); setMemories(d);}catch(e){console.error(e);} };
  useEffect(()=>{load();},[]);
  const addMemory=async(mem)=>{ try{ const r=await fetch(`${API_BASE}/memories`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(mem)}); const created=await r.json(); setMemories(prev=>[created,...prev]); }catch(e){console.error(e);} };
  const updateMemory=async(id,mem)=>{ try{ const r=await fetch(`${API_BASE}/memories/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(mem)}); const updated=await r.json(); setMemories(prev=>prev.map(m=>m.id===id?updated:m)); }catch(e){console.error(e);} };
  const deleteMemory=async(id)=>{ try{ await fetch(`${API_BASE}/memories/${id}`,{method:'DELETE'}); setMemories(prev=>prev.filter(m=>m.id!==id)); }catch(e){console.error(e);} };
  return (
    <div className="app-container">
      <nav className="nav"><h1 className="title">🌿 Memory Lane</h1>
        <button className="add-btn" onClick={()=>{setEditing(null);setShowModal(true);}}>+ Add Memory</button>
      </nav>
      <main className="grid">
        {memories.length===0 ? <div className="empty">No memories yet — click “Add Memory” to create one.</div> : memories.map(mem=>(<MemoryCard key={mem.id} mem={mem} onDelete={deleteMemory} onEdit={()=>{setEditing(mem);setShowModal(true);}}/>))}
      </main>
      {showModal && <AddMemoryModal initial={editing} onSubmit={editing? (mem)=>updateMemory(editing.id,mem) : addMemory} onClose={()=>setShowModal(false)}/>}
    </div>
  );
}
