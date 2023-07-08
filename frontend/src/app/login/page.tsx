import React from 'react';
import NavFrota from '../frota/NavFrota';
import FormLogin from './FormLogin';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <NavFrota />
        <FormLogin />
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default page;
