import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from './image.model';

@Injectable()
export class ImageRepository {
  constructor(
    @InjectModel('Image') private readonly imageModel: Model<Image>,
  ) {}

  async create(image: Image): Promise<Image> {
    const newImage = new this.imageModel(image);
    return newImage.save();
  }
}
