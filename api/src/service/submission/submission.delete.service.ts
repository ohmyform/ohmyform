import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubmissionEntity } from '../../entity/submission.entity'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'

@Injectable()
export class SubmissionDeleteService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    @InjectRepository(SubmissionFieldEntity)
    private readonly fieldRepository: Repository<SubmissionFieldEntity>,
  ) {
  }

  async delete(id: number): Promise<void> {
    await this.fieldRepository.delete({
      submission: {
        id,
      },
    })
    await this.submissionRepository.delete(id)
  }
}
