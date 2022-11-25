import { ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Blog service')
    .setDescription(`Simple blog-service`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  ConfigModule.forRoot({envFilePath: ".env"})
  app.useGlobalPipes(new ValidationPipe())
  const PORT = process.env.PORT || 5000
  await app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
  });

}
bootstrap();
