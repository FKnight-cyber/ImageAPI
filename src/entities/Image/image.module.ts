import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageController } from './image.controller';
import { ImageSchema } from './image.model';
import { ImageService } from './image.service';
import { ImageRepository } from './image.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
  ],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
})
export class ImageModule {}
