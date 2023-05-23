import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}
