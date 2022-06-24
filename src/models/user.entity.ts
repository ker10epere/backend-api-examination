import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
