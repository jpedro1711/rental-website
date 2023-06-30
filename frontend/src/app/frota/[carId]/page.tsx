import Footer from '@/components/Footer';
import React from 'react';
import Link from 'next/link';
import LinkToFrota from './reserva/LinkToFrota';

const page = ({ params }: { params: { carId: string } }) => {
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

  // Encontre o veículo com base no carId
  const selectedCar = cars.find((car) => car.carId === Number(params.carId));

  if (!selectedCar) {
    return <div>Veículo não encontrado</div>;
  }

  const { make, model, year, mileage, licensePlate, categoryId, pricePerDay } =
    selectedCar;

  const category = categories.find(
    (category) => category.categoryId === categoryId
  );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <LinkToFrota />

        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 my-8 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={selectedCar.imageUrl}
              alt={selectedCar.model}
              className="w-full h-96 object-cover object-center mb-4 rounded-lg shadow-md"
            />
          </div>
          <div className="h-96 w-full md:w-1/2 pl-8 flex flex-col justify-start md:justify-between">
            <div className="mt-2">
              <h1 className="text-2xl font-bold mb-2">{`${make} ${model}`}</h1>
              <p>Year: {year}</p>
              <p>Mileage: {mileage} kilometers</p>
              <p>License Plate: {licensePlate}</p>
              <p>Category: {category?.name}</p>
              <p>Price per Day: {pricePerDay} $</p>
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
