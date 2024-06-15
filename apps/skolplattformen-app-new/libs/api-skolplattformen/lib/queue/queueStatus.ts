import { EventEmitter } from 'events'

export class QueueStatus extends EventEmitter {
  public emitEmptyQueue() {
    this.emit('EMPTY')
  }

  public emitIdleQueue() {
    this.emit('IDLE')
  }
}
