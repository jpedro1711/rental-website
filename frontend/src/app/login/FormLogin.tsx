'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { FormEvent } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

type data = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);
  const Auth = useContext(AuthContext);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    setSubmited(true);
    e.preventDefault();

    // Validações
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const data = {
      email: email,
      password: senha,
    };

    handleSignIn(data);
  };

  useEffect(() => {
    console.log(Auth.carregando);
  }, [Auth.carregando]);

  function handleSignIn(data: data) {
    Auth.signIn(data);
  }
  return (
    <div>
      <div className="max-w-md mx-auto h-screen p-2">
        <h1 className="text-2xl font-bold my-4">Login de usuário</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              {submited ? 'carregando...' : 'enviar'}
            </button>
            <Link
              href="/cadastro"
              className="text-blue-500 hover:text-blue-600"
            >
              Ainda não sou cliente
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLogin;
