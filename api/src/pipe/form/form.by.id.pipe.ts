import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { FormEntity } from '../../entity/form.entity'
import { FormService } from '../../service/form/form.service'
import { IdService } from '../../service/id.service'

@Injectable()
export class FormByIdPipe implements PipeTransform<string, Promise<FormEntity>> {
  constructor(
    private readonly formService: FormService,
    private readonly idService: IdService,
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<FormEntity> {
    const id = this.idService.decode(value)

    return await this.formService.findById(id)
  }
}
