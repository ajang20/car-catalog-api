import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, ILike } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Car } from './entities/car.entity';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createCarDto: CreateCarDto) {
    try {
      const newCar = this.carRepository.create(createCarDto);
      return await this.carRepository.save(newCar);
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException(
          `A car with registration number ${createCarDto.registrationNumber} already exists`,
        );
      }
      throw new InternalServerErrorException(
        'Database Error: Unable to create car record',
      );
    }
  }

  async findAll(filterDTO: GetCarsFilterDto) {
    const { make, available, page = 1, limit = 10 } = filterDTO;

    const queryOPtions: FindManyOptions<Car> = {
      where: {},
      take: limit,
      skip: (page - 1) * limit,
    };
    if (make) {
      queryOPtions.where = { ...queryOPtions.where, make: ILike(`%${make}%`) };
    }

    if (available !== undefined) {
      queryOPtions.where = { ...queryOPtions.where, isAvailable: available };
    }

    return await this.carRepository.find(queryOPtions);
  }

  findOne(id: number) {
    return `This action returns a #${id} car`;
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return `This action updates a #${id} car`;
  }

  remove(id: number) {
    return `This action removes a #${id} car`;
  }
}
