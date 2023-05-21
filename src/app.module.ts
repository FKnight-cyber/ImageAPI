import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageModule } from './entities/Image/image.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/imagesdatabase'),
    ImageModule,
  ],
})
export class AppModule {}
