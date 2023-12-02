import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import handlebars from 'handlebars'
import { PinoLogger } from 'nestjs-pino'
import { lastValueFrom } from 'rxjs'
import { serializeError } from 'serialize-error'
import { SubmissionEntity } from '../../entity/submission.entity'

@Injectable()
export class SubmissionHookService {
  constructor(
    private httpService: HttpService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(this.constructor.name)
  }

  public async process(submission: SubmissionEntity): Promise<void> {
    await Promise.all(submission.form.hooks.map(async (hook) => {
      if (!hook.enabled) {
        return
      }

      try {
        const response = await lastValueFrom(this.httpService.post(
          hook.url,
          this.format(submission, hook.format)
        ))

        this.logger.info({
          submission: submission.id,
          form: submission.formId,
          webhook: hook.url,
        }, 'sent hook')
      } catch (e) {
        this.logger.error({
          submission: submission.id,
          form: submission.formId,
          webhook: hook.url,
          error: serializeError(e),
        }, 'failed to post webhook')
        throw e
      }
    }))
  }

  private format(submission: SubmissionEntity, format?: string): any {
    const fields = {}
    submission.form.fields.forEach((field) => {
      fields[field.id] = field
    })

    const data = {
      form: submission.form.id,
      submission: submission.id,
      created: submission.created,
      lastModified: submission.lastModified,
      fields: submission.fields.map((submissionField) => {
        return {
          field: submissionField.field.id,
          slug: submissionField.field.slug || null,
          default_value: submissionField.field.defaultValue,
          content: submissionField.content,
        }
      }),
    }

    if (!format) {
      return data
    }

    return JSON.parse(handlebars.compile(format)(data))
  }
}
