import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Matches,
  IsOptional,
  MinLength,
  IsString,
} from 'class-validator'

export class AddUserDTO {
  constructor(user?: AddUserDTO) {
    Object.assign(this, user)
  }

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  firstName?: string

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  lastName?: string

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  address?: string

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  postcode?: string

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  @Matches(/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/)
  contactPhoneNumber?: string

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email?: string

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username?: string

  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  password?: string
}

export class EditUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id!: number

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  firstName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  lastName?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  address?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  postcode?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/)
  contactPhoneNumber?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @MinLength(2)
  email?: string

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password?: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  token?: string
}

export class DeleteUserDTO {
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  @Matches(/\d/)
  id!: number[]
}
