import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormEntity } from '../../entity/form.entity'

export class FormStatisticService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>
  ) {
  }

  async getTotal(): Promise<number> {
    return await this.formRepository.count();
  }
}
