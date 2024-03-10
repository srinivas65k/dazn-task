import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MoviesModule } from './movies/movies.module';
async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Movie Module')
    .setDescription('Welcome to Movie Module')
    .setVersion('1.0.0')
    .addTag('')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    include: [AppModule, MoviesModule],
  });
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Movie Module',
    swaggerOptions: {
      persistAuthorization: true,
    },
  };
  SwaggerModule.setup('/swagger', app, document, customOptions);
  app.enableShutdownHooks();
  await app.listen(3000);
}
bootstrap();
