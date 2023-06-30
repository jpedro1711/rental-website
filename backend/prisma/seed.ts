// prisma/seed.ts

import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // Criação dos carros
  const car1 = await prisma.car.create({
    data: {
      model: 'Car 1',
      year: 2020,
      imageUrl: 'https://example.com/car1.jpg',
      mileage: 10000,
      licensePlate: 'ABC123',
      pricePerDay: 50.99,
    },
  });
  console.log(car1);
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
