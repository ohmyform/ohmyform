import { Column } from 'typeorm'

export class ColorsEmbedded {
  @Column({ nullable: true })
  public background?: string

  @Column({ nullable: true })
  public question?: string

  @Column({ nullable: true })
  public answer?: string

  @Column({ nullable: true })
  public button?: string

  @Column({ nullable: true })
  public buttonActive?: string

  @Column({ nullable: true })
  public buttonText?: string
}
