import React from 'react';
import NavFrota from '../frota/NavFrota';
import Footer from '@/components/Footer';
import FormCadastro from './FormCadastro';

const page = () => {
  return (
    <div>
      <NavFrota />
      <FormCadastro />
      <Footer />
    </div>
  );
};

export default page;
