import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';

import {
  SetCookieInterceptor,
  ReadCookieInterceptor,
  DeleteCookieInterceptor,
} from './interceptors/cookie-interceptor';
import { AuthService } from './auth.service';
import { GetRawHeaders } from '../common/decorators/get-raw-headers.decorator';
import { Auth, GetUser, RoleProtected } from './decorators/';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ParseMongoIdPipe } from '../common/pipes/parse-mongo-id.pipe';
import { CreateUserDto, LoginUserDto, RefreshTokenDto } from './dto';
import { User } from './entities/user.entity';

import { ValidRoles } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(SetCookieInterceptor)
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @UseInterceptors(SetCookieInterceptor)
  @Post('login')
  loginUser(
    // @Res() response: Response,
    @Body() loginUserDto: LoginUserDto,
  ) {
    return this.authService.login(loginUserDto);
    // return this.authService.login(response, loginUserDto);
  }

  @UseInterceptors(ReadCookieInterceptor)
  @UseInterceptors(SetCookieInterceptor)
  @Post('refresh-token')
  refreshToken(@Req() request: Request) {
    return this.authService.updateToken(request);
  }

  @UseInterceptors(DeleteCookieInterceptor)
  @Delete('logout/:userId')
  logOutUser(@Param('userId', ParseMongoIdPipe) userId: string) {
    return this.authService.logOutUser(userId);
  }

  // @Get('check-status')
  // @Auth()
  // checkAuthStatus(@GetUser([]) user: User) {
  //   return this.authService.checkAuthStatus(user);
  // }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(
  //   @GetUser(['email', 'roles', 'fullName']) user,
  //   @GetRawHeaders() rawHeaders,
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {
  //   return {
  //     ok: true,
  //     message: 'Hola mundo provate',
  //     user,
  //     rawHeaders,
  //     headers,
  //   };
  // }

  // // @SetMetadata('roles', ['admin', 'super-user'])

  // @Get('private2')
  // @RoleProtected(ValidRoles.admin)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // testingPrivateRoute2(
  //   @GetUser(['email', 'roles', 'fullName']) user,
  //   @GetRawHeaders() rawHeaders,
  //   @Headers() headers: IncomingHttpHeaders,
  // ) {
  //   return {
  //     ok: true,
  //     message: 'Hola mundo provate2',
  //     user,
  //   };
  // }

  @Get('private3')
  @Auth(ValidRoles.admin)
  testingPrivateRoute3(
    @GetUser(['email', 'roles', 'fullName']) user,
    @GetRawHeaders() rawHeaders,
    @Headers() headers: IncomingHttpHeaders,
  ) {
    return {
      ok: true,
      message: 'Hola mundo provate2',
      user,
    };
  }
}
