import { IsNotEmpty, MinLength } from 'class-validator'
export class LoginDTO {
  @IsNotEmpty()
  @MinLength(4)
  username!: string

  @IsNotEmpty()
  @MinLength(3)
  password!: string
}
