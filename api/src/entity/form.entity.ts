import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { AnalyticsEmbedded } from './embedded/analytics.embedded'
import { DesignEmbedded } from './embedded/design.embedded'
import { FormFieldEntity } from './form.field.entity'
import { FormHookEntity } from './form.hook.entity'
import { FormNotificationEntity } from './form.notification.entity'
import { PageEntity } from './page.entity'
import { SubmissionEntity } from './submission.entity'
import { UserEntity } from './user.entity'
import { VisitorEntity } from './visitor.entity'

@Entity({ name: 'form' })
export class FormEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public title: string

  @Column({ length: 10 })
  public language: string

  @Column(() => AnalyticsEmbedded)
  public analytics: AnalyticsEmbedded = new AnalyticsEmbedded()

  @OneToMany(() => VisitorEntity, visitor => visitor.form)
  public visitors: VisitorEntity[]

  @OneToMany(() => SubmissionEntity, submission => submission.form)
  public submissions: SubmissionEntity[]

  @OneToMany(() => FormFieldEntity, field => field.form, { eager: true, orphanedRowAction: 'delete', cascade: true })
  public fields: FormFieldEntity[]

  @OneToMany(() => FormHookEntity, field => field.form, { eager: true, orphanedRowAction: 'delete', cascade: true })
  public hooks: FormHookEntity[]

  @ManyToOne(() => UserEntity, { eager: true })
  public admin: UserEntity

  @ManyToOne(() => PageEntity, { eager: true, cascade: true })
  public startPage: PageEntity;

  @ManyToOne(() => PageEntity, { eager: true, cascade: true })
  public endPage: PageEntity;

  @OneToMany(() => FormNotificationEntity, notification => notification.form, { eager: true, orphanedRowAction: 'delete', cascade: true })
  public notifications: FormNotificationEntity[]

  @Column()
  public showFooter: boolean;

  @Column()
  public isLive: boolean;

  @Column({ default: false })
  public anonymousSubmission: boolean;

  @Column(() => DesignEmbedded)
  public design: DesignEmbedded = new DesignEmbedded();

  @CreateDateColumn()
  public created: Date

  @UpdateDateColumn()
  public lastModified: Date

  constructor(partial?: Partial<FormEntity>) {
    if (partial) {
      Object.assign(this, partial)
    }
  }
}
