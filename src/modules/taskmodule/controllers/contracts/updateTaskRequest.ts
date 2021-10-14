import { Type, Transform } from 'class-transformer';
import {
  IsString, IsNotEmpty, MaxLength, IsDate, IsUUID, IsBoolean, IsOptional,
} from 'class-validator';

export default class UpdateTaskRequest {
  @IsNotEmpty()
  @IsUUID()
    id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
    title: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
    description: string;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Transform((value) => value === 'true', { toClassOnly: true })
  @IsNotEmpty()
  @IsBoolean()
    completed: boolean;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
    duedate: Date;
}
