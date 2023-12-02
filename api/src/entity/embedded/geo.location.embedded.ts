import { Column } from 'typeorm'

export class GeoLocationEmbedded {
  @Column({ nullable: true })
  readonly country?: string

  @Column({ nullable: true })
  readonly city?: string
}
