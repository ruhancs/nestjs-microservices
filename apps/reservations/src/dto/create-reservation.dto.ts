import { Type } from 'class-transformer';
import { IsDate, IsDefined, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateChargeDto } from '@app/common';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  // @IsString()
  // @IsNotEmpty()
  // placeId: string;

  @IsDefined()
  @IsNotEmpty()
  @ValidateNested() // validar as propiedades de CardDto
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto;
}
