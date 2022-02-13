import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { getClientIp } from 'request-ip'

export const IpAddress = createParamDecorator((data: string, ctx: ExecutionContext) => {
  let req

  if (ctx.getType<string>() === 'graphql') {
    req = GqlExecutionContext.create(ctx).getContext().req
  } else {
    req = ctx.switchToHttp().getRequest()
  }

  if (req.clientIp) {
    return req.clientIp
  }

  return getClientIp(req)
})
