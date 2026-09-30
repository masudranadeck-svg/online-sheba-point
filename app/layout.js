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
      <head>
        {/* Font Awesome Global Link */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body style={{ minHeight:'100vh', display:'flex', flexDirection:'column', background: 'var(--bg)'}}>
        <Navbar />
        <main style={{flex:1, paddingTop: '80px'}}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}