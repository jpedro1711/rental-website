'use client';

import Footer from '@/components/Footer';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkToFrota from './reserva/LinkToFrota';
import axios from 'axios';
import { Car } from '@/app/globals/global';

const page = ({ params }: { params: { carId: string } }) => {
  const [carData, setCarData] = useState<Car>();

  useEffect(() => {
    console.log(typeof params.carId);
    axios
      .get(`http://localhost:8080/cars/${params.carId}`)
      .then((res) => {
        setCarData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching car data:', error);
      });
  }, []);

  if (carData == null) return null;
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <LinkToFrota />

        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 my-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={carData.imageUrl}
              alt={carData.model}
              className="w-full h-96 object-cover object-center mb-4 rounded-lg shadow-md"
            />
          </div>
          <div className="h-96 w-full md:w-1/2 pl-8 flex flex-col justify-start md:justify-between">
            <div className="mt-2">
              <h1 className="text-2xl font-bold mb-2">{`${''} ${''}`}</h1>
              <p>Year: {carData.year}</p>
              <p>Mileage: {carData.mileage} kilometers</p>
              <p>License Plate: {carData.licensePlate}</p>
              <p>Category: {carData.category.categoryId}</p>
              <p>Price per Day: {carData.pricePerDay} $</p>
            </div>
            <div className="flex items-end justify-start mt-2">
              <div>
                <Link
                  className="block rounded text-orange-950 px-8 py-3 bg-orange-400 hover:bg-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-40 text-center"
                  href={`${params.carId}/reserva`}
                >
                  Reservar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default page;
