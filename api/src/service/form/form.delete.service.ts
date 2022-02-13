import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'

@Injectable()
export class FormDeleteService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
  ) {
  }

  async delete(id: string): Promise<void> {
    await this.submissionRepository.createQueryBuilder('s')
      .delete()
      .where('s.form = :form', { form: id })
      .execute()

    await this.formRepository.createQueryBuilder('f')
      .delete()
      .where('f.id = :form', { form: id })
      .execute()
  }
}
