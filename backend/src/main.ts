import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   // CORS
   app.enableCors();

   // Swagger documentation
   const config = new DocumentBuilder()
     .setTitle('lectureLens_annam-ai API')
     .setDescription('API')
     .setVersion('1.0')
     .addBearerAuth()
     .build();
   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);
 
   const port = process.env.PORT || 3000;
   await app.listen(port);
   console.log(`Application running on: http://localhost:${port}`);
   console.log(`Swagger documentation: http://localhost:${port}/api`);
}
bootstrap();
