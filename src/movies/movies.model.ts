import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MoviesDocument = Movies & Document;

@Schema()
export class Movies {
  @Prop()
  @ApiProperty({ required: true })
  name: string;

  @Prop()
  @ApiProperty({ required: true })
  genre: string;

  @Prop()
  @ApiProperty({ required: true })
  rating: number;

  @Prop()
  @ApiProperty({ required: true })
  streamlink: string;
}

export const MoviesSchema = SchemaFactory.createForClass(Movies);
