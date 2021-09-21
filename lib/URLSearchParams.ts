/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
export class URLSearchParams {
  
  private dict: {[key: string]: string[]} = {}

  constructor(search: string | string[] | any | URLSearchParams = '') {
    if (search instanceof URLSearchParams) {
      this.dict = this.parseToDict(search.toString())
    } else {
      this.dict = this.parseToDict(search)
    }
  }

  /**
   * Appends a specified key/value pair as a new search parameter
   */
  public append(name: string, value: string): void {
    this.appendTo(this.dict, name, value)
  }

  /**
   * Deletes this give search parameter, and its associated value, from the list of all search parameters
   */
  public delete(name: string): void {
    delete this.dict[name]
  }

  /**
   * Returns the first value associated to the given search parameter
   */
  get(name: string): string | null {
    return name in this.dict ? this.dict[name][0] : null
  }

  /**
   * Returns all the values association with a given parameter
   */
  getAll(name: string): string[] {
    return name in this.dict ? this.dict[name].slice(0) : []
  }

  /**
   * Test if the search parameter exists
   */
  has(name: string): boolean {
    return name in this.dict
  }

  /**
   * Sets the value associated to a given search parameter to
   * the given value. If there were several values, delete the others.
   */
  set(name: string, value: string): void {
    this.dict[name] = [value]
  }

  /**
   * Returns a string containing a query string suitable for use in a URL
   */
  toString(): string {
    return Object.entries(this.dict)
      .map(([key, value]) => `${key}=${this.encode(value)}`)
      .join('&')
  }

  /**
   *
   */
  parseToDict(search: string | string[] | any): any {
      const dict = {}

      if (typeof search === 'object') {
      // if 'search' is an array, treat it as a sequence
      if (Array.isArray(search)) {
        for (let i=0; i<search.length; i++) {
          const item = search[i]
          if (Array.isArray(item) && item.length === 2) {
            this.appendTo(dict, item[0], item[1])
          } else {
            throw new TypeError("Failed to construct 'URLSearchParams': Sequence initalizer must only contain pair elements")
          }
        }
      } else {
        Object.entries(search).forEach(([key, value]) => this.appendTo(dict, key, value))
      }
    } else {
      // remove 1st ?
      if (search.indexOf('?') === 0) {
        search = search.slice(1)
      }

      const pairs = search.split('&')
      for (let j=0; j<pairs.length; j++) {
        const value = pairs[j]
        const index = value.indexOf('=')
        if (index > -1) {
          this.appendTo(dict, this.decode(value.slice(0, index)), this.decode(value.slice(index+1)))
        } else if (value) {
          this.appendTo(dict, this.decode(value), '')
        }
      }
    }

    return dict
  }

  appendTo(dict: any, name: string, value: string | Function | any): void {
    // eslint-disable-next-line no-nested-ternary
    const val = typeof value === 'string' ? value: (
      value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)
    )

    if (name in dict) {
      dict[name].push(value)
    } else {
      dict[name] = [val]
    }
  }

  decode(str: string): string {
    return str
      .replace(/[ +]/g, '%20')
      .replace(/(%[a-f0-9]{2})+/ig, (match) => decodeURIComponent(match))
  }

  encode(str: string[]): string {
      const replace: {[key: string]: string} = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      }
      // eslint-disable-next-line no-useless-escape
      return encodeURIComponent(str.join(',')).replace(/[!'\(\)~]|%20|%00/g, (match) => replace[match] || '')
  }
}