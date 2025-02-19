import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Sport } from 'src/sports/entities/sport.entity';
import { dummyDataSports } from '../data/dummyDataSports';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
  ) {}

  async execute() {
    await this.sportModel.deleteMany({});

    await this.sportModel.insertMany(dummyDataSports);

    return `Seed executed`;
  }
}
