import { Type } from 'class-transformer';
import {
  IsString, IsNotEmpty, MaxLength, IsDate, IsOptional,
} from 'class-validator';

export default class CreateTaskRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
    title: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
    description: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
    duedate?: Date;
}
