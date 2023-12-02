import { FormCreateMutation } from './form.create.mutation'
import { FormDeleteMutation } from './form.delete.mutation'
import { FormFieldResolver } from './form.field.resolver'
import { FormListQuery } from './form.list.query'
import { FormQuery } from './form.query'
import { FormResolver } from './form.resolver'
import { FormStatisticQuery } from './form.statistic.query'
import { FormStatisticResolver } from './form.statistic.resolver'
import { FormUpdateMutation } from './form.update.mutation'
import { PageResolver } from './page.resolver'

export const formResolvers = [
  FormCreateMutation,
  FormDeleteMutation,
  FormFieldResolver,
  FormQuery,
  FormResolver,
  FormListQuery,
  FormStatisticQuery,
  FormStatisticResolver,
  FormUpdateMutation,
  PageResolver,
]
