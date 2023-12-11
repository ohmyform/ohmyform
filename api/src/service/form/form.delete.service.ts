import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'
import { VisitorEntity } from '../../entity/visitor.entity'
import { SubmissionDeleteService } from '../submission/submission.delete.service'

@Injectable()
export class FormDeleteService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    private readonly submissionDelete: SubmissionDeleteService,
    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {
  }

  async delete(id: number): Promise<void> {
    const submissions = await this.submissionRepository.find({
      form: {
        id,
      },
    })

    await Promise.all(
      submissions.map(submission => this.submissionDelete.delete(submission.id)),
    )
    await this.visitorRepository.delete({
      form: {
        id,
      },
    })

    await this.formRepository.delete({
      id,
    })
  }
}
