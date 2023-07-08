import { AuthContext } from '@/contexts/AuthContext';
import React, { useContext, useEffect, useState } from 'react';

const Reservas = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setReservations(user.reservations);
    }
  }, [user]);

  if (user && reservations.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="bg-white rounded p-4 shadow">
          <p className="text-center text-gray-900 mb-2">Não existem reservas</p>
          <p className="text-center text-gray-700 mb-2">
            Caso você já tenha alguma reserva, é necessário fazer login para
            visualizá-las
          </p>
          <div className="flex justify-center">
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Fazer login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">Reservas</h1>
      {reservations.map((reservation) => (
        <div
          key={reservation.reservationId}
          className="mb-4 bg-white p-4 rounded-lg shadow border border-gray-300"
        >
          <p className="mb-1">Veículo: {reservation.car.model}</p>
          <p className="mb-1">Data de Retirada: {reservation.startDate}</p>
          <p className="mb-1">Data de Devolução: {reservation.endDate}</p>
          <p className="mb-1">
            Valor Total: R${reservation.totalValue.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Reservas;
