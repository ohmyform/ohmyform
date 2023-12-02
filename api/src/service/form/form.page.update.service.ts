import { Injectable } from '@nestjs/common'
import { PageInput } from '../../dto/form/page.input'
import { PageButtonEntity } from '../../entity/page.button.entity'
import { PageEntity } from '../../entity/page.entity'
import { IdService } from '../id.service'

@Injectable()
export class FormPageUpdateService {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  public update(page: PageEntity, input: PageInput): PageEntity {
    if (!page) {
      page = new PageEntity()
      page.show = false
    }

    if (input.show !== undefined) {
      page.show = input.show
    }

    if (input.title !== undefined) {
      page.title = input.title
    }

    if (input.paragraph !== undefined) {
      page.paragraph = input.paragraph
    }

    if (input.buttonText !== undefined) {
      page.buttonText = input.buttonText
    }

    if (input.buttons !== undefined) {
      page.buttons = input.buttons.map(buttonInput => {
        const entity = this.findByIdInList(
          page?.buttons,
          buttonInput.id,
          new PageButtonEntity()
        )

        entity.page = page
        entity.url = buttonInput.url
        entity.action = buttonInput.action
        entity.text = buttonInput.text
        entity.color = buttonInput.color
        entity.bgColor = buttonInput.bgColor
        entity.activeColor = buttonInput.activeColor

        return entity
      })
    }

    return page
  }


  private findByIdInList<T extends { id: number }>(list: T[], id: string, fallback: T): T {
    if (!list || /^NEW-/.test(id)) {
      return fallback
    }

    const found = list.find((value) => value.id === this.idService.decode(id))

    if (found) {
      return found
    }

    return fallback
  }
}