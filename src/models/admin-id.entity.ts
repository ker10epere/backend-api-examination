import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class AdminId {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'user_id', unique: true })
  userId!: number
}
