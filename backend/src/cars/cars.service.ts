import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.car.findMany();
  }

  findOne(carId: string) {
    return this.prisma.car.findUnique({ where: { carId } });
  }

  async create(data: CreateCarDto) {
    const carExists = await this.prisma.car.findFirst({
      where: {
        licensePlate: data.licensePlate,
      },
    });

    if (carExists) {
      throw new Error('Car already exists');
    }

    const car = await this.prisma.car.create({
      data,
    });
    return car;
  }

  async update(carId: string, data: UpdateCarDto) {
    const carExists = await this.prisma.car.findFirst({
      where: {
        licensePlate: data.licensePlate,
      },
    });

    if (!carExists) {
      throw new Error('Car does not exists');
    }

    return await this.prisma.car.update({
      data,
      where: { carId },
    });
  }

  async remove(carId: string) {
    const carExists = await this.prisma.car.findFirst({
      where: {
        carId,
      },
    });

    if (!carExists) {
      throw new Error('Car does not exists');
    }

    return this.prisma.car.delete({ where: { carId } });
  }
}
