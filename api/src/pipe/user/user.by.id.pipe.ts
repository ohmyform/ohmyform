import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { UserEntity } from '../../entity/user.entity'
import { IdService } from '../../service/id.service'
import { UserService } from '../../service/user/user.service'

@Injectable()
export class UserByIdPipe implements PipeTransform<string, Promise<UserEntity>> {
  constructor(
    private readonly userService: UserService,
    private readonly idService: IdService,
  ) {
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<UserEntity> {
    const id = this.idService.decode(value)

    return await this.userService.findById(id)
  }
}
