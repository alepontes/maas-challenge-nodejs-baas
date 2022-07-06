import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('MaaS')
    .setDescription('API de gerenciamento de conta do MaaS')
    .setVersion('1.0')
    .addBearerAuth({
      description: 'Gere um token em `POST /auth/login`',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,

    },
    customSiteTitle: 'API Docs do MaaS',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, customOptions);

  await app.listen(3000);
}
bootstrap();
