import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateCarDto {
  @IsString()
  @Transform(({ value }): string =>
    typeof value === 'string' ? value.toUpperCase().trim() : value,
  )
  registrationNumber!: string;

  @IsString()
  make!: string;

  @IsString()
  model!: string;

  @IsInt()
  @Min(1886)
  year!: number;

  @IsInt()
  @Min(1)
  @Max(12)
  seats!: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean = true;
}
