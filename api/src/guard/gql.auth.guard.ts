import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { UserEntity } from '../entity/user.entity'
import { ContextCache } from '../resolver/context.cache'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    if (context.getType<any>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context);

      if (!ctx.getContext().cache) {
        ctx.getContext().cache = new ContextCache()
      }
      return ctx.getContext().req;
    }

    return context.switchToHttp().getRequest()
  }

  handleRequest<T = UserEntity>(err, user: T): T {
    if (err) {
      throw new Error('invalid token')
    }

    return user
  }
}
