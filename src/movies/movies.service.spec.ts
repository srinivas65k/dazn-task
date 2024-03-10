import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getModelToken } from '@nestjs/mongoose';
import { Movies } from './movies.model';
import { Model } from 'mongoose';

describe('MoviesService', () => {
  let service: MoviesService;
  let model: Model<Movies>;

  const mockRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getModelToken(Movies.name),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    model = module.get<Model<Movies>>(getModelToken(Movies.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll => should return an array of movies', async () => {
    const movie = {
      _id: 'ertyuiopoiuygfd',
      name: 'test',
      genre: 'horror',
      rating: 4,
      streamlink: 'fghj',
    };
    const movies = [movie];
    jest.spyOn(model, 'find').mockResolvedValue(movies);

    const result = await service.findAll();
    expect(result).toEqual(movies);
    expect(model.find).toBeCalled();
  });
});
