'use client';
import { Category, Make } from '@/app/globals/global';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useEffect, useState } from 'react';

const page = () => {
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

  useEffect(() => {
    axios
      .get('http://localhost:8080/categories')
      .then((res) => setCategories(res.data))
      .catch((e) => alert('error fetching categories'));
    const { rentalAuthToken: token } = parseCookies();
    axios
      .get('http://localhost:8080/makes', {
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
  });

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
        'http://localhost:8080/cars',
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
        alert('Erro ao cadastrar veículo');
      });

    console.log(data);
  }

  if (categories == null || makes == null) return 'loading...';
  return (
    <div>
      Cadastro de carros
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="model">
            {' '}
            Model
            <input
              type="text"
              id="model"
              onChange={(e) => setModel(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="year">
            {' '}
            Year
            <input
              type="text"
              id="year"
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="img">
            {' '}
            Image URL
            <input
              type="text"
              id="img"
              onChange={(e) => setImage(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="Mileage">
            {' '}
            Mileage
            <input
              type="text"
              id="Mileage"
              onChange={(e) => setMileage(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="licensePlate">
            {' '}
            License Plate
            <input
              type="text"
              id="licensePlate"
              onChange={(e) => setLicensePlate(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="price">
            {' '}
            Price per day
            <input
              type="text"
              id="price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div>
          Category:
          <select
            id="categoryFilter"
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
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
        <div>
          Make:
          <select
            id="make"
            onChange={(e) => setMake(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default page;
