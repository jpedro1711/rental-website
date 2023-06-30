import { Module } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CarsController } from './cars.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  imports: [PrismaModule],
})
export class CarsModule {}
