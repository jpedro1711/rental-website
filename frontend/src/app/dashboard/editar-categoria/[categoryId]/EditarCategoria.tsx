'use client';
import { Car, Category, Make } from '@/app/globals/global';
import { AuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

const EditarCarro = (params: any) => {
  const [categoryData, setCategoryData] = useState<Category | null>();
  const [name, setName] = useState('');
  const router = useRouter();
  const { user, carregando } = useContext(AuthContext);
  const { rentalAuthToken: token } = parseCookies();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name: name,
    };
    axios
      .put(
        `https://rental-api-production.up.railway.app/categories/${params.categoryId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Categoria atualizado com sucesso');
        router.push('/dashboard/listar-categorias');
      })
      .catch((err) => {
        alert('Erro ao atualizar categoria');
      });

    console.log(data);
  }

  useEffect(() => {
    if (token) {
      axios
        .get(
          `https://rental-api-production.up.railway.app/categories/${params.categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCategoryData(res.data);
          setName(res.data.name); // Atribui o valor inicial do model
        })
        .catch((err) => {
          alert('error fetching category data');
        });
    }
  }, []);

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

  useEffect(() => {
    console.log(categoryData);
  }, [categoryData]);

  if (carregando) return null;
  if (!carregando && !user) return null;
  if (categoryData == null) return 'Carregando...';
  return (
    <div className="container mx-auto p-5">
      <div className="container mx-auto">
        <a
          className="m-4 bg-gray-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          href="/dashboard/listar-categorias"
        >
          Voltar
        </a>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label htmlFor="model" className="mb-4 block">
            {' '}
            Nome da categoria
            <input
              value={name}
              type="text"
              id="model"
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCarro;
