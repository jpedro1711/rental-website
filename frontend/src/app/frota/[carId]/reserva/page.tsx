'use client';

import React, { useContext, useEffect } from 'react';
import LinkToFrota from './LinkToFrota';
import Footer from '@/components/Footer';
import FormReserva from './FormReserva';
import { AuthContext } from '@/contexts/AuthContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Page: any = ({ params }: { params: { carId: string } }) => {
  const auth = useContext(AuthContext);

  return (
    <AuthProvider>
      <div>
        <LinkToFrota />
        <FormReserva carId={params.carId} client={auth.user?.email} />
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default Page;
