import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm'
import { FormFieldEntity } from './form.field.entity'
import { SubmissionEntity } from './submission.entity'

export interface SubmissionFieldContent {
  [key: string]: string | string[] | number | number[] | boolean | boolean[]
}

@Entity({ name: 'submission_field' })
export class SubmissionFieldEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => SubmissionEntity, submission => submission.fields)
  public submission: SubmissionEntity

  @ManyToOne(() => FormFieldEntity, { eager: true })
  public field: FormFieldEntity

  @RelationId('field')
  readonly fieldId: number

  @Column()
  public type: string

  @Column('simple-json')
  public content: SubmissionFieldContent
}
