import React from 'react';
import NavFrota from '../frota/NavFrota';
import Footer from '@/components/Footer';
import FormCadastro from './FormCadastro';
import { AuthProvider } from '@/contexts/AuthContext';

const page = () => {
  return (
    <AuthProvider>
      <div>
        <NavFrota />
        <FormCadastro />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default page;
