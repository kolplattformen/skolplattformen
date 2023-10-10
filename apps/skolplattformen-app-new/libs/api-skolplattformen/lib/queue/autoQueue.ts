import {Queue} from './queue';
import {QueueStatus} from './queueStatus';

export default class AutoQueue extends Queue {
  private runningTasks: number;

  private maxConcurrentTasks: number;

  private isPaused: boolean;

  private queueStatus: QueueStatus;

  constructor(maxConcurrentTasks = 1) {
    super();
    this.runningTasks = 0;
    this.maxConcurrentTasks = maxConcurrentTasks;
    this.isPaused = false;
    this.queueStatus = new QueueStatus();
  }

  public enqueue<T>(action: () => Promise<T>, autoDequeue = true): Promise<T> {
    return new Promise((resolve, reject) => {
      super.enqueue({action, resolve, reject});

      if (autoDequeue) {
        this.dequeue();
      }
    });
  }

  public async dequeue() {
    if (this.runningTasks >= this.maxConcurrentTasks) {
      return false;
    }

    if (this.isPaused) {
      return false;
    }

    const item = super.dequeue();

    if (!item) {
      return false;
    }

    try {
      this.runningTasks += 1;

      const payload = await item.action(this);

      this.decreaseRunningTasks();
      item.resolve(payload);
    } catch (e) {
      this.decreaseRunningTasks();
      item.reject(e);
    } finally {
      this.dequeue();
    }

    return true;
  }

  public pause() {
    this.isPaused = true;
  }

  public async start() {
    this.isPaused = false;

    while (await this.dequeue()) {
      // do nothing
    }
  }

  public get runningTaskCount() {
    return this.runningTasks;
  }

  public getQueueStatus() {
    return this.queueStatus;
  }

  public getQueueInfo() {
    return {
      itemsInQueue: this.size,
      runningTasks: this.runningTasks,
      isPaused: this.isPaused,
    };
  }

  private decreaseRunningTasks() {
    this.runningTasks -= 1;

    if (this.runningTasks <= 0) {
      this.runningTasks = 0;
      this.queueStatus.emitIdleQueue();
    }

    if (this.size === 0) {
      this.queueStatus.emitEmptyQueue();
    }
  }
}
