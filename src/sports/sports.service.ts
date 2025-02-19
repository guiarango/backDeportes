import { Injectable } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';

import { Sport } from './entities/sport.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SportsService {
  private readonly default_limit: number;
  private readonly default_page: number;

  constructor(
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
    private readonly configService: ConfigService,
  ) {
    this.default_limit = configService.get<number>('defaultLimit');
    this.default_page = configService.get<number>('defaultPage');
  }
  async create(createSportDto: CreateSportDto) {
    try {
      const sport = await this.sportModel.create(createSportDto);

      return sport;
    } catch (error) {
      this.handleError(error);
    }
  }

  findAll() {
    return `This action returns all sports`;
  }

  findOne(id: string) {
    return `This action returns a #${id} sport`;
  }

  update(id: string, updateSportDto: UpdateSportDto) {
    return `This action updates a #${id} sport`;
  }

  remove(id: string) {
    return `This action removes a #${id} sport`;
  }

  handleError(error: any) {
    console.log(error);
    throw new Error(`[Unknown Error] ${error.message}`);
  }
}
