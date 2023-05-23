import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUUserDto } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { UserDocument } from './models/users.schema';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { CurrentUser } from '@app/common';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async createUser(@Body() createUSerDto: CreateUUserDto) {
    return this.userService.createUser(createUSerDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard) //retorna o user atraves do token no cookie
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
