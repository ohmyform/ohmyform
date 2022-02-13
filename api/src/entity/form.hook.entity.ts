import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormEntity } from './form.entity'

@Entity({ name: 'form_hook' })
export class FormHookEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.hooks)
  public form: FormEntity

  @Column()
  public enabled: boolean

  @Column()
  public url: string

  @Column({ nullable: true })
  public format?: string
}
