'use client';
import { AuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

const CadastrarCategoria = () => {
  const [name, setName] = useState('');
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

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      name: name,
    };
    const { rentalAuthToken: token } = parseCookies();
    if (token) {
      axios
        .post(
          'http://localhost:8080/categories',
          {
            name: data.name,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          alert('Categoria cadastrada com sucesso');
          router.push('/dashboard/listar-categorias');
        })
        .catch((err) => {
          alert(
            'Erro ao cadastrar categoria, verifique se essa categoria já foi cadastrada'
          );
        });
    }

    console.log(data);
  }

  if (carregando) return null;
  if (!carregando && !user) return null;
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Cadastro de categorias</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Nome da categoria
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CadastrarCategoria;
