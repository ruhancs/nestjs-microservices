import Stripe from 'stripe';
import { CardDto } from './card.dto';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsDefined()
  @IsNotEmpty()
  @ValidateNested() // validar as propiedades de CardDto
  @Type(() => CardDto)
  card: CardDto;

  @IsNumber()
  amount: number;
}
