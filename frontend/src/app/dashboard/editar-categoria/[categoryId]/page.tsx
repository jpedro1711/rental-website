import React from 'react';
import EditarCategoria from './EditarCategoria';
import { AuthProvider } from '@/contexts/AuthContext';

const page = ({ params }: { params: { categoryId: string } }) => {
  return (
    <div>
      <AuthProvider>
        <EditarCategoria categoryId={params.categoryId} />
      </AuthProvider>
    </div>
  );
};

export default page;
