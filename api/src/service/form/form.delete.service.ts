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

  async delete(id: number): Promise<void> {
    await this.submissionRepository.delete({
      form: new FormEntity({ id }),
    })

    await this.formRepository.delete({
      id,
    })
  }
}
