'use client';

import { Car } from '@/app/globals/global';
import React, { useContext, useEffect, useState } from 'react';
import { FormEvent } from 'react';
import axios from 'axios';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type User = {
  userId: string;
  email: string;
  roles: string;
  reservations: [];
};

interface Props {
  carId: string;
  client: string | undefined;
}

const FormReserva = (props: Props) => {
  const [carData, setCarData] = useState<Car | null>(null);
  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cars/${props.carId}`)
      .then((res) => {
        setCarData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, [props.carId, user]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new Date(dataRetirada) > new Date(dataDevolucao)) {
      alert('A data de devolução não pode ser anterior à data de retirada.');
      return;
    }

    console.log('Data de Retirada:', dataRetirada);
    console.log('Data de Devolução:', dataDevolucao);
    console.log('Observações:', observacoes);

    const startDate: Date = new Date(dataRetirada);
    const endDate: Date = new Date(dataDevolucao);
    const totalDays: number = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (carData) {
      const totalPrice = totalDays * carData.pricePerDay;
      setTotal(totalPrice);
    }

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    // Limpar os campos do formulário
    setDataRetirada('');
    setDataDevolucao('');
    setVeiculo('');
    setObservacoes('');
  };

  if (!user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded p-4 shadow">
          <p className="text-center text-gray-700 mb-2">
            Você precisa estar autenticado para realizar a reserva!
          </p>
          <a href="/login" className="text-blue-500 hover:text-blue-600">
            Fazer login
          </a>
        </div>
      </div>
    );
  }

  if (!carData) {
    return null;
  }

  return (
    <div className="max-w-md mx-auto h-screen p-2">
      <h1 className="text-2xl font-bold my-4">Reserva de Carro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Cliente:</label>
          <input
            type="text"
            value={user?.email}
            onChange={(e) => setVeiculo(e.target.value)}
            disabled
            className="border border-gray-300 px-2 py-1 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Veículo:</label>
          <input
            type="text"
            value={carData.model}
            onChange={(e) => setVeiculo(e.target.value)}
            disabled
            className="border border-gray-300 px-2 py-1 w-full rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Data de Retirada:</label>
          <input
            type="date"
            value={dataRetirada}
            onChange={(e) => setDataRetirada(e.target.value)}
            required
            className="border border-gray-300 px-2 py-1 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Data de Devolução:</label>
          <input
            type="date"
            value={dataDevolucao}
            onChange={(e) => setDataDevolucao(e.target.value)}
            required
            className="border border-gray-300 px-2 py-1 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Observações:</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            className="border border-gray-300 px-2 py-1 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-4 rounded-lg relative">
            <h2 className="text-xl font-bold mb-4">Confirmação da Reserva</h2>
            <p>Modelo do Veículo: {carData.model}</p>
            <p>Data de Retirada: {dataRetirada}</p>
            <p>Data de Devolução: {dataDevolucao}</p>
            <p>Valor Total da Reserva: {total}</p>
            <button
              type="button"
              onClick={closeModal}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormReserva;
