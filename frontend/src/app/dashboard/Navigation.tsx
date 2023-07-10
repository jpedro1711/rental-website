import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user?.roles === 'USER') {
      router.push('/');
    }
  }, [user]);

  if (!user || user.roles != 'ADMIN') return null;
  return (
    <div>
      <div>
        Dashboard
        <a href="/dashboard/listar-carros">Carros</a>
        <a href="">Categorias</a>
      </div>
    </div>
  );
};

export default Navigation;
