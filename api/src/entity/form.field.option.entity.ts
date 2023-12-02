import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormFieldEntity } from './form.field.entity'

@Entity({ name: 'form_field_option' })
export class FormFieldOptionEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormFieldEntity, field => field.options)
  public field: FormFieldEntity

  @Column({ nullable: true })
  public key?: string

  @Column({ nullable: true })
  public title?: string

  @Column()
  public value: string
}
