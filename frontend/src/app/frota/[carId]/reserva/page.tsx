import React from 'react';
import LinkToFrota from './LinkToFrota';
import Footer from '@/components/Footer';
import FormReserva from './FormReserva';

const page = ({ params }: { params: { carId: string } }) => {
  return (
    <div>
      <LinkToFrota />
      <FormReserva parameter={Number(params.carId)} />
      <Footer />
    </div>
  );
};

export default page;
