import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUUserDto } from './dtos/createUser.dto';
import { UsersRepository } from './repository/users.repository';
import { GetUserDto } from './dtos/getUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUUserDto) {
    const emaiExist = await this.emailAlreadyExist(createUserDto);
    if (emaiExist) {
      throw new ConflictException('Email already registered, please do login');
    }
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async emailAlreadyExist(createUserDto: CreateUUserDto) {
    try {
      await this.usersRepository.findOne({ email: createUserDto.email });
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifyUSer(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException('Email or password is wrong');
    }

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
}
