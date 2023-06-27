'use client';

import React, { useState } from 'react';
import '../app/styles.css';
import { useRouter } from 'next/navigation';

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

const SectionHome = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  function handleSearch() {
    const [result] = cars.filter((car) => car.model == inputValue);
    if (!result) {
      alert('Infelizmente, esse carro não está em nossa frota');
      setInputValue('');
      return;
    }
    const url = `/frota/${result.carId}`;
    router.push(url);
  }

  return (
    <div className="flex items-center justify-center h-screen background-image">
      <section>
        <div>
          <div className="flex items-center justify-center" id="search">
            <label htmlFor="car">
              <input
                type="text"
                name="car"
                id="car"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Procure o melhor veículo"
                className="rounded-l px-4 py-2 focus:outline-none"
              />
            </label>
            <button
              onClick={handleSearch}
              className="text-orange-950 rounded-r px-8 py-2 bg-orange-400 hover:bg-orange-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
            >
              Procurar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionHome;
