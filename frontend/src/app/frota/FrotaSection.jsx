'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const FrotaSection = () => {
  const categories = [
    {
      categoryId: 1,
      name: 'SUV',
    },
    {
      categoryId: 2,
      name: 'Compact',
    },
    {
      categoryId: 3,
      name: 'Sedan',
    },
    {
      categoryId: 4,
      name: 'Pickup Truck',
    },
  ];

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

  const [selectedCategory, setSelectedCategory] = useState('');
  const [carsState, setCarsState] = useState();
  const [noResults, setNoResults] = useState(false);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    const filtered = selectedCategory
      ? cars.filter((car) => car.categoryId === Number(selectedCategory))
      : cars;
    if (!filtered.length) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    setCarsState(filtered);
  }, [selectedCategory]);

  useEffect(() => {
    setNoResults(false);
    setCarsState(cars);
  }, []);

  return (
    <div className="p-5">
      <div className="mb-4">
        <label
          htmlFor="categoryFilter"
          className="mr-2 text-gray-800 font-semibold"
        >
          Category:
        </label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
        >
          <option value="">All</option>
          {categories.map((category) => (
            <option
              key={category.categoryId}
              value={category.categoryId}
              className="text-gray-800"
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {noResults && (
          <p className="bg-yellow-200 text-yellow-800 py-2 px-4 rounded-md">
            Não existem veículos para a categoria selecionada
          </p>
        )}
        {carsState &&
          carsState.map((car) => (
            <div key={car.carId} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={car.imageUrl}
                alt={car.model}
                className="w-full h-64 object-cover object-center mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{`${car.make} ${car.model}`}</h2>
              <p className="text-gray-600">Year: {car.year}</p>
              <p className="text-gray-600">Mileage: {car.mileage} kilometers</p>
              <p className="text-gray-600">License Plate: {car.licensePlate}</p>
              <p className="text-gray-600">
                Category:{' '}
                {
                  categories.find(
                    (category) => category.categoryId === car.categoryId
                  )?.name
                }
              </p>
              <p className="text-gray-600">Price per Day: {car.pricePerDay}</p>
              <div className="flex justify-start mt-2">
                <Link
                  className="rounded text-orange-950 px-8 py-3 bg-orange-400 hover:bg-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 w-40 text-center"
                  href={`/frota/${car.carId}`}
                >
                  Ver mais
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FrotaSection;
