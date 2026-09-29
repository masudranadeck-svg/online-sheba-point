import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Online Sheba Point',
  description: 'আপনার ডিজিটাল স্টোর',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background: 'var(--bg)'}}>
        <Navbar />
        {/* 80px padding-top দেওয়া হলো যাতে নেভবারের সাথে কোনো কন্টেন্ট না মিলে */}
        <main style={{flex:1, paddingTop: '80px'}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}