import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Hashids from 'hashids'

@Injectable()
export class IdService {
  private readonly hashids: Hashids

  constructor(
    readonly config: ConfigService
  ) {
    this.hashids = new Hashids(config.get('SECRET_KEY'), 6)
  }

  public encode(id: number): string {
    return this.hashids.encode([ id ])
  }

  public decode(raw: string): number {
    if (!this.hashids.isValidId(raw)) {
      throw new Error('invalid id passed')
    }

    const results: number[] = this.hashids.decode(raw) as number[]

    if (results[0] === undefined) {
      throw new Error('invalid id passed')
    }

    return results[0]
  }
}
