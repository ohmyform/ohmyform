import { NestApplicationOptions, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import cors from 'cors'
import { Logger } from 'nestjs-pino'
import { AppModule } from './app.module'

void (async () => {
  const options: NestApplicationOptions =  {
    bufferLogs: true,
  }

  const app = await NestFactory.create(AppModule, options)
  app.useLogger(app.get(Logger))
  app.useGlobalPipes(new ValidationPipe({
    disableErrorMessages: false,
    transform: true,
  }))
  app.enableCors({origin: '*'})
  app.getHttpAdapter().options('*', cors())

  await app.listen(process.env.PORT || 4100);
})()
