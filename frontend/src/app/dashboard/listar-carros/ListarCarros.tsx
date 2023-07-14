'use client';
import { Car } from '@/app/globals/global';
import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useContext, useEffect, useState } from 'react';
import Navigation from '../Navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const ListarCarros = () => {
  const [cars, setCars] = useState<Car[] | null>(null);
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

  useEffect(() => {
    axios
      .get('https://rental-api-production.up.railway.app/cars')
      .then((res) => {
        setCars(res.data);
      })
      .catch((err) => {
        alert('Error fetching cars');
      });
  }, []);

  function handleDelete(carId: string) {
    const c = confirm('Tem certeza que deseja excluir?');
    if (c) {
      const { rentalAuthToken: token } = parseCookies();
      axios
        .delete(`https://rental-api-production.up.railway.app/cars/${carId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          alert('Erro ao deletar veículo');
        });
    }
  }

  if (!cars) return null;
  if (carregando) return null;
  if (!carregando && !user) return null;
  if (cars == null && !carregando && user) return 'Carregando...';
  return (
    <div>
      <Navigation />
      <div className="p-4">
        <a
          href="/dashboard/cadastrar-carro"
          className="m-5 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Cadastrar carro
        </a>
        <table className="w-full border mt-10">
          <thead>
            <tr>
              <th className="border">Image</th>
              <th className="border">Model</th>
              <th className="border">Year</th>
              <th className="border">License Plate</th>
              <th className="border">Mileage</th>
              <th className="border">Price per Day</th>
              <th className="border">Category</th>
              <th className="border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.licensePlate}>
                <td className="border flex justify-center">
                  <img
                    src={car.imageUrl}
                    alt={car.model}
                    className="w-24 h-auto"
                  />
                </td>
                <td className="border text-center">{car.model}</td>
                <td className="border text-center">{car.year}</td>
                <td className="border text-center">{car.licensePlate}</td>
                <td className="border text-center">{car.mileage}</td>
                <td className="border text-center">{car.pricePerDay}</td>
                <td className="border text-center">{car.category.name}</td>
                <td className="border text-center">
                  <div className="flex justify-around p-2">
                    <a
                      href={`https://rental-website-eight.vercel.app/dashboard/editar-carro/${car.carId}`}
                      className="text-blue-500"
                    >
                      Editar
                    </a>
                    <button
                      onClick={() => handleDelete(car.carId.toString())}
                      className="ml-2 text-red-500"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListarCarros;
