import {
  IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class ProjectDTO {
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
}
