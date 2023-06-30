import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CarEntity } from './entities/car.entity';

@Controller('cars')
@ApiTags('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  @ApiCreatedResponse({ type: CarEntity })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  @ApiOkResponse({ type: CarEntity, isArray: true })
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CarEntity })
  async findOne(@Param('id') id: string) {
    const car = await this.carsService.findOne(id);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  @Patch(':id')
  @ApiOkResponse({ type: CarEntity })
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CarEntity })
  remove(@Param('id') id: string) {
    return this.carsService.remove(id);
  }
}
