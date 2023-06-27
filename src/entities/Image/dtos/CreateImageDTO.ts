import { IsNotEmpty, IsNumber, Min, Max, Matches } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Matches(/\.(jpg|jpeg|png|webp|avif|gif|svg)$/, {
    message: 'Invalid image format!',
  })
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0.1)
  @Max(1)
  compress: number;
}
