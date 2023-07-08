'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavFrota from '../frota/NavFrota';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import Reservas from './Reservas';

const page = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider>
        <NavFrota />
        <main className="flex-grow mb-10">
          <Reservas />
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default page;
