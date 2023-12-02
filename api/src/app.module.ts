import { Module } from '@nestjs/common'
import { imports } from './app.imports'
import { providers } from './app.providers'
import { controllers } from './controller'

@Module({
  imports,
  controllers,
  providers,
})
export class AppModule {}
