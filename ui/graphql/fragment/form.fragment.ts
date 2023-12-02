import { gql } from '@apollo/client/core'

export interface FormPageFragment {
  id: string
  show: boolean
  title?: string
  paragraph?: string
  buttonText?: string
  buttons: {
    id: string
    url?: string
    action?: string
    text?: string
    bgColor?: string
    color?: string
  }[]
}

export interface FormFieldOptionFragment {
  id: string
  key?: string
  title?: string
  value: string
}

export interface FormFieldOptionKeysFragment {
  [key: string]: string
}

export interface FormFieldLogicFragment {
  id: string
  action: string
  formula: string
  enabled: boolean
  jumpTo?: string
  require?: boolean
  visible?: boolean
  disable?: boolean
}

export interface FormFieldFragment {
  id: string
  idx?: number
  title: string
  slug?: string
  type: string
  description: string
  required: boolean
  defaultValue?: string

  options: FormFieldOptionFragment[]
  optionKeys?: FormFieldOptionKeysFragment

  logic: FormFieldLogicFragment[]

  rating?: {
    steps?: number
    shape?: string
  }
}

export interface FormHookFragment {
  id: string
  enabled: boolean
  url?: string
  format?: string
}

export interface FormNotificationFragment {
  id: string
  enabled: boolean
  subject?: string
  htmlTemplate?: string
  toField?: string
  toEmail?: string
  fromField?: string
  fromEmail?: string
}

export interface FormFragment {
  id?: string
  title: string
  created: string
  lastModified?: string
  language: string
  showFooter: boolean
  anonymousSubmission: boolean
  isLive: boolean
  fields: FormFieldFragment[]
  hooks: FormHookFragment[]
  notifications: FormNotificationFragment[]
  design: {
    colors: {
      background: string
      question: string
      answer: string
      button: string
      buttonText: string
    }
    font?: string
    layout?: string
  }
  startPage: FormPageFragment
  endPage: FormPageFragment
  admin: {
    id: string
    username: string
    email: string
  }
}

export const FORM_FRAGMENT = gql`
  fragment Form on Form {
    id
    title
    created
    lastModified
    language
    showFooter
    anonymousSubmission
    isLive

    hooks {
      id
      enabled
      format
      url
    }

    fields {
      id
      idx
      title
      slug
      type
      description
      required
      defaultValue

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
        enabled
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

    notifications {
      id
      enabled
      subject
      htmlTemplate
      fromField
      fromEmail
      toField
      toEmail
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
    admin {
      id
      username
      email
    }
  }
`
