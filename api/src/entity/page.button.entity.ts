import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { PageEntity } from './page.entity'

@Entity({ name: 'page_button' })
export class PageButtonEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @ManyToOne(() => PageEntity, page => page.buttons)
  public page: PageEntity

  @Column({ nullable: true })
  public url?: string

  @Column({ nullable: true })
  public action?: string

  @Column()
  public text: string

  @Column({ nullable: true })
  public bgColor?: string

  @Column({ nullable: true })
  public activeColor?: string

  @Column({ nullable: true })
  public color?: string
}
