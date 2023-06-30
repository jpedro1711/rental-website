'use client';

import React from 'react';
import { useState } from 'react';
import { FormEvent } from 'react';

interface Parameter {
  parameter: number;
}

const FormReserva = (parameter: Parameter) => {
  const cars = [
    {
      carId: 1,
      make: 'Volkswagem',
      model: 't-cross',
      year: 2020,
      imageUrl:
        'https://cdn.motor1.com/images/mgl/g44w3g/s1/vw-t-cross-comfortline-200tsi-2022.jpg',
      mileage: 10000,
      licensePlate: 'AAAA-1111',
      categoryId: 1,
      pricePerDay: 200.0,
    },
    {
      carId: 2,
      make: 'Toyota',
      model: 'corolla',
      year: 2022,
      imageUrl:
        'https://s2-autoesporte.glbimg.com/UXzH1asBBS_EBcpN3PplPKvbuH0=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_cf9d035bf26b4646b105bd958f32089d/internal_photos/bs/2021/c/R/EvRnyTROaZVmF97BWkuw/toyota-corolla-xei-sedan-5.jpg',
      mileage: 1000,
      licensePlate: 'AAAA-2222',
      categoryId: 3,
      pricePerDay: 300.0,
    },
    {
      carId: 3,
      make: 'Ford',
      model: 'F-150',
      year: 2022,
      imageUrl:
        'https://revistacarro.com.br/wp-content/uploads/2020/06/ford-f-150-2021-oficial-3.jpg',
      mileage: 1200,
      licensePlate: 'FFFF-2222',
      categoryId: 4,
      pricePerDay: 400.0,
    },
  ];

  const selectedCar = cars.find((car) => car.carId === parameter.parameter);

  if (!selectedCar) {
    return <div>Veículo não encontrado</div>;
  }

  const { make, model, year, mileage, licensePlate, categoryId, pricePerDay } =
    selectedCar;

  const [dataRetirada, setDataRetirada] = useState('');
  const [dataDevolucao, setDataDevolucao] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [total, setTotal] = useState(0);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (new Date(dataRetirada) > new Date(dataDevolucao)) {
      alert('A data de devolução não pode ser anterior à data de retirada.');
      return;
    }

    // Realizar ações com os dados do formulário, como enviar para um servidor, etc.
    // Por enquanto, apenas exibindo os valores no console:
    console.log('Data de Retirada:', veiculo);
    console.log('Data de Retirada:', dataRetirada);
    console.log('Data de Devolução:', dataDevolucao);
    console.log('Observações:', observacoes);

    const startDate: Date = new Date(dataRetirada);
    const endDate: Date = new Date(dataDevolucao);
    const totalDays: number = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = totalDays * pricePerDay;
    setTotal(totalPrice);

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    //Limpar os campos do formulário
    setDataRetirada('');
    setDataDevolucao('');
    setVeiculo('');
    setObservacoes('');
  };

  return (
    <div className="max-w-md mx-auto h-screen p-2">
      <h1 className="text-2xl font-bold my-4">Reserva de Carro</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Veículo:</label>
          <input
            type="select"
            value={selectedCar.model}
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
            <p>Modelo do Veículo: {selectedCar.model}</p>
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
