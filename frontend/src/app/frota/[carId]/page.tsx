'use client';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import CarDetails from './CarDetails';

const page = ({ params }: { params: { carId: string } }) => {
  return (
    <AuthProvider>
      <CarDetails carId={params.carId}></CarDetails>
    </AuthProvider>
  );
};

export default page;
