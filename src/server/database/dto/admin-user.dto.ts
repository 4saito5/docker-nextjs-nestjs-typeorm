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

export class CreateAdminUsersDTO {
  // @IsNotEmpty()
  // @IsInt()
  // id: bigint;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  adminUserCode: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  adminLoginId: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 1000)
  password: string;

  @IsInt()
  role: number | null;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  regionCode: string;

  @IsString()
  @Length(1, 100)
  adminUserName: string;

  @IsString()
  @Length(1, 255)
  adminEmail: string;

  @IsString()
  @Length(1, 20)
  adminPhone: string;

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
