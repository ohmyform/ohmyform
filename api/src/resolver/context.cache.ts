
type ID = string | number

export class ContextCache<A = any> {
  private cache: {
    [key: string]: any
  } = {}

  public getCacheKey(type: string, id: ID): string {
    return `${type}:${id}`
  }

  public add<B = A>(key: string, element: B): void {
    this.cache[key] = element
  }

  public get<B = A>(key: string, init?: () => Promise<B>): B | Promise<B> {
    if (!this.cache[key] && init) {
      const result = init()
      void result.then(r => {
        this.cache[key] = r
      })

      return result
    }

    return this.cache[key]
  }
}
