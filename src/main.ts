import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableCors({
    origin: true, // Cho phép tất cả các domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true, // Cho phép gửi cookies
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });


  const config = new DocumentBuilder()
    .setTitle('G-SOCRES')
    .setDescription('API documentation for G-SOCRES')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  // Start server
  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
