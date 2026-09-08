'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function QuotationMaker() {
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const [quoteNo, setQuoteNo] = useState('QUO-001');
  const [date, setDate] = useState(today);
  const [validUntil, setValidUntil] = useState(nextWeek);
  const [currency, setCurrency] = useState('BDT');
  
  const [from, setFrom] = useState({ name: 'My Company', address: 'Dhaka, Bangladesh', phone: '+8801700000000', email: 'info@mycompany.com' });
  const [to, setTo] = useState({ name: 'Client Name', address: 'Client Address', phone: '+8801900000000', email: 'client@email.com' });
  
  const [items, setItems] = useState([{ desc: 'Website Design Service', qty: 1, price: 10000 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [terms, setTerms] = useState('1. Payment must be made within 7 days.\n2. 50% advance payment required to start the work.\n3. Prices are subject to change after the quotation validity date.');

  const printRef = useRef(null);

  const currencies = [
    { code: 'BDT', symbol: '৳' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'SGD', symbol: 'S$' },
    { code: 'INR', symbol: '₹' }
  ];
  const currentSymbol = currencies.find(c => c.code === currency)?.symbol || '';

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'desc' ? value : Number(value);
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { desc: '', qty: 1, price: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxAmount = (subtotal * (taxRate / 100));
  const total = subtotal + taxAmount - discount;

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    if (!element) return;

    const btn = document.getElementById('pdf-btn');
    if (btn) btn.innerText = '⏳ পিডিএফ তৈরি হচ্ছে...';

    try {
      const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
      pdf.save(`quotation-${quoteNo}.pdf`);
    } catch (err) {
      alert('পিডিএফ তৈরি করতে সমস্যা হয়েছে!');
    }

    if (btn) btn.innerText = '📄 Download PDF';
  };

  const handlePrint = async () => {
    const element = printRef.current;
    if (!element) return;
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: '#ffffff' });
    const dataUrl = canvas.toDataURL('image/png');
    const win = window.open('', '_blank');
    win.document.write(`<img src="${dataUrl}" style="width:100%;" onload="window.print();">`);
  };

  const clearForm = () => {
    setFrom({ name: '', address: '', phone: '', email: '' });
    setTo({ name: '', address: '', phone: '', email: '' });
    setItems([{ desc: '', qty: 1, price: 0 }]);
    setTaxRate(0);
    setDiscount(0);
    setTerms('');
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>💲 Quotation Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', textAlign: 'center' }}>কাস্টমারের জন্য প্রফেশনাল কোটেশন তৈরি করে পিডিএফ ডাউনলোড করুন।</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Inputs */}
          <div className="glass-3d" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
            
            <h3 style={{ color: '#4e6ef2', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Quotation Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <input type="text" value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} placeholder="Quotation No" className="d-input" />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="d-input" />
              <input type="date" value={validUntil} onChange={(e) => setValidUntil(e.target.value)} className="d-input" />
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="d-input">
                {currencies.map(c => <option key={c.code} value={c.code} style={{background: '#1a1c2e'}}>{c.code}</option>)}
              </select>
            </div>

            <h3 style={{ color: '#2dce89', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>From (Your Business)</h3>
            <input type="text" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} placeholder="Company Name" className="d-input" style={{ marginBottom: '10px' }} />
            <textarea value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} placeholder="Address" className="d-input" style={{ marginBottom: '10px', minHeight: '40px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="text" value={from.phone} onChange={(e) => setFrom({ ...from, phone: e.target.value })} placeholder="Phone" className="d-input" />
              <input type="text" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} placeholder="Email" className="d-input" />
            </div>

            <h3 style={{ color: '#fb6340', marginTop: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Bill To (Client)</h3>
            <input type="text" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} placeholder="Client Name/Company" className="d-input" style={{ marginBottom: '10px' }} />
            <textarea value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} placeholder="Address" className="d-input" style={{ marginBottom: '10px', minHeight: '40px' }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <input type="text" value={to.phone} onChange={(e) => setTo({ ...to, phone: e.target.value })} placeholder="Phone" className="d-input" />
              <input type="text" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} placeholder="Email" className="d-input" />
            </div>

            <h3 style={{ color: '#a855f7', marginTop: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Items / Services</h3>
            {items.map((item, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" value={item.desc} onChange={(e) => handleItemChange(i, 'desc', e.target.value)} placeholder="Description" className="d-input" style={{ marginBottom: '5px' }} />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input type="number" value={item.qty} onChange={(e) => handleItemChange(i, 'qty', e.target.value)} placeholder="Qty" className="d-input" style={{ flex: 1 }} />
                  <input type="number" value={item.price} onChange={(e) => handleItemChange(i, 'price', e.target.value)} placeholder="Unit Price" className="d-input" style={{ flex: 2 }} />
                  <button onClick={() => removeItem(i)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '6px', padding: '0 10px', cursor: 'pointer' }}>❌</button>
                </div>
              </div>
            ))}
            <button onClick={addItem} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ Item Add করুন</button>

            <h3 style={{ color: '#4e6ef2', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Tax & Discount</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} placeholder="Tax" className="d-input" />
                <span style={{ color: 'white' }}>%</span>
              </div>
              <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} placeholder="Discount Amount" className="d-input" />
            </div>

            <h3 style={{ color: '#2dce89', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Terms & Conditions</h3>
            <textarea value={terms} onChange={(e) => setTerms(e.target.value)} placeholder="Terms..." className="d-input" style={{ minHeight: '80px' }} />
          </div>

          {/* Right Side: Quotation Preview */}
          <div>
            <div ref={printRef} style={{ background: 'white', padding: '40px', color: '#333', minHeight: '80vh', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} id="quotation-preview">
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #2dce89', paddingBottom: '20px', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#2dce89', fontSize: '24px' }}>{from.name || 'Company Name'}</h2>
                  <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#555' }}>{from.address}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{from.phone} {from.email && `| ${from.email}`}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#333' }}>QUOTATION</h1>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>#{quoteNo}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px' }}>Date: {date}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px' }}>Valid Until: {validUntil}</p>
                </div>
              </div>

              {/* Bill To */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <h4 style={{ margin: 0, marginBottom: '5px', color: '#fb6340', fontSize: '14px' }}>QUOTATION TO:</h4>
                  <h3 style={{ margin: 0, fontSize: '18px' }}>{to.name || 'Client Name'}</h3>
                  <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#555' }}>{to.address}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{to.phone} {to.email && `| ${to.email}`}</p>
                </div>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '14px' }}>Description</th>
                    <th style={{ textAlign: 'center', padding: '10px', fontSize: '14px', width: '60px' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '10px', fontSize: '14px', width: '80px' }}>Price</th>
                    <th style={{ textAlign: 'right', padding: '10px', fontSize: '14px', width: '100px' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px', fontSize: '14px' }}>{item.desc || 'Item'}</td>
                      <td style={{ textAlign: 'center', padding: '10px', fontSize: '14px' }}>{item.qty}</td>
                      <td style={{ textAlign: 'right', padding: '10px', fontSize: '14px' }}>{currentSymbol}{item.price.toFixed(2)}</td>
                      <td style={{ textAlign: 'right', padding: '10px', fontSize: '14px' }}>{currentSymbol}{(item.qty * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total & Terms Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
                
                {/* Terms & Conditions */}
                <div>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#333' }}>Terms & Conditions:</h4>
                  <p style={{ whiteSpace: 'pre-line', fontSize: '12px', color: '#666', lineHeight: 1.5 }}>{terms || 'No terms specified.'}</p>
                </div>

                {/* Total Calculation */}
                <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px' }}>
                    <span>Subtotal:</span>
                    <span>{currentSymbol}{subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px' }}>
                    <span>Tax ({taxRate}%):</span>
                    <span>{currentSymbol}{taxAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '14px', borderBottom: '1px solid #ddd' }}>
                    <span>Discount:</span>
                    <span>- {currentSymbol}{discount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 0 0', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Total Due:</span>
                    <span style={{ color: '#2dce89' }}>{currentSymbol}{total.toFixed(2)} {currency}</span>
                  </div>
                </div>

              </div>

              <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Thank you for your business inquiry!</p>
              </div>

            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={handleDownloadPDF} id="pdf-btn" className="d-btn-green glow-btn-green" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                📄 Download PDF
              </button>
              <button onClick={handlePrint} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                🖨️ Print Quotation
              </button>
              <button onClick={clearForm} className="d-btn-orange" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                🧹 Clear Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}