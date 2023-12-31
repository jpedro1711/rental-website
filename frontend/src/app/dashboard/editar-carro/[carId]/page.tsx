'use client';
import React from 'react';
import EditarCarro from './EditarCarro';
import { AuthProvider } from '@/contexts/AuthContext';

const page = ({ params }: { params: { carId: string } }) => {
  return (
    <div>
      <AuthProvider>
        <EditarCarro carId={params.carId} />
      </AuthProvider>
    </div>
  );
};

export default page;
