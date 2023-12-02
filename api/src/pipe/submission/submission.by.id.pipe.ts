import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { SubmissionEntity } from '../../entity/submission.entity'
import { IdService } from '../../service/id.service'
import { SubmissionService } from '../../service/submission/submission.service'

@Injectable()
export class SubmissionByIdPipe implements PipeTransform<string, Promise<SubmissionEntity>> {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly idService: IdService,
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<SubmissionEntity> {
    const id = this.idService.decode(value)

    return await this.submissionService.findById(id)
  }
}
