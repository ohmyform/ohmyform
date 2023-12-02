export interface NextConfigType {
  publicRuntimeConfig: {
    environment: string,
    endpoint: string
    spa?: boolean
    mainBackground?: string
  }
  serverRuntimeConfig: {
    endpoint: string
  }
}
