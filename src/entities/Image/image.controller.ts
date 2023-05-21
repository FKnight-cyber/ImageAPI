import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';
import axios from 'axios';
import * as sharp from 'sharp';

@Controller('image')
export class ImageController {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  @Post('save')
  async saveImage(@Body() requestBody: { image: string; compress: number }) {
    const { image, compress } = requestBody;

    try {
      const response = await axios.get(image, { responseType: 'arraybuffer' });

      const originalFilename = image.substring(image.lastIndexOf('/') + 1);
      const originalPath = `${process.env.FOLDER_PATH}/${originalFilename}`;
      await sharp(response.data).toFile(originalPath);

      const thumbnailFilename = `${originalFilename
        .split('.')
        .slice(0, -1)
        .join('.')}_thumb.jpg`;
      const thumbnailPath = `${process.env.FOLDER_PATH}/${thumbnailFilename}`;

      const imageSharp = sharp(response.data);
      const metadata = await imageSharp.metadata();
      const { width, height } = metadata;
      const maxDimension = Math.max(width, height);
      const resizeOptions = {
        width: maxDimension >= 720 ? 720 : width,
        height: maxDimension >= 720 ? undefined : height,
      };
      await imageSharp.resize(resizeOptions).toFile(thumbnailPath);

      const exifMetadata = await sharp(response.data).metadata();
      const newImage = new this.imageModel({
        originalUrl: image,
        filename: originalFilename,
        thumbnailFilename,
        compressionFactor: compress,
        metadata: exifMetadata,
      });
      await newImage.save();

      const responseData = {
        localpath: {
          original: originalPath,
          thumb: thumbnailPath,
        },
        metadata: exifMetadata,
      };

      return responseData;
    } catch (error) {
      console.error('Error processing image:', error);
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
