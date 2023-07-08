'use client';

import React, { useState } from 'react';
import '../app/styles.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SectionHome = () => {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  async function handleSearch() {
    const response = await axios.get(
      `http://localhost:8080/cars/name/${inputValue}`
    );
    const [result] = response.data;
    if (!result) {
      alert('Infelizmente, esse carro não está em nossa frota');
      setInputValue('');
      return;
    }
    const url = `frota/${result.carId}`;
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
