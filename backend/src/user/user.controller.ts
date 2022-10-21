import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Redirect} from '@nestjs/common';
import { UserService } from './user.service';
import {RegisterUserDto} from "./dtos/register-user.dto";
import {LoginUserDto} from "./dtos/login-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerUserDTO: RegisterUserDto) {
    return await this.userService.register(registerUserDTO)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDTO: LoginUserDto) {
    return await this.userService.login(loginUserDTO)
  }

  @Get('verify/:verifyLink')
  // @Redirect('https://dzen.ru/?yredirect=true')
  //TODO Need to do redirect to our client app
  async verify(@Param() params: {verifyLink: string}) {
    return await this.userService.verify(params.verifyLink)
  }

  @Get('test')
  async test() {
    return await this.userService.test()
  }
}
