'use client';
import { Category } from '@/app/globals/global';
import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';

const ListarCategorias = () => {
  const [categorias, setCategorias] = useState<Category[] | null>(null);
  const router = useRouter();
  const { user, carregando } = useContext(AuthContext);

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

  function handleDelete(categoryId: string) {
    const c = confirm('Tem certeza que deseja excluir?');
    if (c) {
      const { rentalAuthToken: token } = parseCookies();
      axios
        .delete(
          `https://rental-api-production.up.railway.app/categories/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          alert(
            'Erro ao deletar categoria, verifique se não existem veículos com a categoria que você quer excluir'
          );
        });
    }
  }

  useEffect(() => {
    axios
      .get('https://rental-api-production.up.railway.app/categories')
      .then((res) => setCategorias(res.data))
      .catch((err) => alert('Error fetching categories'));
  }, []);

  useEffect(() => {
    console.log(categorias);
  }, [categorias]);

  if (!categorias) return null;
  if (carregando) return null;
  if (!carregando && !user) return null;
  if (categorias == null && !carregando && user) return 'Carregando...';
  return (
    <div>
      <Navigation />
      <div className="container mx-auto p-5">
        <a
          href="/dashboard/cadastrar-categoria"
          className="mx-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cadastrar categoria
        </a>
        <table className="w-full mt-10 border">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Categoria</th>
              <th className="px-4 py-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((c) => (
              <tr key={c.categoryId}>
                <td className="px-4 py-2 text-left border">{c.name}</td>
                <td className="px-4 py-2 flex justify-around border">
                  <a
                    href={`https://rental-website-eight.vercel.app/dashboard/editar-categoria/${c.categoryId}`}
                    className="text-blue-500 mr-2"
                  >
                    Editar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarCategorias;
