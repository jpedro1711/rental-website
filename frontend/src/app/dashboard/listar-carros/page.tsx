'use client';
import { AuthProvider } from '@/contexts/AuthContext';
import ListarCarros from './ListarCarros';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <ListarCarros />
      </AuthProvider>
    </div>
  );
};

export default page;
