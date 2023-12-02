import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormCreateInput } from '../../dto/form/form.create.input'
import { FormEntity } from '../../entity/form.entity'
import { PageEntity } from '../../entity/page.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormPageCreateService } from './form.page.create.service'

@Injectable()
export class FormCreateService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    private readonly formPageCreateService: FormPageCreateService,
  ) {
  }

  async create(admin: UserEntity, input: FormCreateInput): Promise<FormEntity> {
    const form = new FormEntity()

    form.title = input.title
    form.isLive = Boolean(input.isLive)
    form.showFooter = Boolean(input.showFooter)
    form.anonymousSubmission = Boolean(input.anonymousSubmission)
    form.language = input.language || 'en'
    form.design.layout = input.layout


    form.endPage = this.formPageCreateService.create(input.endPage)
    form.startPage = this.formPageCreateService.create(input.startPage)

    form.admin = admin

    return await this.formRepository.save(form)
  }

}

