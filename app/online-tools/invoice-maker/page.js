'use client';
import { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InvoiceMaker() {
  const today = new Date().toISOString().split('T')[0];

  const [invoiceNo, setInvoiceNo] = useState('INV-001');
  const [date, setDate] = useState(today);
  const [currency, setCurrency] = useState('BDT');
  
  const [from, setFrom] = useState({ name: 'My Company', address: 'Dhaka, Bangladesh', phone: '+8801700000000' });
  const [to, setTo] = useState({ name: 'Client Name', address: 'Client Address', phone: '+8801900000000' });
  
  const [items, setItems] = useState([{ desc: 'Website Design', qty: 1, rate: 5000 }]);
  const [taxRate, setTaxRate] = useState(0);

  const printRef = useRef(null);

  const currencies = [
    { code: 'BDT', symbol: '৳' },
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'INR', symbol: '₹' }
  ];
  const currentSymbol = currencies.find(c => c.code === currency)?.symbol || '';

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'desc' ? value : Number(value);
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { desc: '', qty: 1, rate: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const taxAmount = (subtotal * (taxRate / 100));
  const total = subtotal + taxAmount;

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
      pdf.save(`invoice-${invoiceNo}.pdf`);
    } catch (err) {
      alert('পিডিএফ তৈরি করতে সমস্যা হয়েছে!');
    }

    if (btn) btn.innerText = '📄 Download PDF';
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="deepin-body" style={{ minHeight: '100vh', paddingTop: '150px', paddingBottom: '40px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
        <h1 style={{ color: 'white', marginBottom: '10px', textAlign: 'center' }}>🧾 Invoice Maker</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', textAlign: 'center' }}>তথ্য পূরণ করুন, নিচে লাইভ ইনভয়েস দেখুন এবং পিডিএফ ডাউনলোড করুন।</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          
          {/* Left Side: Inputs */}
          <div className="glass-3d" style={{ padding: '30px', maxHeight: '80vh', overflowY: 'auto' }}>
            
            <h3 style={{ color: '#4e6ef2', marginTop: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Invoice Details</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} placeholder="Invoice No" className="d-input" style={{ flex: 1 }} />
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="d-input" style={{ flex: 1 }} />
              <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="d-input" style={{ flex: 1 }}>
                {currencies.map(c => <option key={c.code} value={c.code} style={{background: '#1a1c2e'}}>{c.code}</option>)}
              </select>
            </div>

            <h3 style={{ color: '#2dce89', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>From (Your Info)</h3>
            <input type="text" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} placeholder="Company Name" className="d-input" style={{ marginBottom: '10px' }} />
            <textarea value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} placeholder="Address" className="d-input" style={{ marginBottom: '10px', minHeight: '40px' }} />
            <input type="text" value={from.phone} onChange={(e) => setFrom({ ...from, phone: e.target.value })} placeholder="Phone" className="d-input" style={{ marginBottom: '20px' }} />

            <h3 style={{ color: '#fb6340', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Bill To (Client)</h3>
            <input type="text" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} placeholder="Client Name" className="d-input" style={{ marginBottom: '10px' }} />
            <textarea value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} placeholder="Address" className="d-input" style={{ marginBottom: '10px', minHeight: '40px' }} />
            <input type="text" value={to.phone} onChange={(e) => setTo({ ...to, phone: e.target.value })} placeholder="Phone" className="d-input" style={{ marginBottom: '20px' }} />

            <h3 style={{ color: '#a855f7', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Items</h3>
            {items.map((item, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
                <input type="text" value={item.desc} onChange={(e) => handleItemChange(i, 'desc', e.target.value)} placeholder="Description" className="d-input" style={{ marginBottom: '5px' }} />
                <div style={{ display: 'flex', gap: '5px' }}>
                  <input type="number" value={item.qty} onChange={(e) => handleItemChange(i, 'qty', e.target.value)} placeholder="Qty" className="d-input" style={{ flex: 1 }} />
                  <input type="number" value={item.rate} onChange={(e) => handleItemChange(i, 'rate', e.target.value)} placeholder="Rate" className="d-input" style={{ flex: 1 }} />
                  <button onClick={() => removeItem(i)} style={{ background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '6px', padding: '0 10px', cursor: 'pointer' }}>❌</button>
                </div>
              </div>
            ))}
            <button onClick={addItem} className="d-btn-outline" style={{ width: '100%', padding: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}>+ Item Add করুন</button>

            <h3 style={{ color: '#4e6ef2', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '5px' }}>Tax</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} placeholder="Tax %" className="d-input" style={{ flex: 1 }} />
              <span style={{ color: 'white' }}>%</span>
            </div>
          </div>

          {/* Right Side: Invoice Preview */}
          <div>
            <div ref={printRef} style={{ background: 'white', padding: '40px', color: '#333', minHeight: '80vh', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} id="invoice-preview">
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '3px solid #4e6ef2', paddingBottom: '20px', marginBottom: '30px' }}>
                <div>
                  <h2 style={{ margin: 0, color: '#4e6ef2', fontSize: '24px' }}>{from.name || 'Company Name'}</h2>
                  <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#555' }}>{from.address}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{from.phone}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#333' }}>INVOICE</h1>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', fontWeight: 'bold' }}>#{invoiceNo}</p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '13px' }}>{date}</p>
                </div>
              </div>

              {/* Bill To */}
              <div style={{ marginBottom: '30px' }}>
                <h4 style={{ margin: 0, marginBottom: '5px', color: '#fb6340', fontSize: '14px' }}>BILL TO:</h4>
                <h3 style={{ margin: 0, fontSize: '18px' }}>{to.name || 'Client Name'}</h3>
                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#555' }}>{to.address}</p>
                <p style={{ margin: '2px 0 0 0', fontSize: '13px', color: '#555' }}>{to.phone}</p>
              </div>

              {/* Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '10px', fontSize: '14px' }}>Description</th>
                    <th style={{ textAlign: 'center', padding: '10px', fontSize: '14px', width: '60px' }}>Qty</th>
                    <th style={{ textAlign: 'right', padding: '10px', fontSize: '14px', width: '80px' }}>Rate</th>
                    <th style={{ textAlign: 'right', padding: '10px', fontSize: '14px', width: '100px' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '10px', fontSize: '14px' }}>{item.desc || 'Item'}</td>
                      <td style={{ textAlign: 'center', padding: '10px', fontSize: '14px' }}>{item.qty}</td>
                      <td style={{ textAlign: 'right', padding: '10px', fontSize: '14px' }}>{currentSymbol}{item.rate}</td>
                      <td style={{ textAlign: 'right', padding: '10px', fontSize: '14px' }}>{currentSymbol}{(item.qty * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div style={{ width: '300px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px' }}>
                    <span>Subtotal:</span>
                    <span>{currentSymbol}{subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', fontSize: '14px', borderBottom: '1px solid #ddd' }}>
                    <span>Tax ({taxRate}%):</span>
                    <span>{currentSymbol}{taxAmount.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontSize: '18px', fontWeight: 'bold', background: '#f8f9fa', padding: '10px' }}>
                    <span>Total Payable:</span>
                    <span style={{ color: '#4e6ef2' }}>{currentSymbol}{total.toFixed(2)} {currency}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '50px', textAlign: 'center', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Thank you for your business!</p>
              </div>

            </div>
            
            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px', justifyContent: 'center' }}>
              <button onClick={handleDownloadPDF} id="pdf-btn" className="d-btn-green glow-btn-green" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                📄 Download PDF
              </button>
              <button onClick={handlePrint} className="d-btn glow-btn" style={{ padding: '12px 24px', border: 'none', cursor: 'pointer' }}>
                🖨️ Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}