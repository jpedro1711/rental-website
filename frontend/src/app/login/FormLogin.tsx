'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FormEvent } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const FormLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    axios
      .post('http://localhost:8080/auth/login', {
        email: email,
        password: senha,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

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
              Entrar
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
