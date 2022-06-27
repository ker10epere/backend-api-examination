import { compare } from 'bcryptjs'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { generateHash } from '../commons/utils/hash.util'

@Entity('users')
export class User {
  constructor(user?: User) {
    Object.assign(this, user)
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Column({ nullable: true })
  firstName!: string

  @Column({ nullable: true })
  lastName!: string

  @Column({ nullable: true })
  address!: string

  @Column({ nullable: true })
  postcode!: string

  @Column({ nullable: true })
  contactPhoneNumber!: string

  @Column({ nullable: true })
  email!: string

  @Column({ nullable: true })
  username!: string

  @Column({ nullable: true })
  password!: string

  @Column('text', { nullable: true })
  token!: string

  async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.password)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword(password: string): Promise<void> {
    if (password || this.password)
      this.password = await generateHash(password || this.password)
  }
}
