import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Matches,
  IsOptional,
  MinLength,
  IsString,
  ArrayNotEmpty,
  IsArray,
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
  @Matches(/^(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})$/, {
    message:
      'phone number must be in the format of philippine numbers ex.(+63 9## ### #### | 09#########)',
  })
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
  @MinLength(2)
  firstName?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  lastName?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  address?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  postcode?: string

  @IsOptional()
  @IsString()
  @Matches(/^(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})$/, {
    message:
      'phone number must be in the format of philippine numbers ex.(+63 9## ### #### | 09#########)',
  })
  contactPhoneNumber?: string

  @IsOptional()
  @IsString()
  @IsEmail()
  @MinLength(2)
  email?: string

  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  password?: string

  @IsOptional()
  @IsString()
  @MinLength(2)
  token?: string
}

export class DeleteUserDTO {
  @IsArray()
  @ArrayNotEmpty({ always: true })
  @IsNotEmpty({ each: true })
  @IsNumber({}, { each: true })
  id!: number[]
}
