import { Injectable } from '@nestjs/common';
import axios from 'axios';
import sharp from 'sharp';
import { Image } from './image.model';
import { ImageRepository } from './image.repository';

@Injectable()
export class ImageService {
  constructor(private readonly imageRepository: ImageRepository) {}

  async processAndSaveImage(imageUrl: string, compress: number): Promise<any> {
    try {
      const response = await axios.get(imageUrl, {
        responseType: 'arraybuffer',
      });

      const originalFilename = imageUrl.substring(
        imageUrl.lastIndexOf('/') + 1,
      );
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
      const resizeOptions = {
        width: width > height ? 720 : undefined,
        height: height > width ? 720 : undefined,
      };

      await imageSharp.resize(resizeOptions).toFile(thumbnailPath);

      const exifMetadata = await sharp(response.data).metadata();

      const newImage: Image = {
        originalUrl: imageUrl,
        filename: originalFilename,
        thumbnailFilename,
        compressionFactor: compress,
        metadata: exifMetadata,
      };

      await this.imageRepository.create(newImage);

      const responseData = {
        localpath: {
          original: originalPath,
          thumb: thumbnailPath,
        },
        metadata: exifMetadata,
      };

      return responseData;
    } catch (error) {
      console.error('Error processing image ', error);
      throw error;
    }
  }
}
