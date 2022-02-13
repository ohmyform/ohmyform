import { InjectRepository } from '@nestjs/typeorm'
import { PinoLogger } from 'nestjs-pino'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'
import { SubmissionEntity } from '../../entity/submission.entity'
import { SubmissionTokenService } from './submission.token.service'

export class SubmissionService {
  constructor(
    @InjectRepository(SubmissionEntity)
    private readonly submissionRepository: Repository<SubmissionEntity>,
    private readonly tokenService: SubmissionTokenService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(this.constructor.name)
  }

  async isOwner(submission: SubmissionEntity, token: string): Promise<boolean> {
    return this.tokenService.verify(token, submission.tokenHash)
  }

  async find(
    form: FormEntity,
    start: number,
    limit: number,
    sort: any = {}
  ): Promise<[SubmissionEntity[], number]> {
    const qb = this.submissionRepository.createQueryBuilder('s')

    qb.leftJoinAndSelect('s.fields', 'fields')

    qb.where('s.form = :form', { form: form.id })

    // TODO readd sort
    this.logger.debug({
      sort,
    }, 'ignored sorting for submissions')

    qb.skip(start)
    qb.take(limit)

    return await qb.getManyAndCount()
  }

  async findById(id: string): Promise<SubmissionEntity> {
    const submission = await this.submissionRepository.findOne(id);

    if (!submission) {
      throw new Error('no form found')
    }

    return submission
  }
}
