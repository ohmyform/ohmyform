import { MailerModule } from '@nestjs-modules/mailer'
import { HttpModule } from '@nestjs/axios'
import { RequestMethod } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import crypto from 'crypto'
import { Request } from 'express-serve-static-core'
import { IncomingHttpHeaders } from 'http'
import { ConsoleModule } from 'nestjs-console'
import { LoggerModule, Params as LoggerModuleParams } from 'nestjs-pino'
import { join } from 'path'
import { serializeError } from 'serialize-error'
import { entities } from './entity'

export const LoggerConfig: LoggerModuleParams = {
  pinoHttp: {
    level: process.env.CLI ? 'warn' : process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    serializers: {
      error: serializeError,
    },
    transport: process.env.NODE_ENV !== 'production' || process.env.CLI  ? {
      options: {
        ignore: 'req,res,pid,hostname',
        translateTime: true,
      },
      target: 'pino-pretty',
    } : undefined,
  },
  exclude: [
    {
      method: RequestMethod.ALL,
      path: '_health',
    },
    {
      method: RequestMethod.ALL,
      path: 'favicon.ico',
    },
  ],
}

export const imports = [
  ConsoleModule,
  HttpModule.register({
    timeout: 5000,
    maxRedirects: 10,
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    exclude: ['/graphql'],
  }),
  ConfigModule.forRoot({
    load: [
      () => {
        return {
          LOCALES_PATH: join(process.cwd(), 'locales'),
          SECRET_KEY: process.env.SECRET_KEY || crypto.randomBytes(20).toString('hex'),
        }
      },
    ],
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): JwtModuleOptions => ({
      secret: configService.get<string>('SECRET_KEY'),
      signOptions: {
        expiresIn: '4h',
      },
    }),
  }),
  LoggerModule.forRoot(LoggerConfig),
  GraphQLModule.forRoot({
    debug: process.env.NODE_ENV !== 'production',
    definitions: {
      outputAs: 'class',
    },
    sortSchema: true,
    introspection: process.env.NODE_ENV !== 'production',
    playground: process.env.NODE_ENV !== 'production',
    installSubscriptionHandlers: true,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    // to allow guards on resolver props https://github.com/nestjs/graphql/issues/295
    fieldResolverEnhancers: [
      'guards',
      'interceptors',
    ],
    resolverValidationOptions: {

    },
    context: ({ req, connection }) => {
      if (!req && connection) {
        const headers: IncomingHttpHeaders = {}

        Object.keys(connection.context).forEach(key => {
          headers[key.toLowerCase()] = connection.context[key]
        })

        return {
          req: {
            headers,
          } as Request,
        }
      }

      return { req }
    },
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
      const type: any = configService.get<string>('DATABASE_DRIVER', 'sqlite')
      let migrationFolder: string

      switch (type) {
        case 'cockroachdb':
        case 'postgres':
          migrationFolder = 'postgres'
          break

        case 'mysql':
        case 'mariadb':
          migrationFolder = 'mariadb'
          break

        case 'sqlite':
          migrationFolder = 'sqlite'
          break

        default:
          throw new Error('unsupported driver')
      }

      return ({
        name: 'ohmyform',
        synchronize: false,
        type,
        url: configService.get<string>('DATABASE_URL'),
        database: type === 'sqlite' ? configService.get<string>('DATABASE_URL', 'data.sqlite').replace('sqlite://', '') : undefined,
        ssl: configService.get<string>('DATABASE_SSL', 'false') === 'true' ? { rejectUnauthorized: false } : false,
        entityPrefix: configService.get<string>('DATABASE_TABLE_PREFIX', ''),
        logging: configService.get<string>('DATABASE_LOGGING', 'false') === 'true',
        entities,
        migrations: [`${__dirname}/**/migrations/${migrationFolder}/**/*{.ts,.js}`],
        migrationsRun: configService.get<boolean>('DATABASE_MIGRATE', true),
        migrationsTransactionMode: 'each',
      })
    },
  }),
  TypeOrmModule.forFeature(entities),
  MailerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: configService.get<string>('MAILER_URI', 'smtp://localhost:1025'),
      defaults: {
        from: configService.get<string>('MAILER_FROM', 'OhMyForm <no-reply@localhost>'),
      },
    }),
  }),
]
