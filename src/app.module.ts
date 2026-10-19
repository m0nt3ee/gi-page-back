import { Module } from '@nestjs/common';
import { StatusController } from 'src/modules/status/status.controller';
import { ArticlesModule } from 'src/modules/articles/articles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ArticlesModule, ConfigModule.forRoot()],
  controllers: [StatusController],
})
export class AppModule {}
