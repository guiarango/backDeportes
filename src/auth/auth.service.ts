import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Model } from 'mongoose';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { RefreshToken } from './entities/refreshToken.entity';

import { JwtPayload, JwtResponse } from './interfaces/jwt-payload.interface';
import { JsonResponse } from 'src/common/interfaces/json-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private readonly refreshTokenModel: Model<RefreshToken>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<JsonResponse<JwtResponse>> {
    try {
      const { password, ...userData } = createUserDto;

      const data = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      const user = data.toObject();
      delete user.password;

      const { token, refreshToken } = this.generateTokens({ id: user.id });

      const refreshTokenInfo = await this.refreshTokenModel.create({
        userId: user._id,
        token: bcrypt.hashSync(refreshToken, 10),
        createdAt: new Date(Date.now()),
        expiresAt: new Date(
          Date.now() +
            parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')),
        ),
      });

      return {
        ok: true,
        status: 200,
        message: 'User created succesfully',
        data: {
          ...user,
          token,
          refreshTokenId: refreshTokenInfo.id,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<JsonResponse<JwtResponse>> {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userModel.findOne(
        { email },
        '_id email password',
      );

      if (!user || !bcrypt.compareSync(password, user.password)) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      const { token, refreshToken } = this.generateTokens({ id: user.id });

      //there will be only one refreshToken per user because of account money security reasons, that way, in case someone steals the user's token and refreshToken, only by login, the user can log the other devices out
      await this.refreshTokenModel.deleteMany({
        userId: user.id,
      });

      const refreshTokenInfo = await this.refreshTokenModel.create({
        userId: user.id,
        token: bcrypt.hashSync(refreshToken, 10),
        createdAt: new Date(Date.now()),
        expiresAt: new Date(
          Date.now() +
            parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')),
        ),
      });

      return {
        ok: true,
        status: 200,
        message: 'User logged in succesfully',
        data: {
          ...user,
          token,
          refreshTokenId: refreshTokenInfo.id,
          refreshToken: refreshToken,
        },
      };
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async updateToken(request: Request): Promise<JsonResponse<JwtResponse>> {
    try {
      const { refreshTokenId, refreshToken: oldRefreshToken } = request.cookies;

      if (!refreshTokenId || !oldRefreshToken) {
        throw new UnauthorizedException('Missing refresh tokens cookies');
      }

      const user = await this.refreshTokenModel.findById(refreshTokenId);

      if (!user || !bcrypt.compareSync(oldRefreshToken, user.token)) {
        throw new UnauthorizedException('Credentials are not valid');
      }

      const { token, refreshToken: newRefreshToken } = this.generateTokens({
        id: user.id,
      });

      await this.refreshTokenModel.findByIdAndUpdate(
        { _id: refreshTokenId },
        {
          userId: user.id,
          token: bcrypt.hashSync(newRefreshToken, 10),
          createdAt: new Date(Date.now()),
          expiresAt: new Date(
            Date.now() +
              parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')),
          ),
        },
      );

      return {
        ok: true,
        status: 200,
        message: 'User logged in succesfully',
        data: {
          ...user,
          token,
          refreshTokenId,
          refreshToken: newRefreshToken,
        },
      };
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async logOutUser(userId: string): Promise<JsonResponse> {
    await this.refreshTokenModel.deleteMany({ userId });

    return {
      ok: true,
      status: 200,
      message: 'You have been logged out',
    };
  }

  private generateTokens(payload: JwtPayload) {
    const token = this.getJwtToken(payload);
    const refreshToken = this.getJwtRefreshToken(payload);

    return { token, refreshToken };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_TOKEN_EXPIRY'),
    });
  }
  private getJwtRefreshToken(payload: JwtPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: parseInt(this.configService.get('JWT_REFRESH_TOKEN_EXPIRY')),
    });
  }

  private errorHandler(error: any): never {
    if (error.code === 11000) throw new BadRequestException(error.errmsg);

    console.log(error);
    throw new InternalServerErrorException(`Please check server logs`);
  }
}
