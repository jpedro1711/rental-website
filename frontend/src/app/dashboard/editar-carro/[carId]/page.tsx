'use client';
import { Car, Category, Make } from '@/app/globals/global';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';
import React, { FormEvent, useEffect, useState } from 'react';

const page = ({ params }: { params: { carId: string } }) => {
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
      .put(`http://localhost:8080/cars/${params.carId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
      .get(`http://localhost:8080/cars/${params.carId}`)
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
  }, []);

  useEffect(() => {
    console.log(carData);
  }, [carData]);

  if (categories == null || makes == null || carData == null)
    return 'Carregando...';
  return (
    <div>
      <div>
        Cadastro de carros
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="model">
              Model
              <input
                value={model}
                type="text"
                id="model"
                onChange={(e) => setModel(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="year">
              Year
              <input
                value={year}
                type="text"
                id="year"
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="img">
              Image URL
              <input
                value={image}
                type="text"
                id="img"
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="Mileage">
              Mileage
              <input
                value={mileage}
                type="text"
                id="Mileage"
                onChange={(e) => setMileage(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="licensePlate">
              License Plate
              <input
                value={licensePlate}
                type="text"
                id="licensePlate"
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label htmlFor="price">
              Price per day
              <input
                value={price}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
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
          <div>
            Make:
            <select
              id="make"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-500"
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default page;
