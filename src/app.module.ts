import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './movies/movies.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './roles/jwt.strategy';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/', {
      user: 'admin',
      pass: 'admin',
      dbName: 'test',
    }),
    MoviesModule,
    PassportModule,
    JwtModule.register({
      secret: 'DAZN%%6264',
      signOptions: { expiresIn: '1d' },
    })
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
