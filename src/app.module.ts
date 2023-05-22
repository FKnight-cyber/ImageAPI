import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './entities/Image/image.module';

import { config } from 'dotenv';
config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URL), ImageModule],
})
export class AppModule {}
