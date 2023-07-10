import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const Navigation = () => {
  const { user, carregando } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    console.log(carregando);
    if (!carregando) {
      if (!user) {
        router.push('/');
      }
      if (user && user.roles != 'ADMIN') {
        router.push('/');
      }
    }
  }, [carregando]);

  if (carregando) return null;
  if (!carregando && !user) return null;

  return (
    <div className="bg-gray-200 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <a href="/" className="text-gray-500">
          Voltar ao site
        </a>
        <div className="space-x-4">
          <a href="/dashboard/listar-carros" className="text-blue-500">
            Carros
          </a>
          <a href="/dashboard/listar-categorias" className="text-blue-500">
            Categorias
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
