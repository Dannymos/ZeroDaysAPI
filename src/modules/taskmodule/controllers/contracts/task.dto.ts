import {
  IsBoolean,
  IsDate,
  IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

export default class TaskDTO {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty()
    id: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @ApiProperty()
    title: string;

  @IsString()
  @MaxLength(300)
  @IsOptional()
  @ApiPropertyOptional()
    description: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiPropertyOptional()
    duedate?: Date;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @Transform((value) => value === 'true', { toClassOnly: true })
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
    completed: boolean;

  @IsOptional()
  @ApiPropertyOptional()
    parent?: TaskDTO | null;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional()
    parentId?: string | null;
}
