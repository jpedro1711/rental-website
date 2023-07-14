'use client';
import { Car, Category, Make } from '@/app/globals/global';
import { AuthContext } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

const EditarCarro = (params: any) => {
  const [carData, setCarData] = useState<Car | null>();
  const [categories, setCategories] = useState<Category[] | null>();
  const [makes, setMakes] = useState<Make[] | null>();
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');
  const [mileage, setMileage] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [make, setMake] = useState('');
  const router = useRouter();
  const { user, carregando } = useContext(AuthContext);

  useEffect(() => {
    console.log(carregando);
    const { rentalAuthToken: token } = parseCookies();
    if (!token) {
      router.push('/');
    }
    if (!carregando) {
      if (!user) {
        router.push('/');
      }
      if (user && user.roles != 'ADMIN') {
        router.push('/');
      }
    }
  }, [carregando]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = {
      model: model,
      year: year,
      imageUrl: image,
      mileage: Number(mileage),
      licensePlate: licensePlate,
      pricePerDay: Number(price),
      categoryId: category,
      makeId: make,
    };
    const { rentalAuthToken: token } = parseCookies();
    axios
      .put(
        `https://rental-api-production.up.railway.app/cars/${params.carId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Veículo atualizado com sucesso');
        router.push('/dashboard/listar-carros');
      })
      .catch((err) => {
        alert('Erro ao atualizar veículo');
      });

    console.log(data);
  }

  useEffect(() => {
    axios
      .get(`https://rental-api-production.up.railway.app/cars/${params.carId}`)
      .then((res) => {
        setCarData(res.data);
        setModel(res.data.model); // Atribui o valor inicial do model
        setYear(res.data.year); // Atribui o valor inicial do year
        setImage(res.data.imageUrl); // Atribui o valor inicial do image
        setMileage(res.data.mileage); // Atribui o valor inicial do mileage
        setLicensePlate(res.data.licensePlate); // Atribui o valor inicial do licensePlate
        setPrice(res.data.pricePerDay); // Atribui o valor inicial do price
        setCategory(res.data.category.categoryId); // Atribui o valor inicial do category
        setMake(res.data.make.makeId); // Atribui o valor inicial do make
      })
      .catch((err) => {
        alert('error fetching car data');
      });
    axios
      .get('https://rental-api-production.up.railway.app/categories')
      .then((res) => setCategories(res.data))
      .catch((e) => alert('error fetching categories'));
    const { rentalAuthToken: token } = parseCookies();
    if (token) {
      axios
        .get('https://rental-api-production.up.railway.app/makes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setMakes(res.data);
        })
        .catch((e) => {
          alert('error fetching makes');
        });
    }
  }, []);

  useEffect(() => {
    console.log(carData);
  }, [carData]);
  if (carregando) return null;
  if (!carregando && !user) return null;
  if (categories == null || makes == null || carData == null)
    return 'Carregando...';

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <a
            className="m-4 bg-gray-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            href="/dashboard/listar-carros"
          >
            Voltar
          </a>
        </div>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-4">Edição de carro</h1>
          <div className="mb-4 block">
            <label htmlFor="model" className="block mb-2">
              Model
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                value={model}
                type="text"
                id="model"
                onChange={(e) => setModel(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            <label htmlFor="year" className="block mb-2">
              Year
              <input
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                value={year}
                type="text"
                id="year"
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            <label htmlFor="img" className="block mb-2">
              Image URL
              <input
                value={image}
                type="text"
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                id="img"
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            <label htmlFor="Mileage" className="block mb-2">
              Mileage
              <input
                value={mileage}
                type="text"
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                id="Mileage"
                onChange={(e) => setMileage(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            <label htmlFor="licensePlate" className="block mb-2">
              License Plate
              <input
                value={licensePlate}
                type="text"
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                id="licensePlate"
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            <label htmlFor="price" className="block mb-2">
              Price per day
              <input
                value={price}
                type="text"
                className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                id="price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </div>
          <div className="mb-4 block">
            Category:
            <select
              id="categoryFilter"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            >
              <option value={carData.category.categoryId}>
                {carData.category.name}
              </option>
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
          <div className="mb-4 block">
            Make:
            <select
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
            >
              <option value={carData.make.makeId}>{carData.make.name}</option>
              {makes.map((make) => (
                <option
                  key={make.makeId}
                  value={make.makeId}
                  className="text-gray-800"
                >
                  {make.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarCarro;
