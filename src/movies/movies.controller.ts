// cats.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movies } from './movies.model';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { RolesGuard } from 'src/roles/role.gaurd';
import { UserRoles } from 'src/roles/user.enum';
import { Roles } from 'src/roles/role.decorator';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  async create(@Body() movies: Movies): Promise<Movies> {
    return this.moviesService.create(movies);
  }

  @Get()
  async findAll(): Promise<Movies[]> {
    return this.moviesService.findAll();
  }

  @Get('/search')
  @ApiQuery({
    name: 'p',
    description: 'Optional',
    required: false,
  })
  async search(@Query('p') search: string = ''): Promise<Movies[]> {
    // console.log("fghfyt", search)
    return this.moviesService.search(search);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() movie: Movies,
  ): Promise<Movies> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRoles.ADMIN)
  async delete(@Param('id') id: string): Promise<Movies> {
    return this.moviesService.deleteOne(id);
  }
}
