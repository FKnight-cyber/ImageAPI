import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ImageService } from './image.service';
import errorHandler from '../../utils/errorTypes';
import console from 'console';
import { CreateUserDto } from './dtos/CreateImageDTO';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('save')
  async saveImage(@Body() requestBody: CreateUserDto) {
    const { image, compress } = requestBody;

    try {
      return await this.imageService.processAndSaveImage(image, compress);
    } catch (error) {
      console.error('Error processing image ', error);
      throw new HttpException(
        {
          errors: [
            {
              code: error.code,
              message: `${error}`,
            },
          ],
        },
        errorHandler(error.code),
      );
    }
  }
}
