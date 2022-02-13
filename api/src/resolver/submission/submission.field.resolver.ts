import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { FormFieldModel } from '../../dto/form/form.field.model'
import { SubmissionFieldModel } from '../../dto/submission/submission.field.model'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { SubmissionFieldEntity } from '../../entity/submission.field.entity'
import { FormFieldService } from '../../service/form/form.field.service'
import { ContextCache } from '../context.cache'

@Resolver(() => SubmissionFieldModel)
export class SubmissionFieldResolver {
  constructor(
    private readonly formFieldService: FormFieldService,
  ) {
  }

  @ResolveField(() => FormFieldModel, { nullable: true })
  async field(
    @Parent() parent: SubmissionFieldModel,
    @Context('cache') cache: ContextCache,
  ): Promise<FormFieldModel> {
    const submissionField = await cache.get<SubmissionFieldEntity>(
      cache.getCacheKey(SubmissionFieldEntity.name, parent.id)
    )

    const field = await cache.get<FormFieldEntity>(
      cache.getCacheKey(
        FormFieldEntity.name,
        submissionField.fieldId),
      () => this.formFieldService.findById(submissionField.fieldId, submissionField.field)
    )

    if (!field) {
      return null
    }

    return new FormFieldModel(field)
  }
}
