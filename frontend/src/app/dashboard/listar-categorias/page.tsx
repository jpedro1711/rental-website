import React from 'react';
import ListarCategorias from './ListarCategorias';
import { AuthProvider } from '@/contexts/AuthContext';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <ListarCategorias />
      </AuthProvider>
    </div>
  );
};

export default page;
