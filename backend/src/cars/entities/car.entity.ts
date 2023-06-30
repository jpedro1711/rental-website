import { Car } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CarEntity implements Car {
  @ApiProperty()
  carId: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  mileage: number;

  @ApiProperty()
  licensePlate: string;

  @ApiProperty()
  pricePerDay: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
