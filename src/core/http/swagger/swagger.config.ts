import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pack from '../../../../package.json';
import { INestApplication } from '@nestjs/common';

function createSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Backend API for blog')
    .setVersion(pack.version)
    .addServer('http://localhost', 'Local development')
    .setContact('m0nt3ee', '', '')
    .setLicense('Unlicense', 'https://opensource.org/licenses/Unlicense')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Enter your JWT token in the format: **Bearer &lt;token&gt;**',
      },
      'access-token',
    )
    .build();
}

export function configureSwagger(app: INestApplication): void {
  const config = createSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
