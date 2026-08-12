'use client'
import { useState } from 'react';

export default function AdminPanel() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [softwareKey, setSoftwareKey] = useState('');
  const [message, setMessage] = useState('');

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setMessage('যোগ করা হচ্ছে...');

    try {
      const res = await fetch('https://online-sheba-point.onrender.com/api/products/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          description, 
          price: Number(price), 
          category, 
          softwareKey 
        })
      });

      const data = await res.json();
      setMessage(data.message);

      // সফল হলে ইনপুট বক্স খালি করা
      if (res.ok) {
        setName('');
        setDescription('');
        setPrice('');
        setCategory('');
        setSoftwareKey('');
      }
    } catch (error) {
      setMessage('সার্ভারের সাথে কানেক্ট করা যায়নি!');
    }
  };

  return (
    <div style={{ padding: '50px', maxWidth: '500px', margin: 'auto' }}>
      <h2>🛠️ অ্যাডমিন প্যানেল (প্রোডাক্ট অ্যাড করুন)</h2>
      <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="প্রোডাক্টের নাম (যেমন: Windows 11 Pro)" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <textarea 
          placeholder="বিবরণ (Description)" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '80px' }}
        />
        <input 
          type="number" 
          placeholder="মূল্য (টাকা)" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="ক্যাটাগরি (যেমন: Software / Subscription)" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <input 
          type="text" 
          placeholder="সফটওয়্যার কী (License Key)" 
          value={softwareKey} 
          onChange={(e) => setSoftwareKey(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          type="submit" 
          style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}
        >
          প্রোডাক্ট অ্যাড করুন
        </button>
      </form>
      
      {message && <p style={{ marginTop: '15px', color: 'green', textAlign: 'center' }}>{message}</p>}
    </div>
  );
}