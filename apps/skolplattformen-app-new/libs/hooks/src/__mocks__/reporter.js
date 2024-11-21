const reporter = {
  log: jest.fn().mockName('log'),
  error: jest.fn().mockName('error'),
}

export default reporter
