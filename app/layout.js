import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'DigitalStore',
  description: 'ডিজিটাল স্টোর',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body style={{background:'#f5f7fa', color:'#1a1a2e', minHeight:'100vh', display:'flex', flexDirection:'column'}}>
        <Navbar />
        <main style={{flex:1}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}