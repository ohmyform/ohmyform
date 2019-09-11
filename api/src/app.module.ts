import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { MongooseModule } from '@nestjs/mongoose';
import { TypegooseModule } from 'nestjs-typegoose';
import { TerminusOptionsService } from './terminus-options.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from "./user/user.module"
import { FormModule } from "./form/form.module"
import { AuthModule } from './auth/auth.module';
import { MailModule } from "./mail/mail.module"
import { MailerModule } from "@nest-modules/mailer"

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/ohmyform'
const MAILER_URI = process.env.MAILER_URI || 'smtp://localhost:1025'

@Module({
  imports: [
    TypegooseModule.forRoot(MONGODB_URI, { useNewUrlParser: true }),
    MongooseModule.forRoot(MONGODB_URI),
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
    MailerModule.forRoot({
      transport: MAILER_URI,
      defaults: {
        from:'"OhMyForm" <noreply@ohmyform.com>',
      }
    }),
    UserModule,
    FormModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
