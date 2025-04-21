import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Sport } from '../sports/entities/sport.entity';
import { dummyData } from '../data/dummyData';
import { User } from '../auth/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Sport.name) private readonly sportModel: Model<Sport>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async execute() {
    await this.deletAllData();
    await this.populateDatabases();

    return `Seed executed`;
  }

  async deletAllData() {
    await this.userModel.deleteMany({});
    await this.sportModel.deleteMany({});
  }

  async populateDatabases() {
    await this.populateUsers();
    await this.populateSports();
  }

  async populateUsers() {
    const users = [...dummyData.users];

    const usersHashed = users.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, 10),
    }));

    await this.userModel.insertMany(usersHashed);
  }
  async populateSports() {
    await this.sportModel.insertMany(dummyData.sports);
  }
}
