import { Column } from 'typeorm'

export class RatingEmbedded {
  @Column({ nullable: true })
  readonly steps?: number

  @Column({ nullable: true })
  readonly shape?: string
}
