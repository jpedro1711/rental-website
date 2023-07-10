import React from 'react';
import CadastrarCategoria from './CadastrarCategoria';
import { AuthProvider } from '@/contexts/AuthContext';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <CadastrarCategoria />
      </AuthProvider>
    </div>
  );
};

export default page;
