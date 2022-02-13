import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../../entity/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  isSuperuser(user: UserEntity): boolean {
    return user.roles.includes('superuser')
  }

  async find(start: number, limit: number, sort: any = {}): Promise<[UserEntity[], number]> {
    const qb = this.userRepository.createQueryBuilder('u')

    // TODO readd sort

    qb.skip(start)
    qb.take(limit)

    return await qb.getManyAndCount()
  }

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      username,
    })

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email,
    })

    if (!user) {
      throw new Error('no user found')
    }

    return user
  }

  async usernameInUse(username: string): Promise<boolean> {
    return 0 !== await this.userRepository.count({
      username,
    })
  }

  async emailInUse(email: string): Promise<boolean> {
    return 0 !== await this.userRepository.count({
      email,
    })
  }
}
