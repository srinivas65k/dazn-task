import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Movies, MoviesDocument } from './movies.model';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movies.name) private movies: mongoose.Model<MoviesDocument>,
  ) {}

  async create(movies: Movies): Promise<Movies> {
    return this.movies.create(movies);
  }

  async findAll(): Promise<Movies[]> {
    return this.movies.find();
  }

  async search(filter): Promise<Movies[]> {
    console.log(filter);
    return this.movies.find({
      $or: [
        { name: { $regex: new RegExp(filter, 'i') } },
        { genre: { $regex: new RegExp(filter, 'i') } },
      ],
    });
  }

  async update(id: string, movies: Movies): Promise<Movies> {
    return this.movies.findByIdAndUpdate(id, movies, { new: true });
  }

  async deleteOne(id: string): Promise<Movies> {
    return this.movies.findOneAndDelete({ _id: id });
  }
}
