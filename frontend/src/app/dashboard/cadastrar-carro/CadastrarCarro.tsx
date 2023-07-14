'use client';
import { Category, Make } from '@/app/globals/global';
import { AuthContext, AuthProvider } from '@/contexts/AuthContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useContext, useEffect, useState } from 'react';

const CadastrarCarro = () => {
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
      .post(
        'https://rental-api-production.up.railway.app/cars',
        {
          model: data.model,
          year: data.year,
          imageUrl: data.imageUrl,
          mileage: data.mileage,
          licensePlate: data.licensePlate,
          pricePerDay: data.pricePerDay,
          categoryId: data.categoryId,
          makeId: data.makeId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Veículo cadastrado com sucesso');
        router.push('/dashboard/listar-carros');
      })
      .catch((err) => {
        alert(
          'Erro ao cadastrar veículo, verifique se já não existe um veículo com essa placa'
        );
      });

    console.log(data);
  }

  if (carregando) return null;
  if (!carregando && !user) return null;
  if (categories == null || makes == null) return 'loading...';
  return (
    <div className="container mx-auto">
      <h1 className="container mx-auto">Cadastro de carros</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="model" className="block mb-2">
            Model
          </label>
          <input
            type="text"
            id="model"
            onChange={(e) => setModel(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block mb-2">
            Year
          </label>
          <input
            type="text"
            id="year"
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block mb-2">
            Image URL
          </label>
          <input
            type="text"
            id="img"
            onChange={(e) => setImage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mileage" className="block mb-2">
            Mileage
          </label>
          <input
            type="text"
            id="mileage"
            onChange={(e) => setMileage(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="licensePlate" className="block mb-2">
            License Plate
          </label>
          <input
            type="text"
            id="licensePlate"
            onChange={(e) => setLicensePlate(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">
            Price per day
          </label>
          <input
            type="text"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoryFilter" className="block mb-2">
            Category:
          </label>
          <select
            id="categoryFilter"
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
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
        <div className="mb-4">
          <label htmlFor="make" className="block mb-2">
            Make:
          </label>
          <select
            id="make"
            onChange={(e) => setMake(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a make</option>
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
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CadastrarCarro;
