import { Column } from 'typeorm'

export class AnalyticsEmbedded {
  @Column({ nullable: true })
  readonly gaCode?: string
}
