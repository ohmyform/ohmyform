import { gql } from '@apollo/client/core'

export interface FormPublicPageButtonFragment {
  id: string
  url?: string
  action?: string
  text?: string
  bgColor?: string
  activeColor?: string
  color?: string
}

export interface FormPublicPageFragment {
  id: string
  show: boolean
  title?: string
  paragraph?: string
  buttonText?: string
  buttons: FormPublicPageButtonFragment[]
}

export interface FormPublicFieldOptionFragment {
  key?: string
  title?: string
  value: string
}

export interface FormPublicFieldLogicFragment {
  id: string
  action: string
  formula: string
  jumpTo?: string
  require?: boolean
  visible?: boolean
  disable?: boolean
}

export interface FormPublicFieldFragment {
  id: string
  title: string
  slug?: string
  type: string
  description: string
  required: boolean
  defaultValue: string

  options: FormPublicFieldOptionFragment[]

  logic: FormPublicFieldLogicFragment[]

  rating?: {
    steps?: number
    shape?: string
  }
}

export interface FormPublicDesignFragment {
  colors: {
    background: string
    question: string
    answer: string
    button: string
    buttonActive: string
    buttonText: string
  }
  font?: string
  layout?: string
}

export interface FormPublicFragment {
  id?: string
  title: string
  created: string
  language: string
  showFooter: boolean
  fields: FormPublicFieldFragment[]
  design: FormPublicDesignFragment
  startPage: FormPublicPageFragment
  endPage: FormPublicPageFragment
}

export const FORM_PUBLIC_FRAGMENT = gql`
  fragment PublicForm on Form {
    id
    title
    language
    showFooter

    fields {
      id
      title
      slug
      type
      description
      required
      defaultValue

      logic {
        id
        formula
        action
        disable
        jumpTo
        require
        visible
      }

      options {
        id
        key
        title
        value
      }

      logic {
        id
        action
        formula
        jumpTo
        require
        visible
        disable
      }
      rating {
        steps
        shape
      }
    }

    design {
      colors {
        background
        question
        answer
        button
        buttonActive
        buttonText
      }
      font
      layout
    }

    startPage {
      id
      show
      title
      paragraph
      buttonText
      buttons {
        id
        url
        action
        text
        bgColor
        activeColor
        color
      }
    }

    endPage {
      id
      show
      title
      paragraph
      buttonText
      buttons {
        id
        url
        action
        text
        bgColor
        activeColor
        color
      }
    }
  }
`
