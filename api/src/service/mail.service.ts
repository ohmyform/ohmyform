import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import handlebars from 'handlebars'
import htmlToText from 'html-to-text'
import mjml2html from 'mjml'
import { PinoLogger } from 'nestjs-pino'
import { join } from 'path'
import { serializeError } from 'serialize-error'
import { defaultLanguage } from '../config/languages'

@Injectable()
export class MailService {
  constructor(
    private readonly nestMailer: MailerService,
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  async send(
    to: string,
    template: string,
    context: { [key: string]: any },
    forceLanguage?: string
  ): Promise<boolean> {
    const language = forceLanguage || this.configService.get('LOCALE', defaultLanguage)

    this.logger.debug({
      email: to,
      template,
    }, 'try to send email')

    try {
      const path = this.getTemplatePath(template, language)

      const html = mjml2html(
        handlebars.compile(
          fs.readFileSync(path).toString('utf-8')
        )(context),
        {
          minify: true,
        }
      ).html

      const text = htmlToText.htmlToText(html)

      const subject = this.extractSubject(html, template)

      await this.nestMailer.sendMail({ to, subject, html, text })
      this.logger.info({
        email: to,
        template,
        language,
      }, 'sent email')
    } catch (error) {
      this.logger.error({
        error: serializeError(error),
        email: to,
        template,
      }, 'failed to send email')
      return false
    }

    return true
  }

  private extractSubject(html: string, template: string): string {
    if (/<title>(.*?)<\/title>/gi.test(html)) {
      return /<title>(.*?)<\/title>/gi.exec(html)[1]
    }

    return template
  }

  private getTemplatePath(template: string, language: string): string {
    let templatePath = join(this.configService.get<string>('LOCALES_PATH'), language, 'mail', `${template}.mjml`)

    if (!fs.existsSync(templatePath)) {
      templatePath = join(this.configService.get<string>('LOCALES_PATH'), 'en', 'mail', `${template}.mjml`)
    }

    if (!fs.existsSync(templatePath)) {
      throw new Error('invalid template')
    }

    return templatePath
  }
}
