import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class UserDTO {
  constructor(user?: UserDTO) {
    Object.assign(this, user)
  }

  id?: number

  @IsNotEmpty()
  firstName?: string

  @IsNotEmpty()
  lastName?: string

  @IsNotEmpty()
  address?: string

  @IsNotEmpty()
  postcode?: string

  @IsNotEmpty()
  @Matches(/(\+?\d{2}?\s?\d{3}\s?\d{3}\s?\d{4})|([0]\d{3}\s?\d{3}\s?\d{4})/)
  contactPhoneNumber?: string

  @IsEmail()
  @IsNotEmpty()
  email?: string

  @IsNotEmpty()
  username?: string

  @IsNotEmpty()
  password?: string

  token?: string
}
