export default class RoundRobinArray<T> {
  index: any

  array: T[]

  constructor(array : Array<T>, index?: number | undefined) {
    this.index = index || 0

    if (array === undefined || array === null) {
      this.array = new Array<T>()
    } else if (!Array.isArray(array)) {
      throw new Error('Expecting argument to RoundRound to be an Array')
    }

    this.array = array
  }

  next() {
    this.index = (this.index + 1) % this.array.length
    return this.array[this.index]
  }

  add(item : T) {
    this.array.push(item)
  }

  get first() { return this.array[0] }

  get size() { return this.array.length }
}
