import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { DeviceEmbedded } from './embedded/device.embedded'
import { GeoLocationEmbedded } from './embedded/geo.location.embedded'
import { FormEntity } from './form.entity'
import { SubmissionEntity } from './submission.entity'

@Entity({ name: 'form_visitor' })
export class VisitorEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => FormEntity, form => form.visitors)
  public form: FormEntity

  @OneToMany(() => SubmissionEntity, submission => submission.visitor)
  public submissions: SubmissionEntity[]

  @Column({ nullable: true })
  readonly referrer?: string

  @Column()
  readonly ipAddr: string

  @Column(() => GeoLocationEmbedded)
  public geoLocation: GeoLocationEmbedded = new GeoLocationEmbedded()

  @Column(() => DeviceEmbedded)
  public device: DeviceEmbedded = new DeviceEmbedded()

  @CreateDateColumn()
  public created: Date

  @UpdateDateColumn()
  public updated: Date
}
