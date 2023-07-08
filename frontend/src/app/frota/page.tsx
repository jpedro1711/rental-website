import React from 'react';
import NavFrota from './NavFrota';
import FrotaSection from './FrotaSection';
import { AuthProvider } from '@/contexts/AuthContext';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <NavFrota />
        <FrotaSection />
      </AuthProvider>
    </div>
  );
};

export default page;
