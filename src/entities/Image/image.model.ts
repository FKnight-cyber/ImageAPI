import { Schema, Document } from 'mongoose';

export interface Image extends Document {
  originalUrl: string;
  filename: string;
  thumbnailFilename: string;
  compressionFactor: number;
  metadata: Record<string, any>;
}

export const ImageSchema = new Schema<Image>({
  originalUrl: { type: String, required: true },
  filename: { type: String, required: true },
  thumbnailFilename: { type: String, required: true },
  compressionFactor: { type: Number, required: true },
  metadata: { type: Schema.Types.Mixed, required: true },
});
