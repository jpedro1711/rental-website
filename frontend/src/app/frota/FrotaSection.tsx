'use client';
import axios from 'axios';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';

interface Make {
  name: string;
}

interface Category {
  categoryId: string;
  name: string;
}

interface Car {
  carId: number;
  make: Make;
  model: string;
  year: number;
  imageUrl: string;
  mileage: number;
  licensePlate: string;
  category: Category;
  pricePerDay: number;
}

const FrotaSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [carsState, setCarsState] = useState<Car[]>([]);
  const [filteredCarsState, setFilteredCarsState] = useState<Car[]>([]);
  const [noResults, setNoResults] = useState(false);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    const category = categoriesData.find((c) => c.categoryId === value);
    setSelectedCategory(category);
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/cars')
      .then((res) => {
        const data = res.data;
        setCarsState(data);
        setFilteredCarsState(data);
      })
      .catch((error) => {
        console.error('Error fetching cars:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => {
        const data = res.data;
        setCategoriesData(data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory && carsState) {
      const filteredCars = carsState.filter(
        (car) => car.category.categoryId === selectedCategory.categoryId
      );
      setFilteredCarsState(filteredCars);
      setNoResults(filteredCars.length === 0);
    } else {
      setFilteredCarsState(carsState);
      setNoResults(false);
    }
  }, [selectedCategory, carsState]);

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
          value={selectedCategory?.categoryId || ''}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
        >
          <option value="">All</option>
          {categoriesData.map((category) => (
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
        {filteredCarsState.map((car) => (
          <div key={car.carId} className="bg-white rounded-lg shadow-md p-6">
            <img
              src={car.imageUrl}
              alt={car.model}
              className="w-full h-64 object-cover object-center mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{`${car.make.name} ${car.model}`}</h2>
            <p className="text-gray-600">Year: {car.year}</p>
            <p className="text-gray-600">Mileage: {car.mileage} kilometers</p>
            <p className="text-gray-600">License Plate: {car.licensePlate}</p>
            <p className="text-gray-600">Category: {car.category.name}</p>
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
