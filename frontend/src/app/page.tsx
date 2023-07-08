import Nav from '@/components/Nav';
import SectionHome from '@/components/SectionHome';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

export default function Home() {
  return (
    <div>
      <AuthProvider>
        <Nav />
        <SectionHome />
        <Footer />
      </AuthProvider>
    </div>
  );
}
