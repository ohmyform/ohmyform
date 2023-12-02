import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  isAdmin(form: FormEntity, user: UserEntity): boolean {
    if (!user) {
      return false
    }

    if (user.roles.includes('superuser')) {
      return true
    }

    return form.admin.id === user.id
  }

  async find(
    start: number,
    limit: number,
    sort: any = {},
    user?: UserEntity
  ): Promise<[FormEntity[], number]> {
    const qb = this.formRepository.createQueryBuilder('f')

    qb.leftJoinAndSelect('f.admin', 'a')

    if (user) {
      qb.where('f.admin = :user', { user: user.id })
    }

    // TODO readd sort
    this.logger.debug({
      sort,
    }, 'ignored sorting for submissions')

    qb.skip(start)
    qb.take(limit)

    return await qb.getManyAndCount()
  }

  async findById(id: number | string, existing?: FormEntity): Promise<FormEntity> {
    if (existing) return existing

    const form = await this.formRepository.findOne(id);

    if (!form) {
      throw new Error('no form found')
    }

    return form
  }
}
