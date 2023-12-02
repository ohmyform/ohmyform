import { Injectable } from '@nestjs/common'
import { PageInput } from '../../dto/form/page.input'
import { PageButtonEntity } from '../../entity/page.button.entity'
import { PageEntity } from '../../entity/page.entity'
import { IdService } from '../id.service'

@Injectable()
export class FormPageCreateService {
  constructor(
    private readonly idService: IdService,
  ) {
  }

  public create(input: PageInput): PageEntity {
    const page = new PageEntity()
    page.show = Boolean(input?.show)
    page.buttons = []

    if (!input) {
      return page
    }

    page.title = input.title
    page.buttonText = input.buttonText
    page.paragraph = input.paragraph

    if (input.buttons !== undefined) {
      page.buttons = input.buttons.map(buttonInput => {
        const button = new PageButtonEntity()
        button.page = page
        button.url = buttonInput.url
        button.action = buttonInput.action
        button.text = buttonInput.text
        button.color = buttonInput.color
        button.bgColor = buttonInput.bgColor
        button.activeColor = buttonInput.activeColor

        return button
      })
    }

    return page
  }
}