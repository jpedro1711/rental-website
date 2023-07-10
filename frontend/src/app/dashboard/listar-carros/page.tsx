'use client';
import { Car } from '@/app/globals/global';
import axios from 'axios';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [cars, setCars] = useState<Car[] | null>(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/cars')
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
        .delete(`http://localhost:8080/cars/${carId}`, {
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

  if (cars === null) return 'Carregando...';

  return (
    <div>
      <a href="/dashboard/cadastrar-carro">Cadastrar carro</a>
      <a href="/dashboard">Dashboard</a>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Model</th>
            <th>Year</th>
            <th>License Plate</th>
            <th>Mileage</th>
            <th>Price per Day</th>
            <th>Category</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.licensePlate}>
              <td>
                <img
                  src={car.imageUrl}
                  alt={car.model}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.licensePlate}</td>
              <td>{car.mileage}</td>
              <td>{car.pricePerDay}</td>
              <td>{car.category.name}</td>
              <td>
                <Link
                  href={`http://localhost:3000/dashboard/editar-carro/${car.carId}`}
                >
                  Editar
                </Link>
                <button onClick={() => handleDelete(car.carId.toString())}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
