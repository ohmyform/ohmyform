import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormUpdateInput } from '../../dto/form/form.update.input'
import { FormEntity } from '../../entity/form.entity'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { FormFieldLogicEntity } from '../../entity/form.field.logic.entity'
import { FormFieldOptionEntity } from '../../entity/form.field.option.entity'
import { FormHookEntity } from '../../entity/form.hook.entity'
import { FormNotificationEntity } from '../../entity/form.notification.entity'
import { PageButtonEntity } from '../../entity/page.button.entity'
import { PageEntity } from '../../entity/page.entity'
import { IdService } from '../id.service'
import { FormPageUpdateService } from './form.page.update.service'

@Injectable()
export class FormUpdateService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(FormFieldEntity)
    private readonly formFieldRepository: Repository<FormFieldEntity>,
    @InjectRepository(FormHookEntity)
    private readonly formHookRepository: Repository<FormHookEntity>,
    private readonly idService: IdService,
    private readonly pageService: FormPageUpdateService,
  ) {
  }

  async update(form: FormEntity, input: FormUpdateInput): Promise<FormEntity> {
    if (input.language !== undefined) {
      form.language = input.language
    }

    if (input.title !== undefined) {
      form.title = input.title
    }

    if (input.showFooter !== undefined) {
      form.showFooter = input.showFooter
    }

    if (input.anonymousSubmission !== undefined) {
      form.anonymousSubmission = input.anonymousSubmission
    }

    if (input.isLive !== undefined) {
      form.isLive = input.isLive
    }

    if (input.fields !== undefined) {
      form.fields = input.fields.map((nextField) => {
        let field = this.findByIdInList(
          form.fields,
          nextField.id,
          null
        )

        if (!field) {
          field = new FormFieldEntity()
          field.type = nextField.type
        }

        if (nextField.title !== undefined) {
          field.title = nextField.title
        }

        if (nextField.description !== undefined) {
          field.description = nextField.description
        }

        if (nextField.idx !== undefined) {
          field.idx = nextField.idx
        }

        if (nextField.disabled !== undefined) {
          field.disabled = nextField.disabled
        }

        if (nextField.required !== undefined) {
          field.required = nextField.required
        }

        if (nextField.defaultValue !== undefined) {
          field.defaultValue = nextField.defaultValue
        }

        if (nextField.slug !== undefined) {
          field.slug = nextField.slug
        }

        if (nextField.logic !== undefined) {
          field.logic = nextField.logic.map(nextLogic => {
            const logic = this.findByIdInList(
              field.logic,
              nextLogic.id,
              new FormFieldLogicEntity()
            )

            logic.field = field

            if (nextLogic.formula !== undefined) {
              logic.formula = nextLogic.formula
            }
            if (nextLogic.idx !== undefined) {
              logic.idx = nextLogic.idx
            }
            if (nextLogic.action !== undefined) {
              logic.action = nextLogic.action
            }
            if (nextLogic.visible !== undefined) {
              logic.visible = nextLogic.visible
            }
            if (nextLogic.require !== undefined) {
              logic.require = nextLogic.require
            }
            if (nextLogic.disable !== undefined) {
              logic.disable = nextLogic.disable
            }
            if (nextLogic.jumpTo !== undefined) {
              logic.jumpTo = this.findByIdInList(
                form.fields,
                nextLogic.jumpTo,
                null
              )
            }
            if (nextLogic.enabled !== undefined) {
              logic.enabled = nextLogic.enabled
            }

            return logic
          })
        }

        if (nextField.options !== undefined) {
          field.options = nextField.options.map(nextOption => {
            const option = this.findByIdInList(
              field.options,
              nextOption.id,
              new FormFieldOptionEntity()
            )

            option.field = field

            option.title = nextOption.title
            option.value = nextOption.value
            option.key = nextOption.key

            return option
          })
        }

        if (nextField.rating !== undefined) {
          field.rating = nextField.rating
        }

        return field
      })
    }

    if (input.hooks !== undefined) {
      form.hooks = input.hooks.map((nextHook) => {
        const hook = this.findByIdInList(
          form.hooks,
          nextHook.id,
          new FormHookEntity()
        )

        // ability for other fields to apply mapping
        hook.url = nextHook.url
        hook.enabled = nextHook.enabled

        if (nextHook.format !== undefined) {
          hook.format = nextHook.format
        }

        return hook
      })

    }

    if (input.design !== undefined) {
      if (input.design.font !== undefined) {
        form.design.font = input.design.font
      }

      if (input.design.layout !== undefined) {
        form.design.layout = input.design.layout
      }

      if (input.design.colors !== undefined) {
        if (input.design.colors.answer !== undefined) {
          form.design.colors.answer = input.design.colors.answer
        }
        if (input.design.colors.buttonText !== undefined) {
          form.design.colors.buttonText = input.design.colors.buttonText
        }
        if (input.design.colors.background !== undefined) {
          form.design.colors.background = input.design.colors.background
        }
        if (input.design.colors.button !== undefined) {
          form.design.colors.button = input.design.colors.button
        }
        if (input.design.colors.buttonActive !== undefined) {
          form.design.colors.buttonActive = input.design.colors.buttonActive
        }
        if (input.design.colors.question !== undefined) {
          form.design.colors.question = input.design.colors.question
        }
      }
    }


    if (input.notifications !== undefined) {
      form.notifications = input.notifications.map(notificationInput => {
        const notification = this.findByIdInList(
          form.notifications,
          notificationInput.id,
          new FormNotificationEntity()
        )

        notification.form = form
        notification.enabled = notificationInput.enabled

        if (notificationInput.fromEmail !== undefined) {
          notification.fromEmail = notificationInput.fromEmail
        }
        if (notificationInput.fromField !== undefined) {
          notification.fromField = this.findByIdInList(
            form.fields,
            notificationInput.fromField,
            null
          )
        }
        if (notificationInput.subject !== undefined) {
          notification.subject = notificationInput.subject
        }
        if (notificationInput.htmlTemplate !== undefined) {
          notification.htmlTemplate = notificationInput.htmlTemplate
        }
        if (notificationInput.toEmail !== undefined) {
          notification.toEmail = notificationInput.toEmail
        }
        if (notificationInput.toField !== undefined) {
          notification.toField = this.findByIdInList(
            form.fields,
            notificationInput.toField,
            null
          )
        }

        return notification
      })
    }

    /*
    if (input.respondentNotifications !== undefined) {
      form.set('respondentNotifications', {
        ...input.respondentNotifications,
        toField: extractField(input.respondentNotifications.toField)
      })
    }
    */

    if (input.startPage !== undefined) {
      form.startPage = this.pageService.update(form.startPage, input.startPage)
    }

    if (input.endPage !== undefined) {
      form.endPage = this.pageService.update(form.endPage, input.endPage)
    }

    await this.formRepository.save(form)

    return form
  }

  private findByIdInList<T extends { id: number }>(list: T[], id: string, fallback: T): T {
    if (!list || /^NEW-/.test(id) || !id) {
      return fallback
    }

    const found = list.find((value) => value.id === this.idService.decode(id))

    if (found) {
      return found
    }

    return fallback
  }
}
