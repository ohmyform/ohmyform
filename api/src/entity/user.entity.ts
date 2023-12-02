import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { rolesType } from '../config/roles'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ nullable: true })
  public firstName?: string

  @Column({ nullable: true })
  public lastName?: string

  @Column({ length: 255, unique: true })
  public email: string

  @Column('boolean', { default: false })
  public emailVerified = false

  @Column({ length: 255, unique: true })
  public username: string

  @Column()
  public passwordHash: string

  @Column({ nullable: true })
  public salt: string

  @Column()
  public provider: string

  @Column({ type: 'simple-array' })
  public roles: rolesType

  @Column()
  public language: string

  @Column({ nullable: true })
  public resetPasswordToken?: string

  @Column({ nullable: true })
  public resetPasswordExpires?: Date

  @Column({ nullable: true })
  public token?: string

  @Column({ nullable: true })
  public apiKey?: string

  @CreateDateColumn()
  public created: Date

  @UpdateDateColumn()
  public lastModified: Date
}
