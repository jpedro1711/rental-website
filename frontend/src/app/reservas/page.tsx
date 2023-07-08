'use client';

import React, { useCallback, useContext, useEffect, useState } from 'react';
import NavFrota from '../frota/NavFrota';
import Footer from '@/components/Footer';
import { AuthProvider } from '@/contexts/AuthContext';
import Reservas from './Reservas';

const page = () => {
  return (
    <div>
      <AuthProvider>
        <NavFrota />
        <Reservas />
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default page;
