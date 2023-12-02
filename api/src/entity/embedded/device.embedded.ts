import { Column } from 'typeorm'

export class DeviceEmbedded {
  @Column({ nullable: true })
  public language?: string

  @Column({ nullable: true })
  public type?: string

  @Column({ nullable: true })
  public name?: string
}
