import { Column } from 'typeorm'
import { ColorsEmbedded } from './colors.embedded'

export class DesignEmbedded {
  @Column(() => ColorsEmbedded)
    colors: ColorsEmbedded = new ColorsEmbedded()

  @Column({ nullable: true })
    font?: string

  @Column({ nullable: true })
    layout?: string
}
