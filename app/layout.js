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
      <body style={{ minHeight:'100vh', display:'flex', flexDirection:'column'}}>
        <Navbar />
        <main style={{flex:1}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}