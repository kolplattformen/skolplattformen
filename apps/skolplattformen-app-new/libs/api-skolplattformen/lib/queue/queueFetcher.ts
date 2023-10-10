import AutoQueue from './autoQueue';
import RoundRobinArray from './roundRobinArray';

export interface QueueEntry {
  id: string;
  queue: AutoQueue;
}

// function delay(time: any) {
//   return new Promise(resolve => setTimeout(resolve, time));
// }

/**
 * Put requests in queues where each childId gets its own queue
 * The class takes care of calling the provided changeChildFunc
 * before running the queue.
 * Why? The external api uses state where the child must be selected
 * before any calls to News etc can be done.
 *
 */
export default class QueueFetcher {
  private queues: RoundRobinArray<QueueEntry>;

  private currentRunningQueue: QueueEntry | undefined;

  private changeChildFunc: (childId: string) => Promise<any>;

  private lastChildId = '';

  private scheduleTimeout: any;

  /**
   * Set to true to console.log verbose information
   * For debugging mostly
   */
  verboseDebug = false;

  /**
   * Creates a new QueueFetcher
   * @param changeChildFunc function that is called to change the current
   * selected child on the server
   */
  constructor(changeChildFunc: (childId: string) => Promise<any>) {
    this.changeChildFunc = changeChildFunc;
    this.queues = new RoundRobinArray(new Array<QueueEntry>());
  }

  /**
   * Queues a fetch - it will be executed together with other calls that
   * has the same id
   * @param func function that creates the request to be done. Must be a function
   * because a Promise is always created in the running state
   * @param id the id (e.g. childId) that is used to group calls together
   * @returns a Promise that resolves when the Promise created by the func is resolved
   * (i.e. is dequeued and executed)
   */
  public async fetch<T>(func: () => Promise<T>, id: string): Promise<T> {
    if (!this.queues.array.some(e => e.id === id)) {
      const newQueue = new AutoQueue(10);
      this.queues.add({id, queue: newQueue});
    }

    const queueEntry = this.queues.array.find(e => e.id === id);
    if (queueEntry === undefined) {
      throw new Error(`No queue found for id: ${id}`);
    }
    const promise = queueEntry.queue.enqueue(func, false);

    if (this.scheduleTimeout === undefined || this.scheduleTimeout === null) {
      this.scheduleTimeout = setTimeout(async () => this.schedule(), 0);
    }

    return promise;
  }

  public get Queues() {
    return this.queues.array;
  }

  /**
   * Method to schedule next queue
   * Public because we need it from unit-tests
   */
  async schedule() {
    // Debug print info for all queues
    this.queues.array.forEach(({id: childId, queue}) =>
      this.debug('Schedule: ', childId, '=>', queue.getQueueInfo()),
    );

    if (this.queues.size === 0) {
      this.debug('No queues created yet');
      return;
    }

    if (this.currentRunningQueue === undefined || this.queues.size === 1) {
      this.debug('First run schedule or only one queue');
      const firstQueue = this.queues.first;
      await this.runNext(firstQueue);
      return;
    }

    const nextToRun = this.findNextQueueToRun();

    if (nextToRun === undefined) {
      this.debug('Nothing to do right now');
      this.scheduleTimeout = null;
      return;
    }

    if (nextToRun.id === this.currentRunningQueue.id) {
      this.debug('Same queue as before was scheduled');
      this.runNext(nextToRun);
      return;
    }

    const {id: queueToPauseId, queue: queueToPause} = this.currentRunningQueue;
    this.debug('Queue to pause', queueToPauseId, queueToPause.getQueueInfo());

    queueToPause.pause();

    if (queueToPause.runningTaskCount === 0) {
      await this.runNext(nextToRun);
      return;
    }

    this.debug('Queue is not idle, waiting for it ...');

    queueToPause.getQueueStatus().once('IDLE', async () => {
      this.debug('Got IDLE from queue');
      await this.runNext(nextToRun);
    });
  }

  private async runNext(queueToRun: QueueEntry) {
    const {id: childId, queue} = queueToRun;
    this.debug('About to run', childId, queue.getQueueInfo());

    if (this.lastChildId === childId) {
      this.debug('Child already selected, skipping select call');
    } else {
      this.debug('Initiating change child');
      await this.changeChildFunc(childId);
      this.lastChildId = childId;
      this.debug('Change child done');
    }

    this.currentRunningQueue = queueToRun;

    this.setupTimerForSchedule();
    await queue.start();
  }

  private setupTimerForSchedule() {
    this.scheduleTimeout = setTimeout(async () => this.schedule(), 3000);
  }

  private findNextQueueToRun(): QueueEntry | undefined {
    // Iterate all queues and look for next queue with work to do
    for (let i = 0; i < this.queues.size; i += 1) {
      const {id: childId, queue} = this.queues.next();

      // If queue has items to execute, return it
      if (queue.size > 0 || queue.runningTaskCount > 0)
        return {id: childId, queue};
    }

    // Nothing more to do
    return undefined;
  }

  private debug(message: any, ...args: any[]) {
    if (this.verboseDebug) {
      console.debug(message, ...args);
    }
  }
}
