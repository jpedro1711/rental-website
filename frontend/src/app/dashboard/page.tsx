'use client';
import { AuthProvider } from '@/contexts/AuthContext';
import axios from 'axios';
import React, { useEffect } from 'react';
import Navigation from './Navigation';

const page = () => {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
};

export default page;
