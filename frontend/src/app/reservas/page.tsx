import React from 'react';
import NavFrota from '../frota/NavFrota';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div>
      <NavFrota />
      <p className="h-screen flex justify-center items-center">
        Não existem reservas
      </p>
      <Footer />
    </div>
  );
};

export default page;
