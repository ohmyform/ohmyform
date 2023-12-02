import { FormCreateService } from './form.create.service'
import { FormDeleteService } from './form.delete.service'
import { FormFieldService } from './form.field.service'
import { FormPageCreateService } from './form.page.create.service'
import { FormPageUpdateService } from './form.page.update.service'
import { FormService } from './form.service'
import { FormStatisticService } from './form.statistic.service'
import { FormUpdateService } from './form.update.service'

export const formServices = [
  FormCreateService,
  FormDeleteService,
  FormFieldService,
  FormPageCreateService,
  FormPageUpdateService,
  FormService,
  FormStatisticService,
  FormUpdateService,
]
