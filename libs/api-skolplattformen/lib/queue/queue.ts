export class Queue {
  private items: any[]

  constructor() { this.items = [] }

  enqueue(item : any) { this.items.push(item) }

  dequeue() { return this.items.shift() }

  get size() { return this.items.length }
}
