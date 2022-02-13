import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm'
import { DeviceEmbedded } from './embedded/device.embedded'
import { GeoLocationEmbedded } from './embedded/geo.location.embedded'
import { FormEntity } from './form.entity'
import { SubmissionFieldEntity } from './submission.field.entity'
import { UserEntity } from './user.entity'
import { VisitorEntity } from './visitor.entity'

@Entity({ name: 'submission' })
export class SubmissionEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @OneToMany(() => SubmissionFieldEntity, field => field.submission, { eager: true })
  public fields: SubmissionFieldEntity[]

  @ManyToOne(() => FormEntity, form => form.submissions, { eager: true })
  public form: FormEntity

  @RelationId('form')
  readonly formId: number

  @ManyToOne(() => VisitorEntity, visitor => visitor.submissions, { eager: true })
  public visitor: VisitorEntity

  @Column()
  public ipAddr: string

  @Column()
  public tokenHash: string

  @Column(() => GeoLocationEmbedded)
  public geoLocation: GeoLocationEmbedded = new GeoLocationEmbedded()

  @Column(() => DeviceEmbedded)
  public device: DeviceEmbedded = new DeviceEmbedded()

  @Column({ type: 'numeric' })
  public timeElapsed: number

  @Column({ type: 'numeric' })
  public percentageComplete: number

  @ManyToOne(() => UserEntity, { eager: true })
  public user?: UserEntity

  @CreateDateColumn()
  public created: Date

  @UpdateDateColumn()
  public lastModified: Date
}
