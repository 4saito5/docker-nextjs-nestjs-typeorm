import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  IsNotEmpty,
  IsString,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';

export class CreateAccessLogDTO {
  // @IsNotEmpty()
  // @IsInt()
  // id: bigint;

  @IsString()
  @Length(1, 100)
  logCode: string;

  @IsString()
  @Length(1, 100)
  regionCode: string;

  @IsString()
  @Length(1, 100)
  userCode: string;

  @IsBoolean()
  isAdmin: boolean;

  @IsString()
  @Length(1, 255)
  ip: string;

  @IsString()
  @Length(1, 3000)
  uri: string;

  @IsString()
  @Length(1, 10)
  method: string;

  @IsString()
  header: string;

  @IsString()
  @Length(1, 1000)
  userAgent: string;

  @IsString()
  request: string;

  @IsInt()
  statusCode: number;

  @IsString()
  response: string;

  @IsBoolean()
  isActive: boolean;

  // @IsDate()
  // createAt: Date;

  @IsString()
  @Length(1, 100)
  createdUser: string;

  @IsInt()
  createdChannel: number;

  // @IsDate()
  // updateAt: Date;

  @IsString()
  @Length(1, 100)
  updatedUser: string;

  @IsInt()
  updatedChannel: number;

  @IsDate()
  deletedAt: Date;
}
