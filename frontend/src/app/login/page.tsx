import React from 'react';
import NavFrota from '../frota/NavFrota';
import FormLogin from './FormLogin';
import Footer from '@/components/Footer';

const page = () => {
  return (
    <div>
      <NavFrota />
      <FormLogin />
      <Footer />
    </div>
  );
};

export default page;
