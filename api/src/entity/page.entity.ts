import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { PageButtonEntity } from './page.button.entity'

@Entity({ name: 'page' })
export class PageEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public show: boolean

  @Column({ nullable: true })
  public title?: string

  @Column({ type: 'text', nullable: true })
  public paragraph?: string

  @Column({ nullable: true })
  public buttonText?: string

  @OneToMany(() => PageButtonEntity, button => button.page, { eager: true, orphanedRowAction: 'delete', cascade: true })
  public buttons: PageButtonEntity[]
}
