import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { SubmissionEntity } from '../../entity/submission.entity'

export class SubmissionStatisticService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
  ) {
  }

  async getTotal(): Promise<number> {
    return await this.submissionRepository.count();
  }
}
