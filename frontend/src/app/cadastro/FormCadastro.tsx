'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FormEvent } from 'react';

const FormCadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [numeroCarteiraDeMotorista, setNumeroCarteiraDeMotorista] =
    useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validações
    if (
      !nome ||
      !email ||
      !cpf ||
      !senha ||
      !confirmarSenha ||
      !numeroCarteiraDeMotorista
    ) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Enviar os dados para o servidor, realizar ações, etc.
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('CPF:', cpf);
    console.log('Senha:', senha);
    console.log('Nº carteira: ', numeroCarteiraDeMotorista);

    // Limpar os campos do formulário
    setNome('');
    setEmail('');
    setCpf('');
    setSenha('');
    setNumeroCarteiraDeMotorista('');
    setConfirmarSenha('');
  };

  return (
    <div>
      <div className="max-w-md mx-auto h-screen p-2">
        <h1 className="text-2xl font-bold my-4">Cadastro de usuário</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              pattern="^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$"
              className="border border-gray-300 px-2 py-1 rounded w-full"
              title="O e-mail deve ter o formato adequado"
            />
          </div>
          <div>
            <label>CPF:</label>
            <input
              type="text"
              value={cpf}
              pattern="^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$"
              title="O CPF deve ter o padrão 000.000.000-00"
              onChange={(e) => setCpf(e.target.value)}
              required
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div>
            <label>Número de registro da carteira de motorista:</label>
            <input
              type="text"
              value={numeroCarteiraDeMotorista}
              pattern="^[0-9]+$"
              title="O número da carteira de motorista não pode contér letras ou caracteres especiais"
              onChange={(e) => setNumeroCarteiraDeMotorista(e.target.value)}
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
          <div>
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              className="border border-gray-300 px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Cadastrar
            </button>
            <Link href="/login" className="text-blue-500 hover:text-blue-600">
              Já sou cliente
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormCadastro;
