import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { FormEntity } from './form.entity'
import { FormFieldEntity } from './form.field.entity'

@Entity({ name: 'form_notification' })
export class FormNotificationEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.notifications)
  public form: FormEntity

  @Column({ nullable: true })
  public subject?: string

  @Column({ nullable: true })
  public htmlTemplate?: string

  @Column()
  public enabled: boolean

  @ManyToOne(() => FormFieldEntity)
  public fromField?: FormFieldEntity

  @ManyToOne(() => FormFieldEntity)
  public toField?: FormFieldEntity

  @Column({ nullable: true })
  public toEmail?: string

  @Column({ nullable: true })
  public fromEmail?: string
}
