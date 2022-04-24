import QueueFetcher from '../queue/queueFetcher'

let sut: QueueFetcher
beforeEach(() => {
  jest.useFakeTimers('legacy')
  sut = new QueueFetcher(async () => '')
})

test('creates queues for each id', () => {
  sut.fetch(async () => '', 'one')
  sut.fetch(async () => '', 'two')
  sut.fetch(async () => '', 'three')

  expect(sut.Queues).toHaveLength(3)
})

test('add same id to same queue', () => {
  sut.fetch(async () => '', 'one')
  sut.fetch(async () => '', 'one')
  sut.fetch(async () => '', 'one')

  expect(sut.Queues).toHaveLength(1)
  expect(sut.Queues[0].id).toEqual('one')
})

test('can run a task', async () => {
  const func = async () => 'output'
  const promise = sut.fetch(func, 'one')

  jest.runOnlyPendingTimers()

  const result = await promise

  expect(result).toEqual('output')
})

test('can run many tasks', async () => {
  const promise1 = sut.fetch(async () => 'one', 'one')
  const promise2 = sut.fetch(async () => 'two', 'two')
  const promise3 = sut.fetch(async () => 'three', 'three')

  await sut.schedule()
  await sut.schedule()
  await sut.schedule()

  const result = await Promise.all([promise1, promise2, promise3])

  expect(result).toEqual(['one', 'two', 'three'])
})

test('sets up timer on fetch', () => {
  sut.fetch(async () => 'one', 'one')

  expect(setTimeout).toHaveBeenCalledTimes(1)
})
