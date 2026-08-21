import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class GetCarsFilterDto {
  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }): boolean | string => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  available?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  limit?: number = 10;
}
